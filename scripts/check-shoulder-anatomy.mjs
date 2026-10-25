import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SHOULDER_COPY, SHOULDER_MEDIA, SHOULDER_OVERVIEW, SHOULDER_LANDMARKS, SHOULDER_VIEWS, SHOULDER_CHECKS, SHOULDER_SUMMARY, SHOULDER_REFERENCES } from '../data/shoulderAnatomyLesson.js'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
let translatedUnits=0
function translations(value) {
  if(!value || typeof value!=='object')return
  if(['de','en','fa'].some(key=>key in value)) {
    for(const lang of ['de','en','fa'])assert.equal(typeof value[lang],'string',`Missing ${lang} translation`)
    for(const lang of ['de','en','fa'])assert(value[lang].trim().length>0)
    translatedUnits++
  } else Object.values(value).forEach(translations)
}
translations({SHOULDER_COPY,SHOULDER_MEDIA,SHOULDER_OVERVIEW,SHOULDER_LANDMARKS,SHOULDER_VIEWS,SHOULDER_CHECKS,SHOULDER_SUMMARY,SHOULDER_REFERENCES})
for(const image of Object.values(SHOULDER_MEDIA)) {
  assert(fs.statSync(path.join(root,'public',image.src)).size>1000,`Image missing: ${image.src}`)
  if(image.crop){const [x,y,w,h]=image.crop;assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=image.width&&y+h<=image.height)}
}
for(const step of [SHOULDER_OVERVIEW,...SHOULDER_LANDMARKS]) {
  for(const mode of ['anatomy','xr','mr'])assert(SHOULDER_MEDIA[step.media[mode]],`${step.id}: missing ${mode}`)
  assert(step.targets.length>0)
  for(const target of step.targets){assert(target.points.anatomy&&target.points.mr,`${target.id}: missing anatomy/MRI relationship`);for(const point of Object.values(target.points))assert(point.length===2&&point.every(n=>Number.isFinite(n)&&n>=0&&n<=100))}
}
const ids=SHOULDER_LANDMARKS.flatMap(step=>step.targets.map(target=>target.id))
for(const id of ['acromion','ac','coracoid','glenoid','scapular-neck','greater','lesser','groove','anatomical-neck','surgical-neck'])assert(ids.includes(id),`Missing essential landmark: ${id}`)
for(const item of SHOULDER_CHECKS){assert(SHOULDER_MEDIA[item.media]);assert(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<item.options.length);assert(item.explanation.fa.length>25)}
assert(SHOULDER_VIEWS.some(view=>view.media==='apInternal')&&SHOULDER_VIEWS.some(view=>view.media==='axillary')&&SHOULDER_VIEWS.some(view=>view.media==='y'))
assert(SHOULDER_SUMMARY.length>=3&&SHOULDER_SUMMARY.length<=5)
assert(SHOULDER_REFERENCES.every(source=>source.href.startsWith('https://')))
const curriculum=fs.readFileSync(path.join(root,'data/curriculum.js'),'utf8')
assert.equal((curriculum.match(/id: 'schulter-anatomie'/g)||[]).length,1)
assert(curriculum.slice(curriculum.indexOf("id: 'msk-schulter'"),curriculum.indexOf("id: 'msk-ellenbogen'")).includes("link: '/msk/schulter/anatomie'"))
const status=fs.readFileSync(path.join(root,'data/lessonStatus.js'),'utf8')
assert(!status.includes("'/msk/schulter/anatomie'"),'Do not turn publication into a completion/scientific approval flag')
console.log(JSON.stringify({translatedUnits,landmarks:ids.length,images:Object.keys(SHOULDER_MEDIA).length,checks:SHOULDER_CHECKS.length,scope:'Content, assets, registration and assessment consistency; not independent scientific approval'}))
