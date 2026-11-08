export default function TodoIcon({ name, size = 22, ...props }) {
  const paths = {
    plan: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    all: (
      <>
        <path d="M8 5h13M8 12h13M8 19h13" />
        <circle cx="3" cy="5" r=".7" />
        <circle cx="3" cy="12" r=".7" />
        <circle cx="3" cy="19" r=".7" />
      </>
    ),
    activity: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4M17 3v4M3 10h18M7 14h.1M12 14h.1M17 14h.1M7 17h.1M12 17h.1" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="9" r="3" />
        <path d="M5.5 18c1-3 3.2-4 6.5-4s5.5 1 6.5 4" />
      </>
    ),
    plus: <path d="M12 4v16M4 12h16" />,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    refresh: (
      <>
        <path d="M20 8A8 8 0 0 0 5 6L2 9m0-6v6h6M4 16a8 8 0 0 0 15 2l3-3m0 6v-6h-6" />
      </>
    ),
    note: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </>
    ),
    audio: <path d="M3 10v4M7 6v12M11 3v18M15 7v10M19 9v6M23 11v2" />,
    play: <path d="m9 5 10 7-10 7z" />,
    trash: (
      <>
        <path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v2M12 21v2M1 12h2M21 12h2M4 4l1.5 1.5M18.5 18.5 20 20M4 20l1.5-1.5M18.5 5.5 20 4" />
      </>
    ),
    edit: (
      <>
        <path d="m15 4 5 5M4 20l4-1L21 6l-4-4L4 15z" />
      </>
    ),
    back: <path d="m14 5-7 7 7 7" />,
    flag: (
      <>
        <path d="M5 21V3c5-4 9 4 14 0v11c-5 4-9-4-14 0" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "plan" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.note}
    </svg>
  );
}
