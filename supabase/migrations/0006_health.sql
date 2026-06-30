-- ════════════════════════════════════════════════════════════════
-- RadYar – Gesundheits-Tracking (Admin-privat)
-- Migration 0006: Kalorien, Gewicht, Sport, Listen
-- Kein RLS nötig – Zugriff nur über Admin-API-Routen
-- ════════════════════════════════════════════════════════════════

create table if not exists health_records (
  id          text primary key,
  date        date not null unique,
  weight      numeric(4,1),
  note        text,
  manual_kcal int not null default 0,
  sports      jsonb not null default '[]',
  foods       jsonb not null default '[]',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_health_records_date on health_records(date desc);

create table if not exists health_custom_sports (
  id           text primary key,
  de           text not null,
  fa           text not null default '',
  kcal_per_min numeric(4,1) not null,
  created_at   timestamptz not null default now()
);

create table if not exists health_custom_foods (
  id            text primary key,
  de            text not null,
  fa            text not null default '',
  cat           text not null default 'sonstiges',
  kcal_per_100g int not null,
  portion_g     int not null default 100,
  created_at    timestamptz not null default now()
);

-- Tracks which default sports/foods the admin has hidden
create table if not exists health_deleted_ids (
  item_type  text not null,   -- 'sport' or 'food'
  item_id    text not null,
  primary key (item_type, item_id)
);
