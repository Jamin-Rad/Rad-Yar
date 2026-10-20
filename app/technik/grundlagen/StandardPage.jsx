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
  ctPerfusion: {
    de: { title: 'Selbstcheck: Welcher Parameter beschreibt was?', question: 'Welche Zuordnung ist korrekt?', options: ['CBF = Blutfluss pro Gewebemasse und Zeit; CBV = Blutvolumen pro Gewebemasse; MTT = mittlere Transitzeit; TTP = Zeit bis zum Kurvenmaximum.', 'CBF = Blutvolumen pro Gewebemasse; CBV = Blutfluss pro Gewebemasse und Zeit; MTT = mittlere Transitzeit; TTP = Zeit bis zum Kurvenmaximum.', 'CBF = Blutfluss pro Gewebemasse und Zeit; CBV = Blutvolumen pro Gewebemasse; MTT = Zeit bis zum Kurvenmaximum; TTP = mittlere Transitzeit.'], answer: 0, feedback: ['Richtig. CBF ist Fluss pro Masse und Zeit, CBV Volumen pro Masse; MTT und TTP sind unterschiedliche Zeitparameter.', 'Hier sind CBF und CBV vertauscht: CBF beschreibt Fluss und CBV das Blutvolumen.', 'Hier sind MTT und TTP vertauscht: MTT ist die mittlere Transitzeit und TTP die Zeit bis zum Kurvenmaximum.'] },
    en: { title: 'Self-check: what does each parameter describe?', question: 'Which mapping is correct?', options: ['CBF = blood flow per tissue mass and time; CBV = blood volume per tissue mass; MTT = mean transit time; TTP = time to the curve peak.', 'CBF = blood volume per tissue mass; CBV = blood flow per tissue mass and time; MTT = mean transit time; TTP = time to the curve peak.', 'CBF = blood flow per tissue mass and time; CBV = blood volume per tissue mass; MTT = time to the curve peak; TTP = mean transit time.'], answer: 0, feedback: ['Correct. CBF is flow per mass and time, CBV is volume per mass, and MTT and TTP are distinct time parameters.', 'CBF and CBV are swapped here: CBF describes flow and CBV describes blood volume.', 'MTT and TTP are swapped here: MTT is mean transit time and TTP is time to the curve peak.'] },
    fa: { title: 'خودآزمایی: هر شاخص چه چیزی را توصیف می‌کند؟', question: 'کدام تطبیق درست است؟', options: ['CBF = جریان خون به‌ازای جرم بافت و زمان؛ CBV = حجم خون به‌ازای جرم بافت؛ MTT = میانگین زمان عبور؛ TTP = زمان رسیدن منحنی به قله.', 'CBF = حجم خون به‌ازای جرم بافت؛ CBV = جریان خون به‌ازای جرم بافت و زمان؛ MTT = میانگین زمان عبور؛ TTP = زمان رسیدن منحنی به قله.', 'CBF = جریان خون به‌ازای جرم بافت و زمان؛ CBV = حجم خون به‌ازای جرم بافت؛ MTT = زمان رسیدن منحنی به قله؛ TTP = میانگین زمان عبور.'], answer: 0, feedback: ['درست است. CBF جریان به‌ازای جرم و زمان، CBV حجم به‌ازای جرم و MTT و TTP دو شاخص زمانی متفاوت‌اند.', 'در این گزینه CBF و CBV جابه‌جا شده‌اند: CBF جریان و CBV حجم خون را توصیف می‌کند.', 'در این گزینه MTT و TTP جابه‌جا شده‌اند: MTT میانگین زمان عبور و TTP زمان رسیدن منحنی به قله است.'] },
  },
  ctQuality: {
    de: { title: 'Selbstcheck: Stufenartefakt oder Strahlaufhärtung?', question: 'In einer koronaren MPR wirken glatte Knochenränder treppenförmig. Welche Ursache passt am besten?', options: ['Grobe z-Abtastung der Quelldaten.', 'Strahlaufhärtung zwischen dichten Strukturen.', 'Ein Ring durch fehlerhafte Detektorkalibrierung.'], answer: 0, feedback: ['Richtig. Eine grobe z-Abtastung kann in multiplanaren Reformationen stufige Kanten erzeugen.', 'Strahlaufhärtung zeigt typischerweise dunkle Bänder oder Streifen an dichten Materialien.', 'Ein Kalibrierungs-/Detektorring erscheint konzentrisch, nicht als stufiger Rand in einer MPR.'] },
    en: { title: 'Self-check: stair-step or beam hardening?', question: 'Smooth bone edges look stepped on a coronal MPR. Which cause best fits?', options: ['Coarse z-sampling in the source data.', 'Beam hardening between dense structures.', 'A ring from faulty detector calibration.'], answer: 0, feedback: ['Correct. Coarse z-sampling can create stepped edges on multiplanar reformats.', 'Beam hardening typically appears as dark bands or streaks around dense materials.', 'A detector/calibration ring is concentric, not a stepped edge on an MPR.'] },
    fa: { title: 'خودآزمایی: آرتیفکت پله‌ای یا سخت‌شدن پرتو؟', question: 'لبه‌های صاف استخوان در MPR کرونال پله‌پله دیده می‌شوند. کدام علت مناسب‌تر است؟', options: ['نمونه‌برداری درشت محور z در دادهٔ منبع.', 'سخت‌شدن پرتو بین ساختارهای متراکم.', 'حلقهٔ ناشی از کالیبراسیون نادرست آشکارساز.'], answer: 0, feedback: ['درست است. نمونه‌برداری درشت محور z می‌تواند در بازسازی چندصفحه‌ای لبه‌های پله‌ای بسازد.', 'سخت‌شدن پرتو معمولاً به‌صورت نوار یا رگهٔ تیره کنار مواد متراکم دیده می‌شود.', 'حلقهٔ آشکارساز/کالیبراسیون هم‌مرکز است، نه لبهٔ پله‌ای در MPR.'] },
  },
  perfusion: {
    de: { title: 'Selbstcheck: T1- oder T2*-Antwort?', question: 'Während eines Gadolinium-Bolus wird die Perfusion dynamisch aufgenommen. Welche Signalantwort passt typischerweise?', options: ['T1-Signal steigt; T2*-Signal fällt vorübergehend.', 'T1- und T2*-Signal steigen immer gemeinsam.', 'Nur CBV wird gemessen; eine Signaländerung ist nicht erforderlich.'], answer: 0, feedback: ['Richtig. T1-Verkürzung kann das Signal steigern; die Suszeptibilitätswirkung bei T2* senkt es während der Boluspassage typischerweise.', 'Die typische Richtung ist unterschiedlich: T1-Signalanstieg gegenüber vorübergehendem T2*-Signalabfall.', 'Dynamische Signaländerungen sind die Grundlage; daraus werden je nach Methode verschiedene Parameter abgeleitet.'] },
    en: { title: 'Self-check: T1 or T2* response?', question: 'Perfusion is sampled dynamically during a gadolinium bolus. Which signal response is typical?', options: ['T1 signal rises; T2* signal transiently falls.', 'T1 and T2* signals always rise together.', 'Only CBV is measured; signal change is unnecessary.'], answer: 0, feedback: ['Correct. T1 shortening can raise signal; susceptibility in T2* typically lowers it during bolus passage.', 'The typical directions differ: T1 signal rises while T2* signal transiently falls.', 'Dynamic signal change is the basis; different metrics are derived depending on the method.'] },
    fa: { title: 'خودآزمایی: پاسخ T1 یا T2*؟', question: 'پرفیوژن هنگام عبور بولوس گادولینیوم به‌صورت پویا ثبت می‌شود. کدام پاسخ سیگنال معمول‌تر است؟', options: ['سیگنال T1 بالا می‌رود؛ سیگنال T2* موقتاً افت می‌کند.', 'سیگنال T1 و T2* همیشه با هم بالا می‌روند.', 'فقط CBV اندازه‌گیری می‌شود و تغییر سیگنال لازم نیست.'], answer: 0, feedback: ['درست است. کوتاه‌شدن T1 می‌تواند سیگنال را بالا ببرد؛ susceptibility در T2* معمولاً هنگام عبور بولوس آن را کاهش می‌دهد.', 'جهت معمول متفاوت است: سیگنال T1 بالا می‌رود و سیگنال T2* موقتاً افت می‌کند.', 'تغییر سیگنال پویا مبناست و شاخص‌های مختلف بسته به روش استخراج می‌شوند.'] },
  },
  liverProtocol: {
    de: { title: 'Selbstcheck: Welche Phase beantwortet welche Frage?', question: 'Bei einer Leber-MRT zur Charakterisierung einer fokalen Läsion: Welche Zuordnung ist am besten?', options: ['DWI-Helligkeit allein beweist Restriktion; die hepatobiliäre Phase ist bei jedem Kontrastmittel nach 20 Minuten verfügbar.', 'T2, T1 In-/Opposed-Phase und DWI/ADC ergänzen die Gewebecharakterisierung; dynamische Phasen zeigen das Enhancement, und eine hepatobiliäre Phase setzt ein entsprechendes Kontrastmittel voraus.', 'MRCP und die dynamische arterielle Phase sind austauschbar.'], answer: 1, feedback: ['DWI immer mit ADC korrelieren; HBP hängt von einem hepatobiliären Mittel ab und hat keine universelle fixe Zeit.', 'Richtig. Jede Sequenzfamilie beantwortet eine andere Frage; genaue Auswahl und Zeitplanung bleiben indikations- und protokollabhängig.', 'MRCP stellt vor allem flüssigkeitsgefüllte Gallenwege dar und ersetzt keine dynamische Läsionscharakterisierung.'] },
    en: { title: 'Self-check: which phase answers which question?', question: 'For liver MRI to characterise a focal lesion, which mapping is best?', options: ['DWI brightness alone proves restriction; every contrast agent provides a hepatobiliary phase at 20 minutes.', 'T2, T1 in-/opposed-phase and DWI/ADC complement tissue characterisation; dynamic phases show enhancement, and a hepatobiliary phase requires a suitable agent.', 'MRCP and the dynamic arterial phase are interchangeable.'], answer: 1, feedback: ['Always correlate DWI with ADC; HBP depends on a hepatobiliary agent and has no universal fixed timing.', 'Correct. Each sequence family answers a different question; exact selection and timing remain indication- and protocol-dependent.', 'MRCP mainly depicts fluid-containing bile ducts and does not replace dynamic lesion characterisation.'] },
    fa: { title: 'خودآزمایی: هر فاز به کدام پرسش پاسخ می‌دهد؟', question: 'برای مشخصه‌یابی یک ضایعهٔ کانونی در MRI کبد، کدام تطبیق درست‌تر است؟', options: ['روشنایی DWI به‌تنهایی محدودیت انتشار را ثابت می‌کند؛ هر مادهٔ حاجب در ۲۰ دقیقه فاز کبدی‌صفراوی می‌دهد.', 'T2، T1 هم‌فاز/ناهم‌فاز و DWI/ADC در مشخصه‌یابی بافت مکمل‌اند؛ فازهای پویا enhancement را نشان می‌دهند و فاز کبدی‌صفراوی به مادهٔ مناسب نیاز دارد.', 'MRCP و فاز شریانی پویا قابل‌جایگزینی‌اند.'], answer: 1, feedback: ['DWI را همیشه با ADC تطبیق دهید؛ HBP به مادهٔ حاجب کبدی‌صفراوی وابسته است و زمان ثابت همگانی ندارد.', 'درست است. هر گروه توالی به پرسش متفاوتی پاسخ می‌دهد؛ انتخاب و زمان‌بندی دقیق به اندیکاسیون و پروتکل وابسته است.', 'MRCP عمدتاً مجاری صفراویِ پُر از مایع را نشان می‌دهد و جایگزین مشخصه‌یابی پویای ضایعه نیست.'] },
  },
  ciss: {
    de: { title: 'Selbstcheck: Was zeigt das CISS-Kontrastmuster?', question: 'Eine dünnschichtige 3D-Steady-State-Sequenz zeigt hellen Liquor und darin dunklere Hirnnerven. Welche Aussage passt?', options: ['Das Muster unterstützt die anatomische Darstellung von Nerven im Liquorraum; es beweist allein keinen Tumor.', 'Die zwei phasenverschobenen Akquisitionen beseitigen Banding sicher und verhindern Bewegungsfehler.', 'CISS, DRIVE, bFFE und FIESTA sind identische Sequenzimplementierungen.'], answer: 0, feedback: ['Richtig. Das Kontrastmuster hilft, kleine Nerven am hellen Liquor abzugrenzen; eine Läsion wird damit nicht allein diagnostiziert.', 'Phasenzyklierung kann Banding reduzieren, garantiert aber keine Artefaktfreiheit; Bewegung zwischen Akquisitionen bleibt relevant.', 'Die Namen bezeichnen verwandte Anwendungen, aber keine nachweislich identischen Implementierungen.'] },
    en: { title: 'Self-check: what does the CISS contrast pattern show?', question: 'A thin-section 3D steady-state sequence shows bright CSF and darker cranial nerves within it. Which statement fits?', options: ['The pattern supports anatomical depiction of nerves in CSF; it does not prove a tumour by itself.', 'The two phase-shifted acquisitions reliably eliminate banding and prevent motion errors.', 'CISS, DRIVE, bFFE and FIESTA are identical sequence implementations.'], answer: 0, feedback: ['Correct. The contrast pattern helps separate small nerves from bright CSF; it does not diagnose a lesion by itself.', 'Phase cycling can reduce banding but does not guarantee artefact-free images; motion between acquisitions still matters.', 'These names refer to related applications, not demonstrably identical implementations.'] },
    fa: { title: 'خودآزمایی: الگوی کنتراست CISS چه چیزی را نشان می‌دهد؟', question: 'یک توالی سه‌بعدی steady-state با برش نازک، CSF روشن و اعصاب جمجمه‌ای تیره‌تر درون آن را نشان می‌دهد. کدام عبارت درست است؟', options: ['این الگو به نمایش آناتومیک اعصاب در فضای CSF کمک می‌کند؛ به‌تنهایی تومور را ثابت نمی‌کند.', 'دو برداشت با فاز متفاوت، banding را به‌طور قطعی حذف و از خطای حرکت جلوگیری می‌کنند.', 'CISS، DRIVE، bFFE و FIESTA پیاده‌سازی‌های یکسانی هستند.'], answer: 0, feedback: ['درست است. این الگوی کنتراست به تفکیک اعصاب کوچک از CSF روشن کمک می‌کند، اما به‌تنهایی ضایعه را تشخیص نمی‌دهد.', 'phase cycling می‌تواند banding را کاهش دهد، اما نبود آرتیفکت را تضمین نمی‌کند؛ حرکت میان برداشت‌ها همچنان مهم است.', 'این نام‌ها به کاربردهای مرتبط اشاره دارند، نه پیاده‌سازی‌های اثبات‌شدهٔ یکسان.'] },
  },
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
  dixon: {
    de: { title: 'Selbstcheck: Was zeigt die Dixon-Abbildung?', question: 'Die PDF zeigt In- und Out-of-Phase sowie Fat-only- und Water-only-Bilder; am Pfeil fällt das Signal einer linken Nebennierenläsion in Out-of-Phase ab. Welche Aussage ist am besten begründet?', options: ['Fat-only und Water-only sind rekonstruierte Dixon-Bildsätze; das Beispiel zeigt Signalabfall, beweist allein aber kein Adenom.', 'Jeder Signalabfall in Out-of-Phase beweist unabhängig vom Kontext ein Adenom.', 'Die markierte Läsion liegt in der Niere; ein Signalabfall macht weitere Einordnung unnötig.'], answer: 0, correct: 'Richtig. Die gezeigten Bildsätze illustrieren die Wasser-Fett-Trennung und den Signalabfall am markierten linken Nebennierenbefund. Der PDF-Text nennt ihn mit einem Adenom vereinbar; daraus folgt keine allgemeine Einzelbildregel.', retry: 'Trennen Sie die Bildbeobachtung von der Diagnose: der Pfeil markiert eine linke Nebennierenläsion, und ein Signalabfall allein ist nicht beweisend.' },
    en: { title: 'Self-check: what does the Dixon figure show?', question: 'The PDF shows in-phase, out-of-phase, fat-only and water-only images; signal drops at the arrow in a left adrenal lesion on the out-of-phase image. Which statement is best supported?', options: ['Fat-only and water-only are reconstructed Dixon image sets; this example shows signal drop but does not prove an adenoma by itself.', 'Any out-of-phase signal drop proves an adenoma regardless of context.', 'The marked lesion is in the kidney; signal drop makes further interpretation unnecessary.'], answer: 0, correct: 'Correct. The panels illustrate water-fat separation and signal drop in the marked left adrenal finding. The PDF says it is compatible with adenoma; that does not establish a general single-image rule.', retry: 'Separate the image observation from the diagnosis: the arrow marks a left adrenal lesion, and signal drop alone is not proof.' },
    fa: { title: 'خودآزمایی: تصویر Dixon چه چیزی را نشان می‌دهد؟', question: 'PDF تصاویر In-Phase، Out-of-Phase، چربی‌تنها و آب‌تنها را نشان می‌دهد؛ در ضایعهٔ آدرنال چپ، سیگنال در محل پیکان در تصویر Out-of-Phase افت می‌کند. کدام عبارت بهتر پشتیبانی می‌شود؟', options: ['چربی‌تنها و آب‌تنها مجموعه‌تصاویر بازسازی‌شدهٔ Dixon هستند؛ این مثال افت سیگنال را نشان می‌دهد اما به‌تنهایی آدنوم را ثابت نمی‌کند.', 'هر افت سیگنال در Out-of-Phase، بدون توجه به زمینه، آدنوم را ثابت می‌کند.', 'ضایعهٔ مشخص‌شده در کلیه است؛ افت سیگنال نیاز به تفسیر بیشتر را برطرف می‌کند.'], answer: 0, correct: 'درست است. تصاویر جداسازی آب و چربی و افت سیگنال در یافتهٔ مشخص‌شدهٔ آدرنال چپ را نشان می‌دهند. PDF آن را با آدنوم سازگار می‌داند؛ این یک قاعدهٔ عمومی بر پایهٔ یک تصویر نیست.', retry: 'مشاهدهٔ تصویری را از تشخیص جدا کنید: پیکان ضایعهٔ آدرنال چپ را نشان می‌دهد و افت سیگنال به‌تنهایی اثبات‌کننده نیست.' },
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
    {answer !== null && <p role="status" style={{ marginBottom: 0 }}>{copy.feedback?.[answer] || (answer === copy.answer ? copy.correct : copy.retry)}</p>}
  </div>
}

function LiverProtocolFigure({ lang }) {
  const copy = {
    de: { title: 'Von der Frage zur Sequenzgruppe', steps: [['Native Bilder', 'Signal, Fett und Gewebe'], ['Dynamische T1-Phasen', 'Enhancement im Zeitverlauf'], ['Hepatobiliäre Phase', 'Nur mit passendem Kontrastmittel'], ['MRCP', 'Zusatzfrage: Gallenwege']], note: 'Konzeptübersicht, kein starres Scannerprotokoll.' },
    en: { title: 'From clinical question to sequence group', steps: [['Baseline images', 'Signal, fat and tissue'], ['Dynamic T1 phases', 'Enhancement over time'], ['Hepatobiliary phase', 'Requires a suitable agent'], ['MRCP', 'Additional question: bile ducts']], note: 'Conceptual overview, not a fixed scanner protocol.' },
    fa: { title: 'از پرسش بالینی تا گروه توالی', steps: [['تصاویر پایه', 'سیگنال، چربی و بافت'], ['فازهای پویای T1', 'تغییر enhancement در زمان'], ['فاز کبدی‌صفراوی', 'نیازمند مادهٔ حاجب مناسب'], ['MRCP', 'پرسش تکمیلی: مجاری صفراوی']], note: 'نمای مفهومی است، نه پروتکل ثابت دستگاه.' },
  }[lang] || null
  const t = copy || { title: 'Von der Frage zur Sequenzgruppe', steps: [['Native Bilder', 'Signal, Fett und Gewebe'], ['Dynamische T1-Phasen', 'Enhancement im Zeitverlauf'], ['Hepatobiliäre Phase', 'Nur mit passendem Kontrastmittel'], ['MRCP', 'Zusatzfrage: Gallenwege']], note: 'Konzeptübersicht, kein starres Scannerprotokoll.' }
  return <figure aria-label={t.title} style={{ margin: '20px 0', padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
    <h3 style={{ marginTop: 0 }}>{t.title}</h3>
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
      {t.steps.map(([title, detail], index) => <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 190, minHeight: 86, padding: 12, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)' }}><strong>{title}</strong><div style={{ marginTop: 6, fontSize: '.92em' }}>{detail}</div></div>
        {index < t.steps.length - 1 ? <span aria-hidden="true" style={{ color: 'var(--accent-strong)', fontSize: 22 }}>{lang === 'fa' ? '←' : '→'}</span> : null}
      </div>)}
    </div>
    <figcaption style={{ marginTop: 10 }}>{t.note}</figcaption>
  </figure>
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
          {block.crossReference?<p><a href={block.crossReference.href}>{t(block.crossReference.label)}</a></p>:null}
          {block.visual?<div role="group" aria-label={t(block.visual.groupLabel || block.title)} style={{margin:'22px 0',padding:14,border:'1px solid var(--border)',borderRadius:16,background:'var(--surface-soft)'}}>
            {block.visual.src?<>
              {block.visual.yAxis||block.visual.xAxis?<div style={{direction:'ltr',display:'grid',gridTemplateColumns:'minmax(54px,auto) minmax(0,1fr)',alignItems:'center',gap:8}}>
                <span dir={lang==='fa'?'rtl':'ltr'} style={{textAlign:'center',fontWeight:600}}>{t(block.visual.yAxis)}</span>
                <img src={block.visual.src} alt={t(block.visual.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/>
                <span aria-hidden="true"/>
                <span dir={lang==='fa'?'rtl':'ltr'} style={{textAlign:'center',fontWeight:600}}>{t(block.visual.xAxis)}</span>
              </div>:<img src={block.visual.src} alt={t(block.visual.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/>}
            </>:null}
            {block.visual.legend?(Array.isArray(block.visual.legend)?<ul>{block.visual.legend.map((item,index)=><li key={index}>{t(item)}</li>)}</ul>:<p style={{marginTop:10,fontWeight:600}}>{t(block.visual.legend)}</p>):null}
            <p style={{marginTop:10}}>{t(block.visual.caption)}</p>
            {block.visual.images?<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',gap:14,marginTop:14}}>{block.visual.images.map((item,index)=><figure key={index} style={{margin:0,minWidth:0}}><img src={item.src} alt={t(item.alt)} loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:10}}/><figcaption style={{marginTop:6}}>{t(item.caption)}</figcaption></figure>)}</div>:null}
          </div>:null}
          {block.supplement?<aside className={styles.callout}><strong>{t(L('Zusatzbeziehung (nicht aus der PDF)','Supplemental relationship (not stated in the PDF)','رابطهٔ تکمیلی (در PDF نیامده است)'))}</strong><p>{t(block.supplement)}</p></aside>:null}
          {block.note?<aside className={styles.callout}><strong>{t(L('Einordnung und Grenzen','Interpretation and limitations','تفسیر و محدودیت‌ها'))}</strong><p>{t(block.note)}</p></aside>:null}
        </section>)}
        {section.id === 'mrt' ? <><MRIKnowledgeCheck lang={lang}/><RetrievalCheck kind="dixon" lang={lang}/></> : null}
        {section.id === 'mrt-spezial' ? <><RetrievalCheck kind="perfusion" lang={lang}/><RetrievalCheck kind="ciss" lang={lang}/><MraActions lang={lang}/></> : null}
        {section.id === 'leber-mrt-protokoll' ? <><LiverProtocolFigure lang={lang}/><RetrievalCheck kind="liverProtocol" lang={lang}/></> : null}
        {section.id === 'mrcp-protokoll' ? <RetrievalCheck kind="mrcp" lang={lang}/> : null}
        {section.id === 'mrt-sicherheit' ? <MRIArtifactKnowledgeCheck lang={lang}/> : null}
        {section.id === 'ct' ? <><CtReconstructionActions lang={lang}/><HrctActions lang={lang}/><RetrievalCheck kind="ctPerfusion" lang={lang}/><RetrievalCheck kind="ctQuality" lang={lang}/></> : null}
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

function CtReconstructionActions({ lang }) {
  const returnTo = lang === 'de' ? '/technik/grundlagen#ct' : `/technik/grundlagen?lang=${lang}#ct`
  const from = encodeURIComponent(returnTo)
  const labels = {
    de: { title: 'CT-Rekonstruktion üben', quiz: 'MC-Frage: Fensterung & Kernel', cards: 'Sechs Lernkarten' },
    en: { title: 'Practise CT reconstruction', quiz: 'MCQ: windowing & kernel', cards: 'Six flashcards' },
    fa: { title: 'تمرین بازسازی CT', quiz: 'سؤال: windowing و کرنل', cards: 'شش فلش‌کارت' },
  }[lang]
  return <nav aria-label={labels.title} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '18px 0', padding: 14, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--surface-soft)' }}>
    <strong style={{ alignSelf: 'center' }}>{labels.title}</strong>
    <a href={`/ueben/quiz?fach=technik&n=1&themen=ct-rekonstruktion-nachverarbeitung&from=${from}`}>{labels.quiz}</a>
    <a href={`/flashcards/ct-rekonstruktion-nachverarbeitung?from=${from}`}>{labels.cards}</a>
  </nav>
}

function HrctActions({ lang }) {
  const returnTo = lang === 'de' ? '/technik/grundlagen#ct' : `/technik/grundlagen?lang=${lang}#ct`
  const from = encodeURIComponent(returnTo)
  const labels = {
    de: { title: 'HRCT-Technik üben', quiz: 'MC-Frage zu Exspiration', cards: 'Fünf Lernkarten' },
    en: { title: 'Practise HRCT technique', quiz: 'Expiratory CT MCQ', cards: 'Five flashcards' },
    fa: { title: 'تمرین تکنیک HRCT', quiz: 'سؤال CT بازدمی', cards: 'پنج فلش‌کارت' },
  }[lang]
  return <nav aria-label={labels.title} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '18px 0', padding: 14, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--surface-soft)' }}>
    <strong style={{ alignSelf: 'center' }}>{labels.title}</strong>
    <a href={`/ueben/quiz?fach=technik&n=1&themen=hrct-technik&from=${from}`}>{labels.quiz}</a>
    <a href={`/flashcards/hrct-technik?from=${from}`}>{labels.cards}</a>
  </nav>
}

function MraActions({ lang }) {
  const returnTo = lang === 'de' ? '/technik/grundlagen#mrt-spezial' : `/technik/grundlagen?lang=${lang}#mrt-spezial`
  const from = encodeURIComponent(returnTo)
  const labels = {
    de: { title: 'MR-Angiographie üben', quiz: 'MC-Frage zu VENC', cards: 'Vier Lernkarten' },
    en: { title: 'Practise MR angiography', quiz: 'VENC MCQ', cards: 'Four flashcards' },
    fa: { title: 'تمرین آنژیوگرافی MR', quiz: 'سؤال چندگزینه‌ای VENC', cards: 'چهار فلش‌کارت' },
  }[lang] || { title: 'MR-Angiographie üben', quiz: 'MC-Frage zu VENC', cards: 'Vier Lernkarten' }
  return <nav aria-label={labels.title} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '18px 0', padding: 14, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--surface-soft)' }}>
    <strong style={{ alignSelf: 'center' }}>{labels.title}</strong>
    <a href={`/ueben/quiz?fach=technik&n=1&themen=mrt-gefaessdarstellung&from=${from}`}>{labels.quiz}</a>
    <a href={`/flashcards/mrt-gefaessdarstellung?from=${from}`}>{labels.cards}</a>
  </nav>
}
