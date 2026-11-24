'use client'

import { memo, useId, useRef, useState } from 'react'
import styles from './IndicatorGuide.module.css'
import Icon from './InvestmentIcon'

const lessons = [
  { id:'average', name:'میانگین‌ها', question:'روند به کدام سمت حرکت می‌کند؟', intro:'میانگین متحرک نوسان‌های کوچک را هموار می‌کند تا جهت کلی حرکت را آسان‌تر ببینی. عدد کنار نام آن تعداد کندل‌های محاسبه است.', look:'شیب خط، جای قیمت نسبت به خط و ترتیب میانگین کوتاه و بلند را کنار هم بخوان.', meaning:'قیمت بالای میانگین صعودی با روند رو به بالا سازگار است. عبورهای پیاپی از میانگین تقریباً افقی معمولاً نشان‌دهندهٔ بازار کم‌جهت است.', example:'SMA 50 میانگین قیمت پایانی ۵۰ کندل است. EMA 20 به کندل‌های جدید وزن بیشتری می‌دهد و سریع‌تر واکنش نشان می‌دهد. در تایم‌فریم روزانه، هر کندل یک روز معاملاتی است.', limit:'میانگین از قیمت‌های گذشته ساخته می‌شود و تغییر روند را با تأخیر نشان می‌دهد. تقاطع دو میانگین به‌تنهایی تأیید کافی برای ورود نیست.', formula:'SMA(n) = مجموع قیمت پایانی n کندل ÷ n', color:'#eac477' },
  { id:'rsi', name:'RSI و واگرایی', question:'قدرت حرکت قیمت چقدر است؟', intro:'RSI شدت رشدها و افت‌های اخیر را به عددی بین صفر و صد تبدیل می‌کند. در این نمودار دورهٔ ۱۴ کندلی استفاده می‌شود.', look:'ناحیه‌های ۳۰ و ۷۰، جهت RSI و تفاوت حرکت آن با قله‌ها و کف‌های قیمت را ببین.', meaning:'بالای ۷۰ یعنی رشدهای اخیر غالب بوده‌اند و زیر ۳۰ یعنی افت‌ها غالب بوده‌اند. در روند قوی، RSI می‌تواند مدت زیادی در همین ناحیه‌ها بماند.', example:'قیمت کف تازه‌ای در ۹۴ می‌سازد، در حالی که کف قبلی ۹۶ بوده است. اگر RSI هم‌زمان از کف ۲۴ به کف ۳۲ برسد، واگرایی صعودی شکل گرفته است. واگرایی نزولی حالت عکس در قله‌هاست.', limit:'نشان پیکان مورب در سایت پس از تأیید قله یا کف با سه کندل بعدی ظاهر می‌شود. با انتخابش خط‌های قیمت و RSI را می‌بینی. زمان تأیید از زمان نقطهٔ واگرایی دیرتر است و برگشت قیمت قطعی نیست.', formula:'RSI = 100 − 100 ÷ (1 + میانگین رشد ÷ میانگین افت)', color:'#a6d6cc' },
  { id:'atr', name:'ATR', question:'نوسان معمول هر کندل چقدر است؟', intro:'ATR میانگین دامنهٔ واقعی حرکت را اندازه می‌گیرد. دامنهٔ واقعی، فاصلهٔ سقف و کف و شکاف نسبت به قیمت پایانی قبلی را در نظر می‌گیرد.', look:'عدد ATR با واحد قیمت نماد نمایش داده می‌شود. تغییر آن نسبت به کندل‌های قبلی را بررسی کن.', meaning:'ATR بالاتر یعنی دامنهٔ نوسان بیشتر. از خود این عدد نمی‌توان جهت صعود یا نزول را فهمید.', example:'اگر ATR برابر ۰٫۸ دلار و فاصلهٔ یک حد ضرر آزمایشی ۱٫۶ دلار باشد، این فاصله ۲ برابر ATR است. با تغییر تایم‌فریم هر دو عدد را دوباره مقایسه کن.', limit:'این نسبت ابزار مقایسه است. تعیین اندازهٔ موقعیت و حد ضرر به ریسک حساب، شرایط بازار و هزینه‌ها هم وابسته است. ATR قیمت احتمالی خروج را تضمین نمی‌کند.', formula:'TR = بیشینهٔ (سقف−کف، |سقف−پایانی قبلی|، |کف−پایانی قبلی|)', color:'#dfba75' },
  { id:'vwap', name:'VWAP', question:'معاملات پرحجم بیشتر در چه قیمتی انجام شده‌اند؟', intro:'VWAP میانگین قیمت با وزن حجم است. کندلی که حجم بیشتری دارد، اثر بیشتری بر خط می‌گذارد.', look:'جای قیمت نسبت به خط و شیب خود خط را ببین. نقطهٔ شروع محاسبه برای تفسیر آن مهم است.', meaning:'قیمت بالای VWAP یعنی بالاتر از میانگین وزنی دوره معامله می‌شود. این رابطه به‌تنهایی معنای گران یا ارزان بودن بنیادی سهم را ندارد.', example:'اگر حجم ۱۰۰ واحد در قیمت ۱۰ و حجم ۳۰۰ واحد در قیمت ۱۲ باشد، میانگین وزنی ۱۱٫۵ است. میانگین سادهٔ آن دو قیمت ۱۱ می‌شود.', limit:'در نمودار روزانهٔ این سایت محاسبه از ابتدای تاریخچهٔ موجود است. در نمودار درون‌روزی از شروع روز UTC بازنشانی می‌شود. حجم OIL مربوط به قرارداد مرجع برنت است. حجم ناقص یا ناموجود می‌تواند محاسبه را محدود کند.', formula:'VWAP = Σ(قیمت نمونهٔ کندل × حجم) ÷ Σحجم', color:'#e0a0da' },
  { id:'macd', name:'MACD', question:'قدرت روند در حال بیشترشدن است یا کمترشدن؟', intro:'MACD اختلاف EMA 12 و EMA 26 است. خط سیگنال میانگین نمایی ۹ دوره‌ای MACD و میله‌ها اختلاف این دو خط هستند.', look:'جای دو خط نسبت به صفر، تقاطع آن‌ها و بزرگ یا کوچک‌شدن میله‌ها را با هم ببین.', meaning:'MACD مثبت یعنی میانگین کوتاه بالاتر از میانگین بلند است. کوچک‌شدن میله‌های مثبت یعنی فاصلهٔ MACD از سیگنال کم شده، حتی اگر قیمت هنوز بالا برود.', example:'اگر MACD برابر ۰٫۶ و سیگنال ۰٫۴ باشد، میلهٔ هیستوگرام ۰٫۲ است. اگر کندل بعدی این فاصله به ۰٫۱ برسد، شتاب نسبت به سیگنال کمتر شده است.', limit:'در بازار رفت‌وبرگشتی تقاطع‌های متعدد ایجاد می‌شود. MACD و میانگین‌ها اطلاعات مرتبطی دارند و چند علامت هم‌زمان از آن‌ها لزوماً تأیید مستقل نیست.', formula:'MACD = EMA(12) − EMA(26) | Histogram = MACD − Signal', color:'#83baff' },
  { id:'bands', name:'بولینگر', question:'قیمت نسبت به دامنهٔ اخیر کجا قرار دارد؟', intro:'یک میانگین ۲۰ کندلی با دو باند در فاصلهٔ دو انحراف معیار نمایش داده می‌شود. فاصلهٔ باندها همراه با پراکندگی قیمت تغییر می‌کند.', look:'عرض باندها، شیب خط میانی و جای قیمت را بررسی کن. نوار لغزندهٔ شکل را حرکت بده تا اثر نوسان را ببینی.', meaning:'جمع‌شدن باندها یعنی نوسان اخیر کمتر و بازشدنشان یعنی نوسان بیشتر شده است. این تغییر جهت حرکت بعدی را مشخص نمی‌کند.', example:'اگر میانگین ۱۰۰ و انحراف معیار ۲ باشد، باندها ۹۶ و ۱۰۴ هستند. با انحراف معیار ۴، باندها به ۹۲ و ۱۰۸ می‌رسند.', limit:'برخورد با باند بالا الزاماً علامت فروش و برخورد با باند پایین الزاماً علامت خرید نیست. قیمت در روند قوی می‌تواند در امتداد یک باند حرکت کند.', formula:'باندها = SMA(20) ± 2 × انحراف معیار 20 کندل', color:'#96a9da' },
]

function TeachingChart({ lesson }) {
  const [amplitude, setAmplitude] = useState(18)
  const wave = Array.from({ length:45 }, (_,i)=>({ x:20+i*10, y:110-i*.65+Math.sin(i*.55)*amplitude }))
  const path = wave.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ')
  return <figure className={styles.figure}>
    <svg viewBox="0 0 480 210" role="img" aria-label={`شکل آموزشی ${lesson.name}`}>
      <path d="M20 20V170H460" fill="none" stroke="#586373"/>
      {[50,90,130].map(y=><line key={y} x1="20" x2="460" y1={y} y2={y} stroke="#303944"/>)}
      {lesson.id==='bands'&&<><path d={`M20 ${110-amplitude*2}L460 ${81-amplitude*2}L460 ${81+amplitude*2}L20 ${110+amplitude*2}Z`} fill="#96a9da" opacity=".18"/><path d={`M20 ${110-amplitude*2}L460 ${81-amplitude*2}M20 ${110+amplitude*2}L460 ${81+amplitude*2}`} stroke={lesson.color} fill="none"/></>}
      {lesson.id==='rsi'?<><path d="M30 40L150 80L240 50L360 110" stroke="#d69aa7" fill="none" strokeWidth="3"/><path d="M30 145L150 175L240 140L360 155" stroke={lesson.color} fill="none" strokeWidth="3"/><path d="M150 80L360 110M150 175L360 155" stroke="#f2d384" strokeDasharray="6 4"/><text x="375" y="100" fill="#d69aa7">Price ↓</text><text x="375" y="160" fill={lesson.color}>RSI ↑</text></>:<><path d={path} stroke="#dae2ed" strokeWidth="2" fill="none"/>
      {['average','vwap','bands'].includes(lesson.id)&&<path d="M20 110C140 110 220 83 460 81" fill="none" stroke={lesson.color} strokeWidth="3"/>}
      {lesson.id==='atr'&&<><path d={`M250 ${95-amplitude}h15m-7 0v${amplitude*2}m-8 0h15`} stroke={lesson.color} strokeWidth="3"/><text x="280" y="165" fill={lesson.color}>Range</text></>}
      {lesson.id==='macd'&&<>{wave.map((p,i)=><rect key={i} x={p.x} y={Math.min(185,185-Math.sin(i*.3)*18)} width="5" height={Math.abs(Math.sin(i*.3)*18)} fill={i%20<10?'#77bea2':'#ca8292'}/>)}<path d="M20 175Q140 140 240 175T460 175" fill="none" stroke={lesson.color}/></>}
      </>}
    </svg>
    <figcaption>شکل آموزشی با دادهٔ ساختگی · {lesson.id==='rsi'?'دو کف قیمت پایین‌تر، دو کف RSI بالاتر':'رنگ روشن نمای قیمت و رنگ تأکیدی مربوط به اندیکاتور است.'}</figcaption>
    {lesson.id!=='rsi'&&<label>دامنهٔ نوسان نمونه <input type="range" min="5" max="30" value={amplitude} onChange={event=>setAmplitude(Number(event.target.value))}/></label>}
  </figure>
}

function IndicatorGuide() {
  const titleId = useId()
  const dialog = useRef(null)
  const [selected, setSelected] = useState('average')
  const lesson = lessons.find(item=>item.id===selected)
  return <>
    <button type="button" title="راهنمای اندیکاتورها" aria-label="راهنمای اندیکاتورها" onClick={()=>dialog.current.showModal()}><Icon name="help" size={17}/></button>
    <dialog ref={dialog} className={styles.dialog} dir="rtl" aria-labelledby={titleId} onClick={event=>{if(event.target===event.currentTarget)event.currentTarget.close()}}>
      <header><h2 id={titleId}>خواندن نمودار، قدم‌به‌قدم</h2><button type="button" onClick={()=>dialog.current.close()} aria-label="بستن راهنمای اندیکاتورها">×</button></header>
      <nav aria-label="موضوع آموزش">{lessons.map(item=><button key={item.id} type="button" aria-pressed={selected===item.id} onClick={()=>setSelected(item.id)}>{item.name}</button>)}</nav>
      <article style={{'--accent':lesson.color}}>
        <h3>{lesson.question}</h3><p>{lesson.intro}</p>
        <TeachingChart key={lesson.id} lesson={lesson}/>
        <dl>{[['چه چیزی را ببینم؟',lesson.look],['چه معنایی دارد؟',lesson.meaning],['مثال عددی',lesson.example],['محدودیت تفسیر',lesson.limit]].map(([title,body])=><div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
        <details><summary>فرمول محاسبه</summary><p dir="auto">{lesson.formula}</p></details>
        <p>تغییر تایم‌فریم دورهٔ محاسبه را تغییر می‌دهد. همهٔ اندیکاتورها از دادهٔ موجود ساخته می‌شوند و همراه با دکمهٔ به‌روزرسانی دادهٔ تازه می‌گیرند.</p>
        <a href="https://www.fidelity.com/learning-center/trading-investing/technical-analysis" target="_blank" rel="noreferrer">مطالعهٔ بیشتر در راهنمای Fidelity</a>
      </article>
    </dialog>
  </>
}
export default memo(IndicatorGuide)
