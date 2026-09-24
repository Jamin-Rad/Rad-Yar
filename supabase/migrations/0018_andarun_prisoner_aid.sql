create table if not exists andarun_prisoner_aid_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table andarun_prisoner_aid_state enable row level security;
