-- ════════════════════════════════════════════════════════════════
-- RadYar – Initiales Datenbank-Schema
-- Migration 0001: Inhalts-Tabellen (Curriculum, MCQs, Flashcards)
--                 + Nutzer-Fortschritts-Tabellen (lösen localStorage ab)
-- ════════════════════════════════════════════════════════════════

-- ─── 1. FACHGEBIETE (z. B. "Abdomen", "Thorax", "MSK") ───────────
create table if not exists fachgebiete (
  id          text primary key,           -- z.B. 'abdomen'
  key         text not null,              -- z.B. 'Abdomen' (Anzeigename)
  icon        text,
  color       text,
  bg          text,
  body_zone   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

comment on table fachgebiete is 'Oberste Ebene des Curriculums – Körperregionen/Fachgebiete';

-- ─── 2. KAPITEL (z. B. "Leber", "Lunge") ─────────────────────────
create table if not exists kapitel (
  id            text primary key,         -- z.B. 'leber'
  fachgebiet_id text not null references fachgebiete(id) on delete cascade,
  title         jsonb not null,           -- { "de": "Leber", "en": "Liver", "fa": "کبد" }
  icon          text,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists idx_kapitel_fachgebiet on kapitel(fachgebiet_id);

-- ─── 3. THEMEN (z. B. "Hämangiom", "Sarkoidose"; mit optionalen Unterthemen) ─
create table if not exists themen (
  id              text primary key,       -- z.B. 'haemangiom'
  kapitel_id      text not null references kapitel(id) on delete cascade,
  parent_id       text references themen(id) on delete cascade,  -- für Unterthemen (sub)
  title           jsonb not null,         -- { "de": ..., "en": ..., "fa": ... }
  tags            text[] not null default '{}',
  diff            int default 1,          -- Schwierigkeitsgrad 1-3

  link            text,                   -- Lern-Seite, z.B. '/abdomen/leber/haemangiom'
  mcq_link        text,
  flashcard_link  text,
  fall_link       text,

  ready           boolean not null default false,
  sort_order      int not null default 0,
  added_at        timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists idx_themen_kapitel on themen(kapitel_id);
create index if not exists idx_themen_parent  on themen(parent_id);
create index if not exists idx_themen_ready   on themen(ready) where ready = true;

-- ─── 4. MCQ-FRAGEN (eine Zeile pro Frage – ALLE Sprachen zusammen!) ──
-- Das verhindert das Problem, das wir hatten: getrennte de/en/fa-Arrays
-- konnten auseinanderlaufen (unterschiedliche Anzahl, fehlende Übersetzungen).
create table if not exists questions (
  id            text primary key,         -- z.B. 'haemangiom-01'
  thema_id      text not null references themen(id) on delete cascade,

  question      jsonb not null,           -- { "de": "...", "en": "...", "fa": "..." }
  options       jsonb not null,           -- [{ "id":"A","text":{"de":...,"en":...,"fa":...} }, ...]
  correct       text not null,            -- z.B. "B"
  explanation   jsonb,                    -- { "de": "...", "en": "...", "fa": "..." }

  created_at    timestamptz default now()
);

create index if not exists idx_questions_thema on questions(thema_id);

-- ─── 5. FLASHCARD-THEMEN (z. B. "Leberhämangiome") ───────────────
create table if not exists flashcard_topics (
  id          text primary key,           -- z.B. 'haemangiom'
  thema_id    text references themen(id) on delete set null,
  area        text,
  chapter     text,
  icon        text,
  icon_image  text,
  color       text,
  href        text,
  title       jsonb not null,
  subtitle    jsonb,
  created_at  timestamptz default now()
);

-- ─── 6. FLASHCARDS ───────────────────────────────────────────────
create table if not exists flashcards (
  id            text primary key,
  topic_id      text not null references flashcard_topics(id) on delete cascade,
  category      jsonb,
  front         jsonb not null,           -- Frage (mehrsprachig)
  back          jsonb not null,           -- kurze Antwort (mehrsprachig)
  explanation   jsonb,
  diagram       text,
  created_at    timestamptz default now()
);

create index if not exists idx_flashcards_topic on flashcards(topic_id);


-- ════════════════════════════════════════════════════════════════
-- NUTZER-FORTSCHRITT (ersetzt localStorage – serverseitig & geräteübergreifend)
-- user_id = Clerk User-ID (text, kein FK – Clerk verwaltet die Nutzer)
-- ════════════════════════════════════════════════════════════════

-- ─── 7. GELESENE KAPITEL / LERN-FORTSCHRITT ──────────────────────
create table if not exists user_progress (
  user_id     text not null,
  thema_id    text not null references themen(id) on delete cascade,
  read_pct    numeric not null default 0,   -- 0.0 – 1.0
  updated_at  timestamptz not null default now(),
  primary key (user_id, thema_id)
);

-- ─── 8. MCQ-ERGEBNISSE ───────────────────────────────────────────
create table if not exists mcq_results (
  user_id     text not null,
  thema_id    text not null,
  fach_id     text,
  attempted   int not null default 0,
  correct     int not null default 0,
  last_date   timestamptz default now(),
  primary key (user_id, thema_id)
);

-- ─── 9. LEITNER-FLASHCARD-FORTSCHRITT ────────────────────────────
create table if not exists leitner_cards (
  user_id           text not null,
  card_id           text not null,
  box               int not null default 1,
  status            text not null default 'active',   -- 'active' | 'mastered'
  added_at          timestamptz default now(),
  last_seen_at      timestamptz,
  last_reviewed_at  timestamptz,
  due_at            timestamptz,
  correct_count     int not null default 0,
  wrong_count       int not null default 0,
  seen_count        int not null default 0,
  primary key (user_id, card_id)
);

create index if not exists idx_leitner_due on leitner_cards(user_id, due_at);


-- ════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Inhalte (Fachgebiete, Kapitel, Themen, Fragen, Flashcards) sind
-- öffentlich LESBAR für alle (auch ohne Login).
-- Nutzer-Fortschrittsdaten sind NUR für den jeweiligen Nutzer sichtbar.
-- ════════════════════════════════════════════════════════════════

alter table fachgebiete       enable row level security;
alter table kapitel           enable row level security;
alter table themen            enable row level security;
alter table questions         enable row level security;
alter table flashcard_topics  enable row level security;
alter table flashcards        enable row level security;
alter table user_progress     enable row level security;
alter table mcq_results       enable row level security;
alter table leitner_cards     enable row level security;

-- Inhalte: öffentlich lesbar (jeder, auch anonym)
create policy "Inhalte sind öffentlich lesbar – fachgebiete"      on fachgebiete      for select using (true);
create policy "Inhalte sind öffentlich lesbar – kapitel"          on kapitel          for select using (true);
create policy "Inhalte sind öffentlich lesbar – themen"           on themen           for select using (true);
create policy "Inhalte sind öffentlich lesbar – questions"        on questions        for select using (true);
create policy "Inhalte sind öffentlich lesbar – flashcard_topics" on flashcard_topics for select using (true);
create policy "Inhalte sind öffentlich lesbar – flashcards"       on flashcards       for select using (true);

-- Hinweis: Schreibrechte auf Inhalts-Tabellen NUR über service_role
-- (also über unser Validierungs-Skript / Backend), nicht direkt vom Client.

-- Nutzer-Fortschritt: jeder Nutzer sieht & bearbeitet NUR seine eigenen Zeilen.
-- Hinweis: auth.jwt() ->> 'sub' enthält die Clerk User-ID, sobald Clerk als
-- JWT-Provider mit Supabase verbunden ist (richten wir in einem späteren Schritt ein).
-- Bis dahin kapseln wir den Zugriff über eine Server-Route mit service_role.

create policy "Nutzer sehen nur eigenen Lernfortschritt" on user_progress
  for select using (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer schreiben nur eigenen Lernfortschritt" on user_progress
  for insert with check (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer aktualisieren nur eigenen Lernfortschritt" on user_progress
  for update using (auth.jwt() ->> 'sub' = user_id);

create policy "Nutzer sehen nur eigene MCQ-Ergebnisse" on mcq_results
  for select using (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer schreiben nur eigene MCQ-Ergebnisse" on mcq_results
  for insert with check (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer aktualisieren nur eigene MCQ-Ergebnisse" on mcq_results
  for update using (auth.jwt() ->> 'sub' = user_id);

create policy "Nutzer sehen nur eigene Leitner-Karten" on leitner_cards
  for select using (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer schreiben nur eigene Leitner-Karten" on leitner_cards
  for insert with check (auth.jwt() ->> 'sub' = user_id);
create policy "Nutzer aktualisieren nur eigene Leitner-Karten" on leitner_cards
  for update using (auth.jwt() ->> 'sub' = user_id);
