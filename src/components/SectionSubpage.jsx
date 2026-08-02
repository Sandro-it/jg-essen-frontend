import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSectionBySlug } from '../data/sections';
import SectionMenu from './SectionMenu';
import NotFound from '../pages/NotFound';
import './SectionHub.css';

// Підсторінка розділу: те саме горизонтальне меню (з підсвіченим active-пунктом),
// заголовок і текст конкретного пункту.
export default function SectionSubpage() {
  const { sectionSlug, itemSlug } = useParams();
  const { t } = useTranslation();
  const section = getSectionBySlug(sectionSlug);

  if (!section || !section.itemSlugs.includes(itemSlug)) return <NotFound />;

  const base = `${section.i18nKey}.items.${itemSlug}`;

  return (
    <div className="section-hub">
      <div className="section-hub__hero" aria-hidden="true" />
      <div className="container">
        <h1>{t(`${section.i18nKey}.title`)}</h1>
        <SectionMenu section={section} />

        {!section.hasDesign && <p className="section-hub__notice">{t('common.placeholderNotice')}</p>}

        <section className="section-hub__intro">
          <h2>{t(`${base}.title`)}</h2>
          <p className="section-hub__subtitle">{t(`${base}.subtitle`)}</p>
          <p>{t(`${base}.text`)}</p>
        </section>

        <Link to={`/${section.slug}`} className="section-hub__back">
          ← {t('common.backToOverview')}
        </Link>
      </div>
    </div>
  );
}
