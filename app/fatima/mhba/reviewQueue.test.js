import test from 'node:test';
import assert from 'node:assert/strict';
import {createReviewQueue} from './reviewQueue.js';
import {nextReview} from './exam.js';
test('due sessions exclude future cards and personal annotations, and order actual review dates',()=>{
 const cards=[{id:'future',source:'official'},{id:'later',source:'concept'},{id:'old',source:'vocabulary'},{id:'personal',source:'highlight'}];
 const review={future:{due:3000},later:{due:1500},old:{due:500}};
 assert.deepEqual(createReviewQueue(cards,review,true,2000).map(c=>c.id),['old','later']);
 assert.deepEqual(createReviewQueue(cards,review,false,2000).map(c=>c.id),['old','later','future']);
 assert.equal(cards[0].priorReview,undefined);
});
test('new official questions take priority and grading keeps compatible review intervals',()=>{
 const cards=[{id:'word',source:'vocabulary'},{id:'concept',source:'concept'},{id:'official',source:'official'}];
 assert.deepEqual(createReviewQueue(cards).map(c=>c.id),['official','concept','word']);
 const first=nextReview(undefined,true,1000);
 assert.equal(first.due,1000+86400000);
 assert.equal(nextReview(first,true,2000).due,2000+3*86400000);
 assert.equal(nextReview(first,false,2000).due,2000+600000);
 assert.equal(createReviewQueue(cards,{official:first},true,1001).some(c=>c.id==='official'),false);
});
test('overdue reviews precede new cards, which precede scheduled future cards',()=>{
 const cards=[{id:'new',source:'official'},{id:'overdue',source:'vocabulary'},{id:'future',source:'concept'}];
 const review={overdue:{due:500},future:{due:3000}};
 assert.deepEqual(createReviewQueue(cards,review,false,2000).map(c=>c.id),['overdue','new','future']);
});
