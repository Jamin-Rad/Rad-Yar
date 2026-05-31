'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

// ── QUESTION DATA ──────────────────────────────────────────────────────────

const QUESTIONS = {
  de: [
    {
      id: 1,
      question: 'Welche Aussage zu nicht-ionischen Kontrastmitteln (z. B. Ultravist®) trifft zu?',
      options: [
        { id: 'A', text: 'Höhere Osmolarität als ionische KM' },
        { id: 'B', text: 'Nur enteral zugelassen' },
        { id: 'C', text: 'Niedrigere Osmolarität und besser verträglich' },
        { id: 'D', text: 'Tragen eine negative Ladung' },
      ],
      correct: 'C',
      explanation: 'Nicht-ionische KM besitzen keine elektrische Ladung und sind daher hydrophiler als ionische KM. Durch die niedrigere Osmolarität (iso- bis leicht hyperosmolar gegenüber Blut) sind sie deutlich besser verträglich und haben eine geringere Rate an Nebenwirkungen. Deshalb sind sie der Standard für alle intravaskulären Anwendungen – z. B. CT-Angiographie, venöse Gabe und intraarterielle Applikation.',
    },
    {
      id: 2,
      question: 'Für welche Indikation wird eine hohe Injektionsrate von 5 ml/s empfohlen?',
      options: [
        { id: 'A', text: 'Reine portalvenöse Abdomen-Phase' },
        { id: 'B', text: 'Ausschluss einer Lungenarterienembolie (LAE-CT)' },
        { id: 'C', text: 'Native Schädel-CT ohne KM' },
        { id: 'D', text: 'KM-Gabe über einen Zentralvenenkatheter (ZVK)' },
      ],
      correct: 'B',
      explanation: 'Beim LAE-CT (Pulmonalis-Angiographie) ist eine hohe Injektionsrate von 5 ml/s entscheidend, um eine ausreichende Konzentration des Kontrastmittels in der A. pulmonalis zu erreichen und kleinste Füllungsdefekte sicher darzustellen. Hohe Raten sind auch bei der CT-Angiographie hypervaskularisierter Läsionen sinnvoll. Über einen ZVK darf nur mit maximal 2,5 ml/s injiziert werden, um Katheterschäden zu vermeiden.',
    },
    {
      id: 3,
      question: 'Wie definiert die ESUR eine PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Kreatininanstieg ≥ 0,3 mg/dl oder ≥ 1,5-fach innerhalb 48–72 h nach KM-Gabe' },
        { id: 'B', text: 'GFR-Abfall um 10 % nach 7 Tagen' },
        { id: 'C', text: 'Anurie innerhalb von 6 h nach KM-Gabe' },
        { id: 'D', text: 'Harnstoffanstieg um das 2-fache nach 24 h' },
      ],
      correct: 'A',
      explanation: 'Die ESUR-Definition der PC-AKI: Anstieg des Serumkreatinins um ≥ 0,3 mg/dl (absolut) oder auf das ≥ 1,5-fache des Ausgangswertes (relativ), jeweils innerhalb von 48–72 h nach intravaskulärer KM-Gabe. Wichtig: Die Umbenennung von CIN zu PC-AKI trägt dem fehlenden kausalen Zusammenhang Rechnung – Nierenversagen tritt nach KM-CT und nach nativer CT ähnlich häufig auf.',
    },
    {
      id: 4,
      question: 'Welche Aussage zur sogenannten „Jodallergie" ist korrekt?',
      options: [
        { id: 'A', text: 'Sie ist IgE-vermittelt gegen elementares Jod' },
        { id: 'B', text: 'Sie existiert nicht – Jod als kleines Molekül ist nicht allergen' },
        { id: 'C', text: 'Sie erfordert immer eine Adrenalin-Prophylaxe vor jeder KM-Gabe' },
        { id: 'D', text: 'Sie tritt nur bei makrozyklischen Gadolinium-KM auf' },
      ],
      correct: 'B',
      explanation: 'Der Begriff „Jodallergie" ist medizinisch nicht korrekt. Jod ist ein kleines anorganisches Molekül ohne Hapten-Eigenschaften und daher nicht allergen. Allergische bzw. pseudoallergische Reaktionen richten sich stets gegen andere Molekülbestandteile des Kontrastmittels (z. B. die organische Trägerstruktur). Eine generelle Prophylaxe mit Adrenalin ist nicht indiziert – bei bekannter Vorreaktion sollte jedoch ein Substanzwechsel oder eine KM-freie Alternative erwogen werden.',
    },
    {
      id: 5,
      question: 'Welches Gadolinium-KM ist das einzige hepatozytenspezifische Kontrastmittel und wird in reduzierter Dosis verabreicht?',
      options: [
        { id: 'A', text: 'Gadovist® (Gadobutrol)' },
        { id: 'B', text: 'Dotarem® (Gadoterat)' },
        { id: 'C', text: 'Primovist® (Gadoxetsäure)' },
        { id: 'D', text: 'Gastrografin® (Diatrizoat)' },
      ],
      correct: 'C',
      explanation: 'Primovist® (Gadoxetsäure) ist das einzige MRT-Kontrastmittel mit echter hepatozytenspezifischer Aufnahme (~50 % der Substanz). Es wird von funktionierenden Hepatozyten via OATP1B1/3-Transporter aufgenommen und biliär ausgeschieden. Dadurch entstehen in der hepatobiliären Phase (nach ca. 20 min) hypointense Signale bei nicht-hepatozytären Läsionen (Metastasen, Zysten). Die Dosis beträgt nur 0,025 mmol/kg KG – ein Viertel der üblichen Gd-Standarddosis.',
    },
    {
      id: 6,
      question: 'Was muss nach der Geburt eines Kindes zwingend eingeleitet werden, wenn die Mutter während der Schwangerschaft jodhaltiges Kontrastmittel erhalten hat?',
      options: [
        { id: 'A', text: 'Kontrolle des TSH-Wertes beim Neugeborenen' },
        { id: 'B', text: 'Generelles Stillverbot für mindestens 2 Wochen' },
        { id: 'C', text: 'Ganzkörper-MRT des Neugeborenen zur Verteilungskontrolle' },
        { id: 'D', text: 'Sofortige prophylaktische Gabe von L-Thyroxin beim Säugling' },
      ],
      correct: 'A',
      explanation: 'Jodhaltige KM sind plazentagängig. Ab der 10.–12. SSW kann die fetale Schilddrüse aktiv Jod aufnehmen, da der Wolff-Chaikoff-Effekt beim Fetus nicht wie beim Erwachsenen durch einen „Escape-Mechanismus" kompensiert wird. Dies kann zu einer transienten neonatalen Hypothyreose führen. Eine Kontrolle der Schilddrüsenfunktion (TSH) beim Neugeborenen ist daher obligat, um rechtzeitig eine behandlungsbedürftige Hypothyreose zu erkennen und Entwicklungsstörungen vorzubeugen.',
    },
    {
      id: 7,
      question: 'Welche Empfehlung gilt für das Stillen nach einer Gadolinium-Gabe bei der Mutter?',
      options: [
        { id: 'A', text: 'Stillen erst nach Gabe von Aktivkohle beim Kind erlaubt' },
        { id: 'B', text: 'Eine Stillpause ist medizinisch nicht notwendig' },
        { id: 'C', text: 'Abpumpen und Verwerfen der ersten Mahlzeit nach 12 Stunden' },
        { id: 'D', text: 'Zwingende Stillpause für 48 Stunden zur Sicherheit' },
      ],
      correct: 'B',
      explanation: 'Nach Gadolinium-Gabe werden weniger als 0,04 % der mütterlichen Dosis in die Muttermilch ausgeschieden. Von dieser bereits minimalen Menge wird beim Säugling oral wiederum nur ein sehr geringer Anteil (<1 %) resorbiert. Die klinische Relevanz ist damit vernachlässigbar. Aktuelle Leitlinien (ESUR, ACR) sehen keine medizinische Notwendigkeit für eine Stillpause. Wenn die Mutter dennoch besorgt ist, kann sie 24 h pausieren und die Milch verwerfen – dies ist ihr gutes Recht.',
    },
    {
      id: 8,
      question: 'Was ist die primäre Voraussetzung für die Anwendung von Kontrastmitteln in der Schwangerschaft?',
      options: [
        { id: 'A', text: 'Strenge Indikationsstellung und Fehlen gleichwertiger KM-freier Alternativen' },
        { id: 'B', text: 'Durchführung der Untersuchung ausschließlich unter Vollnarkose' },
        { id: 'C', text: 'Vorliegender negativer Hauttest der Mutter auf KM-Bestandteile' },
        { id: 'D', text: 'Schriftliche Zustimmung des betreuenden Gynäkologen' },
      ],
      correct: 'A',
      explanation: 'Das Grundprinzip lautet: KM in der Schwangerschaft nur dann, wenn (1) die Untersuchung medizinisch unaufschiebbar ist UND (2) keine diagnostisch gleichwertige KM-freie Methode zur Verfügung steht. Beide Bedingungen müssen gleichzeitig erfüllt sein. Darüber hinaus sind eine detaillierte Aufklärung der Patientin über Risiken und Nutzen sowie eine sorgfältige Dokumentation obligatorisch. Ein negativer Allergietest oder das Einverständnis des Gynäkologen allein reichen nicht aus.',
    },
    {
      id: 9,
      question: 'Welche der folgenden Aussagen zur Metformin-Therapie und intravaskulärer KM-Gabe ist korrekt?',
      options: [
        { id: 'A', text: 'Metformin muss bei allen Patienten 48 h vor der Untersuchung abgesetzt werden' },
        { id: 'B', text: 'Bei eGFR > 30 ml/min/1,73 m² kann Metformin normal weitergeführt werden' },
        { id: 'C', text: 'Metformin erhöht direkt die Nephrotoxizität des Kontrastmittels' },
        { id: 'D', text: 'Bei Dialysepatienten ist Metformin unbedenklich weiterzuführen' },
      ],
      correct: 'B',
      explanation: 'Bei normaler oder gering eingeschränkter Nierenfunktion (eGFR > 30 ml/min/1,73 m²) ist kein Absetzen von Metformin erforderlich. Das Risiko der Laktatazidose entsteht nicht durch eine direkte Interaktion mit dem KM, sondern indirekt: KM kann (selten) eine akute Nierenschädigung auslösen → Metformin akkumuliert → Laktatazidose. Bei eGFR < 30 ml/min/1,73 m² oder akutem Nierenversagen sollte Metformin für 48 h pausiert werden. Wichtig: Bei eGFR < 30 ist Metformin ohnehin bereits kontraindiziert.',
    },
  ],
  en: [
    {
      id: 1,
      question: 'Which statement about non-ionic contrast media (e.g. Ultravist®) is correct?',
      options: [
        { id: 'A', text: 'Higher osmolality than ionic contrast media' },
        { id: 'B', text: 'Approved only for enteral use' },
        { id: 'C', text: 'Lower osmolality and better tolerated' },
        { id: 'D', text: 'Carry a negative charge' },
      ],
      correct: 'C',
      explanation: 'Non-ionic contrast media carry no electrical charge and are therefore more hydrophilic than ionic agents. Their lower osmolality (iso- to slightly hyperosmolar compared to blood) results in significantly better tolerability and a lower rate of adverse reactions. This makes them the standard for all intravascular applications — including CT angiography, intravenous and intra-arterial administration.',
    },
    {
      id: 2,
      question: 'For which indication is a high injection rate of 5 ml/s recommended?',
      options: [
        { id: 'A', text: 'Pure portal venous abdominal phase' },
        { id: 'B', text: 'Exclusion of pulmonary embolism (CTPA)' },
        { id: 'C', text: 'Non-contrast head CT' },
        { id: 'D', text: 'Contrast injection via a central venous catheter (CVC)' },
      ],
      correct: 'B',
      explanation: 'In CT pulmonary angiography (CTPA), a high injection rate of 5 ml/s is essential to achieve sufficient contrast concentration in the pulmonary artery and reliably detect even small filling defects. High rates are also useful in CT angiography of hypervascular lesions. Injection via a CVC must not exceed 2.5 ml/s to prevent catheter damage.',
    },
    {
      id: 3,
      question: 'How does the ESUR define PC-AKI (Post-Contrast Acute Kidney Injury)?',
      options: [
        { id: 'A', text: 'Creatinine rise ≥ 0.3 mg/dl or ≥ 1.5-fold within 48–72 h after contrast administration' },
        { id: 'B', text: '10% GFR drop after 7 days' },
        { id: 'C', text: 'Anuria within 6 h after contrast injection' },
        { id: 'D', text: 'Doubling of urea within 24 h' },
      ],
      correct: 'A',
      explanation: 'The ESUR definition of PC-AKI: an absolute rise in serum creatinine of ≥ 0.3 mg/dl OR a relative rise to ≥ 1.5 times the baseline value, both within 48–72 hours after intravascular contrast administration. Importantly, the renaming from CIN to PC-AKI reflects the lack of a causal relationship — acute kidney injury occurs with similar frequency after contrast-enhanced and non-contrast CT scans.',
    },
    {
      id: 4,
      question: 'Which statement about the so-called "iodine allergy" is correct?',
      options: [
        { id: 'A', text: 'It is IgE-mediated against elemental iodine' },
        { id: 'B', text: 'It does not exist — iodine as a small molecule is not allergenic' },
        { id: 'C', text: 'It always requires epinephrine prophylaxis before contrast administration' },
        { id: 'D', text: 'It only occurs with macrocyclic gadolinium agents' },
      ],
      correct: 'B',
      explanation: '"Iodine allergy" is not a medically accurate term. Iodine is a small inorganic molecule without hapten properties and is therefore not allergenic. Allergic or pseudo-allergic reactions are always directed against other components of the contrast molecule (e.g. the organic carrier structure). Routine epinephrine prophylaxis is not indicated — however, if a prior reaction is documented, switching to a different agent or using a contrast-free alternative should be considered.',
    },
    {
      id: 5,
      question: 'Which gadolinium agent is the only hepatocyte-specific contrast medium and is given at a reduced dose?',
      options: [
        { id: 'A', text: 'Gadovist® (gadobutrol)' },
        { id: 'B', text: 'Dotarem® (gadoterate)' },
        { id: 'C', text: 'Primovist® (gadoxetate)' },
        { id: 'D', text: 'Gastrografin® (diatrizoate)' },
      ],
      correct: 'C',
      explanation: 'Primovist® (gadoxetate disodium) is the only MRI contrast agent with genuine hepatocyte-specific uptake (~50% of the dose). It is actively taken up by functioning hepatocytes via OATP1B1/3 transporters and excreted biliary. This creates a hepatobiliary phase (after ~20 min) in which non-hepatocytic lesions (metastases, cysts) appear hypointense. The dose is only 0.025 mmol/kg — one quarter of the standard gadolinium dose.',
    },
    {
      id: 6,
      question: 'What must be done after the birth of a child whose mother received iodinated contrast media during pregnancy?',
      options: [
        { id: 'A', text: 'Check the newborn\'s TSH level' },
        { id: 'B', text: 'General breastfeeding ban for at least 2 weeks' },
        { id: 'C', text: 'Whole-body MRI of the newborn to assess contrast distribution' },
        { id: 'D', text: 'Immediate prophylactic L-thyroxine administration to the infant' },
      ],
      correct: 'A',
      explanation: 'Iodinated contrast media cross the placenta. From gestational week 10–12 onwards, the fetal thyroid can actively take up iodine, and unlike adults, the fetus cannot compensate via the Wolff-Chaikoff "escape mechanism." This can cause transient neonatal hypothyroidism. Checking thyroid function (TSH) in the newborn is therefore mandatory to detect and treat hypothyroidism early and prevent developmental delays.',
    },
    {
      id: 7,
      question: 'What recommendation applies to breastfeeding after gadolinium administration to the mother?',
      options: [
        { id: 'A', text: 'Breastfeeding only permitted after giving activated charcoal to the infant' },
        { id: 'B', text: 'A breastfeeding pause is medically not necessary' },
        { id: 'C', text: 'Pump and discard the first feed after 12 hours' },
        { id: 'D', text: 'Mandatory 48-hour breastfeeding pause for safety' },
      ],
      correct: 'B',
      explanation: 'Less than 0.04% of the maternal gadolinium dose is excreted into breast milk. Of this already minimal amount, only a very small fraction (<1%) is actually absorbed orally by the infant. The clinical relevance is therefore negligible. Current guidelines (ESUR, ACR) find no medical necessity for a breastfeeding pause. If the mother is nonetheless concerned, she may choose to pause for 24 hours and discard the milk — this is her personal right.',
    },
    {
      id: 8,
      question: 'What is the primary prerequisite for the use of contrast media during pregnancy?',
      options: [
        { id: 'A', text: 'Strict indication and absence of equally diagnostic contrast-free alternatives' },
        { id: 'B', text: 'The examination must be performed under general anesthesia only' },
        { id: 'C', text: 'A negative skin test to contrast components in the mother' },
        { id: 'D', text: 'Written consent of the attending obstetrician' },
      ],
      correct: 'A',
      explanation: 'The fundamental principle is: contrast media in pregnancy only when (1) the examination is medically urgent AND cannot be deferred, AND (2) no diagnostically equivalent contrast-free method is available. Both conditions must be met simultaneously. In addition, detailed informed consent about risks and benefits, and thorough documentation, are mandatory. A negative allergy test or the obstetrician\'s consent alone is not sufficient.',
    },
    {
      id: 9,
      question: 'Which statement about metformin therapy and intravascular contrast media is correct?',
      options: [
        { id: 'A', text: 'Metformin must be stopped 48 h before the examination in all patients' },
        { id: 'B', text: 'With eGFR > 30 ml/min/1.73 m², metformin can be continued normally' },
        { id: 'C', text: 'Metformin directly increases the nephrotoxicity of contrast media' },
        { id: 'D', text: 'In dialysis patients, metformin can be continued safely' },
      ],
      correct: 'B',
      explanation: 'With normal or mildly impaired renal function (eGFR > 30 ml/min/1.73 m²), stopping metformin is not required. The risk of lactic acidosis does not arise from a direct interaction with contrast media, but indirectly: contrast (rarely) can cause acute kidney injury → metformin accumulates → lactic acidosis. With eGFR < 30 ml/min/1.73 m² or acute kidney injury, metformin should be withheld for 48 hours. Important: at eGFR < 30, metformin is already contraindicated anyway.',
    },
  ],
  fa: [
    {
      id: 1,
      question: 'کدام گزینه درباره ماده حاجب غیر یونی (مثلاً Ultravist®) صحیح است؟',
      options: [
        { id: 'A', text: 'اسمولاریته بالاتر نسبت به ماده حاجب یونی' },
        { id: 'B', text: 'فقط برای مصرف روده‌ای مجاز است' },
        { id: 'C', text: 'اسمولاریته پایین‌تر و تحمل‌پذیری بهتر' },
        { id: 'D', text: 'دارای بار منفی است' },
      ],
      correct: 'C',
      explanation: 'مواد حاجب غیر یونی هیچ بار الکتریکی ندارند و بنابراین آبدوست‌تر از مواد یونی هستند. اسمولاریته پایین‌تر آن‌ها (ایزو تا کمی هایپراسمولار نسبت به خون) منجر به تحمل‌پذیری بسیار بهتر و عوارض جانبی کمتر می‌شود. به همین دلیل استاندارد طلایی برای تمام کاربردهای داخل عروقی هستند.',
    },
    {
      id: 2,
      question: 'برای کدام اندیکاسیون سرعت تزریق بالای ۵ میلی‌لیتر در ثانیه توصیه می‌شود؟',
      options: [
        { id: 'A', text: 'فاز وریدی پورتال شکم' },
        { id: 'B', text: 'رد آمبولی ریوی (CTPA)' },
        { id: 'C', text: 'سی‌تی اسکن سر بدون ماده حاجب' },
        { id: 'D', text: 'تزریق ماده حاجب از طریق کاتتر وریدی مرکزی' },
      ],
      correct: 'B',
      explanation: 'در CT آنژیوگرافی ریوی (CTPA)، سرعت تزریق ۵ میلی‌لیتر در ثانیه برای دستیابی به غلظت کافی ماده حاجب در شریان ریوی ضروری است تا حتی کوچکترین نقص پُرشدگی قابل تشخیص باشد. تزریق از طریق CVC نباید از ۲.۵ میلی‌لیتر در ثانیه تجاوز کند.',
    },
    {
      id: 3,
      question: 'ESUR آسیب حاد کلیه پس از ماده حاجب (PC-AKI) را چگونه تعریف می‌کند؟',
      options: [
        { id: 'A', text: 'افزایش کراتینین ≥۰.۳ میلی‌گرم/دسی‌لیتر یا ≥۱.۵ برابر در طی ۴۸–۷۲ ساعت' },
        { id: 'B', text: 'کاهش ۱۰٪ GFR بعد از ۷ روز' },
        { id: 'C', text: 'آنوری در طی ۶ ساعت پس از تزریق' },
        { id: 'D', text: 'دو برابر شدن اوره خون در ۲۴ ساعت' },
      ],
      correct: 'A',
      explanation: 'تعریف ESUR از PC-AKI: افزایش مطلق کراتینین سرم ≥۰.۳ میلی‌گرم/دسی‌لیتر یا افزایش نسبی به ≥۱.۵ برابر مقدار پایه، هر دو در طی ۴۸–۷۲ ساعت پس از تزریق داخل عروقی ماده حاجب. تغییر نام از CIN به PC-AKI نشان‌دهنده فقدان رابطه علّی اثبات‌شده است.',
    },
    {
      id: 4,
      question: 'کدام گزینه درباره «آلرژی به ید» صحیح است؟',
      options: [
        { id: 'A', text: 'واکنش IgE-واسطه در برابر ید عنصری است' },
        { id: 'B', text: 'وجود ندارد – ید به عنوان مولکول کوچک آلرژن نیست' },
        { id: 'C', text: 'همیشه نیاز به پروفیلاکسی با آدرنالین دارد' },
        { id: 'D', text: 'فقط با مواد حاجب گادولینیوم ماکروسیکلیک رخ می‌دهد' },
      ],
      correct: 'B',
      explanation: '«آلرژی به ید» اصطلاح پزشکی صحیحی نیست. ید یک مولکول کوچک معدنی بدون خواص هاپتنی است و بنابراین آلرژن نمی‌باشد. واکنش‌های آلرژیک یا شبه‌آلرژیک همیشه علیه سایر اجزای مولکول ماده حاجب هستند. پروفیلاکسی با آدرنالین به صورت روتین اندیکاسیون ندارد.',
    },
    {
      id: 5,
      question: 'کدام ماده حاجب گادولینیوم تنها ماده اختصاصی هپاتوسیت‌ها است و با دوز کمتری داده می‌شود؟',
      options: [
        { id: 'A', text: 'Gadovist® (گادوبوترول)' },
        { id: 'B', text: 'Dotarem® (گادوتِرات)' },
        { id: 'C', text: 'Primovist® (گادوکستات)' },
        { id: 'D', text: 'Gastrografin® (دیاتریزوات)' },
      ],
      correct: 'C',
      explanation: 'Primovist® (گادوکستات دی‌سدیم) تنها ماده حاجب MRI با جذب واقعی هپاتوسیت‌های عملکردی (~۵۰٪ دوز) است. از طریق ترانسپورترهای OATP1B1/3 جذب می‌شود و بیلیاری دفع می‌شود. این ویژگی در فاز هپاتوبیلیاری (بعد از حدود ۲۰ دقیقه) ضایعات غیر هپاتوسیتی را هایپواینتنس نشان می‌دهد. دوز فقط ۰.۰۲۵ میلی‌مول/کیلوگرم – یک چهارم دوز استاندارد گادولینیوم – است.',
    },
    {
      id: 6,
      question: 'پس از تولد نوزادی که مادرش در دوران بارداری ماده حاجب حاوی ید دریافت کرده، چه اقدامی ضروری است؟',
      options: [
        { id: 'A', text: 'بررسی سطح TSH نوزاد' },
        { id: 'B', text: 'ممنوعیت کلی شیردهی به مدت حداقل ۲ هفته' },
        { id: 'C', text: 'MRI کل بدن نوزاد برای بررسی توزیع ماده حاجب' },
        { id: 'D', text: 'تجویز فوری L-تیروکسین پروفیلاکتیک به نوزاد' },
      ],
      correct: 'A',
      explanation: 'مواد حاجب حاوی ید از جفت عبور می‌کنند. از هفته ۱۰–۱۲ بارداری، تیروئید جنین می‌تواند ید را به طور فعال جذب کند و برخلاف بزرگسالان، جنین فاقد مکانیسم «escape» اثر Wolff-Chaikoff است. این می‌تواند منجر به کم‌کاری گذرا تیروئید نوزادی شود. بنابراین بررسی عملکرد تیروئید (TSH) در نوزاد اجباری است.',
    },
    {
      id: 7,
      question: 'توصیه در مورد شیردهی پس از تزریق گادولینیوم به مادر چیست؟',
      options: [
        { id: 'A', text: 'شیردهی فقط پس از دادن زغال فعال به نوزاد مجاز است' },
        { id: 'B', text: 'از نظر پزشکی نیازی به قطع شیردهی نیست' },
        { id: 'C', text: 'پمپ کردن و دور ریختن اولین شیردهی بعد از ۱۲ ساعت' },
        { id: 'D', text: 'توقف اجباری شیردهی به مدت ۴۸ ساعت برای ایمنی' },
      ],
      correct: 'B',
      explanation: 'کمتر از ۰.۰۴٪ دوز مادری گادولینیوم در شیر مادر دفع می‌شود. از این مقدار بسیار کم، کمتر از ۱٪ توسط نوزاد از طریق دهانی جذب می‌شود. اهمیت بالینی این مقدار کاملاً قابل چشم‌پوشی است. دستورالعمل‌های کنونی (ESUR، ACR) هیچ ضرورت پزشکی برای قطع شیردهی نمی‌بینند.',
    },
    {
      id: 8,
      question: 'پیش‌نیاز اصلی برای استفاده از ماده حاجب در دوران بارداری چیست؟',
      options: [
        { id: 'A', text: 'اندیکاسیون قوی و نبود روش‌های تشخیصی معادل بدون ماده حاجب' },
        { id: 'B', text: 'انجام بررسی فقط تحت بیهوشی عمومی' },
        { id: 'C', text: 'تست پوستی منفی مادر برای اجزای ماده حاجب' },
        { id: 'D', text: 'رضایت کتبی متخصص زنان و زایمان' },
      ],
      correct: 'A',
      explanation: 'اصل بنیادی: ماده حاجب در بارداری فقط زمانی که (۱) بررسی پزشکی فوری و غیرقابل تعویق باشد و (۲) هیچ روش تشخیصی معادل بدون ماده حاجب وجود نداشته باشد. هر دو شرط باید همزمان برقرار باشند. اطلاع‌رسانی دقیق به بیمار و مستندسازی کامل نیز الزامی است.',
    },
    {
      id: 9,
      question: 'کدام گزینه درباره درمان با متفورمین و تزریق داخل عروقی ماده حاجب صحیح است؟',
      options: [
        { id: 'A', text: 'متفورمین در تمام بیماران ۴۸ ساعت قبل از بررسی باید قطع شود' },
        { id: 'B', text: 'با eGFR > ۳۰ میلی‌لیتر/دقیقه/۱.۷۳ مترمربع متفورمین می‌تواند ادامه یابد' },
        { id: 'C', text: 'متفورمین مستقیماً سمیت کلیوی ماده حاجب را افزایش می‌دهد' },
        { id: 'D', text: 'در بیماران دیالیزی متفورمین بدون خطر ادامه می‌یابد' },
      ],
      correct: 'B',
      explanation: 'با عملکرد کلیوی طبیعی یا خفیف مختل (eGFR > ۳۰ میلی‌لیتر/دقیقه/۱.۷۳ مترمربع)، قطع متفورمین لازم نیست. خطر اسیدوز لاکتیک از تعامل مستقیم با ماده حاجب نیست بلکه غیرمستقیم است: ماده حاجب (به ندرت) می‌تواند آسیب حاد کلیوی ایجاد کند → تجمع متفورمین → اسیدوز لاکتیک. با eGFR < ۳۰ یا نارسایی حاد کلیوی، متفورمین باید ۴۸ ساعت قطع شود.',
    },
  ],
}

const GRADE_DATA = {
  de: [
    { min: 9, label: 'Ausgezeichnet!', sub: 'Perfekte Punktzahl – Kontrastmittelwissen auf höchstem Niveau.', emoji: '🏆', color: '#059669' },
    { min: 7, label: 'Sehr gut!', sub: 'Solides Wissen mit nur kleinen Lücken.', emoji: '🎯', color: '#0ea5e9' },
    { min: 5, label: 'Gut gemacht', sub: 'Grundlagen sitzen – einige Bereiche noch vertiefen.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'Weiter üben', sub: 'Nochmal die Lernseite durcharbeiten und erneut testen.', emoji: '💪', color: '#ef4444' },
  ],
  en: [
    { min: 9, label: 'Excellent!', sub: 'Perfect score – contrast media knowledge at the highest level.', emoji: '🏆', color: '#059669' },
    { min: 7, label: 'Very good!', sub: 'Solid knowledge with only minor gaps.', emoji: '🎯', color: '#0ea5e9' },
    { min: 5, label: 'Well done', sub: 'Core knowledge solid – deepen a few areas further.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'Keep practicing', sub: 'Review the learning section and try again.', emoji: '💪', color: '#ef4444' },
  ],
  fa: [
    { min: 9, label: 'عالی!', sub: 'نمره کامل – دانش مواد حاجب در بالاترین سطح.', emoji: '🏆', color: '#059669' },
    { min: 7, label: 'خیلی خوب!', sub: 'دانش محکم با تنها چند نقطه ضعف جزئی.', emoji: '🎯', color: '#0ea5e9' },
    { min: 5, label: 'خوب بود', sub: 'پایه‌ها محکم است – چند حوزه را عمیق‌تر مطالعه کنید.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'ادامه تمرین', sub: 'صفحه آموزشی را مرور کنید و دوباره امتحان دهید.', emoji: '💪', color: '#ef4444' },
  ],
}

const UI = {
  de: {
    breadTopic: 'Kontrastmittel',
    breadSection: 'Technik & Physik',
    title: 'MCQ · Kontrastmittel',
    subtitle: '9 Prüfungsfragen · Klinisch relevant',
    questionOf: (c, t) => `Frage ${c} von ${t}`,
    checkBtn: 'Antwort prüfen',
    nextBtn: 'Nächste Frage',
    resultBtn: 'Ergebnis anzeigen',
    restartBtn: 'Nochmal starten',
    learnBtn: '← Zur Lernseite',
    resultTitle: 'Dein Ergebnis',
    correct: 'Richtig!',
    incorrect: 'Leider falsch',
    correctAnswer: 'Richtige Antwort:',
    explanation: 'Erklärung',
    scoreLabel: (s, t) => `${s} von ${t} Fragen richtig`,
    summaryTitle: 'Zusammenfassung',
    wrongOnly: 'Nur falsche Fragen',
    allQ: 'Alle Fragen',
    correctTag: '✓ Richtig',
    wrongTag: '✗ Falsch',
    yourAnswer: 'Deine Antwort:',
    rightAnswer: 'Richtige Antwort:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
  en: {
    breadTopic: 'Contrast Media',
    breadSection: 'Physics & Technology',
    title: 'MCQ · Contrast Media',
    subtitle: '9 Exam Questions · Clinically Relevant',
    questionOf: (c, t) => `Question ${c} of ${t}`,
    checkBtn: 'Check Answer',
    nextBtn: 'Next Question',
    resultBtn: 'Show Results',
    restartBtn: 'Restart',
    learnBtn: '← Back to Learning',
    resultTitle: 'Your Score',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    correctAnswer: 'Correct answer:',
    explanation: 'Explanation',
    scoreLabel: (s, t) => `${s} out of ${t} correct`,
    summaryTitle: 'Summary',
    wrongOnly: 'Wrong only',
    allQ: 'All questions',
    correctTag: '✓ Correct',
    wrongTag: '✗ Wrong',
    yourAnswer: 'Your answer:',
    rightAnswer: 'Correct answer:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
  fa: {
    breadTopic: 'ماده حاجب',
    breadSection: 'تکنیک و فیزیک',
    title: 'MCQ · ماده حاجب',
    subtitle: '۹ سوال امتحانی · مرتبط با کلینیک',
    questionOf: (c, t) => `سوال ${c} از ${t}`,
    checkBtn: 'بررسی پاسخ',
    nextBtn: 'سوال بعدی',
    resultBtn: 'نمایش نتیجه',
    restartBtn: 'شروع مجدد',
    learnBtn: '← به صفحه آموزش',
    resultTitle: 'نتیجه شما',
    correct: 'درست!',
    incorrect: 'متأسفانه اشتباه',
    correctAnswer: 'پاسخ صحیح:',
    explanation: 'توضیح',
    scoreLabel: (s, t) => `${s} از ${t} سوال درست`,
    summaryTitle: 'خلاصه',
    wrongOnly: 'فقط اشتباه‌ها',
    allQ: 'همه سوالات',
    correctTag: '✓ درست',
    wrongTag: '✗ اشتباه',
    yourAnswer: 'پاسخ شما:',
    rightAnswer: 'پاسخ صحیح:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
}

function getGrade(score, lang) {
  const grades = GRADE_DATA[lang] || GRADE_DATA.de
  return grades.find(g => score >= g.min) || grades[grades.length - 1]
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function KontrastmittelMCQ() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const questions = QUESTIONS[lang] || QUESTIONS.de

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([]) // { qId, selected, correct }
  const [phase, setPhase] = useState('quiz') // 'quiz' | 'result'
  const [summaryFilter, setSummaryFilter] = useState('all')

  const q = questions[current]
  const total = questions.length
  const isLast = current === total - 1

  const handleCheck = () => {
    if (!selected) return
    setChecked(true)
    setAnswers(prev => [
      ...prev.filter(a => a.qId !== q.id),
      { qId: q.id, selected, correct: selected === q.correct },
    ])
  }

  const handleNext = () => {
    if (isLast) {
      setPhase('result')
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setChecked(false)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setChecked(false)
    setAnswers([])
    setPhase('quiz')
    setSummaryFilter('all')
  }

  const score = answers.filter(a => a.correct).length
  const grade = getGrade(score, lang)

  const progressPct = ((current + (checked ? 1 : 0)) / total) * 100

  // ── RESULT PHASE ──────────────────────────────
  if (phase === 'result') {
    const filtered = summaryFilter === 'wrong'
      ? questions.filter(q => answers.find(a => a.qId === q.id && !a.correct))
      : questions

    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadLink}>RadYar</Link>
            <span className={styles.sep}>›</span>
            <Link href="/#fachgebiete" className={styles.breadLink}>{ui.breadSection}</Link>
            <span className={styles.sep}>›</span>
            <Link href="/technik/kontrastmittel" className={styles.breadLink}>{ui.breadTopic}</Link>
            <span className={styles.sep}>›</span>
            <span className={styles.breadCurrent}>MCQ</span>
          </div>
          <h1 className={styles.pageTitle}>{ui.title}</h1>
        </div>

        <div className={styles.resultWrap}>
          {/* Score card */}
          <div className={styles.scoreCard} style={{ borderColor: grade.color }}>
            <div className={styles.scoreEmoji}>{grade.emoji}</div>
            <div className={styles.scoreNumber} style={{ color: grade.color }}>
              {score}<span className={styles.scoreTotal}>/{total}</span>
            </div>
            <div className={styles.gradeLabel} style={{ color: grade.color }}>{grade.label}</div>
            <div className={styles.gradeSub}>{grade.sub}</div>
            <div className={styles.scoreBarWrap}>
              <div className={styles.scoreBar} style={{ width: `${(score / total) * 100}%`, background: grade.color }} />
            </div>
            <p className={styles.scoreDesc}>{ui.scoreLabel(score, total)}</p>
          </div>

          {/* Summary */}
          <div className={styles.summaryWrap}>
            <div className={styles.summaryHeader}>
              <span className={styles.summaryTitle}>{ui.summaryTitle}</span>
              <div className={styles.filterBtns}>
                <button className={`${styles.filterBtn} ${summaryFilter === 'all' ? styles.filterActive : ''}`}
                  onClick={() => setSummaryFilter('all')}>{ui.allQ}</button>
                <button className={`${styles.filterBtn} ${summaryFilter === 'wrong' ? styles.filterActiveWrong : ''}`}
                  onClick={() => setSummaryFilter('wrong')}>{ui.wrongOnly}</button>
              </div>
            </div>

            <div className={styles.summaryList}>
              {filtered.map((sq, idx) => {
                const ans = answers.find(a => a.qId === sq.id)
                const isCorrect = ans?.correct
                const correctOpt = sq.options.find(o => o.id === sq.correct)
                const selectedOpt = sq.options.find(o => o.id === ans?.selected)
                return (
                  <div key={sq.id} className={`${styles.summaryItem} ${isCorrect ? styles.summaryCorrect : styles.summaryWrong}`}>
                    <div className={styles.summaryItemHead}>
                      <span className={`${styles.summaryTag} ${isCorrect ? styles.tagCorrect : styles.tagWrong}`}>
                        {isCorrect ? ui.correctTag : ui.wrongTag}
                      </span>
                      <span className={styles.summaryQ}>{idx + 1}. {sq.question}</span>
                    </div>
                    {!isCorrect && (
                      <div className={styles.summaryAnswers}>
                        <span className={styles.yourAns}>{ui.yourAnswer} <strong>{ans?.selected}) {selectedOpt?.text}</strong></span>
                        <span className={styles.rightAns}>{ui.rightAnswer} <strong>{sq.correct}) {correctOpt?.text}</strong></span>
                      </div>
                    )}
                    <div className={styles.summaryExp}>{sq.explanation}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className={styles.resultActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>{ui.restartBtn}</button>
            <Link href="/technik/kontrastmittel" className={styles.learnBtn}>{ui.learnBtn}</Link>
          </div>
        </div>
      </div>
    )
  }

  // ── QUIZ PHASE ────────────────────────────────
  const isCorrect = checked && selected === q.correct
  const isWrong = checked && selected !== q.correct
  const correctOpt = q.options.find(o => o.id === q.correct)

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <Link href="/#fachgebiete" className={styles.breadLink}>{ui.breadSection}</Link>
          <span className={styles.sep}>›</span>
          <Link href="/technik/kontrastmittel" className={styles.breadLink}>{ui.breadTopic}</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>MCQ</span>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>{ui.title}</h1>
          <span className={styles.subtitle}>{ui.subtitle}</span>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
          <span className={styles.progressLabel}>{ui.progressLabel(current + 1, total)}</span>
        </div>
      </div>

      {/* Main quiz body */}
      <div className={styles.quizBody}>
        <div className={styles.quizCard}>

          {/* Question number */}
          <div className={styles.qNum}>{ui.questionOf(current + 1, total)}</div>

          {/* Question text */}
          <div className={styles.qText}>{q.question}</div>

          {/* Options */}
          <div className={styles.options}>
            {q.options.map(opt => {
              let cls = styles.option
              if (selected === opt.id && !checked) cls = `${styles.option} ${styles.optSelected}`
              if (checked && opt.id === q.correct) cls = `${styles.option} ${styles.optCorrect}`
              if (checked && selected === opt.id && opt.id !== q.correct) cls = `${styles.option} ${styles.optWrong}`
              return (
                <button
                  key={opt.id}
                  className={cls}
                  disabled={checked}
                  onClick={() => setSelected(opt.id)}
                >
                  <span className={styles.optLetter}>{opt.id}</span>
                  <span className={styles.optText}>{opt.text}</span>
                  {checked && opt.id === q.correct && <span className={styles.optIcon}>✓</span>}
                  {checked && selected === opt.id && opt.id !== q.correct && <span className={styles.optIcon}>✗</span>}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {checked && (
            <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
              <div className={styles.feedbackHead}>
                <span className={styles.feedbackIcon}>{isCorrect ? '✅' : '❌'}</span>
                <span className={styles.feedbackTitle}>
                  {isCorrect ? ui.correct : ui.incorrect}
                  {isWrong && <span className={styles.feedbackCorrectAns}> – {ui.correctAnswer} <strong>{q.correct}) {correctOpt?.text}</strong></span>}
                </span>
              </div>
              <div className={styles.feedbackExpLabel}>{ui.explanation}</div>
              <div className={styles.feedbackExp}>{q.explanation}</div>
            </div>
          )}

          {/* Action button */}
          <div className={styles.actionRow}>
            {!checked ? (
              <button
                className={`${styles.checkBtn} ${!selected ? styles.checkBtnDisabled : ''}`}
                onClick={handleCheck}
                disabled={!selected}
              >
                {ui.checkBtn}
              </button>
            ) : (
              <button className={styles.nextBtn} onClick={handleNext}>
                {isLast ? ui.resultBtn : ui.nextBtn}
                <span>→</span>
              </button>
            )}
          </div>
        </div>

        {/* Side: score tracker */}
        <div className={styles.tracker}>
          <div className={styles.trackerTitle}>Score</div>
          <div className={styles.trackerDots}>
            {questions.map((_, i) => {
              const ans = answers.find(a => a.qId === questions[i].id)
              let dotCls = styles.trackerDot
              if (i === current) dotCls = `${styles.trackerDot} ${styles.dotCurrent}`
              else if (ans?.correct) dotCls = `${styles.trackerDot} ${styles.dotCorrect}`
              else if (ans && !ans.correct) dotCls = `${styles.trackerDot} ${styles.dotWrong}`
              return <div key={i} className={dotCls}>{i + 1}</div>
            })}
          </div>
          <div className={styles.trackerScore}>
            <span className={styles.trackerScoreNum} style={{ color: '#10b981' }}>{answers.filter(a => a.correct).length}</span>
            <span className={styles.trackerScoreSep}>/</span>
            <span className={styles.trackerScoreNum} style={{ color: '#ef4444' }}>{answers.filter(a => !a.correct).length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
