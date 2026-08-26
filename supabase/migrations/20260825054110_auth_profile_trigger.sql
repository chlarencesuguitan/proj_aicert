/*
   CREATE PROFILE AFTER USER SIGNUP
*/

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (
        id,
        email,
        first_name,
        last_name,
        role
    )
    values (
        new.id,
        new.email,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        'student'
    );

    return new;
end;
$$;


create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();