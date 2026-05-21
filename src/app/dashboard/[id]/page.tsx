import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function PageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/')

  const page = await prisma.page.findFirst({
    where: { id, userId: session.user.id }
  })
  if (!page) notFound()

  return (
    <div style={{ padding: 40, maxWidth: 720 }}>
      <a href="/dashboard" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>
        ← Torna alla dashboard
      </a>
      <h1 style={{ marginTop: 24 }}>{page.title}</h1>
      <p style={{ color: '#888', fontSize: 14 }}>
        Ultima modifica: {new Date(page.updatedAt).toLocaleDateString('it-IT')}
      </p>
      <div style={{ marginTop: 24, color: '#ccc' }}>
        {page.content || 'Pagina vuota — aggiungi contenuto!'}
      </div>
    </div>
  )
}