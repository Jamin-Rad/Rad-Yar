// Primary coverage source: user-supplied Abdomen.pdf, physical pp. 8–10.
// The first draft used the earlier Word screenshot; the current source mapping and review evidence are in docs/lesson-quality/hemangioma-pilot.md.
const L = (de, en, fa) => ({ de, en, fa })

export const HEMANGIOMA_CHAPTERS = [
  {
    id: 'muster', icon: 'vessel',
    title: L('Das Muster erkennen', 'Recognise the pattern', 'الگو را بشناسید'),
    lead: L('Erst die Dynamik verstehen: außen beginnen, nach innen auffüllen, dem Blutpool folgen.', 'Start with the dynamics: begin at the edge, fill inward, follow the blood pool.', 'ابتدا الگوی دینامیک را بفهمید: شروع از محیط، پرشدن به‌سمت مرکز و پیروی از مخزن خون.'),
    blocks: [
      { type: 'text', text: L('Das Leberhämangiom ist eine gutartige vaskuläre Läsion mit kavernösen, blutgefüllten Räumen. Es ist die häufigste gutartige solide Leberläsion, bei Frauen häufiger und oft ein Zufallsbefund. Eine periphere Lage ist möglich, aber kein Diagnosekriterium.', 'Hepatic haemangioma is a benign vascular lesion with cavernous blood-filled spaces. It is the most common benign solid liver lesion, more frequent in women and often incidental. A peripheral location is possible but is not a diagnostic criterion.', 'همانژیوم کبدی ضایعه‌ای عروقی و خوش‌خیم با فضاهای کاورنوز پُر از خون است. شایع‌ترین ضایعه جامد خوش‌خیم کبد است، در زنان بیشتر دیده می‌شود و اغلب اتفاقی کشف می‌شود. قرارگیری محیطی ممکن است، اما معیار تشخیص نیست.') },
      { type: 'text', text: L('Im Ultraschall ist das klassische kleine Hämangiom homogen echoreich, scharf begrenzt, mit dorsaler Schallverstärkung und ohne Halo. In einer verfetteten Leber kann es relativ echoarm wirken. Fehlendes Dopplersignal schließt es wegen des langsamen Blutflusses nicht aus.', 'On ultrasound, a classic small haemangioma is homogeneously hyperechoic and sharply defined, with posterior enhancement and no halo. In a fatty liver it may appear relatively hypoechoic. Absent Doppler signal does not exclude it because flow is slow.', 'در سونوگرافی، همانژیوم کوچک تیپیک همگن و اکوژن است، مرز مشخص و تقویت صوتی خلفی دارد و هاله ندارد. در کبد چرب ممکن است نسبتاً هیپواکو باشد. نبود سیگنال داپلر به‌علت جریان آهسته، همانژیوم را رد نمی‌کند.') },
      { type: 'note', tone: 'warning', text: L('Sonographie allein genügt nach EASL nur bei typischem Befund unter 3 cm in gesunder Leber ohne Tumoranamnese. Bei Lebererkrankung, Tumoranamnese oder untypischem Befund ist kontrastverstärkte Charakterisierung nötig, z. B. mittels CEUS oder MRT.', 'Under EASL guidance, ultrasound alone is sufficient only for a typical lesion under 3 cm in a healthy liver without a cancer history. Liver disease, cancer history or atypical findings require contrast-enhanced characterisation, for example with CEUS or MRI.', 'طبق راهنمای EASL، سونوگرافی به‌تنهایی فقط برای ضایعه تیپیک کوچک‌تر از ۳ سانتی‌متر در کبد سالم و بدون سابقه سرطان کافی است. بیماری کبدی، سابقه سرطان یا یافته غیرتیپیک به بررسی با ماده حاجب، مثلاً CEUS یا MRI، نیاز دارد.') },
      { type: 'note', tone: 'key', text: L('Leitlinien unterscheiden sich beim Größenlimit: EASL 2016 nennt <3 cm; ACG 2024 <2 cm. Beide Grenzen gelten nur bei typischer Morphologie und passendem klinischem Kontext; nicht zu einem universellen Grenzwert zusammenziehen.', 'Guidelines differ on the size threshold: EASL 2016 uses <3 cm; ACG 2024 uses <2 cm. Both apply only with typical morphology and the appropriate clinical context; do not merge them into one universal cutoff.', 'حدّ اندازه در راهنماها متفاوت است: EASL 2016 کمتر از ۳ سانتی‌متر و ACG 2024 کمتر از ۲ سانتی‌متر را ذکر می‌کند. هر دو فقط با مورفولوژی تیپیک و زمینه بالینی مناسب کاربرد دارند؛ این دو حد را به یک آستانه همگانی تبدیل نکنید.') },
    ],
  },
  {
    id: 'dynamik', icon: 'scan',
    title: L('Die Kontrastphasen lesen', 'Read the contrast phases', 'فازهای کنتراست را بخوانید'),
    lead: L('Suchen Sie einzelne randständige Kontrastknoten und verfolgen Sie dieselbe Läsion durch die Phasen.', 'Find individual peripheral enhancing nodules and follow the same lesion through the phases.', 'ندول‌های مجزای جذب‌کننده کنتراست در محیط را پیدا کنید و همان ضایعه را در فازهای متوالی دنبال کنید.'),
    blocks: [
      { type: 'phaseDiagram' },
      { type: 'cases' },
      { type: 'table', headers: [L('Phase', 'Phase', 'فاز'), L('Typischer Befund', 'Typical finding', 'یافته تیپیک')], rows: [
        [L('Nativ', 'Unenhanced', 'بدون کنتراست'), L('Scharf begrenzt und gegenüber der Leber hypodens.', 'Well-defined and hypoattenuating to liver.', 'مرز مشخص و دانسیته کمتر از کبد.')],
        [L('Arteriell', 'Arterial', 'شریانی'), L('Diskontinuierliche periphere Knoten; ihre Anreicherung ähnelt dem Blutpool derselben Phase.', 'Discontinuous peripheral nodules; their enhancement resembles the blood pool in the same phase.', 'ندول‌های محیطی ناپیوسته؛ میزان جذب آن‌ها شبیه مخزن خون در همان فاز است.')],
        [L('Portalvenös / spät', 'Portal venous / delayed', 'پورتال‌ونوس / تأخیری'), L('Progressive zentripetale Auffüllung mit persistierender Anreicherung; bei großen Läsionen oft unvollständig.', 'Progressive centripetal fill-in with persistent enhancement; often incomplete in large lesions.', 'پرشدن تدریجی از محیط به مرکز با ماندگاری کنتراست؛ در ضایعات بزرگ اغلب کامل نمی‌شود.')],
      ] },
      { type: 'note', tone: 'key', text: L('Irisblendenphänomen bedeutet Auffüllung vom Rand zur Mitte. Maßstab ist der Blutpool, nicht zwingend die Leber: Das Hämangiom muss spät weder vollständig gefüllt noch homogen hyperdens sein.', 'The iris diaphragm phenomenon means inward filling from the edge. Use the blood pool as the reference, not necessarily the liver: delayed complete filling or homogeneous hyperattenuation is not required.', 'پدیده دیافراگم عنبیه یعنی پرشدن از محیط به مرکز. مرجع مقایسه، مخزن خون است و لزوماً کبد نیست؛ پرشدن کامل یا دانسیته بالای همگن در فاز تأخیری الزامی نیست.') },
      { type: 'note', tone: 'warning', text: L('Ein glatter, durchgehender Randsaum ist nicht dasselbe wie einzelne periphere Kontrastknoten. Bei Rim-Enhancement oder echtem Washout das typische Hämangiommuster kritisch hinterfragen.', 'A smooth continuous enhancing rim is different from separate peripheral nodules. Rim enhancement or true washout should prompt reassessment of a typical haemangioma diagnosis.', 'حاشیه صاف و پیوسته جذب کنتراست با ندول‌های مجزای محیطی یکسان نیست. در جذب حلقوی پیوسته یا washout واقعی، تشخیص همانژیوم تیپیک را دوباره بررسی کنید.') },
    ],
  },
  {
    id: 'mrt', icon: 'chart',
    title: L('T2 und Diffusion zusammen lesen', 'Read T2 and diffusion together', 'T2 و دیفیوژن را کنار هم بخوانید'),
    lead: L('Ein helles DWI-Bild allein beweist keine Diffusionsrestriktion.', 'A bright DWI image alone does not establish restricted diffusion.', 'روشن‌بودن DWI به‌تنهایی اثبات‌کننده محدودیت انتشار نیست.'),
    blocks: [
      { type: 'table', headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Worauf achten?', 'What to look for', 'به چه چیزی توجه کنید؟')], rows: [
        [L('T1 nativ', 'Unenhanced T1', 'T1 بدون کنتراست'), L('Meist hypo- bis isointens; allein wenig spezifisch.', 'Usually hypo- to isointense; nonspecific on its own.', 'معمولاً کم‌سیگنال تا هم‌سیگنال؛ به‌تنهایی غیراختصاصی است.')],
        [L('T2', 'T2', 'T2'), L('Typisch sehr signalreich, oft sogar heller als die Galle: Light-Bulb-Zeichen. Kleine Läsionen oft homogen, große durch Thromben oder Fibrose heterogen.', 'Typically markedly bright, often even brighter than bile: the light-bulb sign. Small lesions are often homogeneous; thrombus or fibrosis may make larger lesions heterogeneous.', 'به‌طور تیپیک بسیار پُرسیگنال و گاهی حتی روشن‌تر از صفرا: علامت لامپ روشن. ضایعات کوچک اغلب همگن‌اند؛ ترومبوز یا فیبروز می‌تواند ضایعات بزرگ‌تر را ناهمگن کند.')],
        [L('DWI + ADC', 'DWI + ADC', 'DWI + ADC'), L('DWI kann hell sein; ohne korrespondierend niedrigen ADC spricht das für T2-shine-through.', 'DWI may be bright; without a corresponding low ADC, this supports T2 shine-through.', 'DWI می‌تواند روشن باشد؛ بدون کاهش متناظر ADC، این الگو به نفع T2 shine-through است.')],
        [L('T1 dynamisch', 'Dynamic T1', 'T1 دینامیک'), L('Wie im CT: periphere Knoten, zentripetale Auffüllung und persistierende blutpoolähnliche Anreicherung.', 'As on CT: peripheral nodules, centripetal fill-in and persistent blood-pool-like enhancement.', 'مانند CT: ندول‌های محیطی، پرشدن به‌سمت مرکز و ماندگاری جذب شبیه مخزن خون.')],
      ] },
      { type: 'dwiDiagram' },
      { type: 'note', tone: 'warning', text: L('ADC ist ein ergänzender Befund, kein alleiniger Gutartigkeitsnachweis. Sehr helles T2-Signal und passende Mehrphasendynamik gemeinsam bewerten; Messwerte können sich mit anderen Läsionen überlappen.', 'ADC is supportive, not proof of benignity by itself. Assess marked T2 brightness together with compatible multiphasic enhancement; measurements can overlap with other lesions.', 'ADC یک یافته کمکی است و به‌تنهایی خوش‌خیمی را ثابت نمی‌کند. سیگنال بسیار بالای T2 را همراه الگوی چندفازی سازگار ارزیابی کنید؛ مقادیر اندازه‌گیری‌شده می‌توانند با ضایعات دیگر هم‌پوشانی داشته باشند.') },
    ],
  },
  {
    id: 'atypisch', icon: 'brain',
    title: L('Atypisch ist kein einheitliches Muster', 'Atypical is not one pattern', 'غیرتیپیک یک الگوی واحد نیست'),
    lead: L('Rasche Füllung und Sklerosierung sind zwei unterschiedliche Gründe für ein ungewohntes Bild.', 'Rapid filling and sclerosis are two different reasons for an unusual appearance.', 'پرشدن سریع و اسکلروز دو علت متفاوت برای ظاهر غیرمعمول‌اند.'),
    blocks: [
      { type: 'table', headers: [L('Variante', 'Variant', 'نوع'), L('Muster und Konsequenz', 'Pattern and implication', 'الگو و نتیجه')], rows: [
        [L('Flash-filling', 'Flash-filling', 'پرشدن سریع · Flash-filling'), L('Oft kleine Läsion: bereits arteriell homogen kräftig anreichernd. Später weiterhin dem Blutpool folgend; nicht allein aus der arteriellen Phase diagnostizieren.', 'Often a small lesion: already intensely and homogeneously enhancing in the arterial phase. It continues to follow the blood pool later; do not diagnose from the arterial phase alone.', 'اغلب ضایعه‌ای کوچک است که از همان فاز شریانی جذب شدید و همگن دارد. در فازهای بعد همچنان از مخزن خون پیروی می‌کند؛ فقط از روی فاز شریانی تشخیص ندهید.')],
        [L('Sklerosiert / hyalinisiert', 'Sclerosed / hyalinised', 'اسکلروزه / هیالینیزه'), L('Fibrose kann T2-Signal und Anreicherung vermindern; die typische Auffüllung kann fehlen. Kapselretraktion oder Verkalkung sind möglich. Die Abgrenzung zu Malignität kann schwierig bleiben.', 'Fibrosis may reduce T2 signal and enhancement; typical fill-in may be absent. Capsular retraction or calcification may occur. Distinction from malignancy may remain difficult.', 'فیبروز می‌تواند سیگنال T2 و جذب کنتراست را کاهش دهد و الگوی پرشدن تیپیک را از بین ببرد. فرورفتگی کپسول یا کلسیفیکاسیون ممکن است دیده شود. افتراق از بدخیمی می‌تواند دشوار بماند.')],
      ] },
      { type: 'note', tone: 'key', text: L('Seltene Fallberichte beschreiben eine echte Diffusionsrestriktion bei sklerosierten Hämangiomen. Das ist kein allgemeines Merkmal atypischer Hämangiome; daraus allein lässt sich die Diagnose nicht ableiten.', 'Rare case reports describe true restricted diffusion in sclerosing haemangiomas. This is not a general feature of atypical haemangiomas and cannot establish the diagnosis by itself.', 'در گزارش‌های موردی نادر، محدودیت واقعی انتشار در همانژیوم اسکلروزه توصیف شده است. این یافته ویژگی عمومی همانژیوم غیرتیپیک نیست و به‌تنهایی تشخیص را ثابت نمی‌کند.') },
      { type: 'note', tone: 'warning', text: L('„Atypisch“ bedeutet weder immer homogen arteriell hypervaskulär noch generell randständig diffusionsrestringiert. Bei fehlender eindeutiger Gesamtkonstellation den Befund als unklar einordnen und weiter charakterisieren.', '“Atypical” does not always mean homogeneous arterial hypervascularity or peripheral restricted diffusion. If the overall findings are not convincing, classify the lesion as indeterminate and characterise it further.', '«غیرتیپیک» نه همیشه به معنی جذب شریانی همگن است و نه به معنی محدودیت انتشار محیطی. اگر مجموعه یافته‌ها قانع‌کننده نیست، ضایعه را نامعین گزارش کنید و بررسی تکمیلی انجام دهید.') },
    ],
  },
  {
    id: 'anwenden', icon: 'case',
    title: L('Befundmuster sicher anwenden', 'Apply the imaging pattern', 'به‌کارگیری الگوی تصویربرداری'),
    lead: L('Benennen Sie das beobachtete Muster, bevor Sie die Diagnose formulieren.', 'Describe the observed pattern before giving the diagnosis.', 'پیش از بیان تشخیص، الگوی مشاهده‌شده را توصیف کنید.'),
    blocks: [
      { type: 'report', title: L('Beispiel bei klassischer MRT-Konstellation', 'Example with a classic MRI constellation', 'نمونه گزارش برای مجموعه یافته‌های تیپیک MRI'), text: L('Scharf begrenzte Läsion in Segment VII, T1-hypointens und deutlich T2-hyperintens. Diskontinuierliche periphere noduläre Kontrastmittelanreicherung mit progressiver zentripetaler Auffüllung und persistierendem blutpoolähnlichem Signal. Kein korrespondierend erniedrigter ADC. Bildmorphologisch typisches Leberhämangiom.', 'Well-defined segment VII lesion, T1 hypointense and markedly T2 hyperintense. Discontinuous peripheral nodular enhancement with progressive centripetal fill-in and persistent blood-pool-like signal. No corresponding low ADC. Imaging appearance typical of hepatic haemangioma.', 'ضایعه با حدود مشخص در سگمنت VII، با سیگنال پایین T1 و بسیار بالای T2. جذب ندولار محیطی ناپیوسته همراه با پرشدن تدریجی به‌سمت مرکز و ماندگاری سیگنال مشابه مخزن خون. کاهش متناظر ADC دیده نمی‌شود. نمای تصویربرداری تیپیک همانژیوم کبدی است.') },
      { type: 'quiz' },
    ],
  },
  {
    id: 'takehome', icon: 'spark', emphasis: true,
    title: L('Fünf Kernpunkte', 'Five key points', 'پنج نکتهٔ اصلی'),
    lead: L('Das Gesamtmuster zählt mehr als ein einzelnes helles Signal.', 'The overall pattern matters more than one bright signal.', 'مجموعه یافته‌ها از یک سیگنال روشن ارزشمندتر است.'),
    blocks: [{ type: 'summary', items: [
      L('Periphere diskontinuierliche Knoten mit zentripetaler Auffüllung erkennen.', 'Recognise discontinuous peripheral nodules with centripetal fill-in.', 'ندول‌های محیطی ناپیوسته با پرشدن به‌سمت مرکز را بشناسید.'),
      L('Die Anreicherung mit dem Blutpool derselben Phase vergleichen; komplette Füllung ist nicht obligat.', 'Compare enhancement with the blood pool in the same phase; complete filling is not mandatory.', 'جذب را با مخزن خون همان فاز مقایسه کنید؛ پرشدن کامل الزامی نیست.'),
      L('T2, DWI und ADC gemeinsam lesen; DWI-Helligkeit allein ist keine Restriktion.', 'Read T2, DWI and ADC together; DWI brightness alone is not restriction.', 'T2، DWI و ADC را با هم بخوانید؛ روشن‌بودن DWI به‌تنهایی محدودیت انتشار نیست.'),
      L('Flash-filling und sklerosierte Varianten unterscheiden; „atypisch“ hat kein Einheitsmuster.', 'Distinguish flash-filling from sclerosed variants; “atypical” has no single pattern.', 'نوع پرشدن سریع را از نوع اسکلروزه جدا کنید؛ «غیرتیپیک» الگوی واحدی ندارد.'),
      L('Sonographische Entwarnung nur im passenden klinischen Kontext und bei erfüllten Kriterien.', 'Accept ultrasound alone only in the appropriate clinical context with all criteria met.', 'فقط در زمینه بالینی مناسب و با احراز همه شرایط، به سونوگرافی تنها اکتفا کنید.'),
    ] }],
  },
]

export const HEMANGIOMA_COPY = {
  title: L('Leberhämangiom', 'Hepatic haemangioma', 'همانژیوم کبدی'),
  heroAlt: L('Schematische Darstellung einer vaskulären Leberläsion mit peripheren Gefäßräumen', 'Schematic of a vascular liver lesion with peripheral vascular spaces', 'نمای شماتیک ضایعه عروقی کبد با فضاهای عروقی محیطی'),
  ui: {
    path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), read: L('gelesen', 'read', 'خوانده‌شده'),
    mark: L('Abschnitt als gelesen markieren', 'Mark section as read', 'ثبت خواندن این بخش'), marked: L('Als gelesen markiert', 'Marked as read', 'خوانده شد'),
    continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامه درس'), fullMark: L('Alles als gelesen markieren', 'Mark all as read', 'ثبت خواندن کل درس'), fullMarked: L('Alles gelesen', 'All read', 'کل درس خوانده شد'),
    auth: L('Anmelden, um den Abschluss im Profil zu speichern.', 'Sign in to save lesson completion to your profile.', 'برای ذخیره پایان درس در پروفایل وارد شوید.'), login: L('Anmelden', 'Sign in', 'ورود'),
    mcq: L('MCQ starten', 'Start MCQs', 'شروع آزمون'), flashcards: L('Flashcards', 'Flashcards', 'فلش‌کارت‌ها'),
    key: L('Merke', 'Key point', 'نکته کلیدی'), warning: L('Cave', 'Caution', 'احتیاط'), sources: L('Quellen und Vertiefung', 'Sources and further reading', 'منابع و مطالعه بیشتر'),
    summary: L('Take Home', 'Take Home', 'جمع‌بندی'), breadcrumb: L('Leber', 'Liver', 'کبد'),
  },
  quiz: {
    title: L('Welche Beobachtung entscheidet?', 'Which observation is decisive?', 'کدام مشاهده تعیین‌کننده است؟'),
    stem: L('Eine T2-helle Läsion zeigt hohes DWI-Signal ohne erniedrigten ADC. Arteriell finden sich einzelne periphere Kontrastknoten, später zunehmend zentrale Füllung. Welche Einordnung passt am besten?', 'A T2-bright lesion has high DWI signal without low ADC. Arterial imaging shows separate peripheral enhancing nodules, followed by progressive inward filling. Which interpretation fits best?', 'ضایعه‌ای با T2 روشن، در DWI پُرسیگنال است اما ADC پایین ندارد. در فاز شریانی ندول‌های مجزای محیطی جذب کنتراست دارند و سپس ضایعه به‌تدریج به‌سمت مرکز پُر می‌شود. بهترین تفسیر چیست؟'),
    options: [
      L('Hämangiom mit T2-shine-through', 'Haemangioma with T2 shine-through', 'همانژیوم با T2 shine-through'),
      L('Metastase allein wegen des hohen DWI-Signals', 'Metastasis solely because DWI is bright', 'متاستاز فقط به‌علت روشن‌بودن DWI'),
      L('Abszess mit gesicherter Diffusionsrestriktion', 'Abscess with proven restricted diffusion', 'آبسه با محدودیت انتشار اثبات‌شده'),
      L('Keine Einordnung ohne vollständige Füllung', 'No interpretation possible without complete filling', 'بدون پرشدن کامل هیچ تفسیری ممکن نیست'),
    ], correct: 0,
    feedback: [
      L('Richtig: Dynamik, T2 und ADC passen gemeinsam zum Hämangiom. Helles DWI ohne niedrigen ADC spricht hier für shine-through.', 'Correct: the dynamics, T2 and ADC together support haemangioma. Bright DWI without low ADC supports shine-through here.', 'درست است: الگوی دینامیک، T2 و ADC در کنار هم به نفع همانژیوم‌اند. DWI روشن بدون ADC پایین در اینجا با shine-through سازگار است.'),
      L('DWI-Helligkeit allein reicht nicht: Der ADC ist nicht erniedrigt und die Dynamik ist typisch für ein Hämangiom.', 'DWI brightness alone is insufficient: ADC is not low and the dynamics are typical of haemangioma.', 'روشن‌بودن DWI کافی نیست؛ ADC پایین نیست و الگوی دینامیک برای همانژیوم تیپیک است.'),
      L('Eine Restriktion ist hier nicht belegt. Dafür wäre ein korrespondierend erniedrigter ADC nötig; die übrigen Befunde stützen ein Hämangiom.', 'Restriction is not established here. A corresponding low ADC would be needed; the other findings support haemangioma.', 'در اینجا محدودیت انتشار اثبات نشده است؛ کاهش متناظر ADC لازم است. سایر یافته‌ها به نفع همانژیوم‌اند.'),
      L('Vollständige Füllung ist nicht erforderlich. Progressive zentripetale Auffüllung mit passender T2-/ADC-Konstellation ist aussagekräftig.', 'Complete filling is not required. Progressive centripetal fill-in with compatible T2 and ADC findings is informative.', 'پرشدن کامل لازم نیست؛ پرشدن تدریجی به‌سمت مرکز همراه یافته‌های سازگار T2 و ADC ارزش تشخیصی دارد.'),
    ],
  },
}
