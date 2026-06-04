// ── RADYAR CURRICULUM DATA ─────────────────────────────────────────────────
// Struktur: Fachgebiet → Kapitel → Themen
// Jedes Thema: { id, title, tags[], difficulty: 1-3 }

export const CURRICULUM = [
  {
    id: 'gehirn',
    key: 'Kopf',
    icon: '🧠',
    color: '#a78bfa',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    bodyZone: 'Neuroradiologie',
    kapitel: [
      {
        id: 'tumoren-hirn',
        title: 'Intrakranielle Tumoren',
        icon: '🔬',
        themen: [
          { id: 'astrozytom',      title: 'Astrozytom / Gliom',              tags:['MRT','KM'],       diff:3 },
          { id: 'oligodendrogliom',title: 'Oligodendrogliom',                tags:['MRT'],            diff:3 },
          { id: 'gbm',             title: 'Glioblastom (GBM)',               tags:['MRT','KM'],       diff:3 },
          { id: 'medulloblastom',  title: 'Medulloblastom',                  tags:['MRT'],            diff:3 },
          { id: 'ependymom',       title: 'Ependymom',                       tags:['MRT'],            diff:3 },
          { id: 'meningeom',       title: 'Meningeom',                       tags:['MRT','KM'],       diff:2 },
          { id: 'hirn-met',        title: 'Hirnmetastasen',                  tags:['MRT','KM'],       diff:2 },
          { id: 'pcnsl',           title: 'Primäres ZNS-Lymphom',            tags:['MRT','KM'],       diff:3 },
          { id: 'haemangioblastom',title: 'Hämangioblastom',                 tags:['MRT','KM'],       diff:3 },
          { id: 'hypophysenadenom',title: 'Hypophysenadenom (Mikro/Makro)',  tags:['MRT','KM'],       diff:2 },
          { id: 'kraniopharyngeom',title: 'Kraniopharyngeom',                tags:['MRT','CT'],       diff:3 },
          { id: 'rathke-zyste',    title: 'Rathke-Gangzyste',                tags:['MRT'],            diff:2 },
          { id: 'epidermoid',      title: 'Epidermoidzyste',                 tags:['MRT','DWI'],      diff:2 },
          { id: 'kolloidzyste',    title: 'Kolloidzyste',                    tags:['MRT','CT'],       diff:2 },
          { id: 'arachnoidalzyste',title: 'Arachnoidalzyste',                tags:['MRT','CT'],       diff:1 },
        ],
      },
      {
        id: 'vaskulaer',
        title: 'Vaskuläre Erkrankungen',
        icon: '🩸',
        themen: [
          { id: 'ischaem-stroke',  title: 'Ischämischer Schlaganfall',        tags:['CT','MRT','DWI'], diff:2 },
          { id: 'dissektion',      title: 'Gefäßwanddissektion',              tags:['MRT','CTA'],      diff:3 },
          { id: 'moya-moya',       title: 'Moya-Moya-Erkrankung',             tags:['MRT','CTA'],      diff:3 },
          { id: 'mikroangiopathie',title: 'Hyperintense Mikroangiopathie',    tags:['MRT'],            diff:2 },
          { id: 'caa',             title: 'Zerebrale Amyloidangiopathie (CAA)',tags:['MRT','SWI'],     diff:3 },
          { id: 'cadasil',         title: 'CADASIL-Syndrom',                  tags:['MRT'],            diff:3 },
          { id: 'dva',             title: 'Developmental Venous Anomaly (DVA)',tags:['MRT'],           diff:2 },
          { id: 'kavernom',        title: 'Kavernom',                         tags:['MRT','SWI'],      diff:2 },
          { id: 'avm-hirn',        title: 'Arteriovenöse Malformation (AVM)', tags:['MRT','CTA'],      diff:3 },
          { id: 'dav-fistel',      title: 'Durale AV-Fistel',                 tags:['MRT','DSA'],      diff:3 },
          { id: 'sin-thrombose',   title: 'Sinus- und Hirnvenenthrombose',    tags:['MRT','MRV'],      diff:3 },
        ],
      },
      {
        id: 'entz-infekt',
        title: 'Entzündung · Demyelinisierung · Infektion',
        icon: '🦠',
        themen: [
          { id: 'ms',              title: 'Multiple Sklerose (MS)',            tags:['MRT'],            diff:2 },
          { id: 'nmo',             title: 'Neuromyelitis-optica-Spektrum (NMO)',tags:['MRT'],          diff:3 },
          { id: 'meningitis',      title: 'Meningitis / Enzephalitis',         tags:['MRT','CT'],       diff:2 },
          { id: 'hiv-enceph',      title: 'HIV-Enzephalopathie',               tags:['MRT'],            diff:3 },
          { id: 'herpes-enceph',   title: 'Herpesenzephalitis',                tags:['MRT','DWI'],      diff:3 },
          { id: 'hirnabszess',     title: 'Hirnabszess',                       tags:['MRT','DWI','KM'], diff:2 },
        ],
      },
      {
        id: 'trauma-blutung',
        title: 'Trauma · Blutung · Notfall',
        icon: '🩹',
        themen: [
          { id: 'sab',             title: 'Subarachnoidalblutung (SAB)',       tags:['CT','MRT'],       diff:2 },
          { id: 'edh',             title: 'Epiduralhämatom (EDH)',             tags:['CT'],             diff:1 },
          { id: 'sdh',             title: 'Subduralhämatom (SDH)',             tags:['CT','MRT'],       diff:1 },
          { id: 'icb',             title: 'Intrazerebrale Blutung (ICB)',      tags:['CT','MRT'],       diff:2 },
          { id: 'hypox-hirn',      title: 'Globale hypox.-ischäm. Hirnschädigung',tags:['MRT'],       diff:3 },
        ],
      },
      {
        id: 'degeneration-fehlbildung',
        title: 'Degeneration · Fehlbildungen · Sonstiges',
        icon: '🧩',
        themen: [
          { id: 'alzheimer',       title: 'Morbus Alzheimer',                  tags:['MRT'],            diff:2 },
          { id: 'lewy-body',       title: 'Lewy-Body-Demenz',                  tags:['MRT'],            diff:3 },
          { id: 'ftd',             title: 'Frontotemporale Demenz (FTD)',      tags:['MRT'],            diff:3 },
          { id: 'cjd',             title: 'Creutzfeldt-Jakob-Krankheit (CJD)', tags:['MRT','DWI'],      diff:3 },
          { id: 'parkinson',       title: 'Morbus Parkinson',                  tags:['MRT'],            diff:2 },
          { id: 'pres',            title: 'PRES',                              tags:['MRT'],            diff:3 },
          { id: 'pvl',             title: 'Periventrikuläre Leukomalazie (PVL)',tags:['MRT'],           diff:2 },
          { id: 'nf1',             title: 'Neurofibromatose Typ 1 (NF1)',      tags:['MRT'],            diff:2 },
          { id: 'balkenagenesie',  title: 'Balkenagenesie',                    tags:['MRT'],            diff:2 },
          { id: 'chiari',          title: 'Chiari-Malformation',               tags:['MRT'],            diff:2 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'wirbelsaeule',
    key: 'Wirbelsäule',
    icon: '🩻',
    color: '#60a5fa',
    bg: 'linear-gradient(135deg,#0c1f40,#1e3a6e)',
    bodyZone: 'Hals',
    kapitel: [
      {
        id: 'ws-trauma',
        title: 'Trauma',
        icon: '🩹',
        themen: [
          { id: 'ws-fraktur',      title: 'Wirbelkörperfraktur (inkl. Klassifikation)', tags:['CT','MRT','Rö'], diff:2 },
          { id: 'ws-instab',       title: 'Instabilität & Luxation',          tags:['CT','MRT'],       diff:3 },
        ],
      },
      {
        id: 'ws-degenerativ',
        title: 'Degenerativ',
        icon: '🩻',
        themen: [
          { id: 'bsp',             title: 'Bandscheibenpathologien (Protrusion, Prolaps, Extrusion)', tags:['MRT'], diff:2 },
          { id: 'abschlussplatten',title: 'Wirbelkörperabschlussplatten (Modic)',tags:['MRT'],         diff:2 },
          { id: 'spondylarthrose', title: 'Spondylarthrose (kleine Gelenke)', tags:['MRT','CT'],       diff:2 },
          { id: 'spinalkanalstenose',title:'Spinalkanalstenose',               tags:['MRT','CT'],       diff:2 },
          { id: 'neuroforamen',    title: 'Neuroforaminale Stenose',           tags:['MRT'],            diff:2 },
          { id: 'spondylolisthese',title: 'Spondylolisthese / Pseudospondylolisthese', tags:['MRT','Rö'], diff:2 },
          { id: 'ossif-ligamente', title: 'Ossifikation spinaler Ligamente (OPLL)', tags:['CT','MRT'], diff:3 },
        ],
      },
      {
        id: 'ws-entzuendlich',
        title: 'Entzündlich · Tumor',
        icon: '🔥',
        themen: [
          { id: 'bechterew',       title: 'Morbus Bechterew (Ankylosierende Spondylitis)', tags:['MRT','CT','Rö'], diff:2 },
          { id: 'scheuermann',     title: 'Morbus Scheuermann',               tags:['Rö','MRT'],       diff:1 },
          { id: 'spondylodiszitis',title: 'Spondylodiszitis',                 tags:['MRT'],            diff:3 },
          { id: 'ws-metastase',    title: 'Wirbelkörpermetastasen',           tags:['MRT','CT'],       diff:2 },
        ],
      },
      {
        id: 'spinalkanal',
        title: 'Spinalkanal · Myelon',
        icon: '🩹',
        themen: [
          { id: 'extramedullaer',  title: 'Extradurale Raumforderungen',      tags:['MRT'],            diff:2 },
          { id: 'gbs',             title: 'Guillain-Barré-Syndrom (GBS)',     tags:['MRT'],            diff:3 },
          { id: 'lyme-spinal',     title: 'Lyme-Neuroborreliose',             tags:['MRT'],            diff:3 },
          { id: 'ms-spinal',       title: 'MS des Rückenmarks',               tags:['MRT'],            diff:2 },
        ],
      },
      {
        id: 'ws-metabolisch',
        title: 'Metabolisch · Fehlbildung',
        icon: '🧪',
        themen: [
          { id: 'osteoporose',     title: 'Osteoporose',                      tags:['Rö','CT','MRT'],  diff:1 },
          { id: 'ren-osteodyst',   title: 'Renale Osteodystrophie',           tags:['Rö'],             diff:2 },
          { id: 'funikul-myelose', title: 'Funikuläre Myelose',               tags:['MRT'],            diff:3 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'hals',
    key: 'Hals',
    icon: '🦋',
    color: '#818cf8',
    bg: 'linear-gradient(135deg,#1a0c40,#2d1b69)',
    bodyZone: 'Hals',
    kapitel: [
      {
        id: 'hals',
        title: 'Hals',
        icon: '🦋',
        themen: [
          { id: 'schilddruese',    title: 'Schilddrüse (Struma, Adenom, Karzinom)', tags:['Sono','CT','MRT'], diff:2 },
          { id: 'lymphknoten-hals',title: 'Lymphknoten (Hals)',               tags:['CT','MRT','Sono'],diff:2 },
          { id: 'larynx',          title: 'Larynxkarzinom',                   tags:['CT','MRT'],       diff:3 },
          { id: 'glomus-carot',    title: 'Glomus caroticum (Paragangliom)',  tags:['CT','MRT'],       diff:3 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'thorax',
    key: 'Thorax',
    icon: '🫁',
    color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    bodyZone: 'Thorax',
    kapitel: [
      {
        id: 'herz-perikard',
        title: 'Herz & Perikard',
        icon: '❤️',
        themen: [
          { id: 'herz-anatomie',   title: 'Herzanatomie & Normalbefunde',     tags:['CT','MRT','Rö'],  diff:1 },
          { id: 'khk',             title: 'Koronare Herzerkrankung (KHK)',    tags:['CT','MRT'],       diff:3 },
          { id: 'perikarditis',    title: 'Perikarditis / Perikarderguss',    tags:['CT','MRT'],       diff:2 },
          { id: 'kardiomyopathie', title: 'Kardiomyopathien',                 tags:['MRT'],            diff:3 },
        ],
      },
      {
        id: 'lunge',
        title: 'Lunge',
        icon: '🫁',
        themen: [
          { id: 'lunge-anatomie',  title: 'Anatomie & Normvarianten',         tags:['CT','Rö'],        diff:1 },
          { id: 'ct-grund',        title: 'CT-Grundlagen (Muster: Densit., Retikulär, Nodulär)', tags:['CT'], diff:2 },
          { id: 'roentgen-grund',  title: 'Röntgen Grundinterpretation',      tags:['Rö'],             diff:1 },
          { id: 'bronchiektasen',  title: 'Bronchiektasen',                   tags:['CT'],             diff:1 },
          { id: 'bronchiolitis',   title: 'Bronchiolitis',                    tags:['CT'],             diff:2 },
          { id: 'copd',            title: 'COPD / Emphysem',                  tags:['CT','Rö'],        diff:1 },
          { id: 'fk-aspiration',   title: 'Fremdkörperaspiration',            tags:['CT','Rö'],        diff:1 },
          { id: 'pneumonie',       title: 'Pneumonie (inkl. COVID)',           tags:['CT','Rö'],        diff:1 },
          { id: 'lungenherd',      title: 'Solitärer Lungenherd (Fleischner)', tags:['CT'],            diff:2 },
          { id: 'bronchialca',     title: 'Bronchialkarzinom',                tags:['CT','PET'],       diff:3 },
          { id: 'ild',             title: 'Diffuse interstitielle Lungenerkrankungen (ILD)', tags:['CT'], diff:3 },
          { id: 'sarkoidose',      title: 'Sarkoidose',                       tags:['CT'],             diff:2 },
          { id: 'zystische-fib',   title: 'Zystische Fibrose',                tags:['CT'],             diff:2 },
          { id: 'lungenzysten',    title: 'Lungenzysten (LAM, LIP)',          tags:['CT'],             diff:2 },
          { id: 'lae',             title: 'Lungenembolie (LAE)',               tags:['CT'],             diff:2 },
          { id: 'pulm-htn',        title: 'Pulmonale Hypertonie',             tags:['CT','MRT'],       diff:3 },
          { id: 'lungenoedem',     title: 'Lungenödem',                       tags:['Rö','CT'],        diff:1 },
        ],
      },
      {
        id: 'mediastinum',
        title: 'Mediastinum & Pleura',
        icon: '🫧',
        themen: [
          { id: 'mediastinum',     title: 'Mediastinaltumoren',               tags:['CT','MRT'],       diff:2 },
          { id: 'pleuraerguss',    title: 'Pleuraerguss',                     tags:['Sono','CT','Rö'], diff:1 },
          { id: 'pleuramesotheliom',title: 'Pleuramesotheliom',               tags:['CT','MRT'],       diff:3 },
          { id: 'pneumothorax',    title: 'Pneumothorax',                     tags:['Rö','CT'],        diff:1 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'mamma',
    key: 'Mamma',
    icon: '🩺',
    color: '#f472b6',
    bg: 'linear-gradient(135deg,#2a0a20,#5a1040)',
    bodyZone: 'Brust',
    kapitel: [
      {
        id: 'mammaca',
        title: 'Mammakarzinom',
        icon: '🧬',
        themen: [
          { id: 'birads',          title: 'BIRADS-Klassifikation',            tags:['Mammo','Sono','MRT'], diff:2 },
          { id: 'mammo-befund',    title: 'Mammographiebefundung',            tags:['Mammo'],          diff:2 },
          { id: 'mammo-ca-typen',  title: 'Mammakarzinom-Typen (duktal, lobulär)', tags:['Mammo','MRT'], diff:2 },
          { id: 'mammo-staging',   title: 'Staging & Lymphknoten',           tags:['CT','MRT'],       diff:3 },
        ],
      },
      {
        id: 'benigne-mamma',
        title: 'Benigne Läsionen',
        icon: '🌿',
        themen: [
          { id: 'mastopathie',     title: 'Mastopathie',                      tags:['Mammo','Sono'],   diff:1 },
          { id: 'fibroadenom',     title: 'Fibroadenom',                      tags:['Sono','MRT'],     diff:1 },
          { id: 'mamma-zyste',     title: 'Mammazyste',                       tags:['Sono'],           diff:1 },
          { id: 'fettgewebsnekrose',title:'Fettgewebsnekrose',                tags:['Mammo','MRT'],    diff:2 },
        ],
      },
      {
        id: 'bildgebung-mamma',
        title: 'Bildgebungsmodalitäten',
        icon: '🔊',
        themen: [
          { id: 'mammo-technik',   title: 'Mammographietechnik & Screening',  tags:['Mammo'],          diff:1 },
          { id: 'mamma-sono',      title: 'Brustsonographie',                 tags:['Sono'],           diff:1 },
          { id: 'mamma-mrt',       title: 'Brust-MRT (Indikationen, Sequenzen)', tags:['MRT'],        diff:2 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'abdomen',
    key: 'Abdomen',
    icon: '🫘',
    color: '#10b981',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    bodyZone: 'Abdomen',
    kapitel: [
      {
        id: 'leber',
        title: 'Leber',
        icon: '🧬',
        themen: [
          // Fokal
          { id: 'leberzyste',      title: 'Leberzysten',                    tags:['CT','MRT','Sono'], diff:1 },
          { id: 'hydatide',        title: 'Hydatiden-Zyste (Echinokokkose)',  tags:['CT','MRT'],       diff:2 },
          { id: 'haemangiom',      title: 'Leberhämangiom',                  tags:['MRT','Sono'],     diff:1 },
          { id: 'avm-leber',       title: 'Arteriovenöse Malformation',       tags:['CT','MRT'],       diff:3 },
          { id: 'angiomyolipom',   title: 'Hepatisches Angiomyolipom',        tags:['CT','MRT'],       diff:2 },
          { id: 'fnh',             title: 'Fokale Noduläre Hyperplasie (FNH)',tags:['MRT','KM'],       diff:2 },
          { id: 'adenom',          title: 'Hepatozelluläres Adenom (HCA)',    tags:['MRT','KM'],       diff:2 },
          { id: 'hcc',             title: 'Hepatozelluläres Karzinom (HCC)',  tags:['CT','MRT','LIRADS'],diff:3},
          { id: 'ccc',             title: 'Cholangiozelluläres Karzinom (CCC)',tags:['CT','MRT'],      diff:3 },
          { id: 'metastasen',      title: 'Lebermetastasen',                  tags:['CT','MRT'],       diff:2 },
          { id: 'lirads',          title: 'LI-RADS Klassifikation',           tags:['MRT','KM'],       diff:3 },
          // Diffus
          { id: 'steatosis',       title: 'Steatosis hepatis (Verfettung)',   tags:['CT','Sono','MRT'],diff:1 },
          { id: 'zirrhose',        title: 'Leberzirrhose',                    tags:['CT','MRT','Sono'],diff:2 },
          { id: 'trauma-leber',    title: 'Traumatische Leberveränderungen',  tags:['CT'],             diff:2 },
          { id: 'portale-htn',     title: 'Portale Hypertension',             tags:['CT','Sono'],      diff:2 },
          { id: 'haemochrom',      title: 'Hämochromatose',                   tags:['MRT'],            diff:2 },
          { id: 'budd-chiari',     title: 'Budd-Chiari-Syndrom',              tags:['CT','MRT','Sono'],diff:3 },
        ],
      },
      {
        id: 'gallenblase',
        title: 'Gallenblase & Gallenwege',
        icon: '🟡',
        themen: [
          { id: 'cholezystitis',   title: 'Cholezystitis (akut/chronisch)',   tags:['Sono','CT'],      diff:1 },
          { id: 'cholelithiasis',  title: 'Cholelithiasis',                   tags:['Sono','CT'],      diff:1 },
          { id: 'psc',             title: 'Primär Sklerosierende Cholangitis', tags:['MRT','MRCP'],    diff:3 },
          { id: 'gallenwegstumor', title: 'Gallenwegstumoren',                tags:['CT','MRT'],       diff:3 },
          { id: 'cholangitis',     title: 'Cholangitis',                      tags:['CT','MRT'],       diff:2 },
        ],
      },
      {
        id: 'pankreas',
        title: 'Pankreas',
        icon: '🟠',
        themen: [
          { id: 'pan-akut',        title: 'Akute Pankreatitis',               tags:['CT'],             diff:2 },
          { id: 'pan-chronisch',   title: 'Chronische Pankreatitis',          tags:['CT','MRT'],       diff:2 },
          { id: 'pdac',            title: 'Duktales Adenokarzinom (PDAC)',    tags:['CT','MRT'],       diff:3 },
          { id: 'net',             title: 'Neuroendokrine Tumoren (NET)',      tags:['CT','MRT'],       diff:3 },
          { id: 'ipmn',            title: 'Zystische Tumoren (IPMN, MCN)',    tags:['MRT','CT'],       diff:3 },
        ],
      },
      {
        id: 'milz',
        title: 'Milz',
        icon: '🟣',
        themen: [
          { id: 'milzinfarkt',     title: 'Milzinfarkt',                      tags:['CT'],             diff:2 },
          { id: 'splenomegalie',   title: 'Splenomegalie',                    tags:['Sono','CT'],      diff:1 },
          { id: 'milztumor',       title: 'Milztumoren',                      tags:['CT','MRT'],       diff:2 },
          { id: 'milzzyste',       title: 'Milzzysten',                       tags:['Sono','CT'],      diff:1 },
        ],
      },
      {
        id: 'nieren',
        title: 'Nieren',
        icon: '🫘',
        themen: [
          { id: 'nierenz-bosniak', title: 'Zystische Nierenraumforderungen (Bosniak)', tags:['CT','MRT'], diff:2 },
          { id: 'nierenzellca',    title: 'Nierenzellkarzinom (NZK)',         tags:['CT','MRT'],       diff:2 },
          { id: 'onkozytom',       title: 'Onkozytom',                        tags:['CT','MRT'],       diff:2 },
          { id: 'aml-niere',       title: 'Angiomyolipom (AML)',              tags:['CT'],             diff:1 },
          { id: 'nephroblastom',   title: 'Nephroblastom (Wilms)',            tags:['CT','MRT'],       diff:2 },
          { id: 'pyelonephritis',  title: 'Pyelonephritis',                   tags:['CT','Sono'],      diff:1 },
          { id: 'fmd',             title: 'Fibromuskuläre Dysplasie',         tags:['CT','MRT'],       diff:3 },
          { id: 'fornixruptur',    title: 'Fornixruptur',                     tags:['CT'],             diff:2 },
        ],
      },
      {
        id: 'harnblase',
        title: 'Harnblase',
        icon: '🦋',
        themen: [
          { id: 'zystitis',        title: 'Zystitis',                         tags:['CT','Sono'],      diff:1 },
          { id: 'blasentumor',     title: 'Urothelkarzinom Blase',            tags:['CT','MRT'],       diff:2 },
          { id: 'blasensteine',    title: 'Harnblasensteine / Urolithiasis',  tags:['CT'],             diff:1 },
        ],
      },
      {
        id: 'nebennieren',
        title: 'Nebennieren',
        icon: '⭐',
        themen: [
          { id: 'inzidentalom',    title: 'Inzidentalom',                     tags:['CT','MRT'],       diff:2 },
          { id: 'nn-adenom',       title: 'Nebennierenadenom',                tags:['CT','MRT'],       diff:2 },
          { id: 'myelolipom',      title: 'Myelolipom',                       tags:['CT'],             diff:1 },
          { id: 'phaeochrom',      title: 'Phäochromozytom',                  tags:['CT','MRT'],       diff:3 },
          { id: 'neuroblastom',    title: 'Neuroblastom',                     tags:['CT','MRT'],       diff:3 },
          { id: 'nn-zyste',        title: 'Nebennierenzysten',                tags:['CT'],             diff:1 },
        ],
      },
      {
        id: 'gi-trakt',
        title: 'Gastrointestinaltrakt',
        icon: '🌀',
        themen: [
          { id: 'hyp-pylorus',     title: 'Hypertrophe Pylorusstenose',       tags:['Sono'],           diff:2 },
          { id: 'divertikel',      title: 'Divertikel (Öso/Magen)',           tags:['CT'],             diff:1 },
          { id: 'ulcus',           title: 'Ulcus-Erkrankung',                 tags:['CT'],             diff:1 },
          { id: 'gist',            title: 'Gastrointestinaler Stromatumor (GIST)', tags:['CT','MRT'],  diff:2 },
          { id: 'ileus',           title: 'Ileus',                            tags:['CT','Rö'],        diff:2 },
          { id: 'mes-ischaemie',   title: 'Mesenteriale Ischämie',            tags:['CT'],             diff:3 },
          { id: 'volvulus',        title: 'Volvulus',                         tags:['CT','Rö'],        diff:2 },
          { id: 'appendizitis',    title: 'Appendizitis',                     tags:['CT','Sono'],      diff:1 },
          { id: 'kolitis',         title: 'Kolitis (CU, pseudomembranös)',    tags:['CT'],             diff:2 },
          { id: 'divertikulitis',  title: 'Divertikulose / Divertikulitis',   tags:['CT'],             diff:1 },
          { id: 'gi-blutung',      title: 'Untere GI-Blutung',               tags:['CT'],             diff:2 },
          { id: 'kolorektales-ca', title: 'Kolorektales Karzinom',            tags:['CT','MRT'],       diff:2 },
        ],
      },
      {
        id: 'hernie-retro',
        title: 'Hernie · Retroperitoneum',
        icon: '🩹',
        themen: [
          { id: 'leistenhernie',   title: 'Leisten- / Inguinalhernie',        tags:['CT','Sono'],      diff:1 },
          { id: 'm-ormond',        title: 'Morbus Ormond (retroperit. Fibrose)',tags:['CT','MRT'],     diff:3 },
        ],
      },
      {
        id: 'mesenterium',
        title: 'Mesenterium · Peritoneum',
        icon: '🕸️',
        themen: [
          { id: 'app-epiploica',   title: 'Appendizitis epiploica',           tags:['CT'],             diff:1 },
          { id: 'mes-panniculitis',title: 'Mesenteriale Panniculitis',        tags:['CT'],             diff:2 },
          { id: 'pk',              title: 'Peritonealkarzinose',              tags:['CT','MRT'],       diff:3 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'becken-f',
    key: 'Becken (Frau)',
    icon: '♀️',
    color: '#fb7185',
    bg: 'linear-gradient(135deg,#2a0a10,#5a1020)',
    bodyZone: 'BeckenF',
    kapitel: [
      {
        id: 'gynaekologie',
        title: 'Gynäkologie',
        icon: '♀️',
        themen: [
          { id: 'uterus-anatomie', title: 'Uterus – Anatomie & Varianten',   tags:['MRT','Sono'],     diff:1 },
          { id: 'uterus-myom',     title: 'Uterusmyom',                      tags:['MRT','Sono'],     diff:1 },
          { id: 'endometriumca',   title: 'Endometriumkarzinom',              tags:['MRT'],            diff:2 },
          { id: 'zervixca',        title: 'Zervixkarzinom',                  tags:['MRT'],            diff:2 },
          { id: 'endometriose',    title: 'Endometriose',                     tags:['MRT'],            diff:3 },
          { id: 'ovar-zyste',      title: 'Ovarialzyste (funktionell)',       tags:['Sono','MRT'],     diff:1 },
          { id: 'ovar-tumor',      title: 'Ovarialtumoren (IOTA-Klassif.)',  tags:['Sono','MRT'],     diff:3 },
          { id: 'ovar-ca',         title: 'Ovarialkarzinom',                 tags:['CT','MRT'],       diff:3 },
        ],
      },
    ],
  },


  // ─────────────────────────────────────────────────────────────
  {
    id: 'becken-m',
    key: 'Becken (Mann)',
    icon: '♂️',
    color: '#c084fc',
    bg: 'linear-gradient(135deg,#1a0a30,#3a1060)',
    bodyZone: 'BeckenM',
    kapitel: [
      {
        id: 'urologie-m',
        title: 'Urologie (Mann)',
        icon: '♂️',
        themen: [
          { id: 'prostata-anatomie',title:'Prostata – Anatomie & Zonierung', tags:['MRT'],            diff:1 },
          { id: 'pirads',          title: 'PI-RADS Klassifikation',           tags:['MRT'],            diff:2 },
          { id: 'prostataca',      title: 'Prostatakarzinom',                 tags:['MRT'],            diff:3 },
          { id: 'bph',             title: 'Benigne Prostatahyperplasie (BPH)',tags:['MRT','Sono'],    diff:1 },
          { id: 'hoden',           title: 'Hodentumoren',                    tags:['Sono','MRT'],     diff:2 },
          { id: 'samenblasen',     title: 'Samenblasen',                     tags:['MRT'],            diff:2 },
        ],
      },
    ],
  },



  // ─────────────────────────────────────────────────────────────
  {
    id: 'msk',
    key: 'Muskuloskelettales',
    icon: '🦴',
    color: '#fb923c',
    bg: 'linear-gradient(135deg,#2a1a00,#4a3000)',
    bodyZone: 'Muskuloskelettales',
    kapitel: [
      {
        id: 'trauma',
        title: 'Trauma',
        icon: '🩹',
        themen: [
          // Grundlagen
          { id: 'trauma-grund',    title: 'Grundlagen (Definitionen, Kinder, postop)', tags:['Rö','CT'], diff:1 },
          // Körpergebiet
          { id: 'schulter-trauma', title: 'Schulter & Oberarm',               tags:['Rö','CT','MRT'],  diff:2 },
          { id: 'ellenbogen',      title: 'Ellenbogengelenk',                  tags:['Rö','CT'],        diff:2 },
          { id: 'unterarm',        title: 'Unterarm',                          tags:['Rö'],             diff:1 },
          { id: 'handgelenk',      title: 'Handgelenk & Hand',                tags:['Rö','CT','MRT'],  diff:2 },
          { id: 'becken-huefte',   title: 'Becken & Hüftgelenk',              tags:['Rö','CT'],        diff:2 },
          { id: 'oberschenkel',    title: 'Oberschenkel',                      tags:['Rö','CT'],        diff:1 },
          { id: 'unterschenkel',   title: 'Unterschenkel',                     tags:['Rö'],             diff:1 },
          { id: 'sprunggelenk',    title: 'Sprunggelenk',                      tags:['Rö','MRT'],       diff:2 },
          { id: 'fuss',            title: 'Fuß',                               tags:['Rö','CT','MRT'],  diff:2 },
        ],
      },
      {
        id: 'grosse-gelenke',
        title: 'Große Gelenke (MRT)',
        icon: '🦵',
        themen: [
          { id: 'schulter-mrt',    title: 'Schultergelenk (Impingement, Instabilität, Arthrose)', tags:['MRT'], diff:2 },
          { id: 'ellenbogen-mrt',  title: 'Ellenbogengelenk MRT',             tags:['MRT'],            diff:2 },
          { id: 'hand-mrt',        title: 'Hand MRT',                          tags:['MRT'],            diff:2 },
          { id: 'knie',            title: 'Knie',                              tags:['MRT'],            diff:2,
            sub: [
              { id: 'meniskus',       title: 'Meniskus', link: '/msk/knie/meniskus', mcqLink: '/msk/knie/meniskus/mcq', ready: true,       tags:['MRT'], diff:2 },
              { id: 'knie-ligamente', title: 'Knie-Ligamente',                                  tags:['MRT'], diff:2 },
              { id: 'patella',        title: 'Patella',                                          tags:['MRT','Rö'], diff:2 },
            ]
          },
          { id: 'sprunggelenk-mrt', title: 'Sprunggelenk MRT',               tags:['MRT'],            diff:2 },
        ],
      },
      {
        id: 'knochentumoren',
        title: 'Knochentumoren',
        icon: '🧬',
        themen: [
          { id: 'tumor-grund',     title: 'Radiologische Zeichen (Periost, Matrix, Muster)', tags:['Rö','CT','MRT'], diff:2 },
          { id: 'osteoidosteom',   title: 'Osteoidosteom',                    tags:['CT'],             diff:2 },
          { id: 'osteoblastom',    title: 'Osteoblastom',                     tags:['CT','MRT'],       diff:2 },
          { id: 'osteosarkom',     title: 'Osteosarkom',                      tags:['Rö','MRT'],       diff:3 },
          { id: 'osteochondrom',   title: 'Osteochondrom',                    tags:['Rö','CT'],        diff:1 },
          { id: 'chondrom',        title: 'Chondrom (enchondral)',            tags:['Rö','CT'],        diff:2 },
          { id: 'chondrosarkom',   title: 'Chondrosarkom',                    tags:['CT','MRT'],       diff:3 },
          { id: 'ewing',           title: 'Ewing-Sarkom',                     tags:['Rö','MRT'],       diff:3 },
          { id: 'tsgct',           title: 'Tenosynovialer Riesenzelltumor',   tags:['MRT'],            diff:2 },
          { id: 'myelom',          title: 'Multiples Myelom',                 tags:['CT','MRT'],       diff:3 },
          { id: 'knochen-lymphom', title: 'Primäres Knochenlymphom',          tags:['MRT','CT'],       diff:3 },
          { id: 'knochen-met',     title: 'Knochenmetastasen',                tags:['CT','MRT','Szinti'],diff:2},
          { id: 'nof',             title: 'Nicht ossifizierendes Fibrom (NOF)',tags:['Rö'],            diff:1 },
          { id: 'einfache-zyste',  title: 'Einfache Knochenzyste (EKZ)',      tags:['Rö'],             diff:1 },
          { id: 'aaz',             title: 'Aneurysmatische Knochenzyste (AKZ)',tags:['Rö','MRT'],      diff:2 },
          { id: 'fibr-dysplasie',  title: 'Fibröse Dysplasie',               tags:['Rö','CT'],        diff:2 },
          { id: 'intraoss-lipom',  title: 'Intraossäres Lipom',               tags:['CT','MRT'],       diff:1 },
          { id: 'intraoss-gang',   title: 'Intraossäres Ganglion',            tags:['MRT'],            diff:1 },
        ],
      },
      {
        id: 'nekrosen',
        title: 'Nekrosen',
        icon: '🩸',
        themen: [
          { id: 'avn',             title: 'Avaskuläre Nekrose (AVN)',          tags:['MRT','Rö'],       diff:2 },
          { id: 'knocheninfarkt',  title: 'Knocheninfarkt',                   tags:['MRT'],            diff:2 },
          { id: 'perthes',         title: 'Morbus Perthes',                   tags:['Rö','MRT'],       diff:2 },
          { id: 'ocd',             title: 'Osteochondrosis dissecans (OCD)',  tags:['MRT','Rö'],       diff:2 },
        ],
      },
      {
        id: 'sonstiges-msk',
        title: 'Sonstiges',
        icon: '🧭',
        themen: [
          { id: 'm-paget',         title: 'Morbus Paget',                     tags:['Rö','CT'],        diff:2 },
          { id: 'melorheostose',   title: 'Melorheostose',                    tags:['Rö'],             diff:3 },
          { id: 'pavk',            title: 'pAVK & Gefäße der Extremitäten',  tags:['CT','MRT'],       diff:2 },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: 'technik',
    key: 'Technik',
    icon: '⚙️',
    color: '#4ade80',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    bodyZone: 'Technik',
    kapitel: [
      {
        id: 'km-technik',
        title: 'Kontrastmittel',
        icon: '💉',
        ready: true,
        link: '/technik/kontrastmittel',
        themen: [
          { id: 'km-typen',        title: 'KM-Typen (jodhaltig, Gadolinium)', tags:['CT','MRT'],       diff:1 },
          { id: 'km-nw',           title: 'Nebenwirkungen & Niere (PC-AKI)', tags:['CT','MRT'],       diff:2 },
          { id: 'km-mrt',          title: 'MRT-KM (Chelate, NSF)',           tags:['MRT'],            diff:2 },
          { id: 'km-spezial',      title: 'Spezialthemen (Schwangerschaft, SD)', tags:['CT','MRT'],   diff:3 },
        ],
      },
      {
        id: 'mrt-physik',
        title: 'MRT-Physik',
        icon: '🧲',
        themen: [
          { id: 'mrt-grundlagen',  title: 'Grundlagen (Protonen, B0, Präzession)', tags:['MRT'],      diff:1 },
          { id: 'mrt-sequenzen',   title: 'Sequenzen (SE, GRE, EPI)',        tags:['MRT'],            diff:2 },
          { id: 'mrt-gewichtung',  title: 'T1, T2, PD, FLAIR, DWI',         tags:['MRT'],            diff:2 },
          { id: 'mrt-artefakte',   title: 'Artefakte',                        tags:['MRT'],            diff:2 },
          { id: 'mrt-sicherheit',  title: 'MRT-Sicherheit & Kontraindikationen', tags:['MRT'],        diff:1 },
        ],
      },
      {
        id: 'ct-technik',
        title: 'CT-Technik',
        icon: '🖥️',
        themen: [
          { id: 'ct-grundlagen',   title: 'CT-Grundlagen (HU, Fenster, Spiral)', tags:['CT'],         diff:1 },
          { id: 'ct-protokolle',   title: 'CT-Protokolle (native, KM-Phasen)',tags:['CT'],            diff:2 },
          { id: 'ct-nachverarbeitung',title:'Nachverarbeitung (MPR, MIP, VRT)',tags:['CT'],            diff:2 },
          { id: 'ct-dosis',        title: 'Dosisreduktion (ALARA)',           tags:['CT'],             diff:2 },
        ],
      },
      {
        id: 'roentgen',
        title: 'Röntgen-Grundlagen',
        icon: '🩻',
        themen: [
          { id: 'ro-physik',       title: 'Röntgenphysik & Bildentstehung',  tags:['Rö'],             diff:1 },
          { id: 'ro-thorax',       title: 'Thorax-Röntgen systematisch',     tags:['Rö'],             diff:1 },
          { id: 'ro-abdomen',      title: 'Abdomenübersicht',                tags:['Rö'],             diff:1 },
          { id: 'ro-skelett',      title: 'Skelett-Röntgen',                 tags:['Rö'],             diff:1 },
        ],
      },
      {
        id: 'strahlenschutz',
        title: 'Strahlenschutz',
        icon: '🛡️',
        themen: [
          { id: 'strahlen-grund',  title: 'Grundlagen (Dosis, Einheiten)',   tags:['Rö','CT'],        diff:1 },
          { id: 'strahlen-recht',  title: 'Rechtliche Grundlagen (StrlSchV)',tags:['Rö','CT'],        diff:2 },
          { id: 'strahlen-schwanger',title:'Schwangerschaft & Strahlung',    tags:['Rö','CT'],        diff:2 },
        ],
      },
      {
        id: 'sono',
        title: 'Sonographie',
        icon: '🔊',
        themen: [
          { id: 'sono-physik',     title: 'Sono-Physik & Schallkopfwahl',   tags:['Sono'],           diff:1 },
          { id: 'sono-abdomen',    title: 'Abdomen-Sono systematisch',       tags:['Sono'],           diff:1 },
          { id: 'sono-doppler',    title: 'Doppler & Duplexsonographie',     tags:['Sono'],           diff:2 },
          { id: 'sono-artefakte',  title: 'Sono-Artefakte',                  tags:['Sono'],           diff:1 },
          { id: 'sono-notfall',    title: 'Notfallsonographie (FAST)',        tags:['Sono'],           diff:2 },
        ],
      },
    ],
  },
]

// Helper: find Fachgebiet by id
export const getFach = (id) => CURRICULUM.find(f => f.id === id)

// Helper: find Kapitel
export const getKapitel = (fachId, kapitelId) => {
  const fach = getFach(fachId)
  return fach?.kapitel.find(k => k.id === kapitelId)
}

// Helper: total Themen count per Fachgebiet
export const getThemenCount = (fachId) => {
  const fach = getFach(fachId)
  return fach?.kapitel.reduce((sum, k) => sum + k.themen.length, 0) || 0
}


// ── KAPITEL TITLE TRANSLATIONS ─────────────────────────────────────────────
export const KAPITEL_TRANSLATIONS = {
  // Abdomen
  'leber':          { en: 'Liver',                  fa: 'کبد' },
  'gallenblase':    { en: 'Gallbladder & Bile Ducts',fa: 'کیسه صفرا و مجاری' },
  'pankreas':       { en: 'Pancreas',                fa: 'پانکراس' },
  'milz':           { en: 'Spleen',                  fa: 'طحال' },
  'nieren':         { en: 'Kidneys',                 fa: 'کلیه‌ها' },
  'harnblase':      { en: 'Bladder',                 fa: 'مثانه' },
  'nebennieren':    { en: 'Adrenal Glands',           fa: 'غدد فوق کلیوی' },
  'gi-trakt':       { en: 'GI Tract',                fa: 'دستگاه گوارش' },
  'hernie-retro':   { en: 'Hernia · Retroperitoneum', fa: 'فتق · رتروپریتوئن' },
  'mesenterium':    { en: 'Mesentery · Peritoneum',   fa: 'مزانتر · پریتوئن' },
  // Gehirn
  'vaskulaer':      { en: 'Vascular',                fa: 'عروقی' },
  'tumoren-hirn':   { en: 'Intracranial Tumours',    fa: 'تومورهای داخل جمجمه' },
  'sella':          { en: 'Sella & Parasellar',      fa: 'سلا و پاراسلار' },
  'entz-infekt':    { en: 'Inflammation · Demyelination · Infection', fa: 'التهاب · دمیلینه‌کننده · عفونت' },
  'trauma-blutung':{ en: 'Trauma · Haemorrhage · Emergency', fa: 'تروما · خونریزی · اورژانس' },
  'degeneration-fehlbildung':{ en: 'Degeneration · Malformations · Other', fa: 'دژنراسیون · ناهنجاری‌ها · سایر' },
  // MSK
  'trauma':         { en: 'Bone Trauma',             fa: 'تروما استخوان' },
  'mrt-gelenke':    { en: 'MRI of Joints',           fa: 'MRI مفاصل' },
  'tumoren-msk':    { en: 'Bone Tumours',            fa: 'تومورهای استخوانی' },
  'sonstiges-msk':  { en: 'Other',                    fa: 'سایر' },
  // MSK new
  'grosse-gelenke': { en: 'Large Joints (MRI)',      fa: 'مفاصل بزرگ (MRI)' },
  'knochentumoren': { en: 'Bone Tumours',            fa: 'تومورهای استخوانی' },
  'nekrosen':       { en: 'Necrosis',                fa: 'نکروز' },
  // Thorax
  'herz-perikard':  { en: 'Heart & Pericardium',     fa: 'قلب و پریکارد' },
  'lunge':          { en: 'Lung',                    fa: 'ریه' },
  'mediastinum':    { en: 'Mediastinum & Pleura',     fa: 'مدیاستن و پلور' },
  // Wirbelsäule
  'ws-trauma':      { en: 'Trauma',                  fa: 'تروما' },
  'ws-degenerativ': { en: 'Degenerative',             fa: 'دژنراتیو' },
  'ws-entzuendlich':{ en: 'Inflammatory · Tumour',   fa: 'التهابی · تومور' },
  'spinalkanal':    { en: 'Spinal Canal · Cord',     fa: 'کانال نخاعی' },
  'ws-metabolisch': { en: 'Metabolic · Malformation', fa: 'متابولیک · ناهنجاری' },
  'hals':           { en: 'Neck',                    fa: 'گردن' },
  // Mamma
  'mammaca':        { en: 'Breast Cancer',           fa: 'سرطان پستان' },
  'benigne-mamma':  { en: 'Benign Lesions',          fa: 'ضایعات خوش‌خیم' },
  'bildgebung-mamma':{ en: 'Imaging Modalities',     fa: 'روش‌های تصویربرداری' },
  // Becken
  'gynaekologie':   { en: 'Gynaecology',             fa: 'زنان و زایمان' },
  'urologie-m':     { en: 'Urology (Male)',          fa: 'اورولوژی (مرد)' },
  // Technik
  'km-technik':     { en: 'Contrast Agents',         fa: 'ماده حاجب' },
  'mrt-physik':     { en: 'MRI Physics',             fa: 'فیزیک MRI' },
  'ct-technik':     { en: 'CT Technique',            fa: 'تکنیک CT' },
  'roentgen':       { en: 'X-Ray Basics',            fa: 'مبانی رادیوگرافی' },
  'strahlenschutz': { en: 'Radiation Protection',    fa: 'حفاظت در برابر اشعه' },
  'sono':           { en: 'Ultrasound',              fa: 'سونوگرافی' },
}
