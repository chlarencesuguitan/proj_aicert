-- Enable RLS on enrollments and lesson_progress
alter table enrollments enable row level security;
alter table lesson_progress enable row level security;

-- Students can only see their own enrollments
create policy "students read own enrollments"
on enrollments for select
using (student_id = auth.uid());

-- Students can only read/write their own progress
create policy "students read own progress"
on lesson_progress for select
using (student_id = auth.uid());

create policy "students insert own progress"
on lesson_progress for insert
with check (student_id = auth.uid());

create policy "students update own progress"
on lesson_progress for update
using (student_id = auth.uid());

-- Replace the old "anyone can view" lesson policy with an enrollment-gated one
drop policy "Anyone can view published lessons in published courses" on lessons;

create policy "students read lessons if enrolled"
on lessons for select
using (
  is_published = true
  and exists (
    select 1 from course_modules cm
    join enrollments e on e.course_id = cm.course_id
    where cm.id = lessons.module_id
      and e.student_id = auth.uid()
      and e.status = 'active'
  )
);