import { createClient } from '@/lib/supabase/server'

export default async function TestRLSPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: lessons, error } = await supabase.from('lessons').select('*')

  return (
    <pre style={{ padding: 20, whiteSpace: 'pre-wrap' }}>
      {JSON.stringify({ user: user?.id, lessons, error }, null, 2)}
    </pre>
  )
}