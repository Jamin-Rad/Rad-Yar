-- Private password-identity notes. Only the authenticated application server can access them.
create table public.jaminova_todo_notes (
  owner_id text not null,
  id uuid not null,
  text text not null check (char_length(text) <= 500),
  done boolean not null default false,
  created_at timestamptz not null,
  updated_at timestamptz not null default now(),
  version bigint not null default 1 check (version > 0),
  deleted_at timestamptz,
  voice_object text,
  voice_duration double precision,
  primary key (owner_id, id),
  check ((voice_object is null and voice_duration is null) or
    (voice_object is not null and voice_duration > 0 and voice_duration <= 601))
);
alter table public.jaminova_todo_notes enable row level security;
revoke all on public.jaminova_todo_notes from public, anon, authenticated;
grant select, insert, update, delete on public.jaminova_todo_notes to service_role;

create table public.jaminova_todo_note_receipts (
  owner_id text not null,
  mutation_id uuid not null,
  note_id uuid not null,
  primary key (owner_id, mutation_id),
  foreign key (owner_id, note_id) references public.jaminova_todo_notes(owner_id, id)
);
alter table public.jaminova_todo_note_receipts enable row level security;
revoke all on public.jaminova_todo_note_receipts from public, anon, authenticated;
grant select, insert, delete on public.jaminova_todo_note_receipts to service_role;

-- Serialize each note, compare revisions, and retain mutation receipts across later edits.
create function public.jaminova_write_todo_note(p_owner text, p_id uuid, p_base bigint, p_mutation uuid,
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
  if not p_delete and (length(btrim(p_text)) = 0 or length(p_text) > 500) then raise exception 'Invalid text'; end if;
  if n.id is not null and not p_delete and (n.voice_object is distinct from p_voice or n.voice_duration is distinct from p_duration) then
    raise exception 'Audio is immutable';
  end if;
  if n.id is null then
    insert into public.jaminova_todo_notes(owner_id,id,text,done,created_at,voice_object,voice_duration,deleted_at)
    values(p_owner,p_id,case when p_delete then '' else p_text end,p_done,p_created,p_voice,p_duration,case when p_delete then now() else null end)
    returning * into n;
  else
    update public.jaminova_todo_notes set text=case when p_delete then text else p_text end,
      done=case when p_delete then done else p_done end, deleted_at=case when p_delete then now() else null end,
      updated_at=now(), version=version+1 where owner_id=p_owner and id=p_id returning * into n;
  end if;
  insert into public.jaminova_todo_note_receipts(owner_id,mutation_id,note_id) values(p_owner,p_mutation,p_id);
  return jsonb_build_object('conflict',false,'note',to_jsonb(n));
end;
$$;
revoke all on function public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean) from public, anon, authenticated;
grant execute on function public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('jaminova-notes-audio','jaminova-notes-audio',false,8388608,array['audio/mp4','audio/x-m4a'])
on conflict(id) do nothing;
-- No storage.objects policies: server-issued, short-lived URLs are the only client access.
