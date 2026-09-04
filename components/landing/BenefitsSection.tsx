import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const benefits = [
  {
    title: 'Industry-relevant curriculum',
    description:
      'Courses are designed around real AI workflows used in business, data, creative, and technical roles.',
  },
  {
    title: 'Certified instructors',
    description:
      'Learn from experienced trainers who combine academic rigor with practical industry expertise.',
  },
  {
    title: 'Recognized credentials',
    description:
      'Earn AQBAT certifications that demonstrate your AI competency to employers and clients.',
  },
  {
    title: 'Flexible learning options',
    description:
      'Choose between self-paced programs and 1-on-1 coaching based on how you learn best.',
  },
  {
    title: 'Practical skill building',
    description:
      'Go beyond theory with exercises, projects, and assessments grounded in real applications.',
  },
  {
    title: 'Professional community',
    description:
      'Join a growing network of AI learners, creators, and practitioners building future-ready skills.',
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" id="about">
      <Container>
        <SectionHeading
          eyebrow="Why AQBAT"
          title={
            <>
              Built for professionals who want{' '}
              <span className="text-brand">real AI skills</span>
            </>
          }
          description="AQBAT combines structured certification paths, expert instruction, and practical learning experiences to help you succeed in the AI economy."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
