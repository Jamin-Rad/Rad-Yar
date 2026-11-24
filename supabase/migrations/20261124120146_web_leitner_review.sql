-- A browser keeps the same id for an offline review and all its retries.
create table public.learning_card_reviews (
  user_id text not null,
  review_id uuid not null,
  card_id text not null,
  primary key (user_id, review_id),
  foreign key (user_id, card_id) references public.leitner_cards(user_id, card_id) on delete cascade
);
create index learning_card_reviews_card_idx on public.learning_card_reviews(user_id,card_id);
alter table public.learning_card_reviews enable row level security;
revoke all on public.learning_card_reviews from public, anon, authenticated;
grant select, insert, delete on public.learning_card_reviews to service_role;

create function public.record_learning_card_review(
  p_owner text, p_card text, p_id uuid, p_known boolean, p_at timestamptz,
  p_zone text, p_added timestamptz
) returns void language plpgsql security invoker set search_path='' as $$
declare
  card public.leitner_cards%rowtype;
  next_box integer;
  days integer[] := array[1,3,7,14,30,90,180,365];
begin
  -- Copy a claimed historical card once before adding its first account-owned review.
  if not exists (select from public.leitner_cards where user_id=p_owner and card_id=p_card) then
    insert into public.leitner_cards(user_id,card_id,box,status,added_at,last_seen_at,last_reviewed_at,due_at,correct_count,wrong_count,seen_count)
      select p_owner,p_card,c.box,c.status,c.added_at,c.last_seen_at,c.last_reviewed_at,c.due_at,c.correct_count,c.wrong_count,c.seen_count
      from public.leitner_cards c join public.learning_legacy_owners l on l.legacy_id=c.user_id
      where l.user_id=p_owner and c.card_id=p_card
      order by coalesce(c.last_reviewed_at,c.last_seen_at,c.added_at) desc nulls last limit 1
      on conflict do nothing;
    insert into public.leitner_cards(user_id,card_id,box,status,added_at) values(p_owner,p_card,1,'active',least(p_added,p_at))
      on conflict do nothing;
  end if;
  select * into strict card from public.leitner_cards where user_id=p_owner and card_id=p_card for update;
  insert into public.learning_card_reviews(user_id,review_id,card_id) values(p_owner,p_id,p_card) on conflict do nothing;
  if not found then return; end if;
  -- Every distinct answer counts. An older offline review keeps the newer schedule.
  if card.last_reviewed_at is null or p_at >= card.last_reviewed_at then
    next_box := case when p_known then least(card.box+1,9) else 1 end;
    card.box := least(next_box,8);
    card.status := case when next_box=9 then 'mastered' else 'active' end;
    card.last_seen_at := p_at;
    card.last_reviewed_at := p_at;
    card.due_at := case when next_box<=8 then
      (((p_at at time zone p_zone)::date + days[next_box])::timestamp at time zone p_zone) end;
  end if;
  update public.leitner_cards set box=card.box,status=card.status,last_seen_at=card.last_seen_at,
    last_reviewed_at=card.last_reviewed_at,due_at=card.due_at,
    correct_count=card.correct_count+p_known::int,wrong_count=card.wrong_count+(not p_known)::int,
    seen_count=card.seen_count+1 where user_id=p_owner and card_id=p_card;
end $$;
revoke all on function public.record_learning_card_review(text,text,uuid,boolean,timestamptz,text,timestamptz) from public,anon,authenticated;
grant execute on function public.record_learning_card_review(text,text,uuid,boolean,timestamptz,text,timestamptz) to service_role;
