begin;
set local role service_role;
do $$
declare first_num integer; second_num integer; stored jsonb;
begin
  insert into public.andarun_case_archive(owner_id,id,document,summary)
  values ('synthetic-intake-test','one','{"intakeStatus":"temporary","intakeArea":"Prostata","archiveNumber":999,"psa":{"value":"5.2","date":"2026-11-10"}}','{}')
  returning archive_number into first_num;
  insert into public.andarun_case_archive(owner_id,id,document,summary)
  values ('synthetic-intake-test','two','{"intakeStatus":"temporary"}','{}')
  returning archive_number into second_num;
  if first_num <> 1 or second_num <> 2 then raise exception 'Numbers must start at 1 and increase'; end if;
  update public.andarun_case_archive set document = document || '{"intakeStatus":"complete","archiveNumber":999}', archive_number = 999
  where owner_id='synthetic-intake-test' and id='one'
  returning document into stored;
  if (stored->>'archiveNumber')::integer <> first_num then raise exception 'Number changed on completion'; end if;
  if stored->'psa'->>'value' <> '5.2' then raise exception 'PSA was lost'; end if;
  if not exists (select 1 from public.andarun_case_archive where owner_id='synthetic-intake-test' and id='one' and summary->>'archiveNumber'='1' and search_text like '%#1%') then raise exception 'Number missing from summary/search'; end if;
  insert into public.andarun_case_archive(owner_id,id,document,summary)
  values ('synthetic-intake-test','normal','{}','{}');
  if exists (select 1 from public.andarun_case_archive where owner_id='synthetic-intake-test' and id='normal' and archive_number is not null) then raise exception 'Unrelated cases were numbered'; end if;
  if has_table_privilege('anon','public.andarun_case_archive_counters','SELECT') or has_table_privilege('authenticated','public.andarun_case_archive_counters','SELECT') then raise exception 'Counter is exposed'; end if;
end $$;
rollback;
