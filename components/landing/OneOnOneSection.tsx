import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const benefits = [
  {
    title: 'Personalized guidance',
    description:
      'Work directly with certified AI instructors who tailor sessions to your goals, experience level, and industry context.',
  },
  {
    title: 'Live feedback',
    description:
      'Get real-time answers, code reviews, and strategic advice during focused coaching sessions.',
  },
  {
    title: 'Accelerated progress',
    description:
      'Move faster with a dedicated mentor who helps you navigate complex topics and avoid common pitfalls.',
  },
]

export function OneOnOneSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm sm:p-10 lg:grid lg:grid-cols-2 lg:gap-10">
          <SectionHeading
            eyebrow="1-on-1 Training"
            title={
              <>
                Expert coaching for{' '}
                <span className="text-brand">deeper mastery</span>
              </>
            }
            description="For learners who want hands-on mentorship, our 1-on-1 training programs combine structured curriculum with personalized instructor support."
          />

          <div className="mt-8 space-y-4 lg:mt-0">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {benefit.description}
                </p>
              </article>
            ))}
            <Button href="/courses?learning_type=one_on_one" className="mt-2">
              View 1-on-1 programs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
