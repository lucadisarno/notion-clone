'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'

interface Page { id: string; title: string; icon?: string }

export function Sidebar({ pages, currentId }: { pages: Page[]; currentId?: string }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [creating, setCreating] = useState(false)

  const createPage = async () => {
    setCreating(true)
    const res = await fetch('/api/pages', { method: 'POST' })
    const page = await res.json()
    router.push(`/dashboard/${page.id}`)
    router.refresh()
    setCreating(false)
  }

  return (
    <aside style={{ width: '240px', height: '100vh', borderRight: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280', padding: '4px 8px', marginBottom: '8px' }}>
        {session?.user.name ?? session?.user.email}
      </div>
      {pages.map(page => (
        <button key={page.id} onClick={() => router.push(`/dashboard/${page.id}`)}
          style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '6px', fontSize: '14px', border: 'none', cursor: 'pointer', background: currentId === page.id ? '#f3f4f6' : 'transparent', width: '100%' }}>
          {page.icon ?? '📄'} {page.title || 'Senza titolo'}
        </button>
      ))}
      <button onClick={createPage} disabled={creating}
        style={{ marginTop: '8px', padding: '6px 8px', borderRadius: '6px', fontSize: '13px', border: '1px dashed #d1d5db', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>
        {creating ? '...' : '+ Nuova pagina'}
      </button>
    </aside>
  )
}