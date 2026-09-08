'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const supabase = createClient()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(
      'Registration successful. Please check your email to verify your account.'
    )

    setPassword('')
    setConfirmPassword('')
  }

  return (
    <main className="min-h-screen bg-[#f7f6f8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[430px]">

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-sm px-8 py-9 sm:px-11 sm:py-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-medium text-gray-800">
              <b>Create an Account</b>
            </h1>

            <p className="text-[10px] text-gray-400 mt-1">
              Start your AI learning journey
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-3">

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[11px] font-medium text-gray-600 mb-1.5"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  disabled={loading}
                  required
                  autoComplete="given-name"
                  placeholder="First name"
                  className="
                    w-full
                    h-10
                    rounded-2xl
                    border
                    border-transparent
                    bg-[#f3f1ed]
                    px-3
                    text-xs
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-[#459A87]
                    focus:ring-2
                    focus:ring-[#459A87]/10
                    disabled:opacity-60
                  "
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-[11px] font-medium text-gray-600 mb-1.5"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  disabled={loading}
                  required
                  autoComplete="family-name"
                  placeholder="Last name"
                  className="
                    w-full
                    h-10
                    rounded-2xl
                    border
                    border-transparent
                    bg-[#f3f1ed]
                    px-3
                    text-xs
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                    transition
                    focus:border-[#459A87]
                    focus:ring-2
                    focus:ring-[#459A87]/10
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-medium text-gray-600 mb-1.5"
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
                  w-full
                  h-10
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#459A87]
                  focus:ring-2
                  focus:ring-[#459A87]/10
                  disabled:opacity-60
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-medium text-gray-600 mb-1.5"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                required
                autoComplete="new-password"
                placeholder="Create a password"
                className="
                  w-full
                  h-10
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#459A87]
                  focus:ring-2
                  focus:ring-[#459A87]/10
                  disabled:opacity-60
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[11px] font-medium text-gray-600 mb-1.5"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={loading}
                required
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="
                  w-full
                  h-10
                  rounded-2xl
                  border
                  border-transparent
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#459A87]
                  focus:ring-2
                  focus:ring-[#459A87]/10
                  disabled:opacity-60
                "
              />
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-2xl bg-red-50 px-3 py-2 text-[11px] text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p
                role="status"
                className="rounded-2xl bg-green-50 px-3 py-2 text-[11px] text-green-600"
              >
                {success}
              </p>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-10
                rounded-2xl
                bg-[#459A87]
                text-[11px]
                font-medium
                text-white
                transition-all
                hover:bg-[#2f6e60]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <b>{loading ? 'Creating account...' : 'Create Account'}</b>
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-[10px] text-gray-500 mt-3">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-[#459A87] hover:text-[#2f6e60] transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}