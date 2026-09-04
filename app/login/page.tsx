'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

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

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f7f6f8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[430px]">

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-sm px-8 py-9 sm:px-11 sm:py-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-[15px] font-medium text-gray-800">
              Login
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-medium text-gray-600 mb-1.5"
              >
                Username or Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                required
                autoComplete="email"
                placeholder="Enter your username or email"
                className="
                  w-full
                  h-10
                  rounded-md
                  border
                  border-transparent
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#f5b51b]
                  focus:ring-2
                  focus:ring-[#f5b51b]/10
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
                autoComplete="current-password"
                placeholder="Enter your password"
                className="
                  w-full
                  h-10
                  rounded-md
                  border
                  border-transparent
                  bg-[#f3f1ed]
                  px-3
                  text-xs
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#f5b51b]
                  focus:ring-2
                  focus:ring-[#f5b51b]/10
                  disabled:opacity-60
                "
              />

              {/* Forgot Password */}
              <div className="flex justify-end mt-1.5">
                <Link
                  href="/forgot-password"
                  className="text-[10px] text-[#f0ae16] hover:text-[#d99600] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-[11px] text-red-600"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p
                role="status"
                className="rounded-md bg-green-50 px-3 py-2 text-[11px] text-green-600"
              >
                {success}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-10
                rounded-md
                bg-[#f7b719]
                text-[11px]
                font-medium
                text-white
                transition-all
                hover:bg-[#e9a900]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-[10px] text-gray-500 mt-3">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-[#f0ae16] hover:text-[#d99600] transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}