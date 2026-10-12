import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'
import TearSchematic from './TearSchematic'

const L = (de, en, fa) => ({ de, en, fa })
const labels = [L('Definition & Verlauf', 'Definition & orientation', 'تعریف و مسیر پارگی'), L('MRT-Merkmale', 'MRI findings', 'یافته‌های MRI'), L('Klinische Bedeutung', 'Clinical significance', 'اهمیت بالینی'), L('Im Befund angeben', 'What to report', 'در گزارش ذکر شود')]
const makeItem = (id, label, category, texts, detailLabels = labels) => ({ id, label, category, details: texts.map((text, index) => text ? ({ id: String(index), label: detailLabels[index], text }) : null).filter(Boolean) })
const items = [
  makeItem('horizontal', L('Horizontalriss', 'Horizontal tear', 'پارگی افقی'), L('Parallel zum Tibiaplateau', 'Parallel to the tibial plateau', 'موازی پلاتوی تیبیا'), [
    L('Lineare Signalsteigerung parallel zur Tibiaebene, die die Oberfläche erreicht.', 'Linear increased signal parallel to the tibial plane, reaching the surface.', 'افزایش سیگنال خطی موازی صفحهٔ تیبیا که به سطح منیسک می‌رسد.'),
    null,
    L(<><p>Sehr häufig.</p><p>Häufig im degenerativen Kontext.</p><p>Der MRT-Befund allein ist keine OP-Indikation.</p></>, <><p>Very common.</p><p>Often in a degenerative setting.</p><p>The MRI finding alone is not a surgical indication.</p></>, <><p>بسیار شایع.</p><p>اغلب در زمینهٔ دژنراتیو.</p><p>یافتهٔ MRI به‌تنهایی اندیکاسیون جراحی نیست.</p></>),
    null,
  ]),
  makeItem('longitudinal', L('Longitudinalriss', 'Longitudinal tear', 'پارگی طولی'), L('Vertikal · parallel zur Peripherie', 'Vertical · parallel to the periphery', 'عمودی · موازی محیط منیسک'), [
    L('Vertikaler Riss parallel zur Meniskusperipherie.', 'A vertical tear parallel to the meniscal periphery.', 'پارگی عمودی موازی محیط منیسک.'),
    L(<><p>Longitudinal verlaufender Riss im Hinterhorn des Außenmeniskus.</p><p>An der Ansatzstelle des Ligamentum Wrisberg (Ligamentum meniscofemorale posterius).</p><p>Oft mit einer VKB-Ruptur kombiniert.</p></>, <><p>A longitudinal tear in the posterior horn of the lateral meniscus.</p><p>At the attachment of the ligament of Wrisberg (posterior meniscofemoral ligament).</p><p>Often associated with an ACL rupture.</p></>, <><p>پارگی طولی در شاخ خلفی منیسک خارجی.</p><p>در محل اتصال لیگامان ریسبرگ (لیگامان منیسکوفمورال خلفی).</p><p>اغلب همراه با پارگی رباط صلیبی قدامی (ACL).</p></>),
    null,
    null,
  ], [labels[0], L('Wrisberg-Rip', 'Wrisberg rip', 'پارگی ریسبرگ (Wrisberg-Rip)')]),
  makeItem('radial', L('Radiärriss', 'Radial tear', 'پارگی شعاعی'), L('Vom freien Rand nach außen', 'From the free edge outward', 'از لبهٔ آزاد به سمت محیط'), [
    L('Riss vom freien Innenrand zur Peripherie, quer zu den zirkumferenziellen Fasern.', 'A tear from the free inner edge towards the periphery, crossing the circumferential fibres.', 'پارگی از لبهٔ آزاد داخلی به سمت محیط، در عرض الیاف حلقوی.'),
    L('Spaltförmiger, flüssigkeitssignalreicher Defekt im Meniskus.', 'A cleft-like, fluid-signal defect in the meniscus.', 'نقص شکاف‌مانند با سیگنال مایع در منیسک.'),
    null,
    null,
  ], [labels[0], L('Cleft sign', 'Cleft sign', 'علامت شکاف (Cleft sign)')]),
  makeItem('radial-complete', L('Vollständiger Radiärriss', 'Complete radial tear', 'پارگی شعاعی کامل'), L('Durch die gesamte Meniskusbreite', 'Across the full meniscal width', 'در تمام عرض منیسک'), [
    L(<><p>Radiärer Riss durch die gesamte Meniskusbreite, vom freien Rand bis zur Peripherie.</p><p>Meist traumatisch, besonders bei jüngeren Patienten.</p></>, <><p>A radial tear across the full meniscal width, from the free edge to the periphery.</p><p>Usually traumatic, particularly in younger patients.</p></>, <><p>پارگی شعاعی در تمام عرض منیسک، از لبهٔ آزاد تا محیط.</p><p>اغلب تروماتیک، به‌ویژه در بیماران جوان‌تر.</p></>),
    L('Der Meniskus ist im Rissniveau auf einer oder mehreren Schichten nicht mehr erkennbar.', 'The meniscus is no longer visible at the tear level on one or more slices.', 'منیسک در محل پارگی در یک یا چند برش دیگر قابل مشاهده نیست.'),
    L(<><p>Ringspannung und Lastverteilung sind erheblich beeinträchtigt.</p><p>Eine Meniskusextrusion kann hinzukommen.</p></>, <><p>Hoop-stress transmission and load distribution are substantially impaired.</p><p>Meniscal extrusion may coexist.</p></>, <><p>انتقال تنش حلقوی و توزیع بار به‌شدت مختل می‌شوند.</p><p>اکستروژن منیسک ممکن است همراه باشد.</p></>),
    null,
  ], [labels[0], L('Ghost sign', 'Ghost sign', 'علامت شبح (Ghost sign)'), labels[2]]),
  makeItem('flap', L('Parrot-beak-tear (Lappenriss)', 'Parrot-beak tear (flap tear)', 'پارگی لَپی'), L('Gebogener Rissverlauf', 'Curved tear course', 'مسیر خمیدهٔ پارگی'), [
    L(<><p>Mischform aus einem radiären und einem longitudinalen Rissverlauf.</p><p>Der Riss beginnt meist an der freien Innenkante des Meniskus und geht in einen schrägen oder bogenförmigen longitudinalen Verlauf über.</p><p>Der gebogene Einriss bildet einen spitzen Lappen – ähnlich einem Papageienschnabel.</p></>, <><p>A combination of radial and longitudinal tear components.</p><p>The tear usually starts at the free inner edge of the meniscus and curves into an oblique or arcuate longitudinal course.</p><p>The curved tear creates a pointed flap resembling a parrot's beak.</p></>, <><p>ترکیبی از مسیر پارگی شعاعی و طولی.</p><p>پارگی معمولاً از لبهٔ آزاد داخلی منیسک شروع می‌شود و سپس به مسیری مایل یا قوسی در امتداد طولی تغییر جهت می‌دهد.</p><p>این مسیر خمیده یک لَپ نوک‌تیز، شبیه منقار طوطی، ایجاد می‌کند.</p></>),
    L('Auf aufeinanderfolgenden sagittalen Schichten verändert sich der Abstand der Risslinie zur Kapsel aufgrund des gebogenen Verlaufs.', 'On consecutive sagittal slices, the distance between the tear line and the capsule changes because of the curved course.', 'به‌دلیل مسیر خمیدهٔ پارگی، فاصلهٔ خط پارگی تا کپسول در برش‌های ساژیتال متوالی تغییر می‌کند.'),
    null,
    null,
  ], [labels[0], L('Wander-Effekt', 'Marching cleft sign', 'اثر جابه‌جایی شکاف (Marching cleft sign)')]),
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
