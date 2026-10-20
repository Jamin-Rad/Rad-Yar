// Reviewed alongside the pilot lesson; no legacy atypical-pattern claims retained.
const L = (de, en, fa) => ({ de, en, fa })
const ITEMS = [
  {
    question: L('Welche Beschreibung passt zum Leberhämangiom?', 'Which description fits a hepatic haemangioma?', 'کدام توصیف با همانژیوم کبدی سازگار است؟'),
    options: [
      L('Gutartige vaskuläre Läsion mit kavernösen blutgefüllten Räumen', 'Benign vascular lesion with cavernous blood-filled spaces', 'ضایعه عروقی خوش‌خیم با فضاهای کاورنوز پُر از خون'),
      L('Präkanzeröse hepatozelluläre Läsion', 'Premalignant hepatocellular lesion', 'ضایعه هپاتوسلولار پیش‌بدخیم'),
      L('Maligne Läsion allein aufgrund einer peripheren Lage', 'Malignant lesion solely because of a peripheral location', 'ضایعه بدخیم صرفاً به‌دلیل قرارگیری محیطی'),
      L('Immer eine Folge einer Leberzirrhose', 'Always a consequence of liver cirrhosis', 'همیشه پیامد سیروز کبدی'),
    ], correct: 'A', explanation: L('Ein Hämangiom ist eine gutartige vaskuläre Läsion. Weder periphere Lage noch Zirrhose sind Voraussetzung für die Diagnose.', 'A haemangioma is a benign vascular lesion. Neither peripheral location nor cirrhosis is required for diagnosis.', 'همانژیوم ضایعه‌ای عروقی و خوش‌خیم است. نه قرارگیری محیطی و نه سیروز، شرط تشخیص نیست.'),
  },
  {
    question: L('Wann genügt nach EASL die Sonographie allein für ein typisches Hämangiom?', 'When is ultrasound alone sufficient for a typical haemangioma under EASL guidance?', 'طبق EASL چه زمانی سونوگرافی به‌تنهایی برای همانژیوم تیپیک کافی است؟'),
    options: [
      L('Bei jedem echoreichen Herd unabhängig von der Anamnese', 'For any hyperechoic lesion regardless of history', 'برای هر ضایعه اکوژن، مستقل از سابقه بیمار'),
      L('Bei gesunder Leber ohne Tumoranamnese: unter 3 cm, homogen echoreich, scharf begrenzt, dorsale Verstärkung, kein Halo', 'In a healthy liver without cancer history: under 3 cm, homogeneously hyperechoic, well-defined, posterior enhancement, no halo', 'در کبد سالم و بدون سابقه سرطان: کوچک‌تر از ۳ سانتی‌متر، اکوژن و همگن، مرز مشخص، تقویت صوتی خلفی و بدون هاله'),
      L('Bei jeder Läsion unter 3 cm auch bei Zirrhose', 'For every lesion under 3 cm, including in cirrhosis', 'برای هر ضایعه کوچک‌تر از ۳ سانتی‌متر، حتی در سیروز'),
      L('Nur wenn im Doppler ein starkes Flusssignal vorliegt', 'Only if Doppler shows a strong flow signal', 'فقط اگر داپلر جریان شدید نشان دهد'),
    ], correct: 'B', explanation: L('EASL nennt <3 cm, ACG 2024 <2 cm. Beide Regeln verbinden Größe und typische Morphologie mit passendem klinischem Kontext; die Grenzwerte sind nicht austauschbar.', 'EASL uses <3 cm; ACG 2024 uses <2 cm. Both rules combine size and typical morphology with the appropriate clinical context; the thresholds are not interchangeable.', 'EASL حد کمتر از ۳ سانتی‌متر و ACG 2024 حد کمتر از ۲ سانتی‌متر را به‌کار می‌برد. هر دو اندازه و مورفولوژی تیپیک را با زمینه بالینی مناسب ترکیب می‌کنند؛ این آستانه‌ها جایگزین یکدیگر نیستند.'),
  },
  {
    question: L('Welche CT-Dynamik ist klassisch für ein Leberhämangiom?', 'Which CT enhancement pattern is classic for hepatic haemangioma?', 'کدام الگوی دینامیک CT برای همانژیوم کبدی تیپیک است؟'),
    options: [
      L('Glatter durchgehender Randsaum mit zentraler Nekrose', 'Smooth continuous enhancing rim with central necrosis', 'جذب حلقوی صاف و پیوسته با نکروز مرکزی'),
      L('Keine Anreicherung in sämtlichen Phasen', 'No enhancement in any phase', 'نبود جذب کنتراست در همه فازها'),
      L('Diskontinuierliche periphere Kontrastknoten mit progressiver zentripetaler Auffüllung', 'Discontinuous peripheral enhancing nodules with progressive centripetal fill-in', 'ندول‌های محیطی ناپیوسته جذب‌کننده کنتراست با پرشدن تدریجی به‌سمت مرکز'),
      L('Arterielle Anreicherung mit obligatem echtem Washout', 'Arterial enhancement with mandatory true washout', 'جذب شریانی همراه با washout واقعی الزامی'),
    ], correct: 'C', explanation: L('Entscheidend sind die einzelnen peripheren Knoten und ihre progressive Ausbreitung nach innen. Ein durchgehender Randsaum ist ein anderes Muster.', 'The key is separate peripheral nodules with progressive inward extension. A continuous enhancing rim is a different pattern.', 'ندول‌های مجزای محیطی و گسترش تدریجی جذب به‌سمت داخل مهم‌اند. حاشیه پیوسته جذب کنتراست الگوی متفاوتی است.'),
  },
  {
    question: L('Was beschreibt das Irisblendenphänomen?', 'What does the iris diaphragm phenomenon describe?', 'پدیده دیافراگم عنبیه چه چیزی را توصیف می‌کند؟'),
    options: [
      L('Kontrastverlust vom Zentrum nach außen', 'Loss of contrast from the centre outward', 'کاهش کنتراست از مرکز به محیط'),
      L('Bewegung des Herdes zwischen zwei Schichten', 'Movement of the lesion between two slices', 'حرکت ضایعه بین دو برش'),
      L('Immer vollständige Füllung in der arteriellen Phase', 'Always complete filling in the arterial phase', 'همیشه پرشدن کامل در فاز شریانی'),
      L('Zunehmende Kontrastfüllung vom Rand zur Mitte', 'Progressive contrast filling from the edge to the centre', 'پرشدن تدریجی با کنتراست از محیط به مرکز'),
    ], correct: 'D', explanation: L('Zentripetal bedeutet von außen nach innen. Die Geschwindigkeit variiert; besonders große Hämangiome können auch spät unvollständig gefüllt bleiben.', 'Centripetal means from the outside inward. Filling speed varies; large haemangiomas in particular may remain incompletely filled even on delayed images.', 'مرکزگرا، یعنی پرشدن از محیط به‌سمت مرکز. سرعت پرشدن متغیر است؛ به‌ویژه همانژیوم‌های بزرگ ممکن است حتی در تصاویر تأخیری هم کامل پُر نشوند.'),
  },
  {
    question: L('Welche MRT-Konstellation unterstützt ein klassisches Hämangiom am stärksten?', 'Which MRI constellation most strongly supports a classic haemangioma?', 'کدام مجموعه یافته MRI بیشترین حمایت را از همانژیوم تیپیک می‌کند؟'),
    options: [
      L('Sehr hohes T2-Signal zusammen mit peripher-nodulärer Anreicherung und zentripetaler Auffüllung', 'Marked T2 brightness with peripheral nodular enhancement and centripetal fill-in', 'سیگنال بسیار بالای T2 همراه جذب ندولار محیطی و پرشدن به‌سمت مرکز'),
      L('T1-Hypointensität als einziges Merkmal', 'T1 hypointensity as the only feature', 'سیگنال پایین T1 به‌عنوان تنها یافته'),
      L('Jedes hohe DWI-Signal unabhängig vom ADC', 'Any high DWI signal regardless of ADC', 'هر سیگنال بالای DWI مستقل از ADC'),
      L('Jede Läsion ohne messbaren Dopplerfluss', 'Any lesion without measurable Doppler flow', 'هر ضایعه بدون جریان قابل‌اندازه‌گیری داپلر'),
    ], correct: 'A', explanation: L('Das Light-Bulb-Zeichen ist ein wichtiger Hinweis, aber die passende Kontrastdynamik erhöht die diagnostische Aussage. Die übrigen Einzelbefunde sind unspezifisch.', 'The light-bulb sign is an important clue, and compatible enhancement dynamics add diagnostic value. The other isolated findings are nonspecific.', 'علامت لامپ روشن سرنخ مهمی است و الگوی سازگار جذب کنتراست ارزش تشخیصی را بیشتر می‌کند. سایر یافته‌های منفرد غیراختصاصی‌اند.'),
  },
  {
    question: L('Ein T2-heller Herd ist auf DWI hell, aber ohne korrespondierend niedrigen ADC. Beste Erklärung?', 'A T2-bright lesion is bright on DWI but has no corresponding low ADC. Best explanation?', 'ضایعه با T2 روشن در DWI نیز روشن است، اما کاهش متناظر ADC ندارد. بهترین توضیح چیست؟'),
    options: [
      L('Gesicherte Diffusionsrestriktion', 'Proven restricted diffusion', 'محدودیت انتشار اثبات‌شده'),
      L('T2-shine-through; DWI-Helligkeit allein beweist keine Restriktion', 'T2 shine-through; DWI brightness alone does not prove restriction', 'T2 shine-through؛ روشن‌بودن DWI به‌تنهایی محدودیت انتشار را ثابت نمی‌کند'),
      L('Sicherer Ausschluss jeder malignen Läsion', 'Definite exclusion of every malignant lesion', 'رد قطعی همه ضایعات بدخیم'),
      L('ADC ist bei Leberläsionen grundsätzlich irrelevant', 'ADC is always irrelevant in liver lesions', 'ADC در ضایعات کبدی اصولاً بی‌اهمیت است'),
    ], correct: 'B', explanation: L('T2-Signal kann das DWI-Bild mit aufhellen. Der ADC ergänzt die Beurteilung, beweist aber allein keine Gutartigkeit; Morphologie und Kontrastdynamik bleiben nötig.', 'T2 signal can contribute to DWI brightness. ADC supports assessment but does not prove benignity by itself; morphology and enhancement dynamics remain necessary.', 'سیگنال T2 می‌تواند در روشن‌شدن DWI نقش داشته باشد. ADC به ارزیابی کمک می‌کند، اما به‌تنهایی خوش‌خیمی را ثابت نمی‌کند؛ مورفولوژی و الگوی جذب کنتراست همچنان لازم‌اند.'),
  },
  {
    question: L('Womit vergleichen Sie die anreichernden Anteile eines Hämangioms in jeder Kontrastphase?', 'What is the reference for the enhancing parts of a haemangioma in each contrast phase?', 'در هر فاز، بخش‌های جذب‌کننده کنتراست همانژیوم را با چه چیزی مقایسه می‌کنید؟'),
    options: [
      L('Mit der Gallenblase unabhängig von der Phase', 'With the gallbladder regardless of phase', 'با کیسه صفرا مستقل از فاز'),
      L('Nur mit dem nativen Leberparenchym', 'Only with unenhanced liver parenchyma', 'فقط با پارانشیم کبد بدون کنتراست'),
      L('Mit dem Blutpool derselben Phase', 'With the blood pool in the same phase', 'با مخزن خون در همان فاز'),
      L('Nur mit der Milz einer früheren Untersuchung', 'Only with the spleen on a previous examination', 'فقط با طحال در بررسی قبلی'),
    ], correct: 'C', explanation: L('Die anreichernden Gefäßräume folgen typischerweise dem Blutpool. Eine späte Isointensität zur Leber oder vollständige zentrale Füllung ist nicht obligat.', 'The enhancing vascular spaces typically follow the blood pool. Delayed isointensity to liver or complete central filling is not mandatory.', 'فضاهای عروقی جذب‌کننده کنتراست معمولاً از مخزن خون پیروی می‌کنند. هم‌سیگنالی با کبد یا پرشدن کامل مرکز در فاز تأخیری الزامی نیست.'),
  },
  {
    question: L('Welche Aussage unterscheidet zwei atypische Varianten korrekt?', 'Which statement correctly distinguishes two atypical variants?', 'کدام عبارت دو نوع غیرتیپیک را درست تفکیک می‌کند؟'),
    options: [
      L('Alle atypischen Hämangiome haben einen niedrigen peripheren ADC.', 'All atypical haemangiomas have low peripheral ADC.', 'همه همانژیوم‌های غیرتیپیک ADC پایین محیطی دارند.'),
      L('Sklerosierung führt immer zu stärkerem T2-Signal.', 'Sclerosis always increases T2 signal.', 'اسکلروز همیشه سیگنال T2 را افزایش می‌دهد.'),
      L('Homogene arterielle Anreicherung allein beweist ein Hämangiom.', 'Homogeneous arterial enhancement alone proves haemangioma.', 'جذب شریانی همگن به‌تنهایی همانژیوم را ثابت می‌کند.'),
      L('Flash-filling kann früh homogen anreichern; Sklerosierung kann T2-Signal und Anreicherung vermindern.', 'Flash-filling may enhance homogeneously early; sclerosis may reduce T2 signal and enhancement.', 'نوع پرشدن سریع می‌تواند زود جذب همگن داشته باشد؛ اسکلروز می‌تواند سیگنال T2 و جذب را کاهش دهد.'),
    ], correct: 'D', explanation: L('„Atypisch“ bezeichnet kein gemeinsames Einzelmuster. Bei Flash-filling die späteren Blutpoolphasen prüfen; eine sklerosierte Läsion kann unklar bleiben und weitere Charakterisierung benötigen.', '“Atypical” does not describe one shared pattern. In flash-filling, check the later blood-pool phases; a sclerosed lesion may remain indeterminate and need further characterisation.', '«غیرتیپیک» یک الگوی مشترک واحد نیست. در نوع پرشدن سریع، فازهای بعدی را با مخزن خون مقایسه کنید؛ ضایعه اسکلروزه ممکن است نامعین بماند و به بررسی بیشتر نیاز داشته باشد.'),
  },
]

export const HEMANGIOMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, ITEMS.map((item, index) => ({
  id: `haemangiom-${lang}-${String(index + 1).padStart(2, '0')}`,
  tags: ['haemangiom'], fach: 'abdomen', question: item.question[lang],
  options: item.options.map((option, i) => ({ id: String.fromCharCode(65 + i), text: option[lang] })),
  correct: item.correct, explanation: item.explanation[lang],
}))]))

const category = L('Leberhämangiom', 'Hepatic haemangioma', 'همانژیوم کبدی')
const card = (id, front, answer, explanation) => ({ id: `haemangiom-${id}`, topicId: 'haemangiom', category, front, answer, explanation, diagram: null })
export const HEMANGIOMA_FLASHCARDS = [
  card('01-definition',
    L('Was ist ein Leberhämangiom?', 'What is a hepatic haemangioma?', 'همانژیوم کبدی چیست؟'),
    L('Eine gutartige vaskuläre Läsion mit kavernösen blutgefüllten Räumen.', 'A benign vascular lesion with cavernous blood-filled spaces.', 'ضایعه عروقی خوش‌خیم با فضاهای کاورنوز پُر از خون.'),
    L('Die Diagnose beruht auf dem passenden Gesamtmuster und dem klinischen Kontext.', 'Diagnosis depends on a compatible overall pattern and clinical context.', 'تشخیص بر مجموعه یافته‌های سازگار و زمینه بالینی تکیه دارد.')),
  card('02-epidemiologie',
    L('Welche gutartige solide Leberläsion ist am häufigsten?', 'What is the most common benign solid liver lesion?', 'شایع‌ترین ضایعه جامد خوش‌خیم کبد چیست؟'),
    L('Das Leberhämangiom.', 'Hepatic haemangioma.', 'همانژیوم کبدی.'),
    L('Oft ein Zufallsbefund, bei Frauen häufiger. Eine periphere Lage ist kein Diagnosekriterium.', 'Often incidental and more frequent in women. Peripheral location is not a diagnostic criterion.', 'اغلب اتفاقی کشف می‌شود و در زنان شایع‌تر است. قرارگیری محیطی معیار تشخیص نیست.')),
  card('03-sono-klassisch',
    L('Welche Größenlimits nennen EASL und ACG 2024 für eine typische sonographische Diagnose?', 'Which size thresholds do EASL and ACG 2024 use for a typical ultrasound diagnosis?', 'EASL و ACG 2024 برای تشخیص تیپیک با سونوگرافی چه حد اندازه‌ای ذکر می‌کنند؟'),
    L('EASL 2016: <3 cm; ACG 2024: <2 cm, jeweils nur bei passender typischer Morphologie und klinischem Kontext.', 'EASL 2016: <3 cm; ACG 2024: <2 cm, each only with appropriate typical morphology and clinical context.', 'EASL 2016: کمتر از ۳ سانتی‌متر؛ ACG 2024: کمتر از ۲ سانتی‌متر؛ هر کدام فقط با مورفولوژی تیپیک و زمینه بالینی مناسب.'),
    L('Bei Lebererkrankung, Tumoranamnese oder atypischem Befund kontrastverstärkt charakterisieren.', 'Use contrast-enhanced characterisation for liver disease, cancer history or atypical findings.', 'در بیماری کبدی، سابقه سرطان یا یافته غیرتیپیک، بررسی با ماده حاجب لازم است.')),
  card('04-ct-muster',
    L('Welches dynamische CT-Muster ist typisch?', 'Which dynamic CT pattern is typical?', 'کدام الگوی دینامیک CT تیپیک است؟'),
    L('Periphere diskontinuierliche Kontrastknoten mit progressiver zentripetaler Auffüllung.', 'Discontinuous peripheral enhancing nodules with progressive centripetal fill-in.', 'ندول‌های محیطی ناپیوسته جذب‌کننده کنتراست با پرشدن تدریجی به‌سمت مرکز.'),
    L('Nicht mit einem glatten durchgehenden Randsaum verwechseln.', 'Do not confuse this with a smooth continuous enhancing rim.', 'این الگو را با حاشیه صاف و پیوسته جذب کنتراست اشتباه نگیرید.')),
  card('05-iris',
    L('Was bedeutet Irisblendenphänomen?', 'What does the iris diaphragm phenomenon mean?', 'پدیده دیافراگم عنبیه یعنی چه؟'),
    L('Auffüllung vom Rand zur Mitte.', 'Filling from the edge to the centre.', 'پرشدن از محیط به مرکز.'),
    L('Die Füllung muss spät nicht vollständig sein, besonders bei großen Läsionen.', 'Delayed filling need not be complete, especially in large lesions.', 'پرشدن در فاز تأخیری، به‌ویژه در ضایعات بزرگ، لزوماً کامل نیست.')),
  card('06-t2',
    L('Was ist das Light-Bulb-Zeichen?', 'What is the light-bulb sign?', 'علامت لامپ روشن چیست؟'),
    L('Sehr hohes T2-Signal eines klassischen Hämangioms.', 'Marked T2 brightness of a classic haemangioma.', 'سیگنال بسیار بالای T2 در همانژیوم تیپیک.'),
    L('Ein hilfreicher Hinweis, aber zusammen mit der Kontrastdynamik bewerten.', 'A useful clue, but assess it together with enhancement dynamics.', 'سرنخ مفیدی است، اما باید همراه الگوی جذب کنتراست ارزیابی شود.')),
  card('07-dwi-adc',
    L('Helles DWI ohne niedrigen ADC: wie einordnen?', 'Bright DWI without low ADC: how to interpret it?', 'DWI روشن بدون ADC پایین را چگونه تفسیر می‌کنیم؟'),
    L('Bei T2-heller Läsion spricht das für T2-shine-through, nicht für bewiesene Restriktion.', 'In a T2-bright lesion this supports T2 shine-through, not proven restriction.', 'در ضایعه با T2 روشن، به نفع T2 shine-through است؛ محدودیت انتشار اثبات نشده است.'),
    L('ADC allein beweist keine Gutartigkeit; mit Morphologie und Dynamik kombinieren.', 'ADC alone does not prove benignity; combine it with morphology and dynamics.', 'ADC به‌تنهایی خوش‌خیمی را ثابت نمی‌کند؛ آن را با مورفولوژی و الگوی دینامیک ترکیب کنید.')),
  card('08-t1c-dynamik',
    L('Welche Referenz gilt für die Kontrastanreicherung?', 'What is the reference for enhancement?', 'مرجع مقایسه جذب کنتراست چیست؟'),
    L('Der Blutpool derselben Phase.', 'The blood pool in the same phase.', 'مخزن خون در همان فاز.'),
    L('Anreichernde Anteile folgen typischerweise dem Blutpool; sie müssen spät nicht isointens zur Leber sein.', 'Enhancing components typically follow the blood pool; they need not be isointense to liver on delayed images.', 'بخش‌های جذب‌کننده کنتراست معمولاً از مخزن خون پیروی می‌کنند؛ در فاز تأخیری لزوماً با کبد هم‌سیگنال نیستند.')),
  card('09-gross',
    L('Warum können große Hämangiome inhomogen sein?', 'Why may large haemangiomas be heterogeneous?', 'چرا همانژیوم‌های بزرگ ممکن است ناهمگن باشند؟'),
    L('Durch Thromben, Fibrose und gelegentlich Verkalkungen.', 'Because of thrombus, fibrosis and occasional calcification.', 'به‌علت ترومبوز، فیبروز و گاهی کلسیفیکاسیون.'),
    L('Das T2-Signal und die Füllung können dadurch heterogen bleiben; fehlende komplette Füllung allein beweist keine Malignität.', 'T2 signal and filling may remain heterogeneous; incomplete filling alone does not prove malignancy.', 'به همین دلیل سیگنال T2 و پرشدن می‌توانند ناهمگن بمانند؛ پرشدن ناقص به‌تنهایی بدخیمی را ثابت نمی‌کند.')),
  card('10-atypisch-definition',
    L('Wie unterscheiden sich Flash-filling und Sklerosierung?', 'How do flash-filling and sclerosis differ?', 'نوع پرشدن سریع و نوع اسکلروزه چه تفاوتی دارند؟'),
    L('Flash-filling: früh homogen kräftig anreichernd. Sklerosierung: oft weniger T2-Signal und weniger typische Anreicherung.', 'Flash-filling: early intense homogeneous enhancement. Sclerosis: often reduced T2 signal and less typical enhancement.', 'پرشدن سریع: جذب شدید و همگن زودرس. اسکلروز: اغلب کاهش سیگنال T2 و الگوی جذب کمتر تیپیک.'),
    L('Atypische Hämangiome haben kein einheitliches Muster. Eine unklare Läsion nicht allein durch dieses Etikett für gutartig erklären.', 'Atypical haemangiomas have no single pattern. Do not declare an indeterminate lesion benign merely by using this label.', 'همانژیوم‌های غیرتیپیک الگوی واحدی ندارند. فقط با این برچسب، ضایعه نامعین را خوش‌خیم اعلام نکنید.')),
]
