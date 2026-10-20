const L = (de, en, fa) => ({ de, en, fa })

export const GUILLAIN_BARRE_SPINE_LESSON = {
  id: 'guillain-barre-syndrom',
  title: L('Guillain-Barré-Syndrom: MRT der Nervenwurzeln', 'Guillain–Barré syndrome: MRI of the nerve roots', 'سندرم گیلن‌باره: MRI ریشه‌های عصبی'),
  hero: '/educational/gbs-mri-boundaries.svg',
  alt: L('Nichtdiagnostisches Schema: klinischer Kontext, ausgewählte MRT bei atypischem Verlauf und die begrenzte Aussagekraft einer Wurzelanreicherung.', 'Non-diagnostic schematic: clinical context, selected MRI in atypical presentations, and the limits of nerve-root enhancement.', 'شماتیک غیرتشخیصی: زمینه بالینی، MRI انتخابی در تظاهرهای غیرمعمول و محدودیت ارزش تشخیصی افزایش سیگنال ریشه‌های عصبی.'),
  intro: {
    title: L('MRT ist Ergänzung, kein Routinetest', 'MRI is an adjunct, not a routine test', 'MRI یک بررسی تکمیلی است، نه آزمون روتین'),
    text: L('Das Guillain-Barré-Syndrom (GBS) ist eine akute Polyradikuloneuropathie. Die Diagnose stützt sich vor allem auf Klinik und neurologische Untersuchung; Liquor und elektrophysiologische Untersuchungen können sie ergänzen. Ein MRT der Nerven ist bei typischer Präsentation kein routinemäßiger Zusatztest. Bei atypischer oder unsicherer Konstellation kann Bildgebung ausgewählt helfen, andere Ursachen zu suchen.', 'Guillain–Barré syndrome (GBS) is an acute polyradiculoneuropathy. Diagnosis relies chiefly on the clinical presentation and neurologic examination; cerebrospinal fluid and electrodiagnostic studies may support it. Nerve MRI is not a routine add-on for a typical presentation. In selected atypical or uncertain cases, imaging may help look for alternative causes.', 'سندرم گیلن‌باره یک پلی‌رادیکولونوروپاتی حاد است. تشخیص عمدتاً بر تظاهر بالینی و معاینه عصبی استوار است و بررسی مایع مغزی‌نخاعی و آزمون‌های الکتروفیزیولوژیک می‌توانند آن را تکمیل کنند. MRI عصب در تظاهر تیپیک بررسی تکمیلی روتین نیست. در موارد منتخب و غیرمعمول یا نامطمئن، تصویربرداری می‌تواند به جست‌وجوی علت‌های دیگر کمک کند.'),
  },
  sections: [
    {
      id: 'when-mri', icon: 'decision',
      title: L('Wann hilft die Bildgebung?', 'When can imaging help?', 'تصویربرداری چه زمانی کمک می‌کند؟'),
      lead: L('Die Frage ist zunächst nicht „Ist das MRT positiv?“, sondern ob das klinische Bild typisch ist und ob strukturelle oder entzündliche Mimics ausgeschlossen werden müssen.', 'The first question is not “Is the MRI positive?” but whether the presentation is typical and whether structural or inflammatory mimics need to be considered.', 'پرسش نخست «آیا MRI مثبت است؟» نیست؛ ابتدا باید دید تظاهر تیپیک است یا نه و آیا باید علت‌های ساختاری یا التهابی مشابه بررسی شوند.'),
      rows: [
        [L('Typische Präsentation', 'Typical presentation', 'تظاهر تیپیک'), L('EAN/PNS rät von MRT oder Ultraschall als routinemäßigem Zusatztest zur GBS-Diagnose ab.', 'EAN/PNS advises against MRI or ultrasound as routine add-on testing for a typical GBS presentation.', 'راهنمای EAN/PNS انجام روتین MRI یا سونوگرافی را به‌عنوان آزمون تکمیلی برای تشخیص تظاهر تیپیک GBS توصیه نمی‌کند.')],
        [L('Atypisch oder unklar', 'Atypical or uncertain', 'غیرمعمول یا نامطمئن'), L('Ausgewählte MRT kann helfen, andere Ursachen zu suchen, etwa Rückenmarkskompression, Myelitis oder Tumor. Das ersetzt nicht die klinische Gesamtdiagnose.', 'Selected MRI may help look for alternative causes such as spinal cord compression, myelitis, or tumour. It does not replace the overall clinical diagnosis.', 'MRI انتخابی می‌تواند برای یافتن علت‌های دیگر مانند فشار بر نخاع، میلیت یا تومور کمک کند؛ جایگزین تشخیص بالینی جامع نیست.')],
      ],
    },
    {
      id: 'root-findings', icon: 'imaging',
      title: L('Was kann im MRT auffallen?', 'What may be visible on MRI?', 'چه یافته‌هایی ممکن است در MRI دیده شوند؟'),
      lead: L('Das PDF beschreibt vor allem die Cauda-equina- und Spinalnervenwurzeln. Diese Befunde sind variabel; sie sind keine notwendige Checkliste für GBS.', 'The PDF focuses on the cauda equina and spinal nerve roots. Findings vary and are not a required checklist for GBS.', 'PDF عمدتاً ریشه‌های کودا اکوئینا و اعصاب نخاعی را توصیف می‌کند. یافته‌ها متغیرند و چک‌لیست الزامی برای GBS نیستند.'),
      rows: [
        [L('T1 nach Kontrastmittel', 'Post-contrast T1', 'T1 پس از تزریق ماده حاجب'), L('Eine Verdickung und Anreicherung der Cauda-equina-/Spinalnervenwurzeln kann vorkommen; in der PDF wird eine vordere Betonung beschrieben. Wurzelanreicherung unterstützt GBS allenfalls, ist aber nicht spezifisch oder pathognomonisch.', 'Thickening and enhancement of cauda equina/spinal nerve roots may occur; the PDF describes anterior predominance. Root enhancement may support GBS, but it is neither specific nor pathognomonic.', 'ضخیم‌شدن و افزایش سیگنال پس از تزریق ماده حاجب در ریشه‌های کودا اکوئینا یا اعصاب نخاعی ممکن است دیده شود؛ PDF غلبه قدامی را توصیف می‌کند. این یافته حداکثر از GBS حمایت می‌کند، اما اختصاصی یا پاتوگنومونیک نیست.')],
        [L('T2 / STIR', 'T2 / STIR', 'T2 / STIR'), L('Die Wurzeln können unauffällig sein oder eine diskrete Signalanhebung zeigen. Ein normales Rückenmark ist ein möglicher Negativbefund; beides beweist oder widerlegt GBS nicht.', 'Roots may appear normal or show subtle signal increase. A normal spinal cord is a possible negative finding; neither proves nor excludes GBS.', 'ریشه‌ها ممکن است طبیعی باشند یا افزایش سیگنال خفیفی نشان دهند. طبیعی‌بودن نخاع یک یافته منفی ممکن است؛ هیچ‌کدام GBS را اثبات یا رد نمی‌کند.')],
      ],
      note: L('Die PDF nennt Sensitivität 50–83 % und „mäßige“ Spezifität. Diese Zahlen werden nicht als aktuelle Leistungswerte übernommen: Die EAN/PNS-Leitlinie beschreibt die MRI-Studien als klein und unkontrolliert und nennt eine unbekannte Spezifität.', 'The PDF gives sensitivity of 50–83% and “moderate” specificity. These are not presented as current performance estimates: the EAN/PNS guideline describes the MRI studies as small and uncontrolled, with specificity unknown.', 'PDF حساسیت ۵۰ تا ۸۳ درصد و ویژگی «متوسط» را ذکر می‌کند. این اعداد به‌عنوان برآورد عملکرد فعلی به‌کار نمی‌روند؛ راهنمای EAN/PNS مطالعات MRI را کوچک و کنترل‌نشده می‌داند و ویژگی را نامشخص گزارش می‌کند.'),
    },
    {
      id: 'limits', icon: 'caveat',
      title: L('Wie weit trägt der Befund?', 'How far does the finding take you?', 'این یافته تا کجا راهنماست؟'),
      lead: L('Die Bildgebung liefert einen Baustein. Eine Wurzelanreicherung kann auch bei anderen entzündlichen oder neoplastischen Polyradikulopathien vorkommen.', 'Imaging supplies one piece of evidence. Root enhancement can also occur in other inflammatory or neoplastic polyradiculopathies.', 'تصویربرداری تنها بخشی از شواهد را فراهم می‌کند. افزایش سیگنال ریشه‌ها در پلی‌رادیکولوپاتی‌های التهابی یا نئوپلاستیک دیگر نیز ممکن است رخ دهد.'),
      rows: [
        [L('Anreicherung vorhanden', 'Enhancement present', 'افزایش سیگنال وجود دارد'), L('Als unterstützend und unspezifisch beschreiben; mit Klinik und weiteren Befunden abgleichen. Nicht als Beweis für GBS werten.', 'Describe it as supportive but nonspecific and correlate with the clinical picture and other findings. Do not treat it as proof of GBS.', 'آن را یافته‌ای حمایتی اما غیراختصاصی توصیف کنید و با تظاهر بالینی و سایر یافته‌ها تطبیق دهید؛ آن را اثبات GBS ندانید.')],
        [L('MRT unauffällig', 'MRI unremarkable', 'MRI طبیعی است'), L('GBS wird dadurch nicht ausgeschlossen. Ein unauffälliges MRT ist kein Gegenbeweis.', 'This does not exclude GBS. An unremarkable MRI is not evidence against it.', 'این یافته GBS را رد نمی‌کند؛ MRI طبیعی دلیل رد تشخیص نیست.')],
      ],
    },
  ],
  check: {
    title: L('Kurz selbst prüfen', 'Quick self-check', 'خودآزمایی کوتاه'),
    prompt: L('Bei klinischem GBS-Verdacht ist das Wirbelsäulen-MRT unauffällig. Welche Schlussfolgerung passt?', 'A spinal MRI is unremarkable in a patient with clinical suspicion of GBS. Which conclusion fits?', 'در بیماری با شک بالینی به GBS، MRI ستون فقرات طبیعی است. کدام نتیجه‌گیری مناسب است؟'),
    options: [
      L('GBS ist damit ausgeschlossen.', 'GBS is excluded.', 'در نتیجه GBS رد می‌شود.'),
      L('Ein normales MRT schließt GBS nicht aus; das MRT ist bei typischer Präsentation kein Routinetest.', 'A normal MRI does not exclude GBS; MRI is not routine testing in a typical presentation.', 'MRI طبیعی GBS را رد نمی‌کند؛ در تظاهر تیپیک، MRI آزمون روتین نیست.'),
      L('Ein unauffälliges MRT beweist, dass keine relevante neurologische Ursache vorliegt.', 'An unremarkable MRI proves there is no relevant neurologic cause.', 'MRI طبیعی ثابت می‌کند که علت عصبی مهمی وجود ندارد.'),
    ],
    answerIndex: 1,
    feedback: L('Die GBS-Diagnose ist klinisch und wird durch passende Zusatzbefunde gestützt. MRT kann bei atypischer oder unsicherer Präsentation ausgewählt nach Mimics suchen; ein normales Ergebnis schließt GBS nicht aus.', 'GBS is a clinical diagnosis supported by appropriate additional findings. MRI may be selected to look for mimics in atypical or uncertain presentations; a normal result does not exclude GBS.', 'تشخیص GBS بالینی است و شواهد تکمیلی مناسب می‌توانند از آن پشتیبانی کنند. در تظاهر غیرمعمول یا نامطمئن می‌توان از MRI انتخابی برای جست‌وجوی علت‌های مشابه استفاده کرد؛ نتیجه طبیعی GBS را رد نمی‌کند.'),
  },
  summary: [
    L('Bei typischem GBS ist MRT kein routinemäßiger Zusatztest.', 'MRI is not a routine add-on test in typical GBS.', 'در GBS تیپیک، MRI آزمون تکمیلی روتین نیست.'),
    L('Wurzelverdickung/-anreicherung kann unterstützen, ist aber unspezifisch.', 'Root thickening/enhancement may support GBS but is nonspecific.', 'ضخیم‌شدن یا افزایش سیگنال ریشه‌ها می‌تواند حمایتی باشد، اما اختصاصی نیست.'),
    L('Ein unauffälliges MRT schließt GBS nicht aus.', 'An unremarkable MRI does not exclude GBS.', 'MRI طبیعی GBS را رد نمی‌کند.'),
  ],
  scope: L('Begrenzte MRT-Lektion aus Wirbelsäule.pdf, physische PDF-Seite 19 (gedruckte Seite 18). Die numerischen Leistungsangaben der PDF werden wegen aktueller Evidenzgrenzen nicht wiederholt. Keine Diagnose- oder Therapieanleitung; keine klinische Freigabe.', 'Bounded MRI lesson from Wirbelsäule.pdf, physical PDF p. 19 (printed p. 18). The PDF’s numerical performance claims are not repeated because of limitations in current evidence. This is not a diagnostic or treatment protocol and has no clinical sign-off.', 'درس محدود MRI بر پایه صفحه ۱۹ فایل Wirbelsäule.pdf (شماره چاپی ۱۸). اعداد عملکرد تشخیصی PDF به‌دلیل محدودیت شواهد فعلی تکرار نمی‌شوند. این درس راهنمای تشخیص یا درمان نیست و تأیید بالینی نشده است.'),
  references: [
    { tag: 'Wirbelsäule.pdf · p.19', title: L('Seite zur Bildgebung bei GBS', 'GBS imaging source page', 'صفحه منبع تصویربرداری GBS'), citation: L('Physische PDF-Seite 19, Druckseite 18. Der Abschnitt enthält klinischen Kontext, MRT-Indikation, T1 C+, T2/STIR und Liquorbefunde; keine diagnostischen Patientenbilder.', 'Physical PDF p. 19, printed p. 18. The page covers clinical context, MRI indication, post-contrast T1, T2/STIR and CSF; it contains no diagnostic patient images.', 'صفحه فیزیکی PDF شماره ۱۹، صفحه چاپی ۱۸. صفحه زمینه بالینی، اندیکاسیون MRI، T1 پس از تزریق، T2/STIR و یافته‌های مایع مغزی‌نخاعی را دارد و تصویر تشخیصی بیمار ندارد.') },
    { tag: 'EAN/PNS · 2023', title: L('Leitlinie: Rolle der Bildgebung', 'Guideline: role of imaging', 'راهنما: نقش تصویربرداری'), href: 'https://doi.org/10.1111/ene.16073', citation: 'van Doorn PA, Van den Bergh PYK, Hadden RDM, et al. European Academy of Neurology/Peripheral Nerve Society Guideline on diagnosis and treatment of Guillain–Barré syndrome. Eur J Neurol. 2023;30(12):3646–3674. doi:10.1111/ene.16073. PICO 5: MRI/US not routine in typical presentation; consider in selected atypical cases; root enhancement supportive, not specific; normal studies do not exclude GBS.' },
    { tag: 'Radiology · 1998', title: L('MRT-Wurzelbefunde in einer kleinen Serie', 'MRI root findings in a small case series', 'یافته‌های MRI ریشه‌ها در یک مجموعه کوچک'), href: 'https://doi.org/10.1148/radiology.208.1.9646804', citation: 'Byun WM, Park WK, Park BH, Ahn SH, Hwang MS, Chang JC. Guillain-Barré syndrome: MR imaging findings of the spine in eight patients. Radiology. 1998;208(1):137–141. doi:10.1148/radiology.208.1.9646804. Small retrospective series; root thickening/enhancement varied and was not specific.' },
  ],
}
