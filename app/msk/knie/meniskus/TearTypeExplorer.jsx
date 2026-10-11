import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'
import TearSchematic from './TearSchematic'

const L = (de, en, fa) => ({ de, en, fa })
const labels = [L('Definition & Verlauf', 'Definition & orientation', 'تعریف و مسیر پارگی'), L('MRT-Merkmale', 'MRI findings', 'یافته‌های MRI'), L('Klinische Bedeutung', 'Clinical significance', 'اهمیت بالینی'), L('Im Befund angeben', 'What to report', 'در گزارش ذکر شود')]
const makeItem = (id, label, category, texts) => ({ id, label, category, details: texts.map((text, index) => text ? ({ id: String(index), label: labels[index], text }) : null).filter(Boolean) })
const items = [
  makeItem('horizontal', L('Horizontalriss', 'Horizontal tear', 'پارگی افقی'), L('Parallel zum Tibiaplateau', 'Parallel to the tibial plateau', 'موازی پلاتوی تیبیا'), [
    L('Lineare Signalsteigerung parallel zur Tibiaebene, die die Oberfläche erreicht.', 'Linear increased signal parallel to the tibial plane, reaching the surface.', 'افزایش سیگنال خطی موازی صفحهٔ تیبیا که به سطح منیسک می‌رسد.'),
    null,
    L(<><p>Sehr häufig.</p><p>Häufig im degenerativen Kontext.</p><p>Der MRT-Befund allein ist keine OP-Indikation.</p></>, <><p>Very common.</p><p>Often in a degenerative setting.</p><p>The MRI finding alone is not a surgical indication.</p></>, <><p>بسیار شایع.</p><p>اغلب در زمینهٔ دژنراتیو.</p><p>یافتهٔ MRI به‌تنهایی اندیکاسیون جراحی نیست.</p></>),
    null,
  ]),
  makeItem('longitudinal', L('Longitudinalriss', 'Longitudinal tear', 'پارگی طولی'), L('Vertikal · parallel zur Peripherie', 'Vertical · parallel to the periphery', 'عمودی · موازی محیط منیسک'), [
    L('Vertikaler Riss parallel zur Meniskusperipherie mit Oberflächenkontakt.', 'A vertical tear parallel to the meniscal periphery, reaching the surface.', 'پارگی عمودی موازی محیط منیسک با تماس سطحی.'),
    null,
    L(<><p>Periphere, reparable Risse können genäht werden.</p><p>Gefäßzone, Stabilität und Gewebequalität sind entscheidend.</p><p>Bei zentraler Fragmentverlagerung: Korbhenkelriss.</p></>, <><p>Peripheral, repairable tears may be sutured.</p><p>Vascular zone, stability and tissue quality matter.</p><p>Central fragment displacement: bucket-handle tear.</p></>, <><p>پارگی محیطیِ قابل‌ترمیم ممکن است برای بخیه مناسب باشد.</p><p>ناحیهٔ خون‌رسانی، پایداری و کیفیت بافت مهم‌اند.</p><p>جابه‌جایی قطعه به مرکز: پارگی دسته‌سطلی.</p></>),
    null,
  ]),
  makeItem('radial', L('Radiärriss', 'Radial tear', 'پارگی شعاعی'), L('Vom freien Rand nach außen', 'From the free edge outward', 'از لبهٔ آزاد به سمت محیط'), [
    L('Riss vom freien Innenrand zur Peripherie, quer zu den zirkumferenziellen Fasern.', 'A tear from the free inner edge towards the periphery, crossing the circumferential fibres.', 'پارگی از لبهٔ آزاد داخلی به سمت محیط، در عرض الیاف حلقوی.'),
    null,
    L(<><p>Tiefe oder komplette Risse können die Ringspannung beeinträchtigen.</p><p>Wurzelnahe Risse besonders beachten.</p></>, <><p>Deep or complete tears can impair hoop-stress transmission.</p><p>Pay particular attention to root-adjacent tears.</p></>, <><p>پارگی عمیق یا کامل می‌تواند انتقال تنش حلقوی را مختل کند.</p><p>به پارگی‌های نزدیک ریشه توجه ویژه کنید.</p></>),
    null,
  ]),
  makeItem('radial-complete', L('Vollständiger Radiärriss', 'Complete radial tear', 'پارگی شعاعی کامل'), L('Durch die gesamte Meniskusbreite', 'Across the full meniscal width', 'در تمام عرض منیسک'), [
    L('Radiärer Riss durch die gesamte Meniskusbreite, vom freien Rand bis zur Peripherie.', 'A radial tear across the full meniscal width, from the free edge to the periphery.', 'پارگی شعاعی در تمام عرض منیسک، از لبهٔ آزاد تا محیط.'),
    null,
    L(<><p>Ringspannung und Lastverteilung sind erheblich beeinträchtigt.</p><p>Eine Meniskusextrusion kann hinzukommen.</p></>, <><p>Hoop-stress transmission and load distribution are substantially impaired.</p><p>Meniscal extrusion may coexist.</p></>, <><p>انتقال تنش حلقوی و توزیع بار به‌شدت مختل می‌شوند.</p><p>اکستروژن منیسک ممکن است همراه باشد.</p></>),
    null,
  ]),
  makeItem('flap', L('Parrot-beak-tear (Lappenriss)', 'Parrot-beak tear (flap tear)', 'پارگی لَپی'), L('Teilweise angeheftetes Fragment', 'Partly attached fragment', 'قطعه با اتصال باقی‌مانده'), [
    L('Ein schräger Radiärriss bildet einen spitzen, teilweise angehefteten Lappen am freien Rand.', 'An oblique radial tear creates a pointed, partly attached flap at the free edge.', 'پارگی شعاعی مایل، لَپی نوک‌تیز با اتصال باقی‌مانده در لبهٔ آزاد ایجاد می‌کند.'),
    L('Fehlenden Meniskusanteil und verlagertes Fragment suchen, auch in den oberen und unteren Gelenkrecessus.', 'Look for missing meniscal tissue and a displaced fragment, including the superior and inferior joint recesses.', 'بخش مفقود منیسک و قطعهٔ جابه‌جا‌شده را، از جمله در رِسِس‌های فوقانی و تحتانی مفصل، جست‌وجو کنید.'),
    L('Ein instabiler Lappen kann mechanische Beschwerden verursachen. Behandlung nach Symptomen, Gewebequalität und Reparabilität.', 'An unstable flap can cause mechanical symptoms. Management depends on symptoms, tissue quality and repairability.', 'لَپ ناپایدار می‌تواند علائم مکانیکی ایجاد کند؛ درمان به علائم، کیفیت بافت و قابلیت ترمیم بستگی دارد.'),
    L('Größe, Ansatz und Dislokationsrichtung. Neben dem Defekt auch die Lage des Fragments dokumentieren.', 'Size, attachment and displacement direction. Document the fragment location as well as the donor defect.', 'اندازه، محل اتصال و جهت جابه‌جایی؛ علاوه بر نقص مبدأ، محل قطعه را هم ذکر کنید.'),
  ]),
  makeItem('bucket', L('Korbhenkelriss (Bucket-handle tear)', 'Bucket-handle tear', 'پارگی دسته‌سطلی'), L('Dislozierter Längsriss', 'Displaced longitudinal tear', 'پارگی طولی جابه‌جا‌شده'), [
    L('Ausgedehnter vertikaler Längsriss mit zentral verlagertem innerem Fragment; dessen Enden bleiben typischerweise angeheftet.', 'An extensive vertical longitudinal tear with a centrally displaced inner fragment, typically attached at its ends.', 'پارگی طولی عمودی وسیع با قطعهٔ داخلی جابه‌جا‌شده به مرکز؛ دو انتهای قطعه معمولاً متصل می‌مانند.'),
    L('Fragment im Interkondylarraum suchen. Doppel-PCL-Zeichen oder fehlendes Bow-tie-Zeichen können die Diagnose unterstützen.', 'Search the intercondylar notch for the fragment. A double-PCL or absent bow-tie sign can support the diagnosis.', 'قطعه را در ناچ بین‌کندیلی جست‌وجو کنید؛ Double-PCL یا فقدان Bow-tie می‌تواند تشخیص را تقویت کند.'),
    L('Ein disloziertes Fragment kann das Knie mechanisch blockieren. Bei blockiertem Knie ist eine dringliche orthopädische Beurteilung nötig.', 'A displaced fragment can mechanically lock the knee. A locked knee needs urgent orthopaedic assessment.', 'قطعهٔ جابه‌جا‌شده می‌تواند زانو را مکانیکی قفل کند؛ زانوی قفل‌شده نیازمند ارزیابی فوری ارتوپدی است.'),
    L('Ursprungsmeniskus, Fragmentlage und Restmeniskus. Korbhenkel bezeichnet eine dislozierte Längsrissvariante, keinen separaten Rissverlauf.', 'Source meniscus, fragment location and residual meniscus. Bucket-handle describes a displaced longitudinal variant, not a separate orientation.', 'منیسک مبدأ، محل قطعه و منیسک باقی‌مانده؛ دسته‌سطلی گونهٔ جابه‌جا‌شدهٔ پارگی طولی است، نه مسیر مستقل.'),
  ]),
  makeItem('flipped', L('Der Flipped Meniscus', 'Flipped meniscus', 'منیسک برگشته'), L('Umgeschlagenes, disloziertes Fragment', 'Flipped displaced fragment', 'قطعهٔ برگشته و جابه‌جا‌شده'), [
    L('Ein Meniskusfragment klappt nach vorne oder hinten um, häufig bei einem Korbhenkelriss. Es handelt sich um eine Verlagerungsform.', 'A meniscal fragment flips anteriorly or posteriorly, often with a bucket-handle tear. This describes displacement.', 'قطعهٔ منیسک به جلو یا عقب برمی‌گردد، اغلب در پارگی دسته‌سطلی؛ این اصطلاح شکل جابه‌جایی را توصیف می‌کند.'),
    L('Nach vorne verlagertes Hinterhornfragment neben dem Vorderhorn: Double-Anterior-Horn-Zeichen. Das Ursprungshorn ist verkleinert oder fehlt.', 'An anteriorly flipped posterior-horn fragment adjacent to the anterior horn produces a double-anterior-horn sign. The donor horn is reduced or absent.', 'قطعهٔ شاخ خلفی در کنار شاخ قدامی، علامت Double anterior horn ایجاد می‌کند؛ شاخ مبدأ کوچک یا غایب است.'),
    L('Das Fragment kann mechanische Beschwerden oder eine Blockade verursachen. Bei blockiertem Knie dringlich orthopädisch beurteilen.', 'The fragment can cause mechanical symptoms or locking. A locked knee requires urgent orthopaedic assessment.', 'قطعه ممکن است علائم مکانیکی یا قفل‌شدن ایجاد کند؛ زانوی قفل‌شده نیازمند ارزیابی فوری ارتوپدی است.'),
    L('Ursprungsmeniskus, fehlendes Gewebe, Fragmentlage und Verlagerungsrichtung dokumentieren; sagittal und koronal abgleichen.', 'Document the source meniscus, donor defect, fragment position and displacement direction; correlate sagittal and coronal images.', 'منیسک مبدأ، نقص بافت، محل قطعه و جهت جابه‌جایی را ذکر و نماهای ساژیتال و کرونال را تطبیق دهید.'),
  ]),
]
const groups = [{ id: 'tear-types', title: L('Merkmale und Definition', 'Features and definition', 'مشخصات و تعریف'), visualPlacement: 'inline', items }]

export default function TearTypeExplorer({ lang }) {
  return <InteractiveTeachingGroups groups={groups} resolve={value => value[lang] || value.de} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderVisual={item => <TearSchematic item={item} lang={lang} />} />
}
