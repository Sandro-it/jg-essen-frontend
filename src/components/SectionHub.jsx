import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSectionBySlug } from '../data/sections';
import SectionMenu from './SectionMenu';
import NotFound from '../pages/NotFound';
import './SectionHub.css';

// Загальний компонент-хаб розділу: заголовок, горизонтальне підменю,
// вступний блок (перший пункт меню — без власної підсторінки) та
// список секцій-тизерів з посиланнями "Подробнее" на підсторінки.
export default function SectionHub({ slug }) {
  const { t } = useTranslation();
  const section = getSectionBySlug(slug);

  if (!section) return <NotFound />;

  return (
    <div className="section-hub">
      <div className="section-hub__hero" aria-hidden="true" />
      <div className="container">
        <h1>{t(`${section.i18nKey}.title`)}</h1>
        <SectionMenu section={section} />

        {!section.hasDesign && <p className="section-hub__notice">{t('common.placeholderNotice')}</p>}

        <section className="section-hub__intro">
          <h2>{t(`${section.i18nKey}.intro.title`)}</h2>
          <p className="section-hub__subtitle">{t(`${section.i18nKey}.intro.subtitle`)}</p>
          <p className="section-hub__text">{t(`${section.i18nKey}.intro.text`)}</p>
        </section>

        <ul className="section-hub__teasers">
          {section.itemSlugs.map((itemSlug) => (
            <li key={itemSlug} className="section-hub__teaser">
              <h2>{t(`${section.i18nKey}.items.${itemSlug}.title`)}</h2>
              <p className="section-hub__subtitle">{t(`${section.i18nKey}.items.${itemSlug}.subtitle`)}</p>
              <p className="section-hub__text">{t(`${section.i18nKey}.items.${itemSlug}.text`)}</p>
              <Link to={`/${section.slug}/${itemSlug}`} className="section-hub__teaser-link">
                {t(`${section.i18nKey}.items.${itemSlug}.link`)} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
