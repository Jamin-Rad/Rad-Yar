import {test} from 'node:test';
import assert from 'node:assert/strict';
import {rebaseSourceAnnotation,migrateSourceAnnotations,sourceEdits,SOURCE_REVISION} from './sourceRevisions.js';
import {lesson5Notes,lesson5PracticePages,lesson5QuestionNotes} from './lesson5Audit.js';
import {lesson5Practice} from './lesson5Practice.js';

test('PDF character repairs preserve selected words, notes and review records',()=>{
 const text='abc G\ndef';const edit={start:3,remove:2,insert:''};
 const mark={id:'mark',start:0,end:text.length,text,note:'keep',reviewEnabled:true,color:'rose'};
 const fixed=rebaseSourceAnnotation(mark,edit);assert.equal(fixed.text,'abc\ndef');assert.equal(fixed.end,7);assert.equal(fixed.note,'keep');assert.equal(fixed.reviewEnabled,true);
 const after=rebaseSourceAnnotation({...mark,start:6,end:9,text:'def'},edit);assert.deepEqual([after.start,after.end,after.text],[4,7,'def']);
 const insertion={start:2,remove:0,insert:'-'};
 assert.deepEqual(Object.values(rebaseSourceAnnotation({start:0,end:5,text:'a/bcd'},insertion)).slice(0,3),[0,6,'a/-bcd']);
 const starting=rebaseSourceAnnotation({start:2,end:5,text:'bcd'},insertion);assert.deepEqual([starting.start,starting.end,starting.text],[3,6,'bcd']);
 const ending=rebaseSourceAnnotation({start:0,end:2,text:'a/'},insertion);assert.deepEqual([ending.start,ending.end,ending.text],[0,2,'a/']);
});

test('legacy and restored marks migrate once without touching other lessons or schedules',()=>{
 const edit=sourceEdits[0],mark={id:'old',lessonId:5,blockId:edit.blockId,start:edit.start+10,end:edit.start+14,text:'test',note:'saved'};
 const unrelated={...mark,id:'other',lessonId:1};const review={'5.4':{box:3,due:12345}};
 const original={version:1,highlights:[mark,unrelated],review};const migrated=migrateSourceAnnotations(original);
 assert.equal(migrated.highlights[0].start,mark.start-edit.remove);assert.equal(migrated.highlights[0].sourceRevision,SOURCE_REVISION);
 assert.equal(migrated.highlights[1],unrelated);assert.equal(migrated.review,review);assert.equal(migrateSourceAnnotations(migrated),migrated);assert.equal(original.highlights[0],mark);
});

test('audited notes accompany every contradictory official answer and each binary item has source evidence',()=>{
 for(const id of ['5.3','5.4','5.6','5.8','5.9'])assert.ok(lesson5QuestionNotes(id).length);
 assert.equal(lesson5PracticePages.length,lesson5Practice.length);
 assert.ok(lesson5PracticePages.every(pages=>pages.length&&pages.every(p=>Number.isInteger(p)&&p>=3&&p<=44)));
 assert.equal(new Set(lesson5Notes.map(n=>n.id)).size,lesson5Notes.length);
 for(const note of lesson5Notes){assert.ok(note.de&&note.fa&&note.title);assert.ok(note.sources.every(s=>s.url.startsWith('https://')&&s.title));}
});
