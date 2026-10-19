const L = (de, en, fa) => ({ de, en, fa })

export const SPINE_DEGENERATIVE_LESSON = {
  id: 'degenerative-wirbelsaeule',
  source: 'Wirbelsäule.pdf, PDF S. 5–8',
  title: L('Degenerative Veränderungen der Wirbelsäule', 'Degenerative spine changes', 'تغییرات دژنراتیو ستون فقرات'),
  alt: L('Schema: Bandscheibenverschmälerung, Endplattenveränderung und Einengung des Spinalkanals', 'Schematic of disc narrowing, endplate change and spinal canal narrowing', 'شماتیک کاهش ارتفاع دیسک، تغییرات صفحه انتهایی و تنگی کانال نخاعی'),
  intro: { title: L('Engstelle, Signal, neurale Folge', 'Narrowing, signal, neural effect', 'تنگی، سیگنال و اثر عصبی'), text: L('Die Befundung folgt drei Fragen: Wie ist die Bandscheibe verändert? Welches Signal zeigen Endplatte und Knochenmark? Werden Myelon, Duralsack oder Nervenwurzel tatsächlich bedrängt?', 'Use three questions: how has the disc changed, what signal is present at the endplates and marrow, and are the cord, thecal sac or nerve root actually compressed?', 'گزارش را با سه پرسش پیش ببرید: دیسک چگونه تغییر کرده است؟ صفحه انتهایی و مغز استخوان چه سیگنالی دارند؟ آیا به نخاع، ساک دورال یا ریشه عصبی واقعاً فشار وارد می‌شود؟') },
  case: {
    title: L('Mini-Fall: Was bedeutet die Zahl?', 'Quick case: What does the number mean?', 'تمرین کوتاه: عدد چه معنایی دارد؟'),
    prompt: L('Sagittal misst der lumbale Kanal 9 mm. Duralsack und Wurzeln bleiben frei. Was folgt?', 'The lumbar canal measures 9 mm sagittally. The thecal sac and roots remain free. What follows?', 'قطر ساژیتال کانال کمری ۹ میلی‌متر است، اما ساک دورال و ریشه‌ها آزادند. نتیجه چیست؟'),
    options: [L('Absolute Stenose ist allein durch den Messwert bewiesen.','Absolute stenosis is proven by the measurement alone.','فقط با این اندازه‌گیری، تنگی مطلق ثابت می‌شود.'), L('Der Messwert allein belegt keine relevante Kompression; Morphologie und neurale Bedrängung zählen.','The number alone does not establish relevant compression; morphology and neural compromise matter.','عدد به‌تنهایی فشار مهم را ثابت نمی‌کند؛ مورفولوژی و فشار بر ساختار عصبی اهمیت دارند.')],
    answerIndex: 1,
    feedbackCorrect: L('Richtig. Ein Messwert allein beweist keine klinisch relevante Stenose.','Correct. A measurement alone does not establish clinically relevant stenosis.','درست است. اندازه‌گیری به‌تنهایی تنگیِ دارای اهمیت بالینی را ثابت نمی‌کند.'),
    feedbackIncorrect: L('Nicht ganz. Prüfe die neurale Bedrängung und den Liquorraum, nicht nur den Zahlenwert.','Not quite. Assess neural compression and CSF space, not the measurement alone.','نه کاملاً. فشار بر ساختارهای عصبی و فضای CSF را بررسی کنید، نه فقط عدد را.'),
  },
  chapters: [
    {
      id: 'modic', icon: '◈',
      title: L('Was sagt das Endplattensignal?', 'What does endplate signal show?', 'سیگنال صفحه انتهایی چه چیزی را نشان می‌دهد؟'),
      source: L('Wirbelsäule.pdf, S. 5', 'Wirbelsäule.pdf, p. 5', 'Wirbelsäule.pdf، صفحه ۵'),
      lead: L('Modic-Typen beschreiben reaktive Knochenmarkveränderungen an den benachbarten Wirbelkörperabschlussplatten.', 'Modic types describe reactive marrow changes in adjacent vertebral endplates.', 'انواع مودیک تغییرات واکنشی مغز استخوان در صفحات انتهایی مهره‌های مجاور را توصیف می‌کنند.'),
      rows: [
        [L('Modic I · Ödem/aktiv','Modic I · oedema/active','مودیک I · ادم/فعال'), 'T1 ↓ · T2 ↑'],
        [L('Modic II · Fett/chronisch','Modic II · fat/chronic','مودیک II · چربی/مزمن'), 'T1 ↑ · T2 ↑'],
        [L('Modic III · Sklerose','Modic III · sclerosis','مودیک III · اسکلروز'), 'T1 ↓ · T2 ↓'],
      ],
      note: L('Ein DWI-Claw-Zeichen kann bei Modic-I-Veränderungen die Abgrenzung zur Infektion unterstützen. Es ist ein Zusatzzeichen und ersetzt nicht die Gesamtschau aus Diskus, Endplatten, Weichteilen und Klinik.','A DWI claw sign can support differentiation of Modic I change from infection. It is an adjunct, not a substitute for assessing disc, endplates, soft tissues and clinical context together.','علامت claw در DWI می‌تواند به افتراق تغییرات مودیک I از عفونت کمک کند؛ نشانه‌ای تکمیلی است و جایگزین ارزیابی یکپارچه دیسک، صفحات انتهایی، بافت نرم و زمینه بالینی نمی‌شود.'),
    },
    {
      id: 'disk', icon: '◉',
      title: L('Wie weit ist Bandscheibenmaterial verlagert?', 'How far has disc material displaced?', 'ماده دیسک تا چه حد جابه‌جا شده است؟'),
      source: L('Wirbelsäule.pdf, S. 6', 'Wirbelsäule.pdf, p. 6', 'Wirbelsäule.pdf، صفحه ۶'),
      lead: L('Zuerst die Morphologie benennen, dann die Richtung und betroffene Nervenstruktur.', 'Name the morphology first, then the direction and affected neural structure.', 'ابتدا مورفولوژی را مشخص کنید، سپس جهت و ساختار عصبی درگیر را بررسی کنید.'),
      rows: [
        [L('Protrusion','Protrusion','پروتروژن'), L('Breite Basis; die Tiefe ist kleiner als die Basis.','Broad base; depth is less than the base width.','قاعده پهن؛ عمق از پهنای قاعده کمتر است.')],
        [L('Extrusion','Extrusion','اکستروژن'), L('Schmale Basis; die Tiefe übersteigt die Basis, Kontakt zur Bandscheibe bleibt.','Narrow base; depth exceeds the base, with continuity to the parent disc.','قاعده باریک؛ عمق از قاعده بیشتر است و اتصال به دیسک مادر حفظ شده است.')],
        [L('Sequester','Sequestration','سکوستر'), L('Abgetrenntes Fragment ohne Kontakt zur Mutterscheibe.','Detached fragment with no connection to the parent disc.','قطعه جداشده بدون اتصال به دیسک مادر.')],
      ],
      note: L('Axial: mediane Läsionen können Myelon/Konus bedrängen; paramedian/posterolateral Läsionen betreffen häufig die Wurzel; foraminale und extraforaminale Läsionen liegen am beziehungsweise außerhalb des Foramen.','Axially, central lesions may affect the cord/conus; paramedian or posterolateral lesions often affect a root; foraminal and extraforaminal lesions lie in or beyond the foramen.','در برش آکسیال، ضایعه میانی ممکن است نخاع/کونوس را تحت فشار بگذارد؛ ضایعه پارامدیان یا خلفی‌ـ‌جانبی اغلب ریشه را درگیر می‌کند؛ ضایعه فورامینال یا خارج‌فورامینال در فورامن یا بیرون آن قرار دارد.'),
    },
    {
      id: 'facet', icon: '◇',
      title: L('Ist das Facettengelenk nur degenerativ oder aktiviert?', 'Is facet arthropathy active?', 'آیا آرتروز فاست فعال شده است؟'),
      source: L('Wirbelsäule.pdf, S. 7', 'Wirbelsäule.pdf, p. 7', 'Wirbelsäule.pdf، صفحه ۷'),
      lead: L('MRT kann Aktivitätszeichen zeigen; CT bildet vor allem die knöcherne Morphologie ab.', 'MRI can show activity; CT primarily depicts bony morphology.', 'MRI می‌تواند نشانه‌های فعالیت را نشان دهد؛ CT عمدتاً مورفولوژی استخوانی را مشخص می‌کند.'),
      rows: [
        [L('MRT T1','MRI T1','MRI T1'), L('Periartikuläres Marködem signalarm.','Periarticular marrow oedema is low signal.','ادم مغز استخوان اطراف مفصل کم‌سیگنال است.')],
        [L('T2/STIR','T2/STIR','T2/STIR'), L('Subchondrales Ödem, Erguss und periartikuläre Weichteilsignale.','Subchondral oedema, effusion and periarticular soft-tissue signal.','ادم ساب‌کندرال، افیوژن و سیگنال بافت نرم اطراف مفصل.')],
        [L('CT','CT','CT'), L('Gelenkspalt, Sklerose, Osteophyten, Vakuum und Hypertrophie.','Joint space, sclerosis, osteophytes, vacuum phenomenon and hypertrophy.','فاصله مفصلی، اسکلروز، استئوفیت، پدیده خلأ و هیپرتروفی.')],
      ],
      note: L('Hypertrophe Facetten, Ligamentum-flavum-Verdickung und juxtafacettäre Zysten können Rezessus, Kanal oder Neuroforamen einengen.','Facet hypertrophy, ligamentum flavum thickening and juxtafacet cysts can narrow the recess, canal or neural foramen.','هیپرتروفی فاست، ضخیم‌شدن لیگامان فلاووم و کیست کنار فاست می‌توانند رِسِس، کانال یا فورامن عصبی را تنگ کنند.'),
    },
    {
      id: 'stenosis', icon: '⌗',
      title: L('Engt die Stenose neurale Strukturen ein?', 'Does stenosis compress neural structures?', 'آیا تنگی به ساختارهای عصبی فشار می‌آورد؟'),
      source: L('Wirbelsäule.pdf, S. 8; Nouri et al. (2017); Li et al., ZOOM-DWI (2024)', 'Wirbelsäule.pdf, p. 8; Nouri et al. (2017); Li et al., ZOOM-DWI (2024)', 'Wirbelsäule.pdf، صفحه ۸؛ Nouri و همکاران (۲۰۱۷)؛ Li و همکاران، ZOOM-DWI (۲۰۲۴)'),
      lead: L('Achte auf den Liquorsaum um das Myelon oder die Kompression des lumbalen Duralsacks; der Zahlenwert allein definiert keine klinische Relevanz.', 'Look for loss of CSF around the cord or compression of the lumbar thecal sac; a measurement alone does not establish clinical relevance.', 'به کاهش فضای CSF اطراف نخاع یا فشردگی ساک دورال کمری توجه کنید؛ عدد اندازه‌گیری به‌تنهایی اهمیت بالینی را تعیین نمی‌کند.'),
      rows: [
        [L('HWS sagittal','Cervical sagittal','ساژیتال گردنی'), L('Normal 14–17 mm · relativ 10–14 mm · absolut <10 mm (PDF-Angaben)','Normal 14–17 mm · relative 10–14 mm · absolute <10 mm (PDF values)','طبیعی ۱۴–۱۷ میلی‌متر · نسبی ۱۰–۱۴ · مطلق کمتر از ۱۰ (طبق PDF)')],
        [L('LWS sagittal','Lumbar sagittal','ساژیتال کمری'), L('Normal 15–25 mm · relativ 10–12 mm · absolut <10 mm oder Duralsackfläche <75 mm² (PDF-Angaben)','Normal 15–25 mm · relative 10–12 mm · absolute <10 mm or thecal-sac area <75 mm² (PDF values)','طبیعی ۱۵–۲۵ میلی‌متر · نسبی ۱۰–۱۲ · مطلق کمتر از ۱۰ یا سطح ساک دورال کمتر از ۷۵ (طبق PDF)')],
      ],
      subheading: L('Welche neurale Struktur ist auf dieser Etage betroffen?', 'Which neural structure is affected at this level?', 'در این سطح کدام ساختار عصبی درگیر است؟'),
      extraRows: [
        [L('HWS/BWS','Cervical/thoracic','گردنی/سینه‌ای'), L('Hier verläuft das Myelon: Kompression mit passender Klinik als mögliche kompressive Myelopathie einordnen. MRT zeigt Rückenmark und Kanal; T2-Signalveränderung dokumentieren, aber nicht allein daraus Prognose oder Irreversibilität ableiten.','The spinal cord runs here: with concordant clinical findings, consider compressive myelopathy. MRI depicts cord and canal; document T2 signal change, but do not infer prognosis or irreversibility from signal alone.','در این نواحی نخاع امتداد دارد: در صورت تطابق با تابلوی بالینی، میلوپاتی فشاری را مطرح کنید. MRI نخاع و کانال را نشان می‌دهد؛ تغییر سیگنال T2 را ثبت کنید، اما از آن به‌تنهایی پیش‌آگهی یا برگشت‌ناپذیری را نتیجه نگیرید.')],
        [L('LWS','Lumbar','کمری'), L('Unterhalb des Conus verlaufen überwiegend Cauda-equina-Wurzeln im Duralsack, kein Myelon. Daher Wurzel-/Duralsackkompression und Etage beschreiben; nicht pauschal „Myelopathie“ nennen.','Below the conus, the thecal sac contains predominantly cauda equina roots rather than spinal cord. Describe root/thecal-sac compression and level; do not label it generically as myelopathy.','در زیر کونوس، عمدتاً ریشه‌های دم‌اسبی در ساک دورال قرار دارند و نخاع وجود ندارد. فشار بر ریشه‌ها/ساک دورال و سطح را توصیف کنید؛ آن را به‌طور کلی «میلوپاتی» ننامید.')],
      ],
      signalRows: [
        [L('T2 ↑ allein','T2 hyperintensity alone','افزایش سیگنال T2 به‌تنهایی'), L('Unspezifisch; kein verlässlicher Beleg für Reversibilität oder Irreversibilität. Klinische Schwere und Verlauf nicht allein daraus ableiten.','Nonspecific; it does not reliably establish reversibility or irreversibility. Do not infer clinical severity or course from this alone.','غیراختصاصی است و برگشت‌پذیری یا برگشت‌ناپذیری را به‌طور قابل اعتماد ثابت نمی‌کند. شدت بالینی یا سیر بیماری را فقط از این یافته نتیجه نگیرید.')],
        [L('T1 ↓ plus T2 ↑','T1 hypointensity plus T2 hyperintensity','کاهش سیگنال T1 همراه با افزایش سیگنال T2'), L('In einer Operationskohorte mit 419 MRT-Untersuchungen war dieses Muster gegenüber keiner Signaländerung oder T2 allein mit geringerer 2-Jahres-Erholung assoziiert. Die Leserübereinstimmung für T1-Hypointensität war mäßig (κ=.31); für T2-Hyperintensität war sie substantiell (κ=.60). Assoziation ist keine individuelle Prognose.','In a surgical cohort of 419 MRI examinations, this pattern was associated with less 2-year recovery than no signal change or T2 change alone. Inter-reader agreement was fair for T1 hypointensity (κ=.31) and substantial for T2 hyperintensity (κ=.60). Association is not an individual prognosis.','در گروه جراحی شامل ۴۱۹ بررسی MRI، این الگو نسبت به نبود تغییر سیگنال یا T2 به‌تنهایی با بهبودی کمتر طی دو سال همراه بود. توافق بین خوانندگان برای هیپواینتنسیتی T1 متوسط بود (κ=.31) و برای هایپراینتنسیتی T2 قابل‌توجه بود (κ=.60). این ارتباط پیش‌آگهی فردی را تعیین نمی‌کند.')],
        [L('DWI','DWI','DWI'), L('Die PDF behauptet eine höhere Sensitivität/Spezifität und ordnet Restriktion als irreversibel ein. Diese Rangordnung und binäre Reversibilitätsaussage übernehmen wir nicht: Eine kleine ZOOM-DWI-Studie (49 Betroffene, 50 Kontrollen) ist methodenspezifisch und belegt keinen allgemeinen Vorrang der DWI.','The PDF claims higher sensitivity/specificity and labels restriction as irreversible. We do not adopt that ranking or binary reversibility claim: a small ZOOM-DWI study (49 patients, 50 controls) is technique-specific and does not establish general DWI superiority.','PDF حساسیت/ویژگی بیشتر و برگشت‌ناپذیری در صورت محدودیت انتشار را ادعا می‌کند. این رتبه‌بندی و حکم دوگانه را نمی‌پذیریم: یک مطالعه کوچک ZOOM-DWI (۴۹ بیمار و ۵۰ شاهد) وابسته به روش خاص است و برتری کلی DWI را ثابت نمی‌کند.')],
      ],
      signalTitle: L('Wie aussagekräftig sind Signalveränderungen?', 'How should cord signal changes be interpreted?', 'تغییرات سیگنال نخاع را چگونه تفسیر کنیم؟'),
      signalEvidence: L('Quelle: Nouri et al., globale DCM-Kohorte (2017), DOI 10.1097/BRS.0000000000002234. DWI-Ergebnis: Li et al., European Spine Journal (2024), DOI 10.1007/s00586-023-08110-8.','Evidence: Nouri et al., global DCM cohort (2017), DOI 10.1097/BRS.0000000000002234. DWI study: Li et al., European Spine Journal (2024), DOI 10.1007/s00586-023-08110-8.','منبع: Nouri و همکاران، گروه چندمرکزی جهانی DCM (۲۰۱۷)، DOI 10.1097/BRS.0000000000002234. مطالعه DWI: Li و همکاران، European Spine Journal (۲۰۲۴)، DOI 10.1007/s00586-023-08110-8.'),
      note: L('Die PDF-Schwellen sind Orientierungswerte und brauchen für Freigabe eine lokale wissenschaftliche Prüfung. Die Bildbeurteilung muss die tatsächliche neurale Bedrängung und Etage nennen.','The PDF thresholds are reference values and require local scientific review before approval. The imaging assessment should state actual neural compression and level.','آستانه‌های PDF مقادیر راهنما هستند و پیش از تأیید به بررسی علمی نیاز دارند. گزارش باید فشار واقعی بر ساختار عصبی و سطح درگیر را مشخص کند.'),
    },
  ],
  takeHome: L(['Signal an der Endplatte als Modic-Muster einordnen.','Bandscheibenverlagerung nach Morphologie und axialer Lage benennen.','Stenose nach Kompartiment beurteilen: Myelon in HWS/BWS, Duralsack und Cauda-equina-Wurzeln in der LWS.'], ['Classify endplate signal as a Modic pattern.','Describe disc displacement by morphology and axial location.','Assess stenosis by compartment: cord in the cervical/thoracic spine, thecal sac and cauda equina roots in the lumbar spine.'], ['سیگنال صفحه انتهایی را به‌صورت الگوی مودیک دسته‌بندی کنید.','جابه‌جایی دیسک را بر اساس مورفولوژی و محل آکسیال توصیف کنید.','تنگی را بر اساس کمپارتمان ارزیابی کنید: نخاع در نواحی گردنی/سینه‌ای، ساک دورال و ریشه‌های دم‌اسبی در ناحیه کمری.']),
  notice: L('Lernentwurf aus Wirbelsäule.pdf, Seiten 5–8. Die Abschnitte zu Spondylolisthesis und spinaler Ligamentossifikation auf S. 9–10 waren im extrahierten Text nicht ausreichend lesbar und sind nicht enthalten.', 'Draft based on Wirbelsäule.pdf, pages 5–8. The spondylolisthesis and spinal ligament ossification sections on pages 9–10 were not sufficiently legible in extracted text and are not included.', 'پیش‌نویس بر اساس صفحات ۵ تا ۸ فایل Wirbelsäule.pdf است. بخش‌های اسپوندیلولیستزیس و استخوانی‌شدن رباط‌های ستون فقرات در صفحات ۹ و ۱۰ از متن استخراج‌شده به‌اندازه کافی خوانا نبودند و در این درس نیامده‌اند.'),
  references: [
    { label: L('Nouri et al. MRI-Signal, Klinik und Operationsergebnis bei zervikaler DCM (2017)', 'Nouri et al. MRI signal, presentation and surgical outcome in cervical DCM (2017)', 'Nouri و همکاران. سیگنال MRI، تابلوی بالینی و پیامد جراحی در DCM گردنی (۲۰۱۷)'), url: 'https://doi.org/10.1097/BRS.0000000000002234' },
    { label: L('Li et al. Diagnostischer Wert von ZOOM-DWI bei zervikaler Myelopathie (2024)', 'Li et al. Diagnostic value of ZOOM-DWI in cervical myelopathy (2024)', 'Li و همکاران. ارزش تشخیصی ZOOM-DWI در میلوپاتی گردنی (۲۰۲۴)'), url: 'https://doi.org/10.1007/s00586-023-08110-8' },
    { label: L('AO Spine: Empfehlungen zur degenerativen zervikalen Myelopathie (2025)', 'AO Spine: Clinical recommendations for degenerative cervical myelopathy (2025)', 'AO Spine: توصیه‌های بالینی برای میلوپاتی دژنراتیو گردنی (۲۰۲۵)'), url: 'https://doi.org/10.1177/21925682251331050' },
  ],
}
