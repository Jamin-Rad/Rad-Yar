'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
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
      { id: 'vaskularisation',    label: 'Vaskularisation' },
    ],
  },
  {
    id: 'laesionen',
    label: 'Meniskus-Läsionen',
    icon: '🔴',
    sections: [
      { id: 'normalbefund',           label: 'Normalbefund MRT' },
      { id: 'lotysch-klassifikation', label: 'MRT-Grading (Lotysch)' },
      { id: 'komplexe-risse',         label: 'Komplexe Risse' },
      { id: 'fallbeispiele',          label: 'Fallbeispiele' },
    ],
  },
  {
    id: 'therapie',
    label: 'Therapieprinzip',
    icon: '💊',
    sections: [
      { id: 'therapieprinzipien', label: 'Therapieprinzip' },
    ],
  },
  {
    id: 'discoider',
    label: 'Discoider Meniskus',
    icon: '🔵',
    sections: [
      { id: 'disc-definition', label: 'Definition & Epidemiologie' },
      { id: 'disc-mrt',        label: 'MRT-Kriterien' },
      { id: 'disc-therapie',   label: 'Behandlung' },
    ],
  },
]

// ── SHARED SMALL COMPONENTS ────────────────────────────────────────────────

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
          <tr>{headers.map((h, i) => (
            <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ value, label, sub, color = '#f97316' }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue} style={{ color }}>{value}</div>
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
            <span>{step.text}</span>
          </div>
          {i < steps.length - 1 && <div className={styles.flowArrow}>↓</div>}
        </div>
      ))}
    </div>
  )
}

// ── ACCORDION SIDEBAR ──────────────────────────────────────────────────────

function Sidebar({ activeTab, onTabChange, activeSection, onSectionClick }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideHeader}>Inhaltsverzeichnis</div>

      {TABS.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <div key={tab.id} className={styles.sideGroup}>
            <button
              className={`${styles.sideGroupBtn} ${isActive ? styles.sideGroupActive : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className={styles.sideGroupIcon}>{tab.icon}</span>
              <span className={styles.sideGroupLabel}>{tab.label}</span>
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                className={`${styles.sideChevron} ${isActive ? styles.sideChevronOpen : ''}`}
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {isActive && (
              <div className={styles.sideGroupItems}>
                {tab.sections.map(sec => (
                  <button
                    key={sec.id}
                    className={`${styles.sideLink} ${activeSection === sec.id ? styles.sideLinkActive : ''}`}
                    onClick={() => onSectionClick(sec.id)}
                  >
                    <span className={styles.sideDot} />
                    {sec.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </aside>
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
            ['Form',               'C-förmig',                                    'O-förmig (nahezu kreisrund)'],
            ['Mobilität',          '⚠️ Gering – fest mit Kapsel + MCL verwachsen', '✅ Hoch – keine laterale Bandverbindung'],
            ['Verletzungshäufigkeit','⚠️ ~2/3 aller Risse',                       '~1/3 aller Risse'],
            ['Häufigste Rissstelle','~98 % Hinterhorn',                            '~50 % Hinterhorn, ~50 % Corpus + VH'],
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
              dem medialen Kollateralband (MCL) verwachsen. Diese enge Verbindung schränkt 
              seine Verschieblichkeit erheblich ein.
            </p>
            <InfoBox variant="warning" title="Folge der eingeschränkten Mobilität">
              <p>Höhere Scherkräfte bei Traumata → ca. <strong>zwei Drittel</strong> aller Meniskusrisse betreffen den Innenmeniskus.</p>
            </InfoBox>
          </div>
          <div>
            <h3 className={styles.h3}>Verletzungslokalisation</h3>
            <div className={styles.statRow}>
              <StatCard value="~98 %" label="Hinterhorn" sub="bei Innenmeniskus-Rissen" color="#f97316" />
            </div>
            <p className={styles.textSm}>
              Das Hinterhorn ist durch Position und eingeschränkte Beweglichkeit am stärksten belastet.
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
              Der Außenmeniskus ist <strong>eher O-förmig</strong> und nicht mit den lateralen 
              Bändern verwachsen. Diese freie Beweglichkeit macht ihn deutlich verletzungsresistenter.
            </p>
            <InfoBox variant="info" title="Popliteus-Sehne">
              <p>
                Die Popliteus-Sehne durchzieht den Außenmeniskus am Hinterhorn – 
                ein <strong>normaler Befund</strong>, nicht mit einem Riss verwechseln.
              </p>
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
          Die proximale Meniskusoberfläche ist konvex und artikuliert mit den Femurkondylen. 
          Die tibiale Verankerung erfolgt über die <strong>Meniskuswurzeln (Roots)</strong> – 
          jeweils am Vorder- und Hinterhorn beider Menisken.
        </p>

        <figure className={styles.imgBlock}>
          <img src="/meniskus/anatomy-roots.png" alt="Meniskus von proximal mit Anterior- und Posteriorwurzeln" />
          <figcaption className={styles.imgCaption}>
            Meniskus von proximal: AH = Anterior Horn · PH = Posterior Horn · B = Body (Corpus). 
            Anteriore und posteriore Wurzel pro Meniskus.
          </figcaption>
        </figure>

        <KMTable
          headers={['Wurzel', 'Lokalisation', 'Klinische Bedeutung']}
          rows={[
            ['Anteriore Wurzel (VH)', 'Vorderhorn-Ansatz an der Tibia',  'Tibiale Stabilisierung anterior'],
            ['Posteriore Wurzel (HH)', 'Hinterhorn-Ansatz an der Tibia', '⚠️ Klinisch bedeutsamer – Wurzelabriss häufiger'],
          ]}
        />

        <InfoBox variant="danger" title="Root Tear – Posteriorer Wurzelabriss">
          <p>
            Abriss der posterioren Meniskuswurzel → Verlust der Hoop-Stress-Funktion → 
            radiale Meniskusextrusion → rasche sekundäre Gonarthrose.<br/>
            <strong>MRT:</strong> Ghost-Meniskus (verkleinertes Signal) oder direkte Avulsionszone 
            am Tibiaplateau. Wichtige Diagnose – arthroskopisch reparabel!
          </p>
        </InfoBox>
      </section>

      {/* VASKULARISATION */}
      <section id="vaskularisation" className={styles.section}>
        <h2 className={styles.h2}>Vaskularisation</h2>
        <p className={styles.text}>
          Die Menisken werden ausschließlich von kapselnahen Gefäßen über den 
          <strong> perimeniskalen Plexus</strong> versorgt. Die Durchblutung nimmt 
          von außen nach innen ab – mit direkten Konsequenzen für die Heilungspotenz.
        </p>

        <figure className={styles.imgBlockSm}>
          <img src="/meniskus/vascular-zones.png" alt="Vaskularisationszonen des Meniskus" />
        </figure>

        <div className={styles.zoneGrid}>
          <div className={styles.zoneCard} style={{ borderColor: '#dc2626' }}>
            <div className={styles.zoneHeader} style={{ background: '#dc2626' }}>
              <span className={styles.zoneName}>Zone I – Rote Zone</span>
              <span className={styles.zoneRange}>{'< 3 mm von der Kapsel'}</span>
            </div>
            <div className={styles.zoneBody}>
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
              <p>⚠️ Eingeschränkte Durchblutung</p>
              <p>⚠️ Reduzierte Heilungstendenz</p>
              <p>→ Naht individuell abwägen</p>
            </div>
          </div>
          <div className={styles.zoneCard} style={{ borderColor: '#94a3b8' }}>
            <div className={styles.zoneHeader} style={{ background: '#64748b' }}>
              <span className={styles.zoneName}>Zone III – Weiße Zone</span>
              <span className={styles.zoneRange}>{'> 5 mm · zentral'}</span>
            </div>
            <div className={styles.zoneBody}>
              <p>❌ Avaskulär</p>
              <p>❌ Keine relevante Heilung</p>
              <p>→ Naht nicht sinnvoll</p>
            </div>
          </div>
        </div>

        <KMTable
          headers={['Zone', 'Entfernung', 'Heilung', 'Therapie']}
          rows={[
            ['Zone I (Rot)',      '< 3 mm',  '✅ Gut',     'Meniskusnaht – Standard der Wahl'],
            ['Zone II (Rot-Weiß)', '3–5 mm', '⚠️ Fraglich', 'Naht mit ergänzenden Maßnahmen'],
            ['Zone III (Weiß)',   '> 5 mm',  '❌ Keine',   'Sparsame Teilresektion wenn nötig'],
          ]}
        />

        <Merke>
          Eine Meniskusnaht ist nur in Zone I (ggf. Zone II) und bei frischen Rissen sinnvoll.
          Die avaskuläre weiße Zone wird ausschließlich durch Diffusion aus der Synovialflüssigkeit
          ernährt – kontrollierte mechanische Belastung fördert die Ernährung und Heilung.
        </Merke>
      </section>
    </>
  )
}

function TabLaesionen() {
  return (
    <>
      {/* NORMALBEFUND */}
      <section id="normalbefund" className={styles.section}>
        <h2 className={styles.h2}>Normalbefund im MRT</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Signal</div>
            <p className={styles.text}>
              Der gesunde Meniskus stellt sich in allen Sequenzen 
              <strong> homogen hypointens</strong> dar – kein intrinsisches Signalplus.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Form im Sagittalschnitt</div>
            <p className={styles.text}>
              <strong>Dreieckige Konfiguration</strong>: breite Basis zur Kapsel, Spitze zentral. 
              Der Corpus zeigt das typische <strong>Bow-Tie-Zeichen</strong> auf 1–2 sagittalen Schichten.
            </p>
            <p className={styles.textSm}>
              Sichtbar auf ≥ 3 Schichten → discoider Meniskus (s. Tab „Discoider Meniskus")
            </p>
          </div>
        </div>
        <Merke>
          Jede Signalsteigerung im Meniskus ist pathologisch. Erst bei Kontakt zur Gelenkfläche 
          auf <strong>mindestens zwei aufeinanderfolgenden Schichten</strong> gilt der Riss als 
          radiologisch gesichert (Grad 3 nach Lotysch).
        </Merke>
      </section>

      {/* LOTYSCH KLASSIFIKATION */}
      <section id="lotysch-klassifikation" className={styles.section}>
        <h2 className={styles.h2}>MRT-Grading nach Lotysch et al.</h2>

        <InfoBox variant="info" title="Ziel der Klassifikation">
          <p>
            Unterscheidung zwischen <strong>degenerativen Veränderungen</strong> (Grad 0–2) 
            und <strong>radiologisch gesichertem Riss</strong> (Grad 3). 
            Grad 2c signalisiert erhöhtes Risiko für einen okkulten Riss.
          </p>
        </InfoBox>

        <figure className={styles.imgBlock}>
          <img src="/meniskus/lotysch-grading.png" alt="MRT-Grading nach Lotysch et al." />
          <figcaption className={styles.imgCaption}>
            MRT-Grading nach Lotysch et al. — Grad 0 (Normal) bis Grad 3 (radiologisch gesicherter Riss). 
            Grad 2 wird in drei Subtypen unterteilt (2a · 2b · 2c).
          </figcaption>
        </figure>

        <KMTable
          headers={['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung']}
          rows={[
            ['Grad 0',  'Homogen hypointens · kein Signalplus',                      'Keiner',                                                  'Normal'],
            ['Grad 1',  'Fokale / punktförmige Signalsteigerung',                    'Keiner',                                                  'Frühe mukoide Degeneration · meist asymptomatisch'],
            ['Grad 2a', 'Lineares Signal',                                           'Kein Kontakt zur Gelenkfläche',                           'Degenerativ · kein Riss'],
            ['Grad 2b', 'Lineares Signal (Single-Slice-Läsion)',                     '⚠️ Kontakt zur Oberfläche auf einem einzigen Bild',        'Inkonklusiv – KEIN gesicherter Riss!'],
            ['Grad 2c', 'Keilförmiges / globuläres / komplexes Signal',              'Kein klarer Kontakt',                                     '⚠️ Erhöhtes Risiko für okkulten Riss'],
            ['Grad 3',  'Lineares oder flächiges Signal',                            '🔴 Kontakt auf ≥ 2 aufeinanderfolgenden Schichten',        'Radiologisch gesicherter Meniskusriss'],
          ]}
        />

        <Merke>
          Grad 2b ist <strong>kein Riss</strong> – Kontakt auf einem einzigen Bild reicht nicht.
          Erst auf <strong>zwei aufeinanderfolgenden Schichten</strong> gilt der Riss als gesichert (Grad 3).
        </Merke>
      </section>

      {/* KOMPLEXE RISSE */}
      <section id="komplexe-risse" className={styles.section}>
        <h2 className={styles.h2}>Komplexe Meniskusrisse</h2>

        <InfoBox variant="warning" title="Erweiterung – Grad 4 (nach Stoller)">
          <p>
            Komplexe Risse gehen über einen einfachen Grad-3-Riss hinaus und werden 
            in der erweiterten Klassifikation als <strong>Grad 4</strong> geführt. 
            Häufig irreparabel – erfordern Teilresektion.
          </p>
        </InfoBox>

        <KMTable
          headers={['Merkmal', 'Beschreibung']}
          rows={[
            ['Multiple Risslinien', 'Mehrere Ebenen kombiniert (z. B. horizontal + vertikal)'],
            ['Mazeration',          'Zerfransung / strukturelle Destruktion des Gewebes'],
            ['Korbhenkelriss',      'Inneres Fragment disloziert in den Interkondylarraum → „Double-PCL-Sign" / „Ghost-Meniskus"'],
            ['Flap-Riss',          'Aufklappbares Fragment, nach proximal oder distal verlagert · mechanisch symptomatisch'],
          ]}
        />

        <div className={styles.twoCol}>
          <InfoBox variant="danger" title="Korbhenkelriss – Zeichen">
            <p>
              <strong>Direktes Zeichen:</strong> Disloziertes Fragment im Interkondylarraum 
              (Double-PCL-Sign).<br/>
              <strong>Indirektes Zeichen:</strong> Verkleinerter / fehlender Meniskus im 
              eigentlichen Kompartment (Ghost-Meniskus).
            </p>
          </InfoBox>
          <InfoBox variant="warning" title="Flap-Riss">
            <p>
              Aufklappbares Fragment im Gelenk – häufig im Hinterhorn des Innenmeniskus. 
              Verursacht Blockierung oder Schnappen und ist arthroskopisch gut therapierbar.
            </p>
          </InfoBox>
        </div>
      </section>

      {/* FALLBEISPIELE */}
      <section id="fallbeispiele" className={styles.section}>
        <h2 className={styles.h2}>Fallbeispiele</h2>
        <p className={styles.text}>
          Klick auf einen Fall öffnet den vollständigen Fall auf Radiopaedia – 
          dort sind alle Sequenzen einsehbar und scrollbar.
        </p>

        <div className={styles.caseGrid}>
          <a
            href="https://radiopaedia.org/cases/14060"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.caseCardLink}
          >
            <img
              className={styles.caseImgLg}
              src="/meniskus/mri-sagittal.png"
              alt="MRT Knie sagittal – Grad 2a"
            />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grad 2a</div>
              <div className={styles.caseTitle}>Lineare Signalsteigerung ohne Oberflächenkontakt</div>
              <div className={styles.caseMeta}>PD-Wichtung · sagittal · Degenerativ · kein Riss</div>
              <div className={styles.caseMeta} style={{ fontSize: 11, marginTop: 4 }}>
                Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060
              </div>
              <span className={styles.caseLink}>Auf Radiopaedia öffnen</span>
            </div>
          </a>

          <a
            href="https://radiopaedia.org/cases/75168"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.caseCardLink}
          >
            <img
              className={styles.caseImgLg}
              src="/meniskus/mri-coronal.png"
              alt="MRT Knie koronal – Grad 2c"
            />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grad 2c</div>
              <div className={styles.caseTitle}>Globuläres / komplexes Signal ohne klare Linie</div>
              <div className={styles.caseMeta}>PD-Wichtung · koronal · Erhöhtes Risiko für okkulten Riss</div>
              <div className={styles.caseMeta} style={{ fontSize: 11, marginTop: 4 }}>
                Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168
              </div>
              <span className={styles.caseLink}>Auf Radiopaedia öffnen</span>
            </div>
          </a>
        </div>

        <InfoBox variant="info" title="Sequenzen für die Meniskusdiagnostik">
          <p>
            <strong>PD-FSE</strong> (Proton Density Fast Spin Echo) mit und ohne Fettsuppression, 
            sagittal + koronal. Sagittal: sensitiv für Grad-3-Risse. 
            Koronal: unverzichtbar für Meniskuswurzeln und Extrusion.
          </p>
        </InfoBox>
      </section>
    </>
  )
}

function TabTherapie() {
  return (
    <>
      <section id="therapieprinzipien" className={styles.section}>
        <h2 className={styles.h2}>Therapieprinzip – „Save the Meniscus"</h2>

        <InfoBox variant="success" title="Leitgedanke">
          <p>
            Einmal reseziertes Meniskusgewebe ist dauerhaft verloren. Jeder Substanzverlust 
            erhöht den Knorpelkontaktdruck, beschleunigt Degeneration und begünstigt Gonarthrose. 
            Leitprinzip: <strong>so wenig Resektion wie möglich, so viel Naht wie möglich.</strong>
          </p>
        </InfoBox>

        <KMTable
          headers={['Option', 'Indikation', 'Voraussetzung']}
          rows={[
            ['Konservativ',         'Asymptomatisch · rein degenerativ (Grad 1–2b)',    'Keine mechanische Instabilität / Blockierung'],
            ['Meniskusnaht (Repair)','Frischer traumatischer Riss in Zone I (ggf. II)',  'Zone I · frisch (< 6–8 Wo.) · stabile Konfiguration · junger Patient'],
            ['Sparsame Teilresektion','Irreparables Fragment (Zone III, chronisch)',     'Nur wenn Naht definitiv nicht möglich – so wenig wie nötig!'],
          ]}
        />

        <FlowStep steps={[
          { text: '📋  Asymptomatisch / Degeneration (Grad 1–2b)  →  Konservatives Management', variant: 'flowOrange' },
          { text: '🔧  Zone I · frischer Riss · Grad 3  →  Meniskusnaht anstreben' },
          { text: '✂️   Zone III · chronisch · irreparabel  →  Sparsame Teilresektion' },
          { text: '🚫  Totalmeniskektomie  →  Nur absoluter Ausnahmefall!', variant: 'flowOrange' },
        ]} />

        <Merke>
          Jede vermiedene Resektion ist ein Beitrag zum Gelenkerhalt. 
          Die Indikation zur Resektion muss immer kritisch gestellt werden.
        </Merke>
      </section>
    </>
  )
}

function TabDiscoider() {
  return (
    <>
      {/* DEFINITION & EPIDEMIOLOGIE */}
      <section id="disc-definition" className={styles.section}>
        <h2 className={styles.h2}>Definition & Epidemiologie</h2>

        <InfoBox variant="info" title="Definition">
          <p>
            Angeborene anatomische Variante mit einem übermäßig breiten, scheibenförmigen 
            Meniskuskörper. Betrifft fast ausschließlich den <strong>Außenmeniskus</strong>.
          </p>
        </InfoBox>

        <div className={styles.statRow}>
          <StatCard value="3–5 %" label="Inzidenz" sub="Zufallsbefund im Knie-MRT" color="#f97316" />
          <StatCard value="~50 %"  label="Bilateral" sub="häufig doppelseitig" color="#fbbf24" />
        </div>

        <KMTable
          headers={['Parameter', 'Wert']}
          rows={[
            ['Betroffener Meniskus', 'Fast ausschließlich Außenmeniskus'],
            ['Seitenverteilung',     'Bilateral in ~50 % der Fälle'],
            ['Geschlecht',           'Keine Präferenz'],
            ['Ethnizität',           'Erhöhte Prävalenz in asiatischen Ländern'],
            ['Rissrisiko',           'Deutlich erhöht gegenüber normalem Meniskus'],
          ]}
        />

        <InfoBox variant="warning" title="Klinisches Leitsymptom bei Kindern">
          <p>
            <strong>Knieschnappen (Snapping Knee)</strong> bei Kindern → 
            immer an discoiden Außenmeniskus denken! 
            Das verbreiterte Meniskusgewebe schnellt bei Bewegung über den lateralen Femurkondylus.
          </p>
        </InfoBox>
      </section>

      {/* MRT-KRITERIEN */}
      <section id="disc-mrt" className={styles.section}>
        <h2 className={styles.h2}>MRT-Kriterien</h2>

        <KMTable
          headers={['Ebene', 'Kriterium', 'Schwellenwert']}
          rows={[
            ['Koronal', 'Absolute Meniskusbreite',             '≥ 15 mm'],
            ['Koronal', 'Meniskusbreite / maximale Tibiabreite', '> 20 %'],
            ['Sagittal', 'Kontinuierliche Corpus-Darstellung',  'Auf ≥ 3 aufeinanderfolgenden Standardschichten'],
          ]}
        />

        <InfoBox variant="info" title="Sagittales Zeichen">
          <p>
            Das sagittale Kriterium entspricht dem 
            <strong> Gegenteil des Absent-Bow-Tie-Signs</strong>: 
            Ein normaler Meniskus zeigt den Corpus (Bow-Tie) nur auf 1–2 Schichten. 
            Beim discoiden Meniskus ist er auf ≥ 3 Schichten kontinuierlich sichtbar.
          </p>
        </InfoBox>

        <Merke>
          Ein discoider Meniskus reißt häufiger und weist atypische Rissmuster auf – 
          die MRT-Diagnose der Grundanomalie ist Voraussetzung für eine korrekte 
          Therapieplanung.
        </Merke>
      </section>

      {/* BEHANDLUNG */}
      <section id="disc-therapie" className={styles.section}>
        <h2 className={styles.h2}>Behandlung</h2>

        <KMTable
          headers={['Situation', 'Vorgehen']}
          rows={[
            ['Asymptomatischer Zufallsbefund',    'Konservatives Management · keine Intervention nötig'],
            ['Symptomatisch ohne Riss',            'Konservativ; bei Versagen: arthroskopische Saucerisation (Teilresektion zur Formkorrektur)'],
            ['Discoider Meniskus mit Riss',        'Arthroskopische Meniskusrefixation (Repair) + ggf. partielle Resektion'],
            ['Irreparabel / schwere Destruktion',  'Teil- oder Totalmeniskektomie als letzte Option'],
          ]}
        />

        <InfoBox variant="success" title="Prinzip: Meniskusgewebe erhalten">
          <p>
            Auch beim discoiden Meniskus gilt das „Save the Meniscus"-Prinzip. 
            Totale Meniskektomie sollte vermieden werden, da das laterale Kompartment 
            dann jeglichen Schutz verliert.
          </p>
        </InfoBox>
      </section>
    </>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function MeniskusPage() {
  const { texts } = useLanguage()
  const [activeTab, setActiveTab]         = useState('anatomie')
  const [activeSection, setActiveSection] = useState('menisken-vergleich')
  const mainRef = useRef(null)

  // Switch tab: scroll to top + set first section active
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (mainRef.current) mainRef.current.scrollTop = 0
    const tab = TABS.find(t => t.id === tabId)
    if (tab?.sections?.[0]) setActiveSection(tab.sections[0].id)
  }

  // Scroll to a section (with tab switch if needed)
  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Scroll spy
  useEffect(() => {
    const tab = TABS.find(t => t.id === activeTab)
    if (!tab) return
    const ids = tab.sections.map(s => s.id)

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

  return (
    <div className={styles.page}>

      {/* ── TOP BAR ── */}
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <Link href="/#fachgebiete" className={styles.breadLink}>Muskuloskelettales</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>Knie · Meniskus</span>
        </div>
        <h1 className={styles.pageTitle}>Meniskus</h1>
      </div>

      {/* ── MOBILE TAB BAR (hidden on desktop) ── */}
      <div className={styles.mobileTabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.mobileTab} ${activeTab === tab.id ? styles.mobileTabActive : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* ACCORDION SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeSection={activeSection}
          onSectionClick={scrollTo}
        />

        {/* MAIN CONTENT */}
        <main className={styles.main} ref={mainRef}>
          {activeTab === 'anatomie'   && <TabAnatomie />}
          {activeTab === 'laesionen'  && <TabLaesionen />}
          {activeTab === 'therapie'   && <TabTherapie />}
          {activeTab === 'discoider'  && <TabDiscoider />}
        </main>
      </div>
    </div>
  )
}
