const L = (de, en, fa) => ({ de, en, fa })

export const ARTERIAL_ANATOMY_LOWER_LIMB = {
  id: 'gefaessanatomie-kollateralen',
  title: L('Arterien der unteren Extremität: vom Becken bis zum Fuß', 'Lower-limb arteries: from pelvis to foot', 'شریان‌های اندام تحتانی: از لگن تا پا'),
  hero: '/educational/lower-limb-arterial-hero.svg',
  alt: L('Abstrakte, nichtdiagnostische Verzweigung von Arterien der unteren Extremität.', 'Abstract, non-diagnostic branching of lower-limb arteries.', 'انشعاب انتزاعی و غیرتشخیصی شریان‌های اندام تحتانی.'),
  diagram: '/educational/lower-limb-arterial-pathway.svg',
  diagramAlt: L('Nichtdiagnostisches Flussschema vom Becken über Oberschenkel und Unterschenkel zu den getrennten dorsalen und plantaren Fußarterien.', 'Non-diagnostic pathway map from pelvis through thigh and leg to separate dorsal and plantar foot arteries.', 'نقشهٔ مسیر غیرتشخیصی از لگن، ران و ساق تا شریان‌های جداگانهٔ پشت پا و کف پا.'),
  intro: {
    title: L('Den Verlauf zuerst proximal nach distal verfolgen', 'Trace the route from proximal to distal', 'ابتدا مسیر را از پروگزیمال به دیستال دنبال کنید'),
    text: L('Die Abbildungen in MSK.pdf zeigen die Hauptarterien des Beckens, Oberschenkels, Unterschenkels und Fußes. Für die Orientierung hilft eine zusammenhängende Route: A. iliaca externa → A. femoralis → A. poplitea → Unterschenkelarterien → Fußrücken und Fußsohle.', 'The figures in MSK.pdf label the main arteries of the pelvis, thigh, leg and foot. For orientation, follow one continuous route: external iliac artery → femoral artery → popliteal artery → leg arteries → dorsum and sole of the foot.', 'تصاویر MSK.pdf شریان‌های اصلی لگن، ران، ساق و پا را نام‌گذاری می‌کنند. مسیر را از ایلیاک خارجی به فمورال و سپس پوپلیته‌آل دنبال کنید؛ از آنجا شریان‌های ساق به پشت پا و کف پا می‌رسند.'),
  },
  chapters: [
    {
      id: 'pelvis-thigh', icon: 'artery',
      title: L('Vom Becken bis zur Kniekehle', 'From pelvis to popliteal fossa', 'از لگن تا حفرهٔ پوپلیته‌آل'),
      lead: L('Am Leistenband wird die A. iliaca externa zur A. femoralis communis. Diese teilt sich in eine tiefe Versorgung des Oberschenkels und die Fortsetzung zur Kniekehle.', 'At the inguinal ligament, the external iliac artery continues as the common femoral artery. It gives a deep thigh branch and continues toward the popliteal fossa.', 'در سطح رباط اینگوینال، شریان ایلیاک خارجی به شریان فمورال مشترک ادامه می‌یابد. این شریان شاخه‌ای عمقی برای ران می‌دهد و مسیر اصلی را به‌سوی حفرهٔ پوپلیته‌آل ادامه می‌دهد.'),
      rows: [
        [L('A. iliaca externa → A. femoralis communis', 'External iliac → common femoral artery', 'از ایلیاک خارجی به فمورال مشترک'), L('Die A. femoralis communis beginnt distal des Leistenbandes.', 'The common femoral artery begins distal to the inguinal ligament.', 'شریان فمورال مشترک در سمت دیستال رباط اینگوینال آغاز می‌شود.')],
        [L('A. profunda femoris', 'Deep femoral artery (profunda femoris)', 'شریان فمورال عمقی (پروفوندا فموریس)'), L('Versorgt den Oberschenkel über Äste wie Aa. circumflexae femoris und Aa. perforantes.', 'Supplies the thigh through branches such as the circumflex femoral and perforating arteries.', 'از طریق شاخه‌هایی مانند شریان‌های سیرکومفلکس فموریس و پرفوراتورها به ران خون‌رسانی می‌کند.')],
        [L('A. femoralis superficialis → A. poplitea', 'Superficial femoral → popliteal artery', 'فمورال سطحی ← پوپلیته‌آل'), L('Die A. femoralis superficialis zieht durch den Adduktorenkanal; nach dem Hiatus adductorius heißt das Gefäß A. poplitea.', 'The superficial femoral artery passes through the adductor canal; beyond the adductor hiatus, it is called the popliteal artery.', 'شریان فمورال سطحی از کانال اداکتور می‌گذرد و پس از هیاتوس اداکتوریوس، شریان پوپلیته‌آل نامیده می‌شود.')],
      ],
      note: L('Die PDF benennt außerdem Äste der A. profunda femoris und das Rete articulare genus. Das Schema zeigt diese Detailäste nicht maßstabsgetreu.', 'The PDF also labels branches of the deep femoral artery and the genicular anastomotic network. The schematic does not depict those smaller branches to scale.', 'PDF همچنین شاخه‌های فمورال عمقی و شبکهٔ آناستوموز زانو را نام می‌برد. شماتیک، این شاخه‌های کوچک‌تر را با مقیاس واقعی نشان نمی‌دهد.'),
    },
    {
      id: 'leg', icon: 'branches',
      title: L('Die Aufteilung in der Kniekehle', 'The branching pattern below the knee', 'الگوی انشعاب در زیر زانو'),
      lead: L('Die A. poplitea gibt die A. tibialis anterior ab und setzt sich zunächst als Truncus tibiofibularis fort. Dieser teilt sich in A. tibialis posterior und A. fibularis (peronea).', 'The popliteal artery gives off the anterior tibial artery and continues briefly as the tibioperoneal trunk. The trunk divides into the posterior tibial and fibular (peroneal) arteries.', 'شریان پوپلیته‌آل، شریان تیبیال قدامی را جدا می‌کند و ابتدا به‌صورت تنهٔ تیبیوپروونئال ادامه می‌یابد. این تنه به شریان تیبیال خلفی و شریان فیبولار (پروونئال) تقسیم می‌شود.'),
      rows: [
        [L('A. tibialis anterior', 'Anterior tibial artery', 'شریان تیبیال قدامی'), L('Verläuft in der vorderen Unterschenkelregion und erreicht den Fußrücken.', 'Runs in the anterior leg and reaches the dorsum of the foot.', 'در بخش قدامی ساق حرکت می‌کند و به پشت پا می‌رسد.')],
        [L('Truncus tibiofibularis', 'Tibioperoneal trunk', 'تنهٔ تیبیوپروونئال'), L('Teilt sich in A. tibialis posterior und A. fibularis.', 'Divides into the posterior tibial and fibular arteries.', 'به شریان تیبیال خلفی و فیبولار تقسیم می‌شود.')],
      ],
      note: L('Das PDF benennt den Truncus tibiofibularis ausdrücklich. Varianten der distalen Aufzweigung sind möglich; die Grafik zeigt das häufige Grundschema, keine individuelle Angiographie.', 'The PDF explicitly labels the tibioperoneal trunk. Distal branching variants occur; the graphic shows a common basic pattern, not an individual angiogram.', 'PDF تنهٔ تیبیوپروونئال را صریحاً نام می‌برد. تنوع در انشعاب دیستال ممکن است؛ نمودار یک الگوی پایهٔ رایج را نشان می‌دهد، نه آنژیوگرافی یک فرد را.'),
    },
    {
      id: 'foot', icon: 'foot',
      title: L('Zwei Wege zum Fuß: dorsal und plantar', 'Two routes to the foot: dorsal and plantar', 'دو مسیر به پا: پشتی و کف‌پایی'),
      lead: L('Am Fuß lassen sich die Fortsetzungen der vorderen und hinteren Unterschenkelversorgung unterscheiden. Die PDF-Abbildungen zeigen sowohl den Fußrücken als auch die plantare Gefäßverteilung.', 'At the foot, the continuations of the anterior and posterior leg supply can be distinguished. The PDF figures show both the dorsum and plantar arterial distribution.', 'در پا می‌توان ادامهٔ مسیر خون‌رسانی قدامی و خلفی ساق را از هم تشخیص داد. تصاویر PDF هم پشت پا و هم توزیع شریان‌های کف‌پایی را نشان می‌دهند.'),
      rows: [
        [L('Fußrücken', 'Dorsum of the foot', 'پشت پا'), L('Die A. tibialis anterior setzt sich als A. dorsalis pedis fort; die Abbildungen benennen unter anderem Aa. tarsales, A. arcuata und dorsale Metatarsaläste.', 'The anterior tibial artery continues as the dorsalis pedis; the figures also label tarsal and arcuate arteries and dorsal metatarsal branches.', 'شریان تیبیال قدامی به شریان دورسالیس پدیس ادامه می‌یابد؛ تصاویر همچنین شریان‌های تارسال و آرکوات و شاخه‌های متاتارسال پشتی را نام می‌برند.')],
        [L('Fußsohle', 'Plantar surface', 'کف پا'), L('Die A. tibialis posterior teilt sich in Aa. plantares medialis und lateralis. Die laterale Plantararterie bildet überwiegend den Arcus plantaris; eine tiefe Plantarverbindung zur A. dorsalis pedis ergänzt den Bogen.', 'The posterior tibial artery divides into medial and lateral plantar arteries. The lateral plantar artery forms most of the plantar arch; a deep plantar connection from the dorsalis pedis completes the arch.', 'شریان تیبیال خلفی به شریان‌های پلانتار داخلی و خارجی تقسیم می‌شود. شریان پلانتار خارجی بخش عمدهٔ قوس پلانتار را می‌سازد و شاخهٔ عمقی دورسالیس پدیس به این قوس متصل می‌شود.')],
      ],
      note: L('Die Abbildungen sind anatomische Orientierungshilfen. Sie zeigen keine Stenose, keinen Verschluss und keine individuelle Gefäßvariante.', 'These figures are anatomic orientation aids. They do not show stenosis, occlusion or an individual vascular variant.', 'این تصاویر برای جهت‌یابی آناتومیک‌اند؛ تنگی، انسداد یا تنوع عروقی یک فرد را نشان نمی‌دهند.'),
    },
  ],
  check: {
    title: L('Kurz prüfen: Welche Arterie erreicht den Fußrücken?', 'Quick check: which artery reaches the dorsum?', 'آزمون کوتاه: کدام شریان به پشت پا می‌رسد؟'),
    prompt: L('Unterhalb des Knies wurde die A. tibialis anterior verfolgt. Welche benannte Arterie ist ihre Fortsetzung am Fußrücken?', 'Below the knee, you have followed the anterior tibial artery. Which named artery is its continuation on the dorsum of the foot?', 'در زیر زانو مسیر شریان تیبیال قدامی را دنبال کرده‌اید. ادامهٔ نام‌گذاری‌شدهٔ آن در پشت پا کدام شریان است؟'),
    options: [L('A. dorsalis pedis', 'Dorsalis pedis artery', 'شریان دورسالیس پدیس'), L('A. plantaris lateralis', 'Lateral plantar artery', 'شریان پلانتار خارجی'), L('A. fibularis', 'Fibular artery', 'شریان فیبولار')],
    answerIndex: 0,
    feedback: L('Die A. tibialis anterior erreicht den Fußrücken und wird dort als A. dorsalis pedis bezeichnet. Die plantaren Äste gehen aus der A. tibialis posterior hervor.', 'The anterior tibial artery reaches the dorsum and is then called the dorsalis pedis artery. The plantar branches arise from the posterior tibial artery.', 'شریان تیبیال قدامی به پشت پا می‌رسد و در آنجا دورسالیس پدیس نامیده می‌شود. شاخه‌های پلانتار از شریان تیبیال خلفی منشأ می‌گیرند.'),
  },
  takeHome: [
    L('A. iliaca externa → A. femoralis communis → A. femoralis superficialis → A. poplitea.', 'External iliac → common femoral → superficial femoral → popliteal artery.', 'از ایلیاک خارجی به فمورال مشترک و سطحی، سپس به پوپلیته‌آل.'),
    L('A. poplitea → A. tibialis anterior und Truncus tibiofibularis → A. tibialis posterior / A. fibularis.', 'Popliteal artery → anterior tibial artery and tibioperoneal trunk → posterior tibial / fibular arteries.', 'پوپلیته‌آل به تیبیال قدامی و تنهٔ تیبیوپروونئال تقسیم می‌شود؛ تنه به تیبیال خلفی و فیبولار می‌رسد.'),
    L('A. tibialis anterior → Fußrücken; A. tibialis posterior → Fußsohle.', 'Anterior tibial artery → dorsum; posterior tibial artery → plantar surface.', 'تیبیال قدامی به پشت پا و تیبیال خلفی به کف پا می‌رسد.'),
  ],
  scope: L('Begrenzte Anatomie-Lektion aus MSK.pdf, PDF-Seiten 134–136 (gedruckte Seiten 133–135). Die Zeichnung ist ein vereinfachtes, nichtdiagnostisches Flussschema und keine Patientenangiographie. Variationen und klinische Läsionsbeurteilung sind nicht Gegenstand dieser Lektion.', 'Bounded anatomy lesson from MSK.pdf, PDF pp. 134–136 (printed pp. 133–135). The drawing is a simplified, non-diagnostic flow map, not a patient angiogram. Variants and clinical lesion assessment are outside this lesson.', 'درس محدود آناتومی بر اساس MSK.pdf، صفحات PDF ۱۳۴–۱۳۶ (صفحه‌های چاپی ۱۳۳–۱۳۵). نمودار، نقشهٔ جریان ساده‌شده و غیرتشخیصی است، نه آنژیوگرافی بیمار. تنوع‌های آناتومیک و ارزیابی ضایعات بالینی در دامنهٔ این درس نیستند.'),
  references: [
    { tag: 'MSK.pdf · pp. 134–136', title: L('Abbildungen der unteren Extremitäten', 'Lower-extremity figures', 'تصاویر اندام تحتانی'), citation: L('PDF pp. 134–136; printed pp. 133–135. Seite 134 zeigt beschriftete Becken-/Oberschenkelarterien, p.135 Unterschenkel und Fußrücken, p.136 Fußsohle. Die extern gezeichnete Fußabbildung auf p.135 ist mit TeachMeAnatomy markiert und wird nicht eingebettet; die neue Flussgrafik ist eigenständig erstellt.', 'PDF pp. 134–136; printed pp. 133–135. Page 134 labels pelvic/thigh arteries, p.135 the leg and dorsum, and p.136 the plantar foot. The externally illustrated foot image on p.135 bears a TeachMeAnatomy mark and is not embedded; the new pathway diagram is original.', 'صفحات PDF ۱۳۴–۱۳۶؛ شماره‌های چاپی ۱۳۳–۱۳۵. صفحهٔ ۱۳۴ شریان‌های لگن و ران، صفحهٔ ۱۳۵ ساق و پشت پا، و صفحهٔ ۱۳۶ کف پا را نام‌گذاری می‌کند. تصویر خارجی صفحهٔ ۱۳۵ نشان TeachMeAnatomy دارد و در درس درج نشده؛ نمودار مسیر تازه به‌صورت مستقل ساخته شده است.') },
    { tag: 'NCBI Bookshelf', title: L('Arterielle Versorgung der unteren Extremität', 'Arterial supply of the lower extremities', 'خون‌رسانی شریانی اندام تحتانی'), href: 'https://www.ncbi.nlm.nih.gov/books/NBK27342/', citation: 'Guide to Peripheral and Cerebrovascular Intervention, NCBI Bookshelf. Used to verify the common-femoral split, profunda branches and popliteal-to-tibial pathway.' },
    { tag: 'NCBI Bookshelf', title: L('شریان‌های کف پا', 'Foot arterial anatomy', 'آناتومی شریان‌های پا'), href: 'https://www.ncbi.nlm.nih.gov/books/NBK560912/', citation: 'StatPearls: Anatomy, Bony Pelvis and Lower Limb: Foot Arteries. Used to verify dorsal and plantar arterial continuities and the plantar arch connection.' },
  ],
}
