-- Keep the original import immutable and record every correction before changing the effective ledger.
create table public.andarun_investment_transaction_changes (
 owner_id text not null, account_id text not null, transaction_id text not null,
 changed_at timestamptz not null default now(), old_payload jsonb not null,
 new_payload jsonb, primary key(owner_id,account_id,transaction_id,changed_at)
);
alter table public.andarun_investment_transaction_changes enable row level security;
revoke all on public.andarun_investment_transaction_changes from public,anon,authenticated,service_role;
grant select,insert on public.andarun_investment_transaction_changes to service_role;
grant update,delete on public.andarun_investment_transactions to service_role;

create or replace function public.change_andarun_investment_transaction(
 p_owner_id text,p_account_id text,p_transaction_id text,p_old_payload jsonb,p_new_payload jsonb
) returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
declare old_row jsonb; affected_isin text; checkpoint jsonb; anchor numeric; min_balance numeric;
begin
 if p_owner_id is null or length(p_owner_id) not between 1 and 200 or p_account_id not in ('self','fatemeh','mobin','mobina')
 or p_transaction_id is null or p_old_payload is null then raise exception 'INVALID_CHANGE'; end if;
 perform pg_advisory_xact_lock(hashtextextended(p_owner_id,0));
 select payload into old_row from public.andarun_investment_transactions
 where owner_id=p_owner_id and account_id=p_account_id and transaction_id=p_transaction_id for update;
 if old_row is null then raise exception 'TRANSACTION_NOT_FOUND'; end if;
 if old_row is distinct from p_old_payload then raise exception 'TRANSACTION_CHANGED'; end if;
 if p_new_payload is not null and (jsonb_typeof(p_new_payload)<>'object' or p_new_payload->>'id'<>p_transaction_id
 or p_new_payload->>'accountId'<>p_account_id or p_new_payload->>'type' not in ('BUY','SELL','TRANSFER_IN','TRANSFER_OUT'))
 then raise exception 'INVALID_CHANGE'; end if;
 affected_isin:=old_row->>'isin';
 if p_new_payload is not null and old_row->>'isin' is distinct from p_new_payload->>'isin' then raise exception 'INVALID_CHANGE'; end if;
 insert into public.andarun_investment_transaction_changes(owner_id,account_id,transaction_id,old_payload,new_payload)
 values(p_owner_id,p_account_id,p_transaction_id,old_row,p_new_payload);
 if p_new_payload is null then
   delete from public.andarun_investment_transactions where owner_id=p_owner_id and account_id=p_account_id and transaction_id=p_transaction_id;
 else
   update public.andarun_investment_transactions set payload=p_new_payload - 'accountId' - 'sourceRow'
   where owner_id=p_owner_id and account_id=p_account_id and transaction_id=p_transaction_id;
 end if;
 if affected_isin is not null and affected_isin<>'' then
   select a->'inventoryCheckpoint' into checkpoint from public.andarun_investment_state s
   cross join lateral jsonb_array_elements(s.state->'accounts') a
   where s.owner_id=p_owner_id and a->>'id'=p_account_id;
   select coalesce((h->>'quantity')::numeric,0) into anchor from jsonb_array_elements(coalesce(checkpoint->'holdings','[]'::jsonb)) h where h->>'isin'=affected_isin;
   with movements as (
     select (payload->>'datetime')::timestamptz as at_time,transaction_id,
       case when payload->>'type'='BUY' then abs((payload->>'quantity')::numeric)
       when payload->>'type'='SELL' then -abs((payload->>'quantity')::numeric)
       else (payload->>'quantity')::numeric end as delta
     from public.andarun_investment_transactions
     where owner_id=p_owner_id and account_id=p_account_id and payload->>'isin'=affected_isin
       and payload->>'type' in ('BUY','SELL','UNBUNDLING','UNBUNDLING_CANCELLED','SPIN_OFF','MERGER','SPLIT','REVERSE_SPLIT','STOCK_DIVIDEND','STOCK_DIVIDEND_CANCELLED','BONUS_ISSUE','BONUS_ISSUE_CANCELLED','LIQUIDATION_DIVIDEND','INTERMEDIATE_SECURITIES_DISTRIBUTION','WORTHLESS')
       and (checkpoint is null or (payload->>'datetime')::timestamptz>(checkpoint->>'asOf')::timestamptz)
   ), balances as (
     select coalesce(anchor,0)+sum(delta) over(order by at_time,transaction_id) as quantity from movements
   ) select min(quantity) into min_balance from balances;
   if min_balance<0 then raise exception 'INSUFFICIENT_UNITS'; end if;
 end if;
 return jsonb_build_object('changed',true,'deleted',p_new_payload is null);
end;$$;
revoke all on function public.change_andarun_investment_transaction(text,text,text,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.change_andarun_investment_transaction(text,text,text,jsonb,jsonb) to service_role;

create or replace function public.change_andarun_investment_transfer(
 p_owner_id text,p_first jsonb,p_second jsonb,p_new_first jsonb,p_new_second jsonb
) returns jsonb language plpgsql security invoker set search_path=public,pg_temp as $$
begin
 if p_first->'manual'->>'requestId' is null or p_first->'manual'->>'requestId' is distinct from p_second->'manual'->>'requestId'
 or p_first->>'accountId' is distinct from p_second->'manual'->>'linkedAccount'
 or p_second->>'accountId' is distinct from p_first->'manual'->>'linkedAccount'
 or (p_new_first is null) is distinct from (p_new_second is null)
 then raise exception 'INVALID_TRANSFER'; end if;
 perform public.change_andarun_investment_transaction(p_owner_id,p_first->>'accountId',p_first->>'id',p_first - 'accountId' - 'sourceRow',p_new_first);
 perform public.change_andarun_investment_transaction(p_owner_id,p_second->>'accountId',p_second->>'id',p_second - 'accountId' - 'sourceRow',p_new_second);
 return jsonb_build_object('changed',true,'deleted',p_new_first is null);
end;$$;
revoke all on function public.change_andarun_investment_transfer(text,jsonb,jsonb,jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.change_andarun_investment_transfer(text,jsonb,jsonb,jsonb,jsonb) to service_role;
