export const L = (de, en, fa) => ({ de, en, fa })
export const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

export const sections = [
  { id: 'akutdiagnostik', title: L('Akutdiagnostik', 'Acute imaging', 'تصویربرداری حاد') },
  { id: 'fruehzeichen', title: L('Frühzeichen erkennen', 'Recognise early signs', 'شناخت علائم اولیه') },
  { id: 'befund', title: L('Strukturiert befunden', 'Report with structure', 'گزارش ساختاریافته') },
]
export const trackedIds = sections.map(section => section.id)
export const allIds = [...trackedIds, 'take-home']
export const quizUrl = '/ueben/quiz?fach=gehirn&n=10&themen=ischaemischer-schlaganfall&from=%2Fandarun%2Ftest-2'

export const stages = [
  { icon: 'scan', title: L('Blutung ausschließen', 'Exclude haemorrhage', 'رد خونریزی'), text: L('Parenchym, Ventrikel und Subarachnoidalräume systematisch prüfen.', 'Review the parenchyma, ventricles and subarachnoid spaces systematically.', 'پارانشیم، بطن‌ها و فضاهای ساب‌آراکنوئید را منظم بررسی کنید.') },
  { icon: 'vessel', title: L('Gefäße beurteilen', 'Assess the vessels', 'ارزیابی عروق'), text: L('Verschluss lokalisieren und auf Tandemläsionen oder Dissektion achten.', 'Localise occlusion and look for tandem lesions or dissection.', 'محل انسداد را مشخص و ضایعات تاندوم یا دیسکسیون را بررسی کنید.') },
  { icon: 'message', title: L('Befund kommunizieren', 'Communicate findings', 'انتقال یافته‌ها'), text: L('Die entscheidenden Befunde klar priorisieren und unmittelbar weitergeben.', 'Prioritise the key findings and communicate them promptly.', 'یافته‌های تصمیم‌ساز را اولویت‌بندی و فوراً منتقل کنید.') },
]

export const findings = [
  { id: 'density', label: L('Dichte', 'Density', 'دانسیته'), title: L('Seitenvergleich zuerst', 'Compare both sides first', 'ابتدا دو سمت را مقایسه کنید'), text: L('Eine diskrete Hypodensität kann ein frühes Parenchymzeichen sein. Vergleiche Kortex und Basalganglien konsequent mit der Gegenseite.', 'Subtle low attenuation may be an early parenchymal sign. Compare the cortex and basal ganglia with the opposite side.', 'هیپودنسیتی ظریف می‌تواند علامت اولیه پارانشیمی باشد. کورتکس و عقده‌های قاعده‌ای را با سمت مقابل مقایسه کنید.'), location: L('Kortex und Basalganglien', 'Cortex and basal ganglia', 'کورتکس و عقده‌های قاعده‌ای'), meaning: L('Verlust der Grau-Weiß-Differenzierung', 'Loss of grey–white differentiation', 'از بین رفتن تفکیک خاکستری–سفید') },
  { id: 'insula', label: L('Insula', 'Insula', 'اینسولا'), title: L('Insular ribbon verfolgen', 'Trace the insular ribbon', 'نوار اینسولا را دنبال کنید'), text: L('Der Verlust der scharfen Mark-Rinden-Grenze an der Insula ist ein klassisches Frühzeichen im MCA-Territorium.', 'Loss of the sharp grey–white interface at the insula is a classic early sign in the MCA territory.', 'از بین رفتن مرز واضح ماده خاکستری و سفید در اینسولا یک علامت کلاسیک اولیه در قلمرو MCA است.'), location: 'Insular ribbon', meaning: L('Frühes MCA-Territoriumzeichen', 'Early MCA-territory sign', 'علامت اولیه قلمرو MCA') },
  { id: 'sulci', label: L('Sulci', 'Sulci', 'سولکوس‌ها'), title: L('Sulcusverstrich aktiv suchen', 'Look for sulcal effacement', 'محو شدن سولکوس‌ها را بررسی کنید'), text: L('Frühes zytotoxisches Ödem vermindert die Abgrenzbarkeit kortikaler Sulci. Nutze ein enges Hirnfenster und bleibe im Seitenvergleich.', 'Early cytotoxic oedema reduces the visibility of cortical sulci. Use a narrow brain window and compare both sides.', 'ادم سیتوتوکسیک اولیه وضوح سولکوس‌های قشری را کم می‌کند. از پنجره باریک مغزی و مقایسه دو سمت استفاده کنید.'), location: L('Konvexität und Sylvische Fissur', 'Convexity and Sylvian fissure', 'کانوکسیتی و شیار سیلوین'), meaning: L('Lokales Ödem und beginnende Raumforderung', 'Local oedema and early mass effect', 'ادم موضعی و اثر فشاری اولیه') },
]

export const takeaways = [
  { title: L('Blutung zuerst ausschließen.', 'Exclude haemorrhage first.', 'ابتدا خونریزی را رد کنید.'), detail: L('Die NCCT beantwortet zuerst die Sicherheitsfrage. Suche systematisch in Parenchym, Ventrikeln und Subarachnoidalräumen, bevor du Frühzeichen der Ischämie bewertest.', 'NCCT answers the safety question first. Review the parenchyma, ventricles and subarachnoid spaces before assessing early ischaemic signs.', 'NCCT ابتدا به پرسش ایمنی پاسخ می‌دهد. پیش از ارزیابی علائم اولیه ایسکمی، پارانشیم، بطن‌ها و فضاهای ساب‌آراکنوئید را منظم بررسی کنید.') },
  { title: L('LVO in der CTA exakt lokalisieren.', 'Localise the LVO precisely on CTA.', 'محل LVO را در CTA دقیق مشخص کنید.'), detail: L('Benenne Seite und Segment. Prüfe den Gefäßweg auf Tandemläsion oder Dissektion und ordne die distale Füllung im klinischen Kontext ein.', 'Name the side and segment. Check the vessel course for tandem lesions or dissection and interpret distal filling in clinical context.', 'سمت و سگمان را مشخص کنید. مسیر رگ را از نظر ضایعه تاندوم یا دیسکسیون بررسی و پرشدگی دیستال را در زمینه بالینی تفسیر کنید.') },
  { title: L('Frühzeichen im Seitenvergleich lesen.', 'Read early signs side by side.', 'علائم اولیه را با مقایسه دو سمت بخوانید.'), detail: L('Achte auf Dichteunterschiede, Insular ribbon, Basalganglien und Sulcusverstrich. Eine unauffällige NCCT schließt eine frühe Ischämie nicht aus.', 'Look for attenuation differences, loss of the insular ribbon, basal ganglia changes and sulcal effacement. A normal NCCT does not exclude early ischaemia.', 'تفاوت دانسیته، نوار اینسولا، عقده‌های قاعده‌ای و محوشدن سولکوس‌ها را بررسی کنید. NCCT طبیعی ایسکمی اولیه را رد نمی‌کند.') },
  { title: L('Mit einer klaren Handlungsbotschaft enden.', 'End with a clear action message.', 'با یک پیام عملی روشن پایان دهید.'), detail: L('Fasse Blutung, Parenchym, Verschlusshöhe und gegebenenfalls Perfusion in wenigen entscheidungsrelevanten Sätzen zusammen. Kritische Befunde unmittelbar kommunizieren.', 'Summarise haemorrhage, parenchyma, occlusion level and, when relevant, perfusion in a few decision-focused sentences. Communicate critical findings immediately.', 'خونریزی، پارانشیم، سطح انسداد و در صورت نیاز پرفیوژن را در چند جمله تصمیم‌ساز خلاصه کنید. یافته بحرانی را فوراً منتقل کنید.') },
]

export const sources = [
  { title: 'AWMF · Akuttherapie des ischämischen Schlaganfalls', detail: 'S2e · Reg.-Nr. 030-046 · Version 5.1', url: 'https://register.awmf.org/assets/guidelines/030-046l_S2e_Akuttherapie-des-ischaemischen-Schlaganfalls_2022-11-verlaengert.pdf' },
  { title: 'AHA/ASA · Early Management of Acute Ischemic Stroke', detail: 'American Heart Association · 2026', url: 'https://professional.heart.org/en/guidelines-statements/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-strokestr0000000000000513' },
  { title: 'Radiopaedia · Right ICA dissection', detail: 'Ian Bickle · rID 28441 · CC BY-NC-SA 3.0', url: 'https://radiopaedia.org/cases/28441' },
  { title: 'Radiopaedia · Left MCA infarct', detail: 'Abdulrahman Abdo Ali Abbas · rID 78956 · CC BY-NC-SA 3.0', url: 'https://radiopaedia.org/cases/78956' },
]
