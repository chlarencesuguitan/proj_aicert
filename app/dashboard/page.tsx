import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/server'

export default async function DashboardPage() {
  const { user } = await requireUser()

  return (
    <main>
      <h1>Dashboard</h1>

      <p>Authenticated successfully.</p>

      <p>{user.email}</p>

      <form action="/auth/signout" method="post">
        <button type="submit">Log out</button>
      </form>
    </main>
  )
}