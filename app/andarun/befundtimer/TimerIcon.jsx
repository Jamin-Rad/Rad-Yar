export default function TimerIcon({ name, ...props }) {
  const paths = {
    play: <path d="m9 5 11 7-11 7z"/>, pause: <><path d="M8 5v14M16 5v14"/></>,
    reset: <path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>, save: <><path d="M4 3h13l4 4v14H4zM8 3v7h9V3M8 21v-7h9v7"/></>,
    left: <path d="m14 6-6 6 6 6"/>, right: <path d="m10 6 6 6-6 6"/>,
    edit: <><path d="m15 4 5 5M4 15 15 4a3.5 3.5 0 0 1 5 5L9 20l-6 1z"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>, minus: <path d="M5 12h14"/>, plus: <path d="M5 12h14M12 5v14"/>,
  }
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}
