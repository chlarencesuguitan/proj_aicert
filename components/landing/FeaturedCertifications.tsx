import Link from 'next/link'
import type { Course } from '@/lib/types/course'
import { CourseCard } from '@/components/courses/CourseCard'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface FeaturedCertificationsProps {
  courses: Course[]
  error?: string | null
}

export function FeaturedCertifications({
  courses,
  error,
}: FeaturedCertificationsProps) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="featured-heading">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Certifications"
            title={
              <>
                Featured <span className="text-brand">AI Certifications</span>
              </>
            }
            description="Explore our most popular certification programs designed to help you build practical AI skills and earn recognized credentials."
          />
          <Button href="/courses" variant="outline" className="shrink-0">
            See all courses
          </Button>
        </div>

        {error && (
          <p role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Unable to load featured courses. Please try again later.
          </p>
        )}

        {!error && courses.length === 0 && (
          <p className="mt-8 text-muted">
            Featured certifications will appear here once courses are published.
          </p>
        )}

        {courses.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <p className="mt-8 text-right">
          <Link
            href="/courses"
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            See more →
          </Link>
        </p>
      </Container>
    </section>
  )
}
