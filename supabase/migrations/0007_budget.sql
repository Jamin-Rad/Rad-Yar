-- ════════════════════════════════════════════════════════════════
-- RadYar – Private Finanzen (Admin-privat)
-- Migration 0007: Budget/Finanzen als online gespeicherter JSON-State
-- Kein RLS nötig – Zugriff nur über Admin-API-Routen
-- ════════════════════════════════════════════════════════════════

create table if not exists admin_budget_state (
  id           text primary key default 'default',
  store        jsonb not null default '{}',
  recurring    jsonb not null default '[]',
  cat_budgets  jsonb not null default '{}',
  categories   jsonb not null default '[]',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

