import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOME_TILES } from '../data/sections';
import { fetchLatestNews, fetchUpcomingEvents } from '../api/strapi';
import TileIcon from '../components/TileIcon';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [newsState, setNewsState] = useState('loading');
  const [events, setEvents] = useState([]);
  const [eventsState, setEventsState] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    fetchLatestNews(3)
      .then((data) => {
        if (!cancelled) {
          setNews(data);
          setNewsState('done');
        }
      })
      .catch(() => {
        if (!cancelled) setNewsState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchUpcomingEvents(3)
      .then((data) => {
        if (!cancelled) {
          setEvents(data);
          setEventsState('done');
        }
      })
      .catch(() => {
        if (!cancelled) setEventsState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="container">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroText')}</p>
        </div>
      </section>

      <nav className="home__tiles" aria-label={t('nav.home')}>
        {HOME_TILES.map((tile) => (
          <Link key={tile.slug} to={`/${tile.slug}`} className="home__tile">
            <span>{t(`nav.${tile.navKey}`)}</span>
            <TileIcon colors={tile.colors} glyph={tile.glyph} />
          </Link>
        ))}
      </nav>

      <section className="home__lists container">
        <div className="home__list">
          <h2>{t('common.upcomingEvents')}</h2>
          {eventsState === 'loading' && <p>{t('common.loading')}</p>}
          {eventsState === 'error' && <p>{t('common.loadError')}</p>}
          {eventsState === 'done' && events.length === 0 && <p>{t('veranstaltungen.noEvents')}</p>}
          {eventsState === 'done' && events.length > 0 && (
            <ul>
              {events.map((event) => {
                const item = event.attributes || event;
                return (
                  <li key={event.id}>
                    <span className="home__list-date">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="home__list-title">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/veranstaltungen">{t('nav.veranstaltungen')} →</Link>
        </div>

        <div className="home__list">
          <h2>{t('common.latestNews')}</h2>
          {newsState === 'loading' && <p>{t('common.loading')}</p>}
          {newsState === 'error' && <p>{t('common.loadError')}</p>}
          {newsState === 'done' && news.length === 0 && <p>{t('aktuelles.noNews')}</p>}
          {newsState === 'done' && news.length > 0 && (
            <ul>
              {news.map((newsItem) => {
                const item = newsItem.attributes || newsItem;
                return (
                  <li key={newsItem.id}>
                    <span className="home__list-title">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/aktuelles">{t('common.showFullArchive')} →</Link>
        </div>
      </section>

      <section className="home__welcome container">
        <h2>{t('home.welcomeTitle')}</h2>
        {t('home.welcomeParagraphs', { returnObjects: true }).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </div>
  );
}
