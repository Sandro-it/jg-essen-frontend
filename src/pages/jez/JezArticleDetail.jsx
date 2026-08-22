import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchJezArticleBySlug, fetchJezIssueById, getMediaUrl } from '../../api/strapi';
import JezAudioPlayer from './JezAudioPlayer';
import NotFound from '../NotFound';

// HTML-атрибут download браузери ігнорують для cross-origin посилань (а
// Cloudinary CDN завжди cross-origin) — натомість Cloudinary форсує
// Content-Disposition: attachment через fl_attachment у самому URL.
function withCloudinaryAttachment(url) {
  if (!url) return url;
  return url.includes('/upload/') ? url.replace('/upload/', '/upload/fl_attachment/') : url;
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

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
        <section className="jez-player-card">
          <div className="jez-player-card__label">
            <span className="jez-player-card__kicker">СЛУХАТИ JEZ</span>
            <span className="jez-player-card__hint">Аудіоверсія цієї статті</span>
          </div>
          <JezAudioPlayer src={audioUrl} fallbackDurationSeconds={item.durationSeconds} />
        </section>
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
            <DownloadIcon />
            Читать статью (PDF)
          </a>
        )}
        {issuePdfUrl && (
          <a className="jez-download-link" href={issuePdfUrl} target="_blank" rel="noreferrer">
            <DownloadIcon />
            Скачать выпуск (PDF)
          </a>
        )}
        {audioUrl && (
          <a
            className="jez-download-link"
            href={withCloudinaryAttachment(audioUrl)}
            download
            target="_blank"
            rel="noreferrer"
          >
            <DownloadIcon />
            Завантажити аудіо (MP3)
          </a>
        )}
      </div>
    </div>
  );
}
