const L = (de, en, fa) => ({ de, en, fa })

export const LUNG_ANATOMY_FLASHCARD_TOPIC = {
  id: 'lungenanatomie',
  area: 'Thorax',
  chapter: 'Anatomie',
  icon: 'CT',
  iconImage: '/fach/thorax.png',
  color: '#54c5c2',
  href: '/flashcards/lungenanatomie',
  title: L('Lungenanatomie', 'Lung anatomy', 'آناتومی ریه'),
  subtitle: L('Bronchopulmonale Segmente', 'Bronchopulmonary segments', 'سگمان‌های برونکوپولمونری'),
}

export const LUNG_ANATOMY_FLASHCARDS = [{
  id: 'lungenanatomie-left-basal-segments',
  topicId: 'lungenanatomie',
  category: L('Segmentnomenklatur', 'Segment nomenclature', 'نام‌گذاری سگمان‌ها'),
  front: L('Wie wird die gemeinsame Benennung S7+8 im linken Unterlappen häufig beschrieben?', 'How is the combined S7+8 label in the left lower lobe often described?', 'عنوان مشترک S7+8 در لوب تحتانی چپ معمولاً چگونه توصیف می‌شود؟'),
  answer: L('Als anteromediales Basalsegment. Je nach Nomenklatur können S7 (medial-basal) und S8 (anterior-basal) getrennt bezeichnet werden.', 'As the anteromedial basal segment. Depending on nomenclature, S7 (medial basal) and S8 (anterior basal) may be named separately.', 'به‌عنوان سگمان بازال آنترومدیال. بسته به نام‌گذاری، S7 (بازال مدیال) و S8 (بازال قدامی) ممکن است جداگانه نامیده شوند.'),
  explanation: L('Thorax.pdf führt links die gemeinsame Bezeichnung S7,8; die Lektion erläutert die Nomenklaturvariante und zeigt, dass Segmentnamen nicht immer seitenübergreifend gespiegelt sind.', 'Thorax.pdf uses the combined left-sided label S7,8; the lesson explains the nomenclature variant and that segment names are not always mirrored between sides.', 'Thorax.pdf در سمت چپ عنوان مشترک S7,8 را به‌کار می‌برد؛ درس این تفاوت نام‌گذاری را توضیح می‌دهد و نشان می‌دهد نام سگمان‌ها همیشه بین دو سمت قرینه نیست.'),
  source: 'Thorax.pdf physical p.7 (printed p.6); Siddharthan et al., J Appl Clin Med Phys. 2025; doi:10.1002/acm2.70193',
}]
