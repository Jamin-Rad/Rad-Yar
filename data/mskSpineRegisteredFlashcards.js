import { MSK_SPINE_LESSON_FLASHCARD_DRAFTS } from './mskSpineLessonAssessmentDrafts'

const L = (de, en, fa) => ({ de, en, fa })
const topics = {
  spinalkanalstenose: { title: L('Spinalkanalstenose', 'Spinal canal stenosis', 'تنگی کانال نخاعی'), chapter: L('Degenerative Wirbelsäule', 'Degenerative spine', 'ستون فقرات دژنراتیو') },
  spondylodiszitis: { title: L('Spondylodiszitis', 'Spondylodiscitis', 'اسپوندیلودی‌سکیت'), chapter: L('Infektionen der Wirbelsäule', 'Spinal infection', 'عفونت ستون فقرات') },
  'knochentumor-grundlagen': { title: L('Knochentumor-Grundlagen', 'Bone tumour fundamentals', 'مبانی تومور استخوان'), chapter: L('Knochentumoren', 'Bone tumours', 'تومورهای استخوان') },
  'morbus-bechterew-ws': { title: L('Morbus Bechterew', 'Ankylosing spondylitis', 'اسپوندیلیت آنکیلوزان'), chapter: L('Entzündliche Wirbelsäule', 'Inflammatory spine', 'ستون فقرات التهابی') },
  'morbus-scheuermann': { title: L('Morbus Scheuermann', "Scheuermann's disease", 'بیماری شویرمان'), chapter: L('Entwicklungsbedingte Wirbelsäulenmuster', 'Developmental spine patterns', 'الگوهای تکاملی ستون فقرات') },
}

export const MSK_SPINE_REGISTERED_FLASHCARD_TOPICS = Object.entries(topics).map(([id, topic]) => ({
  id,
  area: 'Wirbelsäule / MSK',
  chapter: topic.chapter,
  icon: 'MR',
  iconImage: '/fach/wirbelsaeule.png',
  color: '#0e7490',
  href: `/flashcards/${id}`,
  title: topic.title,
}))

const topicByDraftId = {
  'degenerative-wirbelsaeule-localization': 'spinalkanalstenose',
  'degenerative-wirbelsaeule-prognosis-signal': 'spinalkanalstenose',
  'spondylodiszitis-tb-clues': 'spondylodiszitis',
  'knochentumor-grundlagen-periosteum': 'knochentumor-grundlagen',
  'ws-entzuendlich-asas-mri': 'morbus-bechterew-ws',
  'ws-axspa-negative-mri': 'morbus-bechterew-ws',
  'ws-scheuermann-sorensen': 'morbus-scheuermann',
}

export const MSK_SPINE_REGISTERED_FLASHCARDS = MSK_SPINE_LESSON_FLASHCARD_DRAFTS
  .filter(card => topicByDraftId[card.id])
  .map(card => ({ ...card, topicId: topicByDraftId[card.id] }))
