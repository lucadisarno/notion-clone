import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NewPageButton from './NewPageButton'

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/')

  const pages = await prisma.page.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Le tue pagine</h1>
      <p style={{ marginBottom: 24, color: '#888' }}>
        Benvenuto, {session.user.name || session.user.email}
      </p>

      <NewPageButton />

      {pages.length === 0 ? (
        <p style={{ color: '#888' }}>Nessuna pagina ancora. Creane una!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pages.map(page => (
            <li key={page.id} style={{ marginBottom: 8 }}>
              <Link
                href={`/dashboard/${page.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  padding: '12px 16px',
                  border: '1px solid #333',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}>
                  {page.icon && <span style={{ marginRight: 8 }}>{page.icon}</span>}
                  {page.title || 'Senza titolo'}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}