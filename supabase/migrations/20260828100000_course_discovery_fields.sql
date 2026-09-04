/*
   COURSE DISCOVERY FIELDS
   Extends the courses table for public website and catalog functionality.
*/

create type public.course_difficulty as enum (
    'beginner',
    'intermediate',
    'advanced'
);

create type public.learning_type as enum (
    'self_paced',
    'one_on_one'
);

alter table public.courses
    add column short_description text,
    add column thumbnail_url text,
    add column difficulty public.course_difficulty,
    add column duration_hours numeric(6, 1),
    add column learning_type public.learning_type not null default 'self_paced',
    add column category text,
    add column instructor_id uuid references public.profiles(id) on delete set null,
    add column is_featured boolean not null default false,
    add column learning_objectives text[],
    add column certification_requirements text;

alter table public.courses
    add constraint courses_duration_hours_non_negative
        check (duration_hours is null or duration_hours >= 0);

create index idx_courses_is_published on public.courses(is_published);
create index idx_courses_is_featured on public.courses(is_featured) where is_featured = true;
create index idx_courses_category on public.courses(category);
create index idx_courses_difficulty on public.courses(difficulty);
create index idx_courses_instructor_id on public.courses(instructor_id);


/*
   PUBLIC READ POLICIES
   Allow anonymous and authenticated users to browse published course content.
*/

create policy "Anyone can view published courses"
on public.courses
for select
to anon, authenticated
using (is_published = true);

create policy "Anyone can view modules of published courses"
on public.course_modules
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.courses
        where courses.id = course_modules.course_id
          and courses.is_published = true
    )
);

create policy "Anyone can view published lessons in published courses"
on public.lessons
for select
to anon, authenticated
using (
    is_published = true
    and exists (
        select 1
        from public.course_modules cm
        join public.courses c on c.id = cm.course_id
        where cm.id = lessons.module_id
          and c.is_published = true
    )
);

create policy "Anyone can view trainer and admin profiles"
on public.profiles
for select
to anon, authenticated
using (role in ('trainer', 'admin'));

grant select on public.courses to anon, authenticated;
grant select on public.course_modules to anon, authenticated;
grant select on public.lessons to anon, authenticated;
grant select on public.profiles to anon, authenticated;
