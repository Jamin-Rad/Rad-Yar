// Shared chapter icon set used across /lernen/[fach] (Hauptthemen-Übersicht),
// the "Zuletzt hinzugefügt"-Box auf der Startseite und weiteren Stellen,
// an denen ein Kapitel mit seinem Icon dargestellt werden soll.

export function MskChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const icons = {
    'msk-anatomie': <><path d="M17 9c3-3 6 0 7 3 1-3 4-6 7-3s1 7-2 9l-10 12c-3 3-7 1-7-3 0-2 1-3 3-5-3-1-5-5-2-8 1-1 2-2 4-1 0-2-1-3 0-4Z"/><path d="m19 19 10 10"/></>,
    'msk-modalitaeten': <><rect x="9" y="8" width="30" height="27" rx="5"/><circle cx="24" cy="21.5" r="8"/><circle cx="24" cy="21.5" r="3"/><path d="M17 40h14M24 35v5"/></>,
    'msk-knochentumoren': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><circle cx="28" cy="24" r="5"/><path d="M28 21v6M25 24h6"/></>,
    'msk-weichteiltumoren': <><path d="M10 25c0-9 6-15 14-15s14 6 14 15-6 14-14 14-14-5-14-14Z"/><circle cx="20" cy="21" r="3"/><circle cx="29" cy="27" r="4"/><path d="M13 31c5-3 8 2 12 0s6-7 11-4"/></>,
    'msk-knocheninfektionen': <><path d="M17 9c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><circle cx="31" cy="30" r="2"/><path d="m31 25 1-3m3 5 3-1m-4 7 2 3m-8-3-2 3"/></>,
    'msk-metabolisch': <><path d="M18 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="M10 39h28M13 35h22M17 31h14"/></>,
    'msk-arthritiden': <><path d="M12 18h10l4 5 4-5h6M12 30h10l4-5 4 5h6"/><circle cx="26" cy="24" r="6"/><path d="m26 11 1-4m9 8 3-3m-23 3-3-3m23 21 3 3m-23-3-3 3"/></>,
    'msk-knochennekrosen': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="m23 20 7 7m0-7-7 7"/></>,
    'msk-osteochondrosen': <><path d="M15 10h18M13 15h22M17 20h14"/><path d="M19 20v16c0 3 2 5 5 5s5-2 5-5V20"/><path d="M20 29h8"/></>,
    'msk-trauma': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-4 5m-5 5-3 4c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="m24 20-3 5 5 1-3 6"/></>,
    'msk-schulter': <><path d="M10 37c2-14 7-23 16-26 6-2 12 2 12 8 0 7-6 10-12 8-4-1-7 1-8 10"/><circle cx="28" cy="19" r="6"/><path d="M18 22c4 0 6 2 8 5"/></>,
    'msk-ellenbogen': <><path d="M13 8v14c0 4 3 7 7 7h5"/><path d="M35 40V27c0-4-3-7-7-7h-5"/><circle cx="24" cy="25" r="4"/></>,
    'msk-hand': <><path d="M17 40c-3-6-6-11-6-16 0-2 3-3 4-1l2 4V11c0-3 4-3 4 0v12-15c0-3 4-3 4 0v15-13c0-3 4-3 4 0v14-10c0-3 4-3 4 0v13l3-4c2-2 5 0 3 3l-6 12c-1 2-3 3-6 3h-5c-2 0-4 0-5-1Z"/></>,
    'msk-huefte': <><path d="M14 10c-3 8-2 16 4 21l6-5 6 5c6-5 7-13 4-21"/><path d="M18 12c2 5 10 5 12 0M18 31l-3 9m15-9 3 9"/><circle cx="18" cy="30" r="3"/><circle cx="30" cy="30" r="3"/></>,
    'msk-knie': <><path d="M14 5v14c0 6 4 10 10 10h4"/><path d="M28 29h4c6 0 10 4 10 10v4"/><path d="M19 5v13c0 4 2 6 6 6h3"/><path d="M29 34h3c3 0 5 2 5 5v4"/><circle cx="22" cy="29" r="4"/></>,
    'msk-fuss': <><path d="M21 7c-1 10-1 17-5 23-2 3-6 5-5 8 1 4 8 3 13 1l13-5c3-1 2-6-2-6h-8c-2-5-1-13 0-20"/><path d="M17 31c4 0 7 2 10 5"/></>,
    'msk-postop': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="M29 19 38 28M34 24l-10 10"/><circle cx="35" cy="27" r="4"/></>,
  }

  return <svg {...common}>{icons[id] || icons['msk-anatomie']}</svg>
}

export function ThoraxChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const icons = {
    'thorax-anatomie': <><path d="M24 6v10"/><path d="M24 16c-2 2-4 3-4 3M24 16c2 2 4 3 4 3"/><path d="M20 18c-6 1-9 7-9 14 0 6 3 10 7 10 3 0 4-3 4-7V18Z"/><path d="M28 18c6 1 9 7 9 14 0 6-3 10-7 10-3 0-4-3-4-7V18Z"/></>,
    'thorax-grundlagen': <><rect x="9" y="6" width="30" height="36" rx="2"/><path d="M24 12v5"/><path d="M19 17c-4 1-6 6-6 11 0 4 2 8 5 8"/><path d="M29 17c4 1 6 6 6 11 0 4-2 8-5 8"/><path d="M14 26h6M28 26h6"/></>,
    'thorax-lunge': <><path d="M24 8c-2 3-9 5-11 12-2 8 0 20 7 20 4 0 5-4 5-9V8Z"/><path d="M24 8c2 3 9 5 11 12 2 8 0 20-7 20-4 0-5-4-5-9V8Z"/><circle cx="18" cy="24" r="1.4" fill="currentColor" stroke="none"/><circle cx="29" cy="20" r="1.4" fill="currentColor" stroke="none"/><circle cx="30" cy="30" r="1.4" fill="currentColor" stroke="none"/><circle cx="17" cy="33" r="1.4" fill="currentColor" stroke="none"/></>,
    'thorax-atemwege': <><path d="M24 6v8"/><path d="M24 14 18 20M24 14l6 6"/><path d="M18 20 14 26M18 20l3 6"/><path d="M30 20 34 26M30 20l-3 6"/><path d="M14 26 11 31M14 26l3 5"/><path d="M21 26 19 32M21 26l3 5"/><path d="M27 26 25 32M27 26l3 5"/><path d="M34 26 32 31M34 26l3 5"/></>,
    'thorax-infektionen': <><path d="M22 8c-7 1-13 8-13 18 0 8 4 14 10 14 5 0 6-5 6-11V8Z"/><circle cx="30" cy="20" r="3"/><path d="M30 14v2m0 8v2m-5-7-1.4-1.4m11.8 11.8-1.4-1.4m0-9.4 1.4-1.4m-11.8 11.8 1.4-1.4"/><circle cx="27" cy="32" r="1.6" fill="currentColor" stroke="none"/></>,
    'thorax-pleura': <><path d="M24 7c-8 1-13 8-13 17 0 9 5 16 13 16s13-7 13-16c0-9-5-16-13-17Z"/><path d="M24 11c-6 1-10 6-10 13 0 7 4 12 10 12s10-5 10-12c0-7-4-12-10-13Z"/><path d="M14 30h20"/></>,
    'thorax-mediastinum': <><path d="M10 12c-3 4-4 10-4 14 0 8 3 14 8 14"/><path d="M38 12c3 4 4 10 4 14 0 8-3 14-8 14"/><rect x="18" y="8" width="12" height="32" rx="3"/><ellipse cx="24" cy="22" rx="3.5" ry="5"/></>,
    'thorax-tumoren': <><path d="M21 8c-7 1-13 8-13 18 0 8 4 14 10 14 4 0 6-3 6-8V8Z"/><circle cx="17" cy="22" r="2.5" fill="currentColor" stroke="none"/><circle cx="30" cy="31" r="6"/><path d="m34.5 35.5 4.5 4.5"/></>,
    'thorax-gefaesse-pulmonal': <><path d="M24 6v12"/><path d="M24 18 14 38"/><path d="M24 18 34 38"/><ellipse cx="29" cy="29" rx="3" ry="5" transform="rotate(35 29 29)" fill="currentColor" stroke="none"/></>,
    'thorax-aorta': <><path d="M12 40V24c0-9 5-16 12-16s12 7 12 16v16"/><path d="M19 8 17 4M24 7V3M29 8l2-4"/></>,
    'thorax-kardio': <><path d="M24 40C10 30 6 20 12 14c4-4 10-3 12 3 2-6 8-7 12-3 6 6 2 16-12 26Z"/><path d="M9 25h6l2-6 4 11 3-8 2 3h7"/></>,
    'thorax-thoraxwand': <><path d="M10 14c6-2 22-2 28 0M10 20c6-2 22-2 28 0M10 26c6-2 22-2 28 0"/><path d="M9 30c5 7 11 10 15 10s10-3 15-10"/></>,
    'thorax-trauma': <><path d="M9 16c6-2 22-2 28 0M9 22c6-2 22-2 28 0M9 28c6-2 22-2 28 0"/><path d="M21 11 18 18l5 2-4 9"/><path d="m32 9 2-3m1 5 4-1m-3 4 3 3"/></>,
  }

  return <svg {...common}>{icons[id] || icons['thorax-anatomie']}</svg>
}

export function AbdomenChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const icons = {
    'abdomen-anatomie': <><path d="M24 5c-11 0-16 8-16 18 0 13 7 21 16 21s16-8 16-21c0-10-5-18-16-18Z"/><path d="M11 18c4-3 9-2 11 2"/><path d="M26 18c3-4 8-5 11-1"/><path d="M14 28c2 3 5 4 7 2 2-2 5-1 7 1 2-2 5-3 7-1"/></>,
    'abdomen-grundlagen': <><path d="M18 6h12v9c0 3-2 5-6 5s-6-2-6-5V6Z"/><path d="M24 20v6"/><path d="M16 30c2-2 5-3 8-3s6 1 8 3"/><path d="M12 35c4-4 9-6 12-6s8 2 12 6"/></>,
    'abdomen-leber': <><path d="M6 20c2-7 8-12 17-13 9-1 16 2 20 8 2 3 1 7-2 9-5 4-12 7-21 8-6 1-11-1-14-5-1-2-1-5 0-7Z"/><path d="M23 8c1 6 1 14-3 24M21 21c5-1 10 0 15 4M21 25c-4-2-8-3-13-2"/></>,
    'abdomen-gallenwege': <><path d="M18 8c-1 7-6 11-6 19 0 7 4 12 9 12 6 0 9-5 9-11 0-7-5-12-6-20Z"/><path d="M24 8c1-2 3-3 5-3M29 5v13c0 3 2 5 5 5h6M29 14h-6M34 23v17"/><path d="M21 18c4 1 6 4 6 8"/></>,
    'abdomen-pankreas': <><path d="M6 26c2-6 10-10 20-9s18 5 21 1c1 4-3 9-12 10-10 1-22 0-29-2Z"/><path d="M12 23c8 2 18 2 26-1"/></>,
    'abdomen-milz': <><path d="M31 8c-10 2-19 10-19 20 0 8 6 12 13 10 8-2 12-10 12-20 0-6-2-9-6-10Z"/><path d="M9 16c4-2 8-2 12 0M9 22c4-2 8-2 12 0"/></>,
    'abdomen-gi-trakt': <><path d="M17 6c-5 2-7 7-6 11 1 5 6 8 11 6 5-2 8-6 7-10-1-3-4-6-7-7"/><path d="M22 23c-6 1-11 5-11 11 0 6 5 10 12 10 5 0 10-3 10-8 0-3-2-6-6-6-4 0-7 2-7 6"/></>,
    'abdomen-niere': <><path d="M28 6c-9 0-15 7-15 17 0 11 6 19 15 19 7 0 11-5 11-12 0-5-3-7-6-9-1-1-1-3 0-5 2-4 1-10-5-10Z"/><path d="M30 42v3c0 2 2 3 4 3"/></>,
    'abdomen-nebenniere': <><path d="M27 15c-7 0-12 6-12 14 0 9 5 15 12 15 6 0 9-4 9-10 0-4-2-6-5-7-1-1-1-2 0-4 1-3 1-8-4-8Z"/><path d="M20 9c2-3 6-4 9-2 2 1 3 4 1 6-3-1-7-1-10-1Z"/></>,
    'abdomen-retroperitoneum': <><circle cx="24" cy="25" r="18"/><rect x="21" y="8" width="6" height="9" rx="2"/><circle cx="20" cy="27" r="3"/><circle cx="29" cy="27" r="3"/><circle cx="15" cy="35" r="1.6" fill="currentColor" stroke="none"/><circle cx="33" cy="36" r="1.6" fill="currentColor" stroke="none"/></>,
    'abdomen-gefaesse': <><path d="M19 4v28M19 32 11 44M19 32l8 12"/><path d="M29 4v28M29 32l8 12"/><path d="M19 14h-6M19 23h6"/></>,
    'abdomen-peritoneum': <><path d="M24 6c-10 1-16 9-16 18 0 10 7 18 16 18s16-8 16-18c0-9-6-17-16-18Z"/><path d="M24 11c-7 1-12 7-12 13 0 7 5 13 12 13s12-6 12-13c0-6-5-12-12-13Z"/><path d="M14 31c4 2 16 2 20 0"/></>,
    'abdomen-hernien': <><path d="M6 14h14M28 14h14"/><path d="M18 14c0 4 2 6 6 6s6-2 6-6"/><path d="M19 20c-4 2-6 6-4 10 2 3 6 4 9 2 3-2 4-6 2-9"/></>,
    'abdomen-trauma': <><path d="M24 6c-9 0-15 6-15 16 0 12 6 20 15 20s15-8 15-20c0-10-6-16-15-16Z"/><path d="m18 16 4 8-3 2 5 8"/><path d="m32 10 2-3m1 5 4-1m-3 4 3 3"/></>,
  }

  return <svg {...common}>{icons[id] || icons['abdomen-anatomie']}</svg>
}

export function GehirnChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const brainOutline = <path d="M24 6C13 6 6 13 6 23c0 11 8 19 18 19s18-8 18-19C42 13 35 6 24 6Z"/>

  const icons = {
    'kopf-anatomie': <>{brainOutline}<path d="M24 6v36"/><path d="M10 16c4 1 7 4 7 8M9 27c4 0 7 3 8 7"/><path d="M38 16c-4 1-7 4-7 8M39 27c-4 0-7 3-8 7"/></>,
    'kopf-vaskulaer': <>{brainOutline}<path d="M24 42V28c-4-4-8-6-8-12M24 28c4-4 8-6 8-12M16 16c-3 2-4 5-3 8M32 16c3 2 4 5 3 8"/><circle cx="32" cy="16" r="2.5"/></>,
    'kopf-tumoren': <>{brainOutline}<circle cx="28" cy="20" r="10" strokeDasharray="2 3"/><circle cx="28" cy="20" r="6"/><circle cx="28" cy="20" r="2" fill="currentColor" stroke="none"/></>,
    'kopf-infektion': <>{brainOutline}<circle cx="25" cy="24" r="4"/><path d="M25 16v4m0 8v4m-8-8h4m8 0h4m-9.5-5.5 2.8 2.8m6.4 6.4 2.8 2.8m0-12-2.8 2.8m-6.4 6.4-2.8 2.8"/></>,
    'kopf-fehlbildungen': <><path d="M22 6C12 7 6 14 7 23c1 10 9 18 19 18 6 0 11-3 14-7"/><path d="M34 8c-4 3-4 6 0 9s4 6 0 9-4 6 0 9"/><path d="M41 8c4 3 4 6 0 9s-4 6 0 9 4 6 0 9"/><path d="M34 12h7M34 21h7M34 30h7"/></>,
    'kopf-degenerativ': <><path d="M24 5C12 5 5 13 5 24s7 19 19 19 19-8 19-19S36 5 24 5Z" strokeDasharray="3 3"/><path d="M24 11c-8 0-13 6-13 13s5 13 13 13 13-6 13-13-5-13-13-13Z"/><path d="M19 18c2 3 2 9 0 12M29 18c-2 3-2 9 0 12"/></>,
    'kopf-liquor': <>{brainOutline}<path d="M18 14c3 4 3 14 0 18M30 14c-3 4-3 14 0 18M18 23h12"/><path d="M38 6c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8Z"/></>,
    'kopf-trauma': <>{brainOutline}<path d="M16 6 22 20l-6 4 8 18"/><path d="m35 4 3-3m1 6 4-1m-3 5 3 3"/></>,
  }

  return <svg {...common}>{icons[id] || icons['kopf-anatomie']}</svg>
}

export function MammaChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const breastOutline = <path d="M10 37c2-14 8-24 18-28 7-3 13 2 13 9 0 8-6 13-14 12-6-1-10 2-12 7"/>
  const icons = {
    'mamma-anatomie': <>{breastOutline}<path d="M18 31c3-8 8-14 15-17"/><circle cx="35" cy="13" r="2"/><path d="M14 37h28"/></>,
    'mamma-bildgebung': <><rect x="8" y="7" width="32" height="34" rx="3"/>{breastOutline}<circle cx="30" cy="20" r="3"/></>,
    'mamma-benigne': <>{breastOutline}<circle cx="28" cy="21" r="5"/><path d="M25 21h6"/></>,
    'mamma-maligne': <>{breastOutline}<circle cx="29" cy="20" r="6" strokeDasharray="2 2"/><path d="m25 16 8 8m0-8-8 8"/></>,
    'mamma-interventionen': <>{breastOutline}<path d="m8 10 18 18"/><path d="m6 8 4 4m13 13 4 4"/><path d="m29 18 8-8"/></>,
    'mamma-spezielle-situationen': <>{breastOutline}<path d="M31 8v8M27 12h8"/><path d="M37 29v8m-4-4h8"/></>,
  }

  return <svg {...common}>{icons[id] || icons['mamma-anatomie']}</svg>
}

export function PelvisChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const pelvis = <><path d="M12 8c-3 9-3 18 3 25l9 9 9-9c6-7 6-16 3-25"/><path d="M15 12c2 7 5 10 9 10s7-3 9-10M17 33l7-6 7 6"/></>
  const icons = {
    'becken-f-anatomie': pelvis,
    'becken-f-grundlagen': <>{pelvis}<rect x="18" y="12" width="12" height="10" rx="2"/></>,
    'becken-f-uterus': <><path d="M24 38V23"/><path d="M24 23c-5 0-9-4-9-9 4 0 7 1 9 4 2-3 5-4 9-4 0 5-4 9-9 9Z"/><path d="M15 14 9 9m24 5 6-5"/></>,
    'becken-f-zervix': <><path d="M17 9c0 9 2 15 7 18 5-3 7-9 7-18"/><path d="M21 27v12h6V27"/></>,
    'becken-f-ovarien': <><circle cx="12" cy="18" r="6"/><circle cx="36" cy="18" r="6"/><path d="M18 18c3 0 5 2 6 5 1-3 3-5 6-5M24 23v17"/></>,
    'becken-f-endometriose': <>{pelvis}<circle cx="18" cy="24" r="2" fill="currentColor" stroke="none"/><circle cx="30" cy="27" r="2" fill="currentColor" stroke="none"/></>,
    'becken-f-blase': <><path d="M15 16c0 13 2 23 9 23s9-10 9-23c-4 3-14 3-18 0Z"/><path d="M24 39v5"/></>,
    'becken-f-beckenboden': <>{pelvis}<path d="M13 35c7-4 15-4 22 0"/></>,
    'becken-f-spezielle-situationen': <>{pelvis}<path d="M37 27v10m-5-5h10"/></>,
    'becken-m-anatomie': pelvis,
    'becken-m-grundlagen': <>{pelvis}<rect x="18" y="12" width="12" height="10" rx="2"/></>,
    'becken-m-prostata': <><path d="M16 17c0 8 3 14 8 14s8-6 8-14c-4 2-12 2-16 0Z"/><path d="M24 31v10"/><circle cx="24" cy="14" r="5"/></>,
    'becken-m-blase': <><path d="M15 16c0 13 2 23 9 23s9-10 9-23c-4 3-14 3-18 0Z"/><path d="M24 39v5"/></>,
    'becken-m-skrotum': <><path d="M24 7v13"/><path d="M24 20c-8 0-13 5-13 12s5 11 13 11 13-4 13-11-5-12-13-12Z"/><path d="M24 20v23"/><circle cx="18" cy="31" r="4"/><circle cx="30" cy="31" r="4"/></>,
  }

  return <svg {...common}>{icons[id] || pelvis}</svg>
}

export function NeckChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const neck = <><path d="M18 5v8c0 4-5 7-5 15 0 9 5 15 11 15s11-6 11-15c0-8-5-11-5-15V5"/><path d="M18 13h12"/></>
  const icons = {
    'hals-anatomie': <>{neck}<path d="M17 22h14M17 29h14"/><path d="M24 13v25"/></>,
    'hals-orbita': <><path d="M5 24c5-8 11-12 19-12s14 4 19 12c-5 8-11 12-19 12S10 32 5 24Z"/><circle cx="24" cy="24" r="7"/><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"/></>,
    'hals-nnh': <><path d="M14 7h20l5 12-5 22H14L9 19 14 7Z"/><path d="M17 16c3-3 5-3 7 0 2-3 4-3 7 0"/><path d="M16 27h16M19 34h10"/></>,
    'hals-ohr': <><path d="M30 35c-2 5-9 6-12 1-2-3 0-6 3-8 4-3 7-5 7-10 0-4-3-7-7-7-5 0-8 4-8 9"/><path d="M18 21c0-3 2-5 5-5 2 0 4 2 4 4 0 4-5 5-5 9"/><path d="M34 10v13m0 0 5-5m-5 5-5-5"/></>,
    'hals-schilddruese': <><path d="M24 12v25"/><path d="M22 24c-4-9-13-8-13-1 0 6 5 11 11 10 2 0 3-2 4-4"/><path d="M26 24c4-9 13-8 13-1 0 6-5 11-11 10-2 0-3-2-4-4"/></>,
    'hals-speicheldruesen': <><path d="M12 10c8-5 20-4 24 4 4 9-3 19-14 19-8 0-13-5-13-11 0-5 3-9 8-11"/><path d="M25 33v8M25 37h10"/><path d="M37 9c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z"/></>,
    'hals-lymphknoten': <><circle cx="16" cy="14" r="5"/><circle cx="30" cy="12" r="4"/><circle cx="24" cy="26" r="6"/><circle cx="35" cy="33" r="5"/><circle cx="12" cy="35" r="4"/><path d="m19 17 2 4m7-5-2 5m3 9 2 1m-13 0-3 2"/></>,
    'hals-tumoren': <>{neck}<circle cx="29" cy="24" r="8" strokeDasharray="2 3"/><circle cx="29" cy="24" r="3"/><path d="M35 30l6 6"/></>,
    'hals-infektionen': <>{neck}<circle cx="25" cy="25" r="4"/><path d="M25 16v4m0 10v4m-9-9h4m10 0h4m-15-6 3 3m6 6 3 3m0-12-3 3m-6 6-3 3"/></>,
    'hals-kongenital': <><path d="M24 5c-9 0-15 7-15 16 0 11 7 20 15 22 8-2 15-11 15-22 0-9-6-16-15-16Z"/><path d="M24 5v38"/><path d="M16 20c3-2 5-1 8 2 3-3 5-4 8-2"/></>,
    'hals-gefaesse': <><path d="M20 5v38M28 5v38"/><path d="M20 15 10 8m10 19-9 7m17-19 10-7m-10 19 9 7"/><circle cx="28" cy="27" r="3"/></>,
  }

  return <svg {...common}>{icons[id] || icons['hals-anatomie']}</svg>
}

export function SpineChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }

  const spine = <><path d="M25 5c-4 5 3 7-1 12s3 7-1 12 3 7-1 14"/><path d="M18 8h12M17 16h13M17 25h12M16 34h13M16 42h12"/></>
  const icons = {
    'ws-anatomie': <>{spine}<path d="M33 8v34"/></>,
    'ws-modalitaeten': <><rect x="7" y="6" width="34" height="36" rx="4"/>{spine}</>,
    'ws-degenerativ': <>{spine}<path d="M17 24h12" strokeWidth="5"/><path d="m34 19 6 6-6 6"/></>,
    'ws-entzuendlich': <>{spine}<circle cx="34" cy="25" r="5"/><path d="M34 16v4m0 10v4m-9-9h4m10 0h4"/></>,
    'ws-tumoren': <>{spine}<circle cx="34" cy="22" r="8" strokeDasharray="2 3"/><circle cx="34" cy="22" r="3" fill="currentColor" stroke="none"/></>,
    'ws-trauma': <><path d="M25 5c-4 5 3 7-1 12"/><path d="M22 19 28 25l-7 5 5 13"/><path d="M18 8h12M17 16h13M17 32h12M16 42h12"/><path d="m35 8 3-3m1 7 4-1m-4 5 3 3"/></>,
    'ws-vaskulaer': <>{spine}<path d="M35 6v34M35 14l7-5m-7 13 7 5m-7 6-6 6"/><circle cx="35" cy="22" r="2.5" fill="currentColor" stroke="none"/></>,
    'ws-fehlbildungen': <><path d="M22 5c-5 5 4 8-1 13s5 8 0 13 4 7-1 12"/><path d="M14 8h13M14 17h15M13 27h13M12 37h15"/><path d="M34 8c-4 4-4 7 0 10s4 7 0 10-4 7 0 10M41 8c4 4 4 7 0 10s-4 7 0 10 4 7 0 10"/></>,
    'ws-metabolisch': <>{spine}<path d="M8 42h33M11 37h27M14 32h21"/><circle cx="36" cy="12" r="4"/></>,
    'ws-postoperativ': <>{spine}<path d="M32 12h10M37 7v10"/><path d="M31 29 40 38M36 34l-8 8"/><circle cx="38" cy="36" r="4"/></>,
    'ws-zysten-liquor': <>{spine}<path d="M36 7c3 5 6 8 6 13a6 6 0 0 1-12 0c0-5 3-8 6-13Z"/><circle cx="35" cy="35" r="5"/></>,
  }

  return <svg {...common}>{icons[id] || icons['ws-anatomie']}</svg>
}

export function TechnikChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
  const icons = {
    'technik-strahlenbiologie': <><circle cx="24" cy="24" r="5"/><path d="M24 19c-7-12-16-8-15 0 1 5 7 7 10 7M29 24c14 0 15 10 8 14-5 3-10-2-12-7M22 29c-7 12 1 18 8 13 4-3 2-10-1-13"/><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"/></>,
    'technik-strahlenschutz': <><path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6Z"/><path d="M24 14v18M16 23h16"/></>,
    'technik-roentgen': <><path d="M8 9h14l5 8-5 8H8V9Z"/><path d="M27 17h13M31 12l9 5-9 5"/><rect x="9" y="31" width="30" height="10" rx="2"/></>,
    'technik-ct': <><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="10"/><rect x="19" y="20" width="17" height="8" rx="4"/><path d="M7 24h7M34 24h7"/></>,
    'technik-mrt': <><path d="M10 39V15c0-6 4-10 9-10s9 4 9 10v14c0 4 2 7 6 7s6-3 6-7V9"/><path d="M16 39V17c0-3 1-5 3-5s3 2 3 5v13"/><path d="M34 9h10"/></>,
    'technik-sonographie': <><path d="M9 15c6-7 14-9 21-4l-7 13c-4-2-8-1-11 2L9 15Z"/><path d="M23 24c5 2 9 7 11 14M27 21c7 3 12 9 14 17"/><circle cx="14" cy="35" r="5"/></>,
    'technik-fluoroskopie': <><rect x="7" y="7" width="27" height="23" rx="3"/><circle cx="20.5" cy="18.5" r="7"/><path d="M34 18h7v23H17v-6M12 41h10"/></>,
    'technik-nuklearmedizin': <><ellipse cx="24" cy="24" rx="18" ry="7"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></>,
    'technik-kontrastmittel': <><path d="m29 6 8 8-20 20-8 2 2-8L29 6Z"/><path d="m25 10 8 8M13 27l8 8"/><path d="M31 30c4 5 7 8 7 12a6 6 0 0 1-12 0c0-4 2-7 5-12Z"/></>,
  }
  return <svg {...common}>{icons[id] || icons['technik-strahlenbiologie']}</svg>
}

export function VascularChapterIcon({ id, className }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
  const icons = {
    'gefaesse-grundlagen': <><path d="M24 5v38M24 14 13 8M24 20l12-8M24 27 11 7M24 34l-10 7"/><circle cx="24" cy="20" r="4"/></>,
    'gefaesse-arteriell': <><path d="M24 43V7M24 17 12 10M24 24l13-9M24 31l11 8"/><path d="M18 5h12M9 8l6 5M39 12l-5 6"/><circle cx="24" cy="25" r="3" fill="currentColor" stroke="none"/></>,
    'gefaesse-venoes': <><path d="M24 5v38M12 8l12 10M37 11 24 24M12 36l12-7M36 40 24 32"/><path d="m20 13 4 5-6-1M29 18l-5 6 1-7M18 33l6-4-2 7"/></>,
    'ir-grundlagen': <><path d="M8 39 30 17M27 10l11 11M30 7l11 11"/><path d="m8 39 9-2-7-7-2 9Z"/><path d="M32 25c5 4 7 9 7 16"/></>,
    'ir-vaskulaer': <><path d="M7 24h34M13 15v18M35 15v18"/><rect x="17" y="19" width="14" height="10" rx="2"/><path d="m20 19 3 10 3-10 3 10"/></>,
    'ir-nicht-vaskulaer': <><circle cx="24" cy="24" r="15"/><circle cx="24" cy="24" r="8"/><circle cx="24" cy="24" r="2" fill="currentColor" stroke="none"/><path d="M42 6 29 19M35 6h7v7"/></>,
  }
  return <svg {...common}>{icons[id] || icons['gefaesse-grundlagen']}</svg>
}

// Liefert das passende Kapitel-Icon (SVG) für ein Fachgebiet + Kapitel,
// analog zur "Hauptthemen"-Übersicht in /lernen/[fach]. Fällt auf das
// Emoji-Icon aus den Curriculum-Daten zurück, falls kein Fachgebiet
// mit eigenem Icon-Set hinterlegt ist.
export function ChapterIcon({ fachId, kapitel, className }) {
  if (!kapitel) return null
  if (fachId === 'msk') return <MskChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'thorax') return <ThoraxChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'abdomen') return <AbdomenChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'gehirn') return <GehirnChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'mamma') return <MammaChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'becken-f' || fachId === 'becken-m') return <PelvisChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'hals') return <NeckChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'wirbelsaeule') return <SpineChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'technik') return <TechnikChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'gefaesse-ir' || fachId === 'interventionelle-radiologie') return <VascularChapterIcon id={kapitel.id} className={className} />
  return <span className={className}>{kapitel.icon}</span>
}
