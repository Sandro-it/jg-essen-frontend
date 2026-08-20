import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJezIssues, getMediaUrl } from '../../api/strapi';

export default function JezIssuesList() {
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    fetchJezIssues()
      .then((data) => {
        if (cancelled) return;
        setIssues(data);
        setStatus('done');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="jez-title">JEZ — можна слухати</h1>
      <p className="jez-subtitle">Випуски журналу озвучені для тих, кому зручніше слухати, ніж читати.</p>

      {status === 'loading' && <p className="jez-state">Завантаження…</p>}
      {status === 'error' && <p className="jez-state">Не вдалося завантажити випуски.</p>}
      {status === 'done' && issues.length === 0 && <p className="jez-state">Поки що немає жодного випуску.</p>}

      {status === 'done' && issues.length > 0 && (
        <ul className="jez-issues-grid">
          {issues.map((issue) => {
            const item = issue.attributes || issue;
            const coverUrl = getMediaUrl(item.coverImage);
            return (
              <li key={issue.id}>
                <Link to={`/jez-test/${issue.id}`} className="jez-issue-card">
                  <div
                    className="jez-issue-card__cover"
                    style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}
                  />
                  <div className="jez-issue-card__body">
                    <div className="jez-issue-card__number">Випуск №{item.number}</div>
                    {item.title && <div className="jez-issue-card__title">{item.title}</div>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
