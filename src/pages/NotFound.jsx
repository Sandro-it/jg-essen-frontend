import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
      <h1>404</h1>
      <p>{t('common.noResults')}</p>
      <Link to="/">{t('nav.home')}</Link>
    </div>
  );
}
