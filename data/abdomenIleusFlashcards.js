const L = (de, en, fa) => ({ de, en, fa })

export const ILEUS_FLASHCARD_TOPIC = {
  id: 'ileus-duenndarm',
  area: 'Abdomen',
  chapter: 'Gastrointestinaltrakt',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/ileus-duenndarm',
  title: L('Dünndarmileus', 'Small-bowel obstruction', 'انسداد رودهٔ باریک'),
  subtitle: L('CT-Muster · Übergang · Ischämiezeichen', 'CT patterns · transition zone · ischaemia signs', 'الگوهای CT · نقطهٔ گذار · نشانه‌های ایسکمی'),
}

const cards = [
  {
  "id": "small-bowel-feces-definition",
  "category": {
    "de": "CT-Zeichen",
    "en": "CT sign",
    "fa": "علامت CT"
  },
  "front": {
    "de": "Wie sieht das Small-Bowel-Feces-Zeichen im CT aus?",
    "en": "What does the small-bowel feces sign look like on CT?",
    "fa": "علامت مدفوع رودهٔ باریک در CT چه شکلی است؟"
  },
  "answer": {
    "de": "Partikelhaltiger, stuhlähnlicher Inhalt mit Gasbläschen in einer dilatierten Dünndarmschlinge.",
    "en": "Particulate, faeces-like material mixed with gas bubbles within a dilated small-bowel loop.",
    "fa": "محتوای ذره‌ای شبیه مدفوع همراه حباب‌های گاز در یک لوپ متسع رودهٔ باریک."
  },
  "explanation": {
    "de": "Das Zeichen liegt häufig nahe vor der Übergangszone und kann bei deren Lokalisation helfen. Es ist ein Hinweis innerhalb des Gesamtmusters, keine alleinige Schweregradmessung.",
    "en": "The sign is often close to the transition zone and may help localise it. It is one clue within the overall pattern, not a standalone measure of severity.",
    "fa": "این علامت اغلب نزدیک نقطهٔ گذار است و می‌تواند به مکان‌یابی آن کمک کند. بخشی از الگوی کلی است و به‌تنهایی شدت بیماری را تعیین نمی‌کند."
  },
  "diagram": {
    "de": "Dilatierter Dünndarm → Fäzeszeichen nahe dem Übergang → kollabierter Darm",
    "en": "Dilated small bowel → feces sign near transition → collapsed bowel",
    "fa": "رودهٔ متسع ← علامت نزدیک نقطهٔ گذار ← رودهٔ فروریخته"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/29045179/"
},
  {
  "id": "small-bowel-feces-interpretation",
  "category": {
    "de": "Einordnung",
    "en": "Interpretation",
    "fa": "تفسیر"
  },
  "front": {
    "de": "Was darf aus dem Small-Bowel-Feces-Zeichen allein nicht abgeleitet werden?",
    "en": "What should not be inferred from the small-bowel feces sign alone?",
    "fa": "از علامت مدفوع رودهٔ باریک به‌تنهایی چه چیزی را نباید نتیجه گرفت؟"
  },
  "answer": {
    "de": "Dass eine Ischämie sicher vorliegt oder ausgeschlossen ist, oder dass allein dadurch ein bestimmtes Management feststeht.",
    "en": "That ischaemia is definitely present or excluded, or that the sign alone determines management.",
    "fa": "اینکه ایسکمی قطعاً وجود دارد یا رد شده، یا اینکه این علامت به‌تنهایی مدیریت مشخصی را تعیین می‌کند."
  },
  "explanation": {
    "de": "Die Studie zu adhäsionsbedingtem Dünndarmileus fand keinen unabhängigen Vorhersagewert für Ischämie oder erfolgreiche nichtoperative Behandlung. Die Lage des Zeichens kann dennoch beim Finden der Übergangszone helfen.",
    "en": "In an adhesive small-bowel obstruction cohort, the sign had no independent predictive value for ischaemia or successful non-operative treatment. Its location may still help identify the transition zone.",
    "fa": "در یک مطالعه روی انسداد چسبندگی رودهٔ باریک، علامت ارزش پیش‌بینی مستقل برای ایسکمی یا موفقیت درمان غیرجراحی نداشت؛ با این حال، محل آن می‌تواند به یافتن نقطهٔ گذار کمک کند."
  },
  "diagram": {
    "de": "Lokalisation: hilfreich · Schweregrad allein: nein",
    "en": "Localisation: helpful · severity alone: no",
    "fa": "مکان‌یابی: مفید · تعیین شدت به‌تنهایی: خیر"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/29045179/"
},
  {
  "id": "closed-loop-ischaemia-signs",
  "category": {
    "de": "Komplikationszeichen",
    "en": "Complication signs",
    "fa": "نشانه‌های عارضه"
  },
  "front": {
    "de": "Welche CT-Zeichen bei einer geschlossenen Schlinge machen die Beurteilung auf Ischämie besonders wichtig?",
    "en": "Which CT findings with a closed loop make assessment for ischaemia especially important?",
    "fa": "همراه لوپ بسته، کدام یافته‌های CT ارزیابی ایسکمی را مهم‌تر می‌کنند؟"
  },
  "answer": {
    "de": "Verminderte Wandkontrastierung, Wandverdickung, Pneumatosis intestinalis und portalvenöses Gas.",
    "en": "Reduced bowel-wall enhancement, wall thickening, pneumatosis intestinalis and portal venous gas.",
    "fa": "کاهش جذب مادهٔ حاجب در دیواره، ضخیم‌شدن دیواره، پنوماتوز اینتستینال و گاز ورید پورت."
  },
  "explanation": {
    "de": "Warnzeichen haben unterschiedliche diagnostische Aussagekraft. Verminderte Wandkontrastierung und begleitende Mesenterial-/Schlingenveränderungen gemeinsam beurteilen; das Fehlen von Pneumatosis oder Portalvenengas ist kein sicherer Ischämieausschluss.",
    "en": "Warning signs differ in diagnostic performance. Assess reduced enhancement together with mesenteric and loop changes; absence of pneumatosis or portal venous gas does not reliably exclude ischaemia.",
    "fa": "ارزش تشخیصی نشانه‌های هشدار متفاوت است. کاهش تقویت دیواره را همراه تغییرات مزانتر و لوپ بررسی کنید؛ نبود پنوماتوز یا گاز ورید پورت، ایسکمی را با اطمینان رد نمی‌کند."
  },
  "diagram": {
    "de": "Wand · Kontrastierung · Mesenterium · Schlingenkonfiguration gemeinsam beurteilen",
    "en": "Assess wall · enhancement · mesentery · loop configuration together",
    "fa": "دیواره · جذب مادهٔ حاجب · مزانتر · شکل لوپ را با هم ارزیابی کنید"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/28759326/"
},
  {
  "id": "foramen-winslow-location",
  "category": {
    "de": "Lokalisation im CT",
    "en": "CT localisation",
    "fa": "محل‌یابی در CT"
  },
  "front": {
    "de": "Welche anatomische CT-Route spricht für eine Foramen-Winslow-Hernie?",
    "en": "Which anatomical CT route suggests a foramen of Winslow hernia?",
    "fa": "کدام مسیر آناتومیک در CT به نفع فتق فورامن وینسلو است؟"
  },
  "answer": {
    "de": "Darmdurchtritt zwischen Pfortader und Vena cava inferior in die Bursa omentalis hinter dem Magen.",
    "en": "Bowel passing between portal vein and inferior vena cava into the lesser sac behind the stomach.",
    "fa": "عبور روده از میان ورید پورت و ورید اجوف تحتانی به بورس امنتال پشت معده."
  },
  "explanation": {
    "de": "Den Darmverlauf und die Durchtrittsstelle nachvollziehen. Die Lage in der Bursa omentalis und der Bezug zu Pfortader/Vena cava ergeben den anatomischen Hinweis.",
    "en": "Trace bowel continuity and the passage. The lesser-sac location and relationship to portal vein/vena cava provide the anatomical clue.",
    "fa": "تداوم روده و محل عبور را دنبال کنید. قرارگیری در بورس امنتال و ارتباط با ورید پورت و اجوف، سرنخ آناتومیک را فراهم می‌کنند."
  },
  "diagram": {
    "de": "Bursa omentalis · hinter dem Magen",
    "en": "Lesser sac · behind the stomach",
    "fa": "بورس امنتال · پشت معده"
  },
  "source": "https://doi.org/10.11231/jaem.40.751"
},
]

export const ILEUS_FLASHCARDS = cards.map((card, index) => ({
  ...card,
  id: `ileus-duenndarm-${String(index + 1).padStart(2, '0')}-${card.id}`,
  topicId: 'ileus-duenndarm',
}))

export const INTUSSUSCEPTION_FLASHCARD_TOPIC = {
  id: 'intussusception',
  area: 'Abdomen',
  chapter: 'Gastrointestinaltrakt',
  icon: 'Sono',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/intussusception',
  title: L('Intussuszeption', 'Intussusception', 'اینتوساسپشن'),
  subtitle: L('Sonografische Zeichen · zwei Ebenen', 'Sonographic signs · two planes', 'نشانه‌های سونوگرافی · دو صفحه'),
}

export const INTUSSUSCEPTION_FLASHCARDS = [{
  "id": "intussusception-01-two-views",
  "topicId": "intussusception",
  "category": {
    "de": "Sonografie",
    "en": "Ultrasound",
    "fa": "سونوگرافی"
  },
  "front": {
    "de": "Welche Zeichen können dieselbe Intussuszeption in Quer- und Längsschnitt zeigen?",
    "en": "Which signs can show the same intussusception in transverse and longitudinal views?",
    "fa": "کدام نشانه‌ها می‌توانند همان اینتوساسپشن را در برش عرضی و طولی نشان دهند؟"
  },
  "answer": {
    "de": "Im Querschnitt das Ziel- oder Doughnut-Zeichen; im Längsschnitt das Pseudokidney- oder Sandwich-Zeichen.",
    "en": "The transverse view may show the target or doughnut sign; the longitudinal view may show the pseudokidney or sandwich sign.",
    "fa": "در نمای عرضی ممکن است علامت هدف یا دونات دیده شود؛ در نمای طولی علامت شبه‌کلیه یا ساندویچی."
  },
  "explanation": {
    "de": "Die unterschiedlichen Namen beschreiben Ansichten desselben ineinandergeschobenen Darmsegments. Beide Ebenen gemeinsam beurteilen.",
    "en": "The different names describe views of the same telescoped bowel segment. Assess both planes together.",
    "fa": "نام‌های متفاوت، نماهای گوناگون از همان بخش روده‌ای فرورفته در بخش دیگر را توصیف می‌کنند. هر دو صفحه را با هم ارزیابی کنید."
  },
  "diagram": {
    "de": "Querschnitt: Ziel / Doughnut · Längsschnitt: Pseudokidney / Sandwich",
    "en": "Transverse: target / doughnut · longitudinal: pseudokidney / sandwich",
    "fa": "عرضی: هدف / دونات · طولی: شبه‌کلیه / ساندویچ"
  },
  "source": "https://doi.org/10.1111/j.1442-200X.2012.03622_1.x"
}]
