import { shoulderMriTopics } from './shoulderMriChapter'

const l = (de, en, fa) => ({ de, en, fa })

const questionsByLesson = {
  'planung-anatomie': [
    ['plane', l('Wie planen Sie die parakoronale Serie auf dem Axialbild?', 'How do you prescribe the oblique coronal series on the axial image?', 'سری کرونال مایل را روی نمای آکسیال چگونه طراحی می‌کنید؟'), [
      l('Entlang des Skapulablatts durch die Glenoidmitte', 'Along the scapular blade through the glenoid centre', 'در امتداد تیغهٔ اسکاپولا و از مرکز گلنوئید'),
      l('Parallel zur Vorderkante der Klavikula', 'Parallel to the anterior clavicle', 'موازی با لبهٔ قدامی ترقوه'),
      l('Senkrecht zum Skapulablatt durch den Sulcus', 'Perpendicular to the scapular blade through the bicipital groove', 'عمود بر تیغهٔ اسکاپولا و از شیار بایسپس'),
      l('Entlang der Verbindung von Akromion und Korakoid', 'Along the line between acromion and coracoid', 'در امتداد خط بین آکرومیون و کوراکوئید'),
    ], 'A', l('Die axiale Referenz orientiert sich am Skapulablatt und läuft durch die Glenoidmitte.', 'The axial reference follows the scapular blade through the glenoid centre.', 'خط مرجع در نمای آکسیال در امتداد تیغهٔ اسکاپولا از مرکز گلنوئید عبور می‌کند.')],
    ['interval', l('Welche Kombination gehört zum Rotatorenintervall?', 'Which group of structures lies in the rotator interval?', 'کدام مجموعه از ساختارها در روتاتور اینتروال قرار دارد؟'), [
      l('CAL, AC-Kapsel und Deltasehne', 'CAL, AC joint capsule and deltoid tendon', 'CAL، کپسول مفصل آکرومیوکلاویکولار و تاندون دلتوئید'),
      l('Lange Bizepssehne, SGHL und Lig. coracohumerale', 'Long head of biceps, SGHL and coracohumeral ligament', 'تاندون سر بلند بایسپس، SGHL و رباط کوراکوهومرال'),
      l('MGHL, hinteres Labrum und Teres minor', 'MGHL, posterior labrum and teres minor', 'MGHL، لابروم خلفی و ترس مینور'),
      l('IGHL, Recessus axillaris und Teres major', 'IGHL, axillary recess and teres major', 'IGHL، رِسِس آگزیلاری و ترس ماژور'),
    ], 'B', l('Diese drei Strukturen liegen anterior zwischen Supraspinatus und oberem Subscapularis.', 'These structures lie anteriorly between supraspinatus and upper subscapularis.', 'این سه ساختار در بخش قدامی، بین سوپرااسپیناتوس و بخش فوقانی ساب‌اسکاپولاریس، قرار دارند.')],
    ['aber', l('In welcher Position wird eine ergänzende ABER-Serie aufgenommen?', 'Which position is used for an additional ABER series?', 'سری تکمیلی ABER در کدام وضعیت گرفته می‌شود؟'), [
      l('Adduktion und Innenrotation', 'Adduction and internal rotation', 'اداکشن و چرخش داخلی'),
      l('Flexion und Innenrotation', 'Flexion and internal rotation', 'فلکشن و چرخش داخلی'),
      l('Abduktion und Außenrotation', 'Abduction and external rotation', 'ابداکشن و چرخش خارجی'),
      l('Extension und neutrale Rotation', 'Extension and neutral rotation', 'اکستنشن و چرخش خنثی'),
    ], 'C', l('ABER kann ausgewählte artikularseitige Cuff- und Labrumläsionen deutlicher darstellen.', 'ABER can better depict selected articular-sided cuff and labral lesions.', 'ABER برخی ضایعات سطح مفصلی روتاتور کاف و لابروم را واضح‌تر نشان می‌دهد.')],
  ],
  'subakromiales-impingement': [
    ['csa', l('Wo liegt der Scheitelpunkt des CSA?', 'Where is the vertex of the critical shoulder angle?', 'رأس زاویهٔ بحرانی شانه کجاست؟'), [
      l('Am lateralen Akromion', 'At the lateral acromion', 'در لبهٔ خارجی آکرومیون'),
      l('Am oberen Glenoidpol', 'At the superior glenoid pole', 'روی قطب فوقانی گلنوئید'),
      l('An der Korakoidspitze', 'At the tip of the coracoid', 'در نوک کوراکوئید'),
      l('Am unteren Glenoidpol', 'At the inferior glenoid pole', 'روی قطب تحتانی گلنوئید'),
    ], 'D', l('Von dort verlaufen die Schenkel zum oberen Glenoidpol und zum lateralsten Akromionpunkt.', 'The rays extend to the superior glenoid pole and the lateralmost point of the acromion.', 'دو ضلع زاویه از این نقطه به قطب فوقانی گلنوئید و خارجی‌ترین نقطهٔ آکرومیون می‌روند.')],
    ['hook', l('Das statische MRT zeigt ein hakenförmiges Akromion. Wie ordnen Sie den Befund ein?', 'Static MRI shows a hooked acromion. How should you interpret this finding?', 'در ام‌آر‌آی استاتیک، آکرومیون قلاب‌دار است. این یافته را چگونه تفسیر می‌کنید؟'), [
      l('Mögliche Prädisposition für subakromiales Impingement', 'Possible predisposition to subacromial impingement', 'عامل مستعدکنندهٔ احتمالی ایمپینجمنت ساب‌آکرومیال'),
      l('Direkter Nachweis eines symptomatischen Impingements', 'Direct proof of symptomatic impingement', 'اثبات مستقیم ایمپینجمنت علامت‌دار'),
      l('Nachweis einer transmuralen Supraspinatusruptur', 'Proof of a full-thickness supraspinatus tear', 'اثبات پارگی تمام‌ضخامت سوپرااسپیناتوس'),
      l('Leitbefund eines intraartikulären Konflikts', 'Defining finding of intra-articular impingement', 'یافتهٔ شاخص ایمپینجمنت داخل‌مفصلی'),
    ], 'A', l('Die Akromionform ist eine mögliche anatomische Prädisposition. Die Symptomzuordnung erfordert klinische Korrelation.', 'Acromial shape may predispose to impingement. Attribution of symptoms requires clinical correlation.', 'شکل آکرومیون می‌تواند زمینه‌ساز باشد. برای نسبت‌دادن علائم به آن، تطبیق بالینی لازم است.')],
    ['outlet', l('Welche Kombination kann das subakromiale Outlet von oben einengen?', 'Which combination can narrow the subacromial outlet from above?', 'کدام ترکیب می‌تواند فضای ساب‌آکرومیال را از بالا تنگ کند؟'), [
      l('Verdicktes posteriores IGHL und hintere Labrumzyste', 'Thickened posterior IGHL and posterior paralabral cyst', 'ضخیم‌شدن بخش خلفی IGHL و کیست پارالابرال خلفی'),
      l('Inferiore AC-Osteophyten und ventraler Akromionsporn', 'Inferior AC joint osteophytes and an anterior acromial spur', 'استئوفیت تحتانی مفصل AC و خار قدامی آکرومیون'),
      l('Läsion des vorderen Labrums und Hill-Sachs-Defekt', 'Anterior labral lesion and Hill–Sachs defect', 'ضایعهٔ لابروم قدامی و نقص هیل‌ساکس'),
      l('Mediale Bizepsluxation und Defekt am Tuberculum minus', 'Medial biceps dislocation and lesser tuberosity defect', 'دررفتگی داخلی بایسپس و نقص تکمهٔ کوچک'),
    ], 'B', l('Beide knöchernen Veränderungen grenzen an das Schulterdach und können in das Outlet ragen.', 'Both bony changes lie at the shoulder roof and can project into the outlet.', 'هر دو تغییر استخوانی در سقف شانه‌اند و می‌توانند به فضای ساب‌آکرومیال برجسته شوند.')],
  ],
  'supraspinatus-partialruptur': [
    ['ellman', l('Ein umschriebener bursaseitiger Defekt betrifft 40 % der Sehnendicke. Welche Einordnung passt?', 'A defined bursal-sided defect involves 40% of the tendon thickness. How is it classified?', 'نقص مشخص در سمت بورس، ۴۰٪ ضخامت تاندون را درگیر کرده است. ردهٔ آن چیست؟'), [
      l('Artikularseitig, Ellman I', 'Articular-sided, Ellman I', 'سمت مفصلی، Ellman I'),
      l('Bursaseitig, Ellman III', 'Bursal-sided, Ellman III', 'سمت بورس، Ellman III'),
      l('Bursaseitig, Ellman II', 'Bursal-sided, Ellman II', 'سمت بورس، Ellman II'),
      l('Transmural, partielle Breite', 'Full thickness, partial width', 'تمام‌ضخامت با درگیری بخشی از عرض'),
    ], 'C', l('40 % liegt in der verwendeten Einteilung im Bereich 25–50 %. Die Oberfläche wird separat angegeben.', 'In the system used here, 40% falls in the 25–50% range. Report the surface separately.', 'در تقسیم‌بندی این درس، ۴۰٪ در بازهٔ ۲۵ تا ۵۰٪ است. سطح درگیر را جداگانه ذکر کنید.')],
    ['paint', l('Eine artikularseitige Öffnung am Footprint setzt sich als Spalt intratendinös nach medial fort. Welcher Begriff passt?', 'An articular-sided opening at the footprint continues medially as an intratendinous cleft. Which term fits?', 'نقص از سطح مفصلی در محل اتصال شروع می‌شود و به‌صورت شکاف درون تاندون به داخل ادامه دارد. نام الگو چیست؟'), [
      l('Reverse PASTA', 'Reverse PASTA', 'Reverse PASTA'),
      l('Gedeckte interstitielle Delamination', 'Concealed interstitial delamination', 'دلامیناسیون پنهان داخل‌تاندونی'),
      l('Isolierte Tendinopathie', 'Isolated tendinopathy', 'تندینوپاتی منفرد'),
      l('PAINT', 'PAINT', 'PAINT'),
    ], 'D', l('PAINT verbindet eine artikularseitige Öffnung mit intratendinöser Fortleitung nach medial.', 'PAINT combines an articular-sided opening with medial intratendinous extension.', 'در PAINT نقص سطح مفصلی درون تاندون به سمت داخل امتداد می‌یابد.')],
    ['interstitial', l('Ein flüssigkeitssignalreicher Faserschlitz erreicht weder Bursa noch Gelenk. Was liegt vor?', 'A fluid-signal fibre cleft reaches neither the bursa nor the joint. What is the finding?', 'شکاف الیاف با سیگنال مایع به هیچ‌یک از دو سطح بورس یا مفصل نمی‌رسد. یافته چیست؟'), [
      l('Interstitielle Partialruptur', 'Interstitial partial tear', 'پارگی نسبی داخل‌تاندونی'),
      l('Bursaseitige Partialruptur', 'Bursal-sided partial tear', 'پارگی نسبی سمت بورس'),
      l('Artikularseitige Partialruptur', 'Articular-sided partial tear', 'پارگی نسبی سمت مفصلی'),
      l('Transmurale Ruptur', 'Full-thickness tear', 'پارگی تمام‌ضخامت'),
    ], 'A', l('Der Faserdefekt bleibt innerhalb der Sehne und beide Oberflächen sind durchgängig.', 'The fibre defect stays within the tendon and both surfaces remain intact.', 'نقص الیاف درون تاندون محدود می‌ماند و پیوستگی هر دو سطح حفظ شده است.')],
  ],
  'supraspinatus-komplettruptur': [
    ['width', l('Der hintere Supraspinatus ist in voller Dicke unterbrochen, das vordere Bündel ist intakt. Wie berichten Sie?', 'Posterior supraspinatus is torn through its thickness and the anterior bundle is intact. How do you report it?', 'پارگی بخش خلفی سوپرااسپیناتوس از تمام ضخامت می‌گذرد و دستهٔ قدامی سالم است. چگونه گزارش می‌کنید؟'), [
      l('Interstitielle Läsion der gesamten Breite', 'Interstitial lesion across the full width', 'ضایعهٔ داخل‌تاندونی در تمام عرض'),
      l('Transmurale Ruptur bei partiell erhaltener Breite', 'Full-thickness, partial-width tear', 'پارگی تمام‌ضخامت با حفظ بخشی از عرض'),
      l('Transmurale Ruptur der gesamten Breite', 'Full-thickness, full-width tear', 'پارگی تمام‌ضخامت در تمام عرض'),
      l('Bursaseitige Partialruptur des hinteren Bündels', 'Bursal-sided partial tear of the posterior bundle', 'پارگی نسبی سمت بورس در دستهٔ خلفی'),
    ], 'B', l('Die Dicke ist vollständig betroffen, die Breite nur teilweise. Beide Dimensionen getrennt angeben.', 'Thickness is fully involved and width is only partially involved. Report both dimensions separately.', 'کل ضخامت درگیر است ولی بخشی از عرض سالم مانده است. این دو بُعد را جداگانه گزارش کنید.')],
    ['patte', l('Im parakoronalen MRT liegt der retrahierte Sehnenstumpf auf Glenoidhöhe. Welcher Patte-Grad passt?', 'The retracted tendon stump reaches the glenoid on oblique coronal MRI. Which Patte grade fits?', 'در نمای کرونال مایل، انتهای تاندون عقب‌کشیده به سطح گلنوئید رسیده است. درجهٔ Patte چیست؟'), [
      l('I', 'I', 'I'), l('II', 'II', 'II'), l('III', 'III', 'III'), l('IV', 'IV', 'IV'),
    ], 'C', l('Patte III bezeichnet die Retraktion bis auf Glenoidhöhe. Die Stumpflage auch direkt beschreiben.', 'Patte III indicates retraction to the glenoid. Also describe the stump position directly.', 'Patte III به رتراکشن تا سطح گلنوئید اشاره دارد. موقعیت انتهای تاندون را هم مستقیم توصیف کنید.')],
    ['atrophy', l('Der Muskelbauch bleibt unter der Linie von Korakoid zur Spina scapulae. Was zeigt das an?', 'The muscle belly stays below the line from the coracoid to the scapular spine. What does this indicate?', 'شکم عضله زیر خط اتصال کوراکوئید و خار اسکاپولا قرار دارد. این یافته نشان‌دهندهٔ چیست؟'), [
      l('Patte-Grad III', 'Patte grade III', 'Patte درجهٔ III'),
      l('Eine gedeckte Delamination', 'Concealed delamination', 'دلامیناسیون پنهان'),
      l('Fettanteil von über 50 %', 'Fat content above 50%', 'چربی بیش از ۵۰٪'),
      l('Positives Tangentenzeichen als Hinweis auf Atrophie', 'Positive tangent sign indicating atrophy', 'علامت مماس مثبت به نفع آتروفی'),
    ], 'D', l('Das Tangentenzeichen beurteilt die Muskelmasse. Die fettige Infiltration wird separat nach Goutallier eingestuft.', 'The tangent sign assesses muscle bulk. Grade fatty infiltration separately using Goutallier.', 'علامت مماس حجم عضله را می‌سنجد. نفوذ چربی جداگانه با Goutallier درجه‌بندی می‌شود.')],
  ],
  'subscapularis-bizeps-pulley': [
    ['biceps', l('Die lange Bizepssehne liegt medial des Sulcus. Welche Begleitläsion suchen Sie gezielt?', 'The long head of biceps lies medial to the groove. Which associated injury should you look for?', 'تاندون سر بلند بایسپس در سمت داخلی شیار قرار دارد. به‌طور مشخص دنبال کدام آسیب همراه می‌گردید؟'), [
      l('Ruptur des oberen Subscapularis mit Pulley-Läsion', 'Upper subscapularis tear with pulley injury', 'پارگی بخش فوقانی ساب‌اسکاپولاریس با آسیب پولی'),
      l('Isolierte Ruptur des Teres minor', 'Isolated teres minor tear', 'پارگی منفرد ترس مینور'),
      l('Isolierte AC-Kapselruptur', 'Isolated AC joint capsular tear', 'پارگی منفرد کپسول مفصل AC'),
      l('Bennett-Läsion', 'Bennett lesion', 'ضایعهٔ Bennett'),
    ], 'A', l('Der obere Subscapularis und der Pulley stabilisieren die Sehne am Eintritt in den Sulcus.', 'Upper subscapularis and the pulley stabilise the tendon as it enters the groove.', 'بخش فوقانی ساب‌اسکاپولاریس و پولی، تاندون را هنگام ورود به شیار پایدار می‌کنند.')],
    ['space', l('Zwischen welchen Strukturen liegt der subkorakoidale Engpass?', 'Which structures bound the subcoracoid interval?', 'فضای تنگ ساب‌کوراکوئید بین کدام ساختارهاست؟'), [
      l('Akromion und Tuberculum majus', 'Acromion and greater tuberosity', 'آکرومیون و تکمهٔ بزرگ'),
      l('Korakoid und Tuberculum minus', 'Coracoid and lesser tuberosity', 'کوراکوئید و تکمهٔ کوچک'),
      l('Glenoid und Spina scapulae', 'Glenoid and scapular spine', 'گلنوئید و خار اسکاپولا'),
      l('Klavikula und Humerusschaft', 'Clavicle and humeral shaft', 'ترقوه و تنهٔ هومروس'),
    ], 'B', l('Der Subscapularis verläuft in diesem Intervall zur Insertion am Tuberculum minus.', 'Subscapularis passes through this interval to its insertion on the lesser tuberosity.', 'ساب‌اسکاپولاریس از این فضا عبور می‌کند تا به تکمهٔ کوچک متصل شود.')],
    ['lafosse', l('Das obere Drittel der Subscapularissehne ist vollständig abgelöst; der Rest ist intakt. Welcher Lafosse-Grad?', 'The upper third of subscapularis is completely detached and the rest is intact. What is the Lafosse grade?', 'یک‌سوم فوقانی تاندون ساب‌اسکاپولاریس کاملاً جدا شده و بقیه سالم است. درجهٔ Lafosse چیست؟'), [
      l('I', 'I', 'I'), l('III', 'III', 'III'), l('II', 'II', 'II'), l('IV', 'IV', 'IV'),
    ], 'C', l('Grad II ist die komplette Ablösung des oberen Drittels. Grad I betrifft dieses Drittel nur partiell.', 'Grade II is complete detachment of the upper third. Grade I affects this third only partially.', 'در درجهٔ II یک‌سوم فوقانی کاملاً جدا شده است. در درجهٔ I پارگی همان بخش نسبی است.')],
  ],
  'internes-impingement': [
    ['throwing', l('Ein Werfer hat Schmerzen in ABER und einen posterosuperioren Labrumriss. Welche Cuff-Läsion passt dazu?', 'A thrower has pain in ABER and a posterosuperior labral tear. Which cuff lesion fits?', 'ورزشکار پرتابی در ABER درد دارد و لابروم خلفی‌فوقانی پاره است. کدام ضایعهٔ روتاتور کاف با آن هم‌خوانی دارد؟'), [
      l('Bursaseitiger Riss des vorderen Supraspinatus', 'Bursal-sided anterior supraspinatus tear', 'پارگی سمت بورس در بخش قدامی سوپرااسپیناتوس'),
      l('Artikularseitiger Subscapularisriss', 'Articular-sided subscapularis tear', 'پارگی سمت مفصلی ساب‌اسکاپولاریس'),
      l('Isolierter Abriss des Teres minor', 'Isolated teres minor avulsion', 'جداشدگی منفرد ترس مینور'),
      l('Artikularseitiger Riss am hinteren Supra- und oberen Infraspinatus', 'Articular-sided tear at posterior supraspinatus and upper infraspinatus', 'پارگی سطح مفصلی در بخش خلفی سوپرااسپیناتوس و بخش فوقانی اینفرااسپیناتوس'),
    ], 'D', l('Dieser Cuff-Abschnitt liegt in ABER am posterosuperioren Kontaktpunkt.', 'This portion of the cuff is at the posterosuperior contact zone in ABER.', 'این بخش از روتاتور کاف در وضعیت ABER در ناحیهٔ تماس خلفی‌فوقانی قرار می‌گیرد.')],
    ['anterior', l('Bei anterosuperiorem internem Impingement: welche Strukturen geraten bei Innenrotation in Kontakt?', 'With anterosuperior internal impingement, which structures meet during internal rotation?', 'در ایمپینجمنت داخلی قدامی‌فوقانی، طی چرخش داخلی کدام ساختارها با هم تماس پیدا می‌کنند؟'), [
      l('Tuberculum minus und vorderer Glenoidrand', 'Lesser tuberosity and anterior glenoid rim', 'تکمهٔ کوچک و لبهٔ قدامی گلنوئید'),
      l('Korakoid und Tuberculum minus', 'Coracoid and lesser tuberosity', 'کوراکوئید و تکمهٔ کوچک'),
      l('Akromion und Tuberculum majus', 'Acromion and greater tuberosity', 'آکرومیون و تکمهٔ بزرگ'),
      l('Hinteres Tuberculum majus und posterosuperiores Glenoid', 'Posterior greater tuberosity and posterosuperior glenoid', 'بخش خلفی تکمهٔ بزرگ و گلنوئید خلفی‌فوقانی'),
    ], 'A', l('Der vordere glenoidale Kontakt betrifft die artikuläre Seite des Subscapularis. Der Kontakt unter dem Korakoid ist extraartikulär.', 'The anterior glenoid contact affects the articular side of subscapularis. Contact beneath the coracoid is extra-articular.', 'تماس با لبهٔ قدامی گلنوئید، سطح مفصلی ساب‌اسکاپولاریس را درگیر می‌کند. تماس زیر کوراکوئید خارج‌مفصلی است.')],
    ['bennett', l('Bei einem Überkopfsportler fällt ein Knochenanbau am posteroinferioren Glenoidrand auf. Welcher Befund passt?', 'An overhead athlete has osseous proliferation at the posteroinferior glenoid rim. Which finding fits?', 'در ورزشکار رشتهٔ بالای‌سر، برجستگی استخوانی در لبهٔ خلفی‌تحتانی گلنوئید دیده می‌شود. کدام یافته مطرح است؟'), [
      l('Os acromiale', 'Os acromiale', 'Os acromiale'),
      l('Bennett-Läsion', 'Bennett lesion', 'ضایعهٔ Bennett'),
      l('Hill-Sachs-Läsion', 'Hill–Sachs lesion', 'هیل‌ساکس'),
      l('GLAD-Läsion', 'GLAD lesion', 'ضایعهٔ GLAD'),
    ], 'B', l('Der Bennett-Anbau liegt am posteroinferioren Glenoidrand und ist bei wiederholter Wurfbelastung beschrieben.', 'A Bennett lesion is located at the posteroinferior glenoid rim and has been described with repetitive throwing.', 'ضایعهٔ Bennett در لبهٔ خلفی‌تحتانی گلنوئید قرار دارد و با پرتاب‌های تکراری گزارش شده است.')],
  ],
  'glenoid-track': [
    ['off-track', l('D = 30 mm, d = 4 mm und HSI = 22 mm. Welche Einordnung ist richtig?', 'D = 30 mm, d = 4 mm and HSI = 22 mm. Which classification is correct?', 'قطر سالم ۳۰، نقص قدامی ۴ و HSI برابر ۲۲ میلی‌متر است. کدام رده درست است؟'), [
      l('GT 24,9 mm, On-track', 'GT 24.9 mm, on-track', 'ترک ۲۴٫۹ میلی‌متر، on-track'),
      l('GT 20,9 mm, On-track', 'GT 20.9 mm, on-track', 'ترک ۲۰٫۹ میلی‌متر، on-track'),
      l('GT 20,9 mm, Off-track', 'GT 20.9 mm, off-track', 'ترک ۲۰٫۹ میلی‌متر، off-track'),
      l('GT 26 mm, Off-track', 'GT 26 mm, off-track', 'ترک ۲۶ میلی‌متر، off-track'),
    ], 'C', l('GT = 0,83 × 30 − 4 = 20,9 mm. Der HSI ist um 1,1 mm größer. Die geringe Differenz sollte im Befund stehen.', 'GT = 0.83 × 30 − 4 = 20.9 mm. HSI exceeds the track by 1.1 mm. Report the small margin.', 'ترک از ۰٫۸۳ × ۳۰ منهای ۴ به دست می‌آید و ۲۰٫۹ میلی‌متر است. HSI به اندازهٔ ۱٫۱ میلی‌متر بزرگ‌تر است. این اختلاف کم را در گزارش ذکر کنید.')],
    ['interval', l('Welche Strecke definiert das Hill-Sachs-Intervall (HSI)?', 'Which distance defines the Hill–Sachs interval (HSI)?', 'کدام فاصله، HSI را تعریف می‌کند؟'), [
      l('Glenoidpol zu Glenoidpol', 'Superior to inferior glenoid pole', 'از قطب فوقانی تا قطب تحتانی گلنوئید'),
      l('Breite der Impression allein', 'Width of the impaction defect alone', 'فقط عرض فرورفتگی'),
      l('Lateraler Impressionsrand zum vorderen Labrum', 'Lateral edge of the defect to the anterior labrum', 'از لبهٔ خارجی نقص تا لابروم قدامی'),
      l('Medialer Impressionsrand zur Infraspinatusinsertion', 'Medial edge of the defect to the infraspinatus insertion', 'از لبهٔ داخلی نقص تا محل اتصال اینفرااسپیناتوس'),
    ], 'D', l('Der HSI umfasst den Defekt und die Knochenbrücke bis zur Infraspinatusinsertion.', 'The HSI includes the defect and the bone bridge to the infraspinatus insertion.', 'HSI عرض نقص و پل استخوانی تا محل اتصال اینفرااسپیناتوس را شامل می‌شود.')],
    ['bone-loss', l('Was geschieht mit dem Glenoid Track, wenn d zunimmt und D gleich bleibt?', 'What happens to the glenoid track if d increases while D stays the same?', 'اگر عرض نقص قدامی بیشتر شود و قطر سالم ثابت بماند، گلنوئید ترک چه تغییری می‌کند؟'), [
      l('Er wird schmaler.', 'It narrows.', 'باریک‌تر می‌شود.'),
      l('Er wird breiter.', 'It widens.', 'پهن‌تر می‌شود.'),
      l('Er bleibt gleich.', 'It stays the same.', 'ثابت می‌ماند.'),
      l('Er entspricht dann immer dem HSI.', 'It always becomes equal to HSI.', 'همیشه با HSI برابر می‌شود.'),
    ], 'A', l('Die Defektbreite d wird von 0,83 × D abgezogen.', 'Defect width d is subtracted from 0.83 × D.', 'عرض نقص قدامی از حاصل‌ضرب ۰٫۸۳ در قطر سالم کم می‌شود.')],
  ],
  'labrum-kapsel': [
    ['alpsa', l('Das abgelöste Labrum liegt medial am Glenoidhals. Die abgehobene Periosthülle ist intakt. Was liegt vor?', 'The detached labrum lies medially on the glenoid neck. The stripped periosteal sleeve is intact. What is the lesion?', 'لابروم جداشده در داخل، روی گردن گلنوئید قرار دارد و غلاف پریوستِ بلندشده پیوسته است. ضایعه چیست؟'), [
      l('GLAD', 'GLAD', 'GLAD'), l('ALPSA', 'ALPSA', 'ALPSA'), l('Perthes', 'Perthes', 'Perthes'), l('Klassische Bankart-Läsion', 'Classic Bankart lesion', 'بنکارت کلاسیک'),
    ], 'B', l('Mediale Verlagerung bei erhaltener Periosthülle spricht für ALPSA. Bei Perthes bleibt das Labrum nah an der Ausgangslage.', 'Medial displacement within an intact sleeve favours ALPSA. In Perthes, the labrum stays close to its normal position.', 'جابه‌جایی به داخل با غلاف پریوست پیوسته به نفع ALPSA است. در Perthes لابروم نزدیک موقعیت طبیعی می‌ماند.')],
    ['glad', l('Bei oberflächlichem Labrumdefekt und angrenzender Knorpelläsion ist das Periost intakt. Welche Diagnose passt?', 'There is a superficial labral defect with adjacent cartilage damage and intact periosteum. Which diagnosis fits?', 'نقص سطحی لابروم با آسیب غضروف مجاور دیده می‌شود و پریوست پیوسته است. تشخیص چیست؟'), [
      l('HAGL', 'HAGL', 'HAGL'), l('ALPSA', 'ALPSA', 'ALPSA'), l('GLAD', 'GLAD', 'GLAD'), l('Knöcherne Bankart-Läsion', 'Bony Bankart lesion', 'بنکارت استخوانی'),
    ], 'C', l('Bei GLAD ist die Gelenkknorpelverletzung der wegweisende Begleitbefund.', 'The associated articular cartilage injury is the defining clue to GLAD.', 'آسیب غضروف مفصلیِ مجاور، یافتهٔ شاخص GLAD است.')],
    ['hagl', l('Das vordere IGHL ist am Humerus avulsiert. Welcher Begriff passt?', 'The anterior IGHL is avulsed from the humerus. Which term fits?', 'بخش قدامی IGHL از محل اتصال به هومروس جدا شده است. نام ضایعه چیست؟'), [
      l('GAGL', 'GAGL', 'GAGL'), l('POLPSA', 'POLPSA', 'POLPSA'), l('SLAP V', 'SLAP V', 'SLAP V'), l('HAGL', 'HAGL', 'HAGL'),
    ], 'D', l('HAGL ist die humerale und GAGL die glenoidale Avulsion des glenohumeralen Ligaments.', 'HAGL is humeral avulsion and GAGL is glenoid avulsion of the glenohumeral ligament.', 'HAGL جداشدگی هومرال و GAGL جداشدگی گلنوئیدی رباط گلنوهومرال است.')],
  ],
  'posteriore-luxation': [
    ['view', l('Eine AP-Aufnahme ist bei Verdacht auf posteriore Luxation nicht eindeutig. Welche ergänzende Darstellung zeigt die Richtung direkt?', 'An AP radiograph is inconclusive with suspected posterior dislocation. Which additional view directly shows its direction?', 'با شک به دررفتگی خلفی، نمای AP مبهم است. کدام نمای تکمیلی جهت دررفتگی را مستقیماً نشان می‌دهد؟'), [
      l('Axilläre Aufnahme', 'Axillary view', 'نمای آگزیلاری'),
      l('Zanca-Aufnahme', 'Zanca view', 'نمای Zanca'),
      l('Klavikula-AP', 'AP clavicle view', 'نمای AP ترقوه'),
      l('Tangentialaufnahme des Akromions', 'Tangential acromial view', 'نمای تانژانسی آکرومیون'),
    ], 'A', l('Die axilläre Projektion zeigt die Lage des Humeruskopfs relativ zum Glenoid direkt.', 'The axillary projection directly shows the humeral head relative to the glenoid.', 'نمای آگزیلاری موقعیت سر هومروس نسبت به گلنوئید را مستقیم نشان می‌دهد.')],
    ['reverse', l('Das CT zeigt eine posteriore Luxation. Wo suchen Sie die typische humerale Impression?', 'CT shows posterior dislocation. Where do you look for the typical humeral impaction defect?', 'سی‌تی دررفتگی خلفی را نشان می‌دهد. نقص معمول ایمپکشن را در کدام قسمت سر هومروس جست‌وجو می‌کنید؟'), [
      l('Posterolateral', 'Posterolateral', 'خلفی‌خارجی'),
      l('Anteromedial', 'Anteromedial', 'قدامی‌داخلی'),
      l('Inferolateral am Schaft', 'Inferolateral at the shaft', 'تحتانی‌خارجی در تنه'),
      l('Am Tuberculum majus lateral', 'Lateral greater tuberosity', 'لبهٔ خارجی تکمهٔ بزرگ'),
    ], 'B', l('Die Reverse-Hill-Sachs-Läsion liegt anteromedial durch Impaktion am posterioren Glenoidrand.', 'The reverse Hill–Sachs lesion is anteromedial after impaction against the posterior glenoid rim.', 'هیل‌ساکس معکوس در بخش قدامی‌داخلی و بر اثر برخورد با لبهٔ خلفی گلنوئید ایجاد می‌شود.')],
    ['polpsa', l('Welcher Befund kennzeichnet eine POLPSA?', 'Which finding characterises POLPSA?', 'کدام یافته مشخصهٔ POLPSA است؟'), [
      l('Obere Ablösung des Bizepsankers', 'Superior detachment of the biceps anchor', 'جداشدگی فوقانی محل اتصال بایسپس'),
      l('Anteroinferiore Ablösung mit Knorpeldefekt', 'Anteroinferior detachment with cartilage defect', 'جداشدگی قدامی‌تحتانی با نقص غضروف'),
      l('Verlagerter posteriorer Labrum-Periost-Komplex', 'Displaced posterior labroperiosteal complex', 'جابه‌جایی مجموعهٔ لابروم و پریوست خلفی'),
      l('Mediale Luxation der langen Bizepssehne', 'Medial dislocation of the long head of biceps', 'دررفتگی داخلی تاندون سر بلند بایسپس'),
    ], 'C', l('POLPSA ist die posteriore labroligamentäre Periostschlauchavulsion mit verlagertem Komplex.', 'POLPSA is posterior labroligamentous periosteal sleeve avulsion with displacement of the complex.', 'POLPSA جداشدگی غلاف پریوست مجموعهٔ لابروم و رباط خلفی همراه با جابه‌جایی آن است.')],
  ],
}

export const SHOULDER_MRI_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  shoulderMriTopics.flatMap(({ id, slug }) => questionsByLesson[slug].map(([key, prompt, options, correct, explanation]) => ({
    id: `${id}-${lang}-${key}`,
    fach: 'msk',
    tags: [id],
    question: prompt[lang],
    options: options.map((option, index) => ({ id: 'ABCD'[index], text: option[lang] })),
    correct,
    explanation: explanation[lang],
  }))),
]))
