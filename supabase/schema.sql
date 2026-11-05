create table if not exists public.game_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'TY',
  save_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint game_profiles_display_name_length
    check (char_length(display_name) between 1 and 12)
);

alter table public.game_profiles enable row level security;

revoke all on public.game_profiles from public, anon;
grant select, insert, update on public.game_profiles to authenticated;

drop policy if exists "Users can read their own game profile" on public.game_profiles;
create policy "Users can read their own game profile"
  on public.game_profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can create their own game profile" on public.game_profiles;
create policy "Users can create their own game profile"
  on public.game_profiles for insert to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own game profile" on public.game_profiles;
create policy "Users can update their own game profile"
  on public.game_profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);
