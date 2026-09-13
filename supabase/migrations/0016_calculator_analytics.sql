begin;

create table if not exists public.analytics_calculator_events (
  id bigint generated always as identity primary key,
  visitor_id text not null,
  session_id text not null,
  user_id text,
  tool text not null check (tool in ('node-rads', 'kaiser-score')),
  event text not null check (event in ('view', 'start', 'complete', 'restart', 'recommend_open', 'whatsapp_click', 'copy_link')),
  source text not null default 'direct',
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  occurred_at timestamptz not null default now()
);

create index if not exists idx_calculator_events_tool_time
  on public.analytics_calculator_events (tool, occurred_at desc);
create index if not exists idx_calculator_events_tool_event_time
  on public.analytics_calculator_events (tool, event, occurred_at desc);
create index if not exists idx_calculator_events_visitor_time
  on public.analytics_calculator_events (visitor_id, occurred_at desc);

alter table public.analytics_calculator_events enable row level security;
revoke all on table public.analytics_calculator_events from public, anon, authenticated;
grant select, insert on table public.analytics_calculator_events to service_role;
grant usage, select on sequence public.analytics_calculator_events_id_seq to service_role;

create index if not exists idx_analytics_daily_day on public.analytics_daily(day desc);
create index if not exists idx_analytics_pages_day_path on public.analytics_pages(day desc, path);

commit;
