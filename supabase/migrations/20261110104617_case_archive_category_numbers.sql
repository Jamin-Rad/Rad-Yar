-- User-chosen numbers are unique within each initial intake category.
-- Existing numbers and original case records are preserved.
drop index public.andarun_case_archive_number_idx;
create unique index andarun_case_archive_category_number_idx
on public.andarun_case_archive(owner_id, (coalesce(document->>'intakeArea', '')), archive_number)
where archive_number is not null;

create or replace function public.case_archive_assign_number() returns trigger
language plpgsql security invoker set search_path = '' as $$
declare category text; requested text;
begin
  if TG_OP = 'UPDATE' then
    NEW.archive_number := OLD.archive_number;
    if OLD.archive_number is not null then
      NEW.document := jsonb_set(NEW.document, '{intakeArea}', coalesce(OLD.document->'intakeArea', '""'::jsonb));
      NEW.summary := jsonb_set(NEW.summary, '{intakeArea}', coalesce(OLD.document->'intakeArea', '""'::jsonb));
    end if;
  else
    NEW.archive_number := null;
  end if;
  category := coalesce(NEW.document->>'intakeArea', '');
  if NEW.archive_number is null and (NEW.document->>'intakeStatus' = 'temporary' or category in ('Mamma', 'Knie', 'Schulter', 'Prostata')) then
    perform pg_advisory_xact_lock(hashtextextended(NEW.owner_id || ':case-number:' || category, 0));
    requested := NEW.document->>'requestedArchiveNumber';
    if requested is not null then
      if requested !~ '^[1-9][0-9]{0,8}$' then raise exception 'Invalid file number' using errcode = '22023'; end if;
      NEW.archive_number := requested::integer;
    else
      -- Compatibility with already-open older forms and existing agent clients.
      select coalesce(max(archive_number), 0) + 1 into NEW.archive_number
      from public.andarun_case_archive where owner_id = NEW.owner_id and coalesce(document->>'intakeArea', '') = category;
    end if;
  end if;
  NEW.document := NEW.document - 'requestedArchiveNumber';
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
