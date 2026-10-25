// Working assessment revision packet; independent acceptance required before Main.
const L=(de,en,fa)=>({de,en,fa})
const G='https://doi.org/10.1148/radiol.232558'
const P='https://pmc.ncbi.nlm.nih.gov/articles/PMC3259383/'
const I='https://pmc.ncbi.nlm.nih.gov/articles/PMC9851481/'
export const HRCT_ARCHITECTURE_CASES={
 'hrct-architekturmuster-01':{
  question:L('Bei chronischer Belastungsdyspnoe zeigt die HRCT benachbarte subpleurale zystische Räume mit Retikulation, Traktionsbronchiektasen und deutlichem Architekturverlust. Welcher Begriff beschreibt die zystische Komponente am besten?','In chronic exertional dyspnoea, HRCT shows adjacent subpleural cystic spaces with reticulation, traction bronchiectasis and marked architectural loss. Which term best describes the cystic component?','در تنگی نفس مزمن فعالیتی، HRCT فضاهای کیستیک مجاور ساب‌پلورال همراه رتیکولاسیون، برونشکتازی کششی و تخریب واضح معماری نشان می‌دهد. کدام اصطلاح بخش کیستیک را بهتر توصیف می‌کند؟'),
  options:[L('Honeycombing','Honeycombing','هانی‌کومبینگ'),L('Paraseptales Emphysem','Paraseptal emphysema','آمفیزم پاراسپتال'),L('Isolierte einfache Lungenzysten','Isolated simple pulmonary cysts','کیست‌های ساده و منفرد ریه'),L('Pneumatozelen','Pneumatoceles','پنوماتوسل‌ها')],correct:0,difficulty:2,source:G,
  explanation:L('Die Kombination benachbarter subpleuraler Zysten mit zerstörter Architektur und weiteren Fibrosezeichen stützt Honeycombing. Eine einzelne Zyste ohne diesen Kontext genügt nicht.','Adjacent subpleural cysts with destroyed architecture and other fibrotic signs support honeycombing. A solitary cyst without this context is insufficient.','کیست‌های مجاور ساب‌پلورال با تخریب معماری و سایر نشانه‌های فیبروز از هانی‌کومبینگ حمایت می‌کنند. یک کیست منفرد بدون این زمینه کافی نیست.'),
  wrong:[null,L('Paraseptales Emphysem verursacht subpleurale Lufträume, erklärt aber die ausgeprägten begleitenden Traktions- und Architekturzeichen hier weniger gut.','Paraseptal emphysema causes subpleural airspaces but less well explains the marked associated traction and architectural changes here.','آمفیزم پاراسپتال فضاهای هوایی ساب‌پلورال ایجاد می‌کند، اما نشانه‌های واضح کششی و تغییر معماری همراه را در اینجا کمتر توضیح می‌دهد.'),L('Die Räume sind in ein ausgeprägtes Fibrosemuster eingebettet, nicht als isolierte Zysten beschrieben.','The spaces are embedded in marked fibrotic change rather than described as isolated cysts.','این فضاها در الگوی واضح فیبروز قرار دارند و به‌صورت کیست‌های منفرد توصیف نشده‌اند.'),L('Für Pneumatozelen wäre ein passender akuter Auslöser/Verlauf zu prüfen; die beschriebene chronisch fibrotische Architektur spricht stärker für Honeycombing.','Pneumatoceles call for a relevant acute trigger/course; the chronic fibrotic architecture described favours honeycombing.','برای پنوماتوسل باید عامل یا سیر حاد مرتبط بررسی شود؛ معماری مزمن فیبروتیک توصیف‌شده بیشتر به نفع هانی‌کومبینگ است.')],
  front:L('Was muss neben subpleuralen Zysten für die Bezeichnung Honeycombing vorliegen?','What must accompany subpleural cysts to call honeycombing?','برای نام‌گذاری هانی‌کومبینگ چه چیزی باید همراه کیست‌های ساب‌پلورال باشد؟'),
  answer:L('Architekturverlust und weitere Fibrosezeichen, etwa Retikulation und Traktionsbronchiektasen; Zysten allein reichen nicht.','Architectural loss and other fibrotic signs such as reticulation and traction bronchiectasis; cysts alone are insufficient.','تخریب معماری و سایر نشانه‌های فیبروز مانند رتیکولاسیون و برونشکتازی کششی؛ کیست به‌تنهایی کافی نیست.')
 },
 'hrct-architekturmuster-02':{
  question:L('Ein HRCT-Fibrosemuster zeigt Honeycombing und Traktionsbronchiektasen. Welche räumliche Betonung passt typischerweise zu einem UIP-Muster?','An HRCT fibrotic pattern shows honeycombing and traction bronchiectasis. Which spatial predominance is typical of a UIP pattern?','الگوی فیبروتیک HRCT هانی‌کومبینگ و برونشکتازی کششی نشان می‌دهد. کدام غلبهٔ مکانی معمولاً با الگوی UIP سازگار است؟'),
  options:[L('Basal und subpleural','Basal and subpleural','بازال و ساب‌پلورال'),L('Apikal und perihilär','Apical and perihilar','اپیکال و پیرانافی'),L('Zentral bei ausgesparter Peripherie','Central with peripheral sparing','مرکزی با حفظ محیط'),L('Gleichmäßig entlang sämtlicher Bronchien','Uniformly along all bronchi','یکنواخت در امتداد همهٔ برونش‌ها')],correct:0,difficulty:1,source:I,
  explanation:L('Basale und subpleurale Betonung passt zur typischen UIP-Verteilung. UIP ist ein Muster; die Zuordnung zu einer idiopathischen oder bekannten Ursache erfordert den übrigen klinisch-radiologischen Kontext.','Basal and subpleural predominance fits typical UIP distribution. UIP is a pattern; assigning an idiopathic or known cause requires the remaining clinical-radiological context.','غلبهٔ بازال و ساب‌پلورال با توزیع تیپیک UIP سازگار است. UIP یک الگو است؛ تعیین علت ایدیوپاتیک یا شناخته‌شده به سایر اطلاعات بالینی و رادیولوژیک نیاز دارد.'),
  wrong:[null,L('Eine apikale/perihiläre Betonung entspricht nicht der typischen basalen peripheren UIP-Verteilung.','Apical/perihilar predominance does not match typical basal peripheral UIP distribution.','غلبهٔ اپیکال/پیرانافی با توزیع تیپیک بازال و محیطی UIP تطابق ندارد.'),L('Eine überwiegend zentrale Verteilung mit Peripherieaussparung passt weniger zum typischen subpleuralen UIP-Muster.','Predominantly central distribution with peripheral sparing fits typical subpleural UIP less well.','توزیع عمدتاً مرکزی با حفظ محیط با الگوی تیپیک ساب‌پلورال UIP کمتر سازگار است.'),L('Eine gleichmäßig bronchial orientierte Verteilung ist nicht die typische regionale UIP-Betonung.','Uniform bronchial orientation is not the typical regional predominance of UIP.','توزیع یکنواخت با جهت‌گیری برونشی، غلبهٔ ناحیه‌ای تیپیک UIP نیست.')],
  front:L('Bedeutet ein UIP-Muster automatisch idiopathische Lungenfibrose?','Does a UIP pattern automatically mean idiopathic pulmonary fibrosis?','آیا الگوی UIP به‌طور خودکار به‌معنای فیبروز ایدیوپاتیک ریه است؟'),
  answer:L('Nein. Das basal-subpleurale Fibrosemuster wird mit Klinik, Exposition und anderen möglichen Ursachen eingeordnet.','No. Interpret the basal-subpleural fibrotic pattern with clinical findings, exposure and other possible causes.','خیر. الگوی فیبروتیک بازال-ساب‌پلورال با یافته‌های بالینی، مواجهه و سایر علت‌های احتمالی تفسیر می‌شود.')
 },
 'hrct-architekturmuster-03':{
  question:L('Die inspiratorische CT zeigt fleckige Milchglasareale zwischen unauffällig transparenten Lungenabschnitten. Das Gefäßkaliber ist vergleichbar; in adäquater Exspiration findet sich kein überzeugendes Air Trapping. Welcher Mechanismus erklärt das Mosaik am ehesten?','Inspiratory CT shows patchy ground-glass regions between normally lucent lung regions. Vessel calibre is comparable, and adequate expiration shows no convincing air trapping. Which mechanism best explains the mosaic?','CT دمی نواحی شیشه‌مات لکه‌ای در میان بخش‌های با شفافیت طبیعی ریه نشان می‌دهد. قطر عروق مشابه است و در بازدم مناسب حبس هوای قانع‌کننده دیده نمی‌شود. کدام مکانیسم بیشتر این موزائیک را توضیح می‌دهد؟'),
  options:[L('Fleckige parenchymale Infiltration','Patchy parenchymal infiltration','ارتشاح لکه‌ای پارانشیم'),L('Obliterative Erkrankung kleiner Atemwege','Obliterative small-airway disease','بیماری انسدادی راه هوایی کوچک'),L('Okklusive pulmonale Gefäßerkrankung','Occlusive pulmonary vascular disease','بیماری انسدادی عروق ریوی'),L('Regionale emphysematöse Destruktion','Regional emphysematous destruction','تخریب آمفیزماتیک ناحیه‌ای')],correct:0,difficulty:2,source:G,
  explanation:L('Hier bilden die dichteren Milchglasareale die beschriebene Parenchymveränderung. Ähnliches Gefäßkaliber und fehlendes überzeugendes Air Trapping unterstützen diese Einordnung, ohne eine konkrete Ätiologie zu beweisen.','The denser ground-glass regions represent the described parenchymal abnormality. Similar vessel calibre and absence of convincing air trapping support this interpretation without proving a specific cause.','اینجا نواحی متراکم‌تر شیشه‌مات تغییر پارانشیمی توصیف‌شده‌اند. قطر مشابه عروق و نبود حبس هوای قانع‌کننده از این تفسیر حمایت می‌کنند، بدون اثبات علت مشخص.'),
  wrong:[null,L('Für eine Small-Airways-Ursache wäre überzeugendes exspiratorisches Air Trapping hilfreicher; es ist nicht beschrieben.','Convincing expiratory air trapping would better support a small-airway cause; it is not described.','حبس هوای قانع‌کننده در بازدم بیشتر از علت راه هوایی کوچک حمایت می‌کرد؛ این یافته توصیف نشده است.'),L('Regionale Gefäßkaliberunterschiede oder direkte Gefäßbefunde wären hilfreicher; hier sind primär fleckige Milchglasareale beschrieben.','Regional vessel-calibre differences or direct vascular findings would be more helpful; the primary finding here is patchy ground glass.','تفاوت ناحیه‌ای قطر عروق یا یافتهٔ مستقیم عروقی کمک‌کننده‌تر بود؛ یافتهٔ اصلی اینجا شیشه‌مات لکه‌ای است.'),L('Emphysematöse Destruktion ist nicht beschrieben. Die dichteren Areale sind als Milchglas bei erhaltenen Gefäßkonturen charakterisiert.','Emphysematous destruction is not described. The denser areas are characterised as ground glass with preserved vessel margins.','تخریب آمفیزماتیک توصیف نشده است. نواحی متراکم‌تر به‌صورت شیشه‌مات با حفظ حاشیهٔ عروق مشخص شده‌اند.')],
  front:L('Welche Komponente ist bei einem durch fleckiges Milchglas bedingten Mosaik pathologisch?','Which component is abnormal in a mosaic caused by patchy ground glass?','در موزائیک ناشی از شیشه‌مات لکه‌ای کدام بخش غیرطبیعی است؟'),
  answer:L('Die dichteren Milchglasareale; Gefäßkaliber, Exspiration und Begleitbefunde helfen bei der Abgrenzung zu perfusions-/atemwegsbedingtem Mosaik.','The denser ground-glass regions; vessel calibre, expiration and associated findings help distinguish perfusion/airway-related mosaic.','نواحی متراکم‌تر شیشه‌مات؛ قطر عروق، بازدم و یافته‌های همراه به افتراق از موزائیک مرتبط با خون‌رسانی/راه هوایی کمک می‌کنند.')
 },
 'hrct-architekturmuster-04':{
  question:L('Bei chronischem Giemen zeigen einzelne Lungenlobuli in adäquater Exspiration weniger Dichteanstieg und weniger Volumenabnahme als die Umgebung. Welche Beschreibung trifft zu?','In chronic wheeze, some lung lobules show less increase in attenuation and less decrease in volume than surrounding lung during adequate expiration. Which description applies?','در خس‌خس مزمن، برخی لوبول‌های ریه در بازدم مناسب نسبت به اطراف افزایش دانسیته و کاهش حجم کمتری دارند. کدام توصیف درست است؟'),
  options:[L('Air Trapping','Air trapping','حبس هوا'),L('Alveoläre Konsolidierung','Alveolar consolidation','کنسولیدیشن آلوئولی'),L('Honeycombing','Honeycombing','هانی‌کومبینگ'),L('Kompressionsatelektase','Compressive atelectasis','آتلکتازی فشاری')],correct:0,difficulty:2,source:G,
  explanation:L('Die verminderte Dichtezunahme und Volumenabnahme in Exspiration beschreiben Air Trapping. Das stützt eine ventilatorische Störung kleiner Atemwege; die genaue Ursache erfordert weitere Einordnung.','Reduced attenuation increase and volume decrease on expiration describe air trapping. This supports small-airway ventilatory dysfunction; the specific cause needs further assessment.','افزایش کمتر دانسیته و کاهش کمتر حجم در بازدم، حبس هوا را توصیف می‌کنند. این از اختلال تهویهٔ راه هوایی کوچک حمایت می‌کند؛ علت دقیق به ارزیابی بیشتر نیاز دارد.'),
  wrong:[null,L('Konsolidierung ist eine Verdichtung mit verdeckten Gefäßrändern und erklärt nicht die beschriebene lobuläre Luftretention.','Consolidation obscures vessel margins and does not explain the lobular air retention described.','کنسولیدیشن حاشیهٔ عروق را محو می‌کند و احتباس هوای لوبولی توصیف‌شده را توضیح نمی‌دهد.'),L('Honeycombing setzt zystische Räume mit Fibrose/Architekturverlust voraus; diese sind nicht beschrieben.','Honeycombing requires cystic spaces with fibrosis/architectural loss, which are not described.','هانی‌کومبینگ نیازمند فضاهای کیستیک با فیبروز/تخریب معماری است؛ این موارد توصیف نشده‌اند.'),L('Bei Kompressionsatelektase wäre eine Minderentfaltung im Zusammenhang mit äußerer Kompression zu suchen, nicht verminderte Entleerung einzelner Lobuli in Exspiration.','Compressive atelectasis involves underexpansion related to external compression rather than reduced expiratory emptying of individual lobules.','در آتلکتازی فشاری کاهش اتساع مرتبط با فشار خارجی بررسی می‌شود، نه تخلیهٔ کمتر لوبول‌های منفرد در بازدم.')],
  front:L('Welche zwei exspiratorischen Veränderungen definieren Air Trapping?','Which two expiratory changes define air trapping?','کدام دو تغییر بازدمی حبس هوا را تعریف می‌کنند؟'),
  answer:L('Weniger Dichteanstieg und weniger Volumenabnahme als erwartet; die Bezeichnung erfordert eine geeignete Exspirationsaufnahme.','Less attenuation increase and less volume decrease than expected; the term requires a suitable expiratory acquisition.','افزایش دانسیته و کاهش حجم کمتر از انتظار؛ این اصطلاح به تصویربرداری بازدمی مناسب نیاز دارد.')
 },
 'hrct-architekturmuster-05':{
  question:L('Bei bekannter chronischer thromboembolischer Gefäßerkrankung zeigt die inspiratorische CT ein Mosaik mit kleineren Gefäßen in den dunklen Arealen. In adäquater Exspiration besteht kein überzeugendes Air Trapping. Welcher Mechanismus ist am ehesten führend?','In established chronic thromboembolic vascular disease, inspiratory CT shows a mosaic with smaller vessels in darker regions. Adequate expiration shows no convincing air trapping. Which mechanism is most likely dominant?','در بیماری عروقی ترومبوآمبولیک مزمنِ شناخته‌شده، CT دمی موزائیک با عروق کوچک‌تر در نواحی تیره نشان می‌دهد. در بازدم مناسب حبس هوای قانع‌کننده وجود ندارد. کدام مکانیسم بیشتر غالب است؟'),
  options:[L('Regionale Minderperfusion','Regional hypoperfusion','کاهش خون‌رسانی ناحیه‌ای'),L('Lobuläre Luftretention','Lobular air retention','احتباس هوای لوبولی'),L('Fleckige alveoläre Füllung','Patchy alveolar filling','پرشدگی لکه‌ای آلوئول‌ها'),L('Regionale zystische Destruktion','Regional cystic destruction','تخریب کیستیک ناحیه‌ای')],correct:0,difficulty:2,source:G,
  explanation:L('Bekannte Gefäßerkrankung, regionale Gefäßverkleinerung und fehlendes überzeugendes Air Trapping stützen eine führende Perfusionskomponente. Kleines Gefäßkaliber allein würde eine vaskuläre von einer Small-Airways-Ursache nicht sicher trennen.','Known vascular disease, regional vessel narrowing and absence of convincing air trapping support a dominant perfusion component. Small vessel calibre alone would not reliably distinguish vascular from small-airway disease.','بیماری عروقی شناخته‌شده، کوچک‌شدن ناحیه‌ای عروق و نبود حبس هوای قانع‌کننده از غالب‌بودن مؤلفهٔ خون‌رسانی حمایت می‌کنند. قطر کم عروق به‌تنهایی علت عروقی را با اطمینان از علت راه هوایی کوچک جدا نمی‌کند.'),
  wrong:[null,L('Eine führende Luftretention würde durch exspiratorisches Air Trapping gestützt, das hier nicht überzeugend vorliegt.','Dominant air retention would be supported by expiratory air trapping, which is not convincingly present here.','احتباس هوای غالب با حبس هوا در بازدم حمایت می‌شد که در اینجا قانع‌کننده نیست.'),L('Eine primär fleckige Füllung würde vor allem die dichteren Parenchymareale erklären; die Gefäßanamnese und regionale Gefäßunterschiede priorisieren hier Perfusion.','Primary patchy filling would mainly explain the denser parenchymal regions; vascular history and regional vessel differences prioritise perfusion here.','پرشدگی لکه‌ای اولیه بیشتر نواحی متراکم پارانشیم را توضیح می‌دهد؛ سابقهٔ عروقی و تفاوت ناحیه‌ای عروق در اینجا خون‌رسانی را در اولویت قرار می‌دهند.'),L('Zystische Räume oder emphysematöse Destruktion sind nicht beschrieben.','Cystic spaces or emphysematous destruction are not described.','فضاهای کیستیک یا تخریب آمفیزماتیک توصیف نشده‌اند.')],
  front:L('Welche Zusatzbefunde helfen bei der vaskulären Einordnung eines Mosaiks?','Which additional findings help interpret a mosaic as vascular?','کدام یافته‌های تکمیلی به تفسیر عروقی موزائیک کمک می‌کنند؟'),
  answer:L('Gefäßanamnese/direkte Gefäßbefunde, regionales Gefäßkaliber und geeignete Exspiration zusammenführen. Gefäßverkleinerung allein ist nicht spezifisch.','Combine vascular history/direct vascular findings, regional vessel calibre and suitable expiration. Vessel narrowing alone is nonspecific.','سابقه/یافتهٔ مستقیم عروقی، قطر ناحیه‌ای عروق و بازدم مناسب را با هم تفسیر کنید. کوچک‌شدن عروق به‌تنهایی اختصاصی نیست.')
 },
 'hrct-architekturmuster-06':{
  question:L('Eine inspiratorische HRCT zeigt ein Mosaikmuster; die Frage nach Air Trapping ist offen. Welche ergänzende CT-Aufnahme prüft diese Frage gezielt?','Inspiratory HRCT shows mosaic attenuation and air trapping remains uncertain. Which additional CT acquisition directly addresses this question?','HRCT دمی موزائیک نشان می‌دهد و وجود حبس هوا مشخص نیست. کدام تصویربرداری تکمیلی CT این سؤال را هدفمند بررسی می‌کند؟'),
  options:[L('CT in geeigneter Endexspiration','CT at suitable end expiration','CT در پایان بازدم مناسب'),L('Inspiratorische CT in Bauchlage','Inspiratory prone CT','CT دمی در وضعیت دمر'),L('CT in venöser Kontrastmittelphase','CT in the venous contrast phase','CT در فاز وریدی مادهٔ حاجب'),L('Erneute inspiratorische CT mit gleichem Atemkommando','Repeat inspiratory CT with the same breathing instruction','تکرار CT دمی با همان دستور تنفسی')],correct:0,difficulty:1,source:G,
  explanation:L('Air Trapping wird in Exspiration durch verminderte Dichtezunahme und Volumenabnahme beurteilt. Eine geeignete Atemphase ist wesentlich; inspiratorische Inhomogenität allein genügt nicht.','Air trapping is assessed on expiration through reduced attenuation increase and volume decrease. A suitable breathing phase is essential; inspiratory heterogeneity alone is insufficient.','حبس هوا در بازدم با افزایش کمتر دانسیته و کاهش کمتر حجم ارزیابی می‌شود. مرحلهٔ تنفسی مناسب ضروری است؛ ناهمگنی دمی به‌تنهایی کافی نیست.'),
  wrong:[null,L('Bauchlage hilft bei der Abgrenzung abhängiger Minderbelüftung, ersetzt aber die Prüfung der exspiratorischen Luftentleerung nicht.','Prone positioning helps assess dependent underinflation but does not replace testing expiratory emptying.','وضعیت دمر به ارزیابی کاهش تهویهٔ وابسته کمک می‌کند، اما جای بررسی تخلیهٔ هوا در بازدم را نمی‌گیرد.'),L('Die Kontrastmittelphase prüft keine exspiratorische Luftretention.','Contrast timing does not test expiratory air retention.','زمان‌بندی مادهٔ حاجب، احتباس هوای بازدمی را بررسی نمی‌کند.'),L('Die Wiederholung derselben Inspirationsphase beantwortet die offene Exspirationsfrage nicht.','Repeating the same inspiratory phase does not answer the unresolved expiratory question.','تکرار همان مرحلهٔ دم، سؤال حل‌نشدهٔ بازدم را پاسخ نمی‌دهد.')],
  front:L('Darf Air Trapping allein aus einer inspiratorischen Mosaikattenuation benannt werden?','Can air trapping be diagnosed from inspiratory mosaic attenuation alone?','آیا حبس هوا را می‌توان صرفاً از موزائیک CT دمی نام‌گذاری کرد؟'),
  answer:L('Nein. Es erfordert die Beurteilung einer geeigneten Exspiration; Qualität und Atemphase müssen passen.','No. It requires assessment on suitable expiration; acquisition quality and breathing phase must be appropriate.','خیر. به ارزیابی بازدم مناسب نیاز دارد؛ کیفیت تصویربرداری و مرحلهٔ تنفسی باید درست باشند.')
 },
 'hrct-architekturmuster-07':{
  "question": {
    "de": "Bei gesicherter Small-Airways-Erkrankung zeigt die CT lobuläres exspiratorisches Air Trapping. In denselben Arealen sind die Gefäße kleiner. Welche Erklärung passt am besten zu dieser Kombination?",
    "en": "In established small-airway disease, CT shows lobular expiratory air trapping with smaller vessels in the same regions. Which explanation best fits the combination?",
    "fa": "در بیماری شناخته‌شدهٔ راه هوایی کوچک، CT حبس هوای لوبولی در بازدم و عروق کوچک‌تر در همان نواحی نشان می‌دهد. کدام توضیح بیشتر با این ترکیب سازگار است؟"
  },
  "options": [
    {
      "de": "Verminderte regionale Perfusion bei unzureichender Ventilation",
      "en": "Reduced regional perfusion associated with impaired ventilation",
      "fa": "کاهش خون‌رسانی ناحیه‌ای همراه تهویهٔ ناکافی"
    },
    {
      "de": "Regionale Perfusionsminderung durch organisierte Emboli",
      "en": "Regional hypoperfusion caused by organised emboli",
      "fa": "کاهش خون‌رسانی ناحیه‌ای ناشی از آمبولی‌های سازمان‌یافته"
    },
    {
      "de": "Ein Verschluss der abführenden Pulmonalvenen",
      "en": "Occlusion of draining pulmonary veins",
      "fa": "انسداد وریدهای ریوی تخلیه‌کننده"
    },
    {
      "de": "Kardiale Stauung mit regionaler Gefäßfüllung",
      "en": "Cardiac congestion with regional vascular engorgement",
      "fa": "احتقان قلبی با پرشدگی ناحیه‌ای عروق"
    }
  ],
  "correct": 0,
  "difficulty": 2,
  "source": "https://doi.org/10.1148/radiol.232558",
  "explanation": {
    "de": "Small-Airways-bedingte Minderbelüftung kann mit verminderter Perfusion und kleineren Gefäßen einhergehen. Daher beweist kleines Gefäßkaliber allein keine primär okklusive Gefäßerkrankung.",
    "en": "Small-airway-related underventilation can accompany reduced perfusion and smaller vessels. Small vessel calibre alone therefore does not prove primary occlusive vascular disease.",
    "fa": "تهویهٔ ناکافی ناشی از راه هوایی کوچک می‌تواند با کاهش خون‌رسانی و کوچک‌شدن عروق همراه باشد. بنابراین قطر کم عروق به‌تنهایی بیماری انسدادی اولیهٔ عروقی را اثبات نمی‌کند."
  },
  "wrong": [
    null,
    {
      "de": "Ein Embolus ist nicht direkt beschrieben. Kleine Gefäße können sekundär zur Minderbelüftung auftreten.",
      "en": "No embolus is directly described. Small vessels can occur secondary to underventilation.",
      "fa": "آمبولی مستقیماً توصیف نشده است. عروق کوچک می‌توانند ثانویه به تهویهٔ ناکافی باشند."
    },
    {
      "de": "Direkte venöse Verschlussbefunde oder passende Stauungszeichen fehlen; die Luftretention passt zur bekannten Atemwegserkrankung.",
      "en": "Direct venous occlusion or corresponding congestion is not described; air retention fits the established airway disease.",
      "fa": "انسداد مستقیم وریدی یا نشانه‌های احتقان مرتبط توصیف نشده‌اند؛ احتباس هوا با بیماری راه هوایی شناخته‌شده سازگار است."
    },
    {
      "de": "Stauung erklärt nicht die lobulär verminderte exspiratorische Entleerung; eine Gefäßfüllung ist nicht der beschriebene Befund.",
      "en": "Congestion does not explain reduced lobular expiratory emptying; vascular engorgement is not the finding described.",
      "fa": "احتقان تخلیهٔ کمتر لوبول‌ها در بازدم را توضیح نمی‌دهد؛ پرشدگی عروق یافتهٔ توصیف‌شده نیست."
    }
  ],
  "front": {
    "de": "Sind kleine Gefäße in dunklen Mosaikarealen spezifisch für Gefäßverschluss?",
    "en": "Are small vessels in dark mosaic regions specific for vascular occlusion?",
    "fa": "آیا عروق کوچک در نواحی تیرهٔ موزائیک برای انسداد عروقی اختصاصی‌اند؟"
  },
  "answer": {
    "de": "Nein. Auch eine Small-Airways-bedingte Minderbelüftung kann regional Perfusion und Gefäßkaliber reduzieren; Exspiration und direkte Gefäßbefunde mitbeurteilen.",
    "en": "No. Small-airway-related underventilation can also reduce regional perfusion and vessel calibre; assess expiration and direct vascular findings.",
    "fa": "خیر. تهویهٔ ناکافی ناشی از راه هوایی کوچک هم می‌تواند خون‌رسانی و قطر عروق را در ناحیه کاهش دهد؛ بازدم و یافته‌های مستقیم عروقی نیز بررسی شوند."
  }
},
 'hrct-architekturmuster-08':{
  question:L('Bei Dyspnoe zeigt die HRCT Milchglas mit darüberliegenden interlobulären Septen und feinen intralobulären Linien. Die Gefäßkonturen sind im Milchglas erkennbar. Welcher Musterbegriff passt?','In dyspnoea, HRCT shows ground-glass opacity with superimposed interlobular septa and fine intralobular lines. Vessel margins remain visible within the ground glass. Which pattern term fits?','در تنگی نفس، HRCT شیشه‌مات همراه سپتاهای بین‌لوبولی و خطوط ظریف داخل‌لوبولی روی آن نشان می‌دهد. حاشیهٔ عروق در شیشه‌مات قابل مشاهده است. کدام اصطلاح الگو مناسب است؟'),
  options:[L('Crazy Paving','Crazy paving','کریزی‌پیونگ'),L('Honeycombing','Honeycombing','هانی‌کومبینگ'),L('Isoliertes retikuläres Muster ohne Milchglas','Isolated reticular pattern without ground glass','الگوی رتیکولار منفرد بدون شیشه‌مات'),L('Tree-in-bud','Tree-in-bud','درخت در جوانه')],correct:0,difficulty:1,source:G,
  explanation:L('Die Überlagerung linearer Verdichtungen auf Milchglas wird Crazy Paving genannt. Es ist ein Deskriptor, keine ätiologische Diagnose; die Linien müssen nicht in jedem Fall ausschließlich glatt sein.','Linear opacities superimposed on ground glass are termed crazy paving. This is a descriptor rather than an aetiological diagnosis; the lines need not always be exclusively smooth.','کدورت‌های خطی روی شیشه‌مات کریزی‌پیونگ نامیده می‌شوند. این یک توصیف است نه تشخیص علت؛ خطوط در همهٔ موارد الزاماً فقط صاف نیستند.'),
  wrong:[null,L('Honeycombing benötigt zystische Räume mit zerstörter fibrotischer Architektur; das ist nicht beschrieben.','Honeycombing requires cystic spaces with destroyed fibrotic architecture, which are not described.','هانی‌کومبینگ به فضاهای کیستیک با تخریب معماری فیبروتیک نیاز دارد که توصیف نشده‌اند.'),L('Die zusätzliche Milchglaskomponente ist ausdrücklich vorhanden und gehört in die Musterbeschreibung.','The additional ground-glass component is explicitly present and belongs in the pattern description.','جزء شیشه‌مات صریحاً وجود دارد و باید در توصیف الگو لحاظ شود.'),L('Tree-in-bud besteht aus verzweigten zentrilobulären Verdichtungen mit knospenartigen Enden, nicht aus septalen Linien auf Milchglas.','Tree-in-bud consists of branching centrilobular opacities with bud-like ends rather than septal lines on ground glass.','Tree-in-bud از کدورت‌های منشعب سنترلوبولار با انتهای جوانه‌مانند تشکیل می‌شود، نه خطوط سپتایی روی شیشه‌مات.')],
  front:L('Welche Bildkomponenten bilden Crazy Paving?','Which imaging components form crazy paving?','کریزی‌پیونگ از کدام اجزای تصویری تشکیل می‌شود؟'),
  answer:L('Milchglas mit darüberliegenden interlobulären Septen und/oder intralobulären Linien; das Muster ist nicht spezifisch für Alveolarproteinose.','Ground glass with superimposed interlobular septa and/or intralobular lines; the pattern is not specific for alveolar proteinosis.','شیشه‌مات همراه سپتاهای بین‌لوبولی و/یا خطوط داخل‌لوبولی روی آن؛ این الگو برای پروتئینوز آلوئولی اختصاصی نیست.')
 },
 'hrct-architekturmuster-09':{
  "question": {
    "de": "Bei histologisch gesicherter pulmonaler Alveolarproteinose zeigt die CT geografisches Crazy Paving. Welcher pathologische Baustein kann die Milchglaskomponente erklären?",
    "en": "In histologically established pulmonary alveolar proteinosis, CT shows geographic crazy paving. Which pathological component can explain the ground glass?",
    "fa": "در پروتئینوز آلوئولی ریویِ تأییدشده با بافت‌شناسی، CT کریزی‌پیونگ جغرافیایی نشان می‌دهد. کدام جزء آسیب‌شناختی می‌تواند شیشه‌مات را توضیح دهد؟"
  },
  "options": [
    {
      "de": "Protein-/lipidreiches Material in den Alveolen",
      "en": "Protein-/lipid-rich material within alveoli",
      "fa": "مادهٔ غنی از پروتئین/چربی در آلوئول‌ها"
    },
    {
      "de": "Erythrozytenreiches Material in den Alveolen",
      "en": "Erythrocyte-rich material within alveoli",
      "fa": "مادهٔ غنی از گلبول قرمز در آلوئول‌ها"
    },
    {
      "de": "Neutrophilenreiches Exsudat in den Alveolen",
      "en": "Neutrophil-rich exudate within alveoli",
      "fa": "اگزودای غنی از نوتروفیل در آلوئول‌ها"
    },
    {
      "de": "Hyaline Membranen mit alveolärem Exsudat",
      "en": "Hyaline membranes with alveolar exudate",
      "fa": "غشاهای هیالین همراه اگزودای آلوئولی"
    }
  ],
  "correct": 0,
  "difficulty": 1,
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3259383/",
  "explanation": {
    "de": "In der publizierten radiologisch-pathologischen PAP-Korrelation lagen proteinreiche PAS-positive Ablagerungen in den Alveolen vor. Alveoläre Füllung erklärt Milchglas; Crazy Paving allein würde die PAP-Diagnose nicht sichern.",
    "en": "The published radiological-pathological PAP correlation showed protein-rich PAS-positive material within alveoli. Alveolar filling explains ground glass; crazy paving alone would not establish PAP.",
    "fa": "در تطبیق رادیولوژی-آسیب‌شناسی منتشرشدهٔ PAP، مادهٔ غنی از پروتئین و PAS مثبت در آلوئول‌ها وجود داشت. پرشدگی آلوئولی شیشه‌مات را توضیح می‌دهد؛ کریزی‌پیونگ به‌تنهایی تشخیص PAP را ثابت نمی‌کند."
  },
  "wrong": [
    null,
    {
      "de": "Erythrozytenreiche Füllung würde eine alveoläre Blutung erklären. Der typische Materialbaustein der hier gesicherten PAP ist dagegen protein-/lipidreich.",
      "en": "Erythrocyte-rich filling would explain alveolar haemorrhage. The typical material in the established PAP described here is instead protein-/lipid-rich.",
      "fa": "پرشدگی غنی از گلبول قرمز خونریزی آلوئولی را توضیح می‌دهد. در مقابل، مادهٔ تیپیک PAP تأییدشدهٔ اینجا غنی از پروتئین/چربی است."
    },
    {
      "de": "Eine neutrophilenreiche Füllung passt zu einem eitrig-entzündlichen Prozess; die typische PAP-Ablagerung besteht nicht primär aus dieser Zellansammlung.",
      "en": "Neutrophil-rich filling fits a suppurative inflammatory process; typical PAP deposition does not primarily consist of this cellular accumulation.",
      "fa": "پرشدگی غنی از نوتروفیل با فرایند التهابی چرکی سازگار است؛ رسوب تیپیک PAP عمدتاً از این تجمع سلولی تشکیل نمی‌شود."
    },
    {
      "de": "Hyaline Membranen mit Exsudat passen zum diffusen Alveolarschaden. Sie sind nicht der typische Materialbaustein der hier gesicherten PAP.",
      "en": "Hyaline membranes with exudate fit diffuse alveolar damage. They are not the typical material component of the established PAP described here.",
      "fa": "غشاهای هیالین همراه اگزودا با آسیب منتشر آلوئولی سازگارند. آن‌ها جزء مادی تیپیک PAP تأییدشدهٔ اینجا نیستند."
    }
  ],
  "front": {
    "de": "Warum ist PAP eine klassische, aber keine beweisende Crazy-Paving-Assoziation?",
    "en": "Why is PAP a classic but nondefinitive crazy-paving association?",
    "fa": "چرا PAP ارتباط کلاسیک، اما غیرقطعی با کریزی‌پیونگ دارد؟"
  },
  "answer": {
    "de": "Alveoläres Material kann Milchglas und die überlagerte lineare Zeichnung erzeugen; viele andere alveoläre/interstitielle Prozesse können ein ähnliches Muster bilden.",
    "en": "Alveolar material can produce ground glass with superimposed lines, but many other alveolar/interstitial processes can produce a similar pattern.",
    "fa": "مادهٔ داخل آلوئول می‌تواند شیشه‌مات و خطوط روی آن ایجاد کند، اما بسیاری از فرایندهای آلوئولی/بینابینی دیگر هم می‌توانند الگوی مشابه بسازند."
  }
},
 'hrct-architekturmuster-10':{
  question:L('Eine Person mit bekannter Herzinsuffizienz entwickelt innerhalb von zwei Tagen Orthopnoe und Beinödeme. CT: beidseitiges Crazy Paving und Pleuraergüsse, im Vergleich zur jüngsten Voraufnahme neu. Welche Arbeitsdiagnose wird durch die Gesamtkonstellation am stärksten gestützt?','A person with known heart failure develops orthopnoea and leg oedema over two days. CT shows new bilateral crazy paving and pleural effusions compared with a recent prior examination. Which working diagnosis is best supported by the combination?','فرد مبتلا به نارسایی قلبی شناخته‌شده طی دو روز دچار ارتوپنه و ادم پا می‌شود. CT در مقایسه با بررسی اخیر، کریزی‌پیونگ دوطرفه و افیوژن پلور جدید نشان می‌دهد. کدام تشخیص اولیه بیشتر با این مجموعه حمایت می‌شود؟'),
  options:[L('Hydrostatisches Lungenödem','Hydrostatic pulmonary oedema','ادم هیدروستاتیک ریه'),L('Pulmonale Alveolarproteinose','Pulmonary alveolar proteinosis','پروتئینوز آلوئولی ریه'),L('Pneumocystis-jirovecii-Pneumonie','Pneumocystis jirovecii pneumonia','پنومونی پنوموسیستیس جیرووسی'),L('Diffuse alveoläre Hämorrhagie','Diffuse alveolar haemorrhage','خونریزی منتشر آلوئولی')],correct:0,difficulty:2,source:P,
  explanation:L('Akuter Beginn, bekannte Herzinsuffizienz, Orthopnoe, Beinödeme und Ergüsse stützen hydrostatisches Ödem. Crazy Paving ist dabei unspezifisch; die Arbeitsdiagnose wird klinisch überprüft, nicht allein aus dem CT-Muster bewiesen.','Acute onset, known heart failure, orthopnoea, leg oedema and effusions support hydrostatic oedema. Crazy paving is nonspecific; the working diagnosis requires clinical verification rather than proof from the CT pattern alone.','شروع حاد، نارسایی قلبی شناخته‌شده، ارتوپنه، ادم پا و افیوژن از ادم هیدروستاتیک حمایت می‌کنند. کریزی‌پیونگ غیراختصاصی است؛ تشخیص اولیه با ارزیابی بالینی بررسی می‌شود، نه اثبات صرفاً بر اساس الگوی CT.'),
  wrong:[null,L('PAP kann Crazy Paving zeigen; die akute kardiale Stauungskonstellation und neue Ergüsse priorisieren hier jedoch Ödem.','PAP can show crazy paving, but acute cardiac congestion and new effusions prioritise oedema here.','PAP می‌تواند کریزی‌پیونگ نشان دهد، اما مجموعهٔ احتقان حاد قلبی و افیوژن جدید در اینجا ادم را در اولویت قرار می‌دهد.'),L('Eine passende Immunsuppression und infektiologische Befunde wären gezielt zu erheben; die angegebenen kardialen Zeichen stützen zunächst Stauung.','Relevant immunosuppression and infectious evidence would need assessment; the cardiac findings given initially support congestion.','سرکوب ایمنی مرتبط و شواهد عفونی باید بررسی شوند؛ نشانه‌های قلبی ذکرشده در ابتدا از احتقان حمایت می‌کنند.'),L('Eine Blutung ist eine wichtige Muster-DD, bräuchte aber zusätzliche klinische/laborchemische Hinweise. Die angegebene Konstellation stützt stärker Ödem.','Haemorrhage is an important pattern differential but needs additional clinical/laboratory evidence. The stated combination supports oedema more strongly.','خونریزی از افتراق‌های مهم این الگو است، اما به شواهد بالینی/آزمایشگاهی بیشتر نیاز دارد. مجموعهٔ ذکرشده بیشتر از ادم حمایت می‌کند.')],
  front:L('Welche Informationen priorisieren Ursachen eines Crazy-Paving-Musters?','Which information helps prioritise causes of crazy paving?','کدام اطلاعات به اولویت‌بندی علت‌های کریزی‌پیونگ کمک می‌کنند؟'),
  answer:L('Akuität, Voraufnahmen, kardiale Zeichen, Immunsuppression/Infektionshinweise und Blutungszeichen zusammenführen; nicht aus dem Muster allein PAP ableiten.','Combine acuity, prior imaging, cardiac signs, immunosuppression/infection evidence and bleeding clues; do not infer PAP from the pattern alone.','حادبودن، تصاویر قبلی، نشانه‌های قلبی، سرکوب ایمنی/شواهد عفونت و نشانه‌های خونریزی با هم تفسیر شوند؛ PAP از خود الگو نتیجه‌گیری نشود.')
 },
 'hrct-architekturmuster-11':{
  question:L('In über ein Jahr unveränderten fibrotischen Lungenarealen sind Bronchien erweitert und verzogen. Retikulation und Volumenverlust umgeben die Atemwege. Welcher Begriff beschreibt den Mechanismus am besten?','In fibrotic lung regions unchanged over a year, bronchi are dilated and distorted, surrounded by reticulation and volume loss. Which term best describes the mechanism?','در نواحی فیبروتیک ریه که طی یک سال ثابت مانده‌اند، برونش‌ها گشاد و تغییر شکل یافته‌اند و رتیکولاسیون و کاهش حجم اطراف آن‌ها دیده می‌شود. کدام اصطلاح مکانیسم را بهتر توصیف می‌کند؟'),
  options:[L('Traktionsbronchiektasen','Traction bronchiectasis','برونشکتازی کششی'),L('Akute reaktive Bronchusdilatation','Acute reactive bronchial dilatation','اتساع واکنشی حاد برونش'),L('Emphysembullae','Emphysematous bullae','بولاهای آمفیزماتیک'),L('Isolierte Bronchusmukozelen','Isolated bronchial mucoceles','موکوسل‌های منفرد برونشی')],correct:0,difficulty:2,source:G,
  explanation:L('Persistierende Atemwegsdilatation und Verziehung in fibrotisch umgebauter Lunge passen zu Traktionsbronchiektasen. Chronizität und fibrotischer Kontext helfen, vorübergehende Dilatation bei akuter Entzündung abzugrenzen.','Persistent airway dilatation and distortion in fibrotic lung fit traction bronchiectasis. Chronicity and fibrotic context help distinguish transient dilatation during acute inflammation.','اتساع پایدار و تغییر شکل راه هوایی در ریهٔ فیبروتیک با برونشکتازی کششی سازگار است. مزمن‌بودن و زمینهٔ فیبروز به افتراق از اتساع گذرای التهاب حاد کمک می‌کنند.'),
  wrong:[null,L('Der über ein Jahr stabile Verlauf mit fibrotischer Verziehung spricht gegen die Einordnung als lediglich akute reaktive Dilatation.','A year of stability with fibrotic distortion argues against classifying this as merely acute reactive dilatation.','ثبات یک‌ساله همراه تغییر شکل فیبروتیک با تفسیرِ صرفاً اتساع واکنشی حاد سازگار نیست.'),L('Beschrieben sind erweiterte und verzogene Bronchien, nicht emphysematöse Räume außerhalb der Atemwege.','Dilated distorted bronchi are described rather than emphysematous spaces outside the airways.','برونش‌های گشاد و تغییر شکل یافته توصیف شده‌اند، نه فضاهای آمفیزماتیک خارج از راه هوایی.'),L('Eine Sekretfüllung mit umschriebener bronchieller Impaktion ist nicht angegeben; die Dilatation liegt im fibrotischen Zugkontext.','Focal mucus impaction is not described; dilatation occurs in a fibrotic traction context.','پرشدگی موضعی با ترشحات ذکر نشده است؛ اتساع در زمینهٔ کشش فیبروتیک قرار دارد.')],
  front:L('Was stützt eine Traktionsbronchiektase gegenüber vorübergehender Bronchusdilatation?','What supports traction bronchiectasis over transient bronchial dilatation?','چه چیزی از برونشکتازی کششی در برابر اتساع گذرای برونش حمایت می‌کند؟'),
  answer:L('Persistenz sowie Verziehung im fibrotischen Kontext mit Retikulation/Volumenverlust; eine einzelne Akutaufnahme reicht für die Verlaufsbeurteilung nicht.','Persistence and distortion in a fibrotic context with reticulation/volume loss; one acute scan does not establish the course.','تداوم و تغییر شکل در زمینهٔ فیبروز با رتیکولاسیون/کاهش حجم؛ یک تصویر حاد سیر زمانی را مشخص نمی‌کند.')
 },
 'hrct-architekturmuster-12':{
  question:L('Die HRCT zeigt nur eine Lage benachbarter subpleuraler Zysten, jedoch zusätzlich deutlichen Architekturverlust, Retikulation und Traktionsbronchiolektasen. Welche Einordnung ist am besten vertretbar?','HRCT shows only a single layer of adjacent subpleural cysts but also marked architectural loss, reticulation and traction bronchiolectasis. Which interpretation is most defensible?','HRCT فقط یک لایه کیست مجاور ساب‌پلورال نشان می‌دهد، اما تخریب واضح معماری، رتیکولاسیون و برونشیولکتازی کششی هم وجود دارند. کدام تفسیر موجه‌تر است؟'),
  options:[L('Honeycombing im beschriebenen fibrotischen Kontext','Honeycombing in the described fibrotic context','هانی‌کومبینگ در زمینهٔ فیبروتیک توصیف‌شده'),L('Paraseptales Emphysem als bessere Gesamterklärung','Paraseptal emphysema as a better overall explanation','آمفیزم پاراسپتال به‌عنوان توضیح کلی مناسب‌تر'),L('Zufällig verteilte einfache Zysten ohne Fibrosebezug','Random simple cysts unrelated to fibrosis','کیست‌های سادهٔ تصادفی بدون ارتباط با فیبروز'),L('Akute Pneumatozelen als bessere Gesamterklärung','Acute pneumatoceles as a better overall explanation','پنوماتوسل‌های حاد به‌عنوان توضیح کلی مناسب‌تر')],correct:0,difficulty:2,source:G,
  explanation:L('Nach aktuellem Fleischner-Begriffsgebrauch kann eine Lage zystischer Räume genügen, wenn Architekturverlust und weitere Fibrosezeichen vorliegen. Mehrlagigkeit ist kein zwingendes isoliertes Kriterium.','Current Fleischner terminology allows a single layer of cystic spaces when architectural loss and other fibrotic signs are present. Multiple layers are not an isolated mandatory criterion.','در کاربرد فعلی اصطلاحات فلایشنر، یک لایه فضای کیستیک همراه تخریب معماری و سایر نشانه‌های فیبروز می‌تواند کافی باشد. چندلایه‌بودن معیار منفرد اجباری نیست.'),
  wrong:[null,L('Eine einzelne Lage beweist kein Emphysem. Die deutlichen begleitenden Fibrose- und Architekturzeichen stützen hier Honeycombing.','A single layer does not establish emphysema. Marked associated fibrosis and architectural signs support honeycombing here.','یک لایه‌بودن آمفیزم را ثابت نمی‌کند. نشانه‌های واضح فیبروز و معماری همراه در اینجا از هانی‌کومبینگ حمایت می‌کنند.'),L('Die subpleurale Gruppierung und der ausdrücklich fibrotische Kontext sprechen gegen diese isolierte Zufallszysten-Einordnung.','Subpleural clustering and explicitly fibrotic context argue against interpreting these as unrelated incidental cysts.','تجمع ساب‌پلورال و زمینهٔ صریح فیبروز با تفسیرِ کیست‌های اتفاقی بی‌ارتباط سازگار نیستند.'),L('Ein passender akuter Auslöser ist nicht beschrieben; Pneumatozelen erklären die fibrotische Architektur schlechter.','No relevant acute trigger is described; pneumatoceles less well explain the fibrotic architecture.','عامل حاد مرتبط توصیف نشده است؛ پنوماتوسل‌ها معماری فیبروتیک را کمتر توضیح می‌دهند.')],
  front:L('Muss Honeycombing mehrlagig sein?','Must honeycombing be multilayered?','آیا هانی‌کومبینگ باید چندلایه باشد؟'),
  answer:L('Nicht zwingend. Auch eine Lage ist im passenden Kontext von Architekturverlust und weiteren Fibrosezeichen möglich; isolierte Zysten allein reichen nicht.','Not necessarily. A single layer is possible with architectural loss and other fibrotic signs; isolated cysts alone are insufficient.','الزاماً خیر. یک لایه همراه تخریب معماری و سایر نشانه‌های فیبروز ممکن است؛ کیست‌های منفرد به‌تنهایی کافی نیستند.')
 }
}

// Balance canonical positions as well as the shuffled practice presentation.
for (const [index, record] of Object.values(HRCT_ARCHITECTURE_CASES).entries()) {
 const target=index%4,order=[0,1,2,3];[order[0],order[target]]=[order[target],order[0]]
 record.options=order.map(i=>record.options[i]);record.wrong=order.map(i=>record.wrong[i]);record.correct=target
}
