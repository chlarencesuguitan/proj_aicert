create policy "students insert own enrollments"
on enrollments for insert
with check (student_id = auth.uid());