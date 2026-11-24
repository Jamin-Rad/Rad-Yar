-- Keep a compact projection of study time, including deletions, for incremental reads.
create schema mobin_study_sync;
revoke all on schema mobin_study_sync from public, anon, authenticated;
grant usage on schema mobin_study_sync to service_role;

create table mobin_study_sync.clock (
  singleton boolean primary key check (singleton),
  revision bigint not null
);
insert into mobin_study_sync.clock values (true, 1);
create table mobin_study_sync.entries (
  kind text not null,
  id text not null,
  payload jsonb,
  revision bigint not null,
  primary key (kind, id)
);
create index on mobin_study_sync.entries (revision);
alter table mobin_study_sync.clock enable row level security;
alter table mobin_study_sync.entries enable row level security;
grant select, update on mobin_study_sync.clock to service_role;
grant select, insert, update on mobin_study_sync.entries to service_role;

create function mobin_study_sync.project(row_id text, body jsonb)
returns table (kind text, id text, payload jsonb)
language sql immutable security invoker set search_path = '' as $$
  select 'study', row_id, jsonb_build_object(
    'day', body->'day', 'seconds', body->'seconds', 'section', body->'section'
  ) where row_id like 'study-time:%'
  union all
  select 'math', s.key, s.value->'studyDays'
  from jsonb_each(case when row_id = 'mobin-math-exam-v1' and jsonb_typeof(body->'sessions') = 'object'
    then body->'sessions' else '{}'::jsonb end) s
  where jsonb_typeof(s.value->'studyDays') = 'object' and s.value->'studyDays' <> '{}'::jsonb
$$;

create function mobin_study_sync.track() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if (old.id like 'study-time:%' or old.id = 'mobin-math-exam-v1'
      or new.id like 'study-time:%' or new.id = 'mobin-math-exam-v1') is not true then
    return null;
  end if;
  with changes as materialized (
    select kind, id, n.payload
    from mobin_study_sync.project(old.id, old.data) o
    full join mobin_study_sync.project(new.id, new.data) n using (kind, id)
    where o.payload is distinct from n.payload
  ), tick as (
    -- The row lock orders revisions by commit, including writes arriving from different devices.
    update mobin_study_sync.clock set revision = revision + 1
    where singleton and exists (select from changes) returning revision
  )
  insert into mobin_study_sync.entries (kind, id, payload, revision)
  select changes.*, tick.revision from changes cross join tick
  on conflict (kind, id) do update set payload = excluded.payload, revision = excluded.revision;
  return null;
end $$;
create trigger track_mobin_study_time after insert or update or delete on public.mobin_progress
for each row execute function mobin_study_sync.track();

create function mobin_study_sync.track_truncate() returns trigger
language plpgsql security invoker set search_path = '' as $$
declare last_revision bigint;
begin
  update mobin_study_sync.clock set revision = revision + 1 where singleton returning revision into last_revision;
  update mobin_study_sync.entries set payload = null, revision = last_revision where payload is not null;
  return null;
end $$;
create trigger truncate_mobin_study_time after truncate on public.mobin_progress
for each statement execute function mobin_study_sync.track_truncate();

-- Installing the triggers locks writers until the initial snapshot is populated.
insert into mobin_study_sync.entries (kind, id, payload, revision)
select e.*, 1 from public.mobin_progress p cross join lateral mobin_study_sync.project(p.id, p.data) e
where p.id like 'study-time:%' or p.id = 'mobin-math-exam-v1';

create function public.read_mobin_study_time(p_since bigint)
returns jsonb language sql stable security invoker set search_path = '' as $$
  with cutoff as (
    select revision, case when p_since between 1 and revision then p_since else 0 end as since
    from mobin_study_sync.clock where singleton
  )
  select jsonb_build_object(
    'revision', c.revision::text, 'full', c.since = 0,
    'rows', coalesce((
      select jsonb_agg(jsonb_build_array(kind, id, payload))
      from mobin_study_sync.entries
      where revision > c.since and (c.since > 0 or payload is not null)
    ), '[]'::jsonb)
  ) from cutoff c
$$;
revoke all on all functions in schema mobin_study_sync from public, anon, authenticated;
grant execute on all functions in schema mobin_study_sync to service_role;
revoke all on function public.read_mobin_study_time(bigint) from public, anon, authenticated;
grant execute on function public.read_mobin_study_time(bigint) to service_role;
