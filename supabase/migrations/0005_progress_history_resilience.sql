-- Progress entries can refer to lesson IDs that are created in the app before
-- the curriculum seed has inserted matching rows into `themen`.
-- Keep the progress table flexible so online history does not fail while the
-- local offline cache continues to work.

alter table user_progress
  drop constraint if exists user_progress_thema_id_fkey;

create index if not exists idx_user_progress_user_updated
  on user_progress(user_id, updated_at desc);
