-- Run inside a transaction. No patient content is returned, and test copies
-- are rolled back. The source store is never updated.
begin;
do $$
declare
  test_owner text := 'test:case-archive:' || gen_random_uuid()::text;
  before_hash text;
  first_result jsonb;
  second_result jsonb;
  expected_count integer;
  actual_count integer;
  mismatch_count integer;
  first_case text;
  stale_count integer;
begin
  select md5(store::text), jsonb_array_length(coalesce(store->'findings','[]'::jsonb)) into before_hash, expected_count
    from public.admin_budget_state where id='andarun:work';
  if before_hash is null then raise exception 'Source store missing'; end if;
  first_result := public.case_archive_import_fallsammlung(test_owner);
  second_result := public.case_archive_import_fallsammlung(test_owner);
  select count(*) into actual_count from public.andarun_case_archive where owner_id=test_owner;
  if actual_count <> expected_count or (first_result->>'copied')::integer <> expected_count then raise exception 'Copy count mismatch'; end if;
  if second_result->>'alreadyImported' <> 'true' or (second_result->>'copied')::integer <> 0 then raise exception 'Import is not one-time'; end if;
  if before_hash <> (select md5(store::text) from public.admin_budget_state where id='andarun:work') then raise exception 'Original store changed'; end if;
  select count(*) into mismatch_count from public.andarun_case_archive a
    where a.owner_id=test_owner and not exists (
      select 1 from public.admin_budget_state s, jsonb_array_elements(s.store->'findings') f
      where s.id='andarun:work' and f=a.document->'legacyOriginal'
    );
  if mismatch_count <> 0 then raise exception 'Legacy content was not preserved'; end if;
  if has_table_privilege('anon','public.andarun_case_archive','SELECT') or has_table_privilege('authenticated','public.andarun_case_archive','SELECT') then raise exception 'Patient records are exposed'; end if;
  if has_function_privilege('anon','public.case_archive_import_fallsammlung(text)','EXECUTE') or has_function_privilege('authenticated','public.case_archive_import_fallsammlung(text)','EXECUTE') then raise exception 'Import is exposed'; end if;
  if not has_function_privilege('service_role','public.case_archive_import_fallsammlung(text)','EXECUTE') then raise exception 'Server cannot import'; end if;
  if exists(select 1 from public.andarun_case_archive where owner_id=test_owner and (revision <> 1 or document->'patient'->>'name' is distinct from coalesce(document->'legacyOriginal'->>'name',''))) then raise exception 'Patient linkage was lost'; end if;
  select id into first_case from public.andarun_case_archive where owner_id=test_owner limit 1;
  if first_case is not null then
    update public.andarun_case_archive set revision=2 where owner_id=test_owner and id=first_case and revision=1;
    update public.andarun_case_archive set revision=3 where owner_id=test_owner and id=first_case and revision=1;
    get diagnostics stale_count = row_count;
    if stale_count <> 0 then raise exception 'A stale writer overwrote a newer revision'; end if;
  end if;
end;
$$;
rollback;
