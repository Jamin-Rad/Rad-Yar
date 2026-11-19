import test from 'node:test'
import assert from 'node:assert/strict'
import { pricePatterns } from './chart-analysis.mjs'


test('reversals trace every pivot and draw only the neckline through the inner pivots',()=>{
  for (const [name,values,count] of [
    ['سقف دوقلو',[5,10,6,10,5,4],3],
    ['سقف سه‌قلو',[4,9,5,9,5,9,4,3],5],
    ['سر و شانه',[5,9,6,12,6,9,5,4],5],
  ]) {
    const rows=candles(values)
    const shape=pricePatterns(rows).find(item=>item.name===name)
    assert.equal(shape.points.length,count)
    assert.equal(shape.boundaries.length,1)
    const [neck]=shape.boundaries
    assert.deepEqual(neck[0],{index:shape.points[1].index,price:shape.points[1].price})
    assert.ok(shape.points.every(p=>p.price===rows[p.index][p.top?'high':'low']))
    assert.ok(rows[shape.end].close<neck[1].price)
  }
})

test('triangles have two boundaries and six actual pivots; only flags include a pole',()=>{
  for (const [name,values,pole] of [
    ['مثلث صعودی',[8,10,5,10,6,10,7,9,8,11],false],
    ['پرچم صعودی',[1,2,4,8,15,12,14,11,13,10,16,17],true],
  ]) {
    const shape=pricePatterns(candles(values)).find(item=>item.name===name)
    assert.equal(shape.boundaries.length,2)
    assert.equal(shape.points.length,6)
    assert.equal(!!shape.pole,pole)
  }
})

test('close-only prices never produce a pivot pattern',()=>{
  assert.deepEqual(pricePatterns(candles([5,10,6,10,5,4]).map(({close})=>({close}))),[])
})
function candles(values) {
  return values.flatMap((value,index)=>{
    const next=values[index+1]
    return next==null?[value]:[value,(2*value+next)/3,(value+2*next)/3]
  }).map(close=>({close,high:close+.1,low:close-.1}))
}

test('finds reversal and continuation shapes, including nearly equal pivots',()=>{
  for (const [name,values] of [
    ['سر و شانه',[5,9,6,12,6,9,5,4]],
    ['سقف دوقلو',[5,10,6,10,5,4]],
    ['سقف سه‌قلو',[4,9,5,9,5,9,4,3]],
    ['مثلث صعودی',[8,10,5,10,6,10,7,9,8,11]],
    ['مثلث بازشوندهٔ متقارن',[7,9,6,10,5,11,4,8]],
    ['گوهٔ صعودی',[8,10,5,11,7,12,9,10,8]],
    ['پرچم صعودی',[1,2,4,8,15,12,14,11,13,10,16,17]],
    ['پرچم سه‌گوش',[1,2,5,8,15,9,14,10,13,11,16,17]],
  ]) assert.ok(pricePatterns(candles(values)).some(pattern=>pattern.name===name),name)
})

test('requires two closing bars to confirm the last pivot and preserves the breakout direction',()=>{
  const rows=candles([5,10,6,10,5,4])
  assert.deepEqual(pricePatterns(rows.slice(0,11)),[])
  assert.equal(pricePatterns(rows)[0]?.breakout,'down')
  const inverse=rows.map(row=>({close:20-row.close,high:20-row.low,low:20-row.high}))
  assert.equal(pricePatterns(inverse)[0]?.name,'کف دوقلو')
  assert.equal(pricePatterns(inverse)[0]?.breakout,'up')
  assert.deepEqual(pricePatterns(candles([3,4,5,6,7,8,9])),[])
})
