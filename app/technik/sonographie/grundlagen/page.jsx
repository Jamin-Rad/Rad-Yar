'use client'

import Link from 'next/link'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { TECHNIK_SONOGRAPHIE } from '@/data/technikSonographieLesson'

const p = (value, lang) => value?.[lang] || value?.de || ''

function WaveDiagram({ lang }) {
  const text = lang === 'fa'
    ? ['پروب', 'بازتاب', 'پروب عمق را از زمان بازگشت برآورد می‌کند']
    : lang === 'en'
      ? ['Transducer', 'Reflector', 'Return time helps estimate depth']
      : ['Schallkopf', 'Grenzfläche', 'Aus der Laufzeit wird Tiefe abgeleitet']
  return <figure style={{ margin: '16px 0', padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
    <svg viewBox="0 0 720 180" role="img" aria-label={text.join('. ')} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect x="28" y="25" width="86" height="48" rx="12" fill="#d9f1f2" stroke="#16869a" strokeWidth="3" />
      <path d="M114 49h185m-12-10 12 10-12 10" fill="none" stroke="#138a91" strokeWidth="4" />
      <path d="M300 49v70m-9-12 9 12 9-12" fill="none" stroke="#b76b1d" strokeWidth="4" />
      <path d="M300 119h-185m12-10-12 10 12 10" fill="none" stroke="#46566b" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M290 122h20" stroke="#b76b1d" strokeWidth="7" />
      <text x="71" y="103" textAnchor="middle" fontSize="15" fill="var(--text)">{text[0]}</text>
      <text x="300" y="151" textAnchor="middle" fontSize="15" fill="var(--text)">{text[1]}</text>
      <foreignObject x="370" y="42" width="320" height="82"><div xmlns="http://www.w3.org/1999/xhtml" style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.5 }}>{text[2]}</div></foreignObject>
    </svg>
    <figcaption style={{ marginTop: 8, color: 'var(--text-muted)', lineHeight: 1.5 }}>{lang === 'fa' ? 'طرح ساده‌شده: رفت‌وبرگشت پژواک، نه بازسازی کامل اسکن خطی پروب.' : lang === 'en' ? 'Simplified illustration of an echo round trip, not a complete scan-line reconstruction.' : 'Vereinfachte Darstellung des Echo-Laufwegs, keine vollständige Rekonstruktion einer Scanlinie.'}</figcaption>
  </figure>
}

function ArtifactDiagram({ lang }) {
  const labels = lang === 'fa'
    ? ['کیست', 'تقویت خلفی', 'سنگ', 'سایهٔ صوتی']
    : lang === 'en'
      ? ['Cyst', 'Posterior enhancement', 'Stone', 'Acoustic shadow']
      : ['Zyste', 'Dorsale Verstärkung', 'Stein', 'Schallschatten']
  return <figure style={{ margin: '16px 0', padding: 16, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface-soft)' }}>
    <svg viewBox="0 0 680 210" role="img" aria-label={labels.join('. ')} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <path d="M80 35h520M80 55h520M80 75h520M80 95h520" stroke="#b7c7d1" strokeWidth="2" />
      <ellipse cx="210" cy="82" rx="42" ry="28" fill="#dff7fa" stroke="#16869a" strokeWidth="3" />
      <path d="M174 111h72l25 70h-122z" fill="#f5d88a" opacity=".55" />
      <circle cx="460" cy="82" r="18" fill="#66727d" stroke="#2b3945" strokeWidth="3" />
      <path d="M442 102h36l42 79h-120z" fill="#243447" opacity=".78" />
      <text x="210" y="202" textAnchor="middle" fontSize="15" fill="var(--text)">{labels[0]} · {labels[1]}</text>
      <text x="460" y="202" textAnchor="middle" fontSize="15" fill="var(--text)">{labels[2]} · {labels[3]}</text>
    </svg>
    <figcaption style={{ marginTop: 8, color: 'var(--text-muted)', lineHeight: 1.5 }}>{lang === 'fa' ? 'پشت مایع تضعیف کمتر و پژواک روشن‌تر دیده می‌شود؛ پشت سنگ تضعیف شدید، سایه می‌سازد.' : lang === 'en' ? 'Less attenuation behind fluid can appear brighter; strong attenuation behind a stone creates shadowing.' : 'Hinter Flüssigkeit kann wegen geringerer Dämpfung eine Aufhellung entstehen; starke Dämpfung hinter einem Stein erzeugt Schallschatten.'}</figcaption>
  </figure>
}

export default function SonographieGrundlagenPage() {
  const { lang } = useLanguage()
  const fa = lang === 'fa'
  return <LessonReferenceShell
    lang={lang}
    lessonId={TECHNIK_SONOGRAPHIE.id}
    title={TECHNIK_SONOGRAPHIE.title}
    diagram="ultrasound"
    goals={TECHNIK_SONOGRAPHIE.goals}
    check={TECHNIK_SONOGRAPHIE.check}
    summary={TECHNIK_SONOGRAPHIE.summary}
  >
    <section aria-labelledby="sono-echo">
      <h3 id="sono-echo">{fa ? 'از پالس تا تصویر B-mode' : lang === 'en' ? 'From pulse to B-mode image' : 'Vom Puls zum B-Bild'}</h3>
      <p>{fa ? 'عنصر پیزوالکتریک در پروب، پالس الکتریکی را به موج صوتی و پژواک را دوباره به سیگنال الکتریکی تبدیل می‌کند. دستگاه از زمان رفت‌وبرگشت برای تخمین عمق بازتابنده استفاده می‌کند؛ شدت و ویژگی پژواک در روشنایی تصویر نقش دارد.' : lang === 'en' ? 'Piezoelectric elements in the transducer convert an electrical pulse into sound and returning echoes back into electrical signals. The system uses round-trip time to estimate reflector depth; echo strength and properties contribute to image brightness.' : 'Piezoelektrische Elemente im Schallkopf wandeln elektrische Pulse in Schall und Echos zurück in elektrische Signale um. Aus der Laufzeit schätzt das Gerät die Tiefe der reflektierenden Struktur; Echoamplitude und -eigenschaften tragen zur Bildhelligkeit bei.'}</p>
      <WaveDiagram lang={lang} />
      <p>{fa ? 'بازتاب در مرزهای با اختلاف امپدانس آکوستیک رخ می‌دهد. بازتاب قوی، مثلاً از دیافراگم، می‌تواند آرتیفکت آینه‌ای بسازد و ساختار را در جای کاذب تکرار کند. پراکندگی از ساختارهای کوچک‌تر، بافت دانه‌دانهٔ speckle را می‌سازد؛ شکست می‌تواند جابه‌جایی یا آرتیفکت لبه‌ای ایجاد کند.' : lang === 'en' ? 'Reflection occurs at boundaries with differing acoustic impedance. A strong reflector, such as the diaphragm, can create a mirror artifact that duplicates a structure in a false location. Scattering from small structures contributes to speckle texture; refraction can produce displacement or edge artifacts.' : 'Reflexion entsteht an Grenzflächen mit unterschiedlicher akustischer Impedanz. Ein starker Reflektor wie das Zwerchfell kann ein Spiegelartefakt erzeugen, das eine Struktur an falscher Stelle verdoppelt. Streuung an kleinen Strukturen trägt zur Speckle-Textur bei; Brechung kann zu Verschiebungen oder Randschatten führen.'}</p>
    </section>
    <section aria-labelledby="sono-artifacts">
      <h3 id="sono-artifacts">{fa ? 'آرتیفکت را با انتشار صوت توضیح دهید' : lang === 'en' ? 'Explain artifacts through sound propagation' : 'Artefakte aus der Schallausbreitung ableiten'}</h3>
      <p>{fa ? 'مایع ساده معمولاً پژواک داخلی کمی دارد و پشت آن تقویت نسبی دیده می‌شود. تضعیف شدید پشت سنگ یا کلسیفیکاسیون سایه می‌سازد؛ شکست در لبهٔ ساختار گرد می‌تواند سایهٔ لبه‌ای بدهد. بازتاب تکراری میان مرزهای قوی خطوط موازی reverberation می‌سازد؛ اثر ضخامت برش ممکن است مادهٔ خارج از صفحه را وارد تصویر کند و شبیه لجن کیسهٔ صفرا شود. آرتیفکت را با تغییر صفحه، زاویه یا موقعیت پروب بیازمایید.' : lang === 'en' ? 'Simple fluid usually has few internal echoes and may show relative posterior enhancement. Strong attenuation behind a stone or calcification creates shadowing; refraction at a curved boundary can create edge shadowing. Repeated echoes between strong interfaces create reverberation lines; slice-thickness artifact can include out-of-plane material and mimic gallbladder sludge. Test an apparent artifact by changing the plane, angle or probe position.' : 'Einfache Flüssigkeit enthält meist wenige Binnenechos; dahinter kann eine relative dorsale Schallverstärkung auftreten. Starke Dämpfung hinter Stein oder Verkalkung erzeugt Schallschatten; Brechung an einer gekrümmten Grenzfläche kann Randschatten erzeugen. Mehrfachechos zwischen stark reflektierenden Grenzflächen bilden Reverberationslinien; ein Schichtdickenartefakt kann Material außerhalb der Bildebene einbeziehen und Gallenblasenschlamm vortäuschen. Prüfen Sie einen scheinbaren Befund durch Wechsel von Ebene, Winkel oder Schallkopfposition.'}</p>
      <ArtifactDiagram lang={lang} />
    </section>
    <section aria-labelledby="sono-doppler">
      <h3 id="sono-doppler">{fa ? 'داپلر چه چیزی می‌سنجد؟' : lang === 'en' ? 'What does Doppler measure?' : 'Was misst Doppler?'}</h3>
      <p>{fa ? 'سلول‌های خون متحرک بازتابنده‌اند. جابه‌جایی فرکانس با سرعت و زاویهٔ بین پرتو و حرکت ارتباط دارد؛ نزدیک ۹۰ درجه مؤلفهٔ قابل‌اندازه‌گیری می‌تواند بسیار کوچک شود. PDF زاویهٔ ۳۰ تا ۶۰ درجه را پیشنهاد می‌کند؛ این بازه را با پروتکل و روش اندازه‌گیری سرعت تطبیق دهید و آن را قاعده‌ای مستقل از دستگاه تلقی نکنید.' : lang === 'en' ? 'Moving blood cells act as reflectors. Frequency shift depends on velocity and the angle between beam and motion; near 90 degrees the measurable component can become very small. The PDF suggests 30–60 degrees; follow the applicable protocol and velocity-measurement method rather than treating this as a device-independent rule.' : 'Bewegte Blutzellen wirken als Reflektoren. Die Frequenzverschiebung hängt von Geschwindigkeit und Winkel zwischen Schallstrahl und Bewegung ab; nahe 90° kann die messbare Komponente sehr klein werden. Das PDF empfiehlt 30–60°; richten Sie sich nach dem jeweiligen Protokoll und Messverfahren, statt den Bereich als geräteunabhängige Regel zu behandeln.'}</p>
      <p>{fa ? 'در داپلر رنگی، رنگ‌ها جهت جریان را نسبت به پروب نشان می‌دهند، اما انتخاب نقشهٔ رنگ قابل تغییر است؛ قرمز و آبی به‌خودی‌خود شریان و ورید را مشخص نمی‌کنند. Duplex تصویر خاکستری B-mode را با اطلاعات داپلر هم‌زمان می‌کند.' : lang === 'en' ? 'In color Doppler, colors encode flow direction relative to the transducer, but the color map is configurable; red and blue do not by themselves identify arteries and veins. Duplex combines grayscale B-mode anatomy with Doppler information.' : 'Im Farbdoppler kodieren die Farben die Flussrichtung relativ zum Schallkopf; die Farbkarte ist jedoch einstellbar. Rot und Blau kennzeichnen für sich genommen keine Arterie oder Vene. Duplex kombiniert die Graustufenanatomie des B-Bilds mit Doppler-Information.'}</p>
      <aside role="note"><strong>{fa ? 'منبع و دامنه' : lang === 'en' ? 'Source and scope' : 'Quelle und Umfang'}</strong><p>{p(TECHNIK_SONOGRAPHIE.source, lang)}</p><p><a href="https://efsumb.org/wp-content/uploads/2023/07/ECB2nd_Chapter_KNOBOLOGY_FULL.pdf" target="_blank" rel="noreferrer">EFSUMB European Course Book, Knobology (2020)</a> · <a href="https://www.aium.org/docs/default-source/resources/guidelines/headneck.pdf?Status=Master&amp;sfvrsn=1a8358f0_1" target="_blank" rel="noreferrer">AIUM Practice Parameter (2013)</a> · <Link href="/technik/kontrastmittel/roentgen">{fa ? 'درس مادهٔ حاجب' : lang === 'en' ? 'Contrast media lessons' : 'Kontrastmittel-Lektionen'}</Link></p></aside>
    </section>
  </LessonReferenceShell>
}
