const L = (de, en, fa) => ({ de, en, fa })

export const OSTEOSYNTHESE_POSTOP = {
  id: 'msk-postop-osteosynthese',
  title: L('Postoperative Röntgenkontrolle nach Osteosynthese', 'Postoperative radiograph check after osteosynthesis', 'ارزیابی رادیوگرافی پس از استئوسنتز'),
  sections: [
    {
      id: 'checklist',
      title: L('Eine kurze Checkliste für die postoperative Aufnahme', 'A short checklist for the postoperative radiograph', 'چک‌لیست کوتاه برای رادیوگرافی پس از عمل'),
      lead: L('Prüfe zuerst die Fraktur als Ganzes: Passen die Fragmente zueinander? Stimmen Achse und Länge? Danach das Osteosynthesematerial auf Bruch und eine mögliche iatrogene Fraktur absuchen.', 'First assess the fracture as a whole: are the fragments adapted, and are alignment and length acceptable? Then look for broken fixation material and a possible iatrogenic fracture.', 'ابتدا خود شکستگی را یکپارچه ارزیابی کنید: تطابق قطعات، محور و طول چگونه‌اند؟ سپس سالم‌بودن وسیلهٔ فیکساسیون و وجود شکستگی احتمالیِ ایجادشده حین عمل را بررسی کنید.'),
      rows: [
        { label: L('۱ · تطابق قطعات', '1 · Fragment adaptation', '۱ · تطابق قطعات'), text: L('Sind die Frakturfragmente zueinander adaptiert?', 'Are the fracture fragments adapted to one another?', 'آیا قطعات شکستگی با یکدیگر تطابق دارند؟') },
        { label: L('۲ · محور و طول', '2 · Alignment and length', '۲ · محور و طول'), text: L('Bestehen Achs- oder Längenabweichungen?', 'Is there an alignment or length discrepancy?', 'آیا انحراف محور یا اختلاف طول دیده می‌شود؟') },
        { label: L('۳ · Material', '3 · Fixation material', '۳ · وسیلهٔ فیکساسیون'), text: L('Ist das Osteosynthesematerial intakt oder zeigt es einen Bruch?', 'Is the fixation material intact, or is there a break?', 'آیا وسیلهٔ فیکساسیون سالم است یا شکستگی دارد؟') },
        { label: L('۴ · Begleitverletzung', '4 · Associated injury', '۴ · آسیب همراه'), text: L('Ist eine iatrogene Fraktur erkennbar?', 'Is an iatrogenic fracture visible?', 'آیا شکستگیِ ایجادشده حین عمل قابل مشاهده است؟') },
      ],
    },
    {
      id: 'proximal-femur',
      title: L('Zusatzblick beim proximalen Femur: Lage der Schraube', 'Additional check in the proximal femur: screw position', 'بررسی تکمیلی در فمور پروگزیمال: موقعیت پیچ'),
      lead: L('Bei DHS oder PFN nennt die PDF zwei Lagehinweise. Beurteile die Schraubenlage im Kontext der verfügbaren Projektionen; die Folie ersetzt keine vollständige Implantatbeurteilung.', 'For a DHS or PFN, the PDF gives two position cues. Assess screw position in the context of the available projections; this slide does not replace a complete implant assessment.', 'برای DHS یا PFN، PDF دو نکته دربارهٔ موقعیت پیچ ذکر می‌کند. موقعیت را با توجه به نماهای موجود بسنجید؛ این نکته جای ارزیابی کامل ایمپلنت را نمی‌گیرد.'),
      rows: [
        { label: L('Gewindelage', 'Thread position', 'موقعیت رزوه'), text: L('Das Schraubengewinde sollte im dorsokaudalen Quadranten des Femurkopfs liegen.', 'The screw thread should lie in the dorsocaudal quadrant of the femoral head.', 'رزوهٔ پیچ باید در ربع دورسوکودال سر فمور قرار گیرد.') },
        { label: L('Auf Cut-out achten', 'Look for cut-out', 'به Cut-out توجه کنید'), text: L('Ein Cut-out bezeichnet das kraniale Ausbrechen der Schraube aus dem Femurkopf.', 'Cut-out describes cranial migration of the screw out of the femoral head.', 'Cut-out به بیرون‌زدگی کرانیال پیچ از سر فمور گفته می‌شود.') },
      ],
      cave: L('Die PDF nennt außerdem einen Abstand von mindestens 5 mm zum Gelenkspalt. Dieser Einzelwert wird hier nicht als allgemeiner Grenzwert übernommen; Projektion, Implantattyp und aktuelle Fachquelle müssen berücksichtigt werden.', 'The PDF also gives a minimum 5 mm distance from the joint space. This isolated value is not adopted here as a universal threshold; projection, implant type and current specialist evidence matter.', 'PDF همچنین فاصلهٔ حداقل ۵ میلی‌متری از فضای مفصل را ذکر می‌کند. این عددِ منفرد در این درس به‌عنوان آستانهٔ همگانی ارائه نمی‌شود؛ نما، نوع ایمپلنت و منبع تخصصی روز باید در نظر گرفته شوند.'),
    },
    {
      id: 'self-check',
      title: L('Selbstcheck: Was gehört in den ersten Durchgang?', 'Self-check: what belongs in the first pass?', 'خودآزمایی: در بررسی اولیه چه چیزهایی را ببینیم؟'),
      question: L('Du prüfst eine postoperative Aufnahme nach Frakturfixation. Welche Kombination bildet die allgemeine Checkliste der PDF ab?', 'You are reviewing a postoperative radiograph after fracture fixation. Which combination matches the PDF’s general checklist?', 'در حال بررسی رادیوگرافی پس از فیکساسیون شکستگی هستید. کدام گزینه چک‌لیست کلی PDF را نشان می‌دهد؟'),
      options: [
        L('Fragmentadaptation, Achse und Länge, Materialbruch sowie iatrogene Fraktur.', 'Fragment adaptation, alignment and length, material breakage, and iatrogenic fracture.', 'تطابق قطعات، محور و طول، شکستگی وسیله و شکستگی حین عمل.'),
        L('Nur Schraubenspitzenabstand und Knochenheilung beurteilen.', 'Assess only screw-tip distance and bone healing.', 'فقط فاصلهٔ نوک پیچ و جوش‌خوردگی استخوان را بسنجید.'),
        L('Aus der Aufnahme allein die Operationstechnik und Behandlung festlegen.', 'Determine the operation technique and treatment from the image alone.', 'روش جراحی و درمان را فقط بر اساس تصویر تعیین کنید.'),
      ],
      answer: 0,
      feedback: L('Richtig. Die PDF nennt diese vier allgemeinen Prüfpunkte. Die proximale Femurfolie ergänzt danach die Lage des Materials bei DHS/PFN.', 'Correct. These are the four general checks listed in the PDF. The proximal-femur subsection then adds DHS/PFN material position.', 'درست است. PDF این چهار مورد را به‌عنوان بررسی‌های عمومی نام می‌برد. بخش فمور پروگزیمال سپس موقعیت وسیله در DHS/PFN را اضافه می‌کند.'),
    },
  ],
  takeHome: [
    L('Erst Fragmente, Achse und Länge; danach Material und iatrogene Fraktur.', 'First fragments, alignment and length; then fixation material and iatrogenic fracture.', 'ابتدا قطعات، محور و طول؛ سپس وسیلهٔ فیکساسیون و شکستگی حین عمل.'),
    L('Bei DHS/PFN zusätzlich Gewindelage und kraniales Cut-out prüfen.', 'For DHS/PFN, also check thread position and cranial cut-out.', 'در DHS/PFN موقعیت رزوه و Cut-out کرانیال را نیز بررسی کنید.'),
    L('Einzelne Zahlenwerte der PDF sind ohne aktuelle Einordnung keine universellen Grenzwerte.', 'Isolated numbers in the PDF are not universal thresholds without current contextual evidence.', 'اعداد منفرد PDF بدون ارزیابی روز، آستانه‌های همگانی نیستند.'),
  ],
}
