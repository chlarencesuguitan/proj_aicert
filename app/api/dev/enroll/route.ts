import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    if (process.env.NODE_ENV === 'production'){
        return NextResponse.json({ error: 'Not Available in production' }, { status: 403 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user){
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    const { courseId } = await request.json()
    if (!courseId){
        return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase.from('enrollments')
        .upsert(
            { student_id: user.id, course_id: courseId, status: 'active' },
            { onConflict: 'student_id,course_id' }
        )
        .select()

    if (error){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ enrollment: data }, { status: 200 })
}