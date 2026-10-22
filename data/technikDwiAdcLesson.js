const L = (de, en, fa) => ({ de, en, fa })

export const DWI_ADC_TOPIC = { id: 'mrt-dwi-adc' }

export const DWI_ADC_BLOCK = {
  id: 'dwi-adc-reading',
  title: L('DWI: Ist das helle Signal echte Restriktion?', 'DWI: does bright signal represent true restriction?', 'DWI: آیا سیگنال روشن نشان‌دهندهٔ محدودیت واقعی است؟'),
  lead: L('DWI zeigt Beweglichkeit von Wassermolekülen indirekt. Ein helles DWI allein beweist keine Diffusionsrestriktion: Lesen Sie das ADC immer mit.', 'DWI indirectly reflects water-molecule mobility. Bright DWI alone does not prove restricted diffusion: always assess ADC as well.', 'DWI تحرک مولکول‌های آب را به‌طور غیرمستقیم نشان می‌دهد. روشن‌بودن DWI به‌تنهایی محدودیت انتشار را ثابت نمی‌کند؛ ADC را هم بررسی کنید.'),
  rows: [
    [L('Echte Restriktion', 'True restriction', 'محدودیت واقعی'), L('Weniger Wasserbeweglichkeit kann auf hoher b-Wichtung hell erscheinen und geht typischerweise mit niedrigerem ADC einher. Das Muster stützt die Interpretation, ist aber nicht allein diagnosespezifisch.', 'Reduced water mobility may appear bright on high-b DWI and is typically accompanied by lower ADC. This pattern supports interpretation but is not diagnostic on its own.', 'کاهش تحرک آب ممکن است در DWI با b بالا روشن باشد و معمولاً با ADC پایین‌تر همراه است. این الگو به تفسیر کمک می‌کند، اما به‌تنهایی اختصاصی تشخیصی نیست.')],
    [L('T2-shine-through', 'T2 shine-through', 'عبور سیگنال T2'), L('Lange T2 kann das DWI-Signal hell halten, obwohl der ADC normal oder erhöht ist. In diesem Muster unterstützt die ADC-Karte keine echte Restriktion.', 'A long T2 can keep DWI signal bright even when ADC is normal or high. In this pattern, the ADC map does not support true restriction.', 'T2 طولانی می‌تواند سیگنال DWI را روشن نگه دارد، حتی وقتی ADC طبیعی یا بالا است. در این الگو، نقشهٔ ADC از محدودیت واقعی حمایت نمی‌کند.')],
    [L('ADC-Karte', 'ADC map', 'نقشهٔ ADC'), L('ADC wird aus DWI-Daten mit unterschiedlichen b-Werten berechnet. b-Werte steuern die Diffusionsgewichtung; die konkrete Auswahl hängt vom Organ und Protokoll ab.', 'ADC is calculated from DWI data acquired with different b-values. The b-value controls diffusion weighting; the specific choice depends on organ and protocol.', 'ADC از داده‌های DWI با مقادیر متفاوت b محاسبه می‌شود. مقدار b وزن‌دهی انتشار را کنترل می‌کند؛ انتخاب آن به اندام و پروتکل وابسته است.')],
    [L('Technische Grenze', 'Technical limitation', 'محدودیت فنی'), L('EPI ist schnell und häufig für DWI, kann aber Verzerrungen erzeugen. Beurteilen Sie DWI/ADC zusammen mit den passenden anatomischen Sequenzen.', 'EPI is fast and commonly used for DWI, but can introduce distortion. Assess DWI/ADC together with the relevant anatomical sequences.', 'EPI سریع است و اغلب برای DWI به‌کار می‌رود، اما ممکن است اعوجاج ایجاد کند. DWI/ADC را همراه توالی‌های آناتومیک مناسب ارزیابی کنید.')],
  ],
  visual: {
    src: '/technik/grundlagen/mrt-dwi-adc-pattern.svg',
    srcLocalized: L('/technik/grundlagen/mrt-dwi-adc-pattern-de.svg', '/technik/grundlagen/mrt-dwi-adc-pattern-en.svg', '/technik/grundlagen/mrt-dwi-adc-pattern-fa.svg'),
    alt: L('Konzeptschema ohne Patientendaten: helles DWI mit niedrigem ADC passt zu Restriktion; helles DWI mit normalem oder hohem ADC passt zu T2-shine-through.', 'Concept diagram without patient data: bright DWI with low ADC is compatible with restriction; bright DWI with normal or high ADC is compatible with T2 shine-through.', 'طرح‌وارهٔ مفهومی بدون دادهٔ بیمار: DWI روشن با ADC پایین با محدودیت سازگار است؛ DWI روشن با ADC طبیعی یا بالا با عبور سیگنال T2 سازگار است.'),
    caption: L('DWI-Signal und ADC gemeinsam lesen. Schematische Muster, keine Patientendaten und keine quantitative Skala.', 'Read DWI signal and ADC together. Schematic patterns, no patient data and no quantitative scale.', 'سیگنال DWI و ADC را با هم بخوانید. الگوها شماتیک‌اند، دادهٔ بیمار یا مقیاس کمی نیستند.'),
  },
  references: [{ href: 'https://pubmed.ncbi.nlm.nih.gov/41037070/', label: L('ESR Essentials: diffusion-weighted MRI — practice recommendations (2025)', 'ESR Essentials: diffusion-weighted MRI — practice recommendations (2025)', 'توصیه‌های عملی ESR برای MRI انتشار (۲۰۲۵)'), citation: L('European Radiology, 2025. DWI interpretation and protocol-dependent b-values.', 'European Radiology, 2025. DWI interpretation and protocol-dependent b-values.', 'European Radiology، ۲۰۲۵؛ تفسیر DWI و وابستگی b-value به پروتکل.'), scope: L('Stützt die gemeinsame Beurteilung von DWI und ADC sowie die Protokollabhängigkeit der b-Werte.', 'Supports joint assessment of DWI and ADC and protocol-dependent b-values.', 'پشتیبان ارزیابی هم‌زمان DWI و ADC و وابستگی b-value به پروتکل است.') }],
  note: L('Quelle: Technik.pdf, PDF-S. 114 (Druck-S. 113). Die Beispielbilder auf der PDF-Seite werden nicht als Fallbeispiele übernommen; dieses Schema erklärt ausschließlich das Signalprinzip.', 'Source: Technik.pdf, PDF p. 114 (printed p. 113). The example images on the PDF page are not reused as case examples; this diagram explains the signal principle only.', 'منبع: Technik.pdf، صفحهٔ PDF ۱۱۴ (شمارهٔ چاپی ۱۱۳). تصاویر نمونهٔ آن صفحه به‌عنوان کیس استفاده نشده‌اند؛ این نمودار فقط اصل سیگنال را توضیح می‌دهد.'),
}

export const DWI_ADC_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `mrt-dwi-adc-${lang}-shine-through`, topicId: 'mrt-dwi-adc', fach: 'technik', tags: ['mrt-dwi-adc', 'mrt', 'technik'],
  question: lang === 'de' ? 'Ein Fokus ist auf hoher b-Wichtung hell, auf der ADC-Karte aber normal bis signalreich. Welche Aussage passt am besten?' : lang === 'en' ? 'A focus is bright on high-b DWI but normal to bright on the ADC map. Which interpretation fits best?' : 'کانونی در DWI با b بالا روشن است، اما در نقشهٔ ADC طبیعی تا پرسیگنال دیده می‌شود. کدام تفسیر مناسب‌تر است؟',
  options: (lang === 'de' ? ['T2-shine-through; die ADC-Karte stützt keine echte Restriktion.', 'Sichere echte Restriktion mit erniedrigtem ADC.', 'ADC und DWI sind immer gleich zu interpretieren.', 'Ein hoher b-Wert beweist unabhängig vom ADC eine Restriktion.'] : lang === 'en' ? ['T2 shine-through; the ADC map does not support true restriction.', 'Definite true restriction with low ADC.', 'ADC and DWI must always be interpreted identically.', 'A high b-value proves restriction regardless of ADC.'] : ['عبور سیگنال T2؛ نقشهٔ ADC از محدودیت واقعی حمایت نمی‌کند.', 'محدودیت واقعی قطعی همراه با ADC پایین.', 'ADC و DWI همیشه باید یکسان تفسیر شوند.', 'b-value بالا بدون توجه به ADC محدودیت را ثابت می‌کند.']).map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: lang === 'de' ? 'Helles DWI kann durch langes T2 entstehen. Ein normaler oder hoher ADC stützt bei diesem Muster keine echte Diffusionsrestriktion; Sequenzen gemeinsam beurteilen.' : lang === 'en' ? 'Bright DWI can result from long T2. A normal or high ADC does not support true restriction in this pattern; interpret the sequences together.' : 'روشن‌بودن DWI ممکن است از T2 طولانی ناشی شود. ADC طبیعی یا بالا در این الگو از محدودیت واقعی حمایت نمی‌کند؛ توالی‌ها را با هم ارزیابی کنید.',
  source: 'Technik.pdf p.114 (printed p.113); ESR Essentials DWI practice recommendations 2025',
}))

export const DWI_ADC_FLASHCARD_TOPIC = {
  id: 'mrt-dwi-adc', area: 'Technik', chapter: 'MRT-Spezialtechniken', icon: 'MR', color: '#3d8894',
  href: '/flashcards/mrt-dwi-adc', title: L('DWI / ADC', 'DWI / ADC', 'DWI / ADC'),
  subtitle: L('Diffusionsrestriktion · T2-shine-through', 'Restricted diffusion · T2 shine-through', 'محدودیت انتشار · عبور سیگنال T2'),
}

export const DWI_ADC_FLASHCARDS = [{
  id: 'mrt-dwi-adc-pattern', topicId: 'mrt-dwi-adc', category: L('DWI und ADC zusammen lesen', 'Read DWI and ADC together', 'DWI و ADC را با هم بخوانید'),
  front: L('Wie unterscheiden Sie echte Diffusionsrestriktion von T2-shine-through?', 'How do you distinguish true restricted diffusion from T2 shine-through?', 'محدودیت واقعی انتشار را از عبور سیگنال T2 چگونه افتراق می‌دهید؟'),
  answer: L('DWI hell + ADC niedrig unterstützt Restriktion. DWI hell + ADC normal/hoch passt zu T2-shine-through.', 'Bright DWI + low ADC supports restriction. Bright DWI + normal/high ADC fits T2 shine-through.', 'DWI روشن + ADC پایین از محدودیت حمایت می‌کند. DWI روشن + ADC طبیعی/بالا با عبور سیگنال T2 سازگار است.'),
  source: 'Technik.pdf p.114 (printed p.113)',
}]
