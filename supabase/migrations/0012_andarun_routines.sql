create table if not exists andarun_routines (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  title text not null,
  unit text not null default 'Einheit',
  daily_target numeric not null default 1 check (daily_target > 0),
  color text not null default 'gold' check (color in ('gold', 'rose', 'mint', 'sky', 'violet')),
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists andarun_routine_logs (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references andarun_routines(id) on delete cascade,
  owner_id text not null,
  log_date date not null,
  amount numeric not null default 0 check (amount >= 0),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (routine_id, log_date)
);

create index if not exists andarun_routines_owner_updated_idx
  on andarun_routines (owner_id, updated_at desc);

create index if not exists andarun_routine_logs_owner_date_idx
  on andarun_routine_logs (owner_id, log_date desc);
