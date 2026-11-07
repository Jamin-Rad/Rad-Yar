-- Run within a transaction; caller supplies BEGIN/ROLLBACK.
do $$
declare n jsonb; v_note uuid := gen_random_uuid(); m uuid := gen_random_uuid(); m2 uuid := gen_random_uuid();
begin
  if has_table_privilege('anon','public.jaminova_todo_notes','SELECT') or has_table_privilege('authenticated','public.jaminova_todo_notes','SELECT') then raise exception 'Notes exposed'; end if;
  if has_function_privilege('anon','public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean)','EXECUTE') or has_function_privilege('authenticated','public.jaminova_write_todo_note(text,uuid,bigint,uuid,text,boolean,timestamptz,text,double precision,boolean)','EXECUTE') then raise exception 'RPC exposed'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,0,m,'Synthetic note',false,now(),null,null,false);
  if (n->>'conflict')::boolean or (n->'note'->>'version')::int <> 1 then raise exception 'Create'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,1,m2,'Renamed',true,now(),null,null,false);
  if (n->'note'->>'version')::int <> 2 or not (n->'note'->>'done')::boolean then raise exception 'Update'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,0,m,'Synthetic note',false,now(),null,null,false);
  if (n->>'conflict')::boolean or n->'note'->>'text' <> 'Renamed' or (n->'note'->>'version')::int <> 2 then raise exception 'Receipt replay after later edit'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,1,gen_random_uuid(),'Stale',false,now(),null,null,false);
  if not (n->>'conflict')::boolean or n->'note'->>'text' <> 'Renamed' then raise exception 'Conflict lost edits'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-b',v_note,0,gen_random_uuid(),'Other owner',false,now(),null,null,false);
  if (n->>'conflict')::boolean then raise exception 'Owner isolation'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,2,gen_random_uuid(),'',false,now(),null,null,true);
  if n->'note'->>'deleted_at' is null then raise exception 'Delete tombstone'; end if;
  n := public.jaminova_write_todo_note('qa:notes-owner-a',v_note,3,gen_random_uuid(),'Resurrection',false,now(),null,null,false);
  if not (n->>'conflict')::boolean then raise exception 'Deleted note resurrected'; end if;
  if (select text from public.jaminova_todo_notes where owner_id='qa:notes-owner-b' and jaminova_todo_notes.id=v_note) <> 'Other owner' then raise exception 'Other owner modified'; end if;
end $$;
