import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cardBox,scheduleCard,selectBoxCards} from './leitner.js';
import {buildCustomExam} from './customExam.js';
test('new study starts box one, recall promotes, failure returns to box one and old schedules remain compatible',()=>{
 const now=100000;const first=scheduleCard(null,true,now);assert.equal(first.box,1);assert.equal(first.due,now+86400000);
 assert.equal(scheduleCard(first,true,now).box,2);assert.equal(scheduleCard({box:5},true,now).box,5);
 const failed=scheduleCard({box:4},false,now);assert.equal(failed.box,1);assert.equal(failed.due,now+600000);
 assert.equal(cardBox({level:-1}),1);assert.equal(cardBox({level:3}),4);assert.equal(cardBox(null),0);
 const cards=[{id:'a'},{id:'b'},{id:'c'}];const review={a:{level:0,due:now-1},b:{box:2,due:now+1}};
 assert.deepEqual(selectBoxCards(cards,review,'new',now).map(c=>c.id),['c']);
 assert.deepEqual(selectBoxCards(cards,review,'today',now).map(c=>c.id),['a']);
 assert.deepEqual(selectBoxCards(cards,review,'2',now).map(c=>c.id),['b']);
});
test('multi-lesson exams deduplicate overlapping topics and respect question types',()=>{
 const lesson=(id)=>({id,fa:'درس',chapters:[{id:'a',statementIds:[0,1]},{id:'b',statementIds:[1,2]},{id:'fragen',statementIds:[0]}],cards:[{id:`${id}.1`,source:'official',text:'q'},{id:`concept-${id}`,source:'concept',chapterId:'a',text:'c'}]});
 const lessons={1:lesson(1),2:lesson(2)};const selected=['1:a','1:b','2:a','1:fragen'];
 const binary=buildCustomExam(lessons,selected,'binary');assert.equal(binary.length,5);assert.equal(new Set(binary.map(q=>q.id)).size,5);assert.ok(binary.every(q=>q.kind==='binary'&&q.fa&&q.whyDe));
 const written=buildCustomExam(lessons,selected,'questions');assert.equal(written.length,3);assert.ok(written.every(q=>q.kind==='written'));
 assert.equal(buildCustomExam(lessons,selected,'mixed').length,8);assert.equal(buildCustomExam(lessons,[],'mixed').length,0);
});
