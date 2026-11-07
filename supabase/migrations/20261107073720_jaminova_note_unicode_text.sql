-- UI limits use grapheme characters; preserve multi-scalar Unicode text exactly.
alter table public.jaminova_todo_notes drop constraint jaminova_todo_notes_text_check;
alter table public.jaminova_todo_notes add constraint jaminova_todo_notes_text_check check(octet_length(text) <= 65536);
-- Deleted notes keep revision/receipt metadata, not their former text.
create or replace function public.jaminova_write_todo_note(p_owner text, p_id uuid, p_base bigint, p_mutation uuid,
  p_text text, p_done boolean, p_created timestamptz, p_voice text, p_duration double precision, p_delete boolean)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare n public.jaminova_todo_notes; receipt_note uuid;
begin
  if p_owner is null or length(p_owner) = 0 or p_id is null or p_mutation is null or p_base < 0 then
    raise exception 'Invalid note';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(p_owner || ':' || p_id::text, 0));
  select * into n from public.jaminova_todo_notes where owner_id=p_owner and id=p_id for update;
  select note_id into receipt_note from public.jaminova_todo_note_receipts where owner_id=p_owner and mutation_id=p_mutation;
  if receipt_note is not null then
    if receipt_note <> p_id then raise exception 'Mutation reused'; end if;
    return jsonb_build_object('conflict',false,'note',to_jsonb(n));
  end if;
  if (n.id is not null and (n.version <> p_base or n.deleted_at is not null)) or (n.id is null and p_base <> 0) then
    -- A missing positive revision cannot occur with retained tombstones.
    if n.id is null then raise exception 'Unknown note revision'; end if;
    return jsonb_build_object('conflict',true,'note',to_jsonb(n));
  end if;
  if not p_delete and (length(btrim(p_text)) = 0 or octet_length(p_text) > 65536) then raise exception 'Invalid text'; end if;
  if n.id is not null and not p_delete and (n.voice_object is distinct from p_voice or n.voice_duration is distinct from p_duration) then
    raise exception 'Audio is immutable';
  end if;
  if n.id is null then
    insert into public.jaminova_todo_notes(owner_id,id,text,done,created_at,voice_object,voice_duration,deleted_at)
    values(p_owner,p_id,case when p_delete then '' else p_text end,p_done,p_created,p_voice,p_duration,case when p_delete then now() else null end)
    returning * into n;
  else
    update public.jaminova_todo_notes set text=case when p_delete then '' else p_text end,
      done=case when p_delete then false else p_done end, deleted_at=case when p_delete then now() else null end,
      updated_at=now(), version=version+1 where owner_id=p_owner and id=p_id returning * into n;
  end if;
  insert into public.jaminova_todo_note_receipts(owner_id,mutation_id,note_id) values(p_owner,p_mutation,p_id);
  return jsonb_build_object('conflict',false,'note',to_jsonb(n));
end;
$$;
revoke all on function public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean) from public, anon, authenticated;
grant execute on function public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean) to service_role;


