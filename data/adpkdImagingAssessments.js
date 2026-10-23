import { ADPKD_COPY, ADPKD_ID } from './adpkdImagingLesson'

const L = (de, en, fa) => ({ de, en, fa })
const questions = [
  {
    slug: 'pattern',
    question: L('Welche beschriebene Verteilung ist für adulte ADPKD typisch?', 'Which described distribution is typical of adult ADPKD?', 'کدام توزیع توصیف‌شده برای ADPKD بزرگسالان تیپیک است؟'),
    options: [
      L('Zahlreiche Zysten in beiden Nieren, häufig mit vergrößertem Nierenvolumen.', 'Numerous cysts in both kidneys, often with increased kidney volume.', 'کیست‌های متعدد در هر دو کلیه، اغلب همراه با افزایش حجم کلیه‌ها.'),
      L('Eine einzelne einfache Zyste in einer Niere.', 'A single simple cyst in one kidney.', 'یک کیست سادهٔ منفرد در یک کلیه.'),
      L('Eine isolierte Verkalkung ohne Zysten.', 'An isolated calcification without cysts.', 'کلسیفیکاسیون منفرد بدون کیست.'),
      L('Eine unilaterale solide Raumforderung.', 'A unilateral solid mass.', 'تودهٔ جامد یک‌طرفه.'),
    ],
    correct: 'A',
    explanations: [
      L('Das bilaterale Muster mit multiplen Zysten stützt die typische Bildverteilung, muss aber mit Familienanamnese und Klinik eingeordnet werden.', 'The bilateral pattern of multiple cysts supports the typical imaging distribution, but must be interpreted with family history and clinical context.', 'الگوی دوطرفهٔ کیست‌های متعدد از توزیع تصویری تیپیک حمایت می‌کند، اما باید همراه سابقهٔ خانوادگی و بالین تفسیر شود.'),
      L('Eine einzelne einfache Zyste ist häufig und für ADPKD nicht spezifisch.', 'A single simple cyst is common and not specific for ADPKD.', 'کیست سادهٔ منفرد شایع است و برای ADPKD اختصاصی نیست.'),
      L('Eine Verkalkung ohne bilaterale Zysten beschreibt nicht das typische ADPKD-Muster.', 'Calcification without bilateral cysts does not describe the typical ADPKD pattern.', 'کلسیفیکاسیون بدون کیست‌های دوطرفه الگوی تیپیک ADPKD را توصیف نمی‌کند.'),
      L('Eine solide einseitige Raumforderung ist kein typisches polyzystisches Muster.', 'A unilateral solid mass is not a typical polycystic pattern.', 'تودهٔ جامد یک‌طرفه الگوی تیپیک پلی‌کیستیک نیست.'),
    ],
    source: 'KDIGO 2025 ADPKD Guideline, Chapter 1, adult imaging and diagnosis.',
  },
  {
    slug: 'uncertain',
    question: L('Bei einem Erwachsenen ohne bekannte Familienanamnese ist die Nierenmorphologie atypisch und die Diagnose bleibt unklar. Welche Aussage entspricht dem KDIGO-Rahmen?', 'In an adult without known family history, renal morphology is atypical and the diagnosis remains uncertain. Which statement fits the KDIGO framework?', 'در بزرگسالی بدون سابقهٔ خانوادگی شناخته‌شده، مورفولوژی کلیه نامعمول است و تشخیص نامشخص می‌ماند. کدام عبارت با چارچوب KDIGO سازگار است؟'),
    options: [
      L('Weitere Bildgebung wie MRT/CT und gegebenenfalls genetische Abklärung können die Einordnung unterstützen.', 'Additional imaging such as MRI/CT and, when appropriate, genetic evaluation may help clarify the diagnosis.', 'تصویربرداری تکمیلی مانند MRI/CT و در صورت لزوم ارزیابی ژنتیکی می‌توانند به روشن‌شدن تشخیص کمک کنند.'),
      L('Die Überschrift der PDF legt die Diagnose unabhängig vom Befund fest.', 'The PDF heading establishes the diagnosis regardless of the findings.', 'عنوان PDF فارغ از یافته‌ها تشخیص را مشخص می‌کند.'),
      L('Eine atypische Verteilung beweist eine bestimmte Genvariante.', 'An atypical distribution proves a specific genetic variant.', 'توزیع نامعمول یک واریانت ژنتیکی مشخص را ثابت می‌کند.'),
      L('Weitere Untersuchungen sind bei Unsicherheit grundsätzlich ausgeschlossen.', 'Further testing is categorically excluded when the diagnosis is uncertain.', 'در صورت نامشخص‌بودن تشخیص، بررسی بیشتر اساساً ممنوع است.'),
    ],
    correct: 'A',
    explanations: [
      L('KDIGO nennt MRT/CT und genetische Testung als mögliche Hilfen in ausgewählten unklaren oder atypischen Situationen.', 'KDIGO describes MRI/CT and genetic testing as possible aids in selected uncertain or atypical situations.', 'KDIGO، MRI/CT و آزمایش ژنتیک را به‌عنوان کمک‌های ممکن در برخی موقعیت‌های نامشخص یا نامعمول مطرح می‌کند.'),
      L('Die PDF-Seite liefert nur einen Themenhinweis und keine Diagnosekriterien.', 'The PDF page provides only a topic cue, not diagnostic criteria.', 'صفحهٔ PDF فقط عنوان موضوع را دارد و معیار تشخیصی ارائه نمی‌کند.'),
      L('Bildgebung allein legt keine bestimmte Genvariante fest.', 'Imaging alone does not establish a specific genetic variant.', 'تصویربرداری به‌تنهایی واریانت ژنتیکی خاصی را مشخص نمی‌کند.'),
      L('Bei unklaren Befunden kann gezielte weitere Abklärung sinnvoll sein; die Auswahl gehört in den klinischen Kontext.', 'Targeted further assessment may be useful for uncertain findings; selection belongs in the clinical context.', 'در یافته‌های نامشخص، بررسی تکمیلی هدفمند ممکن است مفید باشد؛ انتخاب آن به زمینهٔ بالینی وابسته است.'),
    ],
    source: 'KDIGO 2025 ADPKD Guideline, Chapter 1, adult diagnosis algorithms and practice points.',
  },
]

export const ADPKD_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, questions.map(item => ({
  id: `${ADPKD_ID}-${lang}-${item.slug}`,
  fach: 'abdomen',
  tags: [ADPKD_ID],
  question: item.question[lang],
  options: item.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: item.correct,
  explanation: item.explanations[0][lang],
  wrongExplanations: Object.fromEntries(item.explanations.slice(1).map((explanation, index) => [String.fromCharCode(66 + index), explanation[lang]])),
  source: item.source,
}))]))

export const ADPKD_TOPIC_GROUP = {
  fachId: 'abdomen',
  kapitelId: 'abdomen-niere',
  title: L('Niere', 'Kidney', 'کلیه'),
  topics: [{ id: ADPKD_ID, title: L('ADPKD-Bildgebung', 'ADPKD imaging', 'تصویربرداری ADPKD') }],
}

const category = L('ADPKD-Bildgebung', 'ADPKD imaging', 'تصویربرداری ADPKD')
export const ADPKD_FLASHCARD_TOPIC = { id: ADPKD_ID, href: `/flashcards/${ADPKD_ID}`, title: ADPKD_COPY.title, icon: '◌', color: '#478c83', description: L('Bildgebung bei adulter ADPKD', 'Imaging in adult ADPKD', 'تصویربرداری در ADPKD بزرگسالان') }
export const ADPKD_FLASHCARDS = [
  { id: `${ADPKD_ID}-01-pattern`, topicId: ADPKD_ID, category, front: L('Welches Nierenmuster passt zu typischer adulter ADPKD?', 'Which renal pattern fits typical adult ADPKD?', 'چه الگوی کلیوی با ADPKD تیپیک بزرگسالان سازگار است؟'), answer: L('Zahlreiche Zysten in beiden Nieren, häufig mit vergrößertem Nierenvolumen.', 'Numerous cysts in both kidneys, often with increased kidney volume.', 'کیست‌های متعدد در هر دو کلیه، اغلب همراه با افزایش حجم کلیه‌ها.'), explanation: L('Das Muster ist ein Hinweis und wird mit Familienanamnese und klinischem Kontext eingeordnet.', 'The pattern is a clue and is interpreted with family history and clinical context.', 'این الگو یک سرنخ است و همراه سابقهٔ خانوادگی و زمینهٔ بالینی تفسیر می‌شود.'), source: 'KDIGO 2025 ADPKD Guideline, Chapter 1.' },
  { id: `${ADPKD_ID}-02-first-imaging`, topicId: ADPKD_ID, category, front: L('Welche Bildgebung empfiehlt KDIGO bei Erwachsenen mit familiärem Risiko zuerst?', 'Which imaging test does KDIGO recommend first in adults at family risk?', 'KDIGO در بزرگسالانِ دارای خطر خانوادگی، ابتدا کدام تصویربرداری را توصیه می‌کند؟'), answer: L('Abdomensonographie.', 'Abdominal ultrasound.', 'سونوگرافی شکم.'), explanation: L('MRT/CT und genetische Testung können ausgewählte unklare oder atypische Befunde ergänzen.', 'MRI/CT and genetic testing can supplement selected uncertain or atypical cases.', 'MRI/CT و آزمایش ژنتیک می‌توانند موارد نامشخص یا نامعمول را تکمیل کنند.'), source: 'KDIGO 2025 ADPKD Guideline, Recommendation 1.3.1.' },
  { id: `${ADPKD_ID}-03-uncertainty`, topicId: ADPKD_ID, category, front: L('Was tun bei atypischer oder nicht eindeutiger Bildgebung?', 'What may help when imaging is atypical or indeterminate?', 'در تصویربرداری نامعمول یا نامشخص چه چیزی می‌تواند کمک کند؟'), answer: L('MRT/CT oder genetische Abklärung können in ausgewählten Situationen zur Klärung beitragen.', 'MRI/CT or genetic evaluation may help clarify selected situations.', 'MRI/CT یا ارزیابی ژنتیکی ممکن است در برخی موارد به روشن‌شدن تشخیص کمک کند.'), explanation: L('Die Auswahl wird im klinischen Kontext getroffen; die PDF-Seite selbst liefert keine Kriterien.', 'Selection is made in clinical context; the PDF page itself provides no criteria.', 'انتخاب روش در زمینهٔ بالینی انجام می‌شود؛ خود صفحهٔ PDF معیاری ارائه نمی‌کند.'), source: 'KDIGO 2025 ADPKD Guideline, Chapter 1.' },
]
