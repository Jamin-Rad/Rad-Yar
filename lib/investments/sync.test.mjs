import test from 'node:test'
import assert from 'node:assert/strict'
import {choosePortfolioVersion} from './sync.mjs'
test('untouched browser cache follows the server without creating a false conflict',()=>{
 const remote={state:{name:'server'},revision:'new',cloud:true},local={state:{name:'cache'},baseRevision:'old',dirty:false,localOnly:false}
 assert.deepEqual(choosePortfolioVersion(remote,local,local.state,0,'old'),{state:remote.state,revision:'new',modified:false,conflict:false})
})
test('an edit during initial loading survives a late GET and preserves its conflict boundary',()=>{
 const remote={state:{name:'server'},revision:'new',cloud:true},local={state:{name:'cache'},baseRevision:'old',dirty:false},edited={name:'edited'}
 const chosen=choosePortfolioVersion(remote,local,edited,1,'old')
 assert.equal(chosen.state,edited);assert.equal(chosen.revision,'old');assert.equal(chosen.modified,true);assert.equal(chosen.conflict,true)
})
test('browser-only data remains the source when a server store is not configured',()=>{
 const local={state:{name:'offline'},baseRevision:null,dirty:false,localOnly:true}
 assert.equal(choosePortfolioVersion({state:{},revision:null,cloud:false},local,local.state,0,null).state,local.state)
})
