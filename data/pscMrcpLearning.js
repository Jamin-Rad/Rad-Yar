const L = (de, en, fa) => ({ de, en, fa })

const item = {
  id: 'psc-pbc-mrcp-beading',
  question: L(
    'Welches MRCP-Muster passt zur im PDF beschriebenen primär sklerosierenden Cholangitis (PSC)?',
    'Which MRCP pattern matches the primary sclerosing cholangitis (PSC) pattern described in the PDF?',
    'کدام الگوی MRCP با الگوی کلانژیت اسکلروزان اولیه (PSC) توصیف‌شده در PDF سازگار است؟'
  ),
  options: [
    L('Kurze multifokale Strikturen mit wechselnden normal kalibrierten oder dilatierten Gangabschnitten', 'Short multifocal strictures alternating with normal-calibre or dilated duct segments', 'تنگی‌های کوتاه و چندکانونی همراه با بخش‌های متناوبِ با قطر طبیعی یا گشادشده'),
    L('Eine einzelne lange, glatt konturierte Stenose ohne weitere Gangveränderungen', 'One long, smoothly marginated stricture without other duct changes', 'یک تنگی منفرد و طولانی با حاشیه صاف، بدون تغییرات دیگر مجاری'),
    L('Eine isolierte Wandverdickung der Gallenblase bei normal dargestellten Gallenwegen', 'Isolated gallbladder wall thickening with otherwise normal bile ducts', 'ضخیم‌شدگی منفرد دیواره کیسه صفرا با مجاری صفراوی طبیعی'),
    L('Eine gleichmäßige Dilatation aller Gänge ohne Kaliberwechsel', 'Uniform dilatation of all ducts without calibre changes', 'اتساع یکنواخت همه مجاری بدون تغییر قطر'),
  ],
  correct: 'A',
  explanation: L(
    'Die kurzen multifokalen Engstellen wechseln mit normal kalibrierten oder dilatierten Gangabschnitten. Dieser Wechsel erzeugt den beschriebenen Perlschnur-Aspekt. Die Frage betrifft PSC/MRCP; PBC wird auf den PDF-Seiten nicht gelehrt.',
    'Short multifocal narrowings alternate with normal-calibre or dilated duct segments. This variation creates the described beaded appearance. This question covers PSC/MRCP; PBC is not taught on the cited PDF pages.',
    'تنگی‌های کوتاه و چندکانونی با بخش‌های طبیعی یا گشادشده مجرا تناوب دارند و نمای مهره‌مهره ایجاد می‌کنند. این پرسش درباره PSC/MRCP است؛ در صفحات یادشده PDF، PBC آموزش داده نشده است.'
  ),
}

export const PSC_MRCP_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  [{
    id: `${item.id}-${lang}`,
    topicId: 'psc-pbc',
    tags: ['psc-pbc'],
    fach: 'abdomen',
    question: item.question[lang],
    options: item.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
    correct: item.correct,
    explanation: item.explanation[lang],
    source: 'Abdomen.pdf, PDF p. 29 (printed p. 28); PSC/MRCP lesson /abdomen/leber/psc-mrcp',
  }],
]))

export const PSC_MRCP_FLASHCARD_TOPIC = {
  id: 'psc-pbc',
  area: 'Abdomen',
  chapter: 'Gallenwege',
  icon: 'MRCP',
  iconImage: '/fach/abdomen.png',
  color: '#0f766e',
  href: '/flashcards/psc-pbc',
  title: L('PSC im MRCP', 'PSC on MRCP', 'PSC در MRCP'),
  subtitle: L('Perlschnur-Muster · Gangkaliber · Befundung', 'Beaded pattern · duct calibre · reporting', 'الگوی مهره‌مهره · قطر مجرا · گزارش'),
}

export const PSC_MRCP_FLASHCARDS = [{
  id: 'psc-pbc-mrcp-beading',
  topicId: 'psc-pbc',
  category: L('MRCP-Muster', 'MRCP pattern', 'الگوی MRCP'),
  front: L(
    'Welche Gangkonstellation erzeugt bei PSC den Perlschnur-Aspekt?',
    'Which duct configuration creates the beaded appearance in PSC?',
    'چه ترکیبی از یافته‌های مجاری در PSC نمای مهره‌مهره ایجاد می‌کند؟'
  ),
  answer: L(
    'Kurze multifokale Strikturen wechseln mit normal kalibrierten oder dilatierten Gangabschnitten. PBC wird in dieser Lektion nicht behandelt.',
    'Short multifocal strictures alternate with normal-calibre or dilated duct segments. PBC is not covered in this lesson.',
    'تنگی‌های کوتاه و چندکانونی با بخش‌های طبیعی یا گشادشده مجرا تناوب دارند. PBC در این درس بررسی نمی‌شود.'
  ),
  explanation: L(
    'Quelle: Abdomen.pdf, PDF-S. 29 (gedruckte S. 28).',
    'Source: Abdomen.pdf, PDF p. 29 (printed p. 28).',
    'منبع: Abdomen.pdf، صفحهٔ ۲۹ فایل PDF (صفحهٔ چاپی ۲۸).'
  ),
}]
