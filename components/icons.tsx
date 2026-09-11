/** One drawn icon system: 16px box, 1.6 stroke, round caps. Plus the mark. */
type P = { className?: string; style?: React.CSSProperties };
const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** The four-point star: the site's mark and the marquee's separator. */
export const Star = ({ className, style }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} style={style}>
    <path d="M12 0c.5 6.3 5.7 11.5 12 12-6.3.5-11.5 5.7-12 12-.5-6.3-5.7-11.5-12-12C6.3 11.5 11.5 6.3 12 0Z" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);
export const ArrowUpRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 11l6-6M5.6 5h5.4v5.4" />
  </svg>
);
export const DownloadIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 2.5v7.5M4.75 7.25 8 10.5l3.25-3.25M2.75 13.25h10.5" />
  </svg>
);
export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.75" />
    <path d="m2.5 5 4.6 3.4a1.5 1.5 0 0 0 1.8 0L13.5 5" />
  </svg>
);
export const GithubIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.1 13.4c-2.6.7-2.6-1.3-3.6-1.6m7.2 3v-2.3c0-.7.1-1-.3-1.3 1.9-.2 3.6-.9 3.6-4a3.1 3.1 0 0 0-.9-2.2 2.9 2.9 0 0 0-.1-2.2s-.8-.2-2.4 1a8.4 8.4 0 0 0-4.2 0C3.8 2.8 3 3 3 3a2.9 2.9 0 0 0-.1 2.2 3.1 3.1 0 0 0-.9 2.2c0 3.1 1.7 3.8 3.6 4-.3.3-.3.6-.3 1.1v2.3" />
  </svg>
);
export const LinkedinIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="2" />
    <path d="M4.6 6.9v4.4M4.6 4.6v.05M7.6 11.3V6.9m0 1.5c0-.9.7-1.5 1.6-1.5s1.6.6 1.6 1.7v2.7" />
  </svg>
);
export const SunIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.2M8 13.3v1.2M14.5 8h-1.2M2.7 8H1.5M12.6 3.4l-.85.85M4.25 11.75l-.85.85M12.6 12.6l-.85-.85M4.25 4.25l-.85-.85" />
  </svg>
);
export const MoonIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" />
  </svg>
);
export const SystemIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="1.75" y="2.75" width="12.5" height="8.5" rx="1.5" />
    <path d="M5.75 14.25h4.5" />
  </svg>
);
