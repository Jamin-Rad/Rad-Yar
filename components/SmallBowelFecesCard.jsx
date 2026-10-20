import React from 'react'
import SmallBowelFecesDiagram from './SmallBowelFecesDiagram'

const copy = {
  de: {
    title: 'Small-Bowel-Feces-Zeichen',
    definition: 'In einer dilatierten Dünndarmschlinge finden sich Gasbläschen und partikulärer, stuhlähnlicher Inhalt. Das Zeichen liegt häufig nahe vor der Übergangszone.',
    meaning: 'Die Lage kann helfen, die Übergangszone zu finden. Das PDF verknüpft das Zeichen mit einem subakuten oder chronischen Verlauf; allein erlaubt es keine verlässliche Aussage über Ischämie oder Behandlungsbedarf.',
    source: 'Abdomen.pdf, physische S. 71 (Druckseite 70). Ergänzend: Mayo-Smith et al., Clin Radiol. 1995;50:765–767, PMID 7489626; Wassef et al., AJR. 2018;210:78–84, PMID 29045179.',
  },
  en: {
    title: 'Small-bowel feces sign',
    definition: 'A dilated small-bowel loop contains gas bubbles mixed with particulate, faeces-like material. The sign is often close to the transition zone.',
    meaning: 'Its location may help identify the transition zone. The PDF associates the sign with a subacute or chronic course; on its own it does not reliably establish ischaemia or treatment need.',
    source: 'Abdomen.pdf, physical p.71 (printed p.70). Additional sources: Mayo-Smith et al., Clin Radiol. 1995;50:765–767, PMID 7489626; Wassef et al., AJR. 2018;210:78–84, PMID 29045179.',
  },
  fa: {
    title: 'علامت مدفوع رودهٔ باریک',
    definition: 'در یک لوپ متسع رودهٔ باریک، محتوای ذره‌ای شبیه مدفوع همراه با حباب‌های گاز دیده می‌شود. این علامت اغلب نزدیک نقطهٔ گذار است.',
    meaning: 'محل علامت می‌تواند به یافتن نقطهٔ گذار کمک کند. PDF آن را با سیر تحت‌حاد یا مزمن مرتبط می‌داند؛ اما این علامت به‌تنهایی ایسکمی یا نیاز درمانی را به‌طور قابل‌اعتماد تعیین نمی‌کند.',
    source: 'Abdomen.pdf، صفحهٔ فیزیکی ۷۱ (صفحهٔ چاپی ۷۰). منابع تکمیلی: Mayo-Smith و همکاران، Clin Radiol. 1995;50:765–767، PMID 7489626؛ Wassef و همکاران، AJR. 2018;210:78–84، PMID 29045179.',
  },
}

export default function SmallBowelFecesCard({ lang = 'de', className }) {
  const c = copy[lang] || copy.de
  return <article className={className}>
    <h3>{c.title}</h3>
    <p>{c.definition}</p>
    <SmallBowelFecesDiagram lang={lang}/>
    <p>{c.meaning}</p>
    <small>{c.source}</small>
  </article>
}
