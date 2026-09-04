import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const testimonials = [
  {
    quote:
      'AQBAT helped me move from curiosity about AI to actually using it confidently in my marketing workflows. The certification process was clear and practical.',
    name: 'Angela Torres',
    role: 'Marketing Manager',
  },
  {
    quote:
      'The machine learning foundations course gave me the structure I needed. The modules built on each other logically and the assessments kept me accountable.',
    name: 'Mark Villanueva',
    role: 'Data Analyst',
  },
  {
    quote:
      'As a freelance creator, the generative AI program transformed how I work. I now deliver higher-quality content in less time with a repeatable process.',
    name: 'Patricia Lim',
    role: 'Content Creator',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Trusted by learners building{' '}
              <span className="text-brand">AI careers</span>
            </>
          }
          description="Professionals across industries use AQBAT to develop practical AI skills and earn credentials that support their growth."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <blockquote className="text-sm leading-7 text-gray-700">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-muted">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
