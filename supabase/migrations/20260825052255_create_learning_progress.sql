/*
   LESSON PROGRESS
   */

create table public.lesson_progress (
    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.profiles(id)
        on delete cascade,

    lesson_id uuid not null
        references public.lessons(id)
        on delete cascade,

    completed boolean not null default false,

    progress_percent numeric(5, 2) not null default 0,

    completed_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint lesson_progress_percent_check
        check (progress_percent >= 0 and progress_percent <= 100),

    unique (student_id, lesson_id)
);


/* 
   QUIZZES
*/

create table public.quizzes (
    id uuid primary key default gen_random_uuid(),

    lesson_id uuid not null
        references public.lessons(id)
        on delete cascade,

    title text not null,
    description text,

    passing_score numeric(5, 2) not null default 70,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint quizzes_passing_score_check
        check (passing_score >= 0 and passing_score <= 100)
);


/*
   QUIZ QUESTIONS
*/

create table public.quiz_questions (
    id uuid primary key default gen_random_uuid(),

    quiz_id uuid not null
        references public.quizzes(id)
        on delete cascade,

    question_text text not null,

    question_type text not null default 'multiple_choice',

    options jsonb,

    correct_answer text,

    points integer not null default 1,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint quiz_questions_type_check
        check (
            question_type in (
                'multiple_choice',
                'true_false'
            )
        ),

    constraint quiz_questions_points_check
        check (points > 0),

    constraint quiz_questions_sort_order_check
        check (sort_order >= 0),

    unique (quiz_id, sort_order)
);


/*
   QUIZ ATTEMPTS
*/

create table public.quiz_attempts (
    id uuid primary key default gen_random_uuid(),

    quiz_id uuid not null
        references public.quizzes(id)
        on delete cascade,

    student_id uuid not null
        references public.profiles(id)
        on delete cascade,

    score numeric(5, 2),

    passed boolean,

    started_at timestamptz not null default now(),
    completed_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint quiz_attempts_score_check
        check (
            score is null
            or (score >= 0 and score <= 100)
        )
);


/*
   UPDATED_AT TRIGGERS
*/

create trigger lesson_progress_updated_at
before update on public.lesson_progress
for each row
execute function public.handle_updated_at();

create trigger quizzes_updated_at
before update on public.quizzes
for each row
execute function public.handle_updated_at();

create trigger quiz_questions_updated_at
before update on public.quiz_questions
for each row
execute function public.handle_updated_at();

create trigger quiz_attempts_updated_at
before update on public.quiz_attempts
for each row
execute function public.handle_updated_at();


/*
   INDEXES
*/

create index idx_lesson_progress_student_id
    on public.lesson_progress(student_id);

create index idx_lesson_progress_lesson_id
    on public.lesson_progress(lesson_id);

create index idx_quizzes_lesson_id
    on public.quizzes(lesson_id);

create index idx_quiz_questions_quiz_id
    on public.quiz_questions(quiz_id);

create index idx_quiz_attempts_quiz_id
    on public.quiz_attempts(quiz_id);

create index idx_quiz_attempts_student_id
    on public.quiz_attempts(student_id);