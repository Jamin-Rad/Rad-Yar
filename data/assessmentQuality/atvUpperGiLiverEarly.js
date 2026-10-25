import { hcaRows, hcaCoverage } from './atvHca'
import { herniaRows, herniaCoverage } from './atvHernia'
import { lowerGiRows, lowerGiCoverage } from './atvLowerGiBleeding'
import { hepaticAmlCoverage } from './atvHepaticAmlCoverage'
// ATV04 author work. Not published until independent review.
const L=(de,en,fa)=>({de,en,fa})
const pick=(v,lang)=>typeof v==='string'?v:(v[lang]||v.de)
export const upperGiLiverRows=[
  {
    "key": "ulcer-mpr",
    "fach": "abdomen",
    "topicId": "ulkuserkrankung",
    "route": "/abdomen/gi/ulkuserkrankung",
    "goal": "detection",
    "source": "https://pubmed.ncbi.nlm.nih.gov/25015399/",
    "question": {
      "de": "Auf einer axialen kontrastverstärkten CT-Schicht ist am Antrum eine mögliche fokale Schleimhautunterbrechung unklar. Welche zusätzliche Rekonstruktion hilft am ehesten, einen Ulkuskrater und seine Beziehung zur Magenwand zu beurteilen?",
      "en": "A possible focal mucosal interruption at the antrum is unclear on one axial contrast-enhanced CT slice. Which additional reconstruction best helps assess an ulcer crater and its relationship to the gastric wall?",
      "fa": "در یک برش محوری CT با تزریق، احتمال قطع موضعی مخاط آنتروم مبهم است. کدام بازسازی تکمیلی برای بررسی حفرهٔ اولسر و ارتباط آن با دیوارهٔ معده مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Dünne multiplanare Weichteilrekonstruktionen entlang und quer zur betroffenen Wand.",
        "en": "Thin multiplanar soft-tissue reconstructions along and across the affected wall.",
        "fa": "بازسازی‌های نازک چندصفحه‌ای بافت نرم، در امتداد دیوارهٔ درگیر و عمود بر آن."
      },
      {
        "de": "Dicke MIP-Rekonstruktionen entlang der perigastrischen Arterien.",
        "en": "Thick MIP reconstructions along the perigastric arteries.",
        "fa": "بازسازی‌های MIP ضخیم در امتداد شریان‌های اطراف معده."
      },
      {
        "de": "Dicke MinIP-Rekonstruktionen zur Darstellung des gasgefüllten Magenlumens.",
        "en": "Thick MinIP reconstructions to display the gas-filled gastric lumen.",
        "fa": "بازسازی‌های MinIP ضخیم برای نمایش لومن پر از گاز معده."
      },
      {
        "de": "Dickere axiale Mittelwertrekonstruktionen über die gesamte Magenwand.",
        "en": "Thicker axial average-intensity reconstructions through the gastric wall.",
        "fa": "بازسازی‌های محوری ضخیم‌تر با میانگین‌گیری شدت، از دیوارهٔ معده."
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Gezielte multiplanare Rekonstruktionen erlauben, den verdächtigen Schleimhautdefekt in mehreren Ebenen mit der Wand zu verfolgen. In der endoskopisch korrelierten Originalstudie verbesserte die MPR-Durchsicht die Ulkuserkennung. Eine unauffällige CT schließt ein Schleimhautulkus dennoch nicht aus.",
      "en": "Targeted multiplanar reconstructions allow the suspected mucosal defect to be followed in relation to the wall in several planes. MPR review improved ulcer detection in the original endoscopy-correlated study. A negative CT nevertheless does not exclude a mucosal ulcer.",
      "fa": "بازسازی‌های هدفمند چندصفحه‌ای، دنبال‌کردن نقص مشکوک مخاط را نسبت به دیواره در چند صفحه ممکن می‌کنند. در مطالعهٔ اصلی با تطبیق آندوسکوپی، مرور MPR تشخیص اولسر را بهبود داد. با این حال CT منفی، اولسر مخاطی را رد نمی‌کند."
    },
    "wrong": [
      null,
      {
        "de": "Eine Gefäß-MIP betont kontrastierte Gefäße und kann kleine Wanddefekte durch Überlagerung verdecken. Für die konkrete Frage braucht es Weichteil-MPR.",
        "en": "Vascular MIP emphasises enhanced vessels and can obscure small wall defects through superimposition. This question requires soft-tissue MPR.",
        "fa": "MIP عروقی، عروق تقویت‌شده را برجسته می‌کند و هم‌پوشانی می‌تواند نقص کوچک دیواره را بپوشاند. برای این پرسش، MPR بافت نرم لازم است."
      },
      {
        "de": "MinIP betont niedrig dichte Lumeninhalte, statt den kontrastierten Schleimhautrand und einen kleinen Defekt in der Wand zu verfolgen. Dafür sind gezielte Weichteil-MPR geeigneter.",
        "en": "MinIP emphasises low-attenuation luminal contents rather than following the enhanced mucosal edge and a small wall defect. Targeted soft-tissue MPR are more suitable for that task.",
        "fa": "MinIP محتویات کم‌دانسیتهٔ لومن را برجسته می‌کند، نه دنبال‌کردن حاشیهٔ مخاط تقویت‌شده و نقص کوچک دیواره را. MPR هدفمند بافت نرم برای این کار مناسب‌تر است."
      },
      {
        "de": "Dickere Mittelwertschichten können einen kleinen Defekt durch Partialvolumen verdecken. Dünne, gezielte MPR sind zur Klärung geeigneter.",
        "en": "Thicker average-intensity slices can obscure a small defect by partial volume. Thin targeted MPR are more suitable for clarification.",
        "fa": "برش‌های ضخیم‌تر با میانگین‌گیری می‌توانند نقص کوچک را به علت حجم جزئی بپوشانند. MPR نازک و هدفمند برای روشن‌کردن یافته مناسب‌تر است."
      }
    ],
    "front": {
      "de": "Wie ergänzt du die axiale CT-Durchsicht bei einem möglichen gastroduodenalen Ulkuskrater?",
      "en": "How do you supplement axial CT review for a possible gastroduodenal ulcer crater?",
      "fa": "در احتمال حفرهٔ اولسر معده یا دوازدهه، مرور محوری CT را چگونه تکمیل می‌کنید؟"
    },
    "answer": {
      "de": "Mit dünnen, gezielten Weichteil-MPR entlang und quer zur verdächtigen Wand; auf fokalen Schleimhautdefekt und begleitende Wand-/Umgebungsreaktion achten.",
      "en": "With thin targeted soft-tissue MPR along and across the suspicious wall; assess a focal mucosal defect and associated mural/perigastric reaction.",
      "fa": "با MPR نازک و هدفمند بافت نرم در امتداد دیوارهٔ مشکوک و عمود بر آن؛ نقص موضعی مخاط و واکنش همراه دیواره یا اطراف را بررسی کنید."
    }
  }
]

upperGiLiverRows.push(...lowerGiRows, ...herniaRows, ...hcaRows)
export const newQuestions=(lang='de')=>upperGiLiverRows.map(r=>({id:'aq-atv-'+r.key+'-'+lang,fach:r.fach,tags:[r.topicId],question:pick(r.question,lang),options:r.options.map((text,i)=>({id:'ABCD'[i],text:pick(text,lang)})),correct:r.correct,explanation:pick(r.explanation,lang),wrongExplanations:Object.fromEntries(r.wrong.flatMap((text,i)=>text?[['ABCD'[i],pick(text,lang)]]:[])),source:r.source}))
export const newCards=upperGiLiverRows.filter(r=>r.createCard !== false).map(r=>({id:'aq-atv-'+r.key,topicId:r.topicId,category:r.category || L('Bildgebung und Einordnung','Imaging and interpretation','تصویربرداری و تفسیر'),front:r.front,answer:r.answer,explanation:r.explanation,source:r.source}))
export const topics=[{id:'inguinal-femoral-hernia',subject:'abdomen',title:{de:'Leisten- und Schenkelhernie',en:'Inguinal and femoral hernias',fa:'فتق اینگوینال و فمورال'}}]
export const routeCoverage=[{route:'/abdomen/gi/ulkuserkrankung',topicId:'ulkuserkrankung',status:'AUTHOR_READY_INDEPENDENT_REVIEW_PENDING',learningGoals:[{"id":"detection","text":{"de":"Einen möglichen Ulkuskrater gezielt in multiplanaren CT-Rekonstruktionen überprüfen.","en":"Review a possible ulcer crater using targeted multiplanar CT reconstructions.","fa":"حفرهٔ مشکوک اولسر را با بازسازی‌های هدفمند چندصفحه‌ای CT بررسی کنید."},"questionIds":["aq-atv-ulcer-mpr-de"],"cardIds":["aq-atv-ulcer-mpr"]},{"id":"limits","text":{"de":"Bei Ulkus-/Blutungsverdacht die Grenzen einer negativen CT und die Rolle der Endoskopie erklären.","en":"Explain the limits of negative CT and the role of endoscopy when ulcer/bleeding is suspected.","fa":"در شک به اولسر یا خون‌ریزی، محدودیت CT منفی و نقش آندوسکوپی را توضیح دهید."},"questionIds":["ulkuserkrankung-negative-ct-de"],"cardIds":["ulkuserkrankung-negative-ct"]},{"id":"perforation","text":{"de":"Einen Wanddefekt mit extraluminalem Gas als dringlichen Perforationsverdacht kommunizieren.","en":"Communicate a wall defect with extraluminal gas as urgent concern for perforation.","fa":"نقص دیواره همراه گاز خارج لومن را به‌عنوان شک فوری به پرفوراسیون منتقل کنید."},"questionIds":["ulkuserkrankung-perforation-de"],"cardIds":["ulkuserkrankung-perforation"]}]}]


routeCoverage.push(hepaticAmlCoverage)

routeCoverage.push(lowerGiCoverage)

routeCoverage.push(herniaCoverage)

routeCoverage.push(hcaCoverage)
