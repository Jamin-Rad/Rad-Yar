import React from 'react'

const labels = {
  de: { upstream: 'Dilatierter Dünndarm', sign: 'Stuhlähnlicher Inhalt + Gas', transition: 'Übergang', distal: 'Kollabierter Dünndarm', caption: 'Schematische Darstellung, keine CT-Aufnahme.' },
  en: { upstream: 'Dilated small bowel', sign: 'Faecal-like material + gas', transition: 'Transition', distal: 'Collapsed small bowel', caption: 'Schematic illustration; not a CT image.' },
  fa: { upstream: 'روده باریک متسع', sign: 'محتوای مدفوع‌مانند و گاز', transition: 'نقطه گذار', distal: 'روده باریک فروریخته', caption: 'نمای شماتیک آموزشی؛ تصویر CT نیست.' },
}

export default function SmallBowelFecesDiagram({ lang = 'de' }) {
  const t = labels[lang] || labels.de
  const title = `${t.upstream} · ${t.sign} · ${t.transition} · ${t.distal}`
  return <figure style={{ margin: '1.25rem 0 0', border: '1px solid #d8e5ed', borderRadius: 18, overflow: 'hidden', background: '#f7fafc' }}>
    <svg viewBox="0 0 720 270" role="img" aria-label={title} style={{ display: 'block', width: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="270" fill="#f7fafc" />
      <path d="M54 118 C99 75 144 75 185 118 S270 161 312 118 S353 82 386 106" fill="none" stroke="#174f68" strokeWidth="66" strokeLinecap="round" />
      <path d="M54 118 C99 75 144 75 185 118 S270 161 312 118 S353 82 386 106" fill="none" stroke="#d8eff3" strokeWidth="52" strokeLinecap="round" />
      <path d="M427 108 C489 108 546 108 665 108" fill="none" stroke="#174f68" strokeWidth="25" strokeLinecap="round" />
      <path d="M427 108 C489 108 546 108 665 108" fill="none" stroke="#d8eff3" strokeWidth="14" strokeLinecap="round" />
      <g fill="#8d5d41" opacity=".9">
        <circle cx="285" cy="108" r="5"/><circle cx="302" cy="123" r="4"/><circle cx="318" cy="105" r="6"/><circle cx="333" cy="120" r="4"/><circle cx="347" cy="101" r="5"/><circle cx="359" cy="115" r="3.5"/>
      </g>
      <g fill="#fff" stroke="#3987a4" strokeWidth="2.5">
        <circle cx="294" cy="89" r="7"/><circle cx="326" cy="137" r="6"/><circle cx="344" cy="83" r="5"/><circle cx="366" cy="134" r="7"/>
      </g>
      <path d="M405 55v118" stroke="#d66b50" strokeWidth="3" strokeDasharray="7 6" />
      <path d="M396 63l9-13 9 13" fill="none" stroke="#d66b50" strokeWidth="3" strokeLinejoin="round" />
      <g fill="#25465a" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="600" textAnchor="middle">
        <text x="172" y="218">{t.upstream}</text>
        <text x="326" y="244">{t.sign}</text>
        <text x="406" y="36">{t.transition}</text>
        <text x="554" y="218">{t.distal}</text>
      </g>
    </svg>
    <figcaption style={{ padding: '8px 14px', color: '#526777', fontSize: 12, lineHeight: 1.5 }}>{t.caption}</figcaption>
  </figure>
}
