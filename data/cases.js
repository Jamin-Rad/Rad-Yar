export const CASE_BANK = {
  de: [
    {
      id: 'meniskus-grad-2c',
      fachId: 'msk',
      kapitelId: 'msk-knie',
      topicId: 'meniskus',
      image: '/meniskus/mri-sagittal.png',
      plane: 'PD · sagittal',
      title: 'Keilförmig-globuläres intrameniskales Signal',
      vignette: '40-jährige Patientin mit intermittierenden Einklemmungserscheinungen (Locking) des rechten Knies. Im discoiden Außenmeniskus zeigt sich eine ausgedehnte Signalsteigerung ohne sicheren Kontakt zur Gelenkfläche.',
      question: 'Welche Einordnung passt am besten zu diesem Befund?',
      options: [
        { id: 'A', text: 'Sicherer Grad-3-Meniskusriss' },
        { id: 'B', text: 'Grad 2c mit mukoider Degeneration' },
        { id: 'C', text: 'Normaler Meniskus ohne Signalalteration' },
        { id: 'D', text: 'Dislozierter Korbhenkelriss' },
      ],
      correct: 'B',
      explanation: 'Das keilförmig-globuläre Signal ohne sicheren Oberflächenkontakt entspricht Grad 2c. Es kann auf eine mukoide Degeneration und ein erhöhtes Risiko für einen okkulten Riss hinweisen, erfüllt aber allein nicht die Kriterien eines sicheren Grad-3-Risses.',
      source: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
      credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2b',
      fachId: 'msk',
      kapitelId: 'msk-knie',
      topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png',
      plane: 'PD · koronal',
      title: 'Lineares Signal mit Kontakt auf nur einer Schicht',
      vignette: 'Koronare PD-Sequenz eines discoiden Außenmeniskus. Ein lineares Signal erreicht scheinbar die Oberfläche, ist jedoch nur auf einer einzelnen Schicht nachvollziehbar.',
      question: 'Wie sollte dieser Einzelbildbefund bewertet werden?',
      options: [
        { id: 'A', text: 'Als sicherer Grad-3-Riss' },
        { id: 'B', text: 'Als Grad 2b beziehungsweise inkonklusiver Befund' },
        { id: 'C', text: 'Als Korbhenkelriss mit Dislokation' },
        { id: 'D', text: 'Als normale Gefäßstruktur' },
      ],
      correct: 'B',
      explanation: 'Ein lineares Signal mit scheinbarem Oberflächenkontakt auf nur einer Schicht ist inkonklusiv und entspricht hier Grad 2b. Ohne Bestätigung auf einer zweiten Schicht sollte kein sicherer Grad-3-Riss diagnostiziert werden.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2-medial-hh',
      fachId: 'msk',
      kapitelId: 'msk-knie',
      topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png',
      plane: 'PD · koronal',
      title: 'Lineares intrameniskales Signal im Hinterhorn des Innenmeniskus',
      vignette: '30-jährige Patientin mit medialseitigen Knieschmerzen.',
      question: 'Welcher Befund und welche Einordnung passen am besten zu diesem Bild?',
      options: [
        { id: 'A', text: 'Grad-I-Degeneration: punktförmiges intrameniskales Signal ohne Oberflächenkontakt' },
        { id: 'B', text: 'Grad-II-Degeneration: horizontales intrameniskales T2-Signal im Hinterhorn ohne Kontakt zur Gelenkfläche' },
        { id: 'C', text: 'Grad-III-Riss mit sicherem Kontakt zur Gelenkfläche' },
        { id: 'D', text: 'Korbhenkelriss mit Dislokation des Innenmeniskus' },
      ],
      correct: 'B',
      explanation: 'Horizontales, hoch-T2-intensives intrameniskales Signal im Hinterhorn des Innenmeniskus, das die Gelenkfläche nicht erreicht, entspricht einer Grad-II-Meniskusdegeneration nach Lotysch – einem häufigen degenerativen Befund ohne sicheren Rissnachweis.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
  ],
  en: [
    {
      id: 'meniskus-grad-2c', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-sagittal.png', plane: 'PD · sagittal',
      title: 'Wedge-shaped globular intrameniscal signal',
      vignette: '40-year-old female patient with pain and intermittent locking of the right knee. The discoid lateral meniscus shows extensive high signal without definite contact with the articular surface.',
      question: 'Which classification best fits this finding?',
      options: [
        { id: 'A', text: 'Definite grade-3 meniscal tear' },
        { id: 'B', text: 'Grade 2c with mucoid degeneration' },
        { id: 'C', text: 'Normal meniscus without signal alteration' },
        { id: 'D', text: 'Displaced bucket-handle tear' },
      ],
      correct: 'B',
      explanation: 'A wedge-shaped or globular signal without definite surface contact is grade 2c. It may indicate mucoid degeneration and a higher risk of an occult tear, but does not by itself meet grade-3 criteria.',
      source: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
      credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2b', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png', plane: 'PD · coronal',
      title: 'Linear signal contacting the surface on one slice only',
      vignette: 'Coronal PD sequence of a discoid lateral meniscus. A linear signal appears to reach the surface but can only be followed on a single slice.',
      question: 'How should this single-slice finding be classified?',
      options: [
        { id: 'A', text: 'Definite grade-3 tear' },
        { id: 'B', text: 'Grade 2b or indeterminate finding' },
        { id: 'C', text: 'Displaced bucket-handle tear' },
        { id: 'D', text: 'Normal vascular structure' },
      ],
      correct: 'B',
      explanation: 'Apparent surface contact on one slice only is indeterminate and corresponds here to grade 2b. A definite grade-3 tear should not be diagnosed without confirmation on another slice.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2-medial-hh', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png', plane: 'PD · coronal',
      title: 'Linear intrasubstance signal in the posterior horn of the medial meniscus',
      vignette: '30-year-old female patient with medial knee pain.',
      question: 'Which finding and classification best fit this image?',
      options: [
        { id: 'A', text: 'Grade I degeneration: focal intrasubstance signal without surface contact' },
        { id: 'B', text: 'Grade II degeneration: horizontal intrasubstance T2 signal at the posterior horn not reaching the articular surface' },
        { id: 'C', text: 'Grade III tear with definite contact to the articular surface' },
        { id: 'D', text: 'Displaced bucket-handle tear of the medial meniscus' },
      ],
      correct: 'B',
      explanation: 'Horizontal, high-T2-signal intrasubstance change at the posterior horn of the medial meniscus that does not reach the articular surface corresponds to grade II meniscal degeneration according to Lotysch – a common degenerative finding without definite evidence of a tear.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
  ],
  fa: [
    {
      id: 'meniskus-grad-2c', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-sagittal.png', plane: 'PD · ساژیتال',
      title: 'سیگنال گوه‌ای و گلوبولار داخل منیسک',
      vignette: 'بیمار خانم ۴۰ ساله با درد و قفل‌شدگی متناوب (Locking) زانوی راست. در منیسک خارجی دیسکوئید افزایش سیگنال وسیع بدون تماس قطعی با سطح مفصلی دیده می‌شود.',
      question: 'بهترین طبقه‌بندی برای این یافته چیست؟',
      options: [
        { id: 'A', text: 'پارگی قطعی درجه ۳ منیسک' },
        { id: 'B', text: 'درجه 2c همراه دژنراسیون موکوئید' },
        { id: 'C', text: 'منیسک طبیعی بدون تغییر سیگنال' },
        { id: 'D', text: 'پارگی جابه‌جا‌شده Bucket-handle' },
      ],
      correct: 'B',
      explanation: 'سیگنال گوه‌ای یا گلوبولار بدون تماس قطعی با سطح، درجه 2c است. این یافته می‌تواند با دژنراسیون موکوئید و ریسک پارگی مخفی همراه باشد، اما به‌تنهایی معیار درجه ۳ را ندارد.',
      source: 'https://radiopaedia.org/cases/75168/studies/86248#t=im&v1i=52196174&v1z=1&v2i=52196277&v2z=1&v3i=52196234&v3z=1&v4i=52196213&v4z=1',
      credit: 'Case courtesy of Roberto Schubert, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2b', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png', plane: 'PD · کرونال',
      title: 'سیگنال خطی با تماس سطحی فقط در یک برش',
      vignette: 'سکانس PD کرونال از منیسک خارجی دیسکوئید. سیگنال خطی ظاهراً به سطح می‌رسد، اما فقط در یک برش قابل پیگیری است.',
      question: 'این یافته تک‌برشی چگونه باید ارزیابی شود؟',
      options: [
        { id: 'A', text: 'پارگی قطعی درجه ۳' },
        { id: 'B', text: 'یافته درجه 2b یا غیرقطعی' },
        { id: 'C', text: 'پارگی Bucket-handle جابه‌جا‌شده' },
        { id: 'D', text: 'ساختار عروقی طبیعی' },
      ],
      correct: 'B',
      explanation: 'تماس ظاهری با سطح فقط در یک برش، غیرقطعی و در اینجا مطابق درجه 2b است. بدون تأیید در برش دوم نباید پارگی قطعی درجه ۳ گزارش شود.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
    {
      id: 'meniskus-grad-2-medial-hh', fachId: 'msk', kapitelId: 'msk-knie', topicId: 'meniskus',
      image: '/meniskus/mri-coronal.png', plane: 'PD · کرونال',
      title: 'سیگنال خطی داخل‌بافتی در شاخ خلفی منیسک داخلی',
      vignette: 'بیمار خانم ۳۰ ساله با درد ناحیه داخلی زانو.',
      question: 'کدام یافته و طبقه‌بندی با این تصویر مطابقت دارد؟',
      options: [
        { id: 'A', text: 'دژنراسیون درجه I: سیگنال فوکال داخل‌بافتی بدون تماس سطحی' },
        { id: 'B', text: 'دژنراسیون درجه II: سیگنال افقی داخل‌بافتی T2 در شاخ خلفی بدون تماس با سطح مفصلی' },
        { id: 'C', text: 'پارگی درجه III با تماس قطعی با سطح مفصلی' },
        { id: 'D', text: 'پارگی Bucket-handle جابه‌جا‌شده منیسک داخلی' },
      ],
      correct: 'B',
      explanation: 'تغییر سیگنال افقی با شدت بالا در T2 به‌صورت داخل‌بافتی در شاخ خلفی منیسک داخلی که به سطح مفصلی نمی‌رسد، مطابق با دژنراسیون درجه II منیسک طبق طبقه‌بندی Lotysch است - یک یافته دژنراتیو شایع بدون شواهد قطعی پارگی.',
      source: 'https://radiopaedia.org/cases/14060/studies/13900#t=im&v1i=1118538&v1z=1&v2i=1118592&v2z=1',
      credit: 'Case courtesy of Ammar Haouimi, Radiopaedia.org',
    },
  ],
}

export function getAvailableCaseTopicIds() {
  return new Set(CASE_BANK.de.map(item => item.topicId))
}

export function countCases(topicIds) {
  const selected = new Set(topicIds)
  return CASE_BANK.de.filter(item => selected.has(item.topicId)).length
}

export function getCases(topicIds, lang, n) {
  const selected = new Set(topicIds)
  const source = CASE_BANK[lang] || CASE_BANK.de
  const cases = source.filter(item => selected.has(item.topicId))
  for (let index = cases.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[cases[index], cases[randomIndex]] = [cases[randomIndex], cases[index]]
  }
  return cases.slice(0, n)
}
