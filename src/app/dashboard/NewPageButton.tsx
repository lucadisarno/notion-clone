'use client'

import { useRouter } from 'next/navigation'

export default function NewPageButton() {
  const router = useRouter()

  async function createPage() {
    const res = await fetch('/api/pages', { method: 'POST' })
    const page = await res.json()
    router.push(`/dashboard/${page.id}`)
    router.refresh()
  }

  return (
    <button
      onClick={createPage}
      style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: 24 }}
    >
      + Nuova pagina
    </button>
  )
}