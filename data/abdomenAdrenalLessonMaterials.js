const L = (de, en, fa) => ({ de, en, fa })

// Lesson-local teaching material prepared for coordinator review.
// This module is intentionally not registered in shared quiz or flashcard banks.
export const ADRENAL_LESSON_CHECK = {
  question: L(
    'Eine Nebennierenraumforderung zeigt einen Washout wie ein Adenom. Was lässt sich daraus schließen?',
    'An adrenal mass shows washout resembling an adenoma. What can you conclude?',
    'یک توده آدرنال Washout شبیه آدنوم دارد. چه نتیجه‌ای می‌توان گرفت؟',
  ),
  options: [
    L('Ein Phäochromozytom ist damit sicher ausgeschlossen.', 'Pheochromocytoma is thereby excluded.', 'فئوکروموسیتوم با این یافته قطعاً رد می‌شود.'),
    L('Washout allein schließt ein Phäochromozytom nicht sicher aus.', 'Washout alone does not reliably exclude pheochromocytoma.', 'Washout به‌تنهایی فئوکروموسیتوم را با اطمینان رد نمی‌کند.'),
    L('Die Hormonaktivität ist damit geklärt.', 'Hormonal activity is thereby established.', 'فعالیت هورمونی با این یافته مشخص می‌شود.'),
  ],
  answer: 1,
  explanation: L(
    'Phäochromozytome können ein adenomähnliches Washout zeigen. Bildmuster und klinische beziehungsweise hormonelle Abklärung müssen getrennt beurteilt werden.',
    'Pheochromocytomas can show adenoma-like washout. Imaging pattern and clinical or hormonal assessment must be considered separately.',
    'فئوکروموسیتوم‌ها می‌توانند Washout شبیه آدنوم داشته باشند. الگوی تصویربرداری و ارزیابی بالینی یا هورمونی باید جداگانه بررسی شوند.',
  ),
  diagramCaption: L('Schematische Lagebeziehung; keine Patientendarstellung.', 'Schematic anatomy; not patient imaging.', 'نمای شماتیک آناتومی؛ تصویر بیمار نیست.'),
}

export const ADRENAL_QUESTION_DRAFTS = [
  {
    id: 'adrenal-adenoma-microscopic-fat',
    source: 'Abdomen.pdf pp.59–60; ESE/ENSAT 2023 for the unenhanced CT context',
    question: L('Welches MRT-Muster passt zu mikroskopischem intrazellulärem Fett in einem lipidreichen Adenom?', 'Which MRI pattern fits microscopic intracellular fat in a lipid-rich adenoma?', 'کدام الگوی MRI با چربی میکروسکوپیک داخل‌سلولی در آدنوم پرچربی سازگار است؟'),
    options: [
      L('Homogener Signalabfall in der Opposed-Phase.', 'Homogeneous signal loss on opposed-phase imaging.', 'افت همگن سیگنال در تصویربرداری opposed-phase.'),
      L('Ausschließlich ein dunkler Rand an Fett-Wasser-Grenzen.', 'Only a dark rim at fat–water interfaces.', 'فقط حاشیه تیره در مرز چربی و آب.'),
      L('Starker Signalabfall makroskopischer Fettanteile nur in der Fettsättigung.', 'Marked signal loss of macroscopic fat only on fat-suppressed imaging.', 'افت بارز سیگنال چربی ماکروسکوپیک فقط در تصویربرداری با سرکوب چربی.'),
    ],
    answer: 0,
    rationale: L('Opposed-Phase kann den mikroskopischen intrazellulären Fettanteil als diffusen homogenen Signalabfall zeigen. Ein India-ink-Rand markiert dagegen Fett-Wasser-Grenzen.', 'Opposed-phase imaging can show microscopic intracellular fat as diffuse homogeneous signal loss. An India-ink rim instead marks fat–water interfaces.', 'تصویربرداری opposed-phase می‌تواند چربی میکروسکوپیک داخل‌سلولی را به‌صورت افت همگن و منتشر سیگنال نشان دهد؛ حاشیه India-ink مرز چربی و آب را مشخص می‌کند.'),
  },
  {
    id: 'adrenal-myelolipoma-macroscopic-fat',
    source: 'Abdomen.pdf pp.61–62',
    question: L('Welche Kombination stützt in der passenden Morphologie ein Myelolipom?', 'Which combination supports myelolipoma in the appropriate morphologic context?', 'در مورفولوژی مناسب، کدام ترکیب از یافته‌ها از مایلولیپوما حمایت می‌کند؟'),
    options: [
      L('Sichtbare makroskopische Fettanteile mit deutlichem Signalabfall in fettgesättigten Sequenzen.', 'Visible macroscopic fat with marked signal loss on fat-suppressed sequences.', 'چربی ماکروسکوپیک قابل مشاهده همراه با افت بارز سیگنال در توالی‌های سرکوب چربی.'),
      L('Nur diffuser Signalabfall in Opposed-Phase ohne sichtbares Fett.', 'Only diffuse opposed-phase signal loss without visible fat.', 'فقط افت منتشر سیگنال در opposed-phase بدون چربی قابل مشاهده.'),
      L('Homogene starke arterielle Anreicherung als alleiniges Kriterium.', 'Homogeneous intense arterial enhancement as the sole criterion.', 'تقویت شریانی شدید و همگن به‌عنوان تنها معیار.'),
    ],
    answer: 0,
    rationale: L('Das Myelolipom enthält typischerweise makroskopisches Fett neben hämatopoetischem Gewebe. Fettsättigung unterdrückt das makroskopische Fett; das Gesamtmuster bleibt entscheidend.', 'Myelolipoma typically contains macroscopic fat with haematopoietic tissue. Fat suppression reduces signal from macroscopic fat; the overall pattern remains important.', 'مایلولیپوما معمولاً حاوی چربی ماکروسکوپیک در کنار بافت خون‌ساز است. سرکوب چربی سیگنال چربی ماکروسکوپیک را کاهش می‌دهد؛ الگوی کلی همچنان تعیین‌کننده است.'),
  },
  {
    id: 'adrenal-pheochromocytoma-washout',
    source: 'Abdomen.pdf p.63; Endocrine Society PPGL guideline 2014 for the washout pitfall',
    question: L('Welche Aussage zum Washout einer Nebennierenraumforderung ist am sichersten?', 'Which statement about washout in an adrenal mass is safest?', 'کدام عبارت درباره Washout توده آدرنال ایمن‌تر است؟'),
    options: [
      L('Ein adenomhafter Washout schließt ein Phäochromozytom aus.', 'Adenoma-like washout excludes pheochromocytoma.', 'Washout شبیه آدنوم، فئوکروموسیتوم را رد می‌کند.'),
      L('Phäochromozytome können adenomhafte Washout-Muster imitieren.', 'Pheochromocytomas can mimic adenoma-like washout patterns.', 'فئوکروموسیتوم‌ها می‌توانند الگوی Washout شبیه آدنوم را تقلید کنند.'),
      L('Washout bestimmt unabhängig vom Kontext die Hormonaktivität.', 'Washout determines hormonal activity independent of context.', 'Washout مستقل از زمینه، فعالیت هورمونی را مشخص می‌کند.'),
    ],
    answer: 1,
    rationale: L('Ein adenomhafter Washout ist kein sicherer Ausschluss eines Phäochromozytoms und beantwortet die Hormonfrage nicht.', 'Adenoma-like washout does not reliably exclude pheochromocytoma and does not answer the hormonal question.', 'Washout شبیه آدنوم فئوکروموسیتوم را با اطمینان رد نمی‌کند و پاسخ‌گوی پرسش فعالیت هورمونی نیست.'),
  },
  {
    id: 'adrenal-neuroblastoma-origin',
    source: 'Abdomen.pdf p.64; paired Wilms lesson for renal-origin comparison',
    question: L('Welche Kombination spricht bei einer kindlichen Oberbauchraumforderung eher für einen sympathoadrenalen Ursprung?', 'Which combination in a child’s upper abdominal mass favours a sympathoadrenal origin?', 'در توده قسمت فوقانی شکم کودک، کدام ترکیب بیشتر به نفع منشأ سمپاتوآدرنال است؟'),
    options: [
      L('Verdrängte Niere, Mittellinienüberschreitung und Gefäßummauerung im Gesamtmuster.', 'A displaced kidney, midline crossing and vascular encasement in the overall pattern.', 'جابجایی کلیه، عبور از خط وسط و احاطه عروق در الگوی کلی.'),
      L('Einzelnes Zeichen ohne Beurteilung der Organbeziehung.', 'One isolated sign without assessing organ relationships.', 'یک نشانه منفرد بدون ارزیابی ارتباط با اندام‌ها.'),
      L('Ein sicherer Nierenursprung allein aufgrund der Tumorgröße.', 'Renal origin established solely by tumour size.', 'اثبات منشأ کلیوی فقط بر اساس اندازه تومور.'),
    ],
    answer: 0,
    rationale: L('Verdrängung statt Nierenursprung sowie Mittellinienüberschreitung und Gefäßummauerung können im passenden Kontext einen sympathoadrenalen Ursprung stützen. Kein Einzelzeichen beweist ihn allein.', 'Displacement rather than renal origin, together with midline crossing and vascular encasement, can support a sympathoadrenal origin in context. No single sign proves it alone.', 'جابه‌جایی کلیه به‌جای منشأ کلیوی، همراه با عبور از خط وسط و احاطه عروق، در زمینه مناسب از منشأ سمپاتوآدرنال حمایت می‌کند؛ هیچ نشانه‌ای به‌تنهایی آن را ثابت نمی‌کند.'),
  },
]

const cards = [
  {
    id: 'incidentaloma-meaning',
    category: L('Begriffe', 'Terminology', 'اصطلاحات'),
    front: L('Was sagt der Begriff „Nebenniereninzidentalom“ aus – und was nicht?', 'What does “adrenal incidentaloma” describe, and what does it not describe?', 'اصطلاح «اینسی‌دنتالوم آدرنال» چه چیزی را بیان می‌کند و چه چیزی را نه؟'),
    answer: L('Es beschreibt die zufällige Entdeckung ohne gezielte Nebennierenfrage; Gutartigkeit und Hormonaktivität sind damit nicht festgelegt.', 'It describes discovery by chance without a targeted adrenal question; it does not establish benignity or hormonal activity.', 'کشف اتفاقی بدون پرسش هدفمند درباره آدرنال را توصیف می‌کند؛ خوش‌خیمی یا فعالیت هورمونی را مشخص نمی‌کند.'),
    explanation: L('Befundmuster, klinischer Kontext und hormonelle Abklärung sind getrennt zu beurteilen.', 'Imaging pattern, clinical context and hormonal assessment are considered separately.', 'الگوی تصویربرداری، زمینه بالینی و ارزیابی هورمونی باید جداگانه بررسی شوند.'),
  },
  {
    id: 'adenoma-microscopic-fat',
    category: L('Adenom', 'Adenoma', 'آدنوم'),
    front: L('Welches MRT-Zeichen passt zu mikroskopischem intrazellulärem Fett im lipidreichen Adenom?', 'Which MRI sign fits microscopic intracellular fat in a lipid-rich adenoma?', 'کدام نشانه MRI با چربی میکروسکوپیک داخل‌سلولی در آدنوم پرچربی سازگار است؟'),
    answer: L('Ein homogener Signalabfall in der Opposed-Phase.', 'Homogeneous signal loss on opposed-phase imaging.', 'افت همگن سیگنال در تصویربرداری opposed-phase.'),
    explanation: L('Dieses Muster unterscheidet sich vom deutlichen Signalabfall makroskopischer Fettanteile in fettgesättigten Sequenzen.', 'This pattern differs from the marked signal loss of macroscopic fat on fat-suppressed sequences.', 'این الگو با افت بارز سیگنال چربی ماکروسکوپیک در توالی‌های سرکوب چربی تفاوت دارد.'),
  },
  {
    id: 'myelolipoma-macroscopic-fat',
    category: L('Myelolipom', 'Myelolipoma', 'مایلولیپوما'),
    front: L('Welche Fettart ist für ein Myelolipom typisch, und wie reagiert sie auf Fettsättigung?', 'What type of fat is typical of myelolipoma, and how does it behave with fat suppression?', 'چه نوع چربی در مایلولیپوما معمول است و در سرکوب چربی چه رفتاری دارد؟'),
    answer: L('Makroskopisch sichtbares Fett mit deutlichem Signalabfall in fettgesättigten Sequenzen.', 'Visible macroscopic fat with marked signal loss on fat-suppressed sequences.', 'چربی ماکروسکوپیک قابل مشاهده با افت بارز سیگنال در توالی‌های سرکوب چربی.'),
    explanation: L('Ein Myelolipom enthält außerdem hämatopoetisches Gewebe; die Beurteilung folgt dem Gesamtmuster.', 'Myelolipoma also contains haematopoietic tissue; interpret the overall pattern.', 'مایلولیپوما همچنین حاوی بافت خون‌ساز است؛ الگوی کلی را ارزیابی کنید.'),
  },
  {
    id: 'pheochromocytoma-washout-pitfall',
    category: L('Phäochromozytom', 'Pheochromocytoma', 'فئوکروموسیتوم'),
    front: L('Schließt adenomhafter Washout ein Phäochromozytom sicher aus?', 'Does adenoma-like washout reliably exclude pheochromocytoma?', 'آیا Washout شبیه آدنوم فئوکروموسیتوم را با اطمینان رد می‌کند؟'),
    answer: L('Nein. Ein Phäochromozytom kann ein adenomähnliches Washout imitieren.', 'No. Pheochromocytoma can mimic adenoma-like washout.', 'خیر. فئوکروموسیتوم می‌تواند Washout شبیه آدنوم را تقلید کند.'),
    explanation: L('Washout allein schließt es nicht aus und bestimmt keine Hormonaktivität.', 'Washout alone does not exclude it and does not determine hormonal activity.', 'Washout به‌تنهایی آن را رد نمی‌کند و فعالیت هورمونی را هم مشخص نمی‌سازد.'),
  },
  {
    id: 'neuroblastoma-localisation',
    category: L('Neuroblastom', 'Neuroblastoma', 'نوروبلاستوما'),
    front: L('Welche Bildbeziehungen stützen bei einer kindlichen Raumforderung einen sympathoadrenalen Ursprung?', 'Which imaging relationships support a sympathoadrenal origin in a child’s mass?', 'کدام روابط تصویری در توده کودک از منشأ سمپاتوآدرنال حمایت می‌کنند؟'),
    answer: L('Verdrängung der Niere, Mittellinienüberschreitung und Gefäßummauerung im Gesamtmuster.', 'Displacement of the kidney, midline crossing and vascular encasement in the overall pattern.', 'جابجایی کلیه، عبور از خط وسط و احاطه عروق در الگوی کلی.'),
    explanation: L('Diese Zeichen stützen die Einordnung im passenden Kontext, sind aber keine isolierten Beweise. Sequenzen des Quell-MRT sind nicht dokumentiert.', 'These signs support assessment in context but are not standalone proof. The source MRI sequences are not documented.', 'این نشانه‌ها در زمینه مناسب به ارزیابی کمک می‌کنند، اما به‌تنهایی اثبات‌کننده نیستند. توالی‌های MRI منبع ثبت نشده‌اند.'),
  },
]

export const ADRENAL_FLASHCARD_TOPIC = {
  id: 'nebennierenraumforderungen',
  area: 'Abdomen',
  chapter: 'Nebenniere',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/nebennierenraumforderungen',
  title: L('Nebennierenraumforderungen', 'Adrenal masses', 'توده‌های آدرنال'),
  subtitle: L('Fettmuster · Washout-Falle · Tumorursprung', 'Fat patterns · washout pitfall · tumour origin', 'الگوی چربی · دام Washout · منشأ تومور'),
}

export const ADRENAL_FLASHCARDS = cards.map((card, index) => ({
  ...card,
  id: `nebennierenraumforderungen-${String(index + 1).padStart(2, '0')}-${card.id}`,
  topicId: ADRENAL_FLASHCARD_TOPIC.id,
}))
