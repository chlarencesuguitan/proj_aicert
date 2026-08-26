/* 
   ENABLE ROW LEVEL SECURITY
*/

alter table public.profiles enable row level security;

alter table public.courses enable row level security;

alter table public.course_modules enable row level security;

alter table public.lessons enable row level security;

alter table public.enrollments enable row level security;

alter table public.lesson_progress enable row level security;

alter table public.quizzes enable row level security;

alter table public.quiz_questions enable row level security;

alter table public.quiz_attempts enable row level security;