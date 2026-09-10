import { createClient } from '@/lib/supabase/server'
import type {
  Course,
  CourseCurriculum,
  CourseDifficulty,
  CourseFilters,
  CourseModule,
  Instructor,
} from '@/lib/types/course'
import {
  parseCourseDifficulty,
  parseLearningType,
} from '@/lib/types/course'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value)
}

type CourseRow = {
  id: string
  title: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  is_published: boolean
  thumbnail_url: string | null
  difficulty: CourseDifficulty | null
  duration_hours: number | null
  learning_type: 'self_paced' | 'one_on_one'
  category: string | null
  is_featured: boolean
  learning_objectives: string[] | null
  certification_requirements: string | null
  instructor: Instructor | Instructor[] | null
}

type ModuleRow = {
  id: string
  title: string
  description: string | null
  sort_order: number
  lessons: {
    id: string
    title: string
    description: string | null
    sort_order: number
    is_published?: boolean
  }[]
}

const COURSE_SELECT = `
  id,
  title,
  slug,
  description,
  short_description,
  price,
  is_published,
  thumbnail_url,
  difficulty,
  duration_hours,
  learning_type,
  category,
  is_featured,
  learning_objectives,
  certification_requirements,
  instructor:profiles!courses_instructor_id_fkey (
    id,
    first_name,
    last_name,
    avatar_url
  )
`

function normalizeInstructor(
  instructor: Instructor | Instructor[] | null
): Instructor | null {
  if (!instructor) return null
  return Array.isArray(instructor) ? instructor[0] ?? null : instructor
}

function mapCourseRow(row: CourseRow, lessonCount = 0): Course {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    short_description: row.short_description,
    price: Number(row.price),
    is_published: row.is_published,
    thumbnail_url: row.thumbnail_url,
    difficulty: row.difficulty,
    duration_hours: row.duration_hours ? Number(row.duration_hours) : null,
    learning_type: row.learning_type,
    category: row.category,
    is_featured: row.is_featured,
    learning_objectives: row.learning_objectives,
    certification_requirements: row.certification_requirements,
    instructor: normalizeInstructor(row.instructor),
    lesson_count: lessonCount,
  }
}

async function countLessonsForCourses(
  supabase: Awaited<ReturnType<typeof createClient>>,
  courseIds: string[]
): Promise<Map<string, number>> {
  const counts = new Map<string, number>()

  if (courseIds.length === 0) return counts

  const { data: modules } = await supabase
    .from('course_modules')
    .select('id, course_id')
    .in('course_id', courseIds)

  if (!modules?.length) {
    courseIds.forEach((id) => counts.set(id, 0))
    return counts
  }

  const moduleIds = modules.map((m) => m.id)
  const moduleToCourse = new Map(modules.map((m) => [m.id, m.course_id]))

  const { data: lessons } = await supabase
    .from('lessons')
    .select('module_id')
    .in('module_id', moduleIds)
    .eq('is_published', true)

  courseIds.forEach((id) => counts.set(id, 0))

  lessons?.forEach((lesson) => {
    const courseId = moduleToCourse.get(lesson.module_id)
    if (courseId) {
      counts.set(courseId, (counts.get(courseId) ?? 0) + 1)
    }
  })

  return counts
}

function applyFilters<
  T extends { eq: (col: string, val: string) => T },
>(query: T, filters?: CourseFilters): T {
  let q = query

  if (filters?.category) {
    q = q.eq('category', filters.category)
  }

  const difficulty = parseCourseDifficulty(filters?.difficulty)
  if (difficulty) {
    q = q.eq('difficulty', difficulty)
  }

  const learningType = parseLearningType(filters?.learning_type)
  if (learningType) {
    q = q.eq('learning_type', learningType)
  }

  return q
}

export async function getPublishedCourses(
  filters?: CourseFilters
): Promise<{ data: Course[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('courses')
    .select(COURSE_SELECT)
    .eq('is_published', true)
    .order('title', { ascending: true })

  query = applyFilters(query, filters)

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  const rows = (data ?? []) as CourseRow[]
  const lessonCounts = await countLessonsForCourses(
    supabase,
    rows.map((r) => r.id)
  )

  let courses = rows.map((row) =>
    mapCourseRow(row, lessonCounts.get(row.id) ?? 0)
  )

  if (filters?.search) {
    const term = filters.search.trim().toLowerCase()
    courses = courses.filter((course) => {
      const instructorName = getInstructorName(course.instructor).toLowerCase()
      return (
        course.title.toLowerCase().includes(term) ||
        course.short_description?.toLowerCase().includes(term) ||
        course.description?.toLowerCase().includes(term) ||
        course.category?.toLowerCase().includes(term) ||
        instructorName.includes(term)
      )
    })
  }

  return { data: courses, error: null }
}

export async function getFeaturedCourses(
  limit = 3
): Promise<{ data: Course[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_SELECT)
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('title', { ascending: true })
    .limit(limit)

  if (error) {
    return { data: [], error: error.message }
  }

  const rows = (data ?? []) as CourseRow[]
  const lessonCounts = await countLessonsForCourses(
    supabase,
    rows.map((r) => r.id)
  )

  return {
    data: rows.map((row) => mapCourseRow(row, lessonCounts.get(row.id) ?? 0)),
    error: null,
  }
}

export async function getPublishedCourseById(
  courseId: string
): Promise<{ data: Course | null; error: string | null }> {
  if (!isUuid(courseId)) {
    return { data: null, error: null }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_SELECT)
    .eq('id', courseId)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return { data: null, error: null }
    }
    return { data: null, error: error.message }
  }

  const row = data as CourseRow
  const lessonCounts = await countLessonsForCourses(supabase, [row.id])

  return {
    data: mapCourseRow(row, lessonCounts.get(row.id) ?? 0),
    error: null,
  }
}

export async function getCourseCurriculum(
  courseId: string
): Promise<{ data: CourseCurriculum | null; error: string | null }> {
  if (!isUuid(courseId)) {
    return { data: null, error: null }
  }

  const supabase = await createClient()

  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('id', courseId)
    .eq('is_published', true)
    .single()

  if (!course) {
    return { data: null, error: null }
  }

  const { data, error } = await supabase
    .from('course_modules')
    .select(
      `
      id,
      title,
      description,
      sort_order,
      lessons (
        id,
        title,
        description,
        sort_order,
        is_published
      )
    `
    )
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true })

  if (error) {
    return { data: null, error: error.message }
  }

  const modules: CourseModule[] = ((data ?? []) as ModuleRow[]).map(
    (module) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      sort_order: module.sort_order,
      lessons: (module.lessons ?? [])
        .filter((lesson) => lesson.is_published !== false)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(({ id, title, description, sort_order }) => ({
          id,
          title,
          description,
          sort_order,
        })),
    })
  )

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  )

  return {
    data: { modules, total_lessons: totalLessons },
    error: null,
  }
}

export function getInstructorName(instructor: Instructor | null): string {
  if (!instructor) return 'AQBAT Instructor'
  const name = [instructor.first_name, instructor.last_name]
    .filter(Boolean)
    .join(' ')
  return name || 'AQBAT Instructor'
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDuration(hours: number | null, lessonCount: number): string {
  const parts: string[] = []
  if (hours) parts.push(`${hours} hrs`)
  if (lessonCount > 0) parts.push(`${lessonCount} lessons`)
  return parts.join(' · ') || 'Flexible duration'
}
