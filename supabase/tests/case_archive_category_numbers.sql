begin;
set local role service_role;
do $$
declare num integer;
begin
  insert into public.andarun_case_archive(owner_id,id,document,summary)
  values ('synthetic-category-test','one','{"intakeStatus":"temporary","intakeArea":"Prostata","requestedArchiveNumber":7}','{}') returning archive_number into num;
  if num <> 7 then raise exception 'Chosen number lost'; end if;
  begin
    insert into public.andarun_case_archive(owner_id,id,document,summary)
    values ('synthetic-category-test','duplicate','{"intakeArea":"Prostata","requestedArchiveNumber":7}','{}');
    raise exception 'Duplicate was accepted';
  exception when unique_violation then null;
  end;
  insert into public.andarun_case_archive(owner_id,id,document,summary)
  values ('synthetic-category-test','different-category','{"intakeArea":"Knie","requestedArchiveNumber":7}','{}') returning archive_number into num;
  if num <> 7 then raise exception 'Same number in separate category rejected'; end if;
  update public.andarun_case_archive set document = document || '{"intakeArea":"Mamma","requestedArchiveNumber":99,"studies":[{"modality":"CT","kind":"prior","assessmentOriginal":"Original Beurteilung"}]}'
  where owner_id='synthetic-category-test' and id='one';
  if not exists (select 1 from public.andarun_case_archive where owner_id='synthetic-category-test' and id='one' and archive_number=7 and document->>'intakeArea'='Prostata' and document->'studies'->0->>'assessmentOriginal'='Original Beurteilung') then raise exception 'Number/category or previous findings lost'; end if;
end $$;
rollback;
