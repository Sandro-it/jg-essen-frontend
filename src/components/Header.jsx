import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';
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

  return (
    <header className="site-header">
      <div className="site-header__top container">
        <NavLink to="/" className="site-header__brand">
          <img src={logo} alt={t('common.siteName')} className="site-header__logo-img" />
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
