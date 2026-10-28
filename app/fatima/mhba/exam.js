import {lesson5Practice} from './lesson5Practice.js';
const t=(text,answer,why)=>({text,answer,why,official:false});
export const statements={
1:[
 t('Bedürfnisse sind grundsätzlich unbegrenzt, verfügbare Güter dagegen knapp.',true,'خواسته‌ها نامحدود و منابع محدودند؛ همین مسئله ضرورت فعالیت اقتصادی را ایجاد می‌کند.'),
 t('Bedarf bezeichnet jedes Bedürfnis unabhängig von der Kaufkraft.',false,'Bedarf به نیازهایی گفته می‌شود که با قدرت خرید پوشش داده شده‌اند.'),
 t('Nachfrage entsteht, wenn Bedarf am Markt wirksam wird.',true,'وقتی Bedarf در بازار عملی شود، Nachfrage ایجاد می‌شود.'),
 t('Knappheit bedeutet ausschließlich, dass ein Gut physisch überhaupt nicht vorhanden ist.',false,'کمیابی نسبت منابع موجود به نیازها را توصیف می‌کند؛ به معنی نبودن کامل کالا نیست.'),
 t('Beim Minimalprinzip ist das Ziel vorgegeben.',true,'هدف ثابت است و منابع مصرفی به حداقل می‌رسند.'),
 t('Beim Maximalprinzip sind die verfügbaren Mittel vorgegeben.',true,'منابع ثابت‌اند و نتیجه به حداکثر می‌رسد.'),
 t('Ein festgelegtes Auto möglichst günstig zu kaufen, entspricht dem Maximalprinzip.',false,'هدف مشخص و کمترین هزینه، نمونهٔ Minimalprinzip است.'),
 t('Mit einem festen Budget das bestmögliche Auto zu kaufen, entspricht dem Maximalprinzip.',true,'بودجه ثابت و بهترین نتیجه یعنی Maximalprinzip.'),
 t('Das Extremumprinzip betrachtet das Verhältnis von Aufwand und Ertrag.',true,'در این اصل، بهترین نسبت هزینه به بازده جست‌وجو می‌شود.'),
 t('Das ökonomische Prinzip bezieht sich ausschließlich auf Geld und niemals auf Zeit.',false,'زمان، مواد و نیروی کار هم منابع‌اند.'),
 t('Die BWL beschäftigt sich mit wirtschaftlichen Entscheidungen einzelner Betriebe.',true,'BWL تصمیم‌ها و فرایندهای بنگاه را بررسی می‌کند.'),
 t('Die VWL umfasst sowohl Mikroökonomie als auch Makroökonomie.',true,'اقتصاد خرد و کلان هر دو در VWL قرار دارند.'),
 t('Mikroökonomie und BWL sind vollständig identische Bezeichnungen.',false,'اقتصاد خرد زیرمجموعهٔ VWL است و با BWL یکسان نیست.'),
 t('Die allgemeine BWL behandelt ausschließlich Krankenhäuser.',false,'BWL عمومی مباحث مشترک بنگاه‌ها را بررسی می‌کند.'),
 t('Krankenhausbetriebslehre ist ein Beispiel einer speziellen BWL.',true,'این شاخه، کاربرد مدیریت بنگاه در یک حوزهٔ مشخص است.'),
 t('Adam Smith gilt als Begründer der klassischen Ökonomie.',true,'جزوه این جایگاه را به آدام اسمیت نسبت می‌دهد.'),
 t('Smith führt Wohlstand allein auf die Goldreserven eines Fürsten zurück.',false,'این نگاه با مرکانتیلیسم مرتبط است؛ اسمیت بر نیروهای تولیدی تأکید می‌کند.'),
 t('Arbeitsteilung kann nach Smith die Produktivität steigern.',true,'تخصص‌یابی از راه تقسیم کار می‌تواند بهره‌وری را بالا ببرد.'),
 t('Die unsichtbare Hand bezeichnet eine zentrale staatliche Produktionsplanung.',false,'این تصویر به هماهنگی غیرمتمرکز فعالیت‌ها اشاره دارد.'),
 t('Wettbewerb spielt in Smiths Erklärung wirtschaftlicher Entwicklung keine Rolle.',false,'رقابت یکی از اجزای اصلی توضیح اسمیت است.'),
 t('Nach Ricardo kann Handel sinnvoll sein, obwohl ein Land beide Güter absolut günstiger herstellt.',true,'مزیت نسبی به تفاوت هزینه‌های فرصت متکی است.'),
 t('Für komparative Vorteile sind allein die absoluten Stückkosten entscheidend.',false,'هزینه‌های نسبی و فرصت، معیار اصلی‌اند.'),
 t('Opportunitätskosten beschreiben den Verzicht auf die beste entgangene Alternative.',true,'برای تولید یک کالا، فرصت تولید کالای دیگر از دست می‌رود.'),
 t('Im Beispiel des Lehrtexts besitzt Portugal den komparativen Vorteil bei Wein.',true,'هزینهٔ فرصت شراب در پرتغال کمتر است.'),
 t('Im Beispiel des Lehrtexts besitzt England den komparativen Vorteil bei Tuch.',true,'هزینهٔ فرصت پارچه در انگلستان کمتر است.'),
 t('Spezialisierung auf komparative Vorteile kann beiden Handelspartnern nutzen.',true,'تحت فرض‌های مدل، هر دو می‌توانند از مبادله منتفع شوند.'),
 t('Geld dient im Lehrtext als Tausch- und Zahlungsmittel sowie als Recheneinheit.',true,'این دو کارکرد در جزوه مورد تأکیدند.'),
 t('Eine Recheneinheit erschwert grundsätzlich den Wertvergleich verschiedener Güter.',false,'واحد مشترک، مقایسهٔ ارزش‌ها را آسان می‌کند.'),
 t('Geld ermöglicht es, Kauf und Verkauf voneinander zu trennen.',true,'فروشنده دیگر مجبور نیست همان کالایی را بخواهد که خریدار ارائه می‌کند.'),
 t('Private Haushalte produzieren typischerweise überwiegend für fremden Bedarf.',false,'خانوار عموماً نیاز خود را تأمین می‌کند؛ تولید برای نیاز دیگران مشخصهٔ بنگاه است.'),
 t('Unternehmungen erstellen Güter und Leistungen überwiegend für fremden Bedarf.',true,'این یکی از تفاوت‌های اصلی با خانوار است.'),
 t('Öffentliche Betriebe können durch politisch bestimmte Aufgaben geprägt sein.',true,'مأموریت عمومی و برنامه‌های سیاسی در آن‌ها اثر دارد.'),
 t('Porters Modell beschränkt sich auf bereits vorhandene direkte Wettbewerber.',false,'چهار نیروی دیگر هم در مدل قرار دارند.'),
 t('Die Verhandlungsmacht der Lieferanten gehört zu Porters fünf Kräften.',true,'قدرت چانه‌زنی تأمین‌کنندگان یکی از پنج نیروست.'),
 t('Ersatzprodukte und neue Anbieter sind bei Porter dieselbe Wettbewerbskraft.',false,'جایگزین‌ها یک نیرو و تازه‌واردها نیروی دیگری‌اند.'),
 t('Medikamentöse Therapien können im Verhältnis zu einer Operation eine Ersatzleistung darstellen.',true,'این نمونهٔ جایگزین در حوزهٔ سلامت است.'),
 t('Transaktionskosten sind mit den unmittelbaren Produktionskosten vollständig identisch.',false,'هزینهٔ تولید با هزینهٔ جست‌وجو، قرارداد، نظارت و هماهنگی فرق دارد.'),
 t('Die Überwachung und Anpassung von Verträgen kann Transaktionskosten verursachen.',true,'این هزینه‌ها به رابطهٔ مبادله مربوط‌اند.'),
 t('Bei einer Make-or-buy-Entscheidung können Produktions- und Transaktionskosten relevant sein.',true,'تصمیم ساخت یا خرید باید هر دو گروه هزینه را در نظر بگیرد.'),
 t('Professionelle Normen und sektorale Abgrenzungen können institutionelle Barrieren bilden.',true,'قواعد حرفه‌ای و مرزبندی بخش‌ها ممکن است هماهنگی را دشوار کنند.')
],
2:[
 t('Rechtsfähigkeit und Geschäftsfähigkeit bezeichnen exakt dieselbe Fähigkeit.',false,'داشتن حق و تکلیف با توانایی انجام معاملهٔ معتبر یکسان نیست.'),
 t('Natürliche Personen sind Menschen.',true,'شخص حقیقی، انسان است.'),
 t('Eine GmbH kann eine juristische Person sein.',true,'GmbH نمونه‌ای از شخص حقوقی حقوق خصوصی است.'),
 t('Kinder unter sieben Jahren sind grundsätzlich voll geschäftsfähig.',false,'زیر هفت سال فاقد اهلیت معامله‌اند.'),
 t('Minderjährige zwischen sieben und achtzehn Jahren sind grundsätzlich beschränkt geschäftsfähig.',true,'در این بازه اهلیت محدود دارند و رضایت نماینده و استثناها مطرح است.'),
 t('Mit Vollendung des achtzehnten Lebensjahres besteht grundsätzlich volle Geschäftsfähigkeit.',true,'قاعدهٔ عمومی شروع اهلیت کامل در هجده‌سالگی است.'),
 t('Jedes Geschäft eines beschränkt Geschäftsfähigen ist ausnahmslos nichtig.',false,'در انتظار تأیید بودن و استثناهایی مانند منفعت صرفاً حقوقی باید بررسی شوند.'),
 t('Eine Willenserklärung kann durch schlüssiges Verhalten erfolgen.',true,'رفتار روشن می‌تواند اعلام اراده باشد.'),
 t('Schweigen bedeutet in jedem Fall die Annahme eines Vertragsangebots.',false,'سکوت اصولاً رضایت نیست؛ استثناها نیاز به بررسی دارند.'),
 t('Eine ausdrückliche Willenserklärung kann mündlich erfolgen.',true,'اعلام صریح لزوماً نوشته نیست.'),
 t('Notarielle Beurkundung und öffentliche Beglaubigung sind ohne Unterschied dasselbe.',false,'در تنظیم محضری، محتوا هم ثبت می‌شود؛ تصدیق امضا معمولاً اصالت امضا را تأیید می‌کند.'),
 t('Formvorschriften können Beweis- und Warnfunktionen erfüllen.',true,'شکل قانونی می‌تواند برای اثبات و جلوگیری از تصمیم شتاب‌زده باشد.'),
 t('Ein Vertrag setzt grundsätzlich übereinstimmende Willenserklärungen voraus.',true,'پیشنهاد و پذیرش باید بر مفاد اساسی منطبق باشند.'),
 t('Angebot und Annahme sind für das Zustandekommen eines Vertrags grundsätzlich bedeutungslos.',false,'این دو مبنای انعقاد قراردادند.'),
 t('Vertragsschluss und Vertragswirksamkeit sind getrennt zu prüfen.',true,'ممکن است قرارداد شکل گرفته باشد اما نقصی در اعتبار آن وجود داشته باشد.'),
 t('Jeder wirtschaftlich enttäuschende Vertrag darf allein deshalb angefochten werden.',false,'نارضایتی اقتصادی به‌خودی‌خود دلیل قانونی اعتراض نیست.'),
 t('Ein bloßer Motivirrtum berechtigt grundsätzlich nicht zur Anfechtung.',true,'انتظار نادرست از آینده معمولاً مبنای اعتراض نیست.'),
 t('Der Kursverlust erwartungsvoll gekaufter Aktien stellt im Lehrtext einen relevanten Eigenschaftsirrtum dar.',false,'جزوه آن را Motivirrtum معرفی می‌کند.'),
 t('Ein Irrtum über eine rechtlich erhebliche Eigenschaft kann eine Anfechtung ermöglichen.',true,'برای مثال، جنس اصلی انگشتر در مسئلهٔ جزوه.'),
 t('Ein Formmangel kann zur Nichtigkeit eines Rechtsgeschäfts führen.',true,'رعایت نکردن شکل قانونی لازم ممکن است موجب بطلان شود.'),
 t('Bei einem Scheingeschäft wissen beide Beteiligten, dass die Erklärung nicht gelten soll.',true,'صوری بودن با توافق طرفین همراه است.'),
 t('Ein Scheingeschäft ist nach § 117 Abs. 1 BGB stets wirksam.',false,'قاعدهٔ این ماده بطلان معاملهٔ صوری است.'),
 t('Ein verdecktes Rechtsgeschäft ist gesondert auf seine Wirksamkeit zu prüfen.',true,'توافق پنهان شرایط اعتبار خود را دارد.'),
 t('Bei einer Holschuld liegen Leistungs- und Erfolgsort grundsätzlich beim Schuldner.',true,'متعهد در محل خودش آمادهٔ انجام تعهد است و طلبکار تحویل می‌گیرد.'),
 t('Bei einer Bringschuld muss der Gläubiger die Leistung beim Schuldner abholen.',false,'در Bringschuld، متعهد باید تعهد را در محل طلبکار انجام دهد.'),
 t('Bei einer Schickschuld können Leistungsort und Erfolgsort auseinanderfallen.',true,'محل اقدام نزد متعهد و محل نتیجه نزد طلبکار است.'),
 t('Die Firma bezeichnet im Handelsrecht den Namen des Kaufmanns.',true,'Firma نام تجاری است، نه خود سازمان.'),
 t('Firmenwahrheit erlaubt bewusst irreführende Angaben über das Unternehmen.',false,'اصل درست‌نمایی نام، گمراه‌کنندگی را منع می‌کند.'),
 t('Firmenausschließlichkeit betrifft die Unterscheidbarkeit gegenüber bestehenden Firmen.',true,'نام تجاری باید از نام‌های ثبت‌شدهٔ مرتبط قابل تمایز باشد.'),
 t('Firmenbeständigkeit kann die Fortführung einer Firma bei Inhaberwechsel ermöglichen.',true,'تداوم نام با رعایت شرایط ممکن است.'),
 t('Das Handelsregister erfüllt unter anderem eine Publikations- und Beweisfunktion.',true,'انتشار و اثبات دو کارکرد دفتر ثبت‌اند.'),
 t('Die Handlungsvollmacht umfasst ohne besondere Ermächtigung immer auch Grundstücksveräußerungen.',false,'برای فروش یا وثیقه‌گذاری ملک، اختیار ویژه لازم است.'),
 t('Für eine Darlehensaufnahme benötigt der Handlungsbevollmächtigte eine besondere Ermächtigung.',true,'اختیار معمول خودکار شامل وام گرفتن نیست.'),
 t('Die Prokura hat grundsätzlich einen weiteren Umfang als die Handlungsvollmacht.',true,'پروکورا دامنهٔ قانونی گسترده‌تری دارد.'),
 t('Prokura wird grundsätzlich erst durch den Handelsregistereintrag wirksam.',false,'طبق جزوه اثر آن با اعطا آغاز می‌شود، نه صرفاً با ثبت.'),
 t('Auch ein Prokurist benötigt für die Veräußerung oder Belastung von Grundstücken eine besondere Befugnis.',true,'پروکورا هم برای این کار اختیار ویژه می‌خواهد.'),
 t('Ein Patent schützt grundsätzlich die bloße äußere Gestaltung eines Produkts.',false,'ظاهر موضوع حمایت Design است؛ پتنت مربوط به اختراع فنی است.'),
 t('Eine Marke kann Waren oder Dienstleistungen eines Anbieters kennzeichnen.',true,'علامت تجاری نقش تمایز و شناسایی دارد.'),
 t('Ein eingetragenes Design schützt die Gestaltung eines Erzeugnisses.',true,'ظاهر محصول موضوع حمایت طرح است.'),
 t('Gesundheitsdaten sind im Datenschutz besonders schutzbedürftig.',true,'پردازش دادهٔ سلامت نیازمند توجه ویژه به حفاظت از داده‌هاست.')
]};

export function scoreStatements(items,answers={}){
 let correct=0,wrong=0,blank=0;
 items.forEach((item,i)=>{const a=answers[i];if(typeof a!=='boolean')blank++;else if(a===item.answer)correct++;else wrong++;});
 return {correct,wrong,blank,score:correct-wrong};
}
export const intervals=[1,3,7,14,30];
export function nextReview(previous,known,now=Date.now()){
 const level=known?Math.min((previous?.level??-1)+1,intervals.length-1):-1;
 return {level,due:now+(known?intervals[level]*86400000:600000),last:now};
}

statements[5]=lesson5Practice;
