'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CURRICULUM, getFach, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const T = {
  de: { back:'← Körperregionen', search:'Thema suchen…', readNow:'Artikel öffnen', noResult:'Kein Treffer für', themen:'Themen', available:'Verfügbar', read:'Gelesen', all:'Alle', mcq:'MCQ', flash:'Flashcards', fall:'Fallbeispiele', building:'Geplant', emptyAvailable:'In diesem Fachgebiet ist noch kein Thema freigeschaltet.', emptyRead:'Du hast in diesem Fachgebiet noch nichts als gelesen markiert.', emptyAllFach:'Dieses Fachgebiet ist noch im Aufbau – schau bald wieder vorbei.', showAll:'Alle Themen anzeigen', lessonsTitle:'Hauptthemen', lessonsLead:'Thema wählen und Lektionen öffnen', close:'Schließen' },
  en: { back:'← Body regions', search:'Search topic…', readNow:'Open article', noResult:'No results for', themen:'Topics', available:'Available', read:'Read', all:'All', mcq:'MCQ', flash:'Flashcards', fall:'Cases', building:'Planned', emptyAvailable:'No topics are unlocked in this specialty yet.', emptyRead:"You haven't marked anything as read in this specialty yet.", emptyAllFach:'This specialty is still being built – check back soon.', showAll:'Show all topics', lessonsTitle:'Main topics', lessonsLead:'Choose a topic and open its lessons', close:'Close' },
  fa: { back:'ناحیه‌های بدن →', search:'جستجوی موضوع…', readNow:'مطالعه کنید', noResult:'نتیجه‌ای برای', themen:'موضوع', available:'موجود', read:'خوانده‌شده', all:'همه', mcq:'MCQ', flash:'فلش‌کارت', fall:'کیس', building:'برنامه‌ریزی‌شده', emptyAvailable:'هنوز موضوعی در این تخصص فعال نشده.', emptyRead:'هنوز چیزی را در این تخصص خوانده‌شده علامت نزده‌ای.', emptyAllFach:'این تخصص هنوز در حال آماده‌سازی است – بزودی برمی‌گردیم.', showAll:'نمایش همه موضوعات', lessonsTitle:'موضوعات اصلی', lessonsLead:'موضوع را انتخاب کنید و درس‌ها را ببینید', close:'بستن' },
}

// Gruppiert Themen anhand thema.group (Reihenfolge wie in den Daten):
// aufeinanderfolgende Themen mit derselben group-Breadcrumb bilden einen
// Abschnitt mit neutraler Sub-Überschrift; Themen ohne group laufen ohne
// Header in der Original-Reihenfolge.
function groupThemen(themen) {
  const sections = []
  let current = null
  for (const th of themen) {
    const key = th.group ? th.group.join(' / ') : ''
    if (!current || current.key !== key) {
      current = { key, items: [] }
      sections.push(current)
    }
    current.items.push(th)
  }
  return sections
}

function withoutLeadingNumber(title) {
  return title.replace(/^[\d\u06F0-\u06F9\u0660-\u0669]+[.)،.]?\s*/, '')
}

function MskChapterIcon({ id, className }) {
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
    'msk-knie': <><path d="M17 7v12c0 4 3 7 7 7s7-3 7-7V7M18 41V30c0-3 3-5 6-5s6 2 6 5v11"/><path d="M18 22c4-2 8-2 12 0"/><circle cx="24" cy="25" r="3"/></>,
    'msk-fuss': <><path d="M21 7c-1 10-1 17-5 23-2 3-6 5-5 8 1 4 8 3 13 1l13-5c3-1 2-6-2-6h-8c-2-5-1-13 0-20"/><path d="M17 31c4 0 7 2 10 5"/></>,
    'msk-postop': <><path d="M17 8c3-2 6 1 7 4 2-3 5-5 8-2 3 4 0 7-3 9l-9 12c-3 4-8 1-7-3 0-2 2-4 4-6-4-1-5-6-2-9"/><path d="M29 19 38 28M34 24l-10 10"/><circle cx="35" cy="27" r="4"/></>,
  }

  return <svg {...common}>{icons[id] || icons['msk-anatomie']}</svg>
}

function ThoraxChapterIcon({ id, className }) {
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

function AbdomenChapterIcon({ id, className }) {
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
    'abdomen-leber': <><path d="M6 20c1-7 7-12 16-12 11 0 20 6 20 14 0 7-6 11-15 11-6 0-10-1-14-4-4-3-7-5-7-9Z"/><path d="M30 26c3 0 6 2 6 6s-3 5-6 4"/></>,
    'abdomen-gallenwege': <><ellipse cx="18" cy="13" rx="6" ry="8"/><path d="M14 7c-3-2-6-2-8 0M22 7c3-2 6-2 8 0"/><path d="M18 21v6c0 4 3 6 8 6"/><path d="M26 33c3 0 6 2 8 5"/></>,
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

function GehirnChapterIcon({ id, className }) {
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

function MammaChapterIcon({ id, className }) {
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

function PelvisChapterIcon({ id, className }) {
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

function ChapterIcon({ fachId, kapitel, className }) {
  if (fachId === 'msk') return <MskChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'thorax') return <ThoraxChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'abdomen') return <AbdomenChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'gehirn') return <GehirnChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'mamma') return <MammaChapterIcon id={kapitel.id} className={className} />
  if (fachId === 'becken-f' || fachId === 'becken-m') return <PelvisChapterIcon id={kapitel.id} className={className} />
  return <span className={className}>{kapitel.icon}</span>
}

function isAvailable(th) {
  return !!th.link || !!th.sub?.some(s => s.link)
}
function isRead(th, readArticles) {
  if ((readArticles[th.id] || 0) >= 1) return true
  return !!th.sub?.some(s => (readArticles[s.id] || 0) >= 1)
}
function themaMatchesFilter(th, filter, readArticles) {
  if (filter === 'available') return isAvailable(th)
  if (filter === 'read') return isRead(th, readArticles)
  return true
}

// Sub-thema expandable (for Knie etc.)
function SubThemen({ sub, fachColor, lang }) {
  const [open, setOpen] = useState(false)

  const getSubTitle = (item) => getThemaTitle(item, lang)

  const withLang = (href) => {
    if (!href) return null
    return lang === 'de' ? href : `${href}?lang=${lang}`
  }

  const labels = T[lang] || T.de
  const renderActions = (item) => {
    if (!item.mcqLink && !item.flashcardLink && !item.fallStatus) return null
    return (
      <div className={styles.subLearningActions}>
        {item.mcqLink && <Link href={withLang(item.mcqLink)} className={`${styles.subLearningBtn} ${styles.subLearningMcq}`}>{labels.mcq}</Link>}
        {item.fallStatus && <span className={`${styles.subLearningBtn} ${styles.subLearningFall}`} aria-disabled="true">{labels.fall} · {labels.building}</span>}
        {item.flashcardLink && <Link href={withLang(item.flashcardLink)} className={`${styles.subLearningBtn} ${styles.subLearningFlash}`}>{labels.flash}</Link>}
      </div>
    )
  }

  return (
    <div className={styles.subWrap}>
      <button className={styles.subToggle} onClick={() => setOpen(o => !o)}
        style={{ color: fachColor }}>
        {open ? '▼' : '▶'} {sub.length}
      </button>
      {open && (
        <div className={styles.subList}>
          {sub.map(s => {
            const content = (
              <>
                <span className={styles.subDot} style={{ background: fachColor }} />
                <span>{getSubTitle(s)}</span>
              </>
            )
            const href = withLang(s.link)

            return (
              <div key={s.id} className={styles.subItemRow}>
                {href ? (
                  <Link href={href} className={`${styles.subItem} ${styles.subItemLink}`}>
                    {content}
                  </Link>
                ) : (
                  <div className={styles.subItem}>{content}</div>
                )}
                {renderActions(s)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function LernenFachPage() {
  const params = useParams()
  const { lang } = useLanguage()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'
  const fach = getFach(params?.fach)

  const [selectedKapitel, setSelectedKapitel] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('available')
  const [readArticles, setReadArticles] = useState({})

  const visibleKapitel = useMemo(() => {
    if (!fach) return []
    return fach.kapitel
      .map(k => ({ kapitel: k, themen: k.themen.filter(th => themaMatchesFilter(th, filter, readArticles)) }))
      .filter(({ themen }) => filter === 'all' || themen.length > 0)
  }, [fach, filter, readArticles])

  useEffect(() => {
    setMounted(true)
    if (fach) setSelectedKapitel(null)
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
    } catch {}
  }, [fach])

  useEffect(() => { setSearch('') }, [params?.fach])

  useEffect(() => {
    if (!visibleKapitel.some(({ kapitel }) => kapitel.id === selectedKapitel)) setSelectedKapitel(null)
  }, [visibleKapitel, selectedKapitel])

  useEffect(() => {
    if (!selectedKapitel) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedKapitel(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedKapitel])

  if (!fach) return (
    <div className={styles.notFound}>
      <p>Nicht gefunden.</p>
      <Link href="/lernen">← Körperregionen</Link>
    </div>
  )

  const fachName = getFachTitle(fach, lang)
  const fachIcon = fach.icon
  const selectedEntry = visibleKapitel.find(({ kapitel }) => kapitel.id === selectedKapitel)

  const withPageLang = (href) => {
    if (!href || lang === 'de') return href
    return href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`
  }

  const searchResults = search.trim().length > 1
    ? visibleKapitel.flatMap(({ kapitel: k, themen }) =>
        themen.filter(th => getThemaTitle(th, lang).toLowerCase().includes(search.toLowerCase()))
          .map(th => ({ ...th, kapitelTitle: getKapitelTitle(k, lang), kapitel: k }))
      )
    : []
  const searchActive = search.trim().length > 1

  return (
    <div className={styles.page}>

      {/* ── TOPBAR ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/lernen" className={styles.back}>{t.back}</Link>
          <div className={styles.topCenter}>
            <div className={styles.topIcon}>
              <Image src={`/fach/${fach.id}.png`} alt={fachName} width={36} height={36} style={{objectFit:'contain'}}/>
            </div>
            <div className={styles.topHeading}>
              <h1 className={styles.topTitle} style={{ color: fach.color }}>{fachName}</h1>
              <span className={styles.topSubtitle}>{t.lessonsTitle} · {t.lessonsLead}</span>
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.searchBox}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="#94a3b8" strokeWidth="1.4"/>
                <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input className={styles.searchInput} placeholder={t.search}
                value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button className={styles.searchX} onClick={() => setSearch('')}>✕</button>}
            </div>
          </div>
        </div>
        {fach.kapitel.length > 0 && (
          <div className={styles.filterBar}>
            {['all', 'available', 'read'].map(f => (
              <button key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                style={filter === f ? { color: fach.color, borderColor: fach.color, background: fach.color + '12' } : {}}
                onClick={() => setFilter(f)}>
                {f === 'available' ? t.available : f === 'read' ? t.read : t.all}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className={`${styles.content} ${mounted ? styles.contentIn : ''}`}>
        <div className={styles.contentLayout}>
          <main className={styles.chapterContent}>

        {/* SEARCH MODE */}
        {searchActive ? (
          <div className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <p className={styles.noResult}>{t.noResult} „{search}"</p>
            ) : searchResults.map((th, i) => (
              <div key={i} className={styles.searchRow}>
                <span className={styles.searchChapter}>
                  <ChapterIcon fachId={fach.id} kapitel={th.kapitel} className={styles.searchChapterIcon} />
                  {th.kapitelTitle}
                </span>
                <span className={styles.searchTitle}>{getThemaTitle(th, lang)}</span>
              </div>
            ))}
          </div>
        ) : visibleKapitel.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {fach.kapitel.length === 0
                ? t.emptyAllFach
                : filter === 'read' ? t.emptyRead : t.emptyAvailable}
            </p>
            {fach.kapitel.length > 0 && filter !== 'all' && (
              <button className={styles.emptyStateBtn} onClick={() => setFilter('all')}>{t.showAll}</button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.mainTopicGrid}>
              {visibleKapitel.map(({ kapitel: k, themen }) => {
                const active = selectedKapitel === k.id
                const count = themen.reduce((sum, th) => sum + 1 + (th.sub?.length || 0), 0)
                return (
                  <button key={k.id}
                    className={styles.mainTopicCard}
                    style={{ '--topic-color': fach.color }}
                    onClick={() => setSelectedKapitel(k.id)}
                    aria-pressed={active}>
                    <span className={styles.mainTopicIcon}>
                      <ChapterIcon fachId={fach.id} kapitel={k} className={styles.chapterIconSvg} />
                    </span>
                    <span className={styles.mainTopicTitle}>{withoutLeadingNumber(getKapitelTitle(k, lang))}</span>
                    <span className={styles.mainTopicCount}>{count} {t.themen}</span>
                  </button>
                )
              })}
            </div>

          </>
        )}
          </main>
        </div>
      </div>

      {selectedEntry && (
        <div className={styles.topicModalBackdrop} onMouseDown={() => setSelectedKapitel(null)}>
          <section className={styles.topicModal} style={{ '--topic-color': fach.color }}
            role="dialog" aria-modal="true" aria-labelledby="topic-modal-title"
            onMouseDown={event => event.stopPropagation()}>
            <header className={styles.topicListHeader}>
              <span className={styles.topicListIcon}>
                <ChapterIcon fachId={fach.id} kapitel={selectedEntry.kapitel} className={styles.chapterIconSvg} />
              </span>
              <div>
                <h3 id="topic-modal-title">{withoutLeadingNumber(getKapitelTitle(selectedEntry.kapitel, lang))}</h3>
                <p>{selectedEntry.themen.length} {t.themen}</p>
              </div>
              <button className={styles.topicModalClose} onClick={() => setSelectedKapitel(null)}
                aria-label={t.close}>×</button>
            </header>

            <div className={styles.topicModalBody}>
              <div className={styles.topicGroups}>
                {groupThemen(selectedEntry.themen).map((section, groupIndex) => (
                  <div key={groupIndex} className={styles.topicGroup}>
                    {section.key && (
                      <div className={styles.topicGroupHeader}>
                        <h4>{section.key}</h4>
                        <span>{section.items.length}</span>
                      </div>
                    )}
                    <div className={styles.topicList}>
                      {section.items.map(th => {
                        const available = isAvailable(th)
                        const rowContent = (
                          <>
                            <span className={styles.topicRowTitle}>{getThemaTitle(th, lang)}</span>
                            {isRead(th, readArticles) && <span className={styles.readBadge}>✓ {t.read}</span>}
                            <span className={`${styles.topicRowStatus} ${available ? styles.topicRowStatusReady : ''}`}>
                              {available ? t.available : t.building}
                            </span>
                            {th.link && <span className={styles.topicRowArrow}>→</span>}
                          </>
                        )

                        return (
                          <div key={th.id} className={styles.topicListItem}>
                            {th.link ? (
                              <Link href={withPageLang(th.link)} className={styles.topicRow}>{rowContent}</Link>
                            ) : (
                              <div className={styles.topicRow}>{rowContent}</div>
                            )}
                            {th.sub && <SubThemen sub={th.sub} fachColor={fach.color} lang={lang} />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
