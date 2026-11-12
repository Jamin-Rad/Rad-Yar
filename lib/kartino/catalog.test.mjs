import test from 'node:test'
import assert from 'node:assert/strict'
import {catalog,validEvents,digest,wireProgress} from './catalog.js'
const free={createdAt:0},paid={createdAt:0,publicMetadata:{subscription:{status:'active'}}}
test('paid catalog has unique IDs, hierarchy, translated cards and stable hashes',()=>{
 const c=catalog(paid,'fa'),d=catalog(paid,'fa');assert.equal(c.fullAccess,true);assert.equal(c.sessionLimit,null);assert.ok(c.decks.length>60);assert.deepEqual(c.manifest,d.manifest)
 const ids=new Set(c.decks.map(x=>x.id));assert.equal(ids.size,c.decks.length)
 for(const deck of c.decks){if(deck.parentID)assert.ok(ids.has(deck.parentID));assert.ok(deck.icon);assert.deepEqual(deck.progress,{});for(const card of deck.cards){assert.ok(card.front);assert.ok(card.answer)}}
 assert.notDeepEqual(c.manifest,catalog(paid,'de').manifest)
})
test('free entitlement keeps only two topics and five-card session limit',()=>{
 const c=catalog(free,'en');assert.equal(c.fullAccess,false);assert.equal(c.sessionLimit,5);assert.equal(c.decks.filter(d=>d.cards.length).length,2)
})
test('existing studied topic is preferred for free entitlement',()=>{
 const all=catalog(paid,'en');const last=all.decks.filter(d=>d.cards.length).at(-1)
 const c=catalog(free,'en',{[last.cards[0].id]:{}});assert.ok(c.decks.some(d=>d.id===last.id))
})
test('unknown languages use English and unsupported fields are not sent',()=>{
 assert.deepEqual(catalog(paid,'fr').manifest,catalog(paid,'en').manifest)
 assert.equal(digest('abc').length,64)
})
test('review batch validation rejects bad timestamps, payload sizes and IDs',()=>{
 const e={id:'11111111-1111-4111-8111-111111111111',cardID:'x',known:true,reviewed:new Date().toISOString(),due:new Date(Date.now()+3*86400000).toISOString()}
 assert.equal(validEvents([e]),true);assert.equal(validEvents([{...e,known:'yes'}]),false);assert.equal(validEvents([{...e,baseReviewed:'bad'}]),false);assert.equal(validEvents(Array(501).fill(e)),false);assert.equal(validEvents([{...e,reviewed:new Date(Date.now()+86400000).toISOString()}]),false)
})
test('website progress wire contract preserves mastered state and nullable dates',()=>{
 assert.deepEqual(wireProgress([{card_id:'x',box:8,status:'mastered',due_at:null,last_reviewed_at:'2026-11-12T00:00:00Z',correct_count:8,wrong_count:2}]),{x:{box:8,mastered:true,due:null,reviewed:'2026-11-12T00:00:00Z',correct:8,wrong:2}})
})
