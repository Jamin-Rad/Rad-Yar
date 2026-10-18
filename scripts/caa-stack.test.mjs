import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {CAA_EXAM_SERIES,getCaseStageSeries} from '../data/caaExamSeries.mjs'

const manifest=JSON.parse(readFileSync(new URL('../public/caa/exams/radiopaedia/stacks/provenance.json',import.meta.url),'utf8'))

test('All 442 original slices exist in source order and match their recorded hashes',()=>{
  let total=0
  for(const [id,series] of Object.entries(CAA_EXAM_SERIES)){
    const source=manifest.series[id]
    assert.equal(series.frames.length,source.frames.length)
    assert(series.initialFrame>=0&&series.initialFrame<series.frames.length)
    assert.equal(new Set(series.frames).size,series.frames.length)
    series.frames.forEach((frame,index)=>{
      assert.equal(frame,'/caa/exams/radiopaedia/stacks/'+source.frames[index].file)
      const pixels=readFileSync(new URL('../public'+frame,import.meta.url))
      assert.equal(createHash('sha256').update(pixels).digest('hex'),source.frames[index].sha256)
      total++
    })
  }
  assert.equal(total,442)
})

test('CT, MRI and follow-up stacks are isolated to the relevant bleeding-case stages',()=>{
  const ids=stage=>getCaseStageSeries('caa-radiopaedia-40475',stage).map(series=>series.id)
  assert.deepEqual(ids(0),[])
  assert.deepEqual(ids(1),['40475-ct'])
  assert.deepEqual(ids(2),['40475-ct'])
  assert.deepEqual(ids(3),['40475-gre'])
  assert.deepEqual(ids(4),['40475-cta-followup'])
  assert.deepEqual(ids(5),[])
})

test('CAA-ri follows FLAIR, diffusion, SWI and final integration without future sequence requests',()=>{
  const ids=stage=>getCaseStageSeries('caa-radiopaedia-147140',stage).map(series=>series.id)
  assert.deepEqual(ids(0),['147140-flair'])
  assert.deepEqual(ids(1),['147140-dwi','147140-adc','147140-flair'])
  assert.deepEqual(ids(2),['147140-swi-minip','147140-swi','147140-flair'])
  assert.deepEqual(ids(3),['147140-flair','147140-swi-minip','147140-swi','147140-dwi','147140-adc','147140-t1c'])
  assert.deepEqual(ids(4),[])
  assert.deepEqual(ids(5),[],'No baseline stack may masquerade as a follow-up MRI')
  assert.deepEqual(getCaseStageSeries('unknown',0),[])
})
