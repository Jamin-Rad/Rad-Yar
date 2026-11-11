create table public.andarun_investment_orders (
  owner_id text not null,
  id uuid not null,
  terms jsonb not null,
  created_at timestamptz not null default now(),
  placed_at timestamptz,
  cancelled_at timestamptz,
  broker_reference text,
  fills jsonb not null default '[]'::jsonb,
  primary key (owner_id, id)
);

alter table public.andarun_investment_orders enable row level security;
revoke all on public.andarun_investment_orders from public, anon, authenticated;
grant select, insert, update on public.andarun_investment_orders to service_role;

create function public.manage_andarun_investment_order(
  p_owner_id text, p_id uuid, p_action text, p_data jsonb
) returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare
  current_order public.andarun_investment_orders%rowtype;
  fill jsonb;
  trade jsonb;
  quantity numeric;
  filled numeric;
  result jsonb;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_owner_id, 0));
  if p_action = 'create' then
    insert into public.andarun_investment_orders(owner_id,id,terms)
    values(p_owner_id,p_id,p_data) on conflict (owner_id,id) do nothing;
    if exists (select 1 from public.andarun_investment_orders where owner_id=p_owner_id and id=p_id and terms=p_data) then
      return jsonb_build_object('saved',true);
    end if;
    raise exception 'ORDER_CONFLICT';
  end if;

  select * into current_order from public.andarun_investment_orders
    where owner_id=p_owner_id and id=p_id for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  select coalesce(sum((value->>'quantity')::numeric),0) into filled
    from jsonb_array_elements(current_order.fills);

  if p_action='fill' then
    trade:=p_data->'rows'->0;
    select value into fill from jsonb_array_elements(current_order.fills)
      where value->>'transactionId'=trade->>'id';
    if found then
      if fill->>'sourceHash' is distinct from p_data->>'sourceHash' then raise exception 'ORDER_CONFLICT'; end if;
      return jsonb_build_object('added',0,'duplicates',1);
    end if;
    if current_order.placed_at is null or current_order.cancelled_at is not null then raise exception 'ORDER_NOT_OPEN'; end if;
    if p_data->>'accountId' is distinct from current_order.terms->>'accountId'
      or trade->>'isin' is distinct from current_order.terms->>'isin'
      or trade->>'type' is distinct from current_order.terms->>'side' then raise exception 'ORDER_CONFLICT'; end if;
    quantity:=abs((trade->>'quantity')::numeric);
    if quantity is null or quantity<=0 or filled+quantity>(current_order.terms->>'quantity')::numeric then
      raise exception 'ORDER_QUANTITY';
    end if;
    result:=public.record_andarun_investment_entry(p_owner_id,jsonb_build_array(p_data));
    if (result->>'added')::int<>1 then raise exception 'ORDER_CONFLICT'; end if;
    fill:=jsonb_build_object('transactionId',trade->>'id','quantity',quantity::text,
      'datetime',trade->>'datetime','cashCents',trade->'cashCents','sourceHash',p_data->>'sourceHash');
    update public.andarun_investment_orders set fills=fills||jsonb_build_array(fill)
      where owner_id=p_owner_id and id=p_id;
    return result;
  end if;

  if p_action in ('place','edit') and current_order.terms is distinct from p_data->'expectedTerms' then
    raise exception 'ORDER_CONFLICT';
  end if;
  if p_action='place' and current_order.placed_at is not null and current_order.cancelled_at is null then
    return jsonb_build_object('saved',true);
  end if;
  if p_action='cancel' and current_order.cancelled_at is not null then return jsonb_build_object('saved',true); end if;
  if current_order.cancelled_at is not null or filled>=(current_order.terms->>'quantity')::numeric then raise exception 'ORDER_NOT_OPEN'; end if;
  if p_action='place' then
    update public.andarun_investment_orders set placed_at=now(),broker_reference=p_data->>'reference'
      where owner_id=p_owner_id and id=p_id;
  elsif p_action='cancel' then
    update public.andarun_investment_orders set cancelled_at=now() where owner_id=p_owner_id and id=p_id;
  elsif p_action='edit' and current_order.placed_at is null then
    update public.andarun_investment_orders set terms=p_data->'terms' where owner_id=p_owner_id and id=p_id;
  else raise exception 'ORDER_NOT_OPEN';
  end if;
  return jsonb_build_object('saved',true);
end;
$$;

revoke all on function public.manage_andarun_investment_order(text,uuid,text,jsonb) from public, anon, authenticated;
grant execute on function public.manage_andarun_investment_order(text,uuid,text,jsonb) to service_role;
