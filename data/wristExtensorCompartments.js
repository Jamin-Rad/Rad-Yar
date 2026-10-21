const L = (de, en, fa) => ({ de, en, fa })

export const WRIST_EXTENSOR_COMPARTMENTS_LESSON = {
  id: 'sehnenpathologien-hand',
  title: L('Strecksehnenfächer am Handgelenk', 'Wrist extensor compartments', 'کمپارتمان‌های اکستانسور مچ دست'),
  hero: '/educational/wrist-extensor-compartments/hero.svg',
  heroAlt: L(
    'Nichtdiagnostisches Orientierungsschema der sechs dorsalen Strecksehnenfächer am Handgelenk mit Radius, Ulna und Sehnengruppen.',
    'Non-diagnostic orientation schematic of the six dorsal wrist extensor compartments, with radius, ulna and tendon groups.',
    'شماتیک جهت‌یابی غیرتشخیصی از شش کمپارتمان اکستانسور پشتی مچ دست، همراه با رادیوس، اولنا و گروه‌های تاندونی.'
  ),
  scope: L(
    'Diese kurze Orientierungseinheit deckt MSK.pdf, PDF-Seite 41 (Druckseite 40) ab. Das gezeigte MRT stammt aus der bereitgestellten PDF und dient nur zur räumlichen Orientierung; Sequenzparameter werden nicht angegeben.',
    'This brief orientation lesson covers MSK.pdf, PDF page 41 (printed page 40). The displayed MRI comes from the supplied PDF and is used only for spatial orientation; sequence parameters are not provided.',
    'این درس کوتاه جهت‌یابی، صفحهٔ ۴۱ PDF (صفحهٔ چاپی ۴۰) از MSK.pdf را پوشش می‌دهد. MRI نمایش‌داده‌شده از PDF ارائه‌شده است و فقط برای جهت‌یابی فضایی به‌کار می‌رود؛ پارامترهای سکانس ذکر نشده‌اند.'
  ),
  sections: [
    {
      id: 'axial-orientation', icon: 'orientation',
      title: L('Wo liegen die Fächer im axialen Bild?', 'Where are the compartments on an axial image?', 'کمپارتمان‌ها در تصویر محوری کجا قرار دارند؟'),
      lead: L(
        'Beginnen Sie mit Radius und Ulna. Der radiale Processus styloideus lokalisiert Fach I; das Lister-Tuberkulum trennt Fach II von III und lenkt die EPL-Sehne um den Radius. Lesen Sie die römischen Zahlen im Bild gemeinsam mit der Tabelle.',
        'Start with the radius and ulna. The radial styloid localizes compartment I; Lister tubercle separates II from III and redirects the EPL tendon around the radius. Read the Roman numerals in the image together with the table.',
        'ابتدا رادیوس و اولنا را مشخص کنید. زائدهٔ استایلوئید رادیوس کمپارتمان I را مکان‌یابی می‌کند؛ تکمهٔ لیستر کمپارتمان‌های II و III را جدا می‌کند و مسیر EPL را به دور رادیوس تغییر می‌دهد. اعداد رومی تصویر را همراه جدول بخوانید.'
      ),
      image: '/msk/hand/extensor-compartments-pdf-p41-axial-mri.png',
      imageAlt: L(
        'Axiales MRT des Handgelenks mit Markierungen der Fächer I–VI und den Sehnenkürzeln APL, EPB, ECRL, ECRB, EPL, EDC, EIP, EDM und ECU um Radius und Ulna.',
        'Labelled axial wrist MRI: compartments I–VI and tendons APL, EPB, ECRL, ECRB, EPL, EDC, EIP, EDM and ECU are marked around the radius and ulna.',
        'برش MRI محوریِ برچسب‌گذاری‌شده از مچ دست: کمپارتمان‌های I تا VI و تاندون‌های APL، EPB، ECRL، ECRB، EPL، EDC، EIP، EDM و ECU پیرامون رادیوس و اولنا مشخص شده‌اند.'
      ),
      imageCaption: L(
        'MSK.pdf، صفحهٔ PDF ۴۱ (چاپی ۴۰)، نمای محوری MRI برای جهت‌یابی کمپارتمان‌ها. این تصویر نقشهٔ آناتومیک است، نه کیس پاتولوژی.',
        'MSK.pdf, PDF p.41 (printed p.40), axial MRI for compartment orientation. This is an anatomic map, not a pathology case.',
        'MSK.pdf، صفحهٔ PDF ۴۱ (چاپی ۴۰)، MRI محوری برای جهت‌یابی کمپارتمان‌ها. این تصویر نقشهٔ آناتومیک است، نه کیس پاتولوژیک.'
      ),
      source: L('MSK.pdf, PDF-S. 41 / Druck-S. 40.', 'MSK.pdf, PDF p. 41 / printed p. 40.', 'MSK.pdf، صفحهٔ PDF ۴۱ / چاپی ۴۰.'),
    },
    {
      id: 'tendon-map', icon: 'map',
      title: L('Welche Sehnen verlaufen durch die sechs Fächer?', 'Which tendons pass through the six compartments?', 'کدام تاندون‌ها از شش کمپارتمان عبور می‌کنند؟'),
      lead: L(
        'Ordnen Sie jede Sehnengruppe ihrer Nummer zu. Die Lagebeziehungen dienen als Orientierung; sie ersetzen keine vollständige Beurteilung weiterer Strukturen.',
        'Match each tendon group to its number. The spatial relationships are orientation landmarks; they do not replace assessment of other structures.',
        'هر گروه تاندونی را با شمارهٔ کمپارتمان متناظر کنید. روابط مکانی نشانه‌های جهت‌یابی‌اند و جای ارزیابی سایر ساختارها را نمی‌گیرند.'
      ),
      rows: [
        [L('Fach', 'Compartment', 'کمپارتمان'), L('Sehnen', 'Tendons', 'تاندون‌ها'), L('Orientierungsmerkmal', 'Landmark', 'نشانهٔ جهت‌یابی')],
        [L('I · lateral', 'I · lateral', 'I · لترال'), L('APL · abductor pollicis longus; EPB · extensor pollicis brevis', 'APL · abductor pollicis longus; EPB · extensor pollicis brevis', 'APL · abductor pollicis longus؛ EPB · extensor pollicis brevis'), L('Direkt am radialen Processus styloideus.', 'At the radial styloid.', 'در مجاورت زائدهٔ استایلوئید رادیوس.')],
        [L('II · radial', 'II · radial', 'II · رادیال'), L('ECRL · extensor carpi radialis longus; ECRB · extensor carpi radialis brevis', 'ECRL · extensor carpi radialis longus; ECRB · extensor carpi radialis brevis', 'ECRL · extensor carpi radialis longus؛ ECRB · extensor carpi radialis brevis'), L('Durch das Lister-Tuberkulum von Fach III getrennt.', 'Separated from compartment III by Lister tubercle.', 'به‌وسیلهٔ تکمهٔ لیستر از کمپارتمان III جدا می‌شود.')],
        [L('III · dorsal interosseous', 'III · dorsal interosseous', 'III · بین‌استخوانی پشتی'), L('EPL · extensor pollicis longus', 'EPL · extensor pollicis longus', 'EPL · extensor pollicis longus'), L('EPL schwenkt um das Lister-Tuberkulum nach radial.', 'EPL turns around Lister tubercle toward the radial side.', 'EPL به دور تکمهٔ لیستر به سمت رادیال می‌چرخد.')],
        [L('IV · central', 'IV · central', 'IV · مرکزی'), L('EDC · extensor digitorum; EIP · extensor indicis', 'EDC · extensor digitorum; EIP · extensor indicis', 'EDC · extensor digitorum؛ EIP · extensor indicis'), L('Größtes Fach.', 'Largest compartment.', 'بزرگ‌ترین کمپارتمان.')],
        [L('V · ulnar-radial', 'V · ulnar-radial', 'V · اولنار-رادیال'), L('EDM · extensor digiti minimi', 'EDM · extensor digiti minimi', 'EDM · extensor digiti minimi'), L('Über dem distalen Radioulnargelenk.', 'Over the distal radioulnar joint.', 'روی مفصل رادیواولنار دیستال.')],
        [L('VI · ulnar', 'VI · ulnar', 'VI · اولنار'), L('ECU · extensor carpi ulnaris', 'ECU · extensor carpi ulnaris', 'ECU · extensor carpi ulnaris'), L('Eigene Rinne am Ulnastyloid.', 'Separate groove at the ulnar styloid.', 'شیار اختصاصی در زائدهٔ استایلوئید اولنا.')],
      ],
      note: L(
        'Die Reihenfolge auf dem Bild verankern: Fach I radial, Fach VI ulnar. Die Bezeichnungen “lateral”, “radial”, “central” und “ulnar” folgen hier der Quelltabelle.',
        'Anchor the sequence on the image: compartment I is radial and VI is ulnar. “Lateral,” “radial,” “central,” and “ulnar” follow the source table terminology.',
        'ترتیب را در تصویر تثبیت کنید: کمپارتمان I در سمت رادیال و VI در سمت اولنار است. اصطلاحات «لترال»، «رادیال»، «مرکزی» و «اولنار» مطابق جدول منبع‌اند.'
      ),
      task: L('Welcher Sehnenkomplex liegt im Fach VI am Ulnastyloid?', 'Which tendon lies in compartment VI at the ulnar styloid?', 'کدام تاندون در کمپارتمان VI در سطح استایلوئید اولنا قرار دارد؟'),
      options: [
        L('ECU · M. extensor carpi ulnaris', 'ECU · extensor carpi ulnaris', 'ECU · extensor carpi ulnaris'),
        L('EPL · M. extensor pollicis longus', 'EPL · extensor pollicis longus', 'EPL · extensor pollicis longus'),
        L('ECRL und ECRB', 'ECRL and ECRB', 'ECRL و ECRB'),
      ],
      answer: 0,
      feedback: [
        L('Richtig. Fach VI enthält die ECU-Sehne in einer eigenen Rinne am Ulnastyloid.', 'Correct. Compartment VI contains the ECU tendon in its own groove at the ulnar styloid.', 'درست است. کمپارتمان VI تاندون ECU را در شیار اختصاصی روی استایلوئید اولنا دربر می‌گیرد.'),
        L('Fach III enthält die EPL-Sehne, die am Lister-Tuberkulum um den Radius zieht.', 'Compartment III contains EPL, which turns around the radius at Lister tubercle.', 'کمپارتمان III تاندون EPL را دربر می‌گیرد که در سطح تکمهٔ لیستر به دور رادیوس می‌چرخد.'),
        L('ECRL und ECRB verlaufen gemeinsam im Fach II.', 'ECRL and ECRB run together in compartment II.', 'ECRL و ECRB با هم در کمپارتمان II قرار دارند.'),
      ],
      source: L('MSK.pdf, PDF-S. 41 / Druck-S. 40.', 'MSK.pdf, PDF p. 41 / printed p. 40.', 'MSK.pdf، صفحهٔ PDF ۴۱ / چاپی ۴۰.'),
    },
  ],
  summary: [
    L('Fach I liegt radial am Processus styloideus radii und enthält APL und EPB.', 'Compartment I lies radially at the radial styloid and contains APL and EPB.', 'کمپارتمان I در سمت رادیال، کنار استایلوئید رادیوس قرار دارد و APL و EPB را دربر می‌گیرد.'),
    L('Lister-Tuberkulum trennt Fach II und III; EPL schwenkt dort um den Radius.', 'Lister tubercle separates compartments II and III; EPL turns around the radius there.', 'تکمهٔ لیستر کمپارتمان‌های II و III را جدا می‌کند؛ EPL در همان‌جا به دور رادیوس می‌چرخد.'),
    L('Fach IV enthält EDC/EIP; Fach V enthält EDM; Fach VI enthält ECU.', 'Compartment IV contains EDC/EIP; V contains EDM; VI contains ECU.', 'کمپارتمان IV شامل EDC/EIP، کمپارتمان V شامل EDM و کمپارتمان VI شامل ECU است.'),
    L('Im axialen Bild zuerst Radius, Ulna und römische Kompartmentnummern orientieren.', 'On axial imaging, orient the radius, ulna and Roman compartment numbers first.', 'در تصویر محوری ابتدا رادیوس، اولنا و شماره‌های رومی کمپارتمان‌ها را پیدا کنید.'),
  ],
  references: [
    { url: null, label: L('MSK.pdf, PDF-S. 41 (Druck-S. 40); Text, Tabelle und MRT-Abbildung visuell geprüft.', 'MSK.pdf, PDF p. 41 (printed p. 40); text, table and MRI figure visually inspected.', 'MSK.pdf، صفحهٔ PDF ۴۱ (چاپی ۴۰)؛ متن، جدول و شکل MRI به‌صورت دیداری بررسی شدند.') },
  ],
}
