import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { KANGURU_QUESTIONS_2022 } from '../data/kanguruQuestions2022.js'
import { KANGURU_PLANNED_YEARS, questionsForExam } from '../data/kanguruQuestions.js'

const questions = KANGURU_QUESTIONS_2022
const get = id => questions.find(question => question.id === `2022-56-${id}`)
const permutations = values => values.length ? values.flatMap((value, index) => permutations(values.filter((_, i) => i !== index)).map(tail => [value, ...tail])) : [[]]

test('2022 grades 5/6: all 24 questions match the official answer key and are selectable', () => {
  // Offizielles Lösungs-PDF, Seite 5, 2022, ausdrücklich Klassenstufen 5 und 6.
  const key = { A: 'EEDBCAEB', B: 'BBCBDACA', C: 'DBBEAECD' }
  assert.equal(questions.length, 24)
  assert.equal(new Set(questions.map(question => question.id)).size, 24)
  assert.ok(KANGURU_PLANNED_YEARS.includes(2022))
  for (const part of ['A', 'B', 'C']) {
    const selected = questionsForExam({ gradeGroup: '5-6', year: '2022', part })
    assert.equal(selected.length, 8)
    assert.equal(selected.map(question => question.correct).join(''), key[part])
    assert.deepEqual(selected.map(question => question.number), [1, 2, 3, 4, 5, 6, 7, 8])
  }
  for (const question of questions) {
    assert.deepEqual(question.options.map(option => option.id), ['A', 'B', 'C', 'D', 'E'])
    assert.equal(question.points, { A: 3, B: 4, C: 5 }[question.part])
    assert.ok(question.question.trim() && question.solutionSteps.length >= 3)
    assert.ok(question.solutionSteps.every(step => step.trim()))
    assert.ok(question.sourceHref.startsWith('/kanguru/sources/kaenguru2022_56.pdf#page='))
  }
})

test('all 36 prompt/option crops exist, have recorded dimensions and use the supplied PDF', () => {
  const root = new URL('../', import.meta.url)
  const manifest = JSON.parse(readFileSync(new URL('docs/kanguru-2022-crops.json', root)))
  const pdf = readFileSync(new URL('public/kanguru/sources/kaenguru2022_56.pdf', root))
  assert.equal(createHash('sha256').update(pdf).digest('hex'), manifest.sourceSha256)
  const used = questions.flatMap(question => [question.image, ...question.options.map(option => option.image)]).filter(Boolean)
  assert.equal(new Set(used).size, 36)
  assert.equal(manifest.crops.length, 36)
  for (const path of used) {
    assert.ok(existsSync(new URL(`public${path}`, root)), path)
    const crop = manifest.crops.find(item => path.endsWith(`/${item.file}`))
    assert.ok(crop, path)
    const png = readFileSync(new URL(`public${path}`, root))
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], crop.sizePixels)
    assert.ok(crop.boxPoints[0] >= 0 && crop.boxPoints[2] <= 595 && crop.boxPoints[1] >= 0 && crop.boxPoints[3] <= 842)
  }
})

test('independent arithmetic, minimization, year search, weights and distances', () => {
  const results = [20 + 22, 202 + 2, 202 / 2, 20 * 22, 202 * 2]
  assert.equal('ABCDE'[results.indexOf(Math.max(...results))], get('a3').correct)
  let packs = Infinity
  for (let a = 0; a <= 19; a++) for (let b = 0; b <= 9; b++) for (let c = 0; c <= 3; c++) {
    if (5 * a + 10 * b + 25 * c === 95) packs = Math.min(packs, a + b + c)
  }
  assert.equal(packs, Number(get('a4').options.find(option => option.id === get('a4').correct).text))
  const smallest = permutations(['4', '69', '113', '8', '51', '5', '67']).map(cards => cards.join('')).sort()[0]
  assert.equal(smallest, '113451567698')
  assert.equal(smallest.slice(-3), get('a6').options.find(option => option.id === get('a6').correct).text)
  assert.deepEqual(Array.from({ length: 50 }, (_, i) => 1972 + i).filter(year => /([0-9]).*\1.*\1/.test(String(year))), [1999, 2000])
  const dogWeights = []
  for (let heavy = 14; heavy < 30; heavy++) for (let elvis = 2; elvis < 13; elvis++) for (let light = 1; light < elvis; light++) {
    if (heavy + 13 + elvis + light === 30) dogWeights.push([heavy, 13, elvis, light])
  }
  assert.deepEqual(dogWeights, [[14, 13, 2, 1]])
  assert.equal(11 + (5 - 2) * (26 - 11) / (7 - 2), 20)
  assert.equal(40 * 20 * 3 / (12 * 20), 10)
  const positions = [2, 12].flatMap(c => [-6, 6].filter(d => Math.abs(c - d) === 8).map(d => ({ A: 0, B: 7, C: c, D: d })))
  assert.deepEqual(positions, [{ A: 0, B: 7, C: 2, D: -6 }])
  assert.equal(positions[0].B - positions[0].D, 13)
})

test('A8: only B has an alternating touching path through all six caterpillar segments', () => {
  // Circle centers and colors read from the supplied vector PDF. 1 = dark.
  const figures = [
    [[96.25,315.1,1],[111.84,315.1,1],[127.43,315.1,1],[104.04,301.6,0],[119.64,301.6,0],[111.84,288.1,0]],
    [[198.36,315.1,1],[213.95,315.1,0],[229.54,315.1,0],[206.15,301.6,0],[221.74,301.6,1],[237.33,301.6,1]],
    [[327.9,291.7,1],[314.4,283.91,1],[300.9,291.7,0],[300.9,307.3,1],[314.4,315.09,0],[327.9,307.3,0]],
    [[402.9,315.1,0],[402.9,299.51,1],[416.4,307.31,0],[416.4,291.72,1],[429.9,315.1,0],[429.9,299.51,1]],
    [[520.08,315.1,0],[504.49,299.51,1],[520.08,299.51,1],[535.67,299.51,1],[512.29,286.01,0],[527.88,286.01,0]],
  ]
  const valid = figures.map(points => permutations(points).some(path => path.slice(1).every((point, i) => point[2] !== path[i][2] && Math.abs(Math.hypot(point[0] - path[i][0], point[1] - path[i][1]) - 15.59) < .1)))
  assert.deepEqual(valid, [false, true, false, false, false])
  assert.equal(get('a8').correct, 'B')
})

test('B1 and B5: exhaustive searches confirm unique circle assignments', () => {
  const groups = [[0,1,5,6], [2,3,7,11], [4,8,12,13], [9,10,14,15]]
  const latinRows = permutations([1, 2, 3, 4]), grids = []
  for (const a of latinRows) for (const b of latinRows.filter(row => row[1] === 3 && row[2] === 2)) {
    for (const c of latinRows.filter(row => row[1] === 2 && row[2] === 1)) for (const d of latinRows) {
      const grid = [...a, ...b, ...c, ...d]
      if ([0,1,2,3].every(col => new Set([a[col],b[col],c[col],d[col]]).size === 4) && groups.every(group => new Set(group.map(i => grid[i])).size === 4)) grids.push(grid)
    }
  }
  assert.deepEqual(grids, [[1,4,3,2, 4,3,2,1, 3,2,1,4, 2,1,4,3]])
  const triangles = permutations([1,2,3,4,5,6]).filter(([a,b,c,d,e,f]) => a*b*c === 8 && b*c*e === 10 && d*b*e === 15 && e*c*f === 60)
  assert.deepEqual(triangles, [[4,1,2,3,5,6]])
  assert.equal(triangles[0][0] + triangles[0][3] + triangles[0][5], 13)
})

test('B4 and C1: exact arrow chain and all 1000 possible lock codes', () => {
  const factors = [4,2,4,.5,4,.5,.25,.5,.25,2,.25]
  assert.equal(factors.reduce((value, factor) => value * factor, 12), 6)
  const matches = (code, guess) => ({ exact: [...code].filter((digit, i) => digit === guess[i]).length, total: [...guess].filter(digit => code.includes(digit)).length })
  const codes = Array.from({ length: 1000 }, (_, i) => String(i).padStart(3, '0')).filter(code => {
    const a = matches(code, '206'), b = matches(code, '614'), c = matches(code, '682'), d = matches(code, '738')
    return a.total === 2 && a.exact === 0 && b.total === 1 && b.exact === 0 && c.total === 1 && c.exact === 1 && d.total === 0
  })
  assert.deepEqual(codes, ['042'])
  assert.equal(get('c1').options.find(option => option.id === get('c1').correct).text, codes[0])
})

test('C2 area, C3 maximum projection-compatible solid, C4 attainable results', () => {
  const polygon = [[4,0],[4,2],[8,4],[6,4],[4,8],[4,6],[0,4],[2,4]]
  const doubleArea = polygon.reduce((sum, [x,y], i) => { const [xx,yy] = polygon[(i + 1) % polygon.length]; return sum + x*yy - xx*y }, 0)
  assert.equal(Math.abs(doubleArea) / 2, 16)
  const top = [[0,1,1,0],[0,1,1,1],[1,1,1,0],[0,0,1,0]], front = [1,3,3,1], depth = [3,3,2,1]
  const heights = top.map((row, r) => row.map((occupied, c) => occupied ? Math.min(front[c], depth[r]) : 0))
  assert.deepEqual(heights.map(row => row.reduce((a,b) => a+b, 0)), [6,7,5,1])
  assert.equal(heights.flat().reduce((a,b) => a+b, 0), 19)
  assert.deepEqual(front.map((_, c) => Math.max(...heights.map(row => row[c]))), front)
  assert.deepEqual(heights.map(row => Math.max(...row)), depth)
  const results = new Set(permutations([3,4,5,6,7]).filter(([a,b,c,d]) => a+b-c === d).map(([, , , d]) => d))
  assert.deepEqual([...results].sort(), [3,4,5,6,7])
})

test('C6: geometric folding with printed side outside matches A–D and excludes E', () => {
  // Grid coordinates and mark directions transcribed from the five original nets.
  const nets = [
    [[4,0,'V'],[5,0,'V'], ...['.','H','H','+','.','.'].map((m,x) => [x,1,m]), [1,2,'.'],[2,2,'.']],
    [[2,0,'V'],[3,0,'.'], ...['.','+','H','H','.','.'].map((m,x) => [x,1,m]), [2,2,'V'],[3,2,'V']],
    [[4,0,'H'],[4,1,'H'], ...['.','+','H','H','+','.'].map((m,x) => [x,2,m]), [1,3,'V'],[1,4,'V']],
    [[1,0,'.'],[2,0,'+'], ...['.','+','.','+'].map((m,x) => [x,1,m]), [1,2,'V'],[2,2,'V'],[1,3,'H'],[2,3,'H']],
    [[1,0,'H'],[2,0,'H'],[0,1,'+'],[1,1,'.'],[2,1,'+'],[1,2,'V'],[2,2,'V'],[3,2,'.'],[1,3,'V'],[2,3,'V']],
  ]
  const add = (a,b) => a.map((x,i) => x+b[i]), scale = (a,s) => a.map(x => x*s), dot = (a,b) => a.reduce((s,x,i) => s+x*b[i], 0)
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
  const axes = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]], dimensions = [4,2,2]
  const surface = []
  for (let axis = 0; axis < 3; axis++) for (const side of [0, dimensions[axis]]) {
    const rest = [0,1,2].filter(i => i !== axis)
    for (let a = 1; a < dimensions[rest[0]]; a += 2) for (let b = 1; b < dimensions[rest[1]]; b += 2) {
      const p = [0,0,0], n = [0,0,0]; p[axis] = side; p[rest[0]] = a; p[rest[1]] = b; n[axis] = side ? 1 : -1; surface.push([p,n])
    }
  }
  const matches = nets.map(tiles => {
    const net = new Map(tiles.map(([x,y,mark]) => [`${x},${y}`, mark]))
    for (const [p,n] of surface) for (const u of axes.filter(axis => !dot(axis,n))) {
      // x right, y down in the source; the printed outward normal is −(u × v).
      const v = scale(cross(n,u), -1), placed = new Map([[net.keys().next().value, [p,n,u,v]]]), queue = [...placed.keys()]
      let valid = true
      for (let i = 0; i < queue.length && valid; i++) {
        const key = queue[i], [x,y] = key.split(',').map(Number), [position, normal, a, b] = placed.get(key)
        for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
          const neighbor = `${x+dx},${y+dy}`; if (!net.has(neighbor)) continue
          const direction = add(scale(a,dx),scale(b,dy)), q = add(position,scale(direction,2))
          const rotate = w => add(add(w,scale(direction, dot(w,normal)-dot(w,direction))),scale(normal,-dot(w,normal)-dot(w,direction)))
          const state = q.every((value,j) => value >= 0 && value <= dimensions[j]) ? [q,normal,a,b] : [add(add(position,direction),scale(normal,-1)),direction,rotate(a),rotate(b)]
          if (placed.has(neighbor)) { if (JSON.stringify(placed.get(neighbor)) !== JSON.stringify(state)) { valid = false; break } }
          else { placed.set(neighbor,state); queue.push(neighbor) }
        }
      }
      if (!valid || new Set([...placed.values()].map(state => state[0].join(','))).size !== 10) continue
      const marks = new Map([...placed].map(([coord,[pos,,a,b]]) => [pos.join(','), [net.get(coord),net.get(coord) === 'H' ? a : b]]))
      const bar = (pos,direction) => { const [mark,vector] = marks.get(pos); return ['H','V'].includes(mark) && Math.abs(dot(vector,direction)) === 1 }
      if (['1,0,1','3,0,1'].every(pos => bar(pos,[1,0,0])) && ['1,1,2','3,1,2'].every(pos => bar(pos,[0,1,0])) && marks.get('4,1,1')[0] === '+') return true
    }
    return false
  })
  assert.deepEqual(matches, [true,true,true,true,false])
  assert.equal(get('c6').correct, 'E')
})

test('C8: dynamic search over cyclic truth-teller arrangements gives maximum 20', () => {
  let best = 0
  for (const a of [0,1]) for (const b of [0,1]) {
    let states = new Map([[`${a}${b}`, a+b]])
    for (let length = 2; length < 30; length++) {
      const next = new Map()
      for (const [tail,count] of states) for (const value of [0,1]) if (tail !== '11' || value !== 1) {
        const key = `${tail[1]}${value}`; next.set(key, Math.max(next.get(key) ?? -Infinity, count+value))
      }
      states = next
    }
    for (const [tail,count] of states) if (!(tail === '11' && a) && !(tail[1] === '1' && a && b)) best = Math.max(best,count)
  }
  assert.equal(best, 20)
  assert.equal(Number(get('c8').options.find(option => option.id === get('c8').correct).text), best)
})
