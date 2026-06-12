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
      { label:{ de:'Inhaltsverzeichnis', en:'Table of Contents', fa:'فهرست مطالب' }, href:'/lernen/technik', ready:true },
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

// Hotspots traced from the actual silhouette of the 941 × 1672 body-anatomy image
// (alpha-mask edge detection, sampled every ~3% of height). Broad limb regions
// come first; smaller regions (neck, head, breast, spine, MRI icon) sit above them.
const ZONES = [
  { id:'Muskuloskelettales', shape:'polygon', points:'24.5,61 25.9,64 27.3,67 27.8,70 27.1,73 26.4,76 26.6,79 27.6,82 28.7,85 29.3,88 29,91 26.5,94 25.3,97 32,97 33.8,94 34.8,91 34.5,88 35,85 36,82 37.2,79 37.3,76 37,73 38.5,70 39.3,67 39.7,64 40.8,61' },
  { id:'Muskuloskelettales', shape:'polygon', points:'44.2,61 45.1,64 45.7,67 46.4,70 47.9,73 47.6,76 47.7,79 49,82 49.9,85 50.3,88 50.1,91 50.9,94 52.7,97 59.4,97 58.4,94 55.8,91 55.5,88 56.1,85 57.3,82 58.4,79 58.7,76 57.6,73 57.2,70 57.7,67 58.8,64 60,61' },
  { id:'Muskuloskelettales', shape:'polygon', points:'23.7,20 21.1,23 21.1,26 20.9,29 20.2,32 19.3,35 17.2,38 15.6,41 14.7,44 13.6,47 12.1,50 10.7,52 8.3,54 6.7,56 8.8,58 8.5,60 10.7,61 11.9,61 14,60 16.4,58 16.5,56 16.7,54 16.5,52 17.3,50 19.6,47 21.9,44 24.2,41 25.6,38 26.7,35 27.9,32 28.4,29 28.9,26 29.5,23 30,20' },
  { id:'Muskuloskelettales', shape:'polygon', points:'61.7,20 64,23 64.2,26 64.3,29 65,32 65.9,35 67.9,38 69.6,41 70.5,44 71.4,47 72.7,50 74.3,52 76.7,54 78.2,56 76.1,58 76.4,60 74.2,61 73,61 70.9,60 68.5,58 68.5,56 68.2,54 68.5,52 67.8,50 65.6,47 63,44 60.8,41 59.5,38 58.4,35 57.2,32 56.7,29 56.1,26 55.6,23 55,20' },
  { id:'Thorax',             shape:'polygon', points:'55,19 55.2,21 55.6,23 55.9,25 56.3,27 56.7,29 57,31 57.4,33 55.9,35 55.2,37 55,38 29.9,38 29.6,37 28.9,35 27.7,33 28.1,31 28.4,29 28.8,27 29.1,25 29.5,23 29.8,21 30,19' },
  { id:'Abdomen',            shape:'polygon', points:'55,38 56.6,41 59.2,44 60.4,47 61.1,50 61.5,53 61.5,56 23.2,56 23.1,53 23.6,50 24.5,47 25.7,44 28.3,41 29.9,38' },
  { id:'Becken',             shape:'polygon', points:'61.5,56 61.1,58 60.5,60 59.9,61.5 24.8,61.5 24.2,60 23.6,58 23.2,56' },
  { id:'Hals',               shape:'polygon', points:'39.5,18.5 47.5,18.5 47,21 41,21' },
  { id:'Neuroradiologie',    shape:'polygon', points:'47,3 50.1,5 50.6,7 51,9 49.9,11 49.2,13 47.3,15 48.5,17 47.5,18.5 39.5,18.5 36.5,17 37.6,15 35.9,13 35.2,11 34.2,9 34.5,7 35.3,5 38.5,3' },
  { id:'Brust',              shape:'polygon', points:'28.5,23 40,22.5 41,30 38,34.5 31,33 27,28' },
  { id:'Brust',              shape:'polygon', points:'47.5,22.5 59,23 61,28 57,33 50,34.5 47,30' },
  { id:'Wirbelsaeule',       shape:'polygon', points:'43,18.5 44,18.5 44.6,40 44.3,60 42.7,60 42.9,40' },
  { id:'Technik',            shape:'polygon', points:'63,79 97,79 97,98 63,98' },
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

    const protons = Array.from({ length: 14 }, (_, index) => ({
      orbit: index % 3,
      phase: (index / 14) * Math.PI * 2,
      speed: 0.000055 + (index % 4) * 0.000006,
    }))
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let animId

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width * 0.5
      const cy = height * 0.43
      const pulse = reducedMotion ? 0.4 : (Math.sin(time * 0.0011) + 1) / 2

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.52)
      glow.addColorStop(0, `rgba(56,189,248,${0.035 + pulse * 0.018})`)
      glow.addColorStop(0.55, 'rgba(37,99,235,0.018)')
      glow.addColorStop(1, 'rgba(37,99,235,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      const fieldTop = height * 0.09
      const fieldBottom = height * 0.84
      const fieldGradient = ctx.createLinearGradient(0, fieldTop, 0, fieldBottom)
      fieldGradient.addColorStop(0, 'rgba(125,211,252,0.08)')
      fieldGradient.addColorStop(0.45, 'rgba(125,211,252,0.34)')
      fieldGradient.addColorStop(1, 'rgba(125,211,252,0.04)')
      ctx.strokeStyle = fieldGradient
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(cx, fieldBottom)
      ctx.lineTo(cx, fieldTop)
      ctx.stroke()
      ctx.fillStyle = 'rgba(125,211,252,0.55)'
      ctx.beginPath()
      ctx.moveTo(cx, fieldTop - 1)
      ctx.lineTo(cx - 5, fieldTop + 9)
      ctx.lineTo(cx + 5, fieldTop + 9)
      ctx.closePath()
      ctx.fill()
      ctx.font = '700 10px Manrope, sans-serif'
      ctx.fillText('B₀', cx + 9, fieldTop + 6)

      const orbitSizes = [
        [width * 0.24, height * 0.31],
        [width * 0.34, height * 0.39],
        [width * 0.44, height * 0.47],
      ]

      orbitSizes.forEach(([rx, ry], index) => {
        const gradient = ctx.createLinearGradient(cx - rx, cy, cx + rx, cy)
        gradient.addColorStop(0, 'rgba(56,189,248,0)')
        gradient.addColorStop(0.5, `rgba(125,211,252,${0.18 - index * 0.025})`)
        gradient.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = index === 0 ? 1.45 : 1
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
      })

      protons.forEach((proton) => {
        const [rx, ry] = orbitSizes[proton.orbit]
        const angle = proton.phase + (reducedMotion ? 0 : time * proton.speed)
        const x = cx + Math.cos(angle) * rx
        const y = cy + Math.sin(angle) * ry
        const alpha = 0.3 + (Math.cos(angle) + 1) * 0.14
        ctx.shadowColor = 'rgba(56,189,248,0.5)'
        ctx.shadowBlur = 6
        ctx.fillStyle = `rgba(186,230,253,${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, proton.orbit === 0 ? 2 : 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      const rfRadius = width * (0.09 + pulse * 0.045)
      ctx.strokeStyle = `rgba(249,115,22,${0.34 - pulse * 0.12})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.ellipse(cx, cy, rfRadius, rfRadius * 0.32, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fillStyle = 'rgba(249,115,22,0.62)'
      ctx.font = '700 9px Manrope, sans-serif'
      ctx.fillText('RF', cx + rfRadius + 6, cy + 3)

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
    const usesTouchSelection = window.matchMedia?.('(max-width: 640px), (hover: none), (pointer: coarse)').matches
    if (usesTouchSelection && hovered !== zoneId) {
      setHovered(zoneId)
      return
    }
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

          <svg className={styles.zoneSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-label={hintLabel}>
            {ZONES.map((zone,i)=>{
              const isHov = hovered===zone.id
              const color = FACH_DATA[zone.id]?.color||'#f97316'
              const commonProps = {
                'data-zone': zone.id,
                'aria-label': FACH_NAMES[lang]?.[zone.id] || FACH_NAMES.de[zone.id],
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
