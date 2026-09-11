import { createClient } from '@/lib/supabase/server'

export async function checkEnrollment(studentId: string, courseId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enrollments')
    .select('id, status')
    .eq('student_id', studentId)
    .eq('course_id', courseId)
    .eq('status', 'active')
    .maybeSingle()

  if (error || !data) {
    return false
  }

  return true
}