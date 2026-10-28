import React from 'react';
const groups=[
 ['Einzelunternehmen','بنگاه انفرادی',['Einzelunternehmung · بنگاه انفرادی']],
 ['Personengesellschaften','شرکت‌های اشخاص',['OHG · تضامنی تجاری','KG · مختلط','Stille Gesellschaft · شریک پنهان','GbR · مدنی','Partnerschaft · مشارکت حرفه‌ای']],
 ['Kapitalgesellschaften','شرکت‌های سرمایه',['GmbH / gGmbH / UG','AG · سهامی','SE · اروپایی']],
 ['Mischformen','شکل‌های ترکیبی',['KGaA · مختلط سهامی','GmbH & Co. KG','AG & Co. KG','Doppelgesellschaft · ساختار دوشرکتی']],
 ['Weitere Formen','سایر شکل‌ها',['Stiftung · بنیاد','Genossenschaft · تعاونی','Verein · انجمن','VVaG · بیمهٔ متقابل']],
 ['Öffentliche Betriebe','بنگاه‌های عمومی',['Regiebetrieb / Eigenbetrieb','Körperschaft · نهاد عضویت‌محور','Anstalt · مؤسسه با استفاده‌کنندگان','Kommunalunternehmen · بنگاه شهرداری']],
];
export default function LegalFormsMap(){return <aside className="legal-forms-map" aria-label="نمودار دسته‌بندی شکل‌های حقوقی"><div className="legal-map-root"><small>RECHTSFORMEN</small><strong>نقشهٔ شکل‌های حقوقی</strong><span>هر شاخه را برای دیدن شکل‌ها باز کن</span></div><div className="legal-map-branches">{groups.map(([de,fa,items])=><details key={de}><summary><span lang="de" dir="ltr">{de}</span><strong>{fa}</strong><i aria-hidden="true">+</i></summary><ul>{items.map(item=><li key={item} dir="auto">{item}</li>)}</ul></details>)}</div></aside>;}
