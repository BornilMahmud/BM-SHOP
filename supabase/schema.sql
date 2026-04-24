-- BM SHOP · Supabase schema
-- Run once in the Supabase SQL editor to enable role-based auth.

create table if not exists public.user_roles (
  uid text primary key,
  email text,
  role text not null check (role in ('admin', 'user', 'vendor', 'staff')),
  created_at timestamptz default now()
);

alter table public.user_roles enable row level security;

-- MVP RLS: anon can read and insert rows keyed by Firebase UID.
-- For production, tighten this: verify Firebase JWT on a server and use the
-- service_role key for writes. See server/README.md.
drop policy if exists "bm_shop_read_roles" on public.user_roles;
create policy "bm_shop_read_roles"
  on public.user_roles for select
  using (true);

drop policy if exists "bm_shop_insert_roles" on public.user_roles;
create policy "bm_shop_insert_roles"
  on public.user_roles for insert
  with check (true);

drop policy if exists "bm_shop_update_own_role" on public.user_roles;
create policy "bm_shop_update_own_role"
  on public.user_roles for update
  using (true)
  with check (true);
