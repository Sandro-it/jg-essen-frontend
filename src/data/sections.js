import iconUnsereGemeinde from '../assets/tile-icons/unsere-gemeinde.png';
import iconGlaubeTradition from '../assets/tile-icons/glaube-tradition.png';
import iconGemeindeleben from '../assets/tile-icons/gemeindeleben.png';
import iconSozialeHilfe from '../assets/tile-icons/soziale-hilfe.png';
import iconVeranstaltungen from '../assets/tile-icons/veranstaltungen.png';
import iconAktuelles from '../assets/tile-icons/aktuelles.png';

// Конфігурація розділів типу SectionHub.
// Кожен розділ рендериться компонентами SectionHub (/{slug}) та
// SectionSubpage (/{slug}/{itemSlug}) на основі одних і тих самих даних,
// а тексти підтягуються з i18n за ключем i18nKey.
export const SECTIONS = [
  {
    slug: 'unsere-gemeinde',
    navKey: 'unsereGemeinde',
    i18nKey: 'sections.unsereGemeinde',
    hasDesign: true,
    itemSlugs: ['geschichte', 'rabbiner', 'vorstand', 'team', 'mitgliedschaft'],
  },
  {
    slug: 'glaube-tradition',
    navKey: 'glaubeTradition',
    i18nKey: 'sections.glaubeTradition',
    hasDesign: true,
    itemSlugs: ['synagoge', 'schabbat', 'feiertage', 'lebenszyklus', 'kaschrut', 'friedhof'],
  },
  {
    slug: 'gemeindeleben',
    navKey: 'gemeindeleben',
    i18nKey: 'sections.gemeindeleben',
    hasDesign: false,
    itemSlugs: ['kinder-jugend', 'jez'],
  },
  {
    slug: 'soziale-hilfe',
    navKey: 'sozialeHilfe',
    i18nKey: 'sections.sozialeHilfe',
    hasDesign: false,
    itemSlugs: [
      'sozialberatung',
      'senioren',
      'integration',
      'neuzuwanderer',
      'dokumente-formulare',
      'medizinische-begleitung',
    ],
  },
  {
    slug: 'service',
    navKey: 'service',
    i18nKey: 'sections.service',
    hasDesign: false,
    itemSlugs: ['downloads', 'formulare', 'faq', 'partner-links', 'nuetzliche-infos'],
  },
  {
    slug: 'kontakt',
    navKey: 'kontakt',
    i18nKey: 'sections.kontakt',
    hasDesign: false,
    itemSlugs: ['adresse', 'oeffnungszeiten', 'ansprechpartner', 'kontaktformular', 'anfahrt'],
  },
];

export function getSectionBySlug(slug) {
  return SECTIONS.find((section) => section.slug === slug);
}

// Порядок плиток на головній сторінці (2 колонки x 3 ряди), як у макеті "Головна".
// image — фото-кроп з design-reference/Головна.png у круглій масці (131×131px),
// color — власна кольорова підложка кожної плитки (Точна специфікація дизайну).
export const HOME_TILES = [
  { slug: 'unsere-gemeinde', navKey: 'unsereGemeinde', image: iconUnsereGemeinde, color: '#2c5f8a' },
  { slug: 'glaube-tradition', navKey: 'glaubeTradition', image: iconGlaubeTradition, color: '#CE4D4D' },
  { slug: 'gemeindeleben', navKey: 'gemeindeleben', image: iconGemeindeleben, color: '#1F3A79' },
  { slug: 'soziale-hilfe', navKey: 'sozialeHilfe', image: iconSozialeHilfe, color: '#1f6f78' },
  { slug: 'veranstaltungen', navKey: 'veranstaltungen', image: iconVeranstaltungen, color: '#c9433a' },
  { slug: 'aktuelles', navKey: 'aktuelles', image: iconAktuelles, color: '#1b3d6d' },
];

// 6 іконок швидкого доступу у футері (спільні для всього сайту).
// icon — назва компонента lucide-react (мапиться в Footer.jsx).
export const QUICK_ACCESS_ITEMS = [
  { key: 'gottesdienste', to: '/glaube-tradition', icon: 'Church' },
  { key: 'veranstaltungen', to: '/veranstaltungen', icon: 'CalendarCheck' },
  { key: 'mitgliedschaft', to: '/unsere-gemeinde/mitgliedschaft', icon: 'Users' },
  { key: 'sozialeHilfe', to: '/soziale-hilfe', icon: 'HeartHandshake' },
  { key: 'dokumente', to: '/service/downloads', icon: 'FileDown' },
  { key: 'kontakt', to: '/kontakt', icon: 'Phone' },
];

export const SOCIAL_LINKS = [
  { key: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { key: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { key: 'telegram', label: 'Telegram', href: 'https://telegram.org' },
];

export const PARTNER_LINKS = [
  { key: 'zwst', label: 'ZWST' },
  { key: 'djk', label: 'Deutscher Jüdischer Kongress' },
  { key: 'lsb', label: 'Landessportbund NRW' },
  { key: 'essen', label: 'Stadt Essen' },
];
