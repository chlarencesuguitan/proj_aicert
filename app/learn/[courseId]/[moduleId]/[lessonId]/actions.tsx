'use server'

import { requireUser } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleLessonComplete(
  lessonId: string,
  courseId: string,
  moduleId: string,
  markComplete: boolean
) {
  const { user } = await requireUser()
  const supabase = await createClient()

  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        student_id: user.id,
        lesson_id: lessonId,
        completed: markComplete,
        completed_at: markComplete ? new Date().toISOString() : null,
      },
      { onConflict: 'student_id,lesson_id' }
    )

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/learn/${courseId}/${moduleId}/${lessonId}`)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/courses')
}