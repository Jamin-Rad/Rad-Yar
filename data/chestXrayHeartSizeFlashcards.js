const L = (de, en, fa) => ({ de, en, fa })

export const CHEST_XRAY_HEART_SIZE_FLASHCARD_TOPIC = {
  id: 'herzgroesse-roentgen',
  area: 'Thorax',
  chapter: 'Röntgen-Thorax',
  icon: 'Rö',
  iconImage: '/fach/thorax.png',
  color: '#0284c7',
  href: '/flashcards/herzgroesse-roentgen',
  title: L('Herzgröße im Röntgen', 'Cardiac size on chest radiography', 'اندازه قلب در رادیوگرافی قفسه سینه'),
  subtitle: L('AP/PA · Vergrößerung', 'AP/PA · magnification', 'AP/PA · بزرگ‌نمایی'),
}

export const CHEST_XRAY_HEART_SIZE_FLASHCARDS = [
  {
    id: 'herzgroesse-roentgen-projection',
    topicId: 'herzgroesse-roentgen',
    category: L('Projektion', 'Projection', 'پروجکشن'),
    front: L('Warum kann die Herzsilhouette auf einer a.p.-Aufnahme größer erscheinen?', 'Why can the cardiac silhouette appear larger on an AP view?', 'چرا سایه قلب در نمای AP ممکن است بزرگ‌تر دیده شود؟'),
    answer: L('Das Herz ist weiter vom Detektor entfernt und kann geometrisch vergrößert abgebildet werden. Herzgröße deshalb unter Berücksichtigung der Projektion beurteilen.', 'The heart is farther from the detector and can be geometrically magnified. Interpret apparent heart size with the projection in mind.', 'قلب از دتکتور دورتر است و ممکن است از نظر هندسی بزرگ‌نمایی شود. اندازه ظاهری قلب را با توجه به پروجکشن تفسیر کنید.'),
    explanation: L('Eine breitere Silhouette auf einer a.p.-Aufnahme beweist für sich allein keine Kardiomegalie.', 'A wider silhouette on an AP view does not by itself prove cardiomegaly.', 'پهن‌تر بودن سایه در نمای AP به‌تنهایی کاردیومگالی را ثابت نمی‌کند.'),
    source: 'Thorax.pdf physical pp. 27–28 (printed pp. 26–27)',
  },
]