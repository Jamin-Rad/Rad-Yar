-- Cumulative totals let a later exit retry a lost acknowledgement safely.
create table public.analytics_exit_receipts (
  visitor_id text not null,
  entry_id uuid not null,
  day date not null,
  path text not null,
  active_seconds integer not null,
  primary key(visitor_id,entry_id)
);
alter table public.analytics_exit_receipts enable row level security;
revoke all on public.analytics_exit_receipts from public, anon, authenticated;
grant select,insert,update on public.analytics_exit_receipts to service_role;

create function public.record_exit_analytics(p_visitor text,p_owner text,p_entries jsonb)
returns void language plpgsql security invoker set search_path='' as $$
declare
  item record;
  receipt public.analytics_exit_receipts%rowtype;
  elapsed integer;
  views integer;
  visits integer;
  owner_id text;
begin
  -- Consistent row order also serializes simultaneous exits from different tabs.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_visitor,0));
  for item in select * from jsonb_to_recordset(p_entries)
    as e(id uuid,day date,path text,seconds integer,views integer,visits integer,seen timestamptz,owned boolean)
    order by seen,id
  loop
    insert into public.analytics_exit_receipts values(p_visitor,item.id,item.day,item.path,item.seconds)
      on conflict do nothing;
    if found then
      elapsed := item.seconds; views := item.views; visits := item.visits;
    else
      select * into strict receipt from public.analytics_exit_receipts where visitor_id=p_visitor and entry_id=item.id;
      if (receipt.day,receipt.path) is distinct from (item.day,item.path) then raise exception 'Inconsistent analytics entry'; end if;
      elapsed := item.seconds-receipt.active_seconds; views := 0; visits := 0;
      if elapsed<=0 then continue; end if;
      update public.analytics_exit_receipts set active_seconds=item.seconds where visitor_id=p_visitor and entry_id=item.id;
    end if;
    owner_id := case when item.owned then p_owner end;
    insert into public.analytics_daily as d(visitor_id,user_id,day,visits,page_views,active_seconds,last_seen_at)
      values(p_visitor,owner_id,item.day,visits,views,elapsed,item.seen)
      on conflict(visitor_id,day) do update set visits=d.visits+excluded.visits,page_views=d.page_views+excluded.page_views,
        active_seconds=d.active_seconds+excluded.active_seconds,last_seen_at=greatest(d.last_seen_at,excluded.last_seen_at),
        user_id=case when excluded.last_seen_at>=d.last_seen_at then coalesce(excluded.user_id,d.user_id) else coalesce(d.user_id,excluded.user_id) end;
    insert into public.analytics_pages as p(visitor_id,user_id,path,day,views,active_seconds,last_seen_at)
      values(p_visitor,owner_id,item.path,item.day,views,elapsed,item.seen)
      on conflict(visitor_id,path,day) do update set views=p.views+excluded.views,active_seconds=p.active_seconds+excluded.active_seconds,
        last_seen_at=greatest(p.last_seen_at,excluded.last_seen_at),
        user_id=case when excluded.last_seen_at>=p.last_seen_at then coalesce(excluded.user_id,p.user_id) else coalesce(p.user_id,excluded.user_id) end;
  end loop;
end $$;
revoke all on function public.record_exit_analytics(text,text,jsonb) from public,anon,authenticated;
grant execute on function public.record_exit_analytics(text,text,jsonb) to service_role;
