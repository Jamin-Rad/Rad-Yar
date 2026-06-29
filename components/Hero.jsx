'use client'
import Image from 'next/image'
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
    d: 'M292 324 C325 315 350 304 374 292 C387 300 402 304 421 304 C440 304 456 300 470 292 C493 305 518 315 550 324 C568 337 577 360 579 390 C581 430 575 474 566 515 C558 553 546 583 528 607 C500 622 465 630 421 630 C377 630 342 622 314 607 C296 583 284 553 276 515 C267 474 261 430 263 390 C265 360 274 337 292 324 Z',
  },
  {
    id: 'Abdomen',
    transform: 'translate(-5 0)',
    // Follow the subcostal margin, draw the flanks inward at the waist and
    // widen the lower abdomen again before it meets the unchanged pelvis.
    d: 'M302 552 C335 564 374 570 421 570 C468 570 507 564 540 552 C545 578 547 603 543 628 C540 652 534 674 531 696 C529 718 533 743 542 774 C511 790 471 799 421 799 C371 799 331 790 300 774 C309 743 313 718 311 696 C308 674 302 652 299 628 C295 603 297 578 302 552 Z',
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
    d: 'M305 430 C324 420 347 421 364 432 C376 441 381 457 380 477 C379 501 370 522 355 533 C339 543 318 542 303 532 C291 522 286 505 287 485 C288 460 294 440 305 430 Z',
  },
  {
    id: 'Brust',
    transform: 'translate(8 0)',
    d: 'M537 430 C518 420 495 421 478 432 C466 441 461 457 462 477 C463 501 472 522 487 533 C503 543 524 542 539 532 C551 522 556 505 555 485 C554 460 548 440 537 430 Z',
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/body-anatomy-clean.png" alt="Anatomy" className={styles.bodyImg} draggable={false}/>

            <div className={styles.bodyColorWash}
              style={{background:hovFach
                ?`radial-gradient(ellipse 60% 70% at 50% 38%, ${hovFach.color}1a 0%, transparent 70%)`
                :'none'}}/>

            <svg className={styles.zoneSvg} viewBox="0 0 842 1672" preserveAspectRatio="none" aria-label={hintLabel}>
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
