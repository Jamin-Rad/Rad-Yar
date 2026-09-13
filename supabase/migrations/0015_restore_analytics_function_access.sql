-- 0002 revoked PUBLIC execution without granting the server role access.
-- Consequently /api/analytics/track fails with SQLSTATE 42501 while the
-- separately inserted Node-RADS sharing events continue to work.
-- Only the trusted server may record analytics; browser roles stay blocked.
begin;

revoke all on function public.record_site_activity(text, text, text, int, int, int)
  from public, anon, authenticated;
grant execute on function public.record_site_activity(text, text, text, int, int, int)
  to service_role;

commit;
