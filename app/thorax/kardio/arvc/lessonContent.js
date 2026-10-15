export const SECTIONS = [
  { id: 'definition', short: 'ACM verstehen', title: 'Was ist eine ACM?' },
  { id: 'mrt', short: 'MRT systematisch', title: 'Welche Sequenz beantwortet welche Frage?' },
  { id: 'bilder', short: 'Echte MRT-Fälle', title: 'Am echten MRT lernen' },
  { id: 'tfc', short: 'TFC 2010', title: 'TFC 2010: Wie wird die klassische ARVC erfasst?' },
  { id: 'padua', short: 'Padua 2020', title: 'Padua 2020: Was kommt für das ganze Herz hinzu?' },
  { id: 'merksaetze', short: 'Merksätze & Quellen', title: 'Was du mitnehmen solltest' },
]
export const SECTION_IDS = SECTIONS.map(section => section.id)

export const SOURCES = [
  { label: 'Marcus et al. · 2010', title: 'Originalarbeit: revidierte Task-Force-Kriterien', url: 'https://doi.org/10.1161/CIRCULATIONAHA.108.840827' },
  { label: 'Corrado et al. · 2020', title: 'Originalkonsens: Die Padua-Kriterien', url: 'https://doi.org/10.1016/j.ijcard.2020.06.005' },
  { label: 'Corrado et al. · 2021', title: 'Entwicklung und Anwendung der Diagnosekriterien', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8649536/' },
  { label: 'SCMR · 2020', title: 'Standardisierte Kardio-MRT-Protokolle', url: 'https://doi.org/10.1186/s12968-020-00607-1' },
  { label: 'Laredo et al. · 2025', title: 'Aktueller Bildgebungsüberblick: RV, LV und Fallstricke', url: 'https://pubs.rsna.org/doi/10.1148/radiol.242190' },
  { label: 'Cainap et al. · 2021', title: 'Bildquelle: Anatomie-MRT-Korrelationen mit Radiopaedia-Fällen', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8392323/' },
  { label: 'Shen et al. · 2019', title: 'Originalstudie zur prognostischen Bedeutung der LV-Beteiligung', url: 'https://doi.org/10.1038/s41598-019-50535-z' },
  { label: 'European Task Force · 2024', title: 'Weiterentwicklung der Kriterien nach Padua', url: 'https://doi.org/10.1016/j.ijcard.2023.131447' },
]

// Originals are kept intact. No generated or diagnostically altered MR images.
export const CASES = [
  {
    id: 'rv-adult', label: '01 · RV-Vergrößerung', title: 'Die rechte Kammer fällt auf',
    image: '/thorax/kardio/arvc/radiopaedia-57972.jpg', width: 747, height: 627,
    alt: 'Publiziertes Herz-MRT im Vierkammerblick mit vergrößertem rechten Ventrikel bei einem 35-jährigen Mann mit ARVC.',
    sequence: 'Vierkammerblick · MRT-Standbild',
    text: '35-jähriger Mann mit ARVC. Orientiere dich am Septum: Der RV liegt im Bild links oben, der dickwandigere LV rechts unten. Die auffällig große rechte Kammer ist der zentrale morphologische Hinweis.',
    look: 'Vergleiche die Kammergrößen und die Kontur der freien RV-Wand. Die Vergrößerung ist ein Anlass zur Messung, noch kein vollständiges Diagnosekriterium.',
    limit: 'Aus einem Standbild lassen sich Dyskinesie und Ejektionsfraktion nicht bestimmen. Die genaue Pulssequenz ist in der zugänglichen Abbildungslegende nicht genannt.',
    credit: 'Dr. Azza Elgendy · Radiopaedia.org · rID 57972. Unveränderte Wiedergabe aus Cainap et al., Diagnostics 2021, Abb. 3.',
    url: 'https://radiopaedia.org/cases/arrhythmogenic-right-ventricular-cardiomyopathy-4',
    publication: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8392323/#diagnostics-11-01388-f003',
  },
  {
    id: 'rv-child', label: '02 · RV-Kontur', title: 'Auch die Kontur gehört zur Beurteilung',
    image: '/thorax/kardio/arvc/radiopaedia-69431.jpg', width: 683, height: 687,
    alt: 'Publiziertes MRT eines zehnjährigen Jungen mit ARVC, vergrößertem rechten Ventrikel und auffälliger freier RV-Wand.',
    sequence: 'Vierkammerblick · MRT-Standbild',
    text: '10-jähriger Junge mit MRT-bestätigter ARVC. Die Publikation beschreibt einen vergrößerten RV mit dünner Wand und Aneurysmabildung.',
    look: 'Verfolge die freie RV-Wand von der Trikuspidalklappe bis zum Apex. Prüfe eine auffällige Kontur im vollständigen Cine und in einer zweiten Ebene.',
    limit: 'Pädiatrischer Lehrfall: Die festen Erwachsenengrenzen der TFC-Tabelle dürfen nicht ungeprüft auf Kinder übertragen werden. Die genaue Pulssequenz ist in der Abbildungslegende nicht genannt.',
    credit: 'Dr. Vlad Barskiy · Radiopaedia.org · rID 69431. Unveränderte Wiedergabe aus Cainap et al., Diagnostics 2021, Abb. 9.',
    url: 'https://radiopaedia.org/cases/arrhythmogenic-right-ventricular-cardiomyopathy-3',
    publication: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8392323/#diagnostics-11-01388-f009',
  },
  {
    id: 'lv-lge', label: '03 · LV-Beteiligung / LGE', title: 'Die linke Kammer bewusst mitbeurteilen',
    image: '/thorax/kardio/arvc/lv-lge-shen-2019.jpg', width: 767, height: 246,
    alt: 'Drei publizierte Late-Gadolinium-Enhancement-MRT-Aufnahmen in kurzer Achse und Vierkammerblick mit septalem Enhancement bei ARVC und LV-Beteiligung.',
    sequence: 'Late Gadolinium Enhancement · kurze Achse & Vierkammerblick',
    text: 'Das publizierte LGE-Beispiel zeigt eine linksventrikuläre Beteiligung mit septalem Enhancement. Genau diese Gewebeinformation fehlt, wenn nur die RV-Größe betrachtet wird.',
    look: 'Suche helle Areale innerhalb der LV-Wand und ordne ihre Lage ein: subepikardial, intramural oder subendokardial. Vergleiche kurze und lange Achse.',
    limit: 'Dieses Beispiel stammt aus einer Originalstudie, nicht von Radiopaedia. Septales LGE allein ist nicht spezifisch für ACM; Myokarditis und andere Kardiomyopathien bleiben mögliche Ursachen.',
    credit: 'Shen et al., Scientific Reports 2019 · CC BY 4.0. Unveränderte Wiedergabe über Cainap et al., Abb. 7.',
    url: 'https://doi.org/10.1038/s41598-019-50535-z',
    publication: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8392323/#diagnostics-11-01388-f007',
  },
]
