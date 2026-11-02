'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { combinePirads } from '@/lib/prostatePirads.mjs'
import styles from './tools.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value[lang] || value.de
const RULES = {
  'pz-dwi': L('In der PZ übernimmt der Gesamtscore den DWI-Score. DCE verändert DWI 1, 2, 4 und 5 nicht.', 'In the PZ, the overall category follows DWI. DCE does not change DWI 1, 2, 4 or 5.', 'در PZ امتیاز نهایی از DWI پیروی می‌کند. DCE امتیازهای ۱، ۲، ۴ یا ۵ را تغییر نمی‌دهد.'),
  'pz-upgrade': L('PZ + DWI 3 + positive DCE: Upgrade auf PI-RADS 4.', 'PZ + DWI 3 + positive DCE: upgrade to PI-RADS 4.', 'PZ با DWI 3 و DCE مثبت: ارتقا به PI-RADS 4.'),
  'pz-negative': L('PZ + DWI 3 + negative DCE: PI-RADS 3 bleibt bestehen.', 'PZ + DWI 3 + negative DCE: remains PI-RADS 3.', 'PZ با DWI 3 و DCE منفی: PI-RADS 3 باقی می‌ماند.'),
  'pz-no-dce': L('Ohne DCE bleibt der Herd in Kategorie 3. Eine DCE-bedingte Anhebung ist nicht beurteilbar; fehlend ist nicht negativ.', 'Without DCE, this lesion remains category 3. A DCE upgrade cannot be assessed; unavailable is not negative.', 'بدون DCE ضایعه در دسته ۳ می‌ماند. امکان ارتقای ناشی از DCE قابل ارزیابی نیست؛ انجام‌نشده با منفی فرق دارد.'),
  'tz-2-plus-1': L('TZ + T2 2 + DWI 4 oder 5: PI-RADS 3 („2+1“). DCE spielt keine Rolle.', 'TZ + T2 2 + DWI 4 or 5: PI-RADS 3 (2+1). DCE has no role.', 'TZ با T2 2 و DWI 4 یا 5: ‏PI-RADS 3 (قاعده 2+1). ‏DCE نقشی ندارد.'),
  'tz-3-plus-1': L('TZ + T2 3 + DWI 5: PI-RADS 4 („3+1“). DWI 4 würde nicht genügen.', 'TZ + T2 3 + DWI 5: PI-RADS 4 (3+1). DWI 4 would not suffice.', 'TZ با T2 3 و DWI 5: ‏PI-RADS 4 (قاعده 3+1). ‏DWI 4 کافی نیست.'),
  'tz-t2': L('In dieser TZ-Kombination bestimmt T2 die Kategorie. DCE verändert sie nicht.', 'For this TZ combination, T2 determines the category. DCE does not change it.', 'در این ترکیب TZ، ‏T2 دسته را تعیین می‌کند. DCE آن را تغییر نمی‌دهد.'),
}

const DWI_CRITERIA = [
  L('Unauffällige ADC- und hohe b-Bilder.', 'Normal ADC and high-b images.', 'ADC و تصاویر b بالا طبیعی‌اند.'),
  L('Lineare/keilförmige oder nicht fokale Signaländerung auf ADC und/oder hoher b-DWI.', 'Linear/wedge-shaped or nonfocal ADC and/or high-b abnormality.', 'تغییر خطی/گوه‌ای یا غیرفوکال در ADC و/یا DWI با b بالا.'),
  L('Fokal ADC-arm und/oder hoch-b-hyperintens; höchstens eines von beiden deutlich.', 'Focal low ADC and/or high high-b signal; at most one is markedly abnormal.', 'ADC فوکال پایین و/یا high-b DWI بالا؛ حداکثر یکی از این دو به‌وضوح غیرطبیعی است.'),
  L('Fokal deutlich ADC-arm UND deutlich hoch-b-hyperintens; <15 mm.', 'Focally markedly low ADC AND markedly high high-b signal; <15 mm.', 'ADC فوکال به‌وضوح پایین و high-b DWI به‌وضوح بالا؛ کمتر از ۱۵ میلی‌متر.'),
  L('Muster wie 4, aber ≥15 mm oder eindeutige extraprostatische/invasive Ausbreitung.', 'Pattern of 4, but ≥15 mm or definite extraprostatic/invasive extension.', 'الگوی ۴، اما حداقل ۱۵ میلی‌متر یا گسترش خارج پروستات/تهاجم واضح.'),
]
const T2_CRITERIA = [
  L('Normale TZ oder runder, vollständig gekapselter typischer Knoten.', 'Normal TZ or a round, fully encapsulated typical nodule.', 'TZ طبیعی یا ندول تیپیک گرد با کپسول کامل.'),
  L('Überwiegend gekapselter oder homogener umschriebener ungekapselter Knoten; auch homogen leicht T2-armes Gewebe zwischen Knoten.', 'Mostly encapsulated or homogeneous circumscribed unencapsulated nodule; also homogeneous mildly dark tissue between nodules.', 'ندول عمدتاً کپسول‌دار یا ندول همگن و مشخص بدون کپسول؛ همچنین بافت همگن کمی تیره بین ندول‌ها.'),
  L('Heterogen mit unklaren Rändern; Befund passt nicht zu 2, 4 oder 5.', 'Heterogeneous with obscured margins; does not meet 2, 4 or 5.', 'ناهمگن با حاشیه نامشخص؛ منطبق با معیارهای ۲، ۴ یا ۵ نیست.'),
  L('Linsenförmig oder nicht umschrieben, homogen mäßig T2-arm, <15 mm.', 'Lenticular or noncircumscribed, homogeneous moderately low T2 signal, <15 mm.', 'عدسی‌شکل یا با حاشیه نامشخص، همگن با سیگنال T2 نسبتاً پایین، کمتر از ۱۵ میلی‌متر.'),
  L('Muster wie 4, aber ≥15 mm oder eindeutige extraprostatische/invasive Ausbreitung.', 'Pattern of 4, but ≥15 mm or definite extraprostatic/invasive extension.', 'الگوی ۴، اما حداقل ۱۵ میلی‌متر یا گسترش خارج پروستات/تهاجم واضح.'),
]

export function PiradsTrainer({ lang }) {
  const [zone, setZone] = useState('PZ')
  const [t2, setT2] = useState(3)
  const [dwi, setDwi] = useState(3)
  const [dce, setDce] = useState('negative')
  const c = value => pick(value, lang)
  const result = combinePirads({ zone, t2, dwi, dce })
  return <div className={styles.trainer}>
    <p className={styles.eyebrow}>{c(L('Interaktiv · Regeltraining', 'Interactive · rule practice', 'تعاملی · تمرین قواعد'))}</p>
    <h3>{c(L('Sequenzscores kombinieren', 'Combine sequence scores', 'ترکیب امتیاز سکانس‌ها'))}</h3>
    <p>{c(L('Nur für die unbehandelte Prostata mit diagnostischer T2/DWI-Qualität. Die Sequenzscores werden vorab anhand der Bilder vergeben.', 'For untreated prostate with diagnostic T2/DWI only. Sequence scores must first be assigned from the images.', 'فقط برای پروستات درمان‌نشده با T2/DWI قابل تفسیر. امتیاز سکانس‌ها باید ابتدا از تصاویر تعیین شود.'))}</p>
    <div className={styles.controls}>
      <label htmlFor="pirads-zone">{c(L('Zone', 'Zone', 'زون'))}<select id="pirads-zone" value={zone} onChange={e => setZone(e.target.value)}><option value="PZ">PZ · {c(L('Periphere Zone', 'Peripheral zone', 'زون محیطی'))}</option><option value="TZ">TZ · {c(L('Transitionszone', 'Transition zone', 'زون ترانزیشن'))}</option></select></label>
      {zone === 'TZ' ? <label htmlFor="pirads-t2">{c(L('T2-Score', 'T2 score', 'امتیاز T2'))}<select id="pirads-t2" value={t2} onChange={e => setT2(Number(e.target.value))}>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}</select></label> : null}
      <label htmlFor="pirads-dwi">{c(L('DWI-Score', 'DWI score', 'امتیاز DWI'))}<select id="pirads-dwi" value={dwi} onChange={e => setDwi(Number(e.target.value))}>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}</select></label>
      {zone === 'PZ' ? <label htmlFor="pirads-dce">DCE<select id="pirads-dce" value={dce} onChange={e => setDce(e.target.value)}><option value="negative">{c(L('Negativ', 'Negative', 'منفی'))}</option><option value="positive">{c(L('Positiv', 'Positive', 'مثبت'))}</option><option value="unavailable">{c(L('Nicht vorhanden / bpMRT', 'Unavailable / bpMRI', 'انجام‌نشده / bpMRI'))}</option></select></label> : null}
    </div>
    <dl className={styles.criteria}>
      {zone === 'TZ' ? <><dt dir="ltr">T2 {t2}</dt><dd>{c(T2_CRITERIA[t2 - 1])}</dd></> : null}
      <dt dir="ltr">DWI {dwi}</dt><dd>{c(DWI_CRITERIA[dwi - 1])}</dd>
    </dl>
    <div className={styles.result} role="status" aria-live="polite" aria-atomic="true"><span dir="ltr">PI-RADS <b>{result.score}</b></span><p>{c(RULES[result.rule])}</p></div>
  </div>
}

export function ZoneDiagram({ lang }) {
  const c = value => pick(value, lang)
  return <figure className={styles.diagram}>
    <svg viewBox="0 0 440 330" role="img" aria-label={c(L('Schematischer axialer Mitteldrüsenschnitt: PZ posterolateral, TZ periurethral, anteriores Stroma ventral. Radiologische Ansicht von kaudal.', 'Schematic axial midgland: posterolateral PZ, periurethral TZ, anterior stroma. Radiological view from below.', 'برش شماتیک آگزیال میانه غده: PZ خلفی‌جانبی، TZ اطراف پیشابراه و استرومای قدامی. نمای رادیولوژیک از پایین.'))} direction="ltr">
      <ellipse cx="220" cy="165" rx="145" ry="110" fill="#d3eae8" stroke="#245d62" strokeWidth="2"/>
      <path d="M111 93Q220 31 329 93L299 117Q220 85 141 117Z" fill="#9d96af" stroke="#61566e" strokeWidth="2"/>
      <ellipse cx="181" cy="151" rx="51" ry="67" fill="#e8d9ef" stroke="#80558e" strokeWidth="2"/>
      <ellipse cx="259" cy="151" rx="51" ry="67" fill="#e8d9ef" stroke="#80558e" strokeWidth="2"/>
      <circle cx="220" cy="160" r="9" fill="#fff" stroke="#61566e" strokeWidth="2"/>
      <text x="220" y="29" textAnchor="middle">A</text><text x="220" y="309" textAnchor="middle">P</text><text x="39" y="169">R</text><text x="389" y="169">L</text>
      <text x="178" y="156" textAnchor="middle">TZ</text><text x="262" y="156" textAnchor="middle">TZ</text><text x="220" y="248" textAnchor="middle">PZ</text>
      <path d="M317 93h72M220 160v44h155" stroke="#61566e" fill="none"/><text x="380" y="84" textAnchor="middle" fontSize="13">AFMS</text><text x="361" y="222" textAnchor="middle" fontSize="13">Urethra</text>
    </svg>
    <figcaption><strong>{c(L('Axial · Mitte der Drüse', 'Axial · midgland', 'آگزیال · میانه غده'))}</strong><p>{c(L('Originalschema von RadYar, vereinfacht. R/L = Patientenseite, A/P = anterior/posterior. AFMS = anteriores fibromuskuläres Stroma. Die zentrale Zone an der Basis ist hier nicht dargestellt.', 'Original simplified RadYar diagram. R/L = patient side; A/P = anterior/posterior. AFMS = anterior fibromuscular stroma. The central zone at the base is not shown.', 'طرح ساده‌شده تألیفی رادیار. R/L سمت بیمار و A/P قدام/خلف است. AFMS استرومای فیبروموسکولار قدامی است. زون مرکزی در قاعده در این برش نمایش داده نشده است.'))}</p></figcaption>
  </figure>
}

const MRI_CASES = [
  { id: '4', figure: '4', label: 'PI-RADS 4', caption: L('76 Jahre, PSA 10: rechter posteromedialer PZ-Herd. Fokal hell auf DWI, dunkel auf ADC. Biopsie: ISUP 2.', 'Age 76, PSA 10: right posteromedial PZ lesion. Focally bright DWI, dark ADC. Biopsy: ISUP 2.', '۷۶ سال، PSA برابر ۱۰: ضایعه PZ خلفی‌میانی راست. DWI فوکال روشن و ADC تیره. بیوپسی: ISUP 2.') },
  { id: '5', figure: '3', label: 'PI-RADS 5', caption: L('64 Jahre, PSA 50: ausgedehnter rechter PZ-Herd mit kontralateraler Ausdehnung. Biopsie: ISUP 5. PI-RADS und ISUP sind unterschiedliche Systeme.', 'Age 64, PSA 50: extensive right PZ lesion crossing to the opposite side. Biopsy: ISUP 5. PI-RADS and ISUP are different systems.', '۶۴ سال، PSA برابر ۵۰: ضایعه وسیع PZ راست با امتداد به سمت مقابل. بیوپسی: ISUP 5. ‏PI-RADS و ISUP دو سیستم متفاوت‌اند.') },
]

export function MriExamples({ lang }) {
  const [selected, setSelected] = useState('4')
  const dialog = useRef(null)
  const active = MRI_CASES.find(item => item.id === selected)
  const c = value => pick(value, lang)
  const source = `https://link.springer.com/article/10.1186/s13244-024-01862-x/figures/${active.figure}`
  return <div className={styles.examples}>
    <h3>{c(L('Echte MRT-Beispiele', 'Real MRI examples', 'نمونه‌های واقعی MRI'))}</h3>
    <fieldset className={styles.imageChoices}><legend>{c(L('Publizierten Fall wählen', 'Choose a published case', 'انتخاب کیس منتشرشده'))}</legend>{MRI_CASES.map(item => <label key={item.id}><input type="radio" name="prostate-mri" value={item.id} checked={selected === item.id} onChange={() => setSelected(item.id)} />{item.label}</label>)}</fieldset>
    <figure>
      <button type="button" className={styles.imageButton} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog"><Image src={`/prostata/pirads-${active.id}-mri.png`} alt={`${active.label}: DWI b1500 / T2 / ADC / DCE`} width={950} height={1157} sizes="(max-width: 760px) 90vw, 800px" /><span>{c(L('Bild vergrößern', 'Enlarge image', 'بزرگ‌نمایی تصویر'))} ↗</span></button>
      <figcaption><p>{c(active.caption)}</p><a href={source} target="_blank" rel="noopener noreferrer" dir="ltr">Bischoff et al., Insights Imaging (2024), Fig. {active.figure}</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" dir="ltr">CC BY 4.0</a><p>{c(L('Unveränderte Originalabbildung. Einzelbilder ersetzen keinen vollständigen MRT-Datensatz.', 'Unmodified original figure. Panels do not replace a complete MRI examination.', 'تصویر اصلی بدون تغییر. تک‌تصاویر جای مجموعه کامل MRI را نمی‌گیرند.'))}</p></figcaption>
    </figure>
    <dialog ref={dialog} className={styles.imageDialog} aria-label={active.label} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus onClick={() => dialog.current?.close()}>{c(L('Schließen', 'Close', 'بستن'))} ×</button><Image src={`/prostata/pirads-${active.id}-mri.png`} alt={`${active.label}: DWI b1500 / T2 / ADC / DCE`} width={950} height={1157} sizes="95vw" /><p>{c(active.caption)}</p></dialog>
  </div>
}
