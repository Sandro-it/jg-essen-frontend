import iconUnsereGemeinde from '../assets/icons/icon-unsere-gemeinde.png';
import iconGlaubeTradition from '../assets/icons/icon-glaube-tradition.png';
import iconGemeindeleben from '../assets/icons/icon-gemeindeleben.png';
import iconSozialeHilfe from '../assets/icons/icon-soziale-hilfe.png';
import iconVeranstaltungen from '../assets/icons/icon-veranstaltungen.png';
import iconAktuelles from '../assets/icons/icon-aktuelles.png';

import heroUnsereGemeinde from '../assets/hero/unsere-gemeinde.jpg';
import heroUnsereGemeindeGeschichte from '../assets/hero/unsere-gemeinde-geschichte.jpg';
import heroUnsereGemeindeRabbiner from '../assets/hero/unsere-gemeinde-rabbiner.jpg';
import heroUnsereGemeindeVorstand from '../assets/hero/unsere-gemeinde-vorstand.jpg';
import heroUnsereGemeindeTeam from '../assets/hero/unsere-gemeinde-team.jpg';
import heroUnsereGemeindeMitgliedschaft from '../assets/hero/unsere-gemeinde-mitgliedschaft.jpg';
import heroGlaubeTradition from '../assets/hero/glaube-tradition.jpg';
import heroGlaubeTraditionSynagoge from '../assets/hero/glaube-tradition-synagoge.jpg';
import heroGlaubeTraditionSchabbat from '../assets/hero/glaube-tradition-schabbat.jpg';
import heroGlaubeTraditionFeiertage from '../assets/hero/glaube-tradition-feiertage.jpg';
import heroGlaubeTraditionLebenszyklus from '../assets/hero/glaube-tradition-lebenszyklus.jpg';
import heroGlaubeTraditionKaschrut from '../assets/hero/glaube-tradition-kaschrut.jpg';
import heroGlaubeTraditionFriedhof from '../assets/hero/glaube-tradition-friedhof.jpg';
import heroGemeindeleben from '../assets/hero/gemeindeleben.jpg';
import heroGemeindelebenKinderJugend from '../assets/hero/gemeindeleben-kinder-jugend.jpg';
import heroGemeindelebenJez from '../assets/hero/gemeindeleben-jez.jpg';
import heroSozialeHilfeSenioren from '../assets/hero/soziale-hilfe-senioren.jpg';
import heroSozialeHilfeNeuzuwanderer from '../assets/hero/soziale-hilfe-neuzuwanderer.jpg';

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

// Фото для section-hub__hero (хаб та підсторінки), джерело — src/assets/x2 png_*/
// (чисті вирізані Figma-експорти) з fallback на design-reference/ там, де x2-варіанту
// немає. Ключ — slug хаба, або "slug/itemSlug" для підсторінки.
// Розділи gemeindeleben і soziale-hilfe формально позначені hasDesign: false
// (текстовий контент там ще не готовий — це окремо від фото), але фото для
// частини їх підсторінок вже є, тож проставляємо їх тут само.
// Без фото лишаються: soziale-hilfe/sozialberatung, /integration,
// /dokumente-formulare, /medizinische-begleitung — для них у x2-папках
// референсу немає.
export const HERO_IMAGES = {
  'unsere-gemeinde': heroUnsereGemeinde,
  'unsere-gemeinde/geschichte': heroUnsereGemeindeGeschichte,
  'unsere-gemeinde/rabbiner': heroUnsereGemeindeRabbiner,
  'unsere-gemeinde/vorstand': heroUnsereGemeindeVorstand,
  'unsere-gemeinde/team': heroUnsereGemeindeTeam,
  'unsere-gemeinde/mitgliedschaft': heroUnsereGemeindeMitgliedschaft,
  'glaube-tradition': heroGlaubeTradition,
  'glaube-tradition/synagoge': heroGlaubeTraditionSynagoge,
  'glaube-tradition/schabbat': heroGlaubeTraditionSchabbat,
  'glaube-tradition/feiertage': heroGlaubeTraditionFeiertage,
  'glaube-tradition/lebenszyklus': heroGlaubeTraditionLebenszyklus,
  'glaube-tradition/kaschrut': heroGlaubeTraditionKaschrut,
  'glaube-tradition/friedhof': heroGlaubeTraditionFriedhof,
  gemeindeleben: heroGemeindeleben,
  'gemeindeleben/kinder-jugend': heroGemeindelebenKinderJugend,
  'gemeindeleben/jez': heroGemeindelebenJez,
  'soziale-hilfe/senioren': heroSozialeHilfeSenioren,
  'soziale-hilfe/neuzuwanderer': heroSozialeHilfeNeuzuwanderer,
};

export function getHeroImage(slug, itemSlug) {
  return HERO_IMAGES[itemSlug ? `${slug}/${itemSlug}` : slug];
}

// Порядок плиток на головній сторінці (2 колонки x 3 ряди), як у макеті "Головна".
// image — готова кругла іконка з макета (вітражне скло), без додаткового
// CSS-оформлення навколо.
export const HOME_TILES = [
  { slug: 'unsere-gemeinde', navKey: 'unsereGemeinde', image: iconUnsereGemeinde },
  { slug: 'glaube-tradition', navKey: 'glaubeTradition', image: iconGlaubeTradition },
  { slug: 'gemeindeleben', navKey: 'gemeindeleben', image: iconGemeindeleben },
  { slug: 'soziale-hilfe', navKey: 'sozialeHilfe', image: iconSozialeHilfe },
  { slug: 'veranstaltungen', navKey: 'veranstaltungen', image: iconVeranstaltungen },
  { slug: 'aktuelles', navKey: 'aktuelles', image: iconAktuelles },
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
