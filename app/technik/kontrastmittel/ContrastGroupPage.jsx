"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/providers/LanguageProvider";
import { useLessonReadStatus } from "@/hooks/useLessonReadStatus";
import { usePersistedSectionProgress } from "@/hooks/usePersistedSectionProgress";
import { CONTRAST_GROUPS, CONTRAST_QUESTIONS, getContrastGroup } from "@/data/contrastMedia";
import { CONTRAST_LESSONS, CONTRAST_UI, CONTRAST_SOURCES, localizeContrast } from "@/data/contrastLessons";
import BookView from "@/components/book-view/BookView";
import BookCheckpoint from "@/components/book-view/BookCheckpoint";
import { LessonViewProvider, LessonViewToggle, useLessonView } from "@/components/book-view/BookViewContext";
import { questionIdsForSection } from "@/components/book-view/pilots";
import styles from "./curriculum.module.css";
const copy = (lang, de, en, fa) => localizeContrast({ de, en, fa }, lang);
const migrateUltrasound = (saved) => saved.flatMap((id) => id === "take-home" ? ["takehome"] : id === "self-check" ? [] : [id]);
const identity = (saved) => saved;
function ScientificText({ text, lang }) {
  if (lang !== "fa") return text;
  const pattern = /((?:eGFR\s*)?[<>≤≥]\s*\d+(?:[.,]\d+)?(?:\s*(?:ml\/min\/1\.73 m²|mg\/dl))?|\d+(?:[.,]\d+)?\s*(?:mmol\/kg|ml\/s|mg I\/ml)|[A-Za-z][A-Za-z0-9³⁺₆₂*\-–/®]*(?:\s+[IVX]+)?)/g;
  return text.split(pattern).map((part, i) => i % 2 ? <bdi dir="ltr" key={i}>{part}</bdi> : part);
}
function IodineExplorer({ ui }) {
  const [concentration, setConcentration] = useState(300);
  const [flow, setFlow] = useState(3);
  return <section className={styles.explorer} data-book-atomic aria-label={ui.explorer}>
  <h3>{ui.explorer}</h3>
  <div className={styles.equation} dir="ltr">
   <label>{ui.concentration}<select value={concentration} onChange={(e) => setConcentration(Number(e.target.value))}>{[300, 350, 375, 400].map((n) => <option key={n} value={n}>{n} mg I/ml</option>)}</select></label>
   <span aria-hidden="true">×</span>
   <label>{ui.flow}<select value={flow} onChange={(e) => setFlow(Number(e.target.value))}>{[2.5, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ml/s</option>)}</select></label>
   <span aria-hidden="true">=</span>
   <div><span>{ui.rate}</span><output aria-live="polite">{concentration * flow}<small> mg I/s</small></output></div>
  </div>
  <p>{ui.example}</p>
 </section>;
}
function BubbleExplorer({ lang }) {
  const [bubble, setBubble] = useState(true);
  const tissue = copy(lang, "Gewebe", "Tissue", "بافت");
  const bubbles = copy(lang, "Mikrobläschen", "Microbubble", "میکروحباب");
  return <section className={styles.explorer} data-book-atomic aria-label={copy(lang, "Signalvergleich", "Signal comparison", "مقایسهٔ سیگنال")}>
  <div className={styles.segment} role="group" aria-label={copy(lang, "Antwort wählen", "Choose response", "انتخاب پاسخ")}>
   <button type="button" aria-pressed={!bubble} onClick={() => setBubble(false)}>{tissue}</button><button type="button" aria-pressed={bubble} onClick={() => setBubble(true)}>{bubbles}</button>
  </div>
  <svg viewBox="0 0 680 160" role="img" aria-label={bubble ? copy(lang, "Asymmetrische Schwingung, nichtlineare Antwort", "Asymmetric oscillation, nonlinear response", "نوسان نامتقارن و پاسخ غیرخطی") : copy(lang, "Überwiegend lineare Gewebeantwort", "Predominantly linear tissue response", "پاسخ عمدتاً خطی بافت")}>
   <path d="M20 80H660" stroke="#d4dedd" fill="none" />
   <path d={bubble ? "M20 80 Q40 -5 65 80 Q76 112 90 80 Q110 -5 135 80 Q146 112 160 80 Q180 -5 205 80 Q216 112 230 80 Q250 -5 275 80 Q286 112 300 80 Q320 -5 345 80 Q356 112 370 80 Q390 -5 415 80 Q426 112 440 80 Q460 -5 485 80 Q496 112 510 80 Q530 -5 555 80 Q566 112 580 80 Q600 -5 625 80 Q636 112 660 80" : "M20 80 Q45 20 70 80 T120 80 T170 80 T220 80 T270 80 T320 80 T370 80 T420 80 T470 80 T520 80 T570 80 T620 80 T660 80"} fill="none" stroke={bubble ? "#237c7e" : "#60436b"} strokeWidth="3" />
  </svg>
  <p aria-live="polite">{bubble ? copy(lang, "Nichtlineare Schwingung erzeugt Harmonische. Niedriger MI hilft, Bläschen zu erhalten.", "Nonlinear oscillation produces harmonics. Low MI helps preserve bubbles.", "نوسان غیرخطی هارمونیک می‌سازد. MI پایین به حفظ حباب کمک می‌کند.") : copy(lang, "Gewebe antwortet überwiegend linear; die Trennung nutzt kontrastspezifische Pulsfolgen.", "Tissue responds predominantly linearly; contrast-specific pulses separate the signals.", "پاسخ بافت عمدتاً خطی است؛ پالس‌های اختصاصی کنتراست به جداسازی کمک می‌کنند.")}</p>
  <small>{copy(lang, "Konzeptschema, keine Messkurve oder Patientenaufnahme.", "Conceptual schematic, not a measured trace or patient image.", "طرح مفهومی است، نه منحنی اندازه‌گیری یا تصویر بیمار.")}</small>
 </section>;
}
function ContentBlock({ block, lang, ui, withLang, onOpen }) {
  const l = (value) => <ScientificText text={localizeContrast(value, lang)} lang={lang} />;
  if (block.type === "prose") return <div>{block.title && <h3>{l(block.title)}</h3>}{block.paragraphs.map((text, i) => <p key={i}>{l(text)}</p>)}</div>;
  if (block.type === "comparison") return <div className={styles.comparison} data-book-group>{block.items.map((item, i) => <div key={i}><h3>{l(item.title)}</h3><p>{l(item.text)}</p></div>)}</div>;
  if (block.type === "callout") return <aside className={styles.note} data-book-note><p>{l(block.text)}</p></aside>;
  if (block.type === "table") return <div className={styles.tableWrap} data-book-atomic><table><thead><tr>{block.headers.map((h, i) => <th key={i} scope="col">{l(h)}</th>)}</tr></thead><tbody>{block.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{l(c)}</td>)}</tr>)}</tbody></table></div>;
  if (block.type === "steps") return <ol className={styles.steps} data-book-group>{block.items.map((item, i) => <li key={i}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div><h3>{l(item.title)}</h3><p>{l(item.text)}</p></div></li>)}</ol>;
  if (block.type === "iodineExplorer") return <IodineExplorer ui={ui} />;
  if (block.type === "bubbleExplorer") return <BubbleExplorer lang={lang} />;
  if (block.type === "diagram") return <figure className={styles.diagram} data-book-image><Image src={block.src} alt={localizeContrast(block.alt, lang)} width={700} height={350} priority /><figcaption>{l(block.alt)}</figcaption></figure>;
  if (block.type === "imageGallery") return <div>{block.images.map((item) => <figure className={styles.sourceImage} key={item.src} data-book-image data-no-zoom><button type="button" onClick={() => onOpen({ ...item, alt: localizeContrast(item.alt, lang) })} aria-label={`${ui.openImage}: ${localizeContrast(item.alt, lang)}`}><Image src={item.src} alt={localizeContrast(item.alt, lang)} width={1763} height={695} sizes="(max-width: 1000px) 95vw, 850px" /></button><figcaption>{l(item.caption)}</figcaption></figure>)}</div>;
  if (block.type === "takehome") return <ol className={styles.takehome} data-book-group>{block.items.map((item, i) => <li key={i}>{l(item)}</li>)}</ol>;
  if (block.type === "lessonLink") return <Link className={styles.lessonLink} href={withLang(`/technik/kontrastmittel/${block.target}`)}>{l(block.label)} <span aria-hidden="true">↗</span></Link>;
  return null;
}
function FigureDialog({ image, close, ui }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);
  return <dialog ref={dialog} className={styles.lightbox} data-no-zoom onCancel={close} onClick={(e) => {
    if (e.target === e.currentTarget) close();
  }} aria-label={image.alt}><div><button type="button" onClick={close} aria-label={ui.closeImage}>×</button><Image src={image.src} alt={image.alt} width={1763} height={695} sizes="95vw" /><p>{image.alt}</p></div></dialog>;
}
function Curriculum({ groupId }) {
  const { lang } = useLanguage();
  const { mode, navigate, anchor } = useLessonView();
  const group = getContrastGroup(groupId);
  const lesson = CONTRAST_LESSONS[groupId];
  const ui = CONTRAST_UI[lang] || CONTRAST_UI.de;
  const l = (value) => localizeContrast(value, lang);
  const { isRead, toggleRead, authError } = useLessonReadStatus(group.readId);
  const lessonId = groupId === "ultraschall" ? `ref-${group.readId}` : group.readId;
  const ids = useMemo(() => lesson.sections.map((s) => s.id), [lesson]);
  const [read, setRead] = usePersistedSectionProgress(lessonId, ids, isRead, groupId === "ultraschall" ? migrateUltrasound : identity);
  const [active, setActive] = useState(ids[0]);
  const [lightbox, setLightbox] = useState(null);
  const root = useRef(null);
  const toc = useRef(null);
  const book = mode === "book";
  const withLang = (href) => lang === "de" ? href : `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`;
  const path = `/technik/kontrastmittel/${groupId}`;
  const go = (event, id) => {
    event.preventDefault();
    if (book) navigate(id);
    else {
      const el = document.getElementById(id);
      anchor.current = el;
      if (toc.current) toc.current.open = false;
      requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth", block: "start" }));
      window.history.replaceState(null, "", `#${id}`);
      setActive(id);
    }
  };
  useEffect(() => {
    const restore = (e) => {
      const el = e.target.closest("[data-book-section]");
      if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    };
    const host = root.current;
    host.addEventListener("book:restore", restore);
    return () => host.removeEventListener("book:restore", restore);
  }, [groupId]);
  useEffect(() => {
    if (book) return;
    const host = root.current;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: "-100px 0px -65% 0px" });
    host.querySelectorAll("[data-book-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [book, groupId]);
  const nav = <nav aria-label={ui.toc}>{lesson.sections.map((section, i) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : void 0} onClick={(e) => go(e, section.id)}><span>{String(i + 1).padStart(2, "0")}</span><span>{l(section.title)}</span>{read.has(section.id) && <b aria-label={ui.read}>✓</b>}</a>)}</nav>;
  return <main ref={root} className={`${styles.curriculum} ${book ? styles.presenting : ""}`} lang={lang} dir={lang === "fa" ? "rtl" : "ltr"} data-contrast-curriculum="2026-pdf-rebuild" data-lesson-progress-managed="true" data-lehr-sections-managed="true">
  <header className={styles.header}>
   <Link className={styles.breadcrumb} href={withLang("/lernen/technik")}>{ui.breadcrumb}</Link>
   <div className={styles.headingRow}><div><h1>{l(lesson.title)}</h1><p className={styles.meta}>{ui.source} · {lesson.pages.join("–")} · Dr. Zia</p></div>
    <div className={styles.actions}><a href="#takehome" onClick={(e) => go(e, "takehome")}>{ui.take}</a><Link href={withLang(`/ueben/quiz?fach=technik&n=10&themen=${group.topicIds.join(",")}&from=${encodeURIComponent(path)}`)}>{ui.mcq}</Link><Link href={withLang(`/flashcards/${group.flashcardId}?from=${encodeURIComponent(path)}`)}>{ui.flashcards}</Link><LessonViewToggle lang={lang} variant="action" /></div>
   </div>
   <p className={styles.intro}>{l(lesson.intro)}</p>
   <nav className={styles.topics} aria-label={ui.all}>{CONTRAST_GROUPS.map((item) => <Link key={item.id} href={withLang(`/technik/kontrastmittel/${item.id}`)} aria-current={item.id === groupId ? "page" : void 0}>{l(item.title)}</Link>)}</nav>
  </header>
  <div className={styles.layout}>
   <aside className={styles.rail}><strong>{ui.toc}</strong>{nav}<div className={styles.progress}><progress max={ids.length} value={read.size} aria-label={ui.read} /><small>{read.size} / {ids.length} · {ui.read}</small></div></aside>
   <details ref={toc} className={styles.mobileToc}><summary>{ui.toc}<span aria-hidden="true">⌄</span></summary>{nav}</details>
   <article className={styles.article}>
    <BookView title={l(lesson.title)} sections={lesson.sections.map((s) => ({ id: s.id, title: l(s.title) }))} lang={lang}>
     {lesson.sections.map((section, i) => <section key={section.id} id={section.id} className={styles.chapter} data-book-section>
      <h2><span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>{l(section.title)}</h2>
      <div data-book-body>{section.blocks.map((block, j) => <ContentBlock key={`${section.id}-${j}`} block={block} lang={lang} ui={ui} withLang={withLang} onOpen={setLightbox} />)}
       <BookCheckpoint questions={CONTRAST_QUESTIONS[lang] || CONTRAST_QUESTIONS.de} questionIds={questionIdsForSection(lessonId, section.id, lang)} lang={lang} showInClassic />
      </div>
      <footer className={styles.chapterFooter} data-book-ignore><small>{section.pages.length ? `${ui.sourcePage} ${section.pages.join("–")}` : ""}</small><button type="button" aria-pressed={read.has(section.id)} onClick={() => setRead((previous) => {
    const next = new Set(previous);
    next.has(section.id) ? next.delete(section.id) : next.add(section.id);
    return next;
  })}>{read.has(section.id) ? `✓ ${ui.read}` : ui.mark}</button></footer>
     </section>)}
     <section id="quellen" className={styles.sources} data-book-section data-book-slide><h2>{ui.sources}</h2><p>{ui.source} · PDF 120–131, 133–134 · Dr. Zia. {ui.updated} · 29.10.2026.</p><ul>{CONTRAST_SOURCES.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul><div data-book-ignore><button className={styles.readLesson} type="button" aria-pressed={isRead} onClick={() => {
    if (toggleRead() && isRead) setRead(/* @__PURE__ */ new Set());
  }}>{isRead ? `✓ ${ui.read}` : copy(lang, "Gesamte Lektion als gelesen markieren", "Mark entire lesson as read", "علامت‌گذاری کل درس به‌عنوان خوانده‌شده")}</button>{authError && <p role="alert">{ui.auth} <Link href={withLang("/sign-in")}>{ui.signIn}</Link></p>}</div></section>
    </BookView>
   </article>
  </div>
  {lightbox && <FigureDialog image={lightbox} close={() => setLightbox(null)} ui={ui} />}
 </main>;
}
function ContrastGroupPage({ groupId }) {
  const group = getContrastGroup(groupId);
  return <LessonViewProvider lessonId={groupId === "ultraschall" ? `ref-${group.readId}` : group.readId}><Curriculum groupId={groupId} /></LessonViewProvider>;
}
export {
  ContrastGroupPage as default
};
