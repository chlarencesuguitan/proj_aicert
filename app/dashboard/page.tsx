import { requireUser } from '@/lib/auth/server'
import { getEnrolledCoursesWithProgress } from '@/lib/courses/progress'
import Link from 'next/link'

export default async function DashboardPage() {
  const { user } = await requireUser()
  const enrolledCourses = await getEnrolledCoursesWithProgress(user.id)

  const inProgress = enrolledCourses.filter((c) => c.progress < 100)
  const completed = enrolledCourses.filter((c) => c.progress === 100)

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold text-foreground mb-1">
        Welcome back{user.email ? `, ${user.email}` : ''}
      </h1>
      <p className="text-muted text-sm mb-8">Keep learning, keep growing.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-2xl font-semibold text-foreground">{enrolledCourses.length}</p>
          <p className="text-sm text-muted">Enrolled Courses</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-2xl font-semibold text-foreground">{completed.length}</p>
          <p className="text-sm text-muted">Completed Courses</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-2xl font-semibold text-foreground">0</p>
          <p className="text-sm text-muted">Certificates Earned</p>
        </div>
      </div>

      {/* Active courses */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Active Courses</h2>
        {inProgress.length === 0 ? (
          <p className="text-sm text-muted">You have no active courses yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {inProgress.map(({ course, progress }) => (
              <div key={course.id} className="bg-surface border border-border rounded-lg p-4">
                <p className="font-medium text-foreground mb-2">{course.title}</p>
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
                  Continue learning →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed courses */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Completed Courses</h2>
        {completed.length === 0 ? (
          <p className="text-sm text-muted">No completed courses yet.</p>
        ) : (
          <ul className="space-y-2">
            {completed.map(({ course }) => (
              <li
                key={course.id}
                className="bg-surface border border-border rounded-lg p-4 text-foreground font-medium"
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Certificates */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Certificates</h2>
        <p className="text-sm text-muted">Coming soon.</p>
      </section>

      {/* Upcoming sessions */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming 1-on-1 Sessions</h2>
        <p className="text-sm text-muted">No sessions scheduled.</p>
      </section>
    </main>
  )
}