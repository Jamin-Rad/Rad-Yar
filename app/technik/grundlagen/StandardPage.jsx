'use client'

import Footer from '@/components/Footer'
import InProgressBanner from '@/components/InProgressBanner'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { TECHNIK_GRUNDLAGEN as lesson } from '@/data/technikGrundlagenLesson'
import styles from '../kontrastmittel/page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (v, lang) => v?.[lang] || v?.de || ''
const labelSet = {
  contents:L('Lektionsinhalt','Lesson content','محتوای درس'),path:L('Lernpfad','Learning path','مسیر یادگیری'),progress:L('gelesen','read','خوانده‌شده'),continue:L('Lektion fortsetzen','Continue lesson','ادامهٔ درس'),
  completeLesson:L('Ganze Lektion als gelesen markieren','Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),lessonCompleted:L('Ganze Lektion gelesen','Full lesson marked as read','کل درس خوانده شد'),complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),completed:L('Als gelesen markiert','Marked as read','خوانده‌شده'),open:L('Abschnitt öffnen','Open section','بازکردن بخش'),close:L('Schließen','Close','بستن'),takeHome:L('Drei Regeln mitnehmen','Three rules to remember','سه قاعده برای یادآوری')
}

const checks = {
  atom: {
    de: { title: 'Selbstcheck: Anregung oder Ionisation?', question: 'Ein Elektron nimmt Energie auf und wechselt auf ein höheres Energieniveau, bleibt aber im Atom gebunden. Was ist geschehen?', options: ['Ionisation: Das Atom hat ein Elektron verloren.', 'Anregung: Das Elektron bleibt gebunden und besetzt vorübergehend ein höheres Niveau.', 'Indirekte Ionisation durch ein neutrales Photon.'], answer: 1, feedback: ['Ionisation bedeutet, dass ein Elektron das Atom verlässt; hier bleibt es gebunden.', 'Richtig. Bei der Anregung bleibt das Elektron im Atom und wechselt auf ein höheres Niveau.', 'Indirekte Ionisation beschreibt die Energieübertragung von Photonen auf geladene Sekundärteilchen; das ist hier nicht beschrieben.'] },
    en: { title: 'Self-check: excitation or ionization?', question: 'An electron absorbs energy and moves to a higher energy level but remains bound to the atom. What happened?', options: ['Ionization: the atom lost an electron.', 'Excitation: the electron remains bound and temporarily occupies a higher level.', 'Indirect ionization by a neutral photon.'], answer: 1, feedback: ['Ionization means an electron leaves the atom; here it remains bound.', 'Correct. In excitation, the electron stays in the atom and moves to a higher level.', 'Indirect ionization describes photons transferring energy to charged secondary particles; that is not what is described here.'] },
    fa: { title: 'خودآزمایی: برانگیختگی یا یونش؟', question: 'الکترونی انرژی می‌گیرد و به تراز بالاتری می‌رود، اما همچنان به اتم مقید می‌ماند. چه رخ داده است؟', options: ['یونش: اتم یک الکترون از دست داده است.', 'برانگیختگی: الکترون مقید می‌ماند و موقتاً تراز بالاتری را اشغال می‌کند.', 'یونش غیرمستقیم بر اثر فوتون خنثی.'], answer: 1, feedback: ['یونش یعنی الکترون از اتم خارج شود؛ در اینجا الکترون مقید مانده است.', 'درست است. در برانگیختگی، الکترون در اتم می‌ماند و به تراز بالاتر می‌رود.', 'یونش غیرمستقیم یعنی فوتون انرژی را به ذرهٔ باردار ثانویه منتقل کند؛ این توصیف با آن سازگار نیست.'] },
  },
  effects: {
    de: { title: 'Selbstcheck: Wahrscheinlichkeit und Schwere', question: 'Welche Aussage passt zu den Strahlenschutzmodellen?', options: ['Eine höhere Dosis macht jeden einzelnen Krebsfall schwerer.', 'Die Wahrscheinlichkeit stochastischer Effekte steigt mit der Dosis; sie sagt nicht die Schwere eines Einzelfalls voraus. Gewebereaktionen haben einen gewebespezifischen Schwellenbereich.', 'Stochastische Effekte und Gewebereaktionen haben dieselbe feste Schwelle.'], answer: 1, correct: 'Richtig. Auftretenswahrscheinlichkeit und Schwere sind getrennt zu betrachten; Schwellen für Gewebereaktionen sind nicht universell.', retry: 'Trennen Sie die Wahrscheinlichkeit eines Effekts von der Schwere eines einzelnen Falls.' },
    en: { title: 'Self-check: probability and severity', question: 'Which statement fits radiation-protection models?', options: ['A higher dose makes every individual cancer case more severe.', 'The probability of stochastic effects rises with dose; it does not predict severity in an individual case. Tissue reactions have a tissue-dependent threshold region.', 'Stochastic effects and tissue reactions share the same fixed threshold.'], answer: 1, correct: 'Correct. Occurrence probability and severity are distinct; tissue-reaction thresholds are not universal.', retry: 'Separate the probability that an effect occurs from the severity of one individual case.' },
    fa: { title: 'خودآزمایی: احتمال و شدت', question: 'کدام عبارت با مدل‌های حفاظت پرتویی سازگار است؟', options: ['دوز بیشتر، هر مورد سرطان را شدیدتر می‌کند.', 'احتمال اثرهای تصادفی با دوز افزایش می‌یابد، اما شدت یک مورد را پیش‌بینی نمی‌کند. واکنش بافتی ناحیهٔ آستانه‌ای وابسته به بافت دارد.', 'اثر تصادفی و واکنش بافتی آستانهٔ ثابت یکسانی دارند.'], answer: 1, correct: 'درست است. احتمال وقوع و شدت هر مورد جدا هستند؛ آستانهٔ واکنش بافتی همگانی نیست.', retry: 'احتمال وقوع اثر را از شدت یک مورد جدا کنید.' },
  },
  dose: {
    de: { title: 'Wiederabruf: CTDIvol und DLP', question: 'Welche Aussage ist richtig?', options: ['CTDIvol steigt mit der Scanlänge.', 'DLP berücksichtigt CTDIvol und Scanlänge.', 'Beide messen die individuelle Organdosis exakt.'], answer: 1, correct: 'Richtig. Das DLP kombiniert CTDIvol und Scanlänge; keine der Größen allein bestimmt die individuelle Organdosis.', retry: 'Eine Größe beschreibt einen Volumen-/Protokollindex; die andere berücksichtigt zusätzlich die Scanlänge.' },
    en: { title: 'Retrieval check: CTDIvol and DLP', question: 'Which statement is correct?', options: ['CTDIvol increases with scan length.', 'DLP combines CTDIvol with scan length.', 'Both precisely measure an individual organ dose.'], answer: 1, correct: 'Correct. DLP combines CTDIvol and scan length; neither alone determines an individual organ dose.', retry: 'One is a volume/protocol index; the other also accounts for scan length.' },
    fa: { title: 'بازیابی: CTDIvol و DLP', question: 'کدام عبارت درست است؟', options: ['CTDIvol با طول اسکن افزایش می‌یابد.', 'DLP، CTDIvol را همراه با طول اسکن در نظر می‌گیرد.', 'هر دو دوز اندامی فرد را دقیق می‌سنجند.'], answer: 1, correct: 'درست است. DLP حاصل CTDIvol و طول اسکن است؛ هیچ‌کدام به‌تنهایی دوز اندامی فرد را تعیین نمی‌کنند.', retry: 'یکی شاخص حجم/پروتکل است و دیگری طول اسکن را هم لحاظ می‌کند.' },
  },
  optimization: {
    de: { title: 'Selbstcheck: Pitch ändern', question: 'Sie erhöhen den Pitch, um die Dosis zu senken. Welche Schlussfolgerung ist am sichersten?', options: ['Die Dosis sinkt immer im gleichen Verhältnis.', 'Der Dosiseffekt hängt von Röhrenstromkompensation und Geräteumsetzung ab; Bildqualität und Ausgabeindizes müssen im Protokoll geprüft werden.', 'Die Bildqualität ändert sich nie.'], answer: 1, correct: 'Richtig. Der Pitch-Dosis-Zusammenhang ist nicht für alle Scanner und AEC-Verfahren gleich.', retry: 'Leiten Sie keine universelle lineare Beziehung ab.' },
    en: { title: 'Self-check: changing pitch', question: 'You increase pitch to reduce dose. Which conclusion is safest?', options: ['Dose always falls by the same proportion.', 'The dose effect depends on tube-current compensation and scanner implementation; check image quality and output indices against the protocol.', 'Image quality never changes.'], answer: 1, correct: 'Correct. The pitch-dose relationship is not identical across scanners and AEC methods.', retry: 'Do not assume one universal linear relationship.' },
    fa: { title: 'خودآزمایی: تغییر pitch', question: 'برای کاهش دوز pitch را افزایش می‌دهید. کدام نتیجه‌گیری ایمن‌تر است؟', options: ['دوز همیشه به همان نسبت کاهش می‌یابد.', 'اثر دوز به جبران جریان لوله و سازنده وابسته است؛ کیفیت تصویر و شاخص‌های خروجی را با پروتکل بررسی کنید.', 'کیفیت تصویر هیچ‌وقت تغییر نمی‌کند.'], answer: 1, correct: 'درست است. رابطهٔ pitch و دوز میان دستگاه‌ها و روش‌های AEC یکسان نیست؛ تغییر را با کیفیت تشخیصی و شاخص‌های خروجی بسنجید.', retry: 'از یک رابطهٔ خطی همگانی نتیجه نگیرید.' },
  },
  roles: {
    de: { title: 'Selbstcheck: Rollen in der Teleradiologie', question: 'Welche Besetzung entspricht dem aktuellen deutschen Rechtsrahmen?', options: ['Die fachkundige teleradiologische Ärztin oder der Arzt ist verfügbar; vor Ort ist ein Arzt mit den erforderlichen Kenntnissen; die ausführende Person erfüllt ebenfalls die Vorgaben.', 'Ein Arzt am Untersuchungsort genügt; eine verantwortliche teleradiologische Person ist nicht erforderlich.', 'Nur MTR dürfen technisch durchführen.'], answer: 0, correct: 'Richtig. § 14 Absatz 2 StrlSchG und § 145 StrlSchV unterscheiden diese Rollen.', retry: 'Denken Sie an teleradiologische Verantwortung, ärztliche Präsenz am Ort und berechtigte technische Durchführung.' },
    en: { title: 'Self-check: roles in teleradiology', question: 'Which arrangement matches the current German framework?', options: ['A qualified remote radiologist is available; a physician with required knowledge is on site; the operator also meets the applicable requirements.', 'An on-site physician is enough; no remote responsible physician is required.', 'Only MTRs may perform the technical examination.'], answer: 0, correct: 'Correct. StrlSchG § 14(2) and StrlSchV § 145 distinguish these roles.', retry: 'Consider remote responsibility, physician presence on site, and authorized technical performance.' },
    fa: { title: 'خودآزمایی: نقش‌ها در تلرادیولوژی', question: 'کدام چیدمان با چارچوب فعلی آلمان سازگار است؟', options: ['پزشک تلرادیولوژیستِ دارای صلاحیت در دسترس است؛ پزشک دارای دانش لازم در محل حضور دارد؛ فرد مجری نیز الزامات را دارد.', 'حضور پزشک محل کافی است و پزشک مسئول از راه دور لازم نیست.', 'فقط MTR مجاز به اجرای فنی است.'], answer: 0, correct: 'درست است. مادهٔ ۱۴ بند ۲ StrlSchG و مادهٔ ۱۴۵ StrlSchV این نقش‌ها را جدا می‌کنند.', retry: 'سه نقش را جدا کنید: مسئولیت از راه دور، حضور پزشک در محل و اجرای فنیِ مجاز.' },
  },
  mrcp: {
    de: { title: 'Selbstcheck: MIP und Quellbilder', question: 'Eine MIP zeigt die Gänge übersichtlich, aber ein kleiner Füllungsdefekt bleibt möglich. Was ist der nächste sinnvolle Prüfschritt?', options: ['Die MIP als abschließenden Befund akzeptieren.', 'Dünnschichtige Quellbilder und passende T2-Bilder zusätzlich prüfen.', 'Nur eine weitere MIP aus derselben Projektion berechnen.'], answer: 1, correct: 'Richtig. MIP kann kleine Defekte durch Überlagerung/Partialvolumen verbergen; die Quellbilder ergänzen die Übersicht.', retry: 'Die Projektion kann kleine Strukturen überlagern. Prüfen Sie zusätzlich die dünnschichtigen Quelldaten.' },
    en: { title: 'Self-check: MIP and source images', question: 'An MIP gives a clear overview of the ducts, but a small filling defect remains possible. What is the next useful check?', options: ['Accept the MIP as the final finding.', 'Also review thin-section source images and the relevant T2 images.', 'Generate only another MIP from the same projection.'], answer: 1, correct: 'Correct. Overlap/partial-volume effects can hide small defects on MIP; source images complement the overview.', retry: 'The projection can obscure small structures. Also inspect the thin-section source data.' },
    fa: { title: 'خودآزمایی: MIP و تصاویر منبع', question: 'MIP نمای کلی روشنی از مجراها می‌دهد، اما احتمال نقص کوچک پُرشدگی وجود دارد. گام بعدی مناسب چیست؟', options: ['MIP را یافتهٔ نهایی بدانید.', 'تصاویر منبع با برش نازک و تصاویر مناسب T2 را هم بررسی کنید.', 'فقط MIP دیگری از همان زاویه بسازید.'], answer: 1, correct: 'درست است. هم‌پوشانی یا اثر حجم نسبی ممکن است نقص‌های کوچک را در MIP پنهان کند؛ تصاویر منبع مکمل نمای کلی هستند.', retry: 'تصویر پروجکشن می‌تواند ساختارهای کوچک را بپوشاند؛ داده‌های منبع با برش نازک را هم ببینید.' },
  },
  mriBasics: {
    de: { title: 'Selbstcheck: Ortskodierung und SNR', question: 'Sie erhöhen die Matrix bei gleichem FOV und gleicher Abdeckung. Welche Aussage passt am besten?', options: ['Die Pixel werden größer und das SNR steigt ohne Zielkonflikt.', 'Die Pixel werden kleiner: räumliche Details nehmen zu, typischerweise sinkt das SNR.', 'Jeder k-Raum-Punkt wird direkt zu einem Bildpixel; die Matrix ändert daran nichts.'], answer: 1, correct: 'Richtig. Kleinere Voxel/Pixel erhöhen typischerweise die Detailauflösung, sammeln aber weniger Signal pro Voxel. Mehr Mittelungen können das SNR verbessern, kosten jedoch Messzeit.', retry: 'Verknüpfen Sie Matrix und Voxelgröße mit Signal pro Voxel. Eine SNR-Verbesserung über Mittelungen verlängert die Messzeit.' },
    en: { title: 'Self-check: spatial encoding and SNR', question: 'You increase the matrix while keeping FOV and coverage fixed. Which statement best fits?', options: ['Pixels become larger and SNR rises without a trade-off.', 'Pixels become smaller: spatial detail increases and SNR typically falls.', 'Each k-space point maps directly to one image pixel; matrix size does not matter.'], answer: 1, correct: 'Correct. Smaller voxels/pixels typically improve detail resolution but collect less signal per voxel. More averages can improve SNR, at the cost of scan time.', retry: 'Connect matrix size and voxel size to signal per voxel. Improving SNR with more averages costs scan time.' },
    fa: { title: 'خودآزمایی: کدگذاری مکانی و SNR', question: 'ماتریس را با FOV و پوشش ثابت افزایش می‌دهید. کدام عبارت درست‌تر است؟', options: ['پیکسل‌ها بزرگ‌تر می‌شوند و SNR بدون بده‌بستان افزایش می‌یابد.', 'پیکسل‌ها کوچک‌تر می‌شوند: جزئیات مکانی بیشتر و SNR معمولاً کمتر می‌شود.', 'هر نقطهٔ k-space مستقیماً یک پیکسل تصویر است؛ اندازهٔ ماتریس اهمیتی ندارد.'], answer: 1, correct: 'درست است. وکسل/پیکسل کوچک‌تر معمولاً وضوح جزئیات را بالا می‌برد، اما سیگنال هر وکسل کمتر می‌شود. میانگین‌گیری بیشتر می‌تواند SNR را بهتر کند ولی زمان اسکن را افزایش می‌دهد.', retry: 'اندازهٔ ماتریس و وکسل را به سیگنال هر وکسل ربط دهید. بهبود SNR با میانگین‌گیری بیشتر زمان تصویربرداری را زیاد می‌کند.' },
  },
  mriArtifacts: {
    de: { title: 'Selbstcheck: Aliasing oder RF-Störung?', question: 'Die Nasenspitze erscheint zusätzlich am Hinterkopf, entlang der Phasenkodierrichtung. Welche Erklärung und Maßnahme passen?', options: ['Zipper durch RF-Leckage; die Empfangsbandbreite erhöhen.', 'Aliasing: Anatomie außerhalb des FOV wurde in die Gegenseite gefaltet; Phasen-FOV erweitern oder Phase-oversampling einsetzen.', 'Gibbs-Ringing; die Phasenkodierrichtung ändern.'], answer: 1, correct: 'Richtig. Das Muster passt zu Faltung von Anatomie außerhalb des FOV entlang der Phasenkodierung. Phase-oversampling kann die Messzeit verlängern.', retry: 'Eine schmale feste Linie spricht eher für RF-Störung; eine auf der Gegenseite auftauchende Anatomie für Faltung außerhalb des FOV.' },
    en: { title: 'Self-check: aliasing or RF interference?', question: 'The nose appears again at the back of the head, along the phase-encoding direction. Which explanation and response fit?', options: ['Zipper from RF leakage; increase receiver bandwidth.', 'Aliasing: anatomy outside the FOV folded to the opposite side; enlarge phase FOV or use phase oversampling.', 'Gibbs ringing; change phase-encoding direction.'], answer: 1, correct: 'Correct. This fits anatomy outside the FOV folding along phase encoding. Phase oversampling can increase scan time.', retry: 'A narrow fixed line suggests RF interference; anatomy reappearing on the opposite side suggests wrap-around from outside the FOV.' },
    fa: { title: 'خودآزمایی: aliasing یا تداخل RF؟', question: 'نوک بینی در امتداد کدگذاری فاز، دوباره در پشت سر دیده می‌شود. کدام توضیح و اقدام مناسب است؟', options: ['zipper ناشی از نشت RF؛ پهنای باند گیرنده را افزایش دهید.', 'aliasing: آناتومی خارج FOV به سمت مقابل تاخورده است؛ FOV فاز را افزایش دهید یا phase oversampling به‌کار ببرید.', 'ringing گیبس؛ جهت کدگذاری فاز را عوض کنید.'], answer: 1, correct: 'درست است. این الگو با تاخوردگی آناتومی خارج از FOV در راستای کدگذاری فاز سازگار است. phase oversampling ممکن است زمان تصویربرداری را افزایش دهد.', retry: 'خط باریک و ثابت بیشتر به تداخل RF می‌خورد؛ ظاهرشدن آناتومی در سمت مقابل به تاخوردگی خارج FOV اشاره دارد.' },
  },
}

function RetrievalCheck({ kind, lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = checks[kind][lang] || checks[kind].de
  return <div aria-labelledby={`technik-check-${kind}`} style={{ marginTop: 18, padding: 16, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg-card)' }}>
    <h3 id={`technik-check-${kind}`} style={{ marginTop: 0 }}>{copy.title}</h3><p>{copy.question}</p>
    <div style={{ display: 'grid', gap: 8 }}>{copy.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface-soft)', color: 'var(--text)', textAlign: 'start', cursor: 'pointer' }}>{option}</button>)}</div>
    {answer !== null && <p role="status" style={{ marginBottom: 0 }}>{answer === copy.answer ? copy.correct : copy.retry}</p>}
  </div>
}

function AtomKnowledgeCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = checks.atom[lang] || checks.atom.de
  return <div aria-labelledby="technik-atom-check-title" style={{ marginTop: 18, padding: 16, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg-card)' }}>
    <h3 id="technik-atom-check-title" style={{ marginTop: 0 }}>{copy.title}</h3><p>{copy.question}</p>
    <div style={{ display: 'grid', gap: 8 }}>{copy.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface-soft)', color: 'var(--text)', textAlign: 'start', cursor: 'pointer' }}>{option}</button>)}</div>
    {answer !== null && <p role="status" style={{ marginBottom: 0 }}>{copy.feedback[answer]}</p>}
  </div>
}

function MRIKnowledgeCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = checks.mriBasics[lang] || checks.mriBasics.de
  return <div aria-labelledby="technik-mri-check-title" style={{ marginTop: 22, padding: 16, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg-card)' }}>
    <h3 id="technik-mri-check-title" style={{ marginTop: 0 }}>{copy.title}</h3><p>{copy.question}</p>
    <div style={{ display: 'grid', gap: 8 }}>{copy.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface-soft)', color: 'var(--text)', textAlign: 'start', cursor: 'pointer' }}>{option}</button>)}</div>
    {answer !== null && <p role="status" style={{ marginBottom: 0 }}>{answer === copy.answer ? copy.correct : copy.retry}</p>}
  </div>
}

function MRIArtifactKnowledgeCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const copy = checks.mriArtifacts[lang] || checks.mriArtifacts.de
  return <div aria-labelledby="technik-mri-artifact-check-title" style={{ marginTop: 22, padding: 16, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg-card)' }}>
    <h3 id="technik-mri-artifact-check-title" style={{ marginTop: 0 }}>{copy.title}</h3><p>{copy.question}</p>
    <div style={{ display: 'grid', gap: 8 }}>{copy.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)} style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 10, background: 'var(--surface-soft)', color: 'var(--text)', textAlign: 'start', cursor: 'pointer' }}>{option}</button>)}</div>
    {answer !== null && <p role="status">{answer === copy.answer ? copy.correct : copy.retry}</p>}
  </div>
}

function InterventionFigure({ lang }) {
  const copy = {
    de: { alt: 'Röntgenröhre, Patient als Streuquelle, Abschirmung und geschütztes Personal. Zeit, Abstand und Abschirmung ergänzen sich.', labels: ['Röntgenröhre', 'Patient / Streuquelle', 'Schutzschirm', 'Personal'], caption: 'Weniger Zeit, mehr Abstand und korrekt positionierte Abschirmung sind ergänzende Maßnahmen.' },
    en: { alt: 'X-ray tube, patient as scatter source, shield and protected staff. Time, distance and shielding complement each other.', labels: ['X-ray tube', 'Patient / scatter', 'Shield', 'Staff'], caption: 'Less time, greater distance and correctly positioned shielding are complementary measures.' },
    fa: { alt: 'لولهٔ پرتو ایکس، بیمار به‌عنوان منبع پراکندگی، حفاظ و کارکنان محافظت‌شده. زمان، فاصله و حفاظ مکمل یکدیگرند.', labels: ['لولهٔ پرتو ایکس', 'بیمار / منبع پراکندگی', 'حفاظ', 'کارکنان'], caption: 'زمان کمتر، فاصلهٔ بیشتر و حفاظِ درست‌قرارگرفته اقدام‌هایی مکمل‌اند.' },
  }[lang] || null
  const t = copy || { alt: 'Röntgenröhre, Patient als Streuquelle, Abschirmung und geschütztes Personal.', labels: ['Röntgenröhre', 'Patient / Streuquelle', 'Schutzschirm', 'Personal'], caption: 'Weniger Zeit, mehr Abstand und korrekt positionierte Abschirmung ergänzen sich.' }
  const xs = [85, 250, 379, 457]
  return <figure style={{ margin: '0 0 20px', padding: 12, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
    <svg viewBox="0 0 520 140" role="img" aria-label={t.alt} style={{ width: '100%', height: 'auto' }}>
      <circle cx="85" cy="56" r="22" fill="#55b8cc"/><ellipse cx="250" cy="58" rx="32" ry="44" fill="#c4d5e7" stroke="#416d8c" strokeWidth="3"/><rect x="373" y="24" width="12" height="68" fill="#18a27c"/><circle cx="457" cy="56" r="19" fill="#d6a56a"/><path d="M110 56h100m72 0h90m18 0h43" stroke="#667b8d" strokeWidth="3" strokeDasharray="7 6"/>
      {t.labels.map((label, i) => <text key={label} x={xs[i]} y="116" textAnchor="middle" fontSize="12" fill="var(--text)">{label}</text>)}
    </svg><figcaption>{t.caption}</figcaption>
  </figure>
}

export default function TechnikGrundlagenStandardPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const labels = Object.fromEntries(Object.entries(labelSet).map(([k,v]) => [k,t(v)]))
  const sections = [...lesson.sections.map(s => ({ id:s.id, label:t(s.title), icon:'map' })), { id:'take-home', label:labels.takeHome, icon:'summary', emphasis:true }]
  const references = [...new Map(lesson.sections.flatMap(s => [...(s.references || []), ...(s.teachingBlocks || []).flatMap(block => block.references || [])].map(r => {
    const officialLaw = /gesetze-im-internet\.de|recht\.bund\.de|bundesgesetzblatt/i.test(r.href)
    const tag = officialLaw ? L('Amtlicher Gesetzestext', 'Official legal text', 'متن رسمی قانون') : L('Fachquelle', 'Technical source', 'منبع تخصصی')
    return [r.href, { tag: t(tag), title:t(r.label), href:r.href, citation:t(r.citation || s.title), scope:t(r.scope || s.lead) }]
  })).filter(([href]) => href)).values()]
  const loc = path => lang === 'de' ? path : `${path}?lang=${lang}`
  return <>
    <StandardLessonShell lessonId="technik-grundlagen" lang={lang} title={t(lesson.title)} author="Dr. Zia" heroImageAlt={t(L('Übersicht der Grundlagen in Technik und Strahlenschutz','Overview of imaging-physics and radiation-protection foundations','نمای کلی مبانی فیزیک تصویربرداری و حفاظت پرتویی'))} syncHashNavigation
      breadcrumbs={[{label:'RadYar',href:loc('/')},{label:t(L('Technik & Physik','Technique & Physics','تکنیک و فیزیک')),href:loc('/lernen/technik')},{label:t(lesson.title)}]}
      sections={sections} labels={labels} renderIcon={()=><span aria-hidden="true">◈</span>} actions={{}}
      theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/technik/grundlagen/hero.svg',heroImageOpacity:.9,accent:'#60b6c5',accentStrong:'#245d68',accentSoft:'#e8f5f7',secondary:'#c69a54',secondaryStrong:'#75531f',heroBase:'#132b35'}} className={styles.page}
      sources={<LessonSources title={t(L('Quellen','Sources','منابع'))} items={references} note={t(lesson.source)}/>}
    >
      <InProgressBanner lang={lang}/>
      {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} title={t(section.title)} icon="map" bodyClassName={styles.body}>
        {section.id === 'intervention-3a' ? <InterventionFigure lang={lang}/> : null}
        <p className={styles.lead}>{t(section.lead)}</p>
        <p>{lang==='fa'?`صفحهٔ PDF: ${section.pages}`:lang==='en'?`PDF page: ${section.pages}`:`PDF-Seite: ${section.pages}`}</p>
        <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{t(L('Begriff','Concept','مفهوم'))}</th><th>{t(L('Lernpunkt','Learning point','نکتهٔ آموزشی'))}</th></tr></thead><tbody>{section.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{t(cell)}</td>)}</tr>)}</tbody></table></div>
        {section.visuals?.map((v,i)=><figure key={v.src} style={{margin:'22px 0',padding:14,border:'1px solid var(--border)',borderRadius:16,background:'var(--surface-soft)'}}><img src={v.src} alt={t(v.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/><figcaption style={{marginTop:10}}>{t(v.caption)}</figcaption></figure>)}
        {section.teachingBlocks?.map(block=><section key={block.id} aria-labelledby={`${block.id}-title`} style={{marginTop:30}}>
          <h3 id={`${block.id}-title`}>{t(block.title)}</h3><p>{t(block.lead)}</p>
          <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{t(L('Schritt / Begriff','Step / concept','گام / مفهوم'))}</th><th>{t(L('Was geschieht?','What happens?','چه رخ می‌دهد؟'))}</th></tr></thead><tbody>{block.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{t(cell)}</td>)}</tr>)}</tbody></table></div>
          {block.visual?<div role="group" aria-label={t(block.visual.caption)} style={{margin:'22px 0',padding:14,border:'1px solid var(--border)',borderRadius:16,background:'var(--surface-soft)'}}>{block.visual.src?<img src={block.visual.src} alt={t(block.visual.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/>:null}<p style={{marginTop:10}}>{t(block.visual.caption)}</p>{block.visual.images?<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:14,marginTop:14}}>{block.visual.images.map((item,index)=><figure key={index} style={{margin:0,minWidth:0}}><img src={item.src} alt={t(item.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/><figcaption style={{marginTop:6}}>{t(item.caption)}</figcaption></figure>)}</div>:null}{block.visual.legend?<ul>{block.visual.legend.map((item,index)=><li key={index}>{t(item)}</li>)}</ul>:null}</div>:null}
          {block.supplement?<aside className={styles.callout}><strong>{t(L('Zusatzbeziehung (nicht aus der PDF)','Supplemental relationship (not stated in the PDF)','رابطهٔ تکمیلی (در PDF نیامده است)'))}</strong><p>{t(block.supplement)}</p></aside>:null}
        </section>)}
        {section.id === 'mrt' ? <MRIKnowledgeCheck lang={lang}/> : null}
        {section.id === 'mrcp-protokoll' ? <RetrievalCheck kind="mrcp" lang={lang}/> : null}
        {section.id === 'mrt-sicherheit' ? <MRIArtifactKnowledgeCheck lang={lang}/> : null}
        {section.id === 'atom' ? <AtomKnowledgeCheck lang={lang}/> : null}
        {section.note?<aside className={styles.callout}><strong>{t(L('Quellenhinweis','Source limitation','محدودیت منبع'))}</strong><p>{t(section.note)}</p></aside>:null}
        {section.id === 'wirkung' ? <RetrievalCheck kind="effects" lang={lang}/> : null}
        {section.id === 'dosis' ? <RetrievalCheck kind="dose" lang={lang}/> : null}
        {section.id === 'optimierung' ? <RetrievalCheck kind="optimization" lang={lang}/> : null}
        {section.id === 'teleradiologie' ? <RetrievalCheck kind="roles" lang={lang}/> : null}
      </LessonSection>)}
      <LessonSection id="take-home" title={labels.takeHome} icon="summary"><ol><li>{t(L('Scanbereich an der Fragestellung ausrichten.','Match scan coverage to the clinical question.','محدودهٔ اسکن را با پرسش بالینی هماهنگ کنید.'))}</li><li>{t(L('Protokolländerungen geräte- und patientenspezifisch prüfen.','Review protocol changes for the scanner and patient.','تغییر پروتکل را برای دستگاه و بیمار مشخص بررسی کنید.'))}</li><li>{t(L('Zeit, Abstand und Abschirmung als ergänzende Prinzipien anwenden.','Use time, distance and shielding as complementary principles.','زمان، فاصله و حفاظ را به‌عنوان اصول مکمل به‌کار ببرید.'))}</li></ol></LessonSection>
    </StandardLessonShell>
    <Footer/>
  </>
}
