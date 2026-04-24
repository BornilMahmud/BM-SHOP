-- BM SHOP · Supabase schema
-- Run once in the Supabase SQL editor to enable role-based auth.

create table if not exists public.user_roles (
  uid text primary key,
  email text,
  role text not null check (role in ('admin', 'user', 'vendor', 'staff')),
  created_at timestamptz default now()
);

alter table public.user_roles enable row level security;

-- The table is readable by any authenticated / anon client, but direct writes
-- are forbidden. All inserts/updates must go through the SECURITY DEFINER
-- functions below so role-assignment is atomic and tamper-resistant.
drop policy if exists "bm_shop_read_roles" on public.user_roles;
create policy "bm_shop_read_roles"
  on public.user_roles for select
  using (true);

drop policy if exists "bm_shop_insert_roles" on public.user_roles;
drop policy if exists "bm_shop_update_own_role" on public.user_roles;

-- ---------------------------------------------------------------------------
-- Atomic role assignment
--
-- `assign_role_on_signup` decides and inserts a role for a newly-signed-up
-- Firebase UID in a single SECURITY DEFINER transaction.
--
-- Concurrency:
--   * A transaction-scoped advisory lock serialises concurrent callers so
--     the "is the table empty?" check and the subsequent insert happen
--     without a TOCTOU window. Any number of users can sign up concurrently,
--     but at most one will observe `count = 0` and be minted as admin.
--   * The insert uses `on conflict (uid) do nothing` so a retried call for
--     the same UID is idempotent.
--   * Subsequent admin promotions (e.g. an existing admin updating another
--     user's row) are unaffected because the lock only guards this function.
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
  desired text;
begin
  -- Idempotent fast-path for returning users.
  select role into existing from public.user_roles where uid = p_uid;
  if existing is not null then
    return existing;
  end if;

  -- Serialise the "first user becomes admin" window.
  perform pg_advisory_xact_lock(hashtext('bm_shop.assign_role_on_signup'));

  -- Re-check inside the lock in case another caller just inserted.
  select role into existing from public.user_roles where uid = p_uid;
  if existing is not null then
    return existing;
  end if;

  if (select count(*) from public.user_roles) = 0 then
    desired := 'admin';
  else
    desired := 'user';
  end if;

  insert into public.user_roles (uid, email, role)
  values (p_uid, p_email, desired)
  on conflict (uid) do nothing;

  select role into existing from public.user_roles where uid = p_uid;
  return coalesce(existing, 'user');
end;
$$;

revoke all on function public.assign_role_on_signup(text, text) from public;
grant execute on function public.assign_role_on_signup(text, text) to anon, authenticated;
