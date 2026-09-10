import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getPublishedCourses } from '@/lib/courses/queries'
import {
  parseCourseDifficulty,
  parseLearningType,
} from '@/lib/types/course'
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

function CatalogState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

async function CoursesContent({
  searchParams,
}: {
  searchParams: CoursesPageProps['searchParams']
}) {
  const params = await searchParams
  const search = params.search?.trim() || undefined
  const category = params.category?.trim() || undefined
  const difficulty = parseCourseDifficulty(params.difficulty)
  const learningType = parseLearningType(params.learning_type)

  const hasActiveFilters = Boolean(
    search || category || difficulty || learningType
  )

  const { data: courses, error } = await getPublishedCourses({
    search,
    category,
    difficulty,
    learning_type: learningType,
  })

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

  if (courses.length === 0 && !hasActiveFilters) {
    return (
      <CatalogState
        title="No published courses yet"
        description="Certification programs will appear here once they are published. Check back soon or explore the rest of the platform in the meantime."
      />
    )
  }

  if (courses.length === 0) {
    return (
      <CatalogState
        title="No matching courses"
        description="We could not find a published course that matches your search and filters. Try a different keyword or clear your filters to see all available programs."
        action={
          <Link
            href="/courses"
            className="inline-flex rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-light"
          >
            Clear search and filters
          </Link>
        }
      />
    )
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Showing {courses.length} {courses.length === 1 ? 'course' : 'courses'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} showCertification />
        ))}
      </div>
    </div>
  )
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden py-10 sm:py-14">
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
            <Suspense
              fallback={
                <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />
              }
            >
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
