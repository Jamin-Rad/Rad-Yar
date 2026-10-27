export const boxDays=[1,3,7,14,30];
export function cardBox(record){return record?Math.min(5,Math.max(1,record.box??((record.level??0)+1))):0;}
export function scheduleCard(previous,known,now=Date.now()){
 const box=!previous||!known?1:Math.min(5,cardBox(previous)+1);
 return {box,level:box-1,last:now,due:now+(known?boxDays[box-1]*86400000:600000)};
}
export function selectBoxCards(cards,review={},mode='new',now=Date.now()){
 return cards.filter(c=>mode==='new'?!review[c.id]:mode==='today'?review[c.id]&&review[c.id].due<=now:cardBox(review[c.id])===Number(mode));
}
