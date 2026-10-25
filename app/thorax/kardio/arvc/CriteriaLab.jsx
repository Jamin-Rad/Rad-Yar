'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useState } from 'react'
import { Note, Tabs, TeachingTable } from './LessonVisuals'
import styles from './page.module.css'

const CRITERIA_TABS = [
  { id: 'tfc', label: 'TFC 2010' },
  { id: 'padua', label: 'Padua 2020' },
  { id: 'example', label: 'Ein Beispiel verstehen' },
]

function TfcExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <h3 className={styles.subheading}>Warum braucht man die TFC?</h3>
    <p className={styles.bodyText}>Die <strong>Task Force Criteria von 2010</strong> ordnen Hinweise aus verschiedenen Untersuchungen zur klassischen rechtsbetonten ARVC. Ein Major-Kriterium ist stärker, ein Minor-Kriterium schwächer gewichtet. Das ist diagnostisches Gewicht und nicht automatisch ein Maß für die Krankheitsschwere.</p>
    <Note title="Der MRT-Baustein: regional UND global">Eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion muss mit einem erhöhten RVEDVi oder einer verminderten RVEF zusammenkommen. Ein großer RV allein genügt nicht; eine isolierte Hypokinesie auch nicht.</Note>
    <div className={styles.thresholds}><TeachingTable caption="TFC 2010 · die MRT-Grenzwerte bei Erwachsenen" headers={['Messgröße', 'Major', 'Minor']} rows={[
      ['RVEDVi · Männer', '≥ 110 ml/m²', '≥ 100 bis < 110 ml/m²'],
      ['RVEDVi · Frauen', '≥ 100 ml/m²', '≥ 90 bis < 100 ml/m²'],
      ['RVEF · beide', '≤ 40 %', '> 40 bis ≤ 45 %'],
    ]}/></div>
    <p className={styles.caption}>Nur zusammen mit der geforderten regionalen Störung. RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche; EF = ausgeworfener Volumenanteil. Bei Kindern und Sportlern die Referenzen gesondert prüfen.</p>
    <p className={styles.bodyText}><strong>Nicht doppelt zählen:</strong> Erhöhtes RV-Volumen und reduzierte RVEF sind zwei Wege zum selben MRT-Kriterium dieser Kategorie. Ein bildgebendes Major-Kriterium allein ist noch keine gesicherte Gesamtdiagnose. Die übrigen Diagnosebereiche, etwa EKG, Rhythmus und Familie, müssen dazukommen.</p>
    <Note title="Die Grenze dieses Systems">LGE und spezifische LV-Kriterien sind in den TFC 2010 nicht enthalten. Deshalb kann eine linksdominante Erkrankung mit diesem System übersehen werden.</Note>
  </>, _arvcLang)
}

function PaduaExplanation() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <h3 className={styles.subheading}>Was ergänzt Padua?</h3>
    <p className={styles.bodyText}>Die <strong>Padua-Kriterien von 2020</strong> erweitern den Blick: Welche Kammer ist betroffen, wie funktioniert sie und wo liegt eine Narbe? Dafür werden LV-Kriterien und die Gewebeinformation aus dem LGE aufgenommen. Die Einordnung berücksichtigt weiterhin auch EKG, Rhythmusdiagnostik und Familie / Genetik.</p>
    <TeachingTable caption="Die wichtigsten Ergänzungen für das MRT" headers={['Baustein', 'Worauf achten?']} rows={[
      ['Rechte Kammer', 'Regionale Bewegungsstörung, globale Größe und Funktion beurteilen. Auch ein sicher nachgewiesenes transmural streifenförmiges RV-LGE kann ein strukturelles Kriterium sein.'],
      ['Linke Kammer', 'Pumpfunktion und regionale Bewegung prüfen; zusätzlich nach subepikardialem oder intramuralem Streifen-LGE suchen.'],
      ['LGE absichern', 'Ein passendes Narbenmuster in zwei orthogonalen Ebenen bestätigen. Isoliertes LGE an den septalen RV-Insertionspunkten zählt nicht als LV-LGE-Kriterium.'],
      ['Strukturelle Grundlage', 'Mindestens ein morphofunktionelles oder strukturelles Kriterium muss erfüllt sein. Für Volumen und Funktion geeignete Referenzwerte verwenden.'],
    ]}/>
    <Note title="RV, LV oder beide?">Belegte Veränderungen nur rechts ergeben ein rechtsbetontes Muster; Veränderungen beider Kammern ein biventrikuläres Muster. Bei rein linksdominantem Muster verlangt Padua zusätzlich eine passende pathogene oder wahrscheinlich pathogene ACM-Genvariante. LV-LGE allein reicht nicht.</Note>
    <p className={styles.bodyText}>Padua erweitert die TFC, ist aber ein eigenes Kriterienwerk. Die festen RV-Grenzwerte der TFC 2010 und die Padua-Kriterien nicht zu einer selbst erfundenen Punkteliste vermischen. Andere Narbenursachen, insbesondere Myokarditis, bleiben wichtig.</p>
  </>, _arvcLang)
}

function CriteriaExample() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <h3 className={styles.subheading}>Vom Cine zum TFC-MRT-Baustein</h3>
    {_arvcLang === 'fa' ? <p className={styles.bodyText}>Cine فصل تصاویر مربوط به <strong>مرد ۵۰ ساله با ARVC شناخته‌شده</strong> است که پس از ابلیشن RVOT بررسی شده است. گزارش اصلی، برآمدگی‌های آنوریسمی و دیسکینتیک RV را با RVEDVi برابر <strong>115 ml/m²</strong> و RVEF برابر <strong>41 %</strong> توصیف می‌کند.</p> : <p className={styles.bodyText}>Das Cine aus dem Bildkapitel gehört zu einem <strong>50-jährigen Mann mit bekannter ARVC</strong>, untersucht nach einer RVOT-Ablation. Die Originalbeschreibung nennt dyskinetische, aneurysmatische RV-Ausbuchtungen, einen RVEDVi von <strong>115 ml/m²</strong> und eine RVEF von <strong>41 %</strong>.</p>}
    <ol className={styles.essentialList}>
      <li><strong>Regional:</strong> Die beschriebene Dyskinesie erfüllt den geforderten regionalen Teil.</li>
      <li><strong>Global:</strong> 115 ml/m² liegt beim Mann über der Major-Grenze für das RVEDVi. Die RVEF von 41 % liegt dagegen im Minor-Bereich.</li>
      <li><strong>Zusammenführen:</strong> Das ergibt einen Major-MRT-Baustein aus dieser Kategorie. Volumen und EF werden nicht als zwei getrennte Kriterien addiert.</li>
    </ol>
    <Note title="Warum der Zusammenhang wichtig ist">Bei denselben Zahlen ohne die geforderte regionale Störung wäre der MRT-Baustein der TFC 2010 nicht erfüllt. Und selbst ein erfüllter MRT-Baustein ersetzt nicht die übrige diagnostische Einordnung.</Note>
    <p className={styles.caption}>Zahlen und Bewegungsbefund aus dem Originalfall von Tim Luijkx: <a href="https://radiopaedia.org/cases/39806" target="_blank" rel="noreferrer">Radiopaedia rID 39806</a>. Dies erklärt die Kriterien anhand einer bereits diagnostizierten Erkrankung.</p>
  </>, _arvcLang)
}

export default function CriteriaOverview() {
  const { lang: _arvcLang } = useLanguage()

  const [selected, setSelected] = useState(0)
  return localizeArvcTree(<>
    <p className={styles.lead}><strong>Kein einzelnes MRT-Zeichen beweist eine ACM.</strong> TFC und Padua sind Regelwerke, die Befunde aus Bildgebung, EKG, Rhythmusdiagnostik und Familiengeschichte / Genetik zu einer Diagnose zusammenführen.</p>
    <div className={styles.explorer}>
      <Tabs label="TFC und Padua erklären" items={CRITERIA_TABS} selected={selected} onChange={setSelected} idPrefix="criteria"/>
      <div className={styles.criteriaReading} id="criteria-panel" role="tabpanel" aria-labelledby={`criteria-tab-${selected}`}>{selected === 0 ? <TfcExplanation/> : selected === 1 ? <PaduaExplanation/> : <CriteriaExample/>}</div>
    </div>
  </>, _arvcLang)
}
