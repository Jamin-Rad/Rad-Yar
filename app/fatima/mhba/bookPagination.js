export function packBookRows(heights,capacity,keepTitle=false){
 const groups=[];let group=[],used=0;
 for(let i=0;i<heights.length;i++){
  const height=Math.max(0,Number(heights[i])||0);
  if(group.length&&used+height>capacity&&!(keepTitle&&group.length===1&&group[0]===0)){groups.push(group);group=[];used=0;}
  group.push(i);used+=height;
 }
 if(group.length)groups.push(group);
 return groups;
}
