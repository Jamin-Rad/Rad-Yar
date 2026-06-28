'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TX = {
  de: {
    back: '← Wirbelsäule',
    chapter: 'Wirbelsäule · Trauma',
    contents: 'Trauma-Lernseiten',
    overview: 'Überblick',
    imaging: 'Bildgebung',
    reporting: 'Befund-Check',
    pitfalls: 'Fallstricke',
    topics: {
      kraniozervikaler: {
        title: 'Kraniozervikaler Übergang',
        lead: 'Verletzungen von Okziput, C1, C2 und den stabilisierenden Bandstrukturen sind selten, aber hochrelevant, weil Instabilität und Myelongefährdung leicht unterschätzt werden.',
        tags: ['CT', 'MRT', 'Instabilität'],
        overview: ['Okzipitalkondylen, Atlas, Axis, Dens und atlanto-okzipitale bzw. atlanto-axiale Gelenke systematisch prüfen.', 'Wichtige Muster sind Okzipitalkondylenfraktur, Jefferson-Fraktur, Hangman-Fraktur, Densfraktur und atlanto-okzipitale Dissoziation.', 'Die Stabilität hängt wesentlich von Lig. transversum atlantis, Alarligamenten und Membrana tectoria ab.'],
        imaging: ['CT mit dünnen Schichten und multiplanaren Rekonstruktionen ist die Akutbasis.', 'MRT bei neurologischem Defizit, Verdacht auf Bandverletzung, epidurales Hämatom oder okkulter Myelopathie.', 'CTA erwägen bei Frakturen durch Foramen transversarium, Subluxation oder Hochenergietrauma.'],
        reporting: ['Frakturlinie, Dislokation, Gelenkstellung und Dens-/C1-/C2-Bezug nennen.', 'Atlantodentales Intervall, laterale Massendifferenz und okzipito-zervikale Ausrichtung beurteilen.', 'Instabilitätszeichen und Empfehlung für MRT/CTA explizit formulieren.'],
        pitfalls: ['Kleine Okzipitalkondylenfragmente nicht als harmlose Randanbauten abtun.', 'Rotationsfehlstellung kann C1/C2-Subluxation vortäuschen.', 'Normale CT-Knochenstellung schließt relevante Bandverletzung nicht sicher aus.'],
      },
      hws: {
        title: 'HWS-Verletzungen',
        lead: 'Bei HWS-Trauma geht es um Fraktur, Luxation, diskoligamentäre Instabilität und Rückenmarkgefährdung. CT und MRT beantworten unterschiedliche Fragen.',
        tags: ['CT', 'MRT', 'Diskoligamentär'],
        overview: ['Subaxiale HWS von C3 bis C7 nach Alignment, Wirbelkörpern, Facettengelenken, Pedikeln, Laminae und Dornfortsätzen durchgehen.', 'Flexions-, Extensions-, Kompressions- und Distraktionsmechanismen erzeugen typische Verletzungsmuster.', 'Facettengelenkluxationen und Tear-drop-Frakturen sind instabilitätsverdächtig.'],
        imaging: ['CT ist Standard bei relevantem Trauma oder klinischem Risiko.', 'MRT bei Myelopathie, radikulären Ausfällen, diskoligamentärem Verdacht oder Diskrepanz zwischen Klinik und CT.', 'Gefäßverletzung mitdenken, besonders bei Foramen-transversarium-Beteiligung oder Subluxation.'],
        reporting: ['Höhe, Frakturbestandteile, Hinterkantenbeteiligung, Spinalkanalweite und Facettengelenkstellung nennen.', 'Prävertebrale Weichteilschwellung, epidurales Hämatom und Myelonsignal dokumentieren.', 'Stabile vs. potentiell instabile Konstellation klar kommunizieren.'],
        pitfalls: ['Isolierte Dornfortsatzfrakturen können Marker eines größeren Flexionstraumas sein.', 'Eine unilateral verhakte Facette kann subtil sein.', 'Degenerative Stenose verschärft die klinische Relevanz kleiner traumatischer Befunde.'],
      },
      thorakolumbal: {
        title: 'BWS / LWS-Frakturen',
        lead: 'Thorakolumbale Frakturen werden nach Morphologie, posteriorer Bandkomplex-Integrität und neurologischem Status eingeordnet. Ziel ist die Unterscheidung stabiler von instabilen Verletzungen.',
        tags: ['CT', 'MRT', 'AO Spine'],
        overview: ['Kompressions-, Berstungs-, Distraktions- und Translationsverletzungen unterscheiden.', 'Thorakolumbaler Übergang ist besonders verletzungsanfällig.', 'Hinterkantenbeteiligung, Kyphosierung und mehrsäulige Verletzung bestimmen die Relevanz.'],
        imaging: ['CT mit sagittalen und koronaren Rekonstruktionen zur Frakturmorphologie.', 'MRT bei Verdacht auf posterioren Bandkomplexschaden, Myelon-/Conus-/Cauda-Beteiligung oder unklarem Alter der Fraktur.', 'Bei osteoporotischen Frakturen Ödemmuster, Hinterkantenbeteiligung und Malignitätszeichen prüfen.'],
        reporting: ['Segment, AO-ähnliche Morphologie, Höhenminderung, Hinterkantenretropulsion und Spinalkanalstenose beschreiben.', 'Posterioren Bandkomplex und neurologisch relevante Kompressionen adressieren.', 'Mehrsegmentale Verletzungen und Übergangszonen gesondert nennen.'],
        pitfalls: ['Distraktionsverletzungen können im axialen CT unterschätzt werden.', 'Osteoporotische Sinterung und akute Berstungsfraktur nicht vermischen.', 'Bei ankylosierter Wirbelsäule sind Frakturen oft hochinstabil trotz kleiner Frakturlinie.'],
      },
    },
  },
  en: {
    back: '← Spine',
    chapter: 'Spine · Trauma',
    contents: 'Trauma lessons',
    overview: 'Overview',
    imaging: 'Imaging',
    reporting: 'Reporting checklist',
    pitfalls: 'Pitfalls',
  },
  fa: {
    back: '← ستون فقرات',
    chapter: 'ستون فقرات · تروما',
    contents: 'درس‌های تروما',
    overview: 'نمای کلی',
    imaging: 'تصویربرداری',
    reporting: 'چک گزارش',
    pitfalls: 'دام‌ها',
  },
}

const TOPIC_IDS = [
  ['kraniozervikaler', '/wirbelsaeule/trauma/kraniozervikaler-uebergang'],
  ['hws', '/wirbelsaeule/trauma/hws-verletzungen'],
  ['thorakolumbal', '/wirbelsaeule/trauma/bws-lws-frakturen'],
]

function getCopy(lang, topicId) {
  const base = TX[lang] || TX.de
  const deTopic = TX.de.topics[topicId]
  return {
    ...base,
    topic: lang === 'de' ? deTopic : deTopic,
  }
}

function Section({ id, title, items }) {
  return (
    <section className={styles.section} id={id}>
      <h2>{title}</h2>
      <div className={styles.sectionBody}>
        <ul className={styles.list}>
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default function SpineTraumaLesson({ topicId }) {
  const { lang } = useLanguage()
  const copy = getCopy(lang, topicId)
  const withLang = href => lang === 'de' ? href : `${href}?lang=${lang}`

  return (
    <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.hero}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/lernen/wirbelsaeule')}>{copy.back}</Link>
          <span>/</span>
          <span>{copy.chapter}</span>
        </nav>
        <span className={styles.kicker}>{copy.chapter}</span>
        <h1 className={styles.title}>{copy.topic.title}</h1>
        <p className={styles.lead}>{copy.topic.lead}</p>
        <div className={styles.tags}>
          {copy.topic.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
      </div>

      <div className={styles.layout}>
        <article className={styles.main}>
          <Section id="overview" title={copy.overview} items={copy.topic.overview} />
          <Section id="imaging" title={copy.imaging} items={copy.topic.imaging} />
          <Section id="reporting" title={copy.reporting} items={copy.topic.reporting} />
          <Section id="pitfalls" title={copy.pitfalls} items={copy.topic.pitfalls} />
        </article>

        <aside className={styles.aside}>
          <div className={styles.navCard}>
            <h3>{copy.contents}</h3>
            {TOPIC_IDS.map(([id, href]) => (
              <Link key={id} href={withLang(href)} className={`${styles.navLink} ${id === topicId ? styles.navLinkActive : ''}`}>
                {TX.de.topics[id].title}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
