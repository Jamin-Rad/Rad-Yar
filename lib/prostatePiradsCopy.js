const L = (de, en, fa) => ({ de, en, fa })

export const RULES = {
  'pz-dwi': L('In der PZ übernimmt der Gesamtscore den DWI-Score. DCE verändert DWI 1, 2, 4 und 5 nicht.', 'In the PZ, the overall category follows DWI. DCE does not change DWI 1, 2, 4 or 5.', 'در PZ امتیاز نهایی از DWI پیروی می‌کند. DCE امتیازهای ۱، ۲، ۴ یا ۵ را تغییر نمی‌دهد.'),
  'pz-upgrade': L('PZ + DWI 3 + positive DCE: Upgrade auf PI-RADS 4.', 'PZ + DWI 3 + positive DCE: upgrade to PI-RADS 4.', 'PZ با DWI 3 و DCE مثبت: ارتقا به PI-RADS 4.'),
  'pz-negative': L('PZ + DWI 3 + negative DCE: PI-RADS 3 bleibt bestehen.', 'PZ + DWI 3 + negative DCE: remains PI-RADS 3.', 'PZ با DWI 3 و DCE منفی: PI-RADS 3 باقی می‌ماند.'),
  'pz-no-dce': L('Ohne DCE bleibt der Herd in Kategorie 3. Eine DCE-bedingte Anhebung ist nicht beurteilbar; fehlend ist nicht negativ.', 'Without DCE, this lesion remains category 3. A DCE upgrade cannot be assessed; unavailable is not negative.', 'بدون DCE ضایعه در دسته ۳ می‌ماند. امکان ارتقای ناشی از DCE قابل ارزیابی نیست؛ انجام‌نشده با منفی فرق دارد.'),
  'tz-2-plus-1': L('TZ + T2 2 + DWI 4 oder 5: PI-RADS 3 („2+1“). DCE spielt keine Rolle.', 'TZ + T2 2 + DWI 4 or 5: PI-RADS 3 (2+1). DCE has no role.', 'TZ با T2 2 و DWI 4 یا 5: ‏PI-RADS 3 (قاعده 2+1). ‏DCE نقشی ندارد.'),
  'tz-3-plus-1': L('TZ + T2 3 + DWI 5: PI-RADS 4 („3+1“). DWI 4 würde nicht genügen.', 'TZ + T2 3 + DWI 5: PI-RADS 4 (3+1). DWI 4 would not suffice.', 'TZ با T2 3 و DWI 5: ‏PI-RADS 4 (قاعده 3+1). ‏DWI 4 کافی نیست.'),
  'tz-t2': L('In dieser TZ-Kombination bestimmt T2 die Kategorie. DCE verändert sie nicht.', 'For this TZ combination, T2 determines the category. DCE does not change it.', 'در این ترکیب TZ، ‏T2 دسته را تعیین می‌کند. DCE آن را تغییر نمی‌دهد.'),
}

export const DWI_CRITERIA = [
  L('Unauffällige ADC- und hohe b-Bilder.', 'Normal ADC and high-b images.', 'ADC و تصاویر b بالا طبیعی‌اند.'),
  L('Lineare/keilförmige oder nicht fokale Signaländerung auf ADC und/oder hoher b-DWI.', 'Linear/wedge-shaped or nonfocal ADC and/or high-b abnormality.', 'تغییر خطی/گوه‌ای یا غیرفوکال در ADC و/یا DWI با b بالا.'),
  L('Fokal ADC-arm und/oder hoch-b-hyperintens; höchstens eines von beiden deutlich.', 'Focal low ADC and/or high high-b signal; at most one is markedly abnormal.', 'ADC فوکال پایین و/یا high-b DWI بالا؛ حداکثر یکی از این دو به‌وضوح غیرطبیعی است.'),
  L('Fokal deutlich ADC-arm UND deutlich hoch-b-hyperintens; <15 mm.', 'Focally markedly low ADC AND markedly high high-b signal; <15 mm.', 'ADC فوکال به‌وضوح پایین و high-b DWI به‌وضوح بالا؛ کمتر از ۱۵ میلی‌متر.'),
  L('Muster wie 4, aber ≥15 mm oder eindeutige extraprostatische/invasive Ausbreitung.', 'Pattern of 4, but ≥15 mm or definite extraprostatic/invasive extension.', 'الگوی ۴، اما حداقل ۱۵ میلی‌متر یا گسترش خارج پروستات/تهاجم واضح.'),
]
export const T2_CRITERIA = [
  L('Normale TZ oder runder, vollständig gekapselter typischer Knoten.', 'Normal TZ or a round, fully encapsulated typical nodule.', 'TZ طبیعی یا ندول تیپیک گرد با کپسول کامل.'),
  L('Überwiegend gekapselter oder homogener umschriebener ungekapselter Knoten; auch homogen leicht T2-armes Gewebe zwischen Knoten.', 'Mostly encapsulated or homogeneous circumscribed unencapsulated nodule; also homogeneous mildly dark tissue between nodules.', 'ندول عمدتاً کپسول‌دار یا ندول همگن و مشخص بدون کپسول؛ همچنین بافت همگن کمی تیره بین ندول‌ها.'),
  L('Heterogen mit unklaren Rändern; Befund passt nicht zu 2, 4 oder 5.', 'Heterogeneous with obscured margins; does not meet 2, 4 or 5.', 'ناهمگن با حاشیه نامشخص؛ منطبق با معیارهای ۲، ۴ یا ۵ نیست.'),
  L('Linsenförmig oder nicht umschrieben, homogen mäßig T2-arm, <15 mm.', 'Lenticular or noncircumscribed, homogeneous moderately low T2 signal, <15 mm.', 'عدسی‌شکل یا با حاشیه نامشخص، همگن با سیگنال T2 نسبتاً پایین، کمتر از ۱۵ میلی‌متر.'),
  L('Muster wie 4, aber ≥15 mm oder eindeutige extraprostatische/invasive Ausbreitung.', 'Pattern of 4, but ≥15 mm or definite extraprostatic/invasive extension.', 'الگوی ۴، اما حداقل ۱۵ میلی‌متر یا گسترش خارج پروستات/تهاجم واضح.'),
]
