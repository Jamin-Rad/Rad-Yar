-- Separate private health data by owner while keeping existing admin records.

alter table if exists health_records
  add column if not exists owner_id text not null default 'admin';

alter table if exists health_custom_sports
  add column if not exists owner_id text not null default 'admin';

alter table if exists health_custom_foods
  add column if not exists owner_id text not null default 'admin';

alter table if exists health_deleted_ids
  add column if not exists owner_id text not null default 'admin';

alter table if exists health_records
  drop constraint if exists health_records_date_key;

create unique index if not exists idx_health_records_owner_date
  on health_records(owner_id, date);

create index if not exists idx_health_records_owner_date_desc
  on health_records(owner_id, date desc);

create index if not exists idx_health_custom_sports_owner
  on health_custom_sports(owner_id, created_at);

create index if not exists idx_health_custom_foods_owner
  on health_custom_foods(owner_id, created_at);

alter table if exists health_deleted_ids
  drop constraint if exists health_deleted_ids_pkey;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'health_deleted_ids_owner_pkey'
  ) then
    alter table health_deleted_ids
      add constraint health_deleted_ids_owner_pkey primary key (owner_id, item_type, item_id);
  end if;
end $$;
