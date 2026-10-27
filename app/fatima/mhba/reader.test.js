import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parallelRows,textBlocks} from './parallelText.js';
import {eraseAnnotations} from './annotations.js';
import {buildLessonPractice} from './customExam.js';
test('paired paragraphs and lists retain every source character and original highlight offsets',()=>{
 const chunk={key:'sample:1',page:1,text:'\nHeading\n\nFirst paragraph.\n\n* One\n* Two\n',fa:'\nعنوان\n\nبند اول\n\n• یک\n• دو\n',deStart:17,faStart:8};chunk.deEnd=chunk.deStart+chunk.text.length;
 const rows=parallelRows(chunk,999);assert.equal(rows.map(r=>r.de.text).join(''),chunk.text);assert.equal(rows.map(r=>r.fa.text).join(''),chunk.fa);assert.equal(rows.length,4);
 for(const lang of ['de','fa']){let offset=chunk[lang+'Start'];for(const row of rows){assert.equal(row[lang].start,offset);offset+=row[lang].text.length;assert.equal(row[lang].end,offset);}}
 assert.equal(textBlocks(' \n\nA\n\nB').map(b=>b.text).join(''),' \n\nA\n\nB');
});
test('eraser clears both mark types only in the selected range and preserves notes and other pages',()=>{
 const text='abcdefghij';const marks=[{id:'a',lessonId:1,blockId:'p1',start:1,end:9,text:'bcdefghi',tool:'highlight',note:'keep'},{id:'b',lessonId:1,blockId:'p1',start:3,end:7,tool:'underline'},{id:'c',lessonId:2,blockId:'p1',start:1,end:9}];
 const out=eraseAnnotations(marks,{lessonId:1,blockId:'p1',start:4,end:6,sourceText:text});assert.deepEqual(out.filter(h=>h.id.startsWith('a')).map(h=>[h.start,h.end,h.text,h.note]),[[1,4,'bcd','keep'],[6,9,'ghi','keep']]);assert.equal(out.filter(h=>h.tool==='underline').length,2);assert.equal(out.at(-1),marks[2]);
 assert.deepEqual(eraseAnnotations(out,{lessonId:1,blockId:'p1',start:0,end:10,sourceText:text}),[marks[2]]);
});
test('official questions remain separate from authored written and binary lesson practice',()=>{
 const lessons={1:{id:1,chapters:[{id:'a',statementIds:[0,1]},{id:'fragen',statementIds:[1]}],cards:[{id:'1.1',source:'official',official:true},{id:'c',source:'concept',chapterId:'a'}]},2:{id:2,chapters:[{id:'a',statementIds:[0]}],cards:[{id:'2.1',source:'official',official:true}]}};
 assert.equal(buildLessonPractice(lessons,[1,2],'official').length,2);const written=buildLessonPractice(lessons,[1],'written');assert.equal(written.length,1);assert.ok(written.every(q=>!q.official&&q.kind==='written'));assert.equal(buildLessonPractice(lessons,[1],'mixed').length,3);assert.equal(buildLessonPractice(lessons,[],'binary').length,0);
});
