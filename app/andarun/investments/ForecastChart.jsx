import { trendForecast } from '@/lib/investments/trend-forecast.mjs'
import styles from './ForecastChart.module.css'

const format = new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 })

export default function ForecastChart({ rows, intraday = false, currency }) {
  const horizon = intraday ? 4 : 20
  const forecast = trendForecast(rows, { horizon, window: intraday ? 32 : 50 })
  if (!forecast) return <p role="status">کندل‌های کامل برای آزمون مدل و محاسبهٔ دامنهٔ پیش‌بینی کافی نیستند.</p>
  const history = rows.slice(intraday ? -40 : -75)
  const candleWidth = Math.min(9, 390/(history.length+horizon))
  const hasCandles = history.every(row=>[row.open,row.high,row.low].every(Number.isFinite))
  const { points } = forecast
  const last = history.length - 1
  const values = [...history.flatMap(row=>[row.close,row.high ?? row.close,row.low ?? row.close]),...points.flatMap(point=>[point.low,point.high])]
  const minimum = Math.min(...values), maximum = Math.max(...values)
  const padding = (maximum - minimum) * .08 || maximum * .01
  const x = i => 14 + i * 600 / (last + horizon)
  const y = price => 216 - (price - minimum + padding) * 199 / (maximum - minimum + 2 * padding)
  const trace = (data, key, offset = 0) => data.map((point,i)=>`${i?'L':'M'}${x(i+offset)},${y(point[key])}`).join(' ')
  const fan = trace(points,'high',last) + [...points].reverse().map((point,i)=>`L${x(last+horizon-i)},${y(point.low)}`).join(' ') + ' Z'
  const terminal = points.at(-1)
  const asOf = history.at(-1).date
  return <section className={styles.forecast} aria-label="پیش‌بینی روند">
    <div className={styles.summary}>
      <strong>پیش‌بینی {intraday?'۴ کندل ۱۵ دقیقه‌ای':'۲۰ جلسهٔ معاملاتی'}</strong>
      <span>{forecast.useTrend?'روند با شیب کاهنده':'مدل پایه: آخرین قیمت'}</span>
      <span>داده تا <bdi>{intraday ? asOf.slice(0,16).replace('T',' ') + ' UTC' : asOf}</bdi></span>
      <span>دامنهٔ تجربی ۸۰٪ <bdi>{format.format(terminal.low)} – {format.format(terminal.high)} {currency}</bdi></span>
    </div>
    <svg viewBox="0 0 700 245" role="img" aria-label="تاریخچه و مسیر برآوردی با دامنهٔ عدم‌قطعیت">
      {[0,.25,.5,.75,1].map(step=>{
        const value=minimum+(maximum-minimum)*step
        return <g key={step}><line x1="14" x2="614" y1={y(value)} y2={y(value)} stroke="#293746"/><text x="628" y={y(value)+4}>{format.format(value)}</text></g>
      })}
      {hasCandles ? history.map((row,i)=>{
        const color=row.close>=row.open?'#53d6ae':'#fb8092'
        return <g key={row.date}><line x1={x(i)} x2={x(i)} y1={y(row.high)} y2={y(row.low)} stroke={color}/><rect x={x(i)-candleWidth/2} y={Math.min(y(row.open),y(row.close))} width={candleWidth} height={Math.max(1,Math.abs(y(row.open)-y(row.close)))} fill={color}/></g>
      }) : <path d={trace(history,'close')} fill="none" stroke="#b7c7db" strokeWidth="1.6" vectorEffect="non-scaling-stroke"/>}
      <line x1={x(last)} x2={x(last)} y1="12" y2="225" stroke="#7c90aa" strokeDasharray="3 5"/>
      <path d={fan} fill="#5399d9" opacity=".24"/>
      <path d={trace(points,'mid',last)} fill="none" stroke="#80d4ff" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/>
      <text x={x(last)} y="238" textAnchor="end">آخرین کندل</text>
      <text x="613" y="238" textAnchor="end">پایان افق</text>
    </svg>
    <p>میانگین خطای آزمون در همین افق <bdi>{format.format(forecast.error)} {currency}</bdi> · مدل پایه <bdi>{format.format(forecast.baselineError)} {currency}</bdi></p>
  </section>
}
