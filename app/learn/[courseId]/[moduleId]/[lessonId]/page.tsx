import { requireUser } from '@/lib/auth/server'
import { checkEnrollment } from '@/lib/courses/access'
import { getCourseStructureWithProgress, getAdjacentLessons } from '@/lib/courses/structure'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { LessonActions } from './lesson-actions'
import { CourseSidebar } from './course-sidebar'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>
}) {
  const { courseId, moduleId, lessonId } = await params
  const { user } = await requireUser()

  const isEnrolled = await checkEnrollment(user.id, courseId)
  if (!isEnrolled) {
    redirect('/dashboard/courses')
  }

  const supabase = await createClient()

  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('id, title, description, content, module_id')
    .eq('id', lessonId)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (error || !lesson) {
    notFound()
  }

  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('id', courseId)
    .maybeSingle()

  const { data: progressRow } = await supabase
    .from('lesson_progress')
    .select('completed')
    .eq('student_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle()

  const isCompleted = progressRow?.completed ?? false

  const structure = await getCourseStructureWithProgress(courseId, user.id)
  const { prev, next } = getAdjacentLessons(structure, lessonId)

  return (
    <div className="flex min-h-screen">
      <CourseSidebar
        courseTitle={course?.title ?? ''}
        structure={structure}
        courseId={courseId}
        currentLessonId={lessonId}
      />

      <div className="flex-1 flex flex-col">
                <main className="flex-1 p-8 pt-16 md:pt-8 max-w-3xl">
          <h1 className="text-2xl font-semibold text-foreground mb-2">{lesson.title}</h1>
          <p className="text-muted mb-6">{lesson.description}</p>
          <div className="prose text-foreground">{lesson.content ?? 'No content yet.'}</div>
        </main>

        <div className="border-t border-border p-4 flex items-center justify-between bg-surface">
          {prev ? (
            <Link
              href={`/learn/${courseId}/${prev.moduleId}/${prev.lessonId}`}
              className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-background"
            >
              Previous
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg border border-border text-sm text-muted cursor-not-allowed">
              Previous
            </span>
          )}

          <LessonActions
            lessonId={lessonId}
            courseId={courseId}
            moduleId={moduleId}
            isCompleted={isCompleted}
          />

          {next ? (
            <Link
              href={`/learn/${courseId}/${next.moduleId}/${next.lessonId}`}
              className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-background"
            >
              Next
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg border border-border text-sm text-muted cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>
    </div>
  )
}