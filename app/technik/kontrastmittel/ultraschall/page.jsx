'use client'

import LessonReferenceShell from '@/components/LessonReferenceShell'
import { CONTRAST_QUESTIONS } from '@/data/contrastMedia'
import { useLanguage } from '@/providers/LanguageProvider'

const L = (de, en, fa) => ({ de, en, fa })
const title = L('Ultraschall-Kontrastmittel: Mikrobläschen & CEUS', 'Ultrasound contrast: microbubbles & CEUS', 'ماده حاجب سونوگرافی: میکروحباب‌ها و CEUS')
const goals = [
  L('Mikrobläschen und ihr intravasales Verhalten erklären.', 'Explain microbubbles and their intravascular behaviour.', 'میکروحباب‌ها و رفتار درون‌عروقی آن‌ها را توضیح دهید.'),
  L('CEUS-Signal und typische Einsatzfelder einordnen.', 'Describe the CEUS signal and common applications.', 'سیگنال CEUS و کاربردهای رایج را بشناسید.'),
  L('Zulassung und Sicherheit präparat- und routenspezifisch prüfen.', 'Check authorisation and safety for the specific product and route.', 'مجوز و ایمنی را برای فرآورده و مسیر تجویز مشخص بررسی کنید.'),
]
const check = {
  question: L('Welche Aussage zu intravenösem SonoVue in der EU ist korrekt?', 'Which statement about intravenous SonoVue in the EU is correct?', 'کدام عبارت درباره SonoVue وریدی در اتحادیه اروپا درست است؟'),
  options: [
    L('Es ist bei jeder Leber- oder Nierenläsion zugelassen.', 'It is authorised for every liver or renal lesion.', 'برای هر ضایعهٔ کبد یا کلیه مجاز است.'),
    L('Es soll nur eingesetzt werden, wenn die Untersuchung ohne Kontrast nicht schlüssig ist; zugelassene Anwendungen stehen in der Fachinformation.', 'Use it only when unenhanced imaging is inconclusive; authorised uses are specified in the product information.', 'فقط وقتی بررسی بدون ماده حاجب نتیجه‌بخش نیست استفاده شود؛ کاربردهای مجاز در اطلاعات رسمی فرآورده آمده‌اند.'),
    L('Es verteilt sich nach intravenöser Gabe im Interstitium.', 'After intravenous administration it distributes into the interstitium.', 'پس از تزریق وریدی در فضای بینابینی پخش می‌شود.'),
  ], answer: 1,
  explanation: L('Die EU-Fachinformation nennt konkrete Anwendungen. Die Charakterisierung von Nierenzysten ist dort keine zugelassene IV-Indikation; lokale Zulassung und Off-label-Regeln prüfen.', 'The EU product information lists specific uses. Renal cyst characterisation is not a labelled IV indication there; check local authorisation and off-label rules.', 'اطلاعات رسمی اتحادیه اروپا کاربردهای مشخصی دارد. مشخصه‌یابی کیست کلیه در آن اندیکاسیون وریدیِ دارای مجوز نیست؛ مقررات محلی و off-label را بررسی کنید.'),
}
const summary = [
  L('Intravenöse Mikrobläschen bleiben intravasal und verstärken das Blutpoolsignal.', 'Intravenous microbubbles remain intravascular and enhance the blood-pool signal.', 'میکروحباب‌های وریدی درون عروق می‌مانند و سیگنال خون را تقویت می‌کنند.'),
  L('Indikation und Phasenbeurteilung richten sich nach Fragestellung und Protokoll.', 'Indication and phase assessment depend on the question and protocol.', 'اندیکاسیون و ارزیابی فازها به پرسش بالینی و پروتکل وابسته‌اند.'),
  L('Zulassung und Sicherheit hängen von Präparat und Applikationsweg ab.', 'Authorisation and safety depend on product and route.', 'مجوز و ایمنی به فرآورده و مسیر تجویز وابسته‌اند.'),
]

function BubbleDiagram({ lang }) {
  const labels = lang === 'fa'
    ? { emit: 'پرتو ارسالی: f₀', tissue: 'بافت: عمدتاً خطی، f₀', bubble: 'میکروحباب: غیرخطی، هارمونیک‌ها', mode: 'MI پایین: جداسازی بهتر؛ تخریب کمتر' }
    : lang === 'en'
      ? { emit: 'Transmitted beam: f₀', tissue: 'Tissue: mainly linear, f₀', bubble: 'Microbubble: nonlinear, harmonics', mode: 'Low MI: better separation; less destruction' }
      : { emit: 'Gesendeter Puls: f₀', tissue: 'Gewebe: überwiegend linear, f₀', bubble: 'Mikrobläschen: nichtlinear, Harmonische', mode: 'Niedriger MI: bessere Trennung, weniger Zerstörung' }
  return <figure style={{ margin: '18px 0', padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
    <svg viewBox="0 0 700 240" role="img" aria-label={`${labels.emit}. ${labels.tissue}. ${labels.bubble}. ${labels.mode}.`} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect x="20" y="18" width="660" height="42" rx="12" fill="#d9f1f2" stroke="#16869a" strokeWidth="2"/><text x="350" y="45" textAnchor="middle" fontSize="16" fill="var(--text)">{labels.emit}</text>
      <path d="M350 60v25m-8-9 8 9 8-9M350 85H190v16m0-8-8 8 8 8M350 85h160v16m0-8 8 8-8 8" fill="none" stroke="#16869a" strokeWidth="3"/>
      <rect x="20" y="111" width="330" height="75" rx="12" fill="var(--surface)" stroke="#64748b" strokeWidth="2"/><text x="185" y="139" textAnchor="middle" fontSize="15" fill="var(--text)">{labels.tissue}</text><path d="M102 160h166" stroke="#64748b" strokeWidth="3"/>
      <rect x="370" y="111" width="310" height="75" rx="12" fill="#ecfeff" stroke="#16869a" strokeWidth="2"/><text x="525" y="136" textAnchor="middle" fontSize="15" fill="var(--text)">{labels.bubble}</text><path d="M420 163h40l10-14 12 28 13-24 12 10h63" fill="none" stroke="#b76b1d" strokeWidth="3"/>
      <rect x="20" y="200" width="660" height="30" rx="10" fill="var(--surface-soft)" stroke="#b76b1d" strokeWidth="2"/><text x="350" y="220" textAnchor="middle" fontSize="14" fill="var(--text)">{labels.mode}</text>
    </svg>
    <figcaption style={{ marginTop: 8, color: 'var(--text-muted)', lineHeight: 1.5 }}>{lang === 'fa' ? 'شماتیک مفهومی است، نه تصویر بیمار. پاسخ و تنظیمات دقیق به دستگاه و فرآورده وابسته‌اند.' : lang === 'en' ? 'Conceptual schematic, not a patient image. Exact response and settings depend on the scanner and agent.' : 'Konzeptdiagramm, kein Patientenbild. Antwort und Einstellungen hängen von Gerät und Präparat ab.'}</figcaption>
  </figure>
}

export default function UltrasoundContrastPage() {
  const { lang } = useLanguage()
  const fa = lang === 'fa'; const en = lang === 'en'
  const from = encodeURIComponent('/technik/kontrastmittel/ultraschall')
  const quizHref = `/ueben/quiz?fach=technik&n=10&themen=km-ultraschall&from=${from}${lang === 'de' ? '' : `&lang=${lang}`}`
  const flashcardsHref = `/flashcards/kontrastmittel-ultraschall${lang === 'de' ? '' : `?lang=${lang}`}`
  return <LessonReferenceShell lang={lang} lessonId="kontrastmittel-ultraschall" title={title} diagram="ultrasound" goals={goals} check={check} summary={summary} quizHref={quizHref} flashcardsHref={flashcardsHref} presentationQuestions={CONTRAST_QUESTIONS[lang] || CONTRAST_QUESTIONS.de}>
    <section aria-labelledby="ceus-principle">
      <h3 id="ceus-principle">{fa ? 'از میکروحباب تا سیگنال' : en ? 'From microbubble to signal' : 'Vom Mikrobläschen zum Signal'}</h3>
      <p>{fa ? 'میکروحباب گاز را در پوسته‌ای پایدارکننده محصور می‌کند. طبق PDF اندازهٔ معمول حدود ۱ تا ۱۰ میکرومتر است؛ برای SonoVue اطلاعات EMA میانگین حدود ۲٫۵ میکرومتر را گزارش می‌کند. نوسان غیرخطی حباب مؤلفه‌های هارمونیک می‌سازد. روش‌های اختصاصی کنتراست معمولاً با MI پایین به تفکیک سیگنال حباب از بافت کمک می‌کنند و هم‌زمان تخریب حباب را کاهش می‌دهند؛ پاسخ دقیق به دستگاه و فرآورده وابسته است.' : en ? 'A microbubble encloses gas within a stabilising shell. The PDF gives an approximate size of 1–10 micrometres; EMA reports a mean diameter of about 2.5 micrometres for SonoVue. Nonlinear bubble oscillation produces harmonic components. Contrast-specific modes commonly use low MI to help separate bubble from tissue signals while limiting bubble destruction; the exact response depends on the scanner and agent.' : 'Ein Mikrobläschen schließt Gas in einer stabilisierenden Hülle ein. Die PDF nennt eine ungefähre Größe von 1–10 µm; die EMA gibt für SonoVue einen mittleren Durchmesser von etwa 2,5 µm an. Nichtlineare Blasenschwingungen erzeugen harmonische Signalanteile. Kontrastspezifische Modi arbeiten meist mit niedrigem MI, um Bläschen- und Gewebesignale besser zu trennen und die Bläschenzerstörung zu begrenzen; die genaue Antwort hängt von Gerät und Präparat ab.'}</p>
      <BubbleDiagram lang={lang}/>
      <p>{fa ? 'پس از تزریق وریدی، میکروحباب‌ها عمدتاً داخل عروق می‌مانند و مشاهدهٔ بلادرنگ پرفیوژن را ممکن می‌کنند. گاز SF₆ در SonoVue از راه ریه دفع می‌شود؛ این نکته را به همهٔ فرآورده‌ها و مسیرها تعمیم ندهید.' : en ? 'After intravenous administration, microbubbles remain predominantly intravascular, enabling real-time perfusion assessment. SonoVue’s SF₆ gas is eliminated through the lungs; do not generalise this to every product and route.' : 'Nach intravenöser Gabe bleiben Mikrobläschen überwiegend intravasal und ermöglichen die Echtzeitbeurteilung der Perfusion. Das SF₆ von SonoVue wird über die Lunge eliminiert; dies ist nicht pauschal auf alle Präparate und Applikationswege übertragbar.'}</p>
    </section>
    <section aria-labelledby="ceus-indications">
      <h3 id="ceus-indications">{fa ? 'کاربرد با مجوز یکسان نیست' : en ? 'Clinical use is not the same as authorisation' : 'Anwendung ist nicht gleich Zulassung'}</h3>
      <p>{fa ? 'اطلاعات EMA برای SonoVue که در مارس ۲۰۲۶ بازبینی شده، می‌گوید فقط وقتی بررسی بدون ماده حاجب نتیجه‌بخش نیست استفاده شود. موارد مجاز شامل کدرسازی حفره‌ها و مرزبندی بطن چپ در اکوکاردیوگرافی بزرگسالان؛ Doppler برخی عروق مغزی، کاروتید، محیطی و ورید پورت؛ نمایش عروق ضایعات کبد و پستان؛ و بررسی رفلاکس وزیکویورترال در مسیر ادراری کودکان است. مشخصه‌یابی کیست کلیه یا پرفیوژن میوکارد را بدون بررسی مجوز محلی، تأییدشده فرض نکنید.' : en ? 'The EMA SonoVue information, revised in March 2026, says to use it only when unenhanced imaging is inconclusive. Labelled uses include adult chamber opacification/LV border delineation; Doppler of selected cerebral, carotid, peripheral and portal vessels; Doppler vascularity of liver and breast lesions; and paediatric assessment for vesicoureteral reflux. Do not assume renal cyst characterisation or myocardial perfusion is labelled without checking local authorisation.' : 'Die im März 2026 überarbeitete EMA-Fachinformation für SonoVue verlangt eine nicht schlüssige Untersuchung ohne Kontrastmittel. Zugelassen sind die Darstellung der Herzkammern/Abgrenzung des linken Ventrikels bei Erwachsenen, Doppler bestimmter zerebraler, karotidaler, peripherer und portalvenöser Gefäße, die Darstellung der Vaskularität von Leber- und Brustläsionen sowie die Abklärung des vesikoureteralen Refluxes bei Kindern. Nierenzysten-Charakterisierung oder Myokardperfusion sind ohne Prüfung der lokalen Zulassung nicht als zugelassen vorauszusetzen.'}</p>
    </section>
    <section aria-labelledby="ceus-safety">
      <h3 id="ceus-safety">{fa ? 'ایمنی به فرآورده و مسیر وابسته است' : en ? 'Safety depends on product and route' : 'Sicherheit hängt von Präparat und Applikationsweg ab'}</h3>
      <p>{fa ? 'حساسیت شناخته‌شده به مادهٔ مؤثره یا مواد جانبی SonoVue منع مصرف است. به‌طور جداگانه، برای تزریق وریدی، شانت راست‌به‌چپ، پرفشاری شدید ریوی، پرفشاری سیستمیک کنترل‌نشده و ARDS نیز منع مصرف‌اند. مصرف هم‌زمان با دوبوتامین در بیمارانی که دوبوتامین برایشان ممنوع است نباید انجام شود. ACS اخیر، بیماری ایسکمیک ناپایدار و نارسایی قلبی NYHA III–IV نیازمند ارزیابی دقیق سود و خطر و پایش هستند؛ این‌ها را با منع مصرف مطلق یکی ندانید. نظارت دست‌کم ۳۰ دقیقه پس از تزریق لازم است. در بارداری به‌عنوان اقدام احتیاطی ترجیحاً اجتناب می‌شود؛ شیردهی می‌تواند ۲–۳ ساعت بعد از SonoVue ازسر گرفته شود. مسیر داخل مثانه در کودکان جداگانه است.' : en ? 'Known hypersensitivity to SonoVue’s active substance or excipients is a contraindication. Separately, for intravenous use, right-to-left shunt, severe pulmonary hypertension, uncontrolled systemic hypertension and ARDS are contraindications. Do not combine with dobutamine when dobutamine itself is contraindicated. Recent ACS, unstable ischaemic disease and NYHA III–IV heart failure require careful risk–benefit assessment and monitoring; they are not simply absolute contraindications. Close supervision for at least 30 minutes is required. As a precaution, avoid use during pregnancy where possible; breastfeeding may resume 2–3 hours after SonoVue. Paediatric intravesical administration is a separate route.' : 'Eine bekannte Überempfindlichkeit gegen Wirkstoff oder Hilfsstoffe von SonoVue ist eine Kontraindikation. Davon getrennt sind bei intravenöser Anwendung Rechts-links-Shunt, schwere pulmonale Hypertonie, unkontrollierte systemische Hypertonie und ARDS kontraindiziert. Die Kombination mit Dobutamin darf nicht erfolgen, wenn Dobutamin selbst kontraindiziert ist. Ein kürzliches ACS, instabile ischämische Erkrankung und Herzinsuffizienz NYHA III–IV erfordern sorgfältige Nutzen-Risiko-Abwägung und Überwachung; sie sind nicht pauschal absolute Kontraindikationen. Die Fachinformation verlangt mindestens 30 Minuten engmaschige Überwachung. In der Schwangerschaft soll SonoVue vorsorglich möglichst vermieden werden; Stillen kann 2–3 Stunden danach wieder aufgenommen werden. Die intravesikale Anwendung bei Kindern ist ein separater Applikationsweg.'}</p>
      <p><a href="https://www.ema.europa.eu/en/medicines/human/EPAR/sonovue" target="_blank" rel="noreferrer">{fa ? 'اطلاعات رسمی SonoVue در EMA' : en ? 'EMA SonoVue product information' : 'EMA-Fachinformation zu SonoVue'}</a></p>
      <p><a href="https://efsumb.org/guidelines-recommendations-english-versions/" target="_blank" rel="noreferrer">EFSUMB: Guidelines and recommendations</a></p>
      <p><a href="https://efsumb.org/wp-content/uploads/2021/01/Dietrich-CF-Averkiou-M-Nielsen-MB-How-to-perform-Ultrasound-Int-Open-2018-4-E2-CEUS.pdf" target="_blank" rel="noreferrer">Dietrich et al., How to perform Contrast-Enhanced Ultrasound (CEUS), Ultrasound International Open (2017)</a></p>
      <p>{fa ? 'منبع PDF: Technik.pdf، صفحات ۱۳۳–۱۳۴. این خلاصه جایگزین اطلاعات رسمی، دستورالعمل محلی یا تأیید علمی نهایی نیست.' : en ? 'PDF source: Technik.pdf, pages 133–134. This summary does not replace product information, local guidance or final scientific review.' : 'PDF-Quelle: Technik.pdf, Seiten 133–134. Diese Zusammenfassung ersetzt weder Fachinformation noch lokale Leitlinien oder abschließende wissenschaftliche Prüfung.'}</p>
    </section>
  </LessonReferenceShell>
}
