import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchJezArticlesByIssue, fetchJezIssueById, getMediaUrl } from '../../api/strapi';
import { formatDuration } from '../../utils/duration';
import NotFound from '../NotFound';

export default function JezArticlesList() {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    Promise.all([fetchJezIssueById(issueId), fetchJezArticlesByIssue(issueId)])
      .then(([issueData, articlesData]) => {
        if (cancelled) return;
        if (!issueData) {
          setStatus('notfound');
          return;
        }
        setIssue(issueData);
        setArticles(articlesData);
        setStatus('done');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [issueId]);

  if (status === 'notfound') return <NotFound />;

  const issueItem = issue?.attributes || issue;

  return (
    <div>
      <Link to="/jez-test" className="jez-back">
        ← Усі випуски
      </Link>

      {status === 'loading' && <p className="jez-state">Завантаження…</p>}
      {status === 'error' && <p className="jez-state">Не вдалося завантажити випуск.</p>}

      {status === 'done' && (
        <>
          <h1 className="jez-title">
            Випуск №{issueItem.number}
            {issueItem.title ? ` — ${issueItem.title}` : ''}
          </h1>
          {issueItem.issueDate && (
            <p className="jez-subtitle">{new Date(issueItem.issueDate).toLocaleDateString('uk-UA')}</p>
          )}

          {articles.length === 0 && <p className="jez-state">У цьому випуску поки немає озвучених статей.</p>}

          {articles.length > 0 && (
            <ul className="jez-articles-list">
              {articles.map((article) => {
                const item = article.attributes || article;
                const thumbUrl = getMediaUrl(item.image);
                return (
                  <li key={article.id}>
                    <Link to={`/jez-test/${issueId}/${item.slug}`} className="jez-article-card">
                      <div
                        className="jez-article-card__thumb"
                        style={thumbUrl ? { backgroundImage: `url(${thumbUrl})` } : undefined}
                      />
                      <div className="jez-article-card__body">
                        <div className="jez-article-card__title">{item.title}</div>
                        <div className="jez-article-card__meta">
                          {item.author ? `${item.author} · ` : ''}
                          {formatDuration(item.durationSeconds)}
                        </div>
                      </div>
                      <span className="jez-article-card__play" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
