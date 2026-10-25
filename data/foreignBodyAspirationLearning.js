const L = (de, en, fa) => ({ de, en, fa })

const question = {
  id: 'fremdkoerper-atemwege-decubitus',
  question: L(
    'Bei einem nicht kooperativen Kleinkind wird die verdächtige Seite in der Seitlageaufnahme nach unten gelagert. Welcher Befund unterstützt Air trapping auf der betroffenen Seite?',
    'In an uncooperative toddler, the suspected side is placed down for a decubitus view. Which finding supports air trapping on the affected side?',
    'در کودک نوپای غیرهمکار، سمت مشکوک در نمای دکوبیتوس پایین قرار داده می‌شود. کدام یافته از حبس هوا در سمت درگیر حمایت می‌کند؟'
  ),
  options: [
    L('Die abhängige Lunge auf der verdächtigen Seite wird dichter und verliert Volumen.', 'The dependent lung on the suspected side becomes denser and loses volume.', 'ریهٔ سمت مشکوک که پایین قرار گرفته متراکم‌تر می‌شود و حجم از دست می‌دهد.'),
    L('Die unten liegende verdächtige Lunge bleibt relativ überbläht, statt den erwarteten Volumenverlust und Dichteanstieg zu zeigen.', 'The dependent suspected lung remains relatively hyperinflated instead of showing the expected volume loss and increase in attenuation.', 'ریهٔ مشکوک که پایین قرار گرفته، به‌جای کاهش حجم و افزایش دانسیتهٔ مورد انتظار، نسبتاً متسع باقی می‌ماند.'),
    L('Das Mediastinum verlagert sich in der Exspiration zur betroffenen Seite.', 'The mediastinum shifts towards the affected side on expiration.', 'مدیاستن در بازدم به سمت درگیر جابه‌جا می‌شود.'),
    L('Eine unauffällige Seitlageaufnahme schließt eine Aspiration sicher aus.', 'A normal decubitus view reliably excludes aspiration.', 'نمای دکوبیتوس طبیعی، آسپیراسیون را با اطمینان رد می‌کند.'),
  ],
  correct: 'B',
  explanation: L(
    'Bei einer Seitlageaufnahme liegt die verdächtige Seite unten. Bleibt die betroffene Lunge überbläht, unterstützt das eine eingeschränkte Luftentleerung (Air trapping); entscheidend ist das Ausbleiben des erwarteten Volumenverlusts und Dichteanstiegs der unten liegenden verdächtigen Lunge. Das Zeichen ist unterstützend und muss im Bild- und klinischen Kontext beurteilt werden. Quelle: Thorax.pdf, PDF-S. 31 (gedruckte S. 30).',
    'On a decubitus view, the suspected side is down. Persistent hyperinflation of the affected lung supports impaired air emptying (air trapping); the key is failure of the dependent suspected lung to show the expected volume loss and increase in attenuation. This is a supportive sign and must be interpreted with the imaging and clinical context. Source: Thorax.pdf, PDF p. 31 (printed p. 30).',
    'در نمای دکوبیتوس، سمت مشکوک پایین قرار می‌گیرد. باقی‌ماندن اتساع بیش‌ازحد ریهٔ درگیر از اختلال در تخلیهٔ هوا (حبس هوا) حمایت می‌کند؛ نکتهٔ اصلی رخ ندادن کاهش حجم و افزایش دانسیتهٔ مورد انتظار در ریهٔ مشکوکِ پایین‌قرارگرفته است. این یافته حمایتی است و باید در زمینهٔ تصویر و وضعیت بالینی تفسیر شود. منبع: Thorax.pdf، صفحهٔ ۳۱ فایل PDF (صفحهٔ چاپی ۳۰).'
  ),
}

export const FOREIGN_BODY_ASPIRATION_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  [{
    id: `${question.id}-${lang}`,
    topicId: 'fremdkoerper-atemwege',
    tags: ['fremdkoerper-atemwege'],
    fach: 'thorax',
    question: question.question[lang],
    options: question.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
    correct: question.correct,
    explanation: question.explanation[lang],
    source: 'Thorax.pdf, PDF p. 31 (printed p. 30); /thorax/fremdkoerperaspiration#technique',
  }],
]))

export const FOREIGN_BODY_ASPIRATION_FLASHCARD_TOPIC = {
  id: 'fremdkoerper-atemwege',
  area: 'Thorax',
  chapter: 'Lunge',
  icon: 'Rö',
  iconImage: '/fach/thorax.png',
  color: '#0284c7',
  href: '/flashcards/fremdkoerper-atemwege',
  title: L('Fremdkörperaspiration bei Kindern', 'Foreign-body aspiration in children', 'آسپیراسیون جسم خارجی در کودکان'),
  subtitle: L('Indirekte Zeichen · Seitlageaufnahme', 'Indirect signs · decubitus view', 'علائم غیرمستقیم · نمای دکوبیتوس'),
}

export const FOREIGN_BODY_ASPIRATION_FLASHCARDS = [{
  id: 'fremdkoerper-atemwege-bronchialabgang',
  topicId: 'fremdkoerper-atemwege',
  category: L('Anatomie und Seitenverteilung', 'Anatomy and side distribution', 'آناتومی و توزیع سمت'),
  front: L(
    'Warum sagt die betroffene Seite bei Kleinkindern eine Fremdkörperaspiration nicht zuverlässig voraus?',
    'Why does the affected side not reliably predict foreign-body aspiration location in toddlers?',
    'چرا در کودکان نوپا، سمت درگیر محل آسپیراسیون جسم خارجی را به‌طور قابل‌اعتماد پیش‌بینی نمی‌کند؟'
  ),
  answer: L(
    'Beide Hauptbronchien zweigen bei Kleinkindern in annähernd symmetrischen Winkeln ab. Die Seite allein erlaubt deshalb keinen verlässlichen Ausschluss.',
    'In toddlers, both main bronchi take off at nearly symmetric angles. Side alone therefore cannot reliably exclude aspiration.',
    'در کودکان نوپا، زاویهٔ خروج هر دو برونش اصلی تقریباً متقارن است. بنابراین سمت به‌تنهایی آسپیراسیون را با اطمینان رد نمی‌کند.'
  ),
  explanation: L(
    'Die PDF beschreibt diese Anatomie für das 1.–3. Lebensjahr. Beurteile indirekte Zeichen und den gesamten Kontext. Quelle: Thorax.pdf, PDF-S. 30 (gedruckte S. 29).',
    'The PDF describes this anatomy for ages 1–3. Assess indirect signs and the overall context. Source: Thorax.pdf, PDF p. 30 (printed p. 29).',
    'PDF این آناتومی را برای سنین ۱ تا ۳ سال توصیف می‌کند. علائم غیرمستقیم و کل زمینه را ارزیابی کنید. منبع: Thorax.pdf، صفحهٔ ۳۰ فایل PDF (صفحهٔ چاپی ۲۹).'
  ),
}]
