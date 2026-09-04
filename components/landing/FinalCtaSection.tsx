import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-20" id="contact">
      <Container>
        <div className="rounded-3xl border border-border bg-surface px-6 py-10 shadow-sm sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Let&apos;s start{' '}
              <span className="text-brand">something intelligent.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Whether you prefer self-paced learning or 1-on-1 coaching, AQBAT
              helps you build the AI skills and certifications you need for
              what&apos;s next.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Button href="/register" size="lg">
              Get started
            </Button>
            <Button href="/courses" variant="secondary" size="lg">
              Browse courses
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
