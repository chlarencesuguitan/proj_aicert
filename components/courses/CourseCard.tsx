import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '@/lib/types/course'
import {
  formatDuration,
  formatPrice,
  getInstructorName,
} from '@/lib/courses/queries'
import {
  COURSE_CATEGORIES,
  DIFFICULTY_LABELS,
  LEARNING_TYPE_LABELS,
} from '@/lib/types/course'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface CourseCardProps {
  course: Course
  variant?: 'default' | 'compact'
}

export function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const categoryLabel = course.category
    ? COURSE_CATEGORIES[course.category] ?? course.category
    : 'AI Certification'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={course.thumbnail_url ?? '/images/hero.png'}
          alt={`${course.title} course thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="brand">{categoryLabel}</Badge>
          {course.difficulty && (
            <Badge>{DIFFICULTY_LABELS[course.difficulty]}</Badge>
          )}
          <Badge variant="outline">
            {LEARNING_TYPE_LABELS[course.learning_type]}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          <Link
            href={`/courses/${course.id}`}
            className="hover:text-brand-dark focus-visible:outline-none"
          >
            {course.title}
          </Link>
        </h3>

        {variant === 'default' && course.short_description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {course.short_description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={course.instructor?.avatar_url ?? '/images/default-profile.png'}
              alt={getInstructorName(course.instructor)}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {getInstructorName(course.instructor)}
            </p>
            <p className="text-xs text-muted">
              {formatDuration(course.duration_hours, course.lesson_count)}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(course.price)}
          </p>
          <Button href={`/courses/${course.id}`} size="sm" variant="outline">
            View Course
          </Button>
        </div>
      </div>
    </article>
  )
}
