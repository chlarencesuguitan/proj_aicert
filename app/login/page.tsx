'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (error) {
      setError('Invalid email or password.')
      return
    }

    setSuccess('Login successful.')
  }

  return (
    <main>
      <h1>Log in</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        {success && <p role="status">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </main>
  )
}