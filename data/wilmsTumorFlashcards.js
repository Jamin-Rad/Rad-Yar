const L = (de, en, fa) => ({ de, en, fa })

export const WILMS_FLASHCARD_TOPIC = {
  id: 'nephroblastom-wilms',
  area: 'Abdomen',
  chapter: 'Niere',
  icon: 'CT',
  iconImage: '/fach/abdomen.png',
  color: '#0e7490',
  href: '/flashcards/nephroblastom-wilms',
  title: L('Nephroblastom (Wilms-Tumor)', 'Nephroblastoma (Wilms tumour)', 'نفروبلاستوما (تومور ویلمز)'),
  subtitle: L('CT · Claw sign · Ursprungsort', 'CT · claw sign · site of origin', 'CT · علامت claw · محل منشأ'),
}

export const WILMS_FLASHCARDS = [
  {
    id: 'nephroblastom-wilms-01', topicId: 'nephroblastom-wilms', category: L('Ursprungsort', 'Site of origin', 'محل منشأ'),
    front: L('Was stützt das Claw sign bei einer großen Nierenregion-Raumforderung?', 'What does the claw sign support in a large renal-region mass?', 'علامت claw در تودهٔ بزرگ ناحیهٔ کلیه از چه چیزی حمایت می‌کند؟'),
    answer: L('Einen Ursprung aus der Niere, wenn verbleibendes Nierenparenchym sichel- oder klauenförmig an die Raumforderung anschließt.', 'Renal origin when residual renal parenchyma curves around the mass in a crescent or claw shape.', 'منشأ کلیوی، اگر پارانشیم باقی‌مانده به‌شکل هلال یا چنگال به توده متصل شود.'),
    explanation: L('Das Zeichen lokalisiert den Ursprungsort; es legt keine Histologie fest.', 'The sign helps localise the origin; it does not establish histology.', 'این علامت به تعیین محل منشأ کمک می‌کند و بافت‌شناسی را مشخص نمی‌کند.'),
    source: 'Abdomen.pdf physical p.52; Combrink & Beviss-Challinor 2021',
  },
  {
    id: 'nephroblastom-wilms-02', topicId: 'nephroblastom-wilms', category: L('Grenzen', 'Limitations', 'محدودیت‌ها'),
    front: L('Beweist ein Claw sign einen Wilms-Tumor oder schließt es ein Neuroblastom aus?', 'Does a claw sign prove Wilms tumour or exclude neuroblastoma?', 'آیا علامت claw تومور ویلمز را ثابت می‌کند یا نوروبلاستوما را رد می‌کند؟'),
    answer: L('Nein. Es unterstützt den renalen Ursprungsort, nicht die Histologie; Neuroblastom bleibt eine wichtige extra-renale Differenzialdiagnose.', 'No. It supports renal origin, not histology; neuroblastoma remains an important extra-renal differential.', 'خیر. این علامت منشأ کلیوی را تقویت می‌کند، نه بافت‌شناسی را؛ نوروبلاستوما همچنان یک افتراق مهم خارج‌کلیوی است.'),
    explanation: L('Die Winkelbeschreibung im PDF und die Definition einer separaten MRI-Studie werden wegen der unterschiedlichen Modalität nicht gleichgesetzt.', 'Because the modalities differ, the PDF angle description is not treated as equivalent to the definition in a separate MRI study.', 'به‌دلیل تفاوت روش تصویربرداری، توصیف زاویه در PDF با تعریف یک مطالعهٔ جداگانهٔ MRI معادل دانسته نمی‌شود.'),
    source: 'Abdomen.pdf physical p.52; Combrink & Beviss-Challinor 2021',
  },
]
