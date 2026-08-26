import { requireRole } from '@/lib/auth/server'

export default async function TrainerPage() {
  const { user, role } = await requireRole(['trainer', 'admin'])

  return (
    <main>
      <h1>Trainer Area</h1>
      <p>Trainer authorization successful.</p>
      <p>{user.email}</p>
      <p>Role: {role}</p>
    </main>
  )
}