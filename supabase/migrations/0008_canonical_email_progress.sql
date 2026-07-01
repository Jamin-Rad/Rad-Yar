-- RadYar user progress is now keyed by canonical email identity:
--   email:name@example.com
-- Old per-Clerk-ID progress rows can be removed because this project has no
-- external users yet.

delete from user_progress
where user_id not like 'email:%';

delete from mcq_results
where user_id not like 'email:%';

delete from leitner_cards
where user_id not like 'email:%';

delete from analytics_daily
where user_id is not null
  and user_id not like 'email:%';

delete from analytics_pages
where user_id is not null
  and user_id not like 'email:%';

