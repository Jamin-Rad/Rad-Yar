-- Private append-only broker ledger. The existing Andarun server session supplies owner_id.
create table public.andarun_investment_imports (
  owner_id text not null,
  account_id text not null check (account_id in ('self','fatemeh','mobin','mobina')),
  source_hash text not null check (source_hash ~ '^[a-f0-9]{64}$'),
  filename text not null check (length(filename) between 1 and 200),
  raw_csv text not null check (octet_length(raw_csv) <= 3000000),
  row_count integer not null check (row_count between 1 and 10000),
  added_count integer not null check (added_count between 0 and row_count),
  imported_at timestamptz not null default now(),
  primary key (owner_id,account_id,source_hash)
);
create table public.andarun_investment_transactions (
  owner_id text not null,
  account_id text not null check (account_id in ('self','fatemeh','mobin','mobina')),
  transaction_id text not null check (transaction_id ~ '^[A-Za-z0-9_-]{1,100}$'),
  source_hash text not null,
  source_row integer not null check (source_row >= 2),
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and payload->>'id' = transaction_id),
  imported_at timestamptz not null default now(),
  primary key (owner_id,account_id,transaction_id),
  foreign key (owner_id,account_id,source_hash) references public.andarun_investment_imports(owner_id,account_id,source_hash)
);
alter table public.andarun_investment_imports enable row level security;
alter table public.andarun_investment_transactions enable row level security;
revoke all on public.andarun_investment_imports,public.andarun_investment_transactions from public,anon,authenticated,service_role;
grant select,insert on public.andarun_investment_imports,public.andarun_investment_transactions to service_role;

create or replace function public.import_andarun_investment_transactions(
 p_owner_id text,p_account_id text,p_source_hash text,p_filename text,p_csv text,p_rows jsonb
) returns jsonb
language plpgsql security invoker set search_path = public,pg_temp
as $$
declare
 n integer;
 inserted_count integer;
 conflict_id text;
 existing_count integer;
begin
 if p_owner_id is null or length(p_owner_id) not between 1 and 200 or p_account_id not in ('self','fatemeh','mobin','mobina') or p_source_hash !~ '^[a-f0-9]{64}$' then
  raise exception 'Invalid ledger owner, account or file hash';
 end if;
 if p_rows is null or jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) not between 1 and 10000 then
  raise exception 'Invalid transaction count';
 end if;
 n := jsonb_array_length(p_rows);
 if exists(select 1 from jsonb_array_elements(p_rows) r where r->>'id' is null or r->>'id' !~ '^[A-Za-z0-9_-]{1,100}$' or (r->>'sourceRow')::integer < 2 or r->>'accountId' is distinct from p_account_id)
 or (select count(distinct r->>'id') from jsonb_array_elements(p_rows) r) <> n then
  raise exception 'Invalid or duplicate transaction identifiers';
 end if;
 -- Serializes imports for one account, including overlapping CSV files.
 perform pg_advisory_xact_lock(hashtextextended(p_owner_id,0));
 select row_count into existing_count from public.andarun_investment_imports where owner_id=p_owner_id and account_id=p_account_id and source_hash=p_source_hash;
 if found then return jsonb_build_object('added',0,'duplicates',existing_count,'alreadyImported',true); end if;
 select t.transaction_id into conflict_id
 from jsonb_array_elements(p_rows) r
 join public.andarun_investment_transactions t on t.owner_id=p_owner_id and t.account_id=p_account_id and t.transaction_id=r->>'id'
 where t.payload is distinct from (r - 'sourceRow' - 'accountId') limit 1;
 if conflict_id is not null then raise exception 'LEDGER_CONFLICT: Existing transaction differs: %',conflict_id; end if;
 inserted_count := (select count(*) from jsonb_array_elements(p_rows) r where not exists (select 1 from public.andarun_investment_transactions t where t.owner_id=p_owner_id and t.account_id=p_account_id and t.transaction_id=r->>'id'));
 if (select count(*) from public.andarun_investment_transactions where owner_id=p_owner_id) + inserted_count > 50000 then
  raise exception 'Ledger size limit exceeded';
 end if;
 insert into public.andarun_investment_imports(owner_id,account_id,source_hash,filename,raw_csv,row_count,added_count)
 values(p_owner_id,p_account_id,p_source_hash,p_filename,p_csv,n,inserted_count);
 insert into public.andarun_investment_transactions(owner_id,account_id,transaction_id,source_hash,source_row,payload)
 select p_owner_id,p_account_id,r->>'id',p_source_hash,(r->>'sourceRow')::integer,r - 'sourceRow' - 'accountId'
 from jsonb_array_elements(p_rows) r
 on conflict (owner_id,account_id,transaction_id) do nothing;
 return jsonb_build_object('added',inserted_count,'duplicates',n-inserted_count,'alreadyImported',false);
end;
$$;
revoke all on function public.import_andarun_investment_transactions(text,text,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.import_andarun_investment_transactions(text,text,text,text,text,jsonb) to service_role;

-- One statement reads a consistent snapshot, avoiding missing/duplicate rows across REST pages.
create or replace function public.read_andarun_investment_ledger(p_owner_id text)
returns jsonb language sql stable security invoker set search_path = public,pg_temp
as $$
 select jsonb_build_object(
 'transactions',coalesce((select jsonb_agg(payload || jsonb_build_object('accountId',account_id,'sourceRow',source_row) order by account_id,transaction_id) from public.andarun_investment_transactions where owner_id=p_owner_id),'[]'::jsonb),
 'imports',coalesce((select jsonb_agg(jsonb_build_object('account_id',account_id,'source_hash',source_hash,'filename',filename,'row_count',row_count,'added_count',added_count,'imported_at',imported_at) order by imported_at desc,account_id,source_hash) from public.andarun_investment_imports where owner_id=p_owner_id),'[]'::jsonb)
 );
$$;
revoke all on function public.read_andarun_investment_ledger(text) from public,anon,authenticated;
grant execute on function public.read_andarun_investment_ledger(text) to service_role;
