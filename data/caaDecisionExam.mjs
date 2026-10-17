const L = (de, en, fa) => ({ de, en, fa })
const O = (id, de, en, fa) => ({ id, text: L(de, en, fa) })
const MRI_CONTEXT = L(
  'Die MRT zeigt eine kleine punktförmige DWI-Signalsteigerung, keinen großen territorialen Infarkt und mehrere streng lobäre Mikroblutungen. Im vollständigen Datensatz keine tiefen hämorrhagischen Läsionen. Betrachten Sie jetzt die oberflächlichen blutungssensitiven Aufnahmen.',
  'MRI shows a small punctate DWI hyperintensity, no large territorial infarct and multiple strictly lobar microbleeds. There are no deep haemorrhagic lesions in the complete dataset. Now assess the superficial blood-sensitive images.',
  'MRI یک کانون کوچک نقطه‌ای پرسیگنال در DWI و چند میکروبلید کاملاً لوبار نشان می‌دهد؛ انفارکت قلمرویی بزرگ یا ضایعهٔ هموراژیک عمقی در بررسی کامل وجود ندارد. اکنون تصاویر حساس به خون در سطح مغز را بررسی کنید.'
)
const Q = (id, domain, stage, prompt, options, correct, explanation, followUp = null) => ({ id, domain, stage, prompt, options, correct, explanation, followUp, evidence: stage === 'surface-image' ? MRI_CONTEXT : null })
const sequence = Q('blood-sequence', 'investigation', null,
  L('Welche Sequenz macht chronische Blutabbauprodukte besonders sichtbar?', 'Which sequence best reveals chronic blood products?', 'کدام سکانس محصولات مزمن خون را بهتر نشان می‌دهد؟'),
  [O('A','T1 ohne Kontrastmittel','Unenhanced T1','T1 بدون کنتراست'),O('B','SWI oder T2*-GRE','SWI or T2*-GRE','SWI یا T2*-GRE'),O('C','DWI allein','DWI alone','فقط DWI')], 'B',
  L('SWI/T2*-GRE erfasst Suszeptibilität durch Blutabbauprodukte. DWI und FLAIR beantworten andere ergänzende Fragen.', 'SWI/T2*-GRE detects susceptibility from blood products. DWI and FLAIR answer complementary questions.', 'SWI/T2*-GRE سوسپتیبیلیتی محصولات خون را نشان می‌دهد؛ DWI و FLAIR نقش تکمیلی دارند.'))
const distribution = Q('distribution-check', 'interpretation', null,
  L('Welcher zusätzliche Befund würde die MRT-Einstufung nach Boston v2.0 verhindern?', 'Which additional finding would preclude MRI-based Boston v2.0 classification?', 'کدام یافتهٔ اضافی مانع طبقه‌بندی MRI بر اساس Boston v2.0 می‌شود؟'),
  [O('A','Eine weitere lobäre Mikroblutung','Another lobar microbleed','میکروبلید لوبار دیگر'),O('B','Kortikale superfizielle Siderose','Cortical superficial siderosis','سیدروز سطحی کورتیکال'),O('C','Eine Mikroblutung im Thalamus','A thalamic microbleed','میکروبلید تالاموس')], 'C',
  L('Tiefe hämorrhagische Läsionen verhindern die MRT-Kategorien probable/possible CAA. Eine gleichzeitig bestehende CAA wird dadurch nicht ausgeschlossen.', 'Deep haemorrhagic lesions preclude the MRI probable/possible CAA categories, but do not exclude coexisting CAA.', 'ضایعات هموراژیک عمقی مانع طبقات MRI محتمل/ممکن هستند، اما همزمانی CAA را رد نمی‌کنند.'))
const certainty = Q('certainty-check', 'diagnosis', null,
  L('Was bedeutet „probable CAA“ in der MRT?', 'What does “probable CAA” mean on MRI?', 'Probable CAA در MRI چه معنایی دارد؟'),
  [O('A','Klinisch-radiologisch wahrscheinlich','Clinically and radiologically probable','محتمل بر اساس بالین و تصویربرداری'),O('B','Neuropathologisch gesichert','Neuropathologically definite','قطعی بر اساس نوروپاتولوژی'),O('C','Amyloid-PET ist zwingend erforderlich','Amyloid PET is mandatory','Amyloid-PET الزامی است')], 'A',
  L('Probable ist eine klinisch-radiologische Kategorie. MRT-Marker sind kein histologischer Nachweis.', 'Probable is a clinical-radiological category. MRI markers are not histological proof.', 'Probable یک طبقهٔ بالینی–تصویربرداری است؛ مارکر MRI اثبات بافت‌شناختی نیست.'))
const localisation = Q('localisation-check', 'observation', null,
  L('Welche Beschreibung lokalisiert einen lobären Befund?', 'Which description identifies a lobar lesion?', 'کدام توصیف، ضایعهٔ لوبار را مشخص می‌کند؟'),
  [O('A','Zentriert im Pons','Centred in the pons','مرکز ضایعه در پونز'),O('B','Kortexnah im Okzipitallappen','Near the cortex in the occipital lobe','نزدیک کورتکس در لوب اکسیپیتال'),O('C','Zentriert im Thalamus','Centred in the thalamus','مرکز ضایعه در تالاموس')], 'B',
  L('Lobär bezeichnet Kortex und subkortikales Mark eines Hirnlappens; Thalamus und Pons sind tiefe Lokalisationen.', 'Lobar refers to cortex and subcortical white matter of a lobe; thalamus and pons are deep sites.', 'لوبار به کورتکس و مادهٔ سفید زیرکورتکس یک لوب اشاره دارد؛ تالاموس و پونز عمقی هستند.'))
const phenotype = Q('symptom-check', 'interpretation', null,
  L('Welches Merkmal sollten Sie bei wiederkehrenden Episoden besonders gewichten?', 'Which feature matters most in recurrent episodes?', 'در حملات تکرارشونده کدام ویژگی اهمیت بیشتری دارد؟'),
  [O('A','Langsame Ausbreitung und stereotyper Ablauf','Gradual spread and stereotyped recurrence','گسترش تدریجی و تکرار کلیشه‌ای'),O('B','Die Zuweisungsdiagnose allein','The referral label alone','فقط تشخیص ارجاع'),O('C','Die Dauer allein','Duration alone','فقط طول مدت حمله')], 'A',
  L('Stereotype, wandernde positive Symptome sind ein Hinweis, keine alleinige Diagnose. Klinik und Bildgebung müssen zusammenpassen.', 'Stereotyped spreading positive symptoms are a clue, not a diagnosis by themselves. Clinical and imaging findings must agree.', 'علائم مثبت پیش‌رونده و کلیشه‌ای سرنخ‌اند، نه تشخیص مستقل؛ بالین و تصویر باید با هم بررسی شوند.'))

const urgency = Q('urgency-check', 'investigation', null,
  L('Welche Frage muss die erste Bildgebung beim akuten Schlaganfallverdacht rasch klären?', 'Which question must initial imaging rapidly address in suspected acute stroke?', 'در شک به سکتهٔ حاد، تصویربرداری اولیه باید سریع به کدام سؤال پاسخ دهد؟'),
  [O('A','Liegt eine akute intrakranielle Blutung vor?','Is there acute intracranial haemorrhage?','آیا خونریزی حاد داخل جمجمه وجود دارد؟'),O('B','Besteht eine APP-Mutation?','Is there an APP mutation?','آیا جهش APP وجود دارد؟'),O('C','Ist eine Alzheimer-Pathologie nachweisbar?','Can Alzheimer pathology be demonstrated?','آیا پاتولوژی آلزهایمر قابل اثبات است؟')], 'A',
  L('Zunächst die akute Blutungssituation klären. Die ätiologische Einordnung folgt danach, ohne die Akutversorgung zu verzögern.', 'First clarify acute haemorrhage. Aetiological assessment follows without delaying acute care.', 'ابتدا وضعیت خونریزی حاد روشن می‌شود؛ علت‌یابی در ادامه و بدون تأخیر در رسیدگی حاد انجام می‌شود.'))
const surface = Q('surface-check', 'observation', null,
  L('Welcher Verlauf passt zu einer kortikalen superfiziellen Siderose?', 'Which distribution fits cortical superficial siderosis?', 'کدام توزیع با سیدروز سطحی کورتیکال سازگار است؟'),
  [O('A','Punktförmig in den tiefen Kernen','Punctate in the deep nuclei','نقطه‌ای در هسته‌های عمقی'),O('B','Kurvilinear entlang der kortikalen Sulci','Curvilinear along the cortical sulci','منحنی در امتداد شیارهای کورتیکال'),O('C','Zentriert im Ventrikellumen','Centred in the ventricular lumen','متمرکز در لومن بطن')], 'B',
  L('cSS folgt der kortikalen Oberfläche und den Sulci. Tiefe punktförmige Mikroblutungen sind ein anderes Muster.', 'cSS follows the cortical surface and sulci. Deep punctate microbleeds are a different pattern.', 'cSS سطح کورتکس و شیارها را دنبال می‌کند؛ میکروبلیدهای نقطه‌ای عمقی الگوی دیگری دارند.'))

export const CAA_DECISION_EXAMS = {
  'caa-exam-lobar-haemorrhage': [
    Q('initial-imaging','investigation',0,
      L('Welche Bildgebung veranlassen Sie zuerst?', 'Which imaging study do you request first?', 'اولین اقدام تصویربرداری شما چیست؟'),
      [O('A','Native CCT zur akuten Blutungssuche','Non-contrast head CT to assess acute bleeding','CT مغز بدون کنتراست برای بررسی خونریزی حاد'),O('B','CT-Angiographie ohne native CCT','CT angiography without non-contrast head CT','CT آنژیوگرافی بدون CT مغز بدون کنتراست'),O('C','Isolierte DWI ohne blutungssensitive Sequenz','DWI alone without a blood-sensitive sequence','DWI به‌تنهایی و بدون سکانس حساس به خون')], 'A',
      L('Bei akutem Schlaganfallverdacht muss eine Blutung rasch erkannt werden; die spätere Ursachenklärung darf die Akutversorgung nicht verzögern.', 'Suspected acute stroke requires rapid assessment for haemorrhage; later aetiological work-up must not delay acute care.', 'در شک به سکتهٔ حاد باید خونریزی سریع بررسی شود؛ علت‌یابی بعدی نباید رسیدگی حاد را عقب بیندازد.'),urgency),
    Q('describe-haemorrhage','observation','ct-image',
      L('Beschreiben Sie die Blutung in der Vergleichsabbildung.', 'Describe the haemorrhage in the comparison figure.', 'خونریزی را در تصویر مقایسه‌ای توصیف کنید.'),
      [O('A','Tiefe Blutung der linken Basalganglien','Deep left basal ganglia haemorrhage','خونریزی عمقی عقده‌های قاعده‌ای چپ'),O('B','Rechtsfrontale lobäre Blutung','Right frontal lobar haemorrhage','خونریزی لوبار فرونتال راست'),O('C','Linksokzipitale, kortexnahe Parenchymblutung','Left occipital intraparenchymal haemorrhage near the cortex','خونریزی پارانشیمی اکسیپیتال چپ نزدیک کورتکس')], 'C',
      L('Die Abbildung zeigt eine linksokzipitale lobäre Blutung. Die Ursache ist damit noch nicht gesichert.', 'The figure shows a left occipital lobar haemorrhage. This alone does not establish its cause.', 'تصویر خونریزی لوبار اکسیپیتال چپ نشان می‌دهد؛ علت هنوز با این یافته مشخص نیست.'),localisation),
    Q('request-sequence','investigation',2,
      L('Die Akutversorgung läuft. Welche MRT-Sequenz benötigen Sie zur Suche nach weiteren Blutungsmarkern?', 'Acute care is underway. Which MRI sequence do you request to look for further haemorrhagic markers?', 'رسیدگی حاد شروع شده؛ برای یافتن مارکرهای خونریزی دیگر کدام سکانس را می‌خواهید؟'),
      [O('A','DWI als einzige Sequenz','DWI as the only sequence','فقط DWI'),O('B','SWI oder T2*-GRE zusätzlich zum MRT-Protokoll','SWI or T2*-GRE added to the MRI protocol','SWI یا T2*-GRE در کنار پروتکل MRI'),O('C','T1 nach Kontrastmittel als Ersatz für SWI','Post-contrast T1 instead of SWI','T1 با کنتراست به‌جای SWI')], 'B',
      sequence.explanation,sequence),
    Q('weigh-pattern','interpretation',3,
      L('Welcher Befund wiegt für die Ätiologie am stärksten?', 'Which finding carries the most weight for the cause?', 'کدام یافته برای تعیین علت بیشترین وزن را دارد؟'),
      [O('A','Streng lobäre Blutungen ohne tiefe Läsionen','Strictly lobar haemorrhages without deep lesions','خونریزی‌های کاملاً لوبار، بدون ضایعات عمقی'),O('B','Der erhöhte Aufnahmeblutdruck','Elevated blood pressure at admission','فشار بالای زمان پذیرش'),O('C','Die Vergesslichkeit allein','Forgetfulness alone','فراموشی به‌تنهایی')], 'A',
      L('Die Verteilung ist entscheidend. Akuter Bluthochdruck und Gedächtnisprobleme allein bestimmen die Blutungsursache nicht.', 'Distribution is key. Acute hypertension and memory complaints alone do not establish the cause of bleeding.', 'توزیع ضایعات تعیین‌کننده است؛ فشار حاد و شکایت حافظه به‌تنهایی علت خونریزی را ثابت نمی‌کنند.'),distribution),
    Q('diagnose','diagnosis',3,
      L('Welche Diagnose ist jetzt am besten begründet?', 'Which diagnosis is now best supported?', 'اکنون کدام تشخیص بهتر توجیه می‌شود؟'),
      [O('A','Hypertensive Arteriolopathie','Hypertensive arteriolopathy','آرتریولوپاتی هیپرتانسیو'),O('B','Wahrscheinliche CAA nach Boston v2.0','Probable CAA under Boston v2.0','CAA محتمل بر اساس Boston v2.0'),O('C','Hämorrhagischer venöser Infarkt','Haemorrhagic venous infarction','انفارکت وریدی هموراژیک'),O('D','CAA-assoziierte Inflammation','CAA-related inflammation','التهاب مرتبط با CAA')], 'B',
      L('Alter ≥50, passende Klinik und mehrere streng lobäre Blutungsläsionen ohne tiefe Blutung oder andere Ursache erfüllen hier probable CAA.', 'Age ≥50, compatible presentation and multiple strictly lobar haemorrhagic lesions without deep bleeding or another cause support probable CAA here.', 'سن ≥۵۰، بالین سازگار و چند ضایعهٔ هموراژیک کاملاً لوبار بدون خونریزی عمقی یا علت دیگر، در اینجا Probable CAA را برقرار می‌کنند.'),distribution),
    Q('state-certainty','diagnosis',3,
      L('Wie formulieren Sie den Sicherheitsgrad im Befund?', 'How do you state diagnostic certainty in the report?', 'در گزارش، درجهٔ اطمینان را چگونه بیان می‌کنید؟'),
      [O('A','Histologisch gesicherte CAA','Histologically definite CAA','CAA قطعی بافت‌شناختی'),O('B','Nur mögliche CAA, weil MRT kein Amyloid direkt nachweist','Only possible CAA because MRI does not detect amyloid directly','فقط CAA ممکن، چون MRI آمیلوئید را مستقیم نشان نمی‌دهد'),O('C','Klinisch-radiologisch wahrscheinliche CAA','Clinically and radiologically probable CAA','CAA محتمل بر اساس بالین و تصویربرداری')], 'C',certainty.explanation,certainty),
  ],
  'caa-exam-transient-focal-episodes': [
    Q('read-symptoms','interpretation',0,
      L('Welcher Teil der Anamnese verdient besondere Aufmerksamkeit?', 'Which part of the history deserves particular attention?', 'کدام بخش شرح‌حال به توجه ویژه نیاز دارد؟'),
      [O('A','Das Etikett „TIA“ in der Zuweisung','The referral label “TIA”','برچسب TIA در ارجاع'),O('B','Stereotype, langsam wandernde sensible Episoden','Stereotyped, gradually spreading sensory episodes','حملات حسی کلیشه‌ای با گسترش تدریجی'),O('C','Die spontane Rückbildung als Beweis einer Embolie','Spontaneous resolution as proof of embolism','رفع خودبه‌خودی به‌عنوان اثبات آمبولی')], 'B',phenotype.explanation,phenotype),
    Q('choose-imaging','investigation',1,
      L('Welche Ergänzung ist neben DWI für diese Fragestellung wichtig?', 'Which addition to DWI matters for this question?', 'برای این مسئله چه سکانسی در کنار DWI اهمیت دارد؟'),
      [O('A','SWI/T2*-GRE und Prüfung der gesamten Blutungsverteilung','SWI/T2*-GRE and assessment of the full haemorrhage distribution','SWI/T2*-GRE و بررسی کل توزیع خونریزی'),O('B','Nur die DWI-positive Stelle beurteilen','Assess only the DWI-positive focus','فقط بررسی کانون DWI مثبت'),O('C','Nur T1 nach Kontrastmittel ergänzen','Add only post-contrast T1','فقط افزودن T1 با کنتراست')], 'A',sequence.explanation,sequence),
    Q('read-surface','observation','surface-image',
      L('Welche Morphologie erkennen Sie entlang der kortikalen Oberfläche?', 'Which morphology do you recognise along the cortical surface?', 'در امتداد سطح کورتکس چه مورفولوژی‌ای می‌بینید؟'),
      [O('A','Tiefe punktförmige Blutung im Thalamus','Deep punctate haemorrhage in the thalamus','خونریزی نقطه‌ای عمقی در تالاموس'),O('B','Ringförmig kontrastaufnehmende Raumforderung','Ring-enhancing mass','توده با جذب حلقوی کنتراست'),O('C','Kurvilineare oberflächliche Suszeptibilitätsminderung','Curvilinear superficial susceptibility signal loss','افت سیگنال سطحی و منحنی ناشی از susceptibility')], 'C',
      L('Die oberflächliche kurvilineare Suszeptibilität passt zu cSS; sie ist von tiefen punktförmigen Mikroblutungen zu unterscheiden.', 'Superficial curvilinear susceptibility is consistent with cSS and differs from deep punctate microbleeds.', 'سوسپتیبیلیتی سطحی و منحنی با cSS سازگار است و با میکروبلیدهای نقطه‌ای عمقی تفاوت دارد.'),surface),
    Q('integrate-dwi','interpretation',3,
      L('Wie ordnen Sie die kleine DWI-Läsion zusammen mit cSS und lobären Mikroblutungen ein?', 'How do you interpret the small DWI lesion alongside cSS and lobar microbleeds?', 'ضایعهٔ کوچک DWI را در کنار cSS و میکروبلیدهای لوبار چگونه تفسیر می‌کنید؟'),
      [O('A','Sie erklärt das gesamte Muster als embolische TIA','It explains the entire pattern as embolic TIA','کل الگو را به‌صورت TIA آمبولیک توضیح می‌دهد'),O('B','Sie kann koexistieren; das gesamte klinisch-radiologische Muster bleibt maßgeblich','It may coexist; the whole clinical-imaging pattern remains decisive','می‌تواند همزمان وجود داشته باشد؛ کل الگوی بالینی–تصویری تعیین‌کننده است'),O('C','Sie bestätigt eine CAA-assoziierte Inflammation','It confirms CAA-related inflammation','التهاب مرتبط با CAA را تأیید می‌کند')], 'B',
      L('Eine kleine DWI-Läsion kann koexistieren. Sie macht stereotype wandernde Episoden mit cSS und lobären CMB nicht automatisch zu embolischen TIA.', 'A small DWI lesion may coexist. It does not automatically make spreading stereotyped episodes with cSS and lobar CMB embolic TIAs.', 'ضایعهٔ کوچک DWI می‌تواند همزمان وجود داشته باشد؛ حملات پیش‌روندهٔ کلیشه‌ای همراه cSS و CMB لوبار را خودبه‌خود به TIA آمبولیک تبدیل نمی‌کند.'),phenotype),
    Q('diagnose','diagnosis',3,
      L('Welche Gesamtdiagnose verbindet Klinik und Bildgebung am besten?', 'Which overall diagnosis best connects presentation and imaging?', 'کدام تشخیص، بالین و تصویربرداری را بهتر به هم مرتبط می‌کند؟'),
      [O('A','Wahrscheinliche CAA mit CAA-assoziierten TFNE','Probable CAA with CAA-related TFNEs','CAA محتمل همراه TFNE مرتبط با CAA'),O('B','Migräne mit Aura','Migraine with aura','میگرن با اورا'),O('C','Rezidivierende embolische TIA','Recurrent embolic TIA','TIA آمبولیک تکرارشونده'),O('D','CAA-assoziierte Inflammation','CAA-related inflammation','التهاب مرتبط با CAA')], 'A',
      L('Die beschriebenen Episoden und das streng lobär-oberflächliche Blutungsmuster stützen hier probable CAA mit TFNE; Alternativursachen wurden ausgeschlossen.', 'The described episodes and strictly lobar-superficial haemorrhagic pattern support probable CAA with TFNEs here; alternative causes were excluded.', 'حملات توصیف‌شده و الگوی هموراژیک کاملاً لوبار–سطحی، در اینجا از CAA محتمل با TFNE حمایت می‌کنند؛ علل جایگزین رد شده‌اند.'),certainty),
    Q('handover','diagnosis',3,
      L('Welche Aussage gehört in die Übergabe an das Behandlungsteam?', 'Which statement belongs in the handover to the treating team?', 'کدام پیام باید به تیم درمان منتقل شود؟'),
      [O('A','Wegen des TIA-Verdachts antithrombotisch eskalieren','Escalate antithrombotics because TIA is suspected','به‌علت شک به TIA درمان ضدترومبوتیک تشدید شود'),O('B','Jede antithrombotische Behandlung ist dauerhaft ausgeschlossen','Every antithrombotic treatment is permanently excluded','هر نوع درمان ضدترومبوتیک برای همیشه ممنوع است'),O('C','Blutungsrisiko ausdrücklich mitteilen; antithrombotische Indikationen individuell abwägen','Communicate haemorrhagic risk explicitly; assess antithrombotic indications individually','خطر خونریزی صریح منتقل شود؛ اندیکاسیون ضدترومبوتیک فردی سنجیده شود')], 'C',
      L('Keine reflexhafte Eskalation allein wegen „TIA“. Zwingende Indikationen müssen individuell gegen das Blutungsrisiko abgewogen werden.', 'Do not escalate reflexively because of the label “TIA”. Compelling indications require individual assessment against haemorrhagic risk.', 'صرف برچسب TIA نباید باعث تشدید خودکار درمان شود؛ اندیکاسیون‌های ضروری باید فردی در برابر خطر خونریزی سنجیده شوند.'),phenotype),
  ],
}

export function decisionOutcome(question, answer, followUpAnswer = null) {
  if (!question.options.some(option => option.id === answer)) return 'unanswered'
  if (answer === question.correct) return 'independent'
  return question.followUp && followUpAnswer === question.followUp.correct ? 'supported' : 'missed'
}
