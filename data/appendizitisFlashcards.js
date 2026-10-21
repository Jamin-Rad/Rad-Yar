export const APPENDIZITIS_FLASHCARD_TOPIC = {
  id: 'appendizitis',
  area: 'Abdomen',
  chapter: 'Gastrointestinaltrakt',
  icon: 'Sono',
  iconImage: '/fach/abdomen.png',
  color: '#0ea5e9',
  href: '/flashcards/appendizitis',
  title: { de: 'Appendizitis', en: 'Appendicitis', fa: 'آپاندیسیت' },
  subtitle: { de: 'Sonographie · CT-Zeichen · Untersuchungsgrenzen', en: 'Ultrasound · CT signs · examination limits', fa: 'سونوگرافی · نشانه‌های CT · محدودیت بررسی' },
}

export const APPENDIZITIS_FLASHCARDS = [
  {
    id: 'appendizitis-ultrasound-pattern',
    topicId: 'appendizitis',
    category: { de: 'Sonographie', en: 'Ultrasound', fa: 'سونوگرافی' },
    front: { de: 'Welche Kombination stützt sonographisch eine akute Appendizitis?', en: 'Which combination supports acute appendicitis on ultrasound?', fa: 'کدام ترکیب یافته در سونوگرافی از آپاندیسیت حاد حمایت می‌کند؟' },
    answer: { de: 'Eine nicht komprimierbare, blind endende Appendix mit entzündlicher Wand- und Umgebungsreaktion; ein Durchmesserwert allein reicht nicht.', en: 'A non-compressible, blind-ending appendix with inflammatory wall and surrounding changes; diameter alone is insufficient.', fa: 'آپاندیس انتها‌بسته و غیرقابل‌فشرده‌شدن همراه با واکنش التهابی دیواره و بافت اطراف؛ قطر به‌تنهایی کافی نیست.' },
    explanation: { de: 'Der PDF-Wert von >6 mm ist ein Kriterium, muss aber zusammen mit Morphologie, Kompressibilität, Wand und Umgebung beurteilt werden.', en: 'The PDF value of >6 mm is one criterion, but must be assessed with morphology, compressibility, wall and surrounding tissues.', fa: 'مقدار بیش از ۶ میلی‌متر در PDF یک معیار است، اما باید همراه شکل، قابلیت فشرده‌شدن، دیواره و بافت اطراف سنجیده شود.' },
  },
  {
    id: 'appendizitis-ct-secondary-signs',
    topicId: 'appendizitis',
    category: { de: 'CT', en: 'CT', fa: 'CT' },
    front: { de: 'Welche sekundären CT-Zeichen können eine Appendizitis stützen?', en: 'Which secondary CT signs can support appendicitis?', fa: 'کدام نشانه‌های ثانویه در CT می‌توانند از آپاندیسیت حمایت کنند؟' },
    answer: { de: 'Periappendikuläres Fettgewebsstranding, lokale Flüssigkeit, peritoneale Verdickung und regionale Lymphknoten; außerdem nach Appendikolith und Komplikationen suchen.', en: 'Periappendiceal fat stranding, local fluid, peritoneal thickening and regional nodes; also assess for an appendicolith and complications.', fa: 'التهاب چربی اطراف آپاندیس، مایع موضعی، ضخیم‌شدن صفاق و غدد لنفاوی ناحیه‌ای؛ همچنین آپاندیکولیت و عوارض را بررسی کنید.' },
    explanation: { de: 'Sekundärzeichen ergänzen die direkte Appendixbeurteilung; keines sollte isoliert als beweisend gelten.', en: 'Secondary signs complement direct assessment of the appendix; none should be treated as diagnostic in isolation.', fa: 'نشانه‌های ثانویه ارزیابی مستقیم آپاندیس را تکمیل می‌کنند؛ هیچ‌کدام به‌تنهایی تشخیصی نیست.' },
  },
  {
    id: 'appendizitis-nonvisualised',
    topicId: 'appendizitis',
    category: { de: 'Untersuchungsgrenzen', en: 'Examination limits', fa: 'محدودیت بررسی' },
    front: { de: 'Was bedeutet eine sonographisch nicht dargestellte Appendix?', en: 'What does a non-visualised appendix on ultrasound mean?', fa: 'دیده‌نشدن آپاندیس در سونوگرافی چه معنایی دارد؟' },
    answer: { de: 'Sie schließt eine Appendizitis nicht sicher aus. Befundqualität und klinischen Kontext berücksichtigen und den nächsten Schritt populationsgerecht wählen.', en: 'It does not reliably exclude appendicitis. Consider examination quality and clinical context, then choose the next step for the population.', fa: 'آپاندیسیت را با اطمینان رد نمی‌کند. کیفیت بررسی و زمینه بالینی را بسنجید و گام بعدی را متناسب با جمعیت انتخاب کنید.' },
    explanation: { de: 'Nichtvisualisierung ist ein nichtdiagnostisches Ergebnis, kein negativer Appendixbefund.', en: 'Non-visualisation is a non-diagnostic result, not a negative appendix finding.', fa: 'دیده‌نشدن نتیجه‌ای غیرتشخیصی است، نه یافته‌ای منفی درباره آپاندیس.' },
  },
]
