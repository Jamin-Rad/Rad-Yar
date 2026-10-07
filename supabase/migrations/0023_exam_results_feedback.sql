begin;

alter table public.exams
  add column if not exists organizer_name text not null default 'آقای دکتر ضیا';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'exams_organizer_name_length'
      and conrelid = 'public.exams'::regclass
  ) then
    alter table public.exams
      add constraint exams_organizer_name_length check (char_length(organizer_name) between 2 and 120);
  end if;
end
$$;

alter table public.exam_questions
  add column if not exists explanation text not null default '';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'exam_questions_explanation_length'
      and conrelid = 'public.exam_questions'::regclass
  ) then
    alter table public.exam_questions
      add constraint exam_questions_explanation_length check (char_length(explanation) <= 8000);
  end if;
end
$$;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'exam_attempts'
      and column_name = 'participant_email'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'exam_attempts'
      and column_name = 'participant_contact'
  ) then
    alter table public.exam_attempts rename column participant_email to participant_contact;
  end if;
end
$$;

alter table public.exam_attempts
  add column if not exists contact_type text not null default 'email',
  add column if not exists feedback_rating smallint,
  add column if not exists feedback_text text,
  add column if not exists feedback_submitted_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'exam_attempts_contact_type_supported'
      and conrelid = 'public.exam_attempts'::regclass
  ) then
    alter table public.exam_attempts
      add constraint exam_attempts_contact_type_supported check (contact_type in ('email', 'instagram'));
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'exam_attempts_feedback_rating_range'
      and conrelid = 'public.exam_attempts'::regclass
  ) then
    alter table public.exam_attempts
      add constraint exam_attempts_feedback_rating_range check (feedback_rating between 1 and 5);
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'exam_attempts_feedback_text_length'
      and conrelid = 'public.exam_attempts'::regclass
  ) then
    alter table public.exam_attempts
      add constraint exam_attempts_feedback_text_length check (char_length(feedback_text) <= 2000);
  end if;
end
$$;

create index if not exists idx_exam_attempts_exam_ranking
  on public.exam_attempts (exam_id, percentage desc, submitted_at asc);

commit;
