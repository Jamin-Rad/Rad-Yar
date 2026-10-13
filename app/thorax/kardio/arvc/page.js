'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LessonHero from '@/components/LessonHero';
import { useLanguage } from '@/providers/LanguageProvider';
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus';
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress';
import { ACM_ID, ACM_PATH as PATH, L, pick, TITLE, CHAPTERS, TRACKED_IDS, UI, SOURCES } from '@/data/arrhythmogenicCardiomyopathy';
import ChapterContent, { Icon } from './LessonContent';
import reference from '@/app/andarun/test/page.module.css';
import styles from './page.module.css';
const COPY = { ...UI, title: TITLE, continue: UI.next, fullMark: UI.all, fullMarked: UI.allDone, mcq: UI.quiz, flashcards: UI.cards, login: L('Anmelden','Sign in','ورود') };
const resolveChapter = hash => CHAPTERS.some(item => item.id === hash) ? hash : null;
export default function ACMPage() {
  const {
    lang
  } = useLanguage();
  const c = value => pick(value, lang);
  const {
    isRead,
    toggleRead,
    authError
  } = useLessonReadStatus(ACM_ID);
  const [readSections, setReadSections] = usePersistedSectionProgress(ACM_ID, TRACKED_IDS, isRead);
  const [openId, setOpenId] = useState('spektrum');
  const [mobileOpen, setMobileOpen] = useState(false);
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`;
  useEffect(() => {
    const syncHash = () => {
      const id = resolveChapter(window.location.hash.slice(1));
      setOpenId(id || 'spektrum');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, []);
  const selectSection = (id, collapse = false) => {
    const next = collapse && openId === id ? null : id;
    setOpenId(next);
    setMobileOpen(false);
    const url = new URL(window.location.href);
    url.hash = next || '';
    window.history.replaceState(null, '', url);
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start'
    }));
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
    if (toggleRead()) setReadSections(isRead ? new Set() : new Set(TRACKED_IDS));
  };
  const activeIndex = CHAPTERS.findIndex(s => s.id === openId);
  const navItems = () => CHAPTERS.filter(s => !s.emphasis).map(section => <button type="button" key={section.id} className={openId === section.id ? reference.activeSideItem : ''} aria-current={openId === section.id ? 'location' : undefined} onClick={() => selectSection(section.id)}><span className={reference.sideIcon}><Icon name={section.icon} /></span><strong>{c(section.title)}{readSections.has(section.id) ? <span className={styles.readTick} aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>);
  return <main className={`${reference.page} ${styles.page}`} data-lesson-progress-managed="true" data-disable-lesson-explorer="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={reference.header}><div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(L('Seitennavigation', 'Breadcrumb', 'مسیر صفحه'))}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/thorax')}>{c(L('Thorax', 'Thorax', 'قفسه سینه'))}</Link><span>/</span><strong>ACM</strong></nav><span className={reference.author}>Dr. Zia</span></div>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/acm-hero-schematic.webp" imageAlt={c(L('Schematische Darstellung von RV- und LV-Narben bei ACM', 'Schematic of RV and LV scar in ACM', 'شماتیک اسکار RV و LV در ACM'))} lang={lang} />
    <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => selectSection('takehome')}><Icon name="spark" />{c(CHAPTERS[7].title)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=thorax&n=10&themen=arvc&from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.mcq)}<Icon name="arrow" /></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/arvc?from=${encodeURIComponent(withLang(PATH))}`)}><Icon name="case" />{c(COPY.flashcards)}</Link></div>
    <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={TRACKED_IDS.length} aria-valuenow={readSections.size}><i style={{
            width: `${readSections.size / TRACKED_IDS.length * 100}%`
          }} /></div><span><bdi>{readSections.size} / {TRACKED_IDS.length}</bdi> {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={`${reference.lessonCompleteButton} ${isRead ? reference.lessonCompleteButtonDone : ''}`} onClick={toggleLessonRead} aria-pressed={isRead}><Icon name="check" />{c(isRead ? COPY.fullMarked : COPY.fullMark)}</button><button type="button" className={reference.continueButton} onClick={() => selectSection(CHAPTERS[activeIndex + 1].id)} disabled={activeIndex === CHAPTERS.length - 1}>{c(COPY.continue)}<Icon name="arrow" /></button></div></div>
    {authError ? <p className={styles.auth} role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p> : null}</header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{navItems()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(section => <section key={section.id} id={section.id} className={`${reference.section} ${openId === section.id ? reference.sectionOpen : ''} ${section.emphasis ? reference.takeHomeSection : ''}`}><h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={openId === section.id} aria-controls={`${section.id}-panel`} onClick={() => selectSection(section.id, true)}><span className={reference.sectionIcon}><Icon name={section.icon} /></span><span><strong>{c(section.title)}</strong></span><span className={reference.toggle} aria-hidden="true">{openId === section.id ? '−' : '+'}</span></button></h2><div id={`${section.id}-panel`} className={reference.sectionBody} hidden={openId !== section.id}><ChapterContent id={section.id} lang={lang} />{!section.emphasis ? <button type="button" className={`${reference.readButton} ${readSections.has(section.id) ? reference.readButtonDone : ''}`} aria-pressed={readSections.has(section.id)} onClick={() => toggleSectionRead(section.id)}><Icon name="check" />{c(readSections.has(section.id) ? COPY.marked : COPY.mark)}</button> : null}</div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary>{SOURCES.map(([title, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{title}</a>)}</details></article></div>
    <div className={styles.mobilePath}><button type="button" className={styles.mobileTrigger} aria-expanded={mobileOpen} aria-controls="acm-mobile-path" onClick={() => setMobileOpen(value => !value)}><Icon name="heart" /><strong>{c(COPY.path)}</strong><span><bdi>{readSections.size} / {TRACKED_IDS.length}</bdi></span></button><nav id="acm-mobile-path" className={`${reference.sidebar} ${styles.mobilePanel}`} aria-label={c(COPY.path)} hidden={!mobileOpen}>{navItems()}<button type="button" onClick={() => selectSection('takehome')}><span className={reference.sideIcon}><Icon name="spark" /></span><strong>{c(CHAPTERS[7].title)}</strong></button></nav></div>
  </main>;
}
