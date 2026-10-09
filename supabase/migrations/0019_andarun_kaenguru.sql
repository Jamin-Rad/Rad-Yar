create table if not exists andarun_kaenguru_state (
  owner_id text primary key,
  state jsonb not null default '{"version":1,"grade":5,"attempts":{}}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table andarun_kaenguru_state enable row level security;

comment on table andarun_kaenguru_state is
  'Standalone Känguru question attempts and review state for Andarun.';

