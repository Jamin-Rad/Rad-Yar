export default function LessonIcon({ name, ...props }) {
  const paths = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    back: <path d="M20 12H4m6-6-6 6 6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    previous: <path d="m14 5-7 7 7 7" />,
    next: <path d="m10 5 7 7-7 7" />,
    plus: <path d="M5 12h14M12 5v14" />,
    check: <><circle cx="12" cy="12" r="9" /><path d="m7.5 12 3 3 6-6" /></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
    external: <><path d="M14 3h7v7m0-7L10 14" /><path d="M10 5H4v16h16v-7" /></>,
    scan: <><circle cx="12" cy="10" r="8" /><circle cx="12" cy="10" r="4" /><path d="M8 15v7h8v-7M10 2h4" /></>,
    vessel: <><path d="M10 2v7L4 15v7M14 2v7l6 6v7M8 22v-5l4-4 4 4v5M2 10l5 1M22 10l-5 1" /></>,
    message: <path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-.8L3 21l1.8-5A9 9 0 1 1 21 11Z" />,
    play: <path d="m8 4 12 8-12 8V4Z" />,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>
}
