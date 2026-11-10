-- Private, stable image numbers for temporary intake. Fallsammlung is untouched.
alter table public.andarun_case_archive add column archive_number integer check (archive_number > 0);
create unique index andarun_case_archive_number_idx on public.andarun_case_archive(owner_id, archive_number) where archive_number is not null;
create table public.andarun_case_archive_counters (
  owner_id text primary key,
  last_number integer not null check (last_number > 0)
);
alter table public.andarun_case_archive_counters enable row level security;
revoke all on public.andarun_case_archive_counters from public, anon, authenticated, service_role;
grant select, insert, update on public.andarun_case_archive_counters to service_role;

create function public.case_archive_assign_number() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  -- Never trust a number supplied by an API client, including on later edits.
  if TG_OP = 'UPDATE' then
    NEW.archive_number := OLD.archive_number;
  else
    NEW.archive_number := null;
  end if;
  if NEW.archive_number is null and (
    NEW.document->>'intakeStatus' = 'temporary' or
    NEW.document->>'intakeArea' in ('Mamma', 'Knie', 'Schulter', 'Prostata')
  ) then
    -- Atomic per-owner allocation, rolled back together with a failed save.
    insert into public.andarun_case_archive_counters(owner_id, last_number)
    values (NEW.owner_id, 1)
    on conflict (owner_id) do update
      set last_number = public.andarun_case_archive_counters.last_number + 1
    returning last_number into NEW.archive_number;
  end if;
  if NEW.archive_number is not null then
    NEW.document := jsonb_set(NEW.document, '{archiveNumber}', to_jsonb(NEW.archive_number));
    NEW.summary := jsonb_set(NEW.summary, '{archiveNumber}', to_jsonb(NEW.archive_number));
    NEW.search_text := NEW.search_text || ' #' || NEW.archive_number::text;
  else
    NEW.document := NEW.document - 'archiveNumber';
    NEW.summary := NEW.summary - 'archiveNumber';
  end if;
  return NEW;
end;
$$;
revoke all on function public.case_archive_assign_number() from public, anon, authenticated;
grant execute on function public.case_archive_assign_number() to service_role;
create trigger case_archive_number_before_write before insert or update on public.andarun_case_archive
for each row execute function public.case_archive_assign_number();
