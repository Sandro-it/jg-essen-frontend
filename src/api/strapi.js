import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const strapiClient = axios.create({
  baseURL: `${API_URL}/api`,
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
