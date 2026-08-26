import { requireRole } from '@/lib/auth/server'

export default async function AdminPage() {
  const { user, role } = await requireRole(['admin'])

  return (
    <main>
      <h1>Admin Area</h1>
      <p>Admin authorization successful.</p>
      <p>{user.email}</p>
      <p>Role: {role}</p>
    </main>
  )
}