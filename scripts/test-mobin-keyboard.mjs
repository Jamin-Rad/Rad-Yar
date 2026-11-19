import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import test from 'node:test'

// Run the actual installed event listener with a small isolated DOM adapter.
// No learner progress or production data is used.
const source = fs.readFileSync(new URL('../app/mobin/NumberedAnswers.jsx', import.meta.url), 'utf8')
const body = source.match(/function selectAnswer\(event\) \{([\s\S]*?)\n    \}/)[1]
class Element {
  constructor({ tag='body', form=null, option=null, action=false, disabled=false, visible=true, click=()=>{} }={}) {
    Object.assign(this,{tag,form,option,action,disabled,visible,click})
  }
  getClientRects(){ return this.visible ? [{}] : [] }
  matches(){ return this.disabled }
  getAttribute(key){ return key === 'aria-disabled' && this.disabled ? 'true' : null }
  closest(selector){
    if(selector==='form') return this.form
    if(selector==='[data-mobin-option]') return this.option ? this : null
    if(selector==='[data-mobin-enter], [data-mobin-option]') return this.action || this.option ? this : null
    if(selector==='button, a, summary') return ['button','a','summary'].includes(this.tag) ? this : null
    if(selector.includes('textarea') && ['textarea','select','editable'].includes(this.tag)) return this
    if(selector.includes('input:not') && this.tag==='input') return this
    return null
  }
}
function environment(){
  const page={elements:[],querySelectorAll(selector){return this.elements.filter(el=>selector.startsWith('[data-mobin-enter]')?el.action:String(el.option)===selector.match(/"(\d+)"/)?.[1])}}
  let modal=null
  const document={querySelector:()=>modal,querySelectorAll:s=>page.querySelectorAll(s)}
  const handle=vm.runInNewContext('(event)=>{'+body+'}',{document,Element})
  return {page,setModal:m=>{modal=m},press:(key,target=new Element(),extra={})=>{
    const event={key,target,preventDefault(){this.defaultPrevented=true},...extra};handle(event);return event
  }}
}
test('number selection -> Enter check -> Enter next -> final submit',()=>{
  const e=environment();let selected=0,checked=false,completed=false
  const check=new Element({tag:'button',action:true,disabled:true,click(){checked=true;check.disabled=true;next.visible=true}})
  const next=new Element({tag:'button',action:true,visible:false,click(){completed=true}})
  const choices=Array.from({length:5},(_,i)=>new Element({tag:'button',option:i+1,click(){selected=i+1;check.disabled=false}}))
  e.page.elements=[...choices,check,next]
  assert.equal(e.press('Enter').defaultPrevented,undefined)
  for(const key of ['1','4','5','۱','٤']){e.press(key);assert.ok(selected)}
  e.press('Enter',choices[3]);assert.equal(checked,true)
  e.press('Enter',choices[3]);assert.equal(completed,true)
})
test('direct text input Enter submits only its own form',()=>{
  const e=environment(),form={},otherForm={};let checks=0
  const input=new Element({tag:'input',form})
  e.page.elements=[new Element({action:true,tag:'button',form,click(){checks++}})]
  e.press('Enter',input);assert.equal(checks,1)
  e.press('Enter',new Element({tag:'input',form:otherForm}));assert.equal(checks,1)
  e.press('1',input);assert.equal(checks,1)
})
test('disabled controls, multiline, modifiers and held keys do not submit',()=>{
  const e=environment();let clicks=0
  const button=new Element({action:true,tag:'button',click(){clicks++}});e.page.elements=[button]
  for(const extra of [{repeat:true},{isComposing:true},{ctrlKey:true},{metaKey:true},{shiftKey:true}])e.press('Enter',button,extra)
  for(const tag of ['textarea','editable','select'])e.press('Enter',new Element({tag}))
  button.disabled=true;e.press('Enter');assert.equal(clicks,0)
})
test('modal isolates keyboard from the underlying exercise',()=>{
  const e=environment();let clicks=0;e.page.elements=[new Element({action:true,option:1,click(){clicks++}})]
  e.setModal({querySelectorAll:()=>[]});e.press('1');e.press('Enter');assert.equal(clicks,0)
})
test('unrelated focused links retain Enter behavior',()=>{
  const e=environment();let clicks=0;e.page.elements=[new Element({action:true,click(){clicks++}})]
  assert.equal(e.press('Enter',new Element({tag:'a'})).defaultPrevented,undefined);assert.equal(clicks,0)
})
