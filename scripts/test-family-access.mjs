import test from 'node:test'
import assert from 'node:assert/strict'
import { familyCookiesAllowAccess, sameFamilySession } from '../lib/familySession.js'
import { FAMILY_SPACES } from '../data/familySpaces.js'
const cookies = values => ({ get: name => values[name] ? { value: values[name] } : undefined })

test('authenticated owner opens each member area without creating a member session',()=>{
 const store=cookies({andarun_session:'owner-secret'})
 for(const member of ['fatima','mobin'])assert.equal(familyCookiesAllowAccess(store,`${member}_session`,`${member}-secret`,'owner-secret'),true)
 assert.equal(store.get('fatima_session'),undefined)
})
test('visitors and forged owner tokens are refused',()=>{
 assert.equal(familyCookiesAllowAccess(cookies({}),'fatima_session','fatima-secret','owner-secret'),false)
 assert.equal(familyCookiesAllowAccess(cookies({andarun_session:'wrong-secret'}),'fatima_session','fatima-secret','owner-secret'),false)
 assert.equal(familyCookiesAllowAccess(cookies({andarun_session:'owner-secret'}),'fatima_session','fatima-secret',''),false)
})
test('own member login remains valid and does not grant access to another member',()=>{
 const store=cookies({fatima_session:'fatima-secret'})
 assert.equal(familyCookiesAllowAccess(store,'fatima_session','fatima-secret','owner-secret'),true)
 assert.equal(familyCookiesAllowAccess(store,'mobin_session','mobin-secret','owner-secret'),false)
})
test('logout removes owner access and empty secrets never match',()=>{
 assert.equal(familyCookiesAllowAccess(cookies({andarun_session:''}),'mobin_session','mobin-secret','owner-secret'),false)
 assert.equal(sameFamilySession('',''),false)
 assert.equal(sameFamilySession('secret',undefined),false)
})
test('menu contains only the existing family profile destinations',()=>{
 assert.deepEqual(FAMILY_SPACES.map(member=>member.href),['/fatima','/mobin','/mobina','/maman'])
 assert.equal(new Set(FAMILY_SPACES.map(member=>member.id)).size,4)
 assert.ok(FAMILY_SPACES.every(member=>!member.href.includes('?')&&!member.href.includes('login')))
})
