-- BM SHOP · Supabase schema
-- Run once in the Supabase SQL editor to enable role-based auth.

create table if not exists public.user_roles (
  uid text primary key,
  email text,
  role text not null check (role in ('admin', 'user', 'vendor', 'staff')),
  created_at timestamptz default now()
);

alter table public.user_roles enable row level security;

-- Anyone can read roles (the frontend needs this to render the correct panel).
-- Writes are forbidden from the client; all mutations flow through the
-- SECURITY DEFINER function below.
drop policy if exists "bm_shop_read_roles" on public.user_roles;
create policy "bm_shop_read_roles"
  on public.user_roles for select
  using (true);

drop policy if exists "bm_shop_insert_roles" on public.user_roles;
drop policy if exists "bm_shop_update_own_role" on public.user_roles;

-- ---------------------------------------------------------------------------
-- Role assignment on sign-up
--
-- Identity provider is Firebase — Supabase receives requests as the `anon`
-- role (the anon key is intentionally public). Because the anon key is known
-- to anyone with the frontend bundle, this function MUST NOT be able to mint
-- elevated roles. It therefore only ever assigns `user`, and is idempotent
-- for returning UIDs so it can safely run on every sign-in.
--
-- To promote a user to admin / vendor / staff, run the SQL below in the
-- Supabase SQL editor after they have signed up once (the editor uses the
-- service role, which bypasses these restrictions):
--
--   update public.user_roles
--   set role = 'admin'
--   where email = 'owner@example.com';
--
-- Phase 2 will move this logic behind a Node + Express endpoint that verifies
-- a Firebase ID token using the Admin SDK before touching the table with the
-- service role key. See server/README.md.
-- ---------------------------------------------------------------------------
create or replace function public.assign_role_on_signup(
  p_uid text,
  p_email text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  existing text;
begin
  -- Idempotent fast-path for returning users.
  select role into existing from public.user_roles where uid = p_uid;
  if existing is not null then
    return existing;
  end if;

  -- New sign-ups always start as `user`. Elevation is done out-of-band by
  -- someone with the Supabase service role (see header comment).
  insert into public.user_roles (uid, email, role)
  values (p_uid, p_email, 'user')
  on conflict (uid) do nothing;

  select role into existing from public.user_roles where uid = p_uid;
  return coalesce(existing, 'user');
end;
$$;

revoke all on function public.assign_role_on_signup(text, text) from public;
grant execute on function public.assign_role_on_signup(text, text) to anon, authenticated;
