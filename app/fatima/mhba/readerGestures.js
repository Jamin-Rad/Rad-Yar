// Keep gesture policy independent of the DOM so pen/palm/touch cases are testable.
export function readerPointerIntent({pointerType, isPrimary=true, width=1, height=1}, {penActive=false, quietUntil=0, now=0, touches=0}={}) {
  if (pointerType === 'pen') return 'annotate';
  if (pointerType !== 'touch') return 'select';
  if (penActive || now < quietUntil || !isPrimary || touches > 1 || (width > 45 && height > 45)) return 'ignore';
  return 'navigate';
}

export function swipeDirection({dx,dy,elapsed,width}) {
  const distance=Math.abs(dx), threshold=Math.max(54, Math.min(110, width * .16));
  const flick=distance>=40 && elapsed>0 && elapsed<280 && distance/elapsed>.35;
  if ((!flick && distance<threshold) || distance<Math.abs(dy)*1.65) return 0;
  return dx < 0 ? 1 : -1;
}

export function orderedTextRange(first,last) {
  if (!first || !last || first.blockId !== last.blockId) return null;
  return first.offset <= last.offset ? {start:first,end:last} : {start:last,end:first};
}
