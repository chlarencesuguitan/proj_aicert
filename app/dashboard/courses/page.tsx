import { requireUser } from '@/lib/auth/server'
import { getEnrolledCoursesWithProgress } from '@/lib/courses/progress'
import Link from 'next/link'

export default async function MyCoursesPage() {
  const { user } = await requireUser()
  const enrolledCourses = await getEnrolledCoursesWithProgress(user.id)

  return (
    <main>
      <h1>My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <ul>
          {enrolledCourses.map(({ course, progress, totalLessons, completedLessons }) => (
            <li key={course.id}>
              <h2>{course.title}</h2>
              <p>{completedLessons} / {totalLessons} lessons completed ({progress}%)</p>
              <Link href={`/learn/${course.id}`}>
                {progress === 0 ? 'Start course' : progress === 100 ? 'Review course' : 'Continue learning'}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}