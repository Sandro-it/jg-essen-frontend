import { useParams } from 'react-router-dom';
import { getSectionBySlug } from '../data/sections';
import SectionHub from '../components/SectionHub';
import LegalPage from './LegalPage';
import NotFound from './NotFound';

const LEGAL_SLUGS = ['impressum', 'datenschutz', 'sitemap'];

// Диспетчер для односегментних маршрутів /:slug — визначає, чи це
// хаб розділу (SectionHub) чи юридична сторінка-заглушка, чи 404.
export default function TopLevelRouter() {
  const { slug } = useParams();

  if (getSectionBySlug(slug)) return <SectionHub slug={slug} />;
  if (LEGAL_SLUGS.includes(slug)) return <LegalPage slug={slug} />;
  return <NotFound />;
}
