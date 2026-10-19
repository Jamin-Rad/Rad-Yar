const L = (de, en, fa) => ({ de, en, fa })

export const GEHIRN_DEMENZMUSTER_LESSON = {
  id: 'demenzmuster-mrt',
  title: L('Demenzmuster im MRT: Atrophie räumlich lesen', 'Dementia patterns on MRI: read atrophy by location', 'الگوهای دمانس در MRI: آتروفی را بر پایهٔ مکان بخوانید'),
  sourcePages: [72, 73, 74],
  objective: L('Sie beschreiben die Verteilung der Atrophie und trennen bildgebende Hinweise von klinischen Diagnosekriterien. Ein MRT-Muster allein legt keine Demenzform fest.', 'You will describe the distribution of atrophy and separate imaging clues from clinical diagnostic criteria. An MRI pattern alone does not establish a dementia subtype.', 'توزیع آتروفی را توصیف می‌کنید و سرنخ تصویربرداری را از معیار بالینی تشخیص جدا می‌سازید. الگوی MRI به‌تنهایی نوع دمانس را تعیین نمی‌کند.'),
  chapters: [
    {
      id: 'alzheimer', pages: '72',
      title: L('Alzheimer: mesiale Temporallappen und posteriorer Kortex', 'Alzheimer disease: medial temporal lobes and posterior cortex', 'آلزایمر: لوب‌های تمپورال میانی و قشر خلفی'),
      text: L('Die PDF zeigt eine bilaterale Hippocampus- beziehungsweise mesiotemporale Atrophie und illustriert den MTA-Score. Beurteilen Sie die koronare Ebene auf Höhe des Hippocampus: Volumen, Fissura choroidea und temporales Horn gehören gemeinsam in die visuelle Einschätzung.\n\nDer MTA-Score ist altersabhängig und nicht spezifisch für Alzheimer. Die PDF-Grenzwerte werden hier nicht übernommen; die Bildgebung stützt die klinische Abklärung, sie ersetzt sie nicht.', 'The PDF shows bilateral hippocampal or medial temporal atrophy and illustrates the MTA score. On coronal images at hippocampal level, assess volume, choroidal fissure, and temporal horn together.\n\nThe MTA score is age-dependent and not specific to Alzheimer disease. The PDF cut-offs are not adopted here; imaging supports the clinical assessment but does not replace it.', 'PDF آتروفی دوطرفهٔ هیپوکامپ یا تمپورال میانی را نشان می‌دهد و امتیاز MTA را تصویر می‌کند. در تصاویر کرونال در سطح هیپوکامپ، حجم، شکاف کوروئید و شاخ تمپورال را با هم ارزیابی کنید.\n\nامتیاز MTA به سن وابسته و مختص آلزایمر نیست. آستانه‌های PDF در اینجا وارد نشده‌اند؛ تصویربرداری به ارزیابی بالینی کمک می‌کند اما جای آن را نمی‌گیرد.'),
    },
    {
      id: 'lewy', pages: '73',
      title: L('Lewy-Körper-Demenz: relative Erhaltung ist ein Hinweis', 'Dementia with Lewy bodies: relative preservation is a clue', 'دمانس با اجسام لویی: حفظ نسبی یک سرنخ است'),
      text: L('Die PDF hebt eine relativ erhaltene Hippocampusformation trotz kognitiver Symptomatik hervor. Im Vergleich zu ausgeprägter mesiotemporaler Atrophie kann dies die Differenzialdiagnose strukturieren, ist aber kein Ausschluss einer Alzheimer-Pathologie und keine alleinige Diagnose.\n\nDie PDF nennt zusätzlich DaTSCAN als Nachweis eines striatalen Dopamintransporter-Mangels. Das ist ein nuklearmedizinischer Biomarker und muss von den strukturellen MRT-Zeichen getrennt beschrieben werden.', 'The PDF highlights relative preservation of the hippocampal formation despite cognitive symptoms. Compared with marked medial temporal atrophy, this can help structure the differential, but it neither excludes Alzheimer pathology nor establishes a diagnosis alone.\n\nThe PDF also mentions DaTSCAN for striatal dopamine-transporter loss. This is a nuclear-medicine biomarker and should be described separately from structural MRI findings.', 'PDF با وجود علائم شناختی، حفظ نسبی ساختار هیپوکامپ را برجسته می‌کند. در مقایسه با آتروفی واضح تمپورال میانی، این یافته می‌تواند به سامان‌دهی افتراق کمک کند، اما آسیب‌شناسی آلزایمر را رد نمی‌کند و به‌تنهایی تشخیص نیست.\n\nPDF همچنین DaTSCAN را برای نشان‌دادن کاهش ناقل دوپامین استریاتال ذکر می‌کند. این یک نشانگر پزشکی هسته‌ای است و باید جدا از یافته‌های ساختاری MRI توصیف شود.'),
    },
    {
      id: 'ftd', pages: '74',
      title: L('Frontotemporale Degeneration: Frontal- und Temporallappen vergleichen', 'Frontotemporal degeneration: compare frontal and temporal lobes', 'دژنراسیون فرونتوتمپورال: لوب‌های فرونتال و تمپورال را مقایسه کنید'),
      text: L('Die PDF zeigt eine betonte, häufig asymmetrische Atrophie frontal und/oder temporal. Achten Sie auf die betroffene Hemisphäre, den anterioren Temporallappen und die Ausprägung der frontalen Ausdünnung; die Bezeichnung „knife-edge“ ist eine morphologische Beschreibung, kein eigener diagnostischer Test.\n\nBei der Verhaltensvariante stützt passende frontale oder anteriortemporale Atrophie die klinische Einordnung. Bildmuster, Verlauf und neuropsychologische beziehungsweise sprachliche Präsentation müssen zusammenpassen.', 'The PDF shows prominent, often asymmetric frontal and/or temporal atrophy. Note the affected hemisphere, anterior temporal lobe, and degree of frontal thinning; “knife-edge” is a morphological description, not a diagnostic test by itself.\n\nIn the behavioural variant, compatible frontal or anterior temporal atrophy supports the clinical classification. Imaging pattern, course, and neuropsychological or language presentation must be considered together.', 'PDF آتروفی برجسته و اغلب نامتقارنِ فرونتال و/یا تمپورال را نشان می‌دهد. نیمکرهٔ درگیر، لوب تمپورال قدامی و میزان نازک‌شدن فرونتال را بررسی کنید؛ «knife-edge» توصیف مورفولوژیک است، نه آزمون تشخیصی مستقل.\n\nدر نوع رفتاری، آتروفی فرونتال یا تمپورال قدامیِ سازگار از طبقه‌بندی بالینی پشتیبانی می‌کند. الگوی تصویربرداری، سیر و تظاهر عصب‌روان‌شناختی یا زبانی را با هم بسنجید.'),
    },
  ],
  assessment: {
    id: 'gehirn-dementia-pattern-check', sourcePages: [72, 73, 74],
    question: L('Welche Beschreibung passt am ehesten zum im PDF gezeigten frontotemporalen Atrophiemuster?', 'Which description best matches the frontotemporal atrophy pattern shown in the PDF?', 'کدام توصیف بیشترین تطابق را با الگوی آتروفی فرونتوتمپورال PDF دارد؟'),
    options: [
      L('Betonte, oft asymmetrische frontale und/oder anteriore temporale Atrophie', 'Prominent, often asymmetric frontal and/or anterior temporal atrophy', 'آتروفی برجسته و اغلب نامتقارن فرونتال و/یا تمپورال قدامی'),
      L('Nur diffuse symmetrische Hippocampusatrophie als beweisendes Zeichen', 'Only diffuse symmetric hippocampal atrophy as a definitive sign', 'فقط آتروفی منتشر و متقارن هیپوکامپ به‌عنوان نشانهٔ قطعی'),
      L('Obligate kortikale Diffusionsrestriktion', 'Obligatory cortical diffusion restriction', 'محدودیت انتشار قشریِ الزامی'),
    ],
    correctIndex: 0,
    feedback: L('Richtig. Das PDF zeigt eine frontale und/oder anteriortemporale Atrophieverteilung, oft asymmetrisch. Dieses Muster ist ein klinisch zu korrelierender Bildhinweis, keine alleinige Diagnose.', 'Correct. The PDF shows a frontal and/or anterior temporal distribution of atrophy, often asymmetric. This pattern is an imaging clue to correlate clinically, not a diagnosis by itself.', 'درست است. PDF توزیع آتروفی فرونتال و/یا تمپورال قدامی را نشان می‌دهد که اغلب نامتقارن است. این الگو سرنخ تصویربرداری برای تطبیق بالینی است، نه تشخیص مستقل.'),
    retry: L('Suchen Sie bei FTD nach einer betonten frontalen und/oder anterior-temporalen Verteilung, nicht nach einem einzelnen beweisenden Zeichen.', 'For FTD, look for prominent frontal and/or anterior temporal distribution, not one definitive sign.', 'در FTD به‌دنبال توزیع برجستهٔ فرونتال و/یا تمپورال قدامی باشید، نه یک نشانهٔ قطعی منفرد.'),
  },
  references: [
    { label: 'Gehirn.pdf, PDF pp.72–74 (printed pp.71–73)', href: null },
    { label: 'Scheltens P, et al. Atrophy of medial temporal lobes on MRI in “probable” Alzheimer’s disease and normal ageing. J Neurol Neurosurg Psychiatry. 1992;55:967–972.', href: 'https://pubmed.ncbi.nlm.nih.gov/1431963/' },
    { label: 'McKeith IG, et al. Diagnosis and management of dementia with Lewy bodies: Fourth consensus report. Neurology. 2017;89:88–100.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/' },
    { label: 'Rascovsky K, et al. Sensitivity of revised diagnostic criteria for the behavioural variant of frontotemporal dementia. Brain. 2011;134:2456–2477.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3170532/' },
  ],
  media: L('Code-native Regionsschema, keine diagnostische Aufnahme. Die Vergleichs-MRTs aus Gehirn.pdf pp.72 und 74 wurden nicht übernommen; Fallprovenienz und Nutzungsrecht sind nicht geklärt.', 'Code-native regional schematic, not a diagnostic image. The comparative MRIs in Gehirn.pdf pp.72 and 74 were not reused because case provenance and reuse rights are unresolved.', 'شماتیک نواحی با کد ساخته شده و تصویر تشخیصی نیست. MRIهای مقایسه‌ای صفحات ۷۲ و ۷۴ Gehirn.pdf استفاده نشده‌اند؛ منشأ کیس و حقوق استفاده مشخص نیست.'),
  reviewStatus: L('Entwurf: unabhängige fachliche Prüfung der Bildmuster, semantischer Sprachvergleich und Browserprüfung stehen aus.', 'Draft: independent review of imaging patterns, semantic language comparison, and browser review remain pending.', 'پیش‌نویس: بازبینی مستقل الگوهای تصویربرداری، مقایسهٔ معنایی زبان‌ها و بررسی مرورگر باقی مانده است.'),
}
