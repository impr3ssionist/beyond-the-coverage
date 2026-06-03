-- Fix Supabase security advisor finding: rls_disabled_in_public.
--
-- This app accesses Supabase from Next.js server routes with the service-role key.
-- Browser clients should not be able to read, update, or delete these tables
-- directly through the public REST API.

begin;

alter table if exists public.contact_requests enable row level security;
alter table if exists public.admin_users enable row level security;

-- Remove direct API access for browser-facing roles. Server-side service-role
-- operations continue to work because the service role bypasses RLS.
revoke all on table public.contact_requests from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;

-- Drop older permissive policies from the setup guides if they were applied.
drop policy if exists "Anyone can submit" on public.contact_requests;
drop policy if exists "Anyone can submit contact form" on public.contact_requests;
drop policy if exists "Only admins view" on public.contact_requests;
drop policy if exists "Only admins can view submissions" on public.contact_requests;
drop policy if exists "Only admins update" on public.contact_requests;
drop policy if exists "Only admins can update submissions" on public.contact_requests;
drop policy if exists "Only owner can view admins" on public.admin_users;
drop policy if exists "Only owner can manage admins" on public.admin_users;

-- Intentionally no anon/authenticated policies:
-- all contact form writes and admin reads/updates go through server routes.

commit;

-- Verification: all rows returned here should show rls_enabled = true.
select
  schemaname,
  tablename,
  rowsecurity as rls_enabled
from pg_tables
where schemaname = 'public'
  and tablename in ('contact_requests', 'admin_users')
order by tablename;
