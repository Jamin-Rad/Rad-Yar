-- A separate private archive. No changes to the Fallsammlung/work store.
-- Filename version matches the migration applied through the Supabase connector.
create table public.andarun_case_archive (
  owner_id text not null,
  id text not null check (id ~ '^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,99}$'),
  document jsonb not null check (jsonb_typeof(document) = 'object' and octet_length(document::text) <= 2000000),
  summary jsonb not null check (jsonb_typeof(summary) = 'object'),
  search_text text not null default '',
  diagnosis_text text not null default '',
  anatomy_text text not null default '',
  modalities text[] not null default '{}',
  source_key text,
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_id, id),
  unique (owner_id, source_key)
);
create index andarun_case_archive_updated_idx on public.andarun_case_archive (owner_id, updated_at desc, id);
create index andarun_case_archive_modalities_idx on public.andarun_case_archive using gin (modalities);

create table public.andarun_case_archive_imports (
  owner_id text not null,
  source text not null,
  source_fingerprint text not null,
  source_count integer not null,
  case_count integer not null,
  completed_at timestamptz not null default now(),
  primary key (owner_id, source)
);

alter table public.andarun_case_archive enable row level security;
alter table public.andarun_case_archive_imports enable row level security;
-- The existing private Jaminova server authenticates the owner. No browser or
-- other authenticated Supabase account can directly read these patient records.
revoke all on public.andarun_case_archive, public.andarun_case_archive_imports from public, anon, authenticated, service_role;
grant select, insert, update on public.andarun_case_archive, public.andarun_case_archive_imports to service_role;

create function public.case_archive_import_fallsammlung(p_owner_id text)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  source_store jsonb;
  previous public.andarun_case_archive_imports%rowtype;
  item jsonb;
  ordinal bigint;
  case_id text;
  study_id text;
  case_title text;
  diagnosis text;
  certainty text;
  exam_date text;
  birth_date text;
  doc jsonb;
  card jsonb;
  search_value text;
  imported_count integer := 0;
  inserted_count integer;
  timestamp_value text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
begin
  if p_owner_id is null or length(p_owner_id) = 0 then
    raise exception 'Owner is required';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('case-archive:fallsammlung:' || p_owner_id, 0));
  select * into previous from public.andarun_case_archive_imports where owner_id = p_owner_id and source = 'fallsammlung';
  if found then
    return jsonb_build_object('alreadyImported', true, 'copied', 0, 'totalCopied', previous.case_count, 'completedAt', previous.completed_at);
  end if;
  select store into source_store from public.admin_budget_state where id = 'andarun:work';
  if not found then raise exception 'Fallsammlung source not found'; end if;
  if jsonb_typeof(coalesce(source_store->'findings', '[]'::jsonb)) <> 'array' then
    raise exception 'Invalid Fallsammlung source';
  end if;

  for item, ordinal in select value, ordinality from jsonb_array_elements(coalesce(source_store->'findings', '[]'::jsonb)) with ordinality loop
    case_id := 'legacy-' || md5(coalesce(item->>'id', '') || ':' || ordinal::text);
    study_id := case_id || '-study';
    diagnosis := coalesce(nullif(item->>'diagnosis',''), item->>'vd', '');
    case_title := coalesce(nullif(diagnosis,''), nullif(left(item->>'question', 180),''), 'Importierter Fall');
    certainty := case when coalesce(item->>'diagnosis','') <> '' then 'confirmed' else 'suspected' end;
    exam_date := case when item->>'examDate' ~ '^\d{4}-\d{2}-\d{2}$' and pg_input_is_valid(item->>'examDate', 'date') then item->>'examDate' else '' end;
    birth_date := case when item->>'birthDate' ~ '^\d{4}-\d{2}-\d{2}$' and pg_input_is_valid(item->>'birthDate', 'date') then item->>'birthDate' else '' end;
    doc := jsonb_build_object(
      'id', case_id, 'title', case_title, 'diagnosis', diagnosis, 'diagnosisEn', '', 'certainty', certainty,
      'organ', coalesce(item->>'organ',''), 'region', coalesce(item->>'examArea',''),
      'patient', jsonb_build_object('name', coalesce(item->>'name',''), 'birthDate', birth_date),
      'historyOriginal', '',
      'studies', jsonb_build_array(jsonb_build_object(
        'id', study_id, 'date', exam_date, 'modality', coalesce(item->>'modality',''),
        'area', coalesce(nullif(item->>'examArea',''),item->>'exam',''),
        'reportOriginal', '', 'reportDe', '', 'reportEn', '', 'localPath', '',
        'radiopaediaUrl', '', 'thumbnailUrl', '', 'publicationStatus', 'not-linked'
      )),
      'followUps', case when coalesce(item->>'question','') <> '' then jsonb_build_array(jsonb_build_object('id', case_id || '-question', 'date', exam_date, 'text', item->>'question')) else '[]'::jsonb end,
      'source', 'fallsammlung', 'sourceKey', 'fallsammlung:' || case_id,
      'legacyOriginal', item, 'createdAt', timestamp_value, 'updatedAt', timestamp_value
    );
    card := jsonb_build_object(
      'id', case_id, 'title', case_title, 'diagnosis', diagnosis, 'diagnosisEn', '', 'certainty', certainty,
      'organ', doc->>'organ', 'region', doc->>'region', 'patient', doc->'patient',
      'modalities', case when coalesce(item->>'modality','') <> '' then jsonb_build_array(item->>'modality') else '[]'::jsonb end,
      'studyCount', 1, 'latestDate', exam_date, 'radiopaediaUrls', '[]'::jsonb, 'thumbnailUrl', '',
      'hasLocalFiles', false, 'source', 'fallsammlung', 'updatedAt', timestamp_value
    );
    search_value := concat_ws(' ', case_title, diagnosis, doc->>'organ', doc->>'region', item->>'name', birth_date,
      case when birth_date <> '' then to_char(birth_date::date, 'DD.MM.YYYY') else '' end, item->>'modality', item->>'exam');
    insert into public.andarun_case_archive(owner_id, id, document, summary, search_text, diagnosis_text, anatomy_text, modalities, source_key)
    values (p_owner_id, case_id, doc, card,
      lower(replace(regexp_replace(normalize(search_value, NFKD), U&'[\0300-\036f]', '', 'g'), 'ß', 'ss')),
      lower(replace(regexp_replace(normalize(case_title || ' ' || diagnosis, NFKD), U&'[\0300-\036f]', '', 'g'), 'ß', 'ss')),
      lower(replace(regexp_replace(normalize(concat_ws(' ', doc->>'organ', doc->>'region', item->>'exam'), NFKD), U&'[\0300-\036f]', '', 'g'), 'ß', 'ss')),
      case when coalesce(item->>'modality','') <> '' then array[item->>'modality'] else '{}'::text[] end,
      'fallsammlung:' || case_id)
    on conflict (owner_id, source_key) do nothing;
    get diagnostics inserted_count = row_count;
    imported_count := imported_count + inserted_count;
  end loop;
  insert into public.andarun_case_archive_imports(owner_id, source, source_fingerprint, source_count, case_count)
  values (p_owner_id, 'fallsammlung', md5(source_store::text), jsonb_array_length(coalesce(source_store->'findings','[]'::jsonb)), imported_count);
  return jsonb_build_object('alreadyImported', false, 'copied', imported_count, 'totalCopied', imported_count, 'completedAt', timestamp_value);
end;
$$;
revoke all on function public.case_archive_import_fallsammlung(text) from public, anon, authenticated;
grant execute on function public.case_archive_import_fallsammlung(text) to service_role;
