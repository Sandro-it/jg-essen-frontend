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
// colors/glyph — палітра та сюжет декоративної іконки-вітража (TileIcon),
// підібрані під відповідні кола в design-reference/Головна.png.
export const HOME_TILES = [
  {
    slug: 'unsere-gemeinde',
    navKey: 'unsereGemeinde',
    glyph: '✡',
    colors: ['#2c5f8a', '#e0b73d', '#3f8f5f', '#c9433a', '#6a4c93', '#2c5f8a'],
  },
  {
    slug: 'glaube-tradition',
    navKey: 'glaubeTradition',
    glyph: '🕎',
    colors: ['#7a1f2b', '#a83246', '#7a1f2b', '#c9a86a'],
  },
  {
    slug: 'gemeindeleben',
    navKey: 'gemeindeleben',
    glyph: '🧑‍🤝‍🧑',
    colors: ['#1b3d6d', '#3f7cac', '#7fb2dd', '#1b3d6d'],
  },
  {
    slug: 'soziale-hilfe',
    navKey: 'sozialeHilfe',
    glyph: '🤝',
    colors: ['#1f6f78', '#3fa7ae', '#a8d8dc', '#1f6f78'],
  },
  {
    slug: 'veranstaltungen',
    navKey: 'veranstaltungen',
    glyph: '📅',
    colors: ['#c9433a', '#e0b73d', '#3f8f5f', '#1b3d6d', '#6a4c93'],
  },
  {
    slug: 'aktuelles',
    navKey: 'aktuelles',
    glyph: '📰',
    colors: ['#1b3d6d', '#3f7cac', '#7fb2dd', '#1b3d6d'],
  },
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
