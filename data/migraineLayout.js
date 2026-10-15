import { MIGRAINE_SECTIONS, MIGRAINE_CASES } from './migraine'

const L = (de, en, fa) => ({ de, en, fa })

// Use the maintained Test/CAA chapter structure while keeping every teaching topic.
export const MIGRAINE_CHAPTERS = [
  { id: 'grundlagen', icon: 'brain', title: L('Grundlagen', 'Foundations', 'مبانی'), topics: ['grundlagen'] },
  { id: 'indikation', icon: 'decision', title: L('Indikation & Protokoll', 'Indications & protocol', 'اندیکاسیون و پروتکل'), topics: ['indikation', 'protokoll'] },
  { id: 'mrt-diagnostik', icon: 'scan', title: L('MRT-Diagnostik', 'MRI assessment', 'ارزیابی با MRI'), topics: ['bildmuster', 'stroke-mimic', 'komplikationen'] },
  { id: 'differenzial', icon: 'vessel', title: L('Differenzialdiagnose & Befund', 'Differential diagnosis & report', 'تشخیص افتراقی و گزارش'), topics: ['differenzial', 'befund'] },
  { id: 'training', icon: 'case', title: L('Falltraining & Mini-Check', 'Case practice & mini-check', 'تمرین کیس و آزمون کوتاه'), topics: ['training'] },
  { id: 'take-home', icon: 'spark', title: 'Take Home Message', emphasis: true, topics: ['take-home'] },
]

export const MIGRAINE_TRACKED_IDS = MIGRAINE_CHAPTERS.filter(chapter => !chapter.emphasis).map(chapter => chapter.id)
export const MIGRAINE_PROGRESS_VERSION = 'migraene-template-v2'

export function resolveMigraineChapter(id) {
  if (id === 'takehome') return 'take-home'
  return MIGRAINE_CHAPTERS.find(chapter => chapter.id === id || chapter.topics.includes(id))?.id
}

const topic = id => MIGRAINE_SECTIONS.find(section => section.id === id)
const details = [MIGRAINE_CASES[0].why, topic('stroke-mimic').warning, topic('protokoll').lead, topic('bildmuster').note, topic('befund').note]
export const MIGRAINE_TAKE_HOME = topic('take-home').points.map((title, index) => ({ title, detail: details[index] }))
