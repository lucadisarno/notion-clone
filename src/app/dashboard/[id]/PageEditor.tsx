'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export function PageEditor({ page }: { page: { id: string; title: string; content: string } }) {
  const router = useRouter()
  const [title, setTitle] = useState(page.title)
  const [content, setContent] = useState(page.content)

  const sanitize = (value: string): string => {
    if (typeof window === 'undefined') return value
    const DOMPurify = require('dompurify')
    return DOMPurify.sanitize(value)
  }

  const saveTitle = useDebouncedCallback(async (value: string) => {
    await fetch(`/api/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: sanitize(value) })
    })
    router.refresh()
  }, 500)

  const saveContent = useDebouncedCallback(async (value: string) => {
    await fetch(`/api/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: sanitize(value) })
    })
  }, 500)

  return (
    <div style={{ padding: 40, maxWidth: 720 }}>
      <a href="/dashboard" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>
        ← Torna alla dashboard
      </a>
      <input
        value={title}
        onChange={e => {
          setTitle(e.target.value)
          saveTitle(e.target.value)
        }}
        placeholder="Senza titolo"
        style={{
          display: 'block',
          width: '100%',
          fontSize: 32,
          fontWeight: 'bold',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'inherit',
          marginTop: 24,
          marginBottom: 16,
        }}
      />
      <MDEditor
        value={content}
        onChange={val => {
          setContent(val || '')
          saveContent(val || '')
        }}
        height={500}
      />
    </div>
  )
}