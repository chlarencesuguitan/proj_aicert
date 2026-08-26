import { requireUser } from '@/lib/auth/server'

export default async function LearnPage() {
  const { user } = await requireUser()

  return (
    <main>
      <h1>Learning</h1>
      <p>Authenticated users can access learning.</p>
      <p>{user.email}</p>
    </main>
  )
}