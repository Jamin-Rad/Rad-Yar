import {useEffect,useRef} from 'react';
import {orderedTextRange,readerPointerIntent,swipeDirection} from './readerGestures.js';

const controls='button,input,select,a,summary,[role="button"]';
function textPoint(reader,x,y){
  const doc=reader.ownerDocument;
  const caret=doc.caretPositionFromPoint?.(x,y);
  const fallback=caret?null:doc.caretRangeFromPoint?.(x,y);
  const node=caret?.offsetNode||fallback?.startContainer,local=caret?.offset??fallback?.startOffset;
  if(!node||node.nodeType!==3)return null;
  const root=node.parentElement?.closest('[data-highlight-root]');
  if(!root||!reader.contains(root)||root.closest('.book-measure,.book-turn-sheet'))return null;
  const box=root.getBoundingClientRect();if(x<box.left-10||x>box.right+10||y<box.top-10||y>box.bottom+10)return null;
  const prefix=doc.createRange();prefix.selectNodeContents(root);prefix.setEnd(node,local);
  return {node,local,root,blockId:root.dataset.highlightRoot,offset:Number(root.dataset.highlightOffset||0)+prefix.toString().length};
}
function penRange(first,last){const ordered=orderedTextRange(first,last);if(!ordered)return null;const range=first.node.ownerDocument.createRange();range.setStart(ordered.start.node,ordered.start.local);range.setEnd(ordered.end.node,ordered.end.local);return {range,blockId:first.blockId,start:ordered.start.offset,end:ordered.end.offset};}

export default function useReaderInput({readerRef,previewRef,annotation,annotateRange,flip,motion,contentKey}){
  const input=useRef({pen:null,touch:null,touches:new Set(),quietUntil:0,frame:0});
  const latest=useRef(null);latest.current={annotation,annotateRange,flip,motion};
  function clearPreview(){cancelAnimationFrame(input.current.frame);previewRef.current?.replaceChildren();}
  function cancel(){const s=input.current;if(s.pen&&readerRef.current?.hasPointerCapture(s.pen.id))readerRef.current.releasePointerCapture(s.pen.id);s.pen=null;s.touch=null;s.touches.clear();clearPreview();}
  useEffect(()=>{cancel();return cancel;},[contentKey]);
  function inputType(e){const reader=readerRef.current;if(!reader)return;if(e.pointerType==='touch'&&input.current.pen)return;reader.dataset.readerInput=e.pointerType||'mouse';}
  function preview(selection){const layer=previewRef.current,reader=readerRef.current;if(!layer||!reader)return;layer.replaceChildren();if(!selection)return;const box=reader.getBoundingClientRect();const tool=latest.current.annotation.tool;layer.dataset.tool=tool;layer.dataset.color=latest.current.annotation.color||'yellow';for(const r of [...selection.range.getClientRects()].slice(0,80)){if(r.width<1)continue;const span=document.createElement('span');Object.assign(span.style,{left:`${r.left-box.left}px`,top:`${r.top-box.top}px`,width:`${r.width}px`,height:`${r.height}px`});layer.appendChild(span);}}
  function updatePen(pen,x,y){const point=textPoint(readerRef.current,x,y);if(point&&(!pen.first||point.blockId===pen.first.blockId)){pen.first ||= point;pen.last=point;}}
  function down(e){
    const s=input.current;inputType(e);
    if(e.pointerType==='touch')s.touches.add(e.pointerId);
    const intent=readerPointerIntent(e,{penActive:!!s.pen,quietUntil:s.quietUntil,now:performance.now(),touches:s.touches.size});
    if(intent==='ignore'){s.touch=null;latest.current.motion.settle();return;}
    if(e.target.closest(controls)||latest.current.motion.isBusy())return;
    if(intent==='annotate'){
      s.touch=null;latest.current.motion.settle();s.quietUntil=performance.now()+450;
      if(latest.current.annotation.tool==='select')return;
      e.preventDefault();e.stopPropagation();
      window.getSelection()?.removeAllRanges();
      const first=textPoint(readerRef.current,e.clientX,e.clientY);
      s.pen={id:e.pointerId,first,last:first,x:e.clientX,y:e.clientY,moved:false,target:e.target};
      e.currentTarget.setPointerCapture(e.pointerId);
    }else if(intent==='navigate'){
      window.getSelection()?.removeAllRanges();
      s.touch={id:e.pointerId,x:e.clientX,y:e.clientY,time:performance.now(),axis:null};
    }
  }
  function move(e){
    const s=input.current;
    if(s.pen?.id===e.pointerId){
      e.preventDefault();e.stopPropagation();const pen=s.pen;
      if(Math.hypot(e.clientX-pen.x,e.clientY-pen.y)>5)pen.moved=true;
      const x=e.clientX,y=e.clientY;cancelAnimationFrame(s.frame);s.frame=requestAnimationFrame(()=>{if(s.pen!==pen)return;updatePen(pen,x,y);preview(penRange(pen.first,pen.last));});
      return;
    }
    const touch=s.touch;if(!touch||touch.id!==e.pointerId||s.touches.size!==1)return;
    const dx=e.clientX-touch.x,dy=e.clientY-touch.y;
    if(!touch.axis&&Math.max(Math.abs(dx),Math.abs(dy))>10)touch.axis=Math.abs(dx)>Math.abs(dy)*1.4?'horizontal':'vertical';
    if(touch.axis==='horizontal'){e.preventDefault();latest.current.motion.drag(dx);}
  }
  function up(e){
    const s=input.current;s.touches.delete(e.pointerId);
    if(s.pen?.id===e.pointerId){
      e.preventDefault();e.stopPropagation();const pen=s.pen;updatePen(pen,e.clientX,e.clientY);s.pen=null;s.quietUntil=performance.now()+450;clearPreview();
      if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
      const selection=penRange(pen.first,pen.last);
      if(selection&&selection.end>selection.start)latest.current.annotateRange(selection);
      else if(!pen.moved&&latest.current.annotation.tool==='erase'){
        const mark=pen.target.closest('mark[data-annotation-start]'),root=mark?.closest('[data-highlight-root]');
        if(root)latest.current.annotateRange({blockId:root.dataset.highlightRoot,start:Number(mark.dataset.annotationStart),end:Number(mark.dataset.annotationEnd)});
      }
      return;
    }
    const touch=s.touch;s.touch=null;
    if(!touch||touch.id!==e.pointerId)return;
    const direction=swipeDirection({dx:e.clientX-touch.x,dy:e.clientY-touch.y,elapsed:performance.now()-touch.time,width:readerRef.current.clientWidth});
    if(direction&&touch.axis!=='vertical'){e.stopPropagation();latest.current.flip(direction);}else latest.current.motion.settle();
  }
  function aborted(e){const s=input.current;s.touches.delete(e.pointerId);if(s.pen?.id===e.pointerId){s.pen=null;s.quietUntil=performance.now()+450;clearPreview();}if(s.touch?.id===e.pointerId){s.touch=null;latest.current.motion.settle();}}
  function click(e){if(e.target.closest(controls))return;if(input.current.pen||performance.now()<input.current.quietUntil||e.pointerType==='pen'){e.preventDefault();e.stopPropagation();}}
  return {onPointerOver:inputType,onPointerDown:down,onPointerMove:move,onPointerUp:up,onPointerCancel:aborted,onLostPointerCapture:aborted,onClickCapture:click,onContextMenu:click};
}
