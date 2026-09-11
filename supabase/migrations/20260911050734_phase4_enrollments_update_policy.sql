create policy "students update own enrollments"
on enrollments for update
using (student_id = auth.uid())
with check (student_id = auth.uid());