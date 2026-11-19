export const SECTIONS = [
  { id: 'definition', short: 'Grundlagen', title: 'Grundlagen', icon: 'heart' },
  { id: 'mrt', short: 'MRT', title: 'MRT', icon: 'layers' },
  { id: 'kriterien', short: 'Diagnosekriterien', title: 'Diagnosekriterien', icon: 'table' },
  { id: 'differenzialdiagnosen', short: 'Differenzialdiagnose', title: 'Differenzialdiagnose', icon: 'activity' },
]
export const SECTION_IDS = SECTIONS.map(section => section.id)
export const CORE_SECTION_IDS = SECTIONS.filter(section => !section.optional).map(section => section.id)
export const LGE_PATTERN_SOURCE = {
  label: 'Sokolska et al. · 2025',
  title: 'Myocardial Damage Patterns in Patients with Left Ventricular Systolic Dysfunction with and Without Coronary Artery Disease Referred for Cardiac Magnetic Resonance · Fig. A1',
  url: 'https://www.mdpi.com/2227-9059/13/7/1612#biomedicines-13-01612-f0A1',
}

export const SOURCES = [
  { label: "European Task Force 2023", title: "Corrado et al. European Task Force consensus report. Int J Cardiol. 2024;395:131447.", url: "https://doi.org/10.1016/j.ijcard.2023.131447" },
  LGE_PATTERN_SOURCE,
  { label: 'JACC: Cardiovascular Imaging · 2008', title: 'Tissue Characterization of Acute Myocardial Infarction and Myocarditis by Cardiac Magnetic Resonance', url: 'https://doi.org/10.1016/j.jcmg.2008.07.011' },
  { label: 'Bariani et al. · 2021', title: 'Hot-phase clinical presentation in arrhythmogenic cardiomyopathy', url: 'https://pubmed.ncbi.nlm.nih.gov/33313835/' },
  { label: 'SCMR · 2020', title: 'Standardisierte Kardio-MRT-Protokolle', url: 'https://doi.org/10.1186/s12968-020-00607-1' },
  { label: 'Laredo et al. · 2025', title: 'Aktueller Bildgebungsüberblick: RV, LV und Fallstricke', url: 'https://pubs.rsna.org/doi/10.1148/radiol.242190' },
  { label: 'Cainap et al. · 2021', title: 'Bildquelle: Anatomie-MRT-Korrelationen mit Radiopaedia-Fällen', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8392323/' },
  { label: 'Shen et al. · 2019', title: 'Originalstudie zur prognostischen Bedeutung der LV-Beteiligung', url: 'https://doi.org/10.1038/s41598-019-50535-z' },
]


const path = '/thorax/kardio/arvc/'
export const CASES = [
  { id: '57972', label: 'RV-Dilatation', title: 'Großer RV, auffällige Bewegung, kein LGE', age: '35 Jahre · Mann', creator: 'Azza Elgendy', certainty: 'Diagnose im Originalfall: sicher', url: 'https://radiopaedia.org/cases/57972', study: 'https://radiopaedia.org/cases/57972/studies/64966', clinical: 'Länger bestehende Dyspnoe und eingeschränkte Belastbarkeit; im EKG ein Schenkelblock.', values: [['RVEDVi', '116 ml/m²'], ['RVEF', '< 40 %']], views: [
    { label: '4-Kammer-Cine', file: '57972-4ch.jpg', sequence: 'Axial Cine · segmented 4 CH · Standbild', alt: 'Vierkammer-Cine-Standbild bei ausgeprägter RV-Vergrößerung, Radiopaedia 57972.' },
    { label: 'RVOT-Cine', file: '57972-rvot.jpg', sequence: 'Cine RVOT · SSFP · Standbild', alt: 'RVOT-Cine-Standbild aus Radiopaedia-Fall 57972.' },
    { label: 'Weitere Cine-Ebene', file: '57972-cine-r2.jpg', sequence: 'CINE R2 · SSFP · Standbild', alt: 'Zusätzliche SSFP-Cine-Ebene aus Radiopaedia-Fall 57972.' },
    { label: 'LGE / PSIR', file: '57972-lge-sax.jpg', sequence: 'SAX · Phase sensitive IR · Standbild', alt: 'PSIR-Standbild der kurzen Achse aus Radiopaedia-Fall 57972.' },
  ], look: 'Zuerst Kammergrößen vergleichen, dann die freie RV-Wand im vollständigen Cine verfolgen. Der Originalfall beschreibt Dyskinesien / paradoxe Bewegung am Übergang RVOT–Apex und kein auffälliges LGE.', lesson: 'Regionale RV-Dyskinesie zusammen mit globaler RV-Dilatation oder verminderter RVEF erfüllt ein morphofunktionelles Major-Kriterium nach ETF 2023.', limit: 'Die vier lokalen Aufnahmen sind Standbilder. Die regionale Bewegung ist im Original-Cine zu prüfen; die 4-Kammer-Serie ist laut Quelle durch Arrhythmie beeinträchtigt.' },
  { id: '194915', label: 'RV + LV / LGE', title: 'Der LV gehört zur Diagnose dazu', age: '30 Jahre · Mann', creator: 'Abhishek Bhargava', certainty: 'Diagnose im Originalfall: sehr wahrscheinlich', url: 'https://radiopaedia.org/cases/194915', study: 'https://radiopaedia.org/cases/194915/studies/154035', clinical: 'Palpitationen, eine Synkope und auffälliges EKG.', values: [['RVEDVi', '≈ 135 ml/m²'], ['RVEF', '≈ 35 %'], ['LVEF', '≈ 51 %']], views: [
    { label: 'LGE · 4-Kammer', file: '194915-lge-4ch.jpg', sequence: '4CH · PSIR · Standbild', alt: 'PSIR im Vierkammerblick bei biventrikulärer Beteiligung, Radiopaedia 194915.' },
    { label: 'LGE · kurze Achse', file: '194915-lge-sax.jpg', sequence: 'Short axis · PSIR · Standbild', alt: 'PSIR in kurzer Achse bei biventrikulärer Beteiligung, Radiopaedia 194915.' },
    { label: 'T1-Black-Blood', file: '194915-t1-sax.jpg', sequence: 'Short axis · T1 blackblood · Standbild', alt: 'T1-Black-Blood-Aufnahme in kurzer Achse bei ACM, Radiopaedia 194915.' },
  ], look: 'Der Originalfall beschreibt einen dilatierten RV mit dünner, welliger Wand, regionaler Ausbuchtung und LGE. Zusätzlich bestehen Gewebeveränderungen und LGE in anterolateralen / inferolateralen LV-Segmenten.', lesson: 'Eine relativ erhaltene LVEF schließt LV-Beteiligung nicht aus. Cine und PSIR liefern unterschiedliche, sich ergänzende Informationen.', limit: 'Das nichtischämische LGE-Muster unterstützt die Einordnung; die vollständigen Serien und die übrigen Diagnosebereiche bleiben erforderlich.' },
  { id: '39806', label: 'Cine in Bewegung', title: 'Dyskinesie im echten Cine verfolgen', age: '50 Jahre · Mann', creator: 'Tim Luijkx', certainty: 'Diagnose im Originalfall: sicher', url: 'https://radiopaedia.org/cases/39806', study: 'https://radiopaedia.org/cases/39806/studies/42237', clinical: 'Bekannte ARVC nach VT-Ablation am RVOT. Untersuchung von Bewegung und Pumpfunktion.', values: [['RVEDVi', '115 ml/m²'], ['RVEF', '41 %'], ['LVEF', '59 %']], views: [
    { label: '4-Kammer-Cine', file: 'series-cine-4ch/001.webp', sequence: '4ch Cine · Einzelbild', alt: 'Echtes Vierkammer-Cine mit rechtsventrikulären Wandbewegungsstörungen.' },
  ], look: 'Video starten und die freie RV-Wand sowie den Apex über Systole und Diastole verfolgen. Der Originalfall beschreibt ausgeprägte dyskinetische, aneurysmatische Ausbuchtungen bei normaler LV-Wandbewegung.', lesson: 'Die Bewegungsinformation entsteht erst über den Herzzyklus. Die reduzierte RVEF und das vergrößerte indexierte RV-Volumen werden damit gemeinsam eingeordnet.', limit: 'Wichtig beim LGE der vollständigen Untersuchung: Eine frühere Ablation kann selbst Narben erzeugen. Nicht jedes Enhancement ist allein der ACM zuzuschreiben.' },
  { id: '87505', label: 'Schwere RV-Dysfunktion', title: 'Morphologie, Funktion und Vorgeschichte verbinden', age: '14 Jahre · Mädchen', creator: 'Igor Yarmola', certainty: 'Diagnose im Originalfall: sehr wahrscheinlich', url: 'https://radiopaedia.org/cases/87505', study: 'https://radiopaedia.org/cases/87505/studies/103850', clinical: 'Arrhythmien, Dyspnoe und Belastungsintoleranz; plötzlicher Herztod in der Familie. Trikuspidalklappenrekonstruktion im Säuglingsalter.', values: [['RVEDVi', '189 ml/m²'], ['RVEF', '13,9 %']], views: [
    { label: 'Cine · 4-Kammer', file: '87505-cine-4ch.jpg', sequence: '4ch Cine · SSFP · Standbild', alt: 'Vierkammer-Cine-Standbild mit ausgeprägter RV-Dilatation im Fall 87505.' },
    { label: 'LGE · 4-Kammer', file: '87505-lge-4ch.jpg', sequence: '4ch · IRGRE · Standbild', alt: 'IRGRE-LGE im Vierkammerblick des pädiatrischen ARVC-Falls 87505.' },
    { label: 'Cine · LV-Längsachse', file: '87505-cine-lv.jpg', sequence: '2ch (LV) · Cine SSFP · Standbild', alt: 'Cine-SSFP-Standbild aus dem pädiatrischen ARVC-Fall 87505.' },
  ], look: 'Die Originaluntersuchung zeigt eine schwere RV-Dilatation, regionale A-/Dyskinesien und RV-LGE. Zuerst im Vierkammerblick die vergrößerte rechte Kammer verfolgen, dann Cine und LGE vergleichen. Die LV-Längsachse ist eine ergänzende Ebene.', lesson: 'Starke Funktionsstörung, regionale Veränderungen und Familienanamnese zusammen betrachten. Die Voroperation hilft, lokale Artefakte zu erklären.', limit: 'Pädiatrischer Fall: altersgerechte Referenzwerte heranziehen. Der Originalfall beschreibt zusätzlich ein Suszeptibilitätsartefakt an der rekonstruierten Trikuspidalklappe.' },
  { id: '69431', label: 'RV-Kontur im Kindesalter', title: 'Die freie RV-Wand systematisch verfolgen', age: '10 Jahre · Junge', creator: 'Vlad Barskiy', certainty: 'Publizierter ARVC-Lehrfall', url: 'https://radiopaedia.org/cases/69431', study: 'https://radiopaedia.org/cases/69431', clinical: 'Pädiatrisches MRT-Beispiel aus der publizierten Übersicht von Cainap et al.', values: [], views: [
    { label: '4-Kammer-MRT', file: 'radiopaedia-69431.jpg', sequence: 'Vierkammerblick · publiziertes MRT-Standbild', alt: 'Vierkammer-MRT eines zehnjährigen Jungen mit RV-Vergrößerung und auffälliger RV-Kontur.' },
  ], look: 'Vom Trikuspidalring über die freie RV-Wand bis zum Apex gehen. Die Veröffentlichung beschreibt RV-Vergrößerung, eine dünne Wand und Aneurysmabildung.', lesson: 'Eine auffällige Kontur ist ein Ausgangspunkt für die gezielte Cine-Prüfung in zwei Ebenen.', limit: 'Die genaue Pulssequenz ist in der zugänglichen veröffentlichten Bildlegende nicht genannt. Keine EF oder Dyskinesie allein aus diesem Standbild ableiten. Abbildung aus Cainap et al., 2021, Abb. 9.' },
  { id: '95633', label: 'CT als Ergänzung', title: 'Auch im Trauma-CT kann die ARVC auffallen', age: '45 Jahre · Mann', creator: 'Tom Foster', certainty: 'Diagnose im Originalfall: sehr wahrscheinlich', url: 'https://radiopaedia.org/cases/95633', study: 'https://radiopaedia.org/cases/95633/studies/114991', clinical: 'Trauma-CT bei bekannter ARVC; ein Zweikammer-ICD liegt bereits.', values: [], views: [
    { label: 'CT · axial', file: '95633-ct.jpg', sequence: 'Axial C+ · split bolus · CT-Standbild', alt: 'Kontrastmittel-CT bei bekannter ARVC mit dilatiertem RV und ICD.' },
  ], look: 'Der Originalfall zeigt einen deutlich dilatierten RV mit verdünnter, fetthaltiger Wand. Den ICD als Hinweis auf die bekannte Rhythmuserkrankung einordnen.', lesson: 'CT kann die Morphologie illustrieren. Die MRT-spezifischen Funktions- und Gewebekriterien lassen sich daraus nicht ersetzen.', limit: 'Bewusst ein CT-Vergleichsfall, kein MRT. Fett allein beweist keine ACM und ist kein eigenständiges ETF-Kriterium.' },
].map(item => ({ ...item, views: item.views.map(view => ({ ...view, src: path + view.file })) }))

const localized = (de, en, fa) => ({ de, en, fa })

export const TAKE_HOME = [
  {
    title: localized("ACM ist häufig erblich. Narben begünstigen ventrikuläre Arrhythmien.", "ACM is often inherited. Scarring predisposes to ventricular arrhythmias.", "ACM اغلب ارثی است و اسکار زمینه‌ساز آریتمی‌های بطنی است."),
    detail: localized("Herzmuskel kann durch Bindegewebe und teilweise durch Fett ersetzt werden. Ventrikuläre Arrhythmien können schon bei erhaltener Pumpfunktion auftreten.", "Heart muscle may be replaced by fibrous tissue and sometimes fat. Ventricular arrhythmias can occur while systolic function is still preserved.", "ممکن است فیبروز و گاهی چربی جای بخشی از عضلهٔ قلب را بگیرند. آریتمی بطنی حتی با عملکرد سیستولی حفظ‌شده ممکن است رخ دهد."),
  },
  {
    title: localized("ARVC ist die rechtsdominante Form. Bei ACM kann auch der LV betroffen sein.", "ARVC is the right-dominant form. ACM can also involve the LV.", "ARVC شکل راست‌غالب است. در ACM بطن چپ هم ممکن است درگیر باشد."),
    detail: localized("Die Beteiligung kann rechtsdominant, biventrikulär oder linksdominant sein. Beurteile im MRT deshalb beide Herzkammern.", "Involvement may be right-dominant, biventricular, or left-dominant. Assess both ventricles on MRI.", "درگیری می‌تواند راست‌غالب، دوبطنی یا چپ‌غالب باشد. به همین دلیل در MRI هر دو بطن را بررسی کنید."),
  },
  {
    title: localized("Cine zeigt Bewegung und Pumpfunktion. LGE zeigt das Narbenmuster.", "Cine shows motion and systolic function. LGE shows the scar pattern.", "Cine حرکت و عملکرد پمپاژ را نشان می‌دهد. LGE الگوی اسکار را مشخص می‌کند."),
    detail: localized("Im Cine regionale Wandbewegung, Volumina und Ejektionsfraktion erfassen. Im LGE Lage und Verteilung der Narbe beschreiben. Fehlendes LGE schließt ARVC nicht aus.", "Use cine to assess regional wall motion, volumes, and ejection fraction. Describe the location and distribution of scar on LGE. Absence of LGE does not exclude ARVC.", "در Cine حرکت موضعی دیواره، حجم و کسر جهشی را ارزیابی کنید. در LGE محل و توزیع اسکار را توصیف کنید. نبود LGE، ARVC را رد نمی‌کند."),
  },
  {
    title: localized("Bei ETF 2023 bestimmen Kammer und Ausdehnung die LGE-Wertung.", "Under ETF 2023, LGE grading depends on the ventricle and extent.", "در ETF 2023 درجهٔ LGE به بطن درگیر و وسعت آن بستگی دارد."),
    detail: localized("Eindeutiges RV-LGE ist Minor. Typisches LV-Streifen-LGE ist bei 1–2 Segmenten Minor und ab 3 Segmenten Major. Für ALVC ist qualifizierendes LV-LGE erforderlich.", "Unequivocal RV LGE is minor. Typical LV stria-pattern LGE is minor in 1–2 segments and major in at least 3. ALVC requires qualifying LV LGE.", "LGE قطعی بطن راست فرعی است. LGE نواری شاخص بطن چپ در ۱ تا ۲ سگمان فرعی و در دست‌کم ۳ سگمان اصلی است. تشخیص ALVC به LGE واجد شرایط بطن چپ نیاز دارد."),
  },
  {
    title: localized("Die Diagnose verbindet MRT, EKG, Rhythmusdiagnostik und Familienanamnese oder Genetik.", "Diagnosis combines MRI, ECG, rhythm assessment, and family history or genetics.", "تشخیص با کنار هم گذاشتن MRI، نوار قلب، بررسی ریتم و سابقهٔ خانوادگی یا ژنتیک انجام می‌شود."),
    detail: localized("Synkope, ventrikuläre Tachykardie oder plötzlicher Herztod in der Familie können den Verdacht verstärken. Bei RV-Dilatation oder nichtischämischem LGE auch an Sportherz, RV-Belastung beziehungsweise Myokarditis oder Sarkoidose denken.", "Syncope, ventricular tachycardia, or a family history of sudden cardiac death can raise suspicion. Consider athlete’s heart or RV overload in RV dilatation, and myocarditis or sarcoidosis in non-ischaemic LGE.", "سنکوپ، تاکی‌کاردی بطنی یا سابقهٔ مرگ ناگهانی قلبی در خانواده می‌تواند شک را بیشتر کند. در اتساع بطن راست به قلب ورزشکار یا اضافه‌بار بطن راست و در LGE غیرایسکمیک به میوکاردیت یا سارکوئیدوز هم فکر کنید."),
  },
]
