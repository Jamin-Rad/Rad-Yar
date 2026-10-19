const L = (de, en, fa) => ({ de, en, fa })

export const PULMONARY_INFARCT_LESSON = {
  id: 'akute-le',
  title: L('Akute LE: Pulmonalinfarkt', 'Acute PE: pulmonary infarction', 'آمبولی حاد ریه: انفارکت ریوی'),
  source: 'Thorax.pdf, PDF p. 12 (printed p. 11); independent evidence: Worsley et al., Radiology 1993; AHA/ACC multisociety acute PE guideline 2026; ESC/Fleischner CTA consensus 2025.',
  heroImage: '/educational/pulmonary-infarct.svg',
  alt: L('Schematische Lungenarterienverzweigung mit Verschluss eines peripheren Astes und pleurabasiertem keilförmigem Infarktareal; kein CT', 'Schematic pulmonary arterial branch with a peripheral occlusion and pleural-based wedge-shaped infarct; not a CT', 'شماتیک شاخهٔ شریان ریوی با انسداد یک شاخهٔ محیطی و ناحیهٔ گوه‌ای انفارکت در مجاورت پلور؛ CT نیست'),
  references: [
    { label: L('Worsley et al. · Thoraxröntgen bei akuter LE · PIOPED (1993)', 'Worsley et al. · Chest radiography in acute PE · PIOPED (1993)', 'Worsley و همکاران · رادیوگرافی قفسه سینه در آمبولی حاد ریه · PIOPED (۱۹۹۳)'), url: 'https://doi.org/10.1148/radiology.189.1.8372182' },
    { label: L('AHA/ACC · Multisociety Guideline Acute PE (2026)', 'AHA/ACC · Multisociety Guideline for Acute PE (2026)', 'راهنمای چندانجمنی AHA/ACC برای آمبولی حاد ریه (۲۰۲۶)'), url: 'https://www.jacc.org/doi/10.1016/j.jacc.2025.11.005' },
    { label: L('ESC / Fleischner · CTA bei vermuteter akuter LE (2025)', 'ESC / Fleischner · CTA for suspected acute PE (2025)', 'ESC / Fleischner · CTA در آمبولی حاد مشکوک (۲۰۲۵)'), url: 'https://doi.org/10.1148/radiol.243833' },
  ],
  chapters: [
    {
      id: 'pattern', icon: 'pattern',
      title: L('Wie entsteht der keilförmige Befund?', 'How does the wedge-shaped pattern arise?', 'الگوی گوه‌ای چگونه ایجاد می‌شود؟'),
      text: L('Eine Embolie kann einen zuführenden Pulmonalarterienast verschließen und eine periphere ischämische Gewebeschädigung bis zum Infarkt verursachen. Ein echter Lungeninfarkt bleibt wegen der doppelten pulmonalen und bronchialen Blutversorgung vergleichsweise selten; er ist nicht die unvermeidliche Folge jeder LE.', 'An embolus can occlude a supplying pulmonary arterial branch and cause peripheral ischaemic injury, sometimes progressing to infarction. True pulmonary infarction remains relatively uncommon because the lung has pulmonary and bronchial blood supplies; it is not an inevitable consequence of every PE.', 'آمبولی می‌تواند شاخه‌ای از شریان ریوی را مسدود کند و باعث آسیب ایسکمیک محیطی شود که گاهی تا انفارکت پیش می‌رود. به‌دلیل خون‌رسانی دوگانهٔ ریوی و برونشی، انفارکت واقعی ریه نسبتاً نادر است و پیامد حتمی هر آمبولی نیست.'),
      note: L('Die Aussage zur doppelten Blutversorgung stammt aus Thorax.pdf, PDF S. 12 (Druckseite 11).', 'The dual-supply statement is from Thorax.pdf, PDF p. 12 (printed p. 11).', 'نکتهٔ خون‌رسانی دوگانه از Thorax.pdf، صفحهٔ PDF ۱۲ (چاپی ۱۱) است.'),
    },
    {
      id: 'hampton', icon: 'pattern',
      title: L('Woran erkennt man den Hampton-Hump-Typ?', 'What defines the Hampton hump pattern?', 'الگوی Hampton hump چه ویژگی‌ای دارد؟'),
      text: L('Im Röntgenbild kann eine pleuranahe, keilförmige oder planokonvexe Verschattung auftreten. Die breite Basis liegt an der Pleura, die Spitze zeigt typischerweise zum Hilus. Das Muster kann einen peripheren Infarkt stützen, ist aber weder immer vorhanden noch allein beweisend.', 'On radiography, a peripheral wedge-shaped or shallow convex opacity may be seen. Its broad base lies against the pleura and its apex typically points toward the hilum. The pattern can support a peripheral infarct, but it is neither always present nor diagnostic by itself.', 'در رادیوگرافی ممکن است کدورتی گوه‌ای یا محدب و کم‌عمق در محیط ریه دیده شود. قاعدهٔ پهن آن به پلور می‌رسد و رأس معمولاً به‌سوی ناف ریه است. این الگو می‌تواند مؤید انفارکت محیطی باشد، اما نه همیشه وجود دارد و نه به‌تنهایی تشخیصی است.'),
      note: L('Thorax.pdf zeigt einen einzelnen axialen CT-Fall mit roten Markierungen für Embolus und Infarkt. Das ist kein Röntgenbild und belegt nicht die Röntgenmorphologie des Hampton hump.', 'Thorax.pdf shows one axial CT case with red labels for embolus and infarct. It is not a radiograph and does not demonstrate the chest-radiograph morphology of a Hampton hump.', 'Thorax.pdf یک کیس CT محوری با نشانه‌گذاری قرمز آمبولی و انفارکت را نشان می‌دهد. این رادیوگرافی نیست و مورفولوژی Hampton hump در رادیوگرافی را اثبات نمی‌کند.'),
    },
    {
      id: 'ct', icon: 'ct',
      title: L('Was zeigt die CTPA am Infarktrand?', 'What can CTPA show at an infarct margin?', 'CTPA در حاشیهٔ انفارکت چه چیزی نشان می‌دهد؟'),
      text: L('Auf der CT-Angiographie wird die Embolie als intraluminaler Füllungsdefekt gesucht. Im Lungenfenster kann ein Infarkt als periphere, teils keilförmige alveoläre Verdichtung auffallen; auf Kontrastmittelbildern kann das konsolidierte Infarktgewebe gegenüber atelektatischer Lunge heterogen oder vermindert kontrastieren. Ein umgekehrtes Halo-Muster ist möglich, aber kein notwendiger Befund.', 'On CT pulmonary angiography, look for an intraluminal filling defect. On lung windows, an infarct may appear as a peripheral, sometimes wedge-shaped air-space opacity; on contrast-enhanced images the consolidated infarct tissue may enhance heterogeneously or less than atelectatic lung. A reversed-halo pattern can occur but is not required.', 'در CT آنژیوگرافی ریه به‌دنبال نقص پرشدگی داخل شریان باشید. در پنجرهٔ ریه، انفارکت ممکن است به‌صورت کدورت محیطی فضای هوایی و گاهی گوه‌ای دیده شود؛ در تصاویر کنتراست‌دار، بافت متراکم‌شدهٔ انفارکت ممکن است نسبت به ریهٔ دچار آتلکتازی جذب ناهمگون یا کمتری داشته باشد. الگوی هالوی معکوس ممکن است دیده شود، اما یافتهٔ الزامی نیست.'),
      note: L('Befund und Embolie müssen im Kontext beurteilt werden. Eine periphere Verschattung allein bestätigt keine LE; CTA bleibt die diagnostische Bildgebung gemäß aktuellem Multisociety-Leitlinienrahmen.', 'Interpret the opacity and embolus in context. A peripheral opacity alone does not confirm PE; CTA is the diagnostic imaging test in the current multisociety guideline framework.', 'کدورت و آمبولی باید در زمینهٔ بالینی تفسیر شوند. کدورت محیطی به‌تنهایی آمبولی را تأیید نمی‌کند؛ در چارچوب راهنمای چندانجمنی فعلی، CTA تصویربرداری تشخیصی است.'),
    },
  ],
  check: {
    title: L('Selbstcheck: Was beweist ein Hampton hump?', 'Self-check: What does a Hampton hump prove?', 'خودآزمایی: Hampton hump چه چیزی را ثابت می‌کند؟'),
    prompt: L('Eine Röntgenaufnahme zeigt eine pleuranahe keilförmige Verschattung. Welche Schlussfolgerung ist am besten?', 'A chest radiograph shows a peripheral wedge-shaped opacity. Which conclusion is best?', 'رادیوگرافی قفسه سینه کدورتی گوه‌ای در محیط ریه نشان می‌دهد. بهترین نتیجه‌گیری چیست؟'),
    options: [L('Eine akute LE ist damit sicher bewiesen.', 'Acute PE is thereby proven.', 'آمبولی حاد ریه با این یافته قطعاً ثابت شده است.'), L('Der Befund kann zu einem Infarkt passen, ist aber unspezifisch; die LE muss gezielt abgeklärt werden.', 'The pattern may fit infarction but is nonspecific; PE requires targeted diagnostic evaluation.', 'یافته می‌تواند با انفارکت سازگار باشد، اما غیراختصاصی است؛ آمبولی باید با بررسی تشخیصی هدفمند ارزیابی شود.'), L('Ein normaler Gefäßverlauf schließt einen Infarkt aus.', 'Normal vascular appearance excludes infarction.', 'ظاهر طبیعی عروق، انفارکت را رد می‌کند.')],
    answerIndex: 1,
    correct: L('Richtig. Hampton hump ist ein seltenes Röntgenzeichen mit geringer Sensitivität; die Röntgenaufnahme diagnostiziert oder schließt eine LE nicht zuverlässig aus.', 'Correct. Hampton hump is an uncommon, low-sensitivity radiographic sign; chest radiography does not reliably diagnose or exclude PE.', 'درست است. Hampton hump نشانه‌ای رادیوگرافیک و کم‌حساسیت است؛ رادیوگرافی به‌طور قابل اتکا آمبولی را تشخیص نمی‌دهد یا رد نمی‌کند.'),
    retry: L('Das Muster ist ein Hinweis auf eine mögliche periphere Infarzierung. Prüfe, ob eine Verschattung allein die Embolie sicher nachweist.', 'The pattern is a clue to possible peripheral infarction. Consider whether an opacity alone proves an embolus.', 'این الگو می‌تواند نشانهٔ انفارکت محیطی باشد. بررسی کنید آیا کدورت به‌تنهایی وجود آمبولی را ثابت می‌کند.'),
  },
  takeHome: [
    L('Pulmonalinfarkt ist eine mögliche, aber vergleichsweise seltene Folge einer LE.', 'Pulmonary infarction is a possible but relatively uncommon consequence of PE.', 'انفارکت ریه پیامدی ممکن، اما نسبتاً نادر، از آمبولی ریه است.'),
    L('Hampton hump: periphere pleurabasierte Keilverschattung, Spitze hiluswärts.', 'Hampton hump: peripheral pleural-based wedge opacity with its apex toward the hilum.', 'Hampton hump: کدورت گوه‌ای محیطی با قاعدهٔ پلورال و رأس رو به ناف ریه.'),
    L('Das Röntgenzeichen allein bestätigt oder verwirft keine LE.', 'The radiographic sign alone neither confirms nor excludes PE.', 'این نشانهٔ رادیوگرافیک به‌تنهایی آمبولی را تأیید یا رد نمی‌کند.'),
    L('Auf CTA sowohl den arteriellen Füllungsdefekt als auch mögliche periphere Parenchymveränderungen einordnen.', 'On CTA, assess both the arterial filling defect and possible peripheral parenchymal changes.', 'در CTA هم نقص پرشدگی شریانی و هم تغییرات احتمالی پارانشیم محیطی را ارزیابی کنید.'),
  ],
  notice: L('Begrenzter Abschnitt zu Pulmonalinfarkt und Hampton-Hump-Zeichen innerhalb des Curriculum-Themas Akute LE; keine vollständige PE-Lektion und keine Behandlungsempfehlung. Wissenschaftliche Freigabe und Browser-QA stehen noch aus.', 'A focused pulmonary-infarction and Hampton-hump section within the Acute PE curriculum topic; not a complete PE lesson or treatment guide. Scientific approval and browser QA remain pending.', 'بخشی محدود دربارهٔ انفارکت ریه و نشانهٔ Hampton hump در موضوع درسی آمبولی حاد ریه؛ نه درس کامل آمبولی است و نه راهنمای درمان. تأیید علمی و QA مرورگر هنوز انجام نشده‌اند.'),
}
