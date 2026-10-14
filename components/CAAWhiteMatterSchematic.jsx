import { useId } from 'react'
import styles from './CAAWhiteMatterSchematic.module.css'
const labels = {
  de:{white:'Subkortikales Marklager',area:'Centrum semiovale',zoom:'Vergrößerung',schema:'Schematische Darstellung',fluid:'Liquorraum',vessel:'Kleines Gefäß',foci:'Helle WMH-Herde'},
  en:{white:'Subcortical white matter',area:'Centrum semiovale',zoom:'Magnified view',schema:'Schematic illustration',fluid:'CSF space',vessel:'Small vessel',foci:'Bright WMH foci'},
  fa:{white:'ماده سفید زیرقشری',area:'Centrum semiovale',zoom:'نمای بزرگ‌شده',schema:'نمای شماتیک',fluid:'فضای حاوی CSF',vessel:'رگ کوچک',foci:'کانون‌های روشن WMH'},
}
const foci=[[76,86],[143,83],[61,117],[163,118],[77,157],[150,155],[91,181],[138,183]]
export default function CAAWhiteMatterSchematic({marker,lang}) {
  const copy=labels[lang] || labels.de
  const id=useId().replaceAll(':','')
  const pvs=marker==='pvs'
  return <figure className={styles.figure} data-wm-schematic={marker}>
    <div className={styles.labels}><span>{pvs ? copy.area : copy.white}</span><span>{copy.zoom}</span></div>
    <svg viewBox="0 0 450 235" role="img" aria-labelledby={id+'-title'}>
      <title id={id+'-title'}>{pvs ? copy.fluid+' · '+copy.vessel : copy.foci}</title>
      <defs><clipPath id={id+'-brain'}><path d="M112 25C50 24 28 70 28 128C27 189 62 214 109 212L115 202L123 212C169 214 200 183 199 128C199 70 174 25 112 25Z"/></clipPath></defs>
      <path className={styles.cortex} d="M112 25C50 24 28 70 28 128C27 189 62 214 109 212L115 202L123 212C169 214 200 183 199 128C199 70 174 25 112 25Z"/>
      <path className={styles.whiteMatter} d="M105 43C62 45 46 80 45 128C42 171 70 196 103 196L112 184L126 196C161 195 183 169 181 127C181 77 163 44 127 43L115 61Z"/>
      <path className={styles.sulci} d="M64 47L74 61M45 79L59 85M35 124L49 125M43 166L56 160M67 199L76 184M163 48L153 62M189 85L176 91M193 132L180 131M184 169L171 161M163 196L154 181M115 27V73"/>
      <path className={styles.ventricle} d="M110 108C91 92 80 114 96 126L109 148L114 133L119 148L132 126C148 113 135 92 119 108Z"/>
      <g clipPath={'url(#'+id+'-brain)'}>{foci.map(([x,y],index)=>pvs?<path key={index} d={`M${x-3} ${y-7}l6 14`} strokeWidth="5" strokeLinecap="round" className={styles.fluidStroke}/>:<ellipse key={index} cx={x} cy={y} rx={index%2 ? 5 : 4} ry="4" className={styles.wmh}/>)}</g>
      <circle cx="147" cy="82" r="22" className={styles.region}/><path d="M166 77L263 57M165 92L262 176" className={styles.connector}/>
      <rect x="263" y="33" width="165" height="170" rx="24" className={styles.inset}/>
      {pvs ? <g>{[0,1,2].map(index=><g key={index} transform={`translate(${295+index*44} 0)`}><path d="M-7 65C-18 91 13 130 2 170" strokeWidth="17" strokeLinecap="round" className={styles.fluidStroke}/><path d="M-7 65C-18 91 13 130 2 170" strokeWidth="4" strokeLinecap="round" className={styles.vessel}/></g>)}</g> : <g>{[[289,73,6,5],[323,92,5,5],[380,70,6,4],[399,108,5,6],[285,147,5,5],[342,151,6,5],[386,167,5,4]].map(([x,y,rx,ry],index)=><ellipse key={index} cx={x} cy={y} rx={rx} ry={ry} className={styles.wmh}/>)}</g>}
    </svg>
    <figcaption><span>{copy.schema}</span><span className={styles.legend}>{pvs ? <><i className={styles.fluidKey}/>{copy.fluid}<i className={styles.vesselKey}/>{copy.vessel}</> : <><i className={styles.wmhKey}/>{copy.foci}</>}</span></figcaption>
  </figure>
}
