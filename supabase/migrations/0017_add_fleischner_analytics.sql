begin;

do $$
begin
  if to_regclass('public.analytics_calculator_events') is not null then
    alter table public.analytics_calculator_events
      drop constraint if exists analytics_calculator_events_tool_check;
    alter table public.analytics_calculator_events
      add constraint analytics_calculator_events_tool_check
      check (tool in ('node-rads', 'kaiser-score', 'fleischner'));
  end if;
end $$;

commit;
