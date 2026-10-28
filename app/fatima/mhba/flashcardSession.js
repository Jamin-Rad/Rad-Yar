export const initialCardSession={position:0,revealed:false,ratings:{},done:false};
export function reduceCardSession(state,action,cards){
 const card=cards[state.position];
 if(!card)return state;
 if(action.type==='flip')return {...state,revealed:!state.revealed};
 if(action.type==='move'){
  const position=Math.max(0,Math.min(cards.length-1,state.position+action.direction));
  return position===state.position?state:{...state,position,revealed:false};
 }
 if(action.type==='rate'){
  if(!state.revealed||Object.hasOwn(state.ratings,card.id))return state;
  const ratings={...state.ratings,[card.id]:action.known};
  // false is a real grade. Unrated cards must never be confused with unknown cards.
  const unrated=cards.map((_,i)=>(state.position+1+i)%cards.length).find(i=>!Object.hasOwn(ratings,cards[i].id));
  return {...state,ratings,position:unrated??state.position,revealed:false,done:unrated===undefined};
 }
 return state;
}
export function limitSession(cards,limit){return limit==='all'?cards:cards.slice(0,Math.max(1,Number(limit)||10));}
