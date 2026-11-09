'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { REF_DATA, tx } from '@/data/referenzen'
import styles from './CalculatorEngine.module.css'
const BostonCalculator = dynamic(() => import('../BostonCalculator'))

export default function CalculatorEngine({ id, lang }) {
  const calc = REF_DATA.rechner.find(item => item.id === id)
  if (!calc) return null
  return <div data-calculator={id} style={{ '--rc': calc.color }}>
    {calc.formula && <div className={styles.rcFormula} style={{ marginBottom: 24 }}>{calc.formula}</div>}
    {calc.type === 'boston' && <BostonCalculator lang={lang} />}
    {calc.type === 'single' && <SingleCalc calc={calc} lang={lang} />}
    {calc.type === 'multi' && <MultiCalc calc={calc} lang={lang} />}
    {calc.type === 'conversion' && <ConversionCalc calc={calc} lang={lang} />}
    {calc.type === 'recist' && <RecistCalc calc={calc} lang={lang} />}
    {calc.type === 'birads-kalk' && <BiRadsKalkCalc calc={calc} lang={lang} />}
    {calc.type === 'birads-masse' && <BiRadsMasseCalc calc={calc} lang={lang} />}
    {calc.hint && <p className={styles.rcHint}>{tx(calc.hint, lang)}</p>}
  </div>
}

/* ── Hilfsfunktionen ──────────────────────────── */
function numFmt(val, decimals) {
  if (val == null) return null
  return decimals != null ? val.toFixed(decimals) : val.toFixed(1)
}
function getRange(ranges, val) {
  if (val == null || ranges == null) return null
  return ranges.find(r => val <= r.max) || null
}
function FieldRow({ label, help, id, val, onChange, unit, step = 0.1, min, max }) {
  return (
    <label className={styles.rcField}>
      <span className={styles.rcFieldLabel}>
        {label}
        {help && (
          <span className={styles.rcHelp} tabIndex={0} aria-label={help}>
            ?
            <span className={styles.rcHelpBubble}>{help}</span>
          </span>
        )}
      </span>
      <div className={styles.rcInputWrap}>
        <input type="number" className={styles.rcInput}
          placeholder="—" min={min} max={max} step={step}
          value={val ?? ''} onChange={e => onChange(id, e.target.value)} />
        <span className={styles.rcUnit}>{unit}</span>
      </div>
    </label>
  )
}
function ResultBox({ val, unit, decimals, range, lang }) {
  const display = numFmt(val, decimals)
  return (
    <div className={styles.rcResult} style={{
      background: range ? range.color + '14' : '#f8fafc',
      borderColor: range ? range.color + '44' : '#eef2f7',
    }}>
      {display != null ? (
        <>
          <span className={styles.rcResultVal} style={{color: range?.color || '#1a2051'}}>
            {display}{unit ? ` ${unit}` : ''}
          </span>
          {range && <span className={styles.rcResultLabel} style={{color: range.color}}>{tx(range.label, lang)}</span>}
        </>
      ) : (
        <span className={styles.rcResultPlaceholder}>—</span>
      )}
    </div>
  )
}

/* ── BiRadsMasseCalc ──────────────────────────── */
// ACR BI-RADS 5th Ed. – Masse in der Mammographie
// Form × Rand → BI-RADS 2–5; fetthaltig → immer BI-RADS 2
const BRM_MATRIX = {
  // [form][rand] → kategorie
  oval_rund: { circumscribed:'3', microlobulated:'4A', indistinct:'4B', angular:'4B', spiculated:'4C' },
  irregular: { circumscribed:'4A', microlobulated:'4B', indistinct:'4B', angular:'4C', spiculated:'5' },
}
const BRM_CAT_COLORS = { '2':'#16a34a','3':'#16a34a','4A':'#0891b2','4B':'#2563eb','4C':'#d97706','5':'#dc2626' }
const BRM_CAT_BG     = { '2':'#dcfce7','3':'#dcfce7','4A':'#cffafe','4B':'#dbeafe','4C':'#fef3c7','5':'#fee2e2' }
const BRM_INTERP = {
  '2':  { de:'Benigne · Keine weitere Abklärung',                    en:'Benign · No further workup',              fa:'خوش‌خیم · بدون بررسی بیشتر' },
  '3':  { de:'Wahrscheinlich benigne · Verlaufskontrolle 6 Mon.',    en:'Probably benign · Follow-up 6 mo',        fa:'احتمالاً خوش‌خیم · پیگیری ۶ ماهه' },
  '4A': { de:'Gering suspekt (2–10 %) · Biopsie erwägen',           en:'Low suspicion (2–10 %) · Consider biopsy', fa:'شک کم (۲–۱۰٪) · بیوپسی مد نظر' },
  '4B': { de:'Mäßig suspekt (10–50 %) · Biopsie empfohlen',         en:'Moderate suspicion (10–50 %) · Biopsy rec.', fa:'شک متوسط (۱۰–۵۰٪) · بیوپسی توصیه' },
  '4C': { de:'Stark suspekt (50–95 %) · Biopsie dringend empfohlen', en:'High suspicion (50–95 %) · Biopsy strongly rec.', fa:'شک زیاد (۵۰–۹۵٪) · بیوپسی اکید' },
  '5':  { de:'Hochgradig malignomverdächtig (> 95 %) · Biopsie obligat', en:'Highly suspicious (>95 %) · Biopsy mandatory', fa:'بسیار مشکوک (>۹۵٪) · بیوپسی اجباری' },
}
function BiRadsMasseCalc({ calc, lang }) {
  const [fat,   setFat]   = useState(false)
  const [shape, setShape] = useState('')
  const [rand,  setRand]  = useState('')
  const lbl = (obj) => obj[lang] || obj.de
  const result = fat ? '2' : (shape && rand ? BRM_MATRIX[shape]?.[rand] ?? null : null)
  const color  = result ? BRM_CAT_COLORS[result] : '#db2777'
  const bg     = result ? BRM_CAT_BG[result]     : 'var(--surface-soft)'
  const interp = result ? (BRM_INTERP[result][lang] || BRM_INTERP[result].de) : null

  const chipSt = (on) => ({
    padding:'6px 10px', borderRadius:8,
    border:`1.5px solid ${on ? color : 'var(--border)'}`,
    background: on ? color+'18' : 'var(--surface)',
    cursor:'pointer', fontSize:12, fontWeight: on ? 700 : 500,
    color: on ? color : 'var(--text)', transition:'all 0.12s',
    fontFamily:'var(--font-main)', textAlign:'left',
  })

  const SHAPES = [
    { k:'oval_rund', de:'Rund / Oval', en:'Round / Oval', fa:'گرد / بیضی' },
    { k:'irregular', de:'Irregulär',   en:'Irregular',    fa:'نامنظم' },
  ]
  const RAENDER = [
    { k:'circumscribed',  de:'Umschrieben',     en:'Circumscribed',  fa:'محدود' },
    { k:'microlobulated', de:'Mikrolobuliert',   en:'Microlobulated', fa:'میکرولوبوله' },
    { k:'indistinct',     de:'Unscharf',         en:'Indistinct',     fa:'نامشخص' },
    { k:'angular',        de:'Eckig',            en:'Angular',        fa:'زاویه‌دار' },
    { k:'spiculated',     de:'Spekuliert',       en:'Spiculated',     fa:'اسپیکوله' },
  ]

  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {/* Fetthaltig – Sonderfall */}
      <button type="button" onClick={()=>{setFat(f=>!f); if(!fat){setShape('');setRand('')}}}
        style={{...chipSt(fat), color: fat?'#16a34a':'var(--text)', border:`1.5px solid ${fat?'#16a34a':'var(--border)'}`, background: fat?'#dcfce718':'var(--surface)', display:'flex', alignItems:'center', gap:8}}>
        <span style={{width:14,height:14,borderRadius:3,border:`2px solid ${fat?'#16a34a':'var(--border)'}`,background:fat?'#16a34a':'transparent',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {fat && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <span style={{fontSize:12,fontWeight:600}}>
          {lang==='fa'?'حاوی چربی':lang==='en'?'Fat-containing':'Fetthaltig'}
          <span style={{fontSize:11,fontWeight:400,marginLeft:6,opacity:0.7}}>→ BI-RADS 2</span>
        </span>
      </button>

      {!fat && (<>
        {/* Form */}
        <div>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
            {lang==='fa'?'شکل':lang==='en'?'Shape':'Form'}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5}}>
            {SHAPES.map(s=>(
              <button key={s.k} type="button" onClick={()=>setShape(s.k)} style={chipSt(shape===s.k)}>{lbl(s)}</button>
            ))}
          </div>
        </div>
        {/* Rand */}
        <div>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.07em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:5}}>
            {lang==='fa'?'حاشیه':lang==='en'?'Margin':'Rand'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {RAENDER.map(r=>(
              <button key={r.k} type="button" onClick={()=>setRand(r.k)} style={chipSt(rand===r.k)}>{lbl(r)}</button>
            ))}
          </div>
        </div>
      </>)}

      {/* Ergebnis */}
      <div style={{background:bg,border:`1.5px solid ${result?color+'44':'var(--border)'}`,borderRadius:12,padding:'13px 16px',textAlign:'center',transition:'all 0.25s',minHeight:56,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        {result ? (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'1.6rem',fontWeight:700,color,lineHeight:1}}>{result}</div>
            <div style={{fontSize:11.5,color,fontWeight:600,marginTop:3,opacity:0.9}}>{interp}</div>
          </>
        ) : <span style={{color:'var(--text-muted)',fontSize:13}}>—</span>}
      </div>
      <div style={{fontSize:10,color:'var(--text-muted)'}}>ACR BI-RADS® Atlas, 5. Auflage</div>
    </div>
  )
}

/* ── BiRadsKalkCalc ───────────────────────────── */
const BIRKALK_MATRIX = {
  rund:           { diffus:'3', regional:'3', gruppiert:'3',  linear:'3',  segmental:'4B' },
  amorph:         { diffus:'3', regional:'3', gruppiert:'4B', linear:'4B', segmental:'4B' },
  grob_heterogen: { diffus:'3', regional:'3', gruppiert:'4A', linear:'4B', segmental:'4B' },
  fein_pleomorph: { diffus:'4B',regional:'4B',gruppiert:'4C', linear:'4C', segmental:'4C' },
  fein_linear:    { diffus:'4C',regional:'4B',gruppiert:'4C', linear:'5',  segmental:'5'  },
}
const BIRKALK_MORPHS = [
  { k:'rund',           de:'Rund / oval',            en:'Round / oval',          fa:'گرد / بیضی' },
  { k:'amorph',         de:'Amorph',                 en:'Amorphous',             fa:'بی‌شکل' },
  { k:'grob_heterogen', de:'Grob heterogen',          en:'Coarse heterogeneous',  fa:'ناهمگن درشت' },
  { k:'fein_pleomorph', de:'Fein pleomorph',          en:'Fine pleomorphic',      fa:'پلئومورف ریز' },
  { k:'fein_linear',    de:'Fein linear / verzweigt', en:'Fine linear/branching', fa:'خطی ریز / شاخه‌دار' },
]
const BIRKALK_DISTS = [
  { k:'diffus',    de:'Diffus',    en:'Diffuse',   fa:'منتشر' },
  { k:'regional',  de:'Regional',  en:'Regional',  fa:'ناحیه‌ای' },
  { k:'gruppiert', de:'Gruppiert', en:'Grouped',   fa:'گروهی' },
  { k:'linear',    de:'Linear',    en:'Linear',    fa:'خطی' },
  { k:'segmental', de:'Segmental', en:'Segmental', fa:'سگمنتال' },
]
const BIRKALK_CATS = ['3','4A','4B','4C','5']
const BIRKALK_COLORS = { '3':'#16a34a','4A':'#0891b2','4B':'#2563eb','4C':'#d97706','5':'#dc2626' }
const BIRKALK_INTERP = {
  '3':  { de:'< 2 % · Verlaufskontrolle 6 Mon.',   en:'< 2 % · Follow-up 6 mo',         fa:'< ۲٪ · پیگیری ۶ ماهه' },
  '4A': { de:'2–10 % · Biopsie erwägen',            en:'2–10 % · Consider biopsy',        fa:'۲–۱۰٪ · بیوپسی بررسی شود' },
  '4B': { de:'10–50 % · Biopsie empfohlen',         en:'10–50 % · Biopsy recommended',    fa:'۱۰–۵۰٪ · بیوپسی توصیه' },
  '4C': { de:'50–95 % · Biopsie dringend',          en:'50–95 % · Biopsy strongly rec.',  fa:'۵۰–۹۵٪ · بیوپسی اکید' },
  '5':  { de:'> 95 % · Biopsie obligat',            en:'> 95 % · Biopsy mandatory',       fa:'> ۹۵٪ · بیوپسی اجباری' },
}
const BIRKALK_MODS = [
  { k:'masse',       up:true,  de:'↑ Masse / Architekturstörung', en:'↑ Mass / Arch. distortion',  fa:'↑ توده / اختلال معماری' },
  { k:'alter',       up:true,  de:'↑ Alter / Anamnese',           en:'↑ Age / Personal history',   fa:'↑ سن / سابقه' },
  { k:'groesse',     up:true,  de:'Herd ≥ 15 mm',                 en:'Cluster ≥ 15 mm',            fa:'اندازه ≥ ۱۵ mm' },
  { k:'stabilitaet', up:false, de:'↓ Stabilität ≥ 2 J.',          en:'↓ Stability ≥ 2 yrs',       fa:'↓ پایداری ≥ ۲ سال' },
]
function BiRadsKalkCalc({ calc, lang }) {
  const [morph, setMorph] = useState('')
  const [dist,  setDist]  = useState('')
  const [mods,  setMods]  = useState({masse:false,alter:false,groesse:false,stabilitaet:false})
  const base = morph && dist ? BIRKALK_MATRIX[morph][dist] : null
  const result = base ? (() => {
    let idx = BIRKALK_CATS.indexOf(base)
    if (mods.masse)       idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.alter)       idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.groesse)     idx = Math.min(idx+1, BIRKALK_CATS.length-1)
    if (mods.stabilitaet) idx = Math.max(idx-1, 0)
    return BIRKALK_CATS[idx]
  })() : null
  const color = result ? BIRKALK_COLORS[result] : '#db2777'
  const interp = result ? (BIRKALK_INTERP[result][lang] || BIRKALK_INTERP[result].de) : null
  const modified = result && base && result !== base
  const lbl = (obj) => obj[lang] || obj.de
  const toggleMod = (k) => setMods(p => ({...p,[k]:!p[k]}))
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {/* Selects */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label style={{display:'flex',flexDirection:'column',gap:4,fontSize:11,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'var(--text-muted)'}}>
          {lang==='fa'?'مورفولوژی':lang==='en'?'Morphology':'Morphologie'}
          <select value={morph} onChange={e=>setMorph(e.target.value)} className={styles.rcInput} style={{padding:'7px 10px',height:'auto',fontSize:12.5,fontWeight:400,background:'var(--surface)',color:'var(--text)',border:'1.5px solid var(--border)',borderRadius:10,cursor:'pointer',textTransform:'none',letterSpacing:0}}>
            <option value="">—</option>
            {BIRKALK_MORPHS.map(m=><option key={m.k} value={m.k}>{lbl(m)}</option>)}
          </select>
        </label>
        <label style={{display:'flex',flexDirection:'column',gap:4,fontSize:11,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'var(--text-muted)'}}>
          {lang==='fa'?'توزیع':lang==='en'?'Distribution':'Verteilung'}
          <select value={dist} onChange={e=>setDist(e.target.value)} className={styles.rcInput} style={{padding:'7px 10px',height:'auto',fontSize:12.5,fontWeight:400,background:'var(--surface)',color:'var(--text)',border:'1.5px solid var(--border)',borderRadius:10,cursor:'pointer',textTransform:'none',letterSpacing:0}}>
            <option value="">—</option>
            {BIRKALK_DISTS.map(d=><option key={d.k} value={d.k}>{lbl(d)}</option>)}
          </select>
        </label>
      </div>
      {/* Result */}
      <div style={{background: result ? color+'14' : 'var(--surface-soft)', border:`1.5px solid ${result ? color+'44' : 'var(--border)'}`, borderRadius:12, padding:'14px 16px', textAlign:'center', transition:'all 0.25s'}}>
        {result ? (
          <>
            <div style={{fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:700,color,lineHeight:1}}>{result}</div>
            <div style={{fontSize:12,color,fontWeight:600,marginTop:4,opacity:0.85}}>{interp}</div>
            {modified && <div style={{fontSize:10.5,color:'var(--text-muted)',marginTop:4,fontStyle:'italic'}}>Basis: BI-RADS {base}</div>}
          </>
        ) : (
          <span style={{color:'var(--text-muted)',fontSize:13}}>—</span>
        )}
      </div>
      {/* Modifiers */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
        {BIRKALK_MODS.map(m=>(
          <button key={m.k} type="button" onClick={()=>toggleMod(m.k)}
            style={{display:'flex',alignItems:'center',gap:6,padding:'7px 10px',border:`1.5px solid ${mods[m.k]?'#db2777':'var(--border)'}`,borderRadius:10,background:mods[m.k]?'#fdf2f8':'var(--surface)',cursor:'pointer',textAlign:'left',fontFamily:'var(--font-main)',transition:'all 0.15s'}}>
            <span style={{width:14,height:14,borderRadius:4,border:`2px solid ${mods[m.k]?'#db2777':'var(--border)'}`,background:mods[m.k]?'#db2777':'transparent',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {mods[m.k] && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
            <span style={{fontSize:11,fontWeight:600,color:'var(--text)',flex:1,lineHeight:1.3}}>{lbl(m)}</span>
            <span style={{fontSize:10,fontWeight:800,padding:'1px 5px',borderRadius:5,background:m.up?'#fee2e2':'#dcfce7',color:m.up?'#b91c1c':'#15803d'}}>{m.up?'+1':'−1'}</span>
          </button>
        ))}
      </div>
      {/* Ref */}
      <div style={{fontSize:10,color:'var(--text-muted)',marginTop:2}}>Youk et al. Korean J Radiol 2019 · Rominger et al. RöFo 2012</div>
    </div>
  )
}

/* ── SingleCalc ───────────────────────────────── */
function SingleCalc({ calc, lang }) {
  const [v, setV] = useState({})
  const set = (id, val) => setV(prev => ({...prev, [id]: val === '' ? '' : parseFloat(val)}))
  const result = calc.calc(v)
  const range  = getRange(calc.ranges, result)
  return (
    <>
      <div className={styles.rcFields}>
        {calc.fields.map(f => (
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} help={f.help ? tx(f.help, lang) : null} val={v[f.id]} onChange={set}
            unit={f.unit} step={f.step} min={f.min} max={f.max} />
        ))}
      </div>
      <ResultBox val={result} unit={calc.resultUnit} decimals={calc.decimals} range={range} lang={lang} />
    </>
  )
}

/* ── MultiCalc (Prostata + PSA) ───────────────── */
function MultiCalc({ calc, lang }) {
  const [v, setV] = useState({})
  const set = (id, val) => setV(prev => ({...prev, [id]: val === '' ? '' : parseFloat(val)}))
  return (
    <>
      <div className={styles.rcFields}>
        {calc.fields.map(f => (
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} help={f.help ? tx(f.help, lang) : null} val={v[f.id]} onChange={set}
            unit={f.unit} step={f.step} min={f.min} max={f.max} />
        ))}
      </div>
      <div className={styles.rcMultiOutputs}>
        {calc.outputs.map((out, i) => {
          const res   = out.calc(v)
          const range = getRange(out.ranges, res)
          return (
            <div key={i} className={styles.rcOutputRow}>
              <span className={styles.rcOutputLabel} style={{color: calc.color}}>{tx(out.label,lang)}</span>
              <ResultBox val={res} unit={out.unit} decimals={out.decimals} range={range} lang={lang} />
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ── ConversionCalc (ECST ↔ NASCET) ──────────── */
function ConversionCalc({ calc, lang }) {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const aNum = parseFloat(a)
  const bNum = parseFloat(b)
  const bFromA = !isNaN(aNum) && a !== '' ? calc.calcAtoB(aNum) : null
  const aFromB = !isNaN(bNum) && b !== '' ? calc.calcBtoA(bNum) : null
  return (
    <div className={styles.rcConvWrapper}>
      {/* A → B */}
      <div className={styles.rcConvRow}>
        <label className={styles.rcConvLabel}>{tx(calc.labelA,lang)}</label>
        <div className={styles.rcInputWrap} style={{flex:1}}>
          <input type="number" className={styles.rcInput} placeholder="—" min={0} max={100} step={1}
            value={a} onChange={e=>setA(e.target.value)}/>
          <span className={styles.rcUnit}>{calc.unit}</span>
        </div>
        <span className={styles.rcConvArrow}>→</span>
        <div className={styles.rcConvResult} style={{color: calc.color}}>
          {bFromA != null ? `${tx(calc.labelB,lang)}: ${bFromA.toFixed(1)} ${calc.unit}` : `${tx(calc.labelB,lang)}: —`}
        </div>
      </div>
      {/* B → A */}
      <div className={styles.rcConvRow}>
        <label className={styles.rcConvLabel}>{tx(calc.labelB,lang)}</label>
        <div className={styles.rcInputWrap} style={{flex:1}}>
          <input type="number" className={styles.rcInput} placeholder="—" min={0} max={100} step={1}
            value={b} onChange={e=>setB(e.target.value)}/>
          <span className={styles.rcUnit}>{calc.unit}</span>
        </div>
        <span className={styles.rcConvArrow}>→</span>
        <div className={styles.rcConvResult} style={{color: calc.color}}>
          {aFromB != null ? `${tx(calc.labelA,lang)}: ${Math.max(0,aFromB).toFixed(1)} ${calc.unit}` : `${tx(calc.labelA,lang)}: —`}
        </div>
      </div>
    </div>
  )
}

/* ── RecistCalc ───────────────────────────────── */
function RecistCalc({ calc, lang }) {
  const [bl, setBl] = useState('')
  const [fu, setFu] = useState('')
  const [newLesion, setNewLesion] = useState(false)

  function getResponse() {
    const blN = parseFloat(bl)
    const fuN = parseFloat(fu)
    if (newLesion) return { resp: 'PD', color: '#dc2626', text: { de: 'PD – Progressive Disease (neue Läsion)', en: 'PD – Progressive Disease (new lesion)', fa: 'PD – پیشرفت بیماری (ضایعه جدید)' } }
    if (isNaN(blN) || blN <= 0 || isNaN(fuN) || fuN < 0) return null
    if (fuN === 0) return { resp: 'CR', delta: -100, color: '#16a34a', text: { de: 'CR – Complete Response', en: 'CR – Complete Response', fa: 'CR – پاسخ کامل' } }
    const delta = (fuN - blN) / blN * 100
    const abs   = fuN - blN
    const sign  = delta > 0 ? '+' : ''
    if (delta <= -30) return { resp: 'PR', delta, color: '#0ea5e9', text: { de: `PR – Partial Response (${delta.toFixed(1)} %)`, en: `PR – Partial Response (${delta.toFixed(1)}%)`, fa: `PR – پاسخ جزئی (${delta.toFixed(1)}٪)` } }
    if (delta >= 20 && abs >= 5) return { resp: 'PD', delta, color: '#dc2626', text: { de: `PD – Progressive Disease (+${delta.toFixed(1)} %)`, en: `PD – Progressive Disease (+${delta.toFixed(1)}%)`, fa: `PD – پیشرفت بیماری (+${delta.toFixed(1)}٪)` } }
    return { resp: 'SD', delta, color: '#ca8a04', text: { de: `SD – Stable Disease (${sign}${delta.toFixed(1)} %)`, en: `SD – Stable Disease (${sign}${delta.toFixed(1)}%)`, fa: `SD – بیماری پایدار (${sign}${delta.toFixed(1)}٪)` } }
  }

  const resp = getResponse()
  return (
    <>
      <div className={styles.rcFields}>
        <FieldRow id="bl" label={tx(calc.lbl.bl, lang)} val={bl}
          onChange={(_,v)=>setBl(v)} unit="mm" step={1} min={0} />
        <FieldRow id="fu" label={tx(calc.lbl.fu, lang)} val={fu}
          onChange={(_,v)=>setFu(v)} unit="mm" step={1} min={0} />
        <label className={styles.rcCheckRow}>
          <input type="checkbox" className={styles.rcCheck}
            checked={newLesion} onChange={e=>setNewLesion(e.target.checked)}/>
          <span>{tx(calc.lbl.newLesion, lang)}</span>
        </label>
      </div>
      <div className={styles.rcResult} style={{
        background: resp ? resp.color+'14' : '#f8fafc',
        borderColor: resp ? resp.color+'44' : '#eef2f7',
      }}>
        {resp ? (
          <>
            <span className={styles.recistBadge} style={{background: resp.color}}>{resp.resp}</span>
            <span className={styles.rcResultLabel} style={{color: resp.color, marginTop: 4}}>
              {tx(resp.text, lang)}
            </span>
          </>
        ) : <span className={styles.rcResultPlaceholder}>—</span>}
      </div>
    </>
  )
}
