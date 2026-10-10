import styles from './content.module.css'

const normalShape = 'M260 60 C172 20 60 67 64 150 C69 222 182 255 266 207 L237 177 C173 210 110 180 110 139 C110 93 182 72 235 96 Z'
const discoidShape = 'M260 60 C171 20 60 67 64 150 C69 222 182 255 266 207 C233 176 233 99 260 60 Z'

export function DiscoidComparison({ lang }) {
  const labels = lang === 'de' ? ['Normaler Außenmeniskus', 'Discoider Außenmeniskus'] : lang === 'fa' ? ['منیسک خارجی طبیعی', 'منیسک خارجی دیسکوئید'] : ['Normal lateral meniscus', 'Discoid lateral meniscus']
  return <div className={styles.discoidComparison} data-discoid-comparison>
    {labels.map((label,index) => <figure key={label} className={styles.discoidDiagram}>
      <h3>{label}</h3>
      <svg viewBox="0 0 340 280" role="img" aria-label={label}>
        <ellipse cx="168" cy="145" rx="126" ry="112" fill="#e6eef0" stroke="#b7cbd0" strokeWidth="2" />
        <path d={index ? discoidShape : normalShape} fill={index ? '#389fa6' : '#96aeb9'} stroke={index ? '#167780' : '#586f7c'} strokeWidth="3" />
        <text x="170" y="270" textAnchor="middle" fill="#506774" fontSize="13" fontFamily="system-ui,sans-serif">Superior view · lateral tibial plateau</text>
      </svg>
    </figure>)}
  </div>
}

function SagittalSlice({ x, y, bowtie, number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="138" height="90" rx="9" fill="#1c2430" stroke="#46556a" />
    <path d="M18 10 Q26 62 109 47 L121 9 M18 68 L120 68 L119 87 L18 87 Z" fill="#82909d" stroke="#b3bfca" strokeWidth="2" />
    {bowtie ? <path d="M23 53 L66 61 L114 51 L113 66 L65 64 L23 67 Z" fill="#080b11" stroke="#56c6ce" strokeWidth="1.5" /> : <path d="M24 54 L40 63 L24 67 Z M112 53 L95 63 L112 67 Z" fill="#080b11" />}
    <text x="124" y="22" textAnchor="end" fill="#d1dde7" fontSize="12">{number}</text>
  </g>
}

export function DiscoidMriSchematics() {
  return <div className={styles.discoidMriDiagrams} data-discoid-mri-diagrams dir="ltr" lang="en">
    <figure className={styles.discoidDiagram}>
      <h3>Coronal MRI schematic · body width</h3>
      <svg viewBox="0 0 500 350" role="img" aria-label="Coronal MRI schematic: lateral meniscal body width at least 15 mm; classic meniscus-to-tibia width ratio greater than 20 percent.">
        <rect width="500" height="350" rx="14" fill="#111925" />
        <text x="85" y="32" fill="#c8d7e3" fontSize="14">Medial</text><text x="330" y="32" fill="#c8d7e3" fontSize="14">Lateral</text>
        <path d="M78 54 L208 54 Q230 145 194 175 Q104 191 83 142 Z M270 54 L410 54 L403 142 Q358 186 290 175 Q254 140 270 54 Z" fill="#778490" stroke="#b8c4ce" strokeWidth="3" />
        <path d="M76 209 Q240 190 413 209 L411 260 L78 260 Z" fill="#778490" stroke="#b8c4ce" strokeWidth="3" />
        <path d="M81 182 L148 203 L80 203 Z" fill="#03060a" />
        <path d="M281 181 L411 179 L411 203 L280 204 Z" fill="#03060a" stroke="#56c6ce" strokeWidth="2" />
        <path d="M281 158 L411 158 M281 151 L281 165 M411 151 L411 165" stroke="#56c6ce" strokeWidth="2" />
        <path d="M281 165 L281 181 M411 165 L411 179" stroke="#56c6ce" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="346" y="148" textAnchor="middle" fill="#8ce4e6" fontSize="17">W ≥ 15 mm</text>
        <path d="M78 281 L412 281 M78 273 L78 289 M412 273 L412 289" stroke="#c6d2df" strokeWidth="2" />
        <text x="245" y="306" textAnchor="middle" fill="#d1dde7" fontSize="14">T = maximum tibial width</text>
        <text x="250" y="332" textAnchor="middle" fill="#8ce4e6" fontSize="14">Classic ratio: W / T &gt; 20%</text>
      </svg>
    </figure>
    <figure className={styles.discoidDiagram}>
      <h3>Sagittal MRI schematic · classic bow-tie sign</h3>
      <svg viewBox="0 0 500 350" role="img" aria-label="Historical sagittal MRI sign: continuous meniscal body on at least three consecutive 5-mm slices. Not a standalone criterion for modern thin-slice MRI.">
        <rect width="500" height="350" rx="14" fill="#111925" />
        <text x="25" y="31" fill="#d1dde7" fontSize="15">Normal meniscus</text>
        {[0,1,2].map(i => <SagittalSlice key={`normal-${i}`} x={25+i*156} y={44} number={i+1} bowtie={i===1} />)}
        <text x="25" y="167" fill="#8ce4e6" fontSize="15">Discoid meniscus · continuous body</text>
        {[0,1,2].map(i => <SagittalSlice key={`discoid-${i}`} x={25+i*156} y={180} number={i+1} bowtie />)}
        <text x="250" y="302" textAnchor="middle" fill="#d1dde7" fontSize="14">Historical criterion: ≥ 3 consecutive 5-mm slices</text>
        <text x="250" y="329" textAnchor="middle" fill="#a2b4c7" fontSize="12">Not a standalone criterion on thin-slice MRI</text>
      </svg>
    </figure>
  </div>
}
