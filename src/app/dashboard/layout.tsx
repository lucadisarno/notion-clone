import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'

const prisma = new PrismaClient()

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/')

  const pages = await prisma.page.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    select: { id: true, title: true, icon: true }
  })

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar pages={pages} />
      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}