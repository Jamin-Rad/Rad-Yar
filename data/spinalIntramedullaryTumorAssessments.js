const L = (de, en, fa) => ({ de, en, fa })

export const SPINAL_INTRAMEDULLARY_TUMOR_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `spinal-intramedullary-${lang}-pattern-comparison`, fach: 'msk',
  tags: ['astrozytom-spinal', 'ependymom-spinal'],
  source: 'Wirbelsäule.pdf, PDF p.22 (printed p.21); Kim DH et al., Clin Radiol. 2014;69(1):29–35. doi:10.1016/j.crad.2013.07.017; PMID:24034546',
  question: L('Welche Kombination passt eher zu einem intramedullären Ependymom als zu einem Astrozytom?', 'Which combination favours an intramedullary ependymoma over an astrocytoma?', 'کدام ترکیب بیشتر به نفع اپاندیموم داخل‌مدولاری نسبت به آستروسیتوماست؟')[lang],
  options: [
    L('Zentrale, symmetrische Auftreibung mit deutlicher homogener KM-Aufnahme.', 'Central, symmetric expansion with avid homogeneous enhancement.', 'اتساع مرکزی و متقارن با جذب واضح و همگن مادهٔ حاجب.')[lang],
    L('Unscharfe, asymmetrische Auftreibung mit variabler, oft geringer KM-Aufnahme.', 'Ill-defined, asymmetric expansion with variable, often mild enhancement.', 'اتساع نامشخص و نامتقارن با جذب متغیر و اغلب کم مادهٔ حاجب.')[lang],
    L('Ein kurzes, randständig anreicherndes intramedulläres Knötchen ist beweisend.', 'A short-segment, peripherally enhancing intramedullary nodule is diagnostic.', 'یک ندول داخل‌مدولاری کوتاه با جذب محیطی تشخیصی است.')[lang],
    L('Das Fehlen einer DWI-Aufnahme beweist ein Ependymom.', 'Absence of DWI signal proves an ependymoma.', 'نبود سیگنال DWI اپاندیموم را ثابت می‌کند.')[lang],
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: L('Die PDF beschreibt eine schärfere Begrenzung als Hinweis auf ein Ependymom. In der pathologisch bestätigten 43-Fälle-Serie unterschieden sich die Begrenzungen jedoch nicht eindeutig zwischen den Gruppen; nur Syringohydromyelie war ein unabhängiger Prädiktor. Zentrale Lage und deutlichere Aufnahme waren dort häufiger, sind aber keine alleinigen Diagnosekriterien.', 'The PDF describes sharper margins as a clue to ependymoma. In the pathology-confirmed 43-case series, however, margin appearance did not clearly differ between groups; only syringohydromyelia was an independent predictor. Central location and more avid enhancement were more frequent, but are not stand-alone diagnostic criteria.', 'PDF حاشیهٔ واضح‌تر را به‌عنوان سرنخی برای اپاندیموما توصیف می‌کند. بااین‌حال، در مجموعهٔ ۴۳ موردی با تأیید پاتولوژی، ظاهر حاشیه‌ها تفاوت روشنی بین دو گروه نداشت؛ فقط سیرینگوهیدرومیلی پیش‌بینی‌کنندهٔ مستقل بود. محل مرکزی و جذب شدیدتر در آن مجموعه بیشتر دیده شدند، اما معیار تشخیصی مستقل نیستند.')[lang],
  wrongExplanations: {
    B: L('Diese Kombination ist näher an den im PDF beschriebenen Astrozytom-Hinweisen.', 'This combination is closer to the astrocytoma clues described in the PDF.', 'این ترکیب به سرنخ‌های آستروسیتوم در PDF نزدیک‌تر است.')[lang],
    C: L('Ein kurzes, stark anreicherndes intramedulläres Knötchen ist kein beweisendes Ependymom-Muster.', 'A short-segment avidly enhancing intramedullary nodule is not a diagnostic ependymoma pattern.', 'ندول داخل‌مدولاری کوتاه با جذب شدید، الگوی اثبات‌کنندهٔ اپاندیموم نیست.')[lang],
    D: L('Die Notiz „keine DWI“ in der PDF ist unklar und wird nicht als diagnostischer Test verwendet.', 'The PDF note “no DWI” is ambiguous and is not used as a diagnostic test.', 'عبارت «بدون DWI» در PDF مبهم است و به‌عنوان آزمون تشخیصی به‌کار نمی‌رود.')[lang],
  },
}))

export const SPINAL_INTRAMEDULLARY_TUMOR_TOPIC_GROUP = {
  fachId: 'msk', kapitelId: 'ws-tumoren',
  title: L('Intramedulläre Tumoren', 'Intramedullary tumours', 'تومورهای داخل‌مدولاری'),
  topics: [
    { id: 'astrozytom-spinal', title: L('Spinales Astrozytom', 'Spinal astrocytoma', 'آستروسیتوم نخاعی') },
    { id: 'ependymom-spinal', title: L('Spinales Ependymom', 'Spinal ependymoma', 'اپاندیموم نخاعی') },
  ],
}

export const SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARD_TOPICS = [
  { id: 'astrozytom-spinal', area: 'Wirbelsäule', chapter: 'Intramedulläre Tumoren', icon: 'MRT', color: '#397f8d', href: '/flashcards/astrozytom-spinal', title: L('Spinales Astrozytom', 'Spinal astrocytoma', 'آستروسیتوم نخاعی'), subtitle: L('MRT-Muster · PDF S. 22', 'MRI pattern · PDF p. 22', 'الگوی MRI · ص. ۲۲ PDF') },
  { id: 'ependymom-spinal', area: 'Wirbelsäule', chapter: 'Intramedulläre Tumoren', icon: 'MRT', color: '#397f8d', href: '/flashcards/ependymom-spinal', title: L('Spinales Ependymom', 'Spinal ependymoma', 'اپاندیموم نخاعی'), subtitle: L('MRT-Muster · PDF S. 22', 'MRI pattern · PDF p. 22', 'الگوی MRI · ص. ۲۲ PDF') },
]

export const SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARDS = [
  { id: 'astrozytom-spinal-mri-clues', topicId: 'astrozytom-spinal', category: L('Intramedulläres Astrozytom', 'Intramedullary astrocytoma', 'آستروسیتوم داخل‌مدولاری'), front: L('Welche MRT-Hinweise beschreibt die PDF für ein spinales Astrozytom?', 'Which MRI clues does the PDF describe for spinal astrocytoma?', 'PDF چه سرنخ‌های MRI برای آستروسیتوم نخاعی توصیف می‌کند؟'), answer: L('Eher jüngeres Alter, häufig lange und unscharf begrenzte Myelonauftreibung, oft asymmetrisch; T2 hyperintens und variable, teils geringe KM-Aufnahme.', 'Younger age more often; commonly long-segment, ill-defined cord expansion, often asymmetric; T2 hyperintensity and variable, sometimes mild enhancement.', 'بیشتر در سنین پایین‌تر؛ اغلب اتساع طولانی و با مرز نامشخص طناب، گاهی نامتقارن؛ پرسیگنال T2 و جذب متغیر و گاهی کم مادهٔ حاجب.'), explanation: L('Dies sind kombinierte Hinweise, keine alleinigen Diagnosekriterien. Quelle: Wirbelsäule.pdf, PDF S. 22; unabhängige Vergleichsstudie siehe verlinkte MCQ.', 'These are combined clues, not stand-alone diagnostic criteria. Source: Wirbelsäule.pdf, p.22; see linked MCQ for the comparative study.', 'این‌ها سرنخ‌های ترکیبی‌اند، نه معیار مستقل تشخیص. منبع: Wirbelsäule.pdf، ص.۲۲؛ مطالعهٔ مقایسه‌ای در MCQ پیوندشده آمده است.') },
  { id: 'ependymom-spinal-mri-clues', topicId: 'ependymom-spinal', category: L('Intramedulläres Ependymom', 'Intramedullary ependymoma', 'اپاندیموم داخل‌مدولاری'), front: L('Welche MRT-Hinweise passen eher zu einem spinalen Ependymom?', 'Which MRI clues favour spinal ependymoma?', 'کدام سرنخ‌های MRI بیشتر با اپاندیموم نخاعی سازگارند؟'), answer: L('Häufig zentrale/symmetrische und schärfer begrenzte Myelonauftreibung mit deutlicher, oft homogener KM-Aufnahme; Zysten/Syrinx oder Hämosiderin-Kappe können vorkommen, sind aber nicht obligat.', 'Often central/symmetric, more sharply marginated cord expansion with avid, often homogeneous enhancement; cysts/syrinx or hemosiderin cap may occur but are not obligatory.', 'اغلب اتساع مرکزی/متقارن با حاشیه واضح‌تر و جذب شدید و اغلب همگن مادهٔ حاجب؛ کیست/سیرینکس یا کلاهک هموسیدرین ممکن است دیده شوند اما الزامی نیستند.'), explanation: L('Muster und Alter sind Hinweise. Keine DWI ist wegen der unklaren PDF-Formulierung kein Ausschluss- oder Bestätigungstest.', 'Pattern and age are clues. “No DWI” is not an exclusion or confirmation test because the PDF wording is unclear.', 'الگو و سن سرنخ‌اند. به‌دلیل ابهام عبارت PDF، «بدون DWI» آزمون رد یا تأیید نیست.') },
]

export const SPINAL_EXTRAMEDULLARY_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `spinal-extramedullary-${lang}-pdf-patterns`, fach: 'msk',
  tags: ['meningeom-spinal', 'schwannom-neurofibrom-spinal'],
  source: 'Wirbelsäule.pdf, PDF p.22 (printed p.21)',
  question: L('Welche Zuordnung folgt den im PDF beschriebenen MRT-Hinweisen am besten?', 'Which pairing best follows the MRI clues described in the PDF?', 'کدام تطبیق با سرنخ‌های MRI توصیف‌شده در PDF سازگارتر است؟')[lang],
  options: [
    L('Meningeom: oft dorsal/thorakal, T1/T2-isointens und kräftig homogen anreichernd, möglicher Duralschwanz. Schwannom: Nervenwurzelbezug, mögliche Foramenerweiterung, teils heterogen/zystisch und kräftig anreichernd.', 'Meningioma: often dorsal/thoracic, T1/T2 isointense with avid homogeneous enhancement and a possible dural tail. Schwannoma: nerve-root relationship, possible foraminal widening, sometimes heterogeneous/cystic with avid enhancement.', 'مننژیوم: اغلب خلفی/توراسیک، ایزوسیگنال در T1/T2 با جذب شدید و همگن و احتمال دُم دورال. شوانوما: ارتباط با ریشهٔ عصبی، احتمال گشادشدن فورامن، گاهی ناهمگن/کیستیک و با جذب شدید.'),
    L('Meningeom: Nervenwurzelbezug, mögliche Foramenerweiterung und teils zystisch. Schwannom: oft dorsal/thorakal, T1/T2-isointens mit homogenem Enhancement und möglichem Duralschwanz.', 'Meningioma: nerve-root relationship, possible foraminal widening and sometimes cystic. Schwannoma: often dorsal/thoracic, T1/T2 isointense with homogeneous enhancement and a possible dural tail.', 'مننژیوم: ارتباط با ریشهٔ عصبی، احتمال گشادشدن فورامن و گاهی کیستیک. شوانوما: اغلب خلفی/توراسیک، ایزوسیگنال در T1/T2 با جذب همگن و احتمال دُم دورال.'),
    L('Meningeom: oft ventral/lumbal mit heterogener Aufnahme und möglicher Foramenerweiterung. Schwannom: häufig dorsal/thorakal, kräftig homogen anreichernd und mit möglichem Duralschwanz.', 'Meningioma: often ventral/lumbar with heterogeneous enhancement and possible foraminal widening. Schwannoma: commonly dorsal/thoracic, avidly and homogeneously enhancing with a possible dural tail.', 'مننژیوم: اغلب قدامی/کمری با جذب ناهمگن و احتمال گشادشدن فورامن. شوانوما: معمولاً خلفی/توراسیک، با جذب شدید و همگن و احتمال دُم دورال در برخی موارد.'),
    L('Meningeom: T1/T2-isointens mit möglichem Duralschwanz und kräftiger Aufnahme. Schwannom: heterogen/zystisch mit möglicher Foramenerweiterung, aber ohne typischen Nervenwurzelbezug.', 'Meningioma: T1/T2 isointense with a possible dural tail and avid enhancement. Schwannoma: heterogeneous/cystic with possible foraminal widening, but without a typical nerve-root relationship.', 'مننژیوم: ایزوسیگنال در T1/T2 با احتمال دُم دورال و جذب شدید. شوانوما: ناهمگن/کیستیک با احتمال گشادشدن فورامن، اما بدون ارتباط معمول با ریشهٔ عصبی.'),
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: 'A',
  explanation: L('Das sind zusammengefasste PDF-Hinweise, keine spezifischen Einzelzeichen. Die Läsionszuordnung braucht die vollständige MRT, Kompartimentlage und klinischen Kontext.', 'These are summary clues from the PDF, not specific individual signs. Lesion attribution requires the full MRI, compartment location and clinical context.', 'این‌ها سرنخ‌های خلاصه‌شدهٔ PDF هستند، نه نشانه‌های منفرد اختصاصی. انتساب ضایعه به MRI کامل، محل کمپارتمان و زمینهٔ بالینی نیاز دارد.')[lang],
  wrongExplanations: {
    B: L('Die charakteristischen Hinweise wurden zwischen den beiden Läsionen vertauscht: Nervenwurzel/Foramen ist hier dem Meningeom statt dem Schwannom zugeordnet.', 'The characteristic clues have been swapped: nerve-root/foraminal features are assigned to meningioma rather than schwannoma.', 'سرنخ‌های شاخص جابه‌جا شده‌اند: ویژگی‌های ریشهٔ عصبی/فورامن به‌جای شوانوما به مننژیوم نسبت داده شده‌اند.')[lang],
    C: L('Die genannte ventrale/lumbale Lage und heterogene Aufnahme passen nicht zu den PDF-Hinweisen für das Meningeom.', 'The stated ventral/lumbar location and heterogeneous enhancement do not match the PDF clues for meningioma.', 'محل قدامی/کمری و جذب ناهمگن با سرنخ‌های PDF برای مننژیوم سازگار نیست.')[lang],
    D: L('Foramenerweiterung und ein fehlender Nervenwurzelbezug widersprechen der im PDF beschriebenen Zuordnung des Schwannoms.', 'Foraminal widening and absence of a nerve-root relationship conflict with the PDF description of schwannoma.', 'گشادشدن فورامن و نبود ارتباط با ریشهٔ عصبی با توصیف PDF از شوانوما ناسازگار است.')[lang],
  },
}))

export const SPINAL_EXTRAMEDULLARY_TOPIC_GROUP = {
  fachId: 'msk', kapitelId: 'ws-tumoren',
  title: L('Intradural-extramedulläre Läsionen', 'Intradural-extramedullary lesions', 'ضایعات داخل‌دورال ـ خارج‌مدولاری'),
  topics: [
    { id: 'meningeom-spinal', title: L('Spinales Meningeom', 'Spinal meningioma', 'مننژیوم نخاعی') },
    { id: 'schwannom-neurofibrom-spinal', title: L('Schwannom (Neurofibrom in der PDF nicht behandelt)', 'Schwannoma (neurofibroma not covered in the PDF)', 'شوانوما (نوروفیبروم در PDF پوشش داده نشده)') },
  ],
}

export const SPINAL_EXTRAMEDULLARY_FLASHCARD_TOPICS = [
  { id: 'meningeom-spinal', area: 'Wirbelsäule', chapter: 'Spinalkanal-Tumoren', icon: 'MRT', color: '#397f8d', href: '/flashcards/meningeom-spinal', title: L('Spinales Meningeom', 'Spinal meningioma', 'مننژیوم نخاعی'), subtitle: L('PDF-S. 22 · MRT-Hinweise', 'PDF p. 22 · MRI clues', 'ص. ۲۲ PDF · سرنخ‌های MRI') },
  { id: 'schwannom-neurofibrom-spinal', area: 'Wirbelsäule', chapter: 'Spinalkanal-Tumoren', icon: 'MRT', color: '#397f8d', href: '/flashcards/schwannom-neurofibrom-spinal', title: L('Schwannom (Neurofibrom in der PDF nicht behandelt)', 'Schwannoma (neurofibroma not covered in the PDF)', 'شوانوما (نوروفیبروم در PDF پوشش داده نشده)'), subtitle: L('PDF-S. 22 · MRT-Hinweise', 'PDF p. 22 · MRI clues', 'ص. ۲۲ PDF · سرنخ‌های MRI') },
]

export const SPINAL_EXTRAMEDULLARY_FLASHCARDS = [
  { id: 'meningeom-spinal-mri-clues', topicId: 'meningeom-spinal', category: L('Spinales Meningeom', 'Spinal meningioma', 'مننژیوم نخاعی'), front: L('Welche MRT-Hinweise nennt die PDF für ein spinales Meningeom?', 'Which MRI clues does the PDF list for spinal meningioma?', 'PDF چه سرنخ‌های MRI برای مننژیوم نخاعی ذکر می‌کند؟'), answer: L('Oft dorsal und thorakal; T1/T2 isointens, deutliche homogene KM-Aufnahme, möglicher Duralschwanz und Verdrängung des Myelons.', 'Often dorsal and thoracic; T1/T2 isointense, avid homogeneous enhancement, possible dural tail and cord displacement.', 'اغلب خلفی و توراسیک؛ ایزوسیگنال در T1/T2، جذب واضح و همگن مادهٔ حاجب، احتمال دُم دورال و جابه‌جایی طناب نخاعی.'), explanation: L('Quellennotiz aus Wirbelsäule.pdf, PDF S. 22; kein Merkmal allein beweist die Histologie.', 'Source note from Wirbelsäule.pdf, PDF p. 22; no single feature proves histology.', 'نکتهٔ منبع از Wirbelsäule.pdf، صفحهٔ PDF ۲۲؛ هیچ ویژگی منفردی بافت‌شناسی را ثابت نمی‌کند.') },
  { id: 'schwannom-neurofibrom-spinal-mri-clues', topicId: 'schwannom-neurofibrom-spinal', category: L('Schwannom (Neurofibrom in der PDF nicht behandelt)', 'Schwannoma (neurofibroma not covered in the PDF)', 'شوانوما (نوروفیبروم در PDF پوشش داده نشده)'), front: L('Welche MRT-Hinweise beschreibt die PDF für ein spinales Schwannom?', 'Which MRI clues does the PDF describe for spinal schwannoma?', 'PDF چه سرنخ‌های MRI برای شوانومای نخاعی توصیف می‌کند؟'), answer: L('Nervenwurzelbezug, mögliche Foramenerweiterung, heterogenes Signal, mögliche Zysten und deutliche KM-Aufnahme.', 'Nerve-root relationship, possible foraminal widening, heterogeneous signal, possible cysts and avid enhancement.', 'ارتباط با ریشهٔ عصبی، احتمال گشادشدن فورامن، سیگنال ناهمگن، احتمال کیست و جذب واضح مادهٔ حاجب.'), explanation: L('Quellennotiz aus Wirbelsäule.pdf, PDF S. 22. Die Unterschiede zum Neurofibrom sind hier nicht weiter aufgeschlüsselt.', 'Source note from Wirbelsäule.pdf, PDF p. 22. The PDF does not cover neurofibroma-specific features.', 'نکتهٔ منبع از Wirbelsäule.pdf، صفحهٔ PDF ۲۲. PDF ویژگی‌های اختصاصی نوروفیبروم را پوشش نمی‌دهد.') },
]
