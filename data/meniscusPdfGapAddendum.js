const L = (de, en, fa) => ({ de, en, fa })

export const MENISCUS_PDF_GAP_ADDENDUM = {
  sourcePages: [49, 52, 54, 55],
  printedPages: [48, 51, 53, 54],
  tearTypes: [
    {
      id: 'parrot-beak',
      sourcePage: 49,
      image: '/msk/knie/meniskus/source-pdf-page-49.jpg',
      imageAlt: L('PDF-Beispiel: sagittale Schichten und Schema eines Parrot-beak-Risses.', 'PDF example: sagittal slices and schematic of a parrot-beak tear.', 'نمونهٔ PDF: برش‌های ساژیتال و شماتیک پارگی منقار طوطی.'),
      printedPage: 48,
      title: L('Parrot-beak-Riss und Wander-Effekt', 'Parrot-beak tear and wandering effect', 'پارگی منقار طوطی و اثر جابه‌جایی'),
      text: L(
        'Der Parrot-beak-Riss kombiniert einen radiären mit einem schräg oder bogenförmig weiterlaufenden longitudinalen Anteil. Er beginnt häufig am freien Meniskusrand. Durch den gekrümmten Verlauf ändert sich auf sagittalen Schichten der Abstand zur Kapsel (Wander-Effekt); beurteile daher den Riss über benachbarte Schichten statt nach einer einzelnen Ebene.',
        'A parrot-beak tear combines a radial component with an oblique or curved longitudinal extension. It often starts at the free meniscal edge. Because the tear curves, its distance from the capsule changes across sagittal slices (the wandering effect); follow it across adjacent slices rather than judging it on one image.',
        'پارگی منقار طوطی ترکیبی از جزء شعاعی و امتداد طولیِ مایل یا قوسی‌شکل است و اغلب از لبهٔ آزاد منیسک آغاز می‌شود. به‌دلیل مسیر خمیده، فاصلهٔ پارگی تا کپسول در برش‌های ساژیتال تغییر می‌کند (اثر جابه‌جایی)؛ بنابراین آن را در برش‌های مجاور دنبال کنید و بر پایهٔ یک تصویر قضاوت نکنید.'
      ),
    },
  ],
  imagingPitfalls: [
    {
      id: 'transverse-ligament', sourcePage: 52, printedPage: 51,
      image: '/msk/knie/meniskus/source-pdf-page-52.jpg',
      imageAlt: L('PDF-MRT-Beispiel des Lig. transversum genus.', 'PDF MRI example of the transverse ligament.', 'نمونهٔ MRI از لیگامان عرضی زانو در PDF.'),
      title: L('Lig. transversum genus als Pseudoriss', 'Transverse ligament as a pseudotear', 'لیگامان عرضی زانو به‌صورت پارگی کاذب'),
      text: L(
        'Das Lig. transversum genus verbindet die Vorderhörner beider Menisken. Sein Ansatz kann auf sagittalen Bildern wie ein Vertikalriss im Vorderhorn des Außenmeniskus wirken. Verfolge die Struktur in axialen Bildern von einer Seite zur anderen, bevor du einen Riss annimmst.',
        'The transverse ligament connects the anterior horns of both menisci. At its attachment, it can mimic a vertical tear in the anterior horn of the lateral meniscus on sagittal images. Trace it from side to side on axial images before diagnosing a tear.',
        'لیگامان عرضی زانو شاخ‌های قدامی دو منیسک را به هم وصل می‌کند. محل اتصال آن در تصاویر ساژیتال ممکن است شبیه پارگی عمودی شاخ قدامی منیسک خارجی باشد. پیش از تشخیص پارگی، مسیر آن را در تصاویر آکسیال از یک سمت تا سمت دیگر دنبال کنید.'
      ),
    },
    {
      id: 'meniscofemoral-ligaments', sourcePage: 52, printedPage: 51,
      image: '/msk/knie/meniskus/source-pdf-page-52-meniscofemoral.jpg',
      imageAlt: L('PDF-Beispiele der Ligamente Humphrey und Wrisberg neben dem HKB.', 'PDF examples of the Humphrey and Wrisberg ligaments around the PCL.', 'نمونه‌های لیگامان‌های هامفری و وریسبرگ در مجاورت PCL از PDF.'),
      title: L('Lig. Humphrey und Wrisberg als Pseudoriss', 'Humphrey and Wrisberg ligaments as pseudotears', 'لیگامان‌های هامفری و وریسبرگ به‌صورت پارگی کاذب'),
      text: L(
        'Die meniskofemoralen Ligamente ziehen vom Hinterhorn des Außenmeniskus zum medialen Femurkondylus. Humphrey verläuft vor, Wrisberg hinter dem HKB. Ein vertikales Signal am Hinterhorn kann einen Außenmeniskusriss vortäuschen. Verfolge das Band über aufeinanderfolgende sagittale Schichten bis zum Femur: Der Pseudoriss verschwindet, wenn sich das Band vom Meniskus abhebt.',
        'The meniscofemoral ligaments run from the posterior horn of the lateral meniscus to the medial femoral condyle. Humphrey passes anterior to the PCL and Wrisberg posterior to it. Vertical signal at the posterior horn may mimic a lateral meniscal tear. Trace the ligament across consecutive sagittal slices to the femur: the pseudotear disappears as the ligament separates from the meniscus.',
        'لیگامان‌های منیسکوفمورال از شاخ خلفی منیسک خارجی تا کندیل داخلی فمور امتداد دارند. هامفری از جلوی PCL و وریسبرگ از پشت آن می‌گذرد. سیگنال عمودی در شاخ خلفی ممکن است پارگی منیسک خارجی را تقلید کند. لیگامان را در برش‌های ساژیتال پی‌درپی تا فمور دنبال کنید؛ با جداشدن لیگامان از منیسک، نمای پارگی کاذب ناپدید می‌شود.'
      ),
    },
    {
      id: 'meniscocapsular-separation', sourcePage: 55, printedPage: 54,
      image: '/msk/knie/meniskus/source-pdf-page-55.jpg',
      imageAlt: L('PDF-Schema und koronales MRT einer meniskokapsulären Separation.', 'PDF schematic and coronal MRI of meniscocapsular separation.', 'شماتیک و MRI کرونال جداشدگی منیسک از کپسول در PDF.'),
      title: L('Meniskokapsuläre Separation', 'Meniscocapsular separation', 'جداشدگی منیسک از کپسول'),
      text: L(
        'Die traumatische Ablösung betrifft meist den meniskokapsulären Übergang am Hinterhorn des Innenmeniskus und tritt häufig zusammen mit einer VKB-Ruptur auf. Achte im MRT auf eine verwaschene Übergangskontur, Unterbrechung der meniskofemoralen oder meniskotibialen Verbindung und ein begleitendes Bone Bruise am posteromedialen Tibiaplateau. Die Zeichen im Zusammenhang beurteilen; ein einzelnes unspezifisches Signal reicht nicht.',
        'Traumatic detachment usually involves the meniscocapsular junction at the posterior horn of the medial meniscus and is often associated with an ACL tear. On MRI, look for an indistinct junction, disruption of the meniscofemoral or meniscotibial attachment, and associated posteromedial tibial plateau bone bruise. Interpret the signs together; an isolated nonspecific signal is insufficient.',
        'این جداشدگی تروماتیک معمولاً محل اتصال منیسک به کپسول را در شاخ خلفی منیسک داخلی درگیر می‌کند و اغلب با پارگی ACL همراه است. در MRI به محوشدن کانتور محل اتصال، گسست اتصال منیسکوفمورال یا منیسکوتیبیال و کوفتگی استخوانی همراه در بخش خلفی‌داخلی پلاتوی تیبیا توجه کنید. نشانه‌ها را در کنار هم تفسیر کنید؛ یک سیگنال غیراختصاصی به‌تنهایی کافی نیست.'
      ),
    },
  ],
  rootTear: {
    id: 'posterior-root-tear', sourcePage: 54, printedPage: 53,
    image: '/msk/knie/meniskus/source-pdf-page-54.jpg',
    imageAlt: L('PDF-MRT-Beispiele der vorderen und hinteren Meniskuswurzeln sowie einer Hinterwurzelruptur.', 'PDF MRI examples of the anterior and posterior meniscal roots and a posterior root tear.', 'نمونه‌های MRI ریشه‌های قدامی و خلفی منیسک و پارگی ریشهٔ خلفی از PDF.'),
    title: L('Hinterwurzelruptur: Kontinuität am Ansatz', 'Posterior root tear: continuity at the insertion', 'پارگی ریشهٔ خلفی: پیوستگی در محل اتصال'),
    text: L(
      'Das sichere direkte MRT-Zeichen ist eine Diskontinuität nahe dem tibialen Insertionspunkt der Wurzel; ein Knochenmarködem am Ansatz kann zusätzlich auftreten. Eine Ruptur der medialen Hinterwurzel kann die Lastverteilung verändern und den tibiofemoralen Kontaktdruck erhöhen. Allaires Kadaverstudie liefert hierfür eine biomechanische Begründung; sie belegt weder klinischen Knorpelschaden noch ein klinisches Arthroserisiko oder dessen Verlauf.',
      'The direct MRI sign is discontinuity close to the tibial root insertion; marrow edema at the insertion may also be present. A medial posterior root tear can alter load distribution and increase tibiofemoral contact pressure. Allaire’s cadaver study provides a biomechanical rationale only; it does not establish clinical cartilage damage, osteoarthritis risk, or its course.',
      'نشانهٔ مستقیم در MRI، گسستگی نزدیک محل اتصال تیبیایی ریشه است؛ ادم مغز استخوان در محل اتصال نیز ممکن است دیده شود. پارگی ریشهٔ خلفی منیسک داخلی می‌تواند توزیع بار را تغییر دهد و فشار تماس تیبیوفمورال را افزایش دهد. مطالعهٔ کاداوریک Allaire فقط توجیه بیومکانیکی فراهم می‌کند و آسیب بالینی غضروف، خطر آرتروز یا سیر بالینی آن را اثبات نمی‌کند.'
    ),
    evidence: 'https://pubmed.ncbi.nlm.nih.gov/18762653/',
  },
}
