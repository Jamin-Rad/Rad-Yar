'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'

const styles = new Proxy({}, {
  get: (_target, prop) => String(prop),
})

const MENISKUS_STYLES = `.page {
  min-height: 100vh;
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
  padding: 9px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  color: #fff;
  border: 1px solid rgba(255, 237, 213, 0.9);
  box-shadow: 0 12px 26px rgba(249, 115, 22, 0.22);
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.heroText h1 {
  margin: 0;
  font-family: var(--font-fraunces, Georgia, serif);
  font-size: clamp(30px, 4vw, 50px);
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

.heroActions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
}

.learnAction,
.learnActionDisabled {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 17px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  font-size: 14px;
  border: 1px solid #fed7aa;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  min-height: 44px;
  cursor: pointer;
  font-family: inherit;
}

.learnAction span:first-child,
.learnActionDisabled span:first-child {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.70);
}

.learnActionMcq,
.learnActionFlash,
.learnActionDisabled {
  color: #9a3412;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.08);
}

.learnAction:hover {
  transform: translateY(-1px);
}

.learnActionMcq:hover,
.learnActionFlash:hover {
  color: #7c2d12;
  border-color: #fb923c;
  background: linear-gradient(135deg, #ffedd5 0%, #e0f2fe 100%);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.16);
}

.learnActionDisabled {
  cursor: not-allowed;
  opacity: 0.86;
}

.learnAction small,
.learnActionDisabled small {
  color: #f97316;
  font-size: 10px;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

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

.sideToggleButton {
  width: 100%;
  border: 1px solid #fed7aa;
  background: linear-gradient(135deg, #fff7ed, #ffffff);
  color: #c2410c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: inherit;
  text-align: start;
  border-radius: 14px;
  padding: 10px 12px;
  margin-bottom: 10px;
  font-weight: 900;
  font-size: 13px;
}

.sideCaret {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #ffedd5;
  color: #f97316;
  font-size: 12px;
  transition: transform 0.18s ease;
}

.sideCaretOpen { transform: rotate(180deg); }
.sideNavCollapsed { display: none; }

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

.sideItemImportant {
  font-weight: 950 !important;
  color: #0d1b2a;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(22, 163, 74, 0.10));
  border: 1px solid rgba(249, 115, 22, 0.24);
}

.sideItemImportant .sideIcon {
  background: #fff7ed;
  color: #f97316;
}

.sideItemDone {
  color: #166534 !important;
  background: rgba(22, 163, 74, 0.08) !important;
  border: 1px solid rgba(22, 163, 74, 0.20) !important;
}

html[data-theme='dark'] .sideItemDone {
  color: #4ade80 !important;
  background: rgba(22,163,74,0.10) !important;
}

.readControl {
  display: grid;
  gap: 8px;
  min-width: min(100%, 270px);
}

.doneBtn {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 13px;
  min-height: 56px;
  padding: 10px 16px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  font-family: inherit;
  text-align: start;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 8px 24px var(--shadow-soft);
  transition: border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease;
}

.doneBtn:hover {
  border-color: rgba(22, 163, 74, .42);
  transform: translateY(-1px);
}

.doneBtnActive {
  background: rgba(22, 163, 74, .08);
  border-color: rgba(22, 163, 74, .42);
  color: #15803d;
}

.readCheck {
  display: grid;
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  place-items: center;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 950;
  transition: background .18s ease, border-color .18s ease;
}

.doneBtnActive .readCheck {
  border-color: #16a34a;
  background: #16a34a;
}

.readError {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 11px;
  border: 1px solid #fecaca;
  border-radius: 12px;
  background: #fff1f2;
  color: #991b1b;
  font-size: 11px;
  line-height: 1.4;
}

.readError a {
  color: #c2410c;
  font-weight: 900;
  white-space: nowrap;
}

.readBar {
  max-width: 1240px;
  margin: 14px auto 0;
  padding: 0 28px;
}

.readBar .readControl {
  width: 100%;
}

.readBarBottom {
  display: flex;
  justify-content: center;
  padding: 4px 0 18px;
}

.readBarBottom .readControl {
  width: 100%;
}

html[data-theme='dark'] .doneBtn {
  background: var(--bg-card);
  border-color: rgba(148, 163, 184, .20);
  color: var(--text);
}

html[data-theme='dark'] .doneBtnActive {
  background: rgba(22, 163, 74, .12);
  border-color: rgba(74, 222, 128, .32);
  color: #86efac;
}

html[data-theme='dark'] .readError {
  background: rgba(127, 29, 29, .22);
  border-color: rgba(248, 113, 113, .28);
  color: #fecaca;
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
  margin: -28px -28px 18px;
}

.sectionToggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 28px;
  border-radius: 28px 28px 0 0;
  border: 0;
  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(240, 249, 255, 0.96));
  box-shadow: none;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}

.sectionToggle:hover {
  background: linear-gradient(135deg, #ffedd5, #e0f2fe);
}

.sectionTitleText {
  min-width: 0;
}

.sectionToggleIcon {
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #ffffff;
  color: #f97316;
  border: 1px solid #fed7aa;
  font-weight: 950;
  box-shadow: 0 8px 18px rgba(249, 115, 22, 0.10);
  transition: transform 0.18s ease;
}

.sectionToggleIconOpen {
  transform: rotate(180deg);
}

.sectionContentCollapsed {
  display: none;
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
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.sectionLead {
  margin: 0 0 18px;
  color: #536174;
  font-size: 16px;
  line-height: 1.75;
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
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
  color: #c2410c;
  text-align: start;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 13px 15px;
  white-space: nowrap;
  border-bottom: 1px solid #fed7aa;
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

.subSectionBlock {
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(148, 163, 184, 0.22);
}
.subSectionTitle {
  margin: 0 0 8px;
  font-size: 21px;
  font-weight: 900;
  color: #0f2f4a;
}
.subSectionLead {
  margin: 0 0 16px;
  color: #44546a;
  line-height: 1.75;
}

.callout {
  border-radius: 22px;
  padding: 18px 20px;
  margin: 20px 0 0;
  background: linear-gradient(135deg, #fff7ed 0%, #ffffff 100%);
  border: 2px solid #fdba74;
  color: #7c2d12;
  box-shadow: 0 16px 34px rgba(249, 115, 22, 0.13);
  position: relative;
  overflow: hidden;
}

.callout::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: linear-gradient(180deg, #f97316, #fb923c);
}

[dir='rtl'] .callout::before {
  inset: 0 0 0 auto;
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
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  color: inherit;
  font-weight: 950;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.calloutBody {
  line-height: 1.75;
  font-weight: 800;
  position: relative;
  z-index: 1;
}

.discoidMriTitle {
  color: #f97316 !important;
  font-weight: 950 !important;
}

.greenTitle {
  color: #16a34a;
}

.gradeTable th:first-child,
.gradeTable td:first-child {
  width: 74px;
  min-width: 74px;
  text-align: center;
  vertical-align: middle;
  font-weight: 950;
  color: #0d1b2a;
}

.gradeTable td:first-child {
  font-size: 16px;
  background: rgba(249, 115, 22, 0.08);
}

[dir='rtl'] .gradeTable th:first-child,
[dir='rtl'] .gradeTable td:first-child {
  text-align: center;
}


.extendedDetails {
  margin: 12px 0 20px;
  border-radius: 20px;
  border: 1px solid #bfdbfe;
  background: linear-gradient(135deg, #f8fbff, #ffffff);
  overflow: hidden;
}

.extendedDetails summary {
  cursor: pointer;
  padding: 14px 18px;
  font-weight: 950;
  color: #075985;
  background: #e0f2fe;
}

.extendedDetailsContent {
  padding: 0 14px 14px;
}

.tearTypeTable td:first-child {
  font-weight: 950;
  color: #c2410c;
}

.tearTypeCave {
  margin-top: 20px;
}

.videoCard {
  border-radius: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #fff8f1 0%, #ffffff 100%);
  border: 1px solid #fed7aa;
  box-shadow: 0 14px 30px rgba(249, 115, 22, 0.08);
}

.videoCard h3 {
  margin: 0 0 8px;
  color: #f97316;
  font-size: 20px;
}

.videoCard p {
  margin: 0;
  color: #536174;
  line-height: 1.75;
}

.videoButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  padding: 12px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f97316, #fb923c);
  color: #ffffff;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.videoButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(249, 115, 22, 0.28);
}

.videoFrameWrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 18px;
  overflow: hidden;
  border-radius: 20px;
  background: #0d1b2a;
  border: 1px solid rgba(13, 27, 42, 0.12);
  box-shadow: 0 18px 38px rgba(13, 27, 42, 0.16);
}

.videoFrameWrap iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}


.takeHomeSection {
  border: 1px solid rgba(249, 115, 22, 0.22);
  background:
    radial-gradient(circle at top left, rgba(224, 242, 254, 0.78), transparent 24rem),
    linear-gradient(180deg, #fffaf3 0%, #ffffff 100%);
}

.takeHomeSection .sectionHead {
  text-align: center;
}

.takeHomeSection .sectionHead h2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 8px 22px 10px;
  border-radius: 999px;
  background: #ffffff;
  color: #c2410c;
  border: 1px solid #fed7aa;
  font-family: var(--font-fraunces, Georgia, serif);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 950;
  letter-spacing: -0.025em;
  box-shadow: 0 14px 28px rgba(249, 115, 22, 0.10);
}

.takeHomeSection .sectionHead h2::before {
  content: '☾';
  color: #38bdf8;
  font-size: 0.95em;
}

.takeHomeSection .sectionHead h2::after {
  content: '☽';
  color: #f97316;
  font-size: 0.95em;
}

.takeHomeBox {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 28px;
  background:
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.16), transparent 22rem),
    radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.14), transparent 20rem),
    linear-gradient(135deg, #ffffff 0%, #fff7ed 58%, #f0f9ff 100%);
  color: #172033;
  border: 1px solid rgba(253, 186, 116, 0.70);
  box-shadow: 0 22px 52px rgba(23, 32, 51, 0.10);
}

.takeHomeBox::before {
  content: '';
  position: absolute;
  inset: 18px 18px auto auto;
  width: 92px;
  height: 92px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(14, 165, 233, 0.14));
  transform: rotate(14deg);
}

[dir='rtl'] .takeHomeBox::before {
  inset: 18px auto auto 18px;
}

.takeHomeIntro {
  position: relative;
  z-index: 1;
  margin: 0 0 18px;
  max-width: 780px;
  color: #425066;
  font-size: 16px;
  line-height: 1.85;
  font-weight: 750;
}

.takeHomeList {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
}

.takeHomeItem {
  display: grid;
  grid-template-columns: 66px 1fr;
  gap: 14px;
  align-items: start;
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 10px 24px rgba(23, 32, 51, 0.05);
}

.takeHomeNumber {
  width: 58px;
  height: 46px;
  display: inline-grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffedd5, #e0f2fe);
  color: #c2410c;
  border: 1px solid #fed7aa;
  font-size: 14px;
  font-weight: 950;
}

.takeHomeItem h3 {
  margin: 0 0 6px;
  color: #075985;
  font-family: var(--font-fraunces, Georgia, serif);
  font-size: 19px;
  line-height: 1.35;
  font-weight: 950;
  letter-spacing: -0.015em;
}

.takeHomeItem p {
  margin: 0;
  color: #334155;
  font-family: var(--font-manrope, system-ui, sans-serif);
  line-height: 1.78;
  font-weight: 780;
  white-space: pre-line;
}

[dir='rtl'] .takeHomeItem {
  grid-template-columns: 66px 1fr;
  text-align: right;
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
[dir='rtl'] .bulletItem,
[dir='rtl'] .videoCard,
[dir='rtl'] .takeHomeBox {
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
  .readBar { padding: 0 14px; }
  .readBar .readControl { max-width: none; }
  .layout { padding: 14px 14px 44px; }
  .heroText { padding: 24px; border-radius: 22px; }
  .heroText h1 { font-size: 22px !important; line-height: 1.1 !important; }
  .heroText p { font-size: 14px; }
  .sectionHead h2 { font-size: 16px !important; }
  .subSectionTitle { font-size: 15px !important; }
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
    margin: -18px -18px 16px;
  }

  .sectionToggle {
    padding: 16px 18px;
    border-radius: 22px 22px 0 0;
  }

  .sectionHead h2 {
    font-size: clamp(24px, 8vw, 34px);
    line-height: 1.12;
  }

  .sectionLead,
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

  
.extendedDetails {
  margin: 12px 0 20px;
  border-radius: 20px;
  border: 1px solid #bfdbfe;
  background: linear-gradient(135deg, #f8fbff, #ffffff);
  overflow: hidden;
}

.extendedDetails summary {
  cursor: pointer;
  padding: 14px 18px;
  font-weight: 950;
  color: #075985;
  background: #e0f2fe;
}

.extendedDetailsContent {
  padding: 0 14px 14px;
}

.tearTypeTable td:first-child {
  font-weight: 950;
  color: #c2410c;
}

.tearTypeCave {
  margin-top: 20px;
}

.videoCard {
    padding: 18px;
    border-radius: 20px;
  }

  .videoFrameWrap {
    border-radius: 16px;
  }

  .takeHomeBox {
    padding: 18px;
    border-radius: 22px;
  }

  .takeHomeIntro {
    font-size: 16px;
  }

  .takeHomeItem {
    grid-template-columns: 58px 1fr;
    gap: 12px;
    padding: 14px;
    border-radius: 18px;
  }

  .takeHomeNumber {
    width: 52px;
    height: 40px;
    border-radius: 14px;
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

/* ── DARK THEME ───────────────────────────────────── */
html[data-theme='dark'] .page {
  background:
    radial-gradient(circle at top left, rgba(249,115,22,0.10), transparent 32rem),
    radial-gradient(circle at 88% 0%, rgba(14,165,233,0.08), transparent 28rem),
    linear-gradient(180deg, #07111f 0%, #0b1526 100%);
  color: #e5edf8;
}

html[data-theme='dark'] .heroText,
html[data-theme='dark'] .heroStats,
html[data-theme='dark'] .mcqStrip,
html[data-theme='dark'] .sidebar,
html[data-theme='dark'] .section,
html[data-theme='dark'] .card,
html[data-theme='dark'] .cardAccent,
html[data-theme='dark'] .cardDanger,
html[data-theme='dark'] .normalCard,
html[data-theme='dark'] .figure,
html[data-theme='dark'] .protocolCard,
html[data-theme='dark'] .criteriaCard,
html[data-theme='dark'] .bulletCard,
html[data-theme='dark'] .bulletItem,
html[data-theme='dark'] .tableWrap,
html[data-theme='dark'] .caseCardLink,
html[data-theme='dark'] .extendedDetails,
html[data-theme='dark'] .videoCard,
html[data-theme='dark'] .takeHomeSection,
html[data-theme='dark'] .takeHomeBox,
html[data-theme='dark'] .takeHomeItem,
html[data-theme='dark'] .mobileTocPanel,
html[data-theme='dark'] .imageModalContent {
  background: rgba(15,23,42,0.94) !important;
  border-color: rgba(148,163,184,0.18) !important;
  color: #e5edf8;
  box-shadow: 0 18px 45px rgba(0,0,0,0.24);
}

html[data-theme='dark'] .heroText {
  background:
    radial-gradient(circle at top right, rgba(249,115,22,0.14), transparent 18rem),
    linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(17,24,39,0.96) 100%) !important;
}

html[data-theme='dark'] .sectionToggle,
html[data-theme='dark'] .takeHomeSection .sectionHead h2,
html[data-theme='dark'] .extendedDetails summary,
html[data-theme='dark'] .mobileTocButton,
html[data-theme='dark'] .mobileTocHeader button,
html[data-theme='dark'] .mobileTocPanel .sideItem {
  background: rgba(30,41,59,0.92) !important;
  border-color: rgba(148,163,184,0.18) !important;
  color: #f8fafc !important;
}

html[data-theme='dark'] .sectionToggle:hover,
html[data-theme='dark'] .sideItem:hover {
  background: rgba(51,65,85,0.82) !important;
}

html[data-theme='dark'] .heroText h1,
html[data-theme='dark'] .mcqStrip strong,
html[data-theme='dark'] .sectionHead h2,
html[data-theme='dark'] .card h3,
html[data-theme='dark'] .cardAccent h3,
html[data-theme='dark'] .cardDanger h3,
html[data-theme='dark'] .normalCard h3,
html[data-theme='dark'] .protocolCard h3,
html[data-theme='dark'] .criteriaCard h3,
html[data-theme='dark'] .caseBody h3,
html[data-theme='dark'] .plainList strong,
html[data-theme='dark'] .subSectionTitle,
html[data-theme='dark'] .takeHomeItem h3,
html[data-theme='dark'] .mobileTocHeader strong {
  color: #f8fafc !important;
  text-shadow: none;
}

html[data-theme='dark'] .breadcrumb,
html[data-theme='dark'] .heroText p,
html[data-theme='dark'] .mcqStrip span,
html[data-theme='dark'] .sectionLead,
html[data-theme='dark'] .card p,
html[data-theme='dark'] .cardAccent p,
html[data-theme='dark'] .normalCard p,
html[data-theme='dark'] .protocolCard p,
html[data-theme='dark'] .criteriaCard p,
html[data-theme='dark'] .bulletItem p,
html[data-theme='dark'] .table td,
html[data-theme='dark'] .figure figcaption,
html[data-theme='dark'] .caseBody p,
html[data-theme='dark'] .caseBody small,
html[data-theme='dark'] .sideItem,
html[data-theme='dark'] .sideTitle,
html[data-theme='dark'] .subSectionLead,
html[data-theme='dark'] .videoCard p,
html[data-theme='dark'] .takeHomeIntro,
html[data-theme='dark'] .takeHomeItem p,
html[data-theme='dark'] .mobileTocButton strong {
  color: #b8c4d8 !important;
}

html[data-theme='dark'] .sideTitle,
html[data-theme='dark'] .mobileTocHeader,
html[data-theme='dark'] .subSectionBlock,
html[data-theme='dark'] .table td {
  border-color: rgba(148,163,184,0.14) !important;
}

html[data-theme='dark'] .sourceBadge,
html[data-theme='dark'] .caseLabel,
html[data-theme='dark'] .sideItemImportant,
html[data-theme='dark'] .sideItemActive,
html[data-theme='dark'] .callout,
html[data-theme='dark'] .callout.success,
html[data-theme='dark'] .callout.cave {
  background: rgba(249,115,22,0.14) !important;
  border-color: rgba(249,115,22,0.28) !important;
  color: #fdba74 !important;
}

html[data-theme='dark'] .sideItemActive {
  color: #fdba74 !important;
}

html[data-theme='dark'] .sideIcon,
html[data-theme='dark'] .sideItemActive .sideIcon,
html[data-theme='dark'] .sideItemImportant .sideIcon,
html[data-theme='dark'] .mobileTocIcon,
html[data-theme='dark'] .bulletItem span,
html[data-theme='dark'] .criteriaCard span,
html[data-theme='dark'] .sectionToggleIcon,
html[data-theme='dark'] .learnAction span:first-child,
html[data-theme='dark'] .learnActionDisabled span:first-child,
html[data-theme='dark'] .takeHomeNumber {
  background: rgba(249,115,22,0.16) !important;
  color: #fdba74 !important;
  border-color: rgba(249,115,22,0.28) !important;
}

html[data-theme='dark'] .learnAction,
html[data-theme='dark'] .learnActionDisabled,
html[data-theme='dark'] .learnActionMcq,
html[data-theme='dark'] .learnActionFlash {
  background: rgba(30,41,59,0.92) !important;
  border-color: rgba(249,115,22,0.26) !important;
  color: #fdba74 !important;
}

html[data-theme='dark'] .learnAction:hover,
html[data-theme='dark'] .learnActionMcq:hover,
html[data-theme='dark'] .learnActionFlash:hover {
  background: rgba(51,65,85,0.92) !important;
  border-color: rgba(249,115,22,0.46) !important;
}

html[data-theme='dark'] .cardDanger ul,
html[data-theme='dark'] .calloutBody {
  color: #fecaca;
}

html[data-theme='dark'] .callout:not(.cave):not(.success) .calloutBody {
  color: #ffedd5;
}

html[data-theme='dark'] .callout.success .calloutBody {
  color: #bbf7d0;
}

html[data-theme='dark'] .table th {
  background: rgba(30,41,59,0.95) !important;
  color: #f8fafc !important;
}

html[data-theme='dark'] .table tr:nth-child(even) td {
  background: rgba(30,41,59,0.45) !important;
}

html[data-theme='dark'] .gradeTable td:first-child {
  background: rgba(249,115,22,0.12) !important;
  color: #fdba74 !important;
}

html[data-theme='dark'] .extendedDetails summary {
  color: #7dd3fc !important;
}

html[data-theme='dark'] .tearTypeTable td:first-child,
html[data-theme='dark'] .videoCard h3,
html[data-theme='dark'] .discoidMriTitle,
html[data-theme='dark'] .caseBody strong,
html[data-theme='dark'] .breadLink {
  color: #fb923c !important;
}

html[data-theme='dark'] .greenTitle {
  color: #86efac !important;
}

html[data-theme='dark'] .heroStatCard:nth-child(3),
html[data-theme='dark'] .discoidStatCard:nth-child(3) {
  background: rgba(30,41,59,0.94) !important;
  color: #f8fafc !important;
  border-color: rgba(148,163,184,0.18) !important;
}

html[data-theme='dark'] .mobileTocBar {
  background: rgba(7,17,31,0.88) !important;
  border-color: rgba(148,163,184,0.14) !important;
}

html[data-theme='dark'] .imageModalContent img,
html[data-theme='dark'] .caseImage,
html[data-theme='dark'] .videoFrameWrap {
  background: #020617 !important;
}


/* ── MOBILE POLISH: iPhone / small screens ─────────────────────────────── */
@media (max-width: 760px) {
  .page {
    padding-top: 64px;
    padding-bottom: calc(96px + env(safe-area-inset-bottom));
    overflow-x: hidden;
  }

  .header {
    padding: 16px 12px 10px;
  }

  .breadcrumb {
    gap: 6px;
    font-size: 11px;
    line-height: 1.45;
  }

  .heroGrid {
    gap: 12px;
  }

  .heroText {
    padding: 20px;
    border-radius: 22px;
  }

  .heroText::before {
    width: 68px;
    height: 68px;
    border-radius: 22px;
    opacity: 0.65;
  }

  .heroText::after {
    left: 20px;
    right: 20px;
    height: 4px;
  }

  .sourceBadge {
    margin-bottom: 12px;
    padding: 7px 11px;
    font-size: 10px;
    letter-spacing: 0.06em;
  }

  .heroText h1 {
    font-size: clamp(34px, 12vw, 48px);
    line-height: 1.02;
    letter-spacing: -0.04em;
    overflow-wrap: anywhere;
  }

  .heroText p {
    margin: 14px 0 18px;
    font-size: 15px;
    line-height: 1.68;
  }

  .heroActions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .learnAction,
  .learnActionDisabled {
    width: 100%;
    min-height: 46px;
    justify-content: flex-start;
    padding: 10px 13px;
    font-size: 13px;
  }

  .heroStats {
    padding: 10px;
    border-radius: 20px;
  }

  .heroStatCard {
    padding: 14px;
    border-radius: 16px;
  }

  .heroStatCard strong {
    font-size: 26px;
  }

  .mobileTocBar {
    top: 64px;
    padding: 8px 12px;
  }

  .mobileTocButton {
    min-height: 50px;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 9px;
    border-radius: 16px;
    padding: 9px 11px;
  }

  .mobileTocButton > span:not(.mobileTocIcon) {
    min-width: 0;
  }

  .mobileTocButton strong {
    grid-column: 1 / -1;
    justify-self: stretch;
    white-space: normal;
    text-overflow: clip;
    line-height: 1.35;
    font-size: 12px;
    margin-top: 1px;
  }

  [dir='rtl'] .mobileTocButton,
  [dir='rtl'] .mobileTocButton strong {
    text-align: right;
  }

  .mobileTocOverlay {
    padding: 12px;
  }

  .mobileTocPanel {
    width: 100%;
    max-height: min(82vh, 640px);
    border-radius: 24px 24px 20px 20px;
    padding: 12px;
  }

  .mobileTocPanel .sideItem {
    min-height: 46px;
    border-radius: 15px;
    font-size: 14px;
  }

  .layout,
  [dir='rtl'] .layout {
    padding: 12px 12px 28px;
    gap: 18px;
  }

  .main {
    gap: 16px;
  }

  .section {
    padding: 16px;
    border-radius: 20px;
    scroll-margin-top: 140px;
  }

  .sectionHead {
    margin: -16px -16px 14px;
  }

  .sectionToggle {
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 20px 20px 0 0;
  }

  .sectionHead h2 {
    font-size: clamp(22px, 7vw, 30px);
    line-height: 1.16;
    letter-spacing: -0.02em;
    overflow-wrap: anywhere;
  }

  .sectionToggleIcon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    margin-top: 2px;
  }

  .sectionLead,
  .card p,
  .cardAccent p,
  .cardDanger p,
  .normalCard p,
  .protocolCard p,
  .criteriaCard p,
  .bulletItem p,
  .calloutBody,
  .subSectionLead,
  .takeHomeIntro,
  .takeHomeItem p {
    font-size: 15px;
    line-height: 1.72;
  }

  .splitGrid,
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid,
  .caseGrid,
  .discoidStats {
    gap: 10px;
  }

  .card,
  .cardAccent,
  .cardDanger,
  .normalCard,
  .protocolCard,
  .criteriaCard,
  .figure,
  .videoCard {
    padding: 14px;
    border-radius: 16px;
  }

  .bulletCard {
    padding: 8px;
    border-radius: 16px;
  }

  .bulletItem {
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 9px;
    padding: 11px;
    border-radius: 14px;
  }

  .bulletItem span {
    width: 28px;
    height: 28px;
  }

  .figure img {
    max-height: 260px;
    border-radius: 14px;
  }

  .gradingFigure .figure img {
    max-height: 360px;
  }

  .figureZoomButton span {
    right: 10px;
    bottom: 10px;
    padding: 7px 10px;
    font-size: 11px;
  }

  [dir='rtl'] .figureZoomButton span {
    right: auto;
    left: 10px;
  }

  .tableWrap {
    margin: 12px 0;
    border-radius: 16px;
    overflow-x: visible;
  }

  .table {
    min-width: 0 !important;
    width: 100%;
    table-layout: fixed;
  }

  .table th {
    white-space: normal;
    overflow-wrap: anywhere;
    padding: 10px 8px;
    font-size: 10.5px;
    letter-spacing: 0.03em;
    line-height: 1.35;
  }

  .table td {
    padding: 10px 8px;
    font-size: 12.5px;
    line-height: 1.55;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .gradeTable th:first-child,
  .gradeTable td:first-child {
    width: 52px;
    min-width: 0;
  }

  .extendedDetails summary {
    padding: 13px 14px;
  }

  .extendedDetailsContent {
    padding: 0 8px 8px;
  }

  .takeHomeSection .sectionHead h2 {
    width: 100%;
    padding: 8px 12px 9px;
    font-size: clamp(22px, 7vw, 29px);
  }

  .takeHomeBox {
    padding: 16px;
    border-radius: 20px;
  }

  .takeHomeItem,
  [dir='rtl'] .takeHomeItem {
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 10px;
    padding: 12px;
    border-radius: 16px;
  }

  .takeHomeNumber {
    width: 44px;
    height: 38px;
    border-radius: 13px;
  }

  .caseImage {
    height: auto;
    max-height: 220px;
    width: 100%;
    object-fit: contain;
    padding: 8px;
  }

  .caseBody {
    padding: 14px;
  }

  .imageModal {
    padding: 8px;
  }

  .imageModalContent img {
    max-height: 78vh;
  }

  .mobileMcqFab {
    left: 12px;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    min-height: 52px;
    border-radius: 16px;
  }
}

@media (max-width: 400px) {
  .heroText {
    padding: 18px;
  }

  .heroText h1 {
    font-size: clamp(32px, 12vw, 44px);
  }

  .section {
    padding: 14px;
  }

  .sectionHead {
    margin: -14px -14px 12px;
  }

  .sectionToggle {
    padding: 13px 14px;
  }

  .sectionHead h2 {
    font-size: clamp(21px, 7.2vw, 28px);
  }

  .table th {
    padding: 9px 6px;
    font-size: 10px;
  }

  .table td {
    padding: 9px 6px;
    font-size: 11.5px;
  }

  .gradeTable th:first-child,
  .gradeTable td:first-child {
    width: 46px;
  }
}


/* ── FINAL MOBILE FIX: no horizontal scrolling, no mobile Inhaltsverzeichnis ── */
@media (max-width: 900px) {
  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden !important;
  }

  .page,
  .page * {
    box-sizing: border-box;
  }

  .page {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden !important;
    padding-top: 64px;
    padding-bottom: calc(82px + env(safe-area-inset-bottom));
  }

  .header,
  .layout,
  .main,
  .heroGrid,
  .heroText,
  .section,
  .sectionContent,
  .splitGrid,
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid,
  .caseGrid,
  .discoidStats,
  .takeHomeBox,
  .card,
  .cardAccent,
  .cardDanger,
  .normalCard,
  .protocolCard,
  .criteriaCard,
  .bulletCard,
  .figure,
  .videoCard,
  .callout,
  .extendedDetails {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .header {
    padding-left: 10px;
    padding-right: 10px;
    overflow-x: hidden;
  }

  .layout,
  [dir='rtl'] .layout {
    display: block;
    width: 100%;
    max-width: 100vw;
    padding: 10px 10px 24px;
    overflow-x: hidden;
  }

  .main {
    display: grid;
    gap: 14px;
    overflow-x: hidden;
  }

  .mobileTocBar,
  .mobileTocOverlay,
  .sidebar,
  .layout > .sidebar {
    display: none !important;
  }

  .heroText {
    padding: 18px;
    border-radius: 20px;
  }

  .heroText h1 {
    font-size: clamp(32px, 11vw, 44px);
    max-width: 100%;
  }

  .heroActions {
    width: 100%;
    max-width: 100%;
  }

  .learnAction,
  .learnActionDisabled {
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
  }

  .section {
    padding: 14px;
    border-radius: 18px;
    scroll-margin-top: 76px;
  }

  .sectionHead {
    margin: -14px -14px 10px;
  }

  .sectionToggle {
    padding: 14px;
    border-radius: 18px;
    align-items: center;
  }

  .sectionContentCollapsed {
    display: none !important;
  }

  .sectionHead h2 {
    font-size: clamp(21px, 6.8vw, 28px);
    line-height: 1.18;
    word-break: normal;
    overflow-wrap: anywhere;
  }

  .sectionToggleIcon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
  }

  .splitGrid,
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid,
  .caseGrid,
  .discoidStats {
    grid-template-columns: 1fr !important;
  }

  .figure img,
  .caseImage,
  .videoFrameWrap,
  .figureZoomButton,
  .figureZoomButton img {
    max-width: 100%;
    min-width: 0;
  }

  .caseImage {
    height: auto;
    max-height: 220px;
    object-fit: contain;
  }

  .tableWrap {
    width: 100%;
    max-width: 100%;
    overflow: visible !important;
    border: 0;
    background: transparent;
    margin: 12px 0;
  }

  .table,
  .table thead,
  .table tbody,
  .table tr,
  .table th,
  .table td {
    display: block;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }

  .table {
    border-collapse: separate;
    border-spacing: 0;
    table-layout: auto;
  }

  .table thead {
    display: none;
  }

  .table tbody {
    display: grid;
    gap: 10px;
  }

  .table tr {
    padding: 10px 12px;
    border: 1px solid #dfe6f0;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 8px 18px rgba(23, 32, 51, 0.04);
    overflow: hidden;
  }

  .table td,
  .table tr:nth-child(even) td,
  .gradeTable td:first-child {
    display: grid;
    grid-template-columns: minmax(78px, 34%) minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 9px 0;
    border: 0;
    border-bottom: 1px solid #edf1f7;
    background: transparent !important;
    color: #425066;
    text-align: start;
    font-size: 13px;
    line-height: 1.55;
    white-space: normal;
    word-break: normal;
    overflow-wrap: anywhere;
  }

  .table td:last-child {
    border-bottom: 0;
  }

  .table td::before {
    content: attr(data-label);
    color: #c2410c;
    font-size: 11px;
    font-weight: 950;
    line-height: 1.35;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }

  [dir='rtl'] .table td,
  [dir='rtl'] .gradeTable td:first-child {
    text-align: right;
  }

  .takeHomeItem,
  [dir='rtl'] .takeHomeItem,
  .bulletItem {
    grid-template-columns: 42px minmax(0, 1fr);
  }
}

@media (max-width: 430px) {
  .header,
  .layout,
  [dir='rtl'] .layout {
    padding-left: 8px;
    padding-right: 8px;
  }

  .heroText,
  .section {
    border-radius: 16px;
  }

  .section {
    padding: 12px;
  }

  .sectionHead {
    margin: -12px -12px 8px;
  }

  .sectionToggle {
    padding: 12px;
    border-radius: 16px;
  }

  .table tr {
    padding: 10px;
  }

  .table td,
  .gradeTable td:first-child {
    grid-template-columns: 1fr;
    gap: 4px;
    font-size: 12.5px;
  }
}

html[data-theme='dark'] .table tr {
  background: rgba(15, 23, 42, 0.88) !important;
  border-color: rgba(148, 163, 184, 0.18) !important;
}

html[data-theme='dark'] .table td,
html[data-theme='dark'] .gradeTable td:first-child {
  border-color: rgba(148, 163, 184, 0.14) !important;
  color: #dbeafe !important;
}

html[data-theme='dark'] .table td::before {
  color: #fb923c !important;
}


/* ── MOBILE LOCKDOWN V2: iPhone width exactly, no horizontal scrolling, no mobile TOC, collapsed sections ── */
@media (max-width: 900px) {
  :root,
  html,
  body {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: hidden !important;
  }

  body {
    position: relative;
  }

  .page,
  .page::before,
  .page::after,
  .page * ,
  .page *::before,
  .page *::after {
    box-sizing: border-box !important;
  }

  .page {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: clip !important;
    touch-action: pan-y;
  }

  @supports not (overflow-x: clip) {
    .page { overflow-x: hidden !important; }
  }

  .header,
  .layout,
  [dir='rtl'] .layout,
  .main,
  .heroGrid,
  .heroText,
  .heroActions,
  .section,
  .sectionHead,
  .sectionToggle,
  .sectionTitleText,
  .sectionContent,
  .splitGrid,
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid,
  .caseGrid,
  .discoidStats,
  .card,
  .cardAccent,
  .cardDanger,
  .normalCard,
  .protocolCard,
  .criteriaCard,
  .bulletCard,
  .bulletItem,
  .figure,
  .callout,
  .extendedDetails,
  .videoCard,
  .takeHomeBox,
  .takeHomeItem,
  .tableWrap,
  .imageModalContent {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .layout,
  [dir='rtl'] .layout {
    display: block !important;
    grid-template-columns: none !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    overflow-x: hidden !important;
  }

  .header {
    padding-left: 10px !important;
    padding-right: 10px !important;
    overflow-x: hidden !important;
  }

  .main {
    display: grid !important;
    gap: 14px !important;
    overflow-x: hidden !important;
  }

  /* Auf Mobile kein Inhaltsverzeichnis – weder Sidebar noch frühere mobile TOC-Varianten. */
  .sidebar,
  .layout > .sidebar,
  aside.sidebar,
  .mobileTocBar,
  .mobileTocOverlay,
  .mobileTocPanel {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* Auf Mobile sind alle Abschnitte zuerst zugeklappt; Klick auf Titel klappt einzeln auf. */
  .section:not([data-open='true']) > .sectionContent {
    display: none !important;
  }

  .section[data-open='true'] > .sectionContent {
    display: block !important;
  }

  .section[data-open='false'] .sectionToggle {
    border-radius: 18px !important;
  }

  .section[data-open='true'] .sectionToggle {
    border-radius: 18px 18px 0 0 !important;
  }

  .breadcrumb,
  .sourceBadge,
  .heroText h1,
  .heroText p,
  .learnAction,
  .learnActionDisabled,
  .sectionHead h2,
  .sectionLead,
  .card h3,
  .card p,
  .calloutBody,
  .subSectionTitle,
  .subSectionLead,
  .takeHomeItem h3,
  .takeHomeItem p {
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-wrap: anywhere !important;
    word-break: normal !important;
  }

  .breadcrumb {
    display: flex !important;
    flex-wrap: wrap !important;
  }

  .heroText {
    overflow: hidden !important;
  }

  .heroActions {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 9px !important;
  }

  .learnAction,
  .learnActionDisabled {
    display: flex !important;
    justify-content: flex-start !important;
    white-space: normal !important;
  }

  .sectionToggle {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    overflow: hidden !important;
  }

  .sectionTitleText {
    flex: 1 1 auto !important;
  }

  .sectionToggleIcon {
    flex: 0 0 30px !important;
  }

  .splitGrid,
  .zoneGrid,
  .protocolGrid,
  .criteriaGrid,
  .caseGrid,
  .discoidStats {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
  }

  img,
  iframe,
  video,
  svg,
  canvas,
  .figure img,
  .caseImage,
  .videoFrameWrap,
  .figureZoomButton,
  .figureZoomButton img {
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .videoFrameWrap iframe {
    width: 100% !important;
  }

  /* Tabellen werden auf Mobile zu Karten. Dadurch kann keine Tabelle mehr breiter als das iPhone sein. */
  .tableWrap {
    overflow-x: hidden !important;
    border: 0 !important;
    background: transparent !important;
  }

  .table,
  .table thead,
  .table tbody,
  .table tr,
  .table th,
  .table td {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .table {
    table-layout: auto !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }

  .table thead {
    display: none !important;
  }

  .table tbody {
    display: grid !important;
    gap: 10px !important;
  }

  .table tr {
    overflow: hidden !important;
    padding: 10px 12px !important;
    border-radius: 16px !important;
    border: 1px solid #dfe6f0 !important;
    background: #ffffff !important;
  }

  .table td,
  .table tr:nth-child(even) td,
  .gradeTable td:first-child,
  .tearTypeTable td:first-child {
    display: grid !important;
    grid-template-columns: minmax(0, 34%) minmax(0, 1fr) !important;
    gap: 9px !important;
    align-items: start !important;
    padding: 9px 0 !important;
    border: 0 !important;
    border-bottom: 1px solid #edf1f7 !important;
    background: transparent !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    word-break: normal !important;
  }

  .table td:last-child {
    border-bottom: 0 !important;
  }

  .table td::before {
    content: attr(data-label) !important;
    color: #c2410c !important;
    font-size: 10.5px !important;
    font-weight: 950 !important;
    line-height: 1.35 !important;
    letter-spacing: 0.03em !important;
    text-transform: uppercase !important;
    overflow-wrap: anywhere !important;
  }
}

@media (max-width: 430px) {
  .header,
  .layout,
  [dir='rtl'] .layout {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .heroText {
    padding: 16px !important;
    border-radius: 16px !important;
  }

  .section {
    padding: 12px !important;
    border-radius: 16px !important;
  }

  .sectionHead {
    margin: -12px -12px 8px !important;
  }

  .sectionToggle {
    padding: 12px !important;
  }

  .section[data-open='false'] .sectionToggle,
  .section[data-open='true'] .sectionToggle {
    border-radius: 16px !important;
  }

  .section[data-open='true'] .sectionToggle {
    border-radius: 16px 16px 0 0 !important;
  }

  .sectionHead h2 {
    font-size: clamp(20px, 6.7vw, 27px) !important;
  }

  .table tr {
    padding: 10px !important;
  }

  .table td,
  .gradeTable td:first-child,
  .tearTypeTable td:first-child {
    grid-template-columns: 1fr !important;
    gap: 4px !important;
    font-size: 12.5px !important;
  }
}

html[data-theme='dark'] .table tr {
  background: rgba(15, 23, 42, 0.88) !important;
  border-color: rgba(148, 163, 184, 0.18) !important;
}

html[data-theme='dark'] .table td,
html[data-theme='dark'] .gradeTable td:first-child,
html[data-theme='dark'] .tearTypeTable td:first-child {
  border-color: rgba(148, 163, 184, 0.14) !important;
  color: #dbeafe !important;
}

html[data-theme='dark'] .table td::before {
  color: #fb923c !important;
}


/* Desktop-Webseite im mobilen Browser: Safari/Chrome darf die Desktop-Ansicht erzwingen. */
@media (max-width: 900px) {
  html[data-meniskus-layout='desktop'],
  body[data-meniskus-layout='desktop'] {
    width: auto !important;
    max-width: none !important;
    min-width: 1100px !important;
    overflow-x: auto !important;
  }

  .page[data-meniskus-layout='desktop'] {
    width: 1100px !important;
    max-width: none !important;
    min-width: 1100px !important;
    overflow-x: visible !important;
    padding-top: 64px !important;
    touch-action: auto !important;
  }

  .page[data-meniskus-layout='desktop'] .header {
    width: auto !important;
    max-width: 1240px !important;
    min-width: 0 !important;
    padding: 28px 28px 16px !important;
    overflow-x: visible !important;
  }

  .page[data-meniskus-layout='desktop'] .layout,
  .page[data-meniskus-layout='desktop'][dir='rtl'] .layout {
    width: auto !important;
    max-width: 1240px !important;
    min-width: 0 !important;
    display: grid !important;
    grid-template-columns: 260px minmax(0, 1fr) !important;
    gap: 24px !important;
    padding: 22px 28px 70px !important;
    overflow-x: visible !important;
  }

  .page[data-meniskus-layout='desktop'][dir='rtl'] .layout {
    grid-template-columns: minmax(0, 1fr) 260px !important;
  }

  .page[data-meniskus-layout='desktop'] .layout > .sidebar,
  .page[data-meniskus-layout='desktop'] aside.sidebar {
    display: block !important;
    visibility: visible !important;
    pointer-events: auto !important;
    position: sticky !important;
    top: 88px !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    order: 0 !important;
  }

  .page[data-meniskus-layout='desktop'][dir='rtl'] .sidebar {
    order: 2 !important;
  }

  .page[data-meniskus-layout='desktop'] .mobileTocBar,
  .page[data-meniskus-layout='desktop'] .mobileTocOverlay,
  .page[data-meniskus-layout='desktop'] .mobileTocPanel,
  .page[data-meniskus-layout='desktop'] .mobileMcqFab {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  .page[data-meniskus-layout='desktop'] .main {
    width: auto !important;
    max-width: 100% !important;
    min-width: 0 !important;
    display: grid !important;
    gap: 24px !important;
    overflow-x: visible !important;
  }

  .page[data-meniskus-layout='desktop'] .heroGrid {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 300px !important;
    gap: 22px !important;
  }

  .page[data-meniskus-layout='desktop'] .heroText {
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    padding: 38px !important;
    border-radius: 34px !important;
    overflow: hidden !important;
  }

  .page[data-meniskus-layout='desktop'] .heroText h1 {
    font-size: clamp(30px, 4vw, 50px) !important;
    line-height: 0.92 !important;
  }

  .page[data-meniskus-layout='desktop'] .heroActions {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 10px !important;
  }

  .page[data-meniskus-layout='desktop'] .learnAction,
  .page[data-meniskus-layout='desktop'] .learnActionDisabled {
    width: auto !important;
    min-height: 44px !important;
    justify-content: flex-start !important;
    white-space: normal !important;
    padding: 11px 17px !important;
    font-size: 14px !important;
  }

  .page[data-meniskus-layout='desktop'] .section {
    width: auto !important;
    max-width: 100% !important;
    min-width: 0 !important;
    padding: 28px !important;
    border-radius: 28px !important;
    scroll-margin-top: 92px !important;
  }

  .page[data-meniskus-layout='desktop'] .sectionHead {
    margin: -28px -28px 18px !important;
    width: auto !important;
    max-width: none !important;
  }

  .page[data-meniskus-layout='desktop'] .sectionToggle {
    padding: 20px 28px !important;
    border-radius: 28px 28px 0 0 !important;
  }

  .page[data-meniskus-layout='desktop'] .sectionHead h2 {
    font-size: clamp(32px, 4.5vw, 48px) !important;
    line-height: 1.02 !important;
  }

  .page[data-meniskus-layout='desktop'] .sectionContent,
  .page[data-meniskus-layout='desktop'] .section:not([data-open='true']) > .sectionContent,
  .page[data-meniskus-layout='desktop'] .section[data-open='true'] > .sectionContent {
    display: block !important;
  }

  .page[data-meniskus-layout='desktop'] .splitGrid {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.9fr) !important;
    gap: 18px !important;
  }

  .page[data-meniskus-layout='desktop'] .zoneGrid,
  .page[data-meniskus-layout='desktop'] .protocolGrid,
  .page[data-meniskus-layout='desktop'] .criteriaGrid,
  .page[data-meniskus-layout='desktop'] .discoidStats {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 14px !important;
  }

  .page[data-meniskus-layout='desktop'] .caseGrid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 18px !important;
  }

  .page[data-meniskus-layout='desktop'] .card,
  .page[data-meniskus-layout='desktop'] .cardAccent,
  .page[data-meniskus-layout='desktop'] .cardDanger,
  .page[data-meniskus-layout='desktop'] .normalCard,
  .page[data-meniskus-layout='desktop'] .protocolCard,
  .page[data-meniskus-layout='desktop'] .criteriaCard,
  .page[data-meniskus-layout='desktop'] .figure,
  .page[data-meniskus-layout='desktop'] .callout,
  .page[data-meniskus-layout='desktop'] .extendedDetails,
  .page[data-meniskus-layout='desktop'] .videoCard,
  .page[data-meniskus-layout='desktop'] .takeHomeBox {
    width: auto !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }

  .page[data-meniskus-layout='desktop'] .tableWrap {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow-x: auto !important;
    border: 1px solid #dfe6f0 !important;
    border-radius: 20px !important;
    background: #fff !important;
    margin: 18px 0 !important;
  }

  .page[data-meniskus-layout='desktop'] .table {
    display: table !important;
    width: 100% !important;
    min-width: 620px !important;
    max-width: none !important;
    table-layout: auto !important;
    border-collapse: collapse !important;
    border-spacing: 0 !important;
  }

  .page[data-meniskus-layout='desktop'] .table thead { display: table-header-group !important; }
  .page[data-meniskus-layout='desktop'] .table tbody { display: table-row-group !important; }
  .page[data-meniskus-layout='desktop'] .table tr { display: table-row !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; }

  .page[data-meniskus-layout='desktop'] .table th,
  .page[data-meniskus-layout='desktop'] .table td,
  .page[data-meniskus-layout='desktop'] .gradeTable td:first-child,
  .page[data-meniskus-layout='desktop'] .tearTypeTable td:first-child {
    display: table-cell !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    grid-template-columns: none !important;
    gap: 0 !important;
    padding: 14px 15px !important;
    border-bottom: 1px solid #edf1f7 !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }

  .page[data-meniskus-layout='desktop'] .table th {
    padding: 13px 15px !important;
    white-space: nowrap !important;
  }

  .page[data-meniskus-layout='desktop'] .table td::before {
    content: none !important;
  }
}

/* Mobile tables follow the compact, horizontally scrollable lesson-table pattern. */
@media (max-width: 900px) {
  .page:not([data-meniskus-layout='desktop']) .tableWrap {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    border: 1px solid #dfe6f0 !important;
    border-radius: 20px !important;
    background: #fff !important;
    margin: 18px 0 !important;
    -webkit-overflow-scrolling: touch;
  }

  .page:not([data-meniskus-layout='desktop']) .table {
    display: table !important;
    width: 100% !important;
    min-width: 560px !important;
    max-width: none !important;
    table-layout: auto !important;
    border-collapse: collapse !important;
    border-spacing: 0 !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table thead {
    display: table-header-group !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table tbody {
    display: table-row-group !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table tr {
    display: table-row !important;
    width: auto !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table th,
  .page:not([data-meniskus-layout='desktop']) .table td,
  .page:not([data-meniskus-layout='desktop']) .gradeTable td:first-child,
  .page:not([data-meniskus-layout='desktop']) .tearTypeTable td:first-child {
    display: table-cell !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    grid-template-columns: none !important;
    gap: 0 !important;
    padding: 14px 15px !important;
    border: 0 !important;
    border-bottom: 1px solid #edf1f7 !important;
    background: transparent !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table th {
    padding: 13px 15px !important;
    background: linear-gradient(135deg, #fff7ed, #ffedd5) !important;
    white-space: nowrap !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table tr:nth-child(even) td {
    background: #fbfcff !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table tr:last-child td {
    border-bottom: 0 !important;
  }

  .page:not([data-meniskus-layout='desktop']) .table td::before {
    content: none !important;
  }

  html[data-theme='dark'] .page:not([data-meniskus-layout='desktop']) .tableWrap {
    border-color: rgba(148, 163, 184, 0.2) !important;
    background: rgba(15, 23, 42, 0.94) !important;
  }

  html[data-theme='dark'] .page:not([data-meniskus-layout='desktop']) .table th {
    background: rgba(249, 115, 22, 0.16) !important;
  }

  html[data-theme='dark'] .page:not([data-meniskus-layout='desktop']) .table tr:nth-child(even) td {
    background: rgba(30, 41, 59, 0.5) !important;
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
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mcqTitle: 'MCQs zum Meniskus',
    mcqDesc: 'Passende Prüfungsfragen zu Anatomie, MRT-Grading und Rissdiagnostik.',
    mcqCta: 'MCQs starten',
    actionMcq: 'MCQ',
    actionFall: 'Fallbeispiele',
    actionFallStatus: '2 Fälle',
    actionFlash: 'Flashcards',
    openCase: 'Bild direkt in Radiopaedia öffnen',
    zoomImage: 'Bild vergrößern',
    closePreview: 'Vorschau schließen',
    sections: [
      { id: 'anatomie', label: 'Anatomie und Vaskularisation', icon: '🦴' },
      { id: 'mrt', label: 'MRT-Diagnostik und Risskriterien', icon: '🩻' },
      { id: 'grading', label: 'MRT-Signalgrading', icon: '📊' },
      { id: 'risstypen', label: 'Risstypen', icon: '🧩' },
      { id: 'discoider', label: 'Discoider Meniskus', icon: '🔵' },
      { id: 'therapie', label: 'Therapieprinzip', icon: '🧵' },
      { id: 'fallbeispiele', label: 'Fallbeispiele', icon: '🧪' },
      { id: 'lernvideo', label: 'Lernvideo', icon: '▶️' },
    ],
    heroCards: [
      { value: '2 Schichten', label: 'Two-slice-touch-Regel', text: 'Oberflächenkontakt muss auf mindestens zwei aufeinanderfolgenden Schichten sichtbar sein.' },
      { value: 'Grad 3', label: 'sicherer Meniskusriss', text: 'Erst ein Signal mit eindeutigem Kontakt zur Gelenkfläche erfüllt die Kriterien eines echten Risses.' },
      { value: 'Erhalt', label: 'Save the Meniscus', text: 'Wenn möglich reparieren und Meniskusgewebe bewahren statt resezieren.' },
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
      title: 'Anatomie und Vaskularisation',
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
      title: 'MRT-Diagnostik und sichere Risskriterien',
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
      title: 'MRT-Signalgrading: Grad 0 bis III',
      lead: 'Die Klassifikation nach Lotysch hilft, degenerative intrameniskale Signalveränderungen von einem echten Meniskusriss zu unterscheiden.',
      lotyschTitle: 'Einfaches Modell: Grad 0 bis III',
      simpleHeaders: ['Grad', 'MRT-Signal', 'Histologie', 'Klinisch'],
      simpleRows: [
        ['0', 'Homogen hypointens', 'Normales Faserknorpelgewebe', 'Kein Befund'],
        ['I', 'Fokales Signal, kein Oberflächenkontakt', 'Myxoide Degeneration, fokal', 'Inzidentell, kein Riss'],
        ['II', 'Linienförmiges Signal, kein Oberflächenkontakt', 'Myxoide Degeneration, diffus', 'Kein Riss, Vorläuferläsion'],
        ['III', 'Signal erreicht Gelenkoberfläche', 'Riss vorhanden', '✅ Echter Meniskusriss'],
      ],
      extendedTitle: 'Erweiterte Lotysch-Tabelle anzeigen',
      tableHeaders: ['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung'],
      tableRows: [
        ['1', 'punktförmige oder kleine fokale Signalsteigerung', 'kein Kontakt', 'frühe mukoide Degeneration, meist asymptomatisch'],
        ['2a', 'lineare Signalsteigerung', 'kein Kontakt', 'fortgeschrittene Degeneration'],
        ['2b', 'lineare Signalsteigerung', 'Kontakt auf einem einzelnen Bild', 'inkonklusiv für echten Riss'],
        ['2c', 'keilförmige oder globuläre Signalsteigerung', 'kein eindeutiger Kontakt', 'hohes Risiko für okkulten Riss'],
        ['3', 'Pathologische Signalsteigerung', 'Kontakt auf mindestens zwei aufeinanderfolgenden Schichten', 'radiologisch gesicherter Meniskusriss'],
        ['4', 'komplexe Rissmorphologie mit Deformierung oder Fragmentierung', 'mehrfacher Oberflächenkontakt', 'komplexer Meniskusriss'],
      ],
      key: 'Nur Grad III ist ein echter Riss. Meniskusläsion Grad 3 ist der entscheidende Schwellenwert für die Rissdiagnose: Signalsteigerung innerhalb des Meniskus mit sicherem Oberflächenkontakt auf mindestens zwei Schichten.',
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
    tearTypes: {
      title: 'Risstypen',
      lead: 'Rissgeometrie und Lokalisation bestimmen die OP-Strategie und sind prüfungsrelevant.',
      tableHeaders: ['Risstyp', 'Geometrie', 'MRT-Zeichen', 'Therapie'],
      tableRows: [
        ['Längsriss', 'parallel zur Peripherie', 'Doppellinien-Zeichen sagittal', 'Naht in der roten oder rot-weißen Zone'],
        ['Radiärriss', 'senkrecht zur Peripherie', 'Cleft-Zeichen, Phantom-Meniskus', 'Resektion oder Naht, je nach Lokalisation'],
        ['Horizontalriss', 'parallel zum Tibiaplateau', 'Spaltbildung, ggf. parameniskale Zyste', 'Resektion ± Zystenexzision'],
        ['Korbhenkelriss', 'dislozierter doppelter Längsriss', 'Doppeltes PCL-Zeichen; kein Bow-tie-Zeichen', 'Reposition und Naht, Notfall bei Blockade'],
        ['Lappenriss', 'instabiler Lappen mit peripherer Anheftung', 'signalreicher, verlagerbarer Lappen', 'sparsame Resektion des Lappens'],
      ],
      caveTitle: 'CAVE – Korbhenkelriss',
      caveText: 'Doppeltes PCL-Zeichen: Ein dislozierter Meniskusanteil liegt im Interkondylarraum parallel zum PCL. Das Bow-tie-Zeichen fehlt. Sofortdiagnose → dringliche Arthroskopie.',
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
    video: {
      title: 'Lernvideo',
      text: 'Das Lernvideo zum Thema Meniskus ist jetzt auf YouTube verfügbar.',
      cta: 'Video auf YouTube ansehen',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Knee · Meniscus',
    title: 'Meniscus',
    subtitle: 'Basics, anatomy, MRI diagnosis and reliable tear criteria',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mcqTitle: 'Meniscus MCQs',
    mcqDesc: 'Exam questions on anatomy, MRI grading and tear diagnosis.',
    mcqCta: 'Start MCQs',
    actionMcq: 'MCQ',
    actionFall: 'Case studies',
    actionFallStatus: '2 cases',
    actionFlash: 'Flashcards',
    openCase: 'Open image directly in Radiopaedia',
    zoomImage: 'Enlarge image',
    closePreview: 'Close preview',
    sections: [
      { id: 'anatomie', label: 'Anatomy and vascular supply', icon: '🦴' },
      { id: 'mrt', label: 'MRI diagnosis and tear criteria', icon: '🩻' },
      { id: 'grading', label: 'MRI signal grading', icon: '📊' },
      { id: 'risstypen', label: 'Tear types', icon: '🧩' },
      { id: 'discoider', label: 'Discoid meniscus', icon: '🔵' },
      { id: 'therapie', label: 'Treatment principle', icon: '🧵' },
      { id: 'fallbeispiele', label: 'Cases', icon: '🧪' },
      { id: 'lernvideo', label: 'Learning video', icon: '▶️' },
    ],
    heroCards: [
      { value: '2 slices', label: 'Two-slice-touch rule', text: 'Surface contact should be visible on at least two consecutive slices.' },
      { value: 'Grade 3', label: 'definite meniscal tear', text: 'Only signal with definite articular-surface contact meets the criteria for a true tear.' },
      { value: 'Preserve', label: 'Save the Meniscus', text: 'Repair and preserve meniscal tissue whenever possible instead of resection.' },
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
      title: 'Anatomy and vascular supply',
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
      title: 'MRI diagnosis and reliable tear criteria',
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
      title: 'MRI signal grading: grade 0 to III',
      lead: 'The Lotysch classification helps distinguish degenerative intrameniscal signal changes from a true meniscal tear.',
      lotyschTitle: 'Simple model: grades 0 to III',
      simpleHeaders: ['Grade', 'MRI signal', 'Histology', 'Clinical meaning'],
      simpleRows: [
        ['0', 'Homogeneously hypointense', 'Normal fibrocartilage', 'No abnormality'],
        ['I', 'Focal signal, no surface contact', 'Focal myxoid degeneration', 'Incidental, no tear'],
        ['II', 'Linear signal, no surface contact', 'Diffuse myxoid degeneration', 'No tear, precursor lesion'],
        ['III', 'Signal reaches the articular surface', 'Tear present', '✅ True meniscal tear'],
      ],
      extendedTitle: 'Show extended Lotysch table',
      tableHeaders: ['Grade', 'Morphology', 'Surface contact', 'Meaning'],
      tableRows: [
        ['1', 'punctate or small focal signal increase', 'no contact', 'early mucoid degeneration, usually asymptomatic'],
        ['2a', 'linear signal increase', 'no contact', 'advanced degeneration'],
        ['2b', 'linear signal increase', 'contact on a single image', 'inconclusive for a true tear'],
        ['2c', 'wedge-shaped or globular signal increase', 'no definite contact', 'high risk of an occult tear'],
        ['3', 'signal increase', 'contact on at least two consecutive slices', 'radiologically proven meniscal tear'],
        ['4', 'complex tear morphology with deformation or fragmentation', 'multiple surface contacts', 'complex meniscal tear'],
      ],
      key: 'Only grade III is a true tear. Grade 3 meniscal lesion is the decisive threshold for diagnosing a tear: intrameniscal signal increase with reliable surface contact on at least two slices.',
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
    tearTypes: {
      title: 'Tear types',
      lead: 'Tear geometry and location determine surgical strategy and are highly relevant for exams.',
      tableHeaders: ['Tear type', 'Geometry', 'MRI sign', 'Treatment'],
      tableRows: [
        ['Longitudinal tear', 'parallel to the periphery', 'double-line sign on sagittal images', 'repair in the red or red-white zone'],
        ['Radial tear', 'perpendicular to the periphery', 'cleft sign, phantom meniscus', 'resection or repair depending on location'],
        ['Horizontal tear', 'parallel to the tibial plateau', 'cleft-like split, possible parameniscal cyst', 'resection ± cyst excision'],
        ['Bucket-handle tear', 'displaced double longitudinal tear', 'double PCL sign; absent bow-tie sign', 'reduction and repair, urgent if locked knee'],
        ['Flap tear', 'unstable flap with peripheral attachment', 'variable high-signal displaced flap', 'limited flap resection'],
      ],
      caveTitle: 'CAVE – bucket-handle tear',
      caveText: 'Double PCL sign: a displaced meniscal fragment lies in the intercondylar notch parallel to the PCL. The bow-tie sign is absent. Immediate diagnosis → urgent arthroscopy.',
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
    video: {
      title: 'Learning video',
      text: 'The learning video for this meniscus chapter is now available on YouTube.',
      cta: 'Watch on YouTube',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbMsk: 'اسکلتی-عضلانی',
    breadcrumbCurrent: 'زانو · منیسک',
    title: 'منیسک',
    subtitle: 'مبانی، آناتومی، تشخیص MRI و معیارهای قطعی پارگی',
    sourceLabel: 'Dr. Zia',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mcqTitle: 'سوالات منیسک',
    mcqDesc: 'سوالات مرتبط با آناتومی، درجه‌بندی MRI و تشخیص پارگی.',
    mcqCta: 'شروع سوالات',
    actionMcq: 'MCQ',
    actionFall: 'موارد بالینی',
    actionFallStatus: '۲ کیس',
    actionFlash: 'فلش‌کارت',
    openCase: 'باز کردن مستقیم تصویر در Radiopaedia',
    zoomImage: 'بزرگ‌نمایی تصویر',
    closePreview: 'بستن نمایش بزرگ',
    sections: [
      { id: 'anatomie', label: 'آناتومی و خون‌رسانی', icon: '🦴' },
      { id: 'mrt', label: 'تشخیص MRI و معیارهای پارگی', icon: '🩻' },
      { id: 'grading', label: 'درجه‌بندی سیگنال MRI', icon: '📊' },
      { id: 'risstypen', label: 'انواع پارگی', icon: '🧩' },
      { id: 'discoider', label: 'منیسک دیسکوئید', icon: '🔵' },
      { id: 'therapie', label: 'اصل درمان', icon: '🧵' },
      { id: 'fallbeispiele', label: 'نمونه کیس‌ها', icon: '🧪' },
      { id: 'lernvideo', label: 'ویدیوی آموزشی', icon: '▶️' },
    ],
    heroCards: [
      { value: '۲ برش', label: 'قانون Two-slice-touch', text: 'تماس با سطح باید حداقل در دو برش متوالی دیده شود.' },
      { value: 'درجه ۳', label: 'پارگی قطعی منیسک', text: 'فقط سیگنال با تماس قطعی با سطح مفصلی معیار پارگی واقعی را دارد.' },
      { value: 'حفظ', label: 'Save the Meniscus', text: 'در صورت امکان ترمیم و حفظ بافت منیسک بر رزکسیون اولویت دارد.' },
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
      title: 'آناتومی و خون‌رسانی',
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
      title: 'تشخیص MRI و معیارهای قطعی پارگی',
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
      title: 'درجه‌بندی سیگنال MRI: درجه ۰ تا III',
      lead: 'طبقه‌بندی Lotysch کمک می‌کند تغییرات سیگنال دژنراتیو داخل منیسک از پارگی واقعی منیسک جدا شود.',
      lotyschTitle: 'مدل ساده: درجه ۰ تا III',
      simpleHeaders: ['درجه', 'سیگنال MRI', 'هیستولوژی', 'معنای بالینی'],
      simpleRows: [
        ['0', 'هیپواینتنس هموژن', 'بافت فیبروغضروفی طبیعی', 'یافته غیرطبیعی ندارد'],
        ['I', 'سیگنال فوکال، بدون تماس با سطح', 'دژنراسیون میکسوئید فوکال', 'اتفاقی، پارگی نیست'],
        ['II', 'سیگنال خطی، بدون تماس با سطح', 'دژنراسیون میکسوئید منتشر', 'پارگی نیست، ضایعه پیش‌زمینه‌ای'],
        ['III', 'سیگنال به سطح مفصلی می‌رسد', 'پارگی وجود دارد', '✅ پارگی واقعی منیسک'],
      ],
      extendedTitle: 'نمایش جدول کامل Lotysch',
      tableHeaders: ['درجه', 'مورفولوژی', 'تماس با سطح', 'معنا'],
      tableRows: [
        ['1', 'افزایش سیگنال نقطه‌ای یا کوچک', 'بدون تماس', 'دژنراسیون موکوئید اولیه، معمولاً بی‌علامت'],
        ['2a', 'افزایش سیگنال خطی', 'بدون تماس', 'دژنراسیون پیشرفته'],
        ['2b', 'افزایش سیگنال خطی', 'تماس فقط در یک تصویر', 'برای پارگی قطعی ناکافی'],
        ['2c', 'افزایش سیگنال گوه‌ای یا گلوبولار', 'بدون تماس واضح', 'ریسک بالا برای پارگی مخفی'],
        ['3', 'افزایش سیگنال پاتولوژیک', 'تماس در حداقل دو برش متوالی', 'پارگی منیسک از نظر رادیولوژیک قطعی'],
        ['4', 'مورفولوژی پیچیده پارگی همراه با دفورمیتی یا قطعه‌قطعه‌شدن', 'تماس سطحی متعدد', 'پارگی کمپلکس منیسک'],
      ],
      key: 'فقط درجه III پارگی واقعی است. ضایعه منیسک درجه 3 آستانه اصلی برای تشخیص پارگی است: افزایش سیگنال داخل منیسک همراه با تماس مطمئن با سطح مفصلی در حداقل دو برش.',
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
    tearTypes: {
      title: 'انواع پارگی منیسک',
      lead: 'جهت و محل پارگی، استراتژی درمان و تصمیم جراحی را تعیین می‌کند و برای آزمون مهم است.',
      tableHeaders: ['نوع پارگی', 'هندسه', 'علامت MRI', 'درمان'],
      tableRows: [
        ['پارگی طولی', 'موازی با محیط منیسک', 'علامت دو خطی در ساژیتال', 'بخیه در ناحیه قرمز یا قرمز-سفید'],
        ['پارگی رادیال', 'عمود بر محیط منیسک', 'Cleft sign، منیسک شبح‌مانند', 'رزکسیون یا بخیه بسته به محل'],
        ['پارگی افقی', 'موازی با پلاتوی تیبیا', 'شکاف افقی، گاهی کیست پارامنیسکال', 'رزکسیون ± خارج کردن کیست'],
        ['پارگی Bucket-handle', 'پارگی طولی دوبل و جابه‌جا شده', 'علامت PCL دوگانه؛ نبود Bow-tie', 'جااندازی و بخیه؛ در زانوی قفل‌شده اورژانسی'],
        ['پارگی فلپ', 'فلپ ناپایدار با اتصال محیطی', 'فلپ جابه‌جا شونده با سیگنال بالا', 'رزکسیون محدود فلپ'],
      ],
      caveTitle: 'هشدار – پارگی Bucket-handle',
      caveText: 'علامت PCL دوگانه: قطعه جابه‌جا شده منیسک در ناچ بین کندیلی و موازی PCL قرار می‌گیرد. علامت Bow-tie دیده نمی‌شود. تشخیص سریع → آرتروسکوپی فوری.',
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
      key: 'اصل مهم این است که تا حد امکان بافت منیسک حفظ شود؛ برداشتن منیسک فقط در صورت ضرورت و به کمترین مقدار لازم انجام شود.',
    },
    video: {
      title: 'ویدیوی آموزشی',
      text: 'ویدیوی آموزشی این بخش درباره منیسک اکنون در YouTube در دسترس است.',
      cta: 'مشاهده ویدیو در YouTube',
      url: 'https://youtu.be/L03fPcRZm_o?si=RzNDyM-Fmtig8I10',
    },
  },
}

const TAKE_HOME_COPY = {
  de: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'Die wichtigsten Merksätze der Lektion auf einen Blick.',
    itemTitles: {
      anatomy: 'Merke: Innenmeniskus-Mobilität',
      vascular: 'Merke: Kapselnähe und Heilung',
      gradingTear: 'Merke: Rissdiagnose im MRT',
      discoid: 'Merke: Discoider Meniskus',
      therapy: 'Merke: Save the Meniscus',
    },
    discoidDefinition: 'Kurze Definition: Ein discoider Meniskus ist eine angeborene Formvariante, meist des Außenmeniskus, mit verbreitertem, scheibenförmigem Meniskuskorpus.',
  },
  en: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'The key points of this lesson at a glance.',
    itemTitles: {
      anatomy: 'Key point: medial meniscus mobility',
      vascular: 'Key point: capsular proximity and healing',
      gradingTear: 'Key point: tear diagnosis on MRI',
      discoid: 'Key point: discoid meniscus',
      therapy: 'Key point: Save the Meniscus',
    },
    discoidDefinition: 'Short definition: a discoid meniscus is a congenital shape variant, usually of the lateral meniscus, with a widened disc-like meniscal body.',
  },
  fa: {
    sectionLabel: 'Take home message',
    title: 'Take home message',
    lead: 'مهم‌ترین نکات این درس برای مرور سریع.',
    itemTitles: {
      anatomy: 'نکته: تحرک منیسک داخلی',
      vascular: 'نکته: نزدیکی به کپسول و ترمیم',
      gradingTear: 'نکته: تشخیص پارگی در MRI',
      discoid: 'نکته: منیسک دیسکوئید',
      therapy: 'نکته: Save the Meniscus',
    },
    discoidDefinition: 'تعریف کوتاه: منیسک دیسکوئید یک واریانت مادرزادی است، معمولاً در منیسک خارجی دیده می‌شود و تنه منیسک پهن و دیسک‌مانند است.',
  },
}

const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/L03fPcRZm_o'

function Table({ headers, rows, className = '' }) {
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table} ${className}`}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`} data-label={headers[cellIndex] || ''}>{cell}</td>
            ))}
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

function useIsMobileViewport(query = '(max-width: 900px)') {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const updateMobileState = () => {
      const userAgent = window.navigator.userAgent || ''
      const hasMobileUserAgent = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent)
      const hasTouchInput = window.navigator.maxTouchPoints > 0

      // Wichtig für iPhone/Safari: Wenn im Browser „Desktop-Webseite“ gewählt wird,
      // meldet Safari normalerweise keinen mobilen User-Agent mehr. Dann darf unsere
      // schmale iPhone-Breite nicht automatisch die mobile Akkordeon-Ansicht erzwingen.
      const desktopWebsiteRequested = mediaQuery.matches && hasTouchInput && !hasMobileUserAgent

      setIsMobile(mediaQuery.matches && !desktopWebsiteRequested)
    }

    updateMobileState()
    window.addEventListener('resize', updateMobileState)
    window.addEventListener('orientationchange', updateMobileState)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMobileState)
      return () => {
        mediaQuery.removeEventListener('change', updateMobileState)
        window.removeEventListener('resize', updateMobileState)
        window.removeEventListener('orientationchange', updateMobileState)
      }
    }

    mediaQuery.addListener(updateMobileState)
    return () => {
      mediaQuery.removeListener(updateMobileState)
      window.removeEventListener('resize', updateMobileState)
      window.removeEventListener('orientationchange', updateMobileState)
    }
  }, [query])

  return isMobile
}

const READ_LABELS = {
  de: { btn: 'Als gelesen markieren', active: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { btn: 'Mark as read', active: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { btn: 'علامت‌گذاری به‌عنوان خوانده‌شده', active: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError, className = '' }) {
  const { lang } = useLanguage()
  const labels = READ_LABELS[lang] || READ_LABELS.de
  return (
    <div className={`${styles.readControl} ${className}`.trim()}>
      <button type="button" className={`${styles.doneBtn} ${isRead ? styles.doneBtnActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? labels.active : labels.btn}</span>
      </button>
      {authError && (
        <div className={styles.readError} role="alert">
          <span>{labels.error}</span>
          <Link href="/sign-in">{labels.signIn}</Link>
        </div>
      )}
    </div>
  )
}

function Section({ id, eyebrow, title, lead, children, className = '', defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    setIsOpen(defaultOpen)
  }, [defaultOpen, id])

  const toggleSection = () => setIsOpen(value => !value)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleSection()
    }
  }

  return (
    <section id={id} className={`${styles.section} ${className}`.trim()} data-open={isOpen ? 'true' : 'false'}>
      <div className={styles.sectionHead}>
        <div
          className={styles.sectionToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={toggleSection}
          onKeyDown={handleKeyDown}
        >
          <div className={styles.sectionTitleText}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <span className={`${styles.sectionToggleIcon} ${isOpen ? styles.sectionToggleIconOpen : ''}`}>⌄</span>
        </div>
      </div>
      <div className={`${styles.sectionContent} ${isOpen ? '' : styles.sectionContentCollapsed}`.trim()}>
        {lead && <p className={styles.sectionLead}>{lead}</p>}
        {children}
      </div>
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
            className={`${styles.sideItem} ${section.important ? styles.sideItemImportant : ''} ${activeId === section.id ? styles.sideItemActive : ''}`}
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
  const takeHomeCopy = TAKE_HOME_COPY[lang] || TAKE_HOME_COPY.de
  const isRTL = lang === 'fa'
  const pageSections = useMemo(
    () => [...copy.sections, { id: 'takehome', label: takeHomeCopy.sectionLabel, icon: '💡', important: true }],
    [copy.sections, takeHomeCopy.sectionLabel]
  )
  const takeHomeItems = useMemo(() => [
    { number: '01', title: takeHomeCopy.itemTitles.anatomy, text: copy.anatomy.key },
    { number: '02', title: takeHomeCopy.itemTitles.vascular, text: copy.vascular.key },
    { number: '03', title: takeHomeCopy.itemTitles.gradingTear, text: `${copy.grading.key} ${copy.tear.key}` },
    { number: '04', title: takeHomeCopy.itemTitles.discoid, text: `${takeHomeCopy.discoidDefinition}\n${copy.discoid.key}` },
    { number: '05', title: takeHomeCopy.itemTitles.therapy, text: copy.therapy.key },
  ], [copy, takeHomeCopy])
  const mainRef = useRef(null)
  const isMobile = useIsMobileViewport()
  const [activeId, setActiveId] = useState(pageSections[0].id)
  const [previewImage, setPreviewImage] = useState(null)
  const meniskusLayout = isMobile ? 'mobile' : 'desktop'
  const { isRead, toggleRead, authError } = useLessonReadStatus('meniskus')

  const sectionIds = useMemo(() => pageSections.map(section => section.id), [pageSections])
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    setActiveId(pageSections[0].id)
  }, [pageSections])

  useEffect(() => {
    document.documentElement.dataset.meniskusLayout = meniskusLayout
    document.body.dataset.meniskusLayout = meniskusLayout

    return () => {
      delete document.documentElement.dataset.meniskusLayout
      delete document.body.dataset.meniskusLayout
    }
  }, [meniskusLayout])

  useEffect(() => {
    document.body.style.overflow = previewImage ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [previewImage])

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
      data-meniskus-layout={meniskusLayout}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={lang}
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

        <div className={styles.heroGrid} style={{ gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 300px' }}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.heroActions}>
              <Link href={withLang(`/ueben/quiz?fach=msk&n=10&themen=meniskus&from=${encodeURIComponent(withLang('/msk/knie/meniskus'))}`)} className={`${styles.learnAction} ${styles.learnActionMcq}`}>
                <span>🎯</span>
                <span>{copy.actionMcq}</span>
              </Link>
              <Link href={withLang(`/flashcards/meniskus?from=${encodeURIComponent(withLang('/msk/knie/meniskus'))}`)} className={`${styles.learnAction} ${styles.learnActionFlash}`}>
                <span>🧠</span>
                <span>{copy.actionFlash}</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStatCard} key={card.label}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
                <small>{card.text}</small>
              </div>
            ))}
          </div>

        </div>

      </header>

      <div className={styles.readBar}>
        <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
      </div>

      <div className={styles.layout}>
        {!isMobile && (
          <Sidebar sections={pageSections} toc={copy.toc} activeId={activeId} onClick={scrollTo} />
        )}

        <main className={styles.main} ref={mainRef}>
          <Section id="anatomie" eyebrow="01" title={copy.anatomy.title} lead={copy.anatomy.lead} defaultOpen={!isMobile}>
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

            <div className={styles.subSectionBlock}>
              <h3 className={styles.subSectionTitle}>{copy.vascular.title}</h3>
              <p className={styles.subSectionLead}>{copy.vascular.lead}</p>
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
            </div>
          </Section>

          <Section id="mrt" eyebrow="04" title={copy.mri.title} lead={copy.mri.lead} defaultOpen={!isMobile}>
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

            <div className={styles.subSectionBlock}>
              <h3 className={styles.subSectionTitle}>{copy.tear.title}</h3>
              <p className={styles.subSectionLead}>{copy.tear.lead}</p>
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
            </div>
          </Section>

          <Section id="grading" eyebrow="05" title={copy.grading.title} lead={copy.grading.lead} defaultOpen={!isMobile}>
            <div className={styles.gradingFigure}>
              <ImageFigure src="/meniskus/lotysch-grading.png" alt={copy.grading.title} zoomable zoomLabel={copy.zoomImage} onZoom={() => setPreviewImage({ src: '/meniskus/lotysch-grading.png', alt: copy.grading.title })} />
            </div>
            <Table headers={copy.grading.simpleHeaders} rows={copy.grading.simpleRows} className={styles.gradeTable} />
            <details className={styles.extendedDetails}>
              <summary>{copy.grading.extendedTitle}</summary>
              <div className={styles.extendedDetailsContent}>
                <Table headers={copy.grading.tableHeaders} rows={copy.grading.tableRows} className={styles.gradeTable} />
              </div>
            </details>
            <Callout label={copy.keyLabel}>{copy.grading.key}</Callout>
          </Section>


          <Section id="risstypen" eyebrow="07" title={copy.tearTypes.title} lead={copy.tearTypes.lead} defaultOpen={!isMobile}>
            <Table headers={copy.tearTypes.tableHeaders} rows={copy.tearTypes.tableRows} className={styles.tearTypeTable} />
            <Callout type="cave" label={copy.tearTypes.caveTitle}>{copy.tearTypes.caveText}</Callout>
          </Section>

          <Section id="discoider" eyebrow="08" title={copy.discoid.title} lead={copy.discoid.lead} defaultOpen={!isMobile}>
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
            defaultOpen={!isMobile}
          >
            <Table headers={copy.therapy.tableHeaders} rows={copy.therapy.tableRows} />
            <Callout label={copy.keyLabel}>{copy.therapy.key}</Callout>
          </Section>

          <Section id="fallbeispiele" eyebrow="07" title={copy.cases.title} lead={copy.cases.lead} defaultOpen={!isMobile}>
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

          <Section id="lernvideo" eyebrow="10" title={copy.video.title} lead="" defaultOpen={!isMobile}>
            <div className={styles.videoCard}>
              <div className={styles.videoFrameWrap}>
                <iframe
                  src={YOUTUBE_EMBED_URL}
                  title={copy.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <h3>{copy.video.title}</h3>
              <p>{copy.video.text}</p>
              <a href={copy.video.url} target="_blank" rel="noopener noreferrer" className={styles.videoButton}>
                ▶ {copy.video.cta}
              </a>
            </div>
          </Section>

          <Section id="takehome" eyebrow="11" title={takeHomeCopy.title} lead="" className={styles.takeHomeSection} defaultOpen={!isMobile}>
            <div className={styles.takeHomeBox}>
              <p className={styles.takeHomeIntro}>{takeHomeCopy.lead}</p>
              <div className={styles.takeHomeList}>
                {takeHomeItems.map(item => (
                  <div key={item.number} className={styles.takeHomeItem}>
                    <span className={styles.takeHomeNumber}>{item.number}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <div className={styles.readBarBottom}>
            <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
          </div>
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
