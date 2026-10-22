const L = (de, en, fa) => ({ de, en, fa })

export const TUBERCULOSIS_FLASHCARD_TOPIC = {
  id: 'tuberkulose',
  area: 'Thorax',
  chapter: 'Infektionen',
  icon: 'Rö',
  iconImage: '/fach/thorax.png',
  color: '#0284c7',
  href: '/flashcards/tuberkulose',
  title: L('Tuberkulose im Thoraxbild', 'Tuberculosis on chest imaging', 'سل در تصویربرداری قفسهٔ سینه'),
  subtitle: L('Primär · postprimär · miliar', 'Primary · post-primary · miliary', 'اولیه · پس‌اولیه · میلیاری'),
}

export const TUBERCULOSIS_FLASHCARDS = [{
  id: 'tuberkulose-miliares-verteilungsmuster',
  topicId: 'tuberkulose',
  category: L('Verteilungsmuster', 'Distribution pattern', 'الگوی توزیع'),
  front: L(
    'Welches Verteilungsmuster spricht für eine Miliartuberkulose, und welcher Ausbreitungsweg passt dazu?',
    'Which distribution pattern supports miliary tuberculosis, and which route of spread fits it?',
    'کدام الگوی توزیع به نفع سل میلیاری است و با کدام مسیر انتشار سازگار است؟'
  ),
  answer: L(
    'Zahlreiche etwa 1–3 mm große, zufällig verteilte Noduli in beiden Lungen und über alle Lappen sprechen für eine hämatogene Aussaat.',
    'Numerous randomly distributed nodules about 1–3 mm across both lungs and all lobes support haematogenous dissemination.',
    'ندول‌های متعددِ تصادفی با اندازهٔ حدود ۱ تا ۳ میلی‌متر در هر دو ریه و همهٔ لوب‌ها به نفع انتشار هماتوژن هستند.'
  ),
  explanation: L(
    'Das Muster ist nicht allein diagnostisch. Die PDF zeigt es im Kontext hämatogener Streuung bei Immunschwäche. Quelle: Thorax.pdf, PDF-S. 37 (gedruckte S. 36).',
    'The pattern is not diagnostic by itself. The PDF presents it in the context of haematogenous spread in immunosuppression. Source: Thorax.pdf, PDF p. 37 (printed p. 36).',
    'این الگو به‌تنهایی تشخیصی نیست. PDF آن را در زمینهٔ انتشار هماتوژن در نقص ایمنی نشان می‌دهد. منبع: Thorax.pdf، صفحهٔ ۳۷ فایل PDF (صفحهٔ چاپی ۳۶).'
  ),
}]
