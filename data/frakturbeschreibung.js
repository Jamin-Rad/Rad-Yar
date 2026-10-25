const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const FRAKTUR_LESSON = {
  breadcrumb: L('Frakturbeschreibung', 'Fracture description', 'توصیف شکستگی'),
  title: L('Frakturbeschreibung', 'Fracture Description', 'توصیف شکستگی'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  sections: [
    { id: 'systematik', icon: '🧭', label: L('Systematik', 'System', 'سیستم') },
    { id: 'entstehung', icon: '⚡', label: L('Belastung und Knochenqualität', 'Load and bone quality', 'بار واردشده و کیفیت استخوان') },
    { id: 'morphologie', icon: '🦴', label: L('Linie, Fragmente oder Zug?', 'Line, fragments or traction?', 'خط، قطعات یا کشش؟') },
    { id: 'dislokation', icon: '📐', label: L('Dislokation', 'Displacement', 'جابه‌جایی') },
    { id: 'gelenk', icon: '🔗', label: L('Gelenk & Weichteile', 'Joint & soft tissues', 'مفصل و بافت نرم') },
    { id: 'bildgebung', icon: '🩻', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'befund', icon: '📝', label: L('Befundvorlage', 'Report template', 'الگوی گزارش') },
    { id: 'fehler', icon: '⚠️', label: L('Häufige Fehler', 'Common errors', 'خطاهای شایع') },
    { id: 'takehome', icon: '🏁', label: L('Zusammenfassung', 'Key takeaways', 'جمع‌بندی'), emphasis: true },
  ],
  systematik: {
    title: L('Die vollständige Frakturbeschreibung', 'The complete fracture description', 'توصیف کامل شکستگی'),
    lead: L('Beschreibe Ursache, Morphologie, Dislokation, Gelenkbeteiligung und Begleitverletzungen systematisch anhand von acht klinisch relevanten Fragen.', 'Systematically describe cause, morphology, displacement, joint involvement and associated injuries using eight clinically relevant questions.', 'علت، مورفولوژی، جابه‌جایی، درگیری مفصل و آسیب‌های همراه را به‌صورت سیستماتیک و با هشت پرسش بالینی توصیف کنید.'),
    items: [
      { icon:'1️⃣', title:L('Knochen & Seite','Bone & side','استخوان و سمت'), text:L('Welcher Knochen, rechts oder links, Einzel- oder Mehrfachverletzung?','Which bone, right or left, single or multiple injury?','کدام استخوان، راست یا چپ، آسیب منفرد یا متعدد؟') },
      { icon:'2️⃣', title:L('Lokalisation','Location','محل'), text:L('Epiphyse, Metaphyse oder Diaphyse; proximal, mittig oder distal.','Epiphysis, metaphysis or diaphysis; proximal, middle or distal.','اپی‌فیز، متافیز یا دیافیز؛ پروگزیمال، میانی یا دیستال.') },
      { icon:'3️⃣', title:L('Morphologie','Morphology','مورفولوژی'), text:L('Frakturlinie, Fragmentzahl, komplett oder inkomplett.','Fracture line, fragment count, complete or incomplete.','خط شکستگی، تعداد قطعات، کامل یا ناکامل.') },
      { icon:'4️⃣', title:L('Dislokation','Displacement','جابه‌جایی'), text:L('Translation, Angulation, Verkürzung/Diastase und Rotation.','Translation, angulation, shortening/distraction and rotation.','جابه‌جایی انتقالی، زاویه، کوتاهی/دیاستاز و چرخش.') },
      { icon:'5️⃣', title:L('Gelenkbeteiligung','Joint involvement','درگیری مفصل'), text:L('Intraartikulär? Stufe, Spalt, Subluxation oder Luxation?','Intra-articular? Step, gap, subluxation or dislocation?','داخل مفصل؟ پله، فاصله، ساب‌لوکساسیون یا دررفتگی؟') },
      { icon:'6️⃣', title:L('Weichteile','Soft tissues','بافت نرم'), text:L('Schwellung, Gas, Fremdkörper, Sehnen- oder Bandavulsion.','Swelling, gas, foreign body, tendon or ligament avulsion.','تورم، گاز، جسم خارجی، کندگی تاندون یا رباط.') },
      { icon:'7️⃣', title:L('Knochenqualität','Bone quality','کیفیت استخوان'), text:L('Osteopenie oder lokale Läsion als Hinweis auf Insuffizienz/pathologische Fraktur.','Osteopenia or focal lesion suggesting insufficiency/pathological fracture.','استئوپنی یا ضایعه موضعی به نفع شکستگی ناکفایتی/پاتولوژیک.') },
      { icon:'8️⃣', title:L('Begleitverletzung','Associated injury','آسیب همراه'), text:L('Weitere Fraktur, Luxation, Gefäß-/Nervenrisiko oder Kompartmentsyndrom.','Additional fracture, dislocation, neurovascular risk or compartment syndrome.','شکستگی دیگر، دررفتگی، خطر عروقی‌عصبی یا سندرم کمپارتمان.') },
    ],
    key: L('Nicht bei „Fraktur vorhanden“ aufhören: Die Dislokation und Gelenkbeteiligung entscheiden oft über die Therapie.', 'Do not stop at “fracture present”: displacement and joint involvement often determine treatment.', 'به «شکستگی وجود دارد» اکتفا نکنید؛ جابه‌جایی و درگیری مفصل اغلب درمان را تعیین می‌کنند.'),
  },
  entstehung: {
    title: L('Welche Belastung trifft welchen Knochen?', 'What load acts on what bone?', 'چه باری به چه استخوانی وارد شده؟'),
    lead: L('Zuerst Belastung und Knochenqualität trennen: ungewöhnlich hohe Belastung normalen Knochens oder normale Belastung geschwächten Knochens?', 'First separate load from bone quality: excessive loading of normal bone or normal loading of weakened bone?', 'ابتدا بار را از کیفیت استخوان جدا کنید: بار بیش‌ازحد بر استخوان طبیعی یا بار طبیعی بر استخوان ضعیف؟'),
    headers: [L('Typ','Type','نوع'),L('Definition','Definition','تعریف'),L('Beispiel/Hinweis','Example/clue','مثال/نکته')],
    rows: [
      [L('Direktes Trauma','Direct trauma','ترومای مستقیم'),L('Kraft trifft den gesunden Knochen am Frakturort.','Force strikes normal bone at the fracture site.','نیرو مستقیماً به استخوان سالم در محل شکستگی وارد می‌شود.'),L('Schlag, Schuss, Aufprall; häufig Quer- oder Trümmerfraktur.','Blow, gunshot, impact; often transverse or comminuted.','ضربه، گلوله، برخورد؛ اغلب عرضی یا خردشده.')],
      [L('Indirektes Trauma','Indirect trauma','ترومای غیرمستقیم'),L('Hebel, Rotation, Stauchung oder Zug; Fraktur fern der Krafteinwirkung.','Lever, rotation, compression or traction; fracture remote from force.','اهرم، چرخش، فشردگی یا کشش؛ شکستگی دور از محل نیرو.'),L('Spiral-, Kompressions- oder Avulsionsfraktur.','Spiral, compression or avulsion fracture.','شکستگی مارپیچی، فشاری یا کندگی.')],
      [L('Stressfraktur','Fatigue fracture','شکستگی خستگی'),L('Rezidivierende Überlastung normalen Knochens.','Repetitive overload of normal bone.','اضافه‌بار تکراری استخوان طبیعی.'),L('Marschfraktur; initial radiografisch okkult möglich.','March fracture; may initially be radiographically occult.','شکستگی راهپیمایی؛ ممکن است ابتدا در رادیوگرافی مخفی باشد.')],
      [L('Insuffizienzfraktur','Insufficiency fracture','شکستگی ناکفایتی'),L('Normale Belastung auf strukturell geschwächtem Knochen.','Normal stress on structurally weakened bone.','فشار طبیعی بر استخوان ضعیف‌شده.'),L('Osteoporose, Bestrahlung, M. Paget.','Osteoporosis, radiotherapy, Paget disease.','پوکی استخوان، پرتودرمانی، پاژه.')],
      [L('Pathologische Fraktur','Pathological fracture','شکستگی پاتولوژیک'),L('Fraktur durch lokale knochenzerstörende Läsion.','Fracture through a focal bone-destructive lesion.','شکستگی از میان ضایعه تخریب‌کننده موضعی استخوان.'),L('Metastase, Myelom, Zyste oder Osteomyelitis.','Metastasis, myeloma, cyst or osteomyelitis.','متاستاز، میلوما، کیست یا استئومیلیت.')],
    ],
    note: L('Diese PDF ordnet die lokal destruktive pathologische Fraktur als Sonderform der Insuffizienzfraktur ein. Andere Schemata trennen diffuse Knochenschwäche (Insuffizienz) von einer fokalen Läsion (pathologisch); die ACR fasst Ermüdungs- und Insuffizienzfrakturen unter „Stressfraktur“ zusammen. Begriffe sind also nicht überall deckungsgleich. Beschreibe Belastung, Knochenqualität und fokale Läsion, statt die Ursache nur aus dem Etikett abzuleiten.', 'This PDF groups a focal destructive pathological fracture as a subtype of insufficiency fracture. Other schemes distinguish diffuse bone weakness (insufficiency) from a focal lesion (pathological); ACR groups fatigue and insufficiency fractures under “stress fracture.” The terms therefore do not align across all sources. Report loading, bone quality and any focal lesion rather than inferring cause from the label alone.', 'این PDF شکستگی پاتولوژیکِ ناشی از ضایعه تخریبی کانونی را زیرگروهی از شکستگی ناکفایتی می‌داند. در برخی الگوهای دیگر، ضعف منتشر استخوان (ناکفایتی) از ضایعه کانونی (پاتولوژیک) جدا می‌شود؛ ACR شکستگی خستگی و ناکفایتی را ذیل «شکستگی استرسی» گروه‌بندی می‌کند. بنابراین اصطلاحات در همه منابع هم‌معنا نیستند. بار، کیفیت استخوان و هر ضایعه کانونی را گزارش کنید و علت را فقط از برچسب استنباط نکنید.'),
  },
  morphologie: {
    title: L('Linie, Fragmente und Kraftrichtung unterscheiden', 'Distinguish the line, fragments and force direction', 'خط شکستگی، قطعات و جهت نیرو را تفکیک کنید'),
    lead: L('Erst die Linie verfolgen, dann Zwischenfragmente suchen. Die Form kann einen Mechanismus nahelegen; sie allein beweist keine Stabilität.', 'First follow the line, then look for intermediate fragments. Shape can suggest a mechanism; it does not establish stability on its own.', 'ابتدا خط شکستگی را دنبال کنید، سپس قطعات میانی را جست‌وجو کنید. شکل می‌تواند مکانیسمی را مطرح کند، اما به‌تنهایی پایداری را ثابت نمی‌کند.'),
    headers:[L('Typ','Type','نوع'),L('Definition','Definition','تعریف'),L('Typischer Mechanismus','Typical mechanism','مکانیسم تیپیک')],
    rows:[
      [L('Fissur','Fissure/hairline','فیسور'),L('Feine Linie ohne Dislokation; komplett oder inkomplett.','Fine line without displacement; complete or incomplete.','خط ظریف بدون جابه‌جایی؛ کامل یا ناکامل.'),L('Niedrige Energie oder Stress.','Low energy or stress.','انرژی کم یا استرس.')],
      [L('Querfraktur','Transverse','عرضی'),L('Frakturlinie annähernd rechtwinklig zur Schaftachse.','Line approximately perpendicular to shaft axis.','خط تقریباً عمود بر محور شفت.'),L('Direkte Gewalt oder Biegung.','Direct force or bending.','نیروی مستقیم یا خمشی.')],
      [L('Schrägfraktur','Oblique','مایل'),L('Schräger Verlauf durch die Kortikalis.','Oblique course through the cortex.','مسیر مایل از کورتکس.'),L('Biegung mit axialer Komponente.','Bending with axial component.','خمشی با مؤلفه محوری.')],
      [L('Spiralfraktur','Spiral','مارپیچی'),L('Frakturlinie windet sich um den Schaft.','Line winds around the shaft.','خط دور شفت می‌پیچد.'),L('Torsion/Rotation.','Torsion/rotation.','پیچش/چرخش.')],
      [L('Biegungskeil','Butterfly fragment','قطعه پروانه‌ای'),L('Drittes keilförmiges Fragment auf der Druckseite.','Third wedge-shaped fragment on compression side.','قطعه سوم گوه‌ای در سمت فشار.'),L('Biegetrauma.','Bending injury.','ترومای خمشی.')],
      [L('Stückfraktur','Segmental','سگمنتال'),L('Zwei getrennte Frakturlinien isolieren ein Zwischenfragment.','Two separate lines isolate an intermediate segment.','دو خط جدا یک قطعه میانی را جدا می‌کنند.'),L('Kann mit höherer Energie einhergehen; das isolierte Fragment kann durchblutungsgefährdet sein.','May accompany higher-energy injury; the isolated segment may have compromised blood supply.','ممکن است با آسیب پرانرژی همراه باشد؛ خون‌رسانی قطعه جداشده ممکن است در خطر باشد.')],
      [L('Trümmerfraktur','Comminuted','خردشده'),L('Zahlreiche Fragmente, keine einfache Zweifragmentfraktur.','Multiple fragments rather than a simple two-part fracture.','قطعات متعدد، نه شکستگی ساده دو قطعه‌ای.'),L('Schwere direkte Gewalt.','Severe direct force.','نیروی مستقیم شدید.')],
      [L('Impression','Depression','فرورفتگی سطح'),L('Eine Knochenoberfläche wird umschrieben eingedrückt.','A localised area of the bone surface is depressed.','بخش محدودی از سطح استخوان به داخل فرو می‌رود.'),L('Zum Beispiel Schädeldach oder Tibiaplateau.','For example, the skull vault or tibial plateau.','مثلاً سقف جمجمه یا پلاتوی تیبیا.')],
      [L('Kompression','Compression','فشاری'),L('Spongiöser Knochen wird zusammengedrückt und sinkt ein.','Cancellous bone is compressed and collapses.','استخوان اسفنجی فشرده می‌شود و فرومی‌ریزد.'),L('Zum Beispiel ein Wirbelkörper.','For example, a vertebral body.','مثلاً جسم مهره.')],
      [L('Impaktion','Impaction','درهم‌رفتگی'),L('Bruchenden sind ineinander verkeilt.','Fracture ends are driven into each other.','انتهای شکستگی در هم فرو رفته‌اند.'),L('Axiale Stauchung; Stabilität nur im gesamten Verletzungskontext beurteilen.','Axial compression; assess stability in the complete injury context.','فشردگی محوری؛ پایداری را فقط در زمینه کل آسیب ارزیابی کنید.')],
      [L('Avulsion','Avulsion','کندگی'),L('Knöcherner Ausriss am Ansatz von Sehne oder Band.','Bone fragment pulled from a tendon or ligament attachment.','قطعه استخوانی از محل اتصال تاندون یا رباط کنده می‌شود.'),L('Plötzliche Zugkraft.','Sudden traction force.','نیروی کششی ناگهانی.')],
    ],
    sourceMorphologyImage:'/educational/msk-fracture-morphologies-p4.png',
    sourceMorphologyAlt:L('Ausschnitt aus MSK.pdf, PDF-Seite 4 (Druckseite 3): zwölf beschriftete Frakturmorphologien; die Beschriftungen im Original sind deutsch.','Crop from MSK.pdf, PDF page 4 (printed page 3): twelve labelled fracture morphologies; labels in the source image are German.','برش از MSK.pdf، صفحه ۴ فایل (صفحه چاپی ۳): دوازده مورفولوژی شکستگی با برچسب؛ برچسب‌های تصویر اصلی آلمانی‌اند.'),
    sourceMorphologyCredit:L('Quelle: Dr. Zias MSK.pdf, PDF-Seite 4 (Druckseite 3), Ausschnitt der Abbildung; für diese Lehrseite zugeschnitten.','Source: Dr. Zia’s MSK.pdf, PDF page 4 (printed page 3), cropped figure excerpt; crop prepared for this lesson.','منبع: MSK.pdf دکتر ضیا، صفحه ۴ فایل (صفحه چاپی ۳)، برش از شکل؛ برش برای این درس آماده شده است.'),
    sourceMorphologyNote:L('Die Abbildung zeigt zwölf beschriftete Muster. Neun Quellbegriffe sind in der Tabelle oben bereits erklärt: Fissur, Querfraktur, Schrägfraktur, Spiralfraktur, Stückfraktur, Trümmerfraktur, Impressionsfraktur, Kompressionsfraktur und Abriss-/Avulsionsfraktur. Die vorhandene Zeile zum Biegungskeil erklärt einen Teil des kombinierten vierten Musters; die drei zusätzlichen Beschriftungen sind Stauchungsfraktur, Meißelfraktur und Schrägfraktur mit Biegungskeil.','The figure labels twelve patterns. Nine source labels are already explained in the table above: fissure, transverse, oblique, spiral, segmental, comminuted, depression, compression and avulsion fractures. The existing bending-wedge row explains one component of the combined fourth pattern; the three additional labels are crush fracture, chisel fracture and oblique fracture with a bending wedge.','شکل دوازده الگو را برچسب‌گذاری می‌کند. نه برچسب منبع در جدول بالا توضیح داده شده‌اند: فیسور، عرضی، مایل، مارپیچی، سگمنتال، خردشده، فرورفتگی، فشاری و کندگی. ردیف موجودِ گوه خمشی یکی از اجزای الگوی ترکیبی چهارم را توضیح می‌دهد؛ سه برچسب تکمیلی عبارت‌اند از شکستگی له‌شدگی، شکستگی اسکنه‌ای و شکستگی مایل همراه با گوه خمشی.'),
    sourceMorphologyRows:[
      [L('Stauchungsfraktur','Crush fracture','شکستگی له‌شدگی'),L('Die Quelle zeigt eine lokal zerdrückte, mehrfragmentäre Zone im Schaft. „Stauchung“ benennt hier das dargestellte Stauchungsmuster; daraus folgt nicht automatisch eine Impaktion mit ineinander verkeilten Enden.','The source depicts a locally crushed, multifragmentary shaft zone. “Crush” names this illustrated compression pattern; it does not automatically mean impaction with interlocked fracture ends.','منبع ناحیه‌ای موضعی، له‌شده و چندقطعه‌ای را در تنه استخوان نشان می‌دهد. «له‌شدگی» نام الگوی فشاریِ تصویرشده است؛ به‌طور خودکار به معنی درهم‌رفتگی انتهای شکستگی نیست.'),L('Mit Impaktion getrennt dokumentieren; eine Gleichsetzung ist aus der Abbildung allein nicht belegt.','Record separately from impaction; the figure alone does not establish equivalence.','جدا از درهم‌رفتگی ثبت شود؛ شکل به‌تنهایی هم‌ارزی را ثابت نمی‌کند.')],
      [L('Meißelfraktur','Chisel fracture','شکستگی اسکنه‌ای'),L('Die Quelle beschriftet ein knienahes, gelenkbezogenes Fragmentmuster als Meißelfraktur, ohne es im Text weiter zu definieren. Lage und Fragmentbeziehung beschreiben; keine weitergehende Klassifikation aus dem Bild ableiten.','The source labels a periarticular knee fragment pattern as a chisel fracture but does not define it further in text. Describe location and fragment relationship; do not infer a broader classification from the figure.','منبع الگویی قطعه‌ای در نزدیکی مفصل زانو را «شکستگی اسکنه‌ای» می‌نامد، اما در متن تعریف بیشتری نمی‌دهد. محل و رابطه قطعه را توصیف کنید و از شکل طبقه‌بندی گسترده‌تری استنباط نکنید.'),L('Quellbegriff beibehalten; konkrete Gelenkfläche und Fragmentlage im Fall benennen.','Retain the source term; specify the joint surface and fragment location in the case.','اصطلاح منبع حفظ شود؛ سطح مفصلی و محل قطعه در هر مورد مشخص شود.')],
      [L('Schrägfraktur mit Biegungskeil','Oblique fracture with a bending wedge','شکستگی مایل همراه با گوه خمشی'),L('Kombiniertes Muster: eine schräge Frakturlinie und ein zusätzliches keilförmiges Biegungsfragment. Der Keil ist Teil desselben Frakturmusters, nicht bloß ein Synonym für die schräge Linie.','Combined pattern: an oblique fracture line plus an additional wedge-shaped bending fragment. The wedge is part of the same fracture pattern, not a synonym for the oblique line.','الگوی ترکیبی: خط شکستگی مایل به‌همراه قطعه گوه‌ای اضافی ناشی از خمش. گوه بخشی از همان الگوست و مترادف خط مایل نیست.'),L('Beide Merkmale gemeinsam benennen: Verlauf der Linie und zusätzliches Keilfragment.','Name both features: line orientation and additional wedge fragment.','هر دو ویژگی باهم ذکر شوند: جهت خط و قطعه گوه‌ای اضافی.')],
    ],
    image:'/educational/fracture-morphology-comparison.svg',
    imageAlt:L('Lernschema: A Querfraktur, B Schrägfraktur, C Segmentfraktur mit zwei Linien, D Avulsion mit Zugpfeil; keine Patientenaufnahme.','Teaching schematic: A transverse, B oblique, C segmental fracture with two lines, D avulsion with a traction arrow; not a patient image.','شماتیک آموزشی: A شکستگی عرضی، B مایل، C سگمنتال با دو خط، D کندگی با پیکان کشش؛ تصویر بیمار نیست.'),
    imagePanels:[L('A · Querfraktur','A · Transverse fracture','A · شکستگی عرضی'),L('B · Schrägfraktur','B · Oblique fracture','B · شکستگی مایل'),L('C · Segmentfraktur','C · Segmental fracture','C · شکستگی سگمنتال'),L('D · Avulsion unter Zug','D · Traction avulsion','D · کندگی بر اثر کشش')],
    imageCredit:L('Originales RadYar-Lernschema nach Dr. Zias MSK-Notizen, PDF-Seite 3; keine Patientenaufnahme.','Original RadYar teaching schematic based on Dr. Zia’s MSK notes, PDF page 3; not a patient image.','شماتیک آموزشی اختصاصی رادیار بر اساس یادداشت‌های MSK دکتر ضیا، صفحه ۳ PDF؛ تصویر بیمار نیست.'),
    imageTask:L('Vergleichen Sie A und B über die Richtung der Linie. Bei C isolieren zwei Linien ein Segment; bei D zieht eine Sehne oder ein Band ein Ansatzfragment ab. Schema, keine Röntgenaufnahme.','Compare A and B by the direction of the line. In C, two lines isolate a segment; in D, a tendon or ligament pulls off an attachment fragment. Schematic, not a radiograph.','A و B را از نظر جهت خط مقایسه کنید. در C دو خط یک قطعه میانی را جدا می‌کنند؛ در D تاندون یا رباط قطعه محل اتصال را می‌کند. این یک شماتیک است، نه رادیوگرافی.'),
    avulsionExamples:L('Ansätze gezielt prüfen: Basis des Metatarsale V; Tuberositas tibiae (Patellarsehne); oberer Patellapol (Quadrizepssehne); Trochanter minor (Iliopsoassehne). Die Quelle nennt außerdem die proximale Phalanx des ersten Strahls, ohne den betroffenen Ansatz näher zu benennen.','Inspect attachments: fifth metatarsal base; tibial tuberosity (patellar tendon); superior patellar pole (quadriceps tendon); lesser trochanter (iliopsoas tendon). The source also lists the proximal phalanx of the first ray without specifying its affected attachment.',"محل‌های اتصال را بررسی کنید: قاعده متاتارس پنجم؛ توبروزیته تیبیا (تاندون پاتلا)؛ قطب فوقانی پاتلا (تاندون چهارسر)؛ تروکانتر کوچک (تاندون ایلیوپسواس). منبع فالانکس پروگزیمال انگشت اول را نیز نام می‌برد، اما مشخص نمی‌کند مربوط به دست است یا پا و محل اتصال درگیر را دقیق مشخص نمی‌کند."),
  },
  sourceCheck: {
    title:L('Zugfragment oder Schaftfraktur?','Attachment fragment or shaft fracture?','قطعه محل اتصال یا شکستگی شفت؟'),
    question:L('Nach plötzlichem Zug liegt ein kleines Knochenfragment am oberen Patellapol neben dem Quadrizepssehnenansatz. Welcher Begriff beschreibt die Morphologie?','After sudden traction, a small bone fragment lies at the superior patellar pole beside the quadriceps tendon attachment. Which term describes the morphology?','پس از کشش ناگهانی، قطعه کوچک استخوانی در قطب فوقانی پاتلا کنار محل اتصال تاندون چهارسر دیده می‌شود. کدام واژه مورفولوژی را توصیف می‌کند؟'),
    options:[L('Impressionsfraktur','Depression fracture','شکستگی فرورفتگی'),L('Avulsionsfraktur','Avulsion fracture','شکستگی کندگی'),L('Segmentfraktur','Segmental fracture','شکستگی سگمنتال')],
    answer:1,
    feedback:[
      L('Bei einer Impression wird die Oberfläche eingedrückt. Hier wird ein Ansatzfragment unter Zug abgezogen: Avulsion.','Depression pushes a surface inward. Here traction pulls off an attachment fragment: avulsion.','در فرورفتگی، سطح به داخل فشرده می‌شود. اینجا کشش قطعه محل اتصال را جدا می‌کند: کندگی.'),
      L('Richtig: Ein knöcherner Ausriss am Sehnenansatz unter Zug ist eine Avulsionsfraktur. Die beteiligte Sehne im Befund mit benennen.','Correct: traction pulling off bone at a tendon attachment is an avulsion fracture. Name the involved tendon in the report as well.','درست است: جداشدن استخوان محل اتصال تاندون با کشش، شکستگی کندگی است. تاندون درگیر را نیز در گزارش نام ببرید.'),
      L('Eine Segmentfraktur isoliert einen Schaftabschnitt zwischen zwei Frakturlinien. Hier liegt stattdessen ein ausgerissenes Ansatzfragment vor.','A segmental fracture isolates a shaft segment between two fracture lines. Here there is an avulsed attachment fragment instead.','شکستگی سگمنتال بخشی از شفت را میان دو خط شکستگی جدا می‌کند. اینجا قطعه محل اتصال کنده شده است.'),
    ],
  },
  dislokation: {
    title:L('Dislokation korrekt beschreiben','Describing displacement correctly','توصیف صحیح جابه‌جایی'),
    lead:L('Die Stellung wird nach dem distalen Fragment relativ zum proximalen Fragment benannt.','Position is named by the distal fragment relative to the proximal fragment.','وضعیت بر اساس قطعه دیستال نسبت به قطعه پروگزیمال نام‌گذاری می‌شود.'),
    headers:[L('Parameter','Parameter','پارامتر'),L('Beschreibung','Description','توصیف'),L('Beispiel','Example','مثال')],
    rows:[
      [L('Translation','Translation','جابه‌جایی انتقالی'),L('Richtung und Anteil der Schaftbreite oder Millimeter.','Direction and fraction of shaft width or millimetres.','جهت و نسبت عرض شفت یا میلی‌متر.'),L('Distales Fragment um ½ Schaftbreite nach dorsal.','Distal fragment displaced dorsally by half a shaft width.','قطعه دیستال به اندازه نصف عرض شفت به دورسال.')],
      [L('Angulation','Angulation','زاویه'),L('Richtung der Spitze (Apex) oder distalen Fragmentstellung plus Gradzahl.','Direction of apex or distal-fragment tilt plus angle.','جهت رأس یا انحراف قطعه دیستال همراه درجه.'),L('15° Apex-volar-Angulation.','15° apex-volar angulation.','زاویه ۱۵ درجه با رأس ولار.')],
      [L('Länge','Length','طول'),L('Verkürzung durch Überreiten oder Diastase durch Distraktion.','Shortening from overlap or distraction gap.','کوتاهی ناشی از همپوشانی یا فاصله ناشی از کشش.'),L('8 mm Verkürzung beziehungsweise 4 mm Diastase.','8 mm shortening or 4 mm distraction.','۸ میلی‌متر کوتاهی یا ۴ میلی‌متر دیاستاز.')],
      [L('Rotation','Rotation','چرخش'),L('Innen-/Außenrotation; radiologisch oft indirekt.','Internal/external rotation; often indirect radiographic signs.','چرخش داخلی/خارجی؛ اغلب علائم غیرمستقیم.'),L('Kortikalisbreite und Gelenkflächenorientierung vergleichen.','Compare cortical width and joint-surface orientation.','عرض کورتکس و جهت سطح مفصل مقایسه شود.')],
    ],
    cave:L('„Disloziert“ allein ist unvollständig. Richtung und Ausmaß müssen angegeben werden.','“Displaced” alone is incomplete. State direction and magnitude.','واژه «جابه‌جا» به‌تنهایی ناقص است؛ جهت و مقدار باید ذکر شود.'),
  },
  gelenk: {
    title:L('Gelenkbeteiligung, Offenheit & Weichteile','Joint involvement, open injury & soft tissues','درگیری مفصل، باز بودن و بافت نرم'),
    lead:L('Diese Befunde verändern Dringlichkeit, Klassifikation und operative Planung.','These findings alter urgency, classification and surgical planning.','این یافته‌ها فوریت، طبقه‌بندی و برنامه جراحی را تغییر می‌دهند.'),
    items:[
      {icon:'🧩',title:L('Intraartikulär','Intra-articular','داخل مفصل'),text:L("Gelenkfläche benennen. Stufe ist der Höhenversatz der Gelenkfläche, Spalt der Abstand zwischen den Fragmenten; beides getrennt in Millimetern messen.","Name the joint surface. Step is articular height offset and gap is separation between fragments; measure each separately in millimetres.","سطح مفصل را نام ببرید. پله اختلاف ارتفاع سطح مفصلی و فاصله، جدایی قطعات است؛ هرکدام جداگانه به میلی‌متر اندازه‌گیری شوند.")},
      {icon:'🚪',title:L('Offene Fraktur','Open fracture','شکستگی باز'),text:L('Ist klinisch definiert. Radiologisches Gas oder Fremdkörper sind Warnzeichen, schließen Offenheit aber weder sicher ein noch aus.','Clinically defined. Gas or foreign body are clues but neither prove nor exclude it reliably.','تعریف بالینی دارد؛ گاز یا جسم خارجی نشانهٔ هشدارند، اما بازبودن شکستگی را نه با اطمینان اثبات و نه رد می‌کنند.')},
      {icon:'🧵',title:L('Weichteile','Soft tissues','بافت نرم'),text:L('Schwellung, Hämatom, Gas, Sehnenverlagerung und Fremdkörper dokumentieren.','Document swelling, haematoma, gas, tendon displacement and foreign bodies.','تورم، هماتوم، گاز، جابه‌جایی تاندون و جسم خارجی ثبت شود.')},
      {icon:'🚨',title:L('Neurovaskuläres Risiko','Neurovascular risk','خطر عصبی‌عروقی'),text:L('Starke Dislokation, Luxation oder anatomisch gefährdete Gefäße/Nerven ausdrücklich hervorheben.','Highlight major displacement, dislocation or anatomically threatened vessels/nerves.','جابه‌جایی شدید، دررفتگی یا خطر عروق/اعصاب صریحاً برجسته شود.')},
    ],
    key:L('Eine offene Fraktur ist keine rein radiologische Diagnose – bei Verdacht sofort klinisch kommunizieren.','An open fracture is not a purely radiological diagnosis—communicate suspicion immediately.','شکستگی باز تشخیص صرفاً رادیولوژیک نیست؛ شک را فوراً بالینی اطلاع دهید.'),
  },
  bildgebung: {
    title:L('Welche Bildgebung beantwortet welche Frage?','Which imaging answers which question?','کدام تصویربرداری به کدام پرسش پاسخ می‌دهد؟'),
    headers:[L('Modalität','Modality','مودالیتی'),L('Stärke','Strength','نقطه قوت'),L('Typische Indikation','Typical indication','اندیکاسیون تیپیک')],
    rows:[
      [L('Röntgen in 2 Ebenen','Radiographs in 2 planes','رادیوگرافی در دو نما'),L('Frakturlinie, Achse, grobe Gelenkstellung.','Fracture line, alignment and gross joint position.','خط شکستگی، محور و وضعیت کلی مفصل.'),L('Initiale Standarddiagnostik.','Initial standard assessment.','بررسی استاندارد اولیه.')],
      ['CT',L('Fragmentmorphologie und Gelenkfläche ohne Überlagerung.','Fragment morphology and joint surface without overlap.','مورفولوژی قطعات و سطح مفصل بدون همپوشانی.'),L('Komplexe/intraartikuläre Fraktur, OP-Planung.','Complex/intra-articular fracture, surgical planning.','شکستگی پیچیده/داخل مفصل، برنامه جراحی.')],
      ['MRT',L('Knochenmarködem, okkulte Fraktur und Weichteile.','Marrow oedema, occult fracture and soft tissues.','ادم مغز استخوان، شکستگی مخفی و بافت نرم.'),L('Persistierende Klinik bei negativem Röntgen; Stress-/Insuffizienzfraktur.','Persistent symptoms with negative radiographs; stress/insufficiency fracture.','علائم پایدار با رادیوگرافی منفی؛ شکستگی استرس/ناکفایتی.')],
    ],
    cave:L("Bei klinisch hohem Frakturverdacht beendet ein negatives Röntgen die Diagnostik nicht automatisch. MRT-Knochenmarködem allein ist kein spezifischer Frakturnachweis; Frakturlinie, Muster und klinischen Kontext gemeinsam beurteilen.","Negative radiographs do not automatically end work-up when suspicion is high. MRI marrow oedema alone is not specific proof of fracture; assess any fracture line, pattern and clinical context together.","در شک بالینی بالا، رادیوگرافی منفی بررسی را خودکار پایان نمی‌دهد. ادم مغز استخوان در MRI به‌تنهایی اثبات اختصاصی شکستگی نیست؛ خط شکستگی در صورت وجود، الگو و زمینهٔ بالینی با هم ارزیابی شوند."),
  },
  befund: {
    title:L('Praktische Befundvorlage','Practical report template','الگوی عملی گزارش'),
    lead:L('Eine standardisierte Satzstruktur macht den Befund vollständig und schnell lesbar.','A standard sentence structure makes reporting complete and easy to read.','ساختار جمله استاندارد گزارش را کامل و خوانا می‌کند.'),
    template:L('„[Akute/subakute] [komplette/inkomplette] [Morphologie]-Fraktur des/der [Knochen, Seite, Segment] mit [intra-/extraartikulärer Ausdehnung]. [Translation] und [Angulation], [Verkürzung/Diastase], [Rotation]. Gelenkfläche mit [Stufe/Spalt] mm; [Subluxation/Luxation]. [Begleitfraktur/Weichteilbefund]. Knochenqualität [unauffällig/osteopen/lokal destruiert].“','“[Acute/subacute] [complete/incomplete] [morphology] fracture of the [bone, side, segment] with [intra-/extra-articular extension]. [Translation] and [angulation], [shortening/distraction], [rotation]. Articular surface with [step/gap] mm; [subluxation/dislocation]. [Associated fracture/soft-tissue finding]. Bone quality [normal/osteopenic/focally destroyed].”','«شکستگی [حاد/تحت‌حاد] [کامل/ناکامل] از نوع [مورفولوژی] در [استخوان، سمت، سگمان] با گسترش [داخل/خارج مفصل]. [جابه‌جایی انتقالی] و [زاویه]، [کوتاهی/دیاستاز]، [چرخش]. سطح مفصل با [پله/فاصله] میلی‌متر؛ [ساب‌لوکساسیون/دررفتگی]. [آسیب همراه/یافته بافت نرم]. کیفیت استخوان [طبیعی/استئوپنیک/تخریب موضعی].»'),
    example:L('Beispiel: Komplette kurze Schrägfraktur des distalen rechten Tibiaschaftes mit ½ Schaftbreite dorsaler Translation des distalen Fragments, 12° Apex-ventral-Angulation und 6 mm Verkürzung. Keine Gelenkbeteiligung. Begleitende nicht dislozierte Fibulafraktur.','Example: Complete short oblique fracture of the distal right tibial shaft with dorsal translation of the distal fragment by half a shaft width, 12° apex-anterior angulation and 6 mm shortening. No joint involvement. Associated nondisplaced fibular fracture.','مثال: شکستگی کامل مایل کوتاه شفت دیستال تیبیای راست با جابه‌جایی دورسال قطعه دیستال به اندازه نصف عرض شفت، زاویه ۱۲ درجه با رأس قدامی و ۶ میلی‌متر کوتاهی. بدون درگیری مفصل. شکستگی همراه بدون جابه‌جایی فیبولا.'),
  },
  fehler: {
    title:L('Häufige Fehler','Common errors','خطاهای شایع'),
    items:[
      {icon:'❌',title:L('Nur „Fraktur“','Only “fracture”','فقط «شکستگی»'),text:L('Ohne Segment, Morphologie und Dislokation klinisch kaum verwertbar.','Without segment, morphology and displacement it is clinically weak.','بدون سگمان، مورفولوژی و جابه‌جایی ارزش بالینی کم دارد.')},
      {icon:'↔️',title:L('Falsche Bezugsrichtung','Wrong reference direction','جهت مرجع غلط'),text:L('Dislokation nach dem distalen relativ zum proximalen Fragment benennen.','Name displacement by the distal relative to proximal fragment.','جابه‌جایی را بر اساس قطعه دیستال نسبت به پروگزیمال نام ببرید.')},
      {icon:'🫥',title:L('Gelenk übersehen','Missing the joint','نادیده‌گرفتن مفصل'),text:L('Intraartikuläre Ausdehnung, Stufe und Subluxation immer aktiv prüfen.','Actively assess intra-articular extension, step and subluxation.','گسترش داخل مفصل، پله و ساب‌لوکساسیون فعالانه بررسی شود.')},
      {icon:'🎗️',title:L('Pathologie übersehen','Missing pathology','نادیده‌گرفتن پاتولوژی'),text:L('Ungewöhnlicher Frakturort oder geringe Gewalt: Knochenläsion und Osteopenie suchen.','Unusual site or low force: look for bone lesion and osteopenia.','محل غیرمعمول یا نیروی کم: ضایعه استخوان و استئوپنی را جستجو کنید.')},
    ],
  },
  takehome: {
    title:L('Zusammenfassung','Key takeaways','جمع‌بندی'),
    lead:L('Die vier Regeln für jeden Frakturbefund.','Four rules for every fracture report.','چهار قانون برای هر گزارش شکستگی.'),
    items:[
      {title:L('Systematisch','Systematic','سیستماتیک'),text:L('Knochen/Seite → Segment → Morphologie → Dislokation → Gelenk → Weichteile.','Bone/side → segment → morphology → displacement → joint → soft tissues.','استخوان/سمت ← سگمان ← مورفولوژی ← جابه‌جایی ← مفصل ← بافت نرم.')},
      {title:L('Distales Fragment','Distal fragment','قطعه دیستال'),text:L('Richtung der Dislokation immer relativ zum proximalen Fragment angeben.','Always describe displacement of the distal relative to proximal fragment.','جهت جابه‌جایی قطعه دیستال نسبت به پروگزیمال ذکر شود.')},
      {title:L('Messen','Measure','اندازه‌گیری'),text:L('Translation, Winkel, Verkürzung/Diastase sowie Gelenkstufe quantifizieren.','Quantify translation, angle, shortening/distraction and articular step.','جابه‌جایی انتقالی، زاویه، کوتاهی/دیاستاز و پله مفصلی کمی‌سازی شود.')},
      {title:L('Gesamtes Verletzungsmuster','Whole injury pattern','کل الگوی آسیب'),text:L('Begleitfraktur, Luxation, offene Verletzung und pathologischen Knochen nicht vergessen.','Do not miss associated fracture, dislocation, open injury or pathological bone.','شکستگی همراه، دررفتگی، آسیب باز یا استخوان پاتولوژیک فراموش نشود.')},
    ],
  },
}

const FQ = [
  {
    "id": "01",
    "question": {
      "de": "Textfall: Beschrieben ist eine nicht dislozierte Querfraktur im mittleren Drittel der rechten Ulna. Welche Befundzeile gibt diese Angaben korrekt wieder?",
      "en": "Text vignette: A nondisplaced transverse fracture is described in the middle third of the right ulna. Which report line preserves these findings?",
      "fa": "سناریوی متنی: شکستگی عرضی بدون جابه‌جایی در یک‌سوم میانی اولنای راست توصیف شده است. کدام عبارت گزارش این یافته‌ها را درست حفظ می‌کند؟"
    },
    "options": [
      {
        "de": "Nicht dislozierte Querfraktur des mittleren rechten Ulnaschafts.",
        "en": "Nondisplaced transverse fracture of the middle right ulnar shaft.",
        "fa": "شکستگی عرضی بدون جابه‌جایی تنهٔ میانی اولنای راست."
      },
      {
        "de": "Nicht dislozierte Querfraktur des distalen rechten Ulnaschafts.",
        "en": "Nondisplaced transverse fracture of the distal right ulnar shaft.",
        "fa": "شکستگی عرضی بدون جابه‌جایی تنهٔ دیستال اولنای راست."
      },
      {
        "de": "Nicht dislozierte Querfraktur des mittleren linken Ulnaschafts.",
        "en": "Nondisplaced transverse fracture of the middle left ulnar shaft.",
        "fa": "شکستگی عرضی بدون جابه‌جایی تنهٔ میانی اولنای چپ."
      },
      {
        "de": "Nicht dislozierte Spiralfraktur des mittleren rechten Ulnaschafts.",
        "en": "Nondisplaced spiral fracture of the middle right ulnar shaft.",
        "fa": "شکستگی مارپیچی بدون جابه‌جایی تنهٔ میانی اولنای راست."
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Knochen, Seite, Segment und Morphologie müssen mit den beschriebenen Befunden übereinstimmen. Dislokation, Gelenke, Weichteile und Knochenqualität ergänzen die vollständige Beurteilung.",
      "en": "Bone, side, segment and morphology must match the findings described. Displacement, joints, soft tissues and bone quality complete the assessment.",
      "fa": "استخوان، سمت، سگمان و مورفولوژی باید با یافته‌های توصیف‌شده مطابقت داشته باشند. جابه‌جایی، مفاصل، بافت نرم و کیفیت استخوان ارزیابی را کامل می‌کنند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Distal verändert das vorgegebene mittlere Schaftdrittel.",
        "en": "Distal changes the specified middle shaft third.",
        "fa": "دیستال، یک‌سوم میانیِ تعیین‌شده را تغییر می‌دهد."
      },
      "C": {
        "de": "Links kehrt die angegebene rechte Seite um.",
        "en": "Left reverses the stated right side.",
        "fa": "چپ، سمت راستِ ذکرشده را معکوس می‌کند."
      },
      "D": {
        "de": "Eine Spiralfraktur windet sich um den Schaft; beschrieben ist eine Querfraktur.",
        "en": "A spiral line winds around the shaft; a transverse fracture is described.",
        "fa": "خط مارپیچی دور شفت می‌پیچد؛ در اینجا شکستگی عرضی توصیف شده است."
      }
    },
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-report-displacement"
    ]
  },
  {
    "id": "02",
    "question": {
      "de": "Textfall: Bei einer Unterarmschaftfraktur liegt das distale Fragment um eine halbe Schaftbreite dorsal des proximalen Fragments. Welche Translationsangabe ist nach der üblichen Konvention korrekt?",
      "en": "Text vignette: In a forearm shaft fracture, the distal fragment lies half a shaft width dorsal to the proximal fragment. Which translation statement follows the usual convention?",
      "fa": "سناریوی متنی: در شکستگی شفت ساعد، قطعهٔ دیستال به‌اندازهٔ نصف عرض شفت در دورسال قطعهٔ پروگزیمال قرار دارد. کدام توصیف انتقال با قرارداد معمول سازگار است؟"
    },
    "options": [
      {
        "de": "Distales Fragment um eine halbe Schaftbreite nach volar.",
        "en": "Distal fragment displaced volarly by half a shaft width.",
        "fa": "قطعهٔ دیستال به‌اندازهٔ نصف عرض شفت به ولار جابه‌جا شده است."
      },
      {
        "de": "Distales Fragment um eine halbe Schaftbreite nach dorsal.",
        "en": "Distal fragment displaced dorsally by half a shaft width.",
        "fa": "قطعهٔ دیستال به‌اندازهٔ نصف عرض شفت به دورسال جابه‌جا شده است."
      },
      {
        "de": "Proximales Fragment um eine halbe Schaftbreite nach dorsal.",
        "en": "Proximal fragment displaced dorsally by half a shaft width.",
        "fa": "قطعهٔ پروگزیمال به‌اندازهٔ نصف عرض شفت به دورسال جابه‌جا شده است."
      },
      {
        "de": "Distales Fragment um eine halbe Schaftbreite verkürzt.",
        "en": "Distal fragment shortened by half a shaft width.",
        "fa": "قطعهٔ دیستال به‌اندازهٔ نصف عرض شفت کوتاه شده است."
      }
    ],
    "correct": 1,
    "explanation": {
      "de": "Translation beschreibt die Verschiebung des distalen relativ zum proximalen Fragment. Richtung und Ausmaß bleiben getrennt von Angulation und Längenänderung.",
      "en": "Translation describes the distal fragment relative to the proximal fragment. Direction and amount are distinct from angulation and length change.",
      "fa": "انتقال، جابه‌جایی قطعهٔ دیستال نسبت به پروگزیمال را توصیف می‌کند. جهت و مقدار آن از زاویه و تغییر طول جدا هستند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Volar kehrt die vorgegebene dorsale Richtung um.",
        "en": "Volar reverses the specified dorsal direction.",
        "fa": "ولار، جهت دورسالِ تعیین‌شده را معکوس می‌کند."
      },
      "C": {
        "de": "Das Bezugsfragment wird vertauscht; relativ zum distalen läge das proximale hier volar.",
        "en": "This swaps the reference fragment; relative to the distal fragment, the proximal one would lie volarly.",
        "fa": "قطعهٔ مرجع عوض شده است؛ نسبت به قطعهٔ دیستال، قطعهٔ پروگزیمال در اینجا ولار قرار می‌گیرد."
      },
      "D": {
        "de": "Eine seitliche Verschiebung um Schaftbreiten ist keine gemessene Verkürzung entlang der Längsachse.",
        "en": "A transverse shift measured in shaft widths is not measured shortening along the long axis.",
        "fa": "جابجایی عرضی بر حسب عرض شفت، کوتاهی اندازه‌گیری‌شده در امتداد محور طولی نیست."
      }
    },
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-report-displacement"
    ]
  },
  {
    "id": "03",
    "question": {
      "de": "Textfall: Eine zusammenhängende Frakturlinie windet sich um den Knochenschaft. Welcher Morphologiebegriff passt am besten?",
      "en": "Text vignette: A continuous fracture line winds around the bone shaft. Which morphology term fits best?",
      "fa": "سناریوی متنی: یک خط شکستگی پیوسته دور شفت استخوان می‌پیچد. کدام اصطلاح مورفولوژیک مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Querfraktur",
        "en": "Transverse fracture",
        "fa": "شکستگی عرضی"
      },
      {
        "de": "Schrägfraktur mit geradlinig schrägem Verlauf",
        "en": "Oblique fracture with a straight oblique course",
        "fa": "شکستگی مایل با مسیر مستقیم و مایل"
      },
      {
        "de": "Spiralfraktur",
        "en": "Spiral fracture",
        "fa": "شکستگی مارپیچی"
      },
      {
        "de": "Segmentfraktur mit zwei getrennten Frakturebenen",
        "en": "Segmental fracture with two separate fracture levels",
        "fa": "شکستگی سگمنتال با دو سطح جداگانهٔ شکستگی"
      }
    ],
    "correct": 2,
    "explanation": {
      "de": "Eine um den Schaft gewundene Linie ist spiralig und kann zu Torsion passen. Die Morphologie allein beweist weder den Unfallablauf noch die Stabilität.",
      "en": "A line winding around the shaft is spiral and may fit torsion. Morphology alone proves neither the injury mechanism nor stability.",
      "fa": "خطی که دور شفت می‌پیچد مارپیچی است و می‌تواند با پیچش سازگار باشد. مورفولوژی به‌تنهایی نه روند حادثه و نه پایداری را اثبات می‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Bei einer Querfraktur verläuft die Linie annähernd rechtwinklig zur Schaftachse.",
        "en": "A transverse line runs approximately perpendicular to the shaft axis.",
        "fa": "خط عرضی تقریباً عمود بر محور شفت است."
      },
      "B": {
        "de": "Eine einfache schräge Linie windet sich nicht wie die beschriebene Linie um den Schaft.",
        "en": "A simple oblique line does not wind around the shaft as described.",
        "fa": "خط مایل ساده مانند خط توصیف‌شده دور شفت نمی‌پیچد."
      },
      "D": {
        "de": "Segmental verlangt einen zwischen getrennten Frakturebenen isolierten Schaftabschnitt.",
        "en": "Segmental requires a shaft segment isolated between separate fracture levels.",
        "fa": "سگمنتال مستلزم بخش شفت جداشده میان سطوح مجزای شکستگی است."
      }
    },
    "source": "MSK.pdf · physical pp.2–4 (printed pp.1–3)",
    "sources": [
      "MSK.pdf · physical pp.2–4 (printed pp.1–3)"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3,
          4
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-load-morphology"
    ]
  },
  {
    "id": "04",
    "question": {
      "de": "Textfall: Zwei vollständige, voneinander getrennte Schaftfrakturen begrenzen ein größeres zirkumferenzielles Zwischenfragment. Wie wird dieses Muster beschrieben?",
      "en": "Text vignette: Two complete, separate shaft fractures enclose a sizeable circumferential intermediate segment. How is this pattern described?",
      "fa": "سناریوی متنی: دو شکستگی کامل و جداگانهٔ شفت، قطعهٔ میانی بزرگی را در تمام محیط استخوان جدا کرده‌اند. این الگو چگونه توصیف می‌شود؟"
    },
    "options": [
      {
        "de": "Schrägfraktur mit seitlichem Biegungskeil",
        "en": "Oblique fracture with a lateral bending wedge",
        "fa": "شکستگی مایل با گوهٔ خمشی جانبی"
      },
      {
        "de": "Impaktionsfraktur mit verkeilten Bruchenden",
        "en": "Impacted fracture with interlocked fracture ends",
        "fa": "شکستگی درهم‌رفته با انتهای درهم‌گیرشده"
      },
      {
        "de": "Avulsionsfraktur eines Ansatzfragments",
        "en": "Avulsion of an attachment fragment",
        "fa": "کندگی قطعهٔ محل اتصال"
      },
      {
        "de": "Stück- beziehungsweise Segmentfraktur",
        "en": "Segmental fracture",
        "fa": "شکستگی سگمنتال"
      }
    ],
    "correct": 3,
    "explanation": {
      "de": "Zwei getrennte Frakturebenen isolieren ein Schaftsegment. Dessen Weichteilansätze und Blutversorgung verdienen besondere Beachtung; die Form allein zeigt nicht, wie gut es perfundiert ist.",
      "en": "Two separate fracture levels isolate a shaft segment. Its soft-tissue attachments and blood supply need attention; morphology alone does not show how well it is perfused.",
      "fa": "دو سطح جداگانهٔ شکستگی، بخشی از شفت را جدا می‌کنند. اتصال‌های بافت نرم و خون‌رسانی آن اهمیت ویژه دارند؛ شکل به‌تنهایی میزان خون‌رسانی را نشان نمی‌دهد."
    },
    "wrongExplanations": {
      "A": {
        "de": "Ein Biegungskeil ist ein zusätzliches keilförmiges Fragment, kein ringsum abgegrenztes Schaftsegment zwischen zwei Ebenen.",
        "en": "A bending wedge is an additional wedge-shaped fragment, not a circumferential shaft segment between two levels.",
        "fa": "گوهٔ خمشی قطعهٔ اضافی گوه‌ای است، نه بخش کامل شفت میان دو سطح."
      },
      "B": {
        "de": "Impaktion bezeichnet ineinandergetriebene Bruchenden, nicht das hier isolierte Zwischenstück.",
        "en": "Impaction means fracture ends driven into one another, not the isolated intermediate segment here.",
        "fa": "درهم‌رفتگی یعنی فرو رفتن انتهای شکستگی در یکدیگر، نه قطعهٔ میانی جداشدهٔ این سناریو."
      },
      "C": {
        "de": "Eine Avulsion betrifft ein unter Zug abgelöstes Sehnen- oder Bandansatzfragment.",
        "en": "Avulsion concerns a tendon or ligament attachment fragment pulled off by traction.",
        "fa": "کندگی مربوط به قطعهٔ اتصال تاندون یا رباط است که با کشش جدا می‌شود."
      }
    },
    "source": "https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/intact-segmental/orif-compression-plating",
    "sources": [
      "https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/intact-segmental/orif-compression-plating"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3,
          4
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-load-morphology"
    ]
  },
  {
    "id": "05",
    "question": {
      "de": "Textfall: Bei ausgeprägter Osteoporose entsteht unter gewöhnlicher Alltagsbelastung eine Fraktur; eine fokale Knochenläsion ist nicht beschrieben. Welcher Belastungstyp passt am besten?",
      "en": "Text vignette: With marked osteoporosis, a fracture occurs during ordinary daily loading; no focal bone lesion is described. Which loading-related type fits best?",
      "fa": "سناریوی متنی: در پوکی استخوان شدید، شکستگی هنگام بارگذاری معمول روزمره رخ می‌دهد؛ ضایعهٔ کانونی استخوان توصیف نشده است. کدام نوع مرتبط با بار مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Insuffizienzfraktur",
        "en": "Insufficiency fracture",
        "fa": "شکستگی ناکفایتی"
      },
      {
        "de": "Ermüdungsfraktur normalen Knochens",
        "en": "Fatigue fracture of normal bone",
        "fa": "شکستگی خستگی استخوان طبیعی"
      },
      {
        "de": "Fraktur durch eine fokal destruktive Läsion",
        "en": "Fracture through a focal destructive lesion",
        "fa": "شکستگی از میان ضایعهٔ تخریبی کانونی"
      },
      {
        "de": "Akute Fraktur nach direkter Hochenergieeinwirkung",
        "en": "Acute fracture after direct high-energy impact",
        "fa": "شکستگی حاد پس از ضربهٔ مستقیم پرانرژی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Normale Last auf geschwächtem Knochen entspricht einer Insuffizienzfraktur. ACR verwendet Stressfraktur als Oberbegriff für Ermüdungs- und Insuffizienzfrakturen; Belastung und Knochenqualität präzisieren die Untergruppe.",
      "en": "Normal loading of weakened bone fits an insufficiency fracture. ACR uses stress fracture as an umbrella for fatigue and insufficiency; loading and bone quality specify the subtype.",
      "fa": "بار طبیعی بر استخوان ضعیف با شکستگی ناکفایتی سازگار است. ACR شکستگی استرسی را عنوان کلی خستگی و ناکفایتی می‌داند؛ بار و کیفیت استخوان زیرگروه را مشخص می‌کنند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ermüdung meint wiederholte Überlastung eines grundsätzlich normalen Knochens; hier ist die Knochenqualität geschwächt.",
        "en": "Fatigue means repeated overload of otherwise normal bone; bone quality is weakened here.",
        "fa": "خستگی به اضافه‌بار تکراری استخوان اساساً طبیعی اشاره دارد؛ در اینجا کیفیت استخوان ضعیف است."
      },
      "C": {
        "de": "Dafür müsste eine fokale Läsion als zusätzlicher Befund beschrieben werden; Osteoporose allein ist keine solche Läsion.",
        "en": "A focal lesion would need to be described; osteoporosis alone is not such a lesion.",
        "fa": "برای این توصیف باید ضایعهٔ کانونی ذکر شود؛ پوکی استخوان به‌تنهایی چنین ضایعه‌ای نیست."
      },
      "D": {
        "de": "Eine direkte Hochenergieeinwirkung ist im Fall nicht angegeben; beschrieben ist gewöhnliche Belastung.",
        "en": "Direct high-energy impact is not stated; the case describes ordinary loading.",
        "fa": "ضربهٔ مستقیم پرانرژی ذکر نشده؛ سناریو بار معمول را توصیف می‌کند."
      }
    },
    "source": "https://acsearch.acr.org/docs/69435/narrative/",
    "sources": [
      "https://acsearch.acr.org/docs/69435/narrative/"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          2
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-load-morphology"
    ]
  },
  {
    "id": "06",
    "question": {
      "de": "Textfall: Nach deutlicher Steigerung des Lauftrainings entwickelt eine Person mit zuvor normalem Knochen eine belastungsabhängige Fraktur. Welcher Begriff beschreibt diesen Belastungstyp am präzisesten?",
      "en": "Text vignette: After a substantial increase in running training, a person with previously normal bone develops a load-related fracture. Which term most precisely describes this loading-related type?",
      "fa": "سناریوی متنی: پس از افزایش چشمگیر تمرین دویدن، فردی با استخوان قبلاً طبیعی دچار شکستگی مرتبط با بار می‌شود. کدام اصطلاح این نوع را دقیق‌تر توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Insuffizienzfraktur geschwächten Knochens",
        "en": "Insufficiency fracture of weakened bone",
        "fa": "شکستگی ناکفایتی استخوان ضعیف"
      },
      {
        "de": "Ermüdungsfraktur durch repetitive Überlastung",
        "en": "Fatigue fracture from repetitive overload",
        "fa": "شکستگی خستگی بر اثر اضافه‌بار تکراری"
      },
      {
        "de": "Pathologische Fraktur durch eine fokale Läsion",
        "en": "Pathological fracture through a focal lesion",
        "fa": "شکستگی پاتولوژیک از میان ضایعهٔ کانونی"
      },
      {
        "de": "Avulsionsfraktur durch akuten Ansatzabriss",
        "en": "Avulsion fracture from an acute attachment injury",
        "fa": "شکستگی کندگی بر اثر آسیب حاد محل اتصال"
      }
    ],
    "correct": 1,
    "explanation": {
      "de": "Repetitive Überlastung normalen Knochens ist eine Ermüdungsfraktur. Stressfraktur ist in ACR-Terminologie der breitere Oberbegriff; er allein trennt Ermüdung und Insuffizienz nicht.",
      "en": "Repetitive overload of normal bone is a fatigue fracture. In ACR terminology stress fracture is the broader umbrella and does not by itself distinguish fatigue from insufficiency.",
      "fa": "اضافه‌بار تکراری استخوان طبیعی شکستگی خستگی است. در اصطلاح ACR، شکستگی استرسی عنوان کلی‌تر است و به‌تنهایی خستگی را از ناکفایتی جدا نمی‌کند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Insuffizienz setzt eine verringerte Belastbarkeit des Knochens voraus; der Fall nennt normalen Knochen und gesteigerte Last.",
        "en": "Insufficiency requires reduced bone strength; the case specifies normal bone and increased loading.",
        "fa": "ناکفایتی مستلزم کاهش تحمل استخوان است؛ سناریو استخوان طبیعی و افزایش بار را ذکر می‌کند."
      },
      "C": {
        "de": "Eine fokal destruktive Läsion ist ein anderer erklärungsbedürftiger Befund und hier nicht beschrieben.",
        "en": "A focal destructive lesion is a different finding requiring explanation and is not described here.",
        "fa": "ضایعهٔ تخریبی کانونی یافتهٔ دیگری است که نیاز به توضیح دارد و اینجا ذکر نشده است."
      },
      "D": {
        "de": "Ein akuter Zug mit abgelöstem Ansatzfragment ist ein anderes Verletzungsmuster als die repetitive Überlastung.",
        "en": "Acute traction with an avulsed attachment fragment is a different pattern from repetitive overload.",
        "fa": "کشش حاد با قطعهٔ کنده‌شدهٔ محل اتصال، الگویی متفاوت از اضافه‌بار تکراری است."
      }
    },
    "source": "https://acsearch.acr.org/docs/69435/narrative/",
    "sources": [
      "https://acsearch.acr.org/docs/69435/narrative/"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          2
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-load-morphology"
    ]
  },
  {
    "id": "07",
    "question": {
      "de": "Textfall: Neben einer Tibiafraktur besteht eine kleine Hautwunde. Im Röntgen ist kein Weichteilgas sichtbar. Welcher nächste Schritt ist für die Einordnung der Offenheit am besten begründet?",
      "en": "Text vignette: A small skin wound lies near a tibial fracture. No soft-tissue gas is visible on radiographs. Which next step best establishes whether the injury is open?",
      "fa": "سناریوی متنی: زخم پوستی کوچکی نزدیک شکستگی تیبیا وجود دارد. گاز بافت نرم در رادیوگرافی دیده نمی‌شود. کدام اقدام بعدی برای تعیین بازبودن آسیب موجه‌تر است؟"
    },
    "options": [
      {
        "de": "Den geschlossenen Frakturstatus anhand des fehlenden Gases dokumentieren.",
        "en": "Document a closed fracture based on absent gas.",
        "fa": "شکستگی را بر اساس نبود گاز، بسته ثبت کنید."
      },
      {
        "de": "Zunächst eine CT zum Gasnachweis vor der Wundbeurteilung anfordern.",
        "en": "Request CT for gas detection before assessing the wound.",
        "fa": "پیش از ارزیابی زخم، CT برای یافتن گاز درخواست کنید."
      },
      {
        "de": "Den Verdacht unmittelbar kommunizieren und die Wunde klinisch beurteilen lassen.",
        "en": "Communicate suspicion immediately and arrange clinical wound assessment.",
        "fa": "شک را فوراً اطلاع دهید و ارزیابی بالینی زخم را پیگیری کنید."
      },
      {
        "de": "Die Offenheit bei der nächsten radiologischen Verlaufskontrolle einordnen.",
        "en": "Determine openness at the next radiographic follow-up.",
        "fa": "بازبودن را در نوبت بعدی پیگیری رادیوگرافیک تعیین کنید."
      }
    ],
    "correct": 2,
    "explanation": {
      "de": "Eine offene Fraktur hat eine Verbindung zwischen Fraktur beziehungsweise Hämatom und Außenwelt. Diese wird klinisch beurteilt; fehlendes Gas schließt sie nicht aus. Der Verdacht darf die dringliche klinische Abklärung nicht verzögern.",
      "en": "An open fracture communicates between the fracture or its haematoma and the external environment. This is assessed clinically; absent gas does not exclude it. Suspected openness requires prompt clinical evaluation.",
      "fa": "در شکستگی باز، شکستگی یا هماتوم آن با محیط بیرون ارتباط دارد. این موضوع بالینی ارزیابی می‌شود؛ نبود گاز آن را رد نمی‌کند. شک به بازبودن نیازمند ارزیابی فوری بالینی است."
    },
    "wrongExplanations": {
      "A": {
        "de": "Gas kann fehlen; seine Abwesenheit ersetzt keine Beurteilung der Wundverbindung.",
        "en": "Gas may be absent; its absence does not replace assessment of wound communication.",
        "fa": "گاز ممکن است وجود نداشته باشد؛ نبود آن جای ارزیابی ارتباط زخم را نمی‌گیرد."
      },
      "B": {
        "de": "Eine CT-Gassuche ist keine Voraussetzung, bevor der konkrete Wundverdacht klinisch abgeklärt wird.",
        "en": "CT gas detection is not a prerequisite for assessing the actual wound suspicion clinically.",
        "fa": "جست‌وجوی گاز با CT شرط ارزیابی بالینی شک مشخص به ارتباط زخم نیست."
      },
      "D": {
        "de": "Eine spätere Bildkontrolle beantwortet die jetzt dringliche klinische Frage nicht rechtzeitig.",
        "en": "Later imaging does not answer the urgent current clinical question in time.",
        "fa": "پیگیری تصویری بعدی به پرسش فوری فعلی در زمان مناسب پاسخ نمی‌دهد."
      }
    },
    "source": "https://www.icmr.gov.in/icmrobject/uploads/STWs/1726645314_9_open_fracture.pdf",
    "sources": [
      "https://www.icmr.gov.in/icmrobject/uploads/STWs/1726645314_9_open_fracture.pdf"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-joint-soft-tissue"
    ]
  },
  {
    "id": "08",
    "question": {
      "de": "Textfall: An einer intraartikulären Fraktur liegen benachbarte Gelenkfragmente 4 mm auseinander; ihre Gelenkflächen unterscheiden sich in der Höhe um 2 mm. Welche Messangabe passt?",
      "en": "Text vignette: Adjacent articular fracture fragments are separated by 4 mm; their articular surfaces differ in height by 2 mm. Which measurement statement fits?",
      "fa": "سناریوی متنی: قطعات مجاور شکستگی داخل مفصل ۴ میلی‌متر از هم فاصله دارند؛ سطح مفصلی آن‌ها ۲ میلی‌متر اختلاف ارتفاع دارد. کدام توصیف اندازه‌گیری مناسب است؟"
    },
    "options": [
      {
        "de": "Gelenkstufe 4 mm und Frakturspalt an der Gelenkfläche 2 mm.",
        "en": "Articular step 4 mm and fracture gap 2 mm.",
        "fa": "پلهٔ مفصلی ۴ و فاصلهٔ شکستگی ۲ میلی‌متر."
      },
      {
        "de": "Verkürzung 4 mm und Gelenkstufe 2 mm.",
        "en": "Shortening 4 mm and articular step 2 mm.",
        "fa": "کوتاهی ۴ و پلهٔ مفصلی ۲ میلی‌متر."
      },
      {
        "de": "Frakturspalt an der Gelenkfläche 4 mm und Gelenkstufe 4 mm.",
        "en": "Fracture gap 4 mm and articular step 4 mm.",
        "fa": "فاصلهٔ شکستگی ۴ و پلهٔ مفصلی ۴ میلی‌متر."
      },
      {
        "de": "Frakturspalt an der Gelenkfläche 4 mm und Gelenkstufe 2 mm.",
        "en": "Fracture gap 4 mm and articular step 2 mm.",
        "fa": "فاصلهٔ شکستگی ۴ و پلهٔ مفصلی ۲ میلی‌متر."
      }
    ],
    "correct": 3,
    "explanation": {
      "de": "Spalt beschreibt den Abstand zwischen Fragmenten an der Gelenkfläche; Stufe den Höhenversatz der Gelenkfläche. Beide getrennt in Millimetern berichten. Daraus folgt ohne Gelenk-, Patienten- und Verletzungskontext keine pauschale OP-Schwelle.",
      "en": "Gap is separation between fragments at the articular surface; step is the surface height offset. Report each in millimetres. These values alone do not establish a universal surgical threshold without joint, patient and injury context.",
      "fa": "فاصله، جدایی قطعات در سطح مفصل و پله، اختلاف ارتفاع سطح مفصلی است. هرکدام جداگانه به میلی‌متر گزارش شوند. بدون زمینهٔ مفصل، بیمار و آسیب، این اعداد آستانهٔ عمومی جراحی تعیین نمی‌کنند."
    },
    "wrongExplanations": {
      "A": {
        "de": "Die Werte werden vertauscht: 4 mm ist die Trennung, 2 mm der Höhenversatz.",
        "en": "The values are reversed: 4 mm is separation and 2 mm the height offset.",
        "fa": "اعداد جابه‌جا شده‌اند: ۴ میلی‌متر فاصله و ۲ میلی‌متر اختلاف ارتفاع است."
      },
      "B": {
        "de": "Der lokale Gelenkspalt ist keine gemessene Verkürzung des Knochens entlang seiner Längsachse.",
        "en": "A local articular fracture gap is not measured shortening along the bone axis.",
        "fa": "فاصلهٔ موضعی شکستگی مفصلی، کوتاهی اندازه‌گیری‌شده در محور طولی استخوان نیست."
      },
      "C": {
        "de": "Der Höhenversatz beträgt laut Fall 2 mm; 4 mm bezeichnet den Abstand der Fragmente.",
        "en": "The case gives a height offset of 2 mm; 4 mm is fragment separation.",
        "fa": "اختلاف ارتفاع در سناریو ۲ میلی‌متر است؛ ۴ میلی‌متر فاصلهٔ قطعات است."
      }
    },
    "source": "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
    "sources": [
      "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-joint-soft-tissue"
    ]
  },
  {
    "id": "09",
    "question": {
      "de": "Textfall: Ein distales Unterarmfragment ist um eine halbe Schaftbreite nach dorsal versetzt und um 15° dorsal geneigt; die Frakturenden überreiten sich um 6 mm. Welche Beschreibung verwendet die Apex-Konvention korrekt?",
      "en": "Text vignette: A distal forearm fragment is displaced half a shaft width dorsally and tilted 15° dorsally; the fracture ends overlap by 6 mm. Which description correctly uses the apex convention?",
      "fa": "سناریوی متنی: قطعهٔ دیستال ساعد به‌اندازهٔ نصف عرض شفت به دورسال جابه‌جا و ۱۵ درجه به دورسال متمایل است؛ انتهای شکستگی ۶ میلی‌متر همپوشانی دارند. کدام توصیف قرارداد رأس را درست به‌کار می‌برد؟"
    },
    "options": [
      {
        "de": "½ Schaftbreite dorsal, 15° Apex-volar, 6 mm Verkürzung.",
        "en": "Half a shaft width dorsal, 15° apex-volar, 6 mm shortening.",
        "fa": "نصف عرض شفت دورسال، ۱۵ درجه رأس ولار، ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "½ Schaftbreite dorsal, 15° Apex-dorsal, 6 mm Verkürzung.",
        "en": "Half a shaft width dorsal, 15° apex-dorsal, 6 mm shortening.",
        "fa": "نصف عرض شفت دورسال، ۱۵ درجه رأس دورسال، ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "½ Schaftbreite volar, 15° Apex-volar, 6 mm Verkürzung.",
        "en": "Half a shaft width volar, 15° apex-volar, 6 mm shortening.",
        "fa": "نصف عرض شفت ولار، ۱۵ درجه رأس ولار، ۶ میلی‌متر کوتاهی."
      },
      {
        "de": "½ Schaftbreite dorsal, 15° Apex-volar, 6 mm Diastase.",
        "en": "Half a shaft width dorsal, 15° apex-volar, 6 mm distraction.",
        "fa": "نصف عرض شفت دورسال، ۱۵ درجه رأس ولار، ۶ میلی‌متر دیاستاز."
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Dorsale Neigung des distalen Fragments entspricht einem volaren Apex. Überreiten verkürzt; Translation und Angulation beschreiben unterschiedliche Größen.",
      "en": "Dorsal tilt of the distal fragment corresponds to a volar apex. Overlap shortens the bone; translation and angulation are different measurements.",
      "fa": "تمایل دورسال قطعهٔ دیستال با رأس ولار متناظر است. همپوشانی موجب کوتاهی می‌شود؛ انتقال و زاویه دو اندازهٔ متفاوت‌اند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Apex und Neigung des distalen Fragments zeigen hier in entgegengesetzte Richtungen.",
        "en": "The apex and distal-fragment tilt point in opposite directions here.",
        "fa": "در اینجا رأس و تمایل قطعهٔ دیستال در جهت‌های مخالف‌اند."
      },
      "C": {
        "de": "Die vorgegebene Translation ist dorsal; volar kehrt sie um.",
        "en": "The specified translation is dorsal; volar reverses it.",
        "fa": "انتقال تعیین‌شده دورسال است؛ ولار آن را معکوس می‌کند."
      },
      "D": {
        "de": "Überreitende Enden bedeuten Verkürzung; Diastase meint Auseinanderweichen.",
        "en": "Overlapping ends mean shortening; distraction means separation.",
        "fa": "همپوشانی انتهاها به‌معنای کوتاهی است؛ دیاستاز به جدایی اشاره دارد."
      }
    },
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-report-displacement"
    ]
  },
  {
    "id": "10",
    "question": {
      "de": "Textfall: Röntgenaufnahmen zeigen eine komplexe Tibiaplateaufraktur. Für die Planung sollen knöcherne Fragmente und die eingedrückte Gelenkfläche räumlich abgegrenzt werden. Welche Untersuchung beantwortet diese Frage am direktesten?",
      "en": "Text vignette: Radiographs show a complex tibial plateau fracture. Planning requires spatial mapping of bony fragments and the depressed articular surface. Which examination most directly answers this question?",
      "fa": "سناریوی متنی: رادیوگرافی شکستگی پیچیدهٔ پلاتوی تیبیا را نشان می‌دهد. برای برنامه‌ریزی باید قطعات استخوانی و سطح مفصلی فرورفته از نظر فضایی مشخص شوند. کدام بررسی مستقیم‌تر پاسخ می‌دهد؟"
    },
    "options": [
      {
        "de": "MRT zur Analyse von Menisken und Bändern",
        "en": "MRI to analyse menisci and ligaments",
        "fa": "MRI برای بررسی منیسک‌ها و رباط‌ها"
      },
      {
        "de": "Dünnschicht-CT mit multiplanaren Rekonstruktionen",
        "en": "Thin-section CT with multiplanar reconstructions",
        "fa": "CT با برش نازک و بازسازی‌های چندصفحه‌ای"
      },
      {
        "de": "Gezielte ergänzende Röntgen-Schrägaufnahmen",
        "en": "Targeted additional oblique radiographs",
        "fa": "نماهای مایل هدفمند تکمیلی رادیوگرافی"
      },
      {
        "de": "Gezielte Sonografie der gelenknahen Weichteile",
        "en": "Targeted ultrasound of periarticular soft tissues",
        "fa": "سونوگرافی هدفمند بافت نرم اطراف مفصل"
      }
    ],
    "correct": 1,
    "explanation": {
      "de": "CT stellt knöcherne Fragmentbeziehungen und die Gelenkfläche ohne Projektionsüberlagerung dar. MRT kann zusätzliche Weichteilfragen beantworten; die Wahl richtet sich nach der offenen Frage.",
      "en": "CT depicts bony fragment relationships and the articular surface without projectional overlap. MRI may answer additional soft-tissue questions; selection follows the remaining question.",
      "fa": "CT روابط قطعات استخوانی و سطح مفصل را بدون همپوشانی نما نشان می‌دهد. MRI می‌تواند به پرسش‌های تکمیلی بافت نرم پاسخ دهد؛ انتخاب تابع پرسش باقی‌مانده است."
    },
    "wrongExplanations": {
      "A": {
        "de": "MRT ist für Menisken und Bänder nützlich; hier steht die genaue knöcherne Fragmentkarte im Vordergrund.",
        "en": "MRI is useful for menisci and ligaments; the specific priority here is bony fragment mapping.",
        "fa": "MRI برای منیسک و رباط مفید است؛ اولویت مشخص اینجا نقشهٔ قطعات استخوانی است."
      },
      "C": {
        "de": "Zusatzprojektionen können ergänzen, lösen die komplexe räumliche Überlagerung aber weniger vollständig als CT auf.",
        "en": "Additional projections may help but resolve complex spatial overlap less completely than CT.",
        "fa": "نماهای تکمیلی کمک می‌کنند، اما همپوشانی پیچیدهٔ فضایی را به‌اندازهٔ CT برطرف نمی‌کنند."
      },
      "D": {
        "de": "Sonografie kann oberflächennahe Weichteile prüfen, bildet die komplexe knöcherne Gelenkfragmentierung aber nicht vollständig ab.",
        "en": "Ultrasound can assess superficial soft tissues but does not fully map complex bony articular fragmentation.",
        "fa": "سونوگرافی بافت نرم سطحی را بررسی می‌کند، اما نقشهٔ کامل قطعات پیچیدهٔ استخوانی مفصل را نمی‌دهد."
      }
    },
    "source": "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
    "sources": [
      "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-targeted-imaging"
    ]
  },
  {
    "id": "11",
    "question": {
      "de": "Textfall: Bei einer erwachsenen Läuferin besteht trotz negativer Röntgenaufnahmen weiter hoher Verdacht auf eine Stressfraktur. Eine zeitnahe Klärung ist erforderlich; eine MRT-Kontraindikation besteht nicht. Welche Untersuchung ist nach ACR am besten geeignet?",
      "en": "Text vignette: An adult runner has persistent high suspicion of a stress fracture despite negative radiographs. Prompt clarification is needed and there is no MRI contraindication. Which examination is most appropriate under ACR criteria?",
      "fa": "سناریوی متنی: در دوندهٔ بزرگسال، با وجود رادیوگرافی منفی، شک زیاد به شکستگی استرسی باقی است. روشن‌شدن سریع وضعیت لازم است و منع MRI وجود ندارد. طبق ACR کدام بررسی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "CT der betroffenen Region ohne Kontrastmittel",
        "en": "Noncontrast CT of the affected region",
        "fa": "CT ناحیهٔ درگیر بدون مادهٔ حاجب"
      },
      {
        "de": "Röntgenkontrolle der betroffenen Region nach 10–14 Tagen",
        "en": "Repeat radiographs of the affected region in 10–14 days",
        "fa": "رادیوگرافی مجدد ناحیهٔ درگیر پس از ۱۰ تا ۱۴ روز"
      },
      {
        "de": "MRT der betroffenen Region ohne Kontrastmittel",
        "en": "Noncontrast MRI of the affected region",
        "fa": "MRI ناحیهٔ درگیر بدون مادهٔ حاجب"
      },
      {
        "de": "Sonografie der schmerzhaften Region",
        "en": "Ultrasound of the painful region",
        "fa": "سونوگرافی ناحیهٔ دردناک"
      }
    ],
    "correct": 2,
    "explanation": {
      "de": "ACR bewertet MRT ohne Kontrastmittel nach negativen oder unklaren Röntgenaufnahmen bei vermuteter Stressfraktur als üblicherweise geeignet. MRT zeigt Knochenmarkreaktion und gegebenenfalls eine Frakturlinie; Ödem allein ist kein spezifischer Frakturnachweis.",
      "en": "ACR rates noncontrast MRI usually appropriate for suspected stress fracture after negative or indeterminate radiographs. MRI shows marrow reaction and sometimes a fracture line; oedema alone is not specific proof of fracture.",
      "fa": "ACR پس از رادیوگرافی منفی یا نامشخص در شک به شکستگی استرسی، MRI بدون مادهٔ حاجب را معمولاً مناسب می‌داند. MRI واکنش مغز استخوان و در صورت وجود خط شکستگی را نشان می‌دهد؛ ادم به‌تنهایی اثبات اختصاصی شکستگی نیست."
    },
    "wrongExplanations": {
      "A": {
        "de": "CT kann je nach Fragestellung eine Alternative sein; für die zeitnahe Erfassung einer okkulten Stressverletzung ist hier MRT bevorzugt.",
        "en": "CT may be an alternative for selected questions; MRI is preferred here for prompt assessment of an occult stress injury.",
        "fa": "CT برای برخی پرسش‌ها می‌تواند جایگزین باشد؛ برای بررسی سریع آسیب استرسی مخفی در اینجا MRI ترجیح دارد."
      },
      "B": {
        "de": "Eine Verlaufskontrolle kann in passenden Situationen sinnvoll sein, klärt den hier zeitnah benötigten Befund jedoch später.",
        "en": "Repeat radiographs can be appropriate in selected circumstances but provide later clarification than required here.",
        "fa": "رادیوگرافی پیگیری در شرایط مناسب مفید است، اما دیرتر از زمان لازم در این سناریو پاسخ می‌دهد."
      },
      "D": {
        "de": "Sonografie ersetzt die Knochenmarkbeurteilung nicht und ist in dieser ACR-Konstellation üblicherweise nicht geeignet.",
        "en": "Ultrasound does not replace marrow assessment and is usually not appropriate in this ACR scenario.",
        "fa": "سونوگرافی جای ارزیابی مغز استخوان را نمی‌گیرد و در این وضعیت ACR معمولاً مناسب نیست."
      }
    },
    "source": "https://acsearch.acr.org/docs/69435/narrative/",
    "sources": [
      "https://acsearch.acr.org/docs/69435/narrative/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC4367232/"
    ],
    "sourceRefs": [],
    "learningGoalIds": [
      "msk13-targeted-imaging"
    ]
  },
  {
    "id": "12",
    "question": {
      "de": "Textfall: Eine Fraktur verläuft nach geringer Gewalteinwirkung durch eine umschriebene osteolytische Knochenläsion. Welche Einordnung sollte der Befund hervorheben?",
      "en": "Text vignette: After minor trauma, a fracture passes through a circumscribed osteolytic bone lesion. Which interpretation should the report highlight?",
      "fa": "سناریوی متنی: پس از ترومای خفیف، شکستگی از میان ضایعهٔ لیتیک محدود استخوان عبور می‌کند. گزارش کدام تفسیر را باید برجسته کند؟"
    },
    "options": [
      {
        "de": "Insuffizienzfraktur bei diffuser Osteoporose",
        "en": "Insufficiency fracture from diffuse osteoporosis",
        "fa": "شکستگی ناکفایتی ناشی از پوکی استخوان منتشر"
      },
      {
        "de": "Ermüdungsfraktur durch repetitive Last auf normalem Knochen",
        "en": "Fatigue fracture from repetitive loading of normal bone",
        "fa": "شکستگی خستگی بر اثر بار تکراری بر استخوان طبیعی"
      },
      {
        "de": "Avulsionsfraktur am Sehnen- oder Bandansatz",
        "en": "Avulsion fracture at a tendon or ligament attachment",
        "fa": "شکستگی کندگی در محل اتصال تاندون یا رباط"
      },
      {
        "de": "Fokal-pathologische Fraktur bei noch ungeklärter Läsionsart",
        "en": "Focal pathological fracture with undetermined lesion aetiology",
        "fa": "شکستگی پاتولوژیک کانونی با نوع ضایعهٔ هنوز نامشخص"
      }
    ],
    "correct": 3,
    "explanation": {
      "de": "Die fokale Läsion muss zusätzlich zur Fraktur beschrieben und abgeklärt werden. Osteolyse allein beweist weder Metastase noch eine andere bestimmte Ursache; die PDF verwendet dafür den fokal-pathologischen Begriff.",
      "en": "The focal lesion must be reported and investigated in addition to the fracture. Osteolysis alone proves neither metastasis nor another specific cause; the PDF uses the focal pathological-fracture term.",
      "fa": "ضایعهٔ کانونی باید علاوه بر شکستگی گزارش و بررسی شود. استئولیز به‌تنهایی نه متاستاز و نه علت مشخص دیگری را اثبات می‌کند؛ PDF اصطلاح پاتولوژیک کانونی را برای این وضعیت به‌کار می‌برد."
    },
    "wrongExplanations": {
      "A": {
        "de": "Diffuse Osteoporose erklärt die beschriebene umschriebene Osteolyse nicht hinreichend.",
        "en": "Diffuse osteoporosis does not adequately explain the circumscribed osteolysis described.",
        "fa": "پوکی استخوان منتشر، استئولیز محدود توصیف‌شده را به‌خوبی توضیح نمی‌دهد."
      },
      "B": {
        "de": "Der Knochen ist am Frakturort durch eine fokale Läsion verändert; es handelt sich nicht um den beschriebenen normalen Ermüdungsknochen.",
        "en": "Bone at the fracture site is altered by a focal lesion, rather than the normal bone of the fatigue scenario.",
        "fa": "استخوان محل شکستگی با ضایعهٔ کانونی تغییر کرده و استخوان طبیعیِ سناریوی خستگی نیست."
      },
      "C": {
        "de": "Ein ausgerissenes Ansatzfragment ist nicht das beschriebene Muster einer Fraktur durch eine osteolytische Läsion.",
        "en": "An avulsed attachment fragment is not the pattern of fracture through an osteolytic lesion described here.",
        "fa": "قطعهٔ کنده‌شدهٔ محل اتصال، الگوی توصیف‌شدهٔ شکستگی از میان ضایعهٔ لیتیک نیست."
      }
    },
    "source": "MSK.pdf · physical pp.2–4 (printed pp.1–3)",
    "sources": [
      "MSK.pdf · physical pp.2–4 (printed pp.1–3)"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          2
        ]
      }
    ],
    "learningGoalIds": [
      "msk13-load-morphology"
    ]
  }
]
export const FRAKTUR_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang=>[lang,FQ.map(seed=>({id:`frakturbeschreibung-${lang}-${seed.id}`,tags:['frakturbeschreibung','trauma','msk',...(['05','06','11'].includes(seed.id)?['stressfrakturen']:[])],fach:'msk',question:seed.question[lang],options:seed.options.map((v,i)=>({id:'ABCD'[i],text:v[lang]})),correct:'ABCD'[seed.correct],explanation:seed.explanation[lang],wrongExplanations:Object.fromEntries(Object.entries(seed.wrongExplanations).map(([id,v])=>[id,v[lang]])),source:seed.source,sources:seed.sources,sourceRefs:seed.sourceRefs,learningGoalIds:seed.learningGoalIds}))]))

const FF = [
  {
    "id": "system",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Systematik",
      "en": "System",
      "fa": "سیستم"
    },
    "front": {
      "de": "Welche sechs Schritte bilden die kompakte Kernbeschreibung, und was ergänzt sie?",
      "en": "Which six steps make up the concise core description, and what supplements it?",
      "fa": "شش مرحله اصلی در توصیف فشرده کدام‌اند و چه مواردی آن را تکمیل می‌کنند؟"
    },
    "answer": {
      "de": "Knochen/Seite, Segment, Morphologie, Dislokation, Gelenk und Weichteile.",
      "en": "Bone/side, segment, morphology, displacement, joint and soft tissues.",
      "fa": "استخوان/سمت، سگمان، مورفولوژی، جابه‌جایی، مفصل و بافت نرم."
    },
    "explanation": {
      "de": "Diese sechs Kernschritte strukturieren den Befund. Knochenqualität und Begleitverletzungen sind zusätzliche Prüfpunkte.",
      "en": "These six core steps structure the report. Bone quality and associated injuries are additional checks.",
      "fa": "این شش مرحله اصلی گزارش را ساختار می‌دهند. کیفیت استخوان و آسیب‌های همراه موارد تکمیلی برای بررسی‌اند."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html"
    ],
    "sourceRefs": []
  },
  {
    "id": "location",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Lokalisation",
      "en": "Location",
      "fa": "محل"
    },
    "front": {
      "de": "Wie wird die Lokalisation einer Fraktur vollständig angegeben?",
      "en": "How is fracture location described completely?",
      "fa": "محل شکستگی چگونه کامل توصیف می‌شود؟"
    },
    "answer": {
      "de": "Knochen, Seite und Segment beziehungsweise Gelenkregion.",
      "en": "Bone, side and segment or joint region.",
      "fa": "استخوان، سمت و سگمان یا ناحیه مفصلی."
    },
    "explanation": {
      "de": "„Tibiafraktur“ allein ist unzureichend. Proximal/metaphysär, Schaftdrittel oder distal sowie eine mögliche Gelenkbeteiligung müssen genannt werden.",
      "en": "“Tibial fracture” alone is insufficient. State proximal/metaphyseal, shaft third or distal location and any joint involvement.",
      "fa": "«شکستگی تیبیا» کافی نیست؛ پروگزیمال/متافیز، یک‌سوم شفت یا دیستال و درگیری مفصل باید ذکر شود."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/index.html"
    ],
    "sourceRefs": []
  },
  {
    "id": "distal",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Dislokation",
      "en": "Displacement",
      "fa": "جابه‌جایی"
    },
    "front": {
      "de": "Nach welcher Konvention wird die Richtung einer Frakturdislokation beschrieben?",
      "en": "What convention is used to name fracture displacement direction?",
      "fa": "جهت جابه‌جایی شکستگی طبق چه قراردادی توصیف می‌شود؟"
    },
    "answer": {
      "de": "Distales Fragment relativ zum proximalen Fragment.",
      "en": "Distal fragment relative to the proximal fragment.",
      "fa": "قطعه دیستال نسبت به قطعه پروگزیمال."
    },
    "explanation": {
      "de": "Bei Translation wird das distale relativ zum proximalen Fragment beschrieben. Für Angulation die verwendete Konvention ausdrücklich benennen: distale Neigung oder Apex-Richtung.",
      "en": "Translation describes the distal relative to the proximal fragment. For angulation, explicitly state the convention: distal-fragment tilt or apex direction.",
      "fa": "در انتقال، قطعهٔ دیستال نسبت به پروگزیمال توصیف می‌شود. در زاویه، قرارداد را صریح ذکر کنید: تمایل قطعهٔ دیستال یا جهت رأس."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": []
  },
  {
    "id": "translation",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Dislokation",
      "en": "Displacement",
      "fa": "جابه‌جایی"
    },
    "front": {
      "de": "Wie sollte die Translation einer Fraktur im Befund quantifiziert werden?",
      "en": "How should fracture translation be quantified in a report?",
      "fa": "جابه‌جایی انتقالی شکستگی در گزارش چگونه کمی‌سازی می‌شود؟"
    },
    "answer": {
      "de": "Richtung plus Millimeter oder Anteil der Schaftbreite.",
      "en": "Direction plus millimetres or fraction of shaft width.",
      "fa": "جهت همراه میلی‌متر یا نسبت عرض شفت."
    },
    "explanation": {
      "de": "Beispielsweise „distales Fragment um eine halbe Schaftbreite nach dorsal“. Nur „disloziert“ liefert keine ausreichende Information.",
      "en": "For example, “distal fragment displaced dorsally by half a shaft width.” “Displaced” alone is insufficient.",
      "fa": "مثلاً «قطعه دیستال به اندازه نصف عرض شفت به دورسال». واژه جابه‌جا به‌تنهایی کافی نیست."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": []
  },
  {
    "id": "angulation",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Dislokation",
      "en": "Displacement",
      "fa": "جابه‌جایی"
    },
    "front": {
      "de": "Wie wird die Angulation einer Fraktur eindeutig beschrieben?",
      "en": "How is fracture angulation described unambiguously?",
      "fa": "زاویه شکستگی چگونه بدون ابهام توصیف می‌شود؟"
    },
    "answer": {
      "de": "Gradzahl und Apex-Richtung oder Richtung des distalen Fragments.",
      "en": "Angle and apex direction or distal-fragment direction.",
      "fa": "درجه و جهت رأس یا جهت قطعه دیستال."
    },
    "explanation": {
      "de": "Die Apex-Konvention vermeidet Missverständnisse: „15° Apex-volar“ bedeutet, dass die Spitze nach volar zeigt und das distale Fragment entsprechend entgegengesetzt geneigt ist.",
      "en": "The apex convention avoids ambiguity: “15° apex-volar” means the apex points volarly and the distal fragment tilts oppositely.",
      "fa": "قرارداد رأس ابهام را کم می‌کند: «۱۵ درجه رأس ولار» یعنی رأس به ولار و قطعه دیستال در جهت مقابل متمایل است."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": []
  },
  {
    "id": "stress",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Mechanismus",
      "en": "Mechanism",
      "fa": "مکانیسم"
    },
    "front": {
      "de": "Was unterscheidet eine Ermüdungsfraktur von einer Insuffizienzfraktur?",
      "en": "What distinguishes a fatigue fracture from an insufficiency fracture?",
      "fa": "تفاوت شکستگی خستگی و ناکفایتی چیست؟"
    },
    "answer": {
      "de": "Überlastung normalen Knochens versus normale Last auf geschwächtem Knochen.",
      "en": "Overload of normal bone versus normal load on weakened bone.",
      "fa": "اضافه‌بار استخوان طبیعی در برابر بار طبیعی بر استخوان ضعیف."
    },
    "explanation": {
      "de": "Beide können initial radiografisch okkult sein. ACR verwendet Stressfraktur als Oberbegriff für beide; Belastungsanamnese und Knochenqualität unterscheiden die Untergruppen.",
      "en": "Both may initially be radiographically occult. ACR uses stress fracture as an umbrella for both; loading history and bone quality distinguish the subtypes.",
      "fa": "هر دو ممکن است ابتدا در رادیوگرافی مخفی باشند. ACR شکستگی استرسی را عنوان کلی هر دو می‌داند؛ شرح بارگذاری و کیفیت استخوان زیرگروه‌ها را جدا می‌کنند."
    },
    "learningGoalIds": [
      "msk13-load-morphology"
    ],
    "source": "https://acsearch.acr.org/docs/69435/narrative/",
    "sources": [
      "https://acsearch.acr.org/docs/69435/narrative/"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          2
        ]
      }
    ]
  },
  {
    "id": "pathologic",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Mechanismus",
      "en": "Mechanism",
      "fa": "مکانیسم"
    },
    "front": {
      "de": "Wann spricht man von einer pathologischen Fraktur?",
      "en": "When is a fracture considered pathological?",
      "fa": "چه زمانی شکستگی پاتولوژیک نامیده می‌شود؟"
    },
    "answer": {
      "de": "Wenn sie durch eine fokale knochenzerstörende Läsion verläuft.",
      "en": "When it passes through a focal bone-destructive lesion.",
      "fa": "وقتی از میان ضایعه تخریب‌کننده موضعی استخوان عبور کند."
    },
    "explanation": {
      "de": "Hier ist die fokal-pathologische Verwendung gemeint: etwa Metastase, Myelom, Knochenzyste oder Osteomyelitis. Die Läsion selbst beschreiben; das Frakturmuster beweist ihre Ursache nicht.",
      "en": "This uses the focal pathological-fracture meaning: for example metastasis, myeloma, bone cyst or osteomyelitis. Describe the lesion itself; fracture morphology does not prove its cause.",
      "fa": "اینجا کاربرد پاتولوژیک کانونی منظور است؛ مانند متاستاز، میلوما، کیست استخوان یا استئومیلیت. خود ضایعه را توصیف کنید؛ مورفولوژی شکستگی علت آن را اثبات نمی‌کند."
    },
    "learningGoalIds": [
      "msk13-load-morphology"
    ],
    "source": "MSK.pdf · physical pp.2–4 (printed pp.1–3)",
    "sources": [
      "MSK.pdf · physical pp.2–4 (printed pp.1–3)"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          2
        ]
      }
    ]
  },
  {
    "id": "spiral",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Morphologie",
      "en": "Morphology",
      "fa": "مورفولوژی"
    },
    "front": {
      "de": "Welcher Mechanismus verursacht typischerweise eine Spiralfraktur?",
      "en": "What mechanism typically causes a spiral fracture?",
      "fa": "کدام مکانیسم معمولاً شکستگی مارپیچی ایجاد می‌کند؟"
    },
    "answer": {
      "de": "Torsion beziehungsweise Rotation.",
      "en": "Torsion or rotation.",
      "fa": "پیچش یا چرخش."
    },
    "explanation": {
      "de": "Die Frakturlinie windet sich durch die Rotationskraft um den Knochenschaft. Der Mechanismus kann auf weitere Verletzungen entlang der Rotationskette hinweisen.",
      "en": "Rotational force makes the line wind around the shaft. The mechanism may suggest additional injuries along the rotational chain.",
      "fa": "نیروی چرخشی خط شکستگی را دور شفت می‌پیچاند و می‌تواند به آسیب‌های دیگر در زنجیره چرخشی اشاره کند."
    },
    "learningGoalIds": [
      "msk13-load-morphology"
    ],
    "source": "MSK.pdf · physical pp.2–4 (printed pp.1–3)",
    "sources": [
      "MSK.pdf · physical pp.2–4 (printed pp.1–3)"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3,
          4
        ]
      }
    ]
  },
  {
    "id": "segmental",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Morphologie",
      "en": "Morphology",
      "fa": "مورفولوژی"
    },
    "front": {
      "de": "Was ist eine Stück- oder Segmentfraktur?",
      "en": "What is a segmental fracture?",
      "fa": "شکستگی سگمنتال چیست؟"
    },
    "answer": {
      "de": "Zwei Frakturlinien isolieren ein Zwischenfragment.",
      "en": "Two fracture lines isolate an intermediate segment.",
      "fa": "دو خط شکستگی یک قطعه میانی را جدا می‌کنند."
    },
    "explanation": {
      "de": "Das isolierte Fragment kann durchblutungsgefährdet sein; Weichteile und Gesamtverletzung gezielt beurteilen.",
      "en": "The isolated segment may have compromised blood supply; assess the soft tissues and full injury pattern.",
      "fa": "قطعه جداشده ممکن است از نظر خون‌رسانی در خطر باشد؛ بافت نرم و کل الگوی آسیب را هدفمند بررسی کنید."
    },
    "learningGoalIds": [
      "msk13-load-morphology"
    ],
    "source": "https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/intact-segmental/orif-compression-plating",
    "sources": [
      "https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/tibial-shaft/intact-segmental/orif-compression-plating"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3,
          4
        ]
      }
    ]
  },
  {
    "id": "avulsion",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Morphologie",
      "en": "Morphology",
      "fa": "مورفولوژی"
    },
    "front": {
      "de": "Was beschreibt eine Avulsionsfraktur?",
      "en": "What is an avulsion fracture?",
      "fa": "شکستگی کندگی چیست؟"
    },
    "answer": {
      "de": "Knöcherner Ausriss am Ansatz einer Sehne oder eines Bandes.",
      "en": "Bone fragment pulled from a tendon or ligament attachment.",
      "fa": "کنده‌شدن قطعه استخوانی از محل اتصال تاندون یا رباط."
    },
    "explanation": {
      "de": "Die Fragmentlage zeigt häufig die Zugrichtung. Wichtig ist, die zugehörige Sehne oder das Band und eine mögliche Funktionsstörung mitzubeurteilen.",
      "en": "Fragment location often indicates traction direction. Assess the associated tendon or ligament and possible functional impairment.",
      "fa": "محل قطعه اغلب جهت کشش را نشان می‌دهد. تاندون یا رباط مربوط و اختلال عملکرد نیز باید بررسی شود."
    },
    "learningGoalIds": [
      "msk13-load-morphology"
    ],
    "source": "MSK.pdf · physical pp.2–4 (printed pp.1–3)",
    "sources": [
      "MSK.pdf · physical pp.2–4 (printed pp.1–3)"
    ],
    "sourceRefs": [
      {
        "file": "C:/Users/Drham/OneDrive/Desktop/Lerncore/MSK.pdf",
        "physicalPages": [
          3,
          4
        ]
      }
    ]
  },
  {
    "id": "joint",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Gelenk",
      "en": "Joint",
      "fa": "مفصل"
    },
    "front": {
      "de": "Welche Angaben sind bei einer intraartikulären Fraktur besonders wichtig?",
      "en": "Which details are especially important in an intra-articular fracture?",
      "fa": "در شکستگی داخل مفصل چه مواردی مهم است؟"
    },
    "answer": {
      "de": "Gelenkfläche, Stufe, Spalt und Subluxation/Luxation.",
      "en": "Joint surface, step, gap and subluxation/dislocation.",
      "fa": "سطح مفصل، پله، فاصله و ساب‌لوکساسیون/دررفتگی."
    },
    "explanation": {
      "de": "Diese Parameter bestimmen die Gelenkkongruenz und beeinflussen Arthroserisiko und Operationsplanung. CT ist bei komplexer Überlagerung häufig erforderlich.",
      "en": "These parameters determine congruity and affect arthritis risk and surgical planning. CT is often required for complex overlap.",
      "fa": "این پارامترها تطابق مفصل را توصیف می‌کنند و بر خطر آرتروز و برنامه‌ریزی جراحی اثر می‌گذارند. در پیچیدگی اغلب CT لازم است."
    },
    "learningGoalIds": [
      "msk13-joint-soft-tissue"
    ],
    "source": "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
    "sources": [
      "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC9038308/"
    ],
    "sourceRefs": []
  },
  {
    "id": "open",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Weichteile",
      "en": "Soft tissues",
      "fa": "بافت نرم"
    },
    "front": {
      "de": "Kann eine offene Fraktur allein radiologisch sicher diagnostiziert oder ausgeschlossen werden?",
      "en": "Can an open fracture be definitively diagnosed or excluded by imaging alone?",
      "fa": "آیا شکستگی باز فقط با تصویربرداری قطعی تشخیص یا رد می‌شود؟"
    },
    "answer": {
      "de": "Nein, sie ist klinisch definiert.",
      "en": "No, it is clinically defined.",
      "fa": "خیر، تعریف بالینی دارد."
    },
    "explanation": {
      "de": "Gas oder ein Fremdkörper können den Verdacht stärken, fehlen aber möglicherweise. Bei Verdacht muss der Befund sofort klinisch kommuniziert werden.",
      "en": "Gas or foreign body may support suspicion but can be absent. Suspicion must be communicated immediately.",
      "fa": "گاز یا جسم خارجی می‌تواند شک را تقویت کند اما ممکن است وجود نداشته باشد. شک باید فوراً اطلاع داده شود."
    },
    "learningGoalIds": [
      "msk13-joint-soft-tissue"
    ],
    "source": "https://www.icmr.gov.in/icmrobject/uploads/STWs/1726645314_9_open_fracture.pdf",
    "sources": [
      "https://www.icmr.gov.in/icmrobject/uploads/STWs/1726645314_9_open_fracture.pdf"
    ],
    "sourceRefs": []
  },
  {
    "id": "ct",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Wann ist CT bei einer Fraktur besonders hilfreich?",
      "en": "When is CT particularly useful for a fracture?",
      "fa": "چه زمانی CT در شکستگی به‌ویژه مفید است؟"
    },
    "answer": {
      "de": "Bei komplexer oder intraartikulärer Fraktur und zur OP-Planung.",
      "en": "For complex or intra-articular fracture and surgical planning.",
      "fa": "در شکستگی پیچیده یا داخل مفصل و برنامه جراحی."
    },
    "explanation": {
      "de": "CT zeigt Fragmente, Gelenkstufe, Impression und Rotationsstellung ohne projektionsbedingte Überlagerung. Es ergänzt, aber ersetzt nicht immer die initialen Röntgenaufnahmen.",
      "en": "CT shows fragments, articular step, depression and rotation without projectional overlap. It complements but does not always replace initial radiographs.",
      "fa": "CT قطعات، پله مفصلی، فرورفتگی و چرخش را بدون همپوشانی نشان می‌دهد و مکمل رادیوگرافی اولیه است."
    },
    "learningGoalIds": [
      "msk13-targeted-imaging"
    ],
    "source": "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/",
    "sources": [
      "https://www.orthoinfo.org/en/diseases--conditions/fractures-of-the-proximal-tibia-shinbone/"
    ],
    "sourceRefs": []
  },
  {
    "id": "mri",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Wann ist MRT bei klinischem Frakturverdacht trotz negativem Röntgen sinnvoll?",
      "en": "When is MRI useful when fracture is clinically suspected despite negative radiographs?",
      "fa": "چه زمانی با شک بالینی شکستگی و رادیوگرافی منفی MRI مفید است؟"
    },
    "answer": {
      "de": "Bei Verdacht auf okkulte, Stress- oder Insuffizienzfraktur.",
      "en": "For suspected occult, stress or insufficiency fracture.",
      "fa": "در شک به شکستگی مخفی، استرس یا ناکفایتی."
    },
    "explanation": {
      "de": "MRT zeigt Knochenmarkreaktion und gegebenenfalls eine Frakturlinie sowie Begleitverletzungen. Knochenmarködem allein beweist keine Fraktur; Muster und klinischer Kontext sind erforderlich.",
      "en": "MRI shows marrow reaction, a fracture line when present and associated injuries. Marrow oedema alone does not prove fracture; pattern and clinical context are required.",
      "fa": "MRI واکنش مغز استخوان، خط شکستگی در صورت وجود و آسیب‌های همراه را نشان می‌دهد. ادم مغز استخوان به‌تنهایی شکستگی را ثابت نمی‌کند؛ الگو و زمینهٔ بالینی لازم‌اند."
    },
    "learningGoalIds": [
      "msk13-targeted-imaging"
    ],
    "source": "https://acsearch.acr.org/docs/69435/narrative/",
    "sources": [
      "https://acsearch.acr.org/docs/69435/narrative/",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC4367232/"
    ],
    "sourceRefs": []
  },
  {
    "id": "report",
    "topicId": "frakturbeschreibung",
    "category": {
      "de": "Befundung",
      "en": "Reporting",
      "fa": "گزارش"
    },
    "front": {
      "de": "Welche Formulierung ist besser als „dislozierte Fraktur“?",
      "en": "What wording is better than “displaced fracture”?",
      "fa": "چه عبارتی بهتر از «شکستگی جابه‌جا» است؟"
    },
    "answer": {
      "de": "Richtung und Ausmaß von Translation, Winkel und Längenänderung.",
      "en": "Direction and magnitude of translation, angle and length change.",
      "fa": "جهت و مقدار جابه‌جایی انتقالی، زاویه و تغییر طول."
    },
    "explanation": {
      "de": "Eine quantitative Beschreibung ist reproduzierbar und für Reposition sowie Verlaufskontrolle nutzbar, beispielsweise „½ Schaftbreite dorsal, 15° Apex-volar, 6 mm Verkürzung“.",
      "en": "Quantitative wording is reproducible and useful for reduction and follow-up, e.g. “half a shaft width dorsal, 15° apex-volar, 6 mm shortening.”",
      "fa": "توصیف کمی قابل تکرار و برای جااندازی و پیگیری مفید است؛ مثلاً نصف عرض شفت دورسال، ۱۵ درجه رأس ولار، ۶ میلی‌متر کوتاهی."
    },
    "learningGoalIds": [
      "msk13-report-displacement"
    ],
    "source": "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html",
    "sources": [
      "https://www.ortho-teaching.feinberg.northwestern.edu/XRreading/general/angulationdisplacementdislocation.html"
    ],
    "sourceRefs": []
  }
]
export const FRAKTUR_FLASHCARDS=FF.map((item,index)=>({...item,id:`frakturbeschreibung-${String(index+1).padStart(2,'0')}-${item.id}`,topicId:'frakturbeschreibung'}))
export const FRAKTUR_STRESS_FLASHCARDS=FRAKTUR_FLASHCARDS.filter(card=>card.id.endsWith('-stress')).map(card=>({...card,id:'stressfrakturen-basics',topicId:'stressfrakturen'}))
export const FRAKTUR_STRESS_FLASHCARD_TOPIC={id:'stressfrakturen',area:'MSK',chapter:'Traumatologie & Frakturen',icon:'🦴',iconImage:'/fach/msk.png',color:'#f97316',href:'/flashcards/stressfrakturen',title:L('Stressfrakturen','Stress fractures','شکستگی‌های استرسی'),subtitle:L('Belastung · Knochenqualität · Ermüdung vs. Insuffizienz','Loading · bone quality · fatigue vs insufficiency','بارگذاری · کیفیت استخوان · خستگی در برابر ناکفایتی')}
export const FRAKTUR_FLASHCARD_TOPIC={id:'frakturbeschreibung',area:'MSK',chapter:'Traumatologie & Frakturen',icon:'🦴',iconImage:'/fach/msk.png',color:'#f97316',href:'/flashcards/frakturbeschreibung',title:L('Frakturbeschreibung','Fracture description','توصیف شکستگی'),subtitle:L('Systematik · Morphologie · Dislokation · Gelenk · Befundung','System · morphology · displacement · joint · reporting','سیستم · مورفولوژی · جابه‌جایی · مفصل · گزارش')}
