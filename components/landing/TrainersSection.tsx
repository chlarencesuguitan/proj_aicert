import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const trainers = [
  {
    name: 'Maria Dela Cruz',
    title: 'Lead AI Instructor',
    bio: 'Specializes in AI fundamentals, responsible AI, and helping non-technical professionals build practical AI literacy.',
    image: '/images/default-profile.png',
  },
  {
    name: 'James Santos',
    title: 'Machine Learning Specialist',
    bio: 'Experienced data scientist focused on machine learning foundations, model evaluation, and applied Python workflows.',
    image: '/images/default-profile.png',
  },
  {
    name: 'Elena Reyes',
    title: 'Generative AI Trainer',
    bio: 'Helps creators and teams adopt generative AI tools through advanced prompt engineering and production-ready workflows.',
    image: '/images/default-profile.png',
  },
]

export function TrainersSection() {
  return (
    <section className="bg-surface py-16 sm:py-20" id="trainers">
      <Container>
        <SectionHeading
          eyebrow="Expert Instructors"
          title={
            <>
              Certified <span className="text-brand">AI Instructors</span>
            </>
          }
          description="Learn from experienced trainers who combine deep technical knowledge with practical teaching focused on real-world AI applications."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <article
              key={trainer.name}
              className={`overflow-hidden rounded-2xl border border-border bg-background shadow-sm ${
                index === 0 ? 'lg:row-span-2 lg:flex lg:flex-col' : ''
              }`}
            >
              <div
                className={`relative bg-gray-100 ${
                  index === 0 ? 'aspect-[4/5] lg:flex-1' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={trainer.image}
                  alt={`Portrait of ${trainer.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-dark">
                  {trainer.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {trainer.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{trainer.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
