-- ════════════════════════════════════════════════════════════════
-- Migration 0004: Content-Erweiterungen für Phase 2 (Fälle, Flashcard-Diagramme)
-- ════════════════════════════════════════════════════════════════

-- ─── 1. FÄLLE (klinische Fallvignetten, data/cases.js) ───────────
create table if not exists cases (
  id          text primary key,
  thema_id    text not null references themen(id) on delete cascade,
  image       text,
  plane       text,
  title       jsonb not null,
  vignette    jsonb not null,
  question    jsonb not null,
  options     jsonb not null,
  correct     text not null,
  explanation jsonb,
  source      text,
  credit      text,
  created_at  timestamptz default now()
);

create index if not exists idx_cases_thema on cases(thema_id);

alter table cases enable row level security;

drop policy if exists "Inhalte sind öffentlich lesbar – cases" on cases;
create policy "Inhalte sind öffentlich lesbar – cases" on cases for select using (true);

-- ─── 2. FLASHCARDS: diagram-Spalte ist mehrsprachig (jsonb), nicht text ──
alter table flashcards alter column diagram type jsonb using
  case when diagram is null then null else to_jsonb(diagram) end;
