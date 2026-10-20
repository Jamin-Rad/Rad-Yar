const L = (de, en, fa) => ({ de, en, fa })

export const ILEUS_FLASHCARD_TOPIC = {
  id: 'ileus-duenndarm',
  area: 'Abdomen',
  chapter: 'Gastrointestinaltrakt',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/ileus-duenndarm',
  title: L('Dünndarmileus', 'Small-bowel obstruction', 'انسداد رودهٔ باریک'),
  subtitle: L('CT-Muster · Übergang · Dünndarm-Fäzeszeichen', 'CT patterns · transition zone · small-bowel feces sign', 'الگوهای CT · نقطهٔ گذار · علامت مدفوع رودهٔ باریک'),
}

const cards = [
  {
    id: 'small-bowel-feces-definition',
    category: L('CT-Zeichen', 'CT sign', 'علامت CT'),
    front: L('Wie sieht das Small-Bowel-Feces-Zeichen im CT aus?', 'What does the small-bowel feces sign look like on CT?', 'علامت مدفوع رودهٔ باریک در CT چه شکلی است؟'),
    answer: L('Partikelhaltiger, stuhlähnlicher Inhalt mit Gasbläschen in einer dilatierten Dünndarmschlinge.', 'Particulate, faeces-like material mixed with gas bubbles within a dilated small-bowel loop.', 'محتوای ذره‌ای شبیه مدفوع همراه حباب‌های گاز در یک لوپ متسع رودهٔ باریک.'),
    explanation: L('Das Zeichen liegt häufig nahe vor der Übergangszone und kann bei deren Lokalisation helfen. Es ist ein Hinweis innerhalb des Gesamtmusters, keine alleinige Schweregradmessung.', 'The sign is often close to the transition zone and may help localise it. It is one clue within the overall pattern, not a standalone measure of severity.', 'این علامت اغلب نزدیک نقطهٔ گذار است و می‌تواند به مکان‌یابی آن کمک کند. بخشی از الگوی کلی است و به‌تنهایی شدت بیماری را تعیین نمی‌کند.'),
    diagram: L('Dilatierter Dünndarm → Fäzeszeichen nahe dem Übergang → kollabierter Darm', 'Dilated small bowel → feces sign near transition → collapsed bowel', 'رودهٔ متسع ← علامت نزدیک نقطهٔ گذار ← رودهٔ فروریخته'),
  },
  {
    id: 'small-bowel-feces-interpretation',
    category: L('Einordnung', 'Interpretation', 'تفسیر'),
    front: L('Was darf aus dem Small-Bowel-Feces-Zeichen allein nicht abgeleitet werden?', 'What should not be inferred from the small-bowel feces sign alone?', 'از علامت مدفوع رودهٔ باریک به‌تنهایی چه چیزی را نباید نتیجه گرفت؟'),
    answer: L('Dass eine Ischämie sicher vorliegt oder ausgeschlossen ist, oder dass allein dadurch ein bestimmtes Management feststeht.', 'That ischaemia is definitely present or excluded, or that the sign alone determines management.', 'اینکه ایسکمی قطعاً وجود دارد یا رد شده، یا اینکه این علامت به‌تنهایی مدیریت مشخصی را تعیین می‌کند.'),
    explanation: L('Die Studie zu adhäsionsbedingtem Dünndarmileus fand keinen unabhängigen Vorhersagewert für Ischämie oder erfolgreiche nichtoperative Behandlung. Die Lage des Zeichens kann dennoch beim Finden der Übergangszone helfen.', 'In an adhesive small-bowel obstruction cohort, the sign had no independent predictive value for ischaemia or successful non-operative treatment. Its location may still help identify the transition zone.', 'در یک مطالعه روی انسداد چسبندگی رودهٔ باریک، علامت ارزش پیش‌بینی مستقل برای ایسکمی یا موفقیت درمان غیرجراحی نداشت؛ با این حال، محل آن می‌تواند به یافتن نقطهٔ گذار کمک کند.'),
    diagram: L('Lokalisation: hilfreich · Schweregrad allein: nein', 'Localisation: helpful · severity alone: no', 'مکان‌یابی: مفید · تعیین شدت به‌تنهایی: خیر'),
  },
]

export const ILEUS_FLASHCARDS = cards.map((card, index) => ({
  ...card,
  id: `ileus-duenndarm-${String(index + 1).padStart(2, '0')}-${card.id}`,
  topicId: 'ileus-duenndarm',
}))
