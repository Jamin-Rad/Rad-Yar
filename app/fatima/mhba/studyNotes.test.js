import {test} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import StudyNotes from './StudyNotes.jsx';

test('legacy bilingual notes without source lists remain readable when all official answers are revealed',()=>{
 const note={title:'Legacy explanation',de:'Vollständige Erläuterung',fa:'توضیح کامل'};
 for(const compact of [false,true]){
  const html=renderToStaticMarkup(React.createElement(StudyNotes,{notes:[note],compact}));
  assert.match(html,/Vollständige Erläuterung/);assert.match(html,/توضیح کامل/);assert.doesNotMatch(html,/<nav/);
 }
 const linked={...note,id:'linked',sources:[{title:'Source',url:'https://example.com/source'}]};
 assert.match(renderToStaticMarkup(React.createElement(StudyNotes,{notes:[linked]})),/href="https:\/\/example.com\/source"/);
});
