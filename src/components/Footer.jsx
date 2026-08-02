import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QUICK_ACCESS_ITEMS, SOCIAL_LINKS, PARTNER_LINKS } from '../data/sections';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="quick-access container">
        {QUICK_ACCESS_ITEMS.map((item) => (
          <Link key={item.key} to={item.to} className="quick-access__item">
            <span className="quick-access__label">{t(`quickAccess.${item.key}`)}</span>
          </Link>
        ))}
        <Link to="/spenden" className="quick-access__item quick-access__item--donate">
          <span className="quick-access__label">{t('nav.spenden')}</span>
        </Link>
      </div>

      <div className="site-footer__bottom container">
        <div className="site-footer__col">
          <h3>{t('footer.socialTitle')}</h3>
          <ul className="site-footer__social">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.key}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h3>{t('footer.partnersTitle')}</h3>
          <ul className="site-footer__partners">
            {PARTNER_LINKS.map((partner) => (
              <li key={partner.key}>{partner.label}</li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <ul className="site-footer__legal">
            <li>
              <Link to="/impressum">{t('footer.impressum')}</Link>
            </li>
            <li>
              <Link to="/datenschutz">{t('footer.datenschutz')}</Link>
            </li>
            <li>
              <Link to="/sitemap">{t('footer.sitemap')}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__rights container">
        <p>
          © {new Date().getFullYear()} {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
