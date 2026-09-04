import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  {
    step: '01',
    title: 'Choose your certification path',
    description:
      'Browse AI certification programs by category, difficulty, and learning format to find the right fit.',
  },
  {
    step: '02',
    title: 'Complete structured modules',
    description:
      'Work through guided lessons, practical exercises, and assessments designed to build real competency.',
  },
  {
    step: '03',
    title: 'Pass certification requirements',
    description:
      'Meet course-specific assessment standards including quizzes, projects, and final evaluations.',
  },
  {
    step: '04',
    title: 'Earn your AQBAT credential',
    description:
      'Receive a recognized certification that validates your AI skills and supports your professional growth.',
  },
]

export function CertificationProcessSection() {
  return (
    <section className="py-16 sm:py-20" id="certification">
      <Container>
        <SectionHeading
          eyebrow="Certification Process"
          title={
            <>
              A clear path from learning to{' '}
              <span className="text-brand">certified</span>
            </>
          }
          description="Our certification process is designed to be transparent, rigorous, and aligned with the skills employers and teams actually need."
          align="center"
          className="mx-auto text-center"
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((item) => (
            <li
              key={item.step}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-brand-dark">{item.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
