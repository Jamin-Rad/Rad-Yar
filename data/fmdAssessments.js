const L = (de, en, fa) => ({ de, en, fa })

const questions = [
  {
    id: 'multifocal-pattern',
    question: L('Welcher Gefäßbefund entspricht dem multifokalen FMD-Muster?', 'Which vascular finding matches multifocal FMD?', 'کدام یافتهٔ عروقی با الگوی چندکانونی FMD مطابقت دارد؟'),
    options: [
      L('Abwechselnde Stenosen und Dilatationen („Perlschnurmuster“)', 'Alternating stenoses and dilatations (“string-of-beads” pattern)', 'تنگی‌ها و گشادشدگی‌های متناوب («الگوی مهره‌ای»)'),
      L('Eine ostiale exzentrische Plaque mit Verkalkung', 'An eccentric calcified ostial plaque', 'پلاک اکسنتریک کلسیفیه در دهانهٔ شریان'),
      L('Eine isolierte Dissektion ohne fokale oder multifokale Läsion', 'An isolated dissection without a focal or multifocal lesion', 'دیسکسیون منفرد بدون ضایعهٔ کانونی یا چندکانونی'),
      L('Gleichmäßige diffuse Dilatation ohne Stenosen', 'Uniform diffuse dilatation without stenoses', 'اتساع منتشر یکنواخت بدون تنگی'),
    ],
    correct: 0,
    explanation: L('Multifokale FMD zeigt wechselnde Stenosen und Dilatationen; das Muster betrifft häufig mittlere oder distale Nierenarterienabschnitte. Ostiale verkalkte Plaques sprechen eher für Atherosklerose.', 'Multifocal FMD has alternating stenoses and dilatations, often in the middle or distal renal artery. Ostial calcified plaque is more suggestive of atherosclerosis.', 'در FMD چندکانونی، تنگی و گشادشدگی متناوب دیده می‌شود که اغلب بخش‌های میانی یا دیستال شریان کلیوی را درگیر می‌کند. پلاک کلسیفیهٔ دهانه‌ای بیشتر به نفع آترواسکلروز است.'),
  },
  {
    id: 'focal-fmd',
    question: L('Eine fokale tubuläre Nierenarterienstenose zeigt kein Perlschnurmuster. Welche Aussage trifft zu?', 'A focal tubular renal artery stenosis has no string-of-beads pattern. Which statement is correct?', 'تنگی فوکال لوله‌ای شریان کلیوی الگوی مهره‌ای ندارد. کدام عبارت درست است؟'),
    options: [
      L('Fokale FMD ist möglich; das Fehlen des Perlschnurmusters schließt sie nicht aus.', 'Focal FMD is possible; absence of the string-of-beads pattern does not exclude it.', 'FMD فوکال ممکن است؛ نبود الگوی مهره‌ای آن را رد نمی‌کند.'),
      L('FMD ist ausgeschlossen, weil jede Läsion multifokal sein muss.', 'FMD is excluded because every lesion must be multifocal.', 'FMD رد می‌شود، چون همهٔ ضایعات باید چندکانونی باشند.'),
      L('Eine Dissektion allein beweist FMD.', 'Dissection alone proves FMD.', 'دیسکسیون به‌تنهایی FMD را ثابت می‌کند.'),
      L('Nur die ostiale Lokalisation ist für FMD typisch.', 'Only an ostial location is typical of FMD.', 'فقط محل دهانه‌ای برای FMD تیپیک است.'),
    ],
    correct: 0,
    explanation: L('FMD kann fokal oder multifokal sein. Aneurysma, Dissektion oder Tortuosität allein genügen nach Konsensus nicht für die Diagnose; es muss eine fokale oder multifokale FMD-Läsion vorliegen.', 'FMD may be focal or multifocal. Under consensus, aneurysm, dissection or tortuosity alone is insufficient; a focal or multifocal FMD lesion must be present.', 'FMD می‌تواند فوکال یا چندکانونی باشد. بر اساس اجماع، آنوریسم، دیسکسیون یا پیچ‌خوردگی به‌تنهایی کافی نیست؛ باید ضایعهٔ فوکال یا چندکانونی FMD وجود داشته باشد.'),
  },
  {
    id: 'imaging-sequence',
    question: L('Welche Bildgebungsabfolge entspricht dem internationalen Konsens bei vermuteter renaler FMD?', 'Which imaging sequence matches international consensus for suspected renal FMD?', 'کدام توالی تصویربرداری با اجماع بین‌المللی برای FMD کلیوی مشکوک مطابقت دارد؟'),
    options: [
      L('CTA initial; kontrastverstärkte MRA bei CTA-Kontraindikation; DSA selektiv', 'CTA initially; contrast-enhanced MRA if CTA is contraindicated; selective DSA', 'ابتدا CTA؛ در صورت منع CTA، ‏MRA با کنتراست؛ و DSA به‌صورت انتخابی'),
      L('DSA immer zuerst, unabhängig davon, ob das Ergebnis die Behandlung beeinflusst', 'DSA first in every case, regardless of whether the result affects care', 'در همهٔ موارد ابتدا DSA، مستقل از تأثیر نتیجه بر مراقبت'),
      L('Ultraschallmorphologie allein bestimmt den Druckgradienten zuverlässig', 'Ultrasound morphology alone reliably determines the pressure gradient', 'مورفولوژی سونوگرافی به‌تنهایی گرادیان فشار را با اطمینان تعیین می‌کند'),
      L('CTA ist bei jeder Patientin und jedem Patienten ausgeschlossen', 'CTA is contraindicated in every patient', 'CTA برای همهٔ بیماران ممنوع است'),
    ],
    correct: 0,
    explanation: L('Der Konsensus nennt CTA als initiale Methode der Wahl und kontrastverstärkte MRA als Alternative bei CTA-Kontraindikation. DSA ist invasiv und bleibt selektiven Situationen vorbehalten. Morphologie allein quantifiziert die hämodynamische Bedeutung nicht zuverlässig.', 'Consensus identifies CTA as the initial test of choice and contrast-enhanced MRA as an alternative when CTA is contraindicated. DSA is invasive and reserved for selected situations. Morphology alone does not reliably quantify haemodynamic significance.', 'اجماع، CTA را روش اولیهٔ انتخابی و MRA با کنتراست را در صورت منع CTA جایگزین می‌داند. DSA تهاجمی است و برای موقعیت‌های انتخابی می‌ماند. مورفولوژی به‌تنهایی اهمیت همودینامیک را با اطمینان کمی‌سازی نمی‌کند.'),
  },
]

const FMD_SOURCE='https://journals.sagepub.com/doi/10.1177/1358863X18821816'
const revisions={
 'focal-fmd':{options:[
 L('Fokale FMD bleibt möglich; die Läsion im Gefäßkontext von anderen Stenoseursachen abgrenzen.','Focal FMD remains possible; distinguish it from other stenosis causes in vascular context.','FMD فوکال همچنان ممکن است؛ با توجه به زمینهٔ عروقی آن را از علل دیگر تنگی جدا کنید.'),
 L('Fehlendes Beading spricht für eine reine Tortuosität als ausreichende FMD-Diagnose.','Absent beading favours isolated tortuosity as sufficient for an FMD diagnosis.','نبود الگوی مهره‌ای به نفع پیچ‌خوردگی منفرد به‌عنوان معیار کافی تشخیص FMD است.'),
 L('Die tubuläre Form bestätigt eine atherosklerotische Plaque auch ohne weitere Plaquezeichen.','The tubular shape confirms atherosclerotic plaque even without other plaque features.','شکل لوله‌ای حتی بدون نشانه‌های دیگر پلاک، پلاک آترواسکلروتیک را تأیید می‌کند.'),
 L('Das fehlende Beading erlaubt eine Dissektion als gesicherte Ursache der Stenose.','Absent beading establishes dissection as the cause of the stenosis.','نبود الگوی مهره‌ای، دیسکسیون را علت قطعی تنگی مشخص می‌کند.')],
 wrong:[null,L('Tortuosität allein genügt nicht; eine fokale oder multifokale Läsion ist erforderlich.','Tortuosity alone is insufficient; a focal or multifocal lesion is required.','پیچ‌خوردگی به‌تنهایی کافی نیست؛ ضایعهٔ فوکال یا چندکانونی لازم است.'),L('Die Form allein beweist keine Plaque; Lokalisation und weitere Gefäßzeichen mitbeurteilen.','Shape alone does not prove plaque; assess location and additional vascular features.','شکل به‌تنهایی پلاک را ثابت نمی‌کند؛ محل و دیگر نشانه‌های عروقی را بررسی کنید.'),L('Fehlendes Beading ist kein direkter Nachweis einer Dissektion.','Absent beading does not directly demonstrate dissection.','نبود الگوی مهره‌ای شاهد مستقیم دیسکسیون نیست.')]},
 'imaging-sequence':{options:[
 L('CTA initial, kontrastverstärkte MRA bei CTA-Kontraindikation; DSA, wenn ihr Ergebnis die Versorgung beeinflussen kann.','Initial CTA, contrast-enhanced MRA when CTA is contraindicated; DSA if its result may affect care.','ابتدا CTA و در صورت منع آن MRA با کنتراست؛ DSA اگر نتیجه بتواند بر مراقبت اثر بگذارد.'),
 L('Native MRA als Standard-Ersttest, anschließend CTA nur bei positivem Befund.','Unenhanced MRA as the standard initial test, followed by CTA only if positive.','MRA بدون تزریق به‌عنوان بررسی استاندارد اولیه و سپس CTA فقط در صورت نتیجهٔ مثبت.'),
 L('Duplex als Ersttest auch ohne FMD-Erfahrung des Zentrums, CTA erst nach Intervention.','Duplex first even without centre-specific FMD expertise, with CTA only after intervention.','ابتدا داپلر حتی بدون تجربهٔ اختصاصی مرکز در FMD و CTA فقط پس از مداخله.'),
 L('DSA initial bei klinischem Verdacht, CTA/MRA nur zur Nachkontrolle.','Initial DSA for clinical suspicion, with CTA/MRA reserved for follow-up.','در شک بالینی ابتدا DSA و CTA/MRA فقط برای پیگیری.')],
 wrong:[null,L('Der Konsens bevorzugt CTA; als Alternative nennt er kontrastverstärkte MRA, nicht diese allgemeine native Abfolge.','Consensus favours CTA and identifies contrast-enhanced MRA as the alternative, not this general unenhanced sequence.','اجماع CTA را ترجیح می‌دهد و MRA با تزریق را جایگزین می‌داند، نه این ترتیب عمومی بدون تزریق.'),L('Duplex als erste FMD-Diagnostik ist spezialisierten Zentren mit großer Erfahrung vorbehalten.','First-line duplex for FMD is reserved for specialised centres with extensive experience.','داپلر خط اول برای FMD به مراکز تخصصی با تجربهٔ گسترده محدود است.'),L('Die invasive DSA wird nicht als allgemeiner Ersttest empfohlen; ein erwarteter Einfluss auf die Versorgung ist entscheidend.','Invasive DSA is not the general first test; an expected impact on care is important.','DSA تهاجمی، بررسی اولیهٔ همگانی نیست؛ انتظار اثر بر مراقبت اهمیت دارد.')]}
}
const morphologyWrong=[null,L('Ostiale verkalkte Plaques passen eher zu Atherosklerose als zum multifokalen Beading.','Calcified ostial plaques favour atherosclerosis rather than multifocal beading.','پلاک کلسیفیهٔ دهانه‌ای بیشتر با آترواسکلروز سازگار است تا الگوی مهره‌ای چندکانونی.'),L('Dissektion allein reicht nicht für die FMD-Diagnose.','Dissection alone is insufficient for FMD diagnosis.','دیسکسیون به‌تنهایی برای تشخیص FMD کافی نیست.'),L('Multifokales Beading enthält Stenosen und Dilatationen; reine Dilatation erfüllt dieses Muster nicht.','Multifocal beading includes stenoses and dilatations; pure dilation does not match that pattern.','الگوی مهره‌ای چندکانونی شامل تنگی و اتساع است؛ اتساع خالص با آن سازگار نیست.')]
export const FMD_QUESTIONS=Object.fromEntries(['de','en','fa'].map(lang=>[lang,questions.map(q=>{const r=revisions[q.id];const feedback=r?.wrong||morphologyWrong;return{id:`fmd-${q.id}-${lang}`,question:q.question[lang],options:(r?.options||q.options).map((v,i)=>({id:'ABCD'[i],text:v[lang]})),correct:'ABCD'[q.correct],explanation:q.explanation[lang],wrongExplanations:Object.fromEntries(feedback.flatMap((v,i)=>v?[['ABCD'[i],v[lang]]]:[])),source:FMD_SOURCE,tags:['fibromuskulaere-dysplasie'],fach:'abdomen'}})]))

export const FMD_FLASHCARDS = [
  { id: 'fmd-multifocal-pattern', topicId: 'fibromuskulaere-dysplasie', category: L('Morphologie', 'Morphology', 'مورفولوژی'), front: L('Was kennzeichnet das multifokale FMD-Muster?', 'What characterizes multifocal FMD?', 'الگوی چندکانونی FMD با چه چیزی مشخص می‌شود؟'), answer: L('Wechselnde Stenosen und Dilatationen („Perlschnurmuster“), häufig in mittleren oder distalen Nierenarterienabschnitten.', 'Alternating stenoses and dilatations (“string-of-beads” pattern), often in the middle or distal renal artery.', 'تنگی‌ها و گشادشدگی‌های متناوب («الگوی مهره‌ای»)، اغلب در بخش‌های میانی یا دیستال شریان کلیوی.'), explanation: L('Die fokale Form kann anders aussehen; fehlendes Beading schließt FMD nicht aus.', 'The focal form may look different; absence of beading does not exclude FMD.', 'شکل فوکال می‌تواند ظاهر دیگری داشته باشد؛ نبود الگوی مهره‌ای FMD را رد نمی‌کند.') },
  { id: 'fmd-focal-vs-multifocal', topicId: 'fibromuskulaere-dysplasie', category: L('Formen', 'Patterns', 'الگوها'), front: L('Welche zwei Läsionsmuster kann FMD verursachen?', 'Which two lesion patterns can FMD cause?', 'FMD چه دو الگوی ضایعه‌ای می‌تواند ایجاد کند؟'), answer: L('Fokale und multifokale Läsionen. Aneurysma, Dissektion oder Tortuosität allein sichern die Diagnose nicht.', 'Focal and multifocal lesions. Aneurysm, dissection or tortuosity alone does not establish the diagnosis.', 'ضایعات فوکال و چندکانونی. آنوریسم، دیسکسیون یا پیچ‌خوردگی به‌تنهایی تشخیص را ثابت نمی‌کند.'), explanation: L('Für die Diagnose braucht es eine fokale oder multifokale FMD-Läsion.', 'Diagnosis requires a focal or multifocal FMD lesion.', 'برای تشخیص، وجود ضایعهٔ فوکال یا چندکانونی FMD لازم است.') },
  { id: 'fmd-imaging-limits', topicId: 'fibromuskulaere-dysplasie', category: L('Bildgebung', 'Imaging', 'تصویربرداری'), front: L('Was sagen CTA/MRA zur hämodynamischen Bedeutung einer renalen FMD-Stenose?', 'What do CTA/MRA show about the haemodynamic significance of renal FMD stenosis?', 'CTA/MRA دربارهٔ اهمیت همودینامیک تنگی FMD کلیوی چه چیزی نشان می‌دهند؟'), answer: L('Sie zeigen die Gefäßmorphologie, bestimmen aber allein die hämodynamische Bedeutung nicht zuverlässig.', 'They depict vascular morphology but do not reliably determine haemodynamic significance by themselves.', 'مورفولوژی عروق را نشان می‌دهند، اما به‌تنهایی اهمیت همودینامیک را با اطمینان تعیین نمی‌کنند.'), explanation: L('Die klinische Einordnung benötigt den spezialisierten Kontext; diese Karte gibt keine Interventionsindikation.', 'Clinical interpretation requires specialist context; this card does not provide an indication for intervention.', 'تفسیر بالینی به زمینهٔ تخصصی نیاز دارد؛ این کارت اندیکاسیون مداخله ارائه نمی‌کند.') },
].map(card=>({...card,source:FMD_SOURCE}))

export const FMD_FLASHCARD_TOPIC = {
  id: 'fibromuskulaere-dysplasie',
  area: 'Abdomen',
  chapter: L('Aorta & viszerale Gefäße', 'Aorta & visceral vessels', 'آئورت و عروق احشایی'),
  icon: 'CT',
  color: '#0e7490',
  href: '/flashcards/fibromuskulaere-dysplasie',
  title: L('Fibromuskuläre Dysplasie', 'Fibromuscular dysplasia', 'دیسپلازی فیبروماسکولار'),
  subtitle: L('fokal · multifokal · Bildgebungsgrenzen', 'focal · multifocal · imaging limits', 'فوکال · چندکانونی · محدودیت‌های تصویربرداری'),
}

export const FMD_LEARNING_GOALS=[L('Multifokales Beading und typische renale Verteilung von ostialen Plaques unterscheiden.','Distinguish multifocal beading and typical renal distribution from ostial plaque.','الگوی مهره‌ای چندکانونی و توزیع تیپیک کلیوی را از پلاک دهانه‌ای جدا کنید.'),L('Fokale FMD und die diagnostischen Grenzen isolierter Begleitbefunde einordnen.','Interpret focal FMD and the diagnostic limits of isolated associated findings.','FMD فوکال و محدودیت تشخیصی یافته‌های همراه منفرد را تفسیر کنید.'),L('Initiale nichtinvasive Diagnostik, selektive DSA und hämodynamische Aussage unterscheiden.','Distinguish initial non-invasive testing, selective DSA and haemodynamic assessment.','بررسی غیرتهاجمی اولیه، DSA انتخابی و ارزیابی همودینامیک را جدا کنید.')]
