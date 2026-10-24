const L = (de, en, fa) => ({ de, en, fa })
export const ATELECTASIS_TITLE = L('Atelektase', 'Atelectasis', 'آتلکتازی')
const prompt = L('Ein Lungenabschnitt ist dichter als seine Umgebung. Welcher zusätzliche Befund stützt eine Atelektase?', 'A lung region is denser than its surroundings. Which additional finding supports atelectasis?', 'بخشی از ریه متراکم‌تر از اطراف است. کدام یافتهٔ همراه از آتلکتازی حمایت می‌کند؟')
const options = [
  L('Volumenverlust mit Verlagerung einer Fissur.', 'Volume loss with displacement of a fissure.', 'کاهش حجم همراه با جابه‌جایی فیشور.'),
  L('Ein Luftbronchogramm ohne erkennbaren Volumenverlust.', 'An air bronchogram without visible volume loss.', 'برونکوگرام هوایی بدون کاهش حجم قابل‌تشخیص.'),
  L('Ein einzelner verkalkter Rundherd.', 'A solitary calcified nodule.', 'یک ندول منفرد کلسیفیه.'),
  L('Unveränderte regionale Größe als einziges Zusatzmerkmal.', 'Unchanged regional size as the only additional feature.', 'اندازهٔ بدون تغییر ناحیه به‌عنوان تنها یافتهٔ همراه.'),
]
const feedback = [
  L('Die Kombination aus höherer Dichte und kleinerem Volumen ist entscheidend. Verlagerte Fissuren und bronchovaskuläre Strukturen stützen den Volumenverlust; die Ursache ist damit noch nicht geklärt.', 'The combination of higher attenuation and reduced volume is key. Displaced fissures and bronchovascular structures support volume loss; they do not establish its cause.', 'ترکیب دانسیتهٔ بالاتر و حجم کمتر کلیدی است. جابه‌جایی فیشورها و ساختارهای برونکوواسکولار از کاهش حجم حمایت می‌کند، اما علت را مشخص نمی‌کند.'),
  L('Ein Luftbronchogramm kann bei verschiedenen Verdichtungen vorkommen; allein belegt es keinen Volumenverlust.', 'An air bronchogram occurs in several types of opacity; alone it does not establish volume loss.', 'برونکوگرام هوایی در انواع کدورت دیده می‌شود و به‌تنهایی کاهش حجم را ثابت نمی‌کند.'),
  L('Ein verkalkter Rundherd erklärt für sich keinen regionalen Volumenverlust.', 'A calcified nodule alone does not explain regional volume loss.', 'ندول کلسیفیه به‌تنهایی کاهش حجم ناحیه‌ای را توضیح نمی‌دهد.'),
  L('Eine unveränderte Größe liefert keinen positiven Hinweis auf Kollaps. Prüfen Sie Fissuren, Hilus und bronchovaskuläre Strukturen.', 'Unchanged size is not positive evidence of collapse. Inspect fissures, the hilum and bronchovascular structures.', 'اندازهٔ بدون تغییر شاهد مثبت کلاپس نیست. فیشورها، ناف ریه و ساختارهای برونکوواسکولار را بررسی کنید.'),
]
const source = 'Thorax.pdf physical p11 / printed p10; Fleischner Society 2024 glossary, https://doi.org/10.1148/radiol.232558'
export const ATELECTASIS_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang => [lang, [{id:`atelektase-${lang}-volume`,fach:'thorax',tags:['atelektase'],question:prompt[lang],options:options.map((o,i)=>({id:'ABCD'[i],text:o[lang]})),correct:'A',explanation:feedback[0][lang],wrongExplanations:Object.fromEntries(feedback.slice(1).map((f,i)=>['BCD'[i],f[lang]])),source}]]))
export const ATELECTASIS_CARDS = [{id:'atelektase-volume',topicId:'atelektase',category:ATELECTASIS_TITLE,front:prompt,answer:options[0],explanation:feedback[0],source}]
export const ATELECTASIS_CARD_TOPIC = {id:'atelektase',href:'/flashcards/atelektase',title:ATELECTASIS_TITLE,subtitle:L('Volumenverlust erkennen','Recognize volume loss','تشخیص کاهش حجم'),icon:'◉',color:'#397c8b'}
export const ATELECTASIS_TOPIC_GROUP = {fachId:'thorax',kapitelId:'thorax-lunge',title:ATELECTASIS_TITLE,topics:[{id:'atelektase',title:ATELECTASIS_TITLE}]}
