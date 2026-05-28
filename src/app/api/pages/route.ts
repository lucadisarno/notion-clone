import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })

  const pages = await prisma.page.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' }
  })
  return NextResponse.json(pages)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })

  const page = await prisma.page.create({
    data: { userId: session.user.id, title: 'Senza titolo' }
  })
  return NextResponse.json(page, { status: 201 })
}