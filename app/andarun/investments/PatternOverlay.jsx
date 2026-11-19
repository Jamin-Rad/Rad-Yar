export function snapshotPattern(pattern,rows,offset,frame) {
  const at=p=>({date:rows[p.index+offset].date,price:p.price})
  const points=[...pattern.points.map(at),...pattern.boundaries.flat().map(at)]
  if(pattern.pole)points.push(at(pattern.pole))
  if(pattern.breakout)points.push({date:rows[offset+pattern.end].date,price:rows[offset+pattern.end].close})
  return {type:'pattern',points,meta:{name:pattern.name,frame,count:pattern.points.length,rails:pattern.boundaries.length,pole:!!pattern.pole,breakout:pattern.breakout??null}}
}

export default function PatternOverlay({line,x,y,focused,onFocus,onPin}) {
  const {meta,points}=line
  const pivots=points.slice(0,meta.count)
  const rails=points.slice(meta.count,meta.count+2*meta.rails)
  const pole=meta.pole?points[meta.count+2*meta.rails]:null
  const screen=p=>x(p.date)+','+y(p.price)
  const color=line.color??'#ebc686'
  const anchor=pivots.reduce((highest,p)=>p.price>highest.price?p:highest)
  const stroke=(a,b)=>'M'+screen(a)+'L'+screen(b)
  const trace='M'+pivots.map(screen).join('L')
  const segments=rails.filter((_,i)=>i%2===0).map((p,i)=>stroke(p,rails[i*2+1]))
  if(pole)segments.push(stroke(pole,pivots[0]))
  return <g data-pattern={meta.name} data-drawing-id={line.id} role="button" tabIndex={0}
    aria-label={meta.name+(line.id?'، ذخیره‌شده':'، دوبارکلیک برای نگه‌داشتن')}
    onPointerDown={e=>{if(e.button===0){e.stopPropagation();onFocus?.(e)}}}
    onDoubleClick={e=>{e.stopPropagation();onPin(e)}}
    onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();onPin()}}} style={{cursor:'pointer'}}>
    {segments.map((d,i)=><path key={i} d={d} fill="none" stroke="#81bbc9" strokeDasharray="5 3" strokeWidth={focused?2.5:1.5}/>)}
    <path d={trace} fill="none" stroke={color} strokeWidth={focused?3:1.6}/>
    {pivots.map((p,i)=><circle key={i} cx={x(p.date)} cy={y(p.price)} r={focused?4:2.8} fill={color}/>)}
    {meta.breakout&&<circle cx={x(points.at(-1).date)} cy={y(points.at(-1).price)} r="4" fill={meta.breakout==='up'?'#78dfc4':'#efb172'}/>}
    {focused&&<text x={x(anchor.date)} y={y(anchor.price)-12} textAnchor="middle" style={{fill:color,paintOrder:'stroke',stroke:'#111922',strokeWidth:4}}>{meta.name}</text>}
    <path d={[trace,...segments].join(' ')} fill="none" stroke="transparent" strokeWidth="16" pointerEvents="stroke"/>
  </g>
}
