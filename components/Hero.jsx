'use client'
import Image from 'next/image'
import Link from 'next/link'
import RadYarIcon from './RadYarIcon'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { REF_COPY } from '@/data/referenzen'
import { captureHomeArrival, HOME_ANATOMY_SRC, HOME_MOTION_DURATION, HOME_MOTION_EASING, takeHomeReturn } from './rechner/homeArrival'

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

// Paths are traced in the illustration's 887 × 1774 source coordinates.
// Limb paths sit behind the more specific torso and pelvic regions.
const ZONES = [
  {
    id: 'Muskuloskelettales',
    d: 'M287 339 C247 345 224 376 222 413 C219 452 228 473 220 503 C215 532 210 575 203 606 C198 631 185 644 176 668 C166 692 162 721 157 751 C149 798 137 849 125 878 C113 890 100 907 91 927 C84 941 77 952 75 961 Q73 968 81 965 C91 961 102 943 109 936 C103 956 97 995 96 1015 Q97 1031 104 1026 C111 1018 112 988 118 975 L118 1032 Q120 1046 127 1039 C133 1034 134 987 137 974 C138 986 136 1022 141 1029 Q147 1034 151 1021 L156 971 C159 982 158 1004 163 1013 Q169 1018 172 1005 L175 936 C176 908 168 899 174 879 C181 852 191 826 203 801 C219 766 237 734 249 700 C261 673 268 647 270 620 C275 581 284 545 293 515 C300 481 300 441 302 405 C304 375 309 357 318 330 Q303 332 287 339 Z',
  },
  {
    id: 'Muskuloskelettales',
    d: 'M568 333 C602 339 628 363 634 402 C642 440 632 470 638 500 C643 533 647 579 656 614 C662 637 674 650 682 671 C693 696 697 727 702 755 C710 808 720 850 733 876 C748 891 764 911 770 933 C778 947 782 958 783 962 Q780 968 772 961 L752 936 C752 946 755 959 757 973 L762 1019 Q761 1034 754 1030 C748 1027 745 993 740 978 L743 1030 Q741 1042 734 1039 C729 1035 724 996 721 980 L721 1030 Q718 1036 712 1030 C708 1024 705 993 702 977 L699 1006 Q696 1017 689 1012 C683 1006 685 983 684 966 L683 927 C680 909 689 893 682 873 C674 847 665 825 652 797 C637 766 621 739 609 702 C597 676 591 650 589 624 C583 586 576 547 566 516 C558 484 559 447 557 410 C556 376 550 352 543 326 Q557 329 568 333 Z',
  },
  {
    id: 'Muskuloskelettales',
    d: 'M246 879 C237 914 243 957 251 992 C259 1032 271 1075 283 1119 C291 1148 295 1182 292 1221 C290 1250 278 1277 275 1305 C272 1337 275 1364 283 1391 C290 1422 296 1450 299 1481 C303 1511 303 1534 299 1557 C298 1575 301 1591 293 1607 C285 1623 271 1636 265 1654 C259 1666 260 1681 267 1686 Q273 1690 279 1688 Q284 1697 292 1694 Q301 1697 307 1692 Q319 1701 326 1694 C334 1688 341 1667 344 1650 C348 1630 357 1611 360 1597 C362 1579 353 1563 354 1547 C349 1508 355 1468 361 1430 C370 1391 381 1356 382 1320 C383 1294 374 1274 375 1251 C378 1224 390 1202 394 1174 C400 1140 398 1100 404 1071 C410 1033 420 1000 422 966 C425 939 416 917 407 897 C376 878 300 867 246 879 Z',
  },
  {
    id: 'Muskuloskelettales',
    d: 'M614 879 C622 916 618 954 610 988 C602 1031 591 1073 579 1110 C571 1145 563 1175 564 1218 C565 1249 576 1275 580 1306 C583 1338 578 1364 572 1391 C563 1426 558 1452 555 1481 C550 1509 550 1533 554 1555 C555 1574 551 1591 561 1608 C572 1624 585 1644 591 1662 C596 1675 590 1686 583 1687 Q578 1693 572 1691 Q564 1700 554 1693 Q549 1697 543 1692 Q535 1699 529 1694 C519 1687 516 1664 511 1648 C505 1629 495 1610 493 1596 C492 1578 501 1563 501 1546 C506 1510 500 1467 495 1432 C487 1391 476 1357 474 1323 C472 1298 479 1274 479 1250 C475 1223 464 1202 462 1172 C457 1141 458 1105 453 1070 C449 1037 440 1003 439 969 C437 942 444 918 454 898 C484 879 562 865 614 879 Z',
  },
  {
    id: 'Thorax',
    d: 'M304 354 C335 343 363 335 391 332 Q430 355 470 332 C495 334 524 344 552 354 C568 402 568 458 563 510 C560 545 552 581 549 601 C516 588 483 585 453 570 Q430 559 408 570 C377 585 346 588 312 601 C308 578 300 545 297 510 C292 455 292 400 304 354 Z',
  },
  {
    id: 'Abdomen',
    d: 'M312 601 C346 588 377 585 408 570 Q430 559 453 570 C483 585 516 588 549 601 C542 636 543 671 551 699 C555 716 562 731 570 748 C539 732 519 740 492 766 C468 790 453 807 430 811 C406 807 392 790 368 766 C342 740 320 732 289 748 C297 731 304 716 309 698 C317 671 318 636 312 601 Z',
  },
  {
    id: 'Becken',
    d: 'M289 748 C320 732 342 740 368 766 C392 790 406 807 430 811 C453 807 468 790 492 766 C519 740 539 732 570 748 C590 785 608 837 613 888 C615 905 607 924 583 934 C550 948 515 945 488 932 C464 920 448 910 430 926 C413 910 397 920 373 932 C344 945 311 948 278 934 C255 924 246 905 248 888 C254 838 269 785 289 748 Z',
  },
  {
    id: 'Neuroradiologie',
    d: 'M430 34 C478 32 510 62 518 109 C522 129 518 145 517 151 C524 157 520 180 512 191 Q507 203 496 206 C485 239 461 262 432 263 C406 262 381 240 370 206 Q358 204 352 191 C344 179 341 158 347 151 C340 121 345 92 358 69 C374 43 402 33 430 34 Z',
  },
  {
    id: 'Brust',
    d: 'M329 456 C349 449 370 460 382 478 C395 499 390 520 376 537 C363 554 339 557 320 545 C302 534 293 514 297 495 C300 478 311 463 329 456 Z',
  },
  {
    id: 'Brust',
    d: 'M531 456 C511 449 490 460 478 478 C465 499 470 520 484 537 C497 554 521 557 540 545 C558 534 567 514 563 495 C560 478 549 463 531 456 Z',
  },
  {
    id: 'Wirbelsaeule',
    d: 'M420 356 Q432 360 444 356 C445 401 446 446 445 488 L445 554 C447 574 448 604 448 627 L417 627 C417 605 419 576 419 554 L420 488 C418 448 419 403 420 356 Z',
  },
  {
    id: 'Hals',
    d: 'M385 232 C398 250 414 262 432 263 C451 262 469 251 479 232 C476 252 474 278 486 291 C498 306 520 318 549 327 C519 342 481 345 466 354 Q430 365 396 354 C372 346 342 342 315 327 C345 318 368 306 379 290 C389 276 389 251 385 232 Z',
  },
]

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
  const stage = useRef(null)
  const bodyWrap = useRef(null)
  const returnArrival = useRef(undefined)

  useLayoutEffect(() => {
    if (returnArrival.current === undefined) returnArrival.current = takeHomeReturn()
    const arrival = returnArrival.current
    const body = bodyWrap.current
    if (!arrival || !body?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // The anatomy has its own return animation. Reveal the stage at its final position.
    stage.current.dataset.returningHome = ''
    const to = body.getBoundingClientRect()
    const from = arrival.bounds
    if (!to.width || !to.height) return
    const restingTransform = getComputedStyle(body).transform
    const base = restingTransform === 'none' ? '' : restingTransform
    const animation = body.animate([
      {
        transform: `${base} translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
        opacity: arrival.opacity,
      },
      { transform: restingTransform, opacity: 1 },
    ], { duration: HOME_MOTION_DURATION, easing: HOME_MOTION_EASING })

    return () => animation.cancel()
  }, [])

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
    if (modal === 'rechner') { router.push(`/rechner?lang=${lang}`); return }
    window.dispatchEvent(new CustomEvent('radyar:open-reference-modal', { detail: { modal } }))
  }

  const referenceCopy = REF_COPY[lang] || REF_COPY.de

  return (
    <section className={styles.hero}>

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

      <div ref={stage} className={`${styles.stage} ${mounted?styles.stageIn:''}`}>
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
          <div ref={bodyWrap} className={styles.bodyWrap}>

            <div className={styles.bodyColorWash}
              style={{background:hovFach
                ?`radial-gradient(ellipse 60% 70% at 50% 38%, ${hovFach.color}1a 0%, transparent 70%)`
                :'none'}}/>

            <svg className={styles.zoneSvg} viewBox="0 0 842 1672" preserveAspectRatio="xMidYMin meet" aria-label={hintLabel}>
              <image data-home-anatomy href={HOME_ANATOMY_SRC} width="842" height="1672" className={styles.bodyImg} pointerEvents="none" />
              <g transform="translate(3 0) scale(0.942503)">
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
          {REFERENCE_CARDS.map((card, index) => {
            const Card = card.key === 'rechner' ? Link : 'button'
            return (
            <Card
              key={card.key}
              type={card.key === 'rechner' ? undefined : 'button'}
              href={card.key === 'rechner' ? `/rechner?lang=${lang}` : undefined}
              className={`${styles.floatCard} ${styles[`floatRight${index}`] || ''}`}
              style={{ '--card-color': card.color }}
              onClick={card.key === 'rechner' ? captureHomeArrival : () => openReferenceCard(card.key)}
            >
              <span className={styles.floatIcon}>
                <Image src={card.image} alt="" width={62} height={62} />
              </span>
              <span className={styles.floatText}>
                <strong>{referenceCopy[card.title]}</strong>
                <small>{referenceCopy[card.desc]}</small>
              </span>
            </Card>
          )})}
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
