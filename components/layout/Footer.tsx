import Link from 'next/link'
import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui/Container'

const footerLinks = {
  Platform: [
    { href: '/courses', label: 'Courses' },
    { href: '/#certification', label: 'Certification' },
    { href: '/#trainers', label: 'Trainers' },
  ],
  Account: [
    { href: '/login', label: 'Log in' },
    { href: '/register', label: 'Register' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  Support: [
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contact', label: 'Contact' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 text-gray-300">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="[&_a]:text-white [&_span:last-child]:text-white">
              <Logo />
            </div>
            <p className="text-sm leading-6 text-gray-400">
              AQBAT AI Certification helps professionals learn, grow, and get
              certified in artificial intelligence.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AQBAT AI Certification. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500">
            Learn. Grow. Get Certified.
          </p>
        </div>
      </Container>
    </footer>
  )
}
