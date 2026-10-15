'use client';

import { useEffect, useState } from 'react';
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll';
import CAACaseGallery from '@/components/CAACaseGallery';
import LessonTakeHome from '@/components/LessonTakeHome';
import { VesselExplorer, MarkerAtlas, WhiteMatterMarkers, BostonCountingGuide, BostonCategories } from '@/components/CAALearningTools';
import { AssociationExplorer, BackgroundExplorer, ClinicalExplorer, DifferentialComparison } from '@/components/CAAContentExplorers';
import { CAA_INTERACTION_COPY } from '@/data/caaInteractions';
import Link from 'next/link';
import LessonHero from '@/components/LessonHero';
import { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups';
import { useLanguage } from '@/providers/LanguageProvider';
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus';
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress';
import { useLehrModeActive } from '@/hooks/useLehrModeActive';
import { migrateCAAProgress } from '@/lib/caaProgress.mjs';
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
  'mrt-def': 'mrt-diagnostik',
  boston: 'mrt-diagnostik',
  pathophysio: 'grundlagen',
  lokalisation: 'grundlagen',
  befund: 'differenzial',
  'take-home': 'takehome'
};
const resolveChapter = hash => CAA_CHAPTERS.some(s => s.id === hash) ? hash : ALIASES[hash];
const bostonHref = lang => `/?ref=rechner&calc=boston-v2&lang=${lang}#referenzen`;
function Icon({
  name
}) {
  const paths = {
    brain: <><path d="M12 5a3.5 3.5 0 0 0-6 2 4 4 0 0 0-2 7 4 4 0 0 0 7 4V6M12 5a3.5 3.5 0 0 1 6 2 4 4 0 0 1 2 7 4 4 0 0 1-7 4V6" /><path d="M6 10h3M15 10h3M7 15l2-1M17 15l-2-1" /></>,
    scan: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M10.5 7v7M7 10.5h7" /></>,
    vessel: <path d="M12 21V11L7 6V3M12 11l5-5V3M9 15l-4 4M15 15l4 4" />,
    clinical: <path d="M3 12h4l3-7 4 14 3-7h4" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M2 20h20" />,
    case: <path d="M6 4h12v17H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4" />,
    quiz: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M7.2 9.1a2 2 0 1 1 2.8 1.8c-.9.4-1.4.9-1.4 1.8"/><circle cx="8.6" cy="16" r=".55" fill="currentColor" stroke="none"/><path d="M13.5 8.5h3.5M13.5 12h3.5M13.5 15.5h2.5"/></>,
    flashcards: <><rect x="7" y="5" width="13" height="15" rx="2"/><path d="M7 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/><path d="M10 9h7M10 13h5"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
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
  if (id === 'grundlagen') return <TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
    <TeachingGroup id="caa-pathology" title={c(COPY.pathologyTitle)}>
      <div className={styles.foundationBody}>
        <Paragraphs values={[COPY.basics[0]]} lang={lang} />
        <Note warning lang={lang}><Paragraphs values={[COPY.systemicWarning]} lang={lang} /></Note>
        <VesselExplorer lang={lang} headingLevel="h4" description={COPY.basics[1]} />
        <AssociationExplorer title={COPY.associationsTitle} items={COPY.associations} lang={lang} />
        <Note lang={lang}><Paragraphs values={[COPY.amyloid[0]]} lang={lang} /><ul className={styles.amyloidLocations}>{COPY.amyloid.slice(1).map((location, index) => <li key={index}>{c(location)}</li>)}</ul></Note>
      </div>
    </TeachingGroup>
    <TeachingGroup id="caa-frequency" title={c(COPY.backgroundTitle)} tone="secondary">
      <div className={styles.foundationBody}><BackgroundExplorer title={COPY.backgroundTitle} items={COPY.background} lang={lang} showTitle={false} /></div>
    </TeachingGroup>
  </TeachingGroups>;
  if (id === 'mrt-diagnostik') return <TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
    <TeachingGroup id="caa-mri-findings" title={c(COPY.mriTitle)}>
      <div className={styles.diagnosticBody}>
        <Paragraphs values={COPY.markerIntro} lang={lang} />
        <section className={styles.sequenceOverview} aria-labelledby="caa-sequences-heading">
          <h4 id="caa-sequences-heading" className={styles.diagnosticHeading}>{c(COPY.sequencesTitle)}</h4>
          <TeachingList items={COPY.sequences} lang={lang} />
        </section>
        <MarkerAtlas copy={COPY} lang={lang} headingLevel="h4" headingClassName={styles.diagnosticHeading} />
        <section className={styles.sequenceOverview} aria-labelledby="caa-wm-heading">
          <h4 id="caa-wm-heading" className={styles.diagnosticHeading}>{c(COPY.wmTitle)}</h4>
          <WhiteMatterMarkers items={COPY.wm} lang={lang} title={COPY.wmTitle} />
        </section>
      </div>
    </TeachingGroup>
    <TeachingGroup id="caa-boston" title={c(COPY.bostonTitle)} tone="secondary">
      <div className={styles.diagnosticBody}>
        <Paragraphs values={COPY.bostonIntro} lang={lang} />
        <section className={styles.sequenceOverview} aria-labelledby="caa-boston-prerequisites-heading">
          <h4 id="caa-boston-prerequisites-heading" className={`${styles.subheading} ${styles.diagnosticHeading}`}>{c(COPY.eligibilityTitle)}</h4>
          <TeachingList items={COPY.eligibility} lang={lang} />
          <Note warning lang={lang}><Paragraphs values={[COPY.deepWarning]} lang={lang} /></Note>
        </section>
        <section className={styles.sequenceOverview} aria-labelledby="caa-boston-categories-heading">
          <h4 id="caa-boston-categories-heading" className={`${styles.subheading} ${styles.diagnosticHeading}`}>{c(COPY.categoryTitle)}</h4>
          <BostonCategories copy={COPY} lang={lang} />
          <Note warning lang={lang}><Paragraphs values={COPY.pathology} lang={lang} /></Note>
        </section>
        <section className={styles.sequenceOverview} aria-labelledby="caa-boston-counting-heading">
          <h4 id="caa-boston-counting-heading" className={`${styles.subheading} ${styles.diagnosticHeading}`}>{c(COPY.countingGuideTitle)}</h4>
          <BostonCountingGuide copy={COPY} lang={lang} />
        </section>
        <Link className={styles.bostonCalculatorLink} href={bostonHref(lang)}>{c(L('Zum Boston-Rechner', 'Open Boston calculator', 'باز کردن محاسبه‌گر Boston'))}<Icon name="arrow" /></Link>
      </div>
    </TeachingGroup>
    <TeachingGroup id="caa-case-examples" title={c(COPY.caseExamples)}>
      <div className={styles.diagnosticBody}><CAACaseGallery lang={lang} headingLevel="h4" showTitle={false} /></div>
    </TeachingGroup>
  </TeachingGroups>;
  if (id === 'klinik') return <>
    <p className={reference.lead}>{c(COPY.clinicalIntro)}</p>
    <TeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'}>
      <TeachingGroup id="caa-acute" title={c(COPY.acuteTitle)}>
        <ClinicalExplorer title={COPY.acuteTitle} items={COPY.acute} kind="acute" lang={lang} showTitle={false} />
        <Note lang={lang}><Paragraphs values={COPY.tfne} lang={lang} /></Note>
      </TeachingGroup>
      <TeachingGroup id="caa-chronic" title={c(COPY.otherClinicalTitle)} tone="secondary">
        <ClinicalExplorer title={COPY.otherClinicalTitle} items={COPY.otherClinical} kind="other" lang={lang} showTitle={false} />
      </TeachingGroup>
    </TeachingGroups>
  </>;
  if (id === 'differenzial') return <>
    <p className={reference.lead}>{c(COPY.ddIntro)}</p>
    <DifferentialComparison rows={COPY.ddRows} lang={lang} />
    <Note warning lang={lang}><Paragraphs values={COPY.mixedWarning} lang={lang} /></Note>
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
  const [readSections, setReadSections] = usePersistedSectionProgress('caa', CAA_TRACKED_IDS, isRead, migrateCAAProgress);
  const [openId, setOpenId] = useState('grundlagen');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const lehrMode = useLehrModeActive();
  const scrollToSection = useLessonSectionScroll();
  const summary = CAA_CHAPTERS.find(section => section.emphasis);
  const isSectionOpen = section => lehrMode || (section.emphasis ? summaryOpen : openId === section.id);
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
      if (id) scrollToSection(window.location.hash === '#boston' ? 'caa-boston-heading' : id);
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
  const navItems = () => <>{CAA_CHAPTERS.filter(s => !s.emphasis).map(section => <button type="button" key={section.id} className={openId === section.id ? reference.activeSideItem : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span className={reference.sideIcon}><Icon name={section.icon} /></span><strong>{c(section.title)}{readSections.has(section.id) ? <span className={styles.readTick} aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>)}<Link className={styles.pathCalculatorLink} href={bostonHref(lang)}><span className={reference.sideIcon}><Icon name="chart" /></span><strong>{c(L('Boston-Rechner', 'Boston calculator', 'محاسبه‌گر Boston'))}</strong></Link></>;
  return <main className={`${reference.page} ${styles.page}`} data-lesson-section-divider="true" data-lesson-progress-managed="true" data-disable-lesson-explorer="true" data-lehr-sections-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={reference.header}><div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c(L('Kopf', 'Head', 'سر'))}</Link><span>/</span><strong>CAA</strong></nav><span className={reference.author}>Dr. Zia</span></div>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/caa-hero-schematic.webp" imageAlt={c(L('Schema der CAA: oberflächliche Gefäße, lobäre Mikroblutungen und Amyloid in der Gefäßwand', 'CAA schematic: superficial vessels, lobar microbleeds and amyloid in the vessel wall', 'شماتیک CAA: عروق سطحی، میکروخونریزی‌های لوبار و رسوب آمیلوئید در دیواره رگ'))} lang={lang} />
    <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => selectSection('takehome')}><Icon name="spark" />{c(summary.title)}<span aria-hidden="true">↓</span></button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=gehirn&n=18&themen=caa&from=${encodeURIComponent(withLang(PATH))}`)}><Icon name="quiz" />{c(COPY.mcq)}<span aria-hidden="true">→</span></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/caa?mode=practice&from=${encodeURIComponent(withLang(PATH))}`)}><Icon name="flashcards" />{c(COPY.flashcards)}</Link></div>
    <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={CAA_TRACKED_IDS.length} aria-valuenow={readSections.size}><i style={{
            width: `${readSections.size / CAA_TRACKED_IDS.length * 100}%`
          }} /></div><span>{readSections.size} / {CAA_TRACKED_IDS.length} {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={`${reference.lessonCompleteButton} ${isRead ? reference.lessonCompleteButtonDone : ''}`} onClick={toggleLessonRead} aria-pressed={isRead}><Icon name="check" />{c(isRead ? COPY.fullMarked : COPY.fullMark)}</button><button type="button" className={reference.continueButton} onClick={() => selectSection(CAA_TRACKED_IDS[activeIndex + 1])} disabled={activeIndex === CAA_TRACKED_IDS.length - 1}>{c(COPY.continue)}<Icon name="arrow" /></button></div></div>
    {authError ? <p className={styles.auth} role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p> : null}</header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2 className={reference.learningPathHeading}>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{navItems()}</nav></aside><article className={reference.lesson}>{CAA_CHAPTERS.map(section => <section key={section.id} id={section.id} className={`${reference.section} ${isSectionOpen(section) ? reference.sectionOpen : ''} ${section.emphasis ? reference.takeHomeSection : ''}`}><h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={isSectionOpen(section)} aria-controls={`${section.id}-panel`} onClick={() => section.emphasis ? toggleSummary() : selectSection(section.id)}><span className={reference.sectionIcon}><Icon name={section.icon} /></span><span><strong>{c(section.title)}</strong></span><span className={reference.toggle} aria-hidden="true">{isSectionOpen(section) ? '−' : '+'}</span></button></h2><div id={`${section.id}-panel`} className={reference.sectionBody} hidden={!isSectionOpen(section)}><ChapterContent id={section.id} lang={lang} />{!section.emphasis ? <button type="button" className={`${reference.readButton} ${readSections.has(section.id) ? reference.readButtonDone : ''}`} aria-pressed={readSections.has(section.id)} onClick={() => toggleSectionRead(section.id)}><Icon name="check" />{c(readSections.has(section.id) ? COPY.marked : COPY.mark)}</button> : null}</div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary>{CAA_SOURCES.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</details></article></div>
    <div className={styles.mobilePath}><button type="button" className={styles.mobileTrigger} aria-expanded={mobileOpen} aria-controls="caa-mobile-path" onClick={() => setMobileOpen(value => !value)}><Icon name="brain" /><strong>{c(COPY.path)}</strong><span>{readSections.size} / {CAA_TRACKED_IDS.length}</span></button><nav id="caa-mobile-path" className={`${reference.sidebar} ${styles.mobilePanel}`} aria-label={c(COPY.path)} hidden={!mobileOpen}><h2 className={reference.learningPathHeading}>{c(COPY.path)}</h2>{navItems()}<button type="button" onClick={() => selectSection('takehome')}><span className={reference.sideIcon}><Icon name="spark" /></span><strong>{c(summary.title)}</strong></button></nav></div>
  </main>;
}
