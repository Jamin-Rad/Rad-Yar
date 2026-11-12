begin;
create table public.kartino_radyar_pending (
 id uuid primary key default gen_random_uuid(),
 account_id uuid not null references public.kartino_accounts(id) on delete cascade,
 challenge text not null, state text not null, expires_at timestamptz not null,
 clerk_id text, owner_id text, name text
);
create index kartino_radyar_pending_account on public.kartino_radyar_pending(account_id,expires_at);
create table public.kartino_radyar_links (
 id uuid primary key default gen_random_uuid(),
 account_id uuid not null references public.kartino_accounts(id) on delete cascade,
 token_hash text not null unique, clerk_id text not null, owner_id text not null, name text not null,
 expires_at timestamptz not null default now()+interval '180 days'
);
create index kartino_radyar_links_account on public.kartino_radyar_links(account_id);
create table public.kartino_radyar_events (
 link_id uuid not null references public.kartino_radyar_links(id) on delete cascade,
 event_id uuid not null, accepted boolean not null, created_at timestamptz not null default now(),
 primary key(link_id,event_id)
);
alter table public.kartino_radyar_pending enable row level security;
alter table public.kartino_radyar_links enable row level security;
alter table public.kartino_radyar_events enable row level security;
revoke all on public.kartino_radyar_pending, public.kartino_radyar_links, public.kartino_radyar_events from public,anon,authenticated;
grant select,insert,update,delete on public.kartino_radyar_pending, public.kartino_radyar_links, public.kartino_radyar_events to service_role;
create function public.kartino_radyar_exchange(p_id uuid,p_account uuid,p_challenge text,p_token text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare pending public.kartino_radyar_pending; connection public.kartino_radyar_links;
begin
 delete from public.kartino_radyar_pending where id=p_id and account_id=p_account and challenge=p_challenge and expires_at>now() and clerk_id is not null returning * into pending;
 if not found then return null; end if;
 insert into public.kartino_radyar_links(account_id,token_hash,clerk_id,owner_id,name) values(p_account,p_token,pending.clerk_id,pending.owner_id,pending.name) returning * into connection;
 return jsonb_build_object('id',connection.id,'name',connection.name);
end $$;
create function public.kartino_radyar_reviews(p_link uuid,p_owner text,p_events jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare e jsonb; old public.leitner_cards; base timestamptz; reviewed timestamptz; next_box integer; mastered boolean; accepted boolean; affected integer; ack jsonb='[]'; conflicts integer=0;
begin
 if jsonb_typeof(p_events) <> 'array' or jsonb_array_length(p_events)>500 then raise exception 'invalid batch'; end if;
 if not exists(select 1 from public.kartino_radyar_links where id=p_link and owner_id=p_owner and expires_at>now()) then raise exception 'invalid link'; end if;
 perform pg_advisory_xact_lock(hashtextextended(p_owner,0));
 for e in select value from jsonb_array_elements(p_events) loop
  if exists(select 1 from public.kartino_radyar_events where link_id=p_link and event_id=(e->>'id')::uuid) then
   ack=ack||jsonb_build_array(e->>'id');continue;
  end if;
  base=(e->>'baseReviewed')::timestamptz;reviewed=(e->>'reviewed')::timestamptz;
  select * into old from public.leitner_cards where user_id=p_owner and card_id=e->>'cardID' for update;
  accepted=(old.last_reviewed_at is not distinct from base) and (old.last_reviewed_at is null or reviewed>old.last_reviewed_at) and reviewed<=now()+interval '5 minutes';
  if accepted then
   next_box=case when (e->>'known')::boolean then coalesce(old.box,1)+1 else 1 end; mastered=next_box>8;
   insert into public.leitner_cards(user_id,card_id,box,status,added_at,last_seen_at,last_reviewed_at,due_at,correct_count,wrong_count,seen_count)
   values(p_owner,e->>'cardID',least(next_box,8),case when mastered then 'mastered' else 'active' end,coalesce(old.added_at,reviewed),reviewed,reviewed,case when mastered then null else (e->>'due')::timestamptz end,coalesce(old.correct_count,0)+case when (e->>'known')::boolean then 1 else 0 end,coalesce(old.wrong_count,0)+case when (e->>'known')::boolean then 0 else 1 end,coalesce(old.seen_count,0)+1)
   on conflict(user_id,card_id) do update set box=excluded.box,status=excluded.status,last_seen_at=excluded.last_seen_at,last_reviewed_at=excluded.last_reviewed_at,due_at=excluded.due_at,correct_count=excluded.correct_count,wrong_count=excluded.wrong_count,seen_count=excluded.seen_count
   where public.leitner_cards.last_reviewed_at is not distinct from base;
   get diagnostics affected=row_count;
   if affected=0 then accepted=false;conflicts=conflicts+1;end if;
  else conflicts=conflicts+1;
  end if;
  insert into public.kartino_radyar_events(link_id,event_id,accepted) values(p_link,(e->>'id')::uuid,accepted);
  ack=ack||jsonb_build_array(e->>'id');
 end loop;
 return jsonb_build_object('acknowledged',ack,'conflicts',conflicts);
end $$;
-- Existing web clients can retry stale snapshots. Preserve the newer schedule,
-- regardless of whether the update came from the website or a mobile device.
create function public.kartino_guard_leitner_update() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if old.last_reviewed_at is not null and (new.last_reviewed_at is null or new.last_reviewed_at<old.last_reviewed_at) then return old; end if;
 new.correct_count=greatest(new.correct_count,old.correct_count);
 new.wrong_count=greatest(new.wrong_count,old.wrong_count);
 new.seen_count=greatest(new.seen_count,old.seen_count);
 return new;
end $$;
create trigger kartino_guard_leitner_update before update on public.leitner_cards for each row execute function public.kartino_guard_leitner_update();
revoke all on function public.kartino_radyar_exchange(uuid,uuid,text,text),public.kartino_radyar_reviews(uuid,text,jsonb),public.kartino_guard_leitner_update() from public,anon,authenticated;
grant execute on function public.kartino_radyar_exchange(uuid,uuid,text,text),public.kartino_radyar_reviews(uuid,text,jsonb),public.kartino_guard_leitner_update() to service_role;
commit;
