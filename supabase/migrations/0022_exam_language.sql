begin;

alter table public.exams
  add column if not exists language text not null default 'fa';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'exams_language_supported'
      and conrelid = 'public.exams'::regclass
  ) then
    alter table public.exams
      add constraint exams_language_supported check (language in ('fa', 'en', 'de'));
  end if;
end
$$;

commit;
