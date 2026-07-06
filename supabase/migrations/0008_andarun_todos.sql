create extension if not exists pgcrypto;

create table if not exists andarun_todos (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  title text not null,
  note text,
  lane text not null check (lane in ('urgent', 'today', 'watch')),
  deadline date,
  done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table andarun_todos
  add column if not exists completed_at timestamptz;

create index if not exists andarun_todos_owner_updated_idx
  on andarun_todos (owner_id, updated_at desc);
