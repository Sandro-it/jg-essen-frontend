import { Link, Outlet } from 'react-router-dom';
import './jez.css';

// Самостійна обгортка тестового розділу "JEZ — можна слухати" — власний темний
// хедер з помаранчевим акцентом, без Header/Footer основного сайту (ізольований
// демо-розділ, не в головному меню).
export default function JezLayout() {
  return (
    <div className="jez">
      <header className="jez-header">
        <Link to="/jez-test" className="jez-header__brand">
          JEZ <span>— можна слухати</span>
        </Link>
      </header>
      <main className="jez-main">
        <Outlet />
      </main>
    </div>
  );
}
