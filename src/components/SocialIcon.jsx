// Прості монохромні SVG-іконки соцмереж (lucide-react не містить брендових
// логотипів — це навмисне обмеження генеричного набору іконок).
const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.32 15.36 4.24 14.34 4.24c-2.13 0-3.59 1.3-3.59 3.68V10.5H8.25v3H10.75V21h2.75Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M21 4 2.6 11.2c-.9.35-.9 1.65.03 1.98l4.4 1.53 1.7 5.34c.24.75 1.2.94 1.72.35l2.4-2.7 4.5 3.3c.68.5 1.65.13 1.83-.68L22.8 5.3c.2-.9-.7-1.65-1.5-1.3Zm-3.15 3.4-8.3 7.4-.4 3.1-1.4-4.4 10.1-6.1Z" />
    </svg>
  ),
};

export default function SocialIcon({ name }) {
  return ICONS[name] || null;
}
