import { createClient } from '@/lib/supabase/server'

export type CourseLesson = {
  id: string
  title: string
  completed: boolean
}

export type CourseModule = {
  id: string
  title: string
  lessons: CourseLesson[]
}

type RawLesson = {
  id: string
  title: string
  sort_order: number
}

type RawModule = {
  id: string
  title: string
  sort_order: number
  lessons: RawLesson[]
}

export async function getCourseStructureWithProgress(
  courseId: string,
  studentId: string
): Promise<CourseModule[]> {
  const supabase = await createClient()

  const { data: modules } = await supabase
    .from('course_modules')
    .select('id, title, sort_order, lessons(id, title, sort_order)')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true })

  if (!modules) return []

  const { data: progressRows } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('student_id', studentId)

  const completedSet = new Set(
    (progressRows ?? []).filter((p) => p.completed).map((p) => p.lesson_id)
  )

  return (modules as unknown as RawModule[]).map((mod): CourseModule => ({
    id: mod.id,
    title: mod.title,
    lessons: [...mod.lessons]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((lesson): CourseLesson => ({
        id: lesson.id,
        title: lesson.title,
        completed: completedSet.has(lesson.id),
      })),
  }))
}

export function getAdjacentLessons(
  modules: CourseModule[],
  currentLessonId: string
): { prev: { moduleId: string; lessonId: string } | null; next: { moduleId: string; lessonId: string } | null } {
  const flat: { moduleId: string; lessonId: string }[] = []
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      flat.push({ moduleId: mod.id, lessonId: lesson.id })
    }
  }

  const index = flat.findIndex((item) => item.lessonId === currentLessonId)
  if (index === -1) return { prev: null, next: null }

  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  }
}