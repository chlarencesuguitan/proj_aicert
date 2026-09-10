import type { CourseCurriculum as CourseCurriculumType } from '@/lib/types/course'

interface CourseCurriculumProps {
  curriculum: CourseCurriculumType
}

export function CourseCurriculum({ curriculum }: CourseCurriculumProps) {
  if (curriculum.modules.length === 0) {
    return (
      <p className="text-sm text-muted">
        Curriculum details will be available soon.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {curriculum.modules.map((module, moduleIndex) => (
        <details
          key={module.id}
          className="group overflow-hidden rounded-2xl border border-border bg-surface"
          open={moduleIndex === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                Module {moduleIndex + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                {module.title}
              </h3>
              {module.description && (
                <p className="mt-1 text-sm leading-6 text-muted">
                  {module.description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3 pt-1">
              <span className="rounded-full border border-border bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                {module.lessons.length}{' '}
                {module.lessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
              <span
                aria-hidden="true"
                className="text-muted transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </div>
          </summary>

          <ol className="border-t border-border">
            {module.lessons.map((lesson, lessonIndex) => (
              <li
                key={lesson.id}
                className="flex items-start gap-4 border-b border-border px-5 py-4 last:border-b-0"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                  {lessonIndex + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{lesson.title}</p>
                  {lesson.description && (
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  )
}
