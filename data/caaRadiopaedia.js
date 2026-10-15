const L = (de, en, fa) => ({ de, en, fa })
const frames = (id, count, extension) => Array.from({ length: count }, (_, index) => `/educational/caa-cases/${id}/${String(index + 1).padStart(2, '0')}.${extension}`)

export const CAA_CASE_COPY = {
  title: L('Originalfälle: vom Schema zum Bild', 'Clinical cases: from schematic to imaging', 'کیس‌های واقعی: از شماتیک به تصویر'),
  hint: L('Wähle einen Fall und blättere durch die Schichten. Achte auf Verteilung und Blutprodukte.', 'Select a case and scroll through the slices. Focus on distribution and blood products.', 'یک کیس را انتخاب کنید و برش‌ها را مرور کنید. به توزیع ضایعات و فرآورده‌های تجزیهٔ خون توجه کنید.'),
  subset: L('Ausgewählte Bilder; vollständige Fallserien und Abbildungen sind über die jeweiligen Quellen verlinkt.', 'Selected images; complete case series and figures are linked in the respective sources.', 'تصاویر منتخب؛ سری کامل کیس‌ها و شکل‌ها از طریق منابع مربوط در دسترس هستند.'),
}

export const CAA_RADIOPAEDIA_CASES = [
  {
    id: 46082,
    label: L('CMB · SWI', 'CMB · SWI', 'CMB · SWI'),
    frames: frames(46082, 12, 'png'), initialFrame: 6, autoAspectRatio: true,
    url: 'https://radiopaedia.org/cases/46082/studies/50433?lang=gb',
    title: L('Lobäre Mikroblutungen erkennen', 'Recognise lobar microbleeds', 'تشخیص میکروخونریزی‌های لوبار'),
    findings: [
      L('Zahlreiche punktförmige Suszeptibilitätsverluste, vor allem peripher.', 'Numerous punctate foci of susceptibility-related signal loss, predominantly peripheral.', 'کانون‌های متعدد و نقطه‌ایِ افت سیگنال ناشی از حساسیت مغناطیسی، عمدتاً در نواحی محیطی مغز.'),
    ],
    interpretation: [
      L('Die periphere Verteilung unterstützt CAA.', 'The peripheral distribution supports CAA.', 'توزیع محیطی به نفع CAA است.'),
      L('Einzelne Signalverluste immer von Gefäßen und Artefakten unterscheiden.', 'Always distinguish individual signal voids from vessels and artefacts.', 'کانون‌های منفرد افت سیگنال را از عروق و آرتیفکت‌ها تفکیک کنید.'),
    ],
    alt: L('Axiale SWI mit peripheren Mikroblutungen, Radiopaedia rID 46082', 'Axial SWI with peripheral microbleeds, Radiopaedia rID 46082', 'SWI محوری با میکروخونریزی‌های محیطی، Radiopaedia rID 46082'),
    credit: 'Case courtesy of Frank Gaillard, Radiopaedia.org · rID 46082 · CC BY-NC-SA 3.0',
  },
  {
    id: 58758,
    label: L('Lobäre ICH · CT', 'Lobar ICH · CT', 'ICH لوبار · CT'),
    frames: frames(58758, 12, 'jpeg'), initialFrame: 2, autoAspectRatio: true,
    url: 'https://radiopaedia.org/cases/58758/studies/65980?lang=us',
    title: L('Lobäre Blutung im CT einordnen', 'Interpret lobar bleeding on CT', 'تفسیر خونریزی لوبار در CT'),
    findings: [
      L('Großes rechts-temporales Hämatom mit kortikaler Beteiligung.', 'Large right temporal haematoma involving the cortex.', 'هماتوم بزرگ تمپورال راست با درگیری قشر.'),
      L('Unregelmäßige Ausläufer und begleitende subarachnoidale Blutung im Originalfall suchen.', 'Look for irregular projections and associated subarachnoid bleeding in the original case.', 'در کیس اصلی به‌دنبال زوائد نامنظم هماتوم و خونریزی ساب‌آراکنوئید همراه باشید.'),
    ],
    alt: L('Axiale native CT mit rechts-temporaler lobärer Blutung, Radiopaedia rID 58758', 'Axial non-contrast CT with right temporal lobar bleeding, Radiopaedia rID 58758', 'CT محوری بدون کنتراست با خونریزی لوبار تمپورال راست، Radiopaedia rID 58758'),
    credit: 'Case courtesy of Mark Rodrigues, Radiopaedia.org · rID 58758 · CC BY-NC-SA 3.0',
  },
  {
    id: 'css-cortical',
    label: L('cSS · MRT', 'cSS · MRI', 'cSS · MRI'),
    frames: ['/educational/caa-cases/surface-bleeding/css.jpg'], initialFrame: 0, aspectRatio: 710/715,
    frameStyles: [{objectFit:'cover',objectPosition:'center top'}],
    frameLabels: [L('MRT · venBOLD axial', 'MRI · axial venBOLD', 'MRI · venBOLD محوری')],
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11592298/#biomolecules-14-01459-f005',
    publication: 'Biomolecules 2024 · Fig. 5A',
    title: L('Kortikale superfizielle Siderose erkennen', 'Recognise cortical superficial siderosis', 'شناسایی سیدروز سطحی قشری'),
    findings: [
      L('Dunkle, geschwungene Hämosiderinsäume folgen den Sulcuswänden.', 'Dark, curved haemosiderin deposits follow the sulcal walls.', 'رسوبات تیره و منحنی هموسیدرین در امتداد دیواره شیارها دیده می‌شوند.'),
      L('Die weißen Pfeilspitzen markieren die betroffenen Rindenoberflächen.', 'White arrowheads mark the affected cortical surfaces.', 'نوک پیکان‌های سفید، سطوح قشری درگیر را مشخص می‌کنند.'),
    ],
    alt: L('Kortikale superfizielle Siderose mit weißen Pfeilspitzen, Abbildung 5A', 'Cortical superficial siderosis marked by white arrowheads, Figure 5A', 'سیدروز سطحی قشری با نوک پیکان‌های سفید، شکل 5A'),
    credit: 'Jensen-Kondering et al.',
  },
  {
    id: 34462,
    label: L('cSAH · CT', 'cSAH · CT', 'cSAH · CT'),
    frames: ['/educational/caa-cases/34462/ct.png'], initialFrame: 0, autoAspectRatio: true,
    frameLabels: [L('CT · axial, nativ', 'CT · axial, non-contrast', 'CT · محوری، بدون کنتراست')],
    url: 'https://radiopaedia.org/cases/34462/studies/35802',
    title: L('Konvexitäts-SAH im CT erkennen', 'Recognise convexity SAH on CT', 'شناسایی SAH تحدب در CT'),
    findings: [
      L('Im linken präzentralen Sulcus liegt eine kleine hyperdense Blutauflagerung.', 'A small hyperdense focus of blood lies in the left precentral sulcus.', 'مقدار کمی خون پرچگال در شیار پیش‌مرکزی چپ دیده می‌شود.'),
      L('Die Blutung folgt einem oberflächlichen Sulcus an der Konvexität.', 'The blood follows a superficial sulcus over the convexity.', 'خونریزی در امتداد یک شیار سطحی در تحدب مغز قرار دارد.'),
      L('Dieser Fall ist mit RCVS verbunden. Das Bild zeigt eine cSAH, keinen Nachweis einer CAA.', 'In this case, cSAH is associated with RCVS; the image does not establish a diagnosis of CAA.', 'این کیس با RCVS همراه است. تصویر، cSAH را نشان می‌دهد و اثبات‌کننده CAA نیست.'),
    ],
    alt: L('Native axiale CT mit kleiner Konvexitäts-SAH im linken präzentralen Sulcus, Radiopaedia rID 34462', 'Axial non-contrast CT with small convexity SAH in the left precentral sulcus, Radiopaedia rID 34462', 'CT محوری بدون کنتراست با SAH کوچک تحدب در شیار پیش‌مرکزی چپ، Radiopaedia rID 34462'),
    credit: 'Case courtesy of Peter Mitchell, Radiopaedia.org · rID 34462 · CC BY-NC-SA 3.0',
  },
]
