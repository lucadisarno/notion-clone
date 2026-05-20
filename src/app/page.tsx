'use client'

import { useState } from 'react'
import { signUp, signIn, useSession } from '@/lib/auth-client'

export default function Home() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  if (session) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Benvenuto, {session.user.name || session.user.email}!</h1>
        <p>Sei loggato come: {session.user.email}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Notion Clone</h1>
      <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} style={{ display: 'block', marginBottom: 8, width: '100%', padding: 8 }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', marginBottom: 8, width: '100%', padding: 8 }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', marginBottom: 16, width: '100%', padding: 8 }} />
      <button onClick={() => signUp.email({ email, password, name })} style={{ marginRight: 8, padding: '8px 16px' }}>
        Registrati
      </button>
      <button onClick={() => signIn.email({ email, password })} style={{ padding: '8px 16px' }}>
        Accedi
      </button>
    </div>
  )
}
