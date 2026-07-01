-- Reset old learning/activity rows after switching to canonical email identity.
-- The project has no external users yet, so the old progress can be removed.

delete from user_progress;
delete from mcq_results;
delete from leitner_cards;

delete from analytics_daily
where user_id is not null;

delete from analytics_pages
where user_id is not null;

