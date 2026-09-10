'use client'

import Image from 'next/image'
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

  // Checking reset link / invalid link state
  if (!ready) {
    return (
      <main className="min-h-screen bg-[#f7f6f8] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm px-8 py-10 sm:px-10">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/images/logo_nav.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-base font-medium text-gray-800">
                Reset Password
              </h1>

              {error ? (
                <div
                  role="alert"
                  className="mt-4 rounded-2xl bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-600"
                >
                  {error}
                </div>
              ) : (
                <p className="mt-2 text-xs text-gray-400">
                  Checking your password reset link...
                </p>
              )}
            </div>

            {/* Back to login */}
            {error && (
              <p className="mt-5 text-center text-xs text-gray-500">
                <Link
                  href="/login"
                  className="font-medium text-[#459A87] transition hover:text-[#2f6e60]"
                >
                  Back to Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f6f8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm px-8 py-10 sm:px-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-medium text-gray-800">
              <b>Reset Password</b>
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                required
                autoComplete="new-password"
                placeholder="Enter your new password"
                className="
                  h-10
                  w-full
                  rounded-2xl
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#f5b719]/20
                  focus:border-[#f5b719]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Confirm New Password
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
                autoComplete="new-password"
                placeholder="Confirm your new password"
                className="
                  h-10
                  w-full
                  rounded-2xl
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#f5b719]/20
                  focus:border-[#f5b719]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-2xl bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-600"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                role="status"
                className="rounded-2xl bg-green-50 px-3 py-2 text-xs leading-relaxed text-green-600"
              >
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                h-10
                w-full
                rounded-2xl
                bg-[#f5b719]
                text-xs
                font-medium
                text-white
                transition
                hover:bg-[#e8aa0f]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-4 text-center text-xs text-gray-500">
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-medium text-[#e8aa0f] transition hover:text-[#c98f00]"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}