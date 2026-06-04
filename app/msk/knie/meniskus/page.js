'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const NAV = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbMsk: 'Muskuloskelettales',
    breadcrumbCurrent: 'Knie · Meniskus',
    title: 'Meniskus',
    merke: 'Merke',
    openCase: 'Auf Radiopaedia öffnen',
    tabs: [
      { id: 'anatomie', label: 'Anatomie', icon: '🦴', sections: [
        { id: 'menisken-vergleich', label: 'Vergleich' },
        { id: 'innenmeniskus', label: 'Innenmeniskus' },
        { id: 'aussenmeniskus', label: 'Außenmeniskus' },
        { id: 'verankerung', label: 'Verankerung & Roots' },
        { id: 'vaskularisation', label: 'Vaskularisation' },
      ]},
      { id: 'laesionen', label: 'Meniskus-Läsionen', icon: '🔴', sections: [
        { id: 'normalbefund', label: 'Normalbefund MRT' },
        { id: 'lotysch-klassifikation', label: 'MRT-Grading (Lotysch)' },
        { id: 'komplexe-risse', label: 'Komplexe Risse' },
        { id: 'fallbeispiele', label: 'Fallbeispiele' },
      ]},
      { id: 'therapie', label: 'Therapieprinzip', icon: '💊', sections: [
        { id: 'therapieprinzipien', label: 'Therapieprinzip' },
      ]},
      { id: 'discoider', label: 'Discoider Meniskus', icon: '🔵', sections: [
        { id: 'disc-definition', label: 'Definition & Epidemiologie' },
        { id: 'disc-mrt', label: 'MRT-Kriterien' },
        { id: 'disc-therapie', label: 'Behandlung' },
      ]},
    ],
  },
  en: {
    toc: 'Contents',
    breadcrumbMsk: 'Musculoskeletal',
    breadcrumbCurrent: 'Knee · Meniscus',
    title: 'Meniscus',
    merke: 'Key point',
    openCase: 'Open on Radiopaedia',
    tabs: [
      { id: 'anatomie', label: 'Anatomy', icon: '🦴', sections: [
        { id: 'menisken-vergleich', label: 'Comparison' },
        { id: 'innenmeniskus', label: 'Medial meniscus' },
        { id: 'aussenmeniskus', label: 'Lateral meniscus' },
        { id: 'verankerung', label: 'Anchoring & roots' },
        { id: 'vaskularisation', label: 'Vascular supply' },
      ]},
      { id: 'laesionen', label: 'Meniscal lesions', icon: '🔴', sections: [
        { id: 'normalbefund', label: 'Normal MRI appearance' },
        { id: 'lotysch-klassifikation', label: 'MRI grading (Lotysch)' },
        { id: 'komplexe-risse', label: 'Complex tears' },
        { id: 'fallbeispiele', label: 'Cases' },
      ]},
      { id: 'therapie', label: 'Treatment principle', icon: '💊', sections: [
        { id: 'therapieprinzipien', label: 'Treatment principle' },
      ]},
      { id: 'discoider', label: 'Discoid meniscus', icon: '🔵', sections: [
        { id: 'disc-definition', label: 'Definition & epidemiology' },
        { id: 'disc-mrt', label: 'MRI criteria' },
        { id: 'disc-therapie', label: 'Treatment' },
      ]},
    ],
  },
  fa: {
    toc: 'فهرست مطالب',
    breadcrumbMsk: 'اسکلتی-عضلانی',
    breadcrumbCurrent: 'زانو · منیسک',
    title: 'منیسک',
    merke: 'نکته مهم',
    openCase: 'باز کردن در Radiopaedia',
    tabs: [
      { id: 'anatomie', label: 'آناتومی', icon: '🦴', sections: [
        { id: 'menisken-vergleich', label: 'مقایسه' },
        { id: 'innenmeniskus', label: 'منیسک داخلی' },
        { id: 'aussenmeniskus', label: 'منیسک خارجی' },
        { id: 'verankerung', label: 'اتصال و ریشه‌ها' },
        { id: 'vaskularisation', label: 'خون‌رسانی' },
      ]},
      { id: 'laesionen', label: 'ضایعات منیسک', icon: '🔴', sections: [
        { id: 'normalbefund', label: 'نمای طبیعی در MRI' },
        { id: 'lotysch-klassifikation', label: 'درجه‌بندی MRI' },
        { id: 'komplexe-risse', label: 'پارگی‌های پیچیده' },
        { id: 'fallbeispiele', label: 'نمونه کیس‌ها' },
      ]},
      { id: 'therapie', label: 'اصول درمان', icon: '💊', sections: [
        { id: 'therapieprinzipien', label: 'اصل درمانی' },
      ]},
      { id: 'discoider', label: 'منیسک دیسکوئید', icon: '🔵', sections: [
        { id: 'disc-definition', label: 'تعریف و اپیدمیولوژی' },
        { id: 'disc-mrt', label: 'معیارهای MRI' },
        { id: 'disc-therapie', label: 'درمان' },
      ]},
    ],
  },
}

const CONTENT = {
  de: {
    anatomy: {
      overviewTitle: 'Menisken im Überblick',
      overviewHeaders: ['', 'Innenmeniskus (medial)', 'Außenmeniskus (lateral)'],
      overviewRows: [
        ['Form', 'C-förmig', 'O-förmig, nahezu kreisrund'],
        ['Mobilität', '⚠️ Gering – fest mit Kapsel und MCL verwachsen', '✅ Hoch – keine laterale Bandverbindung'],
        ['Verletzungshäufigkeit', '⚠️ ca. zwei Drittel aller Risse', 'ca. ein Drittel aller Risse'],
        ['Häufigste Rissstelle', 'ca. 98 % Hinterhorn', 'ca. 50 % Hinterhorn, ca. 50 % Corpus + Vorderhorn'],
      ],
      medialTitle: 'Innenmeniskus (Meniscus medialis)',
      morphology: 'Morphologie & Fixierung',
      medialText: 'Der Innenmeniskus ist C-förmig und fest mit Gelenkkapsel sowie medialem Kollateralband (MCL) verwachsen. Diese enge Verbindung schränkt seine Verschieblichkeit deutlich ein.',
      limitedMobility: 'Folge der eingeschränkten Mobilität',
      medialWarning: 'Höhere Scherkräfte bei Traumata → ca. zwei Drittel aller Meniskusrisse betreffen den Innenmeniskus.',
      tearLocation: 'Verletzungslokalisation',
      posteriorHorn: 'Hinterhorn',
      medialTearSub: 'bei Innenmeniskus-Rissen',
      medialSmall: 'Das Hinterhorn ist durch Position und eingeschränkte Beweglichkeit am stärksten belastet.',
      lateralTitle: 'Außenmeniskus (Meniscus lateralis)',
      lateralText: 'Der Außenmeniskus ist eher O-förmig und nicht mit den lateralen Bändern verwachsen. Diese freie Beweglichkeit macht ihn verletzungsresistenter.',
      popliteusTitle: 'Popliteus-Sehne',
      popliteusText: 'Die Popliteus-Sehne durchzieht den Außenmeniskus am Hinterhorn – ein normaler Befund, nicht mit einem Riss verwechseln.',
      lateralTearSub: 'Außenmeniskus-Risse',
      bodyAnterior: 'Corpus + VH',
      restParts: 'restliche Anteile',
      rootsTitle: 'Verankerung & Meniskuswurzeln',
      rootsText: 'Die proximale Meniskusoberfläche ist konvex und artikuliert mit den Femurkondylen. Die tibiale Verankerung erfolgt über die Meniskuswurzeln (Roots) am Vorder- und Hinterhorn beider Menisken.',
      rootsCaption: 'Meniskus von proximal: AH = Anterior Horn · PH = Posterior Horn · B = Body/Corpus. Jeder Meniskus besitzt eine anteriore und eine posteriore Wurzel.',
      rootsHeaders: ['Wurzel', 'Lokalisation', 'Klinische Bedeutung'],
      rootsRows: [
        ['Anteriore Wurzel (VH)', 'Vorderhorn-Ansatz an der Tibia', 'Tibiale Stabilisierung anterior'],
        ['Posteriore Wurzel (HH)', 'Hinterhorn-Ansatz an der Tibia', '⚠️ Klinisch bedeutsamer – Wurzelabriss häufiger'],
      ],
      rootTearTitle: 'Root Tear – posteriorer Wurzelabriss',
      rootTearText: 'Abriss der posterioren Meniskuswurzel → Verlust der Hoop-Stress-Funktion → radiale Meniskusextrusion → rasche sekundäre Gonarthrose. MRT: Ghost-Meniskus oder direkte Avulsionszone am Tibiaplateau.',
      vascularTitle: 'Vaskularisation',
      vascularText: 'Die Menisken werden ausschließlich von kapselnahen Gefäßen über den perimeniskalen Plexus versorgt. Die Durchblutung nimmt von außen nach innen ab – mit direkten Konsequenzen für die Heilungspotenz.',
      zones: [
        { name: 'Zone I – rote Zone', range: '< 3 mm von der Kapsel', points: ['✅ Gut durchblutet', '✅ Gute Heilungschancen', '→ Meniskusnaht möglich'] },
        { name: 'Zone II – rot-weiße Zone', range: '3–5 mm von der Kapsel', points: ['⚠️ Eingeschränkte Durchblutung', '⚠️ Reduzierte Heilungstendenz', '→ Naht individuell abwägen'] },
        { name: 'Zone III – weiße Zone', range: '> 5 mm · zentral', points: ['❌ Avaskulär', '❌ Keine relevante Heilung', '→ Naht nicht sinnvoll'] },
      ],
      zoneHeaders: ['Zone', 'Entfernung', 'Heilung', 'Therapie'],
      zoneRows: [
        ['Zone I (rot)', '< 3 mm', '✅ gut', 'Meniskusnaht – Standard der Wahl'],
        ['Zone II (rot-weiß)', '3–5 mm', '⚠️ fraglich', 'Naht mit ergänzenden Maßnahmen'],
        ['Zone III (weiß)', '> 5 mm', '❌ keine', 'Sparsame Teilresektion wenn nötig'],
      ],
      vascularKey: 'Eine Meniskusnaht ist nur in Zone I, gegebenenfalls Zone II, und bei frischen Rissen sinnvoll. Die avaskuläre weiße Zone wird vor allem durch Diffusion aus der Synovialflüssigkeit ernährt.',
    },
    lesions: {
      normalTitle: 'Normalbefund im MRT',
      signalTitle: 'Signal',
      signalText: 'Der gesunde Meniskus stellt sich in allen Sequenzen homogen hypointens dar – ohne intrinsische Signalsteigerung.',
      shapeTitle: 'Form im Sagittalschnitt',
      shapeText: 'Dreieckige Konfiguration: breite Basis zur Kapsel, Spitze zentral. Der Corpus zeigt das typische Bow-Tie-Zeichen auf 1–2 sagittalen Schichten.',
      shapeSmall: 'Sichtbar auf ≥ 3 Schichten → Hinweis auf discoiden Meniskus.',
      normalKey: 'Jede Signalsteigerung im Meniskus ist pathologisch. Erst bei Kontakt zur Gelenkfläche auf mindestens zwei aufeinanderfolgenden Schichten gilt der Riss als radiologisch gesichert.',
      lotyschTitle: 'MRT-Grading nach Lotysch et al.',
      lotyschAim: 'Ziel der Klassifikation',
      lotyschAimText: 'Unterscheidung zwischen degenerativen Veränderungen (Grad 0–2) und radiologisch gesichertem Riss (Grad 3). Grad 2c signalisiert ein erhöhtes Risiko für einen okkulten Riss.',
      lotyschCaption: 'MRT-Grading nach Lotysch et al. — Grad 0 normal bis Grad 3 radiologisch gesicherter Riss. Grad 2 wird in 2a, 2b und 2c unterteilt.',
      gradingHeaders: ['Grad', 'Morphologie', 'Oberflächenkontakt', 'Bedeutung'],
      gradingRows: [
        ['Grad 0', 'Homogen hypointens · kein Signalplus', 'Keiner', 'Normal'],
        ['Grad 1', 'Fokale / punktförmige Signalsteigerung', 'Keiner', 'Frühe mukoide Degeneration · meist asymptomatisch'],
        ['Grad 2a', 'Lineares Signal', 'Kein Kontakt zur Gelenkfläche', 'Degenerativ · kein Riss'],
        ['Grad 2b', 'Lineares Signal auf einer Schicht', '⚠️ Kontakt nur auf einem Bild', 'Inkonklusiv – kein gesicherter Riss'],
        ['Grad 2c', 'Keilförmiges / globuläres / komplexes Signal', 'Kein klarer Kontakt', '⚠️ Erhöhtes Risiko für okkulten Riss'],
        ['Grad 3', 'Lineares oder flächiges Signal', '🔴 Kontakt auf ≥ 2 aufeinanderfolgenden Schichten', 'Radiologisch gesicherter Meniskusriss'],
      ],
      gradingKey: 'Grad 2b ist kein sicherer Riss. Erst der Oberflächenkontakt auf zwei aufeinanderfolgenden Schichten gilt als gesicherter Grad-3-Riss.',
      complexTitle: 'Komplexe Meniskusrisse',
      complexInfoTitle: 'Erweiterung – Grad 4 nach Stoller',
      complexInfoText: 'Komplexe Risse gehen über einen einfachen Grad-3-Riss hinaus. Sie kombinieren mehrere Rissebenen, sind häufig irreparabel und benötigen oft eine sparsame Teilresektion.',
      complexHeaders: ['Merkmal', 'Beschreibung'],
      complexRows: [
        ['Multiple Risslinien', 'Mehrere Ebenen kombiniert, z. B. horizontal + vertikal'],
        ['Mazeration', 'Zerfransung / strukturelle Destruktion des Gewebes'],
        ['Korbhenkelriss', 'Disloziertes Fragment im Interkondylarraum → Double-PCL-Sign / Ghost-Meniskus'],
        ['Flap-Riss', 'Aufklappbares Fragment, mechanisch symptomatisch'],
      ],
      bucketTitle: 'Korbhenkelriss – Zeichen',
      bucketText: 'Direktes Zeichen: disloziertes Fragment im Interkondylarraum. Indirektes Zeichen: verkleinerter oder fehlender Meniskus im eigentlichen Kompartment.',
      flapTitle: 'Flap-Riss',
      flapText: 'Aufklappbares Fragment im Gelenk, häufig im Hinterhorn des Innenmeniskus. Es kann Blockierung oder Schnappen verursachen.',
      casesTitle: 'Fallbeispiele',
      casesText: 'Klick auf einen Fall öffnet den vollständigen Fall auf Radiopaedia – dort sind weitere Sequenzen einsehbar.',
      case1Title: 'Lineare Signalsteigerung ohne Oberflächenkontakt',
      case1Meta: 'PD-Wichtung · sagittal · degenerativ · kein Riss',
      case2Title: 'Globuläres / komplexes Signal ohne klare Linie',
      case2Meta: 'PD-Wichtung · koronal · erhöhtes Risiko für okkulten Riss',
      sequencesTitle: 'Sequenzen für die Meniskusdiagnostik',
      sequencesText: 'PD-FSE mit und ohne Fettsuppression, sagittal und koronal. Sagittal ist sensitiv für Grad-3-Risse; koronal ist wichtig für Meniskuswurzeln und Extrusion.',
    },
    therapy: {
      title: 'Therapieprinzip – „Save the Meniscus“',
      guideTitle: 'Leitgedanke',
      guideText: 'Einmal reseziertes Meniskusgewebe ist dauerhaft verloren. Jeder Substanzverlust erhöht den Knorpelkontaktdruck und begünstigt Degeneration sowie Gonarthrose. Prinzip: so wenig Resektion wie möglich, so viel Naht wie möglich.',
      headers: ['Option', 'Indikation', 'Voraussetzung'],
      rows: [
        ['Konservativ', 'Asymptomatisch · rein degenerativ (Grad 1–2b)', 'Keine mechanische Instabilität / Blockierung'],
        ['Meniskusnaht', 'Frischer traumatischer Riss in Zone I, ggf. II', 'Frisch · stabile Konfiguration · möglichst junger Patient'],
        ['Sparsame Teilresektion', 'Irreparables Fragment in Zone III oder chronisch', 'Nur wenn Naht sicher nicht möglich ist'],
      ],
      steps: [
        { text: '📋 Asymptomatisch / Degeneration Grad 1–2b → konservatives Management', variant: 'flowOrange' },
        { text: '🔧 Zone I · frischer Riss · Grad 3 → Meniskusnaht anstreben' },
        { text: '✂️ Zone III · chronisch · irreparabel → sparsame Teilresektion' },
        { text: '🚫 Totalmeniskektomie → nur absoluter Ausnahmefall', variant: 'flowOrange' },
      ],
      key: 'Jede vermiedene Resektion ist ein Beitrag zum Gelenkerhalt. Die Indikation zur Resektion muss immer kritisch gestellt werden.',
    },
    discoid: {
      definitionTitle: 'Definition & Epidemiologie',
      definitionBoxTitle: 'Definition',
      definitionText: 'Angeborene anatomische Variante mit übermäßig breitem, scheibenförmigem Meniskuskörper. Betrifft fast ausschließlich den Außenmeniskus.',
      stats: [
        { value: '3–5 %', label: 'Inzidenz', sub: 'Zufallsbefund im Knie-MRT', color: '#f97316' },
        { value: '~50 %', label: 'Bilateral', sub: 'häufig doppelseitig', color: '#fbbf24' },
      ],
      headers: ['Parameter', 'Wert'],
      rows: [
        ['Betroffener Meniskus', 'Fast ausschließlich Außenmeniskus'],
        ['Seitenverteilung', 'Bilateral in ca. 50 % der Fälle'],
        ['Geschlecht', 'Keine Präferenz'],
        ['Ethnizität', 'Erhöhte Prävalenz in asiatischen Ländern'],
        ['Rissrisiko', 'Deutlich erhöht gegenüber normalem Meniskus'],
      ],
      childTitle: 'Klinisches Leitsymptom bei Kindern',
      childText: 'Knieschnappen (Snapping Knee) bei Kindern → immer an discoiden Außenmeniskus denken.',
      mriTitle: 'MRT-Kriterien',
      mriHeaders: ['Ebene', 'Kriterium', 'Schwellenwert'],
      mriRows: [
        ['Koronal', 'Absolute Meniskusbreite', '≥ 15 mm'],
        ['Koronal', 'Meniskusbreite / maximale Tibiabreite', '> 20 %'],
        ['Sagittal', 'Kontinuierliche Corpus-Darstellung', 'Auf ≥ 3 aufeinanderfolgenden Standardschichten'],
      ],
      sagittalTitle: 'Sagittales Zeichen',
      sagittalText: 'Das sagittale Kriterium entspricht dem Gegenteil des Absent-Bow-Tie-Signs: Ein normaler Meniskus zeigt den Corpus nur auf 1–2 Schichten, der discoide Meniskus auf ≥ 3 Schichten.',
      mriKey: 'Ein discoider Meniskus reißt häufiger und zeigt atypische Rissmuster. Die Diagnose der Grundanomalie ist wichtig für die Therapieplanung.',
      treatmentTitle: 'Behandlung',
      treatmentHeaders: ['Situation', 'Vorgehen'],
      treatmentRows: [
        ['Asymptomatischer Zufallsbefund', 'Konservativ · keine Intervention nötig'],
        ['Symptomatisch ohne Riss', 'Konservativ; bei Versagen arthroskopische Saucerisation'],
        ['Discoider Meniskus mit Riss', 'Meniskusrefixation + ggf. partielle Resektion'],
        ['Irreparabel / schwere Destruktion', 'Teil- oder Totalmeniskektomie als letzte Option'],
      ],
      saveTitle: 'Prinzip: Meniskusgewebe erhalten',
      saveText: 'Auch beim discoiden Meniskus gilt das Save-the-Meniscus-Prinzip. Totale Meniskektomie sollte vermieden werden.',
    },
  },
  en: {
    anatomy: {
      overviewTitle: 'Menisci at a glance',
      overviewHeaders: ['', 'Medial meniscus', 'Lateral meniscus'],
      overviewRows: [
        ['Shape', 'C-shaped', 'O-shaped, almost circular'],
        ['Mobility', '⚠️ Low – attached to capsule and MCL', '✅ High – no lateral collateral ligament attachment'],
        ['Frequency of tears', '⚠️ about two thirds of tears', 'about one third of tears'],
        ['Most common tear site', 'about 98% posterior horn', 'about 50% posterior horn, 50% body + anterior horn'],
      ],
      medialTitle: 'Medial meniscus',
      morphology: 'Morphology & fixation',
      medialText: 'The medial meniscus is C-shaped and firmly attached to the joint capsule and medial collateral ligament. This close attachment markedly limits its mobility.',
      limitedMobility: 'Consequence of limited mobility',
      medialWarning: 'Higher shear forces during trauma → roughly two thirds of meniscal tears involve the medial meniscus.',
      tearLocation: 'Typical tear location',
      posteriorHorn: 'Posterior horn',
      medialTearSub: 'in medial meniscus tears',
      medialSmall: 'The posterior horn carries high stress because of its position and restricted mobility.',
      lateralTitle: 'Lateral meniscus',
      lateralText: 'The lateral meniscus is more O-shaped and is not attached to the lateral collateral ligament. Its greater mobility makes it more resistant to injury.',
      popliteusTitle: 'Popliteus tendon',
      popliteusText: 'The popliteus tendon passes along the posterior horn of the lateral meniscus. This is a normal finding and should not be mistaken for a tear.',
      lateralTearSub: 'lateral meniscus tears',
      bodyAnterior: 'Body + anterior horn',
      restParts: 'remaining parts',
      rootsTitle: 'Anchoring & meniscal roots',
      rootsText: 'The proximal meniscal surface is convex and articulates with the femoral condyles. Tibial anchoring is provided by the meniscal roots at the anterior and posterior horns of both menisci.',
      rootsCaption: 'Superior view: AH = anterior horn · PH = posterior horn · B = body. Each meniscus has an anterior and posterior root.',
      rootsHeaders: ['Root', 'Location', 'Clinical relevance'],
      rootsRows: [
        ['Anterior root', 'Anterior horn insertion on the tibia', 'Anterior tibial stabilisation'],
        ['Posterior root', 'Posterior horn insertion on the tibia', '⚠️ Clinically important – root tears are more common here'],
      ],
      rootTearTitle: 'Posterior root tear',
      rootTearText: 'Posterior meniscal root tear → loss of hoop-stress function → radial meniscal extrusion → rapid secondary osteoarthritis. MRI may show a ghost meniscus or direct avulsion at the tibial plateau.',
      vascularTitle: 'Vascular supply',
      vascularText: 'Menisci are supplied only by peripheral vessels through the perimeniscal plexus. Vascularity decreases from the periphery to the centre, which directly affects healing potential.',
      zones: [
        { name: 'Zone I – red zone', range: '< 3 mm from capsule', points: ['✅ Well vascularised', '✅ Good healing potential', '→ Meniscal repair possible'] },
        { name: 'Zone II – red-white zone', range: '3–5 mm from capsule', points: ['⚠️ Limited vascularity', '⚠️ Reduced healing tendency', '→ Repair decision is individual'] },
        { name: 'Zone III – white zone', range: '> 5 mm · central', points: ['❌ Avascular', '❌ No relevant healing', '→ Repair usually not useful'] },
      ],
      zoneHeaders: ['Zone', 'Distance', 'Healing', 'Treatment'],
      zoneRows: [
        ['Zone I (red)', '< 3 mm', '✅ good', 'Meniscal repair – preferred option'],
        ['Zone II (red-white)', '3–5 mm', '⚠️ uncertain', 'Repair with additional measures'],
        ['Zone III (white)', '> 5 mm', '❌ poor', 'Limited partial resection if needed'],
      ],
      vascularKey: 'Meniscal repair is most meaningful in zone I, sometimes zone II, and in fresh tears. The avascular white zone is mainly nourished by diffusion from synovial fluid.',
    },
    lesions: {
      normalTitle: 'Normal MRI appearance',
      signalTitle: 'Signal',
      signalText: 'A healthy meniscus is homogeneously hypointense on all routine sequences, without intrinsic signal increase.',
      shapeTitle: 'Sagittal shape',
      shapeText: 'Triangular configuration: broad base toward the capsule and central apex. The meniscal body creates the typical bow-tie sign on one to two sagittal slices.',
      shapeSmall: 'Visible on ≥ 3 slices → consider discoid meniscus.',
      normalKey: 'Any increased intrameniscal signal is abnormal. A tear is radiologically confirmed only when the signal contacts an articular surface on at least two consecutive slices.',
      lotyschTitle: 'MRI grading according to Lotysch et al.',
      lotyschAim: 'Purpose of the classification',
      lotyschAimText: 'The grading separates degenerative change (grades 0–2) from radiologically confirmed tear (grade 3). Grade 2c indicates a higher risk of an occult tear.',
      lotyschCaption: 'MRI grading according to Lotysch et al. — grade 0 normal to grade 3 confirmed tear. Grade 2 is subdivided into 2a, 2b and 2c.',
      gradingHeaders: ['Grade', 'Morphology', 'Surface contact', 'Meaning'],
      gradingRows: [
        ['Grade 0', 'Homogeneously hypointense · no signal increase', 'None', 'Normal'],
        ['Grade 1', 'Focal / punctate signal increase', 'None', 'Early mucoid degeneration · often asymptomatic'],
        ['Grade 2a', 'Linear signal', 'No articular surface contact', 'Degenerative · no tear'],
        ['Grade 2b', 'Linear signal on one slice', '⚠️ Contact on only one image', 'Inconclusive – not a confirmed tear'],
        ['Grade 2c', 'Wedge-shaped / globular / complex signal', 'No definite contact', '⚠️ Higher risk of occult tear'],
        ['Grade 3', 'Linear or extensive signal', '🔴 Contact on ≥ 2 consecutive slices', 'Radiologically confirmed meniscal tear'],
      ],
      gradingKey: 'Grade 2b is not a definite tear. Surface contact on two consecutive slices is needed for a confirmed grade-3 tear.',
      complexTitle: 'Complex meniscal tears',
      complexInfoTitle: 'Extension – Stoller grade 4',
      complexInfoText: 'Complex tears go beyond a simple grade-3 tear. They combine several tear planes, are often irreparable and may require limited partial resection.',
      complexHeaders: ['Feature', 'Description'],
      complexRows: [
        ['Multiple tear lines', 'Several planes combined, e.g. horizontal plus vertical'],
        ['Maceration', 'Fraying and structural tissue destruction'],
        ['Bucket-handle tear', 'Displaced fragment in the intercondylar notch → double-PCL sign / ghost meniscus'],
        ['Flap tear', 'Mobile fragment, often mechanically symptomatic'],
      ],
      bucketTitle: 'Bucket-handle tear – signs',
      bucketText: 'Direct sign: displaced fragment in the intercondylar notch. Indirect sign: reduced or absent meniscus in the original compartment.',
      flapTitle: 'Flap tear',
      flapText: 'A mobile fragment within the joint, often arising from the posterior horn of the medial meniscus. It may cause locking or snapping.',
      casesTitle: 'Cases',
      casesText: 'Clicking a case opens the full Radiopaedia case with additional scrollable sequences.',
      case1Title: 'Linear signal increase without surface contact',
      case1Meta: 'PD-weighted · sagittal · degenerative · no tear',
      case2Title: 'Globular / complex signal without a clear line',
      case2Meta: 'PD-weighted · coronal · higher risk of occult tear',
      sequencesTitle: 'Sequences for meniscal MRI',
      sequencesText: 'PD-FSE with and without fat suppression in sagittal and coronal planes. Sagittal images are sensitive for grade-3 tears; coronal images are important for roots and extrusion.',
    },
    therapy: {
      title: 'Treatment principle – “Save the Meniscus”',
      guideTitle: 'Core idea',
      guideText: 'Resected meniscal tissue is permanently lost. Any tissue loss increases cartilage contact pressure and promotes degeneration and osteoarthritis. Principle: as little resection as possible, as much repair as possible.',
      headers: ['Option', 'Indication', 'Prerequisite'],
      rows: [
        ['Conservative', 'Asymptomatic · purely degenerative grades 1–2b', 'No mechanical instability or locking'],
        ['Meniscal repair', 'Fresh traumatic tear in zone I, sometimes II', 'Fresh · stable configuration · preferably young patient'],
        ['Limited partial resection', 'Irreparable fragment in zone III or chronic tear', 'Only if repair is clearly not possible'],
      ],
      steps: [
        { text: '📋 Asymptomatic / degeneration grade 1–2b → conservative management', variant: 'flowOrange' },
        { text: '🔧 Zone I · fresh tear · grade 3 → aim for repair' },
        { text: '✂️ Zone III · chronic · irreparable → limited partial resection' },
        { text: '🚫 Total meniscectomy → absolute exception only', variant: 'flowOrange' },
      ],
      key: 'Every avoided resection helps preserve the joint. The indication for resection should always be made critically.',
    },
    discoid: {
      definitionTitle: 'Definition & epidemiology',
      definitionBoxTitle: 'Definition',
      definitionText: 'Congenital anatomical variant with an abnormally broad, disc-shaped meniscal body. It almost exclusively affects the lateral meniscus.',
      stats: [
        { value: '3–5%', label: 'Incidence', sub: 'incidental MRI finding', color: '#f97316' },
        { value: '~50%', label: 'Bilateral', sub: 'often on both sides', color: '#fbbf24' },
      ],
      headers: ['Parameter', 'Value'],
      rows: [
        ['Affected meniscus', 'Almost exclusively lateral meniscus'],
        ['Side distribution', 'Bilateral in about 50% of cases'],
        ['Sex', 'No clear preference'],
        ['Ethnicity', 'Higher prevalence in Asian countries'],
        ['Risk of tear', 'Clearly increased compared with a normal meniscus'],
      ],
      childTitle: 'Key clinical clue in children',
      childText: 'Snapping knee in a child → always consider a discoid lateral meniscus.',
      mriTitle: 'MRI criteria',
      mriHeaders: ['Plane', 'Criterion', 'Threshold'],
      mriRows: [
        ['Coronal', 'Absolute meniscal width', '≥ 15 mm'],
        ['Coronal', 'Meniscal width / maximal tibial width', '> 20%'],
        ['Sagittal', 'Continuous body visualisation', 'On ≥ 3 consecutive standard slices'],
      ],
      sagittalTitle: 'Sagittal sign',
      sagittalText: 'The sagittal criterion is the opposite of the absent bow-tie sign: a normal meniscus shows the body on only 1–2 slices, whereas a discoid meniscus remains visible on ≥ 3 slices.',
      mriKey: 'A discoid meniscus tears more often and may show atypical tear patterns. Recognising the underlying variant is important for treatment planning.',
      treatmentTitle: 'Treatment',
      treatmentHeaders: ['Situation', 'Management'],
      treatmentRows: [
        ['Asymptomatic incidental finding', 'Conservative · no intervention needed'],
        ['Symptomatic without tear', 'Conservative; if failed, arthroscopic saucerisation'],
        ['Discoid meniscus with tear', 'Meniscal repair plus partial resection if needed'],
        ['Irreparable / severe destruction', 'Partial or total meniscectomy as last option'],
      ],
      saveTitle: 'Principle: preserve meniscal tissue',
      saveText: 'The save-the-meniscus principle also applies to discoid meniscus. Total meniscectomy should be avoided whenever possible.',
    },
  },
  fa: {
    anatomy: {
      overviewTitle: 'مرور کلی منیسک‌ها',
      overviewHeaders: ['', 'منیسک داخلی', 'منیسک خارجی'],
      overviewRows: [
        ['شکل', 'C شکل', 'O شکل، تقریباً دایره‌ای'],
        ['تحرک', '⚠️ کم – اتصال محکم به کپسول و MCL', '✅ زیاد – بدون اتصال به رباط طرفی خارجی'],
        ['شیوع پارگی', '⚠️ حدود دو سوم همه پارگی‌ها', 'حدود یک سوم همه پارگی‌ها'],
        ['محل شایع پارگی', 'حدود ۹۸٪ شاخ خلفی', 'حدود ۵۰٪ شاخ خلفی، ۵۰٪ جسم + شاخ قدامی'],
      ],
      medialTitle: 'منیسک داخلی',
      morphology: 'مورفولوژی و اتصال',
      medialText: 'منیسک داخلی C شکل است و به کپسول مفصل و رباط کولترال داخلی چسبندگی محکم دارد. به همین دلیل تحرک آن محدودتر است.',
      limitedMobility: 'پیامد تحرک محدود',
      medialWarning: 'در تروما نیروهای برشی بیشتر می‌شود؛ بنابراین حدود دو سوم پارگی‌های منیسک مربوط به منیسک داخلی است.',
      tearLocation: 'محل شایع پارگی',
      posteriorHorn: 'شاخ خلفی',
      medialTearSub: 'در پارگی‌های منیسک داخلی',
      medialSmall: 'شاخ خلفی به علت موقعیت و تحرک محدود، بیشتر تحت فشار قرار می‌گیرد.',
      lateralTitle: 'منیسک خارجی',
      lateralText: 'منیسک خارجی بیشتر O شکل است و به رباط‌های طرفی خارجی چسبندگی ندارد. تحرک آزادتر باعث مقاومت بیشتر در برابر آسیب می‌شود.',
      popliteusTitle: 'تاندون پوپلیتئوس',
      popliteusText: 'تاندون پوپلیتئوس در مجاورت شاخ خلفی منیسک خارجی عبور می‌کند. این یافته طبیعی است و نباید با پارگی اشتباه شود.',
      lateralTearSub: 'پارگی‌های منیسک خارجی',
      bodyAnterior: 'جسم + شاخ قدامی',
      restParts: 'سایر قسمت‌ها',
      rootsTitle: 'اتصال و ریشه‌های منیسک',
      rootsText: 'سطح فوقانی منیسک محدب است و با کندیل‌های فمور مفصل می‌شود. اتصال به تیبیا از طریق ریشه‌های قدامی و خلفی هر دو منیسک انجام می‌شود.',
      rootsCaption: 'نمای فوقانی منیسک: AH = شاخ قدامی، PH = شاخ خلفی، B = جسم منیسک. هر منیسک یک ریشه قدامی و یک ریشه خلفی دارد.',
      rootsHeaders: ['ریشه', 'محل', 'اهمیت بالینی'],
      rootsRows: [
        ['ریشه قدامی', 'اتصال شاخ قدامی به تیبیا', 'پایداری قدامی روی تیبیا'],
        ['ریشه خلفی', 'اتصال شاخ خلفی به تیبیا', '⚠️ از نظر بالینی مهم‌تر؛ پارگی ریشه در این محل شایع‌تر است'],
      ],
      rootTearTitle: 'پارگی ریشه خلفی',
      rootTearText: 'پارگی ریشه خلفی منیسک باعث از بین رفتن عملکرد Hoop-Stress، اکستروژن شعاعی منیسک و آرتروز سریع ثانویه می‌شود. در MRI می‌تواند به صورت Ghost meniscus یا محل آولژن در پلاتوی تیبیا دیده شود.',
      vascularTitle: 'خون‌رسانی',
      vascularText: 'خون‌رسانی منیسک فقط از عروق نزدیک کپسول و از طریق شبکه پری‌منیسکال انجام می‌شود. خون‌رسانی از محیط به مرکز کاهش می‌یابد و این موضوع مستقیماً روی توان ترمیم اثر دارد.',
      zones: [
        { name: 'زون I – زون قرمز', range: 'کمتر از ۳ میلی‌متر از کپسول', points: ['✅ خون‌رسانی خوب', '✅ شانس ترمیم خوب', '→ امکان بخیه منیسک'] },
        { name: 'زون II – قرمز-سفید', range: '۳ تا ۵ میلی‌متر از کپسول', points: ['⚠️ خون‌رسانی محدود', '⚠️ توان ترمیم کمتر', '→ تصمیم برای بخیه فردی است'] },
        { name: 'زون III – سفید', range: 'بیش از ۵ میلی‌متر، مرکزی', points: ['❌ بدون عروق', '❌ ترمیم قابل‌توجه ندارد', '→ بخیه معمولاً مفید نیست'] },
      ],
      zoneHeaders: ['زون', 'فاصله', 'ترمیم', 'درمان'],
      zoneRows: [
        ['زون I قرمز', '< 3 mm', '✅ خوب', 'بخیه منیسک؛ انتخاب ارجح'],
        ['زون II قرمز-سفید', '3–5 mm', '⚠️ نامطمئن', 'بخیه همراه اقدامات کمکی'],
        ['زون III سفید', '> 5 mm', '❌ ضعیف', 'رزکسیون محدود در صورت نیاز'],
      ],
      vascularKey: 'بخیه منیسک بیشتر در زون I، گاهی زون II و در پارگی‌های تازه معنی‌دار است. زون سفید عمدتاً از طریق انتشار از مایع سینوویال تغذیه می‌شود.',
    },
    lesions: {
      normalTitle: 'نمای طبیعی در MRI',
      signalTitle: 'سیگنال',
      signalText: 'منیسک سالم در همه توالی‌های معمول به صورت هموژن هیپواینتنس دیده می‌شود و افزایش سیگنال داخلی ندارد.',
      shapeTitle: 'شکل در برش ساژیتال',
      shapeText: 'نمای مثلثی: قاعده پهن به سمت کپسول و نوک به سمت مرکز. جسم منیسک علامت Bow-Tie را در ۱ تا ۲ برش ساژیتال نشان می‌دهد.',
      shapeSmall: 'دیده شدن در ≥ ۳ برش → به نفع منیسک دیسکوئید.',
      normalKey: 'هر افزایش سیگنال داخل منیسک پاتولوژیک است. پارگی فقط زمانی قطعی است که سیگنال در حداقل دو برش متوالی به سطح مفصلی برسد.',
      lotyschTitle: 'درجه‌بندی MRI بر اساس Lotysch',
      lotyschAim: 'هدف طبقه‌بندی',
      lotyschAimText: 'این طبقه‌بندی تغییرات دژنراتیو درجه ۰ تا ۲ را از پارگی قطعی رادیولوژیک درجه ۳ جدا می‌کند. درجه 2c خطر پارگی مخفی را افزایش می‌دهد.',
      lotyschCaption: 'درجه‌بندی MRI بر اساس Lotysch: درجه ۰ طبیعی تا درجه ۳ پارگی قطعی. درجه ۲ به 2a، 2b و 2c تقسیم می‌شود.',
      gradingHeaders: ['درجه', 'مورفولوژی', 'تماس با سطح مفصلی', 'معنی'],
      gradingRows: [
        ['Grade 0', 'هموژن هیپواینتنس، بدون افزایش سیگنال', 'ندارد', 'طبیعی'],
        ['Grade 1', 'افزایش سیگنال فوکال/نقطه‌ای', 'ندارد', 'دژنراسیون موکوئید اولیه، اغلب بدون علامت'],
        ['Grade 2a', 'سیگنال خطی', 'تماس با سطح ندارد', 'دژنراتیو، پارگی نیست'],
        ['Grade 2b', 'سیگنال خطی در یک برش', '⚠️ تماس فقط در یک تصویر', 'نامشخص؛ پارگی قطعی نیست'],
        ['Grade 2c', 'سیگنال گوه‌ای/گلوبولار/پیچیده', 'تماس واضح ندارد', '⚠️ خطر بیشتر برای پارگی مخفی'],
        ['Grade 3', 'سیگنال خطی یا وسیع', '🔴 تماس در ≥ دو برش متوالی', 'پارگی قطعی منیسک'],
      ],
      gradingKey: 'Grade 2b پارگی قطعی نیست. برای Grade 3 باید تماس با سطح مفصلی در دو برش متوالی دیده شود.',
      complexTitle: 'پارگی‌های پیچیده منیسک',
      complexInfoTitle: 'گسترش طبقه‌بندی؛ Grade 4 بر اساس Stoller',
      complexInfoText: 'پارگی پیچیده از یک پارگی ساده درجه ۳ فراتر می‌رود، چند صفحه پارگی را ترکیب می‌کند و اغلب ترمیم‌پذیر نیست.',
      complexHeaders: ['ویژگی', 'توضیح'],
      complexRows: [
        ['خطوط پارگی متعدد', 'ترکیب چند صفحه، مثلاً افقی + عمودی'],
        ['مازراسیون', 'ریش‌ریش شدن و تخریب ساختاری بافت'],
        ['Bucket-handle tear', 'قطعه جابه‌جا شده در ناچ بین‌کندیلی → Double-PCL sign / Ghost meniscus'],
        ['Flap tear', 'قطعه متحرک که معمولاً علائم مکانیکی می‌دهد'],
      ],
      bucketTitle: 'علائم Bucket-handle tear',
      bucketText: 'علامت مستقیم: قطعه جابه‌جا شده در ناچ بین‌کندیلی. علامت غیرمستقیم: کوچک یا غایب شدن منیسک در کمپارتمان اصلی.',
      flapTitle: 'Flap tear',
      flapText: 'قطعه متحرک داخل مفصل، اغلب از شاخ خلفی منیسک داخلی؛ می‌تواند قفل شدن یا صدای جهشی ایجاد کند.',
      casesTitle: 'نمونه کیس‌ها',
      casesText: 'با کلیک روی هر کیس، صفحه کامل در Radiopaedia باز می‌شود و توالی‌های بیشتری قابل مشاهده است.',
      case1Title: 'افزایش سیگنال خطی بدون تماس با سطح مفصلی',
      case1Meta: 'PD · ساژیتال · دژنراتیو · بدون پارگی',
      case2Title: 'سیگنال گلوبولار/پیچیده بدون خط واضح',
      case2Meta: 'PD · کرونال · خطر بیشتر برای پارگی مخفی',
      sequencesTitle: 'توالی‌های مناسب برای منیسک',
      sequencesText: 'PD-FSE با و بدون Fat-Sat در نماهای ساژیتال و کرونال. ساژیتال برای پارگی Grade 3 حساس است؛ کرونال برای ریشه‌های منیسک و اکستروژن مهم است.',
    },
    therapy: {
      title: 'اصل درمانی؛ حفظ منیسک',
      guideTitle: 'ایده اصلی',
      guideText: 'بافت منیسک پس از رزکسیون برای همیشه از دست می‌رود. هر کاهش بافت منیسک فشار تماس غضروف را بالا می‌برد و دژنراسیون و آرتروز را تسریع می‌کند. اصل کلی: تا حد ممکن رزکسیون کمتر و ترمیم بیشتر.',
      headers: ['گزینه', 'اندیکاسیون', 'شرط'],
      rows: [
        ['درمان محافظه‌کارانه', 'بدون علامت؛ دژنراتیو Grade 1–2b', 'بدون ناپایداری مکانیکی یا قفل شدن'],
        ['بخیه/ترمیم منیسک', 'پارگی تروماتیک تازه در زون I، گاهی II', 'تازه، پایدار، ترجیحاً بیمار جوان'],
        ['رزکسیون جزئی محدود', 'قطعه غیرقابل ترمیم در زون III یا پارگی مزمن', 'فقط وقتی ترمیم ممکن نیست'],
      ],
      steps: [
        { text: '📋 بدون علامت / دژنراسیون Grade 1–2b → درمان محافظه‌کارانه', variant: 'flowOrange' },
        { text: '🔧 زون I · پارگی تازه · Grade 3 → تلاش برای ترمیم' },
        { text: '✂️ زون III · مزمن · غیرقابل ترمیم → رزکسیون جزئی محدود' },
        { text: '🚫 توتال منیسکتومی → فقط در موارد کاملاً استثنایی', variant: 'flowOrange' },
      ],
      key: 'هر رزکسیونی که از آن جلوگیری شود، به حفظ مفصل کمک می‌کند. اندیکاسیون رزکسیون باید همیشه با احتیاط گذاشته شود.',
    },
    discoid: {
      definitionTitle: 'تعریف و اپیدمیولوژی',
      definitionBoxTitle: 'تعریف',
      definitionText: 'نوع مادرزادی آناتومیک با جسم منیسک بیش از حد پهن و دیسکی‌شکل. تقریباً همیشه منیسک خارجی را درگیر می‌کند.',
      stats: [
        { value: '3–5 %', label: 'شیوع', sub: 'یافته اتفاقی در MRI زانو', color: '#f97316' },
        { value: '~50 %', label: 'دوطرفه', sub: 'اغلب دوطرفه', color: '#fbbf24' },
      ],
      headers: ['پارامتر', 'مقدار'],
      rows: [
        ['منیسک درگیر', 'تقریباً همیشه منیسک خارجی'],
        ['توزیع طرفی', 'در حدود ۵۰٪ موارد دوطرفه'],
        ['جنسیت', 'برتری مشخص ندارد'],
        ['اتنیک', 'شیوع بیشتر در کشورهای آسیایی'],
        ['خطر پارگی', 'بیشتر از منیسک طبیعی'],
      ],
      childTitle: 'علامت بالینی مهم در کودکان',
      childText: 'صدای جهشی زانو در کودک (Snapping knee) → همیشه به منیسک خارجی دیسکوئید فکر کنید.',
      mriTitle: 'معیارهای MRI',
      mriHeaders: ['نما', 'معیار', 'حد آستانه'],
      mriRows: [
        ['کرونال', 'عرض مطلق منیسک', '≥ 15 mm'],
        ['کرونال', 'نسبت عرض منیسک به عرض حداکثر تیبیا', '> 20 %'],
        ['ساژیتال', 'دیده شدن پیوسته جسم منیسک', 'در ≥ ۳ برش استاندارد متوالی'],
      ],
      sagittalTitle: 'علامت ساژیتال',
      sagittalText: 'این معیار برعکس Absent Bow-Tie Sign است: منیسک طبیعی جسم را فقط در ۱ تا ۲ برش نشان می‌دهد، ولی منیسک دیسکوئید در ≥ ۳ برش دیده می‌شود.',
      mriKey: 'منیسک دیسکوئید بیشتر پاره می‌شود و الگوهای پارگی غیرمعمول دارد. شناخت این واریانت برای برنامه‌ریزی درمان مهم است.',
      treatmentTitle: 'درمان',
      treatmentHeaders: ['وضعیت', 'اقدام'],
      treatmentRows: [
        ['یافته اتفاقی بدون علامت', 'درمان محافظه‌کارانه؛ مداخله لازم نیست'],
        ['علامت‌دار بدون پارگی', 'محافظه‌کارانه؛ در صورت شکست، Saucerisation آرتروسکوپیک'],
        ['منیسک دیسکوئید همراه پارگی', 'ترمیم منیسک + در صورت نیاز رزکسیون جزئی'],
        ['غیرقابل ترمیم / تخریب شدید', 'منیسکتومی جزئی یا کامل به عنوان آخرین گزینه'],
      ],
      saveTitle: 'اصل: حفظ بافت منیسک',
      saveText: 'در منیسک دیسکوئید نیز اصل حفظ منیسک مهم است. تا حد امکان باید از توتال منیسکتومی جلوگیری شود.',
    },
  },
}

function Merke({ children, label }) {
  return (
    <div className={styles.merke}>
      <span className={styles.merkeTag}>{label}</span>
      {children}
    </div>
  )
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

function KMTable({ headers, rows, colColors }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map((h, i) => (
            <th key={i} style={colColors?.[i] ? { color: colColors[i] } : {}}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ value, label, sub, color = '#f97316' }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue} style={{ color }}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

function FlowStep({ steps }) {
  return (
    <div className={styles.flow}>
      {steps.map((step, i) => (
        <div key={i} className={styles.flowRow}>
          <div className={`${styles.flowBox} ${step.variant ? styles[step.variant] : ''}`}>
            <span>{step.text}</span>
          </div>
          {i < steps.length - 1 && <div className={styles.flowArrow}>↓</div>}
        </div>
      ))}
    </div>
  )
}

function Sidebar({ tabs, copy, activeTab, onTabChange, activeSection, onSectionClick }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideHeader}>{copy.toc}</div>

      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <div key={tab.id} className={styles.sideGroup}>
            <button
              className={`${styles.sideGroupBtn} ${isActive ? styles.sideGroupActive : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className={styles.sideGroupIcon}>{tab.icon}</span>
              <span className={styles.sideGroupLabel}>{tab.label}</span>
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                className={`${styles.sideChevron} ${isActive ? styles.sideChevronOpen : ''}`}
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {isActive && (
              <div className={styles.sideGroupItems}>
                {tab.sections.map(sec => (
                  <button
                    key={sec.id}
                    className={`${styles.sideLink} ${activeSection === sec.id ? styles.sideLinkActive : ''}`}
                    onClick={() => onSectionClick(sec.id)}
                  >
                    <span className={styles.sideDot} />
                    <span>{sec.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </aside>
  )
}

function TabAnatomie({ c, keyLabel }) {
  return (
    <>
      <section id="menisken-vergleich" className={styles.section}>
        <h2 className={styles.h2}>{c.overviewTitle}</h2>
        <KMTable headers={c.overviewHeaders} rows={c.overviewRows} />
      </section>

      <section id="innenmeniskus" className={styles.section}>
        <h2 className={styles.h2}>{c.medialTitle}</h2>
        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.h3}>{c.morphology}</h3>
            <p className={styles.text}>{c.medialText}</p>
            <InfoBox variant="warning" title={c.limitedMobility}><p>{c.medialWarning}</p></InfoBox>
          </div>
          <div>
            <h3 className={styles.h3}>{c.tearLocation}</h3>
            <div className={styles.statRow}>
              <StatCard value="~98 %" label={c.posteriorHorn} sub={c.medialTearSub} color="#f97316" />
            </div>
            <p className={styles.textSm}>{c.medialSmall}</p>
          </div>
        </div>
      </section>

      <section id="aussenmeniskus" className={styles.section}>
        <h2 className={styles.h2}>{c.lateralTitle}</h2>
        <div className={styles.twoCol}>
          <div>
            <h3 className={styles.h3}>{c.morphology}</h3>
            <p className={styles.text}>{c.lateralText}</p>
            <InfoBox variant="info" title={c.popliteusTitle}><p>{c.popliteusText}</p></InfoBox>
          </div>
          <div>
            <h3 className={styles.h3}>{c.tearLocation}</h3>
            <div className={styles.statRow}>
              <StatCard value="~50 %" label={c.posteriorHorn} sub={c.lateralTearSub} color="#38bdf8" />
              <StatCard value="~50 %" label={c.bodyAnterior} sub={c.restParts} color="#94a3b8" />
            </div>
          </div>
        </div>
      </section>

      <section id="verankerung" className={styles.section}>
        <h2 className={styles.h2}>{c.rootsTitle}</h2>
        <p className={styles.text}>{c.rootsText}</p>
        <figure className={styles.imgBlock}>
          <img src="/meniskus/anatomy-roots.png" alt={c.rootsTitle} />
          <figcaption className={styles.imgCaption}>{c.rootsCaption}</figcaption>
        </figure>
        <KMTable headers={c.rootsHeaders} rows={c.rootsRows} />
        <InfoBox variant="danger" title={c.rootTearTitle}><p>{c.rootTearText}</p></InfoBox>
      </section>

      <section id="vaskularisation" className={styles.section}>
        <h2 className={styles.h2}>{c.vascularTitle}</h2>
        <p className={styles.text}>{c.vascularText}</p>
        <figure className={styles.imgBlockSm}>
          <img src="/meniskus/vascular-zones.png" alt={c.vascularTitle} />
        </figure>
        <div className={styles.zoneGrid}>
          {c.zones.map((zone, i) => {
            const colors = ['#dc2626', '#f97316', '#64748b']
            return (
              <div key={zone.name} className={styles.zoneCard} style={{ borderColor: colors[i] }}>
                <div className={styles.zoneHeader} style={{ background: colors[i] }}>
                  <span className={styles.zoneName}>{zone.name}</span>
                  <span className={styles.zoneRange}>{zone.range}</span>
                </div>
                <div className={styles.zoneBody}>{zone.points.map(point => <p key={point}>{point}</p>)}</div>
              </div>
            )
          })}
        </div>
        <KMTable headers={c.zoneHeaders} rows={c.zoneRows} />
        <Merke label={keyLabel}>{c.vascularKey}</Merke>
      </section>
    </>
  )
}

function TabLaesionen({ c, keyLabel, openCase }) {
  return (
    <>
      <section id="normalbefund" className={styles.section}>
        <h2 className={styles.h2}>{c.normalTitle}</h2>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{c.signalTitle}</div>
            <p className={styles.text}>{c.signalText}</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{c.shapeTitle}</div>
            <p className={styles.text}>{c.shapeText}</p>
            <p className={styles.textSm}>{c.shapeSmall}</p>
          </div>
        </div>
        <Merke label={keyLabel}>{c.normalKey}</Merke>
      </section>

      <section id="lotysch-klassifikation" className={styles.section}>
        <h2 className={styles.h2}>{c.lotyschTitle}</h2>
        <InfoBox variant="info" title={c.lotyschAim}><p>{c.lotyschAimText}</p></InfoBox>
        <figure className={styles.imgBlock}>
          <img src="/meniskus/lotysch-grading.png" alt={c.lotyschTitle} />
          <figcaption className={styles.imgCaption}>{c.lotyschCaption}</figcaption>
        </figure>
        <KMTable headers={c.gradingHeaders} rows={c.gradingRows} />
        <Merke label={keyLabel}>{c.gradingKey}</Merke>
      </section>

      <section id="komplexe-risse" className={styles.section}>
        <h2 className={styles.h2}>{c.complexTitle}</h2>
        <InfoBox variant="warning" title={c.complexInfoTitle}><p>{c.complexInfoText}</p></InfoBox>
        <KMTable headers={c.complexHeaders} rows={c.complexRows} />
        <div className={styles.twoCol}>
          <InfoBox variant="danger" title={c.bucketTitle}><p>{c.bucketText}</p></InfoBox>
          <InfoBox variant="warning" title={c.flapTitle}><p>{c.flapText}</p></InfoBox>
        </div>
      </section>

      <section id="fallbeispiele" className={styles.section}>
        <h2 className={styles.h2}>{c.casesTitle}</h2>
        <p className={styles.text}>{c.casesText}</p>
        <div className={styles.caseGrid}>
          <a href="https://radiopaedia.org/cases/14060" target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
            <img className={styles.caseImgLg} src="/meniskus/mri-sagittal.png" alt={c.case1Title} />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grade 2a</div>
              <div className={styles.caseTitle}>{c.case1Title}</div>
              <div className={styles.caseMeta}>{c.case1Meta}</div>
              <div className={styles.caseMeta} style={{ fontSize: 11, marginTop: 4 }}>Case courtesy of Roberto Schubert, Radiopaedia.org · rID: 14060</div>
              <span className={styles.caseLink}>{openCase}</span>
            </div>
          </a>
          <a href="https://radiopaedia.org/cases/75168" target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
            <img className={styles.caseImgLg} src="/meniskus/mri-coronal.png" alt={c.case2Title} />
            <div className={styles.caseBody}>
              <div className={styles.caseLabel}>Grade 2c</div>
              <div className={styles.caseTitle}>{c.case2Title}</div>
              <div className={styles.caseMeta}>{c.case2Meta}</div>
              <div className={styles.caseMeta} style={{ fontSize: 11, marginTop: 4 }}>Case courtesy of Ammar Haouimi, Radiopaedia.org · rID: 75168</div>
              <span className={styles.caseLink}>{openCase}</span>
            </div>
          </a>
        </div>
        <InfoBox variant="info" title={c.sequencesTitle}><p>{c.sequencesText}</p></InfoBox>
      </section>
    </>
  )
}

function TabTherapie({ c, keyLabel }) {
  return (
    <section id="therapieprinzipien" className={styles.section}>
      <h2 className={styles.h2}>{c.title}</h2>
      <InfoBox variant="success" title={c.guideTitle}><p>{c.guideText}</p></InfoBox>
      <KMTable headers={c.headers} rows={c.rows} />
      <FlowStep steps={c.steps} />
      <Merke label={keyLabel}>{c.key}</Merke>
    </section>
  )
}

function TabDiscoider({ c, keyLabel }) {
  return (
    <>
      <section id="disc-definition" className={styles.section}>
        <h2 className={styles.h2}>{c.definitionTitle}</h2>
        <InfoBox variant="info" title={c.definitionBoxTitle}><p>{c.definitionText}</p></InfoBox>
        <div className={styles.statRow}>
          {c.stats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>
        <KMTable headers={c.headers} rows={c.rows} />
        <InfoBox variant="warning" title={c.childTitle}><p>{c.childText}</p></InfoBox>
      </section>

      <section id="disc-mrt" className={styles.section}>
        <h2 className={styles.h2}>{c.mriTitle}</h2>
        <KMTable headers={c.mriHeaders} rows={c.mriRows} />
        <InfoBox variant="info" title={c.sagittalTitle}><p>{c.sagittalText}</p></InfoBox>
        <Merke label={keyLabel}>{c.mriKey}</Merke>
      </section>

      <section id="disc-therapie" className={styles.section}>
        <h2 className={styles.h2}>{c.treatmentTitle}</h2>
        <KMTable headers={c.treatmentHeaders} rows={c.treatmentRows} />
        <InfoBox variant="success" title={c.saveTitle}><p>{c.saveText}</p></InfoBox>
      </section>
    </>
  )
}

export default function MeniskusPage() {
  const { lang } = useLanguage()
  const copy = NAV[lang] || NAV.de
  const content = CONTENT[lang] || CONTENT.de
  const tabs = useMemo(() => copy.tabs, [copy])
  const isRTL = lang === 'fa'
  const [activeTab, setActiveTab] = useState('anatomie')
  const [activeSection, setActiveSection] = useState('menisken-vergleich')
  const mainRef = useRef(null)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (mainRef.current) mainRef.current.scrollTop = 0
    const tab = tabs.find(t => t.id === tabId)
    if (tab?.sections?.[0]) setActiveSection(tab.sections[0].id)
  }

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const tab = tabs.find(t => t.id === activeTab)
    if (!tab) return
    const ids = tab.sections.map(s => s.id)

    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [activeTab, tabs])

  return (
    <div className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <Link href="/lernen/msk" className={styles.breadLink}>{copy.breadcrumbMsk}</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>{copy.breadcrumbCurrent}</span>
        </div>
        <h1 className={styles.pageTitle}>{copy.title}</h1>
      </div>

      <div className={styles.mobileTabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.mobileTab} ${activeTab === tab.id ? styles.mobileTabActive : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        <Sidebar
          tabs={tabs}
          copy={copy}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeSection={activeSection}
          onSectionClick={scrollTo}
        />

        <main className={styles.main} ref={mainRef}>
          {activeTab === 'anatomie' && <TabAnatomie c={content.anatomy} keyLabel={copy.merke} />}
          {activeTab === 'laesionen' && <TabLaesionen c={content.lesions} keyLabel={copy.merke} openCase={copy.openCase} />}
          {activeTab === 'therapie' && <TabTherapie c={content.therapy} keyLabel={copy.merke} />}
          {activeTab === 'discoider' && <TabDiscoider c={content.discoid} keyLabel={copy.merke} />}
        </main>
      </div>
    </div>
  )
}
