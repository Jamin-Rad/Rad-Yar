'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../../gi/divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Fokale Leberläsionen im Vergleich', subtitle: 'Mit dem Kontrastmuster beginnen; klinischen Kontext und hepatobiliäre Phase ergänzen.',
    intro: 'Bei einer fokalen Leberläsion helfen zunächst drei Fragen: Ist sie zystisch oder solide? Wie verhält sie sich in den dynamischen Kontrastmittelphasen? Passt der Befund zum klinischen Risikoprofil?',
    rows: [
      ['Einfache Zyste', 'Flüssigkeitssignal; im Ultraschall echofrei mit dorsaler Schallverstärkung; keine randständige Kontrastierung.', 'Abdomen 5'],
      ['FNH', 'Arteriell meist kräftige Anreicherung; zentrale Narbe kann sichtbar sein. Im PDF bleibt die Läsion in der hepatobiliären Phase kontrastiert.', 'Abdomen 14–15'],
      ['Hepatozelluläres Adenom', 'Arteriell kräftige, teils heterogene Anreicherung; im PDF häufige Angleichung in portalvenöser/später Phase ohne typisches HCC-Wash-out. In der hepatobiliären Phase meist hypointens.', 'Abdomen 16–18'],
      ['HCC', 'Bei passendem Risikokontext dynamische arterielle Hyperanreicherung und späteres Wash-out gezielt prüfen; LI-RADS-Version und Kriterien explizit angeben.', 'Abdomen 19–23'],
      ['Metastasen', 'Hypovaskuläre und hypervaskuläre Muster unterscheiden; Zahl, Verteilung, Nekrose und Verhalten in arterieller, portalvenöser und später Phase beschreiben.', 'Abdomen 24–25'],
      ['Fokale Steatose / Aussparung', 'Auf typische Verteilung und fehlenden Masseneffekt achten; Gefäße verlaufen normal durch das Areal. MR chemical-shift kann Fett nachweisen.', 'Abdomen 26–27'],
    ],
    planTitle: 'Ein Befundungsablauf, der die Falle reduziert', plan: ['Leberparenchym und Untersuchungsqualität beurteilen; bei Risikopatienten Voraufnahmen vergleichen.', 'Läsion lokalisieren und Größe messen; zystisch vs. solide sowie Zahl der Herde festhalten.', 'Dynamische Phasen einzeln vergleichen: arterielle Aufnahme, portalvenöse Phase und Spätphase.', 'Bei solider Läsion Morphologie, Narbe, Fett, Nekrose und hepatobiliäre Phase passend zur Fragestellung ergänzen.', 'Diagnostische Kategorie und Unsicherheit benennen; bei HCC-Verdacht die aktuelle LI-RADS-Systemversion nutzen.'],
    cave: 'Die PDF-Seiten zu LI-RADS zeigen ausdrücklich v2018. Alte Tabellen oder Behandlungshinweise nicht unmarkiert als aktuelle Empfehlung übernehmen. HCC-Kriterien hängen vom Risikokollektiv und der verwendeten Leitlinienversion ab.',
    linksTitle: 'Vertiefende RadYar-Lektionen', links: [['Leberhämangiom', '/abdomen/leber/haemangiom'], ['Hepatisches Angiomyolipom', '/abdomen/leber/angiomyolipom'], ['FNH', '/abdomen/leber/fnh'], ['Hepatozelluläres Adenom', '/abdomen/leber/adenom'], ['HCC', '/abdomen/leber/hcc'], ['Hepatische AV-Malformation', '/abdomen/leber/avm']],
    source: 'Quelle für die Abdeckung: Abdomen.pdf, Seiten 5 und 14–27. Dieses Vergleichskapitel ersetzt keine organspezifische Lektion.',
  },
  en: {
    title: 'Comparing focal liver lesions', subtitle: 'Start with the enhancement pattern; add clinical context and the hepatobiliary phase.',
    intro: 'Three questions help with an initial approach to a focal liver lesion: Is it cystic or solid? How does it behave across dynamic contrast phases? Does it fit the clinical risk profile?',
    rows: [
      ['Simple cyst', 'Fluid signal; anechoic with posterior acoustic enhancement on ultrasound; no rim enhancement.', 'Abdomen 5'],
      ['FNH', 'Usually avid arterial enhancement; a central scar may be visible. In the PDF, the lesion retains contrast on the hepatobiliary phase.', 'Abdomen 14–15'],
      ['Hepatocellular adenoma', 'Avid, sometimes heterogeneous arterial enhancement; the PDF describes frequent equalisation on portal/delayed phases without typical HCC wash-out. Usually hypointense on the hepatobiliary phase.', 'Abdomen 16–18'],
      ['HCC', 'In an appropriate risk context, assess arterial phase hyperenhancement and subsequent wash-out; state the LI-RADS version and criteria used.', 'Abdomen 19–23'],
      ['Metastases', 'Distinguish hypo- from hypervascular patterns; describe number, distribution, necrosis and behaviour in arterial, portal venous and delayed phases.', 'Abdomen 24–25'],
      ['Focal steatosis / sparing', 'Assess typical distribution and absence of mass effect; vessels traverse the area normally. MR chemical shift can demonstrate fat.', 'Abdomen 26–27'],
    ],
    planTitle: 'A reporting sequence that reduces common pitfalls', plan: ['Assess background liver and study quality; compare priors, especially in an at-risk patient.', 'Localise and measure the lesion; record cystic versus solid and solitary versus multiple.', 'Compare dynamic phases separately: arterial enhancement, portal venous phase and delayed phase.', 'For a solid lesion, add morphology, scar, fat, necrosis and hepatobiliary phase as appropriate.', 'State the diagnostic category and uncertainty; for suspected HCC use the current LI-RADS system version.'],
    cave: 'The PDF LI-RADS pages explicitly show v2018. Do not silently present older tables or management notes as current recommendations. HCC criteria depend on the risk population and guideline version.',
    linksTitle: 'Related RadYar lessons', links: [['Hepatic haemangioma', '/abdomen/leber/haemangiom'], ['Hepatic angiomyolipoma', '/abdomen/leber/angiomyolipom'], ['FNH', '/abdomen/leber/fnh'], ['Hepatocellular adenoma', '/abdomen/leber/adenom'], ['HCC', '/abdomen/leber/hcc'], ['Hepatic AV malformation', '/abdomen/leber/avm']],
    source: 'Coverage source: Abdomen.pdf, pp. 5 and 14–27. This comparison chapter does not replace the topic-specific lessons.',
  },
  fa: {
    title: 'مقایسه ضایعات کانونی کبد', subtitle: 'از الگوی تقویت شروع کنید؛ زمینه بالینی و فاز هپاتوبیلیاری را هم در نظر بگیرید.',
    intro: 'برای ارزیابی اولیه ضایعه کانونی کبد سه پرسش کمک می‌کند: ضایعه کیستیک است یا جامد؟ در فازهای مختلف تزریق چه رفتاری دارد؟ آیا با زمینه خطر بالینی همخوان است؟',
    rows: [
      ['کیست ساده', 'سیگنال مایع؛ در سونوگرافی بدون اکو و دارای تقویت صوتی خلفی؛ بدون تقویت حاشیه‌ای.', 'Abdomen صفحه ۵'],
      ['FNH', 'معمولاً تقویت شریانی واضح دارد؛ ممکن است اسکار مرکزی دیده شود. در PDF، ضایعه در فاز هپاتوبیلیاری همچنان تقویت‌شده باقی می‌ماند.', 'Abdomen صفحات ۱۴–۱۵'],
      ['آدنوم هپاتوسلولار', 'تقویت شریانی واضح و گاهی ناهمگون؛ PDF هم‌سطح‌شدن در فاز پورت و تأخیری را بدون wash-out تیپیک HCC توصیف می‌کند. معمولاً در فاز هپاتوبیلیاری کم‌سیگنال است.', 'Abdomen صفحات ۱۶–۱۸'],
      ['HCC', 'در زمینه خطر مناسب، تقویت شریانی و wash-out بعدی را بررسی کنید؛ نسخه و معیارهای LI-RADS مورد استفاده را بنویسید.', 'Abdomen صفحات ۱۹–۲۳'],
      ['متاستازها', 'الگوهای کم‌عروق و پرعروق را تفکیک کنید؛ تعداد، توزیع، نکروز و رفتار در فاز شریانی، پورت و تأخیری را توصیف کنید.', 'Abdomen صفحات ۲۴–۲۵'],
      ['استئاتوز کانونی / ناحیه حفظ‌شده', 'توزیع تیپیک و نبود اثر فشاری را بررسی کنید؛ عروق به‌طور طبیعی از میان ناحیه عبور می‌کنند. chemical-shift در MRI چربی را نشان می‌دهد.', 'Abdomen صفحات ۲۶–۲۷'],
    ],
    planTitle: 'توالی گزارش برای کاهش خطاهای رایج', plan: ['پارانشیم زمینه و کیفیت بررسی را بسنجید؛ به‌ویژه در بیمار پرخطر تصاویر قبلی را مقایسه کنید.', 'محل و اندازه ضایعه را ثبت کنید؛ کیستیک یا جامد و منفرد یا متعدد بودن را بنویسید.', 'فازهای دینامیک را جداگانه مقایسه کنید: تقویت شریانی، فاز پورت و فاز تأخیری.', 'در ضایعه جامد، بسته به پرسش، مورفولوژی، اسکار، چربی، نکروز و فاز هپاتوبیلیاری را اضافه کنید.', 'دسته تشخیصی و عدم قطعیت را بیان کنید؛ برای شک به HCC از نسخه جاری LI-RADS استفاده کنید.'],
    cave: 'صفحات LI-RADS در PDF صریحاً نسخه ۲۰۱۸ را نشان می‌دهند. جدول‌ها یا نکات مدیریتی قدیمی را بدون برچسب به‌عنوان توصیه جاری ارائه نکنید. معیارهای HCC به جمعیت پرخطر و نسخه راهنما وابسته‌اند.',
    linksTitle: 'درس‌های مرتبط رادیار', links: [['همانژیوم کبد', '/abdomen/leber/haemangiom'], ['آنژیومیولیپوم کبدی', '/abdomen/leber/angiomyolipom'], ['FNH', '/abdomen/leber/fnh'], ['آدنوم هپاتوسلولار', '/abdomen/leber/adenom'], ['HCC', '/abdomen/leber/hcc'], ['ناهنجاری شریانی‌وریدی کبد', '/abdomen/leber/avm']],
    source: 'منبع پوشش: Abdomen.pdf، صفحه ۵ و صفحات ۱۴ تا ۲۷. این فصل مقایسه‌ای جایگزین درس‌های اختصاصی نیست.',
  },
}

export default function FocalLiverLesionsPage() {
  const { lang } = useLanguage()
  const copy = C[lang] || C.de
  const rtl = lang === 'fa'
  return <LessonReferenceShell lessonId="abdomen-focal-liver" lang={lang} title={copy.title} diagram="liver" copy={copy}><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}><div className={styles.breadcrumb}><Link href="/">RadYar</Link><span>›</span><Link href="/lernen/abdomen">Abdomen</Link><span>›</span><span>{copy.title}</span></div><div className={styles.hero}><div className={styles.heroText}><h1>{copy.title}</h1><p>{copy.subtitle}</p></div></div></header>
    <div className={styles.main} style={{maxWidth:1100,margin:'2rem auto',padding:'0 1rem'}}><section className={styles.section}><p className={styles.lead}>{copy.intro}</p><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{lang==='fa'?'الگو':'Pattern'}</th><th>{lang==='fa'?'نکته تصویربرداری':'Imaging cue'}</th><th>{lang==='fa'?'منبع':'Source'}</th></tr></thead><tbody>{copy.rows.map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
      <section className={styles.section}><h2>{copy.planTitle}</h2><ol>{copy.plan.map(step=><li key={step}>{step}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{copy.cave}</p></div></section>
      <section className={styles.section}><h2>{copy.linksTitle}</h2><ul>{copy.links.map(([label,path])=><li key={path}><Link href={path}>{label}</Link></li>)}</ul><small>{copy.source}</small></section>
    </div>
  </main></LessonReferenceShell>
}
