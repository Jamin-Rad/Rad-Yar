export const L=(de,en,fa)=>({de,en,fa})
export const pick=(value,lang)=>value?.[lang]??value?.de??value
export const COPY={title:L('Verkalkungen in der Mammographie','Calcifications on Mammography','کلسیفیکاسیون‌ها در ماموگرافی'),contents:L('Lektionsinhalt','Lesson contents','محتوای درس'),flashcards:L('Flashcards','Flashcards','فلش‌کارت‌ها'),mamma:L('Mamma','Breast','پستان'),imaging:L('Bildgebung & BI-RADS','Imaging & BI-RADS','تصویربرداری و BI-RADS'),mammography:L('Mammographie','Mammography','ماموگرافی'),status:L('In Bearbeitung','In progress','در حال تکمیل')}
export const SECTIONS=[['grundlagen','Grundlagen','Fundamentals','مبانی'],['technik','Technische Beurteilung','Technical assessment','ارزیابی فنی'],['benigne','Typisch benigne Formen','Typically benign forms','اشکال تیپیک خوش‌خیم'],['morphologie','Suspekte Morphologie','Suspicious morphology','مورفولوژی مشکوک'],['verteilung','Verteilung','Distribution','توزیع'],['kombination','Morphologie × Verteilung','Morphology × distribution','مورفولوژی × توزیع'],['kontext','Verlauf, Ausdehnung & Kontext','Evolution, extent & context','روند، وسعت و زمینه'],['modalitaeten','DCIS, Ultraschall & MRT','DCIS, ultrasound & MRI','DCIS، سونوگرافی و MRI'],['algorithmus','Algorithmus & Take Home','Algorithm & take home','الگوریتم و نکات کلیدی']].map(([id,de,en,fa],i)=>({id,label:L(de,en,fa),number:String(i+1).padStart(2,'0')}))
export const BENIGN=[
  ['Popcorn',L('Grobschollig','Coarse or popcorn-like','درشت یا پاپ‌کورنی'),L('Involutiertes Fibroadenom, Fettnekrose, dystrophe Veränderung','Involuting fibroadenoma, fat necrosis, dystrophic change','فیبروآدنوم اینولوتیو، نکروز چربی، تغییرات دیستروفیک')],
  ['Rod',L('Large rod-like','Large rod-like','میله‌ای بزرگ'),L('Grobe glatte Gang- oder Gangwandverkalkungen','Coarse smooth ductal or periductal calcifications','کلسیفیکاسیون درشت و صاف داخل یا اطراف مجرا')],
  ['Round',L('Rund / punktförmig','Round / punctate','گرد / نقطه‌ای'),L('Diffus meist benign; gruppiert nur im Gesamtkontext bewerten','Diffuse is usually benign; grouped requires context','منتشر معمولاً خوش‌خیم؛ گروهی نیازمند ارزیابی زمینه')],
  ['Rim',L('Rim calcifications','Rim calcifications','کلسیفیکاسیون حاشیه‌ای'),L('Dünn randständig, typisch bei Ölzyste oder Fettnekrose','Thin peripheral calcification, typical of oil cyst or fat necrosis','حاشیه‌ای نازک، تیپیک در کیست روغنی یا نکروز چربی')],
  ['Teacup',L('Milk of calcium','Milk of calcium','شیر کلسیم'),L('Sediment in Zysten; Teacup-Zeichen in geeigneter Projektion','Dependent cyst sediment; teacup sign on the appropriate view','رسوب وابسته در کیست؛ علامت فنجان چای در نمای مناسب')],
  ['Suture',L('Nahtverkalkungen','Suture calcifications','کلسیفیکاسیون بخیه'),L('Linear oder kurvilinear entlang postoperativen Nahtmaterials','Linear or curvilinear along postoperative suture material','خطی یا منحنی در امتداد بخیه پس از عمل')],
]
export const MORPH=[
  {key:'round',title:L('Rund','Round','گرد'),risk:L('niedrig','low','پایین'),text:L('Glatt konturiert; diffus typischerweise benign.','Smoothly marginated; diffuse distribution is typically benign.','حاشیه صاف؛ در توزیع منتشر معمولاً خوش‌خیم.')},
  {key:'amorph',title:L('Amorph','Amorphous','آمورف'),risk:L('niedrig–moderat','low–moderate','پایین–متوسط'),text:L('Sehr klein und unscharf definiert; Verteilung besonders wichtig.','Very small and indistinctly defined; distribution is especially important.','بسیار کوچک و نامشخص؛ توزیع اهمیت ویژه دارد.')},
  {key:'coarse',title:L('Grob heterogen','Coarse heterogeneous','درشت ناهمگون'),risk:L('moderat','moderate','متوسط'),text:L('Irregulär, größer als amorph, aber kleiner als grobschollig.','Irregular, larger than amorphous but smaller than coarse benign calcifications.','نامنظم، بزرگ‌تر از آمورف و کوچک‌تر از کلسیفیکاسیون درشت خوش‌خیم.')},
  {key:'pleomorphic',title:L('Fein pleomorph','Fine pleomorphic','ظریف پلئومورفیک'),risk:L('moderat–hoch','moderate–high','متوسط–بالا'),text:L('Feine Partikel unterschiedlicher Form und Größe.','Fine particles with varying shapes and sizes.','ذرات ظریف با شکل و اندازه متفاوت.')},
  {key:'linear',title:L('Fein linear / verzweigt','Fine linear / branching','ظریف خطی / شاخه‌دار'),risk:L('hoch','high','بالا'),text:L('Fein, irregulär und gangähnlich; höchste Suspektheit.','Fine, irregular and duct-like; highest suspicion.','ظریف، نامنظم و شبیه مجرا؛ بیشترین میزان شک.')},
]
export const DISTRIBUTION=[
  {key:'diffuse',title:L('Diffus','Diffuse','منتشر'),text:L('Weit über die Brust verteilt, häufig bilateral.','Widely distributed, often bilateral.','در بخش وسیعی از پستان، اغلب دوطرفه.')},
  {key:'regional',title:L('Regional','Regional','ناحیه‌ای'),text:L('Größeres Areal ohne eindeutige Orientierung an einem Gangsystem.','Larger area without clear ductal orientation.','ناحیه بزرگ‌تر بدون جهت‌گیری مشخص مجرایی.')},
  {key:'grouped',title:L('Gruppiert','Grouped','گروهی'),text:L('Konzentriert in einem begrenzten Areal; Morphologie entscheidet.','Concentrated in a limited area; morphology determines risk.','متمرکز در ناحیه محدود؛ مورفولوژی خطر را تعیین می‌کند.')},
  {key:'linear',title:L('Linear','Linear','خطی'),text:L('Entlang einer Linie, möglicherweise intraduktal.','Arranged along a line, potentially intraductal.','در امتداد یک خط، احتمالاً داخل مجرا.')},
  {key:'segmental',title:L('Segmental','Segmental','سگمنتال'),text:L('Gangsystem mit Verzweigungen; oft keilförmig zur Mamille.','A ductal system and branches, often wedge-shaped toward the nipple.','سیستم مجرایی و شاخه‌ها، اغلب گوه‌ای به‌سوی نوک پستان.')},
]
export const COMBINATIONS=[
  [L('Amorph','Amorphous','آمورف'),L('diffus / bilateral','diffuse / bilateral','منتشر / دوطرفه'),L('eher niedriges Risiko','lower risk','خطر کمتر'),'low'],
  [L('Amorph','Amorphous','آمورف'),L('gruppiert / segmental','grouped / segmental','گروهی / سگمنتال'),L('höhere Suspektheit','greater suspicion','شک بیشتر'),'mid'],
  [L('Fein pleomorph','Fine pleomorphic','ظریف پلئومورفیک'),L('gruppiert','grouped','گروهی'),L('deutlich suspekt','clearly suspicious','به‌وضوح مشکوک'),'high'],
  [L('Fein linear / verzweigt','Fine linear / branching','ظریف خطی / شاخه‌دار'),L('linear / segmental','linear / segmental','خطی / سگمنتال'),L('hochgradig suspekt','highly suspicious','بسیار مشکوک'),'high'],
]
export const CONTEXT=[
  {title:L('Verlauf','Evolution','روند'),text:L('Neu oder zunehmend? Langzeitstabilität nur anhand echter Voraufnahmen beurteilen.','New or increasing? Assess long-term stability only from actual prior studies.','جدید یا در حال افزایش؟ ثبات طولانی‌مدت فقط با تصاویر قبلی واقعی سنجیده می‌شود.')},
  {title:L('Ausdehnung','Extent','وسعت'),text:L('Gesamtausdehnung in Millimetern oder Zentimetern dokumentieren – relevant für DCIS und Therapieplanung.','Document total extent in millimetres or centimetres; relevant to DCIS and treatment planning.','وسعت کلی را به میلی‌متر یا سانتی‌متر ثبت کنید؛ برای DCIS و برنامه درمان مهم است.')},
  {title:L('Begleitbefund','Associated finding','یافته همراه'),text:L('Mass, Architekturstörung, Asymmetrie sowie Haut- oder Mamillenveränderung aktiv suchen.','Actively search for mass, architectural distortion, asymmetry, skin or nipple change.','به‌طور فعال توده، دیستورشن معماری، آسیمتری و تغییر پوست یا نوک پستان را جستجو کنید.')},
]
export const ALGORITHM=[L('Kalk erkennen','Detect calcification','شناسایی کلسیفیکاسیون'),L('Darstellung ausreichend? Gegebenenfalls Vergrößerungsaufnahme','Adequate depiction? Obtain magnification views if needed','نمایش کافی است؟ در صورت نیاز نمای بزرگنمایی'),L('Morphologie bestimmen','Determine morphology','تعیین مورفولوژی'),L('Verteilung bestimmen','Determine distribution','تعیین توزیع'),L('Verlauf + Ausdehnung + Begleitbefunde + Klinik','Evolution + extent + associated findings + clinical context','روند + وسعت + یافته‌های همراه + زمینه بالینی'),L('BI-RADS und Konsequenz','BI-RADS and management','BI-RADS و اقدام')]
export const TAKE_HOME=[L('Größe allein trennt benignen und malignen Mikrokalk nicht.','Size alone does not separate benign from malignant calcifications.','اندازه به‌تنهایی کلسیفیکاسیون خوش‌خیم و بدخیم را جدا نمی‌کند.'),L('Typisch benigne Formen sicher erkennen – suspekte Formen immer nach Morphologie und Verteilung beschreiben.','Recognise typically benign forms; always describe suspicious forms by morphology and distribution.','اشکال تیپیک خوش‌خیم را بشناسید؛ اشکال مشکوک را همیشه با مورفولوژی و توزیع توصیف کنید.'),L('Neue oder zunehmende Verkalkungen und assoziierte Mass/Distortion erhöhen die Relevanz.','New or increasing calcifications and an associated mass or distortion increase concern.','کلسیفیکاسیون جدید یا افزایشی و توده یا دیستورشن همراه اهمیت را افزایش می‌دهد.'),L('Negatives MRT oder fehlendes CEM-Enhancement hebt eine klare Biopsieindikation nicht auf.','Negative MRI or absent CEM enhancement does not cancel a clear biopsy indication.','MRI منفی یا نبود Enhancement در CEM اندیکاسیون واضح بیوپسی را لغو نمی‌کند.')]

export const DE_EXACT_SECTIONS = [
  {
    id: 'grundlagen', number: '01', label: L('Grundlagen', 'Fundamentals', 'مبانی'),
    body: `Mammographische Verkalkungen sind häufig und überwiegend benigne. Entscheidend ist jedoch nicht allein das Vorhandensein von Kalk, sondern dessen Morphologie, Verteilung, Verlauf und bildgebender Kontext.

Die Risikoeinschätzung folgt im Wesentlichen diesem Prinzip:

Morphologie × Verteilung → Risikoeinschätzung
ergänzt durch Ausdehnung, Verlauf und Begleitbefunde.

Der häufigste mammographisch relevante Kalk besteht aus Kalziumphosphat. Er kann sowohl bei benignen als auch bei atypischen und malignen Veränderungen auftreten, unter anderem bei Zelluntergang und Nekrose.

Kalziumoxalat findet sich dagegen häufiger bei benignen, insbesondere apokrinen Veränderungen.

Für die radiologische Beurteilung ist die chemische Zusammensetzung jedoch weniger wichtig als das mammographische Erscheinungsbild.

Größe

Große Verkalkungen sind meist benign. Maligne Verkalkungen sind häufig sehr klein, oftmals unter 0,5 mm.

Bei Mikroverkalkungen gilt jedoch:

Die Größe allein unterscheidet nicht zwischen benign und maligne.

Entscheidend sind Morphologie und Verteilung.`,
  },
  {
    id: 'technik', number: '02', label: L('Technische Beurteilung', 'Technical assessment', 'ارزیابی فنی'),
    body: `Bei unklaren oder kleinen Verkalkungen sind gezielte Vergrößerungsaufnahmen wichtig. Sie ermöglichen eine deutlich bessere Beurteilung von Form und Verteilung.

Bei synthetischer Mammographie können Rekonstruktionsalgorithmen Verkalkungen verstärken, abschwächen oder in ihrer Erscheinung verändern. Auch Artefakte können Pseudoverkalkungen imitieren.

Daher:

DBT-Schichten zur Bestätigung und Lokalisation prüfen.
Morphologie bei Bedarf mit gezielten 2D-/Vergrößerungsaufnahmen beurteilen.
Merke

DBT liefert vor allem räumlichen Kontext – die detaillierte Kalkanalyse bleibt eine Aufgabe der hochauflösenden Mammographie.`,
  },
  {
    id: 'benigne', number: '03', label: L('Typisch benigne Verkalkungen', 'Typically benign calcifications', 'کلسیفیکاسیون‌های تیپیک خوش‌خیم'),
    body: `Einige Kalkformen können aufgrund ihrer typischen Morphologie meist direkt als benign eingeordnet werden.

Grobschollig

Große, grobe Verkalkungen, meist > 2 mm.

Typisch bei:

involutiertem Fibroadenom
Fettnekrose
Narben
dystrophen Veränderungen

Klassisches Beispiel: Popcorn-Verkalkung eines Fibroadenoms.

Large rod-like

Grobe, längliche Verkalkungen mit glatten und gut definierten Konturen.

Sie entsprechen meist Verkalkungen innerhalb eines Milchganges oder entlang der Gangwand.

Nicht verwechseln mit den deutlich feineren und irregulären fine linear calcifications.

Rund / punktförmig

Runde Verkalkungen besitzen glatte Konturen. Sehr kleine Formen werden als punctate bezeichnet.

Diffus verteilte runde Verkalkungen sind typischerweise benign.

Bei gruppierter Anordnung muss dagegen die gesamte Konstellation einschließlich Voraufnahmen berücksichtigt werden.

Rim calcifications

Dünne randständige Verkalkungen entlang einer rundlichen Struktur.

Typisch bei:

Fettnekrose
Ölzysten
Zysten
Layering / Milk of Calcium

Sedimentierende Verkalkungen innerhalb von Zysten.

In geeigneter Projektion entsteht das klassische Teacup-Zeichen.

Nahtverkalkungen

Lineare oder kurvilineare Verkalkungen entlang von Nahtmaterial nach Operationen.`,
  },
  {
    id: 'morphologie', number: '04', label: L('Suspekte Morphologie', 'Suspicious morphology', 'مورفولوژی مشکوک'),
    body: `Sind Verkalkungen nicht typisch benign, erfolgt die weitere Charakterisierung anhand ihrer Morphologie.

Amorph

Sehr kleine, unscharf definierte Verkalkungen ohne klar erkennbare Form.

Sie besitzen ein relativ niedriges Ausgangsrisiko. Die Verteilung ist deshalb besonders wichtig.

Diffuse oder bilaterale amorphe Verkalkungen sind wesentlich weniger verdächtig als eine fokale oder segmentale Anordnung.

Grob heterogen

Irreguläre Verkalkungen, größer als amorphe, aber kleiner und weniger typisch als grobschollige benigne Verkalkungen.

Auch hier beeinflusst die Verteilung die endgültige Einschätzung wesentlich.

Fein pleomorph

Feine, aber gut sichtbare Verkalkungen unterschiedlicher Form und Größe.

Die Heterogenität bzw. Pleomorphie ist ein relevantes Suspektkriterium und mit einem deutlich höheren Malignitätsrisiko verbunden.

Fein linear / fein linear-verzweigt

Sehr feine, irreguläre lineare oder verzweigte Verkalkungen.

Sie können Kalk bzw. nekrotisches Material innerhalb eines betroffenen Gangsystems widerspiegeln und besitzen die höchste Malignitätswahrscheinlichkeit unter den Kalkmorphologien.

Morphologisches Risikokontinuum

rund → amorph → grob heterogen → fein pleomorph → fein linear/verzweigt

Die Suspektheit nimmt dabei grundsätzlich von links nach rechts zu.`,
  },
  {
    id: 'verteilung', number: '05', label: L('Verteilung', 'Distribution', 'توزیع'),
    body: `Neben der Morphologie muss immer beschrieben werden, wie sich die Verkalkungen innerhalb der Brust verteilen.

Diffus

Weit über die Brust verteilt, häufig bilateral.

Bei entsprechender Morphologie meistens benign.

Regional

Verkalkungen innerhalb eines größeren Areals ohne eindeutige Orientierung an einem Gangsystem.

Die Bedeutung hängt stark von der Morphologie ab.

Gruppiert

Mehrere Verkalkungen konzentrieren sich innerhalb eines begrenzten Areals.

Eine gruppierte Verteilung allein bedeutet nicht Malignität:

Morphologie entscheidet über das tatsächliche Risiko.

Linear

Verkalkungen liegen entlang einer Linie.

Dies kann eine Ablagerung innerhalb eines Milchganges widerspiegeln und erhöht insbesondere bei suspekter Morphologie den Verdacht.

Segmental

Die Verkalkungen folgen einem Gangsystem und seinen Verzweigungen.

Typisch ist ein keil- oder dreieckförmiges Verteilungsmuster mit Orientierung zur Mamille.

Lineare und segmentale Verteilungsmuster sind besonders relevant, da sie auf eine duktale Ausbreitung hinweisen können.`,
  },
  {
    id: 'kombination', number: '06', label: L('Morphologie + Verteilung', 'Morphology + distribution', 'مورفولوژی + توزیع'),
    body: `Dies ist der zentrale Schritt der Kalkdiagnostik.

Die Morphologie bestimmt das Ausgangsrisiko, die Verteilung modifiziert dieses Risiko.

Beispiele:

amorph + diffus/bilateral
→ eher niedriges Risiko

amorph + gruppiert/segmental
→ höhere Suspektheit

fein pleomorph + gruppiert
→ deutlich suspekt

fein linear/verzweigt + linear oder segmental
→ hochgradig malignitätsverdächtig

Merke

Nicht Morphologie oder Verteilung allein, sondern ihre Kombination bestimmt die klinische Risikoklasse.`,
  },
  {
    id: 'kontext', number: '07', label: L('Verlauf, Ausdehnung und Begleitbefunde', 'Evolution, extent and associated findings', 'روند، وسعت و یافته‌های همراه'),
    body: `Nach Morphologie und Verteilung müssen drei weitere Fragen beantwortet werden.

Sind die Verkalkungen neu oder zunehmend?

Neue oder zunehmende Verkalkungen sind verdächtiger als langfristig stabile Befunde.

Deshalb sollten Voraufnahmen konsequent verglichen werden.

Wie groß ist die Ausdehnung?

Die Gesamtausdehnung des Kalkareals sollte angegeben werden.

Ein wenige Millimeter großes Cluster und ein mehrere Zentimeter ausgedehnter Befund gleicher Morphologie sind nicht gleichwertig.

Die Ausdehnung ist außerdem relevant für die Beurteilung einer möglichen DCIS-Ausdehnung und für die Therapieplanung.

Gibt es einen Begleitbefund?

Immer das umgebende Brustgewebe beurteilen:

Masse?
Architekturstörung?
Asymmetrie?
Haut- oder Mamillenveränderung?

Eine assoziierte Masse oder Architekturstörung kann insbesondere auf eine invasive Komponente hinweisen.`,
  },
  {
    id: 'dcis', number: '08', label: L('Mikrokalk und DCIS', 'Microcalcifications and DCIS', 'میکروکلسیفیکاسیون و DCIS'),
    body: `Suspekte Mikroverkalkungen sind häufig mit einem duktalen Carcinoma in situ (DCIS) assoziiert.

Maligner Kalk bedeutet jedoch nicht automatisch reines DCIS. Es kann ebenfalls ein invasives Karzinom mit begleitender intraduktaler Komponente vorliegen.

Deshalb:

Suspekter Mikrokalk spricht häufig für einen duktalen Prozess – nicht automatisch für eine bestimmte Histologie.`,
  },
  {
    id: 'ultraschall', number: '09', label: L('Verkalkungen im Ultraschall', 'Calcifications on ultrasound', 'کلسیفیکاسیون در سونوگرافی'),
    body: `Die Mammographie bleibt die wichtigste Methode zur Detektion und Charakterisierung von Mikroverkalkungen.

Makroverkalkungen

Sie können im Ultraschall echogen erscheinen und einen dorsalen Schallschatten verursachen, beispielsweise bei:

Fibroadenomen
Ölzysten
Fettnekrose
Mikroverkalkungen

Sie können als kleine echogene Foci sichtbar werden, insbesondere wenn sie:

innerhalb einer Masse,
innerhalb einer Non-Mass-Läsion oder
intraduktal

liegen.

Ein sonographisches Korrelat kann insbesondere für die weitere Biopsieplanung hilfreich sein.`,
  },
  {
    id: 'mrt', number: '10', label: L('Welche Rolle spielt die MRT?', 'What is the role of MRI?', 'نقش MRI چیست؟'),
    body: `Die MRT kann die Risikoeinschätzung ergänzen, ersetzt aber nicht die Histologie.

Sie kann:

eine invasive Komponente erkennen,
die Ausdehnung besser darstellen,
zusätzliche Läsionen zeigen,
ausgewählte niedrig suspekte Befunde weiter stratifizieren.

Ein negatives MRT kann dagegen:

ein DCIS nicht sicher ausschließen,
eine klare Biopsieindikation bei suspektem Mikrokalk nicht automatisch aufheben.

Ein negatives MRT macht einen suspekten mammographischen Kalkbefund nicht automatisch benign.`,
  },
  {
    id: 'algorithmus', number: '11', label: L('Praktischer Befundungsalgorithmus', 'Practical reporting algorithm', 'الگوریتم عملی گزارش'),
    body: `1. Kalk erkennen

↓

2. Darstellung ausreichend?

Falls notwendig: Vergrößerungsaufnahmen

↓

3. Morphologie bestimmen

rund → amorph → grob heterogen → fein pleomorph → fein linear/verzweigt

↓

4. Verteilung bestimmen

diffus → regional → gruppiert → linear → segmental

↓

5. Zusatzkriterien prüfen

Verlauf + Ausdehnung + Begleitbefunde + klinischer Kontext

↓

6. BI-RADS und Konsequenz
Take Home

1. Kalk ist keine Diagnose – Morphologie und Verteilung bestimmen das Ausgangsrisiko.

2. Typisch benigne Kalkformen sollten sicher erkannt werden, um unnötige Abklärungen zu vermeiden.

3. Bei amorphen und grob heterogenen Verkalkungen ist die Verteilung besonders wichtig.

4. Fein pleomorphe und insbesondere fein lineare/verzweigte Verkalkungen sind deutlich suspekt.

5. Verlauf, Ausdehnung und assoziierte Masse bzw. Architekturstörung können das Risiko zusätzlich verändern.

6. MRT kann das Risiko modifizieren, aber eine indizierte histologische Abklärung nicht ersetzen.

Radyar-Merksatz

Morphologie × Verteilung + Verlauf + Ausdehnung + Kontext → BI-RADS → Konsequenz`,
  },
]
