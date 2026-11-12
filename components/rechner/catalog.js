const L = (de, en, fa) => ({ de, en, fa })
export const GROUPS = [
  { id: 'neuro-gefaesse', icon: 'brain', name: L('Neuro & Gefäße', 'Neuro & vessels', 'نورو و عروق') },
  { id: 'herz-thorax', icon: 'lungs', name: L('Herz & Thorax', 'Heart & thorax', 'قلب و توراکس') },
  { id: 'mamma', icon: 'breast', name: L('Mamma', 'Breast', 'پستان') },
  { id: 'abdomen', icon: 'abdomen', name: L('Abdomen', 'Abdomen', 'شکم') },
  { id: 'urogenital', icon: 'kidney', name: L('Urogenital', 'Urogenital', 'اوروژنیتال') },
  { id: 'onko', icon: 'nodes', name: L('Onkologie', 'Oncology', 'انکولوژی') },
  { id: 'wirbelsaeule', icon: 'spine', name: L('Wirbelsäule', 'Spine', 'ستون فقرات') },
]
export const TOOLS = [
  { id: 'kaiser-score', group: 'mamma', icon: 'breast', href: '/kaiser-score', name: L('Kaiser Score', 'Kaiser Score', 'Kaiser Score'), description: L('Anreichernde Läsionen in der Mamma-MRT', 'Enhancing lesions on breast MRI', 'ضایعات دارای جذب در MRI پستان'), aliases: 'breast mri ks کایزر' },
  { id: 'fleischner', group: 'herz-thorax', icon: 'lungs', href: '/fleischner', name: L('Fleischner', 'Fleischner', 'Fleischner'), description: L('Inzidentelle Lungenrundherde', 'Incidental pulmonary nodules', 'ندول‌های اتفاقی ریه'), aliases: 'lung nodule solid subsolid ریه فلایشنر' },
  { id: 'node-rads', group: 'onko', icon: 'nodes', href: '/node-rads', name: L('Node-RADS', 'Node-RADS', 'Node-RADS'), description: L('Lymphknoten in CT und MRT', 'Lymph nodes on CT and MRI', 'غدد لنفاوی در CT و MRI'), aliases: 'noderads lymph nodes لنفاوی', alsoIn: ['mamma'] },
  { id: 'boston-v2', group: 'neuro-gefaesse', icon: 'brain', name: L('Boston v2.0', 'Boston v2.0', 'Boston v2.0'), description: L('Zerebrale Amyloidangiopathie', 'Cerebral amyloid angiopathy', 'آنژیوپاتی آمیلوئید مغزی'), aliases: 'caa boston criteria بوستون' },
  { id: 'evans-index', group: 'neuro-gefaesse', icon: 'brain', name: L('Evans-Index', 'Evans index', 'شاخص Evans'), description: L('Ventrikelweite im Verhältnis zum Schädel', 'Ventricular width relative to skull diameter', 'عرض بطن نسبت به قطر جمجمه'), aliases: 'evans hydrocephalus nph هیدروسفالی اوانز' },
  { id: 'nascet', group: 'neuro-gefaesse', icon: 'vessel', name: L('NASCET', 'NASCET', 'NASCET'), description: L('Stenosegrad der A. carotis interna', 'Internal carotid artery stenosis', 'درصد تنگی شریان کاروتید داخلی'), aliases: 'carotid stenosis کاروتید تنگی' },
  { id: 'prostata-psa', group: 'urogenital', icon: 'kidney', href: '/prostata-psa', name: L('PSA & PSA-Dichte', 'PSA & PSA density', 'PSA و چگالی PSA'), description: L('Prostatavolumen und PSA-Dichte', 'Prostate volume and PSA density', 'حجم پروستات و چگالی PSA'), aliases: 'prostate prostata psad density حجم پروستات' },
  { id: 'pi-rads', group: 'urogenital', icon: 'kidney', href: '/pi-rads', name: L('PI-RADS v2.1', 'PI-RADS v2.1', 'PI-RADS v2.1'), description: L('Prostata-MRT strukturiert einordnen', 'Structured prostate MRI assessment', 'ارزیابی ساختاریافته MRI پروستات'), aliases: 'pirads prostate prostata dwi t2 dce پیراد پروستات' },
  { id: 'khk-vortestwahrscheinlichkeit', group: 'herz-thorax', icon: 'heart', href: '/khk-vortestwahrscheinlichkeit', name: L('KHK-Vortestwahrscheinlichkeit', 'CAD pre-test probability', 'احتمال پیش‌آزمون CAD'), description: L('Stabile Brustschmerzen · DISCHARGE / NVL', 'Stable chest pain · DISCHARGE / NVL', 'درد پایدار قفسه سینه · DISCHARGE / NVL'), aliases: 'cad coronary discharge قلب کرونر' },
  { id: 'birads-masse', group: 'mamma', icon: 'breast', name: L('BI-RADS · Herd', 'BI-RADS · Mass', 'BI-RADS · توده'), description: L('Mammographische Form und Rand', 'Mammographic shape and margin', 'شکل و حاشیه در ماموگرافی'), aliases: 'birads mass mammography بیراد توده ماموگرافی' },
  { id: 'birads-kalk', group: 'mamma', icon: 'breast', name: L('BI-RADS · Kalzifikationen', 'BI-RADS · Calcifications', 'BI-RADS · کلسیفیکاسیون'), description: L('Morphologie und Verteilung', 'Morphology and distribution', 'مورفولوژی و توزیع کلسیفیکاسیون'), aliases: 'birads kalk calcifications calcification بیراد کلسیفیکاسیون' },
  { id: 'icb', group: 'neuro-gefaesse', icon: 'brain', name: L('ICB-Volumen', 'ICH volume', 'حجم خونریزی مغزی'), description: L('Blutungsvolumen mit der ABC/2-Methode', 'Hemorrhage volume using ABC/2', 'حجم خونریزی با روش ABC/2'), aliases: 'ich hemorrhage bleeding abc2 خونریزی' },
  { id: 'ecst-nascet', group: 'neuro-gefaesse', icon: 'vessel', name: L('ECST ↔ NASCET', 'ECST ↔ NASCET', 'ECST ↔ NASCET'), description: L('Karotisstenosen umrechnen', 'Convert carotid stenosis measurements', 'تبدیل معیارهای تنگی کاروتید'), aliases: 'conversion carotid کاروتید تبدیل' },
  { id: 'lv-biplan-volumen', group: 'herz-thorax', icon: 'heart', name: L('LV-Volumen & EF', 'LV volume & EF', 'حجم LV و EF'), description: L('Biplane Flächen-Längen-Methode', 'Biplane area–length method', 'روش سطح–طول دوصفحه‌ای'), aliases: 'ejection fraction left ventricle heart ef lv بطن قلب کسر جهشی' },
  { id: 'ktq', group: 'herz-thorax', icon: 'heart', name: L('Kardiothorakaler Quotient', 'Cardiothoracic ratio', 'نسبت قلب به قفسه سینه'), description: L('Herzbreite im Verhältnis zum Thorax', 'Heart width relative to thoracic width', 'عرض قلب نسبت به عرض قفسه سینه'), aliases: 'ctr ktq cardiothoracic قلب' },
  { id: 'milz-index', group: 'abdomen', icon: 'abdomen', name: L('Milzindex & Volumen', 'Splenic index & volume', 'شاخص و حجم طحال'), description: L('Milzgröße aus drei Durchmessern', 'Spleen size from three diameters', 'اندازه طحال از سه قطر'), aliases: 'spleen splenic splenomegaly طحال' },
  { id: 'niere-volumen', group: 'abdomen', icon: 'kidney', name: L('Nierenvolumen', 'Kidney volume', 'حجم کلیه'), description: L('Volumen mit der Ellipsoidformel', 'Volume using the ellipsoid formula', 'حجم با فرمول بیضی‌وار'), aliases: 'renal kidney volume کلیه' },
  { id: 'recist', group: 'onko', icon: 'nodes', name: L('RECIST 1.1', 'RECIST 1.1', 'RECIST 1.1'), description: L('Größenänderung von Zielläsionen', 'Change in target-lesion measurements', 'تغییر اندازه ضایعات هدف'), aliases: 'tumor response oncology followup تومور پاسخ' },
  { id: 'meyerding', group: 'wirbelsaeule', icon: 'spine', name: L('Meyerding', 'Meyerding', 'Meyerding'), description: L('Wirbelgleiten in Prozent und Grad', 'Vertebral slip percentage and grade', 'درصد و درجه لغزش مهره'), aliases: 'spondylolisthesis spine مهره لغزش مایردینگ' },
]
export const pick = (value, lang) => value[lang] || value.de
export function toolHref(tool, lang) {
  return `${tool.href || `/rechner/${tool.id}`}?lang=${lang}`
}
export function directoryHref({ group = 'all', query = '', lang = 'de' } = {}) {
  const params = new URLSearchParams({ lang })
  if (group !== 'all') params.set('group', group)
  if (query) params.set('q', query)
  return `/rechner?${params}`
}
// Bounded Damerau-Levenshtein matching also accepts adjacent swapped letters.
const normalizeSearch = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ß/g, 'ss').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[ـ‌]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim()
function distance(a,b) {
  const rows = Array.from({length:a.length+1},()=>Array(b.length+1).fill(0))
  for(let i=0;i<=a.length;i++) rows[i][0]=i
  for(let j=0;j<=b.length;j++) rows[0][j]=j
  for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) {
    rows[i][j]=Math.min(rows[i-1][j]+1,rows[i][j-1]+1,rows[i-1][j-1]+(a[i-1]===b[j-1]?0:1))
    if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]) rows[i][j]=Math.min(rows[i][j],rows[i-2][j-2]+1)
  }
  return rows[a.length][b.length]
}
export function filterTools(group, query) {
  const term = normalizeSearch(query).slice(0, 120).trim()
  const inGroup = tool => group === 'all' || tool.group === group || tool.alsoIn?.includes(group)
  if (!term) return TOOLS.filter(inGroup)

  const searchable = TOOLS.map(tool => {
    const category = GROUPS.find(item => item.id === tool.group)
    const fields = [tool.id, ...Object.values(tool.name), ...Object.values(tool.description), ...Object.values(category.name), tool.aliases]
    return { tool, fields: fields.map(normalizeSearch) }
  })
  const compactTerm = term.replace(/ /g, '')
  const literal = searchable.filter(({ fields }) =>
    fields.some(field => field.replace(/ /g, '').includes(compactTerm))
  )
  // A real match in another category must not turn into a different score.
  if (literal.length) return literal.map(({ tool }) => tool).filter(inGroup)

  const parts = term.split(' ')
  return searchable.filter(({ tool, fields }) => {
    if (!inGroup(tool)) return false
    const words = fields.flatMap(field => field.split(' '))
    return parts.every(part => words.some(word => {
      if (word.includes(part)) return true
      const tolerance = part.length >= 7 ? 2 : 1
      return part.length >= 4 && Math.abs(word.length - part.length) <= tolerance &&
        distance(part, word) <= tolerance
    }))
  }).map(({ tool }) => tool)
}
