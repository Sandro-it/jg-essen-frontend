import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSectionBySlug } from '../data/sections';
import SectionMenu from './SectionMenu';
import NotFound from '../pages/NotFound';
import './SectionHub.css';

// Підсторінка розділу: hero, горизонтальне меню (з підсвіченим active-пунктом),
// а тоді — заголовок і текст САМОГО ПУНКТУ (не заголовок розділу — за макетом
// на підсторінці заголовок розділу не повторюється).
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
        <SectionMenu section={section} />

        {!section.hasDesign && <p className="section-hub__notice">{t('common.placeholderNotice')}</p>}

        <section className="section-subpage__intro">
          <h1>{t(`${base}.title`)}</h1>
          <p className="section-hub__subtitle">{t(`${base}.subtitle`)}</p>
          <p className="section-subpage__text">{t(`${base}.text`)}</p>
        </section>

        <Link to={`/${section.slug}`} className="section-hub__back">
          ← {t('common.backToOverview')}
        </Link>
      </div>
    </div>
  );
}
