'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/#trainers', label: 'Trainers' },
  { href: '/#about', label: 'About' },
  { href: '/#faq', label: 'FAQ' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-opacity-5">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : link.href.startsWith('/#')
                    ? false
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-dark ${
                    isActive ? 'text-brand-dark' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex ">
            <Button href="/login" variant="secondary" size="sm">
              Log in
            </Button>
            <Button href="/register" size="sm" className="text-white">
              Register
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-gray-700 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            className="border-t border-border py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <div className="flex flex-col gap-2 px-3">
                  <Button href="/login" variant="secondary" size="sm">
                    Log in
                  </Button>
                  <Button href="/register" size="sm">
                    Register
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  )
}
