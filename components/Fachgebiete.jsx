'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './Fachgebiete.module.css'

const FACH_DATA = [
  {
    key: 'Neuroradiologie',
    img: '/fach/neuroradiologie.png',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#1a1040,#2d1b69)',
    available: false,
    description: 'Gehirn, Rückenmark, Schädel & Wirbelsäule',
    topics: ['Schlaganfall', 'Tumoren', 'Multiple Sklerose', 'Trauma', 'Gefäße'],
  },
  {
    key: 'Hals',
    img: '/fach/hals.png',
    color: '#2563eb',
    bg: 'linear-gradient(135deg,#0c1f40,#142d5a)',
    available: false,
    description: 'Schilddrüse, Lymphknoten, Larynx & Pharynx',
    topics: ['Schilddrüsentumoren', 'Lymphome', 'Larynxkarzinom', 'Abszesse'],
  },
  {
    key: 'Thorax',
    img: '/fach/thorax.png',
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg,#0c2340,#0c3460)',
    available: false,
    description: 'Lunge, Herz, Mediastinum & Pleura',
    topics: ['Pneumonie', 'Lungenembolie', 'Tumor', 'Herzinsuffizienz', 'Pneumothorax'],
  },
  {
    key: 'Brust',
    img: '/fach/brust.png',
    color: '#db2777',
    bg: 'linear-gradient(135deg,#2a0a20,#420c2e)',
    available: false,
    description: 'Mammographie, Sonographie & MRT der Brust',
    topics: ['Mammakarzinom', 'Mastopathie', 'Fibroadenom', 'BIRADS'],
  },
  {
    key: 'Abdomen',
    img: '/fach/abdomen.png',
    color: '#10b981',
    bg: 'linear-gradient(135deg,#0d2818,#14401e)',
    available: false,
    description: 'Leber, Milz, Niere, Pankreas & GI-Trakt',
    topics: ['Leberzirrhose', 'Pankreatitis', 'Nierensteine', 'Appendizitis', 'Tumoren'],
  },
  {
    key: 'Becken',
    img: '/fach/becken.png',
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#2a0a10,#3d1020)',
    available: false,
    description: 'Hüfte, Blase, Prostata & gynäkologische Organe',
    topics: ['Prostatakarzinom', 'Zervixkarzinom', 'Hüftarthrose', 'Blasentumoren'],
  },
  {
    key: 'Muskuloskelettales',
    img: '/fach/muskuloskeletal.png',
    color: '#d97706',
    bg: 'linear-gradient(135deg,#2a1a00,#3d2800)',
    available: true,
    description: 'Knochen, Gelenke, Muskulatur & Weichteile',
    topics: ['Frakturen', 'Arthrose', 'Tumoren', 'Osteochondrose', 'Sportverletzungen'],
    links: [
      { label: 'Knie – Meniskus',      href: '/msk/knie/meniskus',      ready: true  },
      { label: 'Knie – Kreuzbänder',   href: '/msk/knie/kreuzbaender',  ready: false },
      { label: 'Schulter',             href: '/msk/schulter',           ready: false },
    ],
  },
  {
    key: 'Technik & Physik',
    img: '/fach/technik.png',
    color: '#059669',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    available: true,
    description: 'Physikalische Grundlagen · Kontrastmittel · Protokolle',
    topics: ['Kontrastmittel', 'MRT-Physik', 'CT-Technik', 'Strahlenschutz'],
    links: [
      { label: 'Kontrastmittel', href: '/technik/kontrastmittel', ready: true  },
      { label: 'MRT-Physik',     href: '/technik/mrt',            ready: false },
      { label: 'CT-Technik',     href: '/technik/ct',             ready: false },
      { label: 'Strahlenschutz', href: '/technik/strahlenschutz', ready: false },
    ],
  },
]

export default function Fachgebiete() {
  const { texts } = useLanguage()
  const [selected, setSelected] = useState(null)
  const fach = selected ? FACH_DATA.find(f => f.key === selected) : null

  return (
    <section className={styles.section} id="fachgebiete">
      <div className="sLabel">{texts.section2Label}</div>
      <h2 className="sTitle">{texts.section2Title}</h2>
      <p className="sSub">{texts.section2Sub}</p>

      <div className={styles.grid}>
        {FACH_DATA.map((f) => (
          <div key={f.key} className={styles.card}
            style={{ background: f.bg }}
            onClick={() => setSelected(f.key)}>

            {/* Image */}
            <div className={styles.imgWrap}>
              <Image
                src={f.img}
                alt={f.key}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              {f.available && (
                <span className={styles.liveBadge}>✓ Verfügbar</span>
              )}
            </div>

            {/* Label */}
            <div className={styles.body}>
              <div className={styles.name} style={{ color: f.color }}>
                {texts.fachNames[f.key]}
              </div>
              <div className={styles.status}>
                {f.available ? '→ Inhalte ansehen' : texts.fachStatus}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {selected && fach && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>

            {/* Modal header with image */}
            <div className={styles.modalHead} style={{ background: fach.bg }}>
              <div className={styles.modalImgWrap}>
                <Image src={fach.img} alt={fach.key} fill
                  style={{ objectFit: 'cover', objectPosition: 'center top', opacity: .85 }} />
                <div className={styles.modalImgGradient} />
              </div>
              <div className={styles.modalHeadContent}>
                <div className={styles.modalTitle} style={{ color: fach.color }}>
                  {texts.fachNames[fach.key]}
                </div>
                <div className={styles.modalDesc}>{fach.description}</div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>

            {/* Modal body */}
            <div className={styles.modalBody}>
              {fach.available ? (
                <>
                  <div className={styles.modalLabel}>Verfügbare Inhalte</div>
                  <div className={styles.linkList}>
                    {fach.links?.map(link => (
                      link.ready
                        ? <Link key={link.label} href={link.href} className={styles.linkItem}
                            onClick={() => setSelected(null)}>
                            <span className={styles.linkIcon}>📄</span>
                            <div>
                              <div className={styles.linkName}>{link.label}</div>
                              <div className={styles.linkMeta}>Jetzt lesen</div>
                            </div>
                            <span className={styles.linkArr}>→</span>
                          </Link>
                        : <div key={link.label} className={`${styles.linkItem} ${styles.linkLocked}`}>
                            <span className={styles.linkIcon}>🔒</span>
                            <div>
                              <div className={styles.linkName}>{link.label}</div>
                              <div className={styles.linkMeta}>In Vorbereitung</div>
                            </div>
                          </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.modalLabel}>Themen</div>
                  <div className={styles.chips}>
                    {fach.topics.map(t => (
                      <span key={t} className={styles.chip}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.soon}>
                    <span>🚧</span>
                    <span>Inhalte werden vorbereitet – bald verfügbar!</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
