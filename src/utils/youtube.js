// Перетворює звичайне посилання на YouTube (watch?v=, youtu.be/, вже embed/)
// у embed-URL для iframe. Повертає null, якщо посилання не розпізнано.
export function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  let videoId = null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1];
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1];
      } else {
        videoId = parsed.searchParams.get('v');
      }
    }
  } catch {
    return null;
  }

  if (!videoId) return null;
  videoId = videoId.split('&')[0].split('?')[0];

  return `https://www.youtube.com/embed/${videoId}`;
}
