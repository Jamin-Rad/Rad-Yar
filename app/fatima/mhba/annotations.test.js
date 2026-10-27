import {test} from 'node:test';
import assert from 'node:assert/strict';
import {addAnnotation,annotationRuns,glossaryParts} from './annotations.js';
const text='Bedürfnisse sind unbegrenzt.';
const next=(start,end,tool='highlight',color='yellow')=>({id:`${tool}-${start}`,lessonId:1,blockId:'original-1-3',start,end,text:text.slice(start,end),sourceText:text,tool,color,created:1});
test('auto-saving is idempotent and extending/recoloring preserves a personal note and review cue',()=>{
 let saved=addAnnotation([],next(0,10));
 saved[0].note='My note';saved[0].reviewEnabled=true;saved[0].cue='Remember?';
 assert.equal(addAnnotation(saved,next(0,10)),saved);
 saved=addAnnotation(saved,next(4,15,'highlight','pink'));
 assert.equal(saved.length,1);assert.equal(saved[0].text,text.slice(0,15));assert.equal(saved[0].note,'My note');assert.equal(saved[0].reviewEnabled,true);assert.equal(saved[0].color,'pink');
});
test('underline and highlight can coexist without losing any original characters',()=>{
 const saved=addAnnotation(addAnnotation([],next(0,10)),next(4,15,'underline'));
 const runs=annotationRuns(text,'original-1-3',saved);
 assert.equal(runs.map(r=>r.text).join(''),text);
 assert.ok(runs.some(r=>r.annotations.length===2));
 assert.equal(saved.length,2);
});
test('same offsets on different pages and lessons do not collide',()=>{
 const first=next(0,10);const other={...next(0,10),id:'other',lessonId:2};
 assert.equal(addAnnotation([first],other).length,2);
 assert.equal(annotationRuns(text,'another-page',[first]).filter(r=>r.annotations.length).length,0);
});
test('glossary preserves exact source text, prefers whole phrases and ignores partial matches',()=>{
 const original='Die Bedürfnisse und die öffentliche Beglaubigung. NichtBedürfnisse.';
 const parts=glossaryParts(original,[['Bedürfnis|Bedürfnisse','نیاز'],['öffentliche Beglaubigung','تصدیق عمومی']]);
 assert.equal(parts.map(p=>p.text).join(''),original);
 assert.deepEqual(parts.filter(p=>p.meaning).map(p=>p.text),['Bedürfnisse','öffentliche Beglaubigung']);
});
test('old highlights without a tool stay visible and invalid offsets are ignored',()=>{
 const old={...next(0,10)};delete old.tool;
 const runs=annotationRuns(text,'original-1-3',[old,{...old,end:999}]);
 assert.equal(runs[0].annotations.length,1);
 assert.equal(runs.map(r=>r.text).join(''),text);
});

test('source-page offsets survive exact section splitting and old cross-boundary marks remain visible',()=>{
 const saved=[next(4,15)];
 const first=annotationRuns(text.slice(0,10),'original-1-3',saved,0,text.length);
 const second=annotationRuns(text.slice(10),'original-1-3',saved,10,text.length);
 assert.equal(first.filter(r=>r.annotations.length).map(r=>r.text).join('')+second.filter(r=>r.annotations.length).map(r=>r.text).join(''),text.slice(4,15));
 assert.equal(first.map(r=>r.text).join('')+second.map(r=>r.text).join(''),text);
});
