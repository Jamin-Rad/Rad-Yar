import { Children, cloneElement, isValidElement } from 'react'

// Authored parallel translations; German clinical source remains unchanged.
const COPY = {
  "Bei der": {
    "en": "In",
    "fa": "در"
  },
  "arrhythmogenen Kardiomyopathie (ACM)": {
    "en": "arrhythmogenic cardiomyopathy (ACM)",
    "fa": "کاردیومیوپاتی آریتموژن (ACM)"
  },
  "wird Herzmuskel durch Narbengewebe ersetzt, teilweise auch durch Fett. Das kann gefährliche Rhythmusstörungen aus den Herzkammern auslösen – auch wenn die Pumpfunktion noch relativ gut ist.": {
    "en": "heart muscle is replaced by scar tissue, sometimes also by fat. This can cause dangerous ventricular arrhythmias, even while pump function remains relatively good.",
    "fa": "بافت عضلانی قلب با اسکار و گاهی نیز با چربی جایگزین می‌شود. این روند می‌تواند آریتمی‌های خطرناک بطنی ایجاد کند، حتی هنگامی که عملکرد پمپاژ هنوز نسبتاً خوب است."
  },
  "Früher wurde vor allem die rechte Herzkammer beschrieben: daher der Name": {
    "en": "The right ventricle was originally the main focus, hence the name",
    "fa": "در گذشته بیشتر بطن راست توصیف می‌شد؛ از این رو نام"
  },
  ". Heute weiß man, dass auch die linke Kammer betroffen sein kann, manchmal sogar überwiegend.": {
    "en": ". We now know that the left ventricle may also be involved, sometimes predominantly.",
    "fa": ". امروزه می‌دانیم که بطن چپ نیز می‌تواند درگیر باشد و گاهی درگیری آن غالب است."
  },
  "ACM ist deshalb der umfassendere Begriff.": {
    "en": "ACM is therefore the broader term.",
    "fa": "بنابراین ACM اصطلاح جامع‌تری است."
  },
  "Die Erkrankung ist häufig erblich; eine LV-Beteiligung ist auch für die Prognose wichtig.": {
    "en": "The disease is often inherited; LV involvement also matters for prognosis.",
    "fa": "بیماری اغلب ارثی است؛ درگیری LV برای پیش‌آگهی نیز اهمیت دارد."
  },
  "Drei mögliche Verteilungen": {
    "en": "Three possible distributions",
    "fa": "سه توزیع ممکن"
  },
  "Was bedeutet das im MRT?": {
    "en": "What does this mean on MRI?",
    "fa": "در MRI چه معنایی دارد؟"
  },
  "RV-dominant · klassische ARVC": {
    "en": "RV-dominant · classic ARVC",
    "fa": "غالب در RV · ARVC کلاسیک"
  },
  "Rechte Kammer besonders auffällig: regionale Bewegungsstörungen, Vergrößerung und reduzierte Pumpfunktion. Den LV trotzdem mitbeurteilen.": {
    "en": "The right ventricle is particularly abnormal: regional motion abnormalities, enlargement and reduced pump function. Assess the LV as well.",
    "fa": "بطن راست به‌ویژه غیرطبیعی است: اختلال حرکت ناحیه‌ای، بزرگ‌شدگی و کاهش عملکرد پمپاژ. LV را نیز ارزیابی کنید."
  },
  "Biventrikulär": {
    "en": "Biventricular",
    "fa": "دو‌بطنی"
  },
  "Rechte und linke Kammer sind beteiligt. Neben der RV-Veränderung können nichtischämische Narben im LV auffallen.": {
    "en": "Both ventricles are involved. Non-ischaemic LV scars may be present in addition to RV changes.",
    "fa": "هر دو بطن درگیرند. افزون بر تغییرات RV، اسکارهای غیرایسکمیک در LV نیز ممکن است دیده شوند."
  },
  "Die linke Kammer steht im Vordergrund; der RV kann unauffällig sein. Das Narbenmuster, die Genetik und andere mögliche Ursachen werden wichtig.": {
    "en": "The left ventricle predominates; the RV may be unremarkable. Scar pattern, genetics and other possible causes become important.",
    "fa": "درگیری بطن چپ غالب است؛ RV ممکن است طبیعی به نظر برسد. الگوی اسکار، ژنتیک و سایر علل احتمالی اهمیت پیدا می‌کنند."
  },
  "Ein Anlass zur Abklärung können Palpitationen, eine Synkope, ventrikuläre Rhythmusstörungen oder eine belastete Familiengeschichte sein. Das MRT hilft, die Veränderungen am Herzmuskel einzuordnen; EKG, Rhythmusdiagnostik und Familienanamnese gehören dazu.": {
    "en": "Palpitations, syncope, ventricular arrhythmias or a relevant family history may prompt assessment. MRI helps characterise myocardial changes; ECG, rhythm assessment and family history are also needed.",
    "fa": "تپش قلب، سنکوپ، آریتمی‌های بطنی یا سابقهٔ خانوادگی مرتبط می‌توانند دلیل بررسی باشند. MRI به ارزیابی تغییرات میوکارد کمک می‌کند؛ ECG، بررسی ریتم و سابقهٔ خانوادگی نیز لازم‌اند."
  },
  "Für das MRT merken": {
    "en": "Remember for MRI",
    "fa": "برای MRI به خاطر بسپارید"
  },
  "Immer beide Herzkammern ansehen: Größe, Bewegung, Pumpfunktion und Narben.": {
    "en": "Always assess both ventricles: size, motion, pump function and scars.",
    "fa": "همیشه هر دو بطن را از نظر اندازه، حرکت، عملکرد پمپاژ و اسکار بررسی کنید."
  },
  "Bei Verdacht auf ACM beantworten wir drei Fragen:": {
    "en": "When ACM is suspected, we answer three questions:",
    "fa": "در شک به ACM به سه پرسش پاسخ می‌دهیم:"
  },
  "Wie bewegt sich die Wand? Wie groß sind die Kammern und wie gut pumpen sie? Wo liegt eine Narbe?": {
    "en": "How does the wall move? How large are the ventricles and how well do they pump? Where is a scar?",
    "fa": "دیواره چگونه حرکت می‌کند؟ بطن‌ها چه اندازه‌اند و چقدر خوب پمپاژ می‌کنند؟ اسکار کجاست؟"
  },
  "Nicht an einem einzelnen Schnitt entscheiden": {
    "en": "Do not decide from a single slice",
    "fa": "بر اساس یک برش تصمیم نگیرید"
  },
  "Der RV ist dünnwandig und geometrisch komplex. Auffällige Bewegung oder eine scheinbar helle Wandstelle über die Serie und in einer zweiten Ebene überprüfen.": {
    "en": "The RV is thin-walled and geometrically complex. Check abnormal motion or an apparently bright wall focus across the series and in a second plane.",
    "fa": "RV دیواره‌ای نازک و هندسه‌ای پیچیده دارد. حرکت غیرطبیعی یا کانون ظاهراً روشن دیواره را در کل سری و در نمای دوم بررسی کنید."
  },
  "Zuerst die Bewegung im Cine ansehen, dann die Gewebeveränderungen im LGE. Die folgenden Aufnahmen stammen aus echten Radiopaedia-Untersuchungen.": {
    "en": "Assess motion on cine first, then tissue changes on LGE. The following images come from actual Radiopaedia examinations.",
    "fa": "ابتدا حرکت را در Cine و سپس تغییرات بافتی را در LGE بررسی کنید. تصاویر زیر از بررسی‌های واقعی Radiopaedia هستند."
  },
  "Ein großer RV oder eine Narbe kann verschiedene Ursachen haben. Entscheidend ist, ob": {
    "en": "An enlarged RV or a scar can have several causes. What matters is whether",
    "fa": "RV بزرگ یا اسکار می‌تواند علل گوناگونی داشته باشد. مهم این است که آیا"
  },
  "Bewegung, Kammerfunktion, Narbenmuster und klinische Angaben zusammenpassen.": {
    "en": "motion, ventricular function, scar pattern and clinical information fit together.",
    "fa": "حرکت، عملکرد بطن، الگوی اسکار و اطلاعات بالینی با هم سازگارند."
  },
  "Möglichkeit": {
    "en": "Possibility",
    "fa": "احتمال"
  },
  "Was hilft bei der Einordnung?": {
    "en": "What helps interpretation?",
    "fa": "چه چیزی به تفسیر کمک می‌کند؟"
  },
  "RV-Vergrößerung kann eine Trainingsanpassung sein. Beide Kammern vergleichen und nach sicheren regionalen Störungen oder Narben suchen.": {
    "en": "RV enlargement may be a training adaptation. Compare both ventricles and look for definite regional abnormalities or scars.",
    "fa": "بزرگ‌شدگی RV می‌تواند سازگاری با تمرین ورزشی باشد. هر دو بطن را مقایسه کنید و اختلال ناحیه‌ای قطعی یا اسکار را جست‌وجو کنید."
  },
  "Nichtischämisches LV-LGE kann ähnlich aussehen. Akute Beschwerden, Troponin, Ödem und Verlauf berücksichtigen. Auch eine ACM kann entzündungsähnliche Episoden zeigen.": {
    "en": "Non-ischaemic LV LGE may look similar. Consider acute symptoms, troponin, oedema and follow-up. ACM itself can also have inflammatory-like episodes.",
    "fa": "LGE غیرایسکمیک در LV ممکن است مشابه باشد. علائم حاد، تروپونین، ادم و سیر زمانی را در نظر بگیرید. خود ACM نیز می‌تواند دوره‌هایی شبیه التهاب داشته باشد."
  },
  "Kardiale Sarkoidose": {
    "en": "Cardiac sarcoidosis",
    "fa": "سارکوئیدوز قلبی"
  },
  "Kann nichtischämische Narben und Rhythmusstörungen verursachen. Verteilung, Leitungsstörungen und Hinweise außerhalb des Herzens helfen weiter.": {
    "en": "May cause non-ischaemic scars and arrhythmias. Distribution, conduction abnormalities and extracardiac clues help.",
    "fa": "می‌تواند اسکار غیرایسکمیک و آریتمی ایجاد کند. توزیع، اختلال هدایت و سرنخ‌های خارج قلبی کمک‌کننده‌اند."
  },
  "Druck- oder Volumenbelastung des RV": {
    "en": "RV pressure or volume overload",
    "fa": "اضافه‌بار فشاری یا حجمی RV"
  },
  "Zum Beispiel pulmonale Hypertonie oder Shunt: nach einer Ursache für die RV-Vergrößerung suchen.": {
    "en": "For example, pulmonary hypertension or a shunt: look for a cause of RV enlargement.",
    "fa": "برای مثال پرفشاری ریوی یا شانت: علت بزرگ‌شدگی RV را جست‌وجو کنید."
  },
  "Artefakte oder frühere Ablation": {
    "en": "Artefacts or previous ablation",
    "fa": "آرتیفکت یا ابلیشن قبلی"
  },
  "Bewegung aus der Schicht, Arrhythmie und Partialvolumen können täuschen. Eine frühere Ablation kann selbst eine Narbe hinterlassen.": {
    "en": "Through-plane motion, arrhythmia and partial volume can mislead. Previous ablation can itself leave a scar.",
    "fa": "حرکت خارج از صفحه، آریتمی و حجم جزئی می‌توانند گمراه‌کننده باشند. ابلیشن قبلی خود می‌تواند اسکار بر جای بگذارد."
  },
  "Drei Dinge nicht gleichsetzen": {
    "en": "Do not equate these three things",
    "fa": "این سه را معادل ندانید"
  },
  "Großer RV ist nicht automatisch ARVC. LGE ist nicht automatisch ACM. Und fehlendes LGE schließt eine ARVC nicht aus.": {
    "en": "An enlarged RV does not automatically mean ARVC. LGE does not automatically mean ACM. Absence of LGE does not exclude ARVC.",
    "fa": "RV بزرگ به‌طور خودکار به معنی ARVC نیست. LGE به‌طور خودکار به معنی ACM نیست. نبود LGE نیز ARVC را رد نمی‌کند."
  },
  "Als gelesen markiert": {
    "en": "Marked as read",
    "fa": "خوانده‌شده"
  },
  "Abschnitt als gelesen markieren": {
    "en": "Mark chapter as read",
    "fa": "علامت‌گذاری فصل به‌عنوان خوانده‌شده"
  },
  "Lernpfad": {
    "en": "Learning path",
    "fa": "مسیر یادگیری"
  },
  "gelesen": {
    "en": "read",
    "fa": "خوانده‌شده"
  },
  "Lernpfad schließen": {
    "en": "Close learning path",
    "fa": "بستن مسیر یادگیری"
  },
  "Arrhythmogene Kardiomyopathie": {
    "en": "Arrhythmogenic cardiomyopathy",
    "fa": "کاردیومیوپاتی آریتموژن"
  },
  "ACM verstehen und im MRT einordnen – mit echten Bildbeispielen.": {
    "en": "Understand ACM and assess it on MRI, using actual imaging examples.",
    "fa": "ACM را با نمونه‌های تصویربرداری واقعی بشناسید و در MRI ارزیابی کنید."
  },
  "Take Home Message": {
    "en": "Take Home Message",
    "fa": "پیام نهایی"
  },
  "MCQ starten": {
    "en": "Start MCQ",
    "fa": "شروع سؤال چندگزینه‌ای"
  },
  "Gelesene Kapitel": {
    "en": "Chapters read",
    "fa": "فصل‌های خوانده‌شده"
  },
  "Lektion fortsetzen": {
    "en": "Continue lesson",
    "fa": "ادامهٔ درس"
  },
  "Weiter": {
    "en": "Continue",
    "fa": "ادامه"
  },
  "Alles gelesen": {
    "en": "All read",
    "fa": "همه خوانده‌شده‌اند"
  },
  "Alles als gelesen": {
    "en": "Mark all as read",
    "fa": "علامت‌گذاری همه به‌عنوان خوانده‌شده"
  },
  "Auf diesem Gerät gespeichert. Zum Synchronisieren des Lesefortschritts bitte anmelden.": {
    "en": "Saved on this device. Sign in to synchronise reading progress.",
    "fa": "روی این دستگاه ذخیره شد. برای همگام‌سازی پیشرفت مطالعه وارد حساب شوید."
  },
  "Quellen & Bildnachweise": {
    "en": "Sources & image credits",
    "fa": "منابع و مشخصات تصاویر"
  },
  "Deutsche Fassung · MRT-orientierter Überblick.": {
    "en": "Translated version · MRI-focused overview.",
    "fa": "نسخهٔ ترجمه‌شده · مرور متمرکز بر MRI."
  },
  "Radiopaedia-Originalfälle": {
    "en": "Original Radiopaedia cases",
    "fa": "کیس‌های اصلی Radiopaedia"
  },
  "Die MRT-Bilder und das Cine sind Originalaufnahmen. Einblendbare Orientierungspunkte von RadYar liegen separat über den unveränderten Bildern.": {
    "en": "The MRI images and cine are original acquisitions. Optional RadYar orientation markers lie separately over the unchanged images.",
    "fa": "تصاویر MRI و Cine، تصاویر اصلی هستند. نشانگرهای اختیاری جهت‌یابی رادیار به‌صورت جداگانه روی تصاویر بدون تغییر قرار می‌گیرند."
  },
  "Das Video kann nicht wiedergegeben werden.": {
    "en": "The video cannot be played.",
    "fa": "ویدئو قابل پخش نیست."
  },
  "Originalserie öffnen": {
    "en": "Open original series",
    "fa": "باز کردن سری اصلی"
  },
  "Vergrößern": {
    "en": "Enlarge",
    "fa": "بزرگ‌نمایی"
  },
  "Cine pausieren": {
    "en": "Pause cine",
    "fa": "توقف Cine"
  },
  "Cine abspielen": {
    "en": "Play cine",
    "fa": "پخش Cine"
  },
  "Cine in der Originalserie öffnen": {
    "en": "Open cine in original series",
    "fa": "باز کردن Cine در سری اصلی"
  },
  "Case courtesy of": {
    "en": "Case courtesy of",
    "fa": "کیس از"
  },
  ". Originalaufnahmen unverändert.": {
    "en": ". Original images unchanged.",
    "fa": ". تصاویر اصلی بدون تغییر هستند."
  },
  ". Standbilder zeigen keine Wandbewegung; dafür die Cine-Serie ansehen.": {
    "en": ". Still images do not show wall motion; view the cine series for that.",
    "fa": ". تصاویر ثابت حرکت دیواره را نشان نمی‌دهند؛ برای آن سری Cine را ببینید."
  },
  "Schließen ×": {
    "en": "Close ×",
    "fa": "بستن ×"
  },
  "Optional zum Anschauen: fünf originale MRT-Fälle mit verschiedenen Ansichten. Fall auswählen und bei Bedarf die vollständige Serie auf Radiopaedia öffnen.": {
    "en": "Optional viewing: five original MRI cases with different views. Select a case and open the complete Radiopaedia series when needed.",
    "fa": "مشاهدهٔ اختیاری: پنج کیس اصلی MRI با نماهای گوناگون. کیس را انتخاب کنید و در صورت نیاز سری کامل را در Radiopaedia باز کنید."
  },
  "Radiopaedia-Lehrfälle": {
    "en": "Radiopaedia teaching cases",
    "fa": "کیس‌های آموزشی Radiopaedia"
  },
  "Ein Beispiel verstehen": {
    "en": "Understand an example",
    "fa": "شناخت یک مثال"
  },
  "Warum braucht man die TFC?": {
    "en": "Why are the TFC needed?",
    "fa": "چرا به TFC نیاز داریم؟"
  },
  "Task Force Criteria von 2010": {
    "en": "2010 Task Force Criteria",
    "fa": "معیارهای Task Force سال ۲۰۱۰"
  },
  "ordnen Hinweise aus verschiedenen Untersuchungen zur klassischen rechtsbetonten ARVC. Ein Major-Kriterium ist stärker, ein Minor-Kriterium schwächer gewichtet. Das ist diagnostisches Gewicht und nicht automatisch ein Maß für die Krankheitsschwere.": {
    "en": "combine evidence from different examinations for classic right-dominant ARVC. A major criterion has greater diagnostic weight than a minor criterion. This is diagnostic weight, not automatically a measure of disease severity.",
    "fa": "شواهد بررسی‌های گوناگون را برای ARVC کلاسیکِ غالب در راست کنار هم می‌گذارند. معیار ماژور وزن تشخیصی بیشتری از معیار مینور دارد. این وزن تشخیصی است و به‌طور خودکار معیاری برای شدت بیماری نیست."
  },
  "Der MRT-Baustein: regional UND global": {
    "en": "The MRI component: regional AND global",
    "fa": "جزء MRI: ناحیه‌ای و کلی با هم"
  },
  "Eine regionale RV-Akinesie, Dyskinesie oder dyssynchrone Kontraktion muss mit einem erhöhten RVEDVi oder einer verminderten RVEF zusammenkommen. Ein großer RV allein genügt nicht; eine isolierte Hypokinesie auch nicht.": {
    "en": "Regional RV akinesia, dyskinesia or dyssynchronous contraction must occur together with increased RVEDVi or reduced RVEF. An enlarged RV alone is insufficient; isolated hypokinesia is also insufficient.",
    "fa": "آکینزی، دیسکینزی یا انقباض ناهماهنگ ناحیه‌ای RV باید همراه افزایش RVEDVi یا کاهش RVEF باشد. RV بزرگ به‌تنهایی کافی نیست؛ هیپوکینزی منفرد نیز کافی نیست."
  },
  "Messgröße": {
    "en": "Measurement",
    "fa": "کمیت اندازه‌گیری"
  },
  "RVEDVi · Männer": {
    "en": "RVEDVi · men",
    "fa": "RVEDVi · مردان"
  },
  "≥ 100 bis < 110 ml/m²": {
    "en": "≥ 100 to < 110 mL/m²",
    "fa": "≥ 100 تا < 110 mL/m²"
  },
  "RVEDVi · Frauen": {
    "en": "RVEDVi · women",
    "fa": "RVEDVi · زنان"
  },
  "≥ 90 bis < 100 ml/m²": {
    "en": "≥ 90 to < 100 mL/m²",
    "fa": "≥ 90 تا < 100 mL/m²"
  },
  "RVEF · beide": {
    "en": "RVEF · both sexes",
    "fa": "RVEF · هر دو جنس"
  },
  "> 40 bis ≤ 45 %": {
    "en": "> 40 to ≤ 45%",
    "fa": "> 40 تا ≤ 45٪"
  },
  "Nur zusammen mit der geforderten regionalen Störung. RVEDVi = enddiastolisches RV-Volumen / Körperoberfläche; EF = ausgeworfener Volumenanteil. Bei Kindern und Sportlern die Referenzen gesondert prüfen.": {
    "en": "Only together with the required regional abnormality. RVEDVi = end-diastolic RV volume / body surface area; EF = the fraction of volume ejected. Check references separately for children and athletes.",
    "fa": "فقط همراه اختلال ناحیه‌ای لازم. RVEDVi برابر حجم پایان‌دیاستولی RV تقسیم بر سطح بدن است؛ EF سهم حجم خارج‌شده است. مقادیر مرجع را در کودکان و ورزشکاران جداگانه بررسی کنید."
  },
  "Nicht doppelt zählen:": {
    "en": "Do not count twice:",
    "fa": "دوبار نشمارید:"
  },
  "Erhöhtes RV-Volumen und reduzierte RVEF sind zwei Wege zum selben MRT-Kriterium dieser Kategorie. Ein bildgebendes Major-Kriterium allein ist noch keine gesicherte Gesamtdiagnose. Die übrigen Diagnosebereiche, etwa EKG, Rhythmus und Familie, müssen dazukommen.": {
    "en": "Increased RV volume and reduced RVEF are two routes to the same MRI criterion in this category. One major imaging criterion alone does not establish the overall diagnosis. Other diagnostic domains, such as ECG, rhythm and family history, must be added.",
    "fa": "افزایش حجم RV و کاهش RVEF دو مسیر برای رسیدن به همان معیار MRI در این دسته هستند. یک معیار ماژور تصویربرداری به‌تنهایی تشخیص کلی را قطعی نمی‌کند. سایر حوزه‌های تشخیصی، مانند ECG، ریتم و سابقهٔ خانوادگی نیز باید اضافه شوند."
  },
  "Die Grenze dieses Systems": {
    "en": "The limits of this system",
    "fa": "محدودیت‌های این نظام"
  },
  "LGE und spezifische LV-Kriterien sind in den TFC 2010 nicht enthalten. Deshalb kann eine linksdominante Erkrankung mit diesem System übersehen werden.": {
    "en": "LGE and specific LV criteria are not included in the 2010 TFC. Left-dominant disease may therefore be missed with this system.",
    "fa": "LGE و معیارهای اختصاصی LV در TFC سال ۲۰۱۰ وجود ندارند. بنابراین بیماری غالب در بطن چپ ممکن است با این نظام از نظر دور بماند."
  },
  "Was ergänzt Padua?": {
    "en": "What does Padua add?",
    "fa": "پادوآ چه چیزی اضافه می‌کند؟"
  },
  "Padua-Kriterien von 2020": {
    "en": "2020 Padua criteria",
    "fa": "معیارهای پادوآ سال ۲۰۲۰"
  },
  "erweitern den Blick: Welche Kammer ist betroffen, wie funktioniert sie und wo liegt eine Narbe? Dafür werden LV-Kriterien und die Gewebeinformation aus dem LGE aufgenommen. Die Einordnung berücksichtigt weiterhin auch EKG, Rhythmusdiagnostik und Familie / Genetik.": {
    "en": "broaden the assessment: which ventricle is involved, how does it function and where is a scar? LV criteria and tissue information from LGE are included. Interpretation still also considers ECG, rhythm assessment and family history / genetics.",
    "fa": "دامنهٔ ارزیابی را گسترش می‌دهند: کدام بطن درگیر است، چگونه کار می‌کند و اسکار کجاست؟ معیارهای LV و اطلاعات بافتی LGE وارد ارزیابی می‌شوند. در تفسیر همچنان ECG، بررسی ریتم و سابقهٔ خانوادگی / ژنتیک نیز در نظر گرفته می‌شوند."
  },
  "Worauf achten?": {
    "en": "What should you assess?",
    "fa": "چه چیزی را ارزیابی کنید؟"
  },
  "Rechte Kammer": {
    "en": "Right ventricle",
    "fa": "بطن راست"
  },
  "Regionale Bewegungsstörung, globale Größe und Funktion beurteilen. Auch ein sicher nachgewiesenes transmural streifenförmiges RV-LGE kann ein strukturelles Kriterium sein.": {
    "en": "Assess regional motion abnormalities, global size and function. Definitely demonstrated transmural stria-pattern RV LGE may also constitute a structural criterion.",
    "fa": "اختلال حرکت ناحیه‌ای، اندازه و عملکرد کلی را ارزیابی کنید. LGE ترانس‌مورال نواری RV که به‌طور قطعی نشان داده شده باشد نیز می‌تواند معیار ساختاری باشد."
  },
  "Linke Kammer": {
    "en": "Left ventricle",
    "fa": "بطن چپ"
  },
  "Pumpfunktion und regionale Bewegung prüfen; zusätzlich nach subepikardialem oder intramuralem Streifen-LGE suchen.": {
    "en": "Assess pump function and regional motion; also look for subepicardial or intramural stria-pattern LGE.",
    "fa": "عملکرد پمپاژ و حرکت ناحیه‌ای را بررسی کنید؛ LGE نواری ساب‌اپی‌کاردیال یا داخل‌جداری را نیز جست‌وجو کنید."
  },
  "LGE absichern": {
    "en": "Confirm LGE",
    "fa": "تأیید LGE"
  },
  "Ein passendes Narbenmuster in zwei orthogonalen Ebenen bestätigen. Isoliertes LGE an den septalen RV-Insertionspunkten zählt nicht als LV-LGE-Kriterium.": {
    "en": "Confirm a compatible scar pattern in two orthogonal planes. Isolated LGE at the septal RV insertion points does not count as an LV LGE criterion.",
    "fa": "الگوی اسکار سازگار را در دو صفحهٔ عمود بر هم تأیید کنید. LGE منفرد در نقاط اتصال سپتالی RV، معیار LGE بطن چپ محسوب نمی‌شود."
  },
  "Strukturelle Grundlage": {
    "en": "Structural basis",
    "fa": "پایهٔ ساختاری"
  },
  "Mindestens ein morphofunktionelles oder strukturelles Kriterium muss erfüllt sein. Für Volumen und Funktion geeignete Referenzwerte verwenden.": {
    "en": "At least one morphofunctional or structural criterion must be met. Use appropriate reference values for volumes and function.",
    "fa": "حداقل یک معیار مورفوفانکشنال یا ساختاری باید برقرار باشد. برای حجم و عملکرد از مقادیر مرجع مناسب استفاده کنید."
  },
  "RV, LV oder beide?": {
    "en": "RV, LV or both?",
    "fa": "RV، LV یا هر دو؟"
  },
  "Belegte Veränderungen nur rechts ergeben ein rechtsbetontes Muster; Veränderungen beider Kammern ein biventrikuläres Muster. Bei rein linksdominantem Muster verlangt Padua zusätzlich eine passende pathogene oder wahrscheinlich pathogene ACM-Genvariante. LV-LGE allein reicht nicht.": {
    "en": "Demonstrated changes confined to the right ventricle produce a right-dominant pattern; changes in both ventricles produce a biventricular pattern. For a purely left-dominant pattern, Padua additionally requires a compatible pathogenic or likely pathogenic ACM gene variant. LV LGE alone is insufficient.",
    "fa": "تغییرات اثبات‌شده فقط در راست، الگوی غالب در راست و تغییرات هر دو بطن، الگوی دو‌بطنی ایجاد می‌کنند. در الگوی صرفاً غالب در چپ، پادوآ علاوه بر آن یک واریانت ژنی ACM سازگار از نوع بیماری‌زا یا احتمالاً بیماری‌زا را لازم می‌داند. LGE بطن چپ به‌تنهایی کافی نیست."
  },
  "Padua erweitert die TFC, ist aber ein eigenes Kriterienwerk. Die festen RV-Grenzwerte der TFC 2010 und die Padua-Kriterien nicht zu einer selbst erfundenen Punkteliste vermischen. Andere Narbenursachen, insbesondere Myokarditis, bleiben wichtig.": {
    "en": "Padua expands on the TFC but is a separate criteria framework. Do not mix the fixed 2010 TFC RV cut-offs and Padua criteria into an invented scoring list. Other causes of scarring, especially myocarditis, remain important.",
    "fa": "پادوآ دامنهٔ TFC را گسترش می‌دهد، اما چارچوب معیارهای جداگانه‌ای است. آستانه‌های ثابت RV در TFC سال ۲۰۱۰ را با معیارهای پادوآ در فهرست امتیازدهی ابداعی مخلوط نکنید. سایر علل اسکار، به‌ویژه میوکاردیت، همچنان مهم‌اند."
  },
  "Vom Cine zum TFC-MRT-Baustein": {
    "en": "From cine to the TFC MRI component",
    "fa": "از Cine تا جزء MRI در TFC"
  },
  "Das Cine aus dem Bildkapitel gehört zu einem": {
    "en": "The cine in the imaging chapter belongs to a",
    "fa": "Cine فصل تصاویر مربوط است به یک"
  },
  "50-jährigen Mann mit bekannter ARVC": {
    "en": "50-year-old man with known ARVC",
    "fa": "مرد ۵۰ ساله با ARVC شناخته‌شده"
  },
  ", untersucht nach einer RVOT-Ablation. Die Originalbeschreibung nennt dyskinetische, aneurysmatische RV-Ausbuchtungen, einen RVEDVi von": {
    "en": ", examined after RVOT ablation. The original report describes dyskinetic, aneurysmal RV bulges, an RVEDVi of",
    "fa": "است که پس از ابلیشن RVOT بررسی شده است. گزارش اصلی برآمدگی‌های آنوریسمی و دیسکینتیک RV، مقدار RVEDVi برابر با"
  },
  "und eine RVEF von": {
    "en": "and an RVEF of",
    "fa": "و RVEF برابر با"
  },
  "Die beschriebene Dyskinesie erfüllt den geforderten regionalen Teil.": {
    "en": "The reported dyskinesia fulfils the required regional component.",
    "fa": "دیسکینزی گزارش‌شده، جزء ناحیه‌ای لازم را برآورده می‌کند."
  },
  "115 ml/m² liegt beim Mann über der Major-Grenze für das RVEDVi. Die RVEF von 41 % liegt dagegen im Minor-Bereich.": {
    "en": "In a man, 115 mL/m² exceeds the major RVEDVi threshold. The RVEF of 41%, however, is in the minor range.",
    "fa": "در مردان، مقدار 115 mL/m² بالاتر از آستانهٔ ماژور RVEDVi است. در مقابل، RVEF برابر 41٪ در محدودهٔ مینور قرار می‌گیرد."
  },
  "Zusammenführen:": {
    "en": "Combine the findings:",
    "fa": "یافته‌ها را کنار هم بگذارید:"
  },
  "Das ergibt einen Major-MRT-Baustein aus dieser Kategorie. Volumen und EF werden nicht als zwei getrennte Kriterien addiert.": {
    "en": "This yields one major MRI component in this category. Volume and EF are not added as two separate criteria.",
    "fa": "حاصل، یک جزء ماژور MRI از این دسته است. حجم و EF به‌عنوان دو معیار جداگانه با هم جمع نمی‌شوند."
  },
  "Warum der Zusammenhang wichtig ist": {
    "en": "Why context matters",
    "fa": "چرا زمینه اهمیت دارد"
  },
  "Bei denselben Zahlen ohne die geforderte regionale Störung wäre der MRT-Baustein der TFC 2010 nicht erfüllt. Und selbst ein erfüllter MRT-Baustein ersetzt nicht die übrige diagnostische Einordnung.": {
    "en": "With the same numbers but without the required regional abnormality, the MRI component of the 2010 TFC would not be fulfilled. Even a fulfilled MRI component does not replace the remaining diagnostic assessment.",
    "fa": "با همین اعداد اما بدون اختلال ناحیه‌ای لازم، جزء MRI در TFC سال ۲۰۱۰ برقرار نخواهد بود. حتی برقرار بودن جزء MRI نیز جایگزین سایر ارزیابی‌های تشخیصی نمی‌شود."
  },
  "Zahlen und Bewegungsbefund aus dem Originalfall von Tim Luijkx:": {
    "en": "Measurements and motion findings from the original case by Tim Luijkx:",
    "fa": "اندازه‌گیری‌ها و یافتهٔ حرکتی از کیس اصلی Tim Luijkx:"
  },
  ". Dies erklärt die Kriterien anhand einer bereits diagnostizierten Erkrankung.": {
    "en": ". This illustrates the criteria using a disease already diagnosed.",
    "fa": ". این مثال معیارها را بر اساس بیماری از پیش تشخیص‌داده‌شده توضیح می‌دهد."
  },
  "Kein einzelnes MRT-Zeichen beweist eine ACM.": {
    "en": "No single MRI sign proves ACM.",
    "fa": "هیچ علامت منفرد MRI، ACM را ثابت نمی‌کند."
  },
  "TFC und Padua sind Regelwerke, die Befunde aus Bildgebung, EKG, Rhythmusdiagnostik und Familiengeschichte / Genetik zu einer Diagnose zusammenführen.": {
    "en": "TFC and Padua are frameworks that combine imaging, ECG, rhythm assessment and family history / genetics to reach a diagnosis.",
    "fa": "TFC و پادوآ چارچوب‌هایی هستند که یافته‌های تصویربرداری، ECG، بررسی ریتم و سابقهٔ خانوادگی / ژنتیک را برای رسیدن به تشخیص کنار هم می‌گذارند."
  },
  "ACM verstehen": {
    "en": "Understand ACM",
    "fa": "شناخت ACM"
  },
  "ACM verstehen: RV, LV oder beide?": {
    "en": "Understand ACM: RV, LV or both?",
    "fa": "شناخت ACM: RV، LV یا هر دو؟"
  },
  "MRT systematisch lesen": {
    "en": "Read MRI systematically",
    "fa": "خواندن نظام‌مند MRI"
  },
  "MRT: Bewegung, Funktion und Gewebe": {
    "en": "MRI: motion, function and tissue",
    "fa": "MRI: حرکت، عملکرد و بافت"
  },
  "Typische MRT-Befunde": {
    "en": "Typical MRI findings",
    "fa": "یافته‌های معمول MRI"
  },
  "Typische Befunde an echten MRTs": {
    "en": "Typical findings on actual MRI",
    "fa": "یافته‌های معمول در MRI واقعی"
  },
  "TFC und Padua verständlich anwenden": {
    "en": "Apply TFC and Padua with understanding",
    "fa": "کاربرد آگاهانهٔ TFC و پادوآ"
  },
  "Wichtige Fallstricke": {
    "en": "Important pitfalls",
    "fa": "دام‌های مهم"
  },
  "Was eine ACM imitieren kann": {
    "en": "What can mimic ACM",
    "fa": "چه چیزی می‌تواند شبیه ACM باشد"
  },
  "Weitere MRTs · optional": {
    "en": "More MRI cases · optional",
    "fa": "MRIهای بیشتر · اختیاری"
  },
  "Weitere MRT-Beispiele · optional": {
    "en": "More MRI examples · optional",
    "fa": "نمونه‌های بیشتر MRI · اختیاری"
  },
  "Originalarbeit: revidierte Task-Force-Kriterien": {
    "en": "Original paper: revised Task Force Criteria",
    "fa": "مقالهٔ اصلی: معیارهای بازنگری‌شدهٔ Task Force"
  },
  "Originalkonsens: Die Padua-Kriterien": {
    "en": "Original consensus: the Padua criteria",
    "fa": "اجماع اصلی: معیارهای پادوآ"
  },
  "Entwicklung und Anwendung der Diagnosekriterien": {
    "en": "Development and application of diagnostic criteria",
    "fa": "تدوین و کاربرد معیارهای تشخیصی"
  },
  "Standardisierte Kardio-MRT-Protokolle": {
    "en": "Standardised cardiac MRI protocols",
    "fa": "پروتکل‌های استاندارد MRI قلب"
  },
  "Aktueller Bildgebungsüberblick: RV, LV und Fallstricke": {
    "en": "Current imaging overview: RV, LV and pitfalls",
    "fa": "مرور کنونی تصویربرداری: RV، LV و دام‌ها"
  },
  "Bildquelle: Anatomie-MRT-Korrelationen mit Radiopaedia-Fällen": {
    "en": "Image source: anatomy–MRI correlations with Radiopaedia cases",
    "fa": "منبع تصاویر: تطبیق آناتومی و MRI همراه کیس‌های Radiopaedia"
  },
  "Originalstudie zur prognostischen Bedeutung der LV-Beteiligung": {
    "en": "Original study on the prognostic importance of LV involvement",
    "fa": "مطالعهٔ اصلی دربارهٔ اهمیت پیش‌آگهی درگیری LV"
  },
  "Weiterentwicklung der Kriterien nach Padua": {
    "en": "Further development of criteria after Padua",
    "fa": "تکامل معیارها پس از پادوآ"
  },
  "Großer RV, auffällige Bewegung, kein LGE": {
    "en": "Enlarged RV, abnormal motion, no LGE",
    "fa": "RV بزرگ، حرکت غیرطبیعی، بدون LGE"
  },
  "35 Jahre · Mann": {
    "en": "35 years · man",
    "fa": "۳۵ سال · مرد"
  },
  "Diagnose im Originalfall: sicher": {
    "en": "Original case diagnosis: definite",
    "fa": "تشخیص در کیس اصلی: قطعی"
  },
  "Länger bestehende Dyspnoe und eingeschränkte Belastbarkeit; im EKG ein Schenkelblock.": {
    "en": "Long-standing dyspnoea and reduced exercise tolerance; bundle branch block on ECG.",
    "fa": "تنگی نفس طولانی‌مدت و کاهش تحمل فعالیت؛ بلوک شاخه‌ای در ECG."
  },
  "Axial Cine · segmented 4 CH · Standbild": {
    "en": "Axial cine · segmented 4 CH · still image",
    "fa": "Cine محوری · segmented 4 CH · تصویر ثابت"
  },
  "Vierkammer-Cine-Standbild bei ausgeprägter RV-Vergrößerung, Radiopaedia 57972.": {
    "en": "Four-chamber cine still image with marked RV enlargement, Radiopaedia 57972.",
    "fa": "تصویر ثابت Cine چهارحفره‌ای با بزرگ‌شدگی شدید RV، از Radiopaedia 57972."
  },
  "Cine RVOT · SSFP · Standbild": {
    "en": "RVOT cine · SSFP · still image",
    "fa": "Cine مسیر خروجی RV · SSFP · تصویر ثابت"
  },
  "RVOT-Cine-Standbild aus Radiopaedia-Fall 57972.": {
    "en": "RVOT cine still image from Radiopaedia case 57972.",
    "fa": "تصویر ثابت Cine مسیر خروجی RV از کیس Radiopaedia 57972."
  },
  "Weitere Cine-Ebene": {
    "en": "Additional cine plane",
    "fa": "نمای تکمیلی Cine"
  },
  "CINE R2 · SSFP · Standbild": {
    "en": "CINE R2 · SSFP · still image",
    "fa": "CINE R2 · SSFP · تصویر ثابت"
  },
  "Zusätzliche SSFP-Cine-Ebene aus Radiopaedia-Fall 57972.": {
    "en": "Additional SSFP cine plane from Radiopaedia case 57972.",
    "fa": "نمای تکمیلی SSFP Cine از کیس Radiopaedia 57972."
  },
  "SAX · Phase sensitive IR · Standbild": {
    "en": "SAX · phase-sensitive IR · still image",
    "fa": "SAX · phase-sensitive IR · تصویر ثابت"
  },
  "PSIR-Standbild der kurzen Achse aus Radiopaedia-Fall 57972.": {
    "en": "Short-axis PSIR still image from Radiopaedia case 57972.",
    "fa": "تصویر ثابت PSIR محور کوتاه از کیس Radiopaedia 57972."
  },
  "Zuerst Kammergrößen vergleichen, dann die freie RV-Wand im vollständigen Cine verfolgen. Der Originalfall beschreibt Dyskinesien / paradoxe Bewegung am Übergang RVOT–Apex und kein auffälliges LGE.": {
    "en": "Compare ventricular sizes first, then follow the free RV wall through the full cine. The original case describes dyskinesia / paradoxical motion at the RVOT–apex transition and no abnormal LGE.",
    "fa": "ابتدا اندازهٔ بطن‌ها را مقایسه کنید، سپس دیوارهٔ آزاد RV را در Cine کامل دنبال کنید. کیس اصلی، دیسکینزی / حرکت پارادوکس در محل گذار RVOT به اپکس و نبود LGE غیرطبیعی را توصیف می‌کند."
  },
  "Regionale Bewegungsstörung plus erhöhte RVEDVi / reduzierte RVEF ergibt einen bildgebenden TFC-Baustein. Volumen und EF zählen hier zusammen als ein Kriterium, nicht als zwei Major-Kriterien.": {
    "en": "Regional motion abnormality plus increased RVEDVi / reduced RVEF provides an imaging TFC component. Volume and EF count together as one criterion here, not as two major criteria.",
    "fa": "اختلال حرکت ناحیه‌ای همراه افزایش RVEDVi / کاهش RVEF یک جزء تصویربرداری TFC را تشکیل می‌دهد. حجم و EF در اینجا با هم یک معیار محسوب می‌شوند، نه دو معیار ماژور."
  },
  "Die vier lokalen Aufnahmen sind Standbilder. Die regionale Bewegung ist im Original-Cine zu prüfen; die 4-Kammer-Serie ist laut Quelle durch Arrhythmie beeinträchtigt.": {
    "en": "The four local images are still frames. Check regional motion in the original cine; the source reports arrhythmia-related degradation of the four-chamber series.",
    "fa": "چهار تصویر محلی ثابت هستند. حرکت ناحیه‌ای را باید در Cine اصلی بررسی کرد؛ طبق منبع، سری چهارحفره‌ای تحت تأثیر آریتمی قرار گرفته است."
  },
  "Der LV gehört zur Diagnose dazu": {
    "en": "The LV is part of the diagnosis too",
    "fa": "LV نیز بخشی از تشخیص است"
  },
  "30 Jahre · Mann": {
    "en": "30 years · man",
    "fa": "۳۰ سال · مرد"
  },
  "Diagnose im Originalfall: sehr wahrscheinlich": {
    "en": "Original case diagnosis: highly probable",
    "fa": "تشخیص در کیس اصلی: بسیار محتمل"
  },
  "Palpitationen, eine Synkope und auffälliges EKG.": {
    "en": "Palpitations, syncope and an abnormal ECG.",
    "fa": "تپش قلب، سنکوپ و ECG غیرطبیعی."
  },
  "LGE · 4-Kammer": {
    "en": "LGE · four-chamber",
    "fa": "LGE · چهارحفره‌ای"
  },
  "4CH · PSIR · Standbild": {
    "en": "4CH · PSIR · still image",
    "fa": "4CH · PSIR · تصویر ثابت"
  },
  "PSIR im Vierkammerblick bei biventrikulärer Beteiligung, Radiopaedia 194915.": {
    "en": "Four-chamber PSIR with biventricular involvement, Radiopaedia 194915.",
    "fa": "PSIR چهارحفره‌ای با درگیری دو‌بطنی، از Radiopaedia 194915."
  },
  "LGE · kurze Achse": {
    "en": "LGE · short axis",
    "fa": "LGE · محور کوتاه"
  },
  "Short axis · PSIR · Standbild": {
    "en": "Short axis · PSIR · still image",
    "fa": "محور کوتاه · PSIR · تصویر ثابت"
  },
  "PSIR in kurzer Achse bei biventrikulärer Beteiligung, Radiopaedia 194915.": {
    "en": "Short-axis PSIR with biventricular involvement, Radiopaedia 194915.",
    "fa": "PSIR محور کوتاه با درگیری دو‌بطنی، از Radiopaedia 194915."
  },
  "Short axis · T1 blackblood · Standbild": {
    "en": "Short axis · T1 black-blood · still image",
    "fa": "محور کوتاه · T1 black-blood · تصویر ثابت"
  },
  "T1-Black-Blood-Aufnahme in kurzer Achse bei ACM, Radiopaedia 194915.": {
    "en": "Short-axis T1 black-blood image in ACM, Radiopaedia 194915.",
    "fa": "تصویر T1 black-blood محور کوتاه در ACM، از Radiopaedia 194915."
  },
  "Der Originalfall beschreibt einen dilatierten RV mit dünner, welliger Wand, regionaler Ausbuchtung und LGE. Zusätzlich bestehen Gewebeveränderungen und LGE in anterolateralen / inferolateralen LV-Segmenten.": {
    "en": "The original case describes a dilated RV with a thin, wavy wall, regional bulging and LGE. Tissue changes and LGE also involve anterolateral / inferolateral LV segments.",
    "fa": "کیس اصلی RV متسع با دیوارهٔ نازک و موج‌دار، برآمدگی ناحیه‌ای و LGE را توصیف می‌کند. افزون بر آن، تغییرات بافتی و LGE در سگمان‌های قدامی‌جانبی / تحتانی‌جانبی LV وجود دارد."
  },
  "Eine relativ erhaltene LVEF schließt LV-Beteiligung nicht aus. Cine und PSIR liefern unterschiedliche, sich ergänzende Informationen.": {
    "en": "Relatively preserved LVEF does not exclude LV involvement. Cine and PSIR provide different, complementary information.",
    "fa": "LVEF نسبتاً حفظ‌شده، درگیری LV را رد نمی‌کند. Cine و PSIR اطلاعات متفاوت و مکملی فراهم می‌کنند."
  },
  "Das nichtischämische LGE-Muster unterstützt die Einordnung; die vollständigen Serien und die übrigen Diagnosebereiche bleiben erforderlich.": {
    "en": "The non-ischaemic LGE pattern supports interpretation; complete series and the other diagnostic domains remain necessary.",
    "fa": "الگوی غیرایسکمیک LGE از تفسیر پشتیبانی می‌کند؛ سری‌های کامل و سایر حوزه‌های تشخیصی همچنان لازم‌اند."
  },
  "Cine in Bewegung": {
    "en": "Cine in motion",
    "fa": "Cine در حرکت"
  },
  "Dyskinesie im echten Cine verfolgen": {
    "en": "Follow dyskinesia on actual cine",
    "fa": "دیسکینزی را در Cine واقعی دنبال کنید"
  },
  "50 Jahre · Mann": {
    "en": "50 years · man",
    "fa": "۵۰ سال · مرد"
  },
  "Bekannte ARVC nach VT-Ablation am RVOT. Untersuchung von Bewegung und Pumpfunktion.": {
    "en": "Known ARVC after VT ablation at the RVOT. Assessment of motion and pump function.",
    "fa": "ARVC شناخته‌شده پس از ابلیشن VT در RVOT. بررسی حرکت و عملکرد پمپاژ."
  },
  "4-Kammer-Cine · Video": {
    "en": "Four-chamber cine · video",
    "fa": "Cine چهارحفره‌ای · ویدئو"
  },
  "4 chamber · cine video · Originalschleife": {
    "en": "4 chamber · cine video · original loop",
    "fa": "چهارحفره‌ای · ویدئوی Cine · حلقهٔ اصلی"
  },
  "Echtes Vierkammer-Cine mit rechtsventrikulären Wandbewegungsstörungen.": {
    "en": "Actual four-chamber cine with right ventricular wall-motion abnormalities.",
    "fa": "Cine واقعی چهارحفره‌ای با اختلال حرکت دیوارهٔ بطن راست."
  },
  "Video starten und die freie RV-Wand sowie den Apex über Systole und Diastole verfolgen. Der Originalfall beschreibt ausgeprägte dyskinetische, aneurysmatische Ausbuchtungen bei normaler LV-Wandbewegung.": {
    "en": "Start the video and follow the free RV wall and apex throughout systole and diastole. The original case describes marked dyskinetic, aneurysmal bulges with normal LV wall motion.",
    "fa": "ویدئو را پخش کنید و دیوارهٔ آزاد RV و اپکس را در سیستول و دیاستول دنبال کنید. کیس اصلی برآمدگی‌های آنوریسمی و دیسکینتیک شدید را همراه حرکت طبیعی دیوارهٔ LV توصیف می‌کند."
  },
  "Die Bewegungsinformation entsteht erst über den Herzzyklus. Die reduzierte RVEF und das vergrößerte indexierte RV-Volumen werden damit gemeinsam eingeordnet.": {
    "en": "Motion information emerges only over the cardiac cycle. Reduced RVEF and increased indexed RV volume are interpreted together with it.",
    "fa": "اطلاعات حرکتی تنها در طول چرخهٔ قلب به دست می‌آید. کاهش RVEF و افزایش حجم ایندکس‌شدهٔ RV با این اطلاعات کنار هم تفسیر می‌شوند."
  },
  "Wichtig beim LGE der vollständigen Untersuchung: Eine frühere Ablation kann selbst Narben erzeugen. Nicht jedes Enhancement ist allein der ACM zuzuschreiben.": {
    "en": "Important when assessing LGE in the complete examination: prior ablation can itself cause scars. Not all enhancement is attributable to ACM alone.",
    "fa": "نکتهٔ مهم در ارزیابی LGE بررسی کامل: ابلیشن قبلی خود می‌تواند اسکار ایجاد کند. هر افزایش سیگنال پس از تزریق را نمی‌توان صرفاً به ACM نسبت داد."
  },
  "Schwere RV-Dysfunktion": {
    "en": "Severe RV dysfunction",
    "fa": "اختلال شدید عملکرد RV"
  },
  "Morphologie, Funktion und Vorgeschichte verbinden": {
    "en": "Combine morphology, function and history",
    "fa": "مورفولوژی، عملکرد و سابقه را کنار هم بگذارید"
  },
  "14 Jahre · Mädchen": {
    "en": "14 years · girl",
    "fa": "۱۴ سال · دختر"
  },
  "Arrhythmien, Dyspnoe und Belastungsintoleranz; plötzlicher Herztod in der Familie. Trikuspidalklappenrekonstruktion im Säuglingsalter.": {
    "en": "Arrhythmias, dyspnoea and exercise intolerance; family history of sudden cardiac death. Tricuspid valve reconstruction in infancy.",
    "fa": "آریتمی، تنگی نفس و عدم تحمل فعالیت؛ سابقهٔ مرگ ناگهانی قلبی در خانواده. بازسازی دریچهٔ تریکوسپید در شیرخوارگی."
  },
  "Cine · 4-Kammer": {
    "en": "Cine · four-chamber",
    "fa": "Cine · چهارحفره‌ای"
  },
  "4ch Cine · SSFP · Standbild": {
    "en": "4ch cine · SSFP · still image",
    "fa": "Cine چهارحفره‌ای · SSFP · تصویر ثابت"
  },
  "Vierkammer-Cine-Standbild mit ausgeprägter RV-Dilatation im Fall 87505.": {
    "en": "Four-chamber cine still image showing marked RV dilatation in case 87505.",
    "fa": "تصویر ثابت Cine چهارحفره‌ای با اتساع شدید RV در کیس 87505."
  },
  "4ch · IRGRE · Standbild": {
    "en": "4ch · IRGRE · still image",
    "fa": "چهارحفره‌ای · IRGRE · تصویر ثابت"
  },
  "IRGRE-LGE im Vierkammerblick des pädiatrischen ARVC-Falls 87505.": {
    "en": "Four-chamber IRGRE LGE in paediatric ARVC case 87505.",
    "fa": "IRGRE LGE چهارحفره‌ای در کیس ARVC کودکان با شناسهٔ 87505."
  },
  "Cine · LV-Längsachse": {
    "en": "Cine · LV long axis",
    "fa": "Cine · محور طولی LV"
  },
  "2ch (LV) · Cine SSFP · Standbild": {
    "en": "2ch (LV) · cine SSFP · still image",
    "fa": "دوحفره‌ای (LV) · Cine SSFP · تصویر ثابت"
  },
  "Cine-SSFP-Standbild aus dem pädiatrischen ARVC-Fall 87505.": {
    "en": "Cine SSFP still image from paediatric ARVC case 87505.",
    "fa": "تصویر ثابت Cine SSFP از کیس ARVC کودکان با شناسهٔ 87505."
  },
  "Die Originaluntersuchung zeigt eine schwere RV-Dilatation, regionale A-/Dyskinesien und RV-LGE. Zuerst im Vierkammerblick die vergrößerte rechte Kammer verfolgen, dann Cine und LGE vergleichen. Die LV-Längsachse ist eine ergänzende Ebene.": {
    "en": "The original examination shows severe RV dilatation, regional akinesia/dyskinesia and RV LGE. Follow the enlarged right ventricle in the four-chamber view first, then compare cine and LGE. The LV long axis is an additional plane.",
    "fa": "بررسی اصلی، اتساع شدید RV، آکینزی/دیسکینزی ناحیه‌ای و LGE در RV را نشان می‌دهد. ابتدا بطن راست بزرگ را در نمای چهارحفره‌ای دنبال و سپس Cine و LGE را مقایسه کنید. محور طولی LV نمای تکمیلی است."
  },
  "Starke Funktionsstörung, regionale Veränderungen und Familienanamnese zusammen betrachten. Die Voroperation hilft, lokale Artefakte zu erklären.": {
    "en": "Consider severe dysfunction, regional changes and family history together. Prior surgery helps explain local artefacts.",
    "fa": "اختلال شدید عملکرد، تغییرات ناحیه‌ای و سابقهٔ خانوادگی را با هم در نظر بگیرید. جراحی قبلی به توضیح آرتیفکت‌های موضعی کمک می‌کند."
  },
  "Pädiatrischer Fall: feste TFC-Grenzen für Erwachsene nicht ungeprüft anwenden. Der Originalfall beschreibt zusätzlich ein Suszeptibilitätsartefakt an der rekonstruierten Trikuspidalklappe.": {
    "en": "Paediatric case: do not apply fixed adult TFC cut-offs without checking. The original case also describes a susceptibility artefact at the reconstructed tricuspid valve.",
    "fa": "کیس کودکان: آستانه‌های ثابت TFC بزرگسالان را بدون بررسی به‌کار نبرید. کیس اصلی آرتیفکت حساسیت مغناطیسی در محل دریچهٔ تریکوسپید بازسازی‌شده را نیز توصیف می‌کند."
  },
  "RV-Kontur im Kindesalter": {
    "en": "RV contour in childhood",
    "fa": "کانتور RV در کودکی"
  },
  "Die freie RV-Wand systematisch verfolgen": {
    "en": "Follow the free RV wall systematically",
    "fa": "دیوارهٔ آزاد RV را نظام‌مند دنبال کنید"
  },
  "10 Jahre · Junge": {
    "en": "10 years · boy",
    "fa": "۱۰ سال · پسر"
  },
  "Publizierter ARVC-Lehrfall": {
    "en": "Published ARVC teaching case",
    "fa": "کیس آموزشی منتشرشدهٔ ARVC"
  },
  "Pädiatrisches MRT-Beispiel aus der publizierten Übersicht von Cainap et al.": {
    "en": "Paediatric MRI example from the published review by Cainap et al.",
    "fa": "نمونهٔ MRI کودکان از مرور منتشرشدهٔ Cainap و همکاران."
  },
  "Vierkammerblick · publiziertes MRT-Standbild": {
    "en": "Four-chamber view · published MRI still image",
    "fa": "نمای چهارحفره‌ای · تصویر ثابت منتشرشدهٔ MRI"
  },
  "Vierkammer-MRT eines zehnjährigen Jungen mit RV-Vergrößerung und auffälliger RV-Kontur.": {
    "en": "Four-chamber MRI of a ten-year-old boy with RV enlargement and an abnormal RV contour.",
    "fa": "MRI چهارحفره‌ای پسر ده‌ساله با بزرگ‌شدگی RV و کانتور غیرطبیعی RV."
  },
  "Vom Trikuspidalring über die freie RV-Wand bis zum Apex gehen. Die Veröffentlichung beschreibt RV-Vergrößerung, eine dünne Wand und Aneurysmabildung.": {
    "en": "Follow the wall from the tricuspid annulus along the free RV wall to the apex. The publication describes RV enlargement, a thin wall and aneurysm formation.",
    "fa": "از حلقهٔ تریکوسپید، دیوارهٔ آزاد RV را تا اپکس دنبال کنید. مقاله بزرگ‌شدگی RV، دیوارهٔ نازک و تشکیل آنوریسم را توصیف می‌کند."
  },
  "Eine auffällige Kontur ist ein Ausgangspunkt für die gezielte Cine-Prüfung in zwei Ebenen.": {
    "en": "An abnormal contour is a starting point for targeted cine assessment in two planes.",
    "fa": "کانتور غیرطبیعی نقطهٔ شروع ارزیابی هدفمند Cine در دو صفحه است."
  },
  "Die genaue Pulssequenz ist in der zugänglichen veröffentlichten Bildlegende nicht genannt. Keine EF oder Dyskinesie allein aus diesem Standbild ableiten. Abbildung aus Cainap et al., 2021, Abb. 9.": {
    "en": "The exact pulse sequence is not named in the accessible published caption. Do not infer EF or dyskinesia from this still image alone. Image from Cainap et al., 2021, Fig. 9.",
    "fa": "سکانس دقیق در شرح تصویر منتشرشدهٔ در دسترس نام برده نشده است. EF یا دیسکینزی را فقط از این تصویر ثابت نتیجه نگیرید. تصویر از Cainap و همکاران، ۲۰۲۱، شکل ۹."
  },
  "CT als Ergänzung": {
    "en": "CT as a complement",
    "fa": "CT به‌عنوان روش مکمل"
  },
  "Auch im Trauma-CT kann die ARVC auffallen": {
    "en": "ARVC may also be noticed on trauma CT",
    "fa": "ARVC ممکن است در CT تروما نیز دیده شود"
  },
  "45 Jahre · Mann": {
    "en": "45 years · man",
    "fa": "۴۵ سال · مرد"
  },
  "Trauma-CT bei bekannter ARVC; ein Zweikammer-ICD liegt bereits.": {
    "en": "Trauma CT in known ARVC; a dual-chamber ICD is already present.",
    "fa": "CT تروما در ARVC شناخته‌شده؛ ICD دوحفره‌ای از قبل وجود دارد."
  },
  "CT · axial": {
    "en": "CT · axial",
    "fa": "CT · محوری"
  },
  "Axial C+ · split bolus · CT-Standbild": {
    "en": "Axial C+ · split bolus · CT still image",
    "fa": "محوری با تزریق · split bolus · تصویر ثابت CT"
  },
  "Kontrastmittel-CT bei bekannter ARVC mit dilatiertem RV und ICD.": {
    "en": "Contrast-enhanced CT in known ARVC with a dilated RV and ICD.",
    "fa": "CT با تزریق در ARVC شناخته‌شده با RV متسع و ICD."
  },
  "Der Originalfall zeigt einen deutlich dilatierten RV mit verdünnter, fetthaltiger Wand. Den ICD als Hinweis auf die bekannte Rhythmuserkrankung einordnen.": {
    "en": "The original case shows a markedly dilated RV with a thin, fat-containing wall. Interpret the ICD as a clue to the known rhythm disorder.",
    "fa": "کیس اصلی RV به‌شدت متسع با دیوارهٔ نازک و حاوی چربی را نشان می‌دهد. ICD را سرنخی از اختلال ریتم شناخته‌شده بدانید."
  },
  "CT kann die Morphologie illustrieren. Die MRT-spezifischen Funktions- und Gewebekriterien lassen sich daraus nicht ersetzen.": {
    "en": "CT can illustrate morphology. It cannot replace the MRI-specific functional and tissue criteria.",
    "fa": "CT می‌تواند مورفولوژی را نشان دهد، اما جایگزین معیارهای عملکردی و بافتی اختصاصی MRI نمی‌شود."
  },
  "Bewusst ein CT-Vergleichsfall, kein MRT. Fett allein beweist keine ACM und ist kein eigenständiges TFC- / Padua-Kriterium.": {
    "en": "Intentionally a CT comparison case, not MRI. Fat alone does not prove ACM and is not an independent TFC / Padua criterion.",
    "fa": "این کیس عمداً برای مقایسهٔ CT انتخاب شده است، نه به‌عنوان MRI. چربی به‌تنهایی ACM را ثابت نمی‌کند و معیار مستقل TFC / پادوآ نیست."
  },
  "ACM ist mehr als eine Erkrankung des RV.": {
    "en": "ACM is more than an RV disease.",
    "fa": "ACM فراتر از بیماری RV است."
  },
  "ARVC bezeichnet die klassische rechtsbetonte Form. Auch der LV kann mitbetroffen sein oder im Vordergrund stehen; das ist für Diagnose und Prognose relevant.": {
    "en": "ARVC describes the classic right-dominant form. The LV may also be involved or predominate; this matters for diagnosis and prognosis.",
    "fa": "ARVC شکل کلاسیکِ غالب در راست را توصیف می‌کند. LV نیز ممکن است درگیر یا غالب باشد؛ این موضوع برای تشخیص و پیش‌آگهی مهم است."
  },
  "Bewegung, Funktion und Gewebe getrennt beurteilen.": {
    "en": "Assess motion, function and tissue separately.",
    "fa": "حرکت، عملکرد و بافت را جداگانه ارزیابی کنید."
  },
  "Cine zeigt regionale Bewegung, der vollständige Cine-Stapel liefert Volumen und EF, LGE zeigt das Narbenmuster. Immer beide Kammern prüfen.": {
    "en": "Cine shows regional motion, the complete cine stack provides volumes and EF, and LGE shows the scar pattern. Always assess both ventricles.",
    "fa": "Cine حرکت ناحیه‌ای را نشان می‌دهد، مجموعهٔ کامل Cine حجم‌ها و EF را فراهم می‌کند و LGE الگوی اسکار را نشان می‌دهد. همیشه هر دو بطن را بررسی کنید."
  },
  "TFC 2010: regional UND global.": {
    "en": "TFC 2010: regional AND global.",
    "fa": "TFC 2010: ناحیه‌ای و کلی با هم."
  },
  "Die geforderte regionale RV-Bewegungsstörung muss zusammen mit dem passenden RVEDVi- oder RVEF-Grenzwert vorliegen. Volumen und EF zählen in dieser Kategorie nicht doppelt.": {
    "en": "The required regional RV motion abnormality must occur together with the appropriate RVEDVi or RVEF threshold. Volume and EF are not counted twice in this category.",
    "fa": "اختلال حرکت ناحیه‌ای لازم در RV باید همراه آستانهٔ مناسب RVEDVi یا RVEF باشد. حجم و EF در این دسته دوبار شمرده نمی‌شوند."
  },
  "Padua 2020 ergänzt LV und LGE.": {
    "en": "Padua 2020 adds LV and LGE.",
    "fa": "پادوآ ۲۰۲۰، LV و LGE را اضافه می‌کند."
  },
  "Die Kriterien erfassen auch biventrikuläre und linksdominante Formen. Bei rein linksdominantem Muster ist die passende Genetik ein wesentlicher Teil der Einordnung.": {
    "en": "The criteria also cover biventricular and left-dominant forms. For a purely left-dominant pattern, compatible genetics is an essential part of interpretation.",
    "fa": "معیارها شکل‌های دو‌بطنی و غالب در چپ را نیز در بر می‌گیرند. در الگوی صرفاً غالب در چپ، ژنتیک سازگار بخشی اساسی از تفسیر است."
  },
  "Ein Einzelzeichen stellt keine Diagnose.": {
    "en": "One sign does not establish a diagnosis.",
    "fa": "یک علامت، تشخیص را قطعی نمی‌کند."
  },
  "Sportherz, Belastung des RV, Myokarditis und Artefakte können überlappen. Fehlendes LGE schließt ARVC nicht aus; Fett oder LGE allein beweisen keine ACM.": {
    "en": "Athletic adaptation, RV loading, myocarditis and artefacts may overlap. Absence of LGE does not exclude ARVC; fat or LGE alone does not prove ACM.",
    "fa": "سازگاری ورزشی، اضافه‌بار RV، میوکاردیت و آرتیفکت‌ها ممکن است همپوشانی داشته باشند. نبود LGE، ARVC را رد نمی‌کند؛ چربی یا LGE به‌تنهایی ACM را ثابت نمی‌کند."
  },
  "Merke": {
    "en": "Remember",
    "fa": "به خاطر بسپارید"
  },
  "Wie bewegt sich die Wand?": {
    "en": "How does the wall move?",
    "fa": "دیواره چگونه حرکت می‌کند؟"
  },
  "Bewegte bSSFP-Aufnahmen im Vierkammerblick, in kurzen Achsen und in passenden RV-Ebenen.": {
    "en": "Moving bSSFP acquisitions in the four-chamber view, short axes and suitable RV planes.",
    "fa": "تصاویر متحرک bSSFP در نمای چهارحفره‌ای، محورهای کوتاه و صفحات مناسب RV."
  },
  "Freie RV-Wand und Herzspitze über den ganzen Herzzyklus verfolgen. Bewegt sich ein Abschnitt nicht oder paradox nach außen?": {
    "en": "Follow the free RV wall and apex throughout the cardiac cycle. Does a segment fail to move or move paradoxically outward?",
    "fa": "دیوارهٔ آزاد RV و اپکس را در کل چرخهٔ قلب دنبال کنید. آیا بخشی حرکت نمی‌کند یا به‌صورت پارادوکس به بیرون حرکت می‌کند؟"
  },
  "Ein Standbild zeigt keine Bewegung. Arrhythmie und Bewegung aus der Ebene können eine Störung vortäuschen.": {
    "en": "A still image does not show motion. Arrhythmia and through-plane motion may simulate an abnormality.",
    "fa": "تصویر ثابت حرکت را نشان نمی‌دهد. آریتمی و حرکت خارج از صفحه ممکن است اختلالی را تقلید کنند."
  },
  "Volumen & EF": {
    "en": "Volumes & EF",
    "fa": "حجم‌ها و EF"
  },
  "Wie groß, wie kräftig?": {
    "en": "How large, how strong?",
    "fa": "چه اندازه و با چه قدرتی؟"
  },
  "Vollständiger Cine-Stapel von der Herzbasis bis zur Spitze, mit enddiastolischen und endsystolischen Konturen.": {
    "en": "A complete cine stack from cardiac base to apex, with end-diastolic and end-systolic contours.",
    "fa": "مجموعهٔ کامل Cine از قاعدهٔ قلب تا اپکس، با ترسیم حدود در پایان دیاستول و پایان سیستول."
  },
  "RV und LV messen und vergleichen. EDVi bedeutet enddiastolisches Volumen bezogen auf die Körperoberfläche; EF ist der ausgeworfene Volumenanteil.": {
    "en": "Measure and compare RV and LV. EDVi means end-diastolic volume indexed to body surface area; EF is the fraction of volume ejected.",
    "fa": "RV و LV را اندازه‌گیری و مقایسه کنید. EDVi حجم پایان‌دیاستولی نسبت به سطح بدن است؛ EF سهم حجم خارج‌شده است."
  },
  "Die RV-Größe allein reicht nicht. Messung und Referenzwerte müssen zur Person passen; Kinder und Sportler gesondert einordnen.": {
    "en": "RV size alone is insufficient. Measurements and reference values must suit the individual; assess children and athletes separately.",
    "fa": "اندازهٔ RV به‌تنهایی کافی نیست. اندازه‌گیری و مقادیر مرجع باید متناسب با فرد باشند؛ کودکان و ورزشکاران را جداگانه ارزیابی کنید."
  },
  "Wo liegt eine Narbe?": {
    "en": "Where is a scar?",
    "fa": "اسکار کجاست؟"
  },
  "Aufnahmen nach Kontrastmittel, zum Beispiel mit Inversion Recovery oder PSIR, in kurzen und langen Achsen.": {
    "en": "Post-contrast acquisitions, for example inversion recovery or PSIR, in short and long axes.",
    "fa": "تصاویر پس از تزریق، برای مثال Inversion Recovery یا PSIR، در محورهای کوتاه و طولی."
  },
  "Anreicherung in der RV- und LV-Wand suchen. Beim LV sind subepikardiale oder intramurale Muster relevant; Ort und Verteilung beschreiben.": {
    "en": "Look for enhancement in RV and LV walls. Subepicardial or intramural LV patterns are relevant; describe location and distribution.",
    "fa": "تقویت پس از تزریق در دیوارهٔ RV و LV را جست‌وجو کنید. در LV الگوهای ساب‌اپی‌کاردیال یا داخل‌جداری اهمیت دارند؛ محل و توزیع را توصیف کنید."
  },
  "Die dünne RV-Wand ist schwierig zu beurteilen. Auffälligkeiten in einer zweiten Ebene bestätigen; nicht jede helle Stelle ist eine Narbe.": {
    "en": "The thin RV wall is difficult to assess. Confirm abnormalities in a second plane; not every bright focus is a scar.",
    "fa": "ارزیابی دیوارهٔ نازک RV دشوار است. یافتهٔ غیرطبیعی را در صفحهٔ دوم تأیید کنید؛ هر نقطهٔ روشن اسکار نیست."
  },
  "Welche Aufnahmen?": {
    "en": "Which acquisitions?",
    "fa": "کدام تصاویر؟"
  },
  "Häufiger Fehler": {
    "en": "Common pitfall",
    "fa": "دام شایع"
  },
  "T1-/T2-Mapping kann bei einer zusätzlichen Gewebefrage ergänzen. Für den ersten Überblick bleiben Cine, Kammerfunktion und LGE die drei Grundbausteine.": {
    "en": "T1/T2 mapping may complement an additional tissue question. For an initial overview, cine, ventricular function and LGE remain the three basic components.",
    "fa": "T1/T2 mapping می‌تواند برای پرسش بافتی تکمیلی مفید باشد. در مرور اولیه، Cine، عملکرد بطن و LGE همچنان سه جزء اصلی هستند."
  },
  "Bewegung · Cine": {
    "en": "Motion · cine",
    "fa": "حرکت · Cine"
  },
  "Narben · LGE": {
    "en": "Scars · LGE",
    "fa": "اسکارها · LGE"
  },
  "LGE · zweite Ebene": {
    "en": "LGE · second plane",
    "fa": "LGE · صفحهٔ دوم"
  },
  "Wandbewegung: die Begriffe auseinanderhalten": {
    "en": "Wall motion: distinguish the terms",
    "fa": "حرکت دیواره: اصطلاحات را تفکیک کنید"
  },
  "Einfach erklärt": {
    "en": "Simply explained",
    "fa": "توضیح ساده"
  },
  "Ein Wandabschnitt zieht sich schwächer zusammen. Allein reicht das nicht als regionale RV-Störung für den MRT-Baustein der TFC 2010.": {
    "en": "A wall segment contracts less strongly. Alone, this is insufficient as the regional RV abnormality required for the MRI component of the 2010 TFC.",
    "fa": "بخشی از دیواره ضعیف‌تر منقبض می‌شود. این یافته به‌تنهایی برای اختلال ناحیه‌ای RV در جزء MRI معیارهای TFC سال ۲۰۱۰ کافی نیست."
  },
  "Ein Wandabschnitt kontrahiert nicht. Im vollständigen Cine und in einer weiteren Ebene überprüfen.": {
    "en": "A wall segment does not contract. Confirm it in the complete cine and another plane.",
    "fa": "بخشی از دیواره منقبض نمی‌شود. آن را در Cine کامل و صفحهٔ دیگری بررسی کنید."
  },
  "Ein Wandabschnitt wölbt sich in der Systole nach außen, während sich die übrige Kammer zusammenzieht.": {
    "en": "A wall segment bulges outward in systole while the remaining ventricle contracts.",
    "fa": "بخشی از دیواره در سیستول به بیرون برآمده می‌شود، در حالی که بقیهٔ بطن منقبض می‌شود."
  },
  "LGE: die Lage in der Wand ist wichtig": {
    "en": "LGE: location within the wall matters",
    "fa": "LGE: محل در دیواره اهمیت دارد"
  },
  "bedeutet Late Gadolinium Enhancement: eine Aufnahme nach Kontrastmittel, die bei der Beurteilung von Narben hilft. Im LV können bei ACM streifenförmige Veränderungen außen in der Wand (subepikardial) oder in der Wandmitte (intramural) auftreten. Eine relativ erhaltene LVEF schließt diese Beteiligung nicht aus.": {
    "en": "means late gadolinium enhancement: a post-contrast acquisition that helps assess scars. In ACM, stria-pattern changes may occur in the outer LV wall (subepicardial) or midwall (intramural). Relatively preserved LVEF does not exclude this involvement.",
    "fa": "به معنی Late Gadolinium Enhancement است: تصویربرداری پس از تزریق که به ارزیابی اسکار کمک می‌کند. در ACM ممکن است تغییرات نواری در بخش بیرونی دیوارهٔ LV (ساب‌اپی‌کاردیال) یا میانهٔ دیواره (داخل‌جداری) رخ دهند. LVEF نسبتاً حفظ‌شده این درگیری را رد نمی‌کند."
  },
  "Was bedeutet das?": {
    "en": "What does this mean?",
    "fa": "چه معنایی دارد؟"
  },
  "Subepikardial / intramural": {
    "en": "Subepicardial / intramural",
    "fa": "ساب‌اپی‌کاردیال / داخل‌جداری"
  },
  "Nichtischämisches Muster. Kann zu ACM passen, kommt aber auch bei anderen Erkrankungen wie Myokarditis vor.": {
    "en": "Non-ischaemic pattern. It may fit ACM but also occurs in other diseases such as myocarditis.",
    "fa": "الگوی غیرایسکمیک. می‌تواند با ACM سازگار باشد، اما در بیماری‌های دیگری مانند میوکاردیت نیز رخ می‌دهد."
  },
  "Subendokardial bis transmural": {
    "en": "Subendocardial to transmural",
    "fa": "از ساب‌اندوکاردیال تا ترانس‌مورال"
  },
  "Bei passender Verteilung in einem Koronarterritorium eine ischämische Ursache prüfen.": {
    "en": "If distributed within a coronary territory, assess for an ischaemic cause.",
    "fa": "در صورت توزیع سازگار با قلمرو یک شریان کرونر، علت ایسکمیک را بررسی کنید."
  },
  "Nur an septalen RV-Insertionspunkten": {
    "en": "Confined to septal RV insertion points",
    "fa": "محدود به نقاط اتصال سپتالی RV"
  },
  "Dieses isolierte Muster zählt nach Padua nicht als LV-LGE-Kriterium.": {
    "en": "This isolated pattern does not count as an LV LGE criterion under Padua.",
    "fa": "این الگوی منفرد طبق پادوآ معیار LGE بطن چپ محسوب نمی‌شود."
  },
  "Was die Originalbilder zeigen": {
    "en": "What the original images show",
    "fa": "آنچه تصاویر اصلی نشان می‌دهند"
  },
  "Die beiden PSIR-Ansichten gehören zum selben Patienten. Die Orientierungspunkte zeigen die Kammerhöhlen, nicht die Ausdehnung einer Narbe. Das vollständige Muster in den Originalserien beurteilen.": {
    "en": "Both PSIR views belong to the same patient. The orientation markers show the ventricular cavities, not scar extent. Assess the full pattern in the original series.",
    "fa": "هر دو نمای PSIR متعلق به یک بیمار هستند. نشانگرهای جهت‌یابی حفره‌های بطن را نشان می‌دهند، نه وسعت اسکار. الگوی کامل را در سری‌های اصلی بررسی کنید."
  },
  "Wie bewegt sich die RV-Wand?": {
    "en": "How does the RV wall move?",
    "fa": "دیوارهٔ RV چگونه حرکت می‌کند؟"
  },
  "Im Originalfall sind Ausbuchtungen mit auffälliger RV-Wandbewegung beschrieben. Der LV bewegt sich normal.": {
    "en": "The original case describes bulges with abnormal RV wall motion. LV motion is normal.",
    "fa": "کیس اصلی برآمدگی‌هایی با حرکت غیرطبیعی دیوارهٔ RV را توصیف می‌کند. حرکت LV طبیعی است."
  },
  "Cine starten und die freie RV-Wand bis zur Herzspitze verfolgen.": {
    "en": "Start the cine and follow the free RV wall to the apex.",
    "fa": "Cine را پخش کنید و دیوارهٔ آزاد RV را تا اپکس دنبال کنید."
  },
  "Dyskinesie bedeutet: Ein Wandabschnitt bewegt sich in der Systole nach außen.": {
    "en": "Dyskinesia means a wall segment moves outward in systole.",
    "fa": "دیسکینزی یعنی بخشی از دیواره در سیستول به بیرون حرکت می‌کند."
  },
  "Bekannte ARVC; Untersuchung nach einer früheren Ablation. Die Bewegung über den ganzen Herzzyklus beurteilen.": {
    "en": "Known ARVC; examination after previous ablation. Assess motion across the whole cardiac cycle.",
    "fa": "ARVC شناخته‌شده؛ بررسی پس از ابلیشن قبلی. حرکت را در کل چرخهٔ قلب ارزیابی کنید."
  },
  "Auch die linke Kammer ansehen": {
    "en": "Assess the left ventricle too",
    "fa": "بطن چپ را نیز ارزیابی کنید"
  },
  "Die Originaluntersuchung beschreibt LGE in beiden Kammern. Eine LV-Beteiligung ist auch bei relativ guter Pumpfunktion möglich.": {
    "en": "The original examination describes LGE in both ventricles. LV involvement is possible even with relatively good pump function.",
    "fa": "بررسی اصلی LGE در هر دو بطن را توصیف می‌کند. درگیری LV حتی با عملکرد پمپاژ نسبتاً خوب نیز ممکن است."
  },
  "RV und LV finden, dann die jeweilige Herzwand verfolgen.": {
    "en": "Identify RV and LV, then follow each ventricular wall.",
    "fa": "RV و LV را پیدا کنید، سپس دیوارهٔ هر بطن را دنبال کنید."
  },
  "Zum Vergleich die zweite Ebene öffnen.": {
    "en": "Open the second plane for comparison.",
    "fa": "برای مقایسه صفحهٔ دوم را باز کنید."
  },
  "Die Punkte dienen der Orientierung und markieren keine Narbe. LGE allein beweist keine ACM.": {
    "en": "The markers provide orientation and do not mark a scar. LGE alone does not prove ACM.",
    "fa": "نشانگرها برای جهت‌یابی هستند و اسکار را علامت‌گذاری نمی‌کنند. LGE به‌تنهایی ACM را ثابت نمی‌کند."
  },
  "Dasselbe Herz in der kurzen Achse": {
    "en": "The same heart in short axis",
    "fa": "همان قلب در محور کوتاه"
  },
  "Diese PSIR-Aufnahme gehört zum selben Patienten. Die Originalquelle markiert hier eine Anreicherung der LV-Wand.": {
    "en": "This PSIR image belongs to the same patient. The original source marks LV wall enhancement here.",
    "fa": "این تصویر PSIR متعلق به همان بیمار است. منبع اصلی در اینجا تقویت پس از تزریق در دیوارهٔ LV را علامت‌گذاری می‌کند."
  },
  "Das runde LV-Lumen finden und die umgebende Muskelwand ansehen.": {
    "en": "Find the round LV cavity and inspect the surrounding myocardium.",
    "fa": "حفرهٔ گرد LV را پیدا کنید و عضلهٔ اطراف آن را بررسی کنید."
  },
  "Die Auffälligkeit mit der Vierkammeraufnahme vergleichen.": {
    "en": "Compare the finding with the four-chamber image.",
    "fa": "یافته را با تصویر چهارحفره‌ای مقایسه کنید."
  },
  "Eine zweite Ebene hilft, echte Veränderungen von Artefakten zu unterscheiden.": {
    "en": "A second plane helps distinguish genuine changes from artefacts.",
    "fa": "صفحهٔ دوم به افتراق تغییرات واقعی از آرتیفکت کمک می‌کند."
  },
  "Orientierung im Originalbild:": {
    "en": "Orientation on the original image:",
    "fa": "جهت‌یابی در تصویر اصلی:"
  },
  "Am Originalbild lernen · Radiopaedia rID": {
    "en": "Learn from the original image · Radiopaedia rID",
    "fa": "یادگیری از تصویر اصلی · شناسهٔ Radiopaedia"
  },
  "Markierungen ausblenden": {
    "en": "Hide markers",
    "fa": "پنهان کردن نشانگرها"
  },
  "Orientierung einblenden": {
    "en": "Show orientation",
    "fa": "نمایش جهت‌یابی"
  },
  "Vergrößern ↗": {
    "en": "Enlarge ↗",
    "fa": "بزرگ‌نمایی ↗"
  },
  "Cine in der Originalserie öffnen ↗": {
    "en": "Open cine in original series ↗",
    "fa": "باز کردن Cine در سری اصلی ↗"
  },
  ". Originalaufnahme unverändert": {
    "en": ". Original acquisition unchanged",
    "fa": ". تصویر اصلی بدون تغییر است"
  },
  "; einblendbare Orientierungspunkte von RadYar.": {
    "en": "; optional RadYar orientation markers.",
    "fa": "؛ نشانگرهای اختیاری جهت‌یابی رادیار."
  },
  "Form": {
    "en": "Form",
    "fa": "نوع"
  },
  "LV-dominant": {
    "en": "LV-dominant",
    "fa": "غالب در LV"
  },
  "Sportherz": {
    "en": "Athlete’s heart",
    "fa": "قلب ورزشکار"
  },
  "Myokarditis": {
    "en": "Myocarditis",
    "fa": "میوکاردیت"
  },
  "Brotkrumennavigation": {
    "en": "Breadcrumb navigation",
    "fa": "مسیر راهبری"
  },
  "Thorax": {
    "en": "Thorax",
    "fa": "قفسهٔ سینه"
  },
  "Flashcards": {
    "en": "Flashcards",
    "fa": "فلش‌کارت‌ها"
  },
  "Originalserie": {
    "en": "Original series",
    "fa": "سری اصلی"
  },
  "Tempo": {
    "en": "Speed",
    "fa": "سرعت"
  },
  "Die": {
    "en": "The",
    "fa": "این"
  },
  "Major": {
    "en": "Major",
    "fa": "ماژور"
  },
  "Minor": {
    "en": "Minor",
    "fa": "مینور"
  },
  "Baustein": {
    "en": "Component",
    "fa": "جزء"
  },
  "Regional:": {
    "en": "Regional:",
    "fa": "ناحیه‌ای:"
  },
  "Global:": {
    "en": "Global:",
    "fa": "کلی:"
  },
  "RV-Dilatation": {
    "en": "RV dilatation",
    "fa": "اتساع RV"
  },
  "4-Kammer-Cine": {
    "en": "Four-chamber cine",
    "fa": "Cine چهارحفره‌ای"
  },
  "RVOT-Cine": {
    "en": "RVOT cine",
    "fa": "Cine مسیر خروجی RV"
  },
  "4-Kammer-MRT": {
    "en": "Four-chamber MRI",
    "fa": "MRI چهارحفره‌ای"
  },
  "Begriff": {
    "en": "Term",
    "fa": "اصطلاح"
  },
  "Hypokinesie": {
    "en": "Hypokinesia",
    "fa": "هیپوکینزی"
  },
  "Akinesie": {
    "en": "Akinesia",
    "fa": "آکینزی"
  },
  "Dyskinesie": {
    "en": "Dyskinesia",
    "fa": "دیسکینزی"
  },
  "Muster": {
    "en": "Pattern",
    "fa": "الگو"
  },
  "RV-Lumen": {
    "en": "RV cavity",
    "fa": "حفرهٔ RV"
  },
  "LV-Lumen": {
    "en": "LV cavity",
    "fa": "حفرهٔ LV"
  },
  "Abschnitt öffnen:": {
    "en": "Open chapter:",
    "fa": "باز کردن فصل:"
  },
  "Ansichten für Fall": {
    "en": "Views for case",
    "fa": "نماهای کیس"
  },
  "vergrößern": {
    "en": "Enlarge",
    "fa": "بزرگ‌نمایی"
  },
  "MRT vergrößert:": {
    "en": "Enlarged MRI:",
    "fa": "MRI بزرگ‌نمایی‌شده:"
  },
  "Lehr-Cine:": {
    "en": "Teaching cine:",
    "fa": "Cine آموزشی:"
  }
}

export function arvcText(value, lang = 'de') {
  if (typeof value !== 'string' || lang === 'de') return value
  const text=value.replace(/\s+/g,' ').trim()
  const pair=COPY[text]
  if(pair) return (/^\s/.test(value)?' ':'')+(pair[lang]||value)+(/\s$/.test(value)?' ':'')
  for(const prefix of ['Abschnitt öffnen:','Ansichten für Fall','MRT vergrößert:','Lehr-Cine:']) {
    if(text.startsWith(prefix+' ')) return COPY[prefix][lang]+' '+arvcText(text.slice(prefix.length+1),lang)
  }
  if(text.endsWith(' vergrößern')) return COPY['vergrößern'][lang]+' '+arvcText(text.slice(0,-' vergrößern'.length),lang)
  return value
}
const retainedProps=new Set(['id','key','ref','className','style','href','src','poster','d','viewBox','role','aria-controls','aria-labelledby','htmlFor','type','value','name','icon','idPrefix','lessonId','lessonRoute','caseId','selected','lang','dir'])
const languageHref=(href,lang)=>{
  if(lang==='de'||typeof href!=='string'||!href.startsWith('/')||href.startsWith('//'))return href
  const [withoutHash,hash]=href.split('#'),[pathname,query='']=withoutHash.split('?')
  const params=new URLSearchParams(query);params.set('lang',lang)
  return pathname+'?'+params.toString()+(hash?'#'+hash:'')
}
// Pure React-value localisation at authored component boundaries. No DOM mutation
// or component invocation: event handlers, scoring IDs and media paths are retained.
export function localizeArvcTree(value,lang='de') {
  if(lang==='de')return value
  if(typeof value==='string')return arvcText(value,lang)
  if(Array.isArray(value))return value.some(isValidElement)?Children.map(value,item=>localizeArvcTree(item,lang)):value.map(item=>localizeArvcTree(item,lang))
  if(isValidElement(value)) {
    const props={}
    for(const [key,item] of Object.entries(value.props))props[key]=key==='href'?languageHref(item,lang):retainedProps.has(key)?item:localizeArvcTree(item,lang)
    return cloneElement(value,props)
  }
  if(value&&typeof value==='object'&&Object.getPrototypeOf(value)===Object.prototype){
    const result={};for(const [key,item]of Object.entries(value))result[key]=retainedProps.has(key)?item:localizeArvcTree(item,lang);return result
  }
  return value
}
