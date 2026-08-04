import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin } from 'lucide-react';
import { fetchLatestNews, fetchUpcomingEvents, getMediaUrl } from '../api/strapi';
import heroBuilding from '../assets/hero-building.jpg';
import './Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
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
      <section className="home__hero" style={{ backgroundImage: `url(${heroBuilding})` }}>
        <div className="home__hero-scrim" aria-hidden="true" />
        <div className="home__hero-textbox">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroText')}</p>
        </div>
      </section>

      <section className="home__welcome container">
        <h2>{t('home.welcomeTitle')}</h2>
        {t('home.welcomeParagraphs', { returnObjects: true }).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="home__lists container">
        <div className="home__list">
          <h2>{t('common.upcomingEvents')}</h2>
          {eventsState === 'loading' && <p>{t('common.loading')}</p>}
          {eventsState === 'error' && <p>{t('common.loadError')}</p>}
          {eventsState === 'done' && events.length === 0 && <p>{t('veranstaltungen.noEvents')}</p>}
          {eventsState === 'done' && events.length > 0 && (
            <ul className="home__event-list">
              {events.map((event) => {
                const item = event.attributes || event;
                const date = new Date(item.date);
                const day = date.getDate();
                const month = date.toLocaleDateString(i18n.language, { month: 'short' });
                const time = date.toLocaleTimeString(i18n.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <li key={event.id}>
                    <Link to={`/veranstaltungen/${event.id}`} className="home__event-card">
                      <div className="home__event-date">
                        <span className="home__event-day">{day}</span>
                        <span className="home__event-month">{month}</span>
                      </div>
                      <div className="home__event-body">
                        <h3 className="home__event-title">{item.title}</h3>
                        <div className="home__event-meta">
                          <span className="home__event-meta-item">
                            <Clock size={17} strokeWidth={1.5} aria-hidden="true" />
                            {time}
                          </span>
                          {item.location && (
                            <span className="home__event-meta-item">
                              <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
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
            <ul className="home__news-list">
              {news.map((newsItem) => {
                const item = newsItem.attributes || newsItem;
                const thumbUrl = getMediaUrl(item.mainImage);
                return (
                  <li key={newsItem.id}>
                    <Link to={`/aktuelles/${newsItem.id}`} className="home__news-card">
                      <div
                        className="home__news-thumb"
                        style={thumbUrl ? { backgroundImage: `url(${thumbUrl})` } : undefined}
                      />
                      <span className="home__news-title">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <Link to="/aktuelles">{t('common.showFullArchive')} →</Link>
        </div>
      </section>
    </div>
  );
}
