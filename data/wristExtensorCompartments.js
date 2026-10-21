const L = (de, en, fa) => ({ de, en, fa })

export const WRIST_EXTENSOR_COMPARTMENTS_LESSON = {
  id: 'sehnenpathologien-hand',
  title: L('Handgelenk: Knochen und Strecksehnenfächer', 'Wrist: carpal bones and extensor compartments', 'مچ دست: استخوان‌های کارپ و کمپارتمان‌های اکستانسور'),
  hero: '/educational/wrist-extensor-compartments/hero.svg',
  heroAlt: L(
    'Nichtdiagnostisches Orientierungsschema der sechs dorsalen Strecksehnenfächer am Handgelenk mit Radius, Ulna und Sehnengruppen.',
    'Non-diagnostic orientation schematic of the six dorsal wrist extensor compartments, with radius, ulna and tendon groups.',
    'شماتیک جهت‌یابی غیرتشخیصی از شش کمپارتمان اکستانسور پشتی مچ دست، همراه با رادیوس، اولنا و گروه‌های تاندونی.'
  ),
  scope: L(
    'Diese Orientierungseinheit deckt die dorsale Handwurzelanatomie auf MSK.pdf, PDF-S. 40 (Druck-S. 39), und die Strecksehnenfächer auf PDF-S. 41 (Druck-S. 40) ab. Die Originalabbildungen dienen der anatomischen Orientierung, nicht der Pathologiediagnostik.',
    'This orientation lesson covers dorsal carpal anatomy from MSK.pdf, PDF p. 40 (printed p. 39), and the extensor compartments from PDF p. 41 (printed p. 40). The original figures support anatomic orientation, not pathology diagnosis.',
    'این درس جهت‌یابی، آناتومی پشتی کارپ را از صفحهٔ ۴۰ PDF (چاپی ۳۹) و کمپارتمان‌های اکستانسور را از صفحهٔ ۴۱ PDF (چاپی ۴۰) در MSK.pdf پوشش می‌دهد. شکل‌های اصلی برای جهت‌یابی آناتومیک‌اند، نه تشخیص پاتولوژی.'
  ),
  sections: [
    {
      id: 'carpal-orientation', icon: 'axial-orientation',
      title: L('Welche Knochen und Gelenklinien sehe ich dorsal?', 'Which bones and joint lines do I see dorsally?', 'در نمای پشتی چه استخوان‌ها و خطوط مفصلی می‌بینم؟'),
      lead: L(
        'Orientieren Sie die Handwurzel von distal nach proximal: Metakarpalia, distale Handwurzelreihe, proximale Handwurzelreihe und schließlich Radius und Ulna. Folgen Sie anschließend den farbigen Gelenklinien in der Abbildung.',
        'Orient the carpus from distal to proximal: metacarpals, distal carpal row, proximal carpal row, then radius and ulna. Next, trace the coloured joint lines in the figure.',
        'کارپ را از دیستال به پروگزیمال جهت‌یابی کنید: متاکارپ‌ها، ردیف دیستال استخوان‌های کارپ، ردیف پروگزیمال و سپس رادیوس و اولنا. بعد خطوط مفصلی رنگی شکل را دنبال کنید.'
      ),
      image: '/msk/hand/carpal-joint-lines-pdf-p40.png',
      imageAlt: L(
        'Schematische dorsale Ansicht der Handwurzel aus MSK.pdf: beschriftete Handwurzelknochen und farbige Linien für Intermetakarpal-, Karpometakarpal-, Interkarpal-, Mediokarpal- und Radiokarpalgelenke sowie das Daumensattelgelenk.',
        'Schematic dorsal view of the carpus from MSK.pdf: labelled carpal bones and coloured lines for intermetacarpal, carpometacarpal, intercarpal, midcarpal and radiocarpal joints, plus the thumb carpometacarpal joint.',
        'نمای شماتیک پشتی کارپ از MSK.pdf: استخوان‌های کارپ برچسب‌گذاری شده‌اند و خطوط رنگی مفاصل بین‌متاکارپی، کارپومتاکارپی، بین‌کارپی، میدکارپی و رادیوکارپی و نیز مفصل کارپومتاکارپی شست را نشان می‌دهند.'
      ),
      imageCaption: L(
        'MSK.pdf، PDF-S. 40 (Druck-S. 39)، dorsale Ansicht. Die farbigen Linien markieren Gelenkspalten; sie sind keine MRT-Ebenen.',
        'MSK.pdf, PDF p. 40 (printed p. 39), dorsal view. Coloured lines mark joint spaces; they are not MRI planes.',
        'MSK.pdf، صفحهٔ ۴۰ PDF (چاپی ۳۹)، نمای پشتی. خطوط رنگی فواصل مفصلی را مشخص می‌کنند و صفحه‌های MRI نیستند.'
      ),
      imageKeyTitle: L('Begriffe aus der Abbildung', 'Labels in the source figure', 'برچسب‌های شکل منبع'),
      imageKey: [
        { source: 'Intermetakarpalgelenke', label: L('Intermetakarpalgelenke', 'Intermetacarpal joints', 'مفاصل بین‌متاکارپی') },
        { source: 'Karpometakarpalgelenke II–V', label: L('Karpometakarpalgelenke II–V', 'Carpometacarpal joints II–V', 'مفاصل کارپومتاکارپی II تا V') },
        { source: 'Daumensattelgelenk', label: L('Daumensattelgelenk', 'Thumb carpometacarpal joint', 'مفصل کارپومتاکارپی شست') },
        { source: 'Interkarpalgelenke', label: L('Interkarpalgelenke', 'Intercarpal joints', 'مفاصل بین‌کارپی') },
        { source: 'distales Handgelenk · Art. mediocarpalis', label: L('distales Handgelenk · Art. mediocarpalis', 'Midcarpal joint', 'مفصل میدکارپی') },
        { source: 'proximales Handgelenk · Art. radiocarpalis', label: L('proximales Handgelenk · Art. radiocarpalis', 'Radiocarpal joint', 'مفصل رادیوکارپی') },
      ],
      task: L('Welche Knochenreihe liegt unmittelbar proximal der Metakarpalia?', 'Which carpal row lies immediately proximal to the metacarpals?', 'کدام ردیف استخوان‌های کارپ بلافاصله در سمت پروگزیمال متاکارپ‌ها قرار دارد؟'),
      options: [
        L('Die distale Handwurzelreihe', 'The distal carpal row', 'ردیف دیستال استخوان‌های کارپ'),
        L('Die proximale Handwurzelreihe', 'The proximal carpal row', 'ردیف پروگزیمال استخوان‌های کارپ'),
        L('Radius und Ulna', 'The radius and ulna', 'رادیوس و اولنا'),
      ],
      answer: 0,
      feedback: [
        L('Richtig. Trapezium, Trapezoideum, Capitatum und Hamatum bilden die distale Handwurzelreihe.', 'Correct. Trapezium, trapezoid, capitate and hamate form the distal carpal row.', 'درست است. تراپزیوم، تراپزوئید، کاپیتیت و هامیت ردیف دیستال کارپ را تشکیل می‌دهند.'),
        L('Die proximale Reihe liegt weiter proximal; in der dargestellten dorsalen Ansicht sind Scaphoideum, Lunatum und Triquetrum beschriftet.', 'The proximal row lies farther proximally; scaphoid, lunate and triquetrum are labelled in this dorsal view.', 'ردیف پروگزیمال در بالاتر قرار دارد؛ در نمای پشتی تصویر، اسکافوئید، لونیت و تری‌کوئتروم برچسب‌گذاری شده‌اند.'),
        L('Radius und Ulna liegen proximal des Radiokarpalgelenks, nicht direkt neben den Metakarpalia.', 'The radius and ulna lie proximal to the radiocarpal joint, not directly next to the metacarpals.', 'رادیوس و اولنا در سمت پروگزیمال مفصل رادیوکارپی قرار دارند و مستقیماً کنار متاکارپ‌ها نیستند.'),
      ],
      source: L('MSK.pdf, PDF-S. 40 / Druck-S. 39.', 'MSK.pdf, PDF p. 40 / printed p. 39.', 'MSK.pdf، صفحهٔ PDF ۴۰ / چاپی ۳۹.'),
    },
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
    L('Von distal nach proximal: Metakarpalia, distale Handwurzelreihe, proximale Handwurzelreihe, Radius und Ulna; anschließend die Gelenklinien verfolgen.', 'From distal to proximal: metacarpals, distal carpal row, proximal carpal row, radius and ulna; then trace the joint lines.', 'از دیستال به پروگزیمال: متاکارپ‌ها، ردیف دیستال کارپ، ردیف پروگزیمال کارپ، رادیوس و اولنا؛ سپس خطوط مفصلی را دنبال کنید.'),
    L('Fach I liegt radial am Processus styloideus radii und enthält APL und EPB.', 'Compartment I lies radially at the radial styloid and contains APL and EPB.', 'کمپارتمان I در سمت رادیال، کنار استایلوئید رادیوس قرار دارد و APL و EPB را دربر می‌گیرد.'),
    L('Lister-Tuberkulum trennt Fach II und III; EPL schwenkt dort um den Radius.', 'Lister tubercle separates compartments II and III; EPL turns around the radius there.', 'تکمهٔ لیستر کمپارتمان‌های II و III را جدا می‌کند؛ EPL در همان‌جا به دور رادیوس می‌چرخد.'),
    L('Fach IV enthält EDC/EIP; Fach V enthält EDM; Fach VI enthält ECU.', 'Compartment IV contains EDC/EIP; V contains EDM; VI contains ECU.', 'کمپارتمان IV شامل EDC/EIP، کمپارتمان V شامل EDM و کمپارتمان VI شامل ECU است.'),
    L('Im axialen Bild zuerst Radius, Ulna und römische Kompartmentnummern orientieren.', 'On axial imaging, orient the radius, ulna and Roman compartment numbers first.', 'در تصویر محوری ابتدا رادیوس، اولنا و شماره‌های رومی کمپارتمان‌ها را پیدا کنید.'),
  ],
  references: [
    { url: null, label: L('MSK.pdf, PDF-S. 40–41 (Druck-S. 39–40); Text, Labels und Abbildungen visuell geprüft.', 'MSK.pdf, PDF pp. 40–41 (printed pp. 39–40); text, labels and figures visually inspected.', 'MSK.pdf، صفحات ۴۰ تا ۴۱ (چاپی ۳۹ تا ۴۰)؛ متن، برچسب‌ها و شکل‌ها به‌صورت دیداری بررسی شدند.') },
  ],
}
