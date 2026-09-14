'use client'

import { useTransition } from 'react'
import { toggleLessonComplete } from './actions'

export function LessonActions({
  lessonId,
  courseId,
  moduleId,
  isCompleted,
}: {
  lessonId: string
  courseId: string
  moduleId: string
  isCompleted: boolean
}) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await toggleLessonComplete(lessonId, courseId, moduleId, !isCompleted)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-6 py-2 rounded-lg text-sm font-medium ${
        isCompleted
          ? 'bg-brand-light/20 text-brand-dark hover:bg-brand-light/30'
          : 'bg-brand text-white hover:bg-brand-dark'
      } disabled:opacity-50`}
    >
      {isPending ? 'Saving...' : isCompleted ? '✓ Completed (click to unmark)' : 'Mark Complete'}
    </button>
  )
}