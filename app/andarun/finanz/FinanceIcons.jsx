const shapes = {
  wallet: <><path d="M4 6V4a2 2 0 0 1 2-2h11v4" /><rect x="3" y="6" width="18" height="15" rx="3" /><path d="M16 11h5v5h-5zM18 13.5h.01" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  left: <path d="m15 6-6 6 6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
  down: <path d="m6 9 6 6 6-6" />,
  home: <><path d="m3 10 9-7 9 7M5 9v12h14V9" /><path d="M9 21v-8h6v8" /></>,
  cart: <><path d="M3 3h2l3 12h11l2-9H6M8 18h11" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
  car: <><path d="m5 8 2-5h10l2 5M3 13l2-5h14l2 5v6H3v-6M6 19v2M18 19v2M6 13h2M16 13h2" /></>,
  person: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>,
  tag: <><path d="m21 13-8 8L3 11V3h8l10 10Z" /><path d="M7 7h.01" /></>,
  chart: <><path d="M5 20V12M12 20V4M19 20V8" /><circle cx="5" cy="10" r="1" /><circle cx="12" cy="2" r="1" /><circle cx="19" cy="6" r="1" /></>,
  trend: <path d="m4 18 15-14M10 4h9v9" />,
  check: <path d="m5 12 4 4L19 6" />,
  search: <><circle cx="10" cy="10" r="7" /><path d="m16 16 5 5" /></>,
  edit: <><path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6Z" /></>,
  trash: <><path d="M3 6h18M8 6V3h8v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6M17 2v6M3 10h18" /></>,
  print: <><path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v7H6zM17 11h.01" /></>,
  arrowUp: <path d="M12 20V4m-6 6 6-6 6 6" />,
  arrowDown: <path d="M12 4v16m-6-6 6 6 6-6" />,
}
export function iconForCategory(name = '') {
  if (/Lebensmittel|Restaurant/.test(name)) return 'cart'
  if (/Auto|Transport/.test(name)) return 'car'
  if (/Hause|Wohnen/.test(name)) return 'home'
  if (/Mobin|Mobina/.test(name)) return 'phone'
  if (/Einkommen|Andere/.test(name)) return 'wallet'
  if (/Jamin|Fatima|Eltern|Hossein|Mohsen/.test(name)) return 'person'
  return 'tag'
}
export default function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] || shapes.tag}</svg>
}
