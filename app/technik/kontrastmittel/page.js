import Link from 'next/link';
import styles from './page.module.css';

export default function KontrastmittelPage() {
  return (
    <div className={styles.pageContainer}>
      <nav className={styles.breadcrumb}>
        <Link href="/">RadYar</Link> &rsaquo;{' '}
        <Link href="/technik-physik">Technik & Physik</Link> &rsaquo;{' '}
        <span>Kontrastmittel</span>
      </nav>

      <h1 className={styles.pageTitle}>Kontrastmittel</h1>

      <nav className={styles.quickNav}>
        <a href="#roentgen">Röntgen-KM</a>
        <a href="#applikation">Applikation & Ausscheidung</a>
        <a href="#paravasat">Paravasat-Management</a>
        <a href="#nebenwirkungen">Nebenwirkungen</a>
        <a href="#pc-aki">PC-AKI</a>
        <a href="#hyperthyreose">Hyperthyreose</a>
        <a href="#gastro">Gastrointestinal</a>
        <a href="#mrt">MRT-KM</a>
        <a href="#schwangerschaft">Schwangerschaft & Stillzeit</a>
      </nav>

      <main className={styles.content}>
        {/* --- RÖNTGEN-KONTRASTMITTEL --- */}
        <section id="roentgen" className={styles.section}>
          <h2>Röntgen-Kontrastmittel</h2>
          
          <div className={styles.card}>
            <h3>Röntgennegative Kontrastmittel</h3>
            <p className={styles.mutedText}>
              Zeigen aufgrund ihrer geringen oder fehlenden Absorptionsfähigkeit eine ungehinderte Durchlässigkeit der Röntgenstrahlung.
            </p>
            <ul>
              <li>Wasser, Luft (oder Gas z. B. CO₂)</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Röntgenpositive Kontrastmittel</h3>
            <p className={styles.mutedText}>
              Führen zu einer vermehrten Absorption der eintretenden Röntgenstrahlen im Vergleich zum umgebenden Gewebe (höhere Ordnungszahl).
            </p>
            
            <h4>Wasserlösliche Kontrastmittel</h4>
            <p>Gemeinsame Grundstruktur: <strong>Trijodbenzolring</strong>. Jod (Z = 53) ist die röntgenkontrastgebende Substanz.</p>
            
            <ul>
              <li>
                <strong>Nicht-ionische Kontrastmittel (z. B. Imeron®, Ultravist®):</strong> Standard für die intravasale Anwendung, besser verträglich. Tragen keine elektrische Ladung, sind hydrophiler und besitzen eine deutlich niedrigere Osmolarität.
              </li>
              <li>
                <strong>Ionische Kontrastmittel (z. B. Gastrografin®):</strong> Für die enterale Anwendung (nicht mehr intravasal zugelassen). Höhere Osmolarität und Nebenwirkungsprofil, aber preisgünstiger.
              </li>
            </ul>

            <h4 className={styles.marginTop}>Wasserunlösliche Kontrastmittel</h4>
            <ul>
              <li><strong>Bariumsulfat:</strong> Für die enterale Bildgebung.</li>
              <li><strong>Jodhaltige Öle:</strong> Zur Darstellung der Lymphbahnen (Lymphangiographie) – heute selten verwendet.</li>
            </ul>
          </div>
        </section>

        {/* --- APPLIKATION UND AUSSCHEIDUNG --- */}
        <section id="applikation" className={styles.section}>
          <h2>Kontrastmittel-Applikation und -Ausscheidung</h2>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Jodkonzentration</h3>
              <ul>
                <li><strong>Standard (ca. 300 mg/ml):</strong> Für die meisten i.v. CT-Untersuchungen ausreichend.</li>
                <li><strong>CT-Angiographie (350–375 mg/ml):</strong> Für stärkere intravasale Kontrastierung.</li>
              </ul>
            </div>
            
            <div className={styles.card}>
              <h3>Kontrastmittelmenge (Erwachsene)</h3>
              <ul>
                <li><strong>LAE-CT:</strong> ca. 50–70 ml</li>
                <li><strong>CTA-Aorta:</strong> ca. 60–80 ml</li>
                <li><strong>Abdomen (PV-Phase):</strong> 80–120 ml</li>
                <li><strong>Biphasisch Abdomen:</strong> 100–140 ml</li>
              </ul>
              <p className={styles.mutedText}>
                Schnelle Maximalkontrastierung eines Gefäßes = kleineres Volumen. Lange, homogene Organkontrastierung = größeres Volumen.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Injektionsrate</h3>
            <ul>
              <li><strong>Standard (3–5 ml/s):</strong> Über 18G (grün). Falls nicht möglich: 20G (rosa) mit 3–4 ml/s (reicht für PV-Phase).</li>
              <li><strong>Hoch (5 ml/s):</strong> Ausschluss LAE, Charakterisierung hyper-/hypovaskularisierter Tumoren.</li>
              <li><strong>Niedrig (2,5 ml/s):</strong> Über 22G (blau) oder ZVK. Sollte vermieden werden (reduziert KM-Qualität und arterielle Abgrenzbarkeit).</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Ausscheidung</h3>
            <p><strong>Renale Elimination (ca. 90%):</strong> Plasmahalbwertzeit 1–3 h (50% nach 2h, 75% nach 4h, fast vollständig nach 24h).</p>
            <p><strong>Extra-renal:</strong> Geringer Anteil über Leber-Galle, Darm, Speicheldrüsen.</p>
          </div>

          <div className={styles.merkeBox}>
            <strong>Umweltaspekt:</strong> Da jodhaltige CT-KM und gadoliniumhaltige MRT-KM kaum filtriert werden können, gelangen sie über den Urin ins Abwassersystem und sind im Trinkwasser messbar. Es existieren derzeit keine effektiven Gegenmaßnahmen.
          </div>
        </section>

        {/* --- PARAVASAT --- */}
        <section id="paravasat" className={styles.section}>
          <h2>Paravasat-Management</h2>
          <div className={styles.card}>
            <h3>Maßnahmen & Überwachung</h3>
            <ol>
              <li>Injektion stoppen, Zugang belassen und Aspiration versuchen.</li>
              <li>Kanüle erst <strong>nach</strong> Aspiration entfernen.</li>
              <li>Extremität hochlagern & kalte Kompresse (20 min, mehrfach).</li>
              <li>Umfang dokumentieren (mit Stift markieren).</li>
            </ol>
            <h4>Überwachung:</h4>
            <ul>
              <li><strong>Durchblutung:</strong> Kapillarfüllzeit, Pulse distal prüfen.</li>
              <li><strong>Motorik & Sensorik:</strong> Parästhesien, Ausfälle?</li>
              <li><strong>Spannung:</strong> Gefahr des Kompartmentsyndroms bei Ödem/livider Verfärbung.</li>
              <li><strong>Haut:</strong> Blasenbildung, Nekrosen?</li>
            </ul>
          </div>
          <div className={styles.merkeBox}>
            <strong>Patientenaufklärung:</strong> Schwellung/Rötung/Wärme in den nächsten Stunden ist normal. Bei Zunahme, Bläschen, Taubheit, Verfärbung oder starken Schmerzen &rarr; sofort Notaufnahme!
          </div>
        </section>

        {/* --- NEBENWIRKUNGEN --- */}
        <section id="nebenwirkungen" className={styles.section}>
          <h2>Nebenwirkungen jodhaltiger KM</h2>
          
          <div className={styles.card}>
            <h3>Chemotoxische Reaktionen</h3>
            <p className={styles.mutedText}>Direkte chemische Wirkung des KM (nicht immunologisch).</p>
            <ul>
              <li>Wärmegefühl, Übelkeit, Erbrechen</li>
              <li>Vasovagale Reaktion, Arrhythmien</li>
              <li>Zerebraler Krampfanfall</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Allergieartige Reaktionen (Pseudoallergie)</h3>
            <p className={styles.mutedText}>Nicht IgE-vermittelt. Unspezifische Mastzellaktivierung & Histaminausschüttung.</p>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Grad</th>
                  <th>Schweregrad</th>
                  <th>Symptome</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mild</td>
                  <td>Juckreiz, leichte Urtikaria, Erythem</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Moderat</td>
                  <td>Deutliche Urtikaria, Bronchospasmus, Larynxödem</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Schwer (0,01 - 0,04%)</td>
                  <td>Hypotonie, Schock</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Lebensbedrohlich</td>
                  <td>Atemstillstand, Herzstillstand</td>
                </tr>
              </tbody>
            </table>

            <h4 className={styles.marginTop}>Management bei anamnestischer Reaktion</h4>
            <ul>
              <li>Alternatives Bildgebungsverfahren oder <strong>Substanzwechsel</strong> (Senkt Risiko von 31% auf 12%).</li>
              <li><strong>Prämedikation (H1-/H2-Blocker & Cortison):</strong> Im Alltag häufig, aber in aktuellen Leitlinien (seit ESUR 10.0) oft nicht mehr zwingend empfohlen (früher in v9.0 Standard).</li>
            </ul>
          </div>

          <div className={styles.merkeBox}>
            <strong>Hinweis:</strong> Die oft genannte „Jodallergie“ existiert nicht. Jod ist als kleines Molekül nicht allergen – die Reaktion richtet sich gegen andere Molekülbestandteile.
          </div>
        </section>

        {/* --- PC-AKI --- */}
        <section id="pc-aki" className={styles.section}>
          <h2>Kontrastmittelassoziierte akute Nierenschädigung (PC-AKI)</h2>
          
          <div className={styles.card}>
            <h3>Terminologie & Definition</h3>
            <p>Alter Begriff: <strong>CIN</strong> (Kontrastmittelinduzierte Nephropathie).<br/>
            Neuer Begriff: <strong>PC-AKI</strong> (Post-Contrast Acute Kidney Injury) – Umbenennung, da Kausalzusammenhang oft fraglich (Nierenversagen tritt nach nativer CT gleich häufig auf).</p>
            <p><strong>Definition (ESUR):</strong> Anstieg des Serumkreatinins innerhalb von 48–72 Stunden um &ge;0,3 mg/dl oder auf das &ge;1,5-fache.</p>
          </div>

          <div className={styles.card}>
            <h3>Risikofaktoren</h3>
            <ul>
              <li><strong>Patientenbezogen:</strong>
                <ul>
                  <li>eGFR &lt; 45 ml/min/1,73 m&sup2; bei renalem First-Pass-Effekt (intraarteriell proximal der Nierenarterien).</li>
                  <li>eGFR &lt; 30 ml/min/1,73 m&sup2; bei renalem Second-Pass-Effekt (intravenös).</li>
                  <li>Bekanntes oder vermutetes akutes Nierenversagen.</li>
                </ul>
              </li>
              <li><strong>Untersuchungsbezogen:</strong> Intraarterielle KM-Gabe (First-Pass), große Mengen, hochosmolares KM, mehrfache Gaben (48–72h).</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Prophylaxe & Management</h3>
            <ul>
              <li><strong>Hydrierung:</strong> Bei eGFR &lt; 30 empfohlen. Z.B. i.v. 0,9% NaCl (100 ml/h für 4h vor und nach Gabe). Vorsicht bei Herzinsuffizienz (NYHA 3-4) / Lungenödem.</li>
              <li><strong>Medikamente:</strong> Keine nachgewiesene Prophylaxe (ACC widerlegt).</li>
              <li><strong>Metformin:</strong> Bei eGFR &gt; 30 normal weiter. Bei eGFR &lt; 30 oder akutem Nierenversagen: Absetzen für 48h (obwohl Metformin bei &lt;30 ohnehin kontraindiziert ist).</li>
            </ul>
          </div>

          <div className={styles.merkeBox}>
            <strong>Dialyse-Patienten:</strong> Bei Jod-KM ist keine zeitliche Abstimmung der Dialyse nötig (Niere arbeitet ohnehin nicht mehr). Bei <strong>Gadolinium</strong> muss die Dialyse zeitnah erfolgen, um Ablagerungen (NSF) zu minimieren!
          </div>
        </section>

        {/* --- HYPERTHYREOSE --- */}
        <section id="hyperthyreose" className={styles.section}>
          <h2>Hyperthyreose und jodhaltiges KM</h2>
          <div className={styles.card}>
            <p className={styles.mutedText}>Risiko der Verstärkung einer Hyperthyreose oder thyreotoxischen Krise (besonders bei Basedow, Struma multinodosa). Extrem selten (100 Fälle / 5 Mio. Gaben), tritt frühestens nach einer Woche auf.</p>
            <ul>
              <li><strong>Latente Hyperthyreose:</strong> Natriumperchlorat (Irenat®) vor KM, dann 7-10 Tage weiter (blockiert Jodaufnahme).</li>
              <li><strong>Manifeste Hyperthyreose:</strong> Absolute Kontraindikation! Ausnahme: Lebensbedrohlich (Dissektion, Stroke). Dann Irenat + Thiamazol/Carbimazol.</li>
            </ul>
          </div>
          <div className={styles.merkeBox}>
            Bei <strong>Schilddrüsenkarzinomen</strong> (papillär/follikulär) ist die KM-Gabe strikt verboten, da die Jodsättigung eine spätere Radiojodtherapie verhindert!
          </div>
        </section>

        {/* --- GASTROINTESTINAL --- */}
        <section id="gastro" className={styles.section}>
          <h2>Gastrointestinale Diagnostik</h2>
          <div className={styles.card}>
            <h3>Bariumsulfat (Oral/Rektal)</h3>
            <p>Wird nicht resorbiert ("weißer Stuhl"). Doppelkontrast-Methode (Barium + Gas) wird heute sehr selten eingesetzt.</p>
            <h4>Kontraindikationen:</h4>
            <ul>
              <li><strong>V.a. Perforation / Anastomoseninsuffizienz:</strong> Austritt verursacht schwere Barium-Peritonitis.</li>
              <li><strong>Aspirationsgefahr:</strong> Löst schwere Fremdkörperreaktion / Lungenödem aus.</li>
              <li><strong>V.a. Ileus:</strong> Barium entzieht Wasser (hypoosmolar zu Blut) &rarr; Barium-Steine.</li>
            </ul>
            
            <h3 className={styles.marginTop}>Wasserlösliche KM (z.B. Gastrografin®)</h3>
            <p>Keine Peritonitis bei Perforation (wird vom Bauchfell resorbiert). Ist hyperosmolar &rarr; wirkt abführend (therapeutischer Effekt bei Ileus möglich).</p>
          </div>
        </section>

        {/* --- MRT --- */}
        <section id="mrt" className={styles.section}>
          <h2>MRT-Kontrastmittel (Gadolinium)</h2>
          
          <div className={styles.card}>
            <h3>Strukturformen</h3>
            <ul>
              <li><strong>Lineare Chelate:</strong> Offenkettig. Geringere Stabilität, höheres Ablagerungsrisiko. Rote-Hand-Brief (2018). Ausnahmen: Primovist® und Multihance® für Leber.</li>
              <li><strong>Makrozyklische Chelate:</strong> Ringförmiger "Käfig". Sehr hohe Stabilität, Standard in der heutigen Routine (z.B. Gadovist®, Dotarem®).</li>
            </ul>
            <p className={styles.mutedText}>Wirkmechanismus: T1-Effekt (Verkürzung/Signalanstieg), T2-Effekt (Verkürzung/Signalabfall - nur bei Hochdosis).</p>
          </div>

          <div className={styles.card}>
            <h3>Nebenwirkungen & Risiken</h3>
            <h4>Nephrogene Systemische Fibrose (NSF)</h4>
            <p>Ablagerung von freiem Gadolinium &rarr; Fibroblasten-Aktivierung &rarr; Kollagenablagerung. Trat primär bei schwerer Niereninsuffizienz (GFR &lt; 30) und linearen KM auf. Dank makrozyklischer KM heute <strong>extrem selten</strong>.</p>
            
            <h4>Gadolinium-Retention im Gehirn</h4>
            <p>Hyperintensitäten im Nucleus dentatus (Kleinhirn) und Globus pallidus (Linsenkern) im nativen T1 nach mehrfacher Gabe linearer KM. Klinische Relevanz bisher unbekannt.</p>
          </div>

          <div className={styles.card}>
            <h3>Leberspezifische KM</h3>
            <p>Aktiv von funktionstüchtigen Hepatozyten aufgenommen und biliär ausgeschieden. <strong>Primovist® ist das einzige hepatozytenspezifische Gd-KM!</strong></p>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Eigenschaft</th>
                  <th>Primovist® (Gadoxetsäure)</th>
                  <th>Multihance® (Gadobensäure)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hepatozyten-Aufnahme</td>
                  <td>~ 50%</td>
                  <td>~ 3-5%</td>
                </tr>
                <tr>
                  <td>Spätphase (Hepatobiliär)</td>
                  <td>nach ~ 20 min</td>
                  <td>nach ~ 40-120 min</td>
                </tr>
              </tbody>
            </table>
            
            <h4 className={styles.marginTop}>Indikationen</h4>
            <ul>
              <li>FNH vs. Adenom (FNH nimmt KM auf, Adenome meist nicht).</li>
              <li>HCC-Detektion in der Zirrhose (gut differenziert nimmt oft KM auf).</li>
              <li>Nachweis winziger Metastasen (&lt; 1 cm) &rarr; hypointens in der Spätphase.</li>
            </ul>
          </div>

          <div className={styles.merkeBox}>
            <strong>Begleitmedikation Buscopan®:</strong> Parasympatholytikum zur Artefaktreduktion (lähmt glatte Muskulatur). <br/>
            <em>Kontraindikationen:</em> Glaukom (Alternative: Glucagon), Prostatahyperplasie, Tachyarrhythmie, Mechanischer Ileus. <br/>
            <em>Hinweis:</em> Pupillenerweiterung &rarr; Fahrverbot für 1-2 Stunden!
          </div>
        </section>

        {/* --- SCHWANGERSCHAFT --- */}
        <section id="schwangerschaft" className={styles.section}>
          <h2>Schwangeren und Stillenden</h2>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Schwangerschaft</h3>
              <p className={styles.mutedText}>Strenge Indikationsstellung. Nur wenn KM-freie Alternative nicht reicht und nicht verschiebbar.</p>
              <ul>
                <li><strong>Jodhaltige KM:</strong> Plazentagängig. Fetale Schilddrüse nimmt Jod auf (ab 10.-12. SSW). Risiko einer transienten Hypothyreose (Wolff-Chaikoff-Effekt). <br/><em>Maßnahme:</em> TSH-Wert des Neugeborenen kontrollieren.</li>
                <li><strong>Gadolinium:</strong> Passiert Plazenta &rarr; Fruchtwasser &rarr; orale Resorption Fetus. Teratogenes Risiko unklar. Möglichst vermeiden (besonders 1. Trimester). Wenn nötig: Makrozyklisch.</li>
              </ul>
            </div>
            
            <div className={styles.card}>
              <h3>Stillzeit</h3>
              <p><strong>Eine Stillpause ist nicht nötig.</strong></p>
              <ul>
                <li><strong>Jod-KM:</strong> Geringe Ausscheidung in Muttermilch (~0,5%). Orale Bioverfügbarkeit beim Säugling sehr gering.</li>
                <li><strong>Gadolinium:</strong> Ausscheidung &lt;0,04%. Orale Resorption minimal.</li>
              </ul>
              <p className={styles.mutedText}>Wenn die Mutter sehr besorgt ist: 24h pausieren und Milch verwerfen (zur Beruhigung).</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}