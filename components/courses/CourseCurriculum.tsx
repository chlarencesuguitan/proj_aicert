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
    <div className="space-y-4">
      {curriculum.modules.map((module, moduleIndex) => (
        <details
          key={module.id}
          className="group overflow-hidden rounded-2xl border border-border bg-surface"
          open={moduleIndex === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                Module {moduleIndex + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">
                {module.title}
              </h3>
              {module.description && (
                <p className="mt-1 text-sm text-muted">{module.description}</p>
              )}
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {module.lessons.length} lessons
            </span>
          </summary>

          <ul className="border-t border-border">
            {module.lessons.map((lesson, lessonIndex) => (
              <li
                key={lesson.id}
                className="flex items-start gap-4 border-b border-border px-5 py-4 last:border-b-0"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-dark">
                  {lessonIndex + 1}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{lesson.title}</p>
                  {lesson.description && (
                    <p className="mt-1 text-sm text-muted">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}
