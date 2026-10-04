'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import LessonIcon from './LessonIcon'
import { L, pick } from './lessonContent'
import s from './page.module.css'

const frames = Array.from({ length: 8 }, (_, index) => `/dissection/case-28441/${String(index + 1).padStart(2, '0')}.jpg`)
const caseUrl = 'https://radiopaedia.org/cases/28441'

export default function CaseViewer({ lang }) {
  const t = value => pick(value, lang)
  const [frame, setFrame] = useState(4)
  const viewport = useRef(null)
  const current = useRef(4)
  const drag = useRef(null)
  const select = useCallback(value => {
    const next = Math.max(0, Math.min(frames.length - 1, value))
    current.current = next
    setFrame(next)
  }, [])

  useEffect(() => {
    const element = viewport.current
    let delta = 0
    let lastEvent = 0
    let lastStep = 0
    const wheel = event => {
      if (event.ctrlKey || !event.deltaY) return
      const now = performance.now()
      const amount = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1)
      const direction = Math.sign(amount)
      const atBoundary = direction < 0 ? current.current === 0 : current.current === frames.length - 1
      if (atBoundary) return
      event.preventDefault()
      if (now - lastEvent > 180 || Math.sign(delta) !== direction) delta = 0
      lastEvent = now
      delta += amount
      if (Math.abs(delta) >= 40 && now - lastStep > 110) {
        select(current.current + direction)
        delta = 0
        lastStep = now
      }
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [select])

  useEffect(() => {
    for (const index of [frame - 1, frame + 1]) {
      if (frames[index]) { const image = new window.Image(); image.src = frames[index] }
    }
  }, [frame])

  const keyDown = event => {
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) select(current.current + 1)
    else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) select(current.current - 1)
    else if (event.key === 'Home') select(0)
    else if (event.key === 'End') select(frames.length - 1)
    else return
    event.preventDefault()
  }
  const startDrag = event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { x: event.clientX, y: event.clientY, frame: current.current, touch: event.pointerType === 'touch' }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const moveDrag = event => {
    if (!drag.current) return
    const start = drag.current
    const distance = start.touch ? start.x - event.clientX : start.y - event.clientY
    select(start.frame + Math.round(distance / 30))
  }
  const endDrag = event => {
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return <article className={s.caseFile} aria-labelledby="case-title" data-no-zoom>
    <header className={s.caseHeader}>
      <h3 id="case-title">Radiopaedia File</h3>
      <a href={caseUrl} target="_blank" rel="noopener noreferrer">{t(L('Originalfall öffnen', 'Open original case', 'باز کردن کیس اصلی'))}<LessonIcon name="external" /></a>
    </header>
    <div className={s.caseGrid}>
      <div className={s.viewer}>
        <div ref={viewport} className={s.viewport} tabIndex={0} role="group" aria-label={t(L('MRI-Bildserie. Mit Pfeiltasten durch die Schichten navigieren.', 'MRI series. Use arrow keys to navigate slices.', 'سکانس MRI. با کلیدهای جهت بین برش‌ها حرکت کنید.'))} onKeyDown={keyDown} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null }}>
          <Image unoptimized src={frames[frame]} alt={t(L(`T1-Fat-Sat-MRT, Schicht ${frame + 1} von 8`, `T1 fat-saturated MRI, slice ${frame + 1} of 8`, `MRI با اشباع چربی، برش ${frame + 1} از ۸`))} width={320} height={320} draggable={false} />
          <div className={s.viewerMeta} dir="ltr"><span>MRI · AXIAL</span><output aria-live="polite">{String(frame + 1).padStart(2, '0')} <span>/ 08</span></output></div>
        </div>
        <div className={s.viewerControls} dir="ltr">
          <button type="button" aria-label={t(L('Vorherige Schicht', 'Previous slice', 'برش قبلی'))} disabled={frame === 0} onClick={() => select(frame - 1)}><LessonIcon name="previous" /></button>
          <input type="range" min="0" max="7" step="1" value={frame} onChange={event => select(Number(event.target.value))} aria-label={t(L('Schicht auswählen', 'Select slice', 'انتخاب برش'))} aria-valuetext={`${frame + 1} / 8`} />
          <button type="button" aria-label={t(L('Nächste Schicht', 'Next slice', 'برش بعدی'))} disabled={frame === 7} onClick={() => select(frame + 1)}><LessonIcon name="next" /></button>
          <p dir={lang === 'fa' ? 'rtl' : 'ltr'}>{t(L('Scrollen, ziehen oder Schieberegler verwenden', 'Scroll, drag or use the slider', 'اسکرول کنید، بکشید یا از اسلایدر استفاده کنید'))}</p>
        </div>
      </div>
      <div className={s.caseNotes}>
        <span className={s.caseId}>rID 28441</span>
        <h4>Crescent sign</h4>
        <strong>{t(L('Dissektion der rechten ACI', 'Right ICA dissection', 'دیسکسیون ICA راست'))}</strong>
        <p>{t(L('T1-Fat-Sat-Sequenz mit sichelförmig hyperintensem Wandhämatom. Verfolge den Befund durch die Schichten.', 'T1 fat-saturated sequence with a crescentic hyperintense mural haematoma. Follow the finding through the slices.', 'سکانس T1 با اشباع چربی و هماتوم دیواره‌ای هلالی و پرسیگنال. یافته را در برش‌های متوالی دنبال کنید.'))}</p>
        <div className={s.caseFocus}><h5>{t(L('Worauf achten?', 'What to look for', 'به چه چیزی توجه کنیم؟'))}</h5><p>{t(L('Vergleiche Gefäßkontur und Wandsignal mit der Gegenseite.', 'Compare the vessel contour and wall signal with the opposite side.', 'کانتور رگ و سیگنال دیواره را با سمت مقابل مقایسه کنید.'))}</p></div>
        <footer>Case courtesy of Ian Bickle, Radiopaedia.org · rID 28441 · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 3.0</a></footer>
      </div>
    </div>
  </article>
}
