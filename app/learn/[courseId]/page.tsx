import { requireUser } from '@/lib/auth/server'
import { checkEnrollment } from '@/lib/courses/access'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const { user } = await requireUser()

  const isEnrolled = await checkEnrollment(user.id, courseId)
  if (!isEnrolled) {
    redirect('/dashboard/courses')
  }

  const supabase = await createClient()

  // Find the first module (by sort_order), then its first lesson
  const { data: firstModule } = await supabase
    .from('course_modules')
    .select('id')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!firstModule) {
    notFound()
  }

  const { data: firstLesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('module_id', firstModule.id)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (!firstLesson) {
    notFound()
  }

  redirect(`/learn/${courseId}/${firstModule.id}/${firstLesson.id}`)
}