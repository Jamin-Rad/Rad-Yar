'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { useLanguage } from '@/providers/LanguageProvider'

const TOPICS = {
  de: [
    { id: 'roentgen-grundlagen', icon: '☢️', label: 'Röntgen-Kontrastmittel Grundlagen' },
    { id: 'mrt-km', icon: '🧲', label: 'MRT KM' },
    { id: 'nebenwirkung-jod', icon: '⚠️', label: 'Nebenwirkung jodhaltiger KM' },
    { id: 'nebenwirkung-gadolinium', icon: '🛡️', label: 'Nebenwirkung Gadolinium' },
    { id: 'schwangerschaft-stillzeit', icon: '🤰', label: 'Schwangerschaft und Stillzeit' },
  ],
  en: [
    { id: 'roentgen-grundlagen', icon: '☢️', label: 'X-ray contrast media basics' },
    { id: 'mrt-km', icon: '🧲', label: 'MRI contrast media' },
    { id: 'nebenwirkung-jod', icon: '⚠️', label: 'Adverse effects of iodinated CM' },
    { id: 'nebenwirkung-gadolinium', icon: '🛡️', label: 'Adverse effects of gadolinium' },
    { id: 'schwangerschaft-stillzeit', icon: '🤰', label: 'Pregnancy and breastfeeding' },
  ],
  fa: [
    { id: 'roentgen-grundlagen', icon: '☢️', label: 'مبانی مواد حاجب رادیوگرافی / CT' },
    { id: 'mrt-km', icon: '🧲', label: 'مواد حاجب MRI' },
    { id: 'nebenwirkung-jod', icon: '⚠️', label: 'عوارض مواد حاجب یددار' },
    { id: 'nebenwirkung-gadolinium', icon: '🛡️', label: 'عوارض گادولینیوم' },
    { id: 'schwangerschaft-stillzeit', icon: '🤰', label: 'بارداری و شیردهی' },
  ],
}

const UI = {
  de: {
    dir: 'ltr', home: 'RadYar', learn: 'Technik & Physik', title: 'Kontrastmittel',
    badge: 'Lehrbuch · Dr. Zia', mcq: 'MCQs starten', toc: 'Inhaltsverzeichnis', close: 'Menü schließen',
    lead: 'Praxisorientierte Lernseite zu Röntgen-Kontrastmitteln, MRT-Kontrastmitteln, Nebenwirkungen, PC-AKI, Schilddrüse sowie Schwangerschaft und Stillzeit.',
    merke: 'Merke', praxis: 'Praxis', cave: 'CAVE',
  },
  en: {
    dir: 'ltr', home: 'RadYar', learn: 'Physics & Tech', title: 'Contrast media',
    badge: 'Textbook · Dr. Zia', mcq: 'Start MCQs', toc: 'Table of contents', close: 'Close menu',
    lead: 'Practice-oriented learning page on X-ray contrast media, MRI contrast media, adverse effects, PC-AKI, thyroid issues, pregnancy and breastfeeding.',
    merke: 'Key point', praxis: 'Practice', cave: 'Caution',
  },
  fa: {
    dir: 'rtl', home: 'RadYar', learn: 'تکنیک و فیزیک', title: 'مواد حاجب',
    badge: 'جزوه آموزشی · Dr. Zia', mcq: 'شروع MCQ', toc: 'فهرست درس', close: 'بستن منو',
    lead: 'درس‌نامه کاربردی درباره مواد حاجب رادیوگرافی و CT، مواد حاجب MRI، عوارض یددار، عوارض گادولینیوم، بارداری و شیردهی.',
    merke: 'نکته مهم', praxis: 'کاربرد بالینی', cave: 'احتیاط',
  },
}

function t(lang) {
  return UI[lang] || UI.de
}

function topics(lang) {
  return TOPICS[lang] || TOPICS.de
}

function withLang(href, lang) {
  return lang && lang !== 'de' ? `${href}?lang=${lang}` : href
}

function InfoBox({ variant = 'info', title, children }) {
  const icons = { info: 'ℹ️', warning: '⚠️', danger: '🚨', success: '✅' }
  return (
    <div className={`${styles.infoBox} ${styles[variant]}`}>
      {title && <div className={styles.infoTitle}>{icons[variant]} {title}</div>}
      <div>{children}</div>
    </div>
  )
}

function Merke({ title, children }) {
  return (
    <div className={styles.merke}>
      <span className={styles.merkeTag}>{title}</span>
      {children}
    </div>
  )
}

function KMTable({ headers, rows, colColors }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FlowStep({ steps }) {
  return (
    <div className={styles.flow}>
      {steps.map((step, i) => (
        <div key={i} className={styles.flowRow}>
          <div className={`${styles.flowBox} ${step.variant ? styles[step.variant] : ''}`}>
            {step.icon && <span>{step.icon}</span>}
            <span>{step.text}</span>
          </div>
          {i < steps.length - 1 && <div className={styles.flowArrow}>↓</div>}
        </div>
      ))}
    </div>
  )
}

function Section({ id, icon, title, children }) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.h2}><span className={styles.h2Icon}>{icon}</span>{title}</h2>
      {children}
    </section>
  )
}

function RoentgenSection({ lang }) {
  const u = t(lang)
  if (lang === 'fa') {
    return (
      <Section id="roentgen-grundlagen" icon="☢️" title="مبانی مواد حاجب رادیوگرافی / CT">
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>مواد حاجب رادیونگاتیو</div>
            <p className={styles.text}>این مواد به علت جذب کم یا عدم جذب اشعه X، عبور اشعه را آسان‌تر می‌کنند و در تصویر نسبتاً تیره‌تر دیده می‌شوند.</p>
            <KMTable headers={['مثال‌ها', 'اصل تصویربرداری']} rows={[[ 'هوا، گاز، CO₂، آب', 'جذب کم اشعه → افزایش عبورپذیری اشعه X' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>مواد حاجب رادیوپوزیتیو</div>
            <p className={styles.text}>این مواد اشعه X را بیشتر از بافت اطراف جذب می‌کنند؛ علت، عدد اتمی بالاتر ماده کنتراست‌دهنده است.</p>
            <KMTable headers={['مثال‌ها', 'اصل تصویربرداری']} rows={[[ 'مواد یددار، باریوم سولفات', 'جذب بیشتر اشعه → چگالی بالاتر و روشن‌تر شدن تصویر' ]]} />
          </div>
        </div>

        <h3 className={styles.h3}>تقسیم‌بندی مواد حاجب رادیوگرافی</h3>
        <KMTable
          headers={['گروه', 'مثال', 'ویژگی', 'کاربرد معمول']}
          rows={[
            ['یددار غیر یونی، محلول در آب', 'Imeron®، Ultravist®', 'بدون بار الکتریکی، هیدروفیل‌تر، اسمولاریته کمتر و تحمل‌پذیری بهتر', 'استاندارد برای کاربرد داخل‌عروقی CT/آنژیوگرافی'],
            ['یددار یونی، محلول در آب', 'Gastrografin®', 'اسمولاریته بالاتر و عوارض بیشتر', 'کاربرد انترا‌ل؛ برای تزریق داخل‌عروقی مناسب نیست'],
            ['نامحلول در آب', 'Bariumsulfat', 'جذب نمی‌شود', 'تصویربرداری گوارشی؛ در شک به پرفوراسیون ممنوع'],
            ['رادیونگاتیو', 'هوا، CO₂، آب', 'جذب بسیار کم', 'دابل‌کنتراست و اتساع لومن'],
          ]}
        />
        <Merke title={u.merke}>در مواد حاجب یددار محلول در آب، ساختار مشترک <strong>حلقه تری‌یدوبنزن</strong> است. خود ید با عدد اتمی ۵۳ عامل اصلی ایجاد کنتراست در CT است.</Merke>

        <h3 className={styles.h3}>اپلیکیشن، غلظت و سرعت تزریق</h3>
        <KMTable
          headers={['بررسی', 'حجم معمول', 'سرعت تزریق', 'نکته عملی']}
          rows={[
            ['CT آمبولی ریه', 'حدود ۵۰–۷۰ ml', '۵ ml/s', 'نیاز به بولوس سریع و کانول مناسب دارد'],
            ['CTA آئورت / عروق سوپرا‌آئورتیک', 'حدود ۶۰–۸۰ ml', '۴–۵ ml/s', 'زمان‌بندی بولوس مهم است'],
            ['CT شکم فاز پورتال', 'حدود ۸۰–۱۲۰ ml', '۳–۴ ml/s', 'برای فاز پورتال، ۲۰G اغلب کافی است'],
            ['CT شکم دو فازی', 'حدود ۱۰۰–۱۴۰ ml', '۳–۵ ml/s', 'برای کنتراست‌دهی طولانی‌تر ارگان‌ها'],
            ['ZVK یا ۲۲G آبی', 'کاهش‌یافته', 'حدود ۲٫۵ ml/s', 'در صورت امکان برای بررسی‌های عروقی پرهیز شود'],
          ]}
        />
        <InfoBox variant="success" title={u.praxis}>
          <p>هرچه یک رگ باید سریع‌تر به حداکثر کنتراست برسد، معمولاً سرعت تزریق بالاتر و حجم دقیق‌تر لازم است. برای ارگان‌ها که کنتراست‌دهی یکنواخت و طولانی‌تر می‌خواهند، حجم بیشتر اهمیت دارد.</p>
        </InfoBox>

        <h3 className={styles.h3}>دفع مواد حاجب یددار</h3>
        <KMTable
          headers={['مسیر / زمان', 'مقدار تقریبی', 'اهمیت']}
          rows={[
            ['دفع کلیوی', 'حدود ۹۰٪', 'مسیر اصلی دفع'],
            ['نیمه‌عمر پلاسما', '۱–۳ ساعت', 'در عملکرد طبیعی کلیه کوتاه است'],
            ['بعد از حدود ۲ ساعت', 'حدود ۵۰٪', 'دفع عمدتاً کلیوی'],
            ['بعد از ۲۴ ساعت', 'تقریباً کامل', 'مقدار کمی دفع خارج‌کلیوی ممکن است'],
          ]}
        />
        <InfoBox variant="info" title="نکته محیط‌زیستی">
          <p>مواد حاجب یددار CT و مواد گادولینیوم MRI به‌سختی در تصفیه‌خانه‌ها فیلتر می‌شوند و می‌توانند وارد سیستم فاضلاب و آب شوند.</p>
        </InfoBox>

        <h3 className={styles.h3}>Paravasat · خروج ماده حاجب از رگ</h3>
        <FlowStep steps={[
          { text: 'تزریق را فوراً متوقف کنید؛ مسیر وریدی را ابتدا باقی بگذارید و در صورت امکان آسپیراسیون انجام دهید.', variant: 'flowOrange' },
          { text: 'کانول را بعد از تلاش برای آسپیراسیون خارج کنید.' },
          { text: 'اندام را بالا نگه دارید و کمپرس سرد ۲۰ دقیقه‌ای، چند بار تکرار شود.' },
          { text: 'حدود محل را با قلم علامت بزنید و اندازه، نوع ماده حاجب و اقدامات را مستند کنید.' },
        ]} />
        <KMTable
          headers={['کنترل', 'چه چیزی بررسی شود؟', 'علامت خطر']}
          rows={[
            ['گردش خون', 'پرشدگی مویرگی و نبض دیستال', 'نبض ضعیف/غایب یا پرشدگی دیررس'],
            ['حس و حرکت', 'پارستزی، بی‌حسی، ضعف حرکتی', 'اختلال حسی/حرکتی پیشرونده'],
            ['فشار بافتی', 'افزایش تورم و درد', 'شک به سندرم کمپارتمان'],
            ['پوست', 'رنگ، تاول، نکروز', 'تغییر رنگ livide یا تاول'],
          ]}
        />

        <h3 className={styles.h3}>تشخیص گوارشی و Buscopan®</h3>
        <KMTable
          headers={['موضوع', 'نکته مهم']}
          rows={[
            ['Bariumsulfat', 'جذب نمی‌شود؛ در پرفوراسیون، آسپراسیون و Ileus ممنوع است.'],
            ['Gastrografin®', 'محلول در آب و هیپراسمولار؛ در شک به پرفوراسیون مناسب‌تر است و می‌تواند اثر ملین داشته باشد.'],
            ['Buscopan®', 'پاراسمپاتولیتیک؛ برای کاهش پریستالتیسم و آرتیفکت حرکتی استفاده می‌شود.'],
            ['منع Buscopan®', 'گلوکوم، هیپرپلازی پروستات، تاکی‌آریتمی، Ileus مکانیکی؛ جایگزین: Glucagon.'],
          ]}
        />
      </Section>
    )
  }

  return (
    <Section id="roentgen-grundlagen" icon="☢️" title="Röntgen-Kontrastmittel Grundlagen">
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Röntgennegative Kontrastmittel</div>
          <p className={styles.text}>Röntgennegative Kontrastmittel absorbieren Röntgenstrahlung kaum und lassen sie relativ ungehindert passieren.</p>
          <KMTable headers={['Beispiele', 'Prinzip']} rows={[[ 'Wasser, Luft, Gas, CO₂', 'geringe/fehlende Absorption → dunklere Darstellung' ]]} />
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Röntgenpositive Kontrastmittel</div>
          <p className={styles.text}>Röntgenpositive Kontrastmittel absorbieren Röntgenstrahlen stärker als das umgebende Gewebe.</p>
          <KMTable headers={['Beispiele', 'Prinzip']} rows={[[ 'Jodhaltige KM, Bariumsulfat', 'höhere Ordnungszahl → stärkere Absorption' ]]} />
        </div>
      </div>
      <KMTable
        headers={['Gruppe', 'Beispiele', 'Eigenschaften', 'Anwendung']}
        rows={[
          ['Nicht-ionisch, wasserlöslich', 'Imeron®, Ultravist®', 'keine elektrische Ladung, niedrigere Osmolarität, besser verträglich', 'Standard für intravasale CT/Angiographie'],
          ['Ionisch, wasserlöslich', 'Gastrografin®', 'höhere Osmolarität, höheres Nebenwirkungsprofil', 'enteral; nicht mehr intravasal'],
          ['Wasserunlöslich', 'Bariumsulfat', 'nicht resorbierbar', 'enterale Bildgebung'],
          ['Röntgennegativ', 'Luft, CO₂, Wasser', 'geringe Absorption', 'Doppelkontrast / GI'],
        ]}
      />
      <Merke title={u.merke}>Alle wasserlöslichen jodhaltigen KM besitzen einen Trijodbenzolring; Jod mit Ordnungszahl 53 erzeugt den eigentlichen Röntgenkontrast.</Merke>
      <h3 className={styles.h3}>Applikation und Ausscheidung</h3>
      <KMTable
        headers={['Untersuchung', 'Volumen', 'Injektionsrate', 'Kommentar']}
        rows={[
          ['LAE-CT', 'ca. 50–70 ml', '5 ml/s', 'hohe Flussrate entscheidend'],
          ['CTA-Aorta / BBA', 'ca. 60–80 ml', '4–5 ml/s', 'bolusorientiert'],
          ['Abdomen portalvenös', 'ca. 80–120 ml', '3–4 ml/s', '20G rosa oft ausreichend'],
          ['Abdomen biphasisch', 'ca. 100–140 ml', '3–5 ml/s', 'längere Organ-Kontrastierung'],
          ['ZVK / 22G', 'reduziert', 'ca. 2,5 ml/s', 'wenn möglich vermeiden'],
        ]}
      />
      <KMTable headers={['Ausscheidung', 'Wert']} rows={[[ 'renal', 'ca. 90%' ], [ 'Plasmahalbwertzeit', '1–3 Stunden' ], [ 'Elimination', 'nahezu vollständig nach 24 h' ]]} />
      <h3 className={styles.h3}>Paravasat, GI-KM und Buscopan®</h3>
      <FlowStep steps={[
        { text: 'Injektion stoppen, Zugang belassen, Aspiration versuchen.', variant: 'flowOrange' },
        { text: 'Kanüle erst danach entfernen, Extremität hochlagern, kalte Kompresse.' },
        { text: 'Durchblutung, Motorik/Sensorik, Spannung und Hautzustand kontrollieren.' },
        { text: 'Menge, KM-Typ, Befund, Maßnahmen und Verlauf dokumentieren.' },
      ]} />
      <KMTable
        headers={['Thema', 'Wichtig']}
        rows={[
          ['Bariumsulfat', 'nicht resorbiert; kontraindiziert bei Perforation, Aspirationsgefahr und Ileus'],
          ['Gastrografin®', 'wasserlöslich und hyperosmolar; bei Perforationsverdacht geeigneter'],
          ['Buscopan®', 'Parasympatholytikum zur Artefaktreduktion; Cave Glaukom, Prostatahyperplasie, Tachyarrhythmie, mechanischer Ileus'],
        ]}
      />
    </Section>
  )
}

function MrtSection({ lang }) {
  if (lang === 'fa') {
    return (
      <Section id="mrt-km" icon="🧲" title="مواد حاجب MRI">
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>گادولینیوم چیست؟</div>
            <p className={styles.text}>گادولینیوم یک فلز پارامغناطیس است. یون آزاد Gd³⁺ سمی است، بنابراین باید داخل یک کمپلکس شلاتی پایدار قرار بگیرد.</p>
            <KMTable headers={['اثر', 'تظاهر تصویری']} rows={[[ 'کوتاه‌کردن T1', 'افزایش سیگنال / Enhancement' ], [ 'کوتاه‌کردن T2', 'کاهش سیگنال، بیشتر در دوز بالا' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>دوز و نکته Leber-KM</div>
            <KMTable headers={['ماده', 'دوز / ویژگی']} rows={[[ 'گادولینیوم استاندارد', '۰٫۱ mmol/kg' ], [ 'Primovist®', '۰٫۰۲۵ mmol/kg؛ یک‌چهارم دوز معمول، حدود ۵۰٪ دفع صفراوی و ۵۰٪ کلیوی' ]]} />
          </div>
        </div>
        <h3 className={styles.h3}>شلات‌های خطی و ماکروسیکلیک</h3>
        <KMTable
          headers={['ویژگی', 'خطی', 'ماکروسیکلیک']}
          colColors={[null, '#fbbf24', '#34d399']}
          rows={[
            ['ساختار', 'زنجیره باز', 'حلقوی / قفسه‌ای'],
            ['اتصال Gd', 'کمتر پایدار', 'بسیار پایدار'],
            ['ریسک رسوب', 'بیشتر', 'کمتر'],
            ['وضعیت امروز', 'عمدتاً محدود؛ استثناهای کبدی مانند Primovist® و Multihance®', 'استاندارد روتین مانند Gadovist® و Dotarem®'],
          ]}
        />
        <h3 className={styles.h3}>مواد حاجب اختصاصی کبد</h3>
        <InfoBox variant="info" title="اصل تصویربرداری">
          <p>مواد حاجب کبدی توسط هپاتوسیت‌های عملکردی جذب و از طریق صفرا دفع می‌شوند. بافت دارای هپاتوسیت در فاز hepatobiliär روشن می‌شود و ضایعات فاقد هپاتوسیت معمولاً تیره می‌مانند.</p>
        </InfoBox>
        <KMTable
          headers={['اندیکاسیون', 'نکته']}
          rows={[
            ['FNH در برابر Adenom', 'FNH معمولاً ماده حاجب را می‌گیرد؛ آدنوم اغلب نمی‌گیرد.'],
            ['HCC در سیروز', 'HCC خوب‌تمایز ممکن است ماده حاجب را بگیرد.'],
            ['متاستازهای کوچک', 'در فاز hepatobiliär به صورت ضایعات hypointens دیده می‌شوند.'],
            ['نشت مجاری صفراوی', 'به علت دفع صفراوی قابل بررسی است.'],
          ]}
        />
      </Section>
    )
  }

  return (
    <Section id="mrt-km" icon="🧲" title="MRT KM">
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Gadolinium</div>
          <p className={styles.text}>Gadolinium ist ein paramagnetisches Metall. Freie Gd³⁺-Ionen sind toxisch und werden deshalb in einem Chelat-Komplex gebunden.</p>
          <KMTable headers={['Effekt', 'Bildwirkung']} rows={[[ 'T1-Verkürzung', 'Signalanstieg / Enhancement' ], [ 'T2-Verkürzung', 'Signalabfall, v. a. bei Hochdosis' ]]} />
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Leber-KM</div>
          <KMTable headers={['KM', 'Eigenschaft']} rows={[[ 'Primovist®', 'einziges hepatozytenspezifisches Gd-KM; 0,025 mmol/kg' ], [ 'Multihance®', 'geringe Hepatozytenaufnahme, spätere hepatobiliäre Phase' ]]} />
        </div>
      </div>
      <KMTable
        headers={['', 'Lineare Chelate', 'Makrozyklische Chelate']}
        colColors={[null, '#fbbf24', '#34d399']}
        rows={[
          ['Struktur', 'offenkettig', 'ringförmig / „Käfig“'],
          ['Stabilität', 'geringer', 'sehr hoch'],
          ['Ablagerungsrisiko', 'höher', 'geringer'],
          ['Routine heute', 'weitgehend ruhend; Leber-Ausnahmen', 'Standard'],
        ]}
      />
      <KMTable
        headers={['Indikation', 'Prinzip']}
        rows={[
          ['FNH vs. Adenom', 'FNH nimmt KM meist auf, Adenome meistens nicht.'],
          ['HCC-Detektion in Zirrhose', 'gut differenziertes HCC kann KM aufnehmen.'],
          ['Metastasen <1 cm', 'hypointens in der hepatobiliären Phase.'],
          ['Gallengangsleckage', 'biliäre Ausscheidung ermöglicht Leckage-Nachweis.'],
        ]}
      />
    </Section>
  )
}

function JodNebenwirkungSection({ lang }) {
  const u = t(lang)
  if (lang === 'fa') {
    return (
      <Section id="nebenwirkung-jod" icon="⚠️" title="عوارض مواد حاجب یددار">
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>واکنش‌های کموتوکسیک</div>
            <p className={styles.text}>اثر مستقیم شیمیایی ماده حاجب است و مکانیسم ایمنی ندارد.</p>
            <KMTable headers={['علائم معمول']} rows={[[ 'احساس گرما، تهوع، استفراغ، واکنش وازوواگال، آریتمی، به‌ندرت تشنج' ]]} />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>واکنش شبه‌آلرژیک</div>
            <p className={styles.text}>از نظر بالینی شبیه آلرژی است، اما IgE-mediated نیست. مکانیسم اصلی، فعال‌شدن غیر اختصاصی ماست‌سل‌ها و آزاد شدن هیستامین است.</p>
            <Merke title={u.merke}>«آلرژی به ید» وجود ندارد؛ ید مولکول کوچکی است و آلرژن محسوب نمی‌شود.</Merke>
          </div>
        </div>
        <KMTable
          headers={['درجه', 'شدت', 'علائم']}
          rows={[
            ['Grade 1', 'خفیف', 'خارش، کهیر خفیف، اریتم'],
            ['Grade 2', 'متوسط', 'کهیر واضح، برونکواسپاسم، ادم حنجره'],
            ['Grade 3', 'شدید', 'هیپوتانسیون، شوک'],
            ['Grade 4', 'تهدیدکننده حیات', 'ایست تنفسی یا قلبی'],
          ]}
        />
        <h3 className={styles.h3}>اگر بیمار سابقه واکنش شبه‌آلرژیک داشته باشد</h3>
        <KMTable
          headers={['قدم', 'اقدام']}
          rows={[
            ['۱', 'در صورت امکان روش تصویربرداری جایگزین بدون ماده حاجب را بررسی کنید.'],
            ['۲', 'در صورت نیاز به ماده حاجب، Substanzwechsel انجام دهید؛ تغییر ماده خطر تکرار واکنش را کم می‌کند.'],
            ['۳', 'پره‌مدیکیشن با H1/H2 و کورتون در عمل انجام می‌شود، اما اثر آن محدود و همیشه مطابق راهنمای جدید نیست.'],
          ]}
        />
        <h3 className={styles.h3}>PC-AKI، متفورمین، دیالیز و تیروئید</h3>
        <KMTable
          headers={['موضوع', 'نکته عملی']}
          rows={[
            ['PC-AKI', 'افزایش کراتینین ظرف ۴۸–۷۲ ساعت بعد از تزریق داخل‌عروقی؛ اصطلاح جدید به جای CIN است.'],
            ['ریسک کلیوی', 'eGFR پایین، AKI، حجم بالای ماده حاجب، تزریق‌های مکرر و First-Pass کلیوی ریسک را زیاد می‌کند.'],
            ['هیدراتاسیون', 'در eGFR < 30 توصیه می‌شود؛ مثلاً NaCl 0.9% با احتیاط در نارسایی قلبی.'],
            ['متفورمین', 'با eGFR > 30 ادامه می‌یابد؛ با eGFR < 30 یا AKI هنگام بررسی و ۴۸ ساعت قطع شود.'],
            ['دیالیز', 'برای یددارها زمان‌بندی خاص لازم نیست؛ برای گادولینیوم دیالیز سریع‌تر مفید است.'],
            ['هیپرتیروئیدی', 'در Basedow، گواتر مولتی‌ندولار و Autonomie احتیاط؛ هیپرتیروئیدی آشکار منع مطلق مگر اورژانس تهدیدکننده حیات.'],
          ]}
        />
        <InfoBox variant="danger" title={u.cave}>
          <p>در سرطان تیروئید پاپیلاری/فولیکولار، ماده حاجب یددار می‌تواند سلول‌ها را با ید اشباع کند و درمان بعدی با رادیویُد را مختل کند.</p>
        </InfoBox>
      </Section>
    )
  }

  return (
    <Section id="nebenwirkung-jod" icon="⚠️" title="Nebenwirkung jodhaltiger KM">
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Chemotoxische Reaktionen</div>
          <p className={styles.text}>Direkte chemische Wirkung des KM, nicht immunologisch.</p>
          <KMTable headers={['Typisch']} rows={[[ 'Wärmegefühl, Übelkeit, Erbrechen, vasovagale Reaktion, Arrhythmie, selten Krampfanfall' ]]} />
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Allergieartige Reaktionen</div>
          <p className={styles.text}>Pseudoallergie: klinisch allergieähnlich, aber nicht IgE-vermittelt. Mechanismus: unspezifische Mastzellaktivierung.</p>
          <Merke title={u.merke}>Eine „Jodallergie“ existiert nicht. Jod ist als kleines Molekül nicht allergen.</Merke>
        </div>
      </div>
      <KMTable
        headers={['Grad', 'Schwere', 'Symptome']}
        rows={[
          ['Grad 1', 'mild', 'Juckreiz, leichte Urtikaria, Erythem'],
          ['Grad 2', 'moderat', 'deutliche Urtikaria, Bronchospasmus, Larynxödem'],
          ['Grad 3', 'schwer', 'Hypotonie, Schock'],
          ['Grad 4', 'lebensbedrohlich', 'Atemstillstand, Herzstillstand'],
        ]}
      />
      <h3 className={styles.h3}>PC-AKI, Metformin, Dialyse und Schilddrüse</h3>
      <KMTable
        headers={['Thema', 'Praxisregel']}
        rows={[
          ['PC-AKI', 'Kreatininanstieg innerhalb 48–72 h nach intravaskulärer KM-Gabe; neuer Begriff statt CIN.'],
          ['Risikofaktoren', 'eGFR reduziert, AKI, große KM-Mengen, wiederholte KM-Gabe, renaler First-Pass-Effekt.'],
          ['Hydrierung', 'bei eGFR <30 empfohlen; Vorsicht bei Herzinsuffizienz/Lungenödem.'],
          ['Metformin', 'eGFR >30: weiterführen; eGFR <30 oder AKI: zum Untersuchungszeitpunkt 48 h pausieren.'],
          ['Dialyse', 'bei Jod-KM keine zeitliche Abstimmung nötig; bei Gadolinium zeitnah sinnvoll.'],
          ['Hyperthyreose', 'latente Hyperthyreose: Irenat®; manifeste Hyperthyreose: absolute KI außer lebensbedrohlicher Notfall.'],
        ]}
      />
    </Section>
  )
}

function GadoliniumNebenwirkungSection({ lang }) {
  if (lang === 'fa') {
    return (
      <Section id="nebenwirkung-gadolinium" icon="🛡️" title="عوارض گادولینیوم">
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>NSF · فیبروز سیستمیک نفروژنیک</div>
            <KMTable
              headers={['نکته', 'توضیح']}
              rows={[
                ['ماهیت', 'بیماری فیبروزان شدید پوست و ارگان‌های داخلی'],
                ['مکانیسم', 'آزاد شدن/رسوب گادولینیوم → فعال شدن فیبروبلاست‌ها → رسوب کلاژن'],
                ['گروه پرخطر', 'نارسایی شدید کلیه با GFR < 30، به‌ویژه پس از مواد خطی'],
                ['وضعیت امروز', 'با استفاده از مواد ماکروسیکلیک بسیار نادر شده است'],
              ]}
            />
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>احتباس گادولینیوم در مغز</div>
            <p className={styles.text}>پس از تزریق‌های مکرر مواد خطی، ممکن است در T1 native هایپراینتنسیتی در Nucleus dentatus و Globus pallidus دیده شود.</p>
            <KMTable headers={['ساختار', 'محل']} rows={[[ 'Nucleus dentatus', 'هسته دندانه‌ای مخچه' ], [ 'Globus pallidus', 'بخش داخلی هسته Lentiform' ]]} />
          </div>
        </div>
        <InfoBox variant="info" title="ارزش بالینی">
          <p>اهمیت بالینی رسوب گادولینیوم در مغز تا امروز نامشخص است. در روتین، استفاده از مواد ماکروسیکلیک پایدار ترجیح داده می‌شود.</p>
        </InfoBox>
      </Section>
    )
  }

  return (
    <Section id="nebenwirkung-gadolinium" icon="🛡️" title="Nebenwirkung Gadolinium">
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Nephrogene systemische Fibrose</div>
          <KMTable
            headers={['Punkt', 'Details']}
            rows={[
              ['Krankheit', 'schwere fibrosierende Erkrankung von Haut und inneren Organen'],
              ['Mechanismus', 'freies Gd → Fibroblastenaktivierung → Kollagenablagerung'],
              ['Risiko', 'GFR <30, besonders nach linearen KM'],
              ['Heute', 'extrem selten dank makrozyklischer KM'],
            ]}
          />
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Gadolinium-Retention</div>
          <p className={styles.text}>Nach mehrfacher Gabe linearer KM können T1-native Hyperintensitäten auftreten.</p>
          <KMTable headers={['Struktur', 'Lokalisation']} rows={[[ 'Nucleus dentatus', 'Kleinhirn' ], [ 'Globus pallidus', 'Basalganglien' ]]} />
        </div>
      </div>
      <InfoBox variant="info" title="Klinische Relevanz">
        <p>Die klinische Relevanz der Retention ist bislang unklar. Makrozyklische Chelate sind wegen ihrer Stabilität Routine-Standard.</p>
      </InfoBox>
    </Section>
  )
}

function PregnancySection({ lang }) {
  const u = t(lang)
  if (lang === 'fa') {
    return (
      <Section id="schwangerschaft-stillzeit" icon="🤰" title="بارداری و شیردهی">
        <InfoBox variant="warning" title="اصل کلی">
          <p>ماده حاجب در بارداری فقط با اندیکاسیون سخت‌گیرانه داده می‌شود: اگر بررسی قابل تعویق نباشد و روش مناسب بدون ماده حاجب کافی نباشد. توضیح و مستندسازی الزامی است.</p>
        </InfoBox>
        <KMTable
          headers={['موضوع', 'ماده حاجب یددار', 'ماده حاجب گادولینیوم']}
          rows={[
            ['عبور از جفت', 'بله؛ جنین از حدود هفته ۱۰–۱۲ می‌تواند ید را در تیروئید جذب کند', 'بله؛ دفع کلیوی به مایع آمنیوتیک و احتمال جذب مجدد جنینی'],
            ['ریسک نظری', 'کم‌کاری تیروئید جنین/نوزاد به علت Wolff-Chaikoff', 'گادولینیوم آزاد در مایع آمنیوتیک بالقوه سمی؛ ریسک دقیق نامشخص'],
            ['اقدام', 'در صورت تزریق، بعد از تولد TSH نوزاد کنترل شود', 'تا حد امکان پرهیز؛ اگر ضروری است، نوع ماکروسیکلیک ترجیح داده شود'],
          ]}
        />
        <h3 className={styles.h3}>شیردهی</h3>
        <KMTable
          headers={['ماده', 'دفع در شیر', 'توصیه']}
          rows={[
            ['یددار', 'حدود ۰٫۵٪ دوز مادر؛ جذب خوراکی نوزاد بسیار کم', 'قطع شیردهی لازم نیست'],
            ['گادولینیوم', 'کمتر از ۰٫۰۴٪ دوز مادر؛ جذب نوزاد حداقل', 'قطع شیردهی لازم نیست'],
            ['اگر مادر نگران است', '—', 'می‌توان ۲۴ ساعت شیر را دوشید و دور ریخت، اما الزام پزشکی ندارد'],
          ]}
        />
        <Merke title={u.merke}>در شیردهی، برای مواد حاجب یددار و گادولینیوم به طور معمول نیازی به توقف شیردهی نیست.</Merke>
      </Section>
    )
  }

  return (
    <Section id="schwangerschaft-stillzeit" icon="🤰" title="Schwangerschaft und Stillzeit">
      <InfoBox variant="warning" title="Grundprinzip">
        <p>Strenge Indikationsstellung: KM nur, wenn die Untersuchung nicht verschoben werden kann und eine KM-freie Alternative nicht ausreicht. Aufklärung und Dokumentation sind obligat.</p>
      </InfoBox>
      <KMTable
        headers={['Thema', 'Jodhaltige KM', 'Gadolinium-KM']}
        rows={[
          ['Plazenta', 'plazentagängig; fetale Schilddrüse ab ca. 10.–12. SSW relevant', 'plazentagängig; renale Ausscheidung ins Fruchtwasser'],
          ['Risiko', 'theoretische fetale/neonatale Hypothyreose', 'freies Gd potenziell toxisch, Risiko unklar'],
          ['Vorgehen', 'wenn nötig möglich; TSH-Kontrolle beim Neugeborenen', 'möglichst vermeiden; wenn zwingend, makrozyklisch bevorzugen'],
        ]}
      />
      <h3 className={styles.h3}>Stillzeit</h3>
      <KMTable
        headers={['KM', 'Ausscheidung in Muttermilch', 'Empfehlung']}
        rows={[
          ['Jodhaltige KM', '~0,5% der Dosis, orale Bioverfügbarkeit sehr gering', 'Stillpause nicht nötig'],
          ['Gadolinium-KM', '<0,04% der Dosis, orale Resorption minimal', 'Stillpause nicht nötig'],
          ['Wenn Mutter beunruhigt', '—', '24 h pausieren und Milch verwerfen möglich, aber medizinisch nicht erforderlich'],
        ]}
      />
    </Section>
  )
}

export default function KontrastmittelPage() {
  const { lang } = useLanguage()
  const u = t(lang)
  const list = topics(lang)
  const [activeSection, setActiveSection] = useState('roentgen-grundlagen')
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false)
  const activeItem = list.find(section => section.id === activeSection)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    setIsMobileTocOpen(false)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    document.body.style.overflow = isMobileTocOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileTocOpen])

  useEffect(() => {
    const observers = list.map(section => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { root: null, rootMargin: '-18% 0px -70% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [lang])

  return (
    <div className={`${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} lang={lang} dir={u.dir}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/', lang)} className={styles.breadLink}>{u.home}</Link>
          <span>›</span>
          <Link href={withLang('/lernen/technik', lang)} className={styles.breadLink}>{u.learn}</Link>
          <span>›</span>
          <span>{u.title}</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{u.badge}</span>
            <h1>{u.title}</h1>
            <p>{u.lead}</p>
            <Link href={withLang('/technik/kontrastmittel/mcq', lang)} className={styles.mcqButton}>
              <span>🎯</span>
              <span>{u.mcq}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.mobileTocBar}>
        <button
          type="button"
          className={styles.mobileTocButton}
          onClick={() => setIsMobileTocOpen(true)}
          aria-expanded={isMobileTocOpen}
        >
          <span className={styles.mobileTocIcon}>☰</span>
          <span>{u.toc}</span>
          <strong>{activeItem?.label || list[0]?.label}</strong>
        </button>
      </div>

      {isMobileTocOpen && (
        <div className={styles.mobileTocOverlay} onClick={() => setIsMobileTocOpen(false)}>
          <div className={styles.mobileTocPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.mobileTocHeader}>
              <strong>{u.toc}</strong>
              <button type="button" onClick={() => setIsMobileTocOpen(false)} aria-label={u.close}>×</button>
            </div>
            <Sidebar items={list} activeSection={activeSection} onClick={scrollTo} title={u.toc} />
          </div>
        </div>
      )}

      <div className={styles.layout}>
        <Sidebar items={list} activeSection={activeSection} onClick={scrollTo} title={u.toc} />
        <main className={styles.main}>
          <RoentgenSection lang={lang} />
          <MrtSection lang={lang} />
          <JodNebenwirkungSection lang={lang} />
          <GadoliniumNebenwirkungSection lang={lang} />
          <PregnancySection lang={lang} />
        </main>
      </div>

      <Link href={withLang('/technik/kontrastmittel/mcq', lang)} className={styles.mobileMcqFab}>
        <span>🎯</span>
        <strong>{u.mcq}</strong>
      </Link>
    </div>
  )
}

function Sidebar({ items, activeSection, onClick, title }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideTitle}>{title}</div>
      <nav className={styles.sideNav}>
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            className={`${styles.sideItem} ${activeSection === item.id ? styles.sideItemActive : ''}`}
            onClick={() => onClick(item.id)}
          >
            <span className={styles.sideIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
