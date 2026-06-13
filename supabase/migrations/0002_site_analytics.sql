-- Server-seitige, datensparsame Nutzungsstatistik für das Admin-Dashboard.
-- visitor_id ist eine zufällige Browser-ID; eingeloggte Nutzer werden zusätzlich
-- über ihre Clerk-ID zugeordnet. Es werden keine IP-Adressen gespeichert.

create table if not exists analytics_daily (
  visitor_id      text not null,
  user_id         text,
  day             date not null default current_date,
  visits          int not null default 0,
  page_views      int not null default 0,
  active_seconds  int not null default 0,
  last_seen_at    timestamptz not null default now(),
  primary key (visitor_id, day)
);

create table if not exists analytics_pages (
  visitor_id      text not null,
  user_id         text,
  path            text not null,
  day             date not null default current_date,
  views           int not null default 0,
  active_seconds  int not null default 0,
  last_seen_at    timestamptz not null default now(),
  primary key (visitor_id, path, day)
);

create index if not exists idx_analytics_daily_user on analytics_daily(user_id);
create index if not exists idx_analytics_daily_seen on analytics_daily(last_seen_at desc);
create index if not exists idx_analytics_pages_path on analytics_pages(path);
create index if not exists idx_analytics_pages_user on analytics_pages(user_id);

alter table analytics_daily enable row level security;
alter table analytics_pages enable row level security;

create or replace function record_site_activity(
  p_visitor_id text,
  p_user_id text,
  p_path text,
  p_visits int default 0,
  p_page_views int default 0,
  p_active_seconds int default 0
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into analytics_daily (
    visitor_id, user_id, day, visits, page_views, active_seconds, last_seen_at
  ) values (
    p_visitor_id, p_user_id, current_date,
    greatest(p_visits, 0),
    greatest(p_page_views, 0),
    greatest(p_active_seconds, 0),
    now()
  )
  on conflict (visitor_id, day) do update set
    user_id = coalesce(excluded.user_id, analytics_daily.user_id),
    visits = analytics_daily.visits + excluded.visits,
    page_views = analytics_daily.page_views + excluded.page_views,
    active_seconds = analytics_daily.active_seconds + excluded.active_seconds,
    last_seen_at = now();

  insert into analytics_pages (
    visitor_id, user_id, path, day, views, active_seconds, last_seen_at
  ) values (
    p_visitor_id, p_user_id, p_path, current_date,
    greatest(p_page_views, 0),
    greatest(p_active_seconds, 0),
    now()
  )
  on conflict (visitor_id, path, day) do update set
    user_id = coalesce(excluded.user_id, analytics_pages.user_id),
    views = analytics_pages.views + excluded.views,
    active_seconds = analytics_pages.active_seconds + excluded.active_seconds,
    last_seen_at = now();
end;
$$;

revoke all on function record_site_activity(text, text, text, int, int, int) from public;
