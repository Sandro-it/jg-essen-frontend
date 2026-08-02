# Jüdische Gemeinde Essen — Frontend

React + Vite фронтенд нового сайту Єврейської громади Ессена.

## Стек

- React + Vite
- react-router-dom — роутинг
- axios — запити до Strapi API
- i18next / react-i18next — багатомовність (DE / UA / RU, порядок перемикання по колу)

## Розробка

```bash
npm install
cp .env.example .env   # вкажіть VITE_STRAPI_URL, якщо бекенд не на localhost:1337
npm run dev
```

## Структура

- `src/i18n/` — конфігурація i18next та переклади (`locales/de.json`, `ua.json`, `ru.json`)
- `src/context/ThemeContext.jsx` — світла/темна тема (CSS-змінні в `src/styles/variables.css`)
- `src/data/sections.js` — конфігурація розділів SectionHub (меню, підсторінки)
- `src/components/SectionHub.jsx`, `SectionSubpage.jsx` — узагальнені компоненти для всіх розділів
  (UNSERE GEMEINDE, GLAUBE & TRADITION мають готовий дизайн; решта — заглушки з placeholder-текстом)
- `src/pages/Aktuelles.jsx`, `Veranstaltungen.jsx` — новини/події з бекенду Strapi
- `design-reference/` — референс-скріншоти макету з Figma (PNG) та ескіз структури сайту (PDF)

## Дизайн

Джерело істини — Figma-макет "Сайт Єврейської громади Ессен (Copy)". Референс-зображення
експортовані в `design-reference/`.
