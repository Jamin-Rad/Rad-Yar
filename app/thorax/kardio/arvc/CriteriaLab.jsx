'use client'

import { useState } from 'react'
import { classifyTfcCmr } from './criteriaLogic.mjs'
import { ChamberDiagram, Icon, Note, TeachingTable } from './LessonVisuals'
import styles from './page.module.css'

const DOMAINS = [
  ['I · Form & Funktion', 'Regionale Bewegung, Volumen, EF', 'Cine und quantitative Messung'],
  ['II · Gewebe', 'Histologischer Ersatz des Myokards; bei Padua zusätzlich LGE', 'TFC 2010: kein LGE-Kriterium'],
  ['III · Repolarisation', 'Veränderungen der T-Wellen', '12-Kanal-EKG'],
  ['IV · Depolarisation', 'Hinweise auf verzögerte Erregungsausbreitung', 'EKG / ergänzende elektrische Diagnostik'],
  ['V · Arrhythmien', 'Ventrikuläre Extrasystolen / Tachykardien und ihre Morphologie', 'Langzeit-EKG und Rhythmusanalyse'],
  ['VI · Familie & Genetik', 'Erkrankte Angehörige, passende Genvariante', 'Anamnese und genetische Einordnung'],
]

export function TfcLesson() {
  const [example, setExample] = useState({ sex: 'male', edvi: 115, ef: 47, regional: true })
  const status = classifyTfcCmr(example)
  const update = (key, value) => setExample(previous => ({ ...previous, [key]: value }))
  const label = { major: 'Ein Major-Kriterium aus Kategorie I', minor: 'Ein Minor-Kriterium aus Kategorie I', none: 'Kein MRT-Kriterium aus Kategorie I', incomplete: 'Messwerte ergänzen' }[status]
  return <>
    <p className={styles.lead}><strong>TFC</strong> bedeutet „Task Force Criteria“. Die Revision von <strong>2010</strong> soll Hinweise aus verschiedenen Untersuchungen zu einer verlässlichen Diagnose der klassischen ARVC zusammenführen. „Major“ ist stärker, „Minor“ schwächer gewichtet.</p>
    <h3 className={styles.subheading}>Der MRT-Baustein besteht aus zwei Teilen</h3>
    <div className={styles.formula}><div><span>A</span><strong>Regionale RV-Bewegungsstörung</strong><p>Akinesie, Dyskinesie oder dyssynchrone Kontraktion</p></div><b>UND</b><div><span>B</span><strong>Globale RV-Veränderung</strong><p>RVEDVi erhöht ODER RVEF reduziert</p></div></div>
    <TeachingTable caption="TFC 2010 · MRT-Grenzwerte bei Erwachsenen · nur zusammen mit A" headers={['Messgröße', 'Major', 'Minor']} rows={[
      ['RVEDVi · Männer', '≥ 110 ml/m²', '≥ 100 bis < 110 ml/m²'],
      ['RVEDVi · Frauen', '≥ 100 ml/m²', '≥ 90 bis < 100 ml/m²'],
      ['RVEF · beide', '≤ 40 %', '> 40 bis ≤ 45 %'],
    ]}/>
    <p className={styles.caption}>RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche. EF = Ejektionsfraktion, der ausgeworfene Anteil des enddiastolischen Volumens.</p>
    <div className={styles.lab}>
      <header><span>Geführtes Zahlenbeispiel</span><h3>Warum derselbe große RV einmal zählt und einmal nicht</h3><p>Fiktive Erwachsenendaten ändern und die Logik des MRT-Bausteins nachvollziehen.</p></header>
      <div className={styles.presetButtons}><button type="button" onClick={() => setExample({sex:'male',edvi:115,ef:47,regional:true})}>Mann · Dyskinesie · 115</button><button type="button" onClick={() => setExample({sex:'male',edvi:115,ef:47,regional:false})}>Gleiche Werte · ohne regionale Störung</button><button type="button" onClick={() => setExample({sex:'female',edvi:95,ef:46,regional:true})}>Frau · Akinesie · 95</button></div>
      <div className={styles.labGrid}><div className={styles.controls}>
        <label>Referenzgruppe<select value={example.sex} onChange={e => update('sex', e.target.value)}><option value="male">Mann</option><option value="female">Frau</option></select></label>
        <label>RVEDVi <small>ml/m²</small><input type="number" min="1" step="0.1" value={example.edvi} onChange={e => update('edvi', e.target.value)}/></label>
        <label>RVEF <small>%</small><input type="number" min="0" max="100" step="0.1" value={example.ef} onChange={e => update('ef', e.target.value)}/></label>
        <label className={styles.checkLabel}><input type="checkbox" checked={example.regional} onChange={e => update('regional', e.target.checked)}/><span>Sichere regionale Akinesie, Dyskinesie oder dyssynchrone Kontraktion</span></label>
      </div><div className={`${styles.criterionResult} ${status === 'major' ? styles.major : ''}`} aria-live="polite"><Icon name={status === 'none' ? 'scan' : 'check'}/><h4>{label}</h4><p>{status === 'incomplete' ? 'Für dieses Beispiel gültige Werte für Volumen und EF eingeben.' : !example.regional ? `Teil A fehlt. Auch bei einem RVEDVi von ${example.edvi} ml/m² und einer RVEF von ${example.ef} % wird ohne die geforderte regionale Störung kein MRT-Kriterium der TFC 2010 erfüllt.` : status === 'none' ? 'Die regionale Störung ist vorhanden, aber kein globaler Grenzwert aus Teil B wird erreicht.' : `Teil A ist vorhanden. Mindestens ein ${status === 'major' ? 'Major' : 'Minor'}-Grenzwert aus Teil B ist erreicht. Innerhalb der Kategorie wird einmal gezählt.`}</p><small>Nur das MRT-Kriterium erklärt. Keine vollständige Diagnose und kein klinischer Risikorechner.</small></div></div>
    </div>
    <Note title="Nicht doppelt zählen">Erhöhtes Volumen und reduzierte EF sind zwei Wege zum selben morphofunktionellen Kriterium. Sie ergeben nicht zwei Major-Kriterien. Eine isolierte Hypokinesie genügt als Teil A nicht.</Note>
    <h3 className={styles.subheading}>Warum das MRT die Diagnose nicht allein stellt</h3>
    <TeachingTable caption="Sechs Diagnosebereiche – ein gemeinsames Gesamtbild" headers={['Kategorie', 'Welche Information?', 'Woher?']} rows={DOMAINS}/>
    <div className={styles.diagnosisLevels}><div><strong>Gesichert</strong><span>2 Major</span><span>oder 1 Major + 2 Minor</span><span>oder 4 Minor</span></div><div><strong>Borderline</strong><span>1 Major + 1 Minor</span><span>oder 3 Minor</span></div><div><strong>Möglich</strong><span>1 Major</span><span>oder 2 Minor</span></div></div>
    <p className={styles.caption}>Kombinationen aus unterschiedlichen Kategorien. Innerhalb einer Kategorie nicht mehrfach zählen.</p>
    <Note caution title="Grenze der TFC 2010">Das System fokussiert die rechtsbetonte Form. Es enthält weder ein LGE-Kriterium noch spezifische LV-Kriterien und kann deshalb linksdominante Erkrankungen übersehen.</Note>
  </>
}

export function PaduaLesson() {
  const [rv, setRv] = useState(true)
  const [lv, setLv] = useState(true)
  const [gene, setGene] = useState(false)
  const phenotype = rv && lv ? 'both' : lv ? 'lv' : 'rv'
  return <>
    <p className={styles.lead}>Die <strong>Padua-Kriterien von 2020</strong> erweitern die Frage: nicht nur „Wie sieht der RV aus?“, sondern <strong>„Welche Kammer ist betroffen und wo liegt die Narbe?“</strong> Dafür ergänzen sie LV-Kriterien und LGE. Die sechs Diagnosebereiche bleiben erhalten.</p>
    <div className={styles.paduaFlow}><div><span>01</span><strong>Strukturelle Grundlage?</strong><p>Mindestens ein morphofunktionelles oder strukturelles Kriterium erforderlich.</p></div><Icon name="arrow"/><div><span>02</span><strong>Welche Kammer?</strong><p>RV und LV getrennt beurteilen; Funktion und Gewebe zusammenführen.</p></div><Icon name="arrow"/><div><span>03</span><strong>Gesamtsystem anwenden</strong><p>EKG, Arrhythmien, Familie / Genetik ergänzen und Imitatoren abklären.</p></div></div>
    <TeachingTable caption="Padua 2020 · die wichtigsten MRT-Bausteine" headers={['Bereich', 'RV', 'LV']} rows={[
      ['Form & Funktion · Major', 'Regionale Akinesie / Dyskinesie / Ausbuchtung PLUS globale Dilatation oder systolische Dysfunktion', 'Kein entsprechendes morphofunktionelles Major-Kriterium'],
      ['Form & Funktion · Minor', 'Isolierte regionale Akinesie / Dyskinesie oder Aneurysma der freien RV-Wand', 'Globale systolische Dysfunktion mit / ohne Dilatation; regionale Hypo- / Akinesie'],
      ['LGE · Major', 'Transmurales Streifen-LGE in ≥ 1 Region (Einflussbahn, RVOT, Apex), in 2 orthogonalen Ebenen', 'Subepikardiales / intramurales Streifen-LGE in ≥ 1 Segment der freien Wand / des Septums, in 2 orthogonalen Ebenen'],
      ['Referenzen / Ausschluss', 'Passende Normwerte für Alter, Geschlecht und Körpergröße; dünne RV-Wand beachten', 'Isoliertes septales Insertionspunkt-LGE zählt nicht; andere Narbenursachen abklären'],
    ]}/>
    <div className={styles.lab}><header><span>Den Phänotyp nachvollziehen</span><h3>RV, LV oder beide?</h3><p>Vereinfachtes Denkschema nach bereits fachgerecht geprüften Kammerkriterien. Die Schalter stellen keine Diagnose.</p></header><div className={styles.paduaExplorer}><div className={styles.controls}>
      <label className={styles.checkLabel}><input type="checkbox" checked={rv} onChange={e => setRv(e.target.checked)}/><span>RV-Beteiligung nach Kriterien belegt</span></label>
      <label className={styles.checkLabel}><input type="checkbox" checked={lv} onChange={e => setLv(e.target.checked)}/><span>LV-Beteiligung mit passendem LGE belegt</span></label>
      <label className={styles.checkLabel}><input type="checkbox" checked={gene} onChange={e => setGene(e.target.checked)}/><span>Passende pathogene / wahrscheinlich pathogene ACM-Genvariante</span></label>
      <div className={styles.flowResult} aria-live="polite"><h4>{rv && lv ? 'Biventrikuläres Muster' : rv ? 'Rechtsbetontes Muster' : lv && gene ? 'Linksdominantes Muster mit passender Genetik' : lv ? 'LV-Narbe: Ursache weiter klären' : 'Keine Kammerbeteiligung belegt'}</h4><p>{rv && lv ? 'Beide Kammern zeigen relevante Zeichen. EKG, Rhythmus, Familie und Genetik vervollständigen die diagnostische Einordnung.' : rv ? 'Der RV steht im Vordergrund. Die vollständige Major-/Minor-Kombination und Differenzialdiagnosen bestimmen die Diagnose.' : lv && gene ? 'Die für eine rein linksdominante ALVC wichtige genetische Voraussetzung ist vorhanden. Das Gesamtbild einschließlich Differenzialdiagnosen bleibt entscheidend.' : lv ? 'Ohne RV-Beteiligung verlangt Padua für ALVC zusätzlich eine passende krankheitsverursachende Genvariante. LV-LGE allein reicht nicht.' : 'Nach Padua fehlt damit die notwendige morphofunktionelle / strukturelle Grundlage. Ein unauffälliges MRT schließt eine genetische Trägerschaft nicht aus.'}</p></div>
    </div>{rv || lv ? <ChamberDiagram phenotype={phenotype}/> : <div className={styles.emptyDiagram}><Icon name="scan"/><span>Belegte Kammerkriterien auswählen</span></div>}</div></div>
    <TeachingTable caption="TFC 2010 und Padua 2020 nicht vermischen" headers={['Frage', 'TFC 2010', 'Padua 2020']} rows={[
      ['Fokus', 'Klassische ARVC / RV', 'RV, LV und biventrikuläre Formen'],
      ['CMR-Gewebeinformation', 'Kein LGE-Kriterium', 'LGE als strukturelles Kriterium'],
      ['Volumen / Funktion', 'Feste RV-Grenzwerte bei Erwachsenen', 'Geeignete bildgebungsspezifische Nomogramme'],
      ['Unverzichtbar', 'Kriterien aus unterschiedlichen Kategorien', 'Zusätzlich mindestens ein morphofunktionelles oder strukturelles Kriterium'],
    ]}/>
    <Note caution title="LGE allein ist keine ALVC-Diagnose">Gerade ein linksdominantes Muster überschneidet sich mit Myokarditis, Sarkoidose und anderen Kardiomyopathien. Die Genetik ist hier ein entscheidender Teil der Padua-Einordnung.</Note>
    <p className={styles.caption}>Historische Einordnung: Padua 2020 ist ein definiertes Kriterienwerk. Die European Task Force hat danach weitere Kriterien vorgeschlagen (publiziert 2024). Hier werden 2010 und 2020 bewusst getrennt erklärt.</p>
  </>
}
