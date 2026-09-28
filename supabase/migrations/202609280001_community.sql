-- Scripture in Sound community, profiles, bookmarks, moderation, and privacy-preserving impact events.
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9_]{3,30}$'),
  display_name text not null check (char_length(display_name) between 1 and 60),
  avatar_url text,
  bio text check (char_length(bio) <= 500),
  interests text[] not null default '{}',
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.discussions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 4 and 160),
  body text not null check (char_length(body) between 10 and 10000),
  author_id uuid not null references public.profiles(id) on delete cascade,
  category text not null check (category in ('scripture-interpretation','sound-chanting','practice-reflection','sacred-places','questions','project-feedback')),
  status text not null default 'visible' check (status in ('visible','hidden','locked','removed')),
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.replies (
  id uuid primary key default gen_random_uuid(),
  discussion_id uuid not null references public.discussions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 2 and 10000),
  status text not null default 'visible' check (status in ('visible','hidden','removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.discussion_relations (
  discussion_id uuid not null references public.discussions(id) on delete cascade,
  content_type text not null check (content_type in ('scripture','place','practice','audio','guide')),
  content_id text not null check (char_length(content_id) between 1 and 120),
  primary key (discussion_id, content_type, content_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  content_type text not null check (content_type in ('discussion','reply')),
  content_id uuid not null,
  reason text not null check (char_length(reason) between 4 and 1000),
  status text not null default 'open' check (status in ('open','reviewed','dismissed','actioned')),
  created_at timestamptz not null default now(),
  unique (reporter_id, content_type, content_id)
);

create table public.saved_content (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  content_type text not null check (content_type in ('scripture','place','practice','audio','field-note')),
  content_id text not null check (char_length(content_id) between 1 and 120),
  created_at timestamptz not null default now(),
  primary key (profile_id, content_type, content_id)
);

create table public.analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null check (event_type in ('scripture_view','audio_play','practice_start','place_view','field_note_view')),
  content_id text check (char_length(content_id) <= 120),
  occurred_at timestamptz not null default now()
);

create index discussions_author_idx on public.discussions(author_id);
create index discussions_category_updated_idx on public.discussions(category, updated_at desc);
create index replies_discussion_created_idx on public.replies(discussion_id, created_at);
create index replies_author_idx on public.replies(author_id);
create index relations_content_idx on public.discussion_relations(content_type, content_id);
create index reports_status_idx on public.reports(status, created_at);
create index events_type_date_idx on public.analytics_events(event_type, occurred_at);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger discussions_touch before update on public.discussions for each row execute function public.touch_updated_at();
create trigger replies_touch before update on public.replies for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare base_username text;
begin
  base_username := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1), 'member'), '[^a-zA-Z0-9_]', '', 'g'));
  if char_length(base_username) < 3 then base_username := 'member'; end if;
  insert into public.profiles (user_id, username, display_name)
  values (
    new.id,
    left(base_username, 21) || '_' || left(replace(new.id::text, '-', ''), 8),
    left(coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'Community member'), 60)
  );
  return new;
end; $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_moderator() returns boolean
language sql security definer stable set search_path = '' as $$
  select exists (
    select 1 from public.profiles
    where user_id = (select auth.uid()) and role in ('moderator', 'admin')
  );
$$;

create or replace function public.current_profile_role() returns text
language sql security definer stable set search_path = '' as $$
  select role from public.profiles where user_id = (select auth.uid());
$$;

create or replace function public.current_profile_id() returns uuid
language sql security definer stable set search_path = '' as $$
  select id from public.profiles where user_id = (select auth.uid());
$$;

create or replace function public.enforce_post_cooldown() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_table_name = 'discussions' and exists (
    select 1 from public.discussions where author_id = new.author_id and created_at > now() - interval '15 seconds'
  ) then raise exception 'Please wait before posting again'; end if;
  if tg_table_name = 'replies' and exists (
    select 1 from public.replies where author_id = new.author_id and created_at > now() - interval '10 seconds'
  ) then raise exception 'Please wait before replying again'; end if;
  return new;
end; $$;

create trigger discussions_cooldown before insert on public.discussions for each row execute function public.enforce_post_cooldown();
create trigger replies_cooldown before insert on public.replies for each row execute function public.enforce_post_cooldown();

create or replace function public.protect_moderation_fields() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if public.is_moderator() then return new; end if;
  if tg_table_name = 'discussions' and (new.status is distinct from old.status or new.pinned is distinct from old.pinned) then
    raise exception 'Only moderators can change moderation fields';
  end if;
  if tg_table_name = 'replies' and new.status is distinct from old.status then
    raise exception 'Only moderators can change moderation fields';
  end if;
  return new;
end; $$;

create trigger discussions_protect_moderation before update on public.discussions for each row execute function public.protect_moderation_fields();
create trigger replies_protect_moderation before update on public.replies for each row execute function public.protect_moderation_fields();

create or replace function public.record_impact_event(kind text, item_id text default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if kind not in ('scripture_view','audio_play','practice_start','place_view','field_note_view') then
    raise exception 'Unsupported event';
  end if;
  if item_id is not null and char_length(item_id) > 120 then raise exception 'Invalid item'; end if;
  insert into public.analytics_events(event_type, content_id) values (kind, item_id);
end; $$;

create or replace function public.get_impact_metrics()
returns table(metric text, total bigint) language sql security definer stable set search_path = '' as $$
  select 'registered_users', count(*) from public.profiles
  union all select 'discussions', count(*) from public.discussions where status in ('visible','locked')
  union all select 'replies', count(*) from public.replies where status = 'visible'
  union all select event_type, count(*) from public.analytics_events group by event_type;
$$;

revoke all on function public.is_moderator() from public;
revoke all on function public.current_profile_role() from public;
revoke all on function public.current_profile_id() from public;
grant execute on function public.is_moderator() to authenticated;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.current_profile_id() to authenticated;
grant execute on function public.record_impact_event(text, text) to anon, authenticated;
grant execute on function public.get_impact_metrics() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.discussions enable row level security;
alter table public.replies enable row level security;
alter table public.discussion_relations enable row level security;
alter table public.reports enable row level security;
alter table public.saved_content enable row level security;
alter table public.analytics_events enable row level security;

revoke all on public.profiles, public.discussions, public.replies, public.discussion_relations, public.reports, public.saved_content, public.analytics_events from anon, authenticated;
grant select (id, username, display_name, avatar_url, bio, interests, created_at) on public.profiles to anon, authenticated;
grant select (role) on public.profiles to authenticated;
grant select on public.discussions, public.replies, public.discussion_relations to anon, authenticated;
grant update (username, display_name, avatar_url, bio, interests) on public.profiles to authenticated;
grant insert, update, delete on public.discussions, public.replies to authenticated;
grant insert, delete on public.discussion_relations, public.saved_content to authenticated;
grant select on public.saved_content to authenticated;
grant insert on public.reports to authenticated;
grant select, update on public.reports to authenticated;

create policy "public profiles are readable" on public.profiles for select to anon, authenticated using (true);
create policy "users update own profile" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id and role = public.current_profile_role());

create policy "visible discussions are public" on public.discussions for select to anon, authenticated using (status in ('visible','locked') or author_id = public.current_profile_id() or public.is_moderator());
create policy "users create own discussions" on public.discussions for insert to authenticated with check (author_id = public.current_profile_id() and status = 'visible' and pinned = false);
create policy "authors update own discussions" on public.discussions for update to authenticated using (author_id = public.current_profile_id() or public.is_moderator()) with check (author_id = public.current_profile_id() or public.is_moderator());
create policy "authors delete own discussions" on public.discussions for delete to authenticated using (author_id = public.current_profile_id() or public.is_moderator());

create policy "visible replies are public" on public.replies for select to anon, authenticated using (status = 'visible' or author_id = public.current_profile_id() or public.is_moderator());
create policy "users create own replies" on public.replies for insert to authenticated with check (author_id = public.current_profile_id() and status = 'visible' and exists (select 1 from public.discussions d where d.id = discussion_id and d.status = 'visible'));
create policy "authors update own replies" on public.replies for update to authenticated using (author_id = public.current_profile_id() or public.is_moderator()) with check (author_id = public.current_profile_id() or public.is_moderator());
create policy "authors delete own replies" on public.replies for delete to authenticated using (author_id = public.current_profile_id() or public.is_moderator());

create policy "relations are public" on public.discussion_relations for select to anon, authenticated using (true);
create policy "authors add relations" on public.discussion_relations for insert to authenticated with check (exists (select 1 from public.discussions d where d.id = discussion_id and d.author_id = public.current_profile_id()));
create policy "authors delete relations" on public.discussion_relations for delete to authenticated using (exists (select 1 from public.discussions d where d.id = discussion_id and (d.author_id = public.current_profile_id() or public.is_moderator())));

create policy "users submit reports" on public.reports for insert to authenticated with check (reporter_id = public.current_profile_id() and status = 'open');
create policy "moderators read reports" on public.reports for select to authenticated using (public.is_moderator());
create policy "moderators update reports" on public.reports for update to authenticated using (public.is_moderator()) with check (public.is_moderator());

create policy "users read own saved content" on public.saved_content for select to authenticated using (profile_id = public.current_profile_id());
create policy "users save own content" on public.saved_content for insert to authenticated with check (profile_id = public.current_profile_id());
create policy "users remove own saved content" on public.saved_content for delete to authenticated using (profile_id = public.current_profile_id());

-- analytics_events has no direct read/write policies. Only the narrow RPC functions above can access it.
