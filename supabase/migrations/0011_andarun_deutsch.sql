create table if not exists andarun_deutsch_state (
  owner_id   text primary key,
  state      jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists andarun_deutsch_state_updated_idx
  on andarun_deutsch_state (updated_at desc);
