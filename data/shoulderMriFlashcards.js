import { SHOULDER_MRI_TITLE, shoulderMriTopics } from './shoulderMriChapter'

const l = (de, en, fa) => ({ de, en, fa })

const cardsByLesson = {
  'planung-anatomie': [
    ['planes', l('Was ist die Reihenfolge der Schichtplanung?', 'What is the order of plane prescription?', 'ترتیب طراحی صفحات تصویربرداری چیست؟'), l('Streng axial → parakoronal entlang des Skapulablatts → parasagittal anhand der Glenoidpole.', 'True axial, then oblique coronal along the scapular blade, then oblique sagittal using the glenoid poles.', 'ابتدا آکسیال حقیقی، سپس کرونال مایل در امتداد تیغهٔ اسکاپولا و در پایان ساژیتال مایل با استفاده از قطب‌های گلنوئید.')],
    ['interval', l('Was liegt im Rotatorenintervall?', 'What lies in the rotator interval?', 'چه ساختارهایی در روتاتور اینتروال قرار دارند؟'), l('Lange Bizepssehne, SGHL und Lig. coracohumerale zwischen Supraspinatus und oberem Subscapularis.', 'The long head of biceps, SGHL and coracohumeral ligament lie between supraspinatus and upper subscapularis.', 'تاندون سر بلند بایسپس، SGHL و رباط کوراکوهومرال بین سوپرااسپیناتوس و بخش فوقانی ساب‌اسکاپولاریس قرار دارند.')],
    ['cal', l('Welche Knochenpunkte verbindet das CAL?', 'Which bony landmarks does the CAL connect?', 'رباط CAL کدام دو نقطهٔ استخوانی را به هم متصل می‌کند؟'), l('Korakoid und Akromion. Es ist Teil des Schulterdachs.', 'The coracoid and acromion. It forms part of the shoulder roof.', 'کوراکوئید و آکرومیون. این رباط بخشی از سقف شانه است.')],
  ],
  'subakromiales-impingement': [
    ['angle', l('Wie wird der CSA konstruiert?', 'How do you construct the CSA?', 'CSA چگونه رسم می‌شود؟'), l('Vom unteren Glenoidpol eine Linie zum oberen Glenoidpol und eine zum lateralsten Akromionpunkt ziehen.', 'From the inferior glenoid pole, draw one line to the superior pole and another to the lateralmost acromial point.', 'از قطب تحتانی گلنوئید، یک خط به قطب فوقانی و یک خط به خارجی‌ترین نقطهٔ آکرومیون رسم کنید.')],
    ['shape', l('Wie unterscheiden sich Bigliani I–III?', 'How do Bigliani types I–III differ?', 'انواع I تا III در طبقه‌بندی Bigliani چه تفاوتی دارند؟'), l('I flach, II gebogen, III hakenförmig. Die Form im parasagittalen Schnitt beurteilen.', 'I flat, II curved, III hooked. Assess the shape in the oblique sagittal plane.', 'I تخت، II خمیده و III قلاب‌دار. شکل را در نمای ساژیتال مایل ارزیابی کنید.')],
    ['report', l('Welche Begleitbefunde prüfen Sie am subakromialen Outlet?', 'What associated findings are worth checking at the subacromial outlet?', 'کدام یافته‌های همراه را در فضای ساب‌آکرومیال بررسی می‌کنید؟'), l('Ventralen Sporn, CAL, AC-Osteophyten und Os acromiale prüfen. Bursa und Supraspinatussehne mitbeurteilen.', 'Inspect the anterior spur, CAL, AC osteophytes and os acromiale. Also assess the bursa and supraspinatus tendon.', 'خار قدامی، CAL، استئوفیت مفصل AC و Os acromiale را بررسی کنید. بورس و تاندون سوپرااسپیناتوس را هم ارزیابی کنید.')],
  ],
  'supraspinatus-partialruptur': [
    ['surfaces', l('Welche drei Lokalisationen einer Partialruptur werden unterschieden?', 'What are the three surface patterns of a partial tear?', 'سه الگوی پارگی نسبی از نظر محل کدام‌اند؟'), l('Artikularseitig, bursaseitig und interstitiell. Interstitielle Risse erreichen keine der beiden Oberflächen.', 'Articular-sided, bursal-sided and interstitial. An interstitial tear reaches neither surface.', 'سمت مفصلی، سمت بورس و داخل‌تاندونی. پارگی داخل‌تاندونی به هیچ‌یک از دو سطح نمی‌رسد.')],
    ['ellman', l('Welche relativen Tiefen entsprechen Ellman I–III in dieser Lektion?', 'Which depth percentages correspond to Ellman I–III in this lesson?', 'عمق نسبی پارگی در درجات I تا III الگوی Ellman در این درس چقدر است؟'), l('I unter 25 %, II 25–50 %, III über 50 % der Sehnendicke. Die betroffene Oberfläche separat nennen.', 'I below 25%, II 25–50%, III above 50% of tendon thickness. Name the involved surface separately.', 'I کمتر از ۲۵٪، II بین ۲۵ تا ۵۰٪ و III بیشتر از ۵۰٪ ضخامت تاندون. سطح درگیر را جداگانه ذکر کنید.')],
    ['footprint', l('Wie unterscheiden Sie PASTA, Reverse PASTA und PAINT?', 'How do you distinguish PASTA, reverse PASTA and PAINT?', 'PASTA، Reverse PASTA و PAINT چه تفاوتی دارند؟'), l('PASTA liegt artikularseitig am Footprint, Reverse PASTA bursaseitig. PAINT leitet den artikularseitigen Defekt intratendinös nach medial fort.', 'PASTA is articular-sided at the footprint and reverse PASTA is bursal-sided. PAINT extends medially within the tendon from an articular-sided opening.', 'PASTA در سطح مفصلی محل اتصال و Reverse PASTA در سمت بورس است. در PAINT، نقص سطح مفصلی درون تاندون به سمت داخل امتداد می‌یابد.')],
  ],
  'supraspinatus-komplettruptur': [
    ['report', l('Was geben Sie bei einer transmuralen Manschettenruptur im Befund an?', 'What should a report include for a full-thickness cuff tear?', 'در گزارش پارگی تمام‌ضخامت روتاتور کاف چه مواردی را ذکر می‌کنید؟'), l('Beteiligte Sehnen, Dicke, Breite, maximale Defektgröße, Stumpflage und Muskelqualität.', 'Involved tendons, thickness, width, maximum defect size, stump location and muscle quality.', 'تاندون‌های درگیر، ضخامت و عرض درگیر، بزرگ‌ترین اندازهٔ نقص، محل انتهای تاندون و کیفیت عضله.')],
    ['patte', l('Wo liegt der Stumpf bei Patte I, II und III?', 'Where is the stump in Patte grades I, II and III?', 'انتهای تاندون در درجات I، II و III طبقه‌بندی Patte کجاست؟'), l('I ansatznah, II auf Humeruskopfhöhe, III auf Glenoidhöhe.', 'I near the insertion, II at the humeral head, III at the glenoid.', 'I نزدیک محل اتصال، II هم‌سطح سر هومروس و III هم‌سطح گلنوئید.')],
    ['muscle', l('Was messen Goutallier und das Tangentenzeichen jeweils?', 'What do Goutallier grade and the tangent sign each assess?', 'درجهٔ Goutallier و علامت مماس هرکدام چه چیزی را می‌سنجند؟'), l('Goutallier graduiert fettige Infiltration. Ein Muskelbauch unter der Tangente ist ein Hinweis auf Atrophie.', 'Goutallier grades fatty infiltration. A muscle belly below the tangent indicates atrophy.', 'Goutallier نفوذ چربی را درجه‌بندی می‌کند. شکم عضلهٔ زیر خط مماس به نفع آتروفی است.')],
  ],
  'subscapularis-bizeps-pulley': [
    ['comma', l('Was markiert das Komma-Zeichen?', 'What does the comma sign mark?', 'علامت ویرگول چه چیزی را مشخص می‌کند؟'), l('Den retrahierten oberen Rand der Subscapularissehne. Das Gewebe enthält Fasern des SGHL und des Lig. coracohumerale.', 'The retracted upper border of the subscapularis tendon. The tissue contains fibres of the SGHL and coracohumeral ligament.', 'لبهٔ فوقانیِ عقب‌کشیدهٔ تاندون ساب‌اسکاپولاریس. این بافت حاوی الیاف SGHL و رباط کوراکوهومرال است.')],
    ['pulley', l('Welche Strukturen bilden den Bizeps-Pulley?', 'Which structures form the biceps pulley?', 'پولی بایسپس از کدام ساختارها تشکیل شده است؟'), l('SGHL, Lig. coracohumerale und angrenzende Sehnenfasern. Sie führen die lange Bizepssehne in den Sulcus.', 'SGHL, the coracohumeral ligament and adjacent tendon fibres guide the long head of biceps into the groove.', 'SGHL، رباط کوراکوهومرال و الیاف تاندونی مجاور، تاندون سر بلند بایسپس را به شیار هدایت می‌کنند.')],
    ['zones', l('Was umfasst die distale Zone 3 der langen Bizepssehne?', 'What does distal zone 3 of the long head of biceps cover?', 'ناحیهٔ دیستال ۳ تاندون سر بلند بایسپس کجاست؟'), l('Den subpektoralen Abschnitt. Eine distale Läsion für die Tenodeseplanung lokalisieren.', 'The subpectoral segment. Locate distal disease for tenodesis planning.', 'بخش زیر پکتورالیس ماژور. برای برنامه‌ریزی تنودز، محل ضایعهٔ دیستال را مشخص کنید.')],
  ],
  'internes-impingement': [
    ['posterior', l('Welche Läsionen passen zu posterosuperiorem internem Impingement?', 'Which lesions fit posterosuperior internal impingement?', 'کدام ضایعات با ایمپینجمنت داخلی خلفی‌فوقانی هم‌خوانی دارند؟'), l('Artikularseitige Läsionen am hinteren Supra- und oberen Infraspinatus und ein posterosuperiorer Labrumriss.', 'Articular-sided injury of posterior supraspinatus and upper infraspinatus with a posterosuperior labral tear.', 'آسیب سطح مفصلیِ بخش خلفی سوپرااسپیناتوس و بخش فوقانی اینفرااسپیناتوس همراه با پارگی لابروم خلفی‌فوقانی.')],
    ['anterior', l('Wo liegt der anterosuperiore intraartikuläre Kontakt?', 'Where does anterosuperior intra-articular contact occur?', 'تماس داخل‌مفصلی قدامی‌فوقانی کجا رخ می‌دهد؟'), l('Zwischen Tuberculum minus mit artikulärem Subscapularis und vorderem Glenoidrand, insbesondere bei Innenrotation.', 'Between the lesser tuberosity and articular subscapularis and the anterior glenoid rim, particularly during internal rotation.', 'بین تکمهٔ کوچک همراه با سطح مفصلی ساب‌اسکاپولاریس و لبهٔ قدامی گلنوئید، به‌ویژه در چرخش داخلی.')],
    ['bennett', l('Was ist eine Bennett-Läsion?', 'What is a Bennett lesion?', 'ضایعهٔ Bennett چیست؟'), l('Ein knöcherner Anbau am posteroinferioren Glenoidrand bei wiederholter Belastung.', 'Osseous proliferation at the posteroinferior glenoid rim associated with repetitive loading.', 'برجستگی استخوانی لبهٔ خلفی‌تحتانی گلنوئید در ارتباط با بار تکراری.')],
  ],
  'glenoid-track': [
    ['formula', l('Wie berechnen Sie den Glenoid Track?', 'How do you calculate the glenoid track?', 'گلنوئید ترک چگونه محاسبه می‌شود؟'), l('GT = 0,83 × D − d. D ist der geschätzte intakte Glenoiddurchmesser und d die anteriore Defektbreite.', 'GT = 0.83 × D − d. D is the estimated intact glenoid diameter and d the anterior defect width.', 'GT = 0.83 × D − d. در این فرمول، D قطر تخمینی گلنوئید سالم و d عرض نقص قدامی است.')],
    ['interval', l('Welche beiden Komponenten bilden den HSI?', 'Which two components make up HSI?', 'HSI از کدام دو جزء تشکیل می‌شود؟'), l('Die Hill-Sachs-Impression und die Knochenbrücke bis zur Infraspinatusinsertion.', 'The Hill–Sachs defect and the bone bridge to the infraspinatus insertion.', 'عرض نقص هیل‌ساکس و پل استخوانی تا محل اتصال اینفرااسپیناتوس.')],
    ['classification', l('Wann ist eine Hill-Sachs-Läsion Off-track?', 'When is a Hill–Sachs lesion off-track?', 'ضایعهٔ هیل‌ساکس چه زمانی off-track است؟'), l('Wenn der HSI größer als der Glenoid Track ist. Bei nahezu gleichen Werten beide Messwerte und die Grenzlage angeben.', 'When the HSI exceeds the glenoid track. Report both measurements and note borderline values when close.', 'وقتی HSI از گلنوئید ترک بزرگ‌تر باشد. اگر دو مقدار نزدیک‌اند، هر دو را همراه با مرزی‌بودن نتیجه گزارش کنید.')],
  ],
  'labrum-kapsel': [
    ['perthes-alpsa', l('Wie unterscheiden Sie Perthes und ALPSA bei intaktem Periostschlauch?', 'How do you distinguish Perthes from ALPSA with an intact periosteal sleeve?', 'با غلاف پریوست پیوسته، Perthes و ALPSA چه تفاوتی دارند؟'), l('Perthes bleibt weitgehend ortsständig. Bei ALPSA liegt der Komplex weiter medial am Glenoidhals.', 'A Perthes lesion stays close to its normal position. In ALPSA the complex lies further medially on the glenoid neck.', 'در Perthes لابروم نزدیک موقعیت طبیعی می‌ماند. در ALPSA مجموعه به داخل و روی گردن گلنوئید جابه‌جا شده است.')],
    ['glad-bankart', l('Welche Befunde trennen GLAD von klassischem Bankart?', 'Which findings distinguish GLAD from classic Bankart?', 'کدام یافته‌ها GLAD را از بنکارت کلاسیک متمایز می‌کنند؟'), l('GLAD zeigt oberflächliche Labrumschädigung mit Knorpeldefekt und erhaltenem Periost. Bei Bankart ist das Labrum abgelöst und der Periostschlauch unterbrochen.', 'GLAD shows superficial labral injury and adjacent cartilage damage with intact periosteum. Bankart shows labral detachment and disruption of the sleeve.', 'در GLAD آسیب سطحی لابروم، نقص غضروف مجاور و پریوست پیوسته دیده می‌شود. در بنکارت، لابروم جدا و غلاف پریوست گسیخته است.')],
    ['avulsions', l('An welchen Enden des IGHL liegen HAGL und GAGL?', 'At which ends of the IGHL are HAGL and GAGL?', 'ضایعات HAGL و GAGL در کدام انتهای IGHL رخ می‌دهند؟'), l('HAGL am humeralen und GAGL am glenoidalen Ansatz.', 'HAGL at the humeral attachment and GAGL at the glenoid attachment.', 'HAGL در محل اتصال هومرال و GAGL در محل اتصال گلنوئیدی.')],
  ],
  'posteriore-luxation': [
    ['views', l('Welche Ansichten helfen bei Verdacht auf posteriore Luxation?', 'Which views help when posterior dislocation is suspected?', 'در شک به دررفتگی خلفی، کدام نماها کمک می‌کنند؟'), l('Axillär oder axial zur direkten Stellungsbeurteilung. Skapula-Y als weitere orthogonale Ansicht.', 'An axillary or axial view directly shows alignment. A scapular Y view gives another orthogonal projection.', 'نمای آگزیلاری یا آکسیال موقعیت را مستقیم نشان می‌دهد. نمای Y اسکاپولا نیز یک نمای عمود بر نمای روبه‌رو است.')],
    ['reverse', l('Wo liegen Reverse Hill-Sachs und Reverse Bankart?', 'Where are reverse Hill–Sachs and reverse Bankart lesions located?', 'هیل‌ساکس معکوس و بنکارت معکوس کجا قرار دارند؟'), l('Reverse Hill-Sachs anteromedial am Humeruskopf. Reverse Bankart am posterioren Labrum oder Glenoidrand.', 'Reverse Hill–Sachs is anteromedial at the humeral head. Reverse Bankart involves the posterior labrum or glenoid rim.', 'هیل‌ساکس معکوس در بخش قدامی‌داخلی سر هومروس است. بنکارت معکوس لابروم خلفی یا لبهٔ خلفی گلنوئید را درگیر می‌کند.')],
    ['polpsa', l('Was ist bei einer POLPSA verlagert?', 'What is displaced in POLPSA?', 'در POLPSA چه مجموعه‌ای جابه‌جا شده است؟'), l('Der posteriore Labrum-Periost-Komplex.', 'The posterior labroperiosteal complex.', 'مجموعهٔ لابروم و پریوست خلفی.')],
  ],
}

export const SHOULDER_MRI_FLASHCARDS = shoulderMriTopics.flatMap(({ id, slug, title }) =>
  cardsByLesson[slug].map(([key, front, answer]) => ({
    id: `${id}-${key}`,
    topicId: id,
    category: title,
    front,
    answer,
  }))
)

export const SHOULDER_MRI_FLASHCARD_TOPICS = shoulderMriTopics.map(({ id, title, flashcardLink }) => ({
  id,
  area: 'Bewegungsapparat',
  chapter: SHOULDER_MRI_TITLE.de,
  icon: 'MR',
  iconImage: '/fach/msk.png',
  color: '#258875',
  href: flashcardLink,
  title,
  subtitle: SHOULDER_MRI_TITLE,
}))
