import Link from 'next/link';
import styles from './page.module.css';

export default function KontrastmittelPage() {
  return (
    <div className={styles.pageLayout}>
      
      {/* LINKES VERZEICHNIS (SIDEBAR) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarStickyWrapper}>
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>RadYar</Link> 
            <span className={styles.breadcrumbSeparator}>&rsaquo;</span>{' '}
            <Link href="/technik-physik" className={styles.breadcrumbLink}>Technik</Link>
          </nav>

          <h2 className={styles.sidebarTitle}>Inhalt</h2>
          <nav className={styles.verticalNav}>
            <a href="#roentgen" className={styles.navItem}>Röntgen-KM</a>
            <a href="#applikation" className={styles.navItem}>Applikation & Dosis</a>
            <a href="#paravasat" className={styles.navItem}>Paravasat-Management</a>
            <a href="#nebenwirkungen" className={styles.navItem}>Nebenwirkungen</a>
            <a href="#pc-aki" className={styles.navItem}>PC-AKI & Niere</a>
            <a href="#hyperthyreose" className={styles.navItem}>Hyperthyreose</a>
            <a href="#gastro" className={styles.navItem}>Gastrointestinal</a>
            <a href="#mrt" className={styles.navItem}>MRT-KM (Gadolinium)</a>
            <a href="#schwangerschaft" className={styles.navItem}>Schwangerschaft</a>
          </nav>
        </div>
      </aside>

      {/* HAUPTINHALT */}
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Kontrastmittel in der Radiologie</h1>

        {/* --- RÖNTGEN-KONTRASTMITTEL --- */}
        <section id="roentgen" className={styles.section}>
          <h2 className={styles.sectionHeading}>Röntgen-Kontrastmittel</h2>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconContainerNegative}>&minus;</div>
              <h3 className={styles.cardTitle}>Röntgennegative Kontrastmittel</h3>
            </div>
            <p className={styles.cardText}>
              Zeigen aufgrund ihrer geringen oder fehlenden Absorptionsfähigkeit eine ungehinderte Durchlässigkeit der Röntgenstrahlung.
            </p>
            <div className={styles.visualBadgeList}>
              <span className={styles.badge}>Wasser</span>
              <span className={styles.badge}>Luft / CO₂ Gas</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconContainerPositive}>&plus;</div>
              <h3 className={styles.cardTitle}>Röntgenpositive Kontrastmittel</h3>
            </div>
            <p className={styles.cardText}>
              Erhöhte Absorption der Röntgenstrahlung im Vergleich zum umgebenden Gewebe durch eine <strong>höhere Ordnungszahl</strong>.
            </p>
            
            {/* Visuelles Diagramm: Trijodbenzolring */}
            <div className={styles.diagramContainer}>
              <div className={styles.chemicalRing}>
                <span className={styles.ringCenter}>Benzol</span>
                <span className={styles.jodElement} style={{top: '-15px'}}>Jod (Z=53)</span>
                <span className={styles.jodElement} style={{bottom: '-15px', left: '-10px'}}>Jod</span>
                <span className={styles.jodElement} style={{bottom: '-15px', right: '-10px'}}>Jod</span>
              </div>
              <div className={styles.diagramExplanation}>
                <p className={styles.diagramTitle}>Trijodbenzolring</p>
                <p className={styles.diagramSub}>Gemeinsame Grundstruktur aller wasserlöslichen Jod-KM.</p>
              </div>
            </div>

            <h4 className={styles.subHeading}>Anwendungsklassen:</h4>
            <ul className={styles.bulletList}>
              <li className={styles.listItem}>
                <strong className={styles.highlightText}>Nicht-ionische KM (z. B. Imeron®, Ultravist®):</strong> Intravasaler Standard. Keine elektrische Ladung, hydrophiler, niedrigere Osmolarität &rarr; Deutlich besser verträglich.
              </li>
              <li className={styles.listItem}>
                <strong className={styles.highlightText}>Ionische KM (z. B. Gastrografin®):</strong> Nur noch für enterale Applikation zugelassen. Höhere Osmolarität und Nebenwirkungsrate, jedoch kostengünstig.
              </li>
            </ul>
          </div>
        </section>

        {/* --- APPLIKATION UND DOSIERUNG --- */}
        <section id="applikation" className={styles.section}>
          <h2 className={styles.sectionHeading}>Applikation & Dosierung</h2>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Protokoll-Richtwerte (CT)</h3>
            
            {/* Visuelle Phasen-Leiste */}
            <div className={styles.phaseTimeline}>
              <div className={styles.timelineTrack}></div>
              <div className={styles.timelineNode} style={{left: '20%'}}>
                <span className={styles.nodeLabel}>LAE-CT</span>
                <span className={styles.nodeValue}>50–70 ml</span>
              </div>
              <div className={styles.timelineNode} style={{left: '45%'}}>
                <span className={styles.nodeLabel}>CTA Aorta</span>
                <span className={styles.nodeValue}>60–80 ml</span>
              </div>
              <div className={styles.timelineNode} style={{left: '75%'}}>
                <span className={styles.nodeLabel}>Abdomen (PV)</span>
                <span className={styles.nodeValue}>80–120 ml</span>
              </div>
            </div>

            <p className={styles.cardTextMuted}>
              <strong>Faustregel:</strong> Je schneller die maximale Gefäßkontrastierung erfolgen muss (Angio), desto kompakter das Volumen; je länger ein Organ homogen kontrastiert sein muss (Parenchym), desto größer das Volumen.
            </p>

            <h4 className={styles.subHeading}>Braunülen & Injektionsraten</h4>
            <div className={styles.flowGrid}>
              <div className={styles.flowCard} style={{borderColor: '#22c55e'}}>
                <span className={styles.flowGauge} style={{backgroundColor: '#22c55e'}}>18G (Grün)</span>
                <p className={styles.flowText}><strong>3–5 ml/s</strong><br/>Standard-Rate für Standard-CT & Angiographien</p>
              </div>
              <div className={styles.flowCard} style={{borderColor: '#ec4899'}}>
                <span className={styles.flowGauge} style={{backgroundColor: '#ec4899'}}>20G (Rosa)</span>
                <p className={styles.flowText}><strong>3–4 ml/s</strong><br/>Vollkommen ausreichend für portalvenöse Phasen</p>
              </div>
              <div className={styles.flowCard} style={{borderColor: '#3b82f6'}}>
                <span className={styles.flowGauge} style={{backgroundColor: '#3b82f6'}}>22G (Blau)</span>
                <p className={styles.flowText}><strong>2,5 ml/s</strong><br/>ZVK / Notbehelf. Reduziert die KM-Qualität deutlich</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- PARAVASAT MANAGEMENT --- */}
        <section id="paravasat" className={styles.section}>
          <h2 className={styles.sectionHeading}>Paravasat-Management</h2>
          <div className={styles.card}>
            <div className={styles.emergencyGrid}>
              <div className={styles.emergencySteps}>
                <h3 className={styles.cardTitle}>Sofortmaßnahmen</h3>
                <ol className={styles.orderedList}>
                  <li className={styles.orderedListItem}>Injektion stoppen, Zugang belassen & aspirieren</li>
                  <li className={styles.orderedListItem}>Kanüle erst nach Aspiration entfernen</li>
                  <li className={styles.orderedListItem}>Extremität hochlagern</li>
                  <li className={styles.orderedListItem}>Kühlung applizieren (20 min, mehrfach)</li>
                  <li className={styles.orderedListItem}>Umfang markieren & dokumentieren</li>
                </ol>
              </div>
              <div className={styles.emergencyChecklist}>
                <h4 className={styles.subHeading}>Überwachungs-Fokus:</h4>
                <div className={styles.checkItem}><span>&bull;</span> Durchblutung (Pulse distal, Rekap-Zeit)</div>
                <div className={styles.checkItem}><span>&bull;</span> Sensorik & Motorik (Parästhesien?)</div>
                <div className={styles.checkItem}><span>&bull;</span> Gewebespannung (Gefahr des Kompartmentsyndroms!)</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEBENWIRKUNGEN --- */}
        <section id="nebenwirkungen" className={styles.section}>
          <h2 className={styles.sectionHeading}>Nebenwirkungen & Pseudoallergien</h2>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Allergieartige Reaktionen (Nicht IgE-vermittelt)</h3>
            
            {/* Interaktives Stufenmodell */}
            <div className={styles.severityStairs}>
              <div className={styles.stairItem}>
                <div className={styles.stairHeader} style={{backgroundColor: 'rgba(251, 191, 36, 0.2)'}}>Grad 1: Mild</div>
                <div className={styles.stairBody}>Juckreiz, Exanthem, leichte Urtikaria</div>
              </div>
              <div className={styles.stairItem}>
                <div className={styles.stairHeader} style={{backgroundColor: 'rgba(249, 115, 22, 0.3)'}}>Grad 2: Moderat</div>
                <div className={styles.stairBody}>Deutliche Urtikaria, leichter Bronchospasmus</div>
              </div>
              <div className={styles.stairItem}>
                <div className={styles.stairHeader} style={{backgroundColor: 'rgba(239, 68, 68, 0.4)'}}>Grad 3: Schwer</div>
                <div className={styles.stairBody}>Hypotonie, Schockzustand (0,01–0,04%)</div>
              </div>
              <div className={styles.stairItem}>
                <div className={styles.stairHeader} style={{backgroundColor: '#ef4444', color: '#060708'}}>Grad 4: Vital</div>
                <div className={styles.stairBody}>Atem- und Herzkreislaufstillstand</div>
              </div>
            </div>

            <div className={styles.infoCallout}>
              <p className={styles.calloutTitle}>💡 Studienergebnis (Park et al. 2018) zum Substanzwechsel:</p>
              <p className={styles.calloutText}>
                Bei Re-Exposition mit identischem KM liegt die Rezidivrate bei <strong>31%</strong>. Durch einen konsequenten <strong>Substanzwechsel</strong> sinkt das Risiko auf <strong>12%</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* --- PC-AKI --- */}
        <section id="pc-aki" className={styles.section}>
          <h2 className={styles.sectionHeading}>Post-Contrast Acute Kidney Injury (PC-AKI)</h2>
          <div className={styles.card}>
            <p className={styles.cardText}>
              Die Neudefinition (früher <i>CIN</i>) basiert auf kontrollierten Studien, die zeigen, dass Kreatininanstiege nach nativen CTs statistisch deckungsgleich sind (Kausalität oft fraglich).
            </p>

            {/* Visuelle Grafik: First Pass vs Second Pass */}
            <div className={styles.renalGraphContainer}>
              <div className={styles.renalVisualBox}>
                <div className={styles.renalBadge} style={{backgroundColor: '#ef4444'}}>First-Pass</div>
                <p className={styles.renalBoxText}><strong>eGFR &lt; 45 ml/min</strong><br/>Intraarteriell proximal der Nierenarterien. Unverdünnte KM-Last trifft das Nephron.</p>
              </div>
              <div className={styles.renalVisualBox}>
                <div className={styles.renalBadge} style={{backgroundColor: '#fbbf24', color: '#060708'}}>Second-Pass</div>
                <p className={styles.renalBoxText}><strong>eGFR &lt; 30 ml/min</strong><br/>Intravenöse Gabe. KM verteilt sich im Körperkreislauf und wird vor der Niere verdünnt.</p>
              </div>
            </div>

            <div className={styles.alertBox}>
              <strong>Hydrierungsschema bei Risikopatienten:</strong> i.v. 0,9% NaCl mit 100 ml/h jeweils 4 Std. vor und nach der Untersuchung. (Vorsicht bei manifester Herzinsuffizienz NYHA III-IV).
            </div>
          </div>
        </section>

        {/* --- MRT KONTRASTMITTEL --- */}
        <section id="mrt" className={styles.section}>
          <h2 className={styles.sectionHeading}>MRT-Kontrastmittel & Leberspezifische Diagnostik</h2>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Chelatstruktur-Stabilität</h3>
            <p className={styles.cardText}>
              Freie Gadolinium-Ionen (Gd³⁺) sind hochtoxisch. Sie müssen in einem organischen Käfig (Chelat) komplexiert werden.
            </p>
            
            <div className={styles.chelatGrid}>
              <div className={styles.chelatCard}>
                <span className={styles.dangerLabel}>Zulassungsruhen (2018)</span>
                <h4>Lineare Chelate</h4>
                <p>Offenkettige Struktur. Geringere Stabilität, erhöhtes Risiko für Gewebeablagerungen (NSF und Hirnretention im Nucleus dentatus).</p>
              </div>
              <div className={styles.chelatCard} style={{borderColor: '#22c55e'}}>
                <span className={styles.successLabel}>Standard-Routine</span>
                <h4>Makrozyklische Chelate</h4>
                <p>Ringförmige, starre Käfigstruktur. Extrem hohe Stabilität. Kaum Dissoziation (z. B. Gadovist®, Dotarem®).</p>
              </div>
            </div>

            <h3 className={styles.cardTitle} style={{marginTop: '30px'}}>Hepatobiliäre Kontrastmittel (Primovist®)</h3>
            <p className={styles.cardText}>
              Einziges echtes leberspezifisches Gd-KM. Wird zu 50% aktiv über funktionelle Hepatozyten aufgenommen und biliär eliminiert.
            </p>

            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th className={styles.tableTh}>Spezifikation</th>
                  <th className={styles.tableTh}>Primovist®</th>
                  <th className={styles.tableTh}>Multihance®</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableTd}><strong>Hepatozyten-Aufnahme</strong></td>
                  <td className={styles.tableTd} style={{color: '#22c55e', fontWeight: 'bold'}}>~ 50%</td>
                  <td className={styles.tableTd}>~ 3–5%</td>
                </tr>
                <tr>
                  <td className={styles.tableTd}><strong>Optimale Hepatobiliäre Phase</strong></td>
                  <td className={styles.tableTd}>nach ~ 20 min</td>
                  <td className={styles.tableTd}>nach ~ 40–120 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
