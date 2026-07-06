alter table andarun_todos
  add column if not exists item_type text not null default 'todo',
  add column if not exists event_time time,
  add column if not exists all_day boolean not null default false;

alter table andarun_todos
  drop constraint if exists andarun_todos_item_type_check;

alter table andarun_todos
  add constraint andarun_todos_item_type_check
  check (item_type in ('todo', 'event'));

create index if not exists andarun_todos_owner_deadline_idx
  on andarun_todos (owner_id, deadline);
