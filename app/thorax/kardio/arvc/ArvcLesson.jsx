'use client'

import LessonTakeHome from '@/components/LessonTakeHome'
import InteractiveTeachingGroups, { TeachingGroup, TeachingGroups } from '@/components/lesson-template/InteractiveTeachingGroups'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import CaseAtlas from './CaseAtlas'
import { VentricularDistributionIllustration } from './AcmIllustrations'
import CriteriaOverview from './CriteriaLab'
import { Icon, Note, MrtOverview } from './LessonVisuals'
import { CASES, SECTIONS, SOURCES, TAKE_HOME } from './lessonContent'
import { arvcText, localizeArvcTree } from './lessonTranslations'
import styles from './page.module.css'

const INTRO = {
  "de": [
    "Bei der arrhythmogenen Kardiomyopathie (ACM) wird Herzmuskelgewebe durch Narbengewebe und zum Teil durch Fett ersetzt. Gefährliche Rhythmusstörungen aus den Herzkammern können schon auftreten, wenn das Herz noch relativ gut pumpt. Die klassische rechtsbetonte Form heißt arrhythmogene rechtsventrikuläre Kardiomyopathie (ARVC).",
    "ACM ist häufig erblich. Herzstolpern, eine Ohnmacht, ventrikuläre Rhythmusstörungen oder eine familiäre Vorbelastung können Anlass für eine Abklärung sein.",
    "Das MRT zeigt, wie sich der Herzmuskel verändert hat. Zur Abklärung gehören auch ein EKG, die Untersuchung des Herzrhythmus und Fragen zu Herzerkrankungen in der Familie."
  ],
  "en": [
    "In arrhythmogenic cardiomyopathy (ACM), heart muscle is replaced by scar tissue and sometimes fat. Dangerous ventricular arrhythmias can occur while the heart is still pumping relatively well. The classic right-sided form is called arrhythmogenic right ventricular cardiomyopathy (ARVC).",
    "ACM is often inherited. Palpitations, fainting, ventricular arrhythmias or a relevant family history can prompt an evaluation.",
    "MRI shows how the heart muscle has changed. The evaluation also includes an ECG, assessment of heart rhythm and questions about heart disease in the family."
  ],
  "fa": [
    "در کاردیومیوپاتی آریتموژنیک (ACM)، بافت جوشگاهی و گاهی چربی جای بخشی از عضلهٔ قلب را می‌گیرند. حتی وقتی قلب هنوز نسبتاً خوب پمپاژ می‌کند، ممکن است آریتمی‌های خطرناک بطنی رخ دهند. شکل کلاسیک با درگیری غالب بطن راست، کاردیومیوپاتی آریتموژنیک بطن راست (ARVC) نام دارد.",
    "ACM اغلب ارثی است. تپش قلب، غش، آریتمی بطنی یا سابقهٔ خانوادگی مرتبط می‌تواند دلیل بررسی باشد.",
    "MRI تغییرات عضلهٔ قلب را نشان می‌دهد. نوار قلب، بررسی ریتم و پرسش دربارهٔ بیماری قلبی در خانواده هم بخشی از ارزیابی‌اند."
  ]
}

const DISTRIBUTION_INTRO = {
  "de": "ACM ist der Oberbegriff: Auch die linke Kammer kann mitbetroffen sein oder im Vordergrund stehen.",
  "en": "ACM is the broader term: the left ventricle can also be affected or can be the main site of disease.",
  "fa": "ACM اصطلاح کلی‌تری است: بطن چپ هم ممکن است درگیر باشد یا درگیری در آن غالب باشد."
}

function Definition() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <div className={styles.foundationGroups}>
      <TeachingGroups direction={_arvcLang === 'fa' ? 'rtl' : 'ltr'}>
        <TeachingGroup id="arvc-basics" title="Was ist ACM?">
          <div className={styles.foundationCopy}>
            {(INTRO[_arvcLang] || INTRO.de).map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? styles.lead : styles.bodyText}>{paragraph}</p>
            ))}
          </div>
        </TeachingGroup>
      </TeachingGroups>
      <Comparison intro={DISTRIBUTION_INTRO[_arvcLang] || DISTRIBUTION_INTRO.de} id="distribution" title="Drei mögliche Verteilungen"
        renderVisual={item => <VentricularDistributionIllustration pattern={item.pattern}/>} rows={[
        ['RV-dominant · klassische ARVC', 'Rechte Kammer besonders auffällig: regionale Bewegungsstörungen, Vergrößerung und reduzierte Pumpfunktion.', 'rv'],
        ['Biventrikulär', 'Rechte und linke Kammer sind beteiligt. Neben der RV-Veränderung können nichtischämische Narben im LV auffallen.', 'both'],
        ['LV-dominant', 'Vor allem die linke Kammer ist betroffen, während die rechte Kammer unauffällig sein kann. Für die Einordnung sind das Narbenmuster, die genetischen Befunde und mögliche andere Ursachen wichtig.', 'lv'],
      ]}/>
    </div>
  </>, _arvcLang)
}

function Differentials() {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<>
    <p className={styles.lead}>Ein großer RV oder eine Narbe kann verschiedene Ursachen haben. Entscheidend ist, ob <strong>Bewegung, Kammerfunktion, Narbenmuster und klinische Angaben zusammenpassen.</strong></p>
    <Comparison id="mimics" title="Die wichtigsten Überschneidungen" tone="secondary" rows={[
      ['Sportherz', 'RV-Vergrößerung kann eine Trainingsanpassung sein. Beide Kammern vergleichen und nach sicheren regionalen Störungen oder Narben suchen.'],
      ['Myokarditis', 'Nichtischämisches LV-LGE kann ähnlich aussehen. Akute Beschwerden, Troponin, Ödem und Verlauf berücksichtigen. Auch eine ACM kann entzündungsähnliche Episoden zeigen.'],
      ['Kardiale Sarkoidose', 'Kann nichtischämische Narben und Rhythmusstörungen verursachen. Verteilung, Leitungsstörungen und Hinweise außerhalb des Herzens helfen weiter.'],
      ['Druck- oder Volumenbelastung des RV', 'Zum Beispiel pulmonale Hypertonie oder Shunt: nach einer Ursache für die RV-Vergrößerung suchen.'],
      ['Artefakte oder frühere Ablation', 'Bewegung aus der Schicht, Arrhythmie und Partialvolumen können täuschen. Eine frühere Ablation kann selbst eine Narbe hinterlassen.'],
    ]}/>
    <Note title="Drei Dinge nicht gleichsetzen">Großer RV ist nicht automatisch ARVC. LGE ist nicht automatisch ACM. Und fehlendes LGE schließt eine ARVC nicht aus.</Note>
  </>, _arvcLang)
}

function Comparison({ id, title, tone, rows, intro, renderVisual }) {
  const { lang } = useLanguage()
  return <InteractiveTeachingGroups direction={lang === 'fa' ? 'rtl' : 'ltr'} renderVisual={renderVisual} groups={[{
    id,
    title,
    tone,
    hidePanelTitle: true,
    visualPlacement: renderVisual ? 'inline' : undefined,
    intro,
    items: rows.map(([label, text, pattern], index) => ({ id: String(index), label, text, pattern })),
  }]} />
}

const CONTENT = {
  definition: Definition,
  mrt: MrtOverview,
  kriterien: CriteriaOverview,
  differenzialdiagnosen: Differentials,
  bilder: CaseAtlas,
}
const HASH_ALIASES = { muster: 'mrt', tfc: 'kriterien', padua: 'kriterien', merksaetze: 'take-home' }
const THEME = {
  backgroundImage: '/andarun-galaxy-v3.png',
  accent: '#187e9a',
  accentStrong: '#165470',
  accentSoft: '#e0eff5',
  secondary: '#cbb080',
  secondaryStrong: '#80571f',
  heroBase: '#102435',
}
const HERO = '/educational/lesson-design/thorax--kardio--arvc.webp'
const renderIcon = name => <Icon name={name}/>
const SUMMARY = { de: 'Take Home Message', en: 'Take Home Message', fa: 'پیام نهایی' }
const LOCAL_SECTIONS = Object.fromEntries(Object.entries(SUMMARY).map(([lang, label]) => [lang, [
  ...SECTIONS.map(section => ({ ...section, label: arvcText(section.title, lang) })),
  { id: 'take-home', label, icon: 'spark', emphasis: true },
]]))

function ArvcSources({ lang }) {
  const t = value => arvcText(value, lang)
  const items = [
    ...SOURCES.map(source => ({ href: source.url, title: source.label, citation: t(source.title) })),
    ...CASES.filter(item => item.id !== '95633').map(item => ({
      href: item.url,
      tag: 'Radiopaedia',
      title: `rID ${item.id} · ${item.creator}`,
      citation: t(item.title),
    })),
  ]
  return <div id="quellen">
    <LessonSources lang={lang} title={t('Quellen & Bildnachweise')} items={items}
      note={t('Die MRT-Bilder und das Cine sind Originalaufnahmen. Einblendbare Orientierungspunkte von RadYar liegen separat über den unveränderten Bildern.')} />
  </div>
}

export default function ArvcLesson() {
  const { lang } = useLanguage()
  const t = value => arvcText(value, lang)
  const title = t('Arrhythmogene Kardiomyopathie')
  const localPath = href => lang === 'de' ? href : `${href}?lang=${lang}`
  return <StandardLessonShell
    lessonId="arvc-de-v4"
    heroLessonId="/thorax/kardio/arvc"
    lang={lang}
    title={title}
    author="Dr. Zia"
    className={styles.page}
    breadcrumbs={[{ label: 'RadYar', href: localPath('/') }, { label: t('Thorax'), href: localPath('/lernen/thorax') }, { label: 'ACM / ARVC' }]}
    actions={{
      mcq: { label: t('MCQ starten'), href: '/ueben/quiz?fach=thorax&n=10&themen=arvc', trailingIcon: 'arrow' },
      flashcards: { label: t('Flashcards'), href: '/flashcards/arvc' },
    }}
    sections={LOCAL_SECTIONS[lang] || LOCAL_SECTIONS.de}
    renderIcon={renderIcon}
    theme={THEME}
    heroImageSrc={HERO}
    heroImageAlt={t('Schematische Illustration der arrhythmogenen Kardiomyopathie')}
    syncHashNavigation
    hashAliases={HASH_ALIASES}
    sources={<ArvcSources lang={lang}/>}
  >
    {SECTIONS.map(({ id }) => {
      const Content = CONTENT[id]
      return <LessonSection key={id} id={id} bodyClassName={styles.chapterBody}><Content/></LessonSection>
    })}
    <LessonSection id="take-home">
      <LessonTakeHome points={TAKE_HOME} lang={lang} idPrefix="acm-takehome"/>
    </LessonSection>
  </StandardLessonShell>
}
