begin;

create extension if not exists pgcrypto;

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  title text not null check (char_length(title) between 3 and 160),
  description text not null default '',
  organizer_name text not null default 'آقای دکتر ضیا',
  language text not null default 'fa' check (language in ('fa', 'en', 'de')),
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  duration_minutes integer not null default 30 check (duration_minutes between 1 and 240),
  opens_at timestamptz not null default now(),
  closes_at timestamptz not null default (now() + interval '7 days'),
  pass_percent integer not null default 0 check (pass_percent between 0 and 100),
  show_result boolean not null default true,
  created_by text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint exams_valid_active_window check (closes_at > opens_at),
  constraint exams_organizer_name_length check (char_length(organizer_name) between 2 and 120)
);

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  prompt text not null check (char_length(prompt) between 3 and 4000),
  options jsonb not null,
  correct_option_index smallint not null check (correct_option_index between 0 and 3),
  explanation text not null default '',
  points smallint not null default 1 check (points between 1 and 100),
  position integer not null check (position >= 0),
  created_at timestamptz not null default now(),
  constraint exam_questions_four_options check (
    jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4
  ),
  constraint exam_questions_position_unique unique (exam_id, position),
  constraint exam_questions_explanation_length check (char_length(explanation) <= 8000)
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  participant_name text not null check (char_length(participant_name) between 2 and 120),
  participant_contact text not null check (char_length(participant_contact) between 2 and 254),
  contact_type text not null,
  answers jsonb not null default '{}'::jsonb,
  score integer not null default 0 check (score >= 0),
  max_score integer not null default 0 check (max_score >= 0),
  percentage numeric(5,2) not null default 0 check (percentage between 0 and 100),
  passed boolean not null default false,
  feedback_rating smallint,
  feedback_text text,
  feedback_submitted_at timestamptz,
  started_at timestamptz,
  submitted_at timestamptz not null default now(),
  constraint exam_attempts_contact_type_supported check (contact_type in ('email', 'instagram')),
  constraint exam_attempts_feedback_rating_range check (feedback_rating between 1 and 5),
  constraint exam_attempts_feedback_text_length check (char_length(feedback_text) <= 2000)
);

create index if not exists idx_exam_questions_exam_position
  on public.exam_questions (exam_id, position);

create index if not exists idx_exam_attempts_exam_submitted
  on public.exam_attempts (exam_id, submitted_at desc);

create index if not exists idx_exam_attempts_exam_ranking
  on public.exam_attempts (exam_id, percentage desc, submitted_at asc);

create index if not exists idx_exams_status_code
  on public.exams (status, public_code);

create index if not exists idx_exams_status_window
  on public.exams (status, opens_at, closes_at);

alter table public.exams enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_attempts enable row level security;

revoke all on table public.exams from public, anon, authenticated;
revoke all on table public.exam_questions from public, anon, authenticated;
revoke all on table public.exam_attempts from public, anon, authenticated;

grant select, insert, update, delete on table public.exams to service_role;
grant select, insert, update, delete on table public.exam_questions to service_role;
grant select, insert, update, delete on table public.exam_attempts to service_role;

commit;
