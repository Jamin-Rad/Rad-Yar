export const LIVER_MRI_FLASHCARD_TOPIC = {
  id: 'leber-mrt-protokoll',
  area: 'Technik',
  chapter: 'MRT-Protokolle',
  icon: 'MRI',
  iconImage: '/fach/abdomen.png',
  color: '#2b8da0',
  href: '/flashcards/leber-mrt-protokoll',
  title: { de: 'Leber-MRT-Protokoll', en: 'Liver MRI protocol', fa: 'پروتکل MRI کبد' },
  subtitle: { de: 'Native Sequenzen · Dynamik · hepatobiliäre Phase · MRCP', en: 'Baseline sequences · dynamics · hepatobiliary phase · MRCP', fa: 'توالی‌های پایه · فازهای پویا · فاز کبدی‌صفراوی · MRCP' },
}

export const LIVER_MRI_FLASHCARDS = [
  {
    id: 'sequence-groups',
    topicId: 'leber-mrt-protokoll',
    category: { de: 'Protokoll', en: 'Protocol', fa: 'پروتکل' },
    front: { de: 'Welche unterschiedlichen Aufgaben haben native Sequenzen, dynamische Phasen und eine hepatobiliäre Phase?', en: 'What distinct roles do baseline sequences, dynamic phases and a hepatobiliary phase serve?', fa: 'توالی‌های پایه، فازهای پویا و فاز کبدی‌صفراوی چه نقش‌های متفاوتی دارند؟' },
    answer: { de: 'Native Sequenzen charakterisieren Gewebe (u. a. T2, Fett-/Eisenhinweise, DWI/ADC); dynamische T1-Phasen zeigen das Enhancement im Zeitverlauf; die hepatobiliäre Phase benötigt ein entsprechendes Kontrastmittel.', en: 'Baseline sequences characterise tissue (including T2, fat/iron clues and DWI/ADC); dynamic T1 phases show enhancement over time; the hepatobiliary phase requires an appropriate contrast agent.', fa: 'توالی‌های پایه بافت را مشخصه‌یابی می‌کنند (از جمله T2، سرنخ‌های چربی/آهن و DWI/ADC)؛ فازهای پویای T1 تغییر enhancement را در زمان نشان می‌دهند؛ فاز کبدی‌صفراوی به مادهٔ حاجب مناسب نیاز دارد.' },
    explanation: { de: 'Die konkrete Auswahl und Zeitplanung hängen von Indikation, Kontrastmittel, Patient und lokalem Protokoll ab.', en: 'Exact selection and timing depend on the indication, contrast agent, patient and local protocol.', fa: 'انتخاب و زمان‌بندی دقیق به اندیکاسیون، مادهٔ حاجب، بیمار و پروتکل محلی وابسته است.' },
    diagram: { de: 'T2 / T1 Dixon / DWI-ADC → dynamische T1-Phasen → ggf. hepatobiliäre Phase', en: 'T2 / T1 Dixon / DWI-ADC → dynamic T1 phases → hepatobiliary phase when indicated', fa: 'T2 / T1 Dixon / DWI-ADC → فازهای پویای T1 → فاز کبدی‌صفراوی در صورت نیاز' },
  },
]
