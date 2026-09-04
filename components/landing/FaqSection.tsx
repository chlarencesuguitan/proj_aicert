import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const faqs = [
  {
    question: 'Who are AQBAT certification programs designed for?',
    answer:
      'Our programs serve professionals, students, creators, and teams who want structured AI education — from beginners exploring AI fundamentals to practitioners building advanced skills.',
  },
  {
    question: 'Do I need a technical background to get started?',
    answer:
      'Not necessarily. Beginner-level certifications like Introduction to Artificial Intelligence are designed for learners without prior technical experience. Advanced programs may recommend foundational knowledge.',
  },
  {
    question: 'What is the difference between self-paced and 1-on-1 training?',
    answer:
      'Self-paced programs let you learn on your own schedule with structured modules and assessments. 1-on-1 training adds personalized coaching sessions with a certified instructor for deeper guidance.',
  },
  {
    question: 'How does certification work?',
    answer:
      'Each course has specific certification requirements such as completing modules, passing assessments, and meeting minimum scores. Requirements are listed on each course details page.',
  },
  {
    question: 'Can I browse courses before creating an account?',
    answer:
      'Yes. You can explore our course catalog and view full course details publicly. Registration is required when you are ready to enroll.',
  },
]

export function FaqSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" id="faq">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently asked{' '}
              <span className="text-brand">questions</span>
            </>
          }
          description="Find answers to common questions about AQBAT certifications, learning formats, and getting started."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border bg-background"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-gray-900 marker:content-none">
                {faq.question}
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm leading-7 text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
