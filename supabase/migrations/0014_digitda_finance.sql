create table if not exists digitda_finance_state (
  id         text primary key,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table digitda_finance_state enable row level security;
