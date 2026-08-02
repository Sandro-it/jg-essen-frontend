import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import './Header.css';

// За макетом глобального навігаційного меню в шапці немає — переходи між
// розділами йдуть через плитки на Головній, горизонтальне підменю кожного
// розділу (SectionMenu) та іконки швидкого доступу у футері.
export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="site-header">
      <div className="site-header__top container">
        <NavLink to="/" className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">
            ✡
          </span>
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
      <div className="site-header__accent-bar" aria-hidden="true" />
    </header>
  );
}
