'use client'
import {useEffect,useMemo,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useLanguage} from '@/providers/LanguageProvider'
import {useLessonReadStatus} from '@/hooks/useLessonReadStatus'
import {useMobileLearningLayout} from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import shared from '../grundlagen/page.module.css'
import basics from '../../mrt/basics/page.module.css'
import styles from './page.module.css'
import caseStyles from './case.module.css'
import {COPY,DISTRIBUTION,GERMAN_SECTIONS,L,MORPH,pick} from './content'
import {translateLesson} from './translations'
const ID='mammographie-mikrokalk',PATH='/mamma/bildgebung/mammographie/verkalkungen'
const READ={de:['Als gelesen markieren','Als gelesen markiert','Bitte melde dich an, um deinen Lernfortschritt zu speichern.','Anmelden'],en:['Mark as read','Marked as read','Please sign in to save your learning progress.','Sign in'],fa:['علامت‌گذاری به‌عنوان خوانده‌شده','به‌عنوان خوانده‌شده علامت‌گذاری شد','برای ذخیره پیشرفت لطفاً وارد شوید.','ورود']}
const MORPHOLOGY_IMAGES={
  round:{src:'/mamma/mammographie/verkalkungen/morphology/round.png',width:309,height:895,alt:L('Runde, scharf begrenzte Verkalkungen mit Vergrößerung','Round, well-defined calcifications with magnified view','کلسیفیکاسیون‌های گرد و با حدود مشخص همراه با نمای بزرگ‌نمایی‌شده')},
  amorph:{src:'/mamma/mammographie/verkalkungen/morphology/amorphous.png',width:307,height:1024,alt:L('Amorphe, unscharf begrenzte Verkalkungen mit Vergrößerung','Amorphous, indistinct calcifications with magnified view','کلسیفیکاسیون‌های آمورف و نامشخص همراه با نمای بزرگ‌نمایی‌شده')},
  coarse:{src:'/mamma/mammographie/verkalkungen/morphology/coarse-heterogeneous.png',width:305,height:895,alt:L('Grob heterogene Verkalkungen mit Vergrößerung','Coarse heterogeneous calcifications with magnified view','کلسیفیکاسیون‌های درشت ناهمگون همراه با نمای بزرگ‌نمایی‌شده')},
  pleomorphic:{src:'/mamma/mammographie/verkalkungen/morphology/fine-pleomorphic.png',width:304,height:895,alt:L('Fein pleomorphe Verkalkungen mit Vergrößerung','Fine pleomorphic calcifications with magnified view','کلسیفیکاسیون‌های ظریف پلئومورفیک همراه با نمای بزرگ‌نمایی‌شده')},
  linear:{src:'/mamma/mammographie/verkalkungen/morphology/fine-linear-branching.png',width:307,height:895,alt:L('Fein lineare und verzweigte Verkalkungen mit Vergrößerung','Fine linear and branching calcifications with magnified view','کلسیفیکاسیون‌های ظریف خطی و شاخه‌دار همراه با نمای بزرگ‌نمایی‌شده')},
}
const DISTRIBUTION_IMAGES={
  diffuse:{src:'/mamma/mammographie/verkalkungen/distribution/diffuse.png',width:307,height:1024,alt:L('Diffuse Verteilung von Verkalkungen mit Vergrößerung','Diffuse distribution of calcifications with magnified view','توزیع منتشر کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  regional:{src:'/mamma/mammographie/verkalkungen/distribution/regional.png',width:307,height:1024,alt:L('Regionale Verteilung von Verkalkungen mit Vergrößerung','Regional distribution of calcifications with magnified view','توزیع ناحیه‌ای کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  grouped:{src:'/mamma/mammographie/verkalkungen/distribution/grouped.png',width:308,height:1024,alt:L('Gruppierte Verteilung von Verkalkungen mit Vergrößerung','Grouped distribution of calcifications with magnified view','توزیع گروهی کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  linear:{src:'/mamma/mammographie/verkalkungen/distribution/linear.png',width:307,height:1024,alt:L('Lineare Verteilung von Verkalkungen mit Vergrößerung','Linear distribution of calcifications with magnified view','توزیع خطی کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
  segmental:{src:'/mamma/mammographie/verkalkungen/distribution/segmental.png',width:307,height:1024,alt:L('Segmentale Verteilung von Verkalkungen mit Vergrößerung','Segmental distribution of calcifications with magnified view','توزیع سگمنتال کلسیفیکاسیون‌ها همراه با نمای بزرگ‌نمایی‌شده')},
}
const CALC_MATRIX={
  round:{diffuse:'3',regional:'3',grouped:'3',linear:'3',segmental:'4B'},
  amorph:{diffuse:'3',regional:'3',grouped:'4B',linear:'4B',segmental:'4B'},
  coarse:{diffuse:'3',regional:'3',grouped:'4A',linear:'4B',segmental:'4B'},
  pleomorphic:{diffuse:'4B',regional:'4B',grouped:'4C',linear:'4C',segmental:'4C'},
  linear:{diffuse:'4C',regional:'4B',grouped:'4C',linear:'5',segmental:'5'},
}
const CALC_CLASS={'3':'cat3','4A':'cat4a','4B':'cat4b','4C':'cat4c','5':'cat5'}
const SECTION_ICON_PATHS={
  grundlagen:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  groesse:'M4 8v8 M20 8v8 M4 12h16 M8 9l-4 3 4 3 M16 9l4 3-4 3',
  morphologie:'M6 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M15 4l5 3-2 5-5-2z M6 16l3-2 3 4-4 3z M16 17l4 3',
  verteilung:'M5 4v5l7 5v6 M19 4v5l-7 5 M12 3v11',
  ausdehnung:'M9 4H4v5 M15 4h5v5 M4 15v5h5 M20 15v5h-5 M8 12h8 M12 8v8',
  kombination:'M4 4h16v16H4z M4 10h16 M10 4v16 M15 14v4 M13 16h4',
  benigne:'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
  ultraschall:'M3 5h18v13H3z M8 21h8 M12 18v3 M5 12h3l2-4 4 7 2-3h3',
  technik:'M3 5h18v14H3z M7 9h10 M7 13h6 M8 22h8',
  kontext:'M12 4v16 M4 12h16 M7 7l10 10 M17 7L7 17',
  algorithmus:'M6 4h14v17H6z M3 8h5 M3 13h5 M3 18h5 M11 12l2 2 4-5',
  warnung:'M12 3L2 21h20z M12 9v5 M12 17v1',
}
function SectionIcon({id}){return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={SECTION_ICON_PATHS[id]||SECTION_ICON_PATHS.ultraschall}/></svg>}
const CALC_META={
  '3':{risk:'> 0 bis ≤ 2 %',label:'wahrscheinlich benigne',action:'Bei bestätigter Kategorie: Kontrolle nach 6 Monaten',mri:'Eine MRT ist für die reguläre BI-RADS-3-Verlaufskontrolle nicht erforderlich.'},
  '4A':{risk:'> 2 bis ≤ 10 %',label:'gering suspekt',action:'Biopsie empfohlen',mri:'Negative MRT: Bei ausgewählten reinen Mikroverkalkungen mit niedrigem Ausgangsrisiko kann individuell eine mammographische Kontrolle statt Biopsie diskutiert werden. Studien nennen 6–12 Monate; kein pauschaler Biopsieverzicht.'},
  '4B':{risk:'> 10 bis ≤ 50 %',label:'mäßig suspekt',action:'Biopsie empfohlen',mri:'Negative MRT: individuelle Entscheidung unter Berücksichtigung des Ausgangsrisikos. Bei Biopsieverzicht ist Zurückhaltung geboten; in der Regel bleibt die Biopsie empfohlen.'},
  '4C':{risk:'> 50 bis < 95 %',label:'stark suspekt',action:'Biopsie empfohlen',mri:'Negative MRT: histologische Abklärung weiterhin erforderlich.'},
  '5':{risk:'≥ 95 %',label:'hochgradig malignomverdächtig',action:'Histologische Sicherung erforderlich',mri:'Negative MRT: Biopsie erforderlich; der hochsuspekte Mammographiebefund bleibt maßgeblich.'},
}
const CALC_FACTORS=[
  {key:'progression',group:'Verlauf',title:'Neu, zunehmend oder stabil?',text:'Neuauftreten und Progression erhöhen den Verdacht.\nStabilität kann entlasten, schließt bei suspekter Morphologie aber Malignität nicht aus.'},
  {key:'extent',group:'Ausdehnung',title:'Das gesamte Kalkareal beachten',text:'Eine größere Ausdehnung kann das Risiko erhöhen.'},
  {key:'associated',group:'Begleitbefunde',title:'Masse oder Architekturstörung?',text:'Assoziierte Gewebeveränderungen können den Verdacht verstärken. Auch Asymmetrie sowie Haut- und Mamillenveränderungen mitbeurteilen.'},
  {key:'history',group:'Risikokontext',title:'Alter und Anamnese einbeziehen',text:'Höheres Alter und eine persönliche Brustkrebsanamnese können das Ausgangsrisiko erhöhen. Entscheidend bleibt der Gesamtbefund.'},
]
function Section({id,title,children}){const mobile=useMobileLearningLayout();const[open,setOpen]=useState(true);useEffect(()=>setOpen(!mobile),[mobile,id]);return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}><button type="button" className={`${base.sectionHeader} ${basics.sectionHeader}`} onClick={()=>setOpen(v=>!v)} aria-expanded={open}><span className={basics.sectionHeading}><h2>{title}</h2></span><span className={basics.sectionToggle}>{open?'−':'+'}</span></button>{open&&<div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>}
function ReadButton({lang,isRead,toggle,authError}){const t=READ[lang]||READ.de;return <div className={base.readControl}><button type="button" className={`${base.readButton} ${basics.readButton} ${isRead?`${base.readButtonActive} ${basics.readButtonActive}`:''}`} onClick={toggle}><span className={`${base.readCheck} ${basics.readCheck}`}>{isRead?'✓':''}</span><span>{isRead?t[1]:t[0]}</span></button>{authError&&<div className={base.readError}><span>{t[2]}</span><Link href="/sign-in">{t[3]}</Link></div>}</div>}
function MorphologyImage({type,lang='de'}){const image=MORPHOLOGY_IMAGES[type];return <a className={caseStyles.morphologyIllustration} href={image.src} target="_blank" rel="noreferrer" aria-label={pick(image.alt,lang)}><Image src={image.src} alt={pick(image.alt,lang)} width={image.width} height={image.height}/></a>}
function DistributionImage({type,lang='de'}){const image=DISTRIBUTION_IMAGES[type];return <a className={caseStyles.distributionIllustration} href={image.src} target="_blank" rel="noreferrer" aria-label={pick(image.alt,lang)}><Image src={image.src} alt={pick(image.alt,lang)} width={image.width} height={image.height}/></a>}
function KalkAssessment({lang}){
  const t=value=>translateLesson(value,lang)
  const[morph,setMorph]=useState('amorph')
  const[dist,setDist]=useState('grouped')
  const resultCategory=CALC_MATRIX[morph][dist]
  const result=CALC_META[resultCategory]
  const selectCell=(nextMorph,nextDist)=>{setMorph(nextMorph);setDist(nextDist)}
  return <div className={caseStyles.assessment}>
    <div className={caseStyles.assessmentIntro}>
      <div><small>{t("Interaktives Orientierungsmodell")}</small><h3>{t("BI-RADS")}<span>{t("(Kalzifikationen: Morphologie × Verteilung)")}</span></h3></div>
    </div>
    <div className={caseStyles.assessmentCalculator}>
      <div className={caseStyles.assessmentInputs}>
        <label><span>{t("1 · Morphologie")}</span><select value={morph} onChange={event=>setMorph(event.target.value)}>{MORPH.map(item=><option key={item.key} value={item.key}>{pick(item.title,lang)}</option>)}</select></label>
        <span className={caseStyles.assessmentOperator}>×</span>
        <label><span>{t("2 · Verteilung")}</span><select value={dist} onChange={event=>setDist(event.target.value)}>{DISTRIBUTION.map(item=><option key={item.key} value={item.key}>{pick(item.title,lang)}</option>)}</select></label>
      </div>
      <div className={`${caseStyles.assessmentResult} ${caseStyles[CALC_CLASS[resultCategory]]}`} aria-live="polite">
        <span>{t("Modellergebnis")}</span><strong>{t("BI-RADS")}{" "}{resultCategory}</strong><b>{t(result.label)}</b><small>{t("Risikorahmen der Kategorie:")}{" "}{t(result.risk)}</small><small>{resultCategory==='3'&&!(morph==='round'&&dist==='grouped')?t("Klinische Kategorie gesondert prüfen: Dieses Modellergebnis begründet keine Verlaufskontrolle."):t(result.action)}</small>
      </div>
    </div>
    <div className={caseStyles.matrixHeading}><small>{t("Kategorien im Überblick")}</small></div>
    <div className={caseStyles.biradsMatrix}>
      <table>
        <thead><tr><th>{t("Morphologie ↓")}</th>{DISTRIBUTION.map(item=><th key={item.key} className={dist===item.key?caseStyles.axisActive:''}>{pick(item.title,lang)}</th>)}</tr></thead>
        <tbody>{MORPH.map(item=><tr key={item.key}><th className={morph===item.key?caseStyles.axisActive:''}>{pick(item.title,lang)}</th>{DISTRIBUTION.map(distribution=>{const value=CALC_MATRIX[item.key][distribution.key];const active=item.key===morph&&distribution.key===dist;return <td key={distribution.key} className={`${caseStyles[CALC_CLASS[value]]} ${active?caseStyles.cellActive:''}`}><button type="button" onClick={()=>selectCell(item.key,distribution.key)} aria-label={`${pick(item.title,lang)}, ${pick(distribution.title,lang)}: BI-RADS ${value}`} aria-pressed={active}>{value}</button></td>})}</tr>)}</tbody>
      </table>
    </div>
    <p className={caseStyles.biradsCaption}>{t("Matrix: vereinfachte Orientierung nach dem Scoring-Modell von Youk et al., Korean J Radiol. · Terminologie: ACR BI-RADS® Atlas, 5. Auflage. Das Studienmodell ersetzt keine klinische BI-RADS-Zuordnung; die Risikospannen sind keine individuelle Risikoberechnung.")}</p>
    <div className={caseStyles.contextPanel}>
      <div className={caseStyles.contextPanelHead}><h4>{t("Modifikatoren")}</h4></div>
      <div className={caseStyles.contextFactorGrid}>{CALC_FACTORS.map((factor,index)=><article key={factor.key} className={caseStyles.contextFactor}><span className={caseStyles.factorIndex}>{String(index+1).padStart(2,'0')}</span><small>{t(factor.group)}</small><strong>{t(factor.title)}</strong><p style={{whiteSpace:'pre-line'}}>{t(factor.text)}</p></article>)}</div>
      <p className={caseStyles.biradsCaption}>{t("Zusätzlich mitbeurteilen – keine festen Plus-/Minus-Stufen und kein additiver BI-RADS-Score.")}</p>
      <div className={caseStyles.negativeMriNote} aria-live="polite"><SectionIcon id="ultraschall"/><div><h4>{t("Negative MRT · BI-RADS")}{" "}{resultCategory}</h4><p>{t(result.mri)}</p></div></div>
    </div>
  </div>
}
function Lines({children}){return <span style={{whiteSpace:'pre-line'}}>{children}</span>}
function LessonContent({lang}){const t=value=>translateLesson(value,lang);return <>
  <Section {...GERMAN_SECTIONS[0]} title={t(GERMAN_SECTIONS[0].label.de)}>
    <h3 className={`${styles.takeTitle} ${caseStyles.sectionTitleRule}`}>{t("Systematische Beurteilung")}</h3>
    <div className={`${styles.context} ${caseStyles.systematicGrid}`}>
      <article><span>01</span><h3>{t("Partikelgröße")}</h3><p>{t("Wie groß sind die einzelnen Verkalkungen?")}</p></article>
      <article><span>02</span><h3>{t("Morphologie")}</h3><p>{t("Wie sehen die einzelnen Kalkpartikel aus?")}</p></article>
      <article><span>03</span><h3>{t("Verteilungsmuster")}</h3><p>{t("Wie sind die Kalkpartikel innerhalb der Brust räumlich angeordnet?")}</p></article>
      <article><span>04</span><h3>{t("Ausdehnung")}</h3><p>{t("Wie groß ist das gesamte betroffene Kalkareal?")}</p></article>
    </div>
    <p className={styles.lead}>{t("Auch Verlauf, klinischer Kontext und Begleitbefunde – insbesondere eine assoziierte Masse oder Architekturstörung – sind für die Gesamtbeurteilung relevant.")}</p>
    <div className={styles.rule}><strong>{t("Grundprinzip")}</strong><p>{t("Kalk ist ein bildgebender Phänotyp und allein keine Diagnose.")}</p></div>
    <div><h3 className={`${styles.takeTitle} ${caseStyles.sectionTitleRule}`}>{t("Technik")}</h3><div className={caseStyles.techniqueGrid}><article><SectionIcon id="technik"/><h4>{t("Mammographie · MG")}</h4><p>{t("Gezielte 2D-Vergrößerungsaufnahmen zeigen die Kalkdetails.")}</p></article><article><SectionIcon id="ausdehnung"/><h4>{t("Tomosynthese · DBT")}</h4><p>{t("Ergänzt Lokalisation und Gewebekontext, ersetzt bei der Kalkabklärung aber keine Vergrößerungsaufnahmen.")}</p></article></div></div>
  </Section>

  <Section {...GERMAN_SECTIONS[1]} title={t(GERMAN_SECTIONS[1].label.de)}>
    <p className={`${styles.lead} ${caseStyles.emphasizedLead}`}>{t("Makroverkalkungen (> 2 mm) beziehungsweise typisch grobschollige Verkalkungen (irregulär geformt, jedoch mit glatter Begrenzung) sind in der Regel benign.")}</p>
    <p className={styles.lead}>{t("Malignitätsassoziierte Mikroverkalkungen sind häufig kleiner als 0,5 mm, insbesondere fein pleomorphe und fein lineare Formen. Kleine Partikel kommen jedoch auch bei benignen Befunden vor: Die Größe allein trennt nicht sicher zwischen benign und malign.")}</p>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grobschollige Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86372/r-cc.png" alt={t("CC-Mammographie rechts mit grobscholligen Verkalkungen")} width={394} height={814}/></a><figcaption>{t("CC rechts")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86372/r-mlo.png" alt={t("MLO-Mammographie rechts mit grobscholligen Verkalkungen")} width={413} height={818}/></a><figcaption>{t("MLO rechts")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Größe und Morphologie:")}</strong>{" "}{t("Mehrere große, grobe und glatt begrenzte Verkalkungen in der rechten Brust.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/86372/studies/102403#t=im&v1i=54303996&v1z=1&v2i=54303997&v2z=1&v3i=54303998&v3z=1&v4i=54303999&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 86372 (Vollbild)")}</a>.</p>
    </article>
    <div className={styles.rule}><strong>{t("Merke")}</strong><p>{t("Größe allein beweist keine Benignität – Morphologie und Verteilung entscheiden über das tatsächliche Risiko.")}</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[2]} title={t(GERMAN_SECTIONS[2].label.de)}>
    <p className={styles.lead}>{t("Die Morphologie beschreibt die Form der einzelnen Kalkpartikel.")}</p>
    <div className={caseStyles.morphologyArrow}><span>{t("benigne")}</span><b>{t("suspekt")}</b></div>
    <div className={`${styles.morphRail} ${caseStyles.morphologyScale}`}>
      <article className={caseStyles.morphBenign}><span>01</span><h3>{t("Rund")}</h3><p>{t("Glatte, runde Verkalkungen.")}</p><MorphologyImage type="round" lang={lang}/></article>
      <article className={caseStyles.morphIntermediate}><span>02</span><h3>{t("Amorph")}</h3><p>{t("Sehr kleine, unscharfe Partikel ohne erkennbare Form. Die Verteilung ist für das Management besonders wichtig.")}</p><MorphologyImage type="amorph" lang={lang}/></article>
      <article className={caseStyles.morphIntermediate}><span>03</span><h3>{t("Grob heterogen")}</h3><p>{t("Irregulär geformt, meist 0,5–1 mm: größer als amorphe, aber kleiner als typisch grobe benigne Verkalkungen.")}</p><MorphologyImage type="coarse" lang={lang}/></article>
      <article className={caseStyles.morphIntermediate}><span>04</span><h3>{t("Fein pleomorph")}</h3><p>{t("Feine Verkalkungen unterschiedlicher Form und Größe.")}</p><MorphologyImage type="pleomorphic" lang={lang}/></article>
      <article className={caseStyles.morphSuspicious}><span>05</span><h3>{t("Fein linear / verzweigt")}</h3><p>{t("Sehr feine, irreguläre lineare oder verzweigte Verkalkungen.")}</p><MorphologyImage type="linear" lang={lang}/></article>
    </div>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grob heterogene Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-67107/ccd-1.png" alt={t("Vergrößerungsaufnahme der rechten Brust mit grob heterogenen Verkalkungen")} width={461} height={645}/></a><figcaption>{t("Vergrößerungsaufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-67107/ccd-2.png" alt={t("Detailaufnahme grob heterogener Verkalkungen")} width={594} height={506}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Gruppierte, irreguläre und unterschiedlich große Verkalkungen, größer und dichter als amorphe Partikel, aber ohne typisch grobschollige Benignitätsmerkmale.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/67107/studies/76445?lang=us#t=im&v1i=47601418&v1z=1&v2i=47601419&v2z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 67107 (Vollbild)")}</a>.</p>
    </article>
    <div className={`${styles.rule} ${caseStyles.multiParagraph}`}><strong>{t("Merke")}</strong><p>{t("Fein lineare/verzweigte Verkalkungen sind hochsuspekt und häufig mit DCIS assoziiert.")}</p><p>{t("Eine einzelne Gruppe runder/punktförmiger Verkalkungen ohne Voraufnahmen kann nach vollständiger diagnostischer Abklärung und ohne suspekte Zusatzmerkmale als BI-RADS 3 eingestuft werden; erste Kontrolle nach 6 Monaten. Das gilt nicht pauschal für amorphe Verkalkungen.")}</p></div>
    <p className={caseStyles.biradsCaption}>{t("Einordnung:")}{" "}<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5787219/" target="_blank" rel="noreferrer">{t("BI-RADS 3: Current and Future Use")}</a>.</p>
  </Section>

  <Section {...GERMAN_SECTIONS[3]} title={t(GERMAN_SECTIONS[3].label.de)}>
    <p className={styles.lead}>{t("Neben der Morphologie muss immer beschrieben werden, wie sich die Verkalkungen innerhalb der Brust verteilen.")}</p>
    <div className={caseStyles.morphologyArrow}><span>{t("benigne")}</span><b>{t("suspekt")}</b></div>
    <div className={`${styles.morphRail} ${caseStyles.morphologyScale} ${caseStyles.distributionRiskScale}`}>
      <article><span>01</span><h3>{t("Diffus")}</h3><p>{t("Weit über die Brust verteilt, häufig bilateral.")}</p><DistributionImage type="diffuse" lang={lang}/></article>
      <article><span>02</span><h3>{t("Regional")}</h3><p>{t("Locker verstreut in einem Areal > 2 cm, ohne erkennbare Orientierung an einem Gangsystem.")}</p><DistributionImage type="regional" lang={lang}/></article>
      <article><span>03</span><h3>{t("Gruppiert")}</h3><p>{t("Mindestens fünf Partikel innerhalb von 1 cm oder eine größere Zahl innerhalb von 2 cm.")}</p><DistributionImage type="grouped" lang={lang}/></article>
      <article><span>04</span><h3>{t("Linear")}</h3><p>{t("Verkalkungen liegen entlang einer Linie.")}</p><DistributionImage type="linear" lang={lang}/></article>
      <article><span>05</span><h3>{t("Segmental")}</h3><p>{t("Dreieckig beziehungsweise keilförmig, mit der Spitze zur Mamille; einem Gangsystem und seinen Verzweigungen folgend.")}</p><DistributionImage type="segmental" lang={lang}/></article>
    </div>
    <div className={`${styles.rule} ${caseStyles.multiParagraph}`}><strong>{t("Merke")}</strong><ul className={caseStyles.rememberList}><li><b>{t("Duktales Muster, keine sichere Histologie:")}</b>{" "}{t("Suspekte Mikroverkalkungen in linearer oder segmentaler Verteilung sind häufig mit DCIS assoziiert. Auch ein invasives Karzinom mit intraduktaler Komponente ist möglich.")}</li><li><b>{t("Linear ist nicht automatisch maligne:")}</b>{" "}{t("Grobe, glatte Stäbchen können sekretorisch bedingt sein, etwa bei Duktektasie/Plasmazellmastitis. Feine, irreguläre lineare oder verzweigte Partikel sind dagegen suspekt.")}</li></ul></div>
  </Section>

  <Section {...GERMAN_SECTIONS[4]} title={t(GERMAN_SECTIONS[4].label.de)}>
    <p className={styles.lead}>{t("Bei gleicher Morphologie kann eine größere Ausdehnung mit einem höheren Malignitätsrisiko einhergehen.")}</p>
    <div className={caseStyles.extentChartCard}>
      <p className={caseStyles.extentChartTitle}>{t("Positiv prädiktiver Wert nach Ausdehnung")}</p>
      <div className={caseStyles.extentChart} role="img" aria-label={t("Balkendiagramm: Positiv prädiktiver Wert steigt von 0 % bei unter 5 mm Ausdehnung auf 66,7 % bei über 50 mm Ausdehnung")}>
        <div className={caseStyles.extentAxis}><span>80 %</span><span>60 %</span><span>40 %</span><span>20 %</span><span>0 %</span></div>
        <div className={caseStyles.extentBars}>
          <div><b>0 %</b><i style={{height:'0%'}}></i><small>{t("<5 mm")}</small></div>
          <div><b>13 %</b><i style={{height:'16%'}}></i><small>{t("5–10 mm")}</small></div>
          <div><b>30,4 %</b><i style={{height:'38%'}}></i><small>{t("10–20 mm")}</small></div>
          <div><b>47,8 %</b><i style={{height:'60%'}}></i><small>{t("20–50 mm")}</small></div>
          <div><b>66,7 %</b><i style={{height:'83%'}}></i><small>{t(">50 mm")}</small></div>
        </div>
      </div>
      <small className={caseStyles.biradsCaption}>{t("PPV in der untersuchten Biopsiekohorte, nach Gesamtausdehnung der Verkalkungen (mm).")}<br/><br/>{t("Metaxa, Healy & O’Keeffe, Br J Radiol. 2019;92:20190177.")}</small>
    </div>
    <div className={styles.rule}><strong>{t("Merke")}</strong><p>{t("Die Ausdehnung ist unabhängig von der Morphologie ein eigenständiger Risikofaktor und relevant für die Beurteilung einer möglichen DCIS-Ausdehnung sowie die Therapieplanung.")}</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[5]} title={t(GERMAN_SECTIONS[5].label.de)}>
    <p className={styles.lead}>{t("Nicht Morphologie oder Verteilung allein, sondern ihre Kombination bestimmt die klinische Risikoklasse. Dies ist der zentrale Schritt der Kalkdiagnostik.")}</p>
    <KalkAssessment lang={lang}/>
    <div className={caseStyles.warningSigns}><header><SectionIcon id="warnung"/><div><small>{t("Gezielt beachten")}</small><h3>{t("Warnzeichen auf einen Blick")}</h3></div></header><ul><li><SectionIcon id="morphologie"/><div><b>{t("Suspekte Morphologie")}</b><p>{t("Fein pleomorph oder fein linear/verzweigt; deutliche Form- und Größenheterogenität.")}</p></div></li><li><SectionIcon id="verteilung"/><div><b>{t("Duktale Verteilung")}</b><p>{t("Lineare oder segmentale Anordnung suspekter Partikel.")}</p></div></li><li><SectionIcon id="ausdehnung"/><div><b>{t("Große Ausdehnung")}</b><p>{t("Ein ausgedehntes Kalkareal im Gesamtbefund berücksichtigen.")}</p></div></li><li><SectionIcon id="kontext"/><div><b>{t("Assoziierte Gewebeveränderung")}</b><p>{t("Begleitende Masse oder Architekturstörung.")}</p></div></li></ul></div>
    <div className={`${styles.rule} ${caseStyles.multiParagraph}`}><strong>{t("Stabilität ≠ sicher benign")}</strong><p>{t("DCIS kann langsam wachsen und über Jahre bildmorphologisch unverändert bleiben. Stabilität entkräftet eine suspekte Morphologie daher nicht.")}</p></div>
    <p className={caseStyles.biradsCaption}>{t("Zum natürlichen Verlauf:")}{" "}<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4484537/" target="_blank" rel="noreferrer">{t("Ductal Carcinoma In Situ of the Breast")}</a>.</p>
  </Section>

  <Section {...GERMAN_SECTIONS[6]} title={t(GERMAN_SECTIONS[6].label.de)}>
    <h3 className={`${styles.takeTitle} ${caseStyles.benignSectionTitle}`}>{t("Typisch benigne Verkalkungen außerhalb des Drüsenparenchyms")}</h3>
    <div className={`${styles.benignList} ${caseStyles.benignGrid}`}>
      <article><span>{t("HAUT")}</span><div><h3>{t("Hautverkalkungen")}</h3><p>{t("Typischerweise rund oder oval und oberflächlich gelegen.")}</p></div></article>
      <article><span>{t("GEFÄSS")}</span><div><h3>{t("Vaskuläre Verkalkungen")}</h3><p>{t("Typischerweise dicht und linear entlang eines Gefäßverlaufs.")}</p></div></article>
      <article><span>{t("SUTURA")}</span><div><h3>{t("Nahtverkalkungen")}</h3><p>{t("Lineare oder kurvilineare Verkalkungen entlang von Nahtmaterial nach Operationen.")}</p></div></article>
    </div>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Hautverkalkungen")}</h3></div>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-mlo.png" alt={t("MLO-Mammographie der rechten Brust mit Hautverkalkungen")} width={340} height={630}/></a><figcaption>{t("Rechts MLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc-detail.png" alt={t("Vergrößerung gruppierter Hautverkalkungen der rechten Brust")} width={335} height={578}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc.png" alt={t("CC-Mammographie der rechten Brust mit posteromedialen Hautverkalkungen")} width={392} height={630}/></a><figcaption>{t("Rechts CC")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Mehrere rundliche, teils zentral aufgehellte Verkalkungen liegen dicht gruppiert und oberflächlich in der posteromedialen Haut nahe der Inframammärfalte.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Ammar Ashraf,")}{" "}<a href="https://radiopaedia.org/cases/159211/studies/130479?lang=us#t=im&v1i=60684407&v1z=1&v2i=60684408&v2z=1&v3i=60684410&v3z=1&v4i=60684413&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 159211 (Vollbild)")}</a>.</p>
    </article>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Vaskuläre Verkalkungen")}</h3></div>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-1.png" alt={t("MLO-Mammographie mit vaskulären Verkalkungen")} width={443} height={539}/></a><figcaption>{t("MLO-Aufnahme")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-2.png" alt={t("Zweite MLO-Aufnahme mit vaskulären Verkalkungen")} width={443} height={539}/></a><figcaption>{t("MLO-Aufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Feine, dicht aneinanderliegende lineare Verkalkungen zeichnen den Verlauf mehrerer Gefäße in der Brust ab.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Ayla Al Kabbani,")}{" "}<a href="https://radiopaedia.org/cases/72331/studies/82850?lang=us#t=im&v1i=51746512&v1z=1&v2i=51746513&v2z=1&v3i=51746514&v3z=1&v4i=51746515&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 72331 (Vollbild)")}</a>.</p>
    </article>
    <div className={styles.rule}><strong>{t("Wichtiger vaskulärer Hinweis")}</strong><p>{t("Vaskuläre Verkalkungen sind ein relevanter Marker für ein erhöhtes Risiko kardiovaskulärer Erkrankungen. Daher sollte eine klinische kardiovaskuläre Risikoevaluation erfolgen.")}</p></div>
    <h3 className={`${styles.takeTitle} ${caseStyles.benignSectionTitle}`}>{t("Typisch benigne Verkalkungen im Drüsenparenchym")}</h3>
    <div className={`${styles.benignList} ${caseStyles.benignGrid}`}>
      <article><span>{t("COARSE (POPCORNARTIG)")}</span><div><h3>{t("Grobschollig")}</h3><p>{t("Große, grobe Verkalkungen, meist > 2 mm.")}</p><p className={caseStyles.bulletLead}>{t("Typisch bei:")}</p><ul className={caseStyles.bulletList}><li>{t("involutiertem Fibroadenom")}</li><li>{t("Fettnekrose")}</li><li>{t("Narben")}</li><li>{t("dystrophen Veränderungen")}</li></ul></div></article>
      <article><span>{t("LARGE ROD-LIKE")}</span><div><h3>{t("Large rod-like")}</h3><p><Lines>{t("Grobe, längliche Verkalkungen mit glatten und gut definierten Konturen.\n\nSie entsprechen meist Verkalkungen innerhalb eines Milchganges oder entlang der Gangwand.")}</Lines><i style={{textDecoration:'underline'}}>{t("Nicht verwechseln mit den deutlich feineren und irregulären fine linear calcifications.")}</i></p></div></article>
      <article><span>{t("LAYERING (TEACUP / MILCHKALZIUM)")}</span><div><h3>{t("Layering")}</h3><p>{t("Sedimentierende Verkalkungen innerhalb von Mikro- oder Makrozysten, in der Seitenaufnahme typischerweise halbmond- oder sichelförmig.")}</p></div></article>
      <article><span>{t("RIM")}</span><div><h3>{t("Rim calcifications")}</h3><p className={caseStyles.bulletLead}>{t("Dünne randständige Verkalkungen entlang einer rundlichen Struktur, typisch beispielsweise bei:")}</p><ul className={caseStyles.bulletList}><li>{t("Fettnekrose")}</li><li>{t("Ölzysten")}</li><li>{t("Zysten")}</li></ul></div></article>
    </div>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleRim}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Rim calcification")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-rmlo.png" alt={t("Mammographie mit dünner randständiger Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Rechts RMLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-rcc.png" alt={t("CC-Mammographie mit Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Rechts RCC")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-52694/rim-detail.png" alt={t("Detailaufnahme der Rim-Kalzifikation")} width={512} height={768}/></a><figcaption>{t("Detailaufnahme")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Dünne, glatte, randständige Verkalkung entlang einer rundlichen Läsion – typisch für eine verkalkte Ölzyste beziehungsweise Fettnekrose.")}</p>
      <p className={caseStyles.caseCredit}>{t("Bildbeispiel:")}{" "}<a href="https://radiopaedia.org/cases/52694/studies/58614?lang=us" target="_blank" rel="noreferrer">{t("Radiopaedia.org, Fall 52694")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleLayering}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("BEISPIELFALL")}</small><h3>{t("Layering: Teacup- oder Meniskuszeichen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="/mamma/mammographie/verkalkungen/layering/layering-schematic.svg" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/layering/layering-schematic.svg" alt={t("Schematische Erklärung des Layering- beziehungsweise Teacup-Zeichens")} width={1200} height={650}/></a><figcaption>{t("Schema: CC versus ML/MLO")}</figcaption></figure>
        <figure><a href="https://www.ncbi.nlm.nih.gov/core/lw/2.0/html/tileshop_pmc/tileshop_pmc_inline.html?title=Click%20on%20image%20to%20zoom&p=PMC3&id=13266138_jksr-87-437-g006.jpg" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/layering/layering-original.png" alt={t("Originalabbildung mit amorphen oder runden Verkalkungen in CC und Meniskus- beziehungsweise Teacup-Zeichen in ML")} width={788} height={714}/></a><figcaption>{t("Originalabbildung · A: CC · B: ML/MLO")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Prinzip:")}</strong>{" "}{t("In der CC-Aufnahme erscheinen die Verkalkungen rundlich und unscharf. In der ML- oder MLO-Aufnahme lagern sie sich schwerkraftbedingt am Boden einer Zyste ab und bilden die typische sichelförmige Meniskus- beziehungsweise Teacup-Konfiguration. In der aktuellen BI-RADS-Terminologie wird dafür der beschreibende Begriff „Layering“ verwendet.")}</p>
      <p className={caseStyles.caseCredit}>{t("Originalabbildung:")}{" "}<a href="https://www.ncbi.nlm.nih.gov/core/lw/2.0/html/tileshop_pmc/tileshop_pmc_inline.html?title=Click%20on%20image%20to%20zoom&p=PMC3&id=13266138_jksr-87-437-g006.jpg" target="_blank" rel="noreferrer">{t("J Korean Soc Radiol. 2025;87:437, Fig. 6")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleCoarse}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Grobschollige Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-57400/l-mlo.png" alt={t("MLO-Mammographie mit grobscholliger Verkalkung")} width={592} height={768}/></a><figcaption>{t("Links MLO")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-57400/l-cc.png" alt={t("CC-Mammographie mit grobscholliger Verkalkung")} width={532} height={716}/></a><figcaption>{t("Links CC")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Grobe, unregelmäßig-lobulierte Verkalkung mit teils randständiger Aufhellung in einer umschriebenen Läsion der linken Brust.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Subash Thapa,")}{" "}<a href="https://radiopaedia.org/cases/57400/studies/64347?lang=us#t=im&v1i=34751209&v1z=1&v2i=34751200&v2z=1&v3i=34751201&v3z=1&v4i=34751209&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 57400 (Vollbild)")}</a>.</p>
    </article>
    <article className={`${caseStyles.caseStudy} ${caseStyles.exampleRod}`}>
      <header className={caseStyles.caseHeader}><div><small>{t("RADIOPAEDIA-FALL")}</small><h3>{t("Large rod-like Verkalkungen")}</h3></div></header>
      <div className={caseStyles.caseGallery}>
        <figure><a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86379/rod-1.png" alt={t("MLO-Aufnahme rechts mit Large-rod-like-Verkalkungen")} width={491} height={720}/></a><figcaption>{t("MLO rechts")}</figcaption></figure>
        <figure><a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer"><Image src="/mamma/mammographie/verkalkungen/case-86379/rod-2.png" alt={t("CC-Aufnahme rechts mit Large-rod-like-Verkalkungen")} width={491} height={720}/></a><figcaption>{t("CC rechts")}</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>{t("Morphologie und Lage:")}</strong>{" "}{t("Grobe, längliche Verkalkungen mit glatten, gut definierten Konturen verlaufen innerhalb eines Milchganges.")}</p>
      <p className={caseStyles.caseCredit}>{t("Case courtesy of Edgar Lorente,")}{" "}<a href="https://radiopaedia.org/cases/86379/studies/102416?lang=us#t=im&v1i=54305500&v1z=1&v2i=54305501&v2z=1&v3i=54305502&v3z=1&v4i=54305503&v4z=1" target="_blank" rel="noreferrer">{t("Radiopaedia.org, rID: 86379")}</a>.</p>
    </article>
  </Section>

  <Section {...GERMAN_SECTIONS[7]} title={t(GERMAN_SECTIONS[7].label.de)}>
    <p className={styles.lead}>{t("Die Mammographie beurteilt den Kalk. Ultraschall und MRT ergänzen die Beurteilung des umgebenden Gewebes und helfen bei der weiteren Abklärung.")}</p>
    <div className={caseStyles.modalityComparison}>
      <article>
        <header><h3>{t("Ultraschall")}</h3><p>{t("Korrelat & Biopsieplanung")}</p></header>
        <dl>
          <div><dt>{t("Sichtbarkeit")}</dt><dd>{t("Makroverkalkungen erscheinen echogen, häufig mit dorsalem Schallschatten – etwa in Fibroadenomen, verkalkten Ölzysten oder bei Fettnekrose.")}<br/>{t("Mikrokalk kann als feine echogene Foci sichtbar sein, besonders innerhalb einer Gewebeveränderung oder eines Ganges.")}</dd></div>
          <div><dt>{t("Zusatznutzen")}</dt><dd>{t("Assoziierte Gewebeveränderungen gezielt mitbeurteilen. Ein eindeutig zugeordnetes Korrelat kann eine ultraschallgesteuerte Biopsie ermöglichen.")}</dd></div>
          <div><dt>{t("Grenze")}</dt><dd>{t("Fehlende sonographische Sichtbarkeit schließt einen suspekten Kalkbefund nicht aus.")}</dd></div>
        </dl>
      </article>
      <article id="mrt">
        <header><h3>{t("MRT")}</h3><p>{t("Enhancement & Ausdehnung")}</p></header>
        <dl>
          <div><dt>{t("Sichtbarkeit")}</dt><dd>{t("Die kontrastverstärkte MRT zeigt die Kontrastmittelaufnahme des Gewebes; die Kalkpartikel selbst werden nicht zuverlässig dargestellt.")}</dd></div>
          <div><dt>{t("Zusatznutzen")}</dt><dd>{t("Bei entsprechender Fragestellung die Läsionsausdehnung, zusätzliche Herde und Hinweise auf eine invasive Komponente beurteilen.")}</dd></div>
          <div><dt>{t("Grenze")}</dt><dd>{t("Eine unauffällige MRT schließt ein DCIS nicht sicher aus und beweist keine Benignität.")}</dd></div>
        </dl>
      </article>
    </div>
    <div className={styles.rule}><strong>{t("Merke")}</strong><p>{t("Ein unauffälliger Ultraschall oder eine negative MRT hebt eine mammographisch begründete Biopsieindikation nicht automatisch auf.")}</p></div>
    <div className={caseStyles.mriManagement}>
      <header><small>{t("Mammographische Kategorie bleibt maßgeblich")}</small><h3>{t("Negative MRT bei mammographischen Kalzifikationen: Was bedeutet das für die Biopsie?")}</h3></header>
      <div className={caseStyles.mriTableScroll}><table><caption>{t("Management bei negativer kontrastverstärkter MRT")}</caption><thead><tr><th scope="col">{t("BI-RADS")}</th><th scope="col">{t("Malignitätsrisiko vor MRT")}</th><th scope="col">{t("Einordnung")}</th></tr></thead><tbody>
        {['4A','4B','4C','5'].map(category=><tr key={category}><th scope="row"><span className={caseStyles[CALC_CLASS[category]]}>{category}</span></th><td>{t(CALC_META[category].risk)}</td><td>{category==='4A'?t("Biopsie ist Standard. Bei ausgewählten Fällen kann nach spezialisierter Neubewertung eine mammographische Kontrolle statt Biopsie erwogen werden; Studien diskutieren 6–12 Monate. Keine allgemeine Empfehlung „keine Biopsie, Kontrolle nach 12 Monaten“."):category==='4B'?t("Individuell entscheiden; bei Biopsieverzicht zurückhaltend sein. Die breite Risikospanne erlaubt keine pauschale Herabstufung; meist bleibt die Biopsie empfohlen."):t("Biopsie auch bei negativer MRT erforderlich.")}</td></tr>)}
      </tbody></table></div>
      <p><strong>{t("Studienansatz, keine allgemeine Freigabe:")}</strong>{" "}{t("Eine Metaanalyse zu reinen Mikroverkalkungen fand bei niedrigem Ausgangsrisiko eine mögliche Risikosenkung durch negative MRT. Der rechnerische Grenzwert lag bei 22 % vor MRT für höchstens 2 % danach. Das ist keine validierte individuelle Entscheidungsregel.")}</p>
      <p>{t("Eine abweichende Überwachungsstrategie gehört in eine spezialisierte, gemeinsam besprochene Einzelfallentscheidung mit festem Kontrollplan, typischerweise zunächst nach 6 Monaten. Bei fortbestehender suspekter Einstufung bleibt die histologische Abklärung angezeigt.")}{" "}<strong>{t("Eine negative MRT schließt DCIS nicht vollständig aus.")}</strong></p>
      <p className={caseStyles.biradsCaption}>{t("Quellen:")}{" "}<a href="https://www.acr.org/-/media/ACR/Files/RADS/BI-RADS/Mammography-Reporting.pdf" target="_blank" rel="noreferrer">{t("ACR: Kategorien und Management")}</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7907894/" target="_blank" rel="noreferrer">{t("Fueger et al., The Breast 2021 – Metaanalyse zur ergänzenden MRT")}</a>.</p>
    </div>
  </Section>

  <Section {...GERMAN_SECTIONS[8]} title={t(GERMAN_SECTIONS[8].label.de)}>
    <h3 className={styles.takeTitle}>{t("Take Home")}</h3>
    <ol className={styles.takeHome}>
      <li><span>01</span><strong>{t("Vier Merkmale systematisch beurteilen: Partikelgröße, Morphologie, Verteilung und Gesamtausdehnung. Die Größe allein beweist weder Benignität noch Malignität.")}</strong></li>
      <li><span>02</span><strong>{t("2D-Vergrößerungsaufnahmen zeigen die Kalkdetails; DBT ergänzt den räumlichen Kontext. Typisch benigne Formen wie Popcorn-, Rim-, sekretorische und Layering-Verkalkungen sicher erkennen.")}</strong></li>
      <li><span>03</span><strong>{t("Morphologie und Verteilung gemeinsam bewerten: Fein pleomorpher oder fein linearer/verzweigter Kalk in linearer oder segmentaler Anordnung ist besonders suspekt.")}</strong></li>
      <li><span>04</span><strong>{t("Eine einzelne Gruppe runder/punktförmiger Partikel kann nach vollständiger Abklärung BI-RADS 3 entsprechen; fehlende Voraufnahmen allein rechtfertigen diese Kategorie nicht. Erste Kontrolle nach 6 Monaten.")}</strong></li>
      <li><span>05</span><strong>{t("Verlauf, Ausdehnung, Begleitbefunde und Risikokontext sind Modifikatoren, keine Rechenpunkte. Auch langfristige Stabilität schließt DCIS bei suspekter Morphologie nicht aus.")}</strong></li>
      <li><span>06</span><strong>{t("Suspekter Mikrokalk kann DCIS oder ein invasives Karzinom mit intraduktaler Komponente begleiten. Das Bild beweist keine bestimmte Histologie.")}</strong></li>
      <li><span>07</span><strong>{t("Ultraschall hilft bei Korrelatsuche und Biopsieplanung; MRT ergänzt Gewebe- und Ausdehnungsbeurteilung. Eine negative MRT schließt DCIS nicht vollständig aus.")}</strong></li>
      <li><span>08</span><strong>{t("BI-RADS 4/5 erfordert grundsätzlich histologische Abklärung. Ein MRT-gestützter Biopsieverzicht bei ausgewählten niedrig suspekten Fällen ist eine individuelle Strategie, kein automatischer Schritt des Rechners.")}</strong></li>
    </ol>
  </Section>
</>}
export default function Page(){const{lang}=useLanguage(),tx=v=>pick(v,lang),lessonSections=GERMAN_SECTIONS,[active,setActive]=useState(lessonSections[0].id),{isRead,toggleRead,authError}=useLessonReadStatus(ID),ids=useMemo(()=>lessonSections.map(x=>x.id),[lessonSections]),withLang=href=>lang==='de'?href:`${href}${href.includes('?')?'&':'?'}lang=${lang}`;useEffect(()=>{const os=ids.map(id=>{const el=document.getElementById(id);if(!el)return null;const o=new IntersectionObserver(([e])=>e.isIntersecting&&setActive(id),{rootMargin:'-18% 0px -72%',threshold:.01});o.observe(el);return o});return()=>os.forEach(o=>o?.disconnect())},[ids]);return <main className={`${base.page} ${basics.page} ${shared.page} ${styles.page} ${lang==='fa'?styles.rtl:''}`} dir={lang==='fa'?'rtl':'ltr'} lang={lang}><header className={base.header}><nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><span>{tx(COPY.imaging)}</span><span>›</span><span>{tx(COPY.mammography)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav><div className={base.hero}><div className={`${base.heroText} ${basics.heroText} ${shared.heroText} ${styles.heroText}`}><div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginBottom:18}}><span className={`${base.sourceBadge} ${basics.sourceBadge}`} style={{marginBottom:0}}>Dr. Zia</span></div><h1>{tx(COPY.title)}</h1><div className={base.actions}><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=${ID}&from=${encodeURIComponent(withLang(PATH))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/${ID}?from=${encodeURIComponent(withLang(PATH))}`)}>🧠 {tx(COPY.flashcards)}</Link></div></div><div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Kalk ≠ Diagnose','Calcium ≠ diagnosis','کلسیم ≠ تشخیص'))}</strong></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Grobschollig → benign','Coarse → benign','درشت ← خوش‌خیم'))}</strong></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Layering → benign','Layering → benign','رسوب‌گذاری لایه‌ای ← خوش‌خیم'))}</strong></div></div></div></header><div className={base.readBar}><ReadButton lang={lang} isRead={isRead} toggle={toggleRead} authError={authError}/></div><div className={base.layout}><aside className={`${base.sidebar} ${basics.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{lessonSections.map(x=><button key={x.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${active===x.id?`${base.sideItemActive} ${basics.sideItemActive}`:''}`} onClick={()=>document.getElementById(x.id)?.scrollIntoView({behavior:'smooth'})}><span className={caseStyles.sidebarIcon}><SectionIcon id={x.id}/></span><strong>{translateLesson(x.label.de,lang)}</strong></button>)}</aside><div className={base.main}>
<LessonContent lang={lang}/></div></div></main>}
