const L = (de, en, fa) => ({ de, en, fa })

const QUESTIONS = [
  {
    id: 'ilc-extent',
    question: L(
      'Bei histologisch gesichertem invasiv-lobulärem Karzinom zeigt die MRT neben der Indexläsion mehrere diskrete ipsilaterale NME-Areale. Was ist die wichtigste Konsequenz?',
      'In biopsy-proven invasive lobular carcinoma, MRI shows several subtle ipsilateral areas of NME in addition to the index lesion. What is the most important consequence?',
      'در کارسینوم لوبولار مهاجم اثبات‌شده با بیوپسی، MRI علاوه بر ضایعه اصلی چند ناحیه ظریف NME در همان پستان نشان می‌دهد. مهم‌ترین پیامد چیست؟'
    ),
    options: [
      L('Die Areale sind wegen der häufigen Multifokalität des ILC gezielt zu korrelieren und vor einer Therapieausweitung histologisch zu sichern.', 'Because ILC is often multifocal, the areas require targeted correlation and tissue confirmation before treatment is expanded.', 'به‌دلیل شیوع چندکانونی بودن ILC، این نواحی باید هدفمند تطبیق داده و پیش از گسترش درمان از نظر بافت‌شناسی تأیید شوند.'),
      L('NME ist beim ILC definitionsgemäß benigne und kann ignoriert werden.', 'NME is benign by definition in ILC and can be ignored.', 'NME در ILC طبق تعریف خوش‌خیم است و می‌توان آن را نادیده گرفت.'),
      L('Die MRT beweist bereits Multizentrizität; eine Gewebesicherung ist nie erforderlich.', 'MRI already proves multicentricity, so tissue confirmation is never required.', 'MRI چندمرکزی بودن را اثبات کرده است و هرگز نیازی به تأیید بافتی نیست.'),
      L('Alle Zusatzareale entsprechen wahrscheinlich Background Parenchymal Enhancement, da ILC nur als Mass wächst.', 'All additional areas probably represent background parenchymal enhancement because ILC grows only as a mass.', 'همه نواحی اضافی احتمالاً BPE هستند، زیرا ILC فقط به‌شکل Mass رشد می‌کند.'),
    ],
    correct: 'A',
    explanation: L('ILC kann multifokal, multizentrisch, bilateral oder als infiltratives NME auftreten. Zusätzliche MRT-Befunde können die Therapie verändern, müssen deshalb aber vor einer Ausweitung der Operation gezielt korreliert und nach Möglichkeit gesichert werden.', 'ILC may be multifocal, multicentric, bilateral or present as infiltrative NME. Additional MRI findings may alter treatment, but should be correlated and, where feasible, sampled before surgery is expanded.', 'ILC می‌تواند چندکانونی، چندمرکزی، دوطرفه یا به‌شکل NME نفوذی باشد. یافته‌های اضافی MRI ممکن است درمان را تغییر دهند، اما پیش از گسترش جراحی باید تطبیق داده و در صورت امکان نمونه‌برداری شوند.'),
    wrongExplanations: {
      B: L('NME ist eine Erscheinungsform des ILC und keineswegs automatisch benign. Entscheidend sind Verteilung, Muster, Voraufnahmen und gezielte Abklärung.', 'NME is a recognised presentation of ILC and is not automatically benign. Distribution, pattern, prior imaging and targeted work-up matter.', 'NME یکی از اشکال تظاهر ILC است و به‌طور خودکار خوش‌خیم نیست؛ توزیع، الگو، تصاویر قبلی و بررسی هدفمند اهمیت دارند.'),
      C: L('MRT ist hochsensitiv, aber nicht histologiespezifisch. Benigne proliferative Veränderungen können zusätzliche Anreicherungen verursachen; eine Therapieausweitung allein aufgrund ungesicherter MRT-Herde birgt Übertherapierisiko.', 'MRI is highly sensitive but not histology-specific. Benign proliferative change may cause additional enhancement, so expanding treatment on unverified MRI findings risks overtreatment.', 'MRI حساس است اما اختصاصی بافت‌شناسی نیست؛ تغییرات پرولیفراتیو خوش‌خیم نیز می‌توانند Enhancement ایجاد کنند و گسترش درمان بدون تأیید بافتی خطر بیش‌درمانی دارد.'),
      D: L('ILC kann als Mass, NME, Architekturstörung oder Kombination auftreten. Mehrere ipsilaterale Areale dürfen daher nicht pauschal als BPE abgetan werden.', 'ILC can present as a mass, NME, architectural distortion or a combination. Multiple ipsilateral areas therefore must not be dismissed as BPE.', 'ILC می‌تواند به‌شکل Mass، NME، دیستورشن معماری یا ترکیبی از آن‌ها ظاهر شود؛ بنابراین نواحی متعدد همان‌طرف نباید به‌سادگی BPE تلقی شوند.'),
    },
  },
  {
    id: 'mucinous-t2',
    question: L(
      'Eine ovale, relativ scharf begrenzte Mass ist deutlich T2-hyperintens und zeigt allmähliches persistentes Enhancement. Welche Aussage ist am treffendsten?',
      'An oval relatively circumscribed mass is markedly T2 hyperintense and shows gradual persistent enhancement. Which statement is most accurate?',
      'یک Mass بیضی با حاشیه نسبتاً واضح، در T2 بسیار پرسیگنال است و Enhancement تدریجی و Persistent دارد. کدام عبارت دقیق‌تر است؟'
    ),
    options: [
      L('Die Kombination beweist ein Fibroadenom.', 'The combination proves fibroadenoma.', 'این ترکیب فیبروآدنوم را اثبات می‌کند.'),
      L('Ein muzinöses Karzinom bleibt eine wichtige Differenzialdiagnose, weil Muzin T2-Hyperintensität und scheinbar benigne Morphologie verursachen kann.', 'Mucinous carcinoma remains an important differential because mucin can cause T2 hyperintensity and apparently benign morphology.', 'کارسینوم موسینوس همچنان تشخیص افتراقی مهمی است، زیرا موسین می‌تواند پرسیگنالی T2 و مورفولوژی ظاهراً خوش‌خیم ایجاد کند.'),
      L('Persistentes Enhancement schließt Malignität sicher aus.', 'Persistent enhancement safely excludes malignancy.', 'Enhancement از نوع Persistent بدخیمی را با اطمینان رد می‌کند.'),
      L('Ein T2-hyperintenser Tumor muss vollständig zystisch sein.', 'A T2-hyperintense tumour must be entirely cystic.', 'تومور پرسیگنال در T2 باید کاملاً کیستیک باشد.'),
    ],
    correct: 'B',
    explanation: L('Muzinreiche Karzinome können glatt begrenzt, sehr T2-hell und kinetisch relativ wenig suspekt erscheinen. Diese Merkmale sind deshalb nur im Gesamtkontext zu bewerten.', 'Mucin-rich carcinomas may be circumscribed, very T2 bright and kinetically less suspicious. These findings must therefore be interpreted in context.', 'کارسینوم‌های غنی از موسین می‌توانند با حاشیه واضح، بسیار پرسیگنال در T2 و از نظر کینتیک کمتر مشکوک باشند؛ بنابراین این ویژگی‌ها باید در مجموع تفسیر شوند.'),
    wrongExplanations: {
      A: L('Fibroadenome können so aussehen, das Muster ist aber nicht spezifisch. Ein neu aufgetretener oder wachsender Befund beziehungsweise eine Diskordanz zur Klinik erfordert weitere Abklärung.', 'Fibroadenomas may look like this, but the pattern is not specific. A new or enlarging finding or clinical discordance requires further assessment.', 'فیبروآدنوم می‌تواند چنین ظاهری داشته باشد، اما این الگو اختصاصی نیست؛ یافته جدید یا در حال رشد یا عدم تطابق بالینی نیازمند بررسی بیشتر است.'),
      C: L('Persistente Kinetik ist häufiger benign, besitzt aber keinen sicheren negativen Vorhersagewert. Auch muzinöse und andere Karzinome können persistent anreichern.', 'Persistent kinetics are more often benign but do not reliably exclude cancer. Mucinous and other carcinomas may also enhance persistently.', 'کینتیک Persistent بیشتر در ضایعات خوش‌خیم دیده می‌شود، اما بدخیمی را با اطمینان رد نمی‌کند؛ کارسینوم موسینوس و سایر بدخیمی‌ها نیز ممکن است چنین الگویی داشته باشند.'),
      D: L('T2-Hyperintensität zeigt einen hohen Wasser- oder Muzingehalt, nicht zwingend eine Zyste. Solide muzinöse Tumoren können deshalb sehr T2-hell sein.', 'T2 hyperintensity reflects water or mucin content, not necessarily a cyst. Solid mucinous tumours may therefore be very T2 bright.', 'پرسیگنالی T2 نشان‌دهنده محتوای آب یا موسین است، نه الزاماً کیست؛ بنابراین تومور جامد موسینوس نیز می‌تواند بسیار پرسیگنال باشد.'),
    },
  },
  {
    id: 'tnbc-mimic',
    question: L(
      'Welche MRT-Konstellation ist für ein triple-negatives Mammakarzinom besonders typisch, obwohl Teile der Morphologie benign wirken können?',
      'Which MRI constellation is particularly typical of triple-negative breast cancer even though parts of the morphology may appear benign?',
      'کدام مجموعه یافته MRI برای سرطان پستان سه‌گانه منفی تیپیک‌تر است، حتی اگر بخشی از مورفولوژی خوش‌خیم به نظر برسد؟'
    ),
    options: [
      L('Diffuse symmetrische BPE ohne abgrenzbare Läsion', 'Diffuse symmetric BPE without a discrete lesion', 'BPE منتشر و قرینه بدون ضایعه مشخص'),
      L('Nur lineares NME ohne Mass oder Nekrose', 'Linear NME only, without a mass or necrosis', 'فقط NME خطی بدون Mass یا نکروز'),
      L('Runde oder ovale Mass mit Thick Rim Enhancement, zentraler Nekrose und peritumoralem Ödem', 'A round or oval mass with thick rim enhancement, central necrosis and peritumoral oedema', 'Mass گرد یا بیضی با Thick Rim Enhancement، نکروز مرکزی و ادم پری‌تومورال'),
      L('Nicht anreichernde fetthaltige Mass mit kompletter Fettsuppression', 'A non-enhancing fat-containing mass with complete fat suppression', 'Mass چربی‌دار بدون Enhancement با سرکوب کامل چربی'),
    ],
    correct: 'C',
    explanation: L('TNBC manifestiert sich häufig als Mass mit runder/ovaler Form, teils relativ scharfem Rand, Thick Rim Enhancement, Nekrose, T2-Hyperintensität und peritumoralem Ödem. Gerade der scheinbar benigne Rand ist ein Fallstrick.', 'TNBC often presents as a round or oval mass, sometimes with a relatively circumscribed margin, thick rim enhancement, necrosis, T2 hyperintensity and peritumoral oedema. The apparently benign margin is a key pitfall.', 'TNBC اغلب به‌شکل Mass گرد یا بیضی، گاهی با حاشیه نسبتاً واضح، Thick Rim Enhancement، نکروز، پرسیگنالی T2 و ادم پری‌تومورال ظاهر می‌شود؛ حاشیه ظاهراً خوش‌خیم یک دام مهم است.'),
    wrongExplanations: {
      A: L('Symmetrische BPE ist normales hormonabhängiges Parenchym-Enhancement und kein typisches fokales TNBC-Muster.', 'Symmetric BPE is normal hormonally influenced parenchymal enhancement and is not a typical focal TNBC pattern.', 'BPE قرینه Enhancement طبیعی و وابسته به هورمون پارانشیم است و الگوی کانونی تیپیک TNBC محسوب نمی‌شود.'),
      B: L('TNBC erscheint häufiger als anreichernde Mass als ausschließlich als lineares NME. Das charakteristische Zusammenspiel aus Mass, Rim Enhancement und Nekrose fehlt hier.', 'TNBC more often appears as an enhancing mass than isolated linear NME. The characteristic combination of mass, rim enhancement and necrosis is absent.', 'TNBC بیشتر به‌شکل Mass دارای Enhancement دیده می‌شود تا NME خطی منفرد؛ ترکیب مشخص Mass، Rim Enhancement و نکروز در این گزینه وجود ندارد.'),
      D: L('Eine nicht anreichernde fetthaltige Läsion spricht eher für einen benignen fetthaltigen Befund. Sie erklärt weder den typischen TNBC-Phänotyp noch dessen Nekrose und peripheres Enhancement.', 'A non-enhancing fat-containing lesion favours a benign fat-containing finding and does not match the typical TNBC phenotype with necrosis and peripheral enhancement.', 'ضایعه چربی‌دار بدون Enhancement بیشتر به نفع یافته خوش‌خیم است و با فنوتیپ تیپیک TNBC شامل نکروز و Enhancement محیطی تطابق ندارد.'),
    },
  },
  {
    id: 'ibc-clinical',
    question: L(
      'Eine Patientin entwickelt innerhalb weniger Wochen Erythem, Peau d’orange und Schwellung einer Brust. Die MRT zeigt diffuse Hautverdickung, Ödem und heterogenes NME, aber keine dominante Mass. Welche Aussage ist richtig?',
      'Over several weeks, a patient develops erythema, peau d’orange and swelling of one breast. MRI shows diffuse skin thickening, oedema and heterogeneous NME but no dominant mass. Which statement is correct?',
      'بیماری طی چند هفته دچار اریتم، پوست پرتقالی و تورم یک پستان شده است. MRI ضخیم‌شدگی منتشر پوست، ادم و NME ناهمگن را بدون Mass غالب نشان می‌دهد. کدام عبارت درست است؟'
    ),
    options: [
      L('Ohne dominante Mass ist ein inflammatorisches Mammakarzinom ausgeschlossen.', 'Without a dominant mass, inflammatory breast cancer is excluded.', 'بدون Mass غالب، سرطان التهابی پستان رد می‌شود.'),
      L('Das Muster beweist eine bakterielle Mastitis; eine Biopsie ist unnötig.', 'The pattern proves bacterial mastitis, so biopsy is unnecessary.', 'این الگو ماستیت باکتریایی را اثبات می‌کند و بیوپسی لازم نیست.'),
      L('Die MRT allein stellt die Diagnose eines inflammatorischen Mammakarzinoms.', 'MRI alone establishes the diagnosis of inflammatory breast cancer.', 'MRI به‌تنهایی تشخیص سرطان التهابی پستان را قطعی می‌کند.'),
      L('Die klinische Konstellation bleibt hochsuspekt für inflammatorisches Mammakarzinom und verlangt rasche multimodale Abklärung mit Gewebesicherung und Staging.', 'The clinical constellation remains highly suspicious for inflammatory breast cancer and requires rapid multimodality assessment, tissue diagnosis and staging.', 'مجموعه یافته‌های بالینی همچنان به‌شدت به نفع سرطان التهابی پستان است و نیاز به بررسی سریع چندمودالیته، تأیید بافتی و مرحله‌بندی دارد.'),
    ],
    correct: 'D',
    explanation: L('IBC ist primär eine klinische Diagnose. Eine dominante Mass ist nicht erforderlich; diffuse Haut- und Parenchymveränderungen können im Vordergrund stehen. Bildgebung dient der Ausdehnung, Biopsieplanung und dem Staging.', 'IBC is primarily a clinical diagnosis. A dominant mass is not required; diffuse skin and parenchymal changes may predominate. Imaging maps extent, guides biopsy and supports staging.', 'IBC در درجه اول تشخیص بالینی است؛ وجود Mass غالب ضروری نیست و تغییرات منتشر پوست و پارانشیم ممکن است برجسته باشند. تصویربرداری برای تعیین وسعت، برنامه‌ریزی بیوپسی و مرحله‌بندی به‌کار می‌رود.'),
    wrongExplanations: {
      A: L('IBC kann ohne abgrenzbare Mass auftreten. Gerade die Kombination aus raschem klinischem Verlauf, Hautverdickung, Ödem und diffuser Anreicherung ist alarmierend.', 'IBC may occur without a discrete mass. Rapid clinical progression with skin thickening, oedema and diffuse enhancement is particularly concerning.', 'IBC می‌تواند بدون Mass مشخص باشد؛ ترکیب پیشرفت سریع بالینی، ضخیم‌شدگی پوست، ادم و Enhancement منتشر به‌ویژه هشداردهنده است.'),
      B: L('Mastitis ist eine wichtige Differenzialdiagnose, aber Bildgebung und Klinik überlappen. Bei suspektem Verlauf oder fehlender rascher Besserung darf die Gewebesicherung nicht unterbleiben.', 'Mastitis is an important differential, but clinical and imaging findings overlap. Suspicious evolution or lack of rapid improvement requires tissue diagnosis.', 'ماستیت تشخیص افتراقی مهمی است، اما یافته‌های بالینی و تصویربرداری همپوشانی دارند؛ سیر مشکوک یا عدم بهبود سریع نیازمند تأیید بافتی است.'),
      C: L('Die MRT zeigt Ausdehnung und geeignete Biopsieziele, kann IBC aber nicht allein beweisen. Klinik und Histologie bleiben erforderlich.', 'MRI shows extent and biopsy targets but cannot prove IBC by itself. Clinical assessment and histology remain necessary.', 'MRI وسعت و اهداف مناسب بیوپسی را نشان می‌دهد، اما به‌تنهایی IBC را اثبات نمی‌کند؛ ارزیابی بالینی و بافت‌شناسی ضروری‌اند.'),
    },
  },
  {
    id: 'paget-negative-mri',
    question: L(
      'Bei persistierender einseitiger ekzematöser Mamillenveränderung sind Mammographie und MRT ohne sicheren Malignitätsnachweis. Was ist der nächste entscheidende Schritt?',
      'A persistent unilateral eczematous nipple change is present, but mammography and MRI show no definite malignancy. What is the next decisive step?',
      'تغییر اگزمایی پایدار و یک‌طرفه نوک پستان وجود دارد، اما ماموگرافی و MRI بدخیمی قطعی نشان نمی‌دهند. گام تعیین‌کننده بعدی چیست؟'
    ),
    options: [
      L('Ausschließlich jährliche MRT-Kontrolle', 'Annual MRI follow-up only', 'فقط پیگیری سالانه با MRI'),
      L('Klinische Vollhautbiopsie der Mamille beziehungsweise Areola', 'Clinical full-thickness biopsy of the nipple or areola', 'بیوپسی تمام‌ضخامت بالینی از نوک پستان یا آرئول'),
      L('Keine weitere Abklärung, weil eine normale MRT Paget ausschließt', 'No further work-up because normal MRI excludes Paget disease', 'عدم بررسی بیشتر، زیرا MRI طبیعی بیماری پاژه را رد می‌کند'),
      L('ADC-Messung der kontralateralen Mamille', 'ADC measurement of the contralateral nipple', 'اندازه‌گیری ADC نوک پستان مقابل'),
    ],
    correct: 'B',
    explanation: L('Morbus Paget ist eine klinisch-pathologische Diagnose. Negative Bildgebung schließt die Erkrankung oder eine kleine zugrunde liegende DCIS-Komponente nicht sicher aus; die persistierende Läsion muss biopsiert werden.', 'Mammary Paget disease is a clinicopathological diagnosis. Negative imaging does not reliably exclude it or a small underlying DCIS component, so a persistent lesion requires biopsy.', 'بیماری پاژه یک تشخیص کلینیکوپاتولوژیک است. تصویربرداری منفی بیماری یا DCIS کوچک زمینه‌ای را با اطمینان رد نمی‌کند؛ بنابراین ضایعه پایدار باید بیوپسی شود.'),
    wrongExplanations: {
      A: L('Eine reine Verlaufskontrolle verzögert bei persistierend suspekter Mamillenveränderung die Diagnose. Die Gewebesicherung ist vorrangig.', 'Surveillance alone delays diagnosis in a persistently suspicious nipple lesion. Tissue diagnosis takes priority.', 'پیگیری صرف در تغییر پایدار و مشکوک نوک پستان تشخیص را به تأخیر می‌اندازد؛ تأیید بافتی اولویت دارد.'),
      C: L('MRT kann kleine epidermale oder duktale Tumorkomponenten übersehen. Ein negativer Befund besitzt deshalb keinen ausreichenden Ausschlusswert für Paget.', 'MRI may miss small epidermal or ductal tumour components and therefore cannot reliably exclude Paget disease.', 'MRI ممکن است اجزای کوچک اپیدرمی یا مجرایی تومور را از دست بدهد و برای رد بیماری پاژه کافی نیست.'),
      D: L('Der Vergleich beider Mamillen ist visuell hilfreich, eine ADC-Messung der Gegenseite ersetzt aber weder die klinische Untersuchung noch die Biopsie der erkrankten Seite.', 'Visual comparison of both nipples is useful, but contralateral ADC measurement does not replace clinical assessment or biopsy of the affected side.', 'مقایسه بصری دو نوک پستان مفید است، اما اندازه‌گیری ADC سمت مقابل جایگزین معاینه بالینی یا بیوپسی سمت مبتلا نیست.'),
    },
  },
  {
    id: 'metaplastic-discordance',
    question: L(
      'Eine rasch wachsende 7-cm-Mass zeigt heterogen hohes T2-Signal, Thick Rim Enhancement und große nekrotische Anteile. Die Stanzbiopsie ergibt nur „Nekrose und Entzündung“. Wie ist vorzugehen?',
      'A rapidly growing 7-cm mass shows heterogeneously high T2 signal, thick rim enhancement and large necrotic areas. Core biopsy reports only “necrosis and inflammation”. What should be done?',
      'یک Mass هفت سانتی‌متری با رشد سریع، سیگنال ناهمگن و بالا در T2، Thick Rim Enhancement و نواحی وسیع نکروز دارد. بیوپسی سوزنی فقط «نکروز و التهاب» گزارش می‌کند. اقدام مناسب چیست؟'
    ),
    options: [
      L('Der Befund ist radiologisch-pathologisch diskordant; aus dem vital anreichernden Anteil muss erneut gezielt Gewebe gewonnen werden.', 'The result is radiologic–pathologic discordant; repeat targeted sampling of the viable enhancing component is required.', 'یافته رادیولوژی و پاتولوژی ناسازگار است؛ باید از بخش زنده و دارای Enhancement نمونه‌برداری هدفمند مجدد انجام شود.'),
      L('Nekrose beweist einen Abszess, daher genügt Antibiotikatherapie ohne Kontrolle.', 'Necrosis proves an abscess, so antibiotics without follow-up are sufficient.', 'نکروز آبسه را اثبات می‌کند و آنتی‌بیوتیک بدون پیگیری کافی است.'),
      L('Die Größe spricht gegen ein metaplastisches Karzinom.', 'The size argues against metaplastic carcinoma.', 'اندازه بزرگ بر ضد کارسینوم متاپلاستیک است.'),
      L('Ein hoher T2-Signalanteil schließt ein solides Karzinom aus.', 'High T2 signal excludes a solid carcinoma.', 'سیگنال بالا در T2 کارسینوم جامد را رد می‌کند.'),
    ],
    correct: 'A',
    explanation: L('Metaplastische Karzinome können stark heterogen und nekrotisch sein. Eine Biopsie aus dem Zentrum kann nur Nekrose erfassen; bei Diskordanz ist eine erneute, auf vitales anreicherndes Gewebe gerichtete Probengewinnung erforderlich.', 'Metaplastic carcinomas may be markedly heterogeneous and necrotic. Central sampling may retrieve only necrosis; discordance requires repeat sampling directed at viable enhancing tissue.', 'کارسینوم متاپلاستیک می‌تواند بسیار ناهمگن و نکروتیک باشد. نمونه‌برداری مرکزی ممکن است فقط نکروز را نشان دهد؛ در صورت عدم تطابق باید از بافت زنده دارای Enhancement دوباره نمونه‌برداری شود.'),
    wrongExplanations: {
      B: L('Nekrose ist nicht spezifisch für einen Abszess und kommt bei aggressiven Tumoren vor. Ohne passende Klinik und radiologisch-pathologische Konkordanz darf die Abklärung nicht beendet werden.', 'Necrosis is not specific to abscess and occurs in aggressive tumours. Work-up must not stop without compatible clinical findings and radiologic–pathologic concordance.', 'نکروز اختصاصی آبسه نیست و در تومورهای تهاجمی نیز دیده می‌شود؛ بدون تطابق بالینی و رادیولوژی–پاتولوژی نباید بررسی متوقف شود.'),
      C: L('Metaplastische Karzinome präsentieren sich häufig als große, rasch wachsende Tumoren. Die Größe unterstützt daher den Verdacht eher, als dass sie ihn entkräftet.', 'Metaplastic carcinomas often present as large rapidly growing tumours. Size therefore supports rather than refutes concern.', 'کارسینوم متاپلاستیک اغلب به‌شکل تومور بزرگ و سریع‌الرشد ظاهر می‌شود؛ اندازه بزرگ شک را تقویت می‌کند نه اینکه رد کند.'),
      D: L('Hohes T2-Signal kann durch Nekrose, Zysten, Blutung oder Matrix innerhalb eines soliden Tumors entstehen. Es ist kein Ausschlusskriterium für Karzinom.', 'High T2 signal may arise from necrosis, cystic change, haemorrhage or matrix within a solid tumour and does not exclude carcinoma.', 'سیگنال بالای T2 می‌تواند از نکروز، تغییرات کیستیک، خونریزی یا ماتریکس درون تومور جامد ناشی شود و کارسینوم را رد نمی‌کند.'),
    },
  },
  {
    id: 'subtype-limits',
    question: L(
      'Welche Aussage zur Zuordnung eines Mammakarzinom-Subtyps anhand der MRT ist korrekt?',
      'Which statement about assigning a breast cancer subtype from MRI is correct?',
      'کدام عبارت درباره تعیین زیرنوع سرطان پستان بر اساس MRI درست است؟'
    ),
    options: [
      L('Thick Rim Enhancement beweist einen triple-negativen Rezeptorstatus.', 'Thick rim enhancement proves triple-negative receptor status.', 'Thick Rim Enhancement وضعیت گیرنده سه‌گانه منفی را اثبات می‌کند.'),
      L('Starke T2-Hyperintensität beweist ein reines muzinöses Karzinom.', 'Marked T2 hyperintensity proves pure mucinous carcinoma.', 'پرسیگنالی شدید T2 کارسینوم موسینوس خالص را اثبات می‌کند.'),
      L('Diffuses NME beweist ein invasiv-lobuläres Karzinom.', 'Diffuse NME proves invasive lobular carcinoma.', 'NME منتشر کارسینوم لوبولار مهاجم را اثبات می‌کند.'),
      L('MRT-Muster können einen Subtyp vermuten lassen, Rezeptorstatus und Histologie werden aber durch Gewebe bestimmt.', 'MRI patterns may suggest a subtype, but receptor status and histology are determined from tissue.', 'الگوهای MRI می‌توانند یک زیرنوع را مطرح کنند، اما وضعیت گیرنده‌ها و بافت‌شناسی با نمونه بافتی تعیین می‌شوند.'),
    ],
    correct: 'D',
    explanation: L('Bildmorphologische Muster überlappen erheblich. Die MRT beschreibt Läsion und Ausdehnung; Histologie und Immunhistochemie definieren den Subtyp.', 'Imaging appearances overlap substantially. MRI characterises the lesion and its extent; histology and immunohistochemistry define subtype.', 'ظاهرهای تصویربرداری همپوشانی زیادی دارند. MRI ضایعه و وسعت آن را مشخص می‌کند؛ زیرنوع با بافت‌شناسی و ایمونوهیستوشیمی تعیین می‌شود.'),
    wrongExplanations: {
      A: L('Rim Enhancement und Nekrose sind bei TNBC häufig, kommen aber auch bei anderen hochgradigen Karzinomen, Fettnekrose oder Entzündung vor. Sie bestimmen keinen Rezeptorstatus.', 'Rim enhancement and necrosis are common in TNBC but also occur in other high-grade cancers, fat necrosis and inflammation. They do not determine receptor status.', 'Rim Enhancement و نکروز در TNBC شایع‌اند، اما در بدخیمی‌های درجه بالا، نکروز چربی و التهاب نیز دیده می‌شوند و وضعیت گیرنده را تعیین نمی‌کنند.'),
      B: L('T2-Hyperintensität kann durch Muzin, Flüssigkeit, Nekrose oder Ödem entstehen. Sie unterscheidet weder sicher reine von gemischten muzinösen Formen noch Malignität von Benignität.', 'T2 hyperintensity may reflect mucin, fluid, necrosis or oedema. It cannot reliably distinguish pure from mixed mucinous disease or benign from malignant lesions.', 'پرسیگنالی T2 می‌تواند ناشی از موسین، مایع، نکروز یا ادم باشد و نوع خالص را از مختلط یا خوش‌خیمی را از بدخیمی با اطمینان جدا نمی‌کند.'),
      C: L('Diffuses oder segmentales NME kann bei ILC vorkommen, ist aber auch bei DCIS, invasivem NST-Karzinom und benignen Veränderungen möglich.', 'Diffuse or segmental NME may occur in ILC but also in DCIS, invasive NST carcinoma and benign change.', 'NME منتشر یا سگمنتال می‌تواند در ILC دیده شود، اما در DCIS، کارسینوم مهاجم NST و تغییرات خوش‌خیم نیز ممکن است.'),
    },
  },
  {
    id: 'reporting-integration',
    question: L(
      'Welche Befundstrategie ist bei einem bekannten besonderen Mammakarzinom am sinnvollsten?',
      'Which reporting strategy is most appropriate for a known special breast carcinoma?',
      'کدام راهبرد گزارش برای یک کارسینوم ویژه پستان شناخته‌شده مناسب‌تر است؟'
    ),
    options: [
      L('Nur die stärkste kinetische Kurve dokumentieren', 'Document only the most suspicious kinetic curve', 'فقط مشکوک‌ترین منحنی کینتیک را ثبت کنید'),
      L('Zuerst Läsionstyp und Morphologie, dann T2/DWI/Kinetik sowie multifokale, kontralaterale, kutane, thoraxwandnahe und nodale Ausdehnung systematisch integrieren', 'First define lesion type and morphology, then integrate T2/DWI/kinetics and systematically map multifocal, contralateral, cutaneous, chest-wall and nodal extent', 'ابتدا نوع ضایعه و مورفولوژی را تعیین کنید، سپس T2/DWI/کینتیک و وسعت چندکانونی، پستان مقابل، پوست، دیواره قفسه سینه و غدد لنفاوی را یکپارچه بررسی کنید'),
      L('Auf T2 und DWI verzichten, sobald die Histologie bekannt ist', 'Omit T2 and DWI once histology is known', 'پس از مشخص شدن بافت‌شناسی، T2 و DWI را کنار بگذارید'),
      L('Jeden zusätzlichen MRT-Herd ohne Korrelation als Tumor werten', 'Classify every additional MRI lesion as tumour without correlation', 'هر کانون اضافی MRI را بدون تطبیق تومور محسوب کنید'),
    ],
    correct: 'B',
    explanation: L('Die MRT soll nicht nur den bekannten Tumor wiederfinden, sondern seine Erscheinungsform und gesamte therapierelevante Ausdehnung abbilden. Zusatzbefunde werden multiparametrisch beurteilt und bei Konsequenz gezielt korreliert oder biopsiert.', 'MRI should not merely rediscover the known tumour; it should characterise its appearance and map all treatment-relevant extent. Additional findings require multiparametric assessment and targeted correlation or biopsy if they would change management.', 'MRI نباید فقط تومور شناخته‌شده را دوباره نشان دهد، بلکه باید ظاهر و تمام وسعت مؤثر بر درمان را مشخص کند. یافته‌های اضافی باید چندپارامتری ارزیابی و در صورت تأثیر بر درمان هدفمند تطبیق یا بیوپسی شوند.'),
    wrongExplanations: {
      A: L('Kinetik ist nur ein Zusatzparameter. Eine einzelne Kurve erfasst weder Morphologie noch diffuse Ausdehnung, Hautbefall oder Lymphknotenstatus.', 'Kinetics are only an adjunct. A single curve does not capture morphology, diffuse extent, skin involvement or nodal status.', 'کینتیک فقط معیار تکمیلی است؛ یک منحنی منفرد مورفولوژی، گسترش منتشر، درگیری پوست یا وضعیت غدد لنفاوی را نشان نمی‌دهد.'),
      C: L('T2 und DWI bleiben auch bei bekannter Histologie wichtig, etwa zur Erkennung von Muzin, Nekrose, Ödem, Diffusionsverhalten und vitalen Biopsiezielen.', 'T2 and DWI remain useful despite known histology, for example to identify mucin, necrosis, oedema, diffusion behaviour and viable biopsy targets.', 'T2 و DWI حتی با بافت‌شناسی شناخته‌شده برای شناسایی موسین، نکروز، ادم، رفتار دیفیوژن و اهداف زنده بیوپسی مهم‌اند.'),
      D: L('MRT ist sensitiv, aber Zusatzherde können benign sein. Ohne Second-look-Korrelation oder Gewebesicherung droht eine unnötige Therapieausweitung.', 'MRI is sensitive, but additional lesions may be benign. Without second-look correlation or tissue confirmation, treatment may be expanded unnecessarily.', 'MRI حساس است، اما کانون‌های اضافی ممکن است خوش‌خیم باشند؛ بدون تطبیق Second-look یا تأیید بافتی خطر گسترش غیرضروری درمان وجود دارد.'),
    },
  },
]

export const MAMMA_MRT_SPECIAL_CARCINOMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, QUESTIONS.map(item => ({
  id: `mamma-mrt-besondere-mammakarzinome-${lang}-${item.id}`,
  tags: ['mamma-mrt-besondere-mammakarzinome', 'mamma', 'mrt', 'mammakarzinom'],
  fach: 'mamma',
  question: item.question[lang],
  options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct,
  explanation: item.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id, text]) => [id, text[lang]])),
}))]))

const CARDS = [
  ['ILC', 'Warum ist die präoperative MRT beim invasiv-lobulären Karzinom besonders wertvoll?', 'Sie bildet die häufig infiltrative, multifokale, multizentrische oder bilaterale Ausdehnung besser ab als konventionelle Verfahren.', 'Zusätzliche Herde müssen vor einer Therapieausweitung gezielt korreliert und möglichst gesichert werden.', 'ILC', 'Why is preoperative MRI particularly valuable in invasive lobular carcinoma?', 'It better maps the often infiltrative, multifocal, multicentric or bilateral extent than conventional imaging.', 'Additional lesions require targeted correlation and, where possible, tissue confirmation before treatment is expanded.', 'ILC', 'چرا MRI پیش از عمل در کارسینوم لوبولار مهاجم اهمیت ویژه دارد؟', 'زیرا گسترش اغلب نفوذی، چندکانونی، چندمرکزی یا دوطرفه را بهتر از روش‌های متداول نشان می‌دهد.', 'پیش از گسترش درمان، کانون‌های اضافی باید هدفمند تطبیق داده و در صورت امکان تأیید بافتی شوند.'],
  ['ILC', 'Schließt eine nur geringe Kontrastmittelaufnahme ein invasiv-lobuläres Karzinom aus?', 'Nein. ILC kann diskret oder verzögert anreichern und als NME oder Architekturstörung imponieren.', 'Bei bekannter lobulärer Histologie ist die Suche nach subtiler Ausdehnung wichtiger als die stärkste Kurve.', 'ILC', 'Does weak enhancement exclude invasive lobular carcinoma?', 'No. ILC may enhance subtly or late and may present as NME or architectural distortion.', 'With known lobular histology, searching for subtle extent is more important than finding the strongest curve.', 'ILC', 'آیا Enhancement خفیف کارسینوم لوبولار مهاجم را رد می‌کند؟', 'خیر. ILC ممکن است Enhancement خفیف یا تأخیری داشته و به‌شکل NME یا دیستورشن معماری ظاهر شود.', 'در بافت‌شناسی لوبولار شناخته‌شده، جست‌وجوی وسعت ظریف از یافتن شدیدترین منحنی مهم‌تر است.'],
  ['Muzinös', 'Warum kann ein muzinöses Karzinom in T2 sehr hell erscheinen?', 'Extrazelluläre Muzinseen enthalten viel Wasser und erzeugen deshalb ein hohes T2-Signal.', 'Das Signal erklärt die Morphologie, beweist aber weder Benignität noch eine reine muzinöse Form.', 'Mucinous', 'Why can mucinous carcinoma appear very bright on T2?', 'Extracellular mucin pools contain abundant water and therefore produce high T2 signal.', 'The signal explains the appearance but proves neither benignity nor a pure mucinous subtype.', 'موسینوس', 'چرا کارسینوم موسینوس می‌تواند در T2 بسیار روشن باشد؟', 'مخازن موسین خارج‌سلولی حاوی آب فراوان‌اند و سیگنال T2 بالا ایجاد می‌کنند.', 'این سیگنال ظاهر ضایعه را توضیح می‌دهد، اما خوش‌خیمی یا نوع خالص موسینوس را اثبات نمی‌کند.'],
  ['Muzinös', 'Wie ist ein relativ hoher ADC bei einer T2-hellen, suspekten Mass zu bewerten?', 'Muzin kann die Diffusion weniger stark einschränken und den ADC erhöhen; die Morphologie und das Enhancement bleiben entscheidend.', 'Ein hoher ADC darf bei suspekter Gesamtkonstellation nicht isoliert zur Herabstufung führen.', 'Mucinous', 'How should a relatively high ADC be interpreted in a suspicious T2-bright mass?', 'Mucin may cause less restricted diffusion and a higher ADC; morphology and enhancement remain decisive.', 'A high ADC must not downgrade an otherwise suspicious lesion in isolation.', 'موسینوس', 'ADC نسبتاً بالا در یک Mass مشکوک و پرسیگنال در T2 چگونه تفسیر می‌شود؟', 'موسین می‌تواند محدودیت دیفیوژن کمتری ایجاد کرده و ADC را بالا ببرد؛ مورفولوژی و Enhancement همچنان تعیین‌کننده‌اند.', 'ADC بالا نباید به‌تنهایی باعث کاهش درجه یک ضایعه مشکوک شود.'],
  ['TNBC', 'Welcher morphologische Fallstrick ist beim triple-negativen Mammakarzinom besonders wichtig?', 'Der Tumor kann rund oder oval und relativ scharf begrenzt sein, obwohl er biologisch aggressiv ist.', 'Thick Rim Enhancement, Nekrose und peritumorales Ödem erhöhen in dieser Konstellation den Verdacht.', 'TNBC', 'Which morphological pitfall is particularly important in triple-negative breast cancer?', 'The tumour may be round or oval and relatively circumscribed despite aggressive biology.', 'Thick rim enhancement, necrosis and peritumoral oedema increase concern in this setting.', 'TNBC', 'کدام دام مورفولوژیک در سرطان پستان سه‌گانه منفی اهمیت ویژه دارد؟', 'تومور می‌تواند با وجود زیست‌شناسی تهاجمی، گرد یا بیضی و نسبتاً با حاشیه واضح باشد.', 'Thick Rim Enhancement، نکروز و ادم پری‌تومورال در این شرایط شک را افزایش می‌دهند.'],
  ['TNBC', 'Kann die MRT den triple-negativen Rezeptorstatus diagnostizieren?', 'Nein. Sie kann ein typisches Muster vermuten lassen; ER, PR und HER2 werden am Gewebe bestimmt.', 'TNBC ist ein immunhistochemischer Phänotyp und keine rein bildmorphologische Diagnose.', 'TNBC', 'Can MRI diagnose triple-negative receptor status?', 'No. MRI may suggest a typical pattern; ER, PR and HER2 are determined from tissue.', 'TNBC is an immunohistochemical phenotype, not a purely imaging diagnosis.', 'TNBC', 'آیا MRI می‌تواند وضعیت گیرنده سه‌گانه منفی را تشخیص دهد؟', 'خیر. MRI ممکن است الگوی تیپیک را مطرح کند، اما ER، PR و HER2 در نمونه بافتی تعیین می‌شوند.', 'TNBC یک فنوتیپ ایمونوهیستوشیمیایی است، نه تشخیص صرفاً تصویربرداری.'],
  ['IBC', 'Ist für die Diagnose eines inflammatorischen Mammakarzinoms eine dominante Mass erforderlich?', 'Nein. Rasch aufgetretenes Erythem, Ödem und Peau d’orange können mit diffuser Haut- und Parenchymanreicherung ohne dominante Mass einhergehen.', 'IBC ist primär klinisch definiert; Bildgebung zeigt Ausdehnung und Biopsieziele.', 'IBC', 'Is a dominant mass required to diagnose inflammatory breast cancer?', 'No. Rapid-onset erythema, oedema and peau d’orange may accompany diffuse skin and parenchymal enhancement without a dominant mass.', 'IBC is primarily defined clinically; imaging maps extent and biopsy targets.', 'IBC', 'آیا برای تشخیص سرطان التهابی پستان وجود Mass غالب ضروری است؟', 'خیر. اریتم، ادم و پوست پرتقالی با شروع سریع می‌توانند همراه با Enhancement منتشر پوست و پارانشیم بدون Mass غالب باشند.', 'IBC در درجه اول تشخیص بالینی است؛ تصویربرداری وسعت و اهداف بیوپسی را مشخص می‌کند.'],
  ['IBC', 'Welche MRT-Befunde unterstützen den Verdacht auf inflammatorisches Mammakarzinom?', 'Diffuse Hautverdickung und -anreicherung, T2-Ödem, verdickte Trabekel sowie diffuses oder heterogenes NME.', 'Mastitis kann ähnlich aussehen; bei suspekter Klinik sind rasche Gewebesicherung und Staging entscheidend.', 'IBC', 'Which MRI findings support inflammatory breast cancer?', 'Diffuse skin thickening and enhancement, T2 oedema, thickened trabeculae and diffuse or heterogeneous NME.', 'Mastitis may look similar; suspicious clinical findings require rapid tissue diagnosis and staging.', 'IBC', 'کدام یافته‌های MRI از سرطان التهابی پستان حمایت می‌کنند؟', 'ضخیم‌شدگی و Enhancement منتشر پوست، ادم T2، ضخیم‌شدگی ترابکول‌ها و NME منتشر یا ناهمگن.', 'ماستیت می‌تواند مشابه باشد؛ در بالین مشکوک، تأیید سریع بافتی و مرحله‌بندی ضروری است.'],
  ['Paget', 'Welche Rolle hat die MRT bei Morbus Paget der Mamille?', 'Sie sucht eine zugrunde liegende subareoläre Mass, DCIS-Komponente oder weitere intramammäre Ausdehnung.', 'Die Diagnose der Mamillenläsion selbst wird durch Biopsie gestellt; eine negative MRT schließt Paget nicht aus.', 'Paget', 'What is the role of MRI in mammary Paget disease?', 'It searches for an underlying subareolar mass, DCIS component or further intramammary extent.', 'The nipple lesion itself is diagnosed by biopsy; negative MRI does not exclude Paget disease.', 'پاژه', 'نقش MRI در بیماری پاژه نوک پستان چیست؟', 'برای یافتن Mass ساب‌آرئولار، جزء DCIS زمینه‌ای یا گسترش بیشتر داخل پستان استفاده می‌شود.', 'تشخیص ضایعه نوک پستان با بیوپسی است و MRI منفی بیماری پاژه را رد نمی‌کند.'],
  ['Metaplastisch', 'Welche MRT-Konstellation passt zu einem metaplastischen Mammakarzinom?', 'Eine große, rasch wachsende, heterogen T2-helle Mass mit Thick Rim Enhancement und ausgedehnten nekrotischen oder zystischen Anteilen.', 'Das Muster kann Abszess, Hämatom, Phyllodestumor oder Sarkom imitieren.', 'Metaplastic', 'Which MRI constellation fits metaplastic breast carcinoma?', 'A large rapidly growing heterogeneously T2-bright mass with thick rim enhancement and extensive necrotic or cystic components.', 'The pattern may mimic abscess, haematoma, phyllodes tumour or sarcoma.', 'متاپلاستیک', 'کدام مجموعه یافته MRI با کارسینوم متاپلاستیک پستان تطابق دارد؟', 'Mass بزرگ و سریع‌الرشد با پرسیگنالی ناهمگن T2، Thick Rim Enhancement و بخش‌های وسیع نکروتیک یا کیستیک.', 'این الگو می‌تواند آبسه، هماتوم، تومور فیلودس یا سارکوم را تقلید کند.'],
  ['Diskordanz', 'Was bedeutet „radiologisch-pathologische Diskordanz“ bei einer nekrotischen Mammaläsion?', 'Die Biopsie erklärt den suspekten Bildbefund nicht ausreichend, etwa weil nur Nekrose statt vitalem Tumor erfasst wurde.', 'Dann ist eine erneute gezielte Biopsie des vital anreichernden Anteils oder eine Exzision erforderlich.', 'Discordance', 'What does radiologic–pathologic discordance mean in a necrotic breast lesion?', 'The biopsy does not adequately explain the suspicious imaging finding, for example because only necrosis rather than viable tumour was sampled.', 'Repeat targeted biopsy of the viable enhancing component or excision is then required.', 'عدم تطابق', 'عدم تطابق رادیولوژی–پاتولوژی در ضایعه نکروتیک پستان به چه معناست؟', 'بیوپسی یافته مشکوک تصویربرداری را به‌خوبی توضیح نمی‌دهد؛ مثلاً فقط نکروز و نه تومور زنده نمونه‌برداری شده است.', 'در این حالت بیوپسی هدفمند مجدد از بخش زنده دارای Enhancement یا اکسیزیون لازم است.'],
  ['Integration', 'Welches Grundprinzip gilt für alle besonderen Mammakarzinome?', 'Kein einzelnes MRT-Merkmal ist histologiespezifisch; Morphologie, T2, Diffusion, Kinetik, Ausdehnung, Klinik und Pathologie werden gemeinsam bewertet.', 'Die MRT charakterisiert und kartiert – die Gewebeprobe definiert Histologie und Rezeptorstatus.', 'Integration', 'What principle applies to all special breast carcinomas?', 'No single MRI feature is histology-specific; morphology, T2, diffusion, kinetics, extent, clinical findings and pathology are integrated.', 'MRI characterises and maps disease; tissue defines histology and receptor status.', 'جمع‌بندی', 'کدام اصل برای همه کارسینوم‌های ویژه پستان صدق می‌کند؟', 'هیچ ویژگی منفرد MRI اختصاصی بافت‌شناسی نیست؛ مورفولوژی، T2، دیفیوژن، کینتیک، وسعت، بالین و پاتولوژی با هم ارزیابی می‌شوند.', 'MRI ضایعه را توصیف و نقشه‌برداری می‌کند؛ بافت‌شناسی و وضعیت گیرنده‌ها با نمونه بافتی تعیین می‌شوند.'],
]

export const MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARDS = CARDS.map((item, index) => ({
  id: `mamma-mrt-besondere-mammakarzinome-${String(index + 1).padStart(2, '0')}`,
  topicId: 'mamma-mrt-besondere-mammakarzinome',
  category: L(item[0], item[4], item[8]),
  front: L(item[1], item[5], item[9]),
  answer: L(item[2], item[6], item[10]),
  explanation: L(item[3], item[7], item[11]),
}))

export const MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARD_TOPIC = {
  id: 'mamma-mrt-besondere-mammakarzinome',
  area: 'Mamma',
  chapter: 'Bildgebung · MRT',
  icon: 'MR',
  iconImage: '/fach/mamma.png',
  color: '#be185d',
  href: '/flashcards/mamma-mrt-besondere-mammakarzinome',
  title: L('Mamma-MRT: Besondere Mammakarzinome', 'Breast MRI: Special Carcinomas', 'MRI پستان: کارسینوم‌های ویژه'),
  subtitle: L('ILC · muzinös · TNBC · inflammatorisch · Paget · metaplastisch', 'ILC · mucinous · TNBC · inflammatory · Paget · metaplastic', 'ILC · موسینوس · TNBC · التهابی · پاژه · متاپلاستیک'),
}
