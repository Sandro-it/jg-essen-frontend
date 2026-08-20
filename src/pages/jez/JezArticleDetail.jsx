import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchJezArticleBySlug, fetchJezIssueById, getMediaUrl } from '../../api/strapi';
import JezAudioPlayer from './JezAudioPlayer';
import NotFound from '../NotFound';

export default function JezArticleDetail() {
  const { issueId, articleSlug } = useParams();
  const [article, setArticle] = useState(null);
  const [issuePdfUrl, setIssuePdfUrl] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchJezArticleBySlug(articleSlug)
      .then(async (data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('notfound');
          return;
        }
        setArticle(data);
        setStatus('done');

        const item = data.attributes || data;
        const issueRef = item.issue?.data || item.issue;
        if (issueRef?.id) {
          const fullIssue = await fetchJezIssueById(issueRef.id).catch(() => null);
          const issueItem = fullIssue?.attributes || fullIssue;
          if (!cancelled && issueItem) setIssuePdfUrl(getMediaUrl(issueItem.issuePdf));
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [articleSlug]);

  if (status === 'notfound') return <NotFound />;
  if (status === 'loading') return <p className="jez-state">Завантаження…</p>;
  if (status === 'error') return <p className="jez-state">Не вдалося завантажити статтю.</p>;

  const item = article.attributes || article;
  const audioUrl = getMediaUrl(item.audioFile);
  const articlePdfUrl = getMediaUrl(item.articlePdf);
  const issueRef = item.issue?.data?.attributes || item.issue?.attributes || item.issue?.data || item.issue;

  return (
    <div>
      <Link to={`/jez-test/${issueId}`} className="jez-back">
        ← До випуску
      </Link>

      <h1 className="jez-title">{item.title}</h1>
      <p className="jez-article-detail__meta">
        {item.author && (
          <>
            <strong>{item.author}</strong> ·{' '}
          </>
        )}
        {issueRef && (
          <>
            Випуск №{issueRef.number}
            {issueRef.issueDate ? `, ${new Date(issueRef.issueDate).toLocaleDateString('uk-UA')}` : ''}
          </>
        )}
      </p>

      {audioUrl ? (
        <JezAudioPlayer src={audioUrl} fallbackDurationSeconds={item.durationSeconds} />
      ) : (
        <p className="jez-state">Аудіоверсія для цієї статті ще не завантажена.</p>
      )}

      {item.description && (
        <section className="jez-article-detail__description">
          <h2>О статье</h2>
          <ReactMarkdown>{item.description}</ReactMarkdown>
        </section>
      )}

      <div className="jez-article-detail__downloads">
        {articlePdfUrl && (
          <a className="jez-download-link" href={articlePdfUrl} target="_blank" rel="noreferrer">
            Читать статью (PDF)
          </a>
        )}
        {issuePdfUrl && (
          <a className="jez-download-link" href={issuePdfUrl} target="_blank" rel="noreferrer">
            Скачать выпуск (PDF)
          </a>
        )}
      </div>
    </div>
  );
}
