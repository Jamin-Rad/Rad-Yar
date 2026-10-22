const L = (de, en, fa) => ({ de, en, fa })

export const TECHNIK_FLUORO_ZOOM_FLASHCARD_TOPIC = {
  id: 'fluoroskopie-durchleuchtung', area: 'Technik', chapter: 'Fluoroskopie', icon: 'DSA',
  color: '#397f8d', href: '/flashcards/fluoroskopie-durchleuchtung',
  title: L('Fluoroskopie und Vergrößerung', 'Fluoroscopy and magnification', 'فلوروسکوپی و بزرگ‌نمایی'),
  subtitle: L('Aufnahme-FOV · Anzeigezoom · Geometrie', 'Acquisition FOV · display zoom · geometry', 'میدان تصویربرداری · زوم نمایشی · هندسه'),
}

export const TECHNIK_FLUORO_ZOOM_FLASHCARDS = [
  {
    id: 'fluoro-zoom-display-vs-acquisition', topicId: 'fluoroskopie-durchleuchtung',
    category: L('Fluoroskopie', 'Fluoroscopy', 'فلوروسکوپی'),
    front: L('Was ist der zentrale Unterschied zwischen digitalem Anzeigezoom und Zoom bei der Aufnahme?', 'What is the key difference between digital display zoom and acquisition magnification?', 'تفاوت اصلی زوم نمایشی دیجیتال و بزرگ‌نمایی هنگام تصویربرداری چیست؟'),
    answer: L('Reiner Anzeigezoom vergrößert vorhandene Bilddaten ohne neue Messinformation und ohne erneute Bestrahlung. Eine Änderung des Aufnahme-FOV betrifft dagegen die Bildakquisition; Bild- und Dosisfolgen sind systemabhängig.', 'Pure display zoom enlarges existing image data without new measured information or another exposure. Changing the acquisition FOV affects image acquisition; image and dose effects depend on the system.', 'زوم نمایشی صرف داده‌های موجود را بدون اطلاعات اندازه‌گیری‌شدهٔ تازه و بدون تابش دوباره بزرگ می‌کند. تغییر میدان تصویربرداری بر برداشت تصویر اثر می‌گذارد و پیامد تصویری و دوز آن به سامانه وابسته است.'),
    explanation: L('Nicht jede Vergrößerungsfunktion ist eine neue Röntgenaufnahme; Aufnahme-, Anzeige- und geometrische Vergrößerung müssen getrennt werden.', 'Not every magnification function is a new X-ray acquisition; acquisition, display and geometric magnification must be distinguished.', 'هر قابلیت بزرگ‌نمایی تصویربرداری تازه با پرتو ایکس نیست؛ بزرگ‌نمایی هنگام تصویربرداری، نمایشی و هندسی باید از هم جدا شوند.'),
  },
]
