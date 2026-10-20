const labels = {
  de: { title: 'Schematische Darstellung des subakromialen Raums', acromion: 'Akromion', tendon: 'Supraspinatussehne', humerus: 'Humeruskopf', space: 'Subakromialer Raum' },
  en: { title: 'Schematic of the subacromial space', acromion: 'Acromion', tendon: 'Supraspinatus tendon', humerus: 'Humeral head', space: 'Subacromial space' },
  fa: { title: 'نمای شماتیک فضای زیرآکرومیال', acromion: 'آکرومیون', tendon: 'تاندون سوپرااسپیناتوس', humerus: 'سر هومروس', space: 'فضای زیرآکرومیال' },
}

export default function ShoulderImpingementDiagram({ lang = 'de' }) {
  const t = labels[lang] || labels.de
  return <svg viewBox="0 0 400 250" role="img" aria-label={t.title} xmlns="http://www.w3.org/2000/svg" focusable="false">
    <title>{t.title}</title>
    <rect width="400" height="250" rx="18" fill="#ffffff" />
    <path d="M88 70c43-30 120-39 202-16l-8 24c-59-17-119-14-171 7-13 5-22 1-23-15Z" fill="#d9f2f1" stroke="#24304a" strokeWidth="5" strokeLinejoin="round" />
    <path d="M111 93c59-24 112-29 167-16" fill="none" stroke="#d84b42" strokeWidth="12" strokeLinecap="round" />
    <path d="M219 127c-6-43 16-69 54-74 35-5 69 24 70 62 1 36-26 61-62 62-33 1-57-17-62-50Z" fill="#f0e5f1" stroke="#24304a" strokeWidth="5" />
    <path d="M264 79v34" stroke="#38aeb1" strokeWidth="4" strokeDasharray="6 6" />
    <path d="M253 82l11-13 11 13" fill="none" stroke="#38aeb1" strokeWidth="4" strokeLinejoin="round" />
    <g fill="#24304a" fontFamily="Arial, sans-serif" fontSize="13">
      <text x="30" y="48">{t.acromion}</text><path d="M108 45 139 65" fill="none" stroke="#64748b" strokeWidth="1.5" />
      <text x="30" y="130">{t.tendon}</text><path d="M133 125 158 101" fill="none" stroke="#64748b" strokeWidth="1.5" />
      <text x="252" y="207">{t.humerus}</text>
      <text x="207" y="37" textAnchor="middle" fill="#167d80">{t.space}</text>
    </g>
  </svg>
}
