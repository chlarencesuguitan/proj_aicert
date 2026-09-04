export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced'

export type LearningType = 'self_paced' | 'one_on_one'

export interface Instructor {
  id: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

export interface Course {
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
  learning_type: LearningType
  category: string | null
  is_featured: boolean
  learning_objectives: string[] | null
  certification_requirements: string | null
  instructor: Instructor | null
  lesson_count: number
}

export interface CourseLesson {
  id: string
  title: string
  description: string | null
  sort_order: number
}

export interface CourseModule {
  id: string
  title: string
  description: string | null
  sort_order: number
  lessons: CourseLesson[]
}

export interface CourseCurriculum {
  modules: CourseModule[]
  total_lessons: number
}

export interface CourseFilters {
  search?: string
  category?: string
  difficulty?: CourseDifficulty
  learning_type?: LearningType
}

export const COURSE_CATEGORIES: Record<string, string> = {
  'ai-fundamentals': 'AI Fundamentals',
  'machine-learning': 'Machine Learning',
  'data-science': 'Data Science',
  'prompt-engineering': 'Prompt Engineering',
  'ai-ethics': 'AI Ethics',
}

export const DIFFICULTY_LABELS: Record<CourseDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const LEARNING_TYPE_LABELS: Record<LearningType, string> = {
  self_paced: 'Self-Paced',
  one_on_one: '1-on-1 Training',
}
