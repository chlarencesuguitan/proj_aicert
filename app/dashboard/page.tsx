import { requireUser } from '@/lib/auth/server'
import { getEnrolledCoursesWithProgress } from '@/lib/courses/progress'
import Link from 'next/link'

export default async function DashboardPage() {
  const { user } = await requireUser()
  const enrolledCourses = await getEnrolledCoursesWithProgress(user.id)

  const inProgress = enrolledCourses.filter((c) => c.progress < 100)
  const completed = enrolledCourses.filter((c) => c.progress === 100)

  return (
    <main>
      <h1>Welcome back{user.email ? `, ${user.email}` : ''}</h1>

      <section>
        <h2>Active Courses</h2>
        {inProgress.length === 0 ? (
          <p>You have no active courses yet.</p>
        ) : (
          <ul>
            {inProgress.map(({ course, progress }) => (
              <li key={course.id}>
                <p>{course.title}</p>
                <p>{progress}% complete</p>
                <Link href={`/learn/${course.id}`}>Continue learning</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Completed Courses</h2>
        {completed.length === 0 ? (
          <p>No completed courses yet.</p>
        ) : (
          <ul>
            {completed.map(({ course }) => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Certificates</h2>
        <p>Coming soon.</p>
      </section>

      <section>
        <h2>Upcoming 1-on-1 Sessions</h2>
        <p>No sessions scheduled.</p>
      </section>

      <form action="/auth/signout" method="post">
        <button type="submit">Log out</button>
      </form>
    </main>
  )
}