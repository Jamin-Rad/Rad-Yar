import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readerPointerIntent,swipeDirection,orderedTextRange} from './readerGestures.js';

test('Pencil annotates, fingers navigate, and mouse retains native text selection',()=>{
 assert.equal(readerPointerIntent({pointerType:'pen'}),'annotate');
 assert.equal(readerPointerIntent({pointerType:'touch'}),'navigate');
 assert.equal(readerPointerIntent({pointerType:'mouse'}),'select');
 assert.equal(readerPointerIntent({pointerType:''}),'select');
});
test('palm, second finger, and touches during or immediately after Pencil cannot turn pages',()=>{
 for(const [pointer,state] of [
  [{pointerType:'touch'},{penActive:true}],
  [{pointerType:'touch'},{quietUntil:600,now:500}],
  [{pointerType:'touch',isPrimary:false},{}],
  [{pointerType:'touch'},{touches:2}],
  [{pointerType:'touch',width:70,height:65},{}],
 ])assert.equal(readerPointerIntent(pointer,state),'ignore');
 assert.equal(readerPointerIntent({pointerType:'touch'},{quietUntil:600,now:601}),'navigate');
 assert.equal(readerPointerIntent({pointerType:'pen',isPrimary:false},{touches:2}),'annotate');
});
test('horizontal swipes turn one page; vertical scrolling, taps, short drags and long holds do not',()=>{
 const base={dx:-150,dy:10,elapsed:400,width:800};
 assert.equal(swipeDirection(base),1);assert.equal(swipeDirection({...base,dx:150}),-1);
 for(const change of [{dx:10},{dx:90,dy:130},{dx:0,dy:300},{dx:110,dy:100}])assert.equal(swipeDirection({...base,...change}),0);
 assert.equal(swipeDirection({dx:-60,dy:2,elapsed:400,width:360}),1);
 assert.equal(swipeDirection({...base,dx:-45,elapsed:100}),1);
 assert.equal(swipeDirection({...base,elapsed:2500}),1);
});
test('Pencil ranges work in either direction and cannot cross German/Persian blocks',()=>{
 const first={offset:40,blockId:'original-5-4-fa'},last={offset:12,blockId:first.blockId};
 assert.deepEqual(orderedTextRange(first,last),{start:last,end:first});
 assert.equal(orderedTextRange(first,{...last,blockId:'original-5-4'}),null);
 assert.equal(orderedTextRange(null,last),null);
});
