// SVG-прапорці замість emoji: Windows (Segoe UI Emoji) не має глифів для
// regional-indicator emoji-прапорців, тому 🇩🇪/🇺🇦/🇷🇺 там не рендеряться.
const FLAGS = {
  de: (
    <svg viewBox="0 0 3 2" width="20" height="14" role="img" aria-hidden="true">
      <rect width="3" height="2" fill="#000000" />
      <rect y="0.667" width="3" height="1.333" fill="#DD0000" />
      <rect y="1.333" width="3" height="0.667" fill="#FFCE00" />
    </svg>
  ),
  ua: (
    <svg viewBox="0 0 3 2" width="20" height="14" role="img" aria-hidden="true">
      <rect width="3" height="1" fill="#0057B7" />
      <rect y="1" width="3" height="1" fill="#FFD700" />
    </svg>
  ),
  ru: (
    <svg viewBox="0 0 3 2" width="20" height="14" role="img" aria-hidden="true">
      <rect width="3" height="2" fill="#FFFFFF" />
      <rect y="0.667" width="3" height="1.333" fill="#0039A6" />
      <rect y="1.333" width="3" height="0.667" fill="#D52B1E" />
    </svg>
  ),
};

export default function FlagIcon({ lang }) {
  return FLAGS[lang] || null;
}
