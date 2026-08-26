/* 
   USER ROLES
 */

create type public.user_role as enum (
    'student',
    'trainer',
    'admin'
);


/* 
   UPDATED_AT FUNCTION
 */

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


/* 
   PROFILES
 */

create table public.profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    email text unique,

    first_name text,
    last_name text,

    role public.user_role not null default 'student',

    avatar_url text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


/* 
   COURSES
*/

create table public.courses (
    id uuid primary key default gen_random_uuid(),

    title text not null,
    slug text not null unique,
    description text,

    price numeric(10, 2) not null default 0,
    is_published boolean not null default false,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint courses_price_non_negative
        check (price >= 0)
);


/*
   COURSE MODULES
*/

create table public.course_modules (
    id uuid primary key default gen_random_uuid(),

    course_id uuid not null
        references public.courses(id)
        on delete cascade,

    title text not null,
    description text,

    sort_order integer not null default 0,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint course_modules_sort_order_non_negative
        check (sort_order >= 0),

    unique (course_id, sort_order)
);


/*
   LESSONS
*/

create table public.lessons (
    id uuid primary key default gen_random_uuid(),

    module_id uuid not null
        references public.course_modules(id)
        on delete cascade,

    title text not null,
    description text,

    content text,

    sort_order integer not null default 0,

    is_published boolean not null default false,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint lessons_sort_order_non_negative
        check (sort_order >= 0),

    unique (module_id, sort_order)
);


/*
   ENROLLMENTS
*/

create table public.enrollments (
    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.profiles(id)
        on delete cascade,

    course_id uuid not null
        references public.courses(id)
        on delete cascade,

    enrolled_at timestamptz not null default now(),

    status text not null default 'active',

    completed_at timestamptz,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    constraint enrollments_status_check
        check (status in ('active', 'completed', 'cancelled')),

    unique (student_id, course_id)
);


/*
   UPDATED_AT TRIGGERS
*/

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

create trigger courses_updated_at
before update on public.courses
for each row
execute function public.handle_updated_at();

create trigger course_modules_updated_at
before update on public.course_modules
for each row
execute function public.handle_updated_at();

create trigger lessons_updated_at
before update on public.lessons
for each row
execute function public.handle_updated_at();

create trigger enrollments_updated_at
before update on public.enrollments
for each row
execute function public.handle_updated_at();


/* 
   INDEXES
*/

create index idx_course_modules_course_id
    on public.course_modules(course_id);

create index idx_lessons_module_id
    on public.lessons(module_id);

create index idx_enrollments_student_id
    on public.enrollments(student_id);

create index idx_enrollments_course_id
    on public.enrollments(course_id);