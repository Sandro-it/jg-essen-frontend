import { useTranslation } from 'react-i18next';
import NotFound from './NotFound';

const SLUG_TO_KEY = {
  impressum: 'footer.impressum',
  datenschutz: 'footer.datenschutz',
  sitemap: 'footer.sitemap',
};

// Заглушка для Impressum / Datenschutz / Sitemap — юридичний текст додасться пізніше.
export default function LegalPage({ slug }) {
  const { t } = useTranslation();
  const titleKey = SLUG_TO_KEY[slug];

  if (!titleKey) return <NotFound />;

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <h1>{t(titleKey)}</h1>
      <p>{t('common.placeholderNotice')}</p>
    </div>
  );
}
