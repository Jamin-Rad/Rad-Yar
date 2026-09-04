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
import {ALGORITHM,BENIGN,COMBINATIONS,CONTEXT,COPY,DISTRIBUTION,GERMAN_SECTIONS,L,MORPH,SECTIONS,TAKE_HOME,pick} from './content'
const ID='mammographie-mikrokalk',PATH='/mamma/bildgebung/mammographie/verkalkungen'
const READ={de:['Als gelesen markieren','Als gelesen markiert','Bitte melde dich an, um deinen Lernfortschritt zu speichern.','Anmelden'],en:['Mark as read','Marked as read','Please sign in to save your learning progress.','Sign in'],fa:['علامت‌گذاری به‌عنوان خوانده‌شده','به‌عنوان خوانده‌شده علامت‌گذاری شد','برای ذخیره پیشرفت لطفاً وارد شوید.','ورود']}
function Section({id,number,title,children}){const mobile=useMobileLearningLayout();const[open,setOpen]=useState(true);useEffect(()=>setOpen(!mobile),[mobile,id]);return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}><button type="button" className={`${base.sectionHeader} ${basics.sectionHeader}`} onClick={()=>setOpen(v=>!v)} aria-expanded={open}><span className={basics.sectionHeading}><small>{number}</small><h2>{title}</h2></span><span className={basics.sectionToggle}>{open?'−':'+'}</span></button>{open&&<div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}</section>}
function ReadButton({lang,isRead,toggle,authError}){const t=READ[lang]||READ.de;return <div className={base.readControl}><button type="button" className={`${base.readButton} ${basics.readButton} ${isRead?`${base.readButtonActive} ${basics.readButtonActive}`:''}`} onClick={toggle}><span className={`${base.readCheck} ${basics.readCheck}`}>{isRead?'✓':''}</span><span>{isRead?t[1]:t[0]}</span></button>{authError&&<div className={base.readError}><span>{t[2]}</span><Link href="/sign-in">{t[3]}</Link></div>}</div>}
function RiskLab({lang}){const tx=v=>pick(v,lang);const[morph,setMorph]=useState('amorph');const[dist,setDist]=useState('grouped');const mi=MORPH.findIndex(x=>x.key===morph),di=DISTRIBUTION.findIndex(x=>x.key===dist);const score=mi+(di>=3?2:di===2?1:0);const result=score>=5?L('hoch suspekt','highly suspicious','بسیار مشکوک'):score>=3?L('suspekt','suspicious','مشکوک'):L('eher niedrige Suspektheit','lower suspicion','شک کمتر');return <div className={styles.riskLab}><header><small>{tx(L('Interaktiv kombinieren','Combine interactively','ترکیب تعاملی'))}</small><strong>{tx(result)}</strong></header><div><label>{tx(L('Morphologie','Morphology','مورفولوژی'))}<select value={morph} onChange={e=>setMorph(e.target.value)}>{MORPH.map(x=><option key={x.key} value={x.key}>{tx(x.title)}</option>)}</select></label><span>×</span><label>{tx(L('Verteilung','Distribution','توزیع'))}<select value={dist} onChange={e=>setDist(e.target.value)}>{DISTRIBUTION.map(x=><option key={x.key} value={x.key}>{tx(x.title)}</option>)}</select></label></div><p>{tx(L('Die Kombination strukturiert die Risikoeinschätzung; BI-RADS und Management bleiben eine ärztliche Gesamtentscheidung.','The combination structures risk assessment; BI-RADS and management remain an integrated clinical decision.','این ترکیب ارزیابی خطر را ساختار می‌دهد؛ BI-RADS و اقدام همچنان تصمیم جامع پزشکی هستند.'))}</p></div>}
function Lines({children}){return <span style={{whiteSpace:'pre-line'}}>{children}</span>}
function GermanContent(){return <>
  <Section {...GERMAN_SECTIONS[0]} title={GERMAN_SECTIONS[0].label.de}>
    <h3 className={styles.takeTitle}>Pathologie</h3>
    <p className={styles.lead}>Mammographisch sichtbare Verkalkungen der Brust bestehen im Wesentlichen aus zwei unterschiedlichen Kalziumsalzen.</p>
    <div className={styles.techSplit}>
      <article><small>01</small><h3>Kalziumoxalat</h3><p><Lines>{`• deutlich seltener
• typischerweise mit benignen Pathologien assoziiert
• beispielsweise in Sekreten apokrin differenzierten Epithels innerhalb benigner Zysten oder terminaler Duktuli`}</Lines></p></article>
      <article><small>02</small><h3>Kalziumphosphat</h3><p><Lines>{`• häufigste Form mammographisch relevanter Verkalkungen
• kann bei benignen, atypischen und malignen Veränderungen auftreten
• mit abnormaler epithelialer Zellproliferation und Nekrose assoziiert`}</Lines></p></article>
    </div>
    <h3 className={styles.takeTitle}>Systematische Beurteilung</h3>
    <div className={`${styles.context} ${caseStyles.systematicGrid}`}>
      <article><span>01</span><h3>Partikelgröße</h3><p>Wie groß sind die einzelnen Verkalkungen?<br/><br/>Makroverkalkungen beziehungsweise typisch grobschollige Verkalkungen sind in der Regel benign.<br/><br/>Die Größe allein beweist jedoch keine Benignität: Grob heterogene Verkalkungen gehören zu den suspekten Morphologien.</p></article>
      <article><span>02</span><h3>Morphologie</h3><p>Wie sehen die einzelnen Kalkpartikel aus?</p></article>
      <article><span>03</span><h3>Verteilungsmuster</h3><p>Wie sind die Kalkpartikel innerhalb der Brust räumlich angeordnet?</p></article>
      <article><span>04</span><h3>Ausdehnung</h3><p>Wie groß ist das gesamte betroffene Kalkareal?<br/><br/>Bei gleicher Morphologie kann eine größere Ausdehnung mit einem höheren Malignitätsrisiko einhergehen.</p><div className={caseStyles.extentChart} aria-label="Positiv prädiktiver Wert nach Ausdehnung"><div><span>&lt;5</span><i style={{height:'0%'}}><b>0 %</b></i></div><div><span>5–10</span><i style={{height:'20%'}}><b>13 %</b></i></div><div><span>10–20</span><i style={{height:'46%'}}><b>30,4 %</b></i></div><div><span>20–50</span><i style={{height:'72%'}}><b>47,8 %</b></i></div><div><span>&gt;50</span><i style={{height:'100%'}}><b>66,7 %</b></i></div></div><small>PPV in der untersuchten Biopsiekohorte · Ausdehnung (mm)<br/><br/>Metaxa, Healy &amp; O’Keeffe, Br J Radiol. 2019;92:20190177.</small></article>
    </div>
    <p className={styles.lead}>Auch Verlauf, klinischer Kontext und Begleitbefunde – insbesondere eine assoziierte Masse oder Architekturstörung – sind für die Gesamtbeurteilung relevant.</p>
    <div className={styles.rule}><strong>Grundprinzip</strong><p>Kalk ist ein bildgebender Phänotyp und allein keine Diagnose.</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[1]} title={GERMAN_SECTIONS[1].label.de}>
    <h3 className={styles.takeTitle}>Typisch benigne Verkalkungen außerhalb des Drüsenparenchyms</h3>
    <div className={styles.techSplit}>
      <article><small>HAUT</small><h3>Hautverkalkungen</h3><p>Typischerweise rund oder oval und oberflächlich gelegen.</p></article>
      <article><small>GEFÄSS</small><h3>Vaskuläre Verkalkungen</h3><p><Lines>{`Typischerweise dicht und linear entlang eines Gefäßverlaufs.

Mammographisch gelten sie als benigne.`}</Lines></p></article>
    </div>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>RADIOPAEDIA-FALL</small><h3>Hautverkalkungen</h3></div>
        <a href="https://radiopaedia.org/cases/159211" target="_blank" rel="noreferrer">rID: 159211 ↗</a>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><Image src="/mamma/mammographie/verkalkungen/case-159211/r-mlo.png" alt="MLO-Mammographie der rechten Brust mit Hautverkalkungen" width={340} height={630}/><figcaption>Rechts MLO</figcaption></figure>
        <figure><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc-detail.png" alt="Vergrößerung gruppierter Hautverkalkungen der rechten Brust" width={335} height={578}/><figcaption>Detailaufnahme</figcaption></figure>
        <figure><Image src="/mamma/mammographie/verkalkungen/case-159211/r-cc.png" alt="CC-Mammographie der rechten Brust mit posteromedialen Hautverkalkungen" width={392} height={630}/><figcaption>Rechts CC</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>Morphologie und Lage:</strong> Mehrere rundliche, teils zentral aufgehellte Verkalkungen liegen dicht gruppiert und oberflächlich in der posteromedialen Haut nahe der Inframammärfalte.</p>
      <p className={caseStyles.caseCredit}>Case courtesy of Ammar Ashraf, Radiopaedia.org, rID: 159211.</p>
    </article>
    <article className={caseStyles.caseStudy}>
      <header className={caseStyles.caseHeader}>
        <div><small>RADIOPAEDIA-FALL</small><h3>Vaskuläre Verkalkungen</h3></div>
        <a href="https://radiopaedia.org/cases/72331" target="_blank" rel="noreferrer">rID: 72331 ↗</a>
      </header>
      <div className={caseStyles.caseGallery}>
        <figure><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-1.png" alt="MLO-Mammographie mit vaskulären Verkalkungen" width={443} height={539}/><figcaption>MLO-Aufnahme</figcaption></figure>
        <figure><Image src="/mamma/mammographie/verkalkungen/case-72331/r-mlo-2.png" alt="Zweite MLO-Aufnahme mit vaskulären Verkalkungen" width={443} height={539}/><figcaption>MLO-Aufnahme</figcaption></figure>
      </div>
      <p className={caseStyles.caseDescription}><strong>Morphologie und Lage:</strong> Feine, dicht aneinanderliegende lineare Verkalkungen zeichnen den Verlauf mehrerer Gefäße in der Brust ab.</p>
      <p className={caseStyles.caseCredit}>Case courtesy of Ayla Al Kabbani, Radiopaedia.org, rID: 72331.</p>
    </article>
    <div className={styles.rule}><strong>Wichtiger vaskulärer Hinweis</strong><p>Vaskuläre Verkalkungen sind ein relevanter Marker für ein erhöhtes Risiko kardiovaskulärer Erkrankungen. Daher sollte eine klinische kardiovaskuläre Risikoevaluation erfolgen.</p></div>
    <h3 className={`${styles.takeTitle} ${caseStyles.benignSectionTitle}`}>Typisch benigne Verkalkungen im Drüsenparenchym</h3>
    <div className={`${styles.benignList} ${caseStyles.benignGrid}`}>
      <article><span>COARSE</span><div><h3>Grobschollig (coarse)</h3><p><Lines>{`Große, grobe Verkalkungen, meist > 2 mm.

Typisch bei:

involutiertem Fibroadenom
Fettnekrose
Narben
dystrophen Veränderungen`}</Lines></p></div></article>
      <article><span>LARGE ROD-LIKE</span><div><h3>Large rod-like</h3><p><Lines>{`Grobe, längliche Verkalkungen mit glatten und gut definierten Konturen.

Sie entsprechen meist Verkalkungen innerhalb eines Milchganges oder entlang der Gangwand.

Nicht verwechseln mit den deutlich feineren und irregulären fine linear calcifications.`}</Lines></p></div></article>
      <article><span>LAYERING</span><div><h3>Layering</h3><p>Sedimentierende Verkalkungen innerhalb von Mikro- oder Makrozysten, in der Seitenaufnahme typischerweise halbmond- oder sichelförmig.</p></div></article>
      <article><span>SUTURE</span><div><h3>Nahtverkalkungen</h3><p>Lineare oder kurvilineare Verkalkungen entlang von Nahtmaterial nach Operationen.</p></div></article>
    </div>
  </Section>

  <Section {...GERMAN_SECTIONS[2]} title={GERMAN_SECTIONS[2].label.de}>
    <p className={styles.lead}>Die Morphologie beschreibt die Form der einzelnen Kalkpartikel. Sie umfasst eher benigne und suspekte Erscheinungsbilder.</p>
    <h3 className={styles.takeTitle}>Eher benigne Morphologien</h3>
    <div className={styles.techSplit}>
      <article><small>ROUND</small><h3>Rund</h3><p>Runde Verkalkungen besitzen glatte Konturen. Diffus verteilte runde Verkalkungen sind typischerweise benign; bei gruppierter Anordnung muss die Gesamtkonstellation berücksichtigt werden.</p></article>
      <article><small>RIM</small><h3>Rim calcifications</h3><p>Dünne randständige Verkalkungen entlang einer rundlichen Struktur, typisch beispielsweise bei Fettnekrose, Ölzysten oder Zysten.</p></article>
    </div>
    <h3 className={styles.takeTitle}>Suspekte Morphologien</h3>
    <div className={styles.riskArrow}>steigende Suspektheit →</div>
    <div className={styles.morphRail} style={{gridTemplateColumns:'repeat(4, minmax(0, 1fr))'}}>
      <article><span>01</span><h3>Amorph</h3><p>Sehr kleine, unscharf definierte Verkalkungen ohne klar erkennbare Form.<br/><br/>Sie besitzen ein relativ niedriges Ausgangsrisiko. Die Verteilung ist deshalb besonders wichtig.<br/><br/>Diffuse oder bilaterale amorphe Verkalkungen sind wesentlich weniger verdächtig als eine fokale oder segmentale Anordnung.</p></article>
      <article><span>02</span><h3>Grob heterogen</h3><p>Irreguläre Verkalkungen, größer als amorphe, aber kleiner und weniger typisch als grobschollige benigne Verkalkungen.<br/><br/>Auch hier beeinflusst die Verteilung die endgültige Einschätzung wesentlich.</p></article>
      <article><span>03</span><h3>Fein pleomorph</h3><p>Feine, aber gut sichtbare Verkalkungen unterschiedlicher Form und Größe.<br/><br/>Die Heterogenität bzw. Pleomorphie ist ein relevantes Suspektkriterium und mit einem deutlich höheren Malignitätsrisiko verbunden.</p></article>
      <article><span>04</span><h3>Fein linear / fein linear-verzweigt</h3><p>Sehr feine, irreguläre lineare oder verzweigte Verkalkungen.<br/><br/>Sie können Kalk bzw. nekrotisches Material innerhalb eines betroffenen Gangsystems widerspiegeln und besitzen die höchste Malignitätswahrscheinlichkeit unter den Kalkmorphologien.</p></article>
    </div>
    <div className={styles.rule}><strong>Morphologisches Risikokontinuum</strong><p><Lines>{`rund → amorph → grob heterogen → fein pleomorph → fein linear/verzweigt

Die Suspektheit nimmt dabei grundsätzlich von links nach rechts zu.`}</Lines></p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[3]} title={GERMAN_SECTIONS[3].label.de}>
    <p className={styles.lead}>Neben der Morphologie muss immer beschrieben werden, wie sich die Verkalkungen innerhalb der Brust verteilen.</p>
    <div className={styles.distribution}>
      <article><span>01</span><strong>Diffus</strong><p>Weit über die Brust verteilt, häufig bilateral.<br/><br/>Bei entsprechender Morphologie meistens benign.</p></article>
      <article><span>02</span><strong>Regional</strong><p>Verkalkungen innerhalb eines größeren Areals ohne eindeutige Orientierung an einem Gangsystem.<br/><br/>Die Bedeutung hängt stark von der Morphologie ab.</p></article>
      <article><span>03</span><strong>Gruppiert</strong><p>Mehrere Verkalkungen konzentrieren sich innerhalb eines begrenzten Areals.<br/><br/>Eine gruppierte Verteilung allein bedeutet nicht Malignität:<br/><br/>Morphologie entscheidet über das tatsächliche Risiko.</p></article>
      <article><span>04</span><strong>Linear</strong><p>Verkalkungen liegen entlang einer Linie.<br/><br/>Dies kann eine Ablagerung innerhalb eines Milchganges widerspiegeln und erhöht insbesondere bei suspekter Morphologie den Verdacht.</p></article>
      <article><span>05</span><strong>Segmental</strong><p>Die Verkalkungen folgen einem Gangsystem und seinen Verzweigungen.<br/><br/>Typisch ist ein keil- oder dreieckförmiges Verteilungsmuster mit Orientierung zur Mamille.</p></article>
    </div>
    <div className={styles.rule}><strong>Merke</strong><p>Lineare und segmentale Verteilungsmuster sind besonders relevant, da sie auf eine duktale Ausbreitung hinweisen können.</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[4]} title={GERMAN_SECTIONS[4].label.de}>
    <p className={styles.lead}>Dies ist der zentrale Schritt der Kalkdiagnostik.</p>
    <p className={styles.lead}>Die Morphologie bestimmt das Ausgangsrisiko, die Verteilung modifiziert dieses Risiko.</p>
    <h3 className={styles.takeTitle}>Beispiele:</h3>
    <div className={styles.comboRows}>
      <article className={styles.low}><strong>amorph</strong><span>+</span><strong>diffus/bilateral</strong><span>→</span><b>eher niedriges Risiko</b></article>
      <article className={styles.mid}><strong>amorph</strong><span>+</span><strong>gruppiert/segmental</strong><span>→</span><b>höhere Suspektheit</b></article>
      <article className={styles.high}><strong>fein pleomorph</strong><span>+</span><strong>gruppiert</strong><span>→</span><b>deutlich suspekt</b></article>
      <article className={styles.high}><strong>fein linear/verzweigt</strong><span>+</span><strong>linear oder segmental</strong><span>→</span><b>hochgradig malignitätsverdächtig</b></article>
    </div>
    <div className={styles.rule}><strong>Merke</strong><p>Nicht Morphologie oder Verteilung allein, sondern ihre Kombination bestimmt die klinische Risikoklasse.</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[5]} title={GERMAN_SECTIONS[5].label.de}>
    <p className={styles.lead}>Nach Morphologie und Verteilung müssen drei weitere Fragen beantwortet werden.</p>
    <div className={styles.context}>
      <article><span>01</span><h3>Sind die Verkalkungen neu oder zunehmend?</h3><p>Neue oder zunehmende Verkalkungen sind verdächtiger als langfristig stabile Befunde.<br/><br/>Deshalb sollten Voraufnahmen konsequent verglichen werden.</p></article>
      <article><span>02</span><h3>Wie groß ist die Ausdehnung?</h3><p>Die Gesamtausdehnung des Kalkareals sollte angegeben werden.<br/><br/>Ein wenige Millimeter großes Cluster und ein mehrere Zentimeter ausgedehnter Befund gleicher Morphologie sind nicht gleichwertig.<br/><br/>Die Ausdehnung ist außerdem relevant für die Beurteilung einer möglichen DCIS-Ausdehnung und für die Therapieplanung.</p></article>
      <article><span>03</span><h3>Gibt es einen Begleitbefund?</h3><p><Lines>{`Immer das umgebende Brustgewebe beurteilen:

Masse?
Architekturstörung?
Asymmetrie?
Haut- oder Mamillenveränderung?`}</Lines></p></article>
    </div>
    <div className={styles.caution}>Eine assoziierte Masse oder Architekturstörung kann insbesondere auf eine invasive Komponente hinweisen.</div>
  </Section>

  <Section {...GERMAN_SECTIONS[6]} title={GERMAN_SECTIONS[6].label.de}>
    <div className={styles.modalityRows}>
      <article><strong>DCIS</strong><p>Suspekte Mikroverkalkungen sind häufig mit einem duktalen Carcinoma in situ (DCIS) assoziiert.</p></article>
      <article><strong>Maligner Kalk</strong><p>Maligner Kalk bedeutet jedoch nicht automatisch reines DCIS. Es kann ebenfalls ein invasives Karzinom mit begleitender intraduktaler Komponente vorliegen.</p></article>
      <article><strong>Deshalb:</strong><p>Suspekter Mikrokalk spricht häufig für einen duktalen Prozess – nicht automatisch für eine bestimmte Histologie.</p></article>
    </div>
  </Section>

  <Section {...GERMAN_SECTIONS[7]} title={GERMAN_SECTIONS[7].label.de}>
    <p className={styles.lead}>Die Mammographie bleibt die wichtigste Methode zur Detektion und Charakterisierung von Mikroverkalkungen.</p>
    <div className={styles.techSplit}>
      <article><small>US</small><h3>Makroverkalkungen</h3><p><Lines>{`Sie können im Ultraschall echogen erscheinen und einen dorsalen Schallschatten verursachen, beispielsweise bei:

Fibroadenomen
Ölzysten
Fettnekrose`}</Lines></p></article>
      <article><small>US</small><h3>Mikroverkalkungen</h3><p><Lines>{`Sie können als kleine echogene Foci sichtbar werden, insbesondere wenn sie:

innerhalb einer Masse,
innerhalb einer Non-Mass-Läsion oder
intraduktal

liegen.`}</Lines></p></article>
    </div>
    <div className={styles.rule}><strong>Biopsieplanung</strong><p>Ein sonographisches Korrelat kann insbesondere für die weitere Biopsieplanung hilfreich sein.</p></div>
  </Section>

  <Section {...GERMAN_SECTIONS[8]} title={GERMAN_SECTIONS[8].label.de}>
    <p className={styles.lead}>Die MRT kann die Risikoeinschätzung ergänzen, ersetzt aber nicht die Histologie.</p>
    <div className={styles.techSplit}>
      <article><small>MRT</small><h3>Sie kann:</h3><p><Lines>{`eine invasive Komponente erkennen,
die Ausdehnung besser darstellen,
zusätzliche Läsionen zeigen,
ausgewählte niedrig suspekte Befunde weiter stratifizieren.`}</Lines></p></article>
      <article><small>MRT</small><h3>Ein negatives MRT kann dagegen:</h3><p><Lines>{`ein DCIS nicht sicher ausschließen,
eine klare Biopsieindikation bei suspektem Mikrokalk nicht automatisch aufheben.`}</Lines></p></article>
    </div>
    <div className={styles.caution}>Ein negatives MRT macht einen suspekten mammographischen Kalkbefund nicht automatisch benign.</div>
  </Section>

  <Section {...GERMAN_SECTIONS[9]} title={GERMAN_SECTIONS[9].label.de}>
    <ol className={styles.algorithm}>
      <li><span>1</span><strong>Kalk erkennen</strong></li>
      <li><span>2</span><strong><Lines>{`Darstellung ausreichend?

Falls notwendig: Vergrößerungsaufnahmen`}</Lines></strong></li>
      <li><span>3</span><strong><Lines>{`Morphologie bestimmen

rund → amorph → grob heterogen → fein pleomorph → fein linear/verzweigt`}</Lines></strong></li>
      <li><span>4</span><strong><Lines>{`Verteilung bestimmen

diffus → regional → gruppiert → linear → segmental`}</Lines></strong></li>
      <li><span>5</span><strong><Lines>{`Zusatzkriterien prüfen

Verlauf + Ausdehnung + Begleitbefunde + klinischer Kontext`}</Lines></strong></li>
      <li><span>6</span><strong>BI-RADS und Konsequenz</strong></li>
    </ol>
    <h3 className={styles.takeTitle}>Take Home</h3>
    <ol className={styles.takeHome}>
      <li><span>01</span><strong>Kalk ist keine Diagnose – Morphologie und Verteilung bestimmen das Ausgangsrisiko.</strong></li>
      <li><span>02</span><strong>Typisch benigne Kalkformen sollten sicher erkannt werden, um unnötige Abklärungen zu vermeiden.</strong></li>
      <li><span>03</span><strong>Bei amorphen und grob heterogenen Verkalkungen ist die Verteilung besonders wichtig.</strong></li>
      <li><span>04</span><strong>Fein pleomorphe und insbesondere fein lineare/verzweigte Verkalkungen sind deutlich suspekt.</strong></li>
      <li><span>05</span><strong>Verlauf, Ausdehnung und assoziierte Masse bzw. Architekturstörung können das Risiko zusätzlich verändern.</strong></li>
      <li><span>06</span><strong>MRT kann das Risiko modifizieren, aber eine indizierte histologische Abklärung nicht ersetzen.</strong></li>
    </ol>
    <h3 className={styles.takeTitle}>Radyar-Merksatz</h3>
    <div className={styles.finalFormula}>Morphologie × Verteilung + Verlauf + Ausdehnung + Kontext → BI-RADS → Konsequenz</div>
  </Section>
</>}
export default function Page(){const{lang}=useLanguage(),tx=v=>pick(v,lang),lessonSections=lang==='de'?GERMAN_SECTIONS:SECTIONS,[active,setActive]=useState(lessonSections[0].id),{isRead,toggleRead,authError}=useLessonReadStatus(ID),ids=useMemo(()=>lessonSections.map(x=>x.id),[lessonSections]),withLang=href=>lang==='de'?href:`${href}${href.includes('?')?'&':'?'}lang=${lang}`;useEffect(()=>{const os=ids.map(id=>{const el=document.getElementById(id);if(!el)return null;const o=new IntersectionObserver(([e])=>e.isIntersecting&&setActive(id),{rootMargin:'-18% 0px -72%',threshold:.01});o.observe(el);return o});return()=>os.forEach(o=>o?.disconnect())},[ids]);return <main className={`${base.page} ${basics.page} ${shared.page} ${styles.page} ${lang==='fa'?styles.rtl:''}`} dir={lang==='fa'?'rtl':'ltr'} lang={lang}><header className={base.header}><nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span><span>{tx(COPY.imaging)}</span><span>›</span><span>{tx(COPY.mammography)}</span><span>›</span><strong>{tx(COPY.title)}</strong></nav><div className={base.hero}><div className={`${base.heroText} ${basics.heroText} ${shared.heroText} ${styles.heroText}`}><div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginBottom:18}}><span className={`${base.sourceBadge} ${basics.sourceBadge}`} style={{marginBottom:0}}>Dr. Zia</span></div><h1>{tx(COPY.title)}</h1><div className={base.actions}><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=${ID}&from=${encodeURIComponent(withLang(PATH))}`)}>🎯 MCQ</Link><Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/${ID}?from=${encodeURIComponent(withLang(PATH))}`)}>🧠 {tx(COPY.flashcards)}</Link></div></div><div className={`${base.heroStats} ${styles.heroStats}`}><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Kalk ≠ Diagnose','Calcium ≠ diagnosis','کلسیم ≠ تشخیص'))}</strong></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Grobschollig → benign','Coarse → benign','درشت ← خوش‌خیم'))}</strong></div><div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx(L('Layering → benign','Layering → benign','رسوب‌گذاری لایه‌ای ← خوش‌خیم'))}</strong></div></div></div></header><div className={base.readBar}><ReadButton lang={lang} isRead={isRead} toggle={toggleRead} authError={authError}/></div><div className={base.layout}><aside className={`${base.sidebar} ${basics.sidebar}`}><div className={base.sideTitle}>{tx(COPY.contents)}</div>{lessonSections.map(x=><button key={x.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${active===x.id?`${base.sideItemActive} ${basics.sideItemActive}`:''}`} onClick={()=>document.getElementById(x.id)?.scrollIntoView({behavior:'smooth'})}><span className={basics.sideNumber}>{x.number}</span><strong>{tx(x.label)}</strong></button>)}</aside><div className={base.main}>
{lang==='de'?<GermanContent/>:<>
<Section {...SECTIONS[0]} title={tx(SECTIONS[0].label)}><p className={styles.lead}>{tx(L('Mammographische Verkalkungen sind häufig und überwiegend benign. Entscheidend sind Erscheinungsbild, räumliche Anordnung und klinisch-radiologischer Kontext.','Mammographic calcifications are common and predominantly benign. Appearance, spatial arrangement and clinical-radiologic context are decisive.','کلسیفیکاسیون ماموگرافیک شایع و عمدتاً خوش‌خیم است. ظاهر، آرایش فضایی و زمینه بالینی–رادیولوژیک تعیین‌کننده‌اند.'))}</p><div className={styles.equation}><strong>{tx(L('Morphologie','Morphology','مورفولوژی'))}</strong><span>×</span><strong>{tx(L('Verteilung','Distribution','توزیع'))}</strong><span>+</span><strong>{tx(L('Verlauf · Ausdehnung · Kontext','Evolution · extent · context','روند · وسعت · زمینه'))}</strong></div><div className={styles.rule}><strong>{tx(L('Merke','Remember','نکته'))}</strong><p>{tx(L('Die Größe allein unterscheidet Mikroverkalkungen nicht sicher in benign und maligne.','Size alone does not reliably distinguish benign from malignant calcifications.','اندازه به‌تنهایی کلسیفیکاسیون خوش‌خیم را از بدخیم جدا نمی‌کند.'))}</p></div></Section>
<Section {...SECTIONS[1]} title={tx(SECTIONS[1].label)}><div className={styles.techSplit}><article><small>2D / MAG</small><h3>{tx(L('Detailauflösung','Detail resolution','تفکیک جزئیات'))}</h3><p>{tx(L('Gezielte Vergrößerungsaufnahmen verbessern die Beurteilung von Form, Anzahl und Ausdehnung und schaffen eine Vergleichsbasis.','Targeted magnification views improve assessment of shape, number and extent and provide a comparison baseline.','نماهای بزرگنمایی هدفمند ارزیابی شکل، تعداد و وسعت را بهتر کرده و پایه مقایسه می‌سازند.'))}</p></article><article><small>DBT</small><h3>{tx(L('Räumlicher Kontext','Spatial context','زمینه فضایی'))}</h3><p>{tx(L('DBT-Schichten bestätigen und lokalisieren Kalk; die hochauflösende Detailanalyse erfolgt bei Bedarf in 2D-Vergrößerung.','DBT slices confirm and localise calcifications; high-resolution analysis uses 2D magnification when needed.','برش‌های DBT کلسیفیکاسیون را تأیید و مکان‌یابی می‌کنند؛ تحلیل با وضوح بالا در صورت نیاز با بزرگنمایی دوبعدی انجام می‌شود.'))}</p></article></div><div className={styles.caution}>{tx(L('Synthetische Rekonstruktion und Artefakte können Verkalkungen verändern oder imitieren – immer in den Quellbildern bestätigen.','Synthetic reconstruction and artefacts may alter or mimic calcifications; always confirm in source images.','بازسازی مصنوعی و آرتیفکت می‌توانند کلسیفیکاسیون را تغییر دهند یا تقلید کنند؛ همیشه در تصاویر منبع تأیید کنید.'))}</div></Section>
<Section {...SECTIONS[2]} title={tx(SECTIONS[2].label)}><div className={styles.benignList}>{BENIGN.map(([code,title,text])=><article key={code}><span>{code}</span><div><h3>{tx(title)}</h3><p>{tx(text)}</p></div></article>)}</div></Section>
<Section {...SECTIONS[3]} title={tx(SECTIONS[3].label)}><div className={styles.riskArrow}>{tx(L('steigende Suspektheit','increasing suspicion','افزایش میزان شک'))} →</div><div className={styles.morphRail}>{MORPH.map((x,i)=><article key={x.key}><span>{String(i+1).padStart(2,'0')}</span><h3>{tx(x.title)}</h3><small>{tx(x.risk)}</small><p>{tx(x.text)}</p></article>)}</div></Section>
<Section {...SECTIONS[4]} title={tx(SECTIONS[4].label)}><div className={styles.distribution}>{DISTRIBUTION.map((x,i)=><article key={x.key}><span>{String(i+1).padStart(2,'0')}</span><strong>{tx(x.title)}</strong><p>{tx(x.text)}</p></article>)}</div><div className={styles.rule}><strong>{tx(L('Duktales Muster','Ductal pattern','الگوی داکتال'))}</strong><p>{tx(L('Linear und segmental sind besonders relevant, weil sie einem Gangsystem folgen können.','Linear and segmental patterns matter because they may follow a ductal system.','الگوهای خطی و سگمنتال مهم‌اند، زیرا ممکن است مسیر سیستم مجرایی را دنبال کنند.'))}</p></div></Section>
<Section {...SECTIONS[5]} title={tx(SECTIONS[5].label)}><div className={styles.comboRows}>{COMBINATIONS.map(([a,b,c,tone],i)=><article className={styles[tone]} key={i}><strong>{tx(a)}</strong><span>+</span><strong>{tx(b)}</strong><span>→</span><b>{tx(c)}</b></article>)}</div><RiskLab lang={lang}/></Section>
<Section {...SECTIONS[6]} title={tx(SECTIONS[6].label)}><div className={styles.context}>{CONTEXT.map((x,i)=><article key={i}><span>0{i+1}</span><h3>{tx(x.title)}</h3><p>{tx(x.text)}</p></article>)}</div><div className={styles.caution}>{tx(L('Eine assoziierte Mass oder Architekturstörung kann auf eine invasive Komponente hinweisen.','An associated mass or architectural distortion may indicate an invasive component.','توده یا دیستورشن معماری همراه می‌تواند نشان‌دهنده جزء مهاجم باشد.'))}</div></Section>
<Section {...SECTIONS[7]} title={tx(SECTIONS[7].label)}><div className={styles.modalityRows}><article><strong>DCIS</strong><p>{tx(L('Suspekter Mikrokalk spricht häufig für einen duktalen Prozess, beweist aber weder reines DCIS noch eine bestimmte Histologie.','Suspicious calcifications often indicate a ductal process but prove neither pure DCIS nor a specific histology.','کلسیفیکاسیون مشکوک اغلب نشان‌دهنده فرایند داکتال است، اما DCIS خالص یا بافت‌شناسی خاصی را اثبات نمی‌کند.'))}</p></article><article><strong>{tx(L('Ultraschall','Ultrasound','سونوگرافی'))}</strong><p>{tx(L('Ein Korrelat innerhalb einer Mass, Non-Mass-Läsion oder eines Ganges kann den Biopsiezugang erleichtern; fehlendes Korrelat entwarnt nicht.','A correlate within a mass, non-mass lesion or duct may facilitate biopsy; its absence is not reassuring.','همبستگی در توده، ضایعه غیرتوده‌ای یا مجرا می‌تواند بیوپسی را آسان کند؛ نبود آن اطمینان‌بخش نیست.'))}</p></article><article><strong>MRT / CEM</strong><p>{tx(L('Kann Ausdehnung oder invasive Komponenten ergänzend zeigen, ersetzt aber bei suspektem Kalk weder Mammographie noch indizierte Histologie.','May add information on extent or invasion but does not replace mammography or indicated tissue diagnosis.','می‌تواند اطلاعاتی درباره وسعت یا تهاجم بیفزاید، اما جایگزین ماموگرافی یا تشخیص بافتی لازم نیست.'))}</p></article></div></Section>
<Section {...SECTIONS[8]} title={tx(SECTIONS[8].label)}><ol className={styles.algorithm}>{ALGORITHM.map((x,i)=><li key={i}><span>{i+1}</span><strong>{tx(x)}</strong></li>)}</ol><h3 className={styles.takeTitle}>Take Home</h3><ol className={styles.takeHome}>{TAKE_HOME.map((x,i)=><li key={i}><span>{String(i+1).padStart(2,'0')}</span><strong>{tx(x)}</strong></li>)}</ol><div className={styles.finalFormula}>{tx(L('Morphologie × Verteilung + Verlauf + Ausdehnung + Kontext → BI-RADS → Konsequenz','Morphology × distribution + evolution + extent + context → BI-RADS → management','مورفولوژی × توزیع + روند + وسعت + زمینه ← BI-RADS ← اقدام'))}</div></Section>
</>}</div></div></main>}
