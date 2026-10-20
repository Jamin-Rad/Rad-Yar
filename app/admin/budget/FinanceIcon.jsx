export default function FinanceIcon({ name, ...props }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18" /></>,
    chart: <><path d="M4 21V10h4v11m4 0V3h4v18m4 0V7" /></>,
    trend: <><path d="m3 17 6-6 4 3 8-9m-6 0h6v6" /></>,
    category: <><path d="M12 3v9h9" /><path d="M21 15a9 9 0 1 1-12-12M15 3a9 9 0 0 1 6 6h-6Z" /></>,
    repeat: <><path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3" /></>,
    file: <><path d="M5 3h9l5 5v13H5Zm9 0v6h5M8 13h8m-8 4h8" /></>,
    settings: <><path d="m9 3-1 3-3 1-2 4 2 2v3l3 2 1 3h6l1-3 3-2v-3l2-2-2-4-3-1-1-3Z" /><circle cx="12" cy="12" r="3" /></>,
    family: <><circle cx="9" cy="7" r="3" /><path d="M2 21v-4a7 7 0 0 1 14 0v4m1-17a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" /></>,
    holiday: <><path d="M3 11c0-10 18-10 18 0H3Zm9-8v18m-4 0h8M12 3c-4 2-4 6-4 8m4-8c4 2 4 6 4 8" /></>,
    heart: <><path d="M20.5 4.5a5 5 0 0 0-7 0L12 6l-1.5-1.5a5 5 0 0 0-7 7L12 20l8.5-8.5a5 5 0 0 0 0-7Z" /></>,
    company: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12h18m-12 0v3h6v-3" /></>,
    cart: <><path d="M2 3h3l3 13h11l3-10H6" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></>,
    car: <><path d="m4 9 2-6h12l2 6m-17 0h18v9H3Zm2 9v3m14-3v3M6 13h2m8 0h2" /></>,
    food: <><path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18m11 0V3c-4 1-4 9 0 9" /></>,
    more: <><circle cx="4" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="20" cy="12" r="1" /></>,
    arrow: <path d="m9 5 7 7-7 7" />,
    plus: <path d="M12 4v16M4 12h16" />,
  }
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.more}</svg>
}

export function categoryIcon(name) {
  if (/wohnen|hause|miete/i.test(name)) return 'home'
  if (/lebensmittel|einkauf/i.test(name)) return 'cart'
  if (/mobil|auto|transport/i.test(name)) return 'car'
  if (/restaurant|freizeit|essen/i.test(name)) return 'food'
  if (/gehalt|arbeit|einkommen|verdienst/i.test(name)) return 'company'
  if (/jamin|fatima|mobin|familie/i.test(name)) return 'family'
  return 'more'
}
