import React from 'react'

const L = (de, en, fa) => ({ de, en, fa })

export default function PulmonaryHypertensionDiagram({ lang = 'de' }) {
  const label = (de, en, fa) => L(de, en, fa)[lang] || de
  return <svg viewBox="0 0 760 330" role="img" aria-labelledby="ph-figure-title ph-figure-desc">
    <title id="ph-figure-title">{label('CT-Hinweise bei pulmonaler Hypertonie', 'CT clues in pulmonary hypertension', 'شماتیک سرنخ‌های CT در پرفشاری ریوی')}</title>
    <desc id="ph-figure-desc">{label('Vereinfachte axiale Darstellung von Pulmonalarterie, Aorta und rechtem Ventrikel; keine diagnostische Aufnahme.', 'Simplified axial view of pulmonary artery, aorta and right ventricle; not a diagnostic image.', 'نمای شماتیک محوری از شریان ریوی، آئورت و بطن راست؛ تصویر تشخیصی واقعی نیست.')}</desc>
    <rect x="5" y="5" width="750" height="320" rx="28" fill="#101b2d" />
    <ellipse cx="350" cy="130" rx="100" ry="78" fill="#19384b" stroke="#67d2d0" strokeWidth="4" />
    <ellipse cx="490" cy="132" rx="72" ry="67" fill="#49324a" stroke="#f5afce" strokeWidth="4" />
    <text x="350" y="136" fill="white" fontSize="22" textAnchor="middle">PA</text>
    <text x="490" y="138" fill="white" fontSize="22" textAnchor="middle">Ao</text>
    <path d="M330 216c25-30 62-32 92-10 31 23 30 51 4 67-25 15-74 8-96-13-13-13-13-29 0-44Z" fill="#ab496e" stroke="#ffc1d1" strokeWidth="4" />
    <text x="378" y="260" fill="white" fontSize="17" textAnchor="middle">RV</text>
    <path d="M270 72H140m-15 0 15-12m-15 12 15 12M566 87h95" stroke="#f5cf72" strokeWidth="4" strokeLinecap="round" />
    <text x="110" y="54" fill="#f5cf72" fontSize="17" textAnchor="middle">PA / Ao &gt; 0.9</text>
    <text x="646" y="76" fill="#f5cf72" fontSize="14" textAnchor="middle">{label('Rechtsherzvergrößerung', 'Right-heart enlargement', 'بزرگی قلب راست')}</text>
    <text x="380" y="310" fill="#c5d6ef" fontSize="15" textAnchor="middle">{label('Lehrschema · keine Patientendaten', 'Teaching schematic · no patient data', 'شماتیک آموزشی · بدون دادهٔ بیمار')}</text>
  </svg>
}

export function PulmonaryHypertensionFigureCaption({ lang = 'de' }) {
  return ({
    de: 'Nichtdiagnostisches Lehrschema: Pulmonalarterienweite, PA/Ao-Verhältnis und rechtes Herz gemeinsam beurteilen. Keines davon ist allein diagnostisch.',
    en: 'Non-diagnostic teaching schematic: assess pulmonary-artery enlargement, PA/Ao ratio and right-heart size together. None is diagnostic alone.',
    fa: 'شماتیک آموزشیِ غیرتشخیصی: شریان ریوی بزرگ، نسبت PA/Ao و بزرگی قلب راست را با هم بررسی کنید. هیچ‌کدام به‌تنهایی تشخیص نیست.',
  })[lang] || 'Non-diagnostic teaching schematic.'
}
