import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin } from 'lucide-react';
import { fetchEventById } from '../api/strapi';
import NotFound from './NotFound';
import './NewsDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchEventById(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('notfound');
        } else {
          setEvent(data);
          setStatus('done');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="container news-detail">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container news-detail">
        <p>{t('common.loadError')}</p>
      </div>
    );
  }

  if (status === 'notfound') {
    return <NotFound />;
  }

  const item = event.attributes || event;
  const date = new Date(item.date);

  return (
    <div className="news-detail">
      <div className="container news-detail__content">
        <Link to="/veranstaltungen" className="news-detail__back">
          ← {t('veranstaltungen.detail.backToList')}
        </Link>

        <h1>{item.title}</h1>

        <div className="news-detail__date">
          <span className="news-detail__meta-item">
            <Clock size={17} strokeWidth={1.5} aria-hidden="true" />
            {date.toLocaleDateString(i18n.language)}{' '}
            {date.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
          </span>
          {item.location && (
            <span className="news-detail__meta-item">
              <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
              {item.location}
            </span>
          )}
        </div>

        {item.description && <div className="news-detail__text news-detail__text--plain">{item.description}</div>}
      </div>
    </div>
  );
}
