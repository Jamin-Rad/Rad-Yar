const topicId = 'abdomen-pancreatic-cysts'
const L = (de, en, fa) => ({ de, en, fa })

export const PANCREATIC_CYST_FLASHCARD_TOPIC = {
  id: topicId,
  area: 'Abdomen',
  chapter: 'Pankreas',
  icon: 'CT',
  color: '#527c92',
  href: `/flashcards/${topicId}`,
  title: L('Zystische Pankreasläsionen', 'Cystic pancreatic lesions', 'ضایعات کیستیک پانکراس'),
  subtitle: L('Wand und Form gezielt unterscheiden', 'Distinguish wall and morphology', 'دیواره و شکل را هدفمند افتراق دهید'),
}

export const PANCREATIC_CYST_FLASHCARDS = [{
  id: `${topicId}-pseudocyst-context-clues`,
  topicId,
  category: L('Grundlagen und Differenzialdiagnose', 'Fundamentals and differential', 'مبانی و تشخیص افتراقی'),
  front: L('Welche anamnestischen Hinweise nennt Abdomen.pdf für eine Pankreas-Pseudozyste?', 'Which history clues does Abdomen.pdf give for a pancreatic pseudocyst?', 'Abdomen.pdf برای پسودوسیست پانکراس چه سرنخ‌هایی از شرح‌حال ذکر می‌کند؟'),
  answer: L('Eine bekannte Pankreatitis oder ein Bauchtrauma. Die Seite nennt zusätzlich eine unilokuläre Läsion oder mehrere kleine Zysten als bildgebende Hinweise; Verkalkungen und Parenchymatrophie können für chronische Entzündung sprechen.', 'A history of pancreatitis or abdominal trauma. The page also names a unilocular lesion or several small cysts as imaging clues; calcifications and parenchymal atrophy may suggest chronic inflammation.', 'سابقهٔ پانکراتیت یا تروما به شکم. صفحه همچنین ضایعهٔ تک‌حفره‌ای یا چند کیست کوچک را سرنخ تصویربرداری می‌داند؛ کلسیفیکاسیون و آتروفی پارانشیم ممکن است به نفع التهاب مزمن باشند.'),
  explanation: L('Diese Hinweise stützen den Verdacht, beweisen eine Pseudozyste aber nicht; Anamnese, Morphologie und Gangbezug müssen zusammen beurteilt werden. Quelle: Abdomen.pdf p.40 (printed p.39).', 'These clues support suspicion but do not prove a pseudocyst; history, morphology and duct communication must be assessed together. Source: Abdomen.pdf p.40 (printed p.39).', 'این سرنخ‌ها شک را تقویت می‌کنند اما پسودوسیست را ثابت نمی‌کنند؛ شرح‌حال، مورفولوژی و ارتباط با مجرا باید با هم ارزیابی شوند. منبع: Abdomen.pdf صفحهٔ ۴۰ (چاپی ۳۹).'),
  source: 'Abdomen.pdf p.40 (printed p.39)',
}, {
  id: `${topicId}-serous-macrocystic-contour`,
  topicId,
  category: L('Bildgebende Differenzialdiagnose', 'Imaging differential', 'تشخیص افتراقی تصویربرداری'),
  front: L('Welchen bildgebenden Hinweis nennt Abdomen.pdf für ein makrozystisches seröses Zystadenom?', 'Which imaging clue does Abdomen.pdf give for a macrocystic serous cystadenoma?', 'Abdomen.pdf برای سیستادنوم سروزی ماکروکیستیک به چه سرنخ تصویربرداری اشاره می‌کند؟'),
  answer: L('Eine lobulierte Kontur im Pankreaskopf. Das ist der begrenzte morphologische Hinweis auf der Seite; allein daraus folgt keine vollständige Charakterisierung.', 'A lobulated contour in the pancreatic head. This is the page’s limited morphologic clue; it does not provide a complete characterization by itself.', 'حاشیهٔ لوبوله در سر پانکراس. این تنها سرنخ مورفولوژیک محدود در صفحه است و به‌تنهایی مشخصه‌یابی کامل را فراهم نمی‌کند.'),
  explanation: L('Quelle: Abdomen.pdf p.40 (printed p.39), Abschnitt „Wichtige Differenzialdiagnose“. Die Seite zeigt hierfür kein separates Serous-Cystadenoma-Bild; deshalb bleibt die Karte beim Textbefund.', 'Source: Abdomen.pdf p.40 (printed p.39), “Important differential diagnosis.” The page has no separate serous-cystadenoma image, so the card stays with the written finding.', 'منبع: Abdomen.pdf صفحهٔ ۴۰ (چاپی ۳۹)، بخش «تشخیص افتراقی مهم». برای این مورد تصویر جداگانه‌ای از سیستادنوم سروزی وجود ندارد؛ بنابراین کارت به یافتهٔ متنی محدود می‌ماند.'),
  source: 'Abdomen.pdf p.40 (printed p.39)',
}]
