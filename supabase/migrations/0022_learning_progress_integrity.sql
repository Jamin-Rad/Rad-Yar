-- Additive migration: no learning history or analytics rows are deleted.
-- Apply this file specifically; do not replay historical reset migrations.
begin;

alter table public.user_progress add column if not exists change_id text not null default '';
alter table public.user_progress add column if not exists learned_at timestamptz;
update public.user_progress set learned_at = updated_at where read_pct >= 1 and learned_at is null;

create table if not exists public.learning_progress_resets (
  user_id text primary key,
  changed_at timestamptz not null,
  change_id text not null
);
alter table public.learning_progress_resets enable row level security;

create or replace function public.apply_learning_read_progress(
  p_user_id text, p_lookup_ids text[], p_changes jsonb, p_reset jsonb default null
) returns void language plpgsql security definer set search_path = public as $$
declare
  item jsonb; changed timestamptz; change text; old_time timestamptz; old_id text;
  reset_time timestamptz; reset_id text;
begin
  -- Serialize edits/reset for one logical account, including concurrent devices.
  perform pg_advisory_xact_lock(hashtextextended(p_user_id, 2026));
  select changed_at, change_id into reset_time, reset_id
    from learning_progress_resets where user_id = any(p_lookup_ids)
    order by changed_at desc, change_id desc limit 1;
  if p_reset is not null then
    changed := (p_reset->>'changedAt')::timestamptz;
    change := p_reset->>'changeId';
    if reset_time is null or (changed, change) > (reset_time, reset_id) then
      insert into learning_progress_resets values (p_user_id, changed, change)
      on conflict (user_id) do update set changed_at = excluded.changed_at, change_id = excluded.change_id;
      reset_time := changed; reset_id := change;
    end if;
  end if;
  for item in select value from jsonb_array_elements(p_changes) loop
    changed := (item->>'changedAt')::timestamptz;
    change := coalesce(item->>'changeId', '');
    if reset_time is not null and (changed, change) <= (reset_time, reset_id) then continue; end if;
    select updated_at, change_id into old_time, old_id from user_progress
      where user_id = any(p_lookup_ids) and thema_id = item->>'themaId'
      order by updated_at desc, change_id desc limit 1;
    if old_time is not null and (changed, change) <= (old_time, old_id) then continue; end if;
    insert into user_progress (user_id, thema_id, read_pct, updated_at, change_id, learned_at)
    values (p_user_id, item->>'themaId', case when (item->>'read')::boolean then 1 else 0 end,
      changed, change, case when (item->>'read')::boolean then coalesce((item->>'learnedAt')::timestamptz, changed) else null end)
    on conflict (user_id, thema_id) do update set
      read_pct = excluded.read_pct, updated_at = excluded.updated_at,
      change_id = excluded.change_id, learned_at = excluded.learned_at
    where (excluded.updated_at, excluded.change_id) > (user_progress.updated_at, user_progress.change_id);
  end loop;
end;
$$;

create table if not exists public.learning_activity_sources (
  user_id text not null,
  source_id text not null,
  day date not null,
  lessons_seconds bigint not null default 0 check (lessons_seconds >= 0),
  practice_seconds bigint not null default 0 check (practice_seconds >= 0),
  flashcards_seconds bigint not null default 0 check (flashcards_seconds >= 0),
  other_seconds bigint not null default 0 check (other_seconds >= 0),
  visits bigint not null default 0 check (visits >= 0),
  primary key (user_id, source_id, day)
);
create table if not exists public.learning_activity_baselines (
  user_id text not null,
  day date not null,
  active_seconds bigint not null default 0 check (active_seconds >= 0),
  lessons_seconds bigint not null default 0 check (lessons_seconds >= 0),
  practice_seconds bigint not null default 0 check (practice_seconds >= 0),
  flashcards_seconds bigint not null default 0 check (flashcards_seconds >= 0),
  other_seconds bigint not null default 0 check (other_seconds >= 0),
  visits bigint not null default 0 check (visits >= 0),
  primary key (user_id, day)
);
alter table public.learning_activity_sources enable row level security;
alter table public.learning_activity_baselines enable row level security;

-- Freeze the old analytics totals once. New learning time is independent of
-- optional analytics. Existing overlapping browser totals are never added twice.
with daily as (
  select user_id, day, sum(active_seconds) active_seconds, sum(visits) visits
  from public.analytics_daily where user_id is not null group by user_id, day
), pages as (
  select user_id, day,
    sum(active_seconds) filter (where path like '/flashcards%') flashcards,
    sum(active_seconds) filter (where path like '/ueben%' or path like '/mcq%' or path like '/faelle%') practice,
    sum(active_seconds) filter (where path ~ '^/(lernen|abdomen|gehirn|lunge|msk|technik|thorax|wirbelsaeule)(/|$)' or path like '/mamma/bildgebung%') lessons
  from public.analytics_pages where user_id is not null group by user_id, day
)
insert into public.learning_activity_baselines (user_id,day,active_seconds,visits,lessons_seconds,practice_seconds,flashcards_seconds,other_seconds)
select coalesce(d.user_id,p.user_id), coalesce(d.day,p.day),
  greatest(coalesce(d.active_seconds,0),coalesce(p.lessons,0)+coalesce(p.practice,0)+coalesce(p.flashcards,0)),
  coalesce(d.visits,0),coalesce(p.lessons,0),coalesce(p.practice,0),coalesce(p.flashcards,0),
  greatest(0,coalesce(d.active_seconds,0)-coalesce(p.lessons,0)-coalesce(p.practice,0)-coalesce(p.flashcards,0))
from daily d full join pages p using(user_id,day)
on conflict (user_id,day) do nothing;

create or replace function public.sync_learning_activity(
  p_user_id text, p_streams jsonb, p_legacy_days jsonb default '{}'::jsonb
) returns void language plpgsql security definer set search_path = public as $$
declare item jsonb; day_key text;
begin
  for item in select value from jsonb_array_elements(p_streams) loop
    insert into learning_activity_sources (user_id,source_id,day,lessons_seconds,practice_seconds,flashcards_seconds,other_seconds,visits)
    values (p_user_id,item->>'sourceId',(item->>'day')::date,
      coalesce((item->'categories'->>'lessons')::bigint,0), coalesce((item->'categories'->>'practice')::bigint,0),
      coalesce((item->'categories'->>'flashcards')::bigint,0), coalesce((item->'categories'->>'other')::bigint,0),
      coalesce((item->>'visits')::bigint,0))
    on conflict (user_id,source_id,day) do update set
      lessons_seconds = greatest(learning_activity_sources.lessons_seconds,excluded.lessons_seconds),
      practice_seconds = greatest(learning_activity_sources.practice_seconds,excluded.practice_seconds),
      flashcards_seconds = greatest(learning_activity_sources.flashcards_seconds,excluded.flashcards_seconds),
      other_seconds = greatest(learning_activity_sources.other_seconds,excluded.other_seconds),
      visits = greatest(learning_activity_sources.visits,excluded.visits);
  end loop;
  for day_key, item in select key,value from jsonb_each(p_legacy_days) loop
    insert into learning_activity_baselines (user_id,day,active_seconds,lessons_seconds,practice_seconds,flashcards_seconds,other_seconds,visits)
    values (p_user_id,day_key::date,coalesce((item->>'activeSeconds')::bigint,0),
      coalesce((item->'categories'->>'lessons')::bigint,0),coalesce((item->'categories'->>'practice')::bigint,0),
      coalesce((item->'categories'->>'flashcards')::bigint,0),coalesce((item->'categories'->>'other')::bigint,0),coalesce((item->>'visits')::bigint,0))
    on conflict (user_id,day) do update set
      active_seconds = greatest(learning_activity_baselines.active_seconds,excluded.active_seconds),
      lessons_seconds = greatest(learning_activity_baselines.lessons_seconds,excluded.lessons_seconds),
      practice_seconds = greatest(learning_activity_baselines.practice_seconds,excluded.practice_seconds),
      flashcards_seconds = greatest(learning_activity_baselines.flashcards_seconds,excluded.flashcards_seconds),
      other_seconds = greatest(learning_activity_baselines.other_seconds,excluded.other_seconds),
      visits = greatest(learning_activity_baselines.visits,excluded.visits);
  end loop;
end;
$$;

-- Bind old email keys once to an immutable Clerk account. A later account
-- using the same email must not inherit a previous account's learning history.
create table if not exists public.learning_legacy_owners (
  legacy_id text primary key,
  user_id text not null
);
alter table public.learning_legacy_owners enable row level security;
create or replace function public.claim_learning_legacy_ids(p_user_id text, p_legacy_ids text[])
returns text[] language plpgsql security definer set search_path = public as $$
declare legacy text; allowed text[] := '{}';
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id,2026));
  foreach legacy in array p_legacy_ids loop
    insert into learning_legacy_owners values(legacy,p_user_id) on conflict do nothing;
    if exists(select 1 from learning_legacy_owners where legacy_id=legacy and user_id=p_user_id) then
      allowed := array_append(allowed,legacy);
    end if;
  end loop;
  -- Copy, do not delete, so email changes cannot hide existing history.
  insert into user_progress(user_id,thema_id,read_pct,updated_at,change_id,learned_at)
  select distinct on(thema_id) p_user_id,thema_id,read_pct,updated_at,change_id,learned_at
  from user_progress where user_id=any(allowed) order by thema_id,updated_at desc,change_id desc
  on conflict(user_id,thema_id) do update set read_pct=excluded.read_pct,updated_at=excluded.updated_at,change_id=excluded.change_id,learned_at=excluded.learned_at
  where (excluded.updated_at,excluded.change_id)>(user_progress.updated_at,user_progress.change_id);
  insert into learning_progress_resets
  select p_user_id,changed_at,change_id from learning_progress_resets where user_id=any(allowed) order by changed_at desc,change_id desc limit 1
  on conflict(user_id) do update set changed_at=excluded.changed_at,change_id=excluded.change_id
  where (excluded.changed_at,excluded.change_id)>(learning_progress_resets.changed_at,learning_progress_resets.change_id);
  insert into learning_activity_sources
  select p_user_id,source_id,day,max(lessons_seconds),max(practice_seconds),max(flashcards_seconds),max(other_seconds),max(visits)
  from learning_activity_sources where user_id=any(allowed) group by source_id,day
  on conflict(user_id,source_id,day) do update set
    lessons_seconds=greatest(learning_activity_sources.lessons_seconds,excluded.lessons_seconds),practice_seconds=greatest(learning_activity_sources.practice_seconds,excluded.practice_seconds),
    flashcards_seconds=greatest(learning_activity_sources.flashcards_seconds,excluded.flashcards_seconds),other_seconds=greatest(learning_activity_sources.other_seconds,excluded.other_seconds),visits=greatest(learning_activity_sources.visits,excluded.visits)
  where (excluded.lessons_seconds>learning_activity_sources.lessons_seconds or excluded.practice_seconds>learning_activity_sources.practice_seconds or excluded.flashcards_seconds>learning_activity_sources.flashcards_seconds or excluded.other_seconds>learning_activity_sources.other_seconds or excluded.visits>learning_activity_sources.visits);
  insert into learning_activity_baselines
  select p_user_id,day,max(active_seconds),max(lessons_seconds),max(practice_seconds),max(flashcards_seconds),max(other_seconds),max(visits)
  from learning_activity_baselines where user_id=any(allowed) group by day
  on conflict(user_id,day) do update set
    active_seconds=greatest(learning_activity_baselines.active_seconds,excluded.active_seconds),lessons_seconds=greatest(learning_activity_baselines.lessons_seconds,excluded.lessons_seconds),practice_seconds=greatest(learning_activity_baselines.practice_seconds,excluded.practice_seconds),
    flashcards_seconds=greatest(learning_activity_baselines.flashcards_seconds,excluded.flashcards_seconds),other_seconds=greatest(learning_activity_baselines.other_seconds,excluded.other_seconds),visits=greatest(learning_activity_baselines.visits,excluded.visits)
  where (excluded.active_seconds>learning_activity_baselines.active_seconds or excluded.lessons_seconds>learning_activity_baselines.lessons_seconds or excluded.practice_seconds>learning_activity_baselines.practice_seconds or excluded.flashcards_seconds>learning_activity_baselines.flashcards_seconds or excluded.other_seconds>learning_activity_baselines.other_seconds or excluded.visits>learning_activity_baselines.visits);
  return allowed;
end;
$$;

revoke all on public.learning_legacy_owners, public.learning_progress_resets, public.learning_activity_sources, public.learning_activity_baselines from public, anon, authenticated;
grant all on public.learning_legacy_owners to service_role;
grant all on public.learning_progress_resets, public.learning_activity_sources, public.learning_activity_baselines to service_role;
revoke all on function public.apply_learning_read_progress(text,text[],jsonb,jsonb) from public, anon, authenticated;
revoke all on function public.sync_learning_activity(text,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.apply_learning_read_progress(text,text[],jsonb,jsonb) to service_role;
grant execute on function public.sync_learning_activity(text,jsonb,jsonb) to service_role;
revoke all on function public.claim_learning_legacy_ids(text,text[]) from public,anon,authenticated;
grant execute on function public.claim_learning_legacy_ids(text,text[]) to service_role;
commit;
