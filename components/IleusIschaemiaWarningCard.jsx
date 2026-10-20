import Image from 'next/image'

const copy = {
  de: {
    title: 'CT-Zeichen einer möglichen Darmischämie',
    lead: 'Bei einer geschlossenen Schlinge die Darmwand und das Mesenterium gezielt mitbeurteilen.',
    findings: [
      'Wandverdickung und verminderte Kontrastmittelaufnahme',
      'Pneumatosis intestinalis: Gas in der Darmwand',
      'Portalvenöses Gas',
    ],
    alt: 'Koronare CT-Quelle aus Abdomen.pdf; die rosa Pfeile markieren die dort als Pneumatosis intestinalis bezeichneten Gasansammlungen.',
    caption: 'Die rosa Pfeile markieren Pneumatosis intestinalis im Quellbild. Abdomen.pdf, physische S. 72 (Druckseite 71).',
    cave: 'Wandverdickung ist unspezifisch. Pneumatosis oder portalvenöses Gas beweisen allein keine transmurale Nekrose; ihr Fehlen schließt eine Ischämie nicht aus. Wandkontrastierung, Mesenterium, Flüssigkeit und Closed-loop-Konfiguration im Gesamtbild beurteilen.',
    source: 'Einordnung: Millet et al., Eur Radiol. 2015;25:1823–1835, PMID 25850889; ACR Appropriateness Criteria, Suspected Small-Bowel Obstruction (2019); Le Corre et al., AJR. 2026, PMID 42053388.',
  },
  en: {
    title: 'CT signs of possible bowel ischaemia',
    lead: 'With a closed loop, assess the bowel wall and mesentery deliberately.',
    findings: [
      'Bowel-wall thickening and reduced contrast enhancement',
      'Pneumatosis intestinalis: gas within the bowel wall',
      'Portal venous gas',
    ],
    alt: 'Coronal CT source image from Abdomen.pdf; the pink arrows mark gas described there as pneumatosis intestinalis.',
    caption: 'The pink arrows mark pneumatosis intestinalis in the source image. Abdomen.pdf, physical p.72 (printed p.71).',
    cave: 'Wall thickening is nonspecific. Pneumatosis or portal venous gas alone does not prove transmural necrosis; their absence does not exclude ischaemia. Assess mural enhancement, mesentery, fluid and closed-loop configuration together.',
    source: 'Evidence context: Millet et al., Eur Radiol. 2015;25:1823–1835, PMID 25850889; ACR Appropriateness Criteria, Suspected Small-Bowel Obstruction (2019); Le Corre et al., AJR. 2026, PMID 42053388.',
  },
  fa: {
    title: 'نشانه‌های CT به نفع احتمال ایسکمی روده',
    lead: 'در لوپ بسته، دیوارهٔ روده و مزانتر را هم هدفمند ارزیابی کنید.',
    findings: [
      'ضخیم‌شدن دیواره و کاهش جذب مادهٔ حاجب',
      'پنوماتوز اینتستینال: وجود گاز در دیوارهٔ روده',
      'گاز وریدی پورت',
    ],
    alt: 'تصویر CT کرونال از Abdomen.pdf؛ پیکان‌های صورتی گازهایی را نشان می‌دهند که در منبع پنوماتوز اینتستینال نامیده شده‌اند.',
    caption: 'پیکان‌های صورتی پنوماتوز اینتستینال را در تصویر منبع نشان می‌دهند. Abdomen.pdf، صفحهٔ فیزیکی ۷۲ (چاپی ۷۱).',
    cave: 'ضخیم‌شدن دیواره غیراختصاصی است. پنوماتوز یا گاز ورید پورت به‌تنهایی نکروز تمام‌ضخامت را ثابت نمی‌کند؛ نبود آن‌ها نیز ایسکمی را رد نمی‌کند. جذب دیواره، مزانتر، مایع و شکل لوپ بسته را در کنار هم ارزیابی کنید.',
    source: 'برای تفسیر: Millet و همکاران، Eur Radiol. 2015;25:1823–1835، PMID 25850889؛ معیارهای ACR برای انسداد مشکوک رودهٔ باریک (۲۰۱۹)؛ Le Corre و همکاران، AJR. 2026، PMID 42053388.',
  },
}

export default function IleusIschaemiaWarningCard({ lang = 'de', className }) {
  const c = copy[lang] || copy.de
  return <article className={className}>
    <h3>{c.title}</h3>
    <p>{c.lead}</p>
    <ul>{c.findings.map(item => <li key={item}>{item}</li>)}</ul>
    <figure>
      <Image
        src="/educational/abdomen-ileus/pneumatosis-p72.png"
        alt={c.alt}
        width={292}
        height={320}
        sizes="(max-width: 640px) 100vw, 350px"
        style={{ width: 'min(100%, 350px)', height: 'auto', display: 'block', margin: '0 auto' }}
      />
      <figcaption>{c.caption}</figcaption>
    </figure>
    <p><strong>{lang === 'fa' ? 'احتیاط:' : lang === 'en' ? 'Caution:' : 'Cave:'}</strong> {c.cave}</p>
    <small>{c.source}</small>
  </article>
}
