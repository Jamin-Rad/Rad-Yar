-- Reuse the private append-only ledger. A family transfer is one transaction:
-- an error on either leg rolls back both account entries and their sources.
create or replace function public.record_andarun_investment_entry(p_owner_id text,p_batches jsonb)
returns jsonb language plpgsql security invoker set search_path=public,pg_temp
as $$
declare b jsonb; result jsonb; added integer:=0; duplicates integer:=0;
 tx jsonb; account_state jsonb; checkpoint jsonb; available numeric; anchor_quantity numeric; delta numeric;
begin
 if p_owner_id is null or length(p_owner_id) not between 1 and 200
 or p_batches is null or jsonb_typeof(p_batches)<>'array' or jsonb_array_length(p_batches) not between 1 and 2 then
   raise exception 'Invalid entry';
 end if;
 perform pg_advisory_xact_lock(hashtextextended(p_owner_id,0));
 for b in select value from jsonb_array_elements(p_batches) loop
   if jsonb_typeof(b->'rows')<>'array' or jsonb_array_length(b->'rows')<>1 then raise exception 'Invalid entry rows'; end if;
   tx:=b->'rows'->0;
   if tx->>'type'='SELL' and not exists(select 1 from public.andarun_investment_transactions t where t.owner_id=p_owner_id and t.account_id=b->>'accountId' and t.transaction_id=tx->>'id') then
     select a into account_state from public.andarun_investment_state s cross join lateral jsonb_array_elements(s.state->'accounts') a where s.owner_id=p_owner_id and a->>'id'=b->>'accountId';
     checkpoint:=account_state->'inventoryCheckpoint';
     anchor_quantity:=0;
     if checkpoint is not null then
       select coalesce((h->>'quantity')::numeric,0) into anchor_quantity from jsonb_array_elements(checkpoint->'holdings') h where h->>'isin'=tx->>'isin';
     end if;
     select coalesce(sum(case when payload->>'type'='BUY' then abs((payload->>'quantity')::numeric) when payload->>'type'='SELL' then -abs((payload->>'quantity')::numeric) else (payload->>'quantity')::numeric end),0) into delta
     from public.andarun_investment_transactions t where t.owner_id=p_owner_id and t.account_id=b->>'accountId' and payload->>'isin'=tx->>'isin'
       and payload->>'type' in ('BUY','SELL','UNBUNDLING','UNBUNDLING_CANCELLED','SPIN_OFF','MERGER','SPLIT','REVERSE_SPLIT','STOCK_DIVIDEND','STOCK_DIVIDEND_CANCELLED','BONUS_ISSUE','BONUS_ISSUE_CANCELLED','LIQUIDATION_DIVIDEND','INTERMEDIATE_SECURITIES_DISTRIBUTION','WORTHLESS')
       and (checkpoint is null or (payload->>'datetime')::timestamptz>(checkpoint->>'asOf')::timestamptz);
     available:=coalesce(anchor_quantity,0)+delta;
     if available<abs((tx->>'quantity')::numeric) then raise exception 'INSUFFICIENT_UNITS'; end if;
   end if;
   result:=public.import_andarun_investment_transactions(p_owner_id,b->>'accountId',b->>'sourceHash',b->>'filename',b->>'csv',b->'rows');
   added:=added+(result->>'added')::integer;
   duplicates:=duplicates+(result->>'duplicates')::integer;
 end loop;
 return jsonb_build_object('added',added,'duplicates',duplicates);
end;
$$;
revoke all on function public.record_andarun_investment_entry(text,jsonb) from public,anon,authenticated;
grant execute on function public.record_andarun_investment_entry(text,jsonb) to service_role;
