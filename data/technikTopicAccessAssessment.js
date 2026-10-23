const L = (de, en, fa) => ({ de, en, fa })

// Focused retrieval for existing Technik.pdf lessons; legal scope is Germany.
const topics = [
  {
    id: 'strahlenschutz-gesetzliche-grundlagen',
    title: L('Rechtfertigende Indikation', 'Justifying indication', 'اندیکاسیون توجیه‌کننده'),
    source: 'Technik.pdf pp.16–17; https://www.gesetze-im-internet.de/strlschg/__83.html',
    correct: 'B',
    prompt: L('Eine CT-Anforderung liegt vor. Was ist vor der individuellen medizinischen Strahlenanwendung zusätzlich erforderlich?', 'A CT request has been received. What is additionally required before the individual medical exposure?', 'درخواست CT دریافت شده است. پیش از مواجههٔ پزشکی فرد با پرتو، چه اقدام دیگری لازم است؟'),
    options: [
      L('Die Anforderung genügt als rechtfertigende Indikation.', 'The request itself is sufficient justification.', 'خود درخواست برای توجیه مواجهه کافی است.'),
      L('Eine ärztliche Entscheidung mit der dafür erforderlichen Fachkunde, ob und wie die Anwendung erfolgt; der gesundheitliche Nutzen muss das Strahlenrisiko überwiegen.', 'A physician with the required expertise must decide whether and how to perform the exposure; the health benefit must outweigh the radiation risk.', 'پزشک دارای صلاحیت لازم باید دربارهٔ انجام و چگونگی کاربرد تصمیم بگیرد؛ منفعت سلامت باید بر خطر پرتویی برتری داشته باشد.'),
      L('Die Betriebsgenehmigung des Geräts ersetzt die individuelle Entscheidung.', 'Authorization to operate the scanner replaces the individual decision.', 'مجوز کار دستگاه جایگزین تصمیم فردی می‌شود.'),
      L('Ein Standardprotokoll genügt unabhängig von der individuellen Fragestellung.', 'A standard protocol is sufficient regardless of the individual clinical question.', 'پروتکل استاندارد، مستقل از پرسش بالینی فرد، کافی است.'),
    ],
    explanation: L('Die rechtfertigende Indikation bezieht sich auf die einzelne Anwendung. Eine Anforderung, Betriebsgenehmigung oder Protokollwahl ersetzt die ärztliche Nutzen-Risiko-Entscheidung mit erforderlicher Fachkunde nicht.', 'The justifying indication concerns the individual exposure. A request, operating authorization or protocol choice does not replace the benefit–risk decision by a physician with the required expertise.', 'اندیکاسیون توجیه‌کننده به کاربرد فردی مربوط است. درخواست، مجوز کار یا انتخاب پروتکل جایگزین تصمیم منفعت–خطر پزشک دارای صلاحیت لازم نیست.'),
    wrong: {
      A: L('Die Anforderung formuliert die Fragestellung; sie ersetzt die rechtfertigende Indikation nicht.', 'The request states the clinical question; it does not replace the justifying indication.', 'درخواست، پرسش بالینی را بیان می‌کند؛ جایگزین اندیکاسیون توجیه‌کننده نیست.'),
      C: L('Die Betriebsgenehmigung betrifft den Betrieb, nicht die Nutzen-Risiko-Abwägung für diesen Patienten.', 'Operating authorization concerns scanner operation, not this patient’s benefit–risk assessment.', 'مجوز کار به فعالیت دستگاه مربوط است، نه سنجش منفعت و خطر برای این بیمار.'),
      D: L('Ein Protokoll beschreibt die Durchführung; zuerst muss die individuelle Anwendung gerechtfertigt sein.', 'A protocol describes performance; the individual exposure must first be justified.', 'پروتکل شیوهٔ اجرا را توضیح می‌دهد؛ ابتدا باید کاربرد برای فرد توجیه شده باشد.'),
    },
    front: L('Ersetzt eine CT-Anforderung die rechtfertigende Indikation?', 'Does a CT request replace the justifying indication?', 'آیا درخواست CT جایگزین اندیکاسیون توجیه‌کننده است؟'),
  },
  {
    id: 'strahlenschutzbereiche-verantwortliche',
    title: L('Verantwortung im Strahlenschutz', 'Radiation-protection responsibility', 'مسئولیت در حفاظت پرتویی'),
    source: 'Technik.pdf pp.17–18; https://www.gesetze-im-internet.de/strlschg/__70.html',
    correct: 'C',
    prompt: L('Ein Strahlenschutzverantwortlicher bestellt schriftlich einen Strahlenschutzbeauftragten. Welche Aussage trifft zu?', 'A radiation-protection responsible person appoints a radiation-protection officer in writing. Which statement is correct?', 'فرد مسئول حفاظت پرتویی (SSV)، مأمور حفاظت پرتویی (SSB) را کتبی منصوب می‌کند. کدام گزاره درست است؟'),
    options: [
      L('Damit endet die Verantwortung des Strahlenschutzverantwortlichen.', 'This ends the responsibility of the responsible person.', 'با این کار مسئولیت SSV پایان می‌یابد.'),
      L('Der Beauftragte erhält automatisch jede ärztliche Entscheidungsbefugnis.', 'The officer automatically receives authority for every medical decision.', 'SSB خودبه‌خود اختیار همهٔ تصمیم‌های پزشکی را دریافت می‌کند.'),
      L('Der Verantwortliche bleibt verantwortlich; Aufgaben und Befugnisse des Beauftragten werden schriftlich festgelegt.', 'The responsible person remains responsible; the officer’s duties and authority are specified in writing.', 'SSV همچنان مسئول می‌ماند؛ وظایف و اختیارات SSB به‌صورت کتبی تعیین می‌شوند.'),
      L('Eine Stellenbezeichnung ersetzt die schriftliche Festlegung der Aufgaben.', 'A job title replaces the written definition of duties.', 'عنوان شغلی جایگزین تعیین کتبی وظایف می‌شود.'),
    ],
    explanation: L('Nach § 70 StrlSchG bleibt der Strahlenschutzverantwortliche auch nach der Bestellung verantwortlich. Die Bestellung legt Aufgaben, Entscheidungsbereich und Befugnisse des Beauftragten schriftlich fest.', 'Under section 70 StrlSchG, the responsible person remains responsible after the appointment. The appointment specifies the officer’s duties, decision-making scope and authority in writing.', 'طبق مادهٔ ۷۰ StrlSchG، مسئولیت SSV پس از انتصاب نیز باقی می‌ماند. حکم انتصاب، وظایف، محدودهٔ تصمیم‌گیری و اختیارات SSB را کتبی مشخص می‌کند.'),
    wrong: {
      A: L('Die Bestellung entbindet den Verantwortlichen nicht von seiner Verantwortung.', 'Appointment does not release the responsible person from responsibility.', 'انتصاب، SSV را از مسئولیت معاف نمی‌کند.'),
      B: L('Die Bestellung ist keine pauschale ärztliche Befugnis; Aufgabenbereich und erforderliche Qualifikation bleiben maßgeblich.', 'Appointment is not blanket medical authority; assigned duties and required qualifications still matter.', 'انتصاب مجوز کلی پزشکی نیست؛ حوزهٔ وظایف و صلاحیت لازم همچنان تعیین‌کننده‌اند.'),
      D: L('Aufgaben, Entscheidungsbereich und Befugnisse müssen schriftlich festgelegt werden.', 'Duties, decision-making scope and authority must be specified in writing.', 'وظایف، محدودهٔ تصمیم‌گیری و اختیارات باید کتبی مشخص شوند.'),
    },
    front: L('Was ändert eine SSB-Bestellung an der Verantwortung des SSV?', 'How does appointing an officer change the responsible person’s responsibility?', 'انتصاب SSB چه تغییری در مسئولیت SSV ایجاد می‌کند؟'),
  },
  {
    id: 'fachkunde-strahlenschutz',
    title: L('Aufgabenbezogene Fachkunde', 'Task-specific expertise', 'صلاحیت متناسب با وظیفه'),
    source: 'Technik.pdf p.19; https://www.gesetze-im-internet.de/strlschv_2018/__47.html',
    correct: 'A',
    prompt: L('Eine Ärztin möchte die für ein Anwendungsgebiet erforderliche Fachkunde erwerben. Welcher Grundsatz gilt?', 'A physician wants to obtain the expertise required for a field of application. Which principle applies?', 'پزشکی می‌خواهد صلاحیت لازم برای یک حوزهٔ کاربرد را کسب کند. کدام اصل درست است؟'),
    options: [
      L('In der Regel zählen passende Ausbildung, praktische Erfahrung und anerkannte Kurse; die zuständige Stelle prüft und bescheinigt den Nachweis.', 'Suitable education, practical experience and recognized courses are generally required; the competent body reviews and certifies the evidence.', 'معمولاً آموزش مناسب، تجربهٔ عملی و دوره‌های مورد تأیید لازم‌اند؛ مرجع صالح مدارک را بررسی و تأیید می‌کند.'),
      L('Die ärztliche Approbation allein belegt jede anwendungsbezogene Fachkunde.', 'A medical licence alone demonstrates expertise for every application.', 'مجوز پزشکی به‌تنهایی صلاحیت همهٔ کاربردها را ثابت می‌کند.'),
      L('Ein einzelner Kurs ersetzt grundsätzlich die praktische Erfahrung.', 'A single course always replaces practical experience.', 'یک دوره همواره جایگزین تجربهٔ عملی می‌شود.'),
      L('Für jedes Anwendungsgebiet gilt dieselbe feste Ausbildungsdauer.', 'Every application requires the same fixed training duration.', 'همهٔ حوزه‌های کاربرد مدت آموزشی ثابت و یکسانی دارند.'),
    ],
    explanation: L('Fachkunde ist anwendungsbezogen. Der Regelerwerb verbindet geeignete Ausbildung, praktische Erfahrung und anerkannte Kurse mit der Prüfung und Bescheinigung durch die zuständige Stelle; Umfang und Dauer sind nicht für alle Anwendungen gleich.', 'Expertise is application-specific. The usual pathway combines suitable education, practical experience and recognized courses with review and certification by the competent body; scope and duration are not identical for every application.', 'صلاحیت به حوزهٔ کاربرد وابسته است. مسیر معمول، آموزش مناسب، تجربهٔ عملی و دوره‌های مورد تأیید را با بررسی و تأیید مرجع صالح ترکیب می‌کند؛ دامنه و مدت برای همهٔ کاربردها یکسان نیست.'),
    wrong: {
      B: L('Die Approbation allein weist nicht jede erforderliche anwendungsbezogene Fachkunde nach.', 'A medical licence alone does not establish every required application-specific qualification.', 'مجوز پزشکی به‌تنهایی همهٔ صلاحیت‌های لازمِ وابسته به کاربرد را ثابت نمی‌کند.'),
      C: L('Praktische Erfahrung gehört zum Regelerwerb; ein Kurs allein ersetzt sie nicht pauschal.', 'Practical experience is part of the usual pathway; a course alone does not universally replace it.', 'تجربهٔ عملی جزئی از مسیر معمول است؛ یک دوره به‌تنهایی جایگزین همگانی آن نیست.'),
      D: L('Umfang und Dauer hängen unter anderem von Ausbildung und Anwendungsgebiet ab.', 'Scope and duration depend on factors including education and field of application.', 'دامنه و مدت، از جمله به آموزش و حوزهٔ کاربرد وابسته‌اند.'),
    },
    front: L('Welche Bausteine umfasst der Regelerwerb der erforderlichen Fachkunde?', 'What elements usually make up acquisition of the required expertise?', 'کسب معمول صلاحیت لازم شامل چه اجزایی است؟'),
  },
  {
    id: 'teleradiologie',
    title: L('Rollen in der Teleradiologie', 'Teleradiology roles', 'نقش‌ها در تلرادیولوژی'),
    source: 'Technik.pdf pp.19–20; https://www.gesetze-im-internet.de/strlschg/__14.html; https://www.gesetze-im-internet.de/strlschv_2018/__49.html',
    correct: 'D',
    prompt: L('Welche Aussage zum Arzt am Ort der technischen Durchführung trifft bei Teleradiologie nach deutschem Strahlenschutzrecht zu?', 'Under German radiation-protection law, which statement applies to the physician at the technical examination site in teleradiology?', 'طبق قانون حفاظت پرتویی آلمان، کدام گزاره دربارهٔ پزشک حاضر در محل اجرای فنی تلرادیولوژی درست است؟'),
    options: [
      L('Eine Telefonverbindung ersetzt seine Anwesenheit vor Ort.', 'Telephone availability replaces physical presence at the site.', 'دسترسی تلفنی جایگزین حضور او در محل می‌شود.'),
      L('Er benötigt allein wegen dieser Rolle dieselbe Fachkunde wie der Teleradiologe.', 'This role alone requires the same expertise as the remote radiologist.', 'صرف این نقش، همان صلاحیت تخصصی پزشک تلرادیولوژیست را می‌طلبد.'),
      L('Er benötigt keine strahlenschutzbezogene Qualifikation, weil der Teleradiologe verantwortlich ist.', 'No radiation-protection qualification is required because the remote radiologist is responsible.', 'چون پزشک تلرادیولوژیست مسئول است، او به هیچ دانش یا صلاحیت حفاظت پرتویی نیاز ندارد.'),
      L('Er muss vor Ort anwesend sein und die erforderlichen Kenntnisse im Strahlenschutz besitzen.', 'The physician must be present at the site and possess the required radiation-protection knowledge.', 'پزشک باید در محل حاضر باشد و دانش لازم در حفاظت پرتویی را داشته باشد.'),
    ],
    explanation: L('Für den Arzt vor Ort sind die erforderlichen Kenntnisse vorgeschrieben. Diese Rolle ist von der Fachkunde des Teleradiologen und den Qualifikationsanforderungen der technischen Durchführung zu unterscheiden.', 'The physician at the site requires the specified knowledge. This role is distinct from the remote radiologist’s expertise and the qualification requirements for technical performance.', 'برای پزشک حاضر در محل، دانش لازم مقرر شده است. این نقش با صلاحیت تخصصی پزشک تلرادیولوژیست و الزامات صلاحیت اجرای فنی تفاوت دارد.'),
    wrong: {
      A: L('§ 14 Absatz 2 verlangt die Anwesenheit eines entsprechend qualifizierten Arztes am Ort der technischen Durchführung.', 'Section 14(2) requires a suitably qualified physician to be present at the technical site.', 'مادهٔ ۱۴ بند ۲، حضور پزشک دارای دانش لازم در محل اجرای فنی را الزامی می‌کند.'),
      B: L('Das Gesetz unterscheidet hier Kenntnisse des Arztes vor Ort von Fachkunde des Teleradiologen.', 'The law distinguishes the on-site physician’s knowledge from the remote radiologist’s expertise.', 'قانون، دانش پزشک حاضر در محل را از صلاحیت تخصصی پزشک تلرادیولوژیست متمایز می‌کند.'),
      C: L('Die Verantwortung des Teleradiologen hebt die erforderlichen Kenntnisse des Arztes vor Ort nicht auf.', 'The remote radiologist’s responsibility does not remove the on-site physician’s knowledge requirement.', 'مسئولیت پزشک تلرادیولوژیست، الزام دانش لازم برای پزشک حاضر در محل را حذف نمی‌کند.'),
    },
    front: L('Welche Strahlenschutzqualifikation braucht der Arzt vor Ort in der Teleradiologie?', 'Which radiation-protection qualification does the on-site physician need in teleradiology?', 'پزشک حاضر در محل تلرادیولوژی به چه دانش یا صلاحیتی در حفاظت پرتویی نیاز دارد؟'),
    answer: L('Erforderliche Kenntnisse im Strahlenschutz und Anwesenheit am Ort der technischen Durchführung. Das ist nicht automatisch dieselbe Fachkunde wie beim Teleradiologen.', 'Required radiation-protection knowledge and presence at the technical examination site. This does not automatically mean the same expertise as the remote radiologist.', 'دانش لازم در حفاظت پرتویی و حضور در محل اجرای فنی. این الزام خودبه‌خود به معنای همان صلاحیت تخصصی پزشک تلرادیولوژیست نیست.'),
  },
  {
    id: 'photon-counting-ct',
    title: L('Photon-Counting-CT', 'Photon-counting CT', 'CT شمارش فوتون'),
    source: 'Technik.pdf p.46; https://doi.org/10.1148/radiol.2018172656',
    correct: 'B',
    prompt: L('Was unterscheidet einen Photonenzähldetektor vom üblichen indirekten CT-Detektor?', 'What distinguishes a photon-counting detector from a common indirect CT detector?', 'چه چیزی آشکارساز شمارش فوتون را از آشکارساز غیرمستقیم رایج CT متمایز می‌کند؟'),
    options: [
      L('Ein Szintillator erzeugt Licht, das eine Photodiode in Ladung umwandelt.', 'A scintillator generates light that a photodiode converts to charge.', 'سوسوزن نور تولید می‌کند و فوتودیود آن را به بار تبدیل می‌کند.'),
      L('Ein Halbleiter erzeugt direkt elektrische Impulse, die gezählt und nach Energie eingeteilt werden.', 'A semiconductor directly generates electrical pulses that are counted and assigned to energy bins.', 'نیمه‌رسانا مستقیماً پالس الکتریکی تولید می‌کند؛ پالس‌ها شمارش و بر پایهٔ انرژی دسته‌بندی می‌شوند.'),
      L('Eine einzelne Projektion liefert ohne Rekonstruktion ein vollständiges Schnittbild.', 'One projection produces a complete cross-section without reconstruction.', 'یک پروجکشن بدون بازسازی، تصویر مقطعی کامل تولید می‌کند.'),
      L('Die Detektorart garantiert bei jedem Protokoll eine geringere Patientendosis.', 'The detector type guarantees lower patient dose for every protocol.', 'نوع آشکارساز، دوز کمتر بیمار را در هر پروتکل تضمین می‌کند.'),
    ],
    explanation: L('Photonenzähldetektoren nutzen direkte Konversion im Halbleiter. Elektrische Impulse werden gezählt und Energieklassen zugeordnet; dadurch wird spektrale Information zugänglich. Eine pauschale Dosisgarantie folgt daraus nicht.', 'Photon-counting detectors use direct conversion in a semiconductor. Electrical pulses are counted and assigned to energy bins, providing spectral information. This does not imply a universal dose guarantee.', 'آشکارساز شمارش فوتون از تبدیل مستقیم در نیمه‌رسانا استفاده می‌کند. پالس‌های الکتریکی شمارش و در بازه‌های انرژی دسته‌بندی می‌شوند و اطلاعات طیفی فراهم می‌شود. این امر تضمین همگانی کاهش دوز نیست.'),
    wrong: {
      A: L('Das beschreibt die indirekte Konversion über Szintillator und Photodiode.', 'This describes indirect conversion through a scintillator and photodiode.', 'این گزینه تبدیل غیرمستقیم از راه سوسوزن و فوتودیود را توصیف می‌کند.'),
      C: L('Auch Photon-Counting-CT rekonstruiert Schnittbilder aus vielen Projektionen.', 'Photon-counting CT also reconstructs cross-sections from many projections.', 'CT شمارش فوتون نیز تصویر مقطعی را از پروجکشن‌های متعدد بازسازی می‌کند.'),
      D: L('Die Dosis hängt auch von Untersuchung, Patient und Protokoll ab; die Detektorart allein garantiert keine Reduktion.', 'Dose also depends on the examination, patient and protocol; detector type alone does not guarantee reduction.', 'دوز به بررسی، بیمار و پروتکل نیز وابسته است؛ نوع آشکارساز به‌تنهایی کاهش آن را تضمین نمی‌کند.'),
    },
    front: L('Wie gewinnt ein Photonenzähldetektor spektrale Information?', 'How does a photon-counting detector obtain spectral information?', 'آشکارساز شمارش فوتون چگونه اطلاعات طیفی به‌دست می‌آورد؟'),
  },
]

export const ACCESS_QUESTIONS = ['de', 'en', 'fa'].flatMap(lang => topics.map(topic => ({
  id: `${topic.id}-${lang}-01`, fach: 'technik', tags: [topic.id],
  question: topic.prompt[lang], options: topic.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: topic.correct, explanation: topic.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(topic.wrong).map(([key, value]) => [key, value[lang]])),
  source: topic.source,
})))

export const ACCESS_FLASHCARDS = topics.map(topic => ({
  id: `${topic.id}-01`, topicId: topic.id, category: topic.title,
  front: topic.front, answer: topic.answer || topic.explanation, source: topic.source,
}))

export const ACCESS_FLASHCARD_TOPICS = topics.map(topic => ({
  id: topic.id, area: 'Technik', chapter: topic.id === 'photon-counting-ct' ? 'CT' : 'Strahlenschutz',
  icon: topic.id === 'photon-counting-ct' ? 'CT' : '☢', color: '#397c8b', href: `/flashcards/${topic.id}`,
  title: topic.title, subtitle: topic.id === 'photon-counting-ct'
    ? L('Direkte Detektion · Energieklassen', 'Direct detection · energy bins', 'آشکارسازی مستقیم · بازه‌های انرژی')
    : L('Aufgaben · Qualifikation · Verantwortung', 'Tasks · qualifications · responsibility', 'وظایف · صلاحیت · مسئولیت'),
}))

export const ACCESS_TOPIC_GROUPS = [
  { fachId: 'technik', kapitelId: 'technik-strahlenschutz', title: L('Strahlenschutzrecht', 'Radiation-protection law', 'قانون حفاظت پرتویی'), topics: topics.slice(0, 4).map(({ id, title }) => ({ id, title })) },
  { fachId: 'technik', kapitelId: 'technik-ct', title: L('CT', 'CT', 'CT'), topics: topics.slice(4).map(({ id, title }) => ({ id, title })) },
]
