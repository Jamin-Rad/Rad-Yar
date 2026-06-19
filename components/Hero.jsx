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
    color: '#f9a8d4',
    bg: 'linear-gradient(135deg,#3b102c,#6b214f)',
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
    bg: 'linear-gradient(135deg,#3a1b0a,#7c2d12)',
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

// Curved hotspots traced in the original 941 × 1672 image coordinate system.
// Broad extremity paths come first; smaller anatomical regions sit above them.
const ZONES = [
  {
    id: 'Muskuloskelettales',
    transform: 'translate(8 0)',
    d: 'M248 318 L217 340 L208 360 L200 390 L198 420 L199 460 L195 500 L188 550 L175 600 L156 650 L144 700 L136 750 L126 800 C121 825 112 850 92 880 C79 899 68 918 61 940 C68 955 78 968 83 982 C86 995 91 1011 101 1020 C112 1024 126 1018 133 1000 C143 988 151 975 154 958 C157 939 157 918 156 900 C156 883 158 863 170 845 C180 826 188 804 192 780 L208 750 L224 700 L235 650 L246 600 L254 550 L262 500 L264 460 L266 420 L271 390 L276 360 L286 340 L298 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(8 0)',
    d: 'M522 318 L526 340 L532 360 L538 390 L542 420 L543 460 L544 500 L546 550 L548 580 L555 600 L562 650 L579 700 L601 750 L623 800 L639 820 L642 850 L644 880 L643 920 L645 940 L646 980 L666 1000 L687 1020 L698 1020 L719 1000 L717 980 L713 950 L739 940 L734 930 L731 920 L721 900 L708 880 L691 860 L685 840 L680 820 L675 800 L665 750 L657 700 L645 650 L625 600 L614 550 L607 500 L603 460 L604 420 L602 390 L597 360 L586 340 L559 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(8 0)',
    d: 'M274 930 C278 908 294 892 318 886 C340 881 361 889 374 906 C387 923 392 948 386 1000 L378 1060 L370 1120 L360 1180 L350 1240 L346 1300 L342 1360 L334 1420 L326 1480 L331 1540 L312 1590 L299 1625 L242 1625 L238 1590 L268 1540 L276 1480 L270 1420 L258 1360 L247 1300 L251 1240 L260 1180 L257 1120 L241 1060 L228 1000 L244 950 C251 941 261 934 274 930 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(810 0) scale(-1 1)',
    d: 'M274 930 C278 908 294 892 318 886 C340 881 361 889 374 906 C387 923 392 948 386 1000 L378 1060 L370 1120 L360 1180 L350 1240 L346 1300 L342 1360 L334 1420 L326 1480 L331 1540 L312 1590 L299 1625 L242 1625 L238 1590 L268 1540 L276 1480 L270 1420 L258 1360 L247 1300 L251 1240 L260 1180 L257 1120 L241 1060 L228 1000 L244 950 C251 941 261 934 274 930 Z',
  },
  {
    id: 'Thorax',
    transform: 'translate(-5 0)',
    d: 'M299 307 C329 299 350 286 363 273 C381 285 397 290 421 290 C445 290 462 285 480 273 C494 287 514 299 544 307 C567 313 581 330 588 354 C597 386 592 432 585 474 C577 522 563 563 543 599 C521 625 483 638 421 638 C359 638 321 625 299 599 C279 563 265 522 257 474 C250 432 245 386 254 354 C261 330 276 313 299 307 Z',
  },
  {
    id: 'Abdomen',
    transform: 'translate(-5 0)',
    d: 'M299 543 C330 558 366 565 421 565 C476 565 512 558 543 543 C552 577 558 610 554 644 C551 677 543 706 545 734 C546 758 554 781 561 801 C527 821 480 833 421 833 C362 833 315 821 281 801 C288 781 296 758 297 734 C299 706 291 677 288 644 C284 610 290 577 299 543 Z',
  },
  {
    id: 'Becken',
    transform: 'translate(-5 0)',
    d: 'M278 711 C310 703 345 708 373 726 C390 737 405 744 421 744 C437 744 452 737 469 726 C497 708 532 703 564 711 C576 746 580 783 575 820 C570 857 554 889 529 913 C500 939 462 950 421 950 C380 950 342 939 313 913 C288 889 272 857 267 820 C262 783 266 746 278 711 Z',
  },
  {
    id: 'Neuroradiologie',
    transform: 'translate(-5 0)',
    d: 'M421 36 C444 37 466 48 478 68 C486 82 488 101 486 121 C493 124 496 134 493 149 C490 164 483 176 475 181 C471 197 462 212 449 223 C440 231 431 236 421 238 C409 236 398 231 386 223 C371 213 361 198 357 181 C348 176 340 164 337 149 C334 134 338 123 346 119 C343 99 346 80 356 65 C370 46 396 37 421 36 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(8 0)',
    d: 'M300 405 C319 390 349 389 371 403 C390 417 397 443 394 472 C391 505 378 529 358 540 C337 551 309 545 292 527 C277 510 274 484 277 457 C280 432 287 414 300 405 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(8 0)',
    d: 'M542 405 C523 390 493 389 471 403 C452 417 445 443 448 472 C451 505 464 529 484 540 C505 551 533 545 550 527 C565 510 568 484 565 457 C562 432 555 414 542 405 Z',
  },
  {
    id: 'Wirbelsaeule',
    transform: 'translate(-5 0)',
    d: 'M409 235 C402 276 404 321 408 365 C411 406 405 446 407 486 C409 528 417 567 411 609 C406 650 397 687 401 728 C403 754 409 779 421 803 C433 779 439 754 441 728 C445 687 436 650 431 609 C425 567 433 528 435 486 C437 446 431 406 434 365 C438 321 440 276 433 235 C426 240 416 240 409 235 Z',
  },
  {
    id: 'Hals',
    transform: 'translate(-5 0)',
    d: 'M366 207 C367 225 371 245 371 263 C371 276 362 288 348 298 C365 307 387 313 413 315 C439 313 461 307 483 298 C468 288 460 276 456 263 C455 245 453 225 463 207 C449 228 436 239 413 239 C391 239 378 228 366 207 Z',
  },
  {
    id: 'Technik',
    d: 'M705 1347 C750 1335 812 1341 852 1370 C883 1393 898 1433 899 1483 C900 1519 893 1548 879 1568 C900 1577 910 1590 906 1604 C900 1622 860 1632 787 1636 L663 1636 C627 1633 608 1623 609 1608 C610 1594 626 1582 650 1573 L650 1537 L601 1537 C582 1537 572 1529 574 1517 C576 1505 591 1499 614 1499 L677 1499 C674 1470 679 1432 688 1398 C692 1378 698 1361 705 1347 Z M746 1411 C724 1424 715 1447 716 1474 C717 1500 729 1517 750 1524 C776 1532 801 1522 815 1500 C830 1477 826 1445 808 1426 C791 1408 766 1400 746 1411 Z',
  },
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
    ? 'یک ناحیه از بدن را انتخاب کن'
    : lang === 'en'
      ? 'Choose a body region'
      : 'Wähle eine Körperregion'

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

          <svg className={styles.zoneSvg} viewBox="0 0 941 1672" preserveAspectRatio="none" aria-label={hintLabel}>
            <g transform="translate(-8 0)">
              {ZONES.map((zone,i)=>{
                const isHov = hovered===zone.id
                const color = FACH_DATA[zone.id]?.color||'#f97316'
                const commonProps = {
                  'data-zone': zone.id,
                  'aria-label': FACH_NAMES[lang]?.[zone.id] || FACH_NAMES.de[zone.id],
                  fill: isHov ? color+'2f' : 'transparent',
                  stroke: isHov ? color : 'transparent',
                  strokeWidth: '4',
                  strokeLinejoin: 'round',
                  fillRule: 'evenodd',
                  transform: zone.transform,
                  style: { cursor:'pointer', transition:'fill 0.2s,stroke 0.2s' },
                  onMouseEnter: () => setHovered(zone.id),
                  onMouseLeave: () => setHovered(null),
                  onClick: () => handleZoneClick(zone.id),
                  pointerEvents: 'all',
                }

                return <path key={i} {...commonProps} d={zone.d} />
              })}
            </g>
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
