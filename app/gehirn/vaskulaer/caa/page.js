'use client';

import { useEffect, useState } from 'react';
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll';
import LessonTakeHome from '@/components/LessonTakeHome';
import Link from 'next/link';
import LessonHero from '@/components/LessonHero';
import { useLanguage } from '@/providers/LanguageProvider';
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus';
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress';
import { CAA_CHAPTERS, CAA_TRACKED_IDS, CAA_COPY as COPY, CAA_SOURCES } from '@/data/caaLesson';
import reference from '@/components/LessonTemplate.module.css';
import styles from './page.module.css';
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de;
const L = (de, en, fa) => ({
  de,
  en,
  fa
});
const PATH = '/gehirn/vaskulaer/caa';
const ALIASES = {
  pathophysio: 'grundlagen',
  lokalisation: 'grundlagen',
  befund: 'differenzial',
  'take-home': 'takehome'
};
const resolveChapter = hash => CAA_CHAPTERS.some(s => s.id === hash) ? hash : ALIASES[hash];
function Icon({
  name
}) {
  const paths = {
    brain: <><path d="M12 5a3.5 3.5 0 0 0-6 2 4 4 0 0 0-2 7 4 4 0 0 0 7 4V6M12 5a3.5 3.5 0 0 1 6 2 4 4 0 0 1 2 7 4 4 0 0 1-7 4V6" /><path d="M6 10h3M15 10h3M7 15l2-1M17 15l-2-1" /></>,
    scan: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M10.5 7v7M7 10.5h7" /></>,
    vessel: <path d="M12 21V11L7 6V3M12 11l5-5V3M9 15l-4 4M15 15l4 4" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M2 20h20" />,
    case: <path d="M6 4h12v17H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4" />,
    spark: <path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    warning: <path d="m12 3 10 18H2zM12 9v5M12 17v1" />
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
function Note({
  warning,
  lang,
  children
}) {
  return <aside className={warning ? reference.warning : reference.rememberNote}><span className={reference.calloutLabel}><Icon name={warning ? 'warning' : 'spark'} />{pick(warning ? COPY.warning : COPY.key, lang)}</span><div className={reference.calloutBody}>{children}</div></aside>;
}
function Table({
  headers,
  rows,
  lang
}) {
  return <div className={styles.tableScroll} role="region" aria-label={pick(headers[0], lang)} tabIndex={0}><table className={styles.table}><thead><tr>{headers.map((cell, i) => <th scope="col" key={i}>{pick(cell, lang)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{Array.isArray(cell) ? <Paragraphs values={cell} lang={lang} /> : pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>;
}
function DistributionDiagram({
  lang
}) {
  const dots = [[65, 40], [45, 62], [34, 88], [32, 117], [45, 145], [65, 161], [155, 40], [175, 62], [186, 88], [188, 117], [175, 145], [155, 161]];
  return <figure className={styles.diagram}><div className={styles.brains}>{[false, true].map(deep => <div key={String(deep)}><svg viewBox="0 0 220 190" role="img" aria-label={pick(deep ? COPY.deep : COPY.lobar, lang)} data-no-zoom><path d="M105 23C82 12 58 25 52 42C27 44 19 65 26 81C10 98 18 121 30 129C25 153 45 177 64 170C79 187 100 174 105 164ZM115 23C138 12 162 25 168 42C193 44 201 65 194 81C210 98 202 121 190 129C195 153 175 177 156 170C141 187 120 174 115 164Z" fill="var(--canvas)" stroke="var(--muted)" strokeWidth="2" /><g fill="none" stroke="var(--line)" strokeWidth="2" strokeLinecap="round"><path d="M60 49q20-12 29 4M42 79q16-13 28 2M37 108q18-10 30 3M48 143q19-11 36 4M160 49q-20-12-29 4M178 79q-16-13-28 2M183 108q-18-10-30 3M172 143q-19-11-36 4M88 71q-18 22 2 44M132 71q18 22-2 44" /></g>{(deep ? [[87, 90], [90, 111], [133, 90], [130, 111]] : dots).map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={deep ? 6 : 4.5} fill={deep ? 'var(--teal-700)' : 'var(--plum-800)'} />)}</svg><strong>{pick(deep ? COPY.deep : COPY.lobar, lang)}</strong></div>)}</div><figcaption>{pick(COPY.schematic, lang)}</figcaption></figure>;
}
function Paragraphs({ values, lang, lead = false }) {
  return values.map((value, index) => <p key={index} className={lead && index === 0 ? reference.lead : styles.paragraph}>{pick(value, lang)}</p>);
}
function TeachingList({ items, lang }) {
  return <dl className={styles.teachingList}>{items.map((item, index) => <div key={index}>
    <dt>{pick(item.title, lang)}</dt>
    <dd><Paragraphs values={item.paragraphs} lang={lang} /></dd>
  </div>)}</dl>;
}
function ChapterContent({ id, lang }) {
  const c = value => pick(value, lang);
  if (id === 'grundlagen') return <>
    <Paragraphs values={COPY.basics} lang={lang} lead />
    <h3 className={styles.subheading}>{c(COPY.backgroundTitle)}</h3>
    <TeachingList items={COPY.background} lang={lang} />
    <Note warning lang={lang}>{COPY.amyloid.map((paragraph, index) => <p className={styles.caveParagraph} key={index}><strong>{c(paragraph)}</strong></p>)}</Note>
    <h3 className={styles.subheading}>{c(COPY.workflowTitle)}</h3>
    <ol className={`${reference.workflow} ${styles.workflow}`}>{COPY.workflow.map(([title, text, icon]) => <li key={c(title)}><span className={reference.stepIcon}><Icon name={icon} /></span><strong>{c(title)}</strong><p>{c(text)}</p></li>)}</ol>
    <div className={styles.pattern}><DistributionDiagram lang={lang} /><Note warning lang={lang}><Paragraphs values={[COPY.deepWarning]} lang={lang} /></Note></div>
  </>;
  if (id === 'mrt-def') return <>
    <Paragraphs values={COPY.markerIntro} lang={lang} lead />
    <Table headers={COPY.markerHeaders} rows={COPY.markerRows} lang={lang} />
    <h3 className={styles.subheading}>{c(COPY.acuteTitle)}</h3>
    <p className={styles.paragraph}>{c(COPY.clinicalIntro)}</p>
    <TeachingList items={COPY.acute} lang={lang} />
    <Note lang={lang}><Paragraphs values={COPY.tfne} lang={lang} /></Note>
    <h3 className={styles.subheading}>{c(COPY.otherClinicalTitle)}</h3>
    <TeachingList items={COPY.otherClinical} lang={lang} />
    <h3 className={styles.subheading}>{c(COPY.wmTitle)}</h3>
    <dl className={styles.markers}>{COPY.wm.map(item => <div key={c(item.title)}><dt>{c(item.title)}</dt><dd>{c(item.text)}</dd></div>)}</dl>
  </>;
  if (id === 'boston') return <>
    <Paragraphs values={COPY.bostonIntro} lang={lang} lead />
    <div className={styles.criteria}><h3>{c(COPY.probable)}</h3><div className={styles.rule}><b><bdi>≥2</bdi></b><span>{c(COPY.hemorrhages)}</span></div><small>{c(COPY.or)}</small><div className={styles.rule}><b><bdi>1 + 1</bdi></b><span>{c(COPY.combination)}</span></div></div>
    <div className={`${styles.criteria} ${styles.possible}`}><h3>{c(COPY.possible)}</h3><p>{c(COPY.possibleRule)}</p></div>
    <Note lang={lang}><Paragraphs values={[COPY.counting]} lang={lang} /></Note>
    <p className={styles.context}>{c(COPY.pathology)}</p>
  </>;
  if (id === 'differenzial') return <>
    <p className={reference.lead}>{c(COPY.ddIntro)}</p>
    <Table headers={COPY.ddHeaders} rows={COPY.ddRows} lang={lang} />
    <h3 className={styles.subheading}>{c(COPY.redFlagsTitle)}</h3>
    <TeachingList items={COPY.redFlags} lang={lang} />
  </>;
  return <LessonTakeHome points={COPY.takehome} lang={lang} idPrefix="caa-take-home" />;
}
export default function CAAPage() {
  const {
    lang
  } = useLanguage();
  const c = value => pick(value, lang);
  const {
    isRead,
    toggleRead,
    authError
  } = useLessonReadStatus('caa');
  const [readSections, setReadSections] = usePersistedSectionProgress('caa', CAA_TRACKED_IDS, isRead);
  const [openId, setOpenId] = useState('grundlagen');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const scrollToSection = useLessonSectionScroll();
  const summary = CAA_CHAPTERS.find(section => section.emphasis);
  const isSectionOpen = section => section.emphasis ? summaryOpen : openId === section.id;
  const [mobileOpen, setMobileOpen] = useState(false);
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`;
  const replaceHash = id => {
    const url = new URL(window.location.href);
    url.hash = id || '';
    window.history.replaceState(null, '', url);
  };
  useEffect(() => {
    const syncHash = () => {
      const id = resolveChapter(window.location.hash.slice(1));
      if (id === 'takehome') setSummaryOpen(true);
      else if (id) setOpenId(id);
      else setOpenId('grundlagen');
      if (id) scrollToSection(id);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, [scrollToSection]);
  const selectSection = id => {
    setMobileOpen(false);
    if (id === 'takehome') {
      setSummaryOpen(true);
    } else {
      if (!CAA_TRACKED_IDS.includes(id)) return;
      setOpenId(id);
    }
    replaceHash(id);
    scrollToSection(id);
  };
  const toggleSummary = () => {
    const next = !summaryOpen;
    setSummaryOpen(next);
    replaceHash(next ? 'takehome' : openId);
    if (next) scrollToSection('takehome');
  };
  const toggleSectionRead = id => {
    if (isRead) toggleRead();
    setReadSections(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const toggleLessonRead = () => {
    if (toggleRead()) setReadSections(isRead ? new Set() : new Set(CAA_TRACKED_IDS));
  };
  const activeIndex = Math.max(0, CAA_TRACKED_IDS.indexOf(openId));
  const navItems = () => CAA_CHAPTERS.filter(s => !s.emphasis).map(section => <button type="button" key={section.id} className={openId === section.id ? reference.activeSideItem : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span className={reference.sideIcon}><Icon name={section.icon} /></span><strong>{c(section.title)}{readSections.has(section.id) ? <span className={styles.readTick} aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>);
  return <main className={`${reference.page} ${styles.page}`} data-lesson-progress-managed="true" data-disable-lesson-explorer="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={reference.header}><div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c(L('Kopf', 'Head', 'سر'))}</Link><span>/</span><strong>CAA</strong></nav><span className={reference.author}>Dr. Zia</span></div>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/caa-hero-schematic.webp" imageAlt={c(L('Schema der CAA: oberflächliche Gefäße, lobäre Mikroblutungen und Amyloid in der Gefäßwand', 'CAA schematic: superficial vessels, lobar microbleeds and amyloid in the vessel wall', 'شماتیک CAA: عروق سطحی، میکروخونریزی‌های لوبار و رسوب آمیلوئید در دیواره رگ'))} lang={lang} />
    <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => selectSection('takehome')}><Icon name="spark" />{c(summary.title)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=gehirn&n=8&themen=caa&from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.mcq)}<Icon name="arrow" /></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/caa?from=${encodeURIComponent(withLang(PATH))}`)}><Icon name="case" />{c(COPY.flashcards)}</Link></div>
    <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={CAA_TRACKED_IDS.length} aria-valuenow={readSections.size}><i style={{
            width: `${readSections.size / CAA_TRACKED_IDS.length * 100}%`
          }} /></div><span>{readSections.size} / {CAA_TRACKED_IDS.length} {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={`${reference.lessonCompleteButton} ${isRead ? reference.lessonCompleteButtonDone : ''}`} onClick={toggleLessonRead} aria-pressed={isRead}><Icon name="check" />{c(isRead ? COPY.fullMarked : COPY.fullMark)}</button><button type="button" className={reference.continueButton} onClick={() => selectSection(CAA_TRACKED_IDS[activeIndex + 1])} disabled={activeIndex === CAA_TRACKED_IDS.length - 1}>{c(COPY.continue)}<Icon name="arrow" /></button></div></div>
    {authError ? <p className={styles.auth} role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p> : null}</header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{navItems()}</nav></aside><article className={reference.lesson}>{CAA_CHAPTERS.map(section => <section key={section.id} id={section.id} className={`${reference.section} ${isSectionOpen(section) ? reference.sectionOpen : ''} ${section.emphasis ? reference.takeHomeSection : ''}`}><h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={isSectionOpen(section)} aria-controls={`${section.id}-panel`} onClick={() => section.emphasis ? toggleSummary() : selectSection(section.id)}><span className={reference.sectionIcon}><Icon name={section.icon} /></span><span><strong>{c(section.title)}</strong></span><span className={reference.toggle} aria-hidden="true">{isSectionOpen(section) ? '−' : '+'}</span></button></h2><div id={`${section.id}-panel`} className={reference.sectionBody} hidden={!isSectionOpen(section)}><ChapterContent id={section.id} lang={lang} />{!section.emphasis ? <button type="button" className={`${reference.readButton} ${readSections.has(section.id) ? reference.readButtonDone : ''}`} aria-pressed={readSections.has(section.id)} onClick={() => toggleSectionRead(section.id)}><Icon name="check" />{c(readSections.has(section.id) ? COPY.marked : COPY.mark)}</button> : null}</div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary>{CAA_SOURCES.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</details></article></div>
    <div className={styles.mobilePath}><button type="button" className={styles.mobileTrigger} aria-expanded={mobileOpen} aria-controls="caa-mobile-path" onClick={() => setMobileOpen(value => !value)}><Icon name="brain" /><strong>{c(COPY.path)}</strong><span>{readSections.size} / {CAA_TRACKED_IDS.length}</span></button><nav id="caa-mobile-path" className={`${reference.sidebar} ${styles.mobilePanel}`} aria-label={c(COPY.path)} hidden={!mobileOpen}>{navItems()}<button type="button" onClick={() => selectSection('takehome')}><span className={reference.sideIcon}><Icon name="spark" /></span><strong>{c(summary.title)}</strong></button></nav></div>
  </main>;
}
