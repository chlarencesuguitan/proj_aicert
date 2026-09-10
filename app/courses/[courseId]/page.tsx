import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  formatDuration,
  formatPrice,
  getCourseCurriculum,
  getInstructorName,
  getPublishedCourseById,
} from '@/lib/courses/queries'
import {
  COURSE_CATEGORIES,
  DIFFICULTY_LABELS,
  LEARNING_TYPE_LABELS,
} from '@/lib/types/course'
import { CourseCurriculum } from '@/components/courses/CourseCurriculum'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { courseId } = await params
  const { data: course } = await getPublishedCourseById(courseId)

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.title,
    description:
      course.short_description ??
      course.description ??
      `Learn ${course.title} with AQBAT AI Certification.`,
    openGraph: {
      title: course.title,
      description: course.short_description ?? undefined,
      type: 'website',
    },
  }
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params

  const [{ data: course, error }, { data: curriculum, error: curriculumError }] =
    await Promise.all([
      getPublishedCourseById(courseId),
      getCourseCurriculum(courseId),
    ])

  if (error || curriculumError) {
    return (
      <>
        <Navbar />
        <main className="overflow-x-hidden py-16">
          <Container>
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            >
              Unable to load this course right now. Please try again later.
            </div>
            <p className="mt-6">
              <Link
                href="/courses"
                className="text-sm font-semibold text-brand-dark hover:underline"
              >
                Back to Courses
              </Link>
            </p>
          </Container>
        </main>
        <Footer />
      </>
    )
  }

  if (!course) {
    notFound()
  }

  const categoryLabel = course.category
    ? COURSE_CATEGORIES[course.category] ?? course.category
    : 'AI Certification'
  const instructorName = getInstructorName(course.instructor)

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <section className="border-b border-border bg-surface py-10 sm:py-14">
          <Container>
            <p className="mb-6 text-sm">
              <Link
                href="/courses"
                className="font-semibold text-brand-dark hover:underline"
              >
                ← Back to Courses
              </Link>
            </p>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="brand">{categoryLabel}</Badge>
                  {course.difficulty && (
                    <Badge>{DIFFICULTY_LABELS[course.difficulty]}</Badge>
                  )}
                  <Badge variant="outline">
                    {LEARNING_TYPE_LABELS[course.learning_type]}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  {course.title}
                </h1>

                {course.description && (
                  <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
                    {course.description}
                  </p>
                )}

                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src={
                        course.instructor?.avatar_url ??
                        '/images/default-profile.png'
                      }
                      alt={instructorName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Instructor</p>
                    <p className="font-semibold text-gray-900">
                      {instructorName}
                    </p>
                  </div>
                </div>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900">
                      {formatDuration(
                        course.duration_hours,
                        course.lesson_count
                      )}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Difficulty
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900">
                      {course.difficulty
                        ? DIFFICULTY_LABELS[course.difficulty]
                        : 'All levels'}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Format
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-gray-900">
                      {LEARNING_TYPE_LABELS[course.learning_type]}
                    </dd>
                  </div>
                </dl>
              </div>

              <aside className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={course.thumbnail_url ?? '/images/hero.png'}
                    alt={`${course.title} course thumbnail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>

                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(course.price)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Full access to course materials and the certification pathway.
                </p>

                <div className="mt-6 space-y-3">
                  <Button
                    href={`/checkout/${course.id}`}
                    size="lg"
                    className="w-full text-white"
                  >
                    Enroll Now
                  </Button>
                  <Button
                    href="/courses"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Back to Courses
                  </Button>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {course.learning_objectives &&
          course.learning_objectives.length > 0 && (
            <section className="border-b border-border py-12 sm:py-16">
              <Container>
                <SectionHeading
                  eyebrow="Overview"
                  title="What You'll Learn"
                  description="Outcomes for this certification program, drawn from the published course record."
                />
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {course.learning_objectives.map((objective) => (
                    <li
                      key={objective}
                      className="flex gap-3 rounded-2xl border border-border bg-surface px-4 py-4 text-sm leading-6 text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand"
                      />
                      {objective}
                    </li>
                  ))}
                </ul>
              </Container>
            </section>
          )}

        <section className="border-b border-border py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Curriculum"
              title="Course curriculum"
              description={
                curriculum
                  ? `${curriculum.modules.length} modules · ${curriculum.total_lessons} published lessons`
                  : 'Structured modules and lessons for this certification program.'
              }
            />
            <div className="mt-8 max-w-4xl">
              {curriculum ? (
                <CourseCurriculum curriculum={curriculum} />
              ) : (
                <p className="text-sm text-muted">
                  Curriculum details are not available yet.
                </p>
              )}
            </div>
          </Container>
        </section>

        <section className="border-b border-border bg-surface py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Credential"
              title="Certification"
              description="This is an informational overview of the certification pathway. Assessments and certificate issuance are not available in this step."
            />
            <div className="mt-8 max-w-3xl rounded-2xl border border-border bg-background p-6">
              {course.certification_requirements && (
                <p className="text-sm leading-7 text-gray-700">
                  {course.certification_requirements}
                </p>
              )}
              <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-700">
                <li>Complete the required course modules and lessons.</li>
                <li>Complete required assessments when they become available.</li>
                <li>Meet the published course completion requirements.</li>
              </ul>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Faculty"
              title="Your instructor"
              description="Learn from a trainer associated with this published program."
            />
            <div className="mt-8 flex max-w-xl items-start gap-4 rounded-2xl border border-border bg-surface p-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={
                    course.instructor?.avatar_url ??
                    '/images/default-profile.png'
                  }
                  alt={instructorName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-gray-900">
                  {instructorName}
                </p>
                <p className="mt-1 text-sm text-muted">AQBAT Trainer</p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
