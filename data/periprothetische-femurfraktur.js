const L = (de, en, fa) => ({ de, en, fa })

export const PERIPROTHETISCHE_FEMURFRAKTUR_LESSON = {
  id: 'periprothetische-femurfraktur',
  title: L('Periprothetische Femurfrakturen: Vancouver', 'Periprosthetic femoral fractures: Vancouver', 'شکستگی اطراف پروتز فمور: ونکوور'),
  hero: '/msk/vancouver/vancouver-overview.svg',
  heroAlt: L('Schematische Hüftprothese im Femur mit markierten Regionen AG, AL, B und C', 'Schematic hip prosthesis in the femur with regions AG, AL, B and C marked', 'نمای شماتیک پروتز مفصل ران در فمور با نواحی مشخص‌شدهٔ AG، AL، B و C'),
  scope: L('Fokussierte Einheit zur bildmorphologischen Einordnung periprothetischer Femurfrakturen nach Vancouver. Die Klassifikation strukturiert die Kommunikation; konkrete Therapieentscheidungen gehören in die orthopädisch-traumatologische Beurteilung.', 'A focused unit on imaging-based classification of periprosthetic femoral fractures using Vancouver. The classification structures communication; individual treatment decisions require orthopaedic-trauma assessment.', 'این درس محدود بر طبقه‌بندی تصویربرداری شکستگی‌های اطراف پروتز فمور بر اساس ونکوور تمرکز دارد. طبقه‌بندی به سامان‌دهی گزارش کمک می‌کند؛ تصمیم درمانی مشخص به ارزیابی ارتوپدی‌ـ‌تروماتولوژی نیاز دارد.'),
  sections: [
    {
      id: 'lokalisation', icon: '⌖',
      title: L('Zuerst die Frakturlage zum Schaft', 'First locate the fracture relative to the stem', 'ابتدا محل شکستگی را نسبت به ساقه مشخص کنید'),
      lead: L('Die Vancouver-Klassifikation bezieht sich auf periprothetische Frakturen am Femur nach Hüftendoprothese. Beginnen Sie mit der Lage der Fraktur relativ zur Prothese.', 'The Vancouver classification applies to periprosthetic femoral fractures after hip arthroplasty. Start by locating the fracture relative to the prosthesis.', 'طبقه‌بندی ونکوور برای شکستگی‌های اطراف پروتز فمور پس از آرتروپلاستی مفصل ران به‌کار می‌رود. ابتدا محل شکستگی را نسبت به پروتز مشخص کنید.'),
      rows: [
        [L('AG', 'AG', 'AG'), L('Trochanter major betroffen.', 'Greater trochanter involved.', 'تروکانتر بزرگ درگیر است.')],
        [L('AL', 'AL', 'AL'), L('Trochanter minor betroffen.', 'Lesser trochanter involved.', 'تروکانتر کوچک درگیر است.')],
        [L('B', 'B', 'B'), L('Fraktur am oder unmittelbar neben dem Prothesenschaft; danach Schaftfixierung und proximalen Knochenbestand unterscheiden.', 'Fracture around or immediately adjacent to the stem; then assess stem fixation and proximal bone stock.', 'شکستگی در اطراف یا بلافاصله مجاور ساقهٔ پروتز؛ سپس پایداری ساقه و ذخیرهٔ استخوانی پروگزیمال را ارزیابی کنید.')],
        [L('C', 'C', 'C'), L('Fraktur distal der Prothesenspitze.', 'Fracture distal to the prosthetic stem tip.', 'شکستگی در دیستال نوک ساقهٔ پروتز.')],
      ],
      image: '/msk/vancouver/source-pdf-page-27-image345.jpg',
      imageAlt: L('Sechs Präparatansichten einer Hüftprothese mit markierten Vancouver-Mustern AG, AL, B1, B2, B3 und C aus MSK.pdf, physische Seite 27', 'Six specimen views of a hip prosthesis with Vancouver patterns AG, AL, B1, B2, B3 and C marked, from MSK.pdf physical p.27', 'شش نمای نمونهٔ استخوانی با پروتز ران و الگوهای ونکوور AG، AL، B1، B2، B3 و C، از MSK.pdf صفحهٔ فیزیکی ۲۷'),
      imageCaption: L('Quelle: bereitgestelltes MSK.pdf, physische S.27 (Druck-S.26), eingebettetes Bild Image345.jpg. Die Pfeile markieren Frakturen am Präparat; die Abbildungen sind keine Patienten-Röntgenaufnahmen.', 'Source: supplied MSK.pdf, physical p.27 (printed p.26), embedded image Image345.jpg. Arrows mark fractures in specimens; these are not patient radiographs.', 'منبع: MSK.pdf ارائه‌شده، صفحهٔ فیزیکی ۲۷ (چاپی ۲۶)، تصویر جاسازی‌شدهٔ Image345.jpg. پیکان‌ها شکستگی‌ها را در نمونهٔ استخوانی مشخص می‌کنند؛ این تصاویر رادیوگرافی بیماران نیستند.'),
    },
    {
      id: 'b-typen', icon: '▦',
      title: L('Bei Typ B: Schaft und Knochenbestand', 'For type B: stem fixation and bone stock', 'در نوع B: پایداری ساقه و ذخیرهٔ استخوانی'),
      lead: L('Bei einer Fraktur um den Schaft reicht die Lage allein nicht: B1, B2 und B3 unterscheiden sich durch die Fixierung des Schafts und den verbliebenen Knochenbestand.', 'For a fracture around the stem, location alone is not enough: B1, B2 and B3 are distinguished by stem fixation and remaining bone stock.', 'در شکستگی اطراف ساقه، محل به‌تنهایی کافی نیست: انواع B1، B2 و B3 با پایداری ساقه و ذخیرهٔ استخوانی باقی‌مانده از هم جدا می‌شوند.'),
      rows: [
        [L('B1', 'B1', 'B1'), L('Schaft fest; Knochenbestand ausreichend.', 'Stem well fixed; bone stock adequate.', 'ساقه محکم و ذخیرهٔ استخوانی کافی است.')],
        [L('B2', 'B2', 'B2'), L('Schaft gelockert; Knochenbestand ausreichend.', 'Stem loose; bone stock adequate.', 'ساقه لق و ذخیرهٔ استخوانی کافی است.')],
        [L('B3', 'B3', 'B3'), L('Schaft gelockert; Knochenbestand unzureichend, häufig mit ausgeprägtem proximalem Knochenverlust.', 'Stem loose; bone stock inadequate, often with substantial proximal bone loss.', 'ساقه لق و ذخیرهٔ استخوانی ناکافی است؛ اغلب با کاهش قابل‌توجه استخوان پروگزیمال.')],
      ],
      paragraphs: [
        L('Ein unauffälliger Einzelbefund am Schaft beweist keine sichere Verankerung. Voraufnahmen, Implantattyp und klinische Vorgeschichte helfen bei der Beurteilung; die definitive Einschätzung kann eine orthopädische Beurteilung erfordern.', 'A single apparently unremarkable stem finding does not prove secure fixation. Prior imaging, implant design and clinical history inform the assessment; definitive classification may require orthopaedic evaluation.', 'یک یافتهٔ منفردِ ظاهراً طبیعی در ساقه، پایداری آن را ثابت نمی‌کند. تصاویر قبلی، نوع ایمپلنت و سابقهٔ بالینی در ارزیابی کمک می‌کنند؛ طبقه‌بندی نهایی ممکن است به نظر ارتوپدی نیاز داشته باشد.'),
        L('Die PDF verknüpft B1 typischerweise mit Osteosynthese, B2 mit Revisionsendoprothese und B3 mit Revision plus Wiederherstellung des Knochenbestands. Das ist ein Orientierungsrahmen und keine individuelle Therapieanweisung: aktuelle Übersichten beschreiben auch ausgewählte Ausnahmen und alternative Verfahren.', 'The PDF links B1 typically with fixation, B2 with revision arthroplasty, and B3 with revision plus reconstruction of bone stock. This is an orientation framework, not an individual treatment instruction: current reviews also describe selected exceptions and alternatives.', 'PDF معمولاً B1 را با استئوسنتز، B2 را با آرتروپلاستی بازنگری و B3 را با بازنگری همراه بازسازی ذخیرهٔ استخوانی مرتبط می‌کند. این چارچوبی کلی است، نه دستور درمان فردی؛ مرورهای جدید استثناها و روش‌های جایگزین منتخب را نیز شرح می‌دهند.'),
      ],
      note: L('Typ C wird nach der Lage distal der Prothesenspitze eingeordnet. Die in der PDF ergänzte Aussage „Schaft stabil“ ersetzt nicht die eigenständige Beurteilung von Implantat und Frakturmuster.', 'Type C is classified by its location distal to the stem tip. The PDF’s added phrase “stable stem” does not replace a separate assessment of the implant and fracture pattern.', 'نوع C بر اساس محل دیستال نوک ساقه طبقه‌بندی می‌شود. عبارت افزودهٔ PDF دربارهٔ «پایداری ساقه» جای ارزیابی جداگانهٔ ایمپلنت و الگوی شکستگی را نمی‌گیرد.'),
    },
    {
      id: 'selbstpruefung', icon: '⌕',
      title: L('Das Muster abrufen', 'Retrieve the pattern', 'الگو را بازیابی کنید'),
      lead: L('Nutzen Sie die Reihenfolge Lage → Schaftfixierung → Knochenbestand.', 'Use the sequence location → stem fixation → bone stock.', 'از ترتیب محل ← پایداری ساقه ← ذخیرهٔ استخوانی استفاده کنید.'),
      task: L('Selbstprüfung: Eine Fraktur verläuft um den Prothesenschaft. Der Schaft ist gelockert, der proximale Knochenbestand aber ausreichend. Welche Untergruppe passt?', 'Self-check: a fracture runs around the prosthetic stem. The stem is loose, but proximal bone stock is adequate. Which subtype fits?', 'خودآزمایی: شکستگی در اطراف ساقهٔ پروتز امتداد دارد. ساقه لق است، اما ذخیرهٔ استخوانی پروگزیمال کافی است. کدام زیرگروه مناسب است؟'),
      options: [L('B1', 'B1', 'B1'), L('B2', 'B2', 'B2'), L('B3', 'B3', 'B3')], answer: 1,
      feedback: [
        L('B1 setzt einen fest sitzenden Schaft voraus.', 'B1 requires a well-fixed stem.', 'در B1 ساقه باید محکم باشد.'),
        L('Richtig: Gelockerter Schaft bei ausreichendem Knochenbestand entspricht B2.', 'Correct: a loose stem with adequate bone stock corresponds to B2.', 'درست است: ساقهٔ لق همراه ذخیرهٔ استخوانی کافی با B2 تطبیق دارد.'),
        L('B3 bezeichnet einen gelockerten Schaft bei unzureichendem Knochenbestand.', 'B3 denotes a loose stem with inadequate bone stock.', 'B3 به ساقهٔ لق همراه ذخیرهٔ استخوانی ناکافی گفته می‌شود.'),
      ],
      note: L('Die Einordnung eines realen Falls erfordert die klinische Gesamtschau und darf nicht allein aus einem schematischen Einzelbild erfolgen.', 'Classification of a real case requires the full clinical context and should not be based on one schematic image alone.', 'طبقه‌بندی یک مورد واقعی به ارزیابی کلی بالینی نیاز دارد و نباید فقط از یک تصویر شماتیک انجام شود.'),
    },
  ],
  summary: [
    L('A: Trochanterregion; AG = Trochanter major, AL = Trochanter minor.', 'A: trochanteric region; AG = greater trochanter, AL = lesser trochanter.', 'A: ناحیهٔ تروکانتر؛ AG = تروکانتر بزرگ، AL = تروکانتر کوچک.'),
    L('B1/B2/B3: Schaft fest / gelockert bei gutem Knochen / gelockert bei schlechtem Knochenbestand.', 'B1/B2/B3: well-fixed stem / loose stem with adequate bone / loose stem with poor bone stock.', 'B1/B2/B3: ساقه محکم / ساقه لق با استخوان کافی / ساقه لق با ذخیرهٔ استخوانی ناکافی.'),
    L('C: Fraktur distal der Prothesenspitze; Therapieableitung bleibt eine individuelle fachärztliche Entscheidung.', 'C: fracture distal to the stem tip; treatment remains an individual specialist decision.', 'C: شکستگی دیستال نوک ساقه؛ تصمیم درمانی به ارزیابی فردی متخصص وابسته است.'),
  ],
  references: [
    { tag: 'MSK.pdf · p.27', title: L('Vancouver-Klassifikation', 'Vancouver classification', 'طبقه‌بندی ونکوور'), citation: L('Physische PDF-Seite 27, Druckseite 26: Textdefinitionen und eingebettete Präparateabbildung Image345.jpg, Beschriftungen AG, AL, B1, B2, B3 und C.', 'Physical PDF p.27, printed p.26: classification text and embedded specimen image Image345.jpg, labels AG, AL, B1, B2, B3 and C.', 'صفحهٔ فیزیکی ۲۷، چاپی ۲۶: تعریف طبقه‌بندی و تصویر نمونهٔ استخوانی Image345.jpg با برچسب‌های AG، AL، B1، B2، B3 و C.') },
    { tag: 'AO Foundation', title: L('Klassifikation und Einordnung', 'Classification and context', 'طبقه‌بندی و چارچوب'), href: 'https://www.aofoundation.org/approved/approvedsolutionsfolder/2021/ppfx-femur-plating-system', citation: 'AO Foundation. The new VA-LCP Periprosthetic Proximal Femur Plating System. Classification of periprosthetic femoral fractures; accessed 2026-10-20.' },
    { tag: 'Systematic review · 2024', title: L('Behandlungsrahmen B2/B3', 'Treatment framework for B2/B3', 'چارچوب درمانی B2/B3'), href: 'https://doi.org/10.1007/s00402-024-05469-1', citation: 'Di Martino A, Brunello M, Villari E, et al. Stem revision vs. internal fixation in Vancouver B2/B3 periprosthetic hip fractures: systematic review and meta-analysis. Arch Orthop Trauma Surg. 2024;144:3787–3796. doi:10.1007/s00402-024-05469-1.' },
  ],
}
