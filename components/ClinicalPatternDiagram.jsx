const PALETTE = { ink: '#24304a', muted: '#64748b', blue: '#38aeb1', blueLight: '#d9f2f1', plum: '#713574', plumLight: '#f0e5f1', coral: '#d84b42', paper: '#ffffff', line: '#d8dee8', amber: '#d97706' }

function Lungs({ variant, lang }) {
  const labels = {
    de: { tb: 'disseminierte Noduli', pneumonia: 'alveoläre Verschattung', hrct: 'interstitielles Muster', sarcoidosis: 'perilymphatische Noduli · bihiläre Lymphknoten' },
    en: { tb: 'diffuse nodules', pneumonia: 'air-space opacity', hrct: 'interstitial pattern', sarcoidosis: 'perilymphatic nodules · bilateral hilar nodes' },
    fa: { tb: 'ندول‌های منتشر', pneumonia: 'کدورت فضای هوایی', hrct: 'الگوی بینابینی', sarcoidosis: 'ندول‌های پری‌لنفاتیک · لنف‌نودهای بی‌هیلار' },
  }[lang] || { tb: 'diffuse nodules', pneumonia: 'air-space opacity', hrct: 'interstitial pattern' }
  const marks = variant === 'tuberculosis'
    ? <g fill={PALETTE.coral}><circle cx="130" cy="76" r="6"/><circle cx="148" cy="87" r="4"/><circle cx="169" cy="74" r="5"/><circle cx="255" cy="80" r="5"/><circle cx="276" cy="90" r="4"/><circle cx="294" cy="75" r="5"/><circle cx="142" cy="112" r="3"/><circle cx="270" cy="119" r="3"/></g>
    : variant === 'sarcoidosis'
      ? <g fill={PALETTE.coral} stroke={PALETTE.paper} strokeWidth="1.5">
          <circle cx="130" cy="82" r="5"/><circle cx="145" cy="97" r="4"/><circle cx="126" cy="119" r="4"/><circle cx="157" cy="134" r="4"/>
          <circle cx="269" cy="82" r="5"/><circle cx="254" cy="97" r="4"/><circle cx="274" cy="118" r="4"/><circle cx="244" cy="136" r="4"/>
          <circle cx="174" cy="106" r="8" fill={PALETTE.plum}/><circle cx="226" cy="106" r="8" fill={PALETTE.plum}/><circle cx="209" cy="80" r="7" fill={PALETTE.plum}/>
        </g>
    : variant === 'pneumonia'
      ? <g fill={PALETTE.blue} opacity=".82"><path d="M110 92q25-26 55-7v70q-23 24-52 4z"/><path d="M260 100q27-25 50-10v67q-25 24-50 3z"/></g>
      : <g fill="none" stroke={PALETTE.plum} strokeWidth="7"><path d="M114 83q20-18 42-7m-41 25q18-15 40-4m-38 23q15-12 35-3"/><path d="M265 91q19-18 42-6m-40 27q18-14 39-2"/></g>
  return <g>
    <path d="M198 37v56m0-34-22 21m22-21 22 21" fill="none" stroke={PALETTE.ink} strokeWidth="6" strokeLinecap="round"/>
    <path d="M177 58c-29 1-57 18-65 45-8 28 3 65 20 77 17 12 47 4 59-16 7-12 10-38 10-58V68c-6-6-14-10-24-10Zm44 0c29 1 57 18 65 45 8 28-3 65-20 77-17 12-47 4-59-16-7-12-10-38-10-58V68c6-6 14-10 24-10Z" fill={PALETTE.blueLight} stroke={PALETTE.ink} strokeWidth="3"/>
    {marks}
    <text x="200" y="202" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels[variant] || labels.hrct}</text>
  </g>
}

function Pancreas({ variant, lang }) {
  const labels = {
    de: { cyst: 'Zyste und Gangverbindung', tumour: 'Tumorkontakt zu Gefäßen' },
    en: { cyst: 'cyst and duct relation', tumour: 'tumour–vessel contact' },
    fa: { cyst: 'کیست و ارتباط با مجرا', tumour: 'تماس تومور با عروق' },
  }[lang] || { cyst: 'cyst and duct relation', tumour: 'tumour–vessel contact' }
  return <g>
    <path d="M82 112c30-34 63-40 92-26 21 10 40 10 59 0 37-19 69-7 82 18-17 26-45 37-76 30-24-5-45-1-69 7-41 13-72 4-88-29Z" fill={PALETTE.amber} opacity=".72" stroke={PALETTE.ink} strokeWidth="3"/>
    <path d="M104 111c47-11 95 6 175-5" fill="none" stroke={PALETTE.ink} strokeWidth="3"/>
    {variant === 'cystic-pancreas' ? <g><ellipse cx="170" cy="99" rx="17" ry="11" fill={PALETTE.paper} stroke={PALETTE.blue} strokeWidth="4"/><ellipse cx="231" cy="110" rx="13" ry="8" fill={PALETTE.paper} stroke={PALETTE.blue} strokeWidth="4"/><path d="M170 110v18m61-10v15" stroke={PALETTE.blue} strokeWidth="2" strokeDasharray="4 4"/><text x="200" y="173" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels.cyst}</text></g>
      : <g><circle cx="180" cy="107" r="12" fill={PALETTE.coral}/><path d="M190 88l23-25m-1 35 34-4m-60 26-14 28" stroke={PALETTE.coral} strokeWidth="4"/><text x="201" y="173" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels.tumour}</text></g>}
  </g>
}

function Kidney({ variant, lang }) {
  if (variant === 'renal-anatomy') {
    const labels = {
      de: { cortex: 'Rinde', medulla: 'Mark / Pyramiden', pelvis: 'Kelche → Becken', ureter: 'Ureter' },
      en: { cortex: 'cortex', medulla: 'medulla / pyramids', pelvis: 'calyces → pelvis', ureter: 'ureter' },
      fa: { cortex: 'قشر', medulla: 'مدولا / هرم‌ها', pelvis: 'کالیس‌ها / لگنچه', ureter: 'حالب' },
    }[lang] || { cortex: 'cortex', medulla: 'medulla / pyramids', pelvis: 'calyces → pelvis', ureter: 'ureter' }
    return <g>
      <path d="M168 38c-43-10-74 25-68 72 5 43 42 72 77 53 19-11 22-29 14-49-7-17 7-36 2-54-3-12-12-19-25-22Z" fill="#e9b6a6" stroke={PALETTE.ink} strokeWidth="3"/>
      <path d="M161 55c-29-6-49 20-45 48 4 29 22 48 40 38 13-8 8-22 5-34-3-13 8-34 0-45Z" fill="#f7d7ce"/>
      <g fill="#e8b75c" stroke="#c8902f" strokeWidth="1.5">
        <path d="m143 61 23 38-25-8Z"/><path d="m121 87 40 19-30 7Z"/><path d="m124 120 38-7-24 25Z"/><path d="m147 143 19-31-2 39Z"/>
      </g>
      <path d="M163 97c14 0 10-12 22-12m-22 22c13 0 11 10 22 10m-22 2c13 0 10 18 22 18m0-52v75m0-75 12-10m-12 33 13 8m-13 9 12 12" fill="none" stroke={PALETTE.blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M183 109h37" stroke="#c94b4b" strokeWidth="6" strokeLinecap="round"/><path d="M183 118h37" stroke="#537ca5" strokeWidth="6" strokeLinecap="round"/>
      <path d="M183 160v28" stroke={PALETTE.blue} strokeWidth="5" strokeLinecap="round"/>
      <path d="M112 56h-27m20 0 7 0M117 70H89m-3 0 9-6m-9 6 9 6" stroke={PALETTE.muted} strokeWidth="1.5"/>
      <text x="62" y="53" textAnchor="end" fill={PALETTE.ink} fontSize="11">{labels.cortex}</text>
      <text x="62" y="76" textAnchor="end" fill={PALETTE.ink} fontSize="11">{labels.medulla}</text>
      <text x="235" y="92" fill={PALETTE.ink} fontSize="11">{labels.pelvis}</text>
      <path d="M217 96h13" stroke={PALETTE.muted} strokeWidth="1.5"/>
      <text x="194" y="207" fill={PALETTE.ink} fontSize="11">{labels.ureter}</text>
    </g>
  }
  return <g>
    <path d="M154 47c-43-11-76 27-66 73 10 47 50 69 83 40 22-20 16-43 8-62-8-19 4-42-25-51Z" fill="#e9b6a6" stroke={PALETTE.ink} strokeWidth="3"/>
    <path d="M157 67c-25-4-43 20-37 48 5 25 23 38 39 21 10-11 8-25 4-37-4-13 9-29-6-32Z" fill="#f7d7ce"/>
    {variant === 'renal-mass' ? <circle cx="149" cy="112" r="18" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="5"/> : <path d="M270 57v101m0-101 33 40-33 61-33-61z" fill="none" stroke={PALETTE.plum} strokeWidth="5" strokeLinejoin="round"/>}
    <text x="226" y="191" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{variant === 'renal-mass' ? (lang==='fa'?'توده: کیستیک یا جامد':lang==='de'?'Raumforderung: zystisch oder solide':'mass: cystic or solid') : (lang==='fa'?'مسیر حالب و تنگی‌ها':lang==='de'?'Ureterverlauf und Engstellen':'ureter and narrowings')}</text>
  </g>
}

function Wilms({ lang }) {
  const labels = {
    de: { kidney: 'Nierenparenchym', mass: 'solide Raumforderung', origin: 'Nierenursprung: Parenchym umfasst den Tumor' },
    en: { kidney: 'renal parenchyma', mass: 'solid mass', origin: 'renal origin: parenchyma wraps around the mass' },
    fa: { kidney: 'پارانشیم کلیه', mass: 'توده جامد', origin: 'منشأ کلیوی: پارانشیم بخشی از توده را در بر می‌گیرد' },
  }[lang] || { kidney: 'renal parenchyma', mass: 'solid mass', origin: 'renal origin: parenchyma wraps around the mass' }
  return <g>
    <path d="M138 52c-41-14-76 18-76 62 0 48 38 76 76 55 18-10 26-26 23-45-3-21 3-57-23-72Z" fill="#e9b6a6" stroke={PALETTE.ink} strokeWidth="3"/>
    <path d="M146 71c-27-10-48 12-48 42 0 33 24 51 48 36 13-8 17-18 15-32-2-15 4-37-15-46Z" fill="none" stroke={PALETTE.blue} strokeWidth="7" strokeLinecap="round"/>
    <path d="M155 82c28-13 62-2 69 27 9 35-7 71-39 75-24 3-40-17-37-40 3-21-12-50 7-62Z" fill="#d97706" opacity=".78" stroke={PALETTE.ink} strokeWidth="3"/>
    <path d="M239 78c15-12 34-9 43 4-17 7-26 20-28 37-15-7-21-23-15-41Z" fill={PALETTE.plumLight} stroke={PALETTE.plum} strokeWidth="3"/>
    <text x="110" y="205" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{labels.kidney}</text>
    <text x="199" y="209" textAnchor="middle" fill={PALETTE.ink} fontSize="12">{labels.mass}</text>
    <text x="200" y="232" textAnchor="middle" fill={PALETTE.muted} fontSize="11">{labels.origin}</text>
  </g>
}

function FibromuscularDysplasia({ lang }) {
  const labels = {
    de: { artery: 'Nierenarterie', pattern: 'multifokale FMD · „Perlschnur“' },
    en: { artery: 'renal artery', pattern: 'multifocal FMD · “string of beads”' },
    fa: { artery: 'شریان کلیوی', pattern: 'FMD چندکانونی · نمای «رشته مروارید»' },
  }[lang] || { artery: 'renal artery', pattern: 'multifocal FMD · “string of beads”' }
  return <g>
    <path d="M86 61v116" fill="none" stroke={PALETTE.ink} strokeWidth="24" strokeLinecap="round" />
    <path d="M86 115h51" fill="none" stroke={PALETTE.ink} strokeWidth="16" strokeLinecap="round" />
    <path d="M137 115c20 0 16-22 34-22s15 44 34 44 16-44 35-44 15 44 34 44 15-22 34-22" fill="none" stroke={PALETTE.blue} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M308 115h25" fill="none" stroke={PALETTE.blue} strokeWidth="13" strokeLinecap="round" />
    <path d="M342 81c-23-9-43 12-39 37 4 25 24 43 43 29 13-10 11-25 7-37-4-12 5-24-11-29Z" fill="#e9b6a6" stroke={PALETTE.ink} strokeWidth="3" />
    <path d="M339 95c-12-3-21 10-18 23 3 12 12 18 20 10 5-5 4-12 2-18-2-7 4-14-4-15Z" fill="#f7d7ce" />
    <text x="202" y="184" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels.artery}</text>
    <text x="202" y="210" textAnchor="middle" fill={PALETTE.plum} fontSize="12" fontWeight="700">{labels.pattern}</text>
  </g>
}

function Airway({ variant, lang }) {
  const labels = {
    de: { foreignBody: 'Obstruktion und Air trapping', xray: 'Projektion und Bildqualität' },
    en: { foreignBody: 'obstruction and air trapping', xray: 'projection and image quality' },
    fa: { foreignBody: 'انسداد و حبس هوا', xray: 'پروجکشن و کیفیت تصویر' },
  }[lang] || { foreignBody: 'obstruction and air trapping', xray: 'projection and image quality' }
  return <g>
    <path d="M200 39v65m0-8-44 43m44-43 44 43" fill="none" stroke={PALETTE.ink} strokeWidth="10" strokeLinecap="round"/>
    <path d="M156 139c-23-3-53 11-57 37-4 18 12 24 32 20 21-4 31-18 37-38Zm88 0c23-3 53 11 57 37 4 18-12 24-32 20-21-4-31-18-37-38Z" fill={PALETTE.blueLight} stroke={PALETTE.ink} strokeWidth="3"/>
    {variant === 'foreign-body' ? <g><circle cx="165" cy="116" r="10" fill={PALETTE.coral}/><path d="M168 111l14 9" stroke={PALETTE.coral} strokeWidth="4"/><path d="M252 150q19-20 41-9v40q-25 8-40-4z" fill={PALETTE.amber} opacity=".65"/><text x="200" y="220" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels.foreignBody}</text></g>
      : <g><path d="M113 156q23-17 49-1m88 5q20-16 43-2" stroke={PALETTE.plum} strokeWidth="6" fill="none"/><text x="200" y="220" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels.xray}</text></g>}
  </g>
}

function NF1({ lang }) {
  const labels = {
    de: ['ZNS: FASI / Sehbahn', 'Nerven: plexiform', 'Knochen · Gefäße · Abdomen'],
    en: ['CNS: FASI / visual pathway', 'Nerves: plexiform', 'Bone · vessels · abdomen'],
    fa: ['CNS: FASI / مسیر بینایی', 'اعصاب: پلکس‌فرم', 'استخوان · عروق · شکم'],
  }[lang] || ['CNS: FASI / visual pathway', 'Nerves: plexiform', 'Bone · vessels · abdomen']
  return <g>
    <rect x="23" y="28" width="105" height="148" rx="14" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="3"/>
    <path d="M75 51c-19-16-38 7-30 31 6 16 14 21 30 29 16-8 24-13 30-29 8-24-11-47-30-31Z" fill="#fff" stroke={PALETTE.ink} strokeWidth="2"/>
    <circle cx="64" cy="72" r="5" fill={PALETTE.plum}/><circle cx="85" cy="81" r="5" fill={PALETTE.plum}/><circle cx="74" cy="94" r="5" fill={PALETTE.plum}/>
    <path d="M72 115q-7 21-6 33m10-33q7 21 6 33" fill="none" stroke={PALETTE.coral} strokeWidth="3"/>
    <rect x="147" y="28" width="105" height="148" rx="14" fill={PALETTE.plumLight} stroke={PALETTE.plum} strokeWidth="3"/>
    <path d="M167 76q27-31 66 0-30 29-66 0Zm0 0q25 31 66 0" fill="none" stroke={PALETTE.plum} strokeWidth="5"/>
    <circle cx="199" cy="76" r="8" fill={PALETTE.amber}/>
    <rect x="271" y="28" width="105" height="148" rx="14" fill="#fff4dd" stroke={PALETTE.amber} strokeWidth="3"/>
    <path d="M325 52v31m0-16-19 19m19-19 19 19" fill="none" stroke={PALETTE.ink} strokeWidth="4" strokeLinecap="round"/>
    <path d="M305 96h40m-40 12h40m-40 12h40" stroke={PALETTE.coral} strokeWidth="3"/>
    <text x="75" y="160" textAnchor="middle" fill={PALETTE.ink} fontSize="10">{labels[0]}</text>
    <text x="199" y="160" textAnchor="middle" fill={PALETTE.ink} fontSize="10">{labels[1]}</text>
    <text x="323" y="160" textAnchor="middle" fill={PALETTE.ink} fontSize="10">{labels[2]}</text>
  </g>
}

function Bowel({ lang }) {
  const label = { de: 'Übergangspunkt / geschlossene Schlinge', en: 'transition / closed loop', fa: 'نقطه گذار / لوپ بسته' }[lang] || 'transition / closed loop'
  return <g><path d="M105 62h190q20 0 20 18v18q0 18-20 18H132q-18 0-18 18v20q0 18 18 18h145" fill="none" stroke={PALETTE.blue} strokeWidth="22" strokeLinecap="round"/><path d="M114 62h180M132 174h160" fill="none" stroke={PALETTE.ink} strokeWidth="2" strokeDasharray="5 7"/><path d="M203 114v28m-9-10 9 10 9-10" fill="none" stroke={PALETTE.coral} strokeWidth="4"/><text x="203" y="217" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{label}</text></g>
}

function Volvulus({ lang }) {
  const labels = {
    de: ['Sigmoid: kaffeebohnenförmige Dilatation', 'Zökum: kann verlagert sein'],
    en: ['Sigmoid: coffee-bean dilatation', 'Caecum: may be displaced'],
    fa: ['سیگموئید: اتساع دانه‌قهوه‌ای', 'سکوم: ممکن است جابه‌جا شود'],
  }[lang] || ['Sigmoid: coffee-bean dilatation', 'Caecum: may be displaced']
  return <g>
    <path d="M112 59v45q0 18 18 18h142q18 0 18 18v47" fill="none" stroke={PALETTE.blue} strokeWidth="17" strokeLinecap="round"/>
    <path d="M112 59h180" fill="none" stroke={PALETTE.blue} strokeWidth="17" strokeLinecap="round"/>
    <path d="M112 168v-27q0-19 19-19h23" fill="none" stroke={PALETTE.blue} strokeWidth="17" strokeLinecap="round"/>
    <path d="M165 121c-28 2-35 22-23 34 15 15 44 6 40-11-2-10-17-14-24-5" fill="none" stroke={PALETTE.coral} strokeWidth="8" strokeLinecap="round"/>
    <path d="M275 170c13-13 35-11 43 2 7 12-2 26-18 27-17 1-29-11-25-24" fill="none" stroke={PALETTE.plum} strokeWidth="8" strokeLinecap="round"/>
    <circle cx="290" cy="187" r="4" fill={PALETTE.plum}/>
    <text x="192" y="216" textAnchor="middle" fill={PALETTE.muted} fontSize="11">{labels[0]}</text>
    <text x="192" y="234" textAnchor="middle" fill={PALETTE.muted} fontSize="11">{labels[1]}</text>
  </g>
}

function Appendix({ lang }) {
  const label = lang === 'fa' ? 'آپاندیس و چربی اطراف' : lang === 'de' ? 'Appendix und periappendikuläres Fett' : 'appendix and surrounding fat'
  return <g>
    <path d="M80 83h125q30 0 30 28v75q0 19-20 19h-38" fill="none" stroke={PALETTE.blue} strokeWidth="25" strokeLinecap="round"/>
    <path d="M211 175q8 1 15 1" stroke={PALETTE.ink} strokeWidth="2"/>
    <path d="M224 176q29 4 53 18" fill="none" stroke={PALETTE.coral} strokeWidth="11" strokeLinecap="round"/>
    <ellipse cx="248" cy="175" rx="52" ry="38" fill={PALETTE.amber} opacity=".13" stroke={PALETTE.amber} strokeWidth="3" strokeDasharray="5 5"/>
    <circle cx="224" cy="176" r="7" fill={PALETTE.coral}/>
    <text x="200" y="226" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{label}</text>
  </g>
}

function GIbleed({ lang }) {
  const label = lang === 'fa' ? 'ماده حاجب داخل لومن' : lang === 'de' ? 'Kontrastmittel im Darmlumen' : 'contrast entering bowel lumen'
  return <g>
    <path d="M82 72h210q18 0 18 18v30q0 18-18 18H115q-18 0-18 18v28q0 18 18 18h190" fill="none" stroke={PALETTE.blue} strokeWidth="22" strokeLinecap="round"/>
    <path d="M222 74v25m-8-8 8 8 8-8" fill="none" stroke={PALETTE.coral} strokeWidth="4"/>
    <circle cx="222" cy="111" r="8" fill={PALETTE.coral}/><circle cx="234" cy="122" r="6" fill={PALETTE.coral} opacity=".7"/>
    <text x="200" y="224" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{label}</text>
  </g>
}

function RectalMRI({ lang }) {
  const label = lang === 'fa' ? 'تومور، مزورکتوم و فاسیای مزورکتال' : lang === 'de' ? 'Tumor, Mesorektum und Mesorektalfaszie' : 'tumour, mesorectum and mesorectal fascia'
  return <g>
    <ellipse cx="200" cy="123" rx="100" ry="72" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="4"/>
    <ellipse cx="200" cy="123" rx="54" ry="43" fill={PALETTE.paper} stroke={PALETTE.ink} strokeWidth="5"/>
    <path d="M197 85q34-6 43 17-3 20-23 22-19-2-20-19Z" fill={PALETTE.coral}/>
    <path d="M200 123 253 92" stroke={PALETTE.amber} strokeWidth="4" strokeDasharray="5 4"/>
    <circle cx="253" cy="92" r="5" fill={PALETTE.amber}/>
    <text x="200" y="222" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{label}</text>
  </g>
}

function Liver({ lang }) {
  return <g>
    <path d="M69 103c34-47 98-51 152-35 33 10 61 2 93 6 10 27-3 67-33 83-28 15-69 8-95 9-36 2-84 21-113-1-18-14-20-39-4-62Z" fill="#b85c53" opacity=".8" stroke={PALETTE.ink} strokeWidth="3"/>
    <circle cx="182" cy="116" r="18" fill={PALETTE.paper} stroke={PALETTE.amber} strokeWidth="5"/>
    <path d="M173 108a14 14 0 1 1 0 17" fill="none" stroke={PALETTE.coral} strokeWidth="5"/>
    <text x="201" y="193" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{lang==='fa'?'ضایعه در فازهای تزریق':lang==='de'?'Läsion in Kontrastmittelphasen':'lesion across phases'}</text>
  </g>
}

function Hepatobiliary({ variant, lang }) {
  const label = lang === 'fa' ? (variant === 'psc' ? 'تنگی‌های چندکانونی مجاری' : 'چربی ماکروسکوپی داخل توده')
    : lang === 'de' ? (variant === 'psc' ? 'Multifokale Gangstenosen' : 'Makroskopisches Fett im Herd')
      : (variant === 'psc' ? 'multifocal duct strictures' : 'macroscopic fat within lesion')
  return <g>
    <path d="M80 68c42 4 58 19 79 36 17 14 30 20 50 21m-50-21 8-29m-8 29-21 22m71-1c25-13 37-27 48-48m-48 48 19 25m29-73c28-4 49 1 65 13" fill="none" stroke="#b85c53" strokeWidth="13" strokeLinecap="round"/>
    {variant === 'psc'
      ? <g fill="none" stroke={PALETTE.paper} strokeWidth="5"><path d="m131 88 13 8m36-42-4 15m-69 45 12 10m116-12-4 13m47-57 4 12"/></g>
      : <g><ellipse cx="186" cy="106" rx="30" ry="24" fill={PALETTE.amber} opacity=".8"/><circle cx="186" cy="106" r="9" fill={PALETTE.paper}/></g>}
    <text x="200" y="202" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{label}</text>
  </g>
}

function Adrenal({ lang }) {
  const label = lang === 'fa' ? 'اندازه، چربی، چگالی و شست‌وشو' : lang === 'de' ? 'Größe, Fett, Dichte, Wash-out' : 'size, fat, density, washout'
  return <g>
    <path d="M88 152c18-51 50-79 99-69 31 7 52 31 63 68-35-17-59-12-83 8-27 22-53 21-79-7Z" fill="#e9b6a6" stroke={PALETTE.ink} strokeWidth="3"/>
    <path d="M285 81c-22 7-31 19-36 35 20-6 32 0 41 12 12-20 10-35-5-47Z" fill={PALETTE.plumLight} stroke={PALETTE.plum} strokeWidth="4"/>
    <path d="M271 119h41m-20-19v39" stroke={PALETTE.coral} strokeWidth="3"/>
    <text x="200" y="207" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{label}</text>
  </g>
}

function LiverCyst({ variant, lang }) {
  const label = lang === 'fa' ? (variant === 'hydatid' ? 'غشای جداشده / کیست‌های دختر' : 'بدون تقویت و با تقویت خلفی')
    : lang === 'de' ? (variant === 'hydatid' ? 'Abgelöste Membran / Tochterzysten' : 'kein Enhancement, dorsale Schallverstärkung')
      : (variant === 'hydatid' ? 'detached membrane / daughter cysts' : 'no enhancement, posterior acoustic enhancement')
  return <g>
    <path d="M75 116c21-45 65-65 124-58 57 7 105 31 128 66-22 36-72 60-128 65-61 6-104-14-124-73Z" fill="#b85c53" opacity=".7" stroke={PALETTE.ink} strokeWidth="3"/>
    <ellipse cx="202" cy="119" rx="54" ry="43" fill="#f8fdff" stroke={PALETTE.blue} strokeWidth="5"/>
    {variant === 'hydatid' ? <g><path d="M174 103q27-25 53 0t0 35q-26 26-53 0" fill="none" stroke={PALETTE.plum} strokeWidth="4"/><circle cx="188" cy="109" r="8" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="2"/><circle cx="216" cy="130" r="8" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="2"/></g>
      : <path d="M151 171h102" stroke={PALETTE.blue} strokeWidth="7" opacity=".6"/>}
    <text x="200" y="218" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{label}</text>
  </g>
}

function Gist({ lang }) {
  const label = { de: 'Magen → exophytische Masse', en: 'stomach → exophytic mass', fa: 'معده ← توده برون‌گرا' }[lang] || 'stomach → exophytic mass'
  return <g>
    <path d="M119 55c-6 28 8 43 27 49 17 5 23 17 18 33-6 19 3 42 26 48 27 7 48-10 52-34 3-18 14-26 31-21 22 7 38-7 38-26 0-20-15-33-38-30-15 2-25-5-25-20 0-15-11-25-28-25-16 0-25 10-25 23 0 10-7 14-18 9-18-9-45-19-58-6Z" fill="#f1c27a" stroke={PALETTE.ink} strokeWidth="4"/>
    <path d="M163 114c-4 13 4 22 16 24 13 3 18 12 14 24-3 11 4 21 17 23 15 2 26-8 28-22 2-11 10-16 21-13 15 4 24-5 24-17 0-13-10-21-24-19-11 1-17-4-18-14" fill="#d84b42" fillOpacity=".68" stroke={PALETTE.coral} strokeWidth="3"/>
    <path d="M157 132 98 176" stroke={PALETTE.blue} strokeWidth="2.5"/><circle cx="157" cy="132" r="4" fill={PALETTE.blue}/>
    <rect x="40" y="171" width="104" height="26" rx="7" fill="#fff" stroke={PALETTE.blue} strokeWidth="2"/><text x="92" y="188" textAnchor="middle" fill={PALETTE.ink} fontSize="11">{label}</text>
    <text x="215" y="220" textAnchor="middle" fill={PALETTE.muted} fontSize="12">{lang === 'fa' ? 'شماتیک آموزشی، نه تصویر بیمار' : lang === 'de' ? 'Lernschema, kein Patientenbild' : 'teaching schematic, not patient imaging'}</text>
  </g>
}

function Ultrasound({ lang }) {
  const labels = { de: ['Echo', 'Schallkopf', 'Grenzfläche'], en: ['echo', 'transducer', 'boundary'], fa: ['پژواک', 'پروب', 'مرز بافتی'] }[lang] || ['echo', 'transducer', 'boundary']
  return <g>
    <rect x="159" y="34" width="82" height="25" rx="8" fill={PALETTE.blueLight} stroke={PALETTE.blue} strokeWidth="3" />
    <path d="M179 59 139 155m41-96-10 105m30-105v108m0-108 10 105m0-105 40 96" stroke={PALETTE.blue} strokeWidth="3" opacity=".55" />
    <path d="M93 165h214" stroke={PALETTE.ink} strokeWidth="5" />
    <path d="M133 150 171 63m39 0v90m39-90 38 87" stroke={PALETTE.amber} strokeWidth="3" strokeDasharray="7 6" />
    <path d="M167 145 203 67 239 145" fill="none" stroke={PALETTE.plum} strokeWidth="3" strokeDasharray="5 5" />
    <text x="200" y="202" textAnchor="middle" fill={PALETTE.muted} fontSize="13">{labels[1]} → {labels[2]} → {labels[0]}</text>
  </g>
}

export default function ClinicalPatternDiagram({ variant = 'lungs', lang = 'de', title }) {
  const accessibleDescription = variant === 'sarcoidosis'
    ? ({ de: 'Schematische Lungen mit perilymphatisch verteilten Noduli und beidseitigen Hiluslymphknoten; keine Patientenaufnahme.', en: 'Schematic lungs with perilymphatically distributed nodules and bilateral hilar nodes; not patient imaging.', fa: 'شماتیک ریه با ندول‌های پری‌لنفاتیک و لنف‌نودهای بی‌هیلار دوطرفه؛ تصویر بیمار نیست.' }[lang] || 'Sarcoidosis teaching schematic; not patient imaging.')
    : variant === 'renal-anatomy'
    ? ({ de: 'Lernschema eines Nierenquerschnitts mit Rinde, Markpyramiden, Kelchen, Nierenbecken und Ureter.', en: 'Teaching schematic of a kidney cross-section with cortex, medullary pyramids, calyces, renal pelvis and ureter.', fa: 'شماتیک آموزشی برش کلیه با قشر، هرم‌های مدولاری، کالیس‌ها، لگنچه و حالب.' }[lang] || 'Teaching schematic of kidney anatomy.')
    : variant === 'gist'
    ? ({ de: 'Lernschema: Der Magen ist dargestellt; eine Raumforderung wächst nach außen aus der Magenwand. Kein Patientenbild.', en: 'Teaching schematic: the stomach is shown with a mass growing outward from its wall. Not patient imaging.', fa: 'نمای شماتیک آموزشی: معده و توده‌ای که به بیرون از دیواره معده رشد می‌کند نشان داده شده‌اند؛ تصویر بیمار نیست.' }[lang] || 'Teaching schematic of a stomach with an exophytic mass; not patient imaging.')
    : variant === 'volvulus'
    ? ({ de: 'Lehrschema mit Kolonverlauf und zwei vereinfachten Volvulus-Konfigurationen; keine diagnostische Aufnahme.', en: 'Teaching schematic of the colon and two simplified volvulus configurations; not a diagnostic image.', fa: 'شماتیک آموزشی مسیر کولون و دو نمای ساده‌شده از ولولوس؛ تصویر تشخیصی نیست.' }[lang] || 'Teaching schematic; not diagnostic imaging.')
    : variant === 'hepatic-aml'
    ? ({ de: 'Schematische Läsion mit markiertem makroskopischem Fettanteil; keine Patientenaufnahme.', en: 'Teaching schematic of a lesion with macroscopic fat; not patient imaging.', fa: 'شماتیک آموزشی ضایعه با چربی ماکروسکوپیک؛ تصویر بیمار نیست.' }[lang] || 'Teaching schematic of a lesion with macroscopic fat; not patient imaging.')
    : title
  return <svg viewBox="0 0 400 250" role="img" aria-label={accessibleDescription} xmlns="http://www.w3.org/2000/svg">
    <title>{accessibleDescription}</title>
    <rect x="5" y="5" width="390" height="240" rx="22" fill="#fff" stroke={PALETTE.line} strokeWidth="2"/>
    {variant === 'nf1' ? <NF1 lang={lang}/> :
      variant === 'pneumonia' || variant === 'tuberculosis' || variant === 'hrct' || variant === 'sarcoidosis' ? <Lungs variant={variant} lang={lang}/> :
      variant === 'cystic-pancreas' || variant === 'pdac' || variant === 'pnet' ? <Pancreas variant={variant} lang={lang}/> :
      variant === 'wilms-tumour' ? <Wilms lang={lang}/> :
      variant === 'fmd' ? <FibromuscularDysplasia lang={lang}/> :
      variant === 'renal-mass' || variant === 'renal-anatomy' ? <Kidney variant={variant} lang={lang}/> :
      variant === 'foreign-body' || variant === 'chest-xray' ? <Airway variant={variant} lang={lang}/> :
      variant === 'bowel' ? <Bowel lang={lang}/> :
      variant === 'volvulus' ? <Volvulus lang={lang}/> :
      variant === 'appendix' ? <Appendix lang={lang}/> :
      variant === 'gi-bleed' ? <GIbleed lang={lang}/> :
      variant === 'rectal-mri' ? <RectalMRI lang={lang}/> :
      variant === 'adrenal' ? <Adrenal lang={lang}/> :
      variant === 'liver-cyst' || variant === 'hydatid' ? <LiverCyst variant={variant} lang={lang}/> :
      variant === 'gist' ? <Gist lang={lang}/> :
      variant === 'psc' || variant === 'hepatic-aml' ? <Hepatobiliary variant={variant} lang={lang}/> :
      variant === 'ultrasound' ? <Ultrasound lang={lang}/> : <Liver lang={lang}/>}
  </svg>
}
