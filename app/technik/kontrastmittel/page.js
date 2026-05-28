'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

// ── NAV STRUCTURE ──────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'roentgen',
    label: 'Röntgen-KM',
    icon: '☢️',
    sections: [
      { id: 'km-typen',     label: 'KM-Typen' },
      { id: 'applikation',  label: 'Applikation' },
      { id: 'ausscheidung', label: 'Ausscheidung' },
      { id: 'paravasat',    label: 'Paravasat' },
    ],
  },
  {
    id: 'nebenwirkungen',
    label: 'NW & Niere',
    icon: '⚠️',
    sections: [
      { id: 'chemotox',   label: 'Chemotoxisch' },
      { id: 'pseudoallergie', label: 'Pseudoallergie' },
      { id: 'pc-aki',     label: 'PC-AKI' },
      { id: 'metformin',  label: 'Metformin' },
    ],
  },
  {
    id: 'mrt',
    label: 'MRT-KM',
    icon: '🧲',
    sections: [
      { id: 'gadolinium',   label: 'Gadolinium' },
      { id: 'chelate',      label: 'Chelate' },
      { id: 'nsf',          label: 'NSF & Retention' },
      { id: 'leber-km',     label: 'Leberspezifisch' },
      { id: 'buscopan',     label: 'Buscopan®' },
    ],
  },
  {
    id: 'spezial',
    label: 'Spezial',
    icon: '🔬',
    sections: [
      { id: 'hyperthyreose',  label: 'Hyperthyreose' },
      { id: 'gi',             label: 'GI-Diagnostik' },
      { id: 'schwangerschaft','label': 'Schwangerschaft' },
      { id: 'stillzeit',      label: 'Stillzeit' },
    ],
  },
]

// ── SMALL COMPONENTS ───────────────────────────────────────────────────────

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
          <tr>{headers.map((h, i) => <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>{h}</th>)}</tr>
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

// ── TAB CONTENT COMPONENTS ─────────────────────────────────────────────────

function TabRoentgen() {
  return (
    <>
      {/* KM-TYPEN */}
      <section id="km-typen" className={styles.section}>
        <h2 className={styles.h2}>KM-Typen im Überblick</h2>

        <KMTable
          headers={['Typ', 'Beispiele', 'Ladung', 'Osmolarität', 'Anwendung', 'i.v. zugelassen']}
          rows={[
            ['Nicht-ionisch (wasserlösl.)', 'Imeron®, Ultravist®', 'Keine', 'Niedrig', 'Intravaskulär', '✅'],
            ['Ionisch (wasserlösl.)',        'Gastrografin®',       'Positiv', 'Hoch',  'Enteral',       '❌'],
            ['Wasserunlösl. – BaSO₄',        'Barium',             '–',      '–',      'Enteral',       '❌'],
            ['Wasserunlösl. – Jodöle',        'Lipiodol®',         '–',      '–',      'Lymphangio.',   '–'],
            ['Röntgennegativ',                'Luft, CO₂, Wasser', '–',      '–',      'Enteral / GI',  '–'],
          ]}
        />

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Trijodbenzolring</div>
            <p className={styles.text}>Gemeinsame Grundstruktur aller wasserlöslichen Jod-KM. <strong>Jod (Z = 53)</strong> ist die röntgenkontrastgebende Substanz.</p>
          </div>
          <InfoBox variant="info" title="Osmolarität & Verträglichkeit">
            <p>Nicht-ionische KM → geringe Osmolarität → bessere Verträglichkeit → Standard für alle intravasalen Anwendungen.</p>
          </InfoBox>
        </div>
      </section>

      {/* APPLIKATION */}
      <section id="applikation" className={styles.section}>
        <h2 className={styles.h2}>Applikation</h2>

        <div className={styles.statRow}>
          <StatCard value="300" unit="mg/ml" label="Standard CT" sub="i.v. Untersuchungen" />
          <StatCard value="350–375" unit="mg/ml" label="CT-Angiographie" sub="Höhere Kontrastierung" color="#fbbf24" />
        </div>

        <KMTable
          headers={['Untersuchung', 'Volumen', 'Injektionsrate', 'Zugang']}
          rows={[
            ['Standard CT',            '80–120 ml',   '3–5 ml/s',  '18G (grün)'],
            ['LAE-CT',                 '50–70 ml',    '5 ml/s',    '18G (grün)'],
            ['CTA-Aorta',              '60–80 ml',    '4–5 ml/s',  '18G (grün)'],
            ['Abdomen biphasisch',     '100–140 ml',  '3–5 ml/s',  '18G (grün)'],
            ['Nur PV-Phase (Fallback)','80–120 ml',   '3–4 ml/s',  '20G (rosa)'],
            ['ZVK / 22G (Notfall)',    'Reduziert',   '2,5 ml/s',  '22G (blau) ⚠️'],
          ]}
        />

        <Merke>
          Je schneller maximale Gefäßkontrastierung → <strong>kleineres</strong> Volumen nötig.
          Je länger homogene Organkontrastierung → <strong>größeres</strong> Volumen nötig.
        </Merke>

        <InfoBox variant="warning" title="Niedrige Injektionsrate (2,5 ml/s)">
          <p>Reduziert KM-Qualität und arterielle Abgrenzbarkeit deutlich. Nur wenn keine andere Option möglich.</p>
        </InfoBox>
      </section>

      {/* AUSSCHEIDUNG */}
      <section id="ausscheidung" className={styles.section}>
        <h2 className={styles.h2}>Ausscheidung jodhaltiger KM</h2>

        <div className={styles.statRow}>
          <StatCard value="~90%" label="Renale Elimination" sub="Über die Niere" />
          <StatCard value="1–3 h" label="Plasmahalbwertzeit" color="#38bdf8" />
          <StatCard value="24 h" label="Nahezu vollständig" sub="eliminiert" color="#34d399" />
        </div>

        <KMTable
          headers={['Zeitpunkt', 'Elimination', 'Weg']}
          rows={[
            ['nach ~2 h',  '~50 %', 'Renal'],
            ['nach ~4 h',  '~75 %', 'Renal'],
            ['nach 24 h',  '~100 %','Renal + extra-renal'],
          ]}
        />

        <p className={styles.text}>
          Extra-renale Ausscheidung (geringer Anteil): Leber-Galle · Darm · Speicheldrüsen.
        </p>

        <InfoBox variant="info" title="Umweltaspekt">
          <p>Jod-KM und Gd-KM können in Kläranlagen kaum filtriert werden → gelangen über Urin ins Abwassersystem → im Trinkwasser messbar. Derzeit keine effektiven Gegenmaßnahmen.</p>
        </InfoBox>
      </section>

      {/* PARAVASAT */}
      <section id="paravasat" className={styles.section}>
        <h2 className={styles.h2}>Paravasat-Management</h2>

        <FlowStep steps={[
          { text: '1 · Injektion stoppen – Zugang belassen – Aspiration versuchen', variant: 'flowOrange' },
          { text: '2 · Kanüle entfernen (erst nach Aspiration)' },
          { text: '3 · Extremität hochlagern' },
          { text: '4 · Kalte Kompresse (20 min, mehrfach)' },
          { text: '5 · Umfang markieren & dokumentieren (Stift)' },
        ]} />

        <KMTable
          headers={['Überwachungsparameter', 'Methode', 'Alarmsignal']}
          rows={[
            ['Durchblutung', 'Kapillarfüllzeit, Pulse distal', 'Verlängerte Füllzeit, schwacher Puls'],
            ['Motorik & Sensorik', 'Aktivprüfung', 'Parästhesien, Kraftverlust'],
            ['Spannung / Ödem', 'Inspektion, Palpation', 'Zunehmende Ödembildung → Kompartment!'],
            ['Hautzustand', 'Inspektion', 'Blasenbildung, Nekrosen'],
          ]}
        />

        <InfoBox variant="danger" title="Sofort Notaufnahme bei:">
          <p>Zunehmende Schwellung · Bläschen · Taubheitsgefühl · Hautverfärbung · starke Schmerzen</p>
        </InfoBox>

        <Merke>Menge, KM-Typ, klinischer Befund und alle Maßnahmen schriftlich dokumentieren.</Merke>
      </section>
    </>
  )
}

function TabNebenwirkungen() {
  return (
    <>
      {/* CHEMOTOXISCH */}
      <section id="chemotox" className={styles.section}>
        <h2 className={styles.h2}>Chemotoxische Reaktionen</h2>
        <InfoBox variant="info" title="Mechanismus">
          <p>Direkte chemische Wirkung des KM – <strong>nicht immunologisch</strong>, nicht IgE-vermittelt.</p>
        </InfoBox>
        <KMTable
          headers={['Symptom', 'Häufigkeit', 'Bemerkung']}
          rows={[
            ['Wärmegefühl', 'Häufig', 'Typisches Injektionsgefühl'],
            ['Übelkeit / Erbrechen', 'Gelegentlich', '–'],
            ['Vasovagale Reaktion', 'Selten', 'Bradykardie, Hypotonie'],
            ['Arrhythmien', 'Selten', 'Bei kardialer Vorbelastung'],
            ['Zerebraler Krampfanfall', 'Sehr selten', '–'],
          ]}
        />
      </section>

      {/* PSEUDOALLERGIE */}
      <section id="pseudoallergie" className={styles.section}>
        <h2 className={styles.h2}>Allergieartige Reaktionen (Pseudoallergie)</h2>

        <InfoBox variant="info" title="Mechanismus">
          <p>Nicht IgE-vermittelt · Unspezifische Mastzellaktivierung · Histaminausschüttung</p>
        </InfoBox>

        <SeverityBar items={[
          { grad: 'Grad 1', label: 'Mild', color: '#34d399',
            symptoms: ['Juckreiz', 'Leichte Urtikaria', 'Erythem'] },
          { grad: 'Grad 2', label: 'Moderat', color: '#fbbf24',
            symptoms: ['Deutliche Urtikaria', 'Bronchospasmus', 'Larynxödem'] },
          { grad: 'Grad 3', label: 'Schwer', color: '#f97316',
            symptoms: ['Hypotonie', 'Schock', '0,01–0,04 %'] },
          { grad: 'Grad 4', label: 'Lebensbedroh.', color: '#ef4444',
            symptoms: ['Atemstillstand', 'Herzstillstand'] },
        ]} />

        <h3 className={styles.h3}>Management bei anamnestischer Reaktion</h3>
        <KMTable
          headers={['Maßnahme', 'Detail', 'Evidenz']}
          rows={[
            ['Alternatives Verfahren', 'KM-freie Bildgebung bevorzugen', '✅ Beste Option'],
            ['Substanzwechsel', 'Anderes KM verwenden', '31% → 12% Reaktionsrisiko (Park 2018)'],
            ['Prämedikation H1/H2 + Cortison', 'Im Alltag häufig eingesetzt', 'Nicht mehr in aktuellen Leitlinien empfohlen'],
          ]}
        />

        <Merke>
          Die „<strong>Jodallergie</strong>" existiert nicht. Jod (kleines Molekül) ist nicht allergen –
          die Reaktion richtet sich gegen andere Molekülbestandteile des KM.
        </Merke>
      </section>

      {/* PC-AKI */}
      <section id="pc-aki" className={styles.section}>
        <h2 className={styles.h2}>PC-AKI – Akute Nierenschädigung</h2>

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Terminologie</div>
            <KMTable
              headers={['Alt', 'Neu']}
              rows={[['CIN (Kontrastmittelinduzierte Nephropathie)', 'PC-AKI (Post-Contrast Acute Kidney Injury)']]}
            />
            <p className={styles.textSm}>Umbenennung: Nierenversagen gleich häufig nach nativer <em>und</em> nach KM-CT → fehlender Kausalzusammenhang.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Definition (ESUR)</div>
            <p className={styles.text}>Anstieg des Serumkreatinins <strong>innerhalb 48–72 h</strong> nach intravaskulärer KM-Gabe um:</p>
            <div className={styles.statRow} style={{ marginTop: 12 }}>
              <StatCard value="≥ 0,3" unit="mg/dl" label="Absoluter Anstieg" color="#f97316" />
              <StatCard value="≥ 1,5×" label="Relativer Anstieg" color="#fbbf24" />
            </div>
          </div>
        </div>

        <h3 className={styles.h3}>Risikofaktoren</h3>
        <KMTable
          headers={['Risikofaktor', 'Schwellenwert', 'Typ', 'Risiko']}
          rows={[
            ['eGFR ↓ + First-Pass-Effekt', '< 45 ml/min/1,73 m²', 'Patientenbezogen', '⚠️ Hoch'],
            ['eGFR ↓ + Second-Pass-Effekt', '< 30 ml/min/1,73 m²', 'Patientenbezogen', '⚠️ Hoch'],
            ['Akutes Nierenversagen', 'Jedes Stadium', 'Patientenbezogen', '🚨 Sehr hoch'],
            ['Intraarterielle KM-Gabe (First Pass)', 'Proximal Nierenarterien', 'Untersuchungsbezogen', '⚠️ Hoch'],
            ['Große KM-Mengen', '–', 'Untersuchungsbezogen', 'Moderat'],
            ['Mehrfache KM-Gaben', '≤ 48–72 h Abstand', 'Untersuchungsbezogen', 'Moderat'],
          ]}
        />

        <h3 className={styles.h3}>Hydrierung</h3>
        <InfoBox variant="warning" title="Indikation & Schema">
          <p>Empfohlen ab <strong>eGFR &lt; 30 ml/min/1,73 m²</strong></p>
          <p>i.v. NaCl 0,9 % · <strong>100 ml/h für 4 h vor und 4 h nach</strong> KM-Gabe</p>
          <p>⚠️ Kontraindikation: Herzinsuffizienz NYHA 3–4 · Lungenödem</p>
        </InfoBox>

        <KMTable
          headers={['Prophylaxe', 'Empfehlung', 'Evidenz']}
          rows={[
            ['i.v. Hydrierung (NaCl 0,9%)', 'Bei eGFR < 30', '✅ Empfohlen'],
            ['Acetylcystein (ACC)', 'Nicht mehr empfohlen', '❌ Wirksamkeit widerlegt'],
            ['Medikamentöse Prophylaxe', 'Keine', '❌ Keine nachgewiesen'],
          ]}
        />

        <InfoBox variant="info" title="Dialyse-Patienten">
          <p>Jod-KM: <strong>Keine zeitliche Abstimmung</strong> der Dialyse nötig – Niere arbeitet ohnehin nicht mehr.</p>
          <p>Gadolinium: <strong>Zeitnahe Dialyse</strong> empfohlen – zur Minimierung von NSF-Risiko und Gadolinium-Ablagerungen.</p>
        </InfoBox>
      </section>

      {/* METFORMIN */}
      <section id="metformin" className={styles.section}>
        <h2 className={styles.h2}>Metformin-Management</h2>
        <KMTable
          headers={['eGFR', 'Vorgehen', 'Begründung']}
          rows={[
            ['> 30 ml/min/1,73 m²', 'Normal weiter', 'Kein erhöhtes Risiko'],
            ['< 30 ml/min/1,73 m²', 'Absetzen für 48 h', 'Risiko Laktatazidose'],
            ['Akutes Nierenversagen', 'Absetzen für 48 h', 'Risiko Laktatazidose'],
          ]}
        />
        <Merke>Bei eGFR &lt; 30 ist Metformin eigentlich bereits kontraindiziert!</Merke>
      </section>
    </>
  )
}

function TabMRT() {
  return (
    <>
      {/* GADOLINIUM */}
      <section id="gadolinium" className={styles.section}>
        <h2 className={styles.h2}>Gadolinium – Grundlagen</h2>

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Eigenschaften</div>
            <KMTable
              headers={['Parameter', 'Wert']}
              rows={[
                ['Typ', 'Paramagnetisches Metall'],
                ['Freie Ionen (Gd³⁺)', '⚠️ Toxisch – müssen cheliert werden'],
                ['Standarddosis', '0,1 mmol/kg KG'],
                ['Primovist-Dosis', '0,025 mmol/kg (¼ der Standarddosis)'],
              ]}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Wirkmechanismus</div>
            <KMTable
              headers={['Effekt', 'Resultat', 'Relevanz']}
              rows={[
                ['T1-Verkürzung', 'Signalanstieg (hell)', 'Haupteffekt'],
                ['T2-Verkürzung', 'Signalabfall (dunkel)', 'Nur bei Hochdosis'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* CHELATE */}
      <section id="chelate" className={styles.section}>
        <h2 className={styles.h2}>Chelat-Formen</h2>

        <KMTable
          headers={['', 'Lineare Chelate', 'Makrozyklische Chelate']}
          colColors={[null, '#fbbf24', '#34d399']}
          rows={[
            ['Struktur', 'Offenkettig', 'Ringförmig – „Käfig"'],
            ['Stabilität', '⚠️ Geringer', '✅ Sehr hoch'],
            ['Gd-Freisetzung', '⚠️ Höher', '✅ Minimal'],
            ['Ablagerungsrisiko', '⚠️ Vorhanden', '✅ Sehr gering'],
            ['Status', '🔴 Rote-Hand-Brief 2018', '✅ Standard heute'],
            ['Beispiele', 'Primovist®, Multihance® (Leber)', 'Gadovist®, Dotarem®'],
          ]}
        />

        <InfoBox variant="warning" title="Ausnahmen vom Zulassungsruhen linearer KM">
          <p><strong>Primovist® (Gadoxetsäure)</strong> und <strong>Multihance® (Gadobensäure)</strong> dürfen weiterhin für Leber-MRT eingesetzt werden, da makrozyklische KM dort weniger geeignet sind.</p>
        </InfoBox>
      </section>

      {/* NSF & RETENTION */}
      <section id="nsf" className={styles.section}>
        <h2 className={styles.h2}>NSF & Gadolinium-Retention</h2>

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Nephrogene Systemische Fibrose (NSF)</div>
            <KMTable
              headers={['Parameter', 'Detail']}
              rows={[
                ['Mechanismus', 'Freies Gd → Fibroblasten-Aktivierung → Kollagenablagerung'],
                ['Betroffene Organe', 'Haut + innere Organe'],
                ['Risikofaktor', 'GFR < 30 + lineare KM'],
                ['Status heute', '✅ Extrem selten dank makrozyklischer KM'],
              ]}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Gadolinium-Retention im Gehirn</div>
            <KMTable
              headers={['Struktur', 'Lokalisation']}
              rows={[
                ['Nucleus dentatus', 'Marklager Kleinhirnhemisphäre, lateral der Kleinhirnkerne'],
                ['Globus pallidus', 'Mediales Segment Linsenkerns, lateral Capsula interna'],
              ]}
            />
            <InfoBox variant="info">
              <p>Sichtbar als T1-Hyperintensität nativ · Nur nach mehrfacher Gabe linearer KM · Klinische Relevanz bisher unbekannt</p>
            </InfoBox>
          </div>
        </div>
      </section>

      {/* LEBERSPEZIFISCH */}
      <section id="leber-km" className={styles.section}>
        <h2 className={styles.h2}>Leberspezifische KM</h2>

        <InfoBox variant="info" title="Prinzip">
          <p>Funktionstüchtige Hepatozyten nehmen KM auf → biliäre Ausscheidung → Enhancement. Alle anderen Läsionen bleiben hypointens.</p>
        </InfoBox>

        <KMTable
          headers={['', 'Primovist® (Gadoxetsäure)', 'Multihance® (Gadobensäure)']}
          colColors={[null, '#f97316', '#38bdf8']}
          rows={[
            ['Hepatozyten-Aufnahme', '~50 %', '~3–5 %'],
            ['Hepatobiliäre Phase', 'nach ~20 min', 'nach ~40–120 min'],
            ['Gd-Dosis', '0,025 mmol/kg', '0,1 mmol/kg'],
            ['Elimination', '~50 % biliär / ~50 % renal', 'Überwiegend renal'],
            ['Hepatozytenspezifisch?', '✅ Ja – einziges Gd-KM', '⚠️ Gering'],
          ]}
        />

        <h3 className={styles.h3}>Indikationen</h3>
        <KMTable
          headers={['Indikation', 'Prinzip']}
          rows={[
            ['FNH vs. Adenom', 'FNH nimmt KM auf, Adenome meist nicht'],
            ['HCC in der Zirrhose', 'Gut differenziertes HCC kann KM aufnehmen'],
            ['Metastasen < 1 cm', 'Hypointens in hepatobiliärer Phase → erhöhte Sensitivität'],
            ['Gallengangs-Leckage', 'Biliäre Ausscheidung macht Leckage sichtbar'],
          ]}
        />
      </section>

      {/* BUSCOPAN */}
      <section id="buscopan" className={styles.section}>
        <h2 className={styles.h2}>Buscopan® als Begleitmedikation</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Wirkung</div>
            <p className={styles.text}>Parasympatholytikum → lähmt glatte Muskulatur GI-Trakt → <strong>Artefaktreduktion</strong> im Leber-MRT.</p>
            <InfoBox variant="warning">
              <p>Pupillenerweiterung + Akkommodationsstörung → <strong>Fahrverbot 1–2 h</strong></p>
            </InfoBox>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Kontraindikationen</div>
            <KMTable
              headers={['KI', 'Alternative']}
              rows={[
                ['Glaukom', 'Glucagon'],
                ['Prostatahyperplasie', 'Glucagon'],
                ['Tachyarrhythmie', 'Glucagon'],
                ['Mechanischer Ileus', 'Glucagon'],
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}

function TabSpezial() {
  return (
    <>
      {/* HYPERTHYREOSE */}
      <section id="hyperthyreose" className={styles.section}>
        <h2 className={styles.h2}>Hyperthyreose & Jod-KM</h2>

        <div className={styles.statRow}>
          <StatCard value="100" label="Fälle auf 5 Mio." sub="KM-Gaben" color="#fbbf24" />
          <StatCard value="≥ 1 Woche" label="Latenz" sub="frühestens" color="#f97316" />
        </div>

        <InfoBox variant="warning" title="Risikosituationen">
          <p>Morbus Basedow · Struma multinodosa · Schilddrüsenautonomie</p>
        </InfoBox>

        <KMTable
          headers={['Situation', 'Vorgehen', 'Medikament']}
          rows={[
            ['Latente Hyperthyreose', 'Irenat® vor KM, dann 7–10 Tage weiter', 'Natriumperchlorat (blockiert Jodaufnahme)'],
            ['Manifeste Hyperthyreose', '⛔ Absolute Kontraindikation', '–'],
            ['Lebensbedrohlich (Ausnahme)', 'KM + Kombiprophylaxe', 'Irenat® + Thiamazol/Carbimazol'],
            ['SD-Karzinom (papillär/follikulär)', '⛔ Strikt verboten', 'Verhindert Radiojodtherapie!'],
          ]}
        />

        <Merke>Jodsättigung der SD-Zellen durch KM verhindert die spätere Radiojodtherapie!</Merke>
      </section>

      {/* GI */}
      <section id="gi" className={styles.section}>
        <h2 className={styles.h2}>Gastrointestinale Diagnostik</h2>

        <KMTable
          headers={['', 'Bariumsulfat', 'Gastrografin® (wasserlösl.)']}
          colColors={[null, '#fbbf24', '#38bdf8']}
          rows={[
            ['Resorption', 'Keine', 'Bei Perforation → Bauchfell resorbiert'],
            ['Osmolarität', 'Hypoosmolar zum Blut', 'Hyperosmolar → abführend'],
            ['Peritonitis bei Perforation', '🚨 Schwere Barium-Peritonitis', '✅ Keine'],
            ['Aspiration', '🚨 Fremdkörperreaktion + Lungenödem', '⚠️ Weniger gefährlich'],
            ['Ileus-Risiko', '⚠️ Barium-Steine möglich', '✅ Therapeutischer Effekt möglich'],
            ['Applikation', 'Oral / Rektal', 'Oral / Rektal'],
            ['Ausscheidung', 'Fäkal (weißer Stuhl)', 'Renal + fäkal'],
          ]}
        />

        <InfoBox variant="warning" title="KI für Bariumsulfat">
          <p>V.a. Perforation / Anastomoseninsuffizienz · Aspirationsgefahr · V.a. Ileus</p>
        </InfoBox>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Doppelkontrast-Methode (heute selten)</div>
          <p className={styles.text}>
            <strong>Positiver Kontrast:</strong> Barium beschichtet Schleimhaut (Schleimhautbeschlag)<br/>
            <strong>Negativer Kontrast:</strong> CO₂ / Methylzellulose → Lumendilatation<br/>
            Ziel: Beurteilung Schleimhautrelief (frühe Erosionen, kleine Polypen)
          </p>
        </div>
      </section>

      {/* SCHWANGERSCHAFT */}
      <section id="schwangerschaft" className={styles.section}>
        <h2 className={styles.h2}>Schwangerschaft</h2>

        <InfoBox variant="warning" title="Grundprinzip">
          <p>Strenge Indikationsstellung. KM nur wenn: (1) nicht verschiebbar AND (2) KM-freie Alternative nicht ausreicht. Detaillierte Aufklärung + Dokumentation obligat.</p>
        </InfoBox>

        <KMTable
          headers={['', 'Jodhaltige KM (CT)', 'Gadolinium (MRT)']}
          colColors={[null, '#f97316', '#38bdf8']}
          rows={[
            ['Plazentagängig', '✅ Ja', '✅ Ja'],
            ['Fetale Schilddrüse', 'Ab 10.–12. SSW Jodaufnahme', '–'],
            ['Risiko', 'Fetale Hypothyreose (Wolff-Chaikoff)', 'Freies Gd im Fruchtwasser – Risiko unklar'],
            ['Escape-Phänomen', 'Fetus kann nicht entkommen (anders als Erwachsene)', '–'],
            ['Empfehlung', 'Wenn nötig: möglich mit Kontrolle', 'Möglichst vermeiden (bes. 1. Trimester)'],
            ['Wenn nötig (MRT)', '–', 'Makrozyklische Chelate bevorzugen'],
            ['Nachsorge', 'TSH-Wert Neugeborenes kontrollieren', '–'],
          ]}
        />
      </section>

      {/* STILLZEIT */}
      <section id="stillzeit" className={styles.section}>
        <h2 className={styles.h2}>Stillzeit</h2>

        <KMTable
          headers={['', 'Jodhaltige KM', 'Gadolinium-KM']}
          rows={[
            ['Ausscheidung Muttermilch', '~0,5 % der Dosis', '< 0,04 % der Dosis'],
            ['Orale Bioverfügbarkeit Säugling', 'Sehr gering', 'Minimal'],
            ['Stillpause nötig?', '❌ Nicht nötig', '❌ Nicht nötig'],
            ['Wenn Mutter besorgt', '24 h pausieren + Milch verwerfen', '24 h pausieren + Milch verwerfen'],
          ]}
        />

        <Merke>Eine Stillpause ist aus medizinischer Sicht <strong>nicht notwendig</strong>. Pausieren nur auf ausdrücklichen Wunsch der Mutter.</Merke>
      </section>
    </>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function KontrastmittelPage() {
  const [activeTab, setActiveTab] = useState('roentgen')
  const [activeSection, setActiveSection] = useState('')
  const mainRef = useRef(null)

  // Scroll spy
  useEffect(() => {
    const currentTab = TABS.find(t => t.id === activeTab)
    if (!currentTab) return
    const ids = currentTab.sections.map(s => s.id)

    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [activeTab])

  // Reset scroll + active section on tab change
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0
    const currentTab = TABS.find(t => t.id === activeTab)
    if (currentTab?.sections?.[0]) setActiveSection(currentTab.sections[0].id)
  }, [activeTab])

  const currentTab = TABS.find(t => t.id === activeTab)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>

      {/* ── TOP HEADER ── */}
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <Link href="/#fachgebiete" className={styles.breadLink}>Technik & Physik</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>Kontrastmittel</span>
        </div>
        <h1 className={styles.pageTitle}>Kontrastmittel</h1>

        {/* Tab bar */}
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY: sidebar + content ── */}
      <div className={styles.body}>

        {/* LEFT SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>{currentTab?.icon} {currentTab?.label}</div>
          <nav>
            {currentTab?.sections.map(sec => (
              <button
                key={sec.id}
                className={`${styles.sideLink} ${activeSection === sec.id ? styles.sideLinkActive : ''}`}
                onClick={() => scrollTo(sec.id)}
              >
                <span className={styles.sideDot} />
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles.main} ref={mainRef}>
          {activeTab === 'roentgen'       && <TabRoentgen />}
          {activeTab === 'nebenwirkungen' && <TabNebenwirkungen />}
          {activeTab === 'mrt'            && <TabMRT />}
          {activeTab === 'spezial'        && <TabSpezial />}
        </main>
      </div>
    </div>
  )
}
