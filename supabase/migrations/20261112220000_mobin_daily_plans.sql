create table public.mobin_daily_plans (
  day date primary key,
  id uuid not null default gen_random_uuid(),
  start_time text not null,
  blocks jsonb not null check (jsonb_typeof(blocks) = 'array')
);

alter table public.mobin_daily_plans enable row level security;
revoke all on public.mobin_daily_plans from public, anon, authenticated;
grant select, insert, update on public.mobin_daily_plans to service_role;

create function public.update_mobin_plan_progress(p_day date, p_plan uuid, p_block text, p_done integer)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  items jsonb;
  position integer;
  units integer;
begin
  select blocks into items from public.mobin_daily_plans
    where day = p_day and id = p_plan for update;
  if not found then return false; end if;

  select (ordinality - 1)::integer, (item->>'units')::integer
    into position, units
    from jsonb_array_elements(items) with ordinality as entry(item, ordinality)
    where item->>'id' = p_block;
  if not found then return false; end if;

  update public.mobin_daily_plans set blocks = jsonb_set(
    items, array[position::text, 'done'], to_jsonb(greatest(0, least(units, p_done)))
  ) where day = p_day and id = p_plan;
  return true;
end;
$$;

revoke all on function public.update_mobin_plan_progress(date, uuid, text, integer) from public, anon, authenticated;
grant execute on function public.update_mobin_plan_progress(date, uuid, text, integer) to service_role;
