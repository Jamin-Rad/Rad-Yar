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

test('book pagination fits complete bilingual rows, keeps titles with text and never drops oversized paragraphs',async()=>{
 const {packBookRows}=await import('./bookPagination.js');
 assert.deepEqual(packBookRows([50,120,150,100],300),[[0,1],[2,3]]);
 assert.deepEqual(packBookRows([40,400,80],300,true),[[0,1],[2]]);
 assert.deepEqual(packBookRows([700,90,90],300),[[0],[1,2]]);
 assert.deepEqual(packBookRows([],300),[]);
});

test('original figures have unique allowlisted files and belong to exactly one source row',async()=>{
 const {sourceFigures,sourceFigureFiles,figuresForRow}=await import('./sourceFigures.js');
 assert.equal(sourceFigures[1].length,8);assert.equal(sourceFigures[5].length,3);
 assert.equal(sourceFigureFiles.size,12);
 for(const [lesson,figures] of Object.entries(sourceFigures))for(const figure of figures){
  assert.match(figure.file,/^lesson-[15]-(?:table|figure|intro)[\w.-]*\.webp$/);
  assert.ok(figure.width>0&&figure.height>0&&Number.isInteger(figure.anchor));
  const before={de:{start:0,end:figure.anchor}},after={de:{start:figure.anchor,end:figure.anchor+1}};
  assert.ok(!figuresForRow(lesson,figure.page,before).some(f=>f.id===figure.id));
  assert.equal(figuresForRow(lesson,figure.page,after).filter(f=>f.id===figure.id).length,1);
 }
 assert.deepEqual(figuresForRow(2,13,{de:{start:0,end:10000}}),[]);
 assert.ok(!sourceFigureFiles.has('../materials-bilingual-v3.json'));
});
