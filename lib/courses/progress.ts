import { createClient } from '@/lib/supabase/server'

export async function getEnrolledCoursesWithProgress(studentId: string) {
  const supabase = await createClient()

  const { data: enrollments, error: enrollErr } = await supabase
    .from('enrollments')
    .select('course_id, status, courses(id, title, thumbnail_url, slug)')
    .eq('student_id', studentId)
    .eq('status', 'active')

  if (enrollErr || !enrollments) return []

  const results = await Promise.all(
    enrollments.map(async (enrollment: any) => {
      const course = enrollment.courses

      // 1. Get all module ids for this course
      const { data: modules } = await supabase
        .from('course_modules')
        .select('id')
        .eq('course_id', enrollment.course_id)

      const moduleIds = (modules ?? []).map((m) => m.id)

      if (moduleIds.length === 0) {
        return { course, progress: 0, totalLessons: 0, completedLessons: 0 }
      }

      // 2. Get all lesson ids under those modules
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .in('module_id', moduleIds)

      const lessonIds = (lessons ?? []).map((l) => l.id)
      const totalLessons = lessonIds.length

      if (totalLessons === 0) {
        return { course, progress: 0, totalLessons: 0, completedLessons: 0 }
      }

      // 3. Count how many of THOSE specific lessons are completed by this student
      const { count: completedLessons } = await supabase
        .from('lesson_progress')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', studentId)
        .eq('completed', true)
        .in('lesson_id', lessonIds)

      const progress = Math.round(((completedLessons ?? 0) / totalLessons) * 100)

      return { course, progress, totalLessons, completedLessons: completedLessons ?? 0 }
    })
  )

  return results
}