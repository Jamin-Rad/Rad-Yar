'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Hero.module.css'

// ── FACHGEBIETE ───────────────────────────────────────────────────────────
const FACH_DATA = {
  Neuroradiologie: {
    color: '#a78bfa',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    available: false,
    topics: ['Schlaganfall','Tumoren','Multiple Sklerose','Trauma','Gefäße'],
    desc: { de:'Gehirn, Rückenmark & Schädel', en:'Brain, spinal cord & skull', fa:'مغز، نخاع و جمجمه' },
  },
  Hals: {
    color: '#60a5fa',
    bg: 'linear-gradient(135deg,#0c1f40,#1e3a6e)',
    available: false,
    topics: ['Schilddrüse','Lymphknoten','Larynx'],
    desc: { de:'Schilddrüse, Lymphknoten & Larynx', en:'Thyroid, lymph nodes & larynx', fa:'تیروئید، غدد لنفاوی و حنجره' },
  },
  Wirbelsaeule: {
    color: '#93c5fd',
    bg: 'linear-gradient(135deg,#071a32,#123a5f)',
    available: false,
    topics: ['HWS','BWS','LWS','Myelon','Bandscheibe'],
    desc: { de:'HWS, BWS, LWS, Myelon & Bandscheiben', en:'Cervical, thoracic and lumbar spine, cord & discs', fa:'ستون فقرات گردنی، پشتی، کمری، نخاع و دیسک‌ها' },
  },
  Thorax: {
    color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    available: false,
    topics: ['Pneumonie','Lungenembolie','Lungentumor','Herzinsuffizienz','Pneumothorax'],
    desc: { de:'Lunge, Herz, Mediastinum & Pleura', en:'Lung, heart, mediastinum & pleura', fa:'ریه، قلب، مدیاستن و پلور' },
  },
  Brust: {
    color: '#f472b6',
    bg: 'linear-gradient(135deg,#2a0a20,#5a1040)',
    available: false,
    topics: ['Mammakarzinom','Mastopathie','Fibroadenom','BIRADS'],
    desc: { de:'Mammographie, Sonographie & MRT der Brust', en:'Mammography, ultrasound & breast MRI', fa:'ماموگرافی، سونوگرافی و MRI پستان' },
  },
  Abdomen: {
    color: '#34d399',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    available: false,
    topics: ['Leberzirrhose','Pankreatitis','Nierensteine','Appendizitis','Tumoren'],
    desc: { de:'Leber, Milz, Niere, Pankreas & GI-Trakt', en:'Liver, spleen, kidney, pancreas & GI', fa:'کبد، طحال، کلیه، پانکراس و دستگاه گوارش' },
  },
  Becken: {
    color: '#fb7185',
    bg: 'linear-gradient(135deg,#241027,#4b143d)',
    available: false,
    topics: ['Becken – Frau','Becken – Mann'],
    desc: { de:'Beckenorgane – wählen Sie Frau oder Mann', en:'Pelvic organs – choose female or male', fa:'اندام‌های لگن – زن یا مرد را انتخاب کنید' },
  },
  BeckenF: {
    color: '#fb7185',
    bg: 'linear-gradient(135deg,#2a0a10,#5a1020)',
    available: false,
    topics: ['Zervixkarzinom','Ovarialtumoren','Endometriose','Hüftarthrose'],
    desc: { de:'Uterus, Ovarien & gynäkologische Organe', en:'Uterus, ovaries & gynaecological organs', fa:'رحم، تخمدان‌ها و اندام‌های زنانه' },
  },
  BeckenM: {
    color: '#c084fc',
    bg: 'linear-gradient(135deg,#1a0a30,#3a1060)',
    available: false,
    topics: ['Prostatakarzinom','Blasentumoren','Hüftarthrose','Urolithiasis'],
    desc: { de:'Prostata, Blase & männliche Urogenitalorgane', en:'Prostate, bladder & male urogenital organs', fa:'پروستات، مثانه و اندام‌های مردانه' },
  },
  Muskuloskelettales: {
    color: '#fb923c',
    bg: 'linear-gradient(135deg,#2a1a00,#4a3000)',
    available: false,
    topics: ['Frakturen','Arthrose','Tumoren','Osteochondrose','Sportverletzungen'],
    desc: { de:'Knochen, Gelenke, Muskulatur & Weichteile', en:'Bones, joints, muscles & soft tissue', fa:'استخوان‌ها، مفاصل، عضلات و بافت نرم' },
  },
  Technik: {
    color: '#4ade80',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    available: true,
    desc: { de:'Physikalische Grundlagen · Kontrastmittel · Protokolle', en:'Physics · Contrast agents · Protocols', fa:'فیزیک · ماده حاجب · پروتکل‌ها' },
    links: [
      { label:{ de:'Kontrastmittel', en:'Contrast Agents', fa:'ماده حاجب' }, href:'/technik/kontrastmittel', ready:true },
      { label:{ de:'MRT-Physik',     en:'MRI Physics',     fa:'فیزیک MRI'  }, href:'/technik/mrt',            ready:false },
      { label:{ de:'CT-Technik',     en:'CT Technique',    fa:'تکنیک CT'   }, href:'/technik/ct',             ready:false },
    ],
  },
}

const FACH_NAMES = {
  de: { Neuroradiologie:'Kopf', Hals:'Hals', Wirbelsaeule:'Wirbelsäule', Thorax:'Thorax',
        Brust:'Brust', Abdomen:'Abdomen', Becken:'Becken', BeckenF:'Becken – Frau', BeckenM:'Becken – Mann',
        Muskuloskelettales:'Muskuloskelettales', Technik:'Technik & Physik' },
  en: { Neuroradiologie:'Head', Hals:'Neck', Wirbelsaeule:'Spine', Thorax:'Thorax',
        Brust:'Breast', Abdomen:'Abdomen', Becken:'Pelvis', BeckenF:'Pelvis – Female', BeckenM:'Pelvis – Male',
        Muskuloskelettales:'Musculoskeletal', Technik:'Physics & Technology' },
  fa: { Neuroradiologie:'سر', Hals:'گردن', Wirbelsaeule:'ستون فقرات', Thorax:'توراکس',
        Brust:'پستان', Abdomen:'شکم', Becken:'لگن', BeckenF:'لگن – زنان', BeckenM:'لگن – مردان',
        Muskuloskelettales:'اسکلتی-عضلانی', Technik:'تکنیک و فیزیک' },
}

// ── ZONES (% of visible Hero image wrapper) ────────────────────────────────
// Rechteckige Hotspots. Keine Kreise/Ellipsen mehr.
// Die Werte sind auf das aktuelle Body-Bild im Hero-Bereich kalibriert.
// Reihenfolge ist wichtig: große MSK-Flächen zuerst, spezielle Organe danach.
const ZONES = [
  // ── Arme (links + rechts) → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'23,19 14,23 9,36 7,50 10,57 17,57 20,42 20,24' },
  { id:'Muskuloskelettales', shape:'polygon', points:'62,19 71,23 76,36 78,50 75,57 68,57 65,42 65,24' },
  // ── Beine (links + rechts) → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'28,57 41,57 42,65 40,74 42,82 40,96 32,96 30,82 32,74 30,65' },
  { id:'Muskuloskelettales', shape:'polygon', points:'44,57 57,57 55,65 53,74 55,82 53,96 45,96 43,82 45,74 43,65' },
  // ── Thorax
  { id:'Thorax',             shape:'polygon', points:'25,19 60,19 62,27 58,34 27,34 23,27' },
  // ── Abdomen
  { id:'Abdomen',            shape:'polygon', points:'27,34 58,34 60,38 58,46 27,46 25,38' },
  // ── Becken (→ Popup Frau/Mann)
  { id:'Becken',             shape:'polygon', points:'27,46 58,46 60,51 55,56 30,56 25,51' },
  // ── Hals (schmal)
  { id:'Hals',               shape:'polygon', points:'39,15 46,15 47,18 40,18' },
  // ── Kopf / Neuroradiologie
  { id:'Neuroradiologie',    shape:'polygon', points:'37,3 49,3 52,8 51,13 44,16 37,13 35,8' },
  // ── Brust (links + rechts) über Thorax
  { id:'Brust',              shape:'polygon', points:'25,24 37,24 39,31 37,35 25,35 23,31' },
  { id:'Brust',              shape:'polygon', points:'48,24 60,24 62,31 60,35 48,35 46,31' },
  // ── Wirbelsäule (schmaler Streifen)
  { id:'Wirbelsaeule',       shape:'polygon', points:'41,18 44,18 44.5,46 40.5,46' },
  // ── Technik / MRT-Gerät
  { id:'Technik',            shape:'polygon', points:'60,79 93,79 96,85 95,97 60,97 58,90' },
]

// ── MAGNETIC FIELD ANIMATION ──────────────────────────────────────────────
function MagneticField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = 1
    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spins = Array.from({ length: 30 }, (_, index) => {
      const column = index % 5
      const row = Math.floor(index / 5)
      return {
        x: 0.1 + column * 0.2 + (row % 2) * 0.018,
        y: 0.14 + row * 0.145,
        phase: index * 0.73,
        speed: 0.00045 + (index % 4) * 0.000035,
      }
    })
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let animId
    const drawArrow = (x, y, length, angle, alpha) => {
      const tipX = x + Math.cos(angle) * length
      const tipY = y + Math.sin(angle) * length
      ctx.strokeStyle = `rgba(125,211,252,${alpha})`
      ctx.fillStyle = `rgba(249,115,22,${Math.min(alpha + 0.18, 0.8)})`
      ctx.lineWidth = 1.15
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(tipX, tipY)
      ctx.stroke()
      ctx.save()
      ctx.translate(tipX, tipY)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-4.5, -2.5)
      ctx.lineTo(-4.5, 2.5)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width * 0.5
      const fieldTop = height * 0.08
      const fieldBottom = height * 0.9

      const glow = ctx.createRadialGradient(cx, height * 0.43, 0, cx, height * 0.43, width * 0.48)
      glow.addColorStop(0, 'rgba(56,189,248,0.055)')
      glow.addColorStop(0.55, 'rgba(59,130,246,0.025)')
      glow.addColorStop(1, 'rgba(59,130,246,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      ctx.setLineDash([2, 10])
      for (let i = 0; i < 7; i += 1) {
        const x = width * (0.08 + i * 0.14)
        ctx.strokeStyle = `rgba(125,211,252,${i === 3 ? 0.12 : 0.055})`
        ctx.lineWidth = i === 3 ? 1.2 : 0.75
        ctx.beginPath()
        ctx.moveTo(x, fieldBottom)
        ctx.lineTo(x, fieldTop)
        ctx.stroke()
        ctx.fillStyle = 'rgba(125,211,252,0.12)'
        ctx.beginPath()
        ctx.moveTo(x, fieldTop)
        ctx.lineTo(x - 3.5, fieldTop + 7)
        ctx.lineTo(x + 3.5, fieldTop + 7)
        ctx.closePath()
        ctx.fill()
      }
      ctx.setLineDash([])

      const rfProgress = reducedMotion ? 0.52 : (time * 0.00007) % 1
      const rfY = height * (0.16 + rfProgress * 0.68)
      const rfGradient = ctx.createLinearGradient(width * 0.08, 0, width * 0.92, 0)
      rfGradient.addColorStop(0, 'rgba(249,115,22,0)')
      rfGradient.addColorStop(0.5, 'rgba(249,115,22,0.32)')
      rfGradient.addColorStop(1, 'rgba(249,115,22,0)')
      ctx.strokeStyle = rfGradient
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = width * 0.08; x <= width * 0.92; x += 3) {
        const envelope = Math.sin(((x - width * 0.08) / (width * 0.84)) * Math.PI)
        const y = rfY + Math.sin(x * 0.075) * 5 * envelope
        if (x === width * 0.08) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      spins.forEach((spin) => {
        const x = width * spin.x
        const y = height * spin.y
        const nearPulse = Math.max(0, 1 - Math.abs(y - rfY) / (height * 0.12))
        const phase = spin.phase + (reducedMotion ? 0 : time * spin.speed)
        const tilt = -Math.PI / 2 + Math.sin(phase) * 0.16 + nearPulse * 0.55

        ctx.strokeStyle = 'rgba(148,163,184,0.11)'
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.ellipse(x, y, 10, 3.5, 0, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = 'rgba(248,250,252,0.5)'
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fill()
        drawArrow(x, y, 12 + nearPulse * 3, tilt, 0.26 + nearPulse * 0.35)
      })

      ctx.fillStyle = 'rgba(125,211,252,0.28)'
      ctx.font = '600 9px Manrope, sans-serif'
      ctx.fillText('B₀', width * 0.08 - 6, fieldTop - 9)
      if (!reducedMotion) animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[])
  return <canvas ref={canvasRef} className={styles.magnetCanvas} />
}

// ── HEX LOGO ──────────────────────────────────────────────────────────────
function HexLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="url(#radyarHeroLogoBg)" />
      <path d="M13.8 8.6A20.2 20.2 0 0 1 39 13.3" stroke="url(#radyarHeroLogoArc)" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M39.8 13.9A20.1 20.1 0 0 1 40.2 33.6" stroke="#f97316" strokeWidth="2.7" strokeLinecap="round" />
      <path d="M34.8 41.4A20.2 20.2 0 0 1 8.2 14.7" stroke="rgba(255,255,255,.82)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="39.8" cy="14" r="3.2" fill="#ff8a1d" />
      <circle cx="39.8" cy="14" r="6.4" fill="url(#radyarHeroLogoGlow)" />
      <text x="17.1" y="31.8" fill="#ffffff" fontSize="24" fontWeight="900"
        fontFamily="Inter, Manrope, system-ui, sans-serif" letterSpacing="-.9">R</text>
      <text x="27.1" y="32.2" fill="#f97316" fontSize="23" fontWeight="900"
        fontFamily="Inter, Manrope, system-ui, sans-serif" letterSpacing="-.8">Y</text>
      <defs>
        <radialGradient id="radyarHeroLogoBg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12) rotate(50) scale(38)">
          <stop stopColor="#102a44"/>
          <stop offset="0.62" stopColor="#071a2f"/>
          <stop offset="1" stopColor="#020617"/>
        </radialGradient>
        <linearGradient id="radyarHeroLogoArc" x1="11" y1="8" x2="42" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff"/>
          <stop offset="1" stopColor="#f97316"/>
        </linearGradient>
        <radialGradient id="radyarHeroLogoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.8 14) scale(8)">
          <stop stopColor="#ffedd5" stopOpacity=".95"/>
          <stop offset=".45" stopColor="#f97316" stopOpacity=".45"/>
          <stop offset="1" stopColor="#f97316" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  )
}



// ── ZONE → LERNEN MAPPING ─────────────────────────────────────────────────
const ZONE_TO_LERNEN = {
  Neuroradiologie:    '/lernen/gehirn',
  Hals:               '/lernen/hals',
  Wirbelsaeule:       '/lernen/wirbelsaeule',
  Thorax:             '/lernen/thorax',
  Brust:              '/lernen/mamma',
  Abdomen:            '/lernen/abdomen',
  Becken:             null,  // popup: Becken Frau/Mann
  BeckenF:            '/lernen/becken-f',
  BeckenM:            '/lernen/becken-m',
  Muskuloskelettales: '/lernen/msk',
  Technik:            '/lernen/technik',
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const { texts, lang } = useLanguage()
  const [hovered, setHovered] = useState(null)
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{ setMounted(true) },[])

  const hovFach = hovered ? FACH_DATA[hovered] : null
  const hovName = hovered ? (FACH_NAMES[lang]?.[hovered]||FACH_NAMES.de[hovered]) : null

  const hintLabel = lang === 'fa'
    ? 'یک ناحیه از بدن را روی تصویر انتخاب کن'
    : lang === 'en'
      ? 'Choose a body region on the image'
      : 'Wähle auf dem Bild eine Körperregion aus'

  const [popup, setPopup] = useState(null)

  const POPUP_ZONES = {
    Becken: {
      choices: [
        { id: 'BeckenF', label: { de: 'Becken – Frau', en: 'Pelvis – Female', fa: 'لگن – زنان' }, url: '/lernen/becken-f', icon: '♀️' },
        { id: 'BeckenM', label: { de: 'Becken – Mann', en: 'Pelvis – Male', fa: 'لگن – مردان' }, url: '/lernen/becken-m', icon: '♂️' },
      ]
    },
  }

  const handleZoneClick = (zoneId) => {
    if (POPUP_ZONES[zoneId]) {
      setPopup(zoneId)
      return
    }
    const url = ZONE_TO_LERNEN[zoneId]
    if (url) window.location.href = url
  }

  return (
    <section className={styles.hero}>
      <div className={styles.bg}/>
      <div className={styles.bgGrid}/>

      {/* ── LEFT ── */}
      <div className={`${styles.left} ${mounted?styles.leftIn:''}`}>

        <div className={styles.wordmark} dir="ltr" lang="en">
          <HexLogo/>
          <div className={styles.wmText} dir="ltr" lang="en">
            <span className={styles.wmTitle}>
              <span className={styles.wmRad}>RAD</span>
              <span className={styles.wmYar}>YAR</span>
            </span>
            <span className={styles.wmSub} dir="ltr" lang="en">
              {texts.heroSub||'Radiology Education'}
            </span>
          </div>
        </div>

        <p className={styles.tagline}>{texts.tagline}</p>
        <div className={styles.bar}/>
        <p className={styles.desc}>{texts.heroDesc}</p>



        <div className={styles.hoverIndicator}
          style={hovFach ? {
            borderColor: hovFach.color,
            background: hovFach.color+'22',
            boxShadow: `0 0 18px ${hovFach.color}44`
          } : {}}>
          <span className={styles.hoverDot}
            style={{ background: hovFach?.color || '#f97316' }}/>
          <span className={styles.hoverText}
            style={{ color: hovFach ? hovFach.color : '#f97316' }}>
            {hovName || hintLabel}
          </span>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className={`${styles.right} ${mounted?styles.rightIn:''}`}>
        <MagneticField/>

        <div className={styles.bodyWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/body-anatomy.png" alt="Anatomy" className={styles.bodyImg} draggable={false}/>

          <div className={styles.bodyColorWash}
            style={{background:hovFach
              ?`radial-gradient(ellipse 60% 70% at 50% 38%, ${hovFach.color}1a 0%, transparent 70%)`
              :'none'}}/>

          <svg className={styles.zoneSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {ZONES.map((zone,i)=>{
              const isHov = hovered===zone.id
              const color = FACH_DATA[zone.id]?.color||'#f97316'
              const commonProps = {
                fill: isHov ? color+'2f' : 'transparent',
                stroke: isHov ? color : 'transparent',
                strokeWidth: '0.35',
                style: { cursor:'pointer', transition:'fill 0.2s,stroke 0.2s' },
                onMouseEnter: () => setHovered(zone.id),
                onMouseLeave: () => setHovered(null),
                onClick: () => handleZoneClick(zone.id),
                pointerEvents: 'all',
              }

              if (zone.shape === 'ellipse') {
                return <ellipse key={i} {...commonProps} cx={zone.cx} cy={zone.cy} rx={zone.rx} ry={zone.ry} />
              }

              if (zone.shape === 'polygon') {
                return <polygon key={i} {...commonProps} points={zone.points} />
              }

              return (
                <rect key={i} {...commonProps}
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={zone.rx || 1.2}
                />
              )
            })}
          </svg>

          {hovered && hovFach && (
            <div className={styles.zoneLabel}
              style={{color:hovFach.color,borderColor:hovFach.color+'55',background:'rgba(8,14,28,0.88)'}}>
              <span className={styles.zoneDot} style={{background:hovFach.color}}/>
              {hovName}
            </div>
          )}
        </div>
      </div>

      {/* Zone choice popup */}
      {popup && (
        <div className={styles.zonePopupOverlay} onClick={() => setPopup(null)}>
          <div className={styles.zonePopup} onClick={e => e.stopPropagation()}>
            <div className={styles.zonePopupTitle}>
              {popup === 'Becken'
                ? (lang === 'fa' ? 'کدام بخش لگن؟' : lang === 'en' ? 'Which pelvis section?' : 'Welcher Beckenbereich?')
                : (lang === 'fa' ? 'کدام تخصص؟' : lang === 'en' ? 'Which specialty?' : 'Welches Fachgebiet?')}
            </div>
            <div className={styles.zonePopupChoices}>
              {POPUP_ZONES[popup]?.choices.map(choice => (
                <button key={choice.id} className={styles.zonePopupBtn}
                  onClick={() => { setPopup(null); window.location.href = choice.url }}>
                  <span className={styles.zonePopupIcon}>{choice.icon}</span>
                  <span>{choice.label[lang] || choice.label.de}</span>
                  <span className={styles.zonePopupArr}>→</span>
                </button>
              ))}
            </div>
            <button className={styles.zonePopupClose} onClick={() => setPopup(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
