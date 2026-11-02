create table if not exists public.andarun_investment_state (
  owner_id text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint investment_state_is_object check (jsonb_typeof(state) = 'object')
);

alter table public.andarun_investment_state enable row level security;
revoke all on public.andarun_investment_state from public, anon, authenticated;
grant select, insert, update on public.andarun_investment_state to service_role;

comment on table public.andarun_investment_state is
  'Private investment snapshots; authenticated Andarun server routes only. No public policies.';
