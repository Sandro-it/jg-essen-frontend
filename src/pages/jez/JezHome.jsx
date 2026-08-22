import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchJezArticlesByIssue, fetchJezIssues, getMediaUrl } from '../../api/strapi';
import { formatDuration } from '../../utils/duration';

// Об'єднаний головний екран JEZ: карусель випусків + статті вибраного випуску
// на одній сторінці (без переходу), за макетом клієнтки. Обслуговує і
// /jez-test, і старі /jez-test/:issueId посилання (issueId з URL, якщо є,
// стає початково вибраним випуском — інакше вибирається найновіший).
export default function JezHome() {
  const { issueId: issueIdParam } = useParams();
  const [issues, setIssues] = useState([]);
  const [issuesStatus, setIssuesStatus] = useState('loading');
  const [selectedIssueId, setSelectedIssueId] = useState(issueIdParam ? Number(issueIdParam) : null);
  const [articles, setArticles] = useState([]);
  const [articlesStatus, setArticlesStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    fetchJezIssues()
      .then((data) => {
        if (cancelled) return;
        setIssues(data);
        setIssuesStatus('done');
        // Немає issueId з URL (звичайний /jez-test) — вибрати найновіший
        // (список уже відсортований number:desc на бекенді).
        setSelectedIssueId((current) => current ?? data[0]?.id ?? null);
      })
      .catch(() => {
        if (!cancelled) setIssuesStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedIssueId) return undefined;
    let cancelled = false;
    setArticlesStatus('loading');
    fetchJezArticlesByIssue(selectedIssueId)
      .then((data) => {
        if (cancelled) return;
        setArticles(data);
        setArticlesStatus('done');
      })
      .catch(() => {
        if (!cancelled) setArticlesStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [selectedIssueId]);

  const selectedIssue = issues.find((issue) => issue.id === selectedIssueId);
  const selectedIssueItem = selectedIssue?.attributes || selectedIssue;

  return (
    <div>
      <section className="jez-hero">
        <h1 className="jez-hero__title">
          JEZ
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
            <rect x="17" y="13" width="4" height="6" rx="1.5" />
            <rect x="3" y="13" width="4" height="6" rx="1.5" />
          </svg>
        </h1>
        <p className="jez-hero__subtitle">Jetzt auch zum Hören!</p>
      </section>

      <section className="jez-issues-section">
        <h2 className="jez-section-title">Ausgabe wählen</h2>

        {issuesStatus === 'loading' && <p className="jez-state">Wird geladen…</p>}
        {issuesStatus === 'error' && <p className="jez-state">Ausgaben konnten nicht geladen werden.</p>}
        {issuesStatus === 'done' && issues.length === 0 && <p className="jez-state">Noch keine Ausgabe vorhanden.</p>}

        {issuesStatus === 'done' && issues.length > 0 && (
          <ul className="jez-issues-row">
            {issues.map((issue) => {
              const item = issue.attributes || issue;
              const coverUrl = getMediaUrl(item.coverImage);
              const isActive = issue.id === selectedIssueId;
              return (
                <li key={issue.id}>
                  <button
                    type="button"
                    className={`jez-issue-card${isActive ? ' is-active' : ''}`}
                    onClick={() => setSelectedIssueId(issue.id)}
                    aria-pressed={isActive}
                  >
                    <span
                      className="jez-issue-card__cover"
                      style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}
                    />
                    <span className="jez-issue-card__body">
                      <span className="jez-issue-card__number">№{item.number}</span>
                      {item.issueDate && (
                        <span className="jez-issue-card__date">
                          {new Date(item.issueDate).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {selectedIssueId && (
        <section className="jez-articles-section">
          <h2 className="jez-section-title">Artikel der Ausgabe Nr. {selectedIssueItem?.number ?? ''}</h2>

          {articlesStatus === 'loading' && <p className="jez-state">Wird geladen…</p>}
          {articlesStatus === 'error' && <p className="jez-state">Artikel konnten nicht geladen werden.</p>}
          {articlesStatus === 'done' && articles.length === 0 && (
            <p className="jez-state">Für diese Ausgabe gibt es noch keine vertonten Artikel.</p>
          )}

          {articlesStatus === 'done' && articles.length > 0 && (
            <ul className="jez-articles-list">
              {articles.map((article) => {
                const item = article.attributes || article;
                const thumbUrl = getMediaUrl(item.image);
                return (
                  <li key={article.id}>
                    <Link to={`/jez-test/${selectedIssueId}/${item.slug}`} className="jez-article-card">
                      <div
                        className="jez-article-card__thumb"
                        style={thumbUrl ? { backgroundImage: `url(${thumbUrl})` } : undefined}
                      />
                      <div className="jez-article-card__body">
                        <div className="jez-article-card__title">{item.title}</div>
                        <div className="jez-article-card__meta">
                          {item.author ? `${item.author} · ` : ''}
                          <span className="jez-article-card__duration">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 3" />
                            </svg>
                            {formatDuration(item.durationSeconds)}
                          </span>
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
        </section>
      )}
    </div>
  );
}
