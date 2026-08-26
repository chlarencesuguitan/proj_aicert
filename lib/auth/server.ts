import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UserRole = 'student' | 'trainer' | 'admin'

export async function requireUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return { supabase, user }
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return null
  }

  return profile.role as UserRole
}

export async function requireRole(allowedRoles: UserRole[]) {
  const { supabase, user } = await requireUser()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    redirect('/login')
  }

  const role = profile.role as UserRole

  if (!allowedRoles.includes(role)) {
    redirect('/dashboard')
  }

  return {
    supabase,
    user,
    role,
  }
}