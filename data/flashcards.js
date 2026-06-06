export const FLASHCARD_TOPICS = [
  {
    id: 'meniskus',
    area: 'MSK',
    chapter: 'Knie',
    icon: '🦵',
    iconImage: '/fach/msk.png',
    color: '#f97316',
    href: '/flashcards/meniskus',
    title: {
      de: 'Meniskus',
      en: 'Meniscus',
      fa: 'منیسک',
    },
    subtitle: {
      de: 'Anatomie · MRT-Grading · Rissdiagnostik · Therapie',
      en: 'Anatomy · MRI grading · tear criteria · therapy',
      fa: 'آناتومی · گریدینگ MRI · تشخیص پارگی · درمان',
    },
  },
]

export const FLASHCARDS = [
  {
    id: 'meniskus-01-innenmeniskus-mobilitaet',
    topicId: 'meniskus',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: {
      de: 'Warum ist der Innenmeniskus häufiger verletzt als der Außenmeniskus?',
      en: 'Why is the medial meniscus injured more often than the lateral meniscus?',
      fa: 'چرا منیسک داخلی بیشتر از منیسک خارجی آسیب می‌بیند؟',
    },
    answer: {
      de: 'Wegen geringerer Mobilität.',
      en: 'Because it is less mobile.',
      fa: 'به علت تحرک کمتر.',
    },
    explanation: {
      de: 'Der Innenmeniskus ist fest mit der Gelenkkapsel und dem medialen Kollateralband verbunden. Dadurch kann er Scherkräften schlechter ausweichen. Der Außenmeniskus ist beweglicher und deshalb weniger verletzungsanfällig.',
      en: 'The medial meniscus is firmly attached to the joint capsule and the medial collateral ligament. Therefore, it cannot escape shear forces as well. The lateral meniscus is more mobile and therefore less prone to injury.',
      fa: 'منیسک داخلی به کپسول مفصلی و رباط جانبی داخلی متصل است. به همین دلیل در برابر نیروهای برشی کمتر می‌تواند جابه‌جا شود. منیسک خارجی متحرک‌تر است و کمتر دچار پارگی می‌شود.',
    },
    diagram: {
      de: 'Innenmeniskus = fixiert → weniger mobil → häufiger Riss\nAußenmeniskus = beweglicher → seltener Riss',
      en: 'Medial meniscus = fixed → less mobile → more tears\nLateral meniscus = more mobile → fewer tears',
      fa: 'منیسک داخلی = ثابت‌تر → تحرک کمتر → پارگی بیشتر\nمنیسک خارجی = متحرک‌تر → پارگی کمتر',
    },
  },
  {
    id: 'meniskus-02-hinterhorn',
    topicId: 'meniskus',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: {
      de: 'Welcher Teil des Innenmeniskus reißt am häufigsten?',
      en: 'Which part of the medial meniscus tears most often?',
      fa: 'کدام بخش منیسک داخلی بیشتر پاره می‌شود؟',
    },
    answer: { de: 'Hinterhorn.', en: 'Posterior horn.', fa: 'شاخ خلفی.' },
    explanation: {
      de: 'Das Hinterhorn des Innenmeniskus ist mechanisch stark belastet und relativ wenig mobil. In der MRT-Befundung sollte es deshalb besonders sorgfältig beurteilt werden.',
      en: 'The posterior horn of the medial meniscus is exposed to high mechanical stress and is relatively immobile. Therefore, it should be assessed carefully on MRI.',
      fa: 'شاخ خلفی منیسک داخلی فشار مکانیکی زیادی تحمل می‌کند و تحرک کمی دارد. بنابراین در گزارش MRI باید با دقت بیشتری بررسی شود.',
    },
  },
  {
    id: 'meniskus-03-degeneration-vs-riss',
    topicId: 'meniskus',
    category: { de: 'MRT-Grading', en: 'MRI grading', fa: 'گریدینگ MRI' },
    front: {
      de: 'Was ist der wichtigste Unterschied zwischen intrameniskaler Degeneration und echtem Meniskusriss im MRT?',
      en: 'What is the most important MRI difference between intrameniscal degeneration and a true meniscal tear?',
      fa: 'مهم‌ترین تفاوت MRI بین دژنراسیون داخل منیسک و پارگی واقعی چیست؟',
    },
    answer: { de: 'Oberflächenkontakt.', en: 'Surface contact.', fa: 'تماس با سطح مفصلی.' },
    explanation: {
      de: 'Eine Degeneration zeigt ein Signal innerhalb des Meniskus, aber ohne sicheren Kontakt zur Gelenkfläche. Ein echter Riss liegt vor, wenn das Signal die superiore oder inferiore Meniskusoberfläche erreicht.',
      en: 'Degeneration shows signal inside the meniscus without definite contact with the articular surface. A true tear is present when the signal reaches the superior or inferior meniscal surface.',
      fa: 'در دژنراسیون، سیگنال داخل منیسک دیده می‌شود اما تماس قطعی با سطح مفصلی ندارد. پارگی واقعی زمانی مطرح است که سیگنال به سطح فوقانی یا تحتانی منیسک برسد.',
    },
    diagram: {
      de: 'Degeneration = Signal bleibt innen\nRiss = Signal erreicht Oberfläche',
      en: 'Degeneration = signal stays inside\nTear = signal reaches surface',
      fa: 'دژنراسیون = سیگنال داخل منیسک می‌ماند\nپارگی = سیگنال به سطح می‌رسد',
    },
  },
  {
    id: 'meniskus-04-grad-iii',
    topicId: 'meniskus',
    category: { de: 'MRT-Grading', en: 'MRI grading', fa: 'گریدینگ MRI' },
    front: {
      de: 'Welches MRT-Kriterium macht eine Meniskusläsion zu Grad III?',
      en: 'Which MRI criterion makes a meniscal lesion grade III?',
      fa: 'کدام معیار MRI یک ضایعه منیسک را به درجه III تبدیل می‌کند؟',
    },
    answer: { de: 'Signal erreicht die Gelenkoberfläche.', en: 'Signal reaches the articular surface.', fa: 'رسیدن سیگنال به سطح مفصلی.' },
    explanation: {
      de: 'Grad I und II sind intrameniskale Signalveränderungen ohne sicheren Oberflächenkontakt. Grad III bedeutet, dass das Signal bis zur Gelenkfläche reicht.',
      en: 'Grades I and II are intrameniscal signal changes without definite surface contact. Grade III means that the signal reaches the articular surface.',
      fa: 'درجه I و II تغییرات سیگنال داخل منیسک هستند بدون تماس قطعی با سطح. درجه III یعنی سیگنال به سطح مفصلی می‌رسد.',
    },
  },
  {
    id: 'meniskus-05-two-slice-touch',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Warum ist die Two-slice-touch-Regel wichtig?',
      en: 'Why is the two-slice-touch rule important?',
      fa: 'چرا قانون Two-slice-touch مهم است؟',
    },
    answer: { de: 'Sie erhöht die Spezifität.', en: 'It increases specificity.', fa: 'اختصاصیت را افزایش می‌دهد.' },
    explanation: {
      de: 'Ein Oberflächenkontakt auf nur einer Schicht kann durch Partialvolumeneffekt oder Artefakt entstehen. Wenn der Kontakt auf mindestens zwei aufeinanderfolgenden Schichten sichtbar ist, ist ein echter Meniskusriss wahrscheinlicher.',
      en: 'Surface contact on only one slice may be caused by partial volume effect or artifact. If the contact is visible on at least two consecutive slices, a true meniscal tear is more likely.',
      fa: 'تماس سطحی فقط در یک برش ممکن است ناشی از آرتیفکت یا Partial volume باشد. اگر تماس در حداقل دو برش متوالی دیده شود، احتمال پارگی واقعی بیشتر است.',
    },
  },
  {
    id: 'meniskus-06-grad-2b-vs-3',
    topicId: 'meniskus',
    category: { de: 'MRT-Grading', en: 'MRI grading', fa: 'گریدینگ MRI' },
    front: {
      de: 'Grad 2b vs. Grad III: Was ist der praktische Unterschied?',
      en: 'Grade 2b vs. grade III: what is the practical difference?',
      fa: 'تفاوت عملی درجه 2b و درجه III چیست؟',
    },
    answer: {
      de: 'Grad 2b: nur eine Schicht. Grad III: mindestens zwei Schichten.',
      en: 'Grade 2b: one slice only. Grade III: at least two slices.',
      fa: '2b: فقط یک برش. III: حداقل دو برش.',
    },
    explanation: {
      de: 'Bei Grad 2b sieht man eventuell einen Kontakt zur Oberfläche, aber nur auf einem einzelnen Bild. Grad III braucht reproduzierbaren Oberflächenkontakt auf mehreren Schichten.',
      en: 'In grade 2b, possible surface contact is seen only on a single image. Grade III requires reproducible surface contact on multiple slices.',
      fa: 'در درجه 2b تماس احتمالی با سطح فقط در یک تصویر دیده می‌شود. برای درجه III باید تماس سطحی در چند برش تکرارپذیر باشد.',
    },
  },
  {
    id: 'meniskus-07-sagittale-form',
    topicId: 'meniskus',
    category: { de: 'MRT-Basis', en: 'MRI basics', fa: 'مبانی MRI' },
    front: {
      de: 'Welche Form hat ein normaler Meniskus im sagittalen MRT?',
      en: 'What shape does a normal meniscus have on sagittal MRI?',
      fa: 'منیسک طبیعی در MRI ساژیتال چه شکلی دارد؟',
    },
    answer: { de: 'Dreieckig.', en: 'Triangular.', fa: 'مثلثی.' },
    explanation: {
      de: 'Der normale Meniskus erscheint homogen dunkel und dreieckig. Wenn die normale Dreiecksform verloren geht, sollte man an Deformierung, Dislokation oder komplexe Rissbildung denken.',
      en: 'A normal meniscus appears homogeneously dark and triangular. Loss of the normal triangular shape suggests deformity, displacement, or complex tearing.',
      fa: 'منیسک طبیعی به صورت هموژن تیره و مثلثی دیده می‌شود. از بین رفتن شکل مثلثی می‌تواند نشانه دفورمیتی، جابه‌جایی یا پارگی کمپلکس باشد.',
    },
  },
  {
    id: 'meniskus-08-hypointens',
    topicId: 'meniskus',
    category: { de: 'MRT-Basis', en: 'MRI basics', fa: 'مبانی MRI' },
    front: {
      de: 'Was bedeutet ein homogen hypointenser Meniskus im MRT?',
      en: 'What does a homogeneously hypointense meniscus mean on MRI?',
      fa: 'منیسک هموژن هیپواینتنس در MRI به چه معناست؟',
    },
    answer: { de: 'Normalbefund.', en: 'Normal finding.', fa: 'یافته طبیعی.' },
    explanation: {
      de: 'Gesunder Faserknorpel enthält wenig freies Wasser und erscheint deshalb dunkel. Signalanhebungen müssen immer nach Oberflächenkontakt beurteilt werden.',
      en: 'Healthy fibrocartilage contains little free water and therefore appears dark. Any increased signal must be assessed for surface contact.',
      fa: 'فیبروغضروف سالم آب آزاد کمی دارد و به همین دلیل تیره دیده می‌شود. هر افزایش سیگنال باید از نظر تماس با سطح بررسی شود.',
    },
  },
  {
    id: 'meniskus-09-pd-fs',
    topicId: 'meniskus',
    category: { de: 'MRT-Basis', en: 'MRI basics', fa: 'مبانی MRI' },
    front: {
      de: 'Welche MRT-Sequenz ist besonders hilfreich für Meniskusrisse?',
      en: 'Which MRI sequence is especially useful for meniscal tears?',
      fa: 'کدام سکانس MRI برای پارگی منیسک بسیار مفید است؟',
    },
    answer: { de: 'PD-fs.', en: 'PD-fs.', fa: 'PD-fs.' },
    explanation: {
      de: 'PD-fs und T2-gewichtete Sequenzen zeigen Flüssigkeit und Ödem gut. Ein Riss wird häufig als signalreiche Linie sichtbar, besonders wenn Flüssigkeit in den Defekt eintritt.',
      en: 'PD-fs and T2-weighted sequences show fluid and edema well. A tear often appears as a high-signal line, especially when fluid enters the defect.',
      fa: 'سکانس‌های PD-fs و T2 مایع و ادم را خوب نشان می‌دهند. پارگی معمولاً به صورت خط پرسیگنال دیده می‌شود، به‌خصوص وقتی مایع وارد شکاف شود.',
    },
  },
  {
    id: 'meniskus-10-schnittdicke',
    topicId: 'meniskus',
    category: { de: 'MRT-Basis', en: 'MRI basics', fa: 'مبانی MRI' },
    front: {
      de: 'Warum sollte die MRT-Schnittdicke beim Knie nicht zu groß sein?',
      en: 'Why should MRI slice thickness in the knee not be too large?',
      fa: 'چرا ضخامت برش MRI زانو نباید زیاد باشد؟',
    },
    answer: { de: 'Sonst werden kleine Risse übersehen.', en: 'Small tears may be missed.', fa: 'پارگی‌های کوچک ممکن است دیده نشوند.' },
    explanation: {
      de: 'Bei zu dicken Schichten können kleine Risse durch Partialvolumeneffekt verschwinden oder unscharf wirken. Eine Schnittdicke von etwa 3 mm verbessert die Beurteilbarkeit kleiner meniskaler Defekte.',
      en: 'If slices are too thick, small tears may disappear or look blurred due to partial volume effect. A slice thickness of about 3 mm improves detection of small meniscal defects.',
      fa: 'اگر برش‌ها خیلی ضخیم باشند، پارگی‌های کوچک به علت Partial volume ممکن است محو یا نامشخص شوند. ضخامت حدود ۳ میلی‌متر تشخیص ضایعات کوچک منیسک را بهتر می‌کند.',
    },
  },
  {
    id: 'meniskus-11-rote-zone',
    topicId: 'meniskus',
    category: { de: 'Vaskularisation', en: 'Vascularity', fa: 'خون‌رسانی' },
    front: {
      de: 'Welche Meniskuszone hat die beste Heilungschance?',
      en: 'Which meniscal zone has the best healing potential?',
      fa: 'کدام ناحیه منیسک بهترین شانس ترمیم را دارد؟',
    },
    answer: { de: 'Rote Zone.', en: 'Red zone.', fa: 'ناحیه قرمز.' },
    explanation: {
      de: 'Die rote Zone liegt kapselnah und ist gut vaskularisiert. Risse in dieser Zone haben die beste Chance zu heilen und sind eher für eine Meniskusnaht geeignet.',
      en: 'The red zone is close to the capsule and well vascularized. Tears in this zone have the best chance to heal and are more suitable for repair.',
      fa: 'ناحیه قرمز نزدیک کپسول است و خون‌رسانی خوبی دارد. پارگی‌های این ناحیه شانس ترمیم بیشتری دارند و برای بخیه مناسب‌تر هستند.',
    },
  },
  {
    id: 'meniskus-12-zentrale-risse',
    topicId: 'meniskus',
    category: { de: 'Vaskularisation', en: 'Vascularity', fa: 'خون‌رسانی' },
    front: {
      de: 'Warum heilen zentrale Meniskusrisse schlecht?',
      en: 'Why do central meniscal tears heal poorly?',
      fa: 'چرا پارگی‌های مرکزی منیسک بد ترمیم می‌شوند؟',
    },
    answer: { de: 'Wegen fehlender Vaskularisation.', en: 'Because of absent vascularity.', fa: 'به علت نبود خون‌رسانی.' },
    explanation: {
      de: 'Die zentrale weiße Zone ist avaskulär. Dort fehlen Blutversorgung und biologische Heilungskapazität. Deshalb ist eine Naht in dieser Zone weniger erfolgversprechend.',
      en: 'The central white zone is avascular. It lacks blood supply and biological healing capacity. Therefore, repair in this zone is less promising.',
      fa: 'ناحیه سفید مرکزی بدون عروق است. در این ناحیه خون‌رسانی و توان بیولوژیک ترمیم وجود ندارد. بنابراین بخیه در این محل معمولاً موفقیت کمتری دارد.',
    },
    diagram: {
      de: 'Rote Zone = Blutversorgung gut → Naht möglich\nWeiße Zone = avaskulär → schlechte Heilung',
      en: 'Red zone = good blood supply → repair possible\nWhite zone = avascular → poor healing',
      fa: 'ناحیه قرمز = خون‌رسانی خوب → بخیه ممکن\nناحیه سفید = بدون عروق → ترمیم ضعیف',
    },
  },
  {
    id: 'meniskus-13-naht',
    topicId: 'meniskus',
    category: { de: 'Therapie', en: 'Treatment', fa: 'درمان' },
    front: {
      de: 'Wann ist eine Meniskusnaht besonders sinnvoll?',
      en: 'When is meniscal repair especially useful?',
      fa: 'چه زمانی بخیه منیسک به‌خصوص مناسب است؟',
    },
    answer: { de: 'Frischer Riss in der roten Zone.', en: 'Fresh tear in the red zone.', fa: 'پارگی تازه در ناحیه قرمز.' },
    explanation: {
      de: 'Eine Naht lohnt sich besonders bei peripheren, frischen und stabil rekonstruierbaren Rissen. Entscheidend sind Durchblutung, Rissform, Alter des Risses und mechanische Stabilität.',
      en: 'Repair is especially useful for peripheral, fresh, and stable repairable tears. Important factors are vascularity, tear pattern, tear age, and mechanical stability.',
      fa: 'بخیه بیشتر برای پارگی‌های محیطی، تازه و قابل‌ترمیم مناسب است. خون‌رسانی، شکل پارگی، سن پارگی و پایداری مکانیکی اهمیت دارند.',
    },
  },
  {
    id: 'meniskus-14-save-meniscus',
    topicId: 'meniskus',
    category: { de: 'Therapie', en: 'Treatment', fa: 'درمان' },
    front: {
      de: 'Was ist das Therapieprinzip bei Meniskusrissen?',
      en: 'What is the treatment principle for meniscal tears?',
      fa: 'اصل درمان در پارگی منیسک چیست؟',
    },
    answer: { de: 'Save the Meniscus.', en: 'Save the meniscus.', fa: 'Save the Meniscus.' },
    explanation: {
      de: 'Meniskusgewebe ist wichtig für Lastverteilung und Knorpelschutz. Eine großzügige Meniskektomie erhöht langfristig das Arthroserisiko. Deshalb gilt: so viel erhalten wie möglich, so wenig resezieren wie nötig.',
      en: 'Meniscal tissue is important for load distribution and cartilage protection. Extensive meniscectomy increases the long-term risk of osteoarthritis. Therefore: preserve as much as possible, resect as little as necessary.',
      fa: 'بافت منیسک برای توزیع نیرو و حفاظت از غضروف مهم است. منیسککتومی وسیع در طولانی‌مدت خطر آرتروز را افزایش می‌دهد. بنابراین باید تا حد امکان حفظ و فقط به مقدار لازم برداشته شود.',
    },
  },
  {
    id: 'meniskus-15-double-pcl',
    topicId: 'meniskus',
    category: { de: 'Rissformen', en: 'Tear patterns', fa: 'انواع پارگی' },
    front: {
      de: 'Welcher Riss ist typisch für ein Double-PCL-Sign?',
      en: 'Which tear is typical for the double PCL sign?',
      fa: 'کدام نوع پارگی با علامت Double PCL مرتبط است؟',
    },
    answer: { de: 'Korbhenkelriss.', en: 'Bucket-handle tear.', fa: 'پارگی Bucket-handle.' },
    explanation: {
      de: 'Beim Korbhenkelriss ist ein länglicher Meniskusanteil in den Interkondylarraum disloziert. Dieses Fragment kann parallel zum hinteren Kreuzband liegen und dadurch wie ein zweites PCL wirken.',
      en: 'In a bucket-handle tear, an elongated meniscal fragment is displaced into the intercondylar notch. This fragment may lie parallel to the posterior cruciate ligament and mimic a second PCL.',
      fa: 'در پارگی Bucket-handle، یک قطعه بلند از منیسک به داخل ناچ بین‌کندیلی جابه‌جا می‌شود. این قطعه ممکن است موازی PCL قرار گیرد و شبیه PCL دوم دیده شود.',
    },
  },
  {
    id: 'meniskus-16-absent-bow-tie',
    topicId: 'meniskus',
    category: { de: 'Rissformen', en: 'Tear patterns', fa: 'انواع پارگی' },
    front: {
      de: 'Was bedeutet ein fehlendes Bow-tie-Sign?',
      en: 'What does an absent bow-tie sign suggest?',
      fa: 'نبود علامت Bow-tie به نفع چیست؟',
    },
    answer: { de: 'Hinweis auf dislozierten Meniskusriss.', en: 'Displaced meniscal tear.', fa: 'پارگی جابه‌جا شده منیسک.' },
    explanation: {
      de: 'Normalerweise sieht man den Meniskuskorpus sagittal auf mehreren zentralen Schichten als Bow-tie-Konfiguration. Wenn diese fehlt, kann ein Meniskusfragment disloziert sein, besonders bei einem Korbhenkelriss.',
      en: 'Normally, the meniscal body is seen on sagittal images as a bow-tie configuration on central slices. If this is absent, a meniscal fragment may be displaced, especially in a bucket-handle tear.',
      fa: 'به طور طبیعی تنه منیسک در تصاویر ساژیتال به شکل Bow-tie دیده می‌شود. اگر این علامت وجود نداشته باشد، ممکن است قطعه‌ای از منیسک جابه‌جا شده باشد، به‌خصوص در پارگی Bucket-handle.',
    },
  },
  {
    id: 'meniskus-17-discoid-vs-bucket',
    topicId: 'meniskus',
    category: { de: 'Vergleich / DD', en: 'Comparison / DDx', fa: 'مقایسه / DD' },
    front: {
      de: 'Discoider Meniskus vs. Korbhenkelriss: Wie unterscheidet sich das Bow-tie-Konzept?',
      en: 'Discoid meniscus vs. bucket-handle tear: how does the bow-tie concept differ?',
      fa: 'منیسک دیسکوئید و پارگی Bucket-handle از نظر Bow-tie چه تفاوتی دارند؟',
    },
    answer: {
      de: 'Discoid: zu viele. Korbhenkel: zu wenige.',
      en: 'Discoid: too many. Bucket-handle: too few.',
      fa: 'دیسکوئید: تعداد زیاد. Bucket-handle: تعداد کم.',
    },
    explanation: {
      de: 'Beim discoiden Meniskus bleibt der Meniskuskorpus sagittal auf ungewöhnlich vielen Schichten sichtbar. Beim Korbhenkelriss fehlt die normale Bow-tie-Konfiguration, weil ein Fragment verlagert ist.',
      en: 'In a discoid meniscus, the meniscal body remains visible on unusually many sagittal slices. In a bucket-handle tear, the normal bow-tie configuration is absent because a fragment is displaced.',
      fa: 'در منیسک دیسکوئید، تنه منیسک در تعداد غیرطبیعی زیادی از برش‌های ساژیتال دیده می‌شود. در پارگی Bucket-handle، شکل طبیعی Bow-tie به علت جابه‌جایی قطعه از بین می‌رود.',
    },
    diagram: {
      de: 'Discoid = persistent bow-tie auf ≥3 Schichten\nBucket-handle = absent bow-tie',
      en: 'Discoid = persistent bow-tie on ≥3 slices\nBucket-handle = absent bow-tie',
      fa: 'دیسکوئید = Bow-tie پایدار در ≥۳ برش\nBucket-handle = Bow-tie غایب',
    },
  },
  {
    id: 'meniskus-18-discoid-lateral',
    topicId: 'meniskus',
    category: { de: 'Discoider Meniskus', en: 'Discoid meniscus', fa: 'منیسک دیسکوئید' },
    front: {
      de: 'Welcher Meniskus ist beim discoiden Meniskus fast immer betroffen?',
      en: 'Which meniscus is almost always affected in a discoid meniscus?',
      fa: 'در منیسک دیسکوئید تقریباً همیشه کدام منیسک درگیر است؟',
    },
    answer: { de: 'Außenmeniskus.', en: 'Lateral meniscus.', fa: 'منیسک خارجی.' },
    explanation: {
      de: 'Der discoide Meniskus ist eine angeborene Formvariante und betrifft fast immer den lateralen Meniskus. Ein discoider Innenmeniskus ist deutlich seltener.',
      en: 'A discoid meniscus is a congenital shape variant and almost always affects the lateral meniscus. A discoid medial meniscus is much rarer.',
      fa: 'منیسک دیسکوئید یک واریانت مادرزادی شکل منیسک است و تقریباً همیشه منیسک خارجی را درگیر می‌کند. منیسک داخلی دیسکوئید بسیار نادرتر است.',
    },
  },
  {
    id: 'meniskus-19-snapping-knee',
    topicId: 'meniskus',
    category: { de: 'Discoider Meniskus', en: 'Discoid meniscus', fa: 'منیسک دیسکوئید' },
    front: {
      de: 'Welches klinische Zeichen bei Kindern spricht für einen discoiden Außenmeniskus?',
      en: 'Which clinical sign in children suggests a discoid lateral meniscus?',
      fa: 'کدام علامت بالینی در کودکان به نفع منیسک خارجی دیسکوئید است؟',
    },
    answer: { de: 'Snapping knee.', en: 'Snapping knee.', fa: 'Snapping knee.' },
    explanation: {
      de: 'Ein schnappendes oder klickendes Knie bei Kindern sollte an einen discoiden lateralen Meniskus denken lassen. Der verbreiterte Meniskus kann mechanisch stören und später leichter degenerieren oder reißen.',
      en: 'A snapping or clicking knee in children should raise suspicion for a discoid lateral meniscus. The widened meniscus may cause mechanical symptoms and is more prone to degeneration or tearing.',
      fa: 'صدای تق‌تق یا حالت گیر کردن زانو در کودک باید شک به منیسک خارجی دیسکوئید ایجاد کند. منیسک پهن‌شده می‌تواند علائم مکانیکی ایجاد کند و بیشتر مستعد دژنراسیون یا پارگی است.',
    },
  },
  {
    id: 'meniskus-20-discoid-sagittal',
    topicId: 'meniskus',
    category: { de: 'Discoider Meniskus', en: 'Discoid meniscus', fa: 'منیسک دیسکوئید' },
    front: {
      de: 'Welches sagittale MRT-Kriterium spricht für einen discoiden Meniskus?',
      en: 'Which sagittal MRI criterion suggests a discoid meniscus?',
      fa: 'کدام معیار ساژیتال MRI به نفع منیسک دیسکوئید است؟',
    },
    answer: { de: 'Korpus auf ≥3 Schichten sichtbar.', en: 'Body visible on ≥3 slices.', fa: 'دیده شدن تنه در ≥۳ برش.' },
    explanation: {
      de: 'Ein normaler Meniskuskorpus ist sagittal meist nur auf wenigen zentralen Schichten sichtbar. Wenn der Meniskus auf mindestens drei aufeinanderfolgenden Standardschichten breit sichtbar bleibt, spricht das für eine discoide Form.',
      en: 'A normal meniscal body is usually visible on only a few central sagittal slices. If the meniscus remains broad and visible on at least three consecutive standard slices, this suggests a discoid shape.',
      fa: 'تنه منیسک طبیعی در ساژیتال معمولاً فقط در چند برش مرکزی دیده می‌شود. اگر منیسک در حداقل سه برش استاندارد متوالی پهن و واضح باقی بماند، به نفع شکل دیسکوئید است.',
    },
  },
  {
    id: 'meniskus-21-discoid-coronal',
    topicId: 'meniskus',
    category: { de: 'Discoider Meniskus', en: 'Discoid meniscus', fa: 'منیسک دیسکوئید' },
    front: {
      de: 'Welches koronare MRT-Kriterium spricht für einen discoiden Meniskus?',
      en: 'Which coronal MRI criterion suggests a discoid meniscus?',
      fa: 'کدام معیار کرونال MRI به نفع منیسک دیسکوئید است؟',
    },
    answer: { de: 'Meniskusbreite ≥15 mm.', en: 'Meniscal width ≥15 mm.', fa: 'عرض منیسک ≥۱۵ میلی‌متر.' },
    explanation: {
      de: 'In der koronaren Ebene wirkt der laterale Meniskus beim discoiden Meniskus ungewöhnlich breit. Zusätzlich kann das Verhältnis Meniskusbreite zu maximaler Tibiabreite verwendet werden.',
      en: 'On coronal images, the lateral meniscus appears unusually wide in a discoid meniscus. The ratio of meniscal width to maximal tibial width can also be used.',
      fa: 'در نمای کرونال، منیسک خارجی در حالت دیسکوئید به طور غیرطبیعی پهن دیده می‌شود. نسبت عرض منیسک به حداکثر عرض تیبیا نیز می‌تواند استفاده شود.',
    },
  },
  {
    id: 'meniskus-22-horizontal-vs-radial',
    topicId: 'meniskus',
    category: { de: 'Vergleich / DD', en: 'Comparison / DDx', fa: 'مقایسه / DD' },
    front: {
      de: 'Was ist der praktische Unterschied zwischen Horizontalriss und Radiärriss?',
      en: 'What is the practical difference between a horizontal tear and a radial tear?',
      fa: 'تفاوت عملی پارگی افقی و پارگی رادیال چیست؟',
    },
    answer: { de: 'Horizontal spaltet, radial unterbricht.', en: 'Horizontal splits, radial disrupts.', fa: 'افقی جدا می‌کند، رادیال قطع می‌کند.' },
    explanation: {
      de: 'Ein Horizontalriss verläuft parallel zum Tibiaplateau und teilt den Meniskus in obere und untere Lamelle. Ein Radiärriss verläuft senkrecht zur Peripherie und unterbricht die zirkulären Fasern.',
      en: 'A horizontal tear runs parallel to the tibial plateau and separates the meniscus into upper and lower layers. A radial tear runs perpendicular to the periphery and disrupts the circumferential fibers.',
      fa: 'پارگی افقی موازی پلاتوی تیبیا است و منیسک را به لایه فوقانی و تحتانی تقسیم می‌کند. پارگی رادیال عمود بر محیط منیسک است و فیبرهای حلقوی را قطع می‌کند.',
    },
    diagram: {
      de: 'Horizontalriss = parallel zum Tibiaplateau\nRadiärriss = senkrecht zur Peripherie',
      en: 'Horizontal tear = parallel to tibial plateau\nRadial tear = perpendicular to periphery',
      fa: 'پارگی افقی = موازی پلاتوی تیبیا\nپارگی رادیال = عمود بر محیط منیسک',
    },
  },
  {
    id: 'meniskus-23-parameniskale-zyste',
    topicId: 'meniskus',
    category: { de: 'Rissformen', en: 'Tear patterns', fa: 'انواع پارگی' },
    front: {
      de: 'Welcher Meniskusriss ist typisch mit einer parameniskalen Zyste assoziiert?',
      en: 'Which meniscal tear is typically associated with a parameniscal cyst?',
      fa: 'کدام نوع پارگی منیسک معمولاً با کیست پارامنیسکال همراه است؟',
    },
    answer: { de: 'Horizontalriss.', en: 'Horizontal tear.', fa: 'پارگی افقی.' },
    explanation: {
      de: 'Bei Horizontalrissen kann Gelenkflüssigkeit durch den Riss nach außen gepresst werden. Dadurch kann sich eine parameniskale Zyste bilden.',
      en: 'In horizontal tears, joint fluid can be forced outward through the tear. This can lead to formation of a parameniscal cyst.',
      fa: 'در پارگی افقی، مایع مفصلی می‌تواند از طریق شکاف به بیرون رانده شود. این حالت می‌تواند باعث تشکیل کیست پارامنیسکال شود.',
    },
  },
  {
    id: 'meniskus-24-radial-biomechanik',
    topicId: 'meniskus',
    category: { de: 'Rissformen', en: 'Tear patterns', fa: 'انواع پارگی' },
    front: {
      de: 'Warum ist ein Radiärriss biomechanisch problematisch?',
      en: 'Why is a radial tear biomechanically problematic?',
      fa: 'چرا پارگی رادیال از نظر بیومکانیک مهم است؟',
    },
    answer: { de: 'Er unterbricht Ringfasern.', en: 'It disrupts circumferential fibers.', fa: 'فیبرهای حلقوی را قطع می‌کند.' },
    explanation: {
      de: 'Die Menisken verteilen Last über zirkuläre Kollagenfasern. Ein Radiärriss schneidet diese Fasern quer durch und kann die Hoop-Stress-Funktion deutlich stören.',
      en: 'The menisci distribute load through circumferential collagen fibers. A radial tear cuts across these fibers and can significantly impair the hoop-stress function.',
      fa: 'منیسک‌ها نیرو را از طریق فیبرهای کلاژن حلقوی توزیع می‌کنند. پارگی رادیال این فیبرها را عرضی قطع می‌کند و عملکرد Hoop-stress را مختل می‌کند.',
    },
  },
  {
    id: 'meniskus-25-nicht-ueberdiagnostizieren',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Wann sollte ein Meniskusriss nicht überdiagnostiziert werden?',
      en: 'When should a meniscal tear not be overdiagnosed?',
      fa: 'چه زمانی نباید پارگی منیسک بیش‌ازحد تشخیص داده شود؟',
    },
    answer: { de: 'Bei Signal ohne sicheren Oberflächenkontakt.', en: 'When signal has no definite surface contact.', fa: 'وقتی سیگنال تماس قطعی با سطح ندارد.' },
    explanation: {
      de: 'Viele intrameniskale Signale sind degenerativ oder altersbedingt. Besonders Grad-I- und Grad-II-Läsionen dürfen nicht automatisch als Riss bezeichnet werden.',
      en: 'Many intrameniscal signals are degenerative or age-related. Especially grade I and grade II lesions should not automatically be called tears.',
      fa: 'بسیاری از سیگنال‌های داخل منیسک دژنراتیو یا وابسته به سن هستند. به‌خصوص ضایعات درجه I و II نباید به طور خودکار پارگی نامیده شوند.',
    },
  },
  {
    id: 'meniskus-26-signal-allein',
    topicId: 'meniskus',
    category: { de: 'Rissdiagnostik', en: 'Tear diagnosis', fa: 'تشخیص پارگی' },
    front: {
      de: 'Was ist der wichtigste Satz für die MRT-Befundung des Meniskus?',
      en: 'What is the most important sentence for MRI reporting of the meniscus?',
      fa: 'مهم‌ترین جمله برای گزارش MRI منیسک چیست؟',
    },
    answer: { de: 'Signal allein ist kein Riss.', en: 'Signal alone is not a tear.', fa: 'سیگنال به تنهایی پارگی نیست.' },
    explanation: {
      de: 'Die sichere Diagnose braucht Morphologie, Oberflächenkontakt und Reproduzierbarkeit über mehrere Schichten. Diese Denkweise verhindert zu viele falsch-positive Befunde und macht den Bericht klinisch nützlicher.',
      en: 'A reliable diagnosis requires morphology, surface contact, and reproducibility on multiple slices. This approach prevents false-positive reports and makes the report clinically more useful.',
      fa: 'تشخیص مطمئن نیاز به بررسی مورفولوژی، تماس با سطح و تکرارپذیری در چند برش دارد. این روش از گزارش‌های مثبت کاذب جلوگیری می‌کند و گزارش را برای بالین مفیدتر می‌سازد.',
    },
  },
]

export function getFlashcardTopic(topicId) {
  return FLASHCARD_TOPICS.find(topic => topic.id === topicId)
}

export function getCardsByTopic(topicId) {
  return FLASHCARDS.filter(card => card.topicId === topicId)
}

export function getCardById(cardId) {
  return FLASHCARDS.find(card => card.id === cardId)
}
