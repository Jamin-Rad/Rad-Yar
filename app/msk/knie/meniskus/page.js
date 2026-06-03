'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

// ── NAV STRUCTURE ──────────────────────────────────────────────────────────
const TABS = [
  {
    id: 'anatomie',
    label: 'Anatomie',
    icon: '🦴',
    sections: [
      { id: 'menisken-vergleich', label: 'Vergleich' },
      { id: 'innenmeniskus',      label: 'Innenmeniskus' },
      { id: 'aussenmeniskus',     label: 'Außenmeniskus' },
      { id: 'verankerung',        label: 'Verankerung & Roots' },
      { id: 'normalbefund',       label: 'Normalbefund MRT' },
    ],
  },
  {
    id: 'vaskularisation',
    label: 'Vaskularisation',
    icon: '🩸',
    sections: [
      { id: 'zoneneinteilung',      label: 'Zoneneinteilung' },
      { id: 'klinische-bedeutung',  label: 'Klinische Bedeutung' },
    ],
  },
  {
    id: 'mrt-grading',
    label: 'MRT-Grading',
    icon: '🧲',
    sections: [
      { id: 'lotysch-klassifikation', label: 'Lotysch-Klassifikation' },
      { id: 'komplexe-risse',         label: 'Komplexe Risse' },
      { id: 'fallbeispiele',          label: 'Fallbeispiele' },
    ],
  },
  {
    id: 'therapie',
    label: 'Therapie & Varianten',
    icon: '🔬',
    sections: [
      { id: 'therapieprinzipien',  label: 'Therapieprinzipien' },
      { id: 'discoider-meniskus',  label: 'Discoider Meniskus' },
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
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>
                {h}
              </th>
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

function TabAnatomie() {
  return (
    <>
      {/* VERGLEICH */}
      <section id="menisken-vergleich" className={styles.section}>
        <h2 className={styles.h2}>Menisken im Überblick</h2>

        <KMTable
          headers={['', 'Innenmeniskus (medial)', 'Außenmeniskus (lateral)']}
          rows={[
            ['Form',               'C-förmig',                                         'O-förmig (nahezu kreisrund)'],
            ['Größe',              'Größer',                                            'Kleiner'],
            ['Mobilität',          '⚠️ Gering – fest verwachsen',                       '✅ Höher – frei beweglich'],
            ['Verbindung',         'Gelenkkapsel + MCL (mediales Seitenband)',          'Keine Fixierung an lateralen Bändern'],
            ['Verletzungshäufigkeit', '⚠️ ~2/3 aller Risse',                           '~1/3 aller Risse'],
            ['Häufigste Rissstelle', '~98 % Hinterhorn',                               '~50 % Hinterhorn, Rest verteilt auf Corpus + VH'],
          ]}
        />
      </section>

      {/* INNENMENISKUS */}
      <section id="innenmeniskus" className={styles.section}>
        <h2 className={styles.h2}>Innenmeniskus (Meniscus medialis)</h2>

        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.h3}>Morphologie & Fixierung</h3>
            <p className={styles.text}>
              Der Innenmeniskus ist <strong>C-förmig</strong> und fest mit Gelenkkapsel sowie 
              dem medialen Kollateralband (MCL) verwachsen. Diese enge Verbindung schränkt seine 
              Verschieblichkeit deutlich ein.
            </p>
            <InfoBox variant="warning" title="Folge der eingeschränkten Mobilität">
              <p>Höhere Scherkräfte bei Traumata → ca. <strong>zwei Drittel</strong> aller Meniskusrisse betreffen den Innenmeniskus.</p>
            </InfoBox>
          </div>
          <div>
            <h3 className={styles.h3}>Verletzungslokalisation</h3>
            <div className={styles.statRow}>
              <StatCard value="~98 %" label="Hinterhorn" sub="Innenmeniskus-Risse" color="#f97316" />
            </div>
            <p className={styles.textSm}>
              Das Hinterhorn ist durch seine anatomische Position und die eingeschränkte 
              Beweglichkeit mechanisch am stärksten belastet.
            </p>
          </div>
        </div>
      </section>

      {/* AUSSENMENISKUS */}
      <section id="aussenmeniskus" className={styles.section}>
        <h2 className={styles.h2}>Außenmeniskus (Meniscus lateralis)</h2>

        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.h3}>Morphologie & Fixierung</h3>
            <p className={styles.text}>
              Der Außenmeniskus ist <strong>eher O-förmig</strong> (nahezu kreisrund) und 
              <em>nicht</em> mit den lateralen Bändern verwachsen. Diese freie Beweglichkeit 
              macht ihn deutlich verletzungsresistenter.
            </p>
            <InfoBox variant="info" title="Besonderheit Popliteus-Sehne">
              <p>Der Außenmeniskus wird von der Popliteus-Sehne durchzogen – ein normaler Befund, nicht zu verwechseln mit einem Riss.</p>
            </InfoBox>
          </div>
          <div>
            <h3 className={styles.h3}>Verletzungslokalisation</h3>
            <div className={styles.statRow}>
              <StatCard value="~50 %" label="Hinterhorn" sub="Außenmeniskus-Risse" color="#38bdf8" />
              <StatCard value="~50 %" label="Corpus + VH" sub="restliche Anteile" color="#94a3b8" />
            </div>
          </div>
        </div>
      </section>

      {/* VERANKERUNG */}
      <section id="verankerung" className={styles.section}>
        <h2 className={styles.h2}>Verankerung & Meniskuswurzeln</h2>

        <p className={styles.text}>
          Die <strong>proximale Oberfläche</strong> der Menisken ist konvex und artikuliert 
          mit den Femurkondylen. Die tibiale Verankerung erfolgt über die 
          <strong> Meniskuswurzeln (Roots)</strong> – jeweils am Vorder- und Hinterhorn beider Menisken.
        </p>

        <figure className={styles.imgBlock}>
          <img src="/meniskus/anatomy-roots.png" alt="Meniskus-Anatomie mit Vorder- und Hinterhornwurzeln" />
          <figcaption className={styles.imgCaption}>
            Meniskus von proximal: Anteriore (AH) und posteriore Wurzeln (PH). AH = Anterior Horn · PH = Posterior Horn · B = Body (Corpus).
          </figcaption>
        </figure>

        <KMTable
          headers={['Wurzel', 'Lokalisation', 'Klinische Bedeutung']}
          rows={[
            ['Anteriore Wurzel (VH)', 'Vorderhorn-Ansatz an der Tibia', 'Tibiale Stabilisierung anterior'],
            ['Posteriore Wurzel (HH)', 'Hinterhorn-Ansatz an der Tibia', '⚠️ Klinisch bedeutsamer – Wurzelabriss-Gefahr!'],
          ]}
        />

        <InfoBox variant="danger" title="Root Tear – Wurzelabriss">
          <p>
            Abriss der posterioren Meniskuswurzel → Verlust der Hoop-Stress-Funktion → 
            radialer Meniskusextrusion → rasche sekundäre Gonarthrose. Wichtige MRT-Diagnose, 
            da arthroskopisch reparabel! Im MRT als Ghost-Meniskus oder direkte Avulsion am Tibiaplateau erkennbar.
          </p>
        </InfoBox>
      </section>

      {/* NORMALBEFUND */}
      <section id="normalbefund" className={styles.section}>
        <h2 className={styles.h2}>Normalbefund im MRT</h2>

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Signal</div>
            <p className={styles.text}>
              Der gesunde Meniskus stellt sich in allen Sequenzen <strong>homogen hypointens</strong> dar – 
              kein intrinsisches Signalplus, kein Kontakt zur Gelenkfläche.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Form im Sagittalschnitt</div>
            <p className={styles.text}>
              <strong>Dreieckige Konfiguration</strong>: breite Basis zur Kapsel hin, 
              Spitze nach intrakapsulär (zentral). Der Corpus zeigt das typische 
              <strong> Bow-Tie-Zeichen</strong> auf 1–2 sagittalen Schichten.
            </p>
            <p className={styles.textSm}>
              ⚠️ Sichtbar auf ≥ 3 Schichten → discoider Meniskus (s. Tab „Therapie & Varianten")
            </p>
          </div>
        </div>

        <Merke>
          Jede Signalsteigerung im Meniskus ist pathologisch. Erst wenn das Signal die 
          Gelenkfläche auf <strong>mindestens zwei aufeinanderfolgenden Schichten</strong> erreicht, 
          gilt der Riss als radiologisch gesichert (Grad 3 nach Lotysch).
        </Merke>
      </section>
    </>
  )
}

function TabVaskularisation() {
  return (
    <>
      {/* ZONENEINTEILUNG */}
      <section id="zoneneinteilung" className={styles.section}>
        <h2 className={styles.h2}>Zoneneinteilung</h2>

        <p className={styles.text}>
          Die Menisken werden ausschließlich von kapselnahen Gefäßen über den 
          <strong> perimeniskalen Plexus</strong> versorgt. Die Vaskularisation nimmt 
          von außen (kapselnahe Basis) nach innen (zentrale Spitze) ab – 
          mit direkten Konsequenzen für die Heilungspotenz.
        </p>

        <figure className={styles.imgBlock}>
          <img src="/meniskus/vascular-zones.png" alt="Vaskularisationszonen des Meniskus" />
          <figcaption className={styles.imgCaption}>
            Koronaler Querschnitt: Zone 1 (Rot/außen) · Zone 2 (Rot-Weiß/Übergang) · Zone 3 (Weiß/zentral). 
            Lateral und medial.
          </figcaption>
        </figure>

        <div className={styles.zoneGrid}>
          <div className={styles.zoneCard} style={{ borderColor: '#dc2626' }}>
            <div className={styles.zoneHeader} style={{ background: '#dc2626' }}>
              <span className={styles.zoneName}>Zone I – Rote Zone</span>
              <span className={styles.zoneRange}>{'< 3 mm von der Kapsel'}</span>
            </div>
            <div className={styles.zoneBody}>
              <p>Außenbereich des Meniskus</p>
              <p>✅ Gut durchblutet</p>
              <p>✅ Gute Heilungschancen</p>
              <p>→ Meniskusnaht möglich</p>
            </div>
          </div>

          <div className={styles.zoneCard} style={{ borderColor: '#f97316' }}>
            <div className={styles.zoneHeader} style={{ background: '#f97316' }}>
              <span className={styles.zoneName}>Zone II – Rot-Weiße Zone</span>
              <span className={styles.zoneRange}>3–5 mm von der Kapsel</span>
            </div>
            <div className={styles.zoneBody}>
              <p>Übergangsbereich</p>
              <p>⚠️ Eingeschränkte Durchblutung</p>
              <p>⚠️ Reduzierte Heilungstendenz</p>
              <p>→ Naht individuell abwägen</p>
            </div>
          </div>

          <div className={styles.zoneCard} style={{ borderColor: '#94a3b8' }}>
            <div className={styles.zoneHeader} style={{ background: '#64748b' }}>
              <span className={styles.zoneName}>Zone III – Weiße Zone</span>
              <span className={styles.zoneRange}>{'> 5 mm / zentraler Bereich'}</span>
            </div>
            <div className={styles.zoneBody}>
              <p>Zentraler, avaskulärer Bereich</p>
              <p>❌ Keine Durchblutung</p>
              <p>❌ Keine relevante Heilungstendenz</p>
              <p>→ Naht nicht sinnvoll</p>
            </div>
          </div>
        </div>
      </section>

      {/* KLINISCHE BEDEUTUNG */}
      <section id="klinische-bedeutung" className={styles.section}>
        <h2 className={styles.h2}>Klinische Bedeutung</h2>

        <KMTable
          headers={['Zone', 'Entfernung', 'Durchblutung', 'Heilung', 'Therapiekonsequenz']}
          rows={[
            ['Zone I (Rot)',      '< 3 mm',    'Gut',           '✅ Gut',     'Meniskusnaht – Standard der Wahl'],
            ['Zone II (Rot-Weiß)', '3–5 mm',  'Eingeschränkt', '⚠️ Fraglich', 'Naht mit ergänzenden Maßnahmen (Fibrin, etc.)'],
            ['Zone III (Weiß)',   '> 5 mm',   'Keine',         '❌ Keine',   'Naht nicht sinnvoll → sparsame Teilresektion'],
          ]}
        />

        <Merke>
          Eine Meniskusnaht ist nur in gut vaskularisierten Zonen (Zone I, ggf. Zone II) und bei 
          frischen Rissen zuverlässig möglich. Im Zweifelsfall gilt: 
          „<strong>Save the Meniscus</strong>" – so viel Meniskusgewebe wie möglich erhalten.
        </Merke>

        <InfoBox variant="info" title="Ernährung der weißen Zone">
          <p>
            Die avaskuläre weiße Zone wird ausschließlich durch Diffusion aus der Synovialflüssigkeit 
            ernährt – mechanische Belastung (Kompressions-Diffusion) ist dabei essenziell. 
            Deshalb fördern frühe kontrollierte Mobilisierung und Belastung die Meniskusheilung.
          </p>
        </InfoBox>
      </section>
    </>
  )
}

function TabMRTGrading() {
  return (
    <>
      {/* LOTYSCH KLASSIFIKATION */}
      <section id="lotysch-klassifikation" className={styles.section}>
        <h2 className={styles.h2}>MRT-Grading nach Lotysch et al.</h2>

        <InfoBox variant="info" title="Ziel der Klassifikation">
          <p>
            Unterscheidung zwischen <strong>degenerativen Veränderungen</strong> (Grad 0–2) 
            und <strong>radiologisch gesichertem Riss</strong> (Grad 3) sowie Einschätzung 
            des Risikos eines okkulten Risses (Grad 2c).
          </p>
        </InfoBox>

        <figure className={styles.imgBlock}>
          <img src="/meniskus/lotysch-grading.png" alt="MRI Grading of Meniscal Lesions nach Lotysch et al." />
          <figcaption className={styles.imgCaption}>
            MRT-Grading nach Lotysch et al. — Grad 0 (Normal) bis Grad 3 (gesicherter Riss). 
            Grad 2 ist in drei Subtypen unterteilt (2a, 2b, 2c).
          </figcaption>
        </figure>

        <KMTable
          headers={['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung']}
          rows={[
            [
              'Grad 0',
              'Homogen hypointens · kein Signalplus',
              'Keiner',
              'Normal',
            ],
            [
              'Grad 1',
              'Fokale/punktförmige intrameniskale Signalsteigerung',
              'Keiner',
              'Frühe mukoide Degeneration · histologisch · klinisch meist asymptomatisch',
            ],
            [
              'Grad 2a',
              'Lineares Signal',
              'Kein Kontakt zur Gelenkfläche',
              'Degenerativ · kein Riss',
            ],
            [
              'Grad 2b',
              'Lineares Signal (Single-Slice-Läsion)',
              '⚠️ Erreicht Oberfläche auf einem einzigen Bild',
              'Inkonklusiv – KEIN gesicherter Riss (Einzelschicht nicht ausreichend!)',
            ],
            [
              'Grad 2c',
              'Keilförmiges / globuläres / komplexes Signal · keine klare Linie',
              'Kein klarer Kontakt',
              '⚠️ Erhöhtes Risiko für okkulten Riss',
            ],
            [
              'Grad 3',
              'Lineares oder flächiges Signal',
              '🔴 Erreicht Gelenkfläche auf ≥ 2 aufeinanderfolgenden Schichten',
              'Radiologisch gesicherter Meniskusriss',
            ],
          ]}
        />

        <Merke>
          Grad 2b ist <strong>kein Riss</strong> – der Signalkontakt zur Oberfläche auf 
          <em> einem einzigen Bild</em> reicht nicht aus. Erst auf <strong>mindestens zwei 
          aufeinanderfolgenden Schichten</strong> gilt der Riss als gesichert (Grad 3).
        </Merke>
      </section>

      {/* KOMPLEXE RISSE */}
      <section id="komplexe-risse" className={styles.section}>
        <h2 className={styles.h2}>Komplexe Meniskusrisse</h2>

        <InfoBox variant="warning" title="Erweiterung der Klassifikation">
          <p>
            Komplexe Risse gehen über einen einfachen Grad-3-Riss hinaus und werden 
            in der erweiterten Klassifikation (nach Stoller) als <strong>Grad 4</strong> geführt. 
            Sie sind häufig irreparabel und erfordern eine Teilresektion.
          </p>
        </InfoBox>

        <KMTable
          headers={['Kriterium', 'Beschreibung']}
          rows={[
            ['Multiple Risslinien', 'Mehrere Risslinien in verschiedenen Ebenen (z. B. horizontal + vertikal kombiniert)'],
            ['Mazeration', 'Zerfransung / Destruktion des Meniskusgewebes'],
            ['Dislokation', 'Dislozierte Fragmente im Gelenk'],
            ['Korbhenkelriss', 'Inneres Fragment disloziert in den Interkondylarraum – „leerer Meniskus" als indirektes Zeichen'],
            ['Flap-Riss', 'Aufklappbares Fragment, nach proximal oder distal verlagert'],
          ]}
        />

        <div className={styles.twoCol}>
          <InfoBox variant="danger" title="Korbhenkelriss – Zeichen">
            <p>
              <strong>Direktes Zeichen:</strong> disloziertes Fragment im Interkondylarraum 
              („Double-PCL-Sign").<br/>
              <strong>Indirektes Zeichen:</strong> „Leerer Meniskus" / verkleinerter Meniskus 
              im eigentlichen Kompartment.
            </p>
          </InfoBox>
          <InfoBox variant="warning" title="Flap-Riss">
            <p>
              Aufklappbares Fragment, das im Gelenk mechanisch relevante Symptome 
              (Blockierung, Schnappen) verursacht. Häufig im Hinterhorn des Innenmeniskus.
            </p>
          </InfoBox>
        </div>
      </section>

      {/* FALLBEISPIELE */}
      <section id="fallbeispiele" className={styles.section}>
        <h2 className={styles.h2}>Fallbeispiele</h2>

        <div className={styles.caseGrid}>
          <div className={styles.caseCard}>
            <img
              className={styles.caseImg}
              src="/meniskus/mri-sagittal.png"
              alt="MRT Knie – Meniskus Grad 2a (sagittal)"
            />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grad 2a</div>
              <div className={styles.caseTitle}>Lineare Signalsteigerung ohne Oberflächenkontakt</div>
              <div className={styles.caseMeta}>PD-Wichtung · sagittal · Degenerativ · Kein Riss</div>
              <div className={styles.caseMeta} style={{ marginTop: 6, fontSize: 10.5 }}>
                Case courtesy of Roberto Schubert, Radiopaedia.org. rID: 14060
              </div>
            </div>
          </div>

          <div className={styles.caseCard}>
            <img
              className={styles.caseImg}
              src="/meniskus/mri-coronal.png"
              alt="MRT Knie – Meniskus Grad 2c (koronal)"
            />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grad 2c</div>
              <div className={styles.caseTitle}>Globuläres / komplexes Signal ohne klare Linie</div>
              <div className={styles.caseMeta}>PD-Wichtung · koronal · Erhöhtes Risiko für okkulten Riss</div>
              <div className={styles.caseMeta} style={{ marginTop: 6, fontSize: 10.5 }}>
                Case courtesy of Ammar Haouimi, Radiopaedia.org. rID: 75168
              </div>
            </div>
          </div>
        </div>

        <InfoBox variant="info" title="MRT-Sequenzen für die Meniskusdiagnostik">
          <p>
            <strong>PD-FSE (Proton Density Fast Spin Echo)</strong> mit und ohne Fettsuppression 
            in sagittaler und koronaler Ebene – Standardsequenzen. Die sagittale Ebene ist für 
            Grad-3-Risse am sensitivsten; die koronale Ebene ist unverzichtbar zur Beurteilung 
            der Meniskuswurzeln und von Meniskusextrusionen.
          </p>
        </InfoBox>
      </section>
    </>
  )
}

function TabTherapie() {
  return (
    <>
      {/* THERAPIEPRINZIPIEN */}
      <section id="therapieprinzipien" className={styles.section}>
        <h2 className={styles.h2}>Therapieprinzipien – „Save the Meniscus"</h2>

        <InfoBox variant="success" title="Leitgedanke">
          <p>
            Einmal reseziertes Meniskusgewebe ist dauerhaft verloren. Jeder Substanzverlust 
            erhöht den Knorpelkontaktdruck, beschleunigt die Knorpeldegeneration und 
            begünstigt eine Gonarthrose. Leitprinzip: so wenig Resektion wie möglich, 
            so viel Naht wie möglich.
          </p>
        </InfoBox>

        <KMTable
          headers={['Therapieoption', 'Indikation', 'Voraussetzung']}
          rows={[
            [
              'Konservative Therapie',
              'Asymptomatische oder rein degenerative Läsionen (Grad 1, 2a/2b)',
              'Keine mechanische Instabilität / Blockierung',
            ],
            [
              'Meniskusnaht (Repair)',
              'Frische traumatische Risse in Zone I (ggf. Zone II)',
              'Rote Zone · frisch (< 6–8 Wochen) · stabile Risskonfiguration · junger Patient',
            ],
            [
              'Sparsame Teilresektion',
              'Irreparable, mechanisch relevante Fragmente (Zone III, chronisch, komplex)',
              'Nur wenn Naht definitiv nicht möglich – so wenig wie nötig!',
            ],
          ]}
        />

        <FlowStep steps={[
          { text: '📋 Asymptomatisch / reine Degeneration (Grad 1–2b) → Konservatives Management', variant: 'flowOrange' },
          { text: '🔧 Zone I · frischer Riss · Grad 3 → Meniskusnaht anstreben' },
          { text: '✂️ Zone III · chronisch · irreparabel → Sparsame Teilresektion' },
          { text: '🚫 Totalmeniskektomie → Nur absoluter Ausnahmefall!', variant: 'flowOrange' },
        ]} />

        <Merke>
          Jede vermiedene Teilresektion ist ein Beitrag zum langfristigen Gelenkerhalt. 
          Die Indikation zur Resektion muss immer kritisch gestellt werden.
        </Merke>
      </section>

      {/* DISCOIDER MENISKUS */}
      <section id="discoider-meniskus" className={styles.section}>
        <h2 className={styles.h2}>Discoider Meniskus (Scheibenmeniskus)</h2>

        <InfoBox variant="info" title="Definition">
          <p>
            Angeborene anatomische Variante mit einem übermäßig breiten, scheibenförmigen 
            Meniskuskörper. Betrifft fast ausschließlich den <strong>Außenmeniskus</strong>.
          </p>
        </InfoBox>

        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Epidemiologie</div>
            <div className={styles.statRow}>
              <StatCard value="3–5 %" label="Inzidenz" sub="Zufallsbefund im Knie-MRT" color="#f97316" />
              <StatCard value="~50 %" label="Bilateral" sub="häufig doppelseitig" color="#fbbf24" />
            </div>
            <p className={styles.textSm}>
              Erhöhte Prävalenz in asiatischen Ländern · Keine Geschlechtspräferenz
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>MRT-Kriterien</div>
            <KMTable
              headers={['Ebene', 'Kriterium']}
              rows={[
                ['Koronal', 'Meniskusbreite ≥ 15 mm  oder  Breite/Tibiabreite > 20 %'],
                ['Sagittal', 'Corpus auf ≥ 3 aufeinanderfolgenden Standardschichten kontinuierlich sichtbar'],
              ]}
            />
            <p className={styles.textSm}>
              Das sagittale Zeichen entspricht dem „<strong>Gegenteil des Absent-Bow-Tie-Signs</strong>": 
              Normal zeigt der Corpus nur auf 1–2 Schichten ein Bow-Tie-Muster.
            </p>
          </div>
        </div>

        <h3 className={styles.h3}>Behandlung</h3>
        <KMTable
          headers={['Situation', 'Vorgehen']}
          rows={[
            ['Asymptomatisch (Zufallsbefund)', 'Konservatives Management · keine Intervention nötig'],
            ['Symptomatisch ohne Riss', 'Konservativ; bei Versagen: arthroskopische Saucerisation (Teilresektion zur Normalisierung der Form)'],
            ['Riss / Instabilität', 'Arthroskopische Meniskusrefixation (Repair) + ggf. partielle Resektion; Totalmeniskektomie nur als letzte Option'],
          ]}
        />

        <InfoBox variant="warning" title="Klinischer Hinweis – Kinder">
          <p>
            Discoide Menisken reißen häufiger und können bei Kindern das typische 
            <strong> Knieschnappen (Snapping Knee)</strong> verursachen. 
            Bei Kindern mit unklarem lateralem Knieschnappen immer an discoiden 
            Außenmeniskus denken!
          </p>
        </InfoBox>
      </section>
    </>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function MeniskusPage() {
  const [activeTab, setActiveTab]         = useState('anatomie')
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

  // Reset on tab change
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
          <Link href="/#fachgebiete" className={styles.breadLink}>Muskuloskelettales</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>Knie · Meniskus</span>
        </div>
        <h1 className={styles.pageTitle}>Meniskus</h1>

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
          {activeTab === 'anatomie'         && <TabAnatomie />}
          {activeTab === 'vaskularisation'  && <TabVaskularisation />}
          {activeTab === 'mrt-grading'      && <TabMRTGrading />}
          {activeTab === 'therapie'         && <TabTherapie />}
        </main>
      </div>
    </div>
  )
}
