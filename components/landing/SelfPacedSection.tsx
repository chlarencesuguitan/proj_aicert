import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const features = [
  {
    title: 'Structured learning paths',
    description:
      'Follow clear modules and lessons designed to build skills progressively from fundamentals to advanced applications.',
  },
  {
    title: 'Learn at your own pace',
    description:
      'Access course materials anytime and progress on a schedule that fits your work and personal commitments.',
  },
  {
    title: 'Practical exercises',
    description:
      'Apply concepts through guided activities, real-world scenarios, and portfolio-ready projects.',
  },
  {
    title: 'Certification-ready',
    description:
      'Complete assessments aligned with AQBAT certification standards to validate your AI competency.',
  },
]

export function SelfPacedSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Self-Paced Learning"
            title={
              <>
                Flexible AI training for{' '}
                <span className="text-brand">busy professionals</span>
              </>
            }
            description="Our self-paced certification programs give you full control over when and how you learn — without sacrificing structure or quality."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-background p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Button href="/courses?learning_type=self_paced" variant="outline">
            Explore self-paced courses
          </Button>
        </div>
      </Container>
    </section>
  )
}
