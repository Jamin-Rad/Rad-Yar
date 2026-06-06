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

// ── ZONES ─────────────────────────────────────────────────────────────────
// Kalibriert für 941×1672 px — Bild füllt den Container exakt (aspect-ratio 941/1672).
// Koordinaten = Pixel-% des Original-Bildes. Links im SVG = Links beim Betrachter.
const ZONES = [
  // ── Linker Arm (Betrachter links) → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'7,17 23,17 22,24 17,36 11,48 7,48' },
  // ── Rechter Arm (Betrachter rechts) → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'77,17 93,17 93,48 83,48 78,36 78,24' },
  // ── Linkes Bein → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'19,63 50,63 49,78 46,92 28,92 21,78' },
  // ── Rechtes Bein → MSK
  { id:'Muskuloskelettales', shape:'polygon', points:'50,63 81,63 79,78 72,92 54,92 51,78' },
  // ── Thorax
  { id:'Thorax',             shape:'polygon', points:'21,17 79,17 79,22 77,35 23,35 21,22' },
  // ── Abdomen
  { id:'Abdomen',            shape:'polygon', points:'22,35 78,35 78,50 22,50' },
  // ── Becken
  { id:'Becken',             shape:'polygon', points:'22,50 78,50 78,63 22,63' },
  // ── Hals
  { id:'Hals',               shape:'polygon', points:'44,12 56,12 56,17 44,17' },
  // ── Kopf / Neuroradiologie
  { id:'Neuroradiologie',    shape:'polygon', points:'35,3 65,3 67,8 65,12 50,17 35,12 33,8' },
  // ── Linke Brust (Betrachter links)
  { id:'Brust',              shape:'polygon', points:'21,18 41,18 41,29 23,29 21,23' },
  // ── Rechte Brust (Betrachter rechts)
  { id:'Brust',              shape:'polygon', points:'59,18 79,18 79,23 77,29 59,29' },
  // ── Wirbelsäule
  { id:'Wirbelsaeule',       shape:'polygon', points:'47,17 53,17 53,53 47,53' },
  // ── Technik / MRT-Gerät (untere rechte Ecke des Bildes)
  { id:'Technik',            shape:'polygon', points:'64,88 94,88 94,98 64,98' },
]

// ── BACKGROUND REMOVAL (Canvas) ───────────────────────────────────────────
// Entfernt den weißen Hintergrund (inkl. Haar-Fransen) direkt im Browser.
// threshold: Min-Kanal ≥ threshold → transparent; ≥ threshold-30 → weich ausblenden.
function useRemovedBg(src, threshold = 222) {
  const [result, setResult] = useState(null) // null = noch nicht fertig

  useEffect(() => {
    if (typeof window === 'undefined' || !src) return
    let cancelled = false

    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imgData.data
      const edge = 30 // Überblendungsbreite in Helligkeitseinheiten

      for (let i = 0; i < d.length; i += 4) {
        // min(R,G,B) misst "Weißheit" — blau/farbige Pixel bleiben unberührt
        const bright = Math.min(d[i], d[i + 1], d[i + 2])
        if (bright >= threshold) {
          d[i + 3] = 0
        } else if (bright >= threshold - edge) {
          // weiches Ausblenden nahe der Grenze
          d[i + 3] = Math.round(((threshold - bright) / edge) * d[i + 3])
        }
      }

      ctx.putImageData(imgData, 0, 0)
      if (!cancelled) setResult(canvas.toDataURL('image/png'))
    }
    img.src = src
    return () => { cancelled = true }
  }, [src, threshold])

  return result // null solange Verarbeitung läuft
}

// ── MAGNETIC FIELD ANIMATION ──────────────────────────────────────────────
function MagneticField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const NUM_PARTICLES = 55
    const NUM_LINES = 8
    const getCenter = () => ({ cx: canvas.width*0.5, cy: canvas.height*0.42 })

    const fieldLines = Array.from({length:NUM_LINES},(_,i)=>{
      const t=(i+1)/(NUM_LINES+1)
      return {
        rx: canvas.width*(0.1+t*0.4),
        ry: canvas.height*(0.07+t*0.28),
        tilt:(i%2===0?1:-1)*0.07,
        opacity:0.03+t*0.04,
        color:i%3===0?'#60a5fa':i%3===1?'#a78bfa':'#34d399',
      }
    })

    const particles = Array.from({length:NUM_PARTICLES},(_,i)=>{
      const li=i%NUM_LINES
      return {
        li, phase:(Math.PI*2*i)/NUM_PARTICLES+Math.random()*0.5,
        speed:0.003+Math.random()*0.004,
        size:1.5+Math.random()*2,
        opacity:0.4+Math.random()*0.5,
        wobble:0.015+Math.random()*0.025,
        wobblePhase:Math.random()*Math.PI*2,
        wobbleSpeed:0.02+Math.random()*0.03,
        color:['#f97316','#fbbf24','#60a5fa','#a78bfa','#34d399','#f472b6'][i%6],
        trail:[],
      }
    })

    let animId
    const draw = () => {
      const {cx,cy} = getCenter()
      ctx.clearRect(0,0,canvas.width,canvas.height)

      fieldLines.forEach(fl=>{
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(fl.tilt)
        ctx.beginPath(); ctx.ellipse(0,0,fl.rx,fl.ry,0,0,Math.PI*2)
        ctx.strokeStyle=fl.color; ctx.globalAlpha=fl.opacity
        ctx.lineWidth=0.8; ctx.setLineDash([4,12]); ctx.stroke()
        ctx.restore()
      })
      ctx.setLineDash([])

      particles.forEach(p=>{
        const fl=fieldLines[p.li]
        p.phase+=p.speed; p.wobblePhase+=p.wobbleSpeed
        const wobX=Math.cos(p.wobblePhase)*fl.rx*p.wobble
        const wobY=Math.sin(p.wobblePhase*1.3)*fl.ry*p.wobble
        const x=cx+(fl.rx+wobX)*Math.cos(p.phase)*Math.cos(fl.tilt)-(fl.ry+wobY)*Math.sin(p.phase)*Math.sin(fl.tilt)
        const y=cy+(fl.rx+wobX)*Math.cos(p.phase)*Math.sin(fl.tilt)+(fl.ry+wobY)*Math.sin(p.phase)*Math.cos(fl.tilt)
        p.trail.push({x,y}); if(p.trail.length>18) p.trail.shift()

        if(p.trail.length>2){
          for(let t=1;t<p.trail.length;t++){
            const prog=t/p.trail.length
            ctx.beginPath(); ctx.moveTo(p.trail[t-1].x,p.trail[t-1].y); ctx.lineTo(p.trail[t].x,p.trail[t].y)
            ctx.strokeStyle=p.color; ctx.globalAlpha=prog*p.opacity*0.35
            ctx.lineWidth=p.size*prog*0.7; ctx.stroke()
          }
        }
        const grad=ctx.createRadialGradient(x,y,0,x,y,p.size*3)
        grad.addColorStop(0,p.color); grad.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(x,y,p.size*3,0,Math.PI*2)
        ctx.fillStyle=grad; ctx.globalAlpha=p.opacity*0.22; ctx.fill()
        ctx.beginPath(); ctx.arc(x,y,p.size*0.8,0,Math.PI*2)
        ctx.fillStyle=p.color; ctx.globalAlpha=p.opacity*0.9; ctx.fill()
      })
      ctx.globalAlpha=1
      animId=requestAnimationFrame(draw)
    }
    draw()
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

  // Weißen PNG-Hintergrund (auch Haar-Fransen) im Browser entfernen
  const transparentBodyImg = useRemovedBg('/body-anatomy.png')

  const hovFach = hovered ? FACH_DATA[hovered] : null
  const hovName = hovered ? (FACH_NAMES[lang]?.[hovered]||FACH_NAMES.de[hovered]) : null

  const hintLabel  = lang==='fa'?'یک ناحیه را انتخاب کنید':lang==='en'?'Select a body region':'Körperregion auswählen'

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
          {!hovFach && <span className={styles.hoverArrow}>↗</span>}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className={`${styles.right} ${mounted?styles.rightIn:''}`}>
        <MagneticField/>

        <div className={styles.bodyWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={transparentBodyImg || '/body-anatomy.png'}
            alt="Anatomy"
            className={styles.bodyImg}
            draggable={false}
            style={transparentBodyImg ? {} : { opacity: 0.92 }}
          />

          <div className={styles.bodyColorWash}
            style={{background:hovFach
              ?`radial-gradient(ellipse 60% 70% at 50% 38%, ${hovFach.color}1a 0%, transparent 70%)`
              :'none'}}/>

          <svg className={styles.zoneSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            {ZONES.map((zone,i)=>{
              const isHov = hovered===zone.id
              const color = FACH_DATA[zone.id]?.color||'#f97316'
              const commonProps = {
                key: i,
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
                return <ellipse {...commonProps} cx={zone.cx} cy={zone.cy} rx={zone.rx} ry={zone.ry} />
              }

              if (zone.shape === 'polygon') {
                return <polygon {...commonProps} points={zone.points} />
              }

              return (
                <rect {...commonProps}
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
