export default function Icon({ name, ...props }) {
  const paths = {
    calculator: <><rect x="5" y="2" width="18" height="24" rx="2"/><path d="M9 7h10M9 12h1m4 0h1m4 0h1M9 17h1m4 0h1m4 0h1M9 22h1m4 0h1m4 0h1"/></>,
    brain: <><path d="M14 5c-1-4-7-3-7 1-4-1-6 4-3 7-4 3-1 8 2 8-1 4 5 6 8 2V5Zm0 0c1-4 7-3 7 1 4-1 6 4 3 7 4 3 1 8-2 8 1 4-5 6-8 2"/><path d="M7 6v4l3 2m-4 9 2-5m13-10v4l-3 2m4 9-2-5"/></>,
    lungs: <><path d="M12 3v9L8 9C5 8 1 16 2 23c1 4 9-1 10-3V9m4-6v9l4-3c3-1 7 7 6 14-1 4-9-1-10-3V9M12 11l-3 4m7-4 3 4"/></>,
    breast: <><path d="M7 3c0 5-1 8-3 12-2 6 3 11 10 11s12-5 10-11c-2-4-3-7-3-12"/><circle cx="14" cy="19" r="1.5"/></>,
    abdomen: <><path d="M3 8c2-4 7-5 12-3l10 3c2 1 1 5-2 6l-7 2-6 9c-2 2-6 0-6-3L2 12Z"/><path d="M14 5v9l-4 3"/></>,
    kidney: <><path d="M8 4C2 5 1 14 3 20c2 5 8 4 8 0 0-3-4-3-4-6 0-2 4-3 4-6 0-2-1-4-3-4Zm12 0c6 1 7 10 5 16-2 5-8 4-8 0 0-3 4-3 4-6 0-2-4-3-4-6 0-2 1-4 3-4Z"/><path d="M11 14h2v12m4-12h-2v12"/></>,
    nodes: <><circle cx="14" cy="5" r="4"/><circle cx="5" cy="21" r="4"/><circle cx="23" cy="21" r="4"/><path d="m12 9-5 8m9-8 5 8M9 21h10"/></>,
    spine: <><path d="M10 2h8v5h-8zm-1 10h10v5H9zm1 10h8v4h-8zM7 4H4m17 0h3M7 14H3m18 0h4M8 24H5m15 0h3M12 7v5m4-5v5m-4 5v5m4-5v5"/></>,
    vessel: <><path d="M3 2v8c0 5 7 6 7 11v5m6 0v-5c0-5 9-6 9-11V2M8 2v7c0 4 5 5 5 8 0-3 7-4 7-8V2"/></>,
    heart: <path d="M14 25 4 15C-3 8 7 0 14 8c7-8 17 0 10 7Z"/>,
    home: <><path d="m2 12 12-10 12 10M5 10v16h6v-8h6v8h6V10"/></>,
    search: <><circle cx="12" cy="12" r="8"/><path d="m18 18 8 8"/></>,
    arrow: <path d="M3 14h22m-7-7 7 7-7 7"/>,
    close: <path d="m6 6 16 16M22 6 6 22"/>,
    menu: <path d="M3 6h22M3 14h22M3 22h22"/>,
    reset: <><path d="M4 12a10 10 0 1 1 2 10M4 4v8h8"/></>,
  }
  return <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.calculator}</svg>
}
