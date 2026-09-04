import type { Metadata } from 'next'
import { Suspense } from 'react'
import type { CourseDifficulty, LearningType } from '@/lib/types/course'
import { getPublishedCourses } from '@/lib/courses/queries'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Course Catalog',
  description:
    'Browse published AQBAT AI certification courses. Filter by category, difficulty, and learning format to find the right program for your goals.',
}

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
    difficulty?: string
    learning_type?: string
  }>
}

function CoursesLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-96 animate-pulse rounded-2xl border border-border bg-gray-100"
        />
      ))}
    </div>
  )
}

async function CoursesContent({
  searchParams,
}: {
  searchParams: CoursesPageProps['searchParams']
}) {
  const params = await searchParams

  const filters = {
    search: params.search,
    category: params.category,
    difficulty: params.difficulty as CourseDifficulty | undefined,
    learning_type: params.learning_type as LearningType | undefined,
  }

  const { data: courses, error } = await getPublishedCourses(filters)

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
      >
        Unable to load courses right now. Please refresh the page and try again.
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">No courses found</h2>
        <p className="mt-2 text-sm text-muted">
          Try adjusting your search or filters to discover available
          certification programs.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  return (
    <>
      <Navbar />
      <main className="py-10 sm:py-14">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              Course Catalog
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover AI certification programs
            </h1>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Explore published courses across AI fundamentals, machine
              learning, data science, prompt engineering, and responsible AI.
            </p>
          </div>

          <div className="mt-10">
            <Suspense fallback={<div className="h-24 animate-pulse rounded-2xl bg-gray-100" />}>
              <CourseFilters />
            </Suspense>
          </div>

          <div className="mt-10">
            <Suspense fallback={<CoursesLoading />}>
              <CoursesContent searchParams={searchParams} />
            </Suspense>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
