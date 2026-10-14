const L = (de, en, fa) => ({ de, en, fa })
const frames = (id, count, extension) => Array.from({ length: count }, (_, index) => `/educational/caa-cases/${id}/${String(index + 1).padStart(2, '0')}.${extension}`)

export const CAA_CASE_COPY = {
  title: L('Originalfälle: vom Schema zum Bild', 'Original cases: from schematic to imaging', 'کیس‌های واقعی: از شماتیک به تصویر'),
  hint: L('Wähle einen Fall und blättere durch die Schichten. Achte auf Verteilung und Blutprodukte.', 'Select a case and scroll through the slices. Focus on distribution and blood products.', 'یک کیس را انتخاب کنید و برش‌ها را مرور کنید. به توزیع ضایعات و محصولات خون توجه کنید.'),
  subset: L('Ausgewählte Originalschichten; die vollständige Untersuchung ist im verlinkten Fall verfügbar.', 'Selected original slices; the complete study is available in the linked case.', 'برش‌های منتخب اصلی؛ مطالعه کامل در لینک کیس در دسترس است.'),
}

export const CAA_RADIOPAEDIA_CASES = [
  {
    id: 46082,
    label: L('CMB · SWI', 'CMB · SWI', 'CMB · SWI'),
    frames: frames(46082, 12, 'png'), initialFrame: 6, autoAspectRatio: true,
    url: 'https://radiopaedia.org/cases/46082/studies/50433?lang=gb',
    title: L('Lobäre Mikroblutungen erkennen', 'Recognise lobar microbleeds', 'تشخیص میکروخونریزی‌های لوبار'),
    findings: [
      L('Zahlreiche punktförmige Suszeptibilitätsverluste, vor allem peripher.', 'Numerous punctate susceptibility foci, predominantly peripheral.', 'کانون‌های متعدد نقطه‌ای افت سیگنال، عمدتاً محیطی.'),
    ],
    interpretation: [
      L('Die periphere Verteilung unterstützt CAA.', 'The peripheral distribution supports CAA.', 'توزیع محیطی به نفع CAA است.'),
      L('Einzelne Signalverluste immer von Gefäßen und Artefakten unterscheiden.', 'Always distinguish individual signal voids from vessels and artefacts.', 'افت سیگنال منفرد را از رگ و آرتیفکت تفکیک کنید.'),
    ],
    alt: L('Axiale SWI mit peripheren Mikroblutungen, Radiopaedia rID 46082', 'Axial SWI with peripheral microbleeds, Radiopaedia rID 46082', 'SWI آگزیال با میکروخونریزی‌های محیطی، Radiopaedia rID 46082'),
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
    alt: L('Axiale native CT mit rechts-temporaler lobärer Blutung, Radiopaedia rID 58758', 'Axial non-contrast CT with right temporal lobar bleeding, Radiopaedia rID 58758', 'CT آگزیال بدون کنتراست با خونریزی لوبار تمپورال راست، Radiopaedia rID 58758'),
    credit: 'Case courtesy of Mark Rodrigues, Radiopaedia.org · rID 58758 · CC BY-NC-SA 3.0',
  },
  {
    id: 40475,
    label: L('cSS / CMB · GRE', 'cSS / CMB · GRE', 'cSS / CMB · GRE'),
    frames: frames(40475, 9, 'png'), initialFrame: 4, autoAspectRatio: true,
    url: 'https://radiopaedia.org/cases/40475/studies/43048?lang=us',
    title: L('Sulkale Blutresiduen von CMB trennen', 'Separate sulcal blood residues from CMB', 'تفکیک آثار خون شیاری از CMB'),
    findings: [
      L('Sulkale Hämosiderinablagerungen zur Konvexität hin verfolgen.', 'Follow sulcal haemosiderin towards the convexity.', 'رسوب هموسیدرین شیاری را به‌سمت کانوکسیتی دنبال کنید.'),
      L('Zusätzlich punktförmige Mikroblutungen; postoperative Veränderungen beachten.', 'Additional punctate microbleeds; note postoperative changes.', 'میکروخونریزی‌های نقطه‌ای همراه؛ تغییرات پس از عمل را در نظر بگیرید.'),
    ],
    interpretation: L('cSS folgt den Sulci, CMB sind punktförmig. Große postoperative Blutresiduen und Katheterartefakte nicht als zusätzliche CMB zählen.', 'cSS follows sulci; CMB are punctate. Do not count large postoperative blood residues or catheter artefacts as additional CMB.', 'cSS مسیر شیارها را دنبال می‌کند و CMB نقطه‌ای است. آثار بزرگ خون پس از عمل و آرتیفکت کاتتر را CMB اضافی نشمارید.'),
    alt: L('Axiale GRE bei multiplen Blutungen und kortikaler Siderose, Radiopaedia rID 40475', 'Axial GRE with multiple haemorrhages and cortical siderosis, Radiopaedia rID 40475', 'GRE آگزیال در خونریزی‌های متعدد و سیدروز قشری، Radiopaedia rID 40475'),
    credit: 'Case courtesy of RMH Neuropathology, Radiopaedia.org · rID 40475 · CC BY-NC-SA 3.0',
  },
]
