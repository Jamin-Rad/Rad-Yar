'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'

const styles = new Proxy({}, {
  get: (_target, prop) => String(prop),
})

const MENISKUS_STYLES = `.page {
  min-height: 100vh;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  padding-top: 64px;
  background:
    radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 32rem),
    linear-gradient(180deg, #f7f8fc 0%, #eef2f7 100%);
  color: #172033;
  font-family: var(--font-manrope, system-ui, sans-serif);
}

.header {
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 28px 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7b8799;
  font-size: 13px;
  margin-bottom: 18px;
}

.breadLink {
  color: #f97316;
  text-decoration: none;
  font-weight: 700;
}

.breadLink:hover { color: #ea580c; }

.heroGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}

.heroText,
.heroStats,
.mcqStrip,
.sidebar,
.section,
.card,
.cardAccent,
.cardDanger,
.figure,
.protocolCard,
.criteriaCard,
.bulletCard {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(208, 216, 230, 0.9);
  box-shadow: 0 18px 45px rgba(23, 32, 51, 0.07);
  backdrop-filter: blur(14px);
}

.heroText {
  position: relative;
  overflow: hidden;
  border-radius: 34px;
  padding: 38px;
  background:
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.18), transparent 18rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.96) 54%, rgba(255, 247, 237, 0.92) 100%);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(13, 27, 42, 0.12);
}

.heroText::before {
  content: '';
  position: absolute;
  inset: 18px 18px auto auto;
  width: 96px;
  height: 96px;
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(13, 27, 42, 0.08));
  transform: rotate(12deg);
}

.heroText::after {
  content: '';
  position: absolute;
  left: 34px;
  right: 34px;
  bottom: 0;
  height: 5px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(90deg, #f97316, #fb923c, #0d1b2a);
}

[dir='rtl'] .heroText::after {
  background: linear-gradient(90deg, #0d1b2a, #fb923c, #f97316);
}

.heroText > * {
  position: relative;
  z-index: 1;
}

.sourceBadge {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #0d1b2a;
  color: #fff;
  box-shadow: 0 10px 24px rgba(13, 27, 42, 0.16);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.heroText h1 {
  margin: 0;
  font-family: var(--font-fraunces, Georgia, serif);
  font-size: clamp(46px, 6vw, 82px);
  font-weight: 950;
  line-height: 0.92;
  letter-spacing: -0.055em;
  color: #0d1b2a;
  text-shadow: 0 12px 28px rgba(13, 27, 42, 0.08);
}

.heroText p {
  margin: 18px 0 24px;
  max-width: 720px;
  color: #425066;
  font-size: 18px;
  line-height: 1.7;
}

.mcqButton {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  border-radius: 999px;
  background: #0d1b2a;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(13, 27, 42, 0.18);
}

.mcqButton:hover { transform: translateY(-1px); }

.heroStats {
  border-radius: 28px;
  padding: 18px;
  display: grid;
  gap: 12px;
}

.heroStatCard {
  border-radius: 20px;
  padding: 18px;
  background: linear-gradient(135deg, #0d1b2a 0%, #172a46 100%);
  color: #fff;
}

.heroStatCard:nth-child(2) {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.heroStatCard:nth-child(3) {
  background: linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%);
  color: #0d1b2a;
  border: 1px solid #e3e8f0;
}

.heroStatCard strong {
  display: block;
  font-size: 34px;
  line-height: 1;
  margin-bottom: 7px;
}

.heroStatCard span {
  display: block;
  font-weight: 800;
  font-size: 14px;
}

.heroStatCard small {
  display: block;
  margin-top: 5px;
  color: currentColor;
  opacity: 0.72;
  font-size: 12px;
  line-height: 1.45;
}

.mcqStrip {
  margin-top: 18px;
  border-radius: 22px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: #172033;
  border-color: rgba(249, 115, 22, 0.28);
}

.mcqStrip strong,
.mcqStrip span { display: block; }
.mcqStrip strong { font-size: 15px; color: #0d1b2a; margin-bottom: 3px; }
.mcqStrip span { color: #6b778a; font-size: 13px; }
.mcqStrip em { font-style: normal; color: #f97316; font-weight: 900; white-space: nowrap; }

.layout {
  max-width: 1240px;
  margin: 0 auto;
  padding: 22px 28px 70px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
  direction: ltr;
}

[dir='rtl'] .layout {
  grid-template-columns: minmax(0, 1fr) 260px;
}

.sidebar {
  position: sticky;
  top: 88px;
  border-radius: 24px;
  padding: 16px;
  order: 0;
}

[dir='rtl'] .sidebar {
  order: 2;
  direction: rtl;
}

[dir='rtl'] .main {
  direction: rtl;
}

.sideTitle {
  padding: 7px 8px 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid #edf1f7;
  color: #96a0b1;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.sideNav {
  display: grid;
  gap: 7px;
}

.sideItem {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  border-radius: 16px;
  padding: 12px;
  background: transparent;
  color: #536174;
  cursor: pointer;
  text-align: start;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  transition: 0.18s ease;
}

.sideItem:hover {
  background: #f3f6fb;
  color: #0d1b2a;
}

.sideItemActive {
  background: rgba(249, 115, 22, 0.12) !important;
  color: #c2410c !important;
}

.sideIcon {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  border-radius: 10px;
  background: #f3f6fb;
}

.sideItemActive .sideIcon {
  background: #fff;
}

.main {
  display: grid;
  gap: 24px;
  min-width: 0;
}

.section {
  border-radius: 28px;
  padding: 28px;
  scroll-margin-top: 92px;
}

.sectionHead {
  margin-bottom: 22px;
}

.eyebrow {
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #0d1b2a;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 12px;
}

.sectionHead h2 {
  margin: 0;
  color: #0d1b2a;
  font-family: var(--font-fraunces, Georgia, serif);
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.sectionHead p {
  margin: 12px 0 0;
  color: #536174;
  font-size: 16px;
  line-height: 1.8;
}

.bulletCard {
  border-radius: 22px;
  padding: 12px;
  display: grid;
  gap: 10px;
  box-shadow: none;
  background: #fbfcff;
}

.bulletItem {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 10px;
  align-items: start;
  padding: 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #edf1f7;
}

.bulletItem span {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: inline-grid;
  place-items: center;
  background: rgba(249, 115, 22, 0.12);
  color: #f97316;
  font-weight: 900;
}

.bulletItem p {
  margin: 0;
  color: #425066;
  line-height: 1.65;
}

.splitGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.9fr);
  gap: 18px;
  align-items: stretch;
  margin: 18px 0;
}

.card,
.cardAccent,
.cardDanger {
  border-radius: 22px;
  padding: 20px;
  box-shadow: none;
}

.card h3,
.cardAccent h3,
.cardDanger h3,
.protocolCard h3,
.criteriaCard h3 {
  margin: 0 0 10px;
  color: #0d1b2a;
  font-size: 17px;
}

.card p,
.cardAccent p,
.cardDanger p,
.protocolCard p,
.criteriaCard p {
  margin: 0;
  color: #536174;
  line-height: 1.7;
}

.cardAccent {
  background: #fff8f1;
  border-color: #fed7aa;
}

.normalCard {
  border-radius: 22px;
  padding: 20px;
  background: linear-gradient(180deg, #ffffff, #f7f8fc);
  border: 1px solid #e3e8f0;
  box-shadow: none;
}

.normalCard h3 {
  margin: 0 0 10px;
  color: #0d1b2a;
  font-size: 17px;
}

.normalCard p {
  margin: 0;
  color: #536174;
  line-height: 1.7;
}

.plainList {
  display: grid;
  gap: 12px;
}

.plainList p {
  margin: 0;
}

.plainList strong {
  display: block;
  margin-bottom: 4px;
  color: #0d1b2a;
}

.gradingFigure {
  margin: 18px 0;
}

.gradingFigure .figure img {
  max-height: 560px;
}

.caseLabelRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

[dir='rtl'] .caseLabelRow {
  justify-content: flex-start;
}

.cardDanger {
  background: #fff1f2;
  border-color: #fecdd3;
}

.cardDanger ul {
  margin: 0;
  padding-inline-start: 20px;
  color: #7f1d1d;
  line-height: 1.8;
}

.figure {
  border-radius: 22px;
  padding: 14px;
  margin: 0;
  display: grid;
  place-items: center;
  box-shadow: none;
  overflow: hidden;
}

.figure img {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
  border-radius: 16px;
}

.figure figcaption {
  width: 100%;
  margin-top: 10px;
  color: #7b8799;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
}

.tableWrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #dfe6f0;
  border-radius: 20px;
  background: #fff;
  margin: 18px 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: min(620px, 100%);
}

.table th {
  background: #0d1b2a;
  color: #fff;
  text-align: start;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 13px 15px;
  white-space: nowrap;
}

.table td {
  padding: 14px 15px;
  border-bottom: 1px solid #edf1f7;
  color: #425066;
  font-size: 14px;
  line-height: 1.6;
  vertical-align: top;
}

.table tr:last-child td { border-bottom: 0; }
.table tr:nth-child(even) td { background: #fbfcff; }

.zoneGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0;
}

.zoneCard {
  border-radius: 22px;
  padding: 18px;
  color: #fff;
  min-height: 178px;
  box-shadow: 0 14px 30px rgba(23, 32, 51, 0.12);
}

.zone1 { background: linear-gradient(135deg, #dc2626, #991b1b); }
.zone2 { background: linear-gradient(135deg, #fb7185, #db2777); }
.zone3 {
  background: linear-gradient(135deg, #ffffff, #f7f8fc);
  color: #0d1b2a;
  border: 1px solid #e3e8f0;
}

.zoneCard h3 { margin: 0 0 12px; font-size: 17px; }
.zoneCard span { display: block; font-size: 13px; opacity: 0.88; margin-bottom: 14px; }
.zoneCard p { margin: 0 0 6px; font-weight: 900; }
.zoneCard small { opacity: 0.86; line-height: 1.5; }

.protocolGrid,
.criteriaGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0;
}

.protocolCard,
.criteriaCard {
  border-radius: 22px;
  padding: 20px;
  box-shadow: none;
}

.protocolCard {
  background: #fbfcff;
}

.criteriaCard {
  background: linear-gradient(180deg, #ffffff, #fbfcff);
  position: relative;
  overflow: hidden;
}

.criteriaCard span {
  display: none;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 14px;
  background: rgba(249, 115, 22, 0.12);
  color: #f97316;
  font-weight: 900;
}

.callout {
  border-radius: 20px;
  padding: 16px 18px;
  margin: 18px 0 0;
  background: #fff8f1;
  border: 1px solid #fed7aa;
  color: #7c2d12;
}

.callout.cave {
  background: #fff1f2;
  border-color: #fecdd3;
  color: #7f1d1d;
}

.callout.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #14532d;
}

.calloutLabel {
  display: block;
  margin-bottom: 7px;
  color: inherit;
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calloutBody {
  line-height: 1.75;
  font-weight: 600;
}

.discoidMriTitle {
  color: #f97316 !important;
  font-weight: 950 !important;
}

.greenTitle {
  color: #16a34a;
}

[dir='rtl'] .breadcrumb,
[dir='rtl'] .heroText,
[dir='rtl'] .sectionHead,
[dir='rtl'] .table th,
[dir='rtl'] .table td,
[dir='rtl'] .sideItem,
[dir='rtl'] .card,
[dir='rtl'] .cardAccent,
[dir='rtl'] .cardDanger,
[dir='rtl'] .protocolCard,
[dir='rtl'] .criteriaCard,
[dir='rtl'] .callout,
[dir='rtl'] .bulletItem {
  text-align: right;
}

@media (max-width: 1020px) {
  .heroGrid,
  .layout,
  [dir='rtl'] .layout,
  .splitGrid {
    grid-template-columns: 1fr;
  }

  .sidebar,
  [dir='rtl'] .sidebar {
    position: static;
    order: 0;
  }

  .sideNav {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  }
}

@media (max-width: 760px) {
  .page { padding-top: 56px; }
  .header { padding: 20px 14px 12px; }
  .layout { padding: 14px 14px 44px; }
  .heroText { padding: 24px; border-radius: 22px; }
  .heroText p { font-size: 15px; }
  .section { padding: 20px; border-radius: 22px; }
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid {
    grid-template-columns: 1fr;
  }
  .mcqStrip {
    align-items: flex-start;
    flex-direction: column;
  }
  .table { min-width: 560px; }
}

.page img {
  -webkit-user-drag: none;
  user-drag: none;
}

/* Mobile-only lesson navigation. Desktop layout stays unchanged. */
.mobileTocBar,
.mobileTocOverlay,
.mobileMcqFab {
  display: none;
}

@media (max-width: 760px) {
  .page {
    padding-top: 56px;
    padding-bottom: 92px;
  }

  .header {
    padding: 18px 14px 10px;
  }

  .breadcrumb {
    margin-bottom: 12px;
    font-size: 12px;
    flex-wrap: wrap;
  }

  .heroGrid {
    gap: 12px;
  }

  .heroText {
    padding: 24px;
    border-radius: 24px;
  }

  .sourceBadge {
    margin-bottom: 12px;
    font-size: 10px;
  }

  .heroText h1 {
    font-size: clamp(38px, 14vw, 56px);
    line-height: 1;
  }

  .heroText p {
    margin: 14px 0 18px;
    font-size: 16px;
    line-height: 1.72;
  }

  .heroStats {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 12px;
    border-radius: 22px;
  }

  .heroStatCard {
    padding: 16px;
    border-radius: 18px;
  }

  .heroStatCard strong {
    font-size: 28px;
  }

  .mcqStrip {
    display: none;
  }

  .mobileTocBar {
    display: block;
    position: sticky;
    top: 56px;
    z-index: 30;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8px 14px;
    background: rgba(247, 248, 252, 0.9);
    border-top: 1px solid rgba(226, 232, 240, 0.8);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    backdrop-filter: blur(14px);
  }

  .mobileTocButton {
    width: 100%;
    min-height: 52px;
    display: grid;
    grid-template-columns: 36px minmax(0, auto) minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    border: 1px solid rgba(208, 216, 230, 0.9);
    border-radius: 18px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.96);
    color: #172033;
    box-shadow: 0 10px 28px rgba(23, 32, 51, 0.08);
    font-family: inherit;
    font-weight: 900;
    text-align: start;
  }

  .mobileTocIcon {
    width: 34px;
    height: 34px;
    display: inline-grid;
    place-items: center;
    border-radius: 12px;
    background: rgba(249, 115, 22, 0.12);
    color: #f97316;
    font-size: 18px;
  }

  .mobileTocButton strong {
    justify-self: end;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #6b778a;
    font-size: 12px;
    font-weight: 900;
  }

  [dir='rtl'] .mobileTocButton {
    grid-template-columns: 36px minmax(0, auto) minmax(0, 1fr);
    text-align: right;
  }

  [dir='rtl'] .mobileTocButton strong {
    justify-self: start;
  }

  .mobileTocOverlay {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 18px;
    background: rgba(13, 27, 42, 0.42);
    backdrop-filter: blur(7px);
  }

  .mobileTocPanel {
    width: min(100%, 520px);
    max-height: min(78vh, 620px);
    overflow: auto;
    border-radius: 28px 28px 22px 22px;
    background: #fff;
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 -20px 60px rgba(13, 27, 42, 0.22);
    padding: 14px;
  }

  .mobileTocHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 4px 12px;
    border-bottom: 1px solid #edf1f7;
    margin-bottom: 12px;
  }

  .mobileTocHeader strong {
    color: #0d1b2a;
    font-size: 16px;
    font-weight: 950;
  }

  .mobileTocHeader button {
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 14px;
    background: #f3f6fb;
    color: #0d1b2a;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }

  .layout,
  [dir='rtl'] .layout {
    grid-template-columns: 1fr;
    padding: 14px 14px 28px;
  }

  .layout > .sidebar {
    display: none;
  }

  .mobileTocPanel .sidebar,
  [dir='rtl'] .mobileTocPanel .sidebar {
    display: block;
    position: static;
    order: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .mobileTocPanel .sideTitle {
    display: none;
  }

  .mobileTocPanel .sideNav {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .mobileTocPanel .sideItem {
    min-height: 48px;
    padding: 12px;
    border: 1px solid #edf1f7;
    background: #fbfcff;
    font-size: 15px;
  }

  .mobileTocPanel .sideItemActive {
    border-color: rgba(249, 115, 22, 0.32);
  }

  .main {
    gap: 18px;
  }

  .section {
    padding: 18px;
    border-radius: 22px;
    scroll-margin-top: 128px;
  }

  .sectionHead {
    margin-bottom: 16px;
  }

  .sectionHead h2 {
    font-size: clamp(24px, 8vw, 34px);
    line-height: 1.12;
  }

  .sectionHead p,
  .card p,
  .cardAccent p,
  .cardDanger p,
  .protocolCard p,
  .criteriaCard p,
  .bulletItem p,
  .calloutBody {
    font-size: 16px;
    line-height: 1.78;
  }

  .bulletCard {
    padding: 8px;
  }

  .bulletItem {
    grid-template-columns: 32px 1fr;
    padding: 12px;
  }

  .splitGrid {
    gap: 12px;
    margin: 14px 0;
  }

  .card,
  .cardAccent,
  .cardDanger,
  .protocolCard,
  .criteriaCard,
  .figure {
    border-radius: 18px;
    padding: 16px;
  }

  .zoneGrid,
  .protocolGrid,
  .criteriaGrid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .zoneCard {
    min-height: 0;
    padding: 16px;
    border-radius: 18px;
  }

  .tableWrap {
    margin: 14px 0;
    border-radius: 18px;
  }

  .table {
    min-width: 520px;
  }

  .table th,
  .table td {
    padding: 12px;
    font-size: 13px;
    line-height: 1.6;
  }

  .mobileMcqFab {
    position: fixed;
    left: 14px;
    right: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom));
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 54px;
    border-radius: 18px;
    background: linear-gradient(135deg, #0d1b2a 0%, #172a46 100%);
    color: #fff;
    text-decoration: none;
    box-shadow: 0 18px 38px rgba(13, 27, 42, 0.28);
    font-weight: 950;
  }

  .mobileMcqFab span {
    width: 30px;
    height: 30px;
    display: inline-grid;
    place-items: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.14);
  }
}

.caseGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin: 18px 0;
}

.caseCardLink {
  overflow: hidden;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(208, 216, 230, 0.9);
  color: inherit;
  text-decoration: none;
  box-shadow: 0 16px 34px rgba(23, 32, 51, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.caseCardLink:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 44px rgba(23, 32, 51, 0.12);
}

.caseImage {
  width: 100%;
  height: 210px;
  display: block;
  object-fit: cover;
  background: #0d1b2a;
}

.caseBody {
  padding: 18px;
}

.caseLabel {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.12);
  color: #c2410c;
  font-size: 12px;
  font-weight: 900;
}

.caseBody h3 {
  margin: 0 0 8px;
  color: #0d1b2a;
  font-size: 18px;
  line-height: 1.3;
}

.caseBody p {
  margin: 0 0 8px;
  color: #536174;
  line-height: 1.55;
}

.caseBody small {
  display: block;
  margin-bottom: 12px;
  color: #96a0b1;
  font-size: 11px;
  line-height: 1.45;
}

.caseBody strong {
  color: #f97316;
  font-size: 13px;
  font-weight: 900;
}

.discoidStats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0;
}

.discoidStatCard {
  min-height: 154px;
  border-radius: 22px;
  padding: 18px;
  background: linear-gradient(135deg, #0d1b2a 0%, #172a46 100%);
  color: #fff;
  box-shadow: 0 14px 30px rgba(23, 32, 51, 0.12);
}

.discoidStatCard:nth-child(2) {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.discoidStatCard:nth-child(3) {
  background: linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%);
  color: #0d1b2a;
  border: 1px solid #e3e8f0;
}

.discoidStatCard strong {
  display: block;
  margin-bottom: 8px;
  font-size: 32px;
  line-height: 1;
}

.discoidStatCard span {
  display: block;
  font-weight: 900;
  margin-bottom: 7px;
}

.discoidStatCard p {
  margin: 0;
  color: currentColor;
  opacity: 0.78;
  line-height: 1.55;
  font-size: 13px;
}

[dir='rtl'] .caseBody,
[dir='rtl'] .discoidStatCard {
  text-align: right;
}

@media (max-width: 760px) {
  .caseGrid,
  .discoidStats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .caseCardLink {
    border-radius: 18px;
  }

  .caseImage {
    height: 180px;
  }

  .caseBody {
    padding: 16px;
  }

  .caseBody h3 {
    font-size: 17px;
  }

  .caseBody p,
  .discoidStatCard p {
    font-size: 16px;
    line-height: 1.72;
  }

  .discoidStatCard {
    min-height: 0;
    border-radius: 18px;
    padding: 16px;
  }
}

.figureZoomButton {
  width: 100%;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: zoom-in;
  font-family: inherit;
  position: relative;
  display: grid;
  place-items: center;
}

.figureZoomButton span {
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(13, 27, 42, 0.86);
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  box-shadow: 0 10px 24px rgba(13, 27, 42, 0.24);
}

[dir='rtl'] .figureZoomButton span {
  right: auto;
  left: 14px;
}

.imageModal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  padding: 24px;
  display: grid;
  place-items: center;
  background: rgba(13, 27, 42, 0.78);
  backdrop-filter: blur(8px);
}

.imageModalContent {
  width: min(1040px, 96vw);
  max-height: 92vh;
  position: relative;
  border-radius: 24px;
  padding: 18px;
  background: #fff;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.35);
}

.imageModalContent img {
  width: 100%;
  max-height: 82vh;
  display: block;
  object-fit: contain;
  border-radius: 16px;
  background: #0d1b2a;
}

.imageModalClose {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: #f97316;
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(249, 115, 22, 0.32);
}

[dir='rtl'] .imageModalClose {
  right: auto;
  left: -14px;
}

@media (max-width: 760px) {
  .imageModal {
    padding: 10px;
  }

  .imageModalContent {
    width: 100%;
    padding: 10px;
    border-radius: 18px;
  }

  .imageModalClose {
    top: 8px;
    right: 8px;
  }

  [dir='rtl'] .imageModalClose {
    right: auto;
    left: 8px;
  }
}

.caseImage {
  height: 300px;
  object-fit: contain;
  padding: 10px;
}

@media (max-width: 760px) {
  .caseImage {
    height: 240px;
    padding: 8px;
  }
}
`

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbMsk: 'Muskuloskelettales',
    breadcrumbCurrent: 'Knie · Meniskus',
    title: 'Meniskus',
    subtitle: 'Grundlagen, Anatomie, MRT-Diagnostik und sichere Risskriterien',
    sourceLabel: 'Lehrbuch Dr. Zia',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mcqTitle: 'MCQs zum Meniskus',
    mcqDesc: 'Passende Prüfungsfragen zu Anatomie, MRT-Grading und Rissdiagnostik.',
    mcqCta: 'MCQs starten',
    openCase: 'Bild direkt in Radiopaedia öffnen',
    zoomImage: 'Bild vergrößern',
    closePreview: 'Vorschau schließen',
    sections: [
      { id: 'anatomie', label: 'Anatomie', icon: '🦴' },
      { id: 'vaskularisation', label: 'Vaskularisation', icon: '🩸' },
      { id: 'mrt', label: 'MRT-Diagnostik', icon: '🩻' },
      { id: 'grading', label: 'MRT-Grading', icon: '📊' },
      { id: 'risskriterien', label: 'Meniskusriss', icon: '⚠️' },
      { id: 'discoider', label: 'Discoider Meniskus', icon: '🔵' },
      { id: 'therapie', label: 'Therapieprinzip', icon: '🧵' },
      { id: 'fallbeispiele', label: 'Fallbeispiele', icon: '🧪' },
    ],
    heroCards: [
      { value: '2/3', label: 'aller Risse', text: 'betreffen den Innenmeniskus' },
      { value: '98 %', label: 'Innenmeniskus', text: 'Risse typischerweise im Hinterhorn' },
      { value: '3 mm', label: 'Standard', text: 'MRT-Schnittdicke im Knieprotokoll' },
    ],
    basics: {
      title: 'Kniegelenk · Meniskus · Grundlagen',
      lead: 'Die Menisken sind fibrocartilaginäre Strukturen zwischen Femurkondylen und Tibiaplateau. Es gibt zwei Menisken: den Innenmeniskus und den Außenmeniskus. Beide verbessern die Gelenkkongruenz, verteilen die Last und wirken als Stoßdämpfer. Für die MRT-Befundung sind Form, Fixierung, Durchblutung und Oberflächenkontakt des Signals entscheidend.',
      bullets: [
        'Innenmeniskus: C-förmig, kapsel- und MCL-fixiert, deutlich weniger mobil.',
        'Außenmeniskus: eher O-förmig, nicht an das laterale Kollateralband fixiert, beweglicher.',
        'Die tibiale Verankerung erfolgt über Meniskuswurzeln am Vorder- und Hinterhorn.',
      ],
    },
    anatomy: {
      title: 'Anatomie',
      lead: 'Die Menisken sind faserknorpelige Strukturen zwischen den Femurkondylen und dem Tibiaplateau. Es gibt zwei Menisken: den Innenmeniskus und den Außenmeniskus. Sie verbessern die Gelenkkongruenz, verteilen die Last und wirken als Stoßdämpfer.',
      tableHeaders: ['Merkmal', 'Innenmeniskus', 'Außenmeniskus'],
      tableRows: [
        ['Form', 'C-förmig', 'eher O-förmig'],
        ['Fixierung', 'fest mit Gelenkkapsel und medialem Seitenband verwachsen', 'nicht mit den lateralen Bändern fixiert'],
        ['Mobilität', 'wenig beweglich', 'mobiler und dadurch weniger verletzungsanfällig'],
        ['Risshäufigkeit', 'etwa zwei Drittel aller Meniskusrisse', 'seltener betroffen'],
        ['Häufigste Lokalisation', 'Hinterhorn in ca. 98 %', 'Hinterhorn in ca. 50 %, Rest in Corpus und Vorderhorn'],
      ],
      rootsTitle: 'Anschlüsse und Meniskuswurzeln',
      rootsText: 'Die Anschlüsse sollten getrennt betrachtet werden: femoral als Gleitkontakt zu den Femurkondylen und tibial als feste Verankerung über die Meniskuswurzeln.',
      rootsItems: [
        { title: 'Femoro-meniskaler Kontakt', text: 'Die Menisken artikulieren mit den Femurkondylen; ihre proximale Oberfläche ist konvex.' },
        { title: 'Tibiale Verankerung', text: 'Die feste Verankerung am Tibiaplateau erfolgt über die Meniskuswurzeln am Vorder- und Hinterhorn jedes Meniskus.' },
      ],
      imageCaption: 'Schematische Übersicht der Meniskuswurzeln: Vorderhorn, Corpus und Hinterhorn.',
      key: 'Die verminderte Beweglichkeit des Innenmeniskus ist der wichtigste Grund, warum er deutlich verletzungsanfälliger ist.',
    },
    vascular: {
      title: 'Vaskularisation und Heilungspotenzial',
      lead: 'Die Blutversorgung erfolgt nur kapselnah über den perimeniskalen Plexus. Von peripher nach zentral nimmt die Durchblutung ab. Daraus ergibt sich direkt die Heilungschance.',
      zones: [
        { name: 'Rote Zone · Zone I', range: '< 3 mm von der Kapsel', status: 'gut durchblutet', therapy: 'beste Nahtchance' },
        { name: 'Rot-weiße Zone · Zone II', range: '3–5 mm von der Kapsel', status: 'eingeschränkte Durchblutung', therapy: 'Naht individuell abwägen' },
        { name: 'Weiße Zone · Zone III', range: 'zentral gelegen', status: 'avaskulär', therapy: 'keine relevante Heilungstendenz' },
      ],
      tableHeaders: ['Zone', 'Lage', 'Durchblutung'],
      tableRows: [
        ['Rote Zone', '< 3 mm von der Kapsel', 'gut'],
        ['Rot-weiße Zone', '3–5 mm von der Kapsel', 'eingeschränkt'],
        ['Weiße Zone', 'zentral', 'avaskulär'],
      ],
      key: 'Je näher der Riss an der Kapsel liegt, desto besser ist das Heilungspotenzial.',
    },
    mri: {
      title: 'Die MRT-Diagnostik',
      lead: 'Die MRT-Diagnostik des Meniskus basiert auf einem dünnschichtigen Knieprotokoll und flüssigkeitssensitiven Sequenzen.',
      protocol: [
        { name: 'T1-Wichtung', text: 'Anatomische Übersicht und Beurteilung chronischer Fibrose.' },
        { name: 'T2-w / PD-fs', text: 'Nachweis von Rissen, Knochenödemen und Kontinuitätsunterbrechungen der Bänder.' },
        { name: 'Schnittdicke', text: 'Standardmäßig 3 mm, damit kleine Risse nicht durch Volumenmitteleffekt übersehen werden.' },
      ],
      normalTitle: 'Normalbefund',
      normalText: 'Der gesunde Meniskus stellt sich homogen hypointens dar. In der sagittalen Ansicht besitzt er eine typische dreieckige Struktur.',
      key: 'Ein reiner Signalanstieg im Meniskus ist noch kein Riss. Entscheidend ist der reproduzierbare Kontakt zur superioren oder inferioren Gelenkfläche.',
    },
    grading: {
      title: 'MRT-Grading von Meniskusläsionen',
      lead: 'Die Klassifikation nach Lotysch hilft, degenerative intrameniskale Signalveränderungen von einem echten Meniskusriss zu unterscheiden.',
      lotyschTitle: 'Grad 1 bis 3 nach Lotysch',
      tableHeaders: ['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung'],
      tableRows: [
        ['1', 'punktförmige oder kleine fokale Signalsteigerung', 'kein Kontakt', 'frühe mukoide Degeneration, meist asymptomatisch'],
        ['2a', 'lineare Signalsteigerung', 'kein Kontakt', 'fortgeschrittene Degeneration'],
        ['2b', 'lineare Signalsteigerung', 'Kontakt auf einem einzelnen Bild', 'inkonklusiv für echten Riss'],
        ['2c', 'keilförmige oder globuläre Signalsteigerung', 'kein eindeutiger Kontakt', 'hohes Risiko für okkulten Riss'],
        ['3', 'Signalsteigerung', 'Kontakt auf mindestens zwei aufeinanderfolgenden Schichten', 'radiologisch gesicherter Meniskusriss'],
        ['4', 'komplexe Rissmorphologie mit Deformierung oder Fragmentierung', 'mehrfacher Oberflächenkontakt', 'komplexer Meniskusriss'],
      ],
      key: 'Meniskusläsion Grad 3 ist der entscheidende Schwellenwert für die Rissdiagnose: Signalsteigerung innerhalb des Meniskus mit sicherem Oberflächenkontakt auf mindestens zwei Schichten.',
    },
    tear: {
      title: 'MRT-Kriterien für einen Meniskusriss',
      lead: 'Für die Diagnose „Meniskusriss“ müssen verbindliche Kriterien erfüllt sein. Dadurch lassen sich Sensitivität und Spezifität deutlich verbessern.',
      cave: 'Ein reiner intrameniskaler Signalanstieg reicht nicht aus, um einen Meniskusriss sicher zu diagnostizieren.',
      criteria: [
        { title: 'Kontakt zum Gelenkflächenrand', text: 'Das pathologisch erhöhte Signal erreicht die superiore oder inferiore Meniskusoberfläche.' },
        { title: 'Deformität', text: 'Die normale dreieckige Meniskuskonfiguration ist verloren oder deutlich verändert.' },
        { title: 'Two-slice-touch-Regel', text: 'Die Läsion ist auf mindestens zwei aufeinanderfolgenden Schichten mit Oberflächenkontakt erkennbar.' },
      ],
      key: 'Die Two-slice-touch-Regel erhöht die Spezifität, weil ein Einzelbild-Artefakt nicht fälschlich als Riss gewertet wird.',
    },
    cases: {
      title: 'Fallbeispiele',
      lead: '',
      items: [
        {
          title: 'Keilförmig/globuläres Signal ohne sicheren Oberflächenkontakt',
          label: 'Grad 2c',
          tags: ['Discoider Meniskus'],
          meta: 'PD-Wichtung · sagittal · mukoide Degeneration · hohes Risiko für okkulten Riss',
          img: '/meniskus/mri-sagittal.png',
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
        {
          title: 'Lineares Signal mit Oberflächenkontakt auf nur einer Schicht',
          label: 'Grad 2b',
          tags: ['Discoider Meniskus'],
          meta: 'PD-Wichtung · koronal · inkonklusiv · kein sicherer Grad-3-Riss',
          img: '/meniskus/mri-coronal.png',
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
      ],
      key: 'Fallbeispiele sind besonders hilfreich, weil nicht jede intrameniskale Signalsteigerung automatisch ein Meniskusriss ist.',
    },
    discoid: {
      title: 'Discoider Meniskus',
      lead: 'Der discoide Meniskus ist eine angeborene anatomische Variante mit übermäßig breitem, scheibenförmigem Meniskuskörper. Er betrifft fast ausschließlich den Außenmeniskus und reißt häufiger als ein normal geformter Meniskus.',
      stats: [
        { value: '3–5 %', label: 'Inzidenz', text: 'häufig Zufallsbefund im Knie-MRT' },
        { value: '~50 %', label: 'bilateral', text: 'nicht selten beidseitig vorhanden' },
        { value: 'Außen', label: 'Meniskus', text: 'fast ausschließlich der Außenmeniskus betroffen' },
      ],
      overviewHeaders: ['Parameter', 'Wert'],
      overviewRows: [
        ['Betroffener Meniskus', 'fast ausschließlich Außenmeniskus'],
        ['Seitenverteilung', 'bilateral in etwa 50 % der Fälle'],
        ['Geschlecht', 'keine klare Präferenz'],
        ['Prävalenz', 'höher in asiatischen Populationen beschrieben'],
        ['Rissrisiko', 'erhöht gegenüber normalem Meniskus'],
      ],
      childTitle: 'Klinisches Leitsymptom bei Kindern',
      childText: 'Knieschnappen oder ein „Snapping Knee“ bei Kindern sollte an einen discoiden Außenmeniskus denken lassen.',
      mriTitle: 'MRT-Kriterien',
      mriHeaders: ['Ebene', 'Kriterium', 'Schwellenwert'],
      mriRows: [
        ['Koronal', 'absolute Meniskusbreite', '≥ 15 mm'],
        ['Koronal', 'Meniskusbreite / maximale Tibiabreite', '> 20 %'],
        ['Sagittal', 'kontinuierliche Corpus-Darstellung', 'auf ≥ 3 aufeinanderfolgenden Standardschichten'],
      ],
      sagittalTitle: 'Sagittales Zeichen',
      sagittalText: 'Das sagittale Kriterium entspricht dem Gegenteil des Absent-Bow-Tie-Signs: Ein normaler Meniskus zeigt den Corpus nur auf 1–2 Schichten, der discoide Meniskus auf mindestens 3 Schichten.',
      treatmentHeaders: ['Situation', 'Vorgehen'],
      treatmentRows: [
        ['asymptomatischer Zufallsbefund', 'konservativ, keine Intervention nötig'],
        ['symptomatisch ohne Riss', 'konservativ; bei Versagen arthroskopische Saucerisation'],
        ['discoider Meniskus mit Riss', 'Meniskusrefixation plus ggf. partielle Resektion'],
        ['irreparabel / schwere Destruktion', 'Teil- oder Totalmeniskektomie nur als letzte Option'],
      ],
      key: 'Sagittales Zeichen: Bei einem discoiden Meniskus bleibt der Meniskuskorpus auf mindestens 3 aufeinanderfolgenden sagittalen Schichten sichtbar.',
    },
    therapy: {
      title: 'Therapieprinzip: Save the Meniscus',
      titlePrefix: 'Therapieprinzip',
      saveText: 'Save the Meniscus',
      lead: 'Die Therapie richtet sich nach Symptomatik, Rissmorphologie, Lokalisation und Vaskularisation. Ziel ist der möglichst weitgehende Erhalt von Meniskusgewebe.',
      tableHeaders: ['Situation', 'Prinzip'],
      tableRows: [
        ['asymptomatische oder rein degenerative Läsion', 'konservative Therapie'],
        ['frischer Riss in der roten Zone', 'Meniskusnaht'],
        ['irreparables, mechanisch relevantes Fragment', 'sparsame Teilresektion'],
      ],
      key: 'So viel Meniskus wie möglich erhalten, so wenig wie nötig resezieren.',
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Knee · Meniscus',
    title: 'Meniscus',
    subtitle: 'Basics, anatomy, MRI diagnosis and reliable tear criteria',
    sourceLabel: 'Dr. Zia script',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mcqTitle: 'Meniscus MCQs',
    mcqDesc: 'Exam questions on anatomy, MRI grading and tear diagnosis.',
    mcqCta: 'Start MCQs',
    openCase: 'Open image directly in Radiopaedia',
    zoomImage: 'Enlarge image',
    closePreview: 'Close preview',
    sections: [
      { id: 'anatomie', label: 'Anatomy', icon: '🦴' },
      { id: 'vaskularisation', label: 'Vascular supply', icon: '🩸' },
      { id: 'mrt', label: 'MRI diagnosis', icon: '🩻' },
      { id: 'grading', label: 'MRI grading', icon: '📊' },
      { id: 'risskriterien', label: 'Meniscal tear', icon: '⚠️' },
      { id: 'discoider', label: 'Discoid meniscus', icon: '🔵' },
      { id: 'therapie', label: 'Treatment principle', icon: '🧵' },
      { id: 'fallbeispiele', label: 'Cases', icon: '🧪' },
    ],
    heroCards: [
      { value: '2/3', label: 'of tears', text: 'involve the medial meniscus' },
      { value: '98%', label: 'medial meniscus', text: 'typically posterior horn tears' },
      { value: '3 mm', label: 'standard', text: 'MRI slice thickness in knee protocols' },
    ],
    basics: {
      title: 'Knee joint · Meniscus · Basics',
      lead: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. There are two menisci: the medial and the lateral meniscus. Both improve joint congruity, distribute load and act as shock absorbers. For MRI reporting, shape, fixation, vascularity and surface contact of signal are central.',
      bullets: [
        'Medial meniscus: C-shaped, fixed to the capsule and MCL, therefore much less mobile.',
        'Lateral meniscus: more O-shaped, not attached to the lateral collateral ligament, therefore more mobile.',
        'Tibial anchoring is provided by the meniscal roots at the anterior and posterior horns.',
      ],
    },
    anatomy: {
      title: 'Anatomy',
      lead: 'The menisci are fibrocartilaginous structures between the femoral condyles and the tibial plateau. There are two menisci: the medial meniscus and the lateral meniscus. They improve joint congruity, distribute load and act as shock absorbers.',
      tableHeaders: ['Feature', 'Medial meniscus', 'Lateral meniscus'],
      tableRows: [
        ['Shape', 'C-shaped', 'more O-shaped'],
        ['Fixation', 'firmly attached to capsule and medial collateral ligament', 'not fixed to the lateral ligaments'],
        ['Mobility', 'less mobile', 'more mobile and therefore less injury-prone'],
        ['Frequency of tears', 'about two thirds of all meniscal tears', 'less commonly affected'],
        ['Most common location', 'posterior horn in approx. 98%', 'posterior horn in approx. 50%, remainder in body and anterior horn'],
      ],
      rootsTitle: 'Attachments and meniscal roots',
      rootsText: 'The attachments should be considered separately: femoral gliding contact with the condyles and tibial anchoring through the meniscal roots.',
      rootsItems: [
        { title: 'Femoro-meniscal contact', text: 'The menisci articulate with the femoral condyles; their proximal surface is convex.' },
        { title: 'Tibial anchoring', text: 'Firm anchoring to the tibial plateau is provided by the meniscal roots at the anterior and posterior horn of each meniscus.' },
      ],
      imageCaption: 'Schematic overview of the meniscal roots: anterior horn, body and posterior horn.',
      key: 'Reduced mobility of the medial meniscus is the main reason why it is clearly more prone to injury.',
    },
    vascular: {
      title: 'Vascular supply and healing potential',
      lead: 'Blood supply is limited to the capsular periphery via the perimeniscal plexus. Vascularity decreases from the periphery to the center, directly determining healing potential.',
      zones: [
        { name: 'Red zone · Zone I', range: '< 3 mm from the capsule', status: 'well vascularized', therapy: 'best chance for repair' },
        { name: 'Red-white zone · Zone II', range: '3–5 mm from the capsule', status: 'limited blood supply', therapy: 'repair depends on case' },
        { name: 'White zone · Zone III', range: 'central area', status: 'avascular', therapy: 'no relevant healing potential' },
      ],
      tableHeaders: ['Zone', 'Location', 'Vascularity'],
      tableRows: [
        ['Red zone', '< 3 mm from the capsule', 'good'],
        ['Red-white zone', '3–5 mm from the capsule', 'limited'],
        ['White zone', 'central', 'avascular'],
      ],
      key: 'The closer the tear is to the capsule, the better its healing potential.',
    },
    mri: {
      title: 'MRI diagnosis',
      lead: 'MRI assessment of the meniscus relies on a thin-slice knee protocol and fluid-sensitive sequences.',
      protocol: [
        { name: 'T1-weighting', text: 'Anatomical overview and assessment of chronic fibrosis.' },
        { name: 'T2-w / PD-fs', text: 'Detection of tears, bone marrow edema and ligament discontinuity.' },
        { name: 'Slice thickness', text: 'Usually 3 mm so that small tears are not hidden by volume averaging.' },
      ],
      normalTitle: 'Normal appearance',
      normalText: 'A healthy meniscus is homogeneously hypointense. On sagittal images it has a typical triangular configuration.',
      key: 'Intrameniscal signal alone is not a tear. The decisive feature is reproducible contact with the superior or inferior articular surface.',
    },
    grading: {
      title: 'MRI grading of meniscal lesions',
      lead: 'The Lotysch classification helps distinguish degenerative intrameniscal signal changes from a true meniscal tear.',
      lotyschTitle: 'Grades 1 to 3 according to Lotysch',
      tableHeaders: ['Grade', 'Morphology', 'Surface contact', 'Meaning'],
      tableRows: [
        ['1', 'punctate or small focal signal increase', 'no contact', 'early mucoid degeneration, usually asymptomatic'],
        ['2a', 'linear signal increase', 'no contact', 'advanced degeneration'],
        ['2b', 'linear signal increase', 'contact on a single image', 'inconclusive for a true tear'],
        ['2c', 'wedge-shaped or globular signal increase', 'no definite contact', 'high risk of an occult tear'],
        ['3', 'signal increase', 'contact on at least two consecutive slices', 'radiologically proven meniscal tear'],
        ['4', 'complex tear morphology with deformation or fragmentation', 'multiple surface contacts', 'complex meniscal tear'],
      ],
      key: 'Grade 3 meniscal lesion is the decisive threshold for diagnosing a tear: intrameniscal signal increase with reliable surface contact on at least two slices.',
    },
    tear: {
      title: 'MRI criteria for a meniscal tear',
      lead: 'Specific criteria must be fulfilled before diagnosing a meniscal tear. This improves sensitivity and specificity.',
      cave: 'Intrameniscal signal increase alone is not sufficient to confidently diagnose a meniscal tear.',
      criteria: [
        { title: 'Contact with the articular surface', text: 'The abnormal high signal reaches the superior or inferior meniscal surface.' },
        { title: 'Deformity', text: 'The normal triangular configuration is lost or clearly altered.' },
        { title: 'Two-slice-touch rule', text: 'The lesion is visible with surface contact on at least two consecutive slices.' },
      ],
      key: 'The two-slice-touch rule increases specificity because a single-slice artifact is not overcalled as a tear.',
    },
    cases: {
      title: 'Cases',
      lead: '',
      items: [
        {
          title: 'Wedge-shaped/globular signal without definite surface contact',
          label: 'Grade 2c',
          tags: ['Discoid meniscus'],
          meta: 'PD-weighted · sagittal · mucoid degeneration · high risk of occult tear',
          img: '/meniskus/mri-sagittal.png',
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
        {
          title: 'Linear signal with surface contact on one slice only',
          label: 'Grade 2b',
          tags: ['Discoid meniscus'],
          meta: 'PD-weighted · coronal · inconclusive · not a definite grade-3 tear',
          img: '/meniskus/mri-coronal.png',
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
      ],
      key: 'Cases are useful because not every intrameniscal signal abnormality represents a definite meniscal tear.',
    },
    discoid: {
      title: 'Discoid meniscus',
      lead: 'A discoid meniscus is a congenital anatomic variant with an abnormally wide, disc-shaped meniscal body. It almost exclusively affects the lateral meniscus and is more prone to tears than a normally shaped meniscus.',
      stats: [
        { value: '3–5%', label: 'incidence', text: 'often incidental on knee MRI' },
        { value: '~50%', label: 'bilateral', text: 'not uncommonly present on both sides' },
        { value: 'Lateral', label: 'meniscus', text: 'almost exclusively the lateral meniscus is affected' },
      ],
      overviewHeaders: ['Parameter', 'Value'],
      overviewRows: [
        ['Affected meniscus', 'almost exclusively lateral meniscus'],
        ['Side distribution', 'bilateral in about 50% of cases'],
        ['Sex', 'no clear predilection'],
        ['Prevalence', 'reported to be higher in Asian populations'],
        ['Risk of tear', 'higher than in a normally shaped meniscus'],
      ],
      childTitle: 'Clinical clue in children',
      childText: 'A snapping knee in a child should always raise suspicion for a discoid lateral meniscus.',
      mriTitle: 'MRI criteria',
      mriHeaders: ['Plane', 'Criterion', 'Threshold'],
      mriRows: [
        ['Coronal', 'absolute meniscal width', '≥ 15 mm'],
        ['Coronal', 'meniscal width / maximal tibial width', '> 20%'],
        ['Sagittal', 'continuous body visualization', 'on ≥ 3 consecutive standard slices'],
      ],
      sagittalTitle: 'Sagittal sign',
      sagittalText: 'The sagittal criterion is the opposite of the absent bow-tie sign: a normal meniscus shows the body on only 1–2 slices, whereas a discoid meniscus remains visible on at least 3 slices.',
      treatmentHeaders: ['Situation', 'Management'],
      treatmentRows: [
        ['asymptomatic incidental finding', 'conservative, no intervention needed'],
        ['symptomatic without tear', 'conservative; arthroscopic saucerization if symptoms persist'],
        ['discoid meniscus with tear', 'meniscal repair plus partial resection if needed'],
        ['irreparable / severe destruction', 'partial or total meniscectomy only as last option'],
      ],
      key: 'Sagittal sign: in a discoid meniscus, the meniscal body remains visible on at least 3 consecutive sagittal slices.',
    },
    therapy: {
      title: 'Treatment concept: Save the meniscus',
      titlePrefix: 'Treatment concept',
      saveText: 'Save the Meniscus',
      lead: 'Management depends on symptoms, tear morphology, location and vascularity. The goal is to preserve as much meniscal tissue as possible.',
      tableHeaders: ['Situation', 'Principle'],
      tableRows: [
        ['asymptomatic or purely degenerative lesion', 'conservative treatment'],
        ['fresh tear in the red zone', 'meniscal repair'],
        ['irreparable mechanically relevant fragment', 'limited partial resection'],
      ],
      key: 'Preserve as much meniscus as possible, resect only as much as necessary.',
    },
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbMsk: 'اسکلتی-عضلانی',
    breadcrumbCurrent: 'زانو · منیسک',
    title: 'منیسک',
    subtitle: 'مبانی، آناتومی، تشخیص MRI و معیارهای قطعی پارگی',
    sourceLabel: 'جزوه دکتر ضیا',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mcqTitle: 'سوالات منیسک',
    mcqDesc: 'سوالات مرتبط با آناتومی، درجه‌بندی MRI و تشخیص پارگی.',
    mcqCta: 'شروع سوالات',
    openCase: 'باز کردن مستقیم تصویر در Radiopaedia',
    zoomImage: 'بزرگ‌نمایی تصویر',
    closePreview: 'بستن نمایش بزرگ',
    sections: [
      { id: 'anatomie', label: 'آناتومی', icon: '🦴' },
      { id: 'vaskularisation', label: 'خون‌رسانی', icon: '🩸' },
      { id: 'mrt', label: 'تشخیص MRI', icon: '🩻' },
      { id: 'grading', label: 'درجه‌بندی MRI', icon: '📊' },
      { id: 'risskriterien', label: 'پارگی منیسک', icon: '⚠️' },
      { id: 'discoider', label: 'منیسک دیسکوئید', icon: '🔵' },
      { id: 'therapie', label: 'اصل درمان', icon: '🧵' },
      { id: 'fallbeispiele', label: 'نمونه کیس‌ها', icon: '🧪' },
    ],
    heroCards: [
      { value: '۲/۳', label: 'پارگی‌ها', text: 'مربوط به منیسک داخلی هستند' },
      { value: '۹۸٪', label: 'منیسک داخلی', text: 'اغلب در شاخ پشتی پاره می‌شود' },
      { value: '۳ mm', label: 'استاندارد', text: 'ضخامت برش در پروتکل MRI زانو' },
    ],
    basics: {
      title: 'مفصل زانو · منیسک · مبانی',
      lead: 'منیسک‌ها ساختارهای فیبروکارتیلاژ بین کندیل‌های فمور و پلاتوی تیبیا هستند. دو منیسک وجود دارد: منیسک داخلی و منیسک خارجی. هر دو تطابق مفصلی را بهتر می‌کنند، نیرو را پخش می‌کنند و نقش ضربه‌گیر دارند. در گزارش MRI، شکل، میزان تثبیت، خون‌رسانی و تماس سیگنال با سطح مفصل اهمیت اصلی دارد.',
      bullets: [
        'منیسک داخلی: C شکل، متصل به کپسول و MCL، بنابراین تحرک کمتر دارد.',
        'منیسک خارجی: بیشتر O شکل، به رباط خارجی متصل نیست و تحرک بیشتری دارد.',
        'اتصال به تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی انجام می‌شود.',
      ],
    },
    anatomy: {
      title: 'آناتومی',
      lead: 'منیسک‌ها ساختارهای فیبروکارتیلاژی بین کندیل‌های فمور و پلاتوی تیبیا هستند. دو منیسک وجود دارد: منیسک داخلی و منیسک خارجی. آن‌ها تطابق مفصلی را بهتر می‌کنند، نیرو را پخش می‌کنند و مانند ضربه‌گیر عمل می‌کنند.',
      tableHeaders: ['ویژگی', 'منیسک داخلی', 'منیسک خارجی'],
      tableRows: [
        ['شکل', 'C شکل', 'بیشتر O شکل'],
        ['تثبیت', 'به کپسول مفصلی و رباط جانبی داخلی متصل است', 'به رباط‌های خارجی متصل نیست'],
        ['تحرک', 'کم‌تحرک', 'متحرک‌تر و در نتیجه کمتر مستعد آسیب'],
        ['شیوع پارگی', 'حدود دو سوم همه پارگی‌های منیسک', 'کمتر درگیر می‌شود'],
        ['محل شایع پارگی', 'شاخ پشتی در حدود ۹۸٪', 'شاخ پشتی در حدود ۵۰٪، بقیه در بدنه و شاخ قدامی'],
      ],
      rootsTitle: 'اتصالات و ریشه‌های منیسک',
      rootsText: 'اتصالات بهتر است جداگانه بررسی شوند: تماس لغزشی با کندیل‌های فمور و اتصال محکم به تیبیا از طریق ریشه‌های منیسک.',
      rootsItems: [
        { title: 'تماس فمورو-منیسکال', text: 'منیسک‌ها با کندیل‌های فمور مفصل می‌شوند و سطح پروگزیمال آن‌ها محدب است.' },
        { title: 'اتصال به تیبیا', text: 'اتصال محکم به پلاتوی تیبیا از طریق ریشه‌های منیسک در شاخ قدامی و خلفی هر منیسک انجام می‌شود.' },
      ],
      imageCaption: 'نمای شماتیک ریشه‌های منیسک: شاخ قدامی، بدنه و شاخ خلفی.',
      key: 'تحرک کمتر منیسک داخلی مهم‌ترین دلیل آسیب‌پذیری بیشتر آن است.',
    },
    vascular: {
      title: 'خون‌رسانی و پتانسیل ترمیم',
      lead: 'خون‌رسانی منیسک فقط از ناحیه نزدیک کپسول و از طریق شبکه پیرامنیسکی انجام می‌شود. هرچه به مرکز نزدیک‌تر شویم خون‌رسانی کمتر می‌شود و شانس ترمیم هم کاهش می‌یابد.',
      zones: [
        { name: 'ناحیه قرمز · Zone I', range: 'کمتر از ۳ میلی‌متر از کپسول', status: 'خون‌رسانی خوب', therapy: 'بهترین شانس برای بخیه' },
        { name: 'ناحیه قرمز-سفید · Zone II', range: '۳ تا ۵ میلی‌متر از کپسول', status: 'خون‌رسانی محدود', therapy: 'بخیه بسته به شرایط' },
        { name: 'ناحیه سفید · Zone III', range: 'قسمت مرکزی', status: 'بدون عروق', therapy: 'ترمیم قابل توجه ندارد' },
      ],
      tableHeaders: ['ناحیه', 'محل', 'خون‌رسانی'],
      tableRows: [
        ['قرمز', 'کمتر از ۳ میلی‌متر از کپسول', 'خوب'],
        ['قرمز-سفید', '۳ تا ۵ میلی‌متر از کپسول', 'محدود'],
        ['سفید', 'مرکزی', 'بدون عروق'],
      ],
      key: 'هرچه پارگی به کپسول نزدیک‌تر باشد، پتانسیل ترمیم بهتر است.',
    },
    mri: {
      title: 'تشخیص MRI',
      lead: 'ارزیابی MRI منیسک بر اساس پروتکل زانو با برش‌های نازک و سکانس‌های حساس به مایع انجام می‌شود.',
      protocol: [
        { name: 'T1', text: 'نمای کلی آناتومیک و ارزیابی فیبروز مزمن.' },
        { name: 'T2-w / PD-fs', text: 'تشخیص پارگی، ادم استخوان و قطع‌شدگی رباط‌ها.' },
        { name: 'ضخامت برش', text: 'به طور استاندارد ۳ میلی‌متر، تا پارگی‌های کوچک به علت Volume Averaging پنهان نشوند.' },
      ],
      normalTitle: 'نمای طبیعی',
      normalText: 'منیسک سالم به صورت هموژن هیپواینتنس دیده می‌شود. در نمای ساژیتال شکل مثلثی تیپیک دارد.',
      key: 'افزایش سیگنال داخل منیسک به تنهایی پارگی محسوب نمی‌شود. معیار اصلی، تماس تکرارپذیر سیگنال با سطح مفصلی فوقانی یا تحتانی است.',
    },
    grading: {
      title: 'درجه‌بندی MRI ضایعات منیسک',
      lead: 'طبقه‌بندی Lotysch کمک می‌کند تغییرات سیگنال دژنراتیو داخل منیسک از پارگی واقعی منیسک جدا شود.',
      lotyschTitle: 'درجه ۱ تا ۳ طبق Lotysch',
      tableHeaders: ['درجه', 'مورفولوژی', 'تماس با سطح', 'معنا'],
      tableRows: [
        ['1', 'افزایش سیگنال نقطه‌ای یا کوچک', 'بدون تماس', 'دژنراسیون موکوئید اولیه، معمولاً بی‌علامت'],
        ['2a', 'افزایش سیگنال خطی', 'بدون تماس', 'دژنراسیون پیشرفته'],
        ['2b', 'افزایش سیگنال خطی', 'تماس فقط در یک تصویر', 'برای پارگی قطعی ناکافی'],
        ['2c', 'افزایش سیگنال گوه‌ای یا گلوبولار', 'بدون تماس واضح', 'ریسک بالا برای پارگی مخفی'],
        ['3', 'افزایش سیگنال', 'تماس در حداقل دو برش متوالی', 'پارگی منیسک از نظر رادیولوژیک قطعی'],
        ['4', 'مورفولوژی پیچیده پارگی همراه با دفورمیتی یا قطعه‌قطعه‌شدن', 'تماس سطحی متعدد', 'پارگی کمپلکس منیسک'],
      ],
      key: 'ضایعه منیسک درجه 3 آستانه اصلی برای تشخیص پارگی است: افزایش سیگنال داخل منیسک همراه با تماس مطمئن با سطح مفصلی در حداقل دو برش.',
    },
    tear: {
      title: 'معیارهای MRI برای پارگی منیسک',
      lead: 'برای تشخیص پارگی منیسک باید معیارهای مشخص وجود داشته باشد. این کار حساسیت و ویژگی تشخیص را بهتر می‌کند.',
      cave: 'افزایش سیگنال داخل منیسک به تنهایی برای تشخیص قطعی پارگی کافی نیست.',
      criteria: [
        { title: 'تماس با سطح مفصلی', text: 'سیگنال پاتولوژیک به سطح فوقانی یا تحتانی منیسک می‌رسد.' },
        { title: 'دفورمیتی', text: 'شکل مثلثی طبیعی منیسک از بین رفته یا واضحاً تغییر کرده است.' },
        { title: 'قانون Two-slice-touch', text: 'ضایعه باید حداقل در دو برش متوالی با تماس سطحی دیده شود.' },
      ],
      key: 'قانون Two-slice-touch اختصاصیت را بالا می‌برد، چون یک آرتیفکت تک‌برشی به اشتباه پارگی حساب نمی‌شود.',
    },
    cases: {
      title: 'نمونه کیس‌ها',
      lead: '',
      items: [
        {
          title: 'سیگنال گوه‌ای/گلوبولار بدون تماس قطعی با سطح مفصلی',
          label: 'درجه 2c',
          tags: ['منیسک دیسکوئید'],
          meta: 'PD · ساژیتال · دژنراسیون موکوئید · ریسک بالای پارگی مخفی',
          img: '/meniskus/mri-sagittal.png',
          url: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
          credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060',
        },
        {
          title: 'سیگنال خطی با تماس سطحی فقط در یک تصویر',
          label: 'درجه 2b',
          tags: ['منیسک دیسکوئید'],
          meta: 'PD · کرونال · غیرقطعی · پارگی قطعی Grade 3 نیست',
          img: '/meniskus/mri-coronal.png',
          url: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
          credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168',
        },
      ],
      key: 'نمونه کیس‌ها مهم هستند، چون هر افزایش سیگنال داخل منیسک به معنی پارگی قطعی نیست.',
    },
    discoid: {
      title: 'منیسک دیسکوئید',
      lead: 'منیسک دیسکوئید یک واریانت مادرزادی است که در آن تنه منیسک پهن‌تر و شبیه دیسک است. این حالت تقریباً همیشه منیسک خارجی را درگیر می‌کند و نسبت به منیسک طبیعی بیشتر مستعد پارگی است.',
      stats: [
        { value: '۳–۵٪', label: 'شیوع', text: 'اغلب یافته اتفاقی در MRI زانو' },
        { value: '~۵۰٪', label: 'دوطرفه', text: 'می‌تواند در هر دو زانو دیده شود' },
        { value: 'خارجی', label: 'منیسک', text: 'تقریباً همیشه منیسک خارجی درگیر می‌شود' },
      ],
      overviewHeaders: ['پارامتر', 'مقدار'],
      overviewRows: [
        ['منیسک درگیر', 'تقریباً همیشه منیسک خارجی'],
        ['توزیع طرفی', 'در حدود ۵۰٪ موارد دوطرفه'],
        ['جنسیت', 'ارجحیت واضح ندارد'],
        ['شیوع', 'در جمعیت‌های آسیایی بیشتر گزارش شده است'],
        ['خطر پارگی', 'بیشتر از منیسک با شکل طبیعی'],
      ],
      childTitle: 'نکته بالینی در کودکان',
      childText: 'شنیدن یا احساس Snapping در زانوی کودک باید شک به منیسک خارجی دیسکوئید را مطرح کند.',
      mriTitle: 'معیارهای MRI',
      mriHeaders: ['صفحه', 'معیار', 'حد آستانه'],
      mriRows: [
        ['کرونال', 'عرض مطلق منیسک', '≥ ۱۵ میلی‌متر'],
        ['کرونال', 'عرض منیسک / حداکثر عرض تیبیا', '> ۲۰٪'],
        ['ساژیتال', 'دیده شدن مداوم تنه منیسک', 'در ≥ ۳ برش استاندارد متوالی'],
      ],
      sagittalTitle: 'علامت ساژیتال',
      sagittalText: 'معیار ساژیتال برعکس absent bow-tie sign است: منیسک طبیعی تنه را فقط در ۱ تا ۲ برش نشان می‌دهد، اما منیسک دیسکوئید در حداقل ۳ برش متوالی دیده می‌شود.',
      treatmentHeaders: ['وضعیت', 'اقدام'],
      treatmentRows: [
        ['یافته اتفاقی بدون علامت', 'محافظه‌کارانه، بدون نیاز به مداخله'],
        ['علامت‌دار بدون پارگی', 'درمان محافظه‌کارانه؛ در صورت تداوم علائم Saucerization آرتروسکوپیک'],
        ['منیسک دیسکوئید همراه با پارگی', 'ترمیم منیسک همراه با رزکسیون نسبی در صورت نیاز'],
        ['غیرقابل ترمیم / تخریب شدید', 'منیسککتومی نسبی یا کامل فقط به عنوان آخرین گزینه'],
      ],
      key: 'علامت ساژیتال: در منیسک دیسکوئید، تنه منیسک در حداقل ۳ برش ساژیتال متوالی قابل مشاهده باقی می‌ماند.',
    },
    therapy: {
      title: 'اصول درمان: Save the Meniscus',
      titlePrefix: 'اصول درمان',
      saveText: 'Save the Meniscus',
      lead: 'تصمیم درمانی به علائم، شکل پارگی، محل پارگی و خون‌رسانی بستگی دارد. هدف، حفظ حداکثری بافت منیسک است.',
      tableHeaders: ['وضعیت', 'اصل درمانی'],
      tableRows: [
        ['ضایعه بدون علامت یا صرفاً دژنراتیو', 'درمان محافظه‌کارانه'],
        ['پارگی تازه در ناحیه قرمز', 'بخیه منیسک'],
        ['قطعه غیرقابل ترمیم و مکانیکی', 'رزکسیون محدود و محافظه‌کارانه'],
      ],
      key: 'اصل مهم این است که منیسک تا حد امکان حفظ شود؛ رزکسیون فقط زمانی و فقط به اندازه‌ای انجام شود که واقعاً لازم است.',
    },
  },
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  const icon = type === 'cave' ? '⚠️' : type === 'success' ? '✅' : '💡'
  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <span className={styles.calloutLabel}>{icon} {label}</span>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  )
}

function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
      </div>
      {children}
    </section>
  )
}

function Sidebar({ sections, toc, activeId, onClick }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTitle}>{toc}</div>
      <nav className={styles.sideNav}>
        {sections.map(section => (
          <button
            key={section.id}
            type="button"
            className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
            onClick={() => onClick(section.id)}
          >
            <span className={styles.sideIcon}>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function ImageFigure({ src, alt, caption, zoomable = false, zoomLabel = 'Bild vergrößern', onZoom }) {
  return (
    <figure className={styles.figure}>
      {zoomable ? (
        <button type="button" className={styles.figureZoomButton} onClick={onZoom} aria-label={zoomLabel}>
          <img src={src} alt={alt} />
          <span>{zoomLabel}</span>
        </button>
      ) : (
        <img src={src} alt={alt} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default function MeniskusPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const mainRef = useRef(null)
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    setIsMobileTocOpen(false)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    setActiveId(copy.sections[0].id)
  }, [copy.sections])

  useEffect(() => {
    document.body.style.overflow = (isMobileTocOpen || previewImage) ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileTocOpen, previewImage])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { root: null, rootMargin: '-18% 0px -70% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <div
      className={styles.page}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={lang}
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <style>{MENISKUS_STYLES}</style>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')} className={styles.breadLink}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/msk')} className={styles.breadLink}>{copy.breadcrumbMsk}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <Link href={withLang('/msk/knie/meniskus/mcq')} className={styles.mcqButton}>
              <span>🎯</span>
              <span>{copy.mcqTitle}</span>
            </Link>
          </div>

        </div>

      </header>

      <div className={styles.mobileTocBar}>
        <button
          type="button"
          className={styles.mobileTocButton}
          onClick={() => setIsMobileTocOpen(true)}
          aria-expanded={isMobileTocOpen}
        >
          <span className={styles.mobileTocIcon}>☰</span>
          <span>{copy.toc}</span>
          <strong>{copy.sections.find(section => section.id === activeId)?.label}</strong>
        </button>
      </div>

      {isMobileTocOpen && (
        <div className={styles.mobileTocOverlay} onClick={() => setIsMobileTocOpen(false)}>
          <div className={styles.mobileTocPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.mobileTocHeader}>
              <strong>{copy.toc}</strong>
              <button type="button" onClick={() => setIsMobileTocOpen(false)} aria-label="Close menu">×</button>
            </div>
            <Sidebar sections={copy.sections} toc={copy.toc} activeId={activeId} onClick={scrollTo} />
          </div>
        </div>
      )}

      <div className={styles.layout}>
        <Sidebar sections={copy.sections} toc={copy.toc} activeId={activeId} onClick={scrollTo} />

        <main className={styles.main} ref={mainRef}>
          <Section id="anatomie" eyebrow="01" title={copy.anatomy.title} lead={copy.anatomy.lead}>
            <Table headers={copy.anatomy.tableHeaders} rows={copy.anatomy.tableRows} />
            <div className={styles.splitGrid}>
              <div className={styles.card}>
                <h3>{copy.anatomy.rootsTitle}</h3>
                {copy.anatomy.rootsItems ? (
                  <div className={styles.plainList}>
                    {copy.anatomy.rootsItems.map(item => (
                      <p key={item.title}>
                        <strong>{item.title}</strong>
                        {item.text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>{copy.anatomy.rootsText}</p>
                )}
              </div>
              <ImageFigure src="/meniskus/anatomy-roots.png" alt={copy.anatomy.rootsTitle} caption={copy.anatomy.imageCaption} />
            </div>
            <Callout label={copy.keyLabel}>{copy.anatomy.key}</Callout>
          </Section>

          <Section id="vaskularisation" eyebrow="03" title={copy.vascular.title} lead={copy.vascular.lead}>
            <div className={styles.zoneGrid}>
              {copy.vascular.zones.map((zone, index) => (
                <div key={zone.name} className={`${styles.zoneCard} ${styles[`zone${index + 1}`]}`}>
                  <h3>{zone.name}</h3>
                  <span>{zone.range}</span>
                  <p>{zone.status}</p>
                  <small>{zone.therapy}</small>
                </div>
              ))}
            </div>
            <div className={styles.splitGrid}>
              <ImageFigure src="/meniskus/vascular-zones.png" alt={copy.vascular.title} />
              <Table headers={copy.vascular.tableHeaders} rows={copy.vascular.tableRows} />
            </div>
            <Callout label={copy.keyLabel}>{copy.vascular.key}</Callout>
          </Section>

          <Section id="mrt" eyebrow="04" title={copy.mri.title} lead={copy.mri.lead}>
            <div className={styles.protocolGrid}>
              {copy.mri.protocol.map(item => (
                <div key={item.name} className={styles.protocolCard}>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.normalCard}>
              <h3>{copy.mri.normalTitle}</h3>
              <p>{copy.mri.normalText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>

          <Section id="grading" eyebrow="05" title={copy.grading.title} lead={copy.grading.lead}>
            <div className={styles.gradingFigure}>
              <ImageFigure src="/meniskus/lotysch-grading.png" alt={copy.grading.title} zoomable zoomLabel={copy.zoomImage} onZoom={() => setPreviewImage({ src: '/meniskus/lotysch-grading.png', alt: copy.grading.title })} />
            </div>
            <Table headers={copy.grading.tableHeaders} rows={copy.grading.tableRows} />
            <Callout label={copy.keyLabel}>{copy.grading.key}</Callout>
          </Section>

          <Section id="risskriterien" eyebrow="06" title={copy.tear.title} lead={copy.tear.lead}>
            <Callout type="cave" label={copy.caveLabel}>{copy.tear.cave}</Callout>
            <div className={styles.criteriaGrid}>
              {copy.tear.criteria.map((item, index) => (
                <div key={item.title} className={styles.criteriaCard}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout label={copy.keyLabel}>{copy.tear.key}</Callout>
          </Section>

          <Section id="discoider" eyebrow="08" title={copy.discoid.title} lead={copy.discoid.lead}>
            <div className={styles.discoidStats}>
              {copy.discoid.stats.map(stat => (
                <div key={stat.label} className={styles.discoidStatCard}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.text}</p>
                </div>
              ))}
            </div>
            <Table headers={copy.discoid.overviewHeaders} rows={copy.discoid.overviewRows} />
            <div className={styles.card}>
              <h3 className={styles.discoidMriTitle}>{copy.discoid.mriTitle}</h3>
              <Table headers={copy.discoid.mriHeaders} rows={copy.discoid.mriRows} />
            </div>
            <Callout label={copy.keyLabel}>{copy.discoid.key}</Callout>
          </Section>

          <Section
            id="therapie"
            eyebrow="09"
            title={<>{copy.therapy.titlePrefix || copy.therapy.title}: <span className={styles.greenTitle}>{copy.therapy.saveText || 'Save the Meniscus'}</span></>}
            lead={copy.therapy.lead}
          >
            <Table headers={copy.therapy.tableHeaders} rows={copy.therapy.tableRows} />
            <Callout label={copy.keyLabel}>{copy.therapy.key}</Callout>
          </Section>

          <Section id="fallbeispiele" eyebrow="07" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>
              {copy.cases.items.map(item => (
                <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
                  <img className={styles.caseImage} src={item.img} alt={item.title} />
                  <div className={styles.caseBody}>
                    <div className={styles.caseLabelRow}>
                      <span className={styles.caseLabel}>{item.label}</span>
                      {item.tags?.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <small>{item.credit}</small>
                    <strong>{copy.openCase}</strong>
                  </div>
                </a>
              ))}
            </div>
          </Section>

        </main>
      </div>

      {previewImage && (
        <div className={styles.imageModal} role="dialog" aria-modal="true" onClick={() => setPreviewImage(null)}>
          <div className={styles.imageModalContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.imageModalClose} onClick={() => setPreviewImage(null)} aria-label={copy.closePreview}>×</button>
            <img src={previewImage.src} alt={previewImage.alt} />
          </div>
        </div>
      )}

    </div>
  )
}
