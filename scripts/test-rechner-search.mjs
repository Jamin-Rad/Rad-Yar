import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const source=await readFile(new URL('../components/rechner/catalog.js',import.meta.url),'utf8')
const {filterTools,TOOLS,GROUPS}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))
for(const [query,id] of [['fleishner','fleischner'],['fleischner','fleischner'],['prosttaa','prostata-psa'],['evnas','evans-index'],['nascet','nascet'],['pirads','pi-rads'],['كليه','niere-volumen']]) {
 assert.ok(filterTools('all',query).some(t=>t.id===id),query)
}
assert.equal(filterTools('all','zzzzzzzz').length,0)
assert.equal(filterTools('all','').length,TOOLS.length)
for(const g of GROUPS) assert.ok(filterTools(g.id,'').every(t=>t.group===g.id||t.alsoIn?.includes(g.id)))
assert.ok(filterTools('mamma','node').some(t=>t.id==='node-rads'))
assert.equal(filterTools('urogenital','fleishner').length,0)
console.log('Rechner search: typo, transposition, normalization, aliases, empty and category checks passed.')
