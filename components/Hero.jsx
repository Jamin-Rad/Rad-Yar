'use client'
import Image from 'next/image'
import RadYarIcon from './RadYarIcon'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY } from '@/data/referenzen'
import styles from './Hero.module.css'

const PILLAR_ICONS = [
  '/lernbereiche/lektionen.jpg',
  '/lernbereiche/fallpruefung.jpg',
  '/lernbereiche/mcq.jpg',
  '/lernbereiche/flashcards.jpg',
]

const LEARNING_CARD_COLORS = ['#f97316', '#0ea5e9', '#10b981', '#2563eb']

const REFERENCE_CARDS = [
  { key: 'anatomie', title: 'btnAnatomie', desc: 'btnAnatomieSub', image: '/referenzen/anatomie/befundrelevante-anatomie.png', color: '#7c3aed' },
  { key: 'klassifikationen', title: 'btnKlass', desc: 'btnKlassSub', image: '/referenzen/klassifikation.png', color: '#f97316' },
  { key: 'messwerte', title: 'btnMesswerte', desc: 'btnMesswerteSub', image: '/referenzen/messwerte.png', color: '#0ea5e9' },
  { key: 'rechner', title: 'btnRechner', desc: 'btnRechnerSub', image: '/referenzen/rechner.png', color: '#059669' },
]

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

// Hotspots traced in the displayed 842 × 1672 image coordinate system.
// Broad extremity paths come first; smaller anatomical regions sit above them.
const ZONES = [
  {
    id: 'Muskuloskelettales',
    transform: 'translate(8 0)',
    d: 'M246 318 C225 324 211 340 205 365 C198 400 196 450 197 493 C196 535 188 568 177 607 L158 672 C149 704 141 738 136 768 L125 815 C119 842 105 866 85 891 C72 907 62 923 58 938 C59 946 64 951 72 953 L78 978 C80 987 87 990 94 984 L99 1005 C102 1015 110 1017 116 1008 L121 1016 C126 1024 136 1020 138 1011 L143 1008 C151 1013 158 1006 156 995 L151 965 C160 952 161 932 158 909 C155 887 158 868 170 848 C183 827 188 806 194 781 L209 744 L224 696 L237 647 L247 600 C256 558 262 518 263 481 L264 411 C266 374 277 343 298 321 C280 317 262 316 246 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(808 0) scale(-1 1)',
    d: 'M246 318 C225 324 211 340 205 365 C198 400 196 450 197 493 C196 535 188 568 177 607 L158 672 C149 704 141 738 136 768 L125 815 C119 842 105 866 85 891 C72 907 62 923 58 938 C59 946 64 951 72 953 L78 978 C80 987 87 990 94 984 L99 1005 C102 1015 110 1017 116 1008 L121 1016 C126 1024 136 1020 138 1011 L143 1008 C151 1013 158 1006 156 995 L151 965 C160 952 161 932 158 909 C155 887 158 868 170 848 C183 827 188 806 194 781 L209 744 L224 696 L237 647 L247 600 C256 558 262 518 263 481 L264 411 C266 374 277 343 298 321 C280 317 262 316 246 318 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(8 0)',
    d: 'M230 920 C218 960 225 1005 241 1050 C250 1090 257 1130 261 1160 C260 1200 250 1230 250 1260 C252 1320 258 1365 270 1415 C278 1450 278 1490 270 1530 C258 1560 242 1590 234 1620 C250 1645 285 1655 310 1642 C320 1630 325 1605 329 1570 C326 1530 322 1485 326 1450 C333 1400 340 1350 345 1300 C349 1250 355 1200 363 1150 C371 1100 381 1050 389 1000 C395 970 394 940 375 920 C330 900 275 900 230 920 Z',
  },
  {
    id: 'Muskuloskelettales',
    transform: 'translate(808 0) scale(-1 1)',
    d: 'M230 920 C218 960 225 1005 241 1050 C250 1090 257 1130 261 1160 C260 1200 250 1230 250 1260 C252 1320 258 1365 270 1415 C278 1450 278 1490 270 1530 C258 1560 242 1590 234 1620 C250 1645 285 1655 310 1642 C320 1630 325 1605 329 1570 C326 1530 322 1485 326 1450 C333 1400 340 1350 345 1300 C349 1250 355 1200 363 1150 C371 1100 381 1050 389 1000 C395 970 394 940 375 920 C330 900 275 900 230 920 Z',
  },
  {
    id: 'Thorax',
    transform: 'translate(8 0)',
    d: 'M270 337 C310 327 350 324 375 330 C388 340 392 360 400 374 C408 360 412 340 425 330 C450 324 490 327 530 337 C540 382 540 442 530 488 C525 514 520 536 516 552 C480 558 449 536 426 524 C410 516 390 516 374 524 C351 536 320 558 284 552 C280 536 275 514 270 488 C260 442 260 382 270 337 Z',
  },
  {
    id: 'Abdomen',
    transform: 'translate(8 0)',
    // Share the diaphragm and pelvic brim with adjacent regions: no overlap.
    d: 'M284 552 C320 558 351 536 374 524 C390 516 410 516 426 524 C449 536 480 558 516 552 C509 590 508 621 515 650 C518 674 527 700 534 726 C503 708 478 723 455 752 C437 770 419 779 400 780 C381 779 363 770 345 752 C322 723 297 708 266 726 C273 700 282 674 285 650 C292 621 291 590 284 552 Z',
  },
  {
    id: 'Becken',
    transform: 'translate(8 0)',
    d: 'M266 726 C297 708 322 723 345 752 C363 770 381 779 400 780 C419 779 437 770 455 752 C478 723 503 708 534 726 C548 750 558 780 568 820 C576 850 581 880 580 910 C578 932 570 949 555 960 C530 974 500 978 470 968 C444 958 424 938 410 914 C406 907 403 903 400 903 C397 903 394 907 390 914 C376 938 356 958 330 968 C300 978 270 974 245 960 C230 949 222 932 220 910 C219 880 224 850 232 820 C242 780 252 750 266 726 Z',
  },
  {
    id: 'Neuroradiologie',
    transform: 'translate(-5 0)',
    d: 'M421 36 C444 37 466 48 478 68 C486 82 488 101 486 121 C493 124 496 134 493 149 C490 164 483 176 475 181 C471 197 462 212 449 223 C440 231 431 236 421 238 C409 236 398 231 386 223 C371 213 361 198 357 181 C348 176 340 164 337 149 C334 134 338 123 346 119 C343 99 346 80 356 65 C370 46 396 37 421 36 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(8 0)',
    d: 'M302 444 C317 431 342 436 359 451 C376 467 381 491 370 514 C358 537 335 550 311 548 C291 547 277 534 274 514 C271 491 280 462 302 444 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(8 0)',
    d: 'M498 444 C483 431 458 436 441 451 C424 467 419 491 430 514 C442 537 465 550 489 548 C509 547 523 534 526 514 C529 491 520 462 498 444 Z',
  },
  {
    id: 'Wirbelsaeule',
    transform: 'translate(8 0)',
    // Stop at the exposed spine; abdominal organs cover the lower vertebrae.
    d: 'M390 308 C387 350 390 388 390 425 C388 462 390 501 391 535 C391 552 387 568 388 582 L412 582 C413 568 409 552 409 535 C410 501 412 462 410 425 C410 388 413 350 410 308 Z',
  },
  {
    id: 'Hals',
    transform: 'translate(-5 0)',
    d: 'M366 207 C367 225 371 245 371 263 C371 276 362 288 348 298 C365 307 387 313 413 315 C439 313 461 307 483 298 C468 288 460 276 456 263 C455 245 453 225 463 207 C449 228 436 239 413 239 C391 239 378 228 366 207 Z',
  },
]

// ── GALAXY → ATOM ANIMATION ───────────────────────────────────────────────
function GalaxyAtom() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, dpr = 1

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Stars
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.2,
      base: Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0004 + Math.random() * 0.0008,
    }))

    // Stream bezier control points (relative to w,h)
    // from galaxy (left-bottom) to atom (right-center)
    const STREAM_DEFS = [
      { cp1: [0.22, 0.9],  cp2: [0.55, 0.15], color: [100,160,255], width: 0.9 },
      { cp1: [0.18, 0.82], cp2: [0.60, 0.30], color: [120,140,255], width: 0.7 },
      { cp1: [0.28, 0.78], cp2: [0.52, 0.50], color: [80,190,255],  width: 0.8 },
      { cp1: [0.14, 0.95], cp2: [0.65, 0.55], color: [150,110,255], width: 0.6 },
    ]

    // Particles per stream
    const streamParticles = STREAM_DEFS.flatMap((s, si) =>
      Array.from({ length: 10 }, (_, i) => ({
        si, t: i / 10,
        speed: 0.00016 + Math.random() * 0.00012,
        r: Math.random() * 1.3 + 0.6,
      }))
    )

    // Electron orbits around atom
    const ORBITS = [
      { rx: 0.088, ry: 0.046, tilt: 0.0,  speed: 0.00095, phase: 0.0 },
      { rx: 0.072, ry: 0.058, tilt: 1.15, speed: 0.00070, phase: 2.1 },
      { rx: 0.100, ry: 0.034, tilt:-0.65, speed: 0.00115, phase: 4.3 },
    ]

    const bezPt = (t, x0,y0, cx1,cy1, cx2,cy2, x1,y1) => {
      const u = 1-t
      return {
        x: u*u*u*x0 + 3*u*u*t*cx1 + 3*u*t*t*cx2 + t*t*t*x1,
        y: u*u*u*y0 + 3*u*u*t*cy1 + 3*u*t*t*cy2 + t*t*t*y1,
      }
    }

    const drawGalaxy = (gx, gy, time) => {
      const pulse = (Math.sin(time * 0.00038) + 1) / 2

      // Outer haze
      const haze = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.22)
      haze.addColorStop(0,   `rgba(160,100,255,${0.18 + pulse*0.06})`)
      haze.addColorStop(0.45,'rgba(80,60,200,0.07)')
      haze.addColorStop(1,   'rgba(40,20,140,0)')
      ctx.fillStyle = haze
      ctx.fillRect(0, 0, w, h)

      // Spiral arms
      for (let arm = 0; arm < 3; arm++) {
        const offset = (arm / 3) * Math.PI * 2
        ctx.beginPath()
        let first = true
        for (let i = 0; i <= 260; i++) {
          const u = i / 260
          const angle = offset + u * Math.PI * 2.8 + time * 0.000038
          const r = u * w * 0.14
          const x = gx + Math.cos(angle) * r * 1.5
          const y = gy + Math.sin(angle) * r * 0.45
          first ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          first = false
        }
        const ag = ctx.createLinearGradient(gx, gy, gx + w*0.14, gy)
        ag.addColorStop(0,   `rgba(255,200,140,${0.28 + pulse*0.12})`)
        ag.addColorStop(0.5, `rgba(150,90,255,0.14)`)
        ag.addColorStop(1,   'rgba(70,50,200,0)')
        ctx.strokeStyle = ag
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Core
      const core = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.048)
      core.addColorStop(0,   `rgba(255,225,170,${0.9 + pulse*0.1})`)
      core.addColorStop(0.35,`rgba(230,150,255,0.45)`)
      core.addColorStop(1,   'rgba(100,50,200,0)')
      ctx.fillStyle = core
      ctx.beginPath(); ctx.arc(gx, gy, w * 0.048, 0, Math.PI*2); ctx.fill()
    }

    const drawStreams = (gx, gy, ax, ay, time) => {
      STREAM_DEFS.forEach((s, si) => {
        const [cx1,cy1] = [s.cp1[0]*w, s.cp1[1]*h]
        const [cx2,cy2] = [s.cp2[0]*w, s.cp2[1]*h]
        const [r,g,b] = s.color
        ctx.beginPath()
        ctx.moveTo(gx, gy)
        ctx.bezierCurveTo(cx1,cy1, cx2,cy2, ax, ay)
        ctx.strokeStyle = `rgba(${r},${g},${b},0.06)`
        ctx.lineWidth = s.width
        ctx.stroke()
      })

      streamParticles.forEach(p => {
        if (!reducedMotion) p.t = (p.t + p.speed) % 1
        const s = STREAM_DEFS[p.si]
        const [cx1,cy1] = [s.cp1[0]*w, s.cp1[1]*h]
        const [cx2,cy2] = [s.cp2[0]*w, s.cp2[1]*h]
        const pos = bezPt(p.t, gx,gy, cx1,cy1, cx2,cy2, ax,ay)
        const alpha = Math.sin(p.t * Math.PI) * 0.75
        const [r,g,b] = s.color
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`
        ctx.shadowBlur = 5
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const drawAtom = (ax, ay, time) => {
      const pulse = (Math.sin(time * 0.00065) + 1) / 2

      // Nucleus glow
      const ng = ctx.createRadialGradient(ax, ay, 0, ax, ay, w * 0.055)
      ng.addColorStop(0,   `rgba(170,130,255,${0.65+pulse*0.2})`)
      ng.addColorStop(0.5, `rgba(110,80,230,0.28)`)
      ng.addColorStop(1,   'rgba(80,50,190,0)')
      ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(ax, ay, w*0.055, 0, Math.PI*2); ctx.fill()

      // Nucleus spheres
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + time * 0.00015
        const nr = i % 2 === 0 ? 7 : 3.5
        const nx = ax + Math.cos(a) * nr, ny = ay + Math.sin(a) * nr * 0.8
        const sg = ctx.createRadialGradient(nx, ny, 0, nx, ny, 5)
        sg.addColorStop(0, `rgba(200,170,255,${0.85+pulse*0.1})`)
        sg.addColorStop(1, 'rgba(140,100,255,0)')
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(nx, ny, 5, 0, Math.PI*2); ctx.fill()
      }

      // Electron orbits
      ORBITS.forEach(orb => {
        const rx = orb.rx * w, ry = orb.ry * h
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(orb.tilt)
        // orbit ring
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2)
        ctx.strokeStyle = 'rgba(110,170,255,0.16)'; ctx.lineWidth = 0.9; ctx.stroke()
        // electron
        const ea = orb.phase + time * orb.speed
        const ex = Math.cos(ea) * rx, ey = Math.sin(ea) * ry
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 9)
        eg.addColorStop(0, 'rgba(180,215,255,0.95)')
        eg.addColorStop(1, 'rgba(100,160,255,0)')
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, 9, 0, Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI*2)
        ctx.fillStyle = '#e8f4ff'; ctx.fill()
        ctx.restore()
      })
    }

    let animId
    const draw = (time = 0) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#070c1d'; ctx.fillRect(0, 0, w, h)

      // Stars
      stars.forEach(star => {
        const a = star.base * (0.55 + 0.45 * Math.sin(star.phase + time * star.speed))
        ctx.beginPath(); ctx.arc(star.x*w, star.y*h, star.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(200,218,255,${a})`; ctx.fill()
      })

      const gx = w * 0.24, gy = h * 0.68
      const ax = w * 0.76, ay = h * 0.40

      drawGalaxy(gx, gy, time)
      drawStreams(gx, gy, ax, ay, time)
      drawAtom(ax, ay, time)

      if (!reducedMotion) animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.auroraCanvas} />
}

// ── HEX LOGO ──────────────────────────────────────────────────────────────
function HexLogo() {
  return <RadYarIcon size={52} />
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
  const router = useRouter()
  const [hovered, setHovered] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [mobilePanel, setMobilePanel] = useState(null)
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

  const handleLearningCard = (index) => {
    if (index === 0) router.push('/lernen')
    if (index === 1) router.push('/faelle')
    if (index === 2) router.push('/ueben')
    if (index === 3) router.push('/flashcards')
  }

  const openReferenceCard = (modal) => {
    window.dispatchEvent(new CustomEvent('radyar:open-reference-modal', { detail: { modal } }))
  }

  const referenceCopy = REF_COPY[lang] || REF_COPY.de

  return (
    <section className={styles.hero}>
      <div className={styles.bg}/>
      <GalaxyAtom/>
      <div className={styles.bgGrid}/>

      <div className={`${styles.heroHeader} ${mounted?styles.leftIn:''}`}>
        <div className={styles.wordmark} dir="ltr" lang="en">
          <HexLogo/>
          <div className={styles.wmText} dir="ltr" lang="en">
            <span className={styles.wmTitle}>
              <span className={styles.wmRad}>RAD</span>
              <span className={styles.wmYar}>YAR</span>
            </span>
            <span className={styles.wmSub} dir="ltr" lang="en">{texts.tagline}</span>
          </div>
        </div>
      </div>

      <div className={`${styles.stage} ${mounted?styles.stageIn:''}`}>
        <div className={styles.mobilePanelToggles} aria-label="Homepage shortcuts">
          <button
            type="button"
            className={`${styles.mobilePanelButton} ${mobilePanel === 'learning' ? styles.mobilePanelButtonActive : ''}`}
            onClick={() => setMobilePanel(panel => panel === 'learning' ? null : 'learning')}
            aria-expanded={mobilePanel === 'learning'}
          >
            <span className={styles.mobilePanelText}>{texts.section1Label}</span>
          </button>
          <button
            type="button"
            className={`${styles.mobilePanelButton} ${mobilePanel === 'references' ? styles.mobilePanelButtonActive : ''}`}
            onClick={() => setMobilePanel(panel => panel === 'references' ? null : 'references')}
            aria-expanded={mobilePanel === 'references'}
          >
            <span className={styles.mobilePanelText}>{referenceCopy.sectionLabel}</span>
          </button>
        </div>

        <div className={`${styles.cardColumn} ${styles.cardColumnLeft} ${mobilePanel === 'learning' ? styles.cardColumnMobileOpen : ''}`} aria-label={texts.section1Title}>
          <span className={styles.columnLabel}>{texts.section1Label}</span>
          {texts.pillars.map((pillar, index) => (
            <button
              key={pillar.title}
              type="button"
              className={`${styles.floatCard} ${styles[`floatLeft${index}`] || ''}`}
              style={{ '--card-color': LEARNING_CARD_COLORS[index] }}
              onClick={() => handleLearningCard(index)}
            >
              <span className={styles.floatIcon}>
                <Image src={PILLAR_ICONS[index]} alt="" width={62} height={62} />
              </span>
              <span className={styles.floatText}>
                <strong>{pillar.title}</strong>
                <small>{pillar.desc}</small>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.centerStage}>
          <div className={styles.bodyWrap}>

            <div className={styles.bodyColorWash}
              style={{background:hovFach
                ?`radial-gradient(ellipse 60% 70% at 50% 38%, ${hovFach.color}1a 0%, transparent 70%)`
                :'none'}}/>

            <svg className={styles.zoneSvg} viewBox="0 0 842 1672" preserveAspectRatio="xMidYMin meet" aria-label={hintLabel}>
              <image href="/body-anatomy-clean.png" width="842" height="1672" className={styles.bodyImg} pointerEvents="none" />
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
                    onPointerEnter: (event) => { if (event.pointerType === 'mouse') setHovered(zone.id) },
                    onPointerLeave: (event) => { if (event.pointerType === 'mouse') setHovered(null) },
                    onClick: () => handleZoneClick(zone.id),
                    pointerEvents: 'fill',
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
          <div className={styles.hoverIndicator}
            style={hovFach ? {
              borderColor: hovFach.color+'88',
              background: hovFach.color+'12',
              boxShadow: `0 8px 20px ${hovFach.color}22`
            } : {}}>
            <span className={styles.hoverDot}
              style={{ background: hovFach?.color || '#f97316' }}/>
            <span className={styles.hoverText}
              style={{ color: hovFach ? hovFach.color : '#f97316' }}>
              {hovName || hintLabel}
            </span>
          </div>
        </div>

        <div className={`${styles.cardColumn} ${styles.cardColumnRight} ${mobilePanel === 'references' ? styles.cardColumnMobileOpen : ''}`} aria-label={referenceCopy.sectionLabel}>
          <span className={styles.columnLabel}>{referenceCopy.sectionLabel}</span>
          {REFERENCE_CARDS.map((card, index) => (
            <button
              key={card.key}
              type="button"
              className={`${styles.floatCard} ${styles[`floatRight${index}`] || ''}`}
              style={{ '--card-color': card.color }}
              onClick={() => openReferenceCard(card.key)}
            >
              <span className={styles.floatIcon}>
                <Image src={card.image} alt="" width={62} height={62} />
              </span>
              <span className={styles.floatText}>
                <strong>{referenceCopy[card.title]}</strong>
                <small>{referenceCopy[card.desc]}</small>
              </span>
            </button>
          ))}
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
