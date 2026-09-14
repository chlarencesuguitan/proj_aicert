import { requireUser } from '@/lib/auth/server'
import { getEnrolledCoursesWithProgress } from '@/lib/courses/progress'
import Link from 'next/link'

export default async function MyCoursesPage() {
  const { user } = await requireUser()
  const enrolledCourses = await getEnrolledCoursesWithProgress(user.id)

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold text-foreground mb-1">My Courses</h1>
      <p className="text-muted text-sm mb-8">All the courses you&apos;re enrolled in.</p>

      {enrolledCourses.length === 0 ? (
        <p className="text-sm text-muted">You haven&apos;t enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {enrolledCourses.map(({ course, progress, totalLessons, completedLessons }) => (
            <div key={course.id} className="bg-surface border border-border rounded-lg p-4">
              <p className="font-medium text-foreground mb-1">{course.title}</p>
              <p className="text-xs text-muted mb-3">
                {completedLessons} / {totalLessons} lessons completed
              </p>

              <div className="h-1.5 bg-background rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-brand rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted mb-3">{progress}% complete</p>

              <Link
                href={`/learn/${course.id}`}
                className="text-sm text-brand font-medium hover:text-brand-dark"
              >
                {progress === 0 ? 'Start course →' : progress === 100 ? 'Review course →' : 'Continue learning →'}
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}