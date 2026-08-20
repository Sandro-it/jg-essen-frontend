import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// Тестовий розділ "JEZ — можна слухати" (jez-test) може тимчасово жити на
// окремому Render-сервісі (інша гілка бекенду), поки не влитий в main.
// VITE_JEZ_API_URL, якщо задано, перекриває бекенд лише для jez-запитів,
// не чіпаючи VITE_API_URL, яким користується решта сайту. Якщо не задано —
// падає назад на той самий бекенд, що й решта сайту.
const JEZ_API_URL = import.meta.env.VITE_JEZ_API_URL || API_URL;

const jezClient = axios.create({
  baseURL: `${JEZ_API_URL}/api`,
});

export function getMediaUrl(media) {
  if (!media) return null;
  const url = media.url || media.data?.attributes?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

export async function fetchLatestNews(limit = 3) {
  const { data } = await strapiClient.get('/news-items', {
    params: {
      sort: 'date:desc',
      'pagination[limit]': limit,
      populate: 'mainImage',
    },
  });
  return data.data;
}

export async function fetchNewsArchive({ page = 1, pageSize = 12 } = {}) {
  const { data } = await strapiClient.get('/news-items', {
    params: {
      sort: 'date:desc',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      populate: 'mainImage',
    },
  });
  return data;
}

export async function fetchUpcomingEvents(limit = 5) {
  const { data } = await strapiClient.get('/events', {
    params: {
      sort: 'date:asc',
      'filters[date][$gte]': new Date().toISOString(),
      'pagination[limit]': limit,
    },
  });
  return data.data;
}

export async function fetchEventsArchive({ page = 1, pageSize = 12 } = {}) {
  const { data } = await strapiClient.get('/events', {
    params: {
      sort: 'date:desc',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
    },
  });
  return data;
}

// Фільтр по числовому id через колекційний endpoint замість findOne —
// уникає залежності від Strapi 5 documentId, який list-відповіді не містять.
export async function fetchNewsById(id) {
  const { data } = await strapiClient.get('/news-items', {
    params: {
      'filters[id][$eq]': id,
      populate: ['mainImage', 'gallery'],
    },
  });
  return data.data[0] || null;
}

export async function fetchEventById(id) {
  const { data } = await strapiClient.get('/events', {
    params: {
      'filters[id][$eq]': id,
    },
  });
  return data.data[0] || null;
}

// --- JEZ (тестовий розділ "JEZ — можна слухати") ---

export async function fetchJezIssues() {
  const { data } = await jezClient.get('/jez-issues', {
    params: {
      sort: 'number:desc',
      populate: 'coverImage',
    },
  });
  return data.data;
}

export async function fetchJezIssueById(id) {
  const { data } = await jezClient.get('/jez-issues', {
    params: {
      'filters[id][$eq]': id,
      populate: ['coverImage', 'issuePdf'],
    },
  });
  return data.data[0] || null;
}

export async function fetchJezArticlesByIssue(issueId) {
  const { data } = await jezClient.get('/jez-articles', {
    params: {
      'filters[issue][id][$eq]': issueId,
      sort: 'sortOrder:asc',
      populate: ['image', 'audioFile', 'articlePdf'],
    },
  });
  return data.data;
}

// issue тут популюється лише "мілко" (номер/назва/дата для підпису) —
// PDF випуску окремо через fetchJezIssueById(article.issue.id), якщо потрібен.
export async function fetchJezArticleBySlug(slug) {
  const { data } = await jezClient.get('/jez-articles', {
    params: {
      'filters[slug][$eq]': slug,
      populate: ['image', 'audioFile', 'articlePdf', 'issue'],
    },
  });
  return data.data[0] || null;
}
