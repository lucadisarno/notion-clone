import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { PageEditor } from './PageEditor'

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
    <PageEditor page={{
      id: page.id,
      title: page.title,
      content: page.content || ''
    }} />
  )
}