import {useLayoutEffect,useRef} from 'react'
import {createPortal} from 'react-dom'
import styles from './InvestmentPositionChart.module.css'

export default function ChartContextMenu({context,close,children}) {
  const ref=useRef(null)
  useLayoutEffect(()=>{
    const menu=ref.current
    const box=menu.getBoundingClientRect()
    const place=(at,size,edge)=>Math.max(4,at+size+4<=edge?at:at-size)
    menu.style.left=place(context.x,box.width,window.innerWidth)+'px'
    menu.style.top=place(context.y,box.height,window.innerHeight)+'px'
    menu.querySelector('button:not(:disabled)')?.focus({preventScroll:true})
    const outside=e=>{if(!menu.contains(e.target))close()}
    const key=e=>{if(e.key==='Escape'){e.stopPropagation();close();context.trigger?.focus?.({preventScroll:true})}}
    document.addEventListener('pointerdown',outside,true)
    document.addEventListener('keydown',key,true)
    window.addEventListener('resize',close)
    return ()=>{document.removeEventListener('pointerdown',outside,true);document.removeEventListener('keydown',key,true);window.removeEventListener('resize',close)}
  },[context])
  return createPortal(<div dir="rtl" ref={ref} className={styles.context} role="menu" aria-label="عملیات نمودار" onContextMenu={e=>e.preventDefault()} onKeyDown={e=>{
    if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return
    e.preventDefault()
    const items=[...ref.current.querySelectorAll('button:not(:disabled)')]
    const index=items.indexOf(document.activeElement)
    items[e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length]?.focus()
  }}>{children}</div>,document.body)
}
