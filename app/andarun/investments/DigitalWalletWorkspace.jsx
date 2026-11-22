import Icon from './InvestmentIcon'
import view from './AccountView.module.css'

export default function DigitalWalletWorkspace({className = view.wallet}){return <section className={className}><Icon name="wallet" size={44}/><h2>کیف پول دیجیتال</h2><p>موجودی رمزارزها هنوز وارد نشده است.</p></section>}
