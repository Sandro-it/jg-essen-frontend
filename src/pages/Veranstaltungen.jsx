import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchEventsArchive, fetchUpcomingEvents } from '../api/strapi';
import './Veranstaltungen.css';

// Календар подій (content-type Event): найближчі мероприятия + архів.
export default function Veranstaltungen() {
  const { t } = useTranslation();
  const [upcoming, setUpcoming] = useState([]);
  const [upcomingState, setUpcomingState] = useState('loading');
  const [archive, setArchive] = useState([]);
  const [archiveState, setArchiveState] = useState('loading');

  useEffect(() => {
    fetchUpcomingEvents(20)
      .then((data) => {
        setUpcoming(data);
        setUpcomingState('done');
      })
      .catch(() => setUpcomingState('error'));

    fetchEventsArchive({ page: 1, pageSize: 20 })
      .then((data) => {
        setArchive(data.data);
        setArchiveState('done');
      })
      .catch(() => setArchiveState('error'));
  }, []);

  return (
    <div className="container veranstaltungen">
      <h1>{t('veranstaltungen.title')}</h1>

      <nav className="veranstaltungen__menu" aria-label={t('veranstaltungen.title')}>
        <ul>
          <li>{t('veranstaltungen.menu.kalender')}</li>
          <li>{t('veranstaltungen.menu.kommende')}</li>
          <li>{t('veranstaltungen.menu.archiv')}</li>
        </ul>
      </nav>

      <section>
        <h2>{t('veranstaltungen.menu.kommende')}</h2>
        {upcomingState === 'loading' && <p>{t('common.loading')}</p>}
        {upcomingState === 'error' && <p>{t('common.loadError')}</p>}
        {upcomingState === 'done' && upcoming.length === 0 && <p>{t('veranstaltungen.noEvents')}</p>}
        <ul className="veranstaltungen__list">
          {upcoming.map((event) => {
            const item = event.attributes || event;
            return (
              <li key={event.id} className="veranstaltungen__item">
                <span className="veranstaltungen__date">{new Date(item.date).toLocaleDateString()}</span>
                <div>
                  <h3>{item.title}</h3>
                  {item.location && <p className="veranstaltungen__location">{t('veranstaltungen.location')}: {item.location}</p>}
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2>{t('veranstaltungen.menu.archiv')}</h2>
        {archiveState === 'loading' && <p>{t('common.loading')}</p>}
        {archiveState === 'error' && <p>{t('common.loadError')}</p>}
        {archiveState === 'done' && archive.length === 0 && <p>{t('veranstaltungen.noEvents')}</p>}
        <ul className="veranstaltungen__list">
          {archive.map((event) => {
            const item = event.attributes || event;
            return (
              <li key={event.id} className="veranstaltungen__item">
                <span className="veranstaltungen__date">{new Date(item.date).toLocaleDateString()}</span>
                <div>
                  <h3>{item.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
