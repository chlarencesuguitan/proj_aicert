'use client'
import Link from 'next/link'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
    const supabase = createClient()

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        setError('')
        setSuccess('')

        if (!email.trim()) {
            setError("Please enter your email address.")
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

        if(error){
            setError(error.message)
            return
        }

        setSuccess(
            "if an account exists with that email, a password reset link has been set."
        )
    }

    return (
        <main>
            <h1>Forgot password</h1>

            <p>Enter your email address and We&apos;ll send you a password reset link.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                {success && <p role="alert">{success}</p>}


                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            <p>
                Remember your password?{' '}
                <Link href="/login">Back to login</Link>
            </p>
        </main>
    )
}