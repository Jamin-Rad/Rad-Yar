'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { useLanguage } from '@/providers/LanguageProvider'

const TABS = [
  {
    id: 'roentgen',
    label: 'Röntgen-KM',
    icon: '☢️',
    sections: [
      { id: 'grundlagen', label: 'Grundlagen' },
      { id: 'einteilung', label: 'Einteilung' },
      { id: 'applikation', label: 'Applikation' },
      { id: 'ausscheidung', label: 'Ausscheidung' },
      { id: 'paravasat', label: 'Paravasat' },
    ],
  },
  {
    id: 'sicherheit',
    label: 'Sicherheit',
    icon: '⚠️',
    sections: [
      { id: 'reaktionen', label: 'Nebenwirkungen' },
      { id: 'pseudoallergie', label: 'Pseudoallergie' },
      { id: 'pc-aki', label: 'PC-AKI' },
      { id: 'metformin', label: 'Metformin/Dialyse' },
      { id: 'thyreose', label: 'Schilddrüse' },
    ],
  },
  {
    id: 'gi',
    label: 'GI-KM',
    icon: '🧪',
    sections: [
      { id: 'barium', label: 'Bariumsulfat' },
      { id: 'gastrografin', label: 'Gastrografin®' },
    ],
  },
  {
    id: 'mrt',
    label: 'MRT-KM',
    icon: '🧲',
    sections: [
      { id: 'gadolinium', label: 'Gadolinium' },
      { id: 'chelate', label: 'Chelate' },
      { id: 'nsf-retention', label: 'NSF/Retention' },
      { id: 'leber-km', label: 'Leberspezifisch' },
    ],
  },
  {
    id: 'spezial',
    label: 'Spezial',
    icon: '🩺',
    sections: [
      { id: 'buscopan', label: 'Buscopan®' },
      { id: 'schwangerschaft', label: 'Schwangerschaft' },
      { id: 'stillzeit', label: 'Stillzeit' },
    ],
  },
]

const MCQ_BTN = { de: 'MCQs', en: 'MCQs', fa: 'MCQ' }

function McqWidget() {
  const { lang } = useLanguage()
  const href = lang && lang !== 'de' ? `/technik/kontrastmittel/mcq?lang=${lang}` : '/technik/kontrastmittel/mcq'
  return (
    <Link href={href} className={styles.mcqWidget}>
      <span className={styles.mcqWidgetIcon}>🎯</span>
      <span className={styles.mcqWidgetText}>{MCQ_BTN[lang] || 'MCQs'}</span>
      <span className={styles.mcqWidgetArr}>→</span>
    </Link>
  )
}

function Merke({ children }) {
  return (
    <div className={styles.merke}>
      <span className={styles.merkeTag}>Merke</span>
      {children}
    </div>
  )
}

function InfoBox({ variant = 'info', title, children }) {
  const icons = { info: 'ℹ️', warning: '⚠️', danger: '🚨', success: '✅' }
  return (
    <div className={`${styles.infoBox} ${styles[variant]}`}>
      {title && <div className={styles.infoTitle}>{icons[variant]} {title}</div>}
      <div>{children}</div>
    </div>
  )
}

function KMTable({ headers, rows, colColors }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SeverityBar({ items }) {
  return (
    <div className={styles.severityWrap}>
      {items.map((item, i) => (
        <div key={i} className={styles.severityItem} style={{ borderColor: item.color }}>
          <div className={styles.severityHeader} style={{ background: item.color }}>
            <span className={styles.severityGrad}>{item.grad}</span>
            <span className={styles.severityLabel}>{item.label}</span>
          </div>
          <ul className={styles.severityList}>
            {item.symptoms.map((s, j) => <li key={j}>{s}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

function StatCard({ value, unit, label, sub, color = '#f97316' }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue} style={{ color }}>{value}</div>
      {unit && <div className={styles.statUnit} style={{ color }}>{unit}</div>}
      <div className={styles.statLabel}>{label}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

function FlowStep({ steps }) {
  return (
    <div className={styles.flow}>
      {steps.map((step, i) => (
        <div key={i} className={styles.flowRow}>
          <div className={`${styles.flowBox} ${step.variant ? styles[step.variant] : ''}`}>
            {step.icon && <span>{step.icon}</span>}
            <span>{step.text}</span>
          </div>
          {i < steps.length - 1 && <div className={styles.flowArrow}>↓</div>}
        </div>
      ))}
    </div>
  )
}

function TabRoentgen() {
  return (
    <>
      <section id="grundlagen" className={styles.section}>
        <h2 className={styles.h2}>Röntgen-Kontrastmittel · Grundlagen</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Röntgennegative Kontrastmittel</div>
            <p className={styles.text}>Röntgennegative Kontrastmittel absorbieren Röntgenstrahlung kaum. Dadurch erscheinen sie im Vergleich zum umgebenden Gewebe dunkler.</p>
            <KMTable headers={['Beispiele', 'Prinzip']} rows={[[ 'Luft, Gas, CO₂, Wasser', 'Geringe/fehlende Absorption → bessere Strahlendurchlässigkeit' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Röntgenpositive Kontrastmittel</div>
            <p className={styles.text}>Röntgenpositive Kontrastmittel absorbieren Röntgenstrahlen stärker als das umgebende Gewebe. Ursache ist die höhere Ordnungszahl der kontrastgebenden Atome.</p>
            <KMTable headers={['Beispiele', 'Prinzip']} rows={[[ 'Jodhaltige KM, Bariumsulfat', 'Stärkere Absorption → höhere Dichte/hellere Darstellung' ]]} />
          </div>
        </div>
        <Merke>
          Bei wasserlöslichen jodhaltigen Kontrastmitteln ist der <strong>Trijodbenzolring</strong> die gemeinsame Grundstruktur; das Jod mit Ordnungszahl 53 erzeugt den eigentlichen Röntgenkontrast.
        </Merke>
      </section>

      <section id="einteilung" className={styles.section}>
        <h2 className={styles.h2}>Einteilung der Röntgen-Kontrastmittel</h2>
        <KMTable
          headers={['Gruppe', 'Beispiele', 'Eigenschaften', 'Typische Anwendung', 'Intravasal?']}
          rows={[
            ['Nicht-ionisch, wasserlöslich', 'Imeron®, Ultravist®', 'Keine elektrische Ladung, hydrophiler, deutlich niedrigere Osmolarität', 'Standard für i.v./i.a. CT und Angiographie', '✅ Ja'],
            ['Ionisch, wasserlöslich', 'Gastrografin®', 'Höhere Osmolarität, höheres Nebenwirkungsprofil, günstiger', 'Enterale Anwendung', '❌ Nein'],
            ['Wasserunlöslich', 'Bariumsulfat', 'Nicht resorbierbar', 'Enterale Bildgebung', '❌ Nein'],
            ['Jodhaltige Öle', 'Lipiodol®', 'Ölig, heute selten', 'Lymphangiographie', 'Spezial'],
            ['Röntgennegativ', 'Luft, CO₂, Wasser', 'Kaum Absorption', 'Doppelkontrast/GI', 'Nein'],
          ]}
        />
        <InfoBox variant="success" title="Praxisregel">
          <p>Für die intravasale Anwendung sind heute nicht-ionische, niedrig-osmolare jodhaltige Kontrastmittel der Routine-Standard.</p>
        </InfoBox>
      </section>

      <section id="applikation" className={styles.section}>
        <h2 className={styles.h2}>Kontrastmittel-Applikation</h2>
        <div className={styles.statRow}>
          <StatCard value="~300" unit="mg Jod/ml" label="Standard CT" sub="meist ausreichend" />
          <StatCard value="350–375" unit="mg Jod/ml" label="CTA" sub="stärkere intravasale Kontrastierung" color="#fbbf24" />
          <StatCard value="3–5" unit="ml/s" label="Standardrate" sub="18G grün" color="#38bdf8" />
        </div>
        <KMTable
          headers={['Untersuchung', 'Typisches Volumen', 'Injektionsrate', 'Zugang / Kommentar']}
          rows={[
            ['LAE-CT', 'ca. 50–70 ml', '5 ml/s', '18G grün; hohe Flussrate wichtig'],
            ['CTA-Aorta / BBA / supraaortal', 'ca. 60–80 ml', '4–5 ml/s', 'bolusorientiert'],
            ['Abdomen portalvenös', 'ca. 80–120 ml', '3–4 ml/s', '20G rosa oft ausreichend'],
            ['Abdomen biphasisch', 'ca. 100–140 ml', '3–5 ml/s', 'längere Organ-Kontrastierung'],
            ['ZVK / 22G blau', 'reduziert', 'ca. 2,5 ml/s', 'wenn möglich vermeiden'],
          ]}
        />
        <h3 className={styles.h3}>Was beeinflusst das Volumen?</h3>
        <KMTable
          headers={['Faktor', 'Auswirkung']}
          rows={[
            ['Art der Untersuchung', 'Parenchymatöse Organe benötigen meist größere Volumina und langsamere Injektion als CTA.'],
            ['Körpergewicht', 'Höheres Körpergewicht erfordert häufig höheres Volumen.'],
            ['Nierenrisiko', 'Bei erhöhtem Risiko für PC-AKI wird das Volumen möglichst reduziert.'],
          ]}
        />
        <Merke>
          Je schneller ein Gefäß maximal kontrastiert werden soll, desto kleiner ist oft das Volumen. Je länger ein Organ homogen kontrastiert werden muss, desto größer ist das Volumen.
        </Merke>
      </section>

      <section id="ausscheidung" className={styles.section}>
        <h2 className={styles.h2}>Ausscheidung jodhaltiger Kontrastmittel</h2>
        <div className={styles.statRow}>
          <StatCard value="~90%" label="renal" sub="Hauptausscheidung" />
          <StatCard value="1–3 h" label="Plasmahalbwertzeit" color="#38bdf8" />
          <StatCard value="24 h" label="nahezu vollständig" sub="eliminiert" color="#34d399" />
        </div>
        <KMTable
          headers={['Zeit', 'Elimination', 'Bemerkung']}
          rows={[
            ['nach ~2 h', '~50%', 'überwiegend renal'],
            ['nach ~4 h', '~75%', 'weiter renal'],
            ['nach 24 h', 'nahezu vollständig', 'geringer extra-renaler Anteil möglich'],
          ]}
        />
        <InfoBox variant="info" title="Extra-renale Ausscheidung & Umwelt">
          <p>Ein kleiner Anteil wird über Leber/Galle, Darm und Speicheldrüsen ausgeschieden. Jodhaltige CT-KM und Gadolinium-KM können in Kläranlagen kaum herausgefiltert werden und sind im Trinkwasser messbar.</p>
        </InfoBox>
      </section>

      <section id="paravasat" className={styles.section}>
        <h2 className={styles.h2}>Paravasat-Management</h2>
        <FlowStep steps={[
          { text: 'Injektion sofort stoppen – Zugang zunächst belassen – Aspiration versuchen', variant: 'flowOrange' },
          { text: 'Kanüle erst nach Aspirationsversuch entfernen' },
          { text: 'Extremität hochlagern' },
          { text: 'Kalte Kompresse: 20 Minuten, mehrfach wiederholen' },
          { text: 'Umfang markieren und Verlauf dokumentieren' },
        ]} />
        <KMTable
          headers={['Kontrolle', 'Was prüfen?', 'Warnsignal']}
          rows={[
            ['Durchblutung', 'Kapillarfüllzeit, distale Pulse', 'Verzögerte Füllung, schwacher/fehlender Puls'],
            ['Motorik & Sensorik', 'Kraft, Gefühl, Parästhesien', 'Kribbeln, Taubheit, Paresen'],
            ['Spannung/Ödem', 'Zunahme der Schwellung, Druckschmerz', 'Kompartmentsyndrom-Verdacht'],
            ['Haut', 'Farbe, Blasen, Nekrosen', 'livide Verfärbung, Bläschenbildung'],
          ]}
        />
        <InfoBox variant="danger" title="Patienteninformation">
          <p>Schwellung, Rötung oder Wärme können in den nächsten Stunden vorkommen. Bei Zunahme, Bläschen, Taubheit, Hautverfärbung oder starken Schmerzen sofort in die Notaufnahme.</p>
        </InfoBox>
        <Merke>Menge, KM-Typ, klinischer Befund, Maßnahmen und Verlauf schriftlich dokumentieren.</Merke>
      </section>
    </>
  )
}

function TabSicherheit() {
  return (
    <>
      <section id="reaktionen" className={styles.section}>
        <h2 className={styles.h2}>Nebenwirkungen jodhaltiger Kontrastmittel</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Chemotoxische Reaktionen</div>
            <p className={styles.text}>Direkte chemische Wirkung des Kontrastmittels. Nicht immunologisch.</p>
            <KMTable headers={['Typisch', 'Beispiele']} rows={[[ 'mild bis selten schwer', 'Wärmegefühl, Übelkeit, Erbrechen, vasovagale Reaktion, Arrhythmie, Krampfanfall' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Allergieartige Reaktionen</div>
            <p className={styles.text}>Pseudoallergie: ähnelt einer Allergie, ist aber nicht IgE-vermittelt.</p>
            <KMTable headers={['Mechanismus', 'Folge']} rows={[[ 'Unspezifische Mastzellaktivierung', 'Histaminausschüttung' ]]} />
          </div>
        </div>
      </section>

      <section id="pseudoallergie" className={styles.section}>
        <h2 className={styles.h2}>Allergieartige Reaktion · Schweregrade & Management</h2>
        <SeverityBar items={[
          { grad: 'Grad 1', label: 'mild', color: '#34d399', symptoms: ['Juckreiz', 'leichte Urtikaria', 'Erythem'] },
          { grad: 'Grad 2', label: 'moderat', color: '#fbbf24', symptoms: ['deutliche Urtikaria', 'Bronchospasmus', 'Larynxödem'] },
          { grad: 'Grad 3', label: 'schwer', color: '#f97316', symptoms: ['Hypotonie', 'Schock', 'sehr selten: 0,01–0,04%'] },
          { grad: 'Grad 4', label: 'lebensbedrohlich', color: '#ef4444', symptoms: ['Atemstillstand', 'Herzstillstand'] },
        ]} />
        <KMTable
          headers={['Bei früherer Reaktion', 'Vorgehen', 'Kommentar']}
          rows={[
            ['1', 'Alternatives Bildgebungsverfahren prüfen', 'KM-frei, wenn diagnostisch ausreichend'],
            ['2', 'Anderes Kontrastmittel verwenden', 'Substanzwechsel reduziert das Wiederholungsrisiko deutlich'],
            ['3', 'Prämedikation nur kritisch einsetzen', 'H1/H2-Blocker und Cortison im Alltag häufig, aber nicht mehr klar leitlinienbasiert empfohlen'],
          ]}
        />
        <Merke>
          Eine „Jodallergie“ gibt es nicht. Jod ist als kleines Molekül nicht allergen; die Reaktion richtet sich gegen andere Molekülbestandteile.
        </Merke>
      </section>

      <section id="pc-aki" className={styles.section}>
        <h2 className={styles.h2}>PC-AKI · Kontrastmittelassoziierte akute Nierenschädigung</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Terminologie</div>
            <KMTable headers={['Alt', 'Neu']} rows={[[ 'CIN', 'PC-AKI / Post-Contrast Acute Kidney Injury' ]]} />
            <p className={styles.textSm}>Die Umbenennung betont, dass ein kausaler Zusammenhang zwischen KM und akutem Nierenversagen nicht immer sicher ist.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Definition</div>
            <p className={styles.text}>Serumkreatinin-Anstieg innerhalb von 48–72 Stunden nach intravaskulärer KM-Gabe.</p>
            <div className={styles.statRow}>
              <StatCard value="≥0,3" unit="mg/dl" label="absolut" />
              <StatCard value="≥1,5×" label="relativ" color="#fbbf24" />
            </div>
          </div>
        </div>
        <h3 className={styles.h3}>Risikofaktoren</h3>
        <KMTable
          headers={['Risikokonstellation', 'Grenzwert / Situation', 'Bedeutung']}
          rows={[
            ['eGFR reduziert + First-Pass-Effekt', '<45 ml/min/1,73 m²', 'intraarteriell proximal der Nierenarterien oder Intensivpatient*innen'],
            ['eGFR reduziert + Second-Pass-Effekt', '<30 ml/min/1,73 m²', 'i.v. Gabe oder intraarteriell distal der Nierenarterien'],
            ['Akutes Nierenversagen', 'bekannt oder vermutet', 'hohes Risiko'],
            ['Untersuchungsbezogen', 'große KM-Menge, hochosmolares KM, erneute KM-Gabe 48–72 h', 'Risiko steigt'],
          ]}
        />
        <InfoBox variant="warning" title="Hydrierung">
          <p>Bei eGFR &lt;30 ml/min/1,73 m² wird Hydrierung empfohlen, bevorzugt i.v. mit NaCl 0,9%. Häufiges Schema: 100 ml/h für 4 Stunden vor und 4 Stunden nach KM-Gabe.</p>
          <p>Vorsicht bei Herzinsuffizienz NYHA III–IV oder Lungenödem.</p>
        </InfoBox>
        <Merke>Es gibt keine gesicherte medikamentöse Prophylaxe. Acetylcystein/ACC gilt nicht als wirksam.</Merke>
      </section>

      <section id="metformin" className={styles.section}>
        <h2 className={styles.h2}>Metformin & Dialyse</h2>
        <KMTable
          headers={['Situation', 'Vorgehen', 'Kommentar']}
          rows={[
            ['eGFR >30 ml/min/1,73 m²', 'Metformin weiternehmen', 'kein routinemäßiges Absetzen nötig'],
            ['eGFR <30 ml/min/1,73 m²', 'zum Zeitpunkt der Untersuchung für 48 h absetzen', 'Metformin ist hier eigentlich kontraindiziert'],
            ['Akutes Nierenversagen', 'für 48 h absetzen', 'Risiko der Akkumulation/Laktatazidose'],
            ['Dialyse + Jod-KM', 'keine zeitliche Abstimmung nötig', 'die Niere arbeitet nicht relevant weiter'],
            ['Dialyse + Gadolinium', 'zeitnahe Dialyse sinnvoll', 'Risikominimierung für NSF/Ablagerung'],
          ]}
        />
      </section>

      <section id="thyreose" className={styles.section}>
        <h2 className={styles.h2}>Hyperthyreose & jodhaltiges KM</h2>
        <div className={styles.statRow}>
          <StatCard value="≥1 Woche" label="typische Latenz" color="#fbbf24" />
          <StatCard value="~100/5 Mio." label="thyreotoxische Krisen" sub="extrem selten" color="#f97316" />
        </div>
        <InfoBox variant="warning" title="Risikokonstellationen">
          <p>Morbus Basedow, Struma multinodosa und Schilddrüsenautonomie können durch Jod-KM dekompensieren.</p>
        </InfoBox>
        <KMTable
          headers={['Situation', 'Vorgehen', 'Medikament / Grund']}
          rows={[
            ['Latente Hyperthyreose', 'KM möglich mit Prophylaxe', 'Natriumperchlorat/Irenat® vor KM, dann 7–10 Tage weiter'],
            ['Manifeste Hyperthyreose', 'absolute Kontraindikation', 'Ausnahme nur lebensbedrohliche Situation'],
            ['Lebensbedrohlicher Notfall', 'KM-Gabe bei zwingender Indikation', 'Irenat® + Thiamazol/Carbimazol'],
            ['Papilläres/follikuläres SD-Karzinom', 'strikt vermeiden', 'Jodsättigung kann Radiojodtherapie verhindern'],
          ]}
        />
      </section>
    </>
  )
}

function TabGI() {
  return (
    <>
      <section id="barium" className={styles.section}>
        <h2 className={styles.h2}>Bariumsulfat</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Applikation & Physiologie</div>
            <KMTable headers={['Punkt', 'Details']} rows={[[ 'Applikation', 'oral oder rektal' ], [ 'Resorption', 'nicht resorbiert' ], [ 'Ausscheidung', 'charakteristisch weißer Stuhl' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Doppelkontrast</div>
            <p className={styles.text}>Kombination aus positivem Kontrast (Barium) und negativem Kontrast (Luft/CO₂/Methylzellulose).</p>
            <p className={styles.text}>Ziel: Schleimhautbeschlag plus Distension zur Beurteilung des Schleimhautreliefs.</p>
          </div>
        </div>
        <InfoBox variant="danger" title="Kontraindikationen für Bariumsulfat">
          <p>V.a. Perforation oder Anastomoseninsuffizienz → schwere Barium-Peritonitis.</p>
          <p>Aspirationsgefahr → schwere Fremdkörperreaktion/Lungenödem.</p>
          <p>V.a. Ileus → Verdickung zu Barium-Steinen, Verschlechterung von Ileus/Obstipation.</p>
        </InfoBox>
      </section>

      <section id="gastrografin" className={styles.section}>
        <h2 className={styles.h2}>Wasserlösliche enterale KM · Gastrografin®</h2>
        <KMTable
          headers={['Eigenschaft', 'Bedeutung']}
          rows={[
            ['Wasserlöslich', 'bei Perforation resorbierbar → keine Barium-Peritonitis'],
            ['Hyperosmolar', 'wirkt abführend; therapeutischer Effekt bei Ileus möglich'],
            ['Ionisch', 'höheres Nebenwirkungsprofil als nicht-ionische KM; nicht intravasal'],
          ]}
        />
        <Merke>Bei Perforationsverdacht: kein Barium, sondern wasserlösliches Kontrastmittel.</Merke>
      </section>
    </>
  )
}

function TabMRT() {
  return (
    <>
      <section id="gadolinium" className={styles.section}>
        <h2 className={styles.h2}>Gadolinium · Grundlagen</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Warum Chelat?</div>
            <p className={styles.text}>Gadolinium ist ein paramagnetisches Metall. Freie Gd³⁺-Ionen sind toxisch und müssen deshalb in einem stabilen Chelat-Komplex verpackt werden.</p>
            <KMTable headers={['Effekt', 'Bildwirkung']} rows={[[ 'T1-Verkürzung', 'Signalanstieg / Enhancement' ], [ 'T2-Verkürzung', 'Signalabfall, vor allem bei Hochdosis' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Dosis</div>
            <KMTable headers={['KM', 'Typische Dosis']} rows={[[ 'Standard-Gd-KM', '0,1 mmol/kg KG' ], [ 'Primovist®', '0,025 mmol/kg KG, also ¼ der üblichen Dosis' ]]} />
          </div>
        </div>
      </section>

      <section id="chelate" className={styles.section}>
        <h2 className={styles.h2}>Lineare vs. makrozyklische Chelate</h2>
        <KMTable
          headers={['', 'Lineare Chelate', 'Makrozyklische Chelate']}
          colColors={[null, '#fbbf24', '#34d399']}
          rows={[
            ['Struktur', 'offenkettig', 'ringförmig, „Käfig“'],
            ['Gd-Bindung', 'weniger fest', 'sehr fest'],
            ['Stabilität', 'geringer', 'sehr hoch'],
            ['Ablagerungsrisiko', 'höher', 'deutlich geringer'],
            ['Status', 'Rote-Hand-Brief 2018, weitgehend ruhend', 'heutiger Routine-Standard'],
            ['Beispiele', 'Primovist®, Multihance® als Leber-Ausnahmen', 'Gadovist®, Dotarem®'],
          ]}
        />
        <InfoBox variant="warning" title="Leber-Ausnahmen">
          <p>Gadoxetsäure/Primovist® und Gadobensäure/Multihance® dürfen weiterhin in der Leber-MRT eingesetzt werden, weil ihre hepatobiliären Eigenschaften diagnostisch wichtig sind.</p>
        </InfoBox>
      </section>

      <section id="nsf-retention" className={styles.section}>
        <h2 className={styles.h2}>NSF & Gadolinium-Retention</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Nephrogene systemische Fibrose</div>
            <KMTable
              headers={['Punkt', 'Details']}
              rows={[
                ['Krankheit', 'schwere fibrosierende Erkrankung von Haut und inneren Organen'],
                ['Mechanismus', 'freies Gd → Fibroblastenaktivierung → Kollagenablagerung'],
                ['Risikogruppe', 'GFR <30 ml/min/1,73 m², besonders nach linearen KM'],
                ['Heute', 'extrem selten durch makrozyklische KM'],
              ]}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Gadolinium-Retention im Gehirn</div>
            <p className={styles.text}>Nach mehrfacher Gabe linearer KM können T1-native Hyperintensitäten auftreten.</p>
            <KMTable headers={['Struktur', 'Lokalisation']} rows={[[ 'Nucleus dentatus', 'Kleinhirn' ], [ 'Globus pallidus', 'Basalganglien' ]]} />
            <InfoBox variant="info"><p>Klinische Relevanz bisher unklar.</p></InfoBox>
          </div>
        </div>
      </section>

      <section id="leber-km" className={styles.section}>
        <h2 className={styles.h2}>Leberspezifische Kontrastmittel</h2>
        <InfoBox variant="info" title="Prinzip">
          <p>Funktionstüchtige Hepatozyten nehmen KM aktiv auf und scheiden es biliär aus. Hepatozytenhaltiges Gewebe wird in der hepatobiliären Phase hell; nicht-hepatozytäre Läsionen bleiben hypointens.</p>
        </InfoBox>
        <KMTable
          headers={['', 'Primovist®', 'Multihance®']}
          colColors={[null, '#f97316', '#38bdf8']}
          rows={[
            ['Wirkstoff', 'Gadoxetsäure', 'Gadobensäure'],
            ['Hepatozytenaufnahme', '~50%', '~3–5%'],
            ['Hepatobiliäre Phase', 'nach ~20 min', 'nach ~40–120 min'],
            ['Elimination', '~50% biliär / ~50% renal', 'überwiegend renal'],
          ]}
        />
        <h3 className={styles.h3}>Indikationen</h3>
        <KMTable
          headers={['Indikation', 'Wichtiges Prinzip']}
          rows={[
            ['FNH vs. Adenom', 'FNH nimmt KM typischerweise auf, Adenome meistens nicht.'],
            ['HCC in Zirrhose', 'gut differenziertes HCC kann KM aufnehmen.'],
            ['Metastasen <1 cm', 'in hepatobiliärer Phase hypointens gegenüber angereichertem Leberparenchym.'],
            ['Gallengangsleckage', 'biliäre Ausscheidung kann Leckagen zeigen.'],
          ]}
        />
      </section>
    </>
  )
}

function TabSpezial() {
  return (
    <>
      <section id="buscopan" className={styles.section}>
        <h2 className={styles.h2}>Buscopan® als Begleitmedikation</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Wirkung & Ziel</div>
            <p className={styles.text}>Buscopan® ist ein Parasympatholytikum. Es lähmt vorübergehend die glatte Muskulatur im Magen-Darm-Trakt.</p>
            <Merke>Ziel in der Bildgebung: weniger Peristaltik → weniger Bewegungsartefakte.</Merke>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Kontraindikationen</div>
            <KMTable
              headers={['KI', 'Alternative']}
              rows={[
                ['Glaukom', 'Glucagon'],
                ['Prostatahyperplasie', 'Glucagon'],
                ['Tachyarrhythmie', 'Glucagon'],
                ['mechanischer Ileus', 'Glucagon'],
              ]}
            />
          </div>
        </div>
        <InfoBox variant="warning" title="Patientenhinweis">
          <p>Pupillenerweiterung und Akkommodationsstörung sind möglich. Deshalb: für 1–2 Stunden kein Auto fahren und keine Maschinen bedienen.</p>
        </InfoBox>
      </section>

      <section id="schwangerschaft" className={styles.section}>
        <h2 className={styles.h2}>Schwangerschaft</h2>
        <InfoBox variant="warning" title="Grundprinzip">
          <p>Strenge Indikation: Kontrastmittel nur, wenn die Untersuchung nicht verschoben werden kann und eine KM-freie Alternative nicht ausreicht. Aufklärung und Dokumentation sind wichtig.</p>
        </InfoBox>
        <KMTable
          headers={['', 'Jodhaltige KM', 'Gadolinium-KM']}
          colColors={[null, '#f97316', '#38bdf8']}
          rows={[
            ['Plazenta', 'plazentagängig', 'plazentagängig'],
            ['Wichtiges Risiko', 'theoretische fetale/neonatale Hypothyreose', 'freies Gd im Fruchtwasser potenziell toxisch, Risiko unklar'],
            ['Zeitpunkt', 'fetale Schilddrüse nimmt Jod ab ca. 10.–12. SSW auf', 'besonders im 1. Trimenon vermeiden'],
            ['Vorgehen', 'wenn nötig möglich; TSH-Neugeborenenkontrolle', 'möglichst vermeiden; wenn zwingend, makrozyklisch bevorzugen'],
          ]}
        />
      </section>

      <section id="stillzeit" className={styles.section}>
        <h2 className={styles.h2}>Stillzeit</h2>
        <KMTable
          headers={['', 'Jodhaltige KM', 'Gadolinium-KM']}
          rows={[
            ['Ausscheidung in Muttermilch', '~0,5% der Dosis', '<0,04% der Dosis'],
            ['Orale Bioverfügbarkeit Säugling', 'sehr gering', 'minimal'],
            ['Stillpause medizinisch nötig?', 'nein', 'nein'],
            ['Wenn Mutter beunruhigt', '24 h pausieren und Milch verwerfen', '24 h pausieren und Milch verwerfen'],
          ]}
        />
        <Merke>Eine Stillpause ist medizinisch nicht erforderlich, kann aber zur Beruhigung der Mutter für 24 Stunden angeboten werden.</Merke>
      </section>
    </>
  )
}

export default function KontrastmittelPage() {
  const { lang } = useLanguage()
  const [activeSection, setActiveSection] = useState('grundlagen')
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)
  const allSections = TABS.flatMap(tab => tab.sections.map(section => ({ ...section, group: tab.label, icon: tab.icon })))
  const activeItem = allSections.find(section => section.id === activeSection)
  const withLang = (href) => lang && lang !== 'de' ? `${href}?lang=${lang}` : href

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    setIsMobileTocOpen(false)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    document.body.style.overflow = isMobileTocOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileTocOpen])

  useEffect(() => {
    const observers = allSections.map(section => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { root: null, rootMargin: '-18% 0px -70% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  return (
    <div className={styles.page} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')} className={styles.breadLink}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/technik')} className={styles.breadLink}>Technik & Physik</Link>
          <span>›</span>
          <span>Kontrastmittel</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>Lehrbuch · Dr. Zia</span>
            <h1>Kontrastmittel</h1>
            <p>Praxisorientierte Übersicht zu Röntgen-Kontrastmitteln, Applikation, Nebenwirkungen, PC-AKI, Schilddrüse, MRT-Kontrastmitteln und Spezialfällen.</p>
            <Link href={withLang('/technik/kontrastmittel/mcq')} className={styles.mcqButton}>
              <span>🎯</span>
              <span>MCQs starten</span>
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStatCard}>
              <strong>300</strong>
              <span>mg Jod/ml</span>
              <small>Standard-Konzentration für viele CT-Untersuchungen</small>
            </div>
            <div className={styles.heroStatCard}>
              <strong>3–5</strong>
              <span>ml/s</span>
              <small>typische Injektionsrate bei geeignetem Zugang</small>
            </div>
            <div className={styles.heroStatCard}>
              <strong>Gd</strong>
              <span>MRT-Kontrastmittel</span>
              <small>makrozyklische Chelate als Routine-Standard</small>
            </div>
          </div>
        </div>

        <Link href={withLang('/technik/kontrastmittel/mcq')} className={styles.mcqStrip}>
          <div>
            <strong>MCQ · Kontrastmittel</strong>
            <span>Fragen zur Prüfungsvorbereitung und Wiederholung</span>
          </div>
          <em>Quiz starten →</em>
        </Link>
      </header>

      <div className={styles.mobileTocBar}>
        <button
          type="button"
          className={styles.mobileTocButton}
          onClick={() => setIsMobileTocOpen(true)}
          aria-expanded={isMobileTocOpen}
        >
          <span className={styles.mobileTocIcon}>☰</span>
          <span>Inhaltsverzeichnis</span>
          <strong>{activeItem?.label || 'Grundlagen'}</strong>
        </button>
      </div>

      {isMobileTocOpen && (
        <div className={styles.mobileTocOverlay} onClick={() => setIsMobileTocOpen(false)}>
          <div className={styles.mobileTocPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.mobileTocHeader}>
              <strong>Inhaltsverzeichnis</strong>
              <button type="button" onClick={() => setIsMobileTocOpen(false)} aria-label="Menü schließen">×</button>
            </div>
            <Sidebar tabs={TABS} activeSection={activeSection} onClick={scrollTo} />
          </div>
        </div>
      )}

      <div className={styles.layout}>
        <Sidebar tabs={TABS} activeSection={activeSection} onClick={scrollTo} />

        <main className={styles.main}>
          <TabRoentgen />
          <TabSicherheit />
          <TabGI />
          <TabMRT />
          <TabSpezial />
        </main>
      </div>

      <Link href={withLang('/technik/kontrastmittel/mcq')} className={styles.mobileMcqFab}>
        <span>🎯</span>
        <strong>MCQs starten</strong>
      </Link>
    </div>
  )
}

function Sidebar({ tabs, activeSection, onClick }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTitle}>Inhaltsverzeichnis</div>
      <nav className={styles.sideNav}>
        {tabs.map(tab => (
          <div key={tab.id} className={styles.sideGroup}>
            <div className={styles.sideGroupTitle}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
            {tab.sections.map(section => (
              <button
                key={section.id}
                type="button"
                className={`${styles.sideItem} ${activeSection === section.id ? styles.sideItemActive : ''}`}
                onClick={() => onClick(section.id)}
              >
                <span className={styles.sideDot} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
