'use client'
import Link from 'next/link'

import { FormEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let mounted = true

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (!session) {
        setError(
          'This password reset link is invalid or has expired.'
        )
        return
      }

      setReady(true)
    }

    checkSession()

    return () => {
      mounted = false
    }
  }, [supabase])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      'Your password has been updated successfully.'
    )

    setPassword('')
    setConfirmPassword('')
  }

  if (!ready) {
    return (
      <main>
        <h1>Reset password</h1>

        {error ? (
          <p role="alert">{error}</p>
        ) : (
          <p>Checking reset link...</p>
        )}
      </main>
    )
  }

  return (
    <main>
      <h1>Reset password</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">
            Confirm new password
          </label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            disabled={loading}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        {success && <p role="status">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>
      <p>
        <Link href="/login">Back to login</Link>
      </p>
    </main>
  )
}