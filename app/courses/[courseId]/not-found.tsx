import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function CourseNotFound() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-surface px-6 py-12 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              404
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Course not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              This course may be unavailable, unpublished, or the link may be
              incorrect.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/courses">Back to Courses</Button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-brand-dark hover:underline"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
