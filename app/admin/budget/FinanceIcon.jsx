const paths = {
  plus: 'M12 5v14M5 12h14', close: 'm6 6 12 12M18 6 6 18',
  chevron: 'm6 9 6 6 6-6',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  wallet: 'M3 7V5a2 2 0 0 1 2-2h13v4M3 7h17v14H5a2 2 0 0 1-2-2V7ZM15 11h5v6h-5z',
  home: 'm3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',
  shopping: 'M3 3h2l3 12h11l3-9H6M9 21h.01M18 21h.01M8 18h11',
  car: 'm5 7 2-4h10l2 4M3 12l2-5h14l2 5v7H3v-7ZM6 19v2M18 19v2M6 12h2M16 12h2',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M13 3a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  tag: 'M20 13 11 22 2 13V2h11l9 9-2 2ZM7 7h.01',
  chart: 'M4 21V10h4v11M10 21V3h4v18M16 21v-8h4v8',
  receipt: 'M5 3h14v18l-3-2-4 2-4-2-3 2V3ZM8 7h8M8 11h8M8 15h4',
  calendar: 'M4 5h16v16H4V5ZM8 2v6M16 2v6M4 10h16',
  check: 'm5 12 4 4L19 6', note: 'M5 3h14v18H5V3ZM8 7h8M8 11h8M8 15h5',
  trend: 'm3 17 6-6 4 4 8-10M15 5h6v6',
  settings: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
}
export function categoryIcon(name = '') {
  if (/Lebensmittel|Restaurant/i.test(name)) return 'shopping'
  if (/Auto|Transport/i.test(name)) return 'car'
  if (/Hause|Wohnen/i.test(name)) return 'home'
  if (/Einkommen|Andere/i.test(name)) return 'wallet'
  if (/Jamin|Fatima|Mobin|Eltern|Kinder|Hossein|Mohsen/i.test(name)) return 'people'
  return 'tag'
}
export default function FinanceIcon({ name = 'tag', size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.tag} /></svg>
}
