import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { fetchNewsById, getMediaUrl } from '../api/strapi';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import NotFound from './NotFound';
import './NewsDetail.css';

export default function NewsDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [newsItem, setNewsItem] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchNewsById(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('notfound');
        } else {
          setNewsItem(data);
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

  const item = newsItem.attributes || newsItem;
  const mainImageUrl = getMediaUrl(item.mainImage);
  const gallery = item.gallery?.data || item.gallery || [];
  const embedUrl = getYouTubeEmbedUrl(item.videoUrl);

  return (
    <div className="news-detail">
      {mainImageUrl && (
        <div className="news-detail__hero" style={{ backgroundImage: `url(${mainImageUrl})` }} />
      )}
      <div className="container news-detail__content">
        <Link to="/aktuelles" className="news-detail__back">
          ← {t('aktuelles.detail.backToList')}
        </Link>

        <h1>{item.title}</h1>
        <p className="news-detail__date">
          {t('aktuelles.publishedOn')} {new Date(item.date).toLocaleDateString(i18n.language)}
        </p>

        {item.text && (
          <div className="news-detail__text">
            <ReactMarkdown>{item.text}</ReactMarkdown>
          </div>
        )}

        {embedUrl && (
          <section className="news-detail__video">
            <h2>{t('aktuelles.detail.video')}</h2>
            <div className="news-detail__video-frame">
              <iframe
                src={embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {!embedUrl && item.videoUrl && (
          <p className="news-detail__video-link">
            <a href={item.videoUrl} target="_blank" rel="noreferrer">
              {t('aktuelles.detail.watchOnYoutube')} →
            </a>
          </p>
        )}

        {gallery.length > 0 && (
          <section className="news-detail__gallery">
            <h2>{t('aktuelles.detail.gallery')}</h2>
            <div className="news-detail__gallery-grid">
              {gallery.map((media) => {
                const url = getMediaUrl(media.attributes || media);
                return url ? <img key={media.id} src={url} alt="" loading="lazy" /> : null;
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
