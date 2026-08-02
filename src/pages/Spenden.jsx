import { useTranslation } from 'react-i18next';

export default function Spenden() {
  const { t } = useTranslation();

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <h1>{t('spenden.title')}</h1>
      <p style={{ fontWeight: 600 }}>{t('spenden.subtitle')}</p>
      <p>{t('spenden.text')}</p>
    </div>
  );
}
