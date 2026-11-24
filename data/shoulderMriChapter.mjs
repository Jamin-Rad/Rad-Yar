export const SHOULDER_MRI_PATH = '/msk/schulter/mrt'
export const SHOULDER_MRI_TITLE = { de: 'Schulter-MRT', en: 'Shoulder MRI', fa: 'ام‌آر‌آی شانه' }
const overview = { title: SHOULDER_MRI_TITLE, link: SHOULDER_MRI_PATH }

const topics = [
  ['planung-anatomie', 'Schichtplanung und Anatomie', 'Plane prescription and anatomy', 'طراحی برش‌ها و آناتومی'],
  ['subakromiales-impingement', 'Subakromiales Impingement und Akromionmorphologie', 'Subacromial impingement and acromial morphology', 'ایمپینجمنت ساب‌آکرومیال و شکل آکرومیون'],
  ['supraspinatus-partialruptur', 'Supraspinatus · Tendinopathie und Partialrupturen', 'Supraspinatus · Tendinopathy and partial tears', 'سوپرااسپیناتوس؛ تندینوپاتی و پارگی‌های نسبی'],
  ['supraspinatus-komplettruptur', 'Supraspinatus · Ausdehnung, Retraktion und Muskelqualität', 'Supraspinatus · Extent, retraction and muscle quality', 'سوپرااسپیناتوس؛ گستردگی، رتراکشن و کیفیت عضله'],
  ['subscapularis-bizeps-pulley', 'Subscapularis, Bizeps-Pulley und subkorakoidales Impingement', 'Subscapularis, biceps pulley and subcoracoid impingement', 'ساب‌اسکاپولاریس، پولی بایسپس و ایمپینجمنت ساب‌کوراکوئید'],
  ['internes-impingement', 'Internes Impingement · Posterosuperior und anterosuperior', 'Internal impingement · Posterosuperior and anterosuperior', 'ایمپینجمنت داخلی؛ خلفی‌فوقانی و قدامی‌فوقانی'],
  ['glenoid-track', 'Anteroinferiore Luxation · Hill-Sachs, Bankart und Glenoid Track', 'Anterior dislocation · Hill–Sachs, Bankart and glenoid track', 'دررفتگی قدامی‌تحتانی؛ هیل‌ساکس، بنکارت و گلنوئید ترَک'],
  ['labrum-kapsel', 'Anteroinferiore Luxation · Labrum, Knorpel und Kapselbänder', 'Anterior dislocation · Labrum, cartilage and capsular ligaments', 'دررفتگی قدامی‌تحتانی؛ لابروم، غضروف و رباط‌های کپسولی'],
  ['posteriore-luxation', 'Posteriore Luxation und Schulterinstabilität', 'Posterior dislocation and shoulder instability', 'دررفتگی خلفی و ناپایداری شانه'],
]

const shoulderMriModules = topics.map(([slug, de, en, fa], index) => ({
  index,
  slug,
  id: `schulter-mrt-${slug}`,
  title: { de, en, fa },
}))

const lessons = [
  { slug: 'planung-anatomie', title: shoulderMriModules[0].title, modules: shoulderMriModules.slice(0, 1), tags: ['MRT'], diff: 1 },
  { slug: 'impingement', title: { de: 'Impingement', en: 'Impingement', fa: 'ایمپینجمنت' }, modules: shoulderMriModules.slice(1, 6), tags: ['MRT'], diff: 3 },
  { slug: 'luxation', title: { de: 'Luxation', en: 'Dislocation', fa: 'دررفتگی' }, modules: shoulderMriModules.slice(6), tags: ['Rö', 'CT', 'MRT'], diff: 3 },
]

export const shoulderMriTopics = lessons.map(({ slug, title, modules, tags, diff }) => {
  const id = `schulter-mrt-${slug}`
  return {
    slug,
    id,
    title,
    modules,
    link: `${SHOULDER_MRI_PATH}/${slug}`,
    mcqLink: `/ueben/quiz?fach=msk&n=${modules.length * 3}&themen=${id}`,
    flashcardLink: `/flashcards/${id}`,
    group: ['Schulter-MRT'],
    groupOverview: overview,
    tags,
    diff,
    ready: true,
    inProgress: true,
    updatedAt: '2026-11-24',
  }
})
