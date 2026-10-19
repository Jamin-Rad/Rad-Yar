const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_SONOGRAPHIE = {
  id: 'sonographie-physikalische-grundlagen',
  title: L('Wie Echo, Artefakte und Doppler entstehen', 'How echoes, artifacts and Doppler arise', 'پژواک، آرتیفکت و داپلر چگونه شکل می‌گیرند'),
  goals: [
    L('Echo und Laufzeit mit der Entstehung des B-Bilds verbinden.', 'Connect echoes and return time to B-mode image formation.', 'رابطهٔ پژواک و زمان بازگشت را با تشکیل تصویر B-mode توضیح دهید.'),
    L('Häufige Artefakte als Folge der Schallausbreitung erkennen und einordnen.', 'Recognize common artifacts as consequences of sound propagation.', 'آرتیفکت‌های رایج را به‌عنوان پیامد انتشار صوت بشناسید و تفسیر کنید.'),
    L('Doppler-Winkel und Farbkodierung korrekt einordnen.', 'Interpret the Doppler angle and color encoding correctly.', 'زاویهٔ داپلر و کدگذاری رنگی را درست تفسیر کنید.'),
  ],
  check: {
    question: L('Ein Gefäß verläuft nahezu senkrecht zum Ultraschallstrahl. Was folgt daraus für das Dopplersignal?', 'A vessel runs nearly perpendicular to the ultrasound beam. What follows for the Doppler signal?', 'رگ تقریباً عمود بر پرتو فراصوت قرار دارد. پیامد آن برای سیگنال داپلر چیست؟'),
    options: [
      L('Die gemessene Doppler-Verschiebung kann sehr klein sein, obwohl Blut fließt.', 'The measured Doppler shift can be very small even when blood is flowing.', 'با وجود جریان خون، جابه‌جایی فرکانس داپلر می‌تواند بسیار کم باشد.'),
      L('Das Farbsignal zeigt dann zwingend venösen Fluss.', 'The color signal then necessarily indicates venous flow.', 'در این حالت سیگنال رنگی الزاماً جریان وریدی را نشان می‌دهد.'),
      L('Der Winkel beeinflusst nur das B-Bild, nicht den Doppler.', 'The angle affects only B-mode, not Doppler.', 'زاویه فقط بر B-mode اثر می‌گذارد و به داپلر ربطی ندارد.'),
    ],
    answer: 0,
    explanation: L('Die Doppler-Verschiebung hängt vom Kosinus des Winkels zwischen Strahl und Bewegung ab. Bei 90° ist dieser Anteil null; die Farbrichtung sagt außerdem nicht, ob ein Gefäß Arterie oder Vene ist.', 'The Doppler shift depends on the cosine of the angle between beam and motion. At 90° that component is zero; color direction also does not identify a vessel as an artery or vein.', 'جابه‌جایی داپلر به کسینوس زاویهٔ پرتو و حرکت وابسته است. در ۹۰ درجه این مؤلفه صفر می‌شود؛ جهت رنگ نیز شریانی یا وریدی بودن رگ را مشخص نمی‌کند.'),
    diagramCaption: L('شماتیک آموزشی، نه تصویر بیمار.', 'Teaching schematic, not a patient image.', 'شماتیک آموزشی است، نه تصویر بیمار.'),
  },
  summary: [
    L('Der Schallkopf sendet Pulse und empfängt Echos; Laufzeit ordnet die Tiefe zu.', 'The transducer sends pulses and receives echoes; return time informs depth.', 'پروب پالس می‌فرستد و پژواک می‌گیرد؛ زمان بازگشت به تعیین عمق کمک می‌کند.'),
    L('Artefakte folgen aus Reflexion, Streuung, Brechung und Dämpfung; sie können nützen oder täuschen.', 'Artifacts arise from reflection, scattering, refraction and attenuation; they can help or mislead.', 'آرتیفکت‌ها از بازتاب، پراکندگی، شکست و تضعیف پدید می‌آیند و می‌توانند مفید یا گمراه‌کننده باشند.'),
    L('Doppler misst Bewegung relativ zum Schallstrahl; nahe 90° kann das Signal stark abnehmen.', 'Doppler measures motion relative to the beam; near 90° the signal can markedly decrease.', 'داپلر حرکت را نسبت به پرتو می‌سنجد؛ نزدیک ۹۰ درجه سیگنال می‌تواند بسیار افت کند.'),
  ],
  source: L(
    'Technik.pdf, PDF-Seiten 132–133. Seite 134 und der Abschnitt zu Ultraschallkontrastmitteln auf S. 133 liegen außerhalb dieser Lektion. Die Winkelbeziehung wurde mit dem EFSUMB European Course Book, 2. Auflage, Kapitel „Knobology“ (2020), gegengeprüft; der AIUM Practice Parameter für Kopf-Hals-Sonographie (2013; abgerufen am 19.10.2026) stützt hier nur den allgemeinen Optimierungskontext.',
    'Technik.pdf, PDF pages 132–133. Page 134 and the ultrasound-contrast subsection on p.133 are outside this lesson. The angle relationship was cross-checked against the EFSUMB European Course Book, 2nd ed., “Knobology” chapter (2020); the AIUM Practice Parameter for Head and Neck Ultrasound (2013; retrieved 2026-10-19) supports only the general optimization context here.',
    'Technik.pdf، صفحه‌های ۱۳۲–۱۳۳. صفحهٔ ۱۳۴ و بخش مادهٔ حاجب سونوگرافی در صفحهٔ ۱۳۳ خارج از این درس‌اند. رابطهٔ زاویه با فصل Knobology از کتاب EFSUMB، ویرایش دوم (۲۰۲۰) تطبیق داده شده است؛ راهنمای AIUM برای سونوگرافی سر و گردن (۲۰۱۳؛ بازیابی‌شده در ۱۹ اکتبر ۲۰۲۶) فقط زمینهٔ کلی بهینه‌سازی را پشتیبانی می‌کند.'
  ),
}
