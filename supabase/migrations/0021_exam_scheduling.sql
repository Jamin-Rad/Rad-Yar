begin;

alter table public.exams
  add column if not exists opens_at timestamptz not null default now();

alter table public.exams
  add column if not exists closes_at timestamptz;

update public.exams
set closes_at = opens_at + interval '7 days'
where closes_at is null;

alter table public.exams
  alter column closes_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'exams_valid_active_window'
      and conrelid = 'public.exams'::regclass
  ) then
    alter table public.exams
      add constraint exams_valid_active_window check (closes_at > opens_at);
  end if;
end
$$;

create index if not exists idx_exams_status_window
  on public.exams (status, opens_at, closes_at);

commit;
