import styles from './content.module.css'

const outline = 'M300 38 C196 0 82 33 64 105 C39 202 204 244 309 192 L269 166 C201 199 124 174 124 118 C124 76 201 48 273 74 Z'
const cracks = {
  longitudinal: 'M283 55 C197 23 109 58 96 111 C80 171 193 218 289 180',
  radial: 'M65 110 L124 118',
  bucket: 'M283 55 C197 23 109 58 96 111 C80 171 193 218 289 180',
  flap: 'M125 119 L90 142 L115 185',
}

export default function TearSchematic({ item, lang }) {
  const title = item.label[lang] || item.label.de
  const plane = item.id === 'horizontal' ? (lang === 'de' ? 'Querschnitt' : lang === 'fa' ? 'مقطع' : 'Cross-section') : (lang === 'de' ? 'Aufsicht' : lang === 'fa' ? 'نمای بالا' : 'Superior view')
  return <figure className={styles.tearSchematic}>
    <svg viewBox="0 0 400 250" role="img" aria-label={`${title} · ${plane}`}>
      <rect width="400" height="250" rx="16" fill="#f4f8fa" />
      {item.id === 'horizontal' ? <>
        <path d="M58 20 C72 103 136 123 240 99 L340 60 L340 18" fill="#e2e8ed" stroke="#6c7d89" strokeWidth="3" />
        <path d="M75 90 C111 134 202 143 274 111" fill="none" stroke="#56b6cd" strokeWidth="10" strokeLinecap="round" />
        <path d="M72 171 L342 171 L342 224 L72 224 Z" fill="#e2e8ed" stroke="#6c7d89" strokeWidth="3" />
        <path d="M76 169 L335 169" stroke="#56b6cd" strokeWidth="10" strokeLinecap="round" />
        <path d="M103 153 L290 107 L290 154 Z" fill="#a2afba" stroke="#586d7d" strokeWidth="3" strokeLinejoin="round" />
        <path d="M112 151 L290 131" stroke="#d74960" strokeWidth="5" strokeLinecap="round" />
      </> : <>
        <path d={outline} fill="#bcc9d1" stroke="#586d7d" strokeWidth="3" strokeLinejoin="round" />
        <path d={cracks[item.id]} fill="none" stroke="#d74960" strokeWidth="5" strokeLinecap="round" />
        {item.id === 'bucket' ? <path d="M272 74 C209 83 186 109 189 143 C192 174 228 188 271 168" fill="none" stroke="#d74960" strokeWidth="14" strokeLinecap="round" /> : null}
        {item.id === 'flap' ? <path d="M90 143 L133 183 L102 205 Z" fill="#d74960" fillOpacity=".65" stroke="#d74960" strokeWidth="3" /> : null}
      </>}
      <text x="200" y="242" textAnchor="middle" fill="#536777" fontSize="12" fontFamily="system-ui,sans-serif">{plane}</text>
    </svg>
    <figcaption>{lang === 'de' ? 'Schematische Darstellung · nicht maßstabsgetreu' : lang === 'fa' ? 'نمای شماتیک · بدون مقیاس واقعی' : 'Schematic representation · not to scale'}</figcaption>
  </figure>
}
