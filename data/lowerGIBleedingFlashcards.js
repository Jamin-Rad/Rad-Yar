const L = (de, en, fa) => ({ de, en, fa })

export const LOWER_GI_BLEEDING_FLASHCARD_TOPIC = {
  id: 'untere-gi-blutung',
  area: 'Abdomen',
  chapter: 'Kolon & Rektum',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/untere-gi-blutung',
  title: L('Untere GI-Blutung', 'Lower GI bleeding', 'خون‌ریزی تحتانی گوارش'),
  subtitle: L('CTA · Katheterangiographie · Embolisation', 'CTA · catheter angiography · embolisation', 'CTA · آنژیوگرافی کاتتری · آمبولیزاسیون'),
}

const cards = [
  {
    id: 'cta-negative',
    category: L('CTA', 'CTA', 'CTA'),
    front: L('Was bedeutet eine negative CTA bei intermittierender Blutung?', 'What does a negative CTA mean when bleeding is intermittent?', 'CTA منفی در خون‌ریزی متناوب چه معنایی دارد؟'),
    answer: L('Sie zeigt, dass zum Untersuchungszeitpunkt keine Extravasation nachgewiesen wurde; sie schließt eine intermittierende Blutung nicht sicher aus.', 'No extravasation was demonstrated at the time of imaging; intermittent bleeding is not reliably excluded.', 'هنگام تصویربرداری نشت مادهٔ حاجب نشان داده نشده است؛ خون‌ریزی متناوب با اطمینان رد نمی‌شود.'),
    explanation: L('Die CTA bildet einen Zeitpunkt ab. Bei pausierender Blutung kann die Untersuchung negativ sein.', 'CTA captures a point in time. If bleeding pauses, the examination may be negative.', 'CTA یک مقطع زمانی را نشان می‌دهد؛ اگر خون‌ریزی موقتاً متوقف شده باشد، بررسی می‌تواند منفی شود.'),
    diagram: L('CTA negativ ≠ Blutung sicher ausgeschlossen', 'Negative CTA ≠ bleeding definitively excluded', 'CTA منفی ≠ رد قطعی خون‌ریزی'),
  },
  {
    id: 'mesenteric-territory',
    category: L('Gefäßterritorium', 'Vascular territory', 'قلمرو عروقی'),
    front: L('Welche Mesenterialarterie passt zum rechten gegenüber dem linken Kolon?', 'Which mesenteric artery corresponds to the right versus left colon?', 'کدام شریان مزانتریک با کولون راست در برابر کولون چپ متناظر است؟'),
    answer: L('A. mesenterica superior: Dünndarm/rechtes Kolon. A. mesenterica inferior: linkes Kolon; die obere Rektumversorgung läuft über die A. rectalis superior aus der IMA.', 'Superior mesenteric artery: small bowel/right colon. Inferior mesenteric artery: left colon; the superior rectum is supplied via the superior rectal artery from the IMA.', 'شریان مزانتریک فوقانی: رودهٔ باریک/کولون راست. شریان مزانتریک تحتانی: کولون چپ؛ خون‌رسانی قسمت فوقانی رکتوم از راه شریان رکتال فوقانی و IMA است.'),
    explanation: L('Weitere Rektumäste können aus dem Stromgebiet der A. iliaca interna kommen; die PDF-Zuordnung ist vereinfacht und darf nicht als IMA-Alleinversorgung des gesamten Rektums gelesen werden.', 'Additional rectal branches may arise from the internal iliac territory; the PDF mapping is simplified and should not be read as IMA-only supply to the entire rectum.', 'شاخه‌های دیگری از رکتوم ممکن است از قلمرو ایلیاک داخلی منشأ بگیرند؛ تطبیق PDF ساده‌شده است و نباید به معنای خون‌رسانی کل رکتوم فقط از IMA تلقی شود.'),
    diagram: L('SMA → Dünndarm / rechtes Kolon · IMA → linkes Kolon / A. rectalis superior', 'SMA → small bowel / right colon · IMA → left colon / superior rectal artery', 'SMA: رودهٔ باریک / کولون راست؛ IMA: کولون چپ / شریان رکتال فوقانی'),
  },
  {
    id: 'completion-check',
    category: L('Embolisation', 'Embolisation', 'آمبولیزاسیون'),
    front: L('Was prüft die Kontrollangiographie nach selektiver Embolisation?', 'What does completion angiography assess after selective embolisation?', 'آنژیوگرافی پایانی پس از آمبولیزاسیون انتخابی چه چیزی را ارزیابی می‌کند؟'),
    answer: L('Ob noch eine Kontrastmittelextravasation sichtbar ist; zugleich muss die Darmperfusion im Blick bleiben.', 'Whether contrast extravasation remains visible; bowel perfusion must also be considered.', 'آیا هنوز نشت مادهٔ حاجب دیده می‌شود؛ هم‌زمان باید خون‌رسانی روده نیز در نظر گرفته شود.'),
    explanation: L('Das PDF nennt die Dokumentation einer Blutstillung ohne weitere Extravasation. Die ergänzende Sicherheitsabwägung berücksichtigt das Ischämierisiko.', 'The PDF specifies documenting haemostasis with no further extravasation. The additional safety consideration is the risk of ischaemia.', 'PDF ثبت هموستاز بدون نشت بیشتر را مطرح می‌کند؛ ملاحظهٔ ایمنی تکمیلی، خطر ایسکمی است.'),
    diagram: L('keine weitere Extravasation · Darmperfusion beachten', 'no further extravasation · consider bowel perfusion', 'نبود نشت بیشتر · توجه به خون‌رسانی روده'),
  },
]

export const LOWER_GI_BLEEDING_FLASHCARDS = cards.map((card, index) => ({
  ...card,
  id: `untere-gi-blutung-${String(index + 1).padStart(2, '0')}-${card.id}`,
  topicId: 'untere-gi-blutung',
  source: 'Abdomen.pdf, physical pp. 86–87 (printed pp. 85–86); ESGE 2021; ACR 2021 update',
}))
