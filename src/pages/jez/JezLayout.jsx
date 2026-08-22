import { Link, Outlet } from 'react-router-dom';
import './jez.css';

// Самостійна обгортка тестового розділу "JEZ — можна слухати" — власний темний
// хедер з помаранчевим акцентом, без Header/Footer основного сайту (ізольований
// демо-розділ, не в головному меню). Хедер за макетом: гамбургер-меню зліва,
// лого громади по центру, пошук справа — суто косметика, без функціоналу.
export default function JezLayout() {
  return (
    <div className="jez">
      <header className="jez-header">
        <button type="button" className="jez-header__icon-btn" aria-label="Меню">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <Link to="/jez-test" className="jez-header__logo">
          JÜDISCHE GEMEINDE ESSEN
        </Link>

        <button type="button" className="jez-header__icon-btn" aria-label="Пошук">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </header>
      <main className="jez-main">
        <Outlet />
      </main>
    </div>
  );
}
