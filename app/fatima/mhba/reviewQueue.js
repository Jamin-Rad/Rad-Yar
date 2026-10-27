// Existing card IDs and review records remain compatible; annotations do not enter this queue.
export function createReviewQueue(cards,review={},onlyDue=false,now=Date.now()){
 const priority={official:0,concept:1,vocabulary:2};
 return cards.filter(card=>['official','concept','vocabulary'].includes(card.source)&&(!onlyDue||!review[card.id]||review[card.id].due<=now))
  .map((card,index)=>({...card,priorReview:review[card.id],order:index}))
  .sort((a,b)=>(a.priorReview?.due??now)-(b.priorReview?.due??now)||(priority[a.source]-priority[b.source])||a.order-b.order);
}
