import Image from 'next/image'
import styles from './CAAWhiteMatterMRI.module.css'
const L=(de,en,fa)=>({de,en,fa})
const examples={
  pvs:{src:'/educational/caa-wm/pvs-t2.jpg',width:764,height:690,figure:6,
    alt:L('Axiale T2-MRT mit erweiterten perivaskulären Räumen im Centrum semiovale und vergrößertem Ausschnitt rechts', 'Axial T2 MRI showing enlarged centrum semiovale perivascular spaces with a magnified inset on the right', 'MRI محوری T2 با فضاهای گشادشده اطراف عروقی در Centrum semiovale و نمای بزرگ‌شده در سمت راست'),
    caption:L('Weiße Pfeilspitzen: rundliche PVS. Schwarze Pfeilspitzen: längliche PVS.', 'White arrowheads: round PVS. Black arrowheads: elongated PVS.', 'سرپیکان‌های سفید: PVS گرد. سرپیکان‌های سیاه: PVS کشیده.')},
  wmh:{src:'/educational/caa-wm/wmh-multispot-t2.jpg',width:727,height:919,figure:7,
    alt:L('Axiale T2-MRT mit mehreren kleinen subkortikalen WMH im Multispot-Muster, durch weiße Pfeile markiert', 'Axial T2 MRI showing small subcortical WMH in a multispot pattern, indicated by white arrows', 'MRI محوری T2 با کانون‌های کوچک WMH زیرقشری در الگوی چندنقطه‌ای، مشخص‌شده با پیکان‌های سفید'),
    caption:L('Weiße Pfeile: einzelne subkortikale WMH im Multispot-Muster.', 'White arrows: individual subcortical WMH in the multispot pattern.', 'پیکان‌های سفید: کانون‌های WMH زیرقشری در الگوی چندنقطه‌ای.')},
}
const copy={zoom:L('Bild vergrößern', 'Enlarge image', 'بزرگ‌نمایی تصویر'),sequence:L('MRT · T2 axial', 'MRI · axial T2', 'MRI · T2 محوری'),figure:L('Abb.', 'Fig.', 'شکل')}
const pick=(value,lang)=>value[lang] || value.de
export default function CAAWhiteMatterMRI({marker,lang}) {
  const item=examples[marker]
  const alt=pick(item.alt,lang)
  return <figure className={styles.figure} data-wm-mri={marker}>
    <span className={styles.sequence}>{pick(copy.sequence,lang)}</span>
    <button type="button" className={styles.imageButton} aria-label={pick(copy.zoom,lang)+': '+alt} onClick={event=>{if(event.target.tagName !== 'IMG')event.currentTarget.querySelector('img')?.click()}}>
      <Image className={styles.image} src={item.src} alt={alt} width={item.width} height={item.height} sizes="(max-width: 1000px) 90vw, 460px" />
      <span className={styles.zoomHint} aria-hidden="true">{pick(copy.zoom,lang)} ⤢</span>
    </button>
    <figcaption>
      <p className={styles.caption}>{pick(item.caption,lang)}</p>
      <p className={styles.credit}><a href={`https://pmc.ncbi.nlm.nih.gov/articles/PMC11592298/#biomolecules-14-01459-f00${item.figure}`} target="_blank" rel="noopener noreferrer">Jensen-Kondering et al., 2024 · {pick(copy.figure,lang)} {item.figure}</a><span> · </span><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></p>
    </figcaption>
  </figure>
}
