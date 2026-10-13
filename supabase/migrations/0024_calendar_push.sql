-- Private password-authenticated calendar: only service_role may read/write these tables.
create table if not exists public.calendar_push_subscriptions (
  owner_id text not null,
  endpoint_hash text not null,
  subscription jsonb not null,
  leads integer[] not null default '{1440,30}',
  show_details boolean not null default false,
  enabled_at timestamptz not null default now(),
  last_test_at timestamptz,
  primary key (owner_id, endpoint_hash),
  check (leads <@ array[1440,30])
);
create table if not exists public.calendar_push_health (
  id integer primary key check (id = 1), last_run timestamptz not null
);
create table if not exists public.calendar_push_deliveries (
  owner_id text not null, endpoint_hash text not null, reminder_key text not null,
  status text not null default 'sending' check (status in ('sending','sent','failed')),
  attempts integer not null default 1,
  claimed_at timestamptz not null default now(),
  primary key (owner_id, endpoint_hash, reminder_key)
);
create index if not exists calendar_push_deliveries_age_idx on public.calendar_push_deliveries (claimed_at);
alter table public.calendar_push_subscriptions enable row level security;
alter table public.calendar_push_health enable row level security;
alter table public.calendar_push_deliveries enable row level security;
revoke all on public.calendar_push_subscriptions, public.calendar_push_health, public.calendar_push_deliveries from anon, authenticated;
grant all on public.calendar_push_subscriptions, public.calendar_push_health, public.calendar_push_deliveries to service_role;

-- Atomic lease prevents two overlapping scheduler calls sending the same reminder.
create or replace function public.claim_calendar_push(p_owner text, p_endpoint text, p_key text)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare acquired boolean;
begin
  insert into public.calendar_push_deliveries as d (owner_id, endpoint_hash, reminder_key)
  values (p_owner, p_endpoint, p_key)
  on conflict (owner_id, endpoint_hash, reminder_key) do update
    set status = 'sending', attempts = d.attempts + 1, claimed_at = now()
    where d.status <> 'sent' and d.attempts < 3 and d.claimed_at < now() - interval '1 minute'
  returning true into acquired;
  return coalesce(acquired, false);
end $$;
revoke all on function public.claim_calendar_push(text,text,text) from public, anon, authenticated;
grant execute on function public.claim_calendar_push(text,text,text) to service_role;
