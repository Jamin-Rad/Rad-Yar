'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const LABELS = {
  de: {
    area: 'Technik & Physik',
    title: 'Kontrastmittel',
    subtitle: 'Klinisch-praktischer Überblick für CT, MRT und Spezialfälle',
    sidebar: 'Inhalt',
    merke: 'Merke',
    mcq: 'MCQs starten',
    disclaimer: 'Lerninhalt für die radiologische Praxis. Lokale SOPs, Herstellerangaben und aktuelle Leitlinien haben Vorrang.',
  },
  en: {
    area: 'Technique & Physics',
    title: 'Contrast Media',
    subtitle: 'Practical clinical overview for CT, MRI and special situations',
    sidebar: 'Content',
    merke: 'Key point',
    mcq: 'Start MCQs',
    disclaimer: 'Educational content for radiology practice. Local SOPs, product information and current guidelines take priority.',
  },
  fa: {
    area: 'تکنیک و فیزیک',
    title: 'مواد حاجب',
    subtitle: 'مرور کاربردی برای CT، MRI و شرایط خاص',
    sidebar: 'فهرست',
    merke: 'نکته مهم',
    mcq: 'شروع سؤال‌ها',
    disclaimer: 'این متن آموزشی است. پروتکل داخلی مرکز، اطلاعات شرکت سازنده و گایدلاین‌های به‌روز اولویت دارند.',
  },
}

const CONTENT = {
  de: [
    {
      id: 'iod',
      icon: '💉',
      label: 'Jod-KM / CT',
      sections: [
        {
          id: 'typen',
          title: 'Grundlagen und KM-Typen',
          lead: 'Jodhaltige Kontrastmittel erhöhen die Röntgenabsorption. Für intravasale CT-Untersuchungen sind heute nicht-ionische, wasserlösliche, niedrig-osmolare Präparate Standard.',
          blocks: [
            { type: 'table', headers: ['Typ', 'Beispiele', 'Eigenschaft', 'Typische Anwendung'], rows: [
              ['Nicht-ionisch, wasserlöslich', 'Imeron®, Ultravist®, Accupaque®', 'keine Ladung, niedrig-osmolar, gut verträglich', 'i.v. CT, CTA, intraarterielle Angiographie'],
              ['Ionisch, wasserlöslich', 'Gastrografin®', 'hyperosmolar, nicht für i.v.-CT-Standard', 'enterale Kontrastierung, spezielle GI-Fragen'],
              ['Wasserunlöslich', 'Bariumsulfat', 'nicht resorbierbar', 'GI-Diagnostik ohne Perforationsverdacht'],
              ['Negative KM', 'Luft, CO₂, Wasser', 'röntgennegativ', 'GI-Darstellung, Doppelkontrast, spezielle Interventionen'],
            ]},
            { type: 'note', text: 'Die röntgenkontrastgebende Substanz ist Jod. Der organische Trijodbenzolring bestimmt Löslichkeit, Osmolarität und Verträglichkeit.' },
          ],
        },
        {
          id: 'applikation',
          title: 'Applikation und CT-Protokolle',
          lead: 'Kontrastqualität entsteht aus Konzentration, Volumen, Injektionsrate, Zugang und Timing. Arterielle Fragestellungen brauchen eine hohe Flussrate; portalvenöse Organphasen brauchen eher ausreichend Volumen und Timing.',
          blocks: [
            { type: 'stats', items: [
              { value: '300', unit: 'mg I/ml', label: 'Standard-CT' },
              { value: '350–400', unit: 'mg I/ml', label: 'CTA / hohe Gefäßkontrastierung' },
              { value: '18G', unit: 'grün', label: 'bevorzugter Zugang bei CTA' },
            ]},
            { type: 'table', headers: ['Untersuchung', 'Volumen', 'Flussrate', 'Kommentar'], rows: [
              ['Standard CT', 'ca. 80–120 ml', '3–4 ml/s', 'abhängig von Gewicht und Fragestellung'],
              ['LAE-CT / Pulmonalis-CTA', 'ca. 50–70 ml', '4–5 ml/s', 'kurzer Bolus, Bolustracking'],
              ['CTA Aorta / Gefäße', 'ca. 60–90 ml', '4–5 ml/s', 'gute arterielle Spitzenkontrastierung'],
              ['Abdomen portalvenös', 'ca. 80–120 ml', '3–4 ml/s', 'homogene Organparenchymkontrastierung'],
              ['Schlechter Zugang / Notfall', 'reduziert', 'möglichst ≤ 2,5 ml/s', 'Qualität eingeschränkt, nur wenn nötig'],
            ]},
            { type: 'warning', title: 'Praktischer Fehler', text: 'Ein zu kleiner oder zu langsamer Zugang kann eine CTA diagnostisch entwerten. Wenn möglich: Zugang und Protokoll vor Untersuchungsstart prüfen.' },
          ],
        },
        {
          id: 'elimination',
          title: 'Ausscheidung und Paravasat',
          lead: 'Jodhaltige KM werden überwiegend renal eliminiert. Paravasate sind meist konservativ beherrschbar, müssen aber klinisch überwacht werden.',
          blocks: [
            { type: 'cards', items: [
              { title: 'Elimination', text: 'Überwiegend renal; bei normaler Nierenfunktion nahezu vollständig innerhalb von 24 Stunden.' },
              { title: 'Extra-renal', text: 'Ein kleiner Anteil kann über Leber/Galle, Darm und Speicheldrüsen ausgeschieden werden.' },
              { title: 'Umwelt', text: 'Jod- und Gadolinium-KM werden in Kläranlagen nur begrenzt entfernt und sind ein relevantes Umweltthema.' },
            ]},
            { type: 'steps', steps: ['Injektion sofort stoppen', 'Zugang zunächst belassen und Aspiration versuchen', 'Kanüle entfernen, Extremität hochlagern', 'Kühlen, Schwellung markieren und dokumentieren', 'Durchblutung, Sensibilität, Motorik und Haut kontrollieren'] },
            { type: 'danger', title: 'Sofort ärztlich eskalieren bei', text: 'starker zunehmender Schmerz, Blasenbildung, Hautverfärbung, Sensibilitätsstörung, Perfusionsstörung oder Verdacht auf Kompartment-Syndrom.' },
          ],
        },
      ],
    },
    {
      id: 'risiko',
      icon: '⚠️',
      label: 'Nebenwirkungen / Niere',
      sections: [
        {
          id: 'reaktionen',
          title: 'Akute Reaktionen',
          lead: 'Nebenwirkungen lassen sich praktisch in chemotoxische Reaktionen und allergieartige Reaktionen einteilen. Der Begriff „Jodallergie“ ist fachlich falsch.',
          blocks: [
            { type: 'table', headers: ['Gruppe', 'Mechanismus', 'Beispiele'], rows: [
              ['Chemotoxisch', 'direkte pharmakologische/physikalische Wirkung', 'Wärmegefühl, Übelkeit, Erbrechen, vasovagale Reaktion'],
              ['Allergieartig', 'nicht zwingend IgE-vermittelt; Mastzellaktivierung möglich', 'Urtikaria, Juckreiz, Bronchospasmus, Larynxödem, Anaphylaxie'],
            ]},
            { type: 'note', text: 'Jod ist ein kleines Molekül und selbst kein Allergen. Entscheidend ist die frühere Reaktion auf ein bestimmtes Kontrastmittel und nicht eine angebliche „Jodallergie“.' },
            { type: 'cards', items: [
              { title: 'Mild', text: 'begrenzte Urtikaria, Juckreiz, mildes Erythem' },
              { title: 'Moderat', text: 'ausgedehnte Urtikaria, Bronchospasmus, Gesicht-/Larynxödem' },
              { title: 'Schwer', text: 'Hypotonie, Schock, Ateminsuffizienz, Reanimationssituation' },
            ]},
          ],
        },
        {
          id: 'pcaki',
          title: 'PC-AKI und eGFR',
          lead: 'Heute wird bevorzugt von PC-AKI gesprochen, nicht von CIN. Der Begriff beschreibt eine Nierenfunktionsverschlechterung nach KM-Gabe, ohne automatisch Kausalität zu behaupten.',
          blocks: [
            { type: 'definition', title: 'Definition', text: 'Anstieg des Serumkreatinins innerhalb von 48–72 Stunden um ≥ 0,3 mg/dl oder auf ≥ 1,5-fach des Ausgangswerts.' },
            { type: 'table', headers: ['Situation', 'Relevanter Schwellenwert', 'Praktische Konsequenz'], rows: [
              ['i.v. KM / Second-pass renal exposure', 'eGFR < 30 ml/min/1,73 m² oder AKI', 'Risiko-Nutzen prüfen, Hydrierung erwägen'],
              ['intraarteriell mit First-pass renal exposure', 'eGFR < 45 ml/min/1,73 m²', 'höheres Risiko, besonders streng prüfen'],
              ['Dialysepflichtig', 'abhängig von Restfunktion', 'keine prophylaktische Notfalldialyse nur wegen Jod-KM'],
            ]},
            { type: 'warning', title: 'Hydrierung', text: 'Bei relevanter Risikosituation wird meist i.v. Volumengabe mit NaCl 0,9 % erwogen. Bei Herzinsuffizienz oder Lungenödem Vorsicht.' },
          ],
        },
        {
          id: 'metformin',
          title: 'Metformin',
          lead: 'Das Problem ist nicht das Kontrastmittel selbst, sondern eine mögliche Akkumulation von Metformin bei akutem Nierenversagen mit Risiko einer Laktatazidose.',
          blocks: [
            { type: 'table', headers: ['eGFR / Situation', 'Vorgehen'], rows: [
              ['eGFR ≥ 30 ml/min/1,73 m² und keine AKI', 'Metformin in der Regel weiterführen'],
              ['eGFR < 30 ml/min/1,73 m² oder akute Nierenschädigung', 'Metformin pausieren; Nierenfunktion nach 48 h kontrollieren'],
              ['Intraarterielle First-pass-Untersuchung', 'lokale SOP beachten, häufig Pausieren und Kontrolle'],
            ]},
            { type: 'note', text: 'Bei eGFR < 30 ml/min/1,73 m² ist Metformin unabhängig von der CT-Untersuchung meist bereits kritisch bzw. kontraindiziert.' },
          ],
        },
      ],
    },
    {
      id: 'mrt',
      icon: '🧲',
      label: 'Gadolinium / MRT',
      sections: [
        {
          id: 'gadolinium',
          title: 'Gadolinium – Grundlagen',
          lead: 'Gadolinium ist paramagnetisch und verkürzt vor allem die T1-Relaxationszeit. Freies Gd³⁺ ist toxisch, deshalb wird es als Chelat verabreicht.',
          blocks: [
            { type: 'table', headers: ['Parameter', 'Praxisrelevanz'], rows: [
              ['Wirkung', 'T1-Verkürzung → Läsionen/Gewebe werden nach KM heller'],
              ['Standarddosis', 'meist 0,1 mmol/kg Körpergewicht'],
              ['Freies Gd³⁺', 'toxisch → stabile Chelate sind entscheidend'],
              ['Nierenfunktion', 'wichtig bei schwerer CKD/AKI und für NSF-Risikoabschätzung'],
            ]},
          ],
        },
        {
          id: 'chelate',
          title: 'Chelatstruktur, NSF und Retention',
          lead: 'Makrozyklische Gadolinium-KM sind stabiler als lineare Präparate. Deshalb sind sie im Alltag für viele Indikationen bevorzugt.',
          blocks: [
            { type: 'table', headers: ['', 'Linear', 'Makrozyklisch'], rows: [
              ['Struktur', 'offenkettig', 'ringförmig / Käfigstruktur'],
              ['Stabilität', 'geringer', 'hoch'],
              ['Gd-Freisetzung', 'höher', 'minimal'],
              ['Retention', 'eher relevant bei wiederholter Gabe', 'deutlich geringer'],
              ['Beispiele', 'Primovist®, Multihance®', 'Gadovist®, Dotarem®, ProHance®'],
            ]},
            { type: 'warning', title: 'NSF', text: 'Nephrogene systemische Fibrose ist heute sehr selten, bleibt aber bei schwerer Niereninsuffizienz/AKI und weniger stabilen Präparaten ein wichtiges Sicherheitskonzept.' },
          ],
        },
        {
          id: 'leber',
          title: 'Leberspezifische MRT-Kontrastmittel',
          lead: 'Hepatozytenspezifische KM ermöglichen eine hepatobiliäre Phase. Das hilft besonders bei FNH, Adenom, HCC-Diagnostik und Metastasensuche.',
          blocks: [
            { type: 'table', headers: ['KM', 'Aufnahme', 'Hepatobiliäre Phase', 'Besonderheit'], rows: [
              ['Primovist® / Gadoxetsäure', 'ca. 50 % hepatozytär', 'ca. 20 min', 'Dosis 0,025 mmol/kg'],
              ['Multihance® / Gadobensäure', 'geringer hepatozytärer Anteil', 'ca. 40–120 min', 'heute seltener leberspezifisch genutzt'],
            ]},
            { type: 'note', text: 'Läsionen ohne funktionierende Hepatozyten bleiben in der hepatobiliären Phase typischerweise hypointens.' },
          ],
        },
        {
          id: 'buscopan',
          title: 'Buscopan® als Begleitmedikation',
          lead: 'Butylscopolamin reduziert Darmperistaltik und kann Bewegungsartefakte, vor allem im Abdomen-/Leber-MRT, vermindern.',
          blocks: [
            { type: 'table', headers: ['Aspekt', 'Praktische Bedeutung'], rows: [
              ['Wirkung', 'Parasympatholytikum → Relaxation glatter Muskulatur'],
              ['Nutzen', 'weniger Bewegungsartefakte im GI-Trakt'],
              ['Nebenwirkung', 'Akkommodationsstörung, Mundtrockenheit, Tachykardie'],
              ['Kontraindikationen', 'Engwinkelglaukom, relevante Tachyarrhythmie, Prostatahyperplasie mit Harnverhalt, mechanischer Ileus'],
            ]},
            { type: 'warning', title: 'Aufklärung', text: 'Nach Buscopan® kann das Sehen vorübergehend verschwommen sein. Autofahren erst bei wieder normalem Sehen.' },
          ],
        },
      ],
    },
    {
      id: 'special',
      icon: '🧠',
      label: 'Spezialfälle',
      sections: [
        {
          id: 'thyroid',
          title: 'Schilddrüse und jodhaltiges KM',
          lead: 'Jodhaltige KM enthalten eine hohe Jodmenge. Bei autonomer Schilddrüse oder manifester Hyperthyreose kann dies klinisch relevant werden.',
          blocks: [
            { type: 'table', headers: ['Situation', 'Vorgehen'], rows: [
              ['Manifeste Hyperthyreose', 'wenn möglich keine elektive Jod-KM-Gabe'],
              ['Latente Hyperthyreose / Autonomie', 'Risiko prüfen, ggf. Perchlorat/Thyreostatikum nach lokalem Protokoll'],
              ['Notfall / vitale Indikation', 'Untersuchung nicht unnötig verzögern; Prophylaxe und Nachkontrolle organisieren'],
              ['Geplante Radiojodtherapie', 'Jod-KM vermeiden bzw. zeitlichen Abstand mit Nuklearmedizin klären'],
            ]},
          ],
        },
        {
          id: 'gi',
          title: 'Gastrointestinale Kontrastierung',
          lead: 'Für GI-Fragestellungen muss zwischen Bariumsulfat und wasserlöslichem jodhaltigem KM unterschieden werden.',
          blocks: [
            { type: 'table', headers: ['', 'Bariumsulfat', 'Wasserlösliches Jod-KM'], rows: [
              ['Vorteil', 'gute Schleimhautdarstellung', 'bei Perforationsverdacht sicherer'],
              ['Perforation', 'kontraindiziert → Bariumperitonitis', 'bevorzugt'],
              ['Aspiration', 'problematisch', 'auch riskant, aber meist weniger Fremdkörperreaktion'],
              ['Ileus', 'je nach Situation vorsichtig', 'hyperosmolar → Flüssigkeitsverschiebung möglich'],
            ]},
          ],
        },
        {
          id: 'pregnancy',
          title: 'Schwangerschaft und Stillzeit',
          lead: 'Grundprinzip ist immer eine strenge Indikationsstellung. Wenn die Untersuchung medizinisch notwendig ist, darf sie nicht pauschal verhindert werden.',
          blocks: [
            { type: 'table', headers: ['Situation', 'Jod-KM', 'Gadolinium-KM'], rows: [
              ['Schwangerschaft', 'nur bei klarer Indikation; fetale Schilddrüse beachten', 'möglichst vermeiden, nur bei sehr starker Indikation'],
              ['Nach Jod-KM in Schwangerschaft', 'TSH des Neugeborenen kontrollieren', 'keine spezifische Schilddrüsenkontrolle'],
              ['Stillzeit', 'Stillpause medizinisch nicht erforderlich', 'Stillpause medizinisch nicht erforderlich'],
              ['Wenn Mutter besorgt', '24 h Pause optional möglich', '24 h Pause optional möglich'],
            ]},
            { type: 'note', text: 'Für Patientinnen ist eine ruhige Erklärung wichtig: Die tatsächlich beim Säugling ankommende Menge ist extrem gering.' },
          ],
        },
        {
          id: 'checklist',
          title: 'Praktische Checkliste vor KM-Gabe',
          lead: 'Eine kurze, strukturierte Prüfung verhindert die meisten vermeidbaren Probleme.',
          blocks: [
            { type: 'steps', steps: ['Indikation und Protokoll prüfen', 'Vorreaktionen und Risikofaktoren abfragen', 'Nierenfunktion/eGFR nach SOP prüfen', 'Schilddrüsenrisiko bei Jod-KM bedenken', 'Zugang, Flussrate und Patientengewicht kontrollieren', 'Aufklärung und Dokumentation abschließen'] },
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'iod', icon: '💉', label: 'Iodine / CT', sections: [
        { id: 'typen', title: 'Basics and contrast media types', lead: 'Iodinated contrast media increase X-ray attenuation. For intravascular CT, non-ionic, water-soluble, low-osmolar agents are the current standard.', blocks: [
          { type: 'table', headers: ['Type', 'Examples', 'Property', 'Typical use'], rows: [
            ['Non-ionic, water-soluble', 'Imeron®, Ultravist®, Accupaque®', 'uncharged, low-osmolar, well tolerated', 'i.v. CT, CTA, intra-arterial angiography'],
            ['Ionic, water-soluble', 'Gastrografin®', 'hyperosmolar, not standard for i.v. CT', 'enteral contrast, selected GI questions'],
            ['Water-insoluble', 'Barium sulfate', 'not absorbed', 'GI imaging when perforation is not suspected'],
            ['Negative agents', 'air, CO₂, water', 'radiolucent', 'GI imaging, double contrast, selected interventions'],
          ]},
          { type: 'note', text: 'The radiopaque element is iodine. The organic triiodobenzene ring determines solubility, osmolality and tolerability.' },
        ]},
        { id: 'applikation', title: 'Administration and CT protocols', lead: 'Contrast quality depends on concentration, volume, injection rate, venous access and timing. Arterial questions need high flow; portal venous organ imaging needs sufficient volume and timing.', blocks: [
          { type: 'stats', items: [{ value: '300', unit: 'mg I/ml', label: 'standard CT' }, { value: '350–400', unit: 'mg I/ml', label: 'CTA / high vascular contrast' }, { value: '18G', unit: 'green', label: 'preferred access for CTA' }]},
          { type: 'table', headers: ['Examination', 'Volume', 'Flow rate', 'Comment'], rows: [
            ['Standard CT', 'approx. 80–120 ml', '3–4 ml/s', 'depends on weight and indication'],
            ['Pulmonary CTA', 'approx. 50–70 ml', '4–5 ml/s', 'short bolus, bolus tracking'],
            ['Aortic / vascular CTA', 'approx. 60–90 ml', '4–5 ml/s', 'strong arterial peak enhancement'],
            ['Portal venous abdomen', 'approx. 80–120 ml', '3–4 ml/s', 'homogeneous organ enhancement'],
            ['Poor access / emergency', 'reduced', 'preferably ≤ 2.5 ml/s', 'quality reduced; use only if necessary'],
          ]},
          { type: 'warning', title: 'Practical pitfall', text: 'A small or slow access can make a CTA nondiagnostic. Check access and protocol before starting whenever possible.' },
        ]},
        { id: 'elimination', title: 'Elimination and extravasation', lead: 'Iodinated agents are mainly eliminated by the kidneys. Extravasation is usually managed conservatively but requires clinical monitoring.', blocks: [
          { type: 'cards', items: [
            { title: 'Elimination', text: 'Predominantly renal; with normal renal function almost complete within 24 hours.' },
            { title: 'Extra-renal', text: 'A small fraction may be eliminated via liver/bile, bowel and salivary glands.' },
            { title: 'Environment', text: 'Iodinated and gadolinium agents are only partly removed by wastewater treatment.' },
          ]},
          { type: 'steps', steps: ['Stop the injection immediately', 'Leave the cannula in place first and try aspiration', 'Remove cannula, elevate the limb', 'Cool, mark swelling and document', 'Check perfusion, sensation, motor function and skin'] },
          { type: 'danger', title: 'Escalate immediately if', text: 'severe increasing pain, blistering, discoloration, sensory deficit, impaired perfusion or suspected compartment syndrome.' },
        ]},
      ]
    },
    {
      id: 'risiko', icon: '⚠️', label: 'Reactions / kidney', sections: [
        { id: 'reaktionen', title: 'Acute reactions', lead: 'Adverse reactions are practically divided into chemotoxic and allergy-like reactions. The term “iodine allergy” is medically incorrect.', blocks: [
          { type: 'table', headers: ['Group', 'Mechanism', 'Examples'], rows: [
            ['Chemotoxic', 'direct pharmacological/physical effect', 'warmth, nausea, vomiting, vasovagal reaction'],
            ['Allergy-like', 'not necessarily IgE-mediated; mast cell activation possible', 'urticaria, itching, bronchospasm, laryngeal edema, anaphylaxis'],
          ]},
          { type: 'note', text: 'Iodine is a small molecule and is not an allergen. The relevant issue is a previous reaction to a specific contrast agent.' },
          { type: 'cards', items: [{ title: 'Mild', text: 'limited urticaria, itching, mild erythema' }, { title: 'Moderate', text: 'extensive urticaria, bronchospasm, facial/laryngeal edema' }, { title: 'Severe', text: 'hypotension, shock, respiratory failure or resuscitation situation' }]},
        ]},
        { id: 'pcaki', title: 'PC-AKI and eGFR', lead: 'The preferred term is PC-AKI rather than CIN. It describes kidney function deterioration after contrast administration without automatically implying causality.', blocks: [
          { type: 'definition', title: 'Definition', text: 'Serum creatinine increase within 48–72 hours by ≥ 0.3 mg/dl or to ≥ 1.5 times baseline.' },
          { type: 'table', headers: ['Situation', 'Relevant threshold', 'Practical consequence'], rows: [
            ['i.v. contrast / second-pass renal exposure', 'eGFR < 30 ml/min/1.73 m² or AKI', 'weigh risk/benefit, consider hydration'],
            ['intra-arterial with first-pass renal exposure', 'eGFR < 45 ml/min/1.73 m²', 'higher risk, stricter review'],
            ['Dialysis-dependent', 'depends on residual renal function', 'no emergency dialysis solely because of iodinated contrast'],
          ]},
          { type: 'warning', title: 'Hydration', text: 'In relevant high-risk situations, i.v. volume expansion with 0.9% saline is often considered. Use caution in heart failure or pulmonary edema.' },
        ]},
        { id: 'metformin', title: 'Metformin', lead: 'The concern is not the contrast agent itself but metformin accumulation during acute renal failure, with risk of lactic acidosis.', blocks: [
          { type: 'table', headers: ['eGFR / situation', 'Management'], rows: [
            ['eGFR ≥ 30 ml/min/1.73 m² and no AKI', 'usually continue metformin'],
            ['eGFR < 30 ml/min/1.73 m² or AKI', 'withhold metformin; re-check renal function after 48 h'],
            ['Intra-arterial first-pass study', 'follow local SOP; often withhold and re-check'],
          ]},
          { type: 'note', text: 'At eGFR < 30 ml/min/1.73 m², metformin is usually already problematic or contraindicated independent of CT.' },
        ]},
      ]
    },
    {
      id: 'mrt', icon: '🧲', label: 'Gadolinium / MRI', sections: [
        { id: 'gadolinium', title: 'Gadolinium basics', lead: 'Gadolinium is paramagnetic and mainly shortens T1 relaxation. Free Gd³⁺ is toxic, so it is administered as a chelate.', blocks: [
          { type: 'table', headers: ['Parameter', 'Clinical relevance'], rows: [
            ['Effect', 'T1 shortening → tissues/lesions become brighter after contrast'],
            ['Standard dose', 'usually 0.1 mmol/kg body weight'],
            ['Free Gd³⁺', 'toxic → stable chelates are essential'],
            ['Renal function', 'important in severe CKD/AKI and for NSF risk assessment'],
          ]},
        ]},
        { id: 'chelate', title: 'Chelate structure, NSF and retention', lead: 'Macrocyclic gadolinium agents are more stable than linear agents and are preferred for many routine indications.', blocks: [
          { type: 'table', headers: ['', 'Linear', 'Macrocyclic'], rows: [
            ['Structure', 'open chain', 'ring / cage structure'],
            ['Stability', 'lower', 'high'],
            ['Gd release', 'higher', 'minimal'],
            ['Retention', 'more relevant after repeated doses', 'markedly lower'],
            ['Examples', 'Primovist®, Multihance®', 'Gadovist®, Dotarem®, ProHance®'],
          ]},
          { type: 'warning', title: 'NSF', text: 'Nephrogenic systemic fibrosis is now very rare but remains an important safety concept in severe renal impairment/AKI and with less stable agents.' },
        ]},
        { id: 'leber', title: 'Liver-specific MRI agents', lead: 'Hepatocyte-specific agents allow a hepatobiliary phase, useful for FNH, adenoma, HCC workup and metastasis detection.', blocks: [
          { type: 'table', headers: ['Agent', 'Uptake', 'Hepatobiliary phase', 'Special point'], rows: [
            ['Primovist® / gadoxetic acid', 'approx. 50% hepatocyte uptake', 'approx. 20 min', 'dose 0.025 mmol/kg'],
            ['Multihance® / gadobenate', 'small hepatocyte fraction', 'approx. 40–120 min', 'less commonly used as liver-specific agent today'],
          ]},
          { type: 'note', text: 'Lesions without functioning hepatocytes typically remain hypointense in the hepatobiliary phase.' },
        ]},
        { id: 'buscopan', title: 'Buscopan® as adjunct medication', lead: 'Butylscopolamine reduces bowel peristalsis and can reduce motion artifacts, especially in abdominal/liver MRI.', blocks: [
          { type: 'table', headers: ['Aspect', 'Practical meaning'], rows: [
            ['Effect', 'parasympatholytic → relaxation of smooth muscle'],
            ['Benefit', 'less GI motion artifact'],
            ['Adverse effects', 'blurred accommodation, dry mouth, tachycardia'],
            ['Contraindications', 'narrow-angle glaucoma, relevant tachyarrhythmia, urinary retention due to prostate enlargement, mechanical ileus'],
          ]},
          { type: 'warning', title: 'Patient advice', text: 'Vision may be temporarily blurred after Buscopan®. Driving only when vision has normalized.' },
        ]},
      ]
    },
    {
      id: 'special', icon: '🧠', label: 'Special situations', sections: [
        { id: 'thyroid', title: 'Thyroid and iodinated contrast', lead: 'Iodinated contrast contains a high iodine load. This can be relevant in thyroid autonomy or manifest hyperthyroidism.', blocks: [
          { type: 'table', headers: ['Situation', 'Management'], rows: [
            ['Manifest hyperthyroidism', 'avoid elective iodinated contrast if possible'],
            ['Subclinical hyperthyroidism / autonomy', 'assess risk; consider perchlorate/thyrostatic prophylaxis per local protocol'],
            ['Emergency / vital indication', 'do not unnecessarily delay imaging; arrange prophylaxis and follow-up'],
            ['Planned radioiodine therapy', 'avoid iodinated contrast or discuss timing with nuclear medicine'],
          ]},
        ]},
        { id: 'gi', title: 'Gastrointestinal contrast', lead: 'For GI imaging, distinguish barium sulfate from water-soluble iodinated contrast.', blocks: [
          { type: 'table', headers: ['', 'Barium sulfate', 'Water-soluble iodinated contrast'], rows: [
            ['Advantage', 'excellent mucosal coating', 'safer when perforation is suspected'],
            ['Perforation', 'contraindicated → barium peritonitis', 'preferred'],
            ['Aspiration', 'problematic', 'also risky but usually less foreign-body reaction'],
            ['Ileus', 'use carefully depending on setting', 'hyperosmolar → fluid shifts possible'],
          ]},
        ]},
        { id: 'pregnancy', title: 'Pregnancy and breastfeeding', lead: 'The basic principle is strict indication. If imaging is medically necessary, it should not be blocked categorically.', blocks: [
          { type: 'table', headers: ['Situation', 'Iodinated contrast', 'Gadolinium contrast'], rows: [
            ['Pregnancy', 'only with clear indication; consider fetal thyroid', 'avoid if possible; only for very strong indication'],
            ['After iodine during pregnancy', 'check neonatal TSH', 'no specific thyroid check'],
            ['Breastfeeding', 'interruption medically not required', 'interruption medically not required'],
            ['If mother is concerned', 'optional 24 h pause possible', 'optional 24 h pause possible'],
          ]},
          { type: 'note', text: 'A calm explanation is important: the amount actually reaching the infant is extremely small.' },
        ]},
        { id: 'checklist', title: 'Practical checklist before contrast', lead: 'A short structured review prevents most avoidable problems.', blocks: [
          { type: 'steps', steps: ['Check indication and protocol', 'Ask about previous reactions and risk factors', 'Check renal function/eGFR according to SOP', 'Consider thyroid risk for iodinated contrast', 'Verify venous access, flow rate and body weight', 'Complete patient information and documentation'] },
        ]},
      ]
    },
  ],
  fa: [
    {
      id: 'iod', icon: '💉', label: 'ماده حاجب یددار / CT', sections: [
        { id: 'typen', title: 'مبانی و انواع ماده حاجب', lead: 'مواد حاجب یددار جذب اشعه X را افزایش می‌دهند. برای CT داخل‌عروقی، مواد غیر یونی، محلول در آب و با اسمولاریته پایین استاندارد امروزی هستند.', blocks: [
          { type: 'table', headers: ['نوع', 'مثال', 'ویژگی', 'کاربرد معمول'], rows: [
            ['غیر یونی، محلول در آب', 'Imeron®, Ultravist®, Accupaque®', 'بدون بار، اسمولاریته پایین، تحمل بهتر', 'CT و CTA و آنژیوگرافی داخل‌شریانی'],
            ['یونی، محلول در آب', 'Gastrografin®', 'هیپراسمولار، استاندارد CT وریدی نیست', 'کنتراست خوراکی/روده‌ای در موارد خاص'],
            ['نامحلول در آب', 'Bariumsulfat', 'جذب نمی‌شود', 'بررسی دستگاه گوارش وقتی شک به پرفوراسیون نیست'],
            ['کنتراست منفی', 'هوا، CO₂، آب', 'رادیولوسنت', 'GI، دابل‌کنتراست، برخی مداخلات'],
          ]},
          { type: 'note', text: 'عنصر اصلی ایجادکننده کنتراست، ید است. ساختار آلی تری‌یودوبنزن روی حلالیت، اسمولاریته و تحمل بیمار اثر دارد.' },
        ]},
        { id: 'applikation', title: 'تزریق و پروتکل‌های CT', lead: 'کیفیت کنتراست به غلظت، حجم، سرعت تزریق، مسیر وریدی و زمان‌بندی بستگی دارد. سؤال‌های شریانی به فلو بالا نیاز دارند؛ فازهای پورتال بیشتر به حجم کافی و زمان‌بندی درست نیاز دارند.', blocks: [
          { type: 'stats', items: [{ value: '300', unit: 'mg I/ml', label: 'CT استاندارد' }, { value: '350–400', unit: 'mg I/ml', label: 'CTA / کنتراست عروقی بالا' }, { value: '18G', unit: 'سبز', label: 'دسترسی مناسب برای CTA' }]},
          { type: 'table', headers: ['بررسی', 'حجم', 'سرعت تزریق', 'توضیح'], rows: [
            ['CT استاندارد', 'حدود 80–120 ml', '3–4 ml/s', 'وابسته به وزن و سؤال بالینی'],
            ['Pulmonary CTA / LAE-CT', 'حدود 50–70 ml', '4–5 ml/s', 'بولوس کوتاه، Bolus tracking'],
            ['CTA آئورت / عروق', 'حدود 60–90 ml', '4–5 ml/s', 'اوج کنتراست شریانی خوب'],
            ['شکم فاز پورتال', 'حدود 80–120 ml', '3–4 ml/s', 'کنتراست یکنواخت پارانشیم'],
            ['دسترسی ضعیف / اورژانس', 'کاهش‌یافته', 'ترجیحاً ≤ 2.5 ml/s', 'کیفیت محدود؛ فقط در صورت ضرورت'],
          ]},
          { type: 'warning', title: 'اشتباه شایع', text: 'آنژیوگرافی CT با آنژیوکت کوچک یا فلو پایین ممکن است غیرتشخیصی شود. بهتر است قبل از شروع، مسیر وریدی و پروتکل چک شود.' },
        ]},
        { id: 'elimination', title: 'دفع و پاراوازات', lead: 'مواد حاجب یددار عمدتاً از کلیه دفع می‌شوند. پاراوازات معمولاً محافظه‌کارانه کنترل می‌شود، اما نیاز به پایش بالینی دارد.', blocks: [
          { type: 'cards', items: [
            { title: 'دفع', text: 'عمدتاً کلیوی؛ با عملکرد طبیعی کلیه تقریباً طی ۲۴ ساعت کامل می‌شود.' },
            { title: 'دفع خارج‌کلیوی', text: 'مقدار کمی ممکن است از کبد/صفرا، روده و غدد بزاقی دفع شود.' },
            { title: 'محیط زیست', text: 'مواد حاجب یددار و گادولینیوم در تصفیه‌خانه‌ها به‌طور کامل حذف نمی‌شوند.' },
          ]},
          { type: 'steps', steps: ['تزریق را فوراً متوقف کنید', 'ابتدا کانولا را نگه دارید و آسپیراسیون را امتحان کنید', 'کانولا را خارج کنید و اندام را بالا نگه دارید', 'سرد کردن، علامت‌گذاری تورم و مستندسازی', 'پرفیوژن، حس، حرکت و پوست را بررسی کنید'] },
          { type: 'danger', title: 'ارجاع فوری در صورت', text: 'درد شدید و رو به افزایش، تاول، تغییر رنگ پوست، اختلال حس، اختلال پرفیوژن یا شک به سندرم کمپارتمان.' },
        ]},
      ]
    },
    {
      id: 'risiko', icon: '⚠️', label: 'عوارض / کلیه', sections: [
        { id: 'reaktionen', title: 'واکنش‌های حاد', lead: 'از نظر عملی، عوارض به واکنش‌های کموتوکسیک و واکنش‌های شبه‌آلرژیک تقسیم می‌شوند. اصطلاح «آلرژی به ید» از نظر علمی درست نیست.', blocks: [
          { type: 'table', headers: ['گروه', 'مکانیسم', 'مثال‌ها'], rows: [
            ['کموتوکسیک', 'اثر مستقیم فیزیکی/فارماکولوژیک', 'احساس گرما، تهوع، استفراغ، واکنش وازوواگال'],
            ['شبه‌آلرژیک', 'الزاماً IgE-mediated نیست؛ فعال شدن ماست‌سل ممکن است', 'کهیر، خارش، برونکواسپاسم، ادم حنجره، آنافیلاکسی'],
          ]},
          { type: 'note', text: 'ید یک مولکول کوچک است و خودش آلرژن محسوب نمی‌شود. مهم، واکنش قبلی بیمار به یک ماده حاجب مشخص است.' },
          { type: 'cards', items: [{ title: 'خفیف', text: 'کهیر محدود، خارش، اریتم خفیف' }, { title: 'متوسط', text: 'کهیر وسیع، برونکواسپاسم، ادم صورت/حنجره' }, { title: 'شدید', text: 'افت فشار، شوک، نارسایی تنفسی یا وضعیت احیا' }]},
        ]},
        { id: 'pcaki', title: 'PC-AKI و eGFR', lead: 'امروزه بهتر است از اصطلاح PC-AKI استفاده شود نه CIN. این اصطلاح افت عملکرد کلیه بعد از ماده حاجب را توصیف می‌کند، بدون اینکه الزاماً رابطه علت و معلولی ثابت کند.', blocks: [
          { type: 'definition', title: 'تعریف', text: 'افزایش کراتینین سرم طی ۴۸ تا ۷۲ ساعت به میزان ≥ 0.3 mg/dl یا ≥ 1.5 برابر مقدار پایه.' },
          { type: 'table', headers: ['وضعیت', 'آستانه مهم', 'نتیجه عملی'], rows: [
            ['تزریق وریدی / Second-pass renal exposure', 'eGFR < 30 ml/min/1.73 m² یا AKI', 'بررسی ریسک/فایده، در نظر گرفتن هیدراتاسیون'],
            ['تزریق داخل‌شریانی با First-pass renal exposure', 'eGFR < 45 ml/min/1.73 m²', 'ریسک بالاتر، بررسی سخت‌گیرانه‌تر'],
            ['بیمار دیالیزی', 'وابسته به عملکرد باقیمانده کلیه', 'دیالیز اورژانسی فقط به دلیل ید-KM لازم نیست'],
          ]},
          { type: 'warning', title: 'هیدراتاسیون', text: 'در وضعیت‌های پرخطر، تزریق وریدی NaCl 0.9% معمولاً در نظر گرفته می‌شود. در نارسایی قلبی یا ادم ریه باید احتیاط کرد.' },
        ]},
        { id: 'metformin', title: 'متفورمین', lead: 'مشکل اصلی خود ماده حاجب نیست؛ بلکه تجمع متفورمین در صورت نارسایی حاد کلیه و خطر اسیدوز لاکتیک است.', blocks: [
          { type: 'table', headers: ['eGFR / وضعیت', 'اقدام'], rows: [
            ['eGFR ≥ 30 و بدون AKI', 'معمولاً متفورمین ادامه می‌یابد'],
            ['eGFR < 30 یا AKI', 'متفورمین قطع شود؛ عملکرد کلیه پس از ۴۸ ساعت کنترل شود'],
            ['بررسی داخل‌شریانی First-pass', 'طبق SOP مرکز؛ اغلب قطع و کنترل مجدد'],
          ]},
          { type: 'note', text: 'در eGFR کمتر از ۳۰، متفورمین معمولاً مستقل از CT هم مشکل‌ساز یا کنتراندیکه است.' },
        ]},
      ]
    },
    {
      id: 'mrt', icon: '🧲', label: 'گادولینیوم / MRI', sections: [
        { id: 'gadolinium', title: 'مبانی گادولینیوم', lead: 'گادولینیوم پارامغناطیس است و عمدتاً T1 را کوتاه می‌کند. یون آزاد Gd³⁺ سمی است، بنابراین به شکل Chelate تزریق می‌شود.', blocks: [
          { type: 'table', headers: ['پارامتر', 'اهمیت عملی'], rows: [
            ['اثر', 'کوتاه شدن T1 → بافت/ضایعه بعد از تزریق روشن‌تر می‌شود'],
            ['دوز استاندارد', 'معمولاً 0.1 mmol/kg وزن بدن'],
            ['Gd³⁺ آزاد', 'سمی → پایداری Chelate مهم است'],
            ['عملکرد کلیه', 'در CKD شدید/AKI و ارزیابی ریسک NSF مهم است'],
          ]},
        ]},
        { id: 'chelate', title: 'ساختار Chelate، NSF و Retention', lead: 'مواد گادولینیومی ماکروسیکلیک پایدارتر از خطی هستند و برای بسیاری از کاربردهای روزمره ترجیح داده می‌شوند.', blocks: [
          { type: 'table', headers: ['', 'Linear', 'Macrocyclic'], rows: [
            ['ساختار', 'زنجیره باز', 'حلقوی / قفس مانند'],
            ['پایداری', 'کمتر', 'بالا'],
            ['آزاد شدن Gd', 'بیشتر', 'حداقل'],
            ['Retention', 'بیشتر در تزریق‌های مکرر مطرح است', 'واضحاً کمتر'],
            ['مثال', 'Primovist®, Multihance®', 'Gadovist®, Dotarem®, ProHance®'],
          ]},
          { type: 'warning', title: 'NSF', text: 'فیبروز سیستمیک نفروژنیک امروزه بسیار نادر است، اما در نارسایی کلیه شدید/AKI و مواد کم‌ثبات‌تر همچنان یک مفهوم ایمنی مهم است.' },
        ]},
        { id: 'leber', title: 'مواد حاجب اختصاصی کبد', lead: 'مواد Hepatocyte-specific امکان فاز هپاتوبیلیاری را می‌دهند و برای FNH، آدنوم، HCC و متاستازها مفید هستند.', blocks: [
          { type: 'table', headers: ['ماده', 'جذب', 'فاز هپاتوبیلیاری', 'نکته'], rows: [
            ['Primovist® / Gadoxetsäure', 'حدود ۵۰٪ توسط هپاتوسیت', 'حدود ۲۰ دقیقه', 'دوز 0.025 mmol/kg'],
            ['Multihance® / Gadobensäure', 'جذب هپاتوسیتی کمتر', 'حدود ۴۰–۱۲۰ دقیقه', 'امروزه کمتر به‌عنوان ماده اختصاصی کبد استفاده می‌شود'],
          ]},
          { type: 'note', text: 'ضایعات بدون هپاتوسیت عملکردی در فاز هپاتوبیلیاری معمولاً هیپواینتنس می‌مانند.' },
        ]},
        { id: 'buscopan', title: 'Buscopan® به‌عنوان داروی همراه', lead: 'بوتیل‌اسکوپولامین حرکات روده را کم می‌کند و می‌تواند آرتیفکت حرکتی، به‌خصوص در MRI شکم/کبد، را کاهش دهد.', blocks: [
          { type: 'table', headers: ['موضوع', 'اهمیت عملی'], rows: [
            ['اثر', 'پاراسمپاتولیتیک → شل شدن عضلات صاف'],
            ['فایده', 'کاهش آرتیفکت حرکتی GI'],
            ['عارضه', 'اختلال تطابق چشم، خشکی دهان، تاکی‌کاردی'],
            ['کنتراندیکاسیون', 'گلوکوم زاویه بسته، تاکی‌آریتمی مهم، احتباس ادراری ناشی از پروستات، ایلئوس مکانیکی'],
          ]},
          { type: 'warning', title: 'توضیح به بیمار', text: 'بعد از Buscopan® دید ممکن است موقتاً تار شود. رانندگی فقط وقتی دید کاملاً طبیعی شد.' },
        ]},
      ]
    },
    {
      id: 'special', icon: '🧠', label: 'شرایط خاص', sections: [
        { id: 'thyroid', title: 'تیروئید و ماده حاجب یددار', lead: 'مواد حاجب یددار مقدار زیادی ید دارند. این موضوع در اتونومی تیروئید یا هایپرتیروئیدی واضح می‌تواند مهم باشد.', blocks: [
          { type: 'table', headers: ['وضعیت', 'اقدام'], rows: [
            ['هایپرتیروئیدی واضح', 'در صورت امکان از تزریق انتخابی ید-KM پرهیز شود'],
            ['هایپرتیروئیدی ساب‌کلینیک / اتونومی', 'ریسک بررسی شود؛ طبق پروتکل، Perchlorat/Thyreostatikum در نظر گرفته شود'],
            ['اورژانس / اندیکاسیون حیاتی', 'تصویربرداری بی‌دلیل عقب نیفتد؛ پروفیلاکسی و پیگیری برنامه‌ریزی شود'],
            ['رادیویُد درمانی برنامه‌ریزی‌شده', 'از ید-KM اجتناب یا زمان‌بندی با پزشکی هسته‌ای هماهنگ شود'],
          ]},
        ]},
        { id: 'gi', title: 'کنتراست دستگاه گوارش', lead: 'در تصویربرداری GI باید بین باریوم سولفات و ماده حاجب یددار محلول در آب تفاوت گذاشت.', blocks: [
          { type: 'table', headers: ['', 'Bariumsulfat', 'یددار محلول در آب'], rows: [
            ['مزیت', 'نمایش خوب مخاط', 'در شک به پرفوراسیون ایمن‌تر'],
            ['پرفوراسیون', 'کنتراندیکه → Barium peritonitis', 'ترجیح داده می‌شود'],
            ['آسپیراسیون', 'مشکل‌ساز', 'همچنان خطرناک ولی واکنش جسم خارجی کمتر'],
            ['ایلئوس', 'بسته به شرایط با احتیاط', 'هیپراسمولار → جابه‌جایی مایع ممکن است'],
          ]},
        ]},
        { id: 'pregnancy', title: 'بارداری و شیردهی', lead: 'اصل مهم، اندیکاسیون سخت‌گیرانه است. اگر بررسی از نظر پزشکی ضروری باشد، نباید به‌صورت مطلق ممنوع شود.', blocks: [
          { type: 'table', headers: ['وضعیت', 'ید-KM', 'گادولینیوم-KM'], rows: [
            ['بارداری', 'فقط با اندیکاسیون واضح؛ توجه به تیروئید جنین', 'تا حد امکان اجتناب؛ فقط با اندیکاسیون بسیار قوی'],
            ['پس از ید-KM در بارداری', 'کنترل TSH نوزاد', 'کنترل اختصاصی تیروئید لازم نیست'],
            ['شیردهی', 'قطع شیردهی از نظر پزشکی لازم نیست', 'قطع شیردهی از نظر پزشکی لازم نیست'],
            ['اگر مادر نگران است', 'وقفه ۲۴ ساعته اختیاری ممکن است', 'وقفه ۲۴ ساعته اختیاری ممکن است'],
          ]},
          { type: 'note', text: 'توضیح آرام به مادر مهم است: مقدار واقعی که به نوزاد می‌رسد بسیار ناچیز است.' },
        ]},
        { id: 'checklist', title: 'چک‌لیست عملی قبل از تزریق', lead: 'یک بررسی کوتاه و منظم بسیاری از خطاهای قابل پیشگیری را کم می‌کند.', blocks: [
          { type: 'steps', steps: ['اندیکاسیون و پروتکل را بررسی کنید', 'واکنش قبلی و ریسک‌فاکتورها را بپرسید', 'عملکرد کلیه/eGFR طبق SOP کنترل شود', 'ریسک تیروئید در ید-KM در نظر گرفته شود', 'مسیر وریدی، سرعت تزریق و وزن بیمار بررسی شود', 'توضیح به بیمار و مستندسازی کامل شود'] },
        ]},
      ]
    },
  ],
}

function getLangContent(lang) {
  return CONTENT[lang] || CONTENT.de
}

function makeHref(base, lang) {
  return lang === 'de' ? base : `${base}?lang=${lang}`
}

function InfoBox({ type = 'note', title, text }) {
  const cls = type === 'danger' ? styles.dangerBox : type === 'warning' ? styles.warningBox : type === 'definition' ? styles.definitionBox : styles.noteBox
  return (
    <div className={cls}>
      {title && <div className={styles.boxTitle}>{title}</div>}
      <p>{text}</p>
    </div>
  )
}

function DataTable({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatGrid({ items }) {
  return (
    <div className={styles.statGrid}>
      {items.map((item) => (
        <div className={styles.statCard} key={`${item.value}-${item.label}`}>
          <div className={styles.statValue}>{item.value}</div>
          {item.unit && <div className={styles.statUnit}>{item.unit}</div>}
          <div className={styles.statLabel}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function Cards({ items }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article className={styles.card} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Steps({ steps }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => <li key={step}>{step}</li>)}
    </ol>
  )
}

function Block({ block, labels }) {
  if (block.type === 'table') return <DataTable headers={block.headers} rows={block.rows} />
  if (block.type === 'stats') return <StatGrid items={block.items} />
  if (block.type === 'cards') return <Cards items={block.items} />
  if (block.type === 'steps') return <Steps steps={block.steps} />
  if (block.type === 'warning') return <InfoBox type="warning" title={block.title} text={block.text} />
  if (block.type === 'danger') return <InfoBox type="danger" title={block.title} text={block.text} />
  if (block.type === 'definition') return <InfoBox type="definition" title={block.title} text={block.text} />
  return <InfoBox type="note" title={labels.merke} text={block.text} />
}

function Section({ section, labels }) {
  return (
    <section id={section.id} className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionKicker}>RadYar Wissen</span>
        <h2>{section.title}</h2>
        <p>{section.lead}</p>
      </div>
      <div className={styles.blocks}>
        {section.blocks.map((block, index) => <Block key={`${section.id}-${index}`} block={block} labels={labels} />)}
      </div>
    </section>
  )
}

export default function KontrastmittelPage() {
  const { lang } = useLanguage()
  const labels = LABELS[lang] || LABELS.de
  const tabs = useMemo(() => getLangContent(lang), [lang])
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [activeSection, setActiveSection] = useState(tabs[0].sections[0].id)
  const mainRef = useRef(null)

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id)
      setActiveSection(tabs[0].sections[0].id)
    }
  }, [activeTab, tabs])

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0]

  useEffect(() => {
    setActiveSection(currentTab.sections[0]?.id || '')
    if (mainRef.current) mainRef.current.scrollTop = 0
  }, [currentTab.id])

  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const observers = currentTab.sections.map((section) => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { root, rootMargin: '-10% 0px -72% 0px', threshold: 0.01 }
      )
      observer.observe(element)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [currentTab])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`${styles.page} ${lang === 'fa' ? styles.rtl : ''}`}>
      <header className={styles.hero}>
        <div className={styles.breadcrumb}>
          <Link href={makeHref('/', lang)}>RadYar</Link>
          <span>›</span>
          <Link href={makeHref('/#fachgebiete', lang)}>{labels.area}</Link>
          <span>›</span>
          <strong>{labels.title}</strong>
        </div>
        <div className={styles.heroRow}>
          <div>
            <span className={styles.eyebrow}>Contrast Safety</span>
            <h1>{labels.title}</h1>
            <p>{labels.subtitle}</p>
          </div>
          <Link href={makeHref('/technik/kontrastmittel/mcq', lang)} className={styles.mcqButton}>
            <span>🎯</span>
            {labels.mcq}
          </Link>
        </div>
        <div className={styles.disclaimer}>{labels.disclaimer}</div>
        <nav className={styles.tabBar} aria-label="Kontrastmittel Themen">
          {tabs.map((tab) => (
            <button key={tab.id} className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>{currentTab.icon} {currentTab.label}</div>
          <nav>
            {currentTab.sections.map((section) => (
              <button key={section.id} className={`${styles.sideLink} ${activeSection === section.id ? styles.sideLinkActive : ''}`} onClick={() => scrollTo(section.id)}>
                <span className={styles.sideDot} />
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.main} ref={mainRef}>
          <div className={styles.mobileSectionNav}>
            {currentTab.sections.map((section) => (
              <button key={section.id} className={activeSection === section.id ? styles.mobileSectionActive : ''} onClick={() => scrollTo(section.id)}>
                {section.title}
              </button>
            ))}
          </div>
          {currentTab.sections.map((section) => <Section key={section.id} section={section} labels={labels} />)}
        </main>
      </div>
    </div>
  )
}
