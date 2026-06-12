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

// Curved hotspots traced in the original 941 × 1672 image coordinate system.
// Broad extremity paths come first; smaller anatomical regions sit above them.
const ZONES = [
  {
    id: 'Muskuloskelettales',
    d: 'M296 318 C263 319 234 333 217 358 C199 385 199 426 200 465 C201 516 191 568 174 615 C158 658 139 704 126 754 C117 790 108 823 98 854 C91 876 75 898 63 916 C54 930 59 944 74 947 C83 949 91 944 98 936 C101 951 111 960 124 958 C134 957 141 950 145 941 C151 953 162 958 172 953 C184 947 186 934 181 920 C177 906 184 878 195 852 C208 813 218 776 228 736 C240 690 254 650 266 612 C280 568 286 521 284 474 C282 430 281 390 293 357 C300 339 303 326 296 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(-5 0)',
    d: 'M546 318 C579 319 608 333 625 358 C643 385 643 426 642 465 C641 516 651 568 668 615 C684 658 703 704 716 754 C725 790 734 823 744 854 C751 876 767 898 779 916 C788 930 783 944 768 947 C759 949 751 944 744 936 C741 951 731 960 718 958 C708 957 701 950 697 941 C691 953 680 958 670 953 C658 947 656 934 661 920 C665 906 658 878 647 852 C634 813 624 776 614 736 C602 690 588 650 576 612 C562 568 556 521 558 474 C560 430 561 390 549 357 C542 339 539 326 546 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    d: 'M271 837 C239 853 221 886 219 929 C216 984 229 1038 244 1091 C256 1135 263 1173 257 1213 C251 1255 247 1294 252 1335 C257 1380 268 1421 272 1461 C274 1482 270 1499 260 1516 C248 1537 235 1562 231 1583 C228 1601 240 1616 258 1617 C276 1618 295 1625 315 1626 C335 1627 350 1615 349 1599 C347 1578 334 1547 326 1526 C320 1509 319 1491 322 1469 C328 1423 340 1380 344 1338 C348 1298 346 1258 342 1220 C338 1181 344 1145 354 1107 C367 1059 377 1010 380 960 C383 916 375 879 352 853 C332 831 296 824 271 837 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(25 0)',
    d: 'M487 837 C519 853 537 886 539 929 C542 984 529 1038 514 1091 C502 1135 495 1173 501 1213 C507 1255 511 1294 506 1335 C501 1380 490 1421 486 1461 C484 1482 488 1499 498 1516 C510 1537 523 1562 527 1583 C530 1601 518 1616 500 1617 C482 1618 463 1625 443 1626 C423 1627 408 1615 409 1599 C411 1578 424 1547 432 1526 C438 1509 439 1491 436 1469 C430 1423 418 1380 414 1338 C410 1298 412 1258 416 1220 C420 1181 414 1145 404 1107 C391 1059 381 1010 378 960 C375 916 383 879 406 853 C426 831 462 824 487 837 Z',
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
    id: 'Hals',
    transform: 'translate(-5 0)',
    d: 'M373 207 C380 228 380 253 373 275 C365 295 354 307 336 316 C356 331 385 338 421 338 C471 338 510 331 537 316 C513 307 497 295 487 275 C477 253 476 228 486 207 C468 229 447 241 421 241 C402 241 387 229 373 207 Z',
  },
  {
    id: 'Neuroradiologie',
    transform: 'translate(-5 0)',
    d: 'M421 38 C454 38 478 58 484 91 C490 120 485 163 473 190 C463 215 445 234 421 240 C397 234 379 215 369 190 C357 163 352 120 358 91 C364 58 388 38 421 38 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(337 520) scale(0.5) translate(-337 -520)',
    d: 'M293 349 C319 333 354 333 379 350 C398 364 406 392 405 429 C404 470 392 513 366 537 C347 554 320 554 300 539 C276 520 267 482 269 440 C271 398 278 366 293 349 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(505 520) scale(0.5) translate(-505 -520)',
    d: 'M549 349 C523 333 488 333 463 350 C444 364 436 392 437 429 C438 470 450 513 476 537 C495 554 522 554 542 539 C566 520 575 482 573 440 C571 398 564 366 549 349 Z',
  },
  {
    id: 'Wirbelsaeule',
    transform: 'translate(-5 0)',
    d: 'M409 235 C402 276 404 321 408 365 C411 406 405 446 407 486 C409 528 417 567 411 609 C406 650 397 687 401 728 C403 754 409 779 421 803 C433 779 439 754 441 728 C445 687 436 650 431 609 C425 567 433 528 435 486 C437 446 431 406 434 365 C438 321 440 276 433 235 C426 240 416 240 409 235 Z',
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
