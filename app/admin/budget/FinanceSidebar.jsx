import Link from 'next/link'
import FinanceIcon from './FinanceIcon'
import styles from './financeWorkspace.module.css'

const views = [
  ['monat', '', 'Monatsübersicht', 'calendar'],
  ['jahr', '', 'Jahresübersicht', 'chart'],
  ['verlauf', '', 'Verlauf', 'trend'],
  ['einstellung', 'kategorien', 'Kategorien', 'category'],
  ['einstellung', 'fixkosten', 'Fixkosten', 'repeat'],
  ['einstellung', 'bericht', 'Bericht', 'file'],
]
const spaces = [
  ['Privat', '/andarun/finanz', 'home'],
  ['Familie Zia', '/andarun/finanz?bereich=familie', 'family'],
  ['Urlaub', '/andarun/urlaub', 'holiday'],
  ['Hilfe', '/andarun/finanz/gefangene', 'heart'],
  ['DigitDA', '/digitda', 'company'],
]

export default function FinanceSidebar({ view, subView, onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <Link href="/andarun" className={styles.brand} aria-label="Yaminova Startseite">Yaminova</Link>
      <nav aria-label="Finanznavigation" className={styles.navigation}>
        <p className={styles.navLabel}>Finanzen</p>
        {views.map(([target, sub, label, icon]) => {
          const active = view === target && (!sub || subView === sub)
          return <button key={label} type="button" className={active ? styles.navActive : styles.navItem} aria-current={active ? 'page' : undefined} onClick={() => onNavigate(target, sub)}><FinanceIcon name={icon} /><span>{label}</span></button>
        })}
        <button type="button" className={styles.navItem} onClick={() => onNavigate('einstellung', 'kategorien')}><FinanceIcon name="settings" /><span>Einstellungen</span></button>
      </nav>
      <nav aria-label="Finanzbereiche" className={styles.spaces}>
        <p className={styles.navLabel}>Finanzbereiche</p>
        {spaces.map(([label, href, icon]) => <Link key={label} href={href} className={label === 'Privat' ? styles.navActive : styles.navItem}><FinanceIcon name={icon} /><span>{label}</span></Link>)}
      </nav>
    </aside>
  )
}
