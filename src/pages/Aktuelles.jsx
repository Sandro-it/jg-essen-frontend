import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNewsArchive } from '../api/strapi';
import './Aktuelles.css';

const PAGE_SIZE = 9;

// Стрічка новин з архівом (content-type News). Останні 3 новини показані
// на головній сторінці; тут — повний архів з безкінечним скролом/пагінацією.
export default function Aktuelles() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState('loading');

  const loadPage = useCallback((pageToLoad) => {
    setStatus('loading');
    fetchNewsArchive({ page: pageToLoad, pageSize: PAGE_SIZE })
      .then((data) => {
        setItems((prev) => (pageToLoad === 1 ? data.data : [...prev, ...data.data]));
        setPageCount(data.meta?.pagination?.pageCount || 1);
        setPage(pageToLoad);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  return (
    <div className="container aktuelles">
      <h1>{t('aktuelles.title')}</h1>

      <nav className="aktuelles__menu" aria-label={t('aktuelles.title')}>
        <ul>
          <li>{t('aktuelles.menu.nachrichten')}</li>
          <li>{t('aktuelles.menu.ankuendigungen')}</li>
          <li>{t('aktuelles.menu.jez')}</li>
          <li>{t('aktuelles.menu.archiv')}</li>
        </ul>
      </nav>

      {status === 'loading' && items.length === 0 && <p>{t('common.loading')}</p>}
      {status === 'error' && <p>{t('common.loadError')}</p>}
      {status !== 'error' && items.length === 0 && status === 'done' && <p>{t('aktuelles.noNews')}</p>}

      <ul className="aktuelles__list">
        {items.map((newsItem) => {
          const item = newsItem.attributes || newsItem;
          return (
            <li key={newsItem.id}>
              <Link to={`/aktuelles/${newsItem.id}`} className="aktuelles__item">
                <h2>{item.title}</h2>
                <p className="aktuelles__date">
                  {t('aktuelles.publishedOn')} {new Date(item.date).toLocaleDateString()}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      {page < pageCount && (
        <button type="button" className="aktuelles__load-more" onClick={() => loadPage(page + 1)}>
          {t('common.showFullArchive')}
        </button>
      )}
    </div>
  );
}
