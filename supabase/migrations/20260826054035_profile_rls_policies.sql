/*
  PROFILE RLS POLICIES
*/

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (
  id = (select auth.uid())
)
with check (
  id = (select auth.uid())
);


/*
  PREVENT CLIENT-SIDE ROLE ESCALATION

  Authenticated users must not be able to change their own role.
  Trusted server-side operations using the service-role key can
  perform role assignments.
*/

create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if auth.uid() is not null then
      raise exception 'Users cannot change their own role';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_change on public.profiles;

create trigger prevent_profile_role_change
before update on public.profiles
for each row
execute function public.prevent_role_change();