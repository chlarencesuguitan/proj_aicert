'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    )

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      'If an account exists with that email, a password reset link has been sent.'
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f6f8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
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

          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-medium text-gray-800">
              <b>Forgot Password?</b>
            </h1>

            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Enter your email address and we&apos;ll send you a
              password reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                required
                autoComplete="email"
                placeholder="Enter your email"
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
                  focus:ring-[#459A87]/20
                  focus:border-[#459A87]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-2xl bg-red-50 px-3 py-2 text-xs text-red-600"
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
                bg-[#459A87]
                text-xs
                font-medium
                text-white
                transition
                hover:bg-[#2f6e60]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <b>{loading ? 'Sending...' : 'Send Reset Link'}</b>
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-xs text-gray-500">
            Remember your password?{' '}
            <Link
              href="/login"
              className="font-medium text-[#459A87] transition hover:text-[#2f6e60]"
            >
              Back to Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}