const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_FLUORO_ZOOM_TOPIC_GROUP = {
  fachId: 'technik',
  kapitelId: 'technik-roentgen',
  title: L('Fluoroskopie', 'Fluoroscopy', 'فلوروسکوپی'),
  topics: [{ id: 'fluoroskopie-durchleuchtung', title: L('Fluoroskopie und Vergrößerung', 'Fluoroscopy and magnification', 'فلوروسکوپی و بزرگ‌نمایی') }],
}

export const TECHNIK_FLUORO_ZOOM_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `fluoro-zoom-${lang}-digital-vs-acquisition`,
  fach: 'technik',
  tags: ['fluoroskopie-durchleuchtung'],
  source: 'Technik.pdf, PDF pp.63–64 (printed pp.62–63); IAEA Human Health Series No.48 (2025), sections on magnification and geometry',
  question: L('Welche Aussage unterscheidet reinen digitalen Anzeigezoom korrekt von Vergrößerung bei der Aufnahme?', 'Which statement correctly distinguishes pure digital display zoom from magnification during acquisition?', 'کدام گزاره بزرگ‌نمایی صرفاً نمایشی دیجیتال را به‌درستی از بزرگ‌نمایی هنگام تصویربرداری متمایز می‌کند؟')[lang],
  options: [
    L('Reiner Anzeigezoom fügt keine Messinformation hinzu und löst selbst keine neue Bestrahlung aus.', 'Pure display zoom adds no measured information and does not itself trigger another exposure.', 'بزرگ‌نمایی صرفاً نمایشی اطلاعات اندازه‌گیری‌شدهٔ تازه‌ای نمی‌افزاید و به‌خودی‌خود تابش دیگری ایجاد نمی‌کند.')[lang],
    L('Jeder digitale Zoom verkleinert das Aufnahme-FOV und erhöht deshalb sicher die Auflösung.', 'Every digital zoom reduces the acquisition FOV and therefore certainly increases resolution.', 'هر بزرگ‌نمایی دیجیتال میدان تصویربرداری را کوچک می‌کند و بنابراین حتماً وضوح را افزایش می‌دهد.')[lang],
    L('Geometrische Vergrößerung beseitigt die Unschärfe des Brennflecks.', 'Geometric magnification eliminates focal-spot blur.', 'بزرگ‌نمایی هندسی محوشدگی کانون تیوب را از بین می‌برد.')[lang],
    L('Ein kleineres Eingangs-FOV hat bei allen Flachdetektoren denselben Dosis-Effekt.', 'A smaller input FOV has the same dose effect with every flat-panel detector.', 'میدان ورودی کوچک‌تر در همهٔ آشکارسازهای تخت اثر دوز یکسانی دارد.')[lang],
  ].map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
  correct: 'A',
  explanation: L('Ein nachträglicher Anzeigeausschnitt interpoliert oder vergrößert vorhandene Pixel, erhebt aber keine neuen Messdaten. Eine Aufnahme mit kleinerem FOV ist ein anderer Vorgang; deren Bild- und Dosisfolgen hängen vom Detektortyp und System ab.', 'A post-acquisition display crop or interpolation enlarges existing pixels but collects no new measurements. Acquiring with a smaller FOV is different; its image and dose effects depend on detector type and system.', 'برش یا درون‌یابی نمایشی پس از تصویربرداری پیکسل‌های موجود را بزرگ می‌کند، اما دادهٔ تازه‌ای ثبت نمی‌کند. تصویربرداری با میدان کوچک‌تر فرایندی متفاوت است و اثر تصویری و دوز آن به نوع آشکارساز و سامانه بستگی دارد.')[lang],
  wrongExplanations: {
    B: L('Anzeigezoom ändert nicht rückwirkend das Aufnahme-FOV. Ein kleineres Aufnahme-FOV darf nicht mit einem digitalen Ausschnitt gleichgesetzt werden.', 'Display zoom does not retroactively change the acquisition FOV. A smaller acquisition FOV must not be equated with a digital crop.', 'بزرگ‌نمایی نمایشی، میدان تصویربرداری را به‌صورت پس‌نگر تغییر نمی‌دهد. میدان تصویربرداری کوچک‌تر را نباید با برش دیجیتال یکی دانست.')[lang],
    C: L('Ein größerer Objekt-Detektor-Abstand kann die geometrische Unschärfe durch den endlichen Brennfleck verstärken.', 'A larger object-to-detector distance can increase geometric unsharpness from the finite focal spot.', 'فاصلهٔ بیشتر جسم تا آشکارساز می‌تواند محوشدگی هندسی ناشی از اندازهٔ محدود کانون تیوب را افزایش دهد.')[lang],
    D: L('IAEA beschreibt unterschiedliche Reaktionen von Bildverstärkern und Flachdetektoren; ein allgemeiner Dosiswert lässt sich daraus nicht ableiten.', 'IAEA describes different responses for image intensifiers and flat-panel detectors; no universal dose effect follows.', 'IAEA پاسخ‌های متفاوت تقویت‌کنندهٔ تصویر و آشکارساز تخت را شرح می‌دهد؛ از آن نمی‌توان اثر دوز همگانی نتیجه گرفت.')[lang],
  },
}))
