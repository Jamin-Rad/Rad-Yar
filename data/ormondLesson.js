const L = (de, en, fa) => ({ de, en, fa })

export const ORMOND_LESSON = {
  id: 'morbus-ormond',
  title: L('Morbus Ormond: Mantel und Harnleiter', 'Ormond disease: the mantle and the ureters', 'بیماری اورموند: بافت پیرامون عروق و حالب‌ها'),
  chapters: [
    { id: 'mantle', icon: 'mantle', title: L('Wo liegt der Weichteilmantel?', 'Where is the soft-tissue mantle?', 'بافت نرم پیرامون عروق کجا قرار دارد؟'),
      paragraphs: [
        L('Retroperitoneale Fibrose (RPF) bildet fibroinflammatorisches Gewebe um große Gefäße und kann die Harnleiter einbeziehen. „Morbus Ormond“ bezeichnet die idiopathische Form; ein passendes CT-Muster allein legt die Ursache noch nicht fest.', 'Retroperitoneal fibrosis (RPF) forms fibroinflammatory tissue around large vessels and may involve the ureters. Ormond disease refers to the idiopathic form; a compatible CT pattern alone does not establish the cause.', 'در فیبروز رتروپریتوئن (RPF)، بافت فیبروالتهابی پیرامون عروق بزرگ شکل می‌گیرد و ممکن است حالب‌ها را درگیر کند. بیماری اورموند به شکل ایدیوپاتیک گفته می‌شود؛ الگوی سازگار در CT به‌تنهایی علت را مشخص نمی‌کند.'),
        L('Suche zunächst an der infrarenalen Aorta, ihrer Bifurkation und den Iliakalgefäßen. Der Mantel kann nach kranial bis zu den Nierenhili und seitlich reichen. Eine anteriore/laterale Betonung und medial abgelenkte Harnleiter stützen das Muster; die hintere Aortenregion kann ausgespart bleiben.', 'Start at the infrarenal aorta, its bifurcation and the iliac vessels. The mantle can extend cranially to the renal hila and laterally. Anterior/lateral predominance and medially deviated ureters support the pattern; the posterior aortic region may be spared.', 'ابتدا آئورت زیرکلیوی، محل دوشاخه‌شدن آن و عروق ایلیاک را بررسی کنید. بافت ممکن است به‌سمت بالا تا ناف کلیه‌ها و به طرفین گسترش یابد. غلبهٔ بافت در جلو و طرفین آئورت و انحراف حالب‌ها به داخل از این الگو حمایت می‌کنند؛ ناحیهٔ خلف آئورت ممکن است حفظ شود.'),
      ],
      task: L('Im Quellenfall: erst den periaortalen Mantel, dann die Erweiterung beider oberen Harnwege suchen. Die vollständige Untersuchung ist hier nicht abgebildet.', 'In the source case, first locate the periaortic mantle, then the dilated upper urinary tracts on both sides. The complete examination is not shown here.', 'در کیس منبع، ابتدا بافت پیرامون آئورت و سپس اتساع قسمت فوقانی دستگاه ادراری در هر دو سمت را پیدا کنید. بررسی کامل در این شکل نمایش داده نشده است.'),
    },
    { id: 'ureters', icon: 'ureters', title: L('Welche Strukturen werden eingeengt?', 'Which structures are narrowed?', 'کدام ساختارها تنگ شده‌اند؟'),
      paragraphs: [
        L('Verfolge beide Ureteren durch den Mantel: Verlauf, Engstelle und vorgeschaltete Dilatation getrennt beschreiben. Eine beidseitige Hydroureteronephrose kann Ausdruck einer relevanten Abflussbehinderung sein; mit Nierenfunktion, Beschwerden und Voraufnahmen abgleichen und klinisch kommunizieren.', 'Trace both ureters through the mantle: describe course, narrowing and upstream dilatation separately. Bilateral hydroureteronephrosis may reflect important outflow obstruction; correlate with renal function, symptoms and prior imaging, and communicate the finding clinically.', 'هر دو حالب را در مسیر بافت دنبال کنید: مسیر، محل تنگی و اتساع بالادست را جداگانه توصیف کنید. هیدرواورترونفروز دوطرفه ممکن است نشانهٔ انسداد مهم خروج ادرار باشد؛ آن را با عملکرد کلیه، علائم و تصاویر قبلی تطبیق دهید و یافته را به تیم بالینی منتقل کنید.'),
        L('Auch die V. cava inferior kann ummauert oder komprimiert sein. Beurteile ihr Lumen und einen möglichen Thrombus; Beinschwellung oder eine Thrombose sind mögliche Folgen, aber aus der Ummauerung allein nicht bewiesen.', 'The inferior vena cava may also be encased or compressed. Assess its lumen and possible thrombus; leg oedema or thrombosis may result, but encasement alone proves neither.', 'ورید اجوف تحتانی نیز ممکن است احاطه یا فشرده شود. لومن و احتمال ترومبوس را بررسی کنید؛ ادم پا یا ترومبوز از پیامدهای ممکن‌اند، اما صرف احاطه‌شدن، هیچ‌کدام را ثابت نمی‌کند.'),
      ],
    },
    { id: 'activity', icon: 'activity', title: L('Was sagen CT und MRT über das Gewebe?', 'What do CT and MRI say about the tissue?', 'CT و MRI دربارهٔ بافت چه می‌گویند؟'),
      paragraphs: [
        L('Entzündlich-zellreiches Gewebe und kollagenreiche Fibrose bilden ein Kontinuum. Schmerzen sind unspezifisch; weder Enhancement noch ein einzelnes MR-Signal beweist ein bestimmtes Stadium oder die Ursache.', 'Inflammatory cellular tissue and collagen-rich fibrosis form a continuum. Pain is nonspecific; neither enhancement nor one MR signal proves a particular stage or cause.', 'بافت التهابیِ پرسلول و فیبروز غنی از کلاژن یک پیوستار می‌سازند. درد غیراختصاصی است؛ جذب مادهٔ حاجب یا یک سیگنال منفرد MRI، مرحله یا علت خاصی را ثابت نمی‌کند.'),
      ],
    },
    { id: 'mimics', icon: 'mimics', title: L('Was passt nicht zum typischen Muster?', 'What does not fit the typical pattern?', 'چه چیزی با الگوی تیپیک سازگار نیست؟'),
      paragraphs: [
        L('Eine RPF kann idiopathisch, IgG4-assoziiert oder sekundär sein. Medikamente, Infektionen, Trauma, Bestrahlung und Malignome gehören zur Ursachenabklärung. Die CT allein diagnostiziert weder eine IgG4-Erkrankung noch eine idiopathische Form.', 'RPF may be idiopathic, IgG4-related or secondary. Medication, infection, trauma, radiation and malignancy belong in the etiologic assessment. CT alone establishes neither IgG4-related disease nor an idiopathic cause.', 'RPF ممکن است ایدیوپاتیک، مرتبط با IgG4 یا ثانویه باشد. داروها، عفونت، تروما، پرتودرمانی و بدخیمی در بررسی علت مطرح‌اند. CT به‌تنهایی نه بیماری مرتبط با IgG4 و نه علت ایدیوپاتیک را تشخیص می‌دهد.'),
        L('Eine ausgeprägte Verdrängung der Aorta, zusätzliche Lymphknoten oder eine asymmetrische Raumforderung erweitern die Differenzialdiagnose. Auch ein typischer Mantel und eine nicht verlagerte Aorta schließen eine maligne Ursache nicht sicher aus; bei unklarer Konstellation weitere Abklärung empfehlen.', 'Marked aortic displacement, additional lymph nodes or an asymmetric mass broaden the differential. Even a typical mantle and an undisplaced aorta do not reliably exclude malignancy; recommend further assessment when the constellation is indeterminate.', 'جابجایی واضح آئورت، غدد لنفاوی اضافی یا تودهٔ نامتقارن، افتراق را گسترده‌تر می‌کنند. حتی بافت تیپیک پیرامون آئورت و نبود جابجایی آن نیز بدخیمی را با اطمینان رد نمی‌کنند؛ در مجموعهٔ یافته‌های نامعین، بررسی بیشتر را توصیه کنید.'),
      ],
    },
  ],
  modalityRows: [
    [L('CT', 'CT', 'CT'), L('Nativ oft muskelähnlich; Enhancement variabel. Stärkeres Enhancement kann eine entzündliche Komponente stützen, geringeres eine fibrotische.', 'Often muscle-like on unenhanced CT; enhancement varies. Greater enhancement can support an inflammatory component, and less enhancement a fibrotic component.', 'در CT بدون تزریق اغلب شبیه عضله است؛ جذب مادهٔ حاجب متغیر است. جذب بیشتر می‌تواند از جزء التهابی و جذب کمتر از جزء فیبروتیک حمایت کند.')],
    [L('T1 / T2', 'T1 / T2', 'T1 / T2'), L('Meist T1-arm. T2 kann bei Entzündung höher und bei kollagenreicher Fibrose niedriger sein; Verlauf und übrige Sequenzen mitbeurteilen.', 'Usually low T1 signal. T2 may be higher with inflammation and lower with collagen-rich fibrosis; assess the course and other sequences together.', 'سیگنال T1 معمولاً پایین است. T2 ممکن است در التهاب بالاتر و در فیبروز غنی از کلاژن پایین‌تر باشد؛ سیر و توالی‌های دیگر را هم بررسی کنید.')],
    [L('DWI / ADC', 'DWI / ADC', 'DWI / ADC'), L('DWI-Hyperintensität mit erniedrigtem ADC kann eine Restriktion zeigen. Überlappungen bleiben: kein universeller ADC-Grenzwert für Aktivität oder Gutartigkeit.', 'DWI hyperintensity with low ADC may show restriction. Overlap remains: there is no universal ADC cutoff for activity or benignity.', 'افزایش سیگنال DWI همراه با ADC پایین می‌تواند محدودیت انتشار را نشان دهد. هم‌پوشانی باقی می‌ماند: آستانهٔ همگانی ADC برای فعالیت یا خوش‌خیمی وجود ندارد.')],
  ],
  differentialRows: [
    [L('Lymphom / Metastasen', 'Lymphoma / metastases', 'لنفوم / متاستاز'), L('Zusätzliche Knoten, suprarenale Ausbreitung oder Verdrängung können auffallen. Richtung der Ureteren und Aortenlage sind Hinweise, keine sicheren Trenner.', 'Additional nodes, suprarenal extension or displacement may be present. Ureteral direction and aortic position provide clues, not reliable separation.', 'غدد اضافی، گسترش بالای کلیه یا جابجایی ممکن است دیده شوند. جهت حالب‌ها و موقعیت آئورت سرنخ‌اند و افتراق قطعی نمی‌دهند.')],
    [L('Inflammatorisches Aneurysma', 'Inflammatory aneurysm', 'آنوریسم التهابی'), L('Periaortale Reaktion zusammen mit erweitertem Aortenlumen beurteilen.', 'Assess the periaortic reaction together with dilatation of the aortic lumen.', 'واکنش پیرامون آئورت را همراه با اتساع لومن آن ارزیابی کنید.')],
    [L('Retroperitoneales Sarkom', 'Retroperitoneal sarcoma', 'سارکوم رتروپریتوئن'), L('Asymmetrie und stärkere Raumforderung können verdächtig sein; die Morphologie allein bestimmt die Histologie nicht.', 'Asymmetry and greater mass effect can be suspicious; morphology alone does not determine histology.', 'عدم تقارن و اثر فشاری بیشتر ممکن است مشکوک باشند؛ مورفولوژی به‌تنهایی بافت‌شناسی را تعیین نمی‌کند.')],
  ],
  question: {
    question: L('Ein periaortaler Mantel bezieht beide Ureteren ein; beide oberen Harnwege sind erweitert. Welche Aussage ist am besten begründet?', 'A periaortic mantle involves both ureters, with dilated upper urinary tracts on both sides. Which statement is best supported?', 'بافت پیرامون آئورت هر دو حالب را درگیر کرده و قسمت فوقانی دستگاه ادراری دوطرفه متسع است. کدام نتیجه بیش از همه پشتیبانی می‌شود؟'),
    options: [
      L('Das CT beweist eine idiopathische IgG4-Erkrankung.', 'CT proves idiopathic IgG4-related disease.', 'CT بیماری ایدیوپاتیک مرتبط با IgG4 را ثابت می‌کند.'),
      L('Eine obstruktive Folge ist möglich; Ursache und Nierenfunktion müssen mitbeurteilt werden.', 'An obstructive consequence is possible; the cause and renal function also require assessment.', 'پیامد انسدادی ممکن است؛ علت و عملکرد کلیه نیز باید بررسی شوند.'),
      L('Ohne Vorverlagerung der Aorta ist ein Lymphom ausgeschlossen.', 'Lymphoma is excluded if the aorta is not displaced anteriorly.', 'اگر آئورت به جلو جابجا نشده باشد، لنفوم رد می‌شود.'),
      L('Die Erweiterung beweist ein irreversibles Endstadium.', 'The dilatation proves an irreversible end stage.', 'اتساع، مرحلهٔ انتهایی برگشت‌ناپذیر را ثابت می‌کند.'),
    ],
    answer: 1,
    feedback: L('Der Mantel kann die Ureteren einengen und eine Abflussbehinderung erklären. Dokumentiere Ausmaß und Seiten, korreliere klinisch und halte die Ursache offen: weder IgG4-Status, Benignität noch Irreversibilität werden so bewiesen.', 'The mantle can narrow the ureters and account for outflow obstruction. Document extent and sides, correlate clinically and keep the cause open: this proves neither IgG4 status, benignity nor irreversibility.', 'این بافت می‌تواند حالب‌ها را تنگ و انسداد خروج ادرار را توضیح دهد. گستره و سمت‌ها را ثبت و با بالین تطبیق دهید و علت را باز نگه دارید: وضعیت IgG4، خوش‌خیمی یا برگشت‌ناپذیری با این یافته‌ها ثابت نمی‌شود.'),
  },
  cards: [
    [L('Was zuerst beschreiben?', 'What should be described first?', 'ابتدا چه چیزی را توصیف کنیم؟'), L('Lokalisation und Ausdehnung des Mantels, danach Gefäß- und Ureterbezug.', 'Mantle location and extent, then vessel and ureter involvement.', 'مکان و گسترهٔ بافت پیرامون عروق و سپس ارتباط آن با عروق و حالب‌ها.')],
    [L('Was bedeutet helle DWI?', 'What does bright DWI mean?', 'DWI روشن چه معنایی دارد؟'), L('Mit ADC abgleichen; Restriktion allein beweist weder Aktivität noch Gutartigkeit.', 'Compare with ADC; restriction alone proves neither activity nor benignity.', 'با ADC تطبیق دهید؛ محدودیت انتشار به‌تنهایی فعالیت یا خوش‌خیمی را ثابت نمی‌کند.')],
    [L('Welche Folge darf nicht fehlen?', 'Which consequence must not be missed?', 'کدام پیامد نباید از قلم بیفتد؟'), L('Harnwegsobstruktion beiderseits prüfen; venöses Lumen und möglichen Thrombus beurteilen.', 'Check urinary obstruction on both sides; assess venous lumen and possible thrombus.', 'انسداد ادراری را در هر دو سمت و لومن وریدی و احتمال ترومبوس را بررسی کنید.')],
  ],
  summary: [
    L('Mantel und Ausdehnung beschreiben, keine Ursache aus einem Bildzeichen festlegen.', 'Describe the mantle and extent; do not assign the cause from one sign.', 'بافت پیرامون عروق و گسترهٔ آن را توصیف کنید؛ از یک نشانه، علت را قطعی نکنید.'),
    L('Beide Ureteren und die V. cava bis zu den Folgen verfolgen.', 'Trace both ureters and the vena cava through to their consequences.', 'هر دو حالب و ورید اجوف را تا پیامدهای درگیری دنبال کنید.'),
    L('MR-Signale und Enhancement im Verlauf bewerten; maligne Mimikry bleibt möglich.', 'Interpret MR signals and enhancement over time; malignant mimics remain possible.', 'سیگنال‌های MRI و جذب مادهٔ حاجب را در سیر بررسی کنید؛ تقلید بدخیمی همچنان ممکن است.'),
  ],
  figure: {
    src: '/abdomen/ormond/ct-montage.png',
    sourceUrl: 'https://radiopaedia.org/cases/186508',
    sourceLabel: L('Originalfall auf Radiopaedia · rID186508', 'Original Radiopaedia case · rID186508', 'کیس اصلی در Radiopaedia · rID186508'),
    alt: L('CT-Montage aus Abdomen.pdf mit periaortalem Weichteilmantel und beidseits erweiterten oberen Harnwegen; axiale, koronare und sagittale Ansichten.', 'Source CT montage showing a periaortic soft-tissue mantle and dilated upper urinary tracts on both sides, with axial, coronal and sagittal views.', 'مونتاژ CT منبع با بافت نرم پیرامون آئورت و اتساع دوطرفهٔ قسمت فوقانی دستگاه ادراری در نماهای محوری، کرونال و ساژیتال.'),
    caption: L('Quellenfall: Abdomen.pdf, PDF S.96 / Druck S.95, rID186508. Achte auf den Mantel um distale Aorta/Iliakalgefäße und die beidseitige Harnwegserweiterung. Akquisitionsphasen und ein ADC sind in diesem Ausschnitt nicht dokumentiert.', 'Source case: Abdomen.pdf, PDF p.96 / printed p.95, rID186508. Identify the mantle around the distal aorta/iliac vessels and bilateral urinary dilatation. Acquisition phases and ADC are not documented in this extract.', 'کیس منبع: Abdomen.pdf، صفحهٔ PDF ۹۶ / چاپی ۹۵، rID186508. به بافت پیرامون آئورت دیستال/عروق ایلیاک و اتساع ادراری دوطرفه توجه کنید. فازهای اخذ تصویر و ADC در این برش مستند نشده‌اند.'),
  },
}

export const ORMOND_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [{
  id: `morbus-ormond-${lang}-01`, fach: 'abdomen', tags: ['morbus-ormond'],
  question: ORMOND_LESSON.question.question[lang],
  options: ORMOND_LESSON.question.options.map((value, index) => ({ id: String.fromCharCode(65 + index), text: value[lang] })),
  correct: 'B', explanation: ORMOND_LESSON.question.feedback[lang],
}]]))
