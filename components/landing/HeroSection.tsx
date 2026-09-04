import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function HeroSection() {
  return (
    <section className="bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              Learn. Grow. Get Certified.
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="text-brand">AQBAT</span> AI Certification
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Build job-ready AI skills with structured certification programs,
              expert-led training, and practical learning paths designed for
              professionals, creators, and teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/register" size="lg">
                Register
              </Button>
              <Button href="/courses" variant="secondary" size="lg">
                Browse Courses
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-3xl border border-border bg-brand-light shadow-lg">
              <Image
                src="/images/hero.png"
                alt="Student learning AI with a friendly robot assistant"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
