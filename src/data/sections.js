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
export const HOME_TILES = [
  { slug: 'unsere-gemeinde', navKey: 'unsereGemeinde' },
  { slug: 'glaube-tradition', navKey: 'glaubeTradition' },
  { slug: 'gemeindeleben', navKey: 'gemeindeleben' },
  { slug: 'soziale-hilfe', navKey: 'sozialeHilfe' },
  { slug: 'veranstaltungen', navKey: 'veranstaltungen' },
  { slug: 'aktuelles', navKey: 'aktuelles' },
];

// 6 іконок швидкого доступу у футері (спільні для всього сайту).
export const QUICK_ACCESS_ITEMS = [
  { key: 'gottesdienste', to: '/glaube-tradition' },
  { key: 'veranstaltungen', to: '/veranstaltungen' },
  { key: 'mitgliedschaft', to: '/unsere-gemeinde/mitgliedschaft' },
  { key: 'sozialeHilfe', to: '/soziale-hilfe' },
  { key: 'dokumente', to: '/service/downloads' },
  { key: 'kontakt', to: '/kontakt' },
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
