import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import menorahIcon from '../assets/menorah-icon.svg';
import menorahIconWhite from '../assets/menorah-icon-white.svg';
import './Header.css';

const NAV_LINKS = [
  { to: '/unsere-gemeinde', navKey: 'unsereGemeinde' },
  { to: '/glaube-tradition', navKey: 'glaubeTradition' },
  { to: '/gemeindeleben', navKey: 'gemeindeleben' },
  { to: '/soziale-hilfe', navKey: 'sozialeHilfe' },
  { to: '/veranstaltungen', navKey: 'veranstaltungen' },
  { to: '/aktuelles', navKey: 'aktuelles' },
];

// Синя плашка тепер містить горизонтальне навігаційне меню (замість
// порожньої декоративної смуги) — спільне для всього сайту, бо це той
// самий елемент шапки, що й раніше був над hero-фото на кожній сторінці.
export default function Header() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <header className="site-header">
      <div className="site-header__top container">
        <NavLink to="/" className="site-header__brand">
          <img
            src={theme === 'dark' ? menorahIconWhite : menorahIcon}
            alt=""
            aria-hidden="true"
            className="site-header__logo-icon"
          />
          <span className="site-header__brand-text">
            <span className="site-header__title">{t('common.siteName')}</span>
            <span className="site-header__claim">{t('common.siteClaim')}</span>
          </span>
        </NavLink>
        <div className="site-header__controls">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      <nav className="site-header__nav" aria-label="Hauptnavigation">
        <ul className="site-header__nav-list container">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'site-header__nav-link is-active' : 'site-header__nav-link'
                }
              >
                {t(`nav.${link.navKey}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
