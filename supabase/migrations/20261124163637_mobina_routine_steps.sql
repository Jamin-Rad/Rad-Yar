-- One lock covers the small batch. Only the addressed checkbox and its version change.
create function public.apply_mobina_routine_steps(p_steps jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  body jsonb;
  logs jsonb;
  versions jsonb;
  step jsonb;
  day_key text;
  routine text;
  pos integer;
  slot text;
  bits jsonb;
  checked boolean;
  stamp text;
  changed boolean := false;
  new_day boolean := false;
  expired text;
  replies jsonb := '[]';
begin
  if jsonb_typeof(p_steps) is distinct from 'array' or jsonb_array_length(p_steps) not between 1 and 64 then
    raise exception 'Invalid routine batch';
  end if;
  select data into body from public.mobin_progress where id = 'mobina-routine' for update;
  if not found then
    insert into public.mobin_progress(id, data) values ('mobina-routine', '{}') on conflict do nothing;
    select data into strict body from public.mobin_progress where id = 'mobina-routine' for update;
  end if;
  logs := coalesce(body->'logs', '{}');
  versions := coalesce(body->'stepVersions', '{}');
  for step in select value from jsonb_array_elements(p_steps) loop
    day_key := step->>'day';
    routine := step->>'routine';
    pos := (step->>'index')::integer;
    slot := routine || ':' || pos;
    stamp := versions #>> array[day_key, slot];
    bits := coalesce(logs #> array[day_key, routine], '[]');
    checked := coalesce(bits->pos = 'true'::jsonb, false);
    if stamp is not distinct from (step->>'base') and checked <> (step->>'checked')::boolean then
      new_day := new_day or not (logs ? day_key);
      while jsonb_array_length(bits) <= pos loop bits := bits || 'false'::jsonb; end loop;
      checked := (step->>'checked')::boolean;
      stamp := step->>'id';
      bits := jsonb_set(bits, array[pos::text], to_jsonb(checked));
      logs := jsonb_set(logs, array[day_key], coalesce(logs->day_key, '{}') || jsonb_build_object(routine, bits));
      versions := jsonb_set(versions, array[day_key], coalesce(versions->day_key, '{}') || jsonb_build_object(slot, stamp));
      changed := true;
    end if;
    replies := replies || jsonb_build_array(jsonb_build_object('checked', checked, 'version', stamp));
  end loop;
  if changed then
    if new_day then
      for expired in select key from jsonb_object_keys(logs) as days(key) order by key desc offset 730 loop
        logs := logs - expired;
        versions := versions - expired;
      end loop;
    end if;
    update public.mobin_progress set data = coalesce(body, '{}') || jsonb_build_object('logs', logs, 'stepVersions', versions),
      updated_at = clock_timestamp() where id = 'mobina-routine';
  end if;
  return replies;
end $$;
revoke all on function public.apply_mobina_routine_steps(jsonb) from public, anon, authenticated;
grant execute on function public.apply_mobina_routine_steps(jsonb) to service_role;
