import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'
import TearSchematic from './TearSchematic'

const L = (de, en, fa) => ({ de, en, fa })
const labels = [L('Definition & Verlauf', 'Definition & orientation', 'تعریف و مسیر پارگی'), L('MRT-Merkmale', 'MRI findings', 'یافته‌های MRI'), L('Klinische Bedeutung', 'Clinical significance', 'اهمیت بالینی'), L('Im Befund angeben', 'What to report', 'در گزارش ذکر شود')]
const makeItem = (id, label, category, texts) => ({ id, label, category, details: texts.map((text, index) => ({ id: String(index), label: labels[index], text })) })
const items = [
  makeItem('longitudinal', L('Längsriss', 'Longitudinal tear', 'پارگی طولی'), L('Vertikal · parallel zur Peripherie', 'Vertical · parallel to the periphery', 'عمودی · موازی محیط منیسک'), [
    L('Vertikaler Riss entlang der zirkumferenziellen Fasern, häufig im peripheren Meniskusanteil.', 'A vertical split along the circumferential fibres, often in the peripheral meniscus.', 'شکاف عمودی در امتداد الیاف حلقوی، اغلب در بخش محیطی منیسک.'),
    L('Oberflächenreichende Risslinie entlang der Peripherie. Verlauf in mehreren Ebenen prüfen und nach einem dislozierten Fragment suchen.', 'A surface-reaching tear line follows the periphery. Confirm in multiple planes and look for a displaced fragment.', 'خط پارگی با تماس سطحی در امتداد محیط دیده می‌شود. در چند صفحه بررسی کنید و دنبال قطعهٔ جابه‌جا‌شده باشید.'),
    L('Periphere, reparable Risse können für eine Naht geeignet sein. Gefäßzone, Stabilität und Gewebequalität sind entscheidend.', 'Peripheral, repairable tears may be suitable for suturing. Vascular zone, stability and tissue quality matter.', 'پارگی محیطیِ قابل‌ترمیم ممکن است برای بخیه مناسب باشد؛ ناحیهٔ خون‌رسانی، پایداری و کیفیت بافت مهم‌اند.'),
    L('Meniskus, Segment, Risslänge und Dislokation. Ein zentral verlagertes inneres Fragment spricht für die Korbhenkelvariante.', 'Meniscus, segment, tear length and displacement. A centrally displaced inner fragment suggests the bucket-handle variant.', 'منیسک، سگمان، طول و جابه‌جایی پارگی؛ قطعهٔ داخلی جابه‌جا‌شده به مرکز، گونهٔ دسته‌سطلی را مطرح می‌کند.'),
  ]),
  makeItem('radial', L('Radiärriss', 'Radial tear', 'پارگی شعاعی'), L('Vom freien Rand nach außen', 'From the free edge outward', 'از لبهٔ آزاد به سمت محیط'), [
    L('Der Riss durchtrennt zirkumferenzielle Fasern, meist vom freien Innenrand Richtung Peripherie.', 'The tear crosses circumferential fibres, usually from the free inner edge towards the periphery.', 'پارگی الیاف حلقوی را قطع می‌کند و معمولاً از لبهٔ آزاد داخلی به سمت محیط پیش می‌رود.'),
    L('Defekt am freien Rand, verkürzte Meniskusform oder Cleft-/Ghost-Zeichen. In mehreren Ebenen bestätigen.', 'Free-edge defect, meniscal truncation or a cleft/ghost sign. Confirm in multiple planes.', 'نقص لبهٔ آزاد، کوتاه‌شدن نمای منیسک یا علامت Cleft/Ghost؛ در چند صفحه تأیید کنید.'),
    L('Tiefe oder komplette Risse können die Übertragung der Ringspannung stören. Wurzelnahe Risse besonders beachten.', 'Deep or complete tears can impair hoop-stress transmission. Pay particular attention to root-adjacent tears.', 'پارگی عمیق یا کامل می‌تواند انتقال تنش حلقوی را مختل کند؛ به پارگی نزدیک ریشه توجه ویژه کنید.'),
    L('Ausdehnung über die Meniskusbreite, Wurzelbezug und Extrusion. Nicht jeder Radiärriss ist ein Wurzelriss.', 'Extension across the meniscal width, root involvement and extrusion. Not every radial tear is a root tear.', 'وسعت در عرض منیسک، ارتباط با ریشه و اکستروژن؛ هر پارگی شعاعی الزاماً پارگی ریشه نیست.'),
  ]),
  makeItem('horizontal', L('Horizontalriss', 'Horizontal tear', 'پارگی افقی'), L('Parallel zum Tibiaplateau', 'Parallel to the tibial plateau', 'موازی پلاتوی تیبیا'), [
    L('Horizontale Spaltung in ein oberes und ein unteres Blatt; häufig im degenerativen Kontext.', 'Horizontal cleavage into superior and inferior leaflets, often in a degenerative setting.', 'شکاف افقی منیسک را به لایهٔ فوقانی و تحتانی تقسیم می‌کند؛ اغلب زمینهٔ دژنراتیو دارد.'),
    L('Horizontale Signallinie mit Oberflächenkontakt, sagittal oder koronal. Nach einer parameniskalen Zyste suchen.', 'A horizontal surface-reaching signal line on sagittal or coronal images. Look for a parameniscal cyst.', 'خط سیگنال افقی با تماس سطحی در ساژیتال یا کرونال؛ کیست پارامنیسکال همراه را جست‌وجو کنید.'),
    L('Der MRT-Befund allein ist keine OP-Indikation. Symptome, Degeneration und Reparabilität beeinflussen die Therapie.', 'The MRI finding alone is not a surgical indication. Symptoms, degeneration and repairability guide management.', 'یافتهٔ MRI به‌تنهایی اندیکاسیون جراحی نیست؛ علائم، دژنراسیون و قابلیت ترمیم تعیین‌کننده‌اند.'),
    L('Segment, Blattbeteiligung und Zysten. Zusätzlich auf eine Lappenbildung oder Fragmentverlagerung achten.', 'Segment, leaflet involvement and cysts. Also assess flap formation and fragment displacement.', 'سگمان، لایه‌های درگیر و کیست‌ها؛ تشکیل لَپ یا جابه‌جایی قطعه را هم بررسی کنید.'),
  ]),
  makeItem('bucket', L('Korbhenkelriss', 'Bucket-handle tear', 'پارگی دسته‌سطلی'), L('Dislozierter Längsriss', 'Displaced longitudinal tear', 'پارگی طولی جابه‌جا‌شده'), [
    L('Ausgedehnter vertikaler Längsriss mit zentral verlagertem innerem Fragment; dessen Enden bleiben typischerweise angeheftet.', 'An extensive vertical longitudinal tear with a centrally displaced inner fragment, typically attached at its ends.', 'پارگی طولی عمودی وسیع با قطعهٔ داخلی جابه‌جا‌شده به مرکز؛ دو انتهای قطعه معمولاً متصل می‌مانند.'),
    L('Fragment im Interkondylarraum suchen. Doppel-PCL-Zeichen oder fehlendes Bow-tie-Zeichen können die Diagnose unterstützen.', 'Search the intercondylar notch for the fragment. A double-PCL or absent bow-tie sign can support the diagnosis.', 'قطعه را در ناچ بین‌کندیلی جست‌وجو کنید؛ Double-PCL یا فقدان Bow-tie می‌تواند تشخیص را تقویت کند.'),
    L('Ein disloziertes Fragment kann das Knie mechanisch blockieren. Bei blockiertem Knie ist eine dringliche orthopädische Beurteilung nötig.', 'A displaced fragment can mechanically lock the knee. A locked knee needs urgent orthopaedic assessment.', 'قطعهٔ جابه‌جا‌شده می‌تواند زانو را مکانیکی قفل کند؛ زانوی قفل‌شده نیازمند ارزیابی فوری ارتوپدی است.'),
    L('Ursprungsmeniskus, Fragmentlage und Restmeniskus. Korbhenkel bezeichnet eine dislozierte Längsrissvariante, keinen separaten Rissverlauf.', 'Source meniscus, fragment location and residual meniscus. Bucket-handle describes a displaced longitudinal variant, not a separate orientation.', 'منیسک مبدأ، محل قطعه و منیسک باقی‌مانده؛ دسته‌سطلی گونهٔ جابه‌جا‌شدهٔ پارگی طولی است، نه مسیر مستقل.'),
  ]),
  makeItem('flap', L('Lappenriss', 'Flap tear', 'پارگی لَپی'), L('Teilweise angeheftetes Fragment', 'Partly attached fragment', 'قطعه با اتصال باقی‌مانده'), [
    L('Ein schräger oder horizontaler Riss bildet einen teilweise angehefteten Meniskuslappen, der sich verlagern kann.', 'An oblique or horizontal tear creates a partly attached flap that may displace.', 'پارگی مایل یا افقی لَپی با اتصال باقی‌مانده ایجاد می‌کند که ممکن است جابه‌جا شود.'),
    L('Fehlenden Meniskusanteil und verlagertes Fragment suchen, auch in den oberen und unteren Gelenkrecessus.', 'Look for missing meniscal tissue and a displaced fragment, including the superior and inferior joint recesses.', 'بخش مفقود منیسک و قطعهٔ جابه‌جا‌شده را، از جمله در رِسِس‌های فوقانی و تحتانی مفصل، جست‌وجو کنید.'),
    L('Ein instabiler Lappen kann mechanische Beschwerden verursachen. Behandlung nach Symptomen, Gewebequalität und Reparabilität.', 'An unstable flap can cause mechanical symptoms. Management depends on symptoms, tissue quality and repairability.', 'لَپ ناپایدار می‌تواند علائم مکانیکی ایجاد کند؛ درمان به علائم، کیفیت بافت و قابلیت ترمیم بستگی دارد.'),
    L('Größe, Ansatz und Dislokationsrichtung. Neben dem Defekt auch die Lage des Fragments dokumentieren.', 'Size, attachment and displacement direction. Document the fragment location as well as the donor defect.', 'اندازه، محل اتصال و جهت جابه‌جایی؛ علاوه بر نقص مبدأ، محل قطعه را هم ذکر کنید.'),
  ]),
]
const groups = [{ id: 'tear-types', title: L('Merkmale und Definition', 'Features and definition', 'مشخصات و تعریف'), visualPlacement: 'inline', items }]

export default function TearTypeExplorer({ lang }) {
  return <InteractiveTeachingGroups groups={groups} resolve={value => value[lang] || value.de} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderVisual={item => <TearSchematic item={item} lang={lang} />} />
}
