'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY, REF_DATA, tx } from '@/data/referenzen'
import styles from './WichtigeReferenzen.module.css'

const HOME_CARD_VISUALS = {
  messwerte: {
    src: '/referenzen/messwerte.png',
    className: styles.iconBoxBlue,
  },
  klassifikationen: {
    src: '/referenzen/klassifikation.png',
    className: styles.iconBoxOrange,
  },
  rechner: {
    src: '/referenzen/rechner.png',
    className: styles.iconBoxGreen,
  },
}

function HomeCardIcon({ type, alt }) {
  const visual = HOME_CARD_VISUALS[type]
  return (
    <div className={`${styles.iconBox} ${visual.className}`}>
      <Image src={visual.src} alt={alt} width={124} height={124} className={styles.cardIconImage} />
    </div>
  )
}

/* ── SVG-Icons für jede Messwerteregion ──────── */
function RegionIcon({ id, size = 17 }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const icons = {
    neuro: (<><path {...s} d="M9 3C6.5 3 4.5 5 4.5 7.5C4.5 8.3 4.7 9 5.2 9.6C4.2 10.2 3.5 11.3 3.5 12.5C3.5 14.4 5.1 16 7 16H9v4h6v-4h2c1.9 0 3.5-1.6 3.5-3.5C20.5 11.3 19.8 10.2 18.8 9.6C19.3 9 19.5 8.3 19.5 7.5C19.5 5 17.5 3 15 3H9Z"/><path {...s} d="M12 9v4M10 11h4"/></>),
    thorax: (<><path {...s} d="M12 3v3.5M8.5 6.5C6.5 6.5 4.5 8.5 4.5 11v3.5c0 2 1.5 3.5 3.5 3.5H9c.8 0 1.5-.7 1.5-1.5V8c0-.8-.7-1.5-1.5-1.5Z"/><path {...s} d="M15.5 6.5C17.5 6.5 19.5 8.5 19.5 11v3.5c0 2-1.5 3.5-3.5 3.5H15c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5Z"/></>),
    herz: (<path {...s} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>),
    abdomen: (<><rect {...s} x="3" y="3" width="18" height="18" rx="5"/><path {...s} d="M9 8.5c0 1.7.8 2.5 3 2.5s3-.8 3-2.5"/><path {...s} d="M9 15.5c0-1.7.8-2.5 3-2.5s3 .8 3 2.5"/><line {...s} x1="12" y1="11" x2="12" y2="13"/></>),
    urogenital: (<><path {...s} d="M12 4C9 4 6.5 7.5 6.5 11.5C6.5 15.5 9 20 12 20C14.8 20 16.5 17.5 17 14.5C18 10.5 17.5 5.5 14.5 4.2C13.7 3.9 12.8 4 12 4Z"/><path {...s} d="M12 8v4"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/></>),
    gefaesse: (<><path {...s} d="M2 11c1.5-4 3.5-4 5 0s3.5 4 5 0 3.5-4 5 0"/><path {...s} d="M2 16c1.5-3 3.5-3 5 0s3.5 3 5 0 3.5-3 5 0"/></>),
    wirbelsaeule: (<><rect {...s} x="7" y="2" width="10" height="4" rx="1.5"/><rect {...s} x="7" y="10" width="10" height="4" rx="1.5"/><rect {...s} x="7" y="18" width="10" height="4" rx="1.5"/><line {...s} x1="12" y1="6" x2="12" y2="10"/><line {...s} x1="12" y1="14" x2="12" y2="18"/></>),
    msk: (<><path {...s} d="M6.5 6.5C6.5 4.8 8 3.5 9.5 4.5L14.5 9.5"/><path {...s} d="M9.5 4.5C10.5 3 13 3 13.5 5"/><path {...s} d="M17.5 17.5C17.5 19.2 16 20.5 14.5 19.5L9.5 14.5"/><path {...s} d="M14.5 19.5C13.5 21 11 21 10.5 19"/><line {...s} x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></>),
    'hu-werte': (<><circle {...s} cx="12" cy="12" r="9"/><circle {...s} cx="12" cy="12" r="3.5"/><line {...s} x1="12" y1="3" x2="12" y2="8.5"/><line {...s} x1="12" y1="15.5" x2="12" y2="21"/><line {...s} x1="3" y1="12" x2="8.5" y2="12"/><line {...s} x1="15.5" y1="12" x2="21" y2="12"/></>),
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {icons[id] ?? <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"/>}
    </svg>
  )
}

/* ── Collapsible Gruppe (Messwerte) ──────────── */
function CollapseGroup({ name, color, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={styles.groupBlock}>
      <button
        className={`${styles.groupHeadingBtn} ${open ? styles.groupHeadingBtnOpen : ''}`}
        style={{ '--ref-color': color }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={styles.groupHeadingText}>{name}</span>
        <span className={styles.groupChevron} aria-hidden="true" />
      </button>
      {open && <div className={styles.groupCollapseBody}>{children}</div>}
    </div>
  )
}

/* ── Hauptkomponente ──────────────────────────── */
export default function WichtigeReferenzen() {
  const { lang } = useLanguage()
  const copy = REF_COPY[lang] || REF_COPY.de
  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  return (
    <section className={styles.section} id="referenzen">
      <div className={styles.glassHeader}>
        <div className={styles.glassHeaderGlow} />
        <div className={styles.glassTop}>
          <h2 className={styles.glassTitle} data-title={copy.sectionLabel}>{copy.sectionLabel}</h2>
          <p className={styles.glassSubtitle}>{copy.title}</p>
          <p className={styles.glassSub}>{copy.sub}</p>
        </div>
        <div className={styles.grid}>
          <button className={`${styles.card} ${styles.cardBlue}`} onClick={() => setModal('messwerte')}>
            <HomeCardIcon type="messwerte" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorBlue}`}>{copy.btnMesswerte}</h3>
            <p className={styles.cardDesc}>{copy.btnMesswerteSub}</p>
            <div className={styles.chips}>{(copy.chipsMesswerte||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipBlue}`}>{ch}</span>)}</div>
          </button>
          <button className={`${styles.card} ${styles.cardOrange}`} onClick={() => setModal('klassifikationen')}>
            <HomeCardIcon type="klassifikationen" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorOrange}`}>{copy.btnKlass}</h3>
            <p className={styles.cardDesc}>{copy.btnKlassSub}</p>
            <div className={styles.chips}>{(copy.chipsKlass||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipOrange}`}>{ch}</span>)}</div>
          </button>
          <button className={`${styles.card} ${styles.cardGreen}`} onClick={() => setModal('rechner')}>
            <HomeCardIcon type="rechner" alt="" />
            <h3 className={`${styles.cardTitle} ${styles.colorGreen}`}>{copy.btnRechner}</h3>
            <p className={styles.cardDesc}>{copy.btnRechnerSub}</p>
            <div className={styles.chips}>{(copy.chipsRechner||[]).slice(0,4).map(ch=><span key={ch} className={`${styles.chip} ${styles.chipGreen}`}>{ch}</span>)}</div>
          </button>
        </div>
      </div>

      {modal==='messwerte'       && <MesswerteModal       copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='klassifikationen'&& <KlassifikationenModal copy={copy} lang={lang} onClose={()=>setModal(null)} />}
      {modal==='rechner'         && <RechnerModal          copy={copy} lang={lang} onClose={()=>setModal(null)} />}
    </section>
  )
}

/* ── Modal-Hülle ──────────────────────────────── */
function Modal({ title, subtitle, accent, copy, onClose, children, accentClass, wide }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${wide ? styles.modalWide : ''}`}
           onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <header className={`${styles.modalHead} ${accentClass||''}`}>
          <h3 className={styles.modalTitle}>
            <span className={styles.modalTitleMain}>{title}</span>
            {subtitle && (
              <span className={styles.modalCrumb} style={accent?{color:accent}:undefined}>
                <span className={styles.modalCrumbSep}>›</span>{subtitle}
              </span>
            )}
          </h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label={copy.close}>×</button>
        </header>
        <div className={styles.modalBody}>{children}</div>
        <p className={styles.disclaimer}>⚠️ {copy.disclaimer}</p>
      </div>
    </div>
  )
}

/* ── Messwerte-Modal ──────────────────────────── */
function MesswerteModal({ copy, lang, onClose }) {
  const regions = REF_DATA.messwerte
  const [regionId, setRegionId] = useState(regions[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const region = regions.find(r=>r.id===regionId) || regions[0]
  return (
    <Modal title={copy.btnMesswerte} subtitle={showDetail?tx(region.name,lang):null} accent={region.color}
      copy={copy} onClose={onClose} accentClass={styles.headBlue}>
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        <nav className={styles.sidebar}>
          {regions.map(r=>(
            <button key={r.id}
              className={`${styles.navBtn} ${r.id===regionId?styles.navActiveBlue:''}`}
              style={{'--ref-color':r.color}} onClick={()=>{setRegionId(r.id);setShowDetail(true)}}>
              <span className={styles.navIconWrap} style={{color:r.color}}><RegionIcon id={r.id} size={16}/></span>
              <span className={styles.navLabel}>{tx(r.name,lang)}</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{'--ref-color':region.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={styles.regionHeadingIcon} style={{color:region.color}}><RegionIcon id={region.id} size={22}/></span>
            <span style={{color:region.color}}>{tx(region.name,lang)}</span>
          </h2>
          {region.groups.map((group,gi)=>(
            <CollapseGroup key={gi} name={tx(group.name,lang)} color={region.color}>
              <div className={styles.tableWrap}>
                <table className={styles.mTable}>
                  <thead><tr>
                    <th className={styles.thName}>{copy.colStruktur}</th>
                    <th className={styles.thVal}>{copy.colWert}</th>
                    <th className={styles.thNote}>{copy.colHinweis}</th>
                  </tr></thead>
                  <tbody>{group.entries.map((e,ei)=>(
                    <tr key={ei}>
                      <td className={styles.tdName}>{tx(e.s,lang)}</td>
                      <td className={styles.tdVal}>{e.v}</td>
                      <td className={styles.tdNote}>{tx(e.h,lang)}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CollapseGroup>
          ))}
        </div>
      </div>
    </Modal>
  )
}

/* ── Klassifikationen-Modal (Split wie Messwerte) ─ */
function KlassifikationenModal({ copy, lang, onClose }) {
  const router = useRouter()
  const topics = REF_DATA.klassifikationen
  const [topicId, setTopicId] = useState(topics[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const topic = topics.find(t => t.id === topicId) || topics[0]
  const go = (tId, itemId) => {
    onClose()
    router.push(`/referenzen/${tId}/${itemId}${lang!=='de'?`?lang=${lang}`:''}`)
  }
  return (
    <Modal title={copy.btnKlass} subtitle={showDetail?tx(topic.name,lang):null} accent={topic.color}
      copy={copy} onClose={onClose} accentClass={styles.headOrange} wide>
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        <nav className={styles.sidebar}>
          {topics.map(t => (
            <button key={t.id}
              className={`${styles.navBtn} ${t.id===topicId?styles.navActiveOrange:''}`}
              style={{'--ref-color':t.color}} onClick={()=>{setTopicId(t.id);setShowDetail(true)}}>
              <span className={styles.navIconWrap} style={{color:t.color}}><RegionIcon id={t.iconId||t.id} size={16}/></span>
              <span className={styles.navLabel}>{tx(t.name,lang)}</span>
            </button>
          ))}
        </nav>
        <div className={styles.content} style={{'--ref-color':topic.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={styles.regionHeadingIcon} style={{color:topic.color}}><RegionIcon id={topic.iconId||topic.id} size={22}/></span>
            <span style={{color:topic.color}}>{tx(topic.name,lang)}</span>
          </h2>
          <div className={styles.klassCardGrid}>
            {topic.items.map(item=>(
              <button key={item.id} className={styles.klassCard} style={{'--ref-color':topic.color}} onClick={()=>go(topic.id,item.id)}>
                <span className={styles.klassCardName} style={{color:topic.color}}>{tx(item.name,lang)}</span>
                <span className={styles.klassCardText}>{tx(item.kompakt,lang)}</span>
                <span className={styles.klassCardFoot}>
                  <span className={styles.klassCardLink}>{copy.openDetail}</span>
                  <span className={styles.klassCardArrow}>→</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* ═══════════════════════════════════════════════
   RECHNER-GRUPPEN
   ═══════════════════════════════════════════════ */
const RECHNER_GROUPS = [
  {
    id: 'neuro-gefaesse',
    name: { de: 'Neuro & Gefäße', en: 'Neuro & Vessels', fa: 'نورو و عروق' },
    color: '#7c3aed', iconId: 'neuro',
    calcIds: ['icb', 'nascet', 'ecst-nascet'],
  },
  {
    id: 'herz-thorax',
    name: { de: 'Herz & Thorax', en: 'Heart & Thorax', fa: 'قلب و توراکس' },
    color: '#be185d', iconId: 'herz',
    calcIds: ['ktq', 'fleischner'],
  },
  {
    id: 'urogenital',
    name: { de: 'Urogenital', en: 'Urogenital', fa: 'اوروژنیتال' },
    color: '#0ea5e9', iconId: 'urogenital',
    calcIds: ['prostata-psa'],
  },
  {
    id: 'onko',
    name: { de: 'Onkologie', en: 'Oncology', fa: 'انکولوژی' },
    color: '#0d9488', iconId: 'hu-werte',
    calcIds: ['recist'],
  },
  {
    id: 'wirbelsaeule',
    name: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' },
    color: '#f97316', iconId: 'wirbelsaeule',
    calcIds: ['meyerding'],
  },
]

/* ── Rechner-Modal ────────────────────────────── */
function RechnerModal({ copy, lang, onClose }) {
  const [groupId, setGroupId] = useState(RECHNER_GROUPS[0].id)
  const [showDetail, setShowDetail] = useState(false)
  const group = RECHNER_GROUPS.find(g => g.id === groupId) || RECHNER_GROUPS[0]
  const calcs = group.calcIds.map(id => REF_DATA.rechner.find(c => c.id === id)).filter(Boolean)

  return (
    <Modal title={copy.btnRechner} subtitle={showDetail?tx(group.name,lang):null} accent={group.color}
      copy={copy} onClose={onClose} accentClass={styles.headGreen} wide>
      <div className={`${styles.split} ${showDetail?styles.showDetail:''}`}>
        {/* Sidebar – Gruppen */}
        <nav className={styles.sidebar}>
          {RECHNER_GROUPS.map(g => (
            <button key={g.id}
              className={`${styles.navBtn} ${g.id === groupId ? styles.navActiveGreen : ''}`}
              style={{'--ref-color': g.color}}
              onClick={() => {setGroupId(g.id);setShowDetail(true)}}>
              <span className={styles.navIconWrap} style={{color: g.color}}>
                <RegionIcon id={g.iconId} size={16} />
              </span>
              <span className={styles.navLabel}>{tx(g.name, lang)}</span>
            </button>
          ))}
        </nav>

        {/* Inhalt – Rechner der gewählten Gruppe */}
        <div className={styles.content} style={{'--ref-color': group.color}}>
          <button className={styles.mobileBack} onClick={()=>setShowDetail(false)}>← {copy.back}</button>
          <h2 className={styles.regionHeading}>
            <span className={styles.regionHeadingIcon} style={{color: group.color}}>
              <RegionIcon id={group.iconId} size={22} />
            </span>
            <span style={{color: group.color}}>{tx(group.name, lang)}</span>
          </h2>
          <div className={styles.rechnerSubGrid}>
            {calcs.map(calc => (
              <RechnerCard key={calc.id} calc={calc} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

/* ── Rechner-Karte (dispatch by type) ────────── */
function RechnerCard({ calc, lang }) {
  return (
    <div className={styles.rechnerCard} style={{'--rc': calc.color}}>
      <div className={styles.rcHead}>
        <div className={styles.rcName} style={{color: calc.color}}>{tx(calc.name, lang)}</div>
        {calc.formula && <div className={styles.rcFormula}>{calc.formula}</div>}
      </div>

      {calc.type === 'single'     && <SingleCalc     calc={calc} lang={lang} />}
      {calc.type === 'multi'      && <MultiCalc      calc={calc} lang={lang} />}
      {calc.type === 'conversion' && <ConversionCalc calc={calc} lang={lang} />}
      {calc.type === 'recist'     && <RecistCalc     calc={calc} lang={lang} />}
      {calc.type === 'fleischner' && <FleischnerCalc calc={calc} lang={lang} />}

      {calc.hint && <p className={styles.rcHint}>{tx(calc.hint, lang)}</p>}
    </div>
  )
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
function FieldRow({ label, id, val, onChange, unit, step = 0.1, min, max }) {
  return (
    <label className={styles.rcField}>
      <span className={styles.rcFieldLabel}>{label}</span>
      <div className={styles.rcInputWrap}>
        <input type="number" className={styles.rcInput}
          placeholder="—" min={min} max={max} step={step}
          value={val ?? ''} onChange={e => onChange(id, e.target.value)} />
        <span className={styles.rcUnit}>{unit}</span>
      </div>
    </label>
  )
}
function ResultBox({ val, unit, decimals, range }) {
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
          {range && <span className={styles.rcResultLabel} style={{color: range.color}}>{tx(range.label, 'de')}</span>}
        </>
      ) : (
        <span className={styles.rcResultPlaceholder}>—</span>
      )}
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
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} val={v[f.id]} onChange={set}
            unit={f.unit} step={f.step} min={f.min} max={f.max} />
        ))}
      </div>
      <ResultBox val={result} unit={calc.resultUnit} decimals={calc.decimals} range={range} />
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
          <FieldRow key={f.id} id={f.id} label={tx(f.label,lang)} val={v[f.id]} onChange={set}
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
              <ResultBox val={res} unit={out.unit} decimals={out.decimals} range={range} />
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

/* ── FleischnerCalc ───────────────────────────── */
function getFleischnerRec(type, size, risk, solidComp) {
  if (!size || isNaN(size) || size <= 0) return null
  if (type === 'solid') {
    if (size < 6) return risk === 'high'
      ? { color:'#ca8a04', text:{ de:'Optional: CT nach 12 Monaten.', en:'Optional: CT at 12 months.', fa:'اختیاری: CT پس از ۱۲ ماه.' } }
      : { color:'#16a34a', text:{ de:'Kein Routine-Follow-up empfohlen.', en:'No routine follow-up recommended.', fa:'پیگیری روتین توصیه نمی‌شود.' } }
    if (size <= 8) return risk === 'high'
      ? { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon., danach 18–24 Mon.', en:'CT at 6–12 m, then 18–24 m.', fa:'CT پس از ۶–۱۲ ماه، سپس ۱۸–۲۴ ماه.' } }
      : { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon.; bei stabilem Befund erneut 18–24 Mon.', en:'CT at 6–12 m; if stable, again at 18–24 m.', fa:'CT پس از ۶–۱۲ ماه؛ در صورت ثبات، مجدداً ۱۸–۲۴ ماه.' } }
    return { color:'#dc2626', text:{ de:'CT nach 3 Mon. oder PET/CT; Biopsie erwägen.', en:'CT at 3 m or PET/CT; consider tissue sampling.', fa:'CT پس از ۳ ماه یا PET/CT؛ نمونه‌برداری در نظر بگیرید.' } }
  }
  if (type === 'ggo') {
    if (size < 6) return { color:'#16a34a', text:{ de:'Kein Routine-Follow-up (GGO < 6 mm).', en:'No routine follow-up (GGO < 6 mm).', fa:'پیگیری روتین لازم نیست (GGO < ۶ mm).' } }
    return { color:'#ca8a04', text:{ de:'CT nach 6–12 Mon. (Persistenz?); danach alle 2 J. × 5 J.', en:'CT at 6–12 m (persistence?); then every 2 y × 5 y.', fa:'CT پس از ۶–۱۲ ماه؛ سپس هر ۲ سال × ۵ سال.' } }
  }
  // partsolid
  if (size < 6) return { color:'#16a34a', text:{ de:'Kein Follow-up (Part-solid < 6 mm).', en:'No follow-up (part-solid < 6 mm).', fa:'پیگیری لازم نیست (نیمه‌جامد < ۶ mm).' } }
  if (!solidComp || isNaN(solidComp)) return { color:'#ca8a04', text:{ de:'CT nach 3–6 Mon. — bitte Solid-Anteil eingeben.', en:'CT at 3–6 m — please enter solid component size.', fa:'CT پس از ۳–۶ ماه — لطفاً اندازه جز جامد را وارد کنید.' } }
  if (solidComp < 6) return { color:'#ca8a04', text:{ de:'CT nach 3–6 Mon.; wenn stabil & Solid < 6 mm → jährl. CT × 5 J.', en:'CT at 3–6 m; if stable & solid < 6 mm → annual CT × 5 y.', fa:'CT پس از ۳–۶ ماه؛ اگر پایدار و جز جامد < ۶ mm → CT سالانه × ۵ سال.' } }
  return { color:'#ea580c', text:{ de:'CT nach 3–6 Mon.; Solid-Anteil ≥ 6 mm → CT/PET-CT/Biopsie.', en:'CT at 3–6 m; solid ≥ 6 mm → CT/PET-CT/biopsy.', fa:'CT پس از ۳–۶ ماه؛ جز جامد ≥ ۶ mm → CT/PET-CT/بیوپسی.' } }
}

function FleischnerCalc({ calc, lang }) {
  const [type, setType]       = useState('solid')
  const [size, setSize]       = useState('')
  const [risk, setRisk]       = useState('low')
  const [solidComp, setSolidComp] = useState('')
  const sizeNum = parseFloat(size)
  const solidNum = parseFloat(solidComp)
  const rec = getFleischnerRec(type, sizeNum, risk, solidNum)
  const showSolidComp = type === 'partsolid' && sizeNum >= 6

  return (
    <>
      <div className={styles.rcFields}>
        {/* Typ-Select */}
        <label className={styles.rcField}>
          <span className={styles.rcFieldLabel}>{tx(calc.lbl.nodeType, lang)}</span>
          <select className={styles.rcSelect} value={type} onChange={e=>setType(e.target.value)}>
            {calc.opts.type.map(o=>(
              <option key={o.v} value={o.v}>{tx(o.label, lang)}</option>
            ))}
          </select>
        </label>

        {/* Größe */}
        <FieldRow id="size" label={tx(calc.lbl.size, lang)} val={size}
          onChange={(_,v)=>setSize(v)} unit="mm" step={1} min={0} max={50} />

        {/* Risiko (nur Solid) */}
        {type === 'solid' && (
          <label className={styles.rcField}>
            <span className={styles.rcFieldLabel}>{tx(calc.lbl.risk, lang)}</span>
            <select className={styles.rcSelect} value={risk} onChange={e=>setRisk(e.target.value)}>
              {calc.opts.risk.map(o=>(
                <option key={o.v} value={o.v}>{tx(o.label, lang)}</option>
              ))}
            </select>
          </label>
        )}

        {/* Solid-Anteil (nur Part-solid ≥ 6mm) */}
        {showSolidComp && (
          <FieldRow id="solidComp" label={tx(calc.lbl.solidComp, lang)} val={solidComp}
            onChange={(_,v)=>setSolidComp(v)} unit="mm" step={1} min={0} max={50} />
        )}
      </div>

      <div className={styles.rcResult} style={{
        background: rec ? rec.color+'14' : '#f8fafc',
        borderColor: rec ? rec.color+'44' : '#eef2f7',
      }}>
        {rec ? (
          <span className={styles.rcFleischnerRec} style={{color: rec.color}}>
            {tx(rec.text, lang)}
          </span>
        ) : <span className={styles.rcResultPlaceholder}>Eingabe …</span>}
      </div>
    </>
  )
}
