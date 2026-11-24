export const SHOULDER_MRI_PATH = '/msk/schulter/mrt'
export const SHOULDER_MRI_TITLE = { de: 'Schulter-MRT', en: 'Shoulder MRI', fa: 'ام‌آر‌آی شانه' }
const overview = { title: SHOULDER_MRI_TITLE, link: SHOULDER_MRI_PATH }

const topics = [
  ['planung-anatomie', 'Schichtplanung und Anatomie', 'Plane prescription and anatomy', 'طراحی برش‌ها و آناتومی', 1],
  ['subakromiales-impingement', 'Subakromiales Impingement und Akromionmorphologie', 'Subacromial impingement and acromial morphology', 'ایمپینجمنت ساب‌آکرومیال و شکل آکرومیون', 2],
  ['supraspinatus-partialruptur', 'Supraspinatus · Tendinopathie und Partialrupturen', 'Supraspinatus · Tendinopathy and partial tears', 'سوپرااسپیناتوس؛ تندینوپاتی و پارگی‌های نسبی', 2],
  ['supraspinatus-komplettruptur', 'Supraspinatus · Ausdehnung, Retraktion und Muskelqualität', 'Supraspinatus · Extent, retraction and muscle quality', 'سوپرااسپیناتوس؛ گستردگی، رتراکشن و کیفیت عضله', 3],
  ['subscapularis-bizeps-pulley', 'Subscapularis, Bizeps-Pulley und subkorakoidales Impingement', 'Subscapularis, biceps pulley and subcoracoid impingement', 'ساب‌اسکاپولاریس، پولی بایسپس و ایمپینجمنت ساب‌کوراکوئید', 3],
  ['internes-impingement', 'Internes Impingement · Posterosuperior und anterosuperior', 'Internal impingement · Posterosuperior and anterosuperior', 'ایمپینجمنت داخلی؛ خلفی‌فوقانی و قدامی‌فوقانی', 3],
  ['glenoid-track', 'Anteroinferiore Luxation · Hill-Sachs, Bankart und Glenoid Track', 'Anterior dislocation · Hill–Sachs, Bankart and glenoid track', 'دررفتگی قدامی‌تحتانی؛ هیل‌ساکس، بنکارت و گلنوئید ترَک', 3],
  ['labrum-kapsel', 'Anteroinferiore Luxation · Labrum, Knorpel und Kapselbänder', 'Anterior dislocation · Labrum, cartilage and capsular ligaments', 'دررفتگی قدامی‌تحتانی؛ لابروم، غضروف و رباط‌های کپسولی', 3],
  ['posteriore-luxation', 'Posteriore Luxation und Schulterinstabilität', 'Posterior dislocation and shoulder instability', 'دررفتگی خلفی و ناپایداری شانه', 3],
]

export const shoulderMriTopics = topics.map(([slug, de, en, fa, diff]) => {
  const id = `schulter-mrt-${slug}`
  return {
    slug,
    id,
    title: { de, en, fa },
    link: `${SHOULDER_MRI_PATH}/${slug}`,
    mcqLink: `/ueben/quiz?fach=msk&n=3&themen=${id}`,
    flashcardLink: `/flashcards/${id}`,
    group: ['Schulter-MRT'],
    groupOverview: overview,
    tags: slug === 'posteriore-luxation' ? ['Rö', 'CT', 'MRT'] : ['MRT'],
    diff,
    ready: true,
    inProgress: true,
    updatedAt: '2026-11-24',
  }
})
