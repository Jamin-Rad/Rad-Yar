import {useEffect,useRef} from 'react';

// Only transform a single, frozen paper layer; never animate layout or blur text.
export default function useBookMotion(folioRef, enabled) {
  const state=useRef({busy:false,frame:0,progress:0,ghost:null,animations:[]});
  const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cleanup(){const s=state.current;cancelAnimationFrame(s.frame);s.animations.forEach(a=>a.cancel());s.animations=[];s.ghost?.remove();s.ghost=null;s.busy=false;s.progress=0;const page=folioRef.current;if(page){page.style.transform='';page.style.transformOrigin='';page.style.willChange='';}}
  useEffect(()=>()=>cleanup(),[]);
  useEffect(()=>{cleanup();},[enabled]);
  function drag(dx){if(!enabled||state.current.busy||reduced())return;const page=folioRef.current;if(!page)return;const s=state.current;s.animations.forEach(a=>a.cancel());s.animations=[];s.progress=Math.max(-1,Math.min(1,dx/page.clientWidth));cancelAnimationFrame(s.frame);s.frame=requestAnimationFrame(()=>{page.style.willChange='transform';page.style.transformOrigin=dx<0?'left center':'right center';page.style.transform=`translate3d(${s.progress*14}px,0,0) rotateY(${s.progress*16}deg)`;});}
  function settle(){const page=folioRef.current;const s=state.current;if(s.busy)return;cancelAnimationFrame(s.frame);s.progress=0;if(!page||!page.style.transform)return;const from=getComputedStyle(page).transform;page.style.transform='';page.style.willChange='';if(!reduced()&&from!=='none'){const a=page.animate([{transform:from},{transform:'none'}],{duration:200,easing:'cubic-bezier(.2,.7,.3,1)'});s.animations.push(a);a.onfinish=()=>{s.animations=s.animations.filter(item=>item!==a);a.cancel();};}}
  function turn(direction,commit){
    const s=state.current;if(s.busy)return false;
    const page=folioRef.current;
    if(!enabled||!page||reduced()){settle();commit();return true;}
    cancelAnimationFrame(s.frame);s.busy=true;
    const host=page.parentElement;
    const ghost=page.cloneNode(true);ghost.className='book-turn-sheet';ghost.setAttribute('aria-hidden','true');ghost.inert=true;
    ghost.querySelectorAll('[id],[data-highlight-root]').forEach(el=>{el.removeAttribute('id');el.removeAttribute('data-highlight-root');});
    Object.assign(ghost.style,{left:`${page.offsetLeft}px`,top:`${page.offsetTop}px`,width:`${page.clientWidth}px`,height:`${page.clientHeight}px`,transformOrigin:direction>0?'left center':'right center'});
    // Retain an oversized paragraph's internal scroll position in the outgoing paper.
    host.appendChild(ghost);ghost.scrollTop=page.scrollTop;s.ghost=ghost;
    const start=page.style.transform||'none';page.style.transform='';page.style.willChange='';commit();
    const duration=460;
    const outgoing=ghost.animate([{transform:start,opacity:1},{transform:`translate3d(${direction>0?-16:16}px,0,0) rotateY(${direction>0?-82:82}deg)`,opacity:0}],{duration,easing:'cubic-bezier(.2,.65,.25,1)',fill:'forwards'});
    s.animations.push(outgoing);
    // React commits the next folio before the next paint; keep the viewport fixed.
    s.frame=requestAnimationFrame(()=>{const incoming=folioRef.current;if(!incoming)return;const a=incoming.animate([{transform:`translate3d(${direction*10}px,0,0) rotateY(${direction*7}deg)`,opacity:.65},{transform:'none',opacity:1}],{duration:330,delay:85,easing:'cubic-bezier(.2,.7,.25,1)'});s.animations.push(a);});
    outgoing.onfinish=cleanup;
    return true;
  }
  return {drag,settle,turn,isBusy:()=>state.current.busy};
}
