import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Горизонтальне підменю розділу: пункт "intro" веде на корінь розділу (hub),
// решта пунктів — на відповідні підсторінки. Активний пункт підсвічується.
export default function SectionMenu({ section }) {
  const { t } = useTranslation();

  return (
    <nav className="section-menu" aria-label={t(`${section.i18nKey}.title`)}>
      <ul>
        <li>
          <NavLink to={`/${section.slug}`} end className={({ isActive }) => (isActive ? 'is-active' : '')}>
            {t(`${section.i18nKey}.intro.menuLabel`)}
          </NavLink>
        </li>
        {section.itemSlugs.map((itemSlug) => (
          <li key={itemSlug}>
            <NavLink
              to={`/${section.slug}/${itemSlug}`}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {t(`${section.i18nKey}.items.${itemSlug}.menuLabel`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
