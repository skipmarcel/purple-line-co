// Inline Lucide-style icons (https://lucide.dev). Decorative unless a label is passed.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const ArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.25}>
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

export const Check = ({ size = 22, color = 'currentColor', strokeWidth = 2.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const WifiOff = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 20h.01" /><path d="M8.5 16.429a5 5 0 0 1 7 0" />
    <path d="M5 12.859a10 10 0 0 1 5.17-2.69" /><path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
    <path d="M2 8.82a15 15 0 0 1 4.177-2.643" /><path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
    <path d="m2 2 20 20" />
  </svg>
);

export const PhoneOff = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect width="14" height="20" x="5" y="2" rx="2" /><path d="M12 18h.01" /><path d="m2 2 20 20" />
  </svg>
);

export const IdCard = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect width="20" height="14" x="2" y="5" rx="2" /><circle cx="8" cy="12" r="2" />
    <path d="M14 10h4" /><path d="M14 14h4" />
  </svg>
);

export const Pause = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const Play = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4v16l13-8z" />
  </svg>
);
