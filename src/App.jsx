import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Veranstaltungen from './pages/Veranstaltungen';
import EventDetail from './pages/EventDetail';
import Aktuelles from './pages/Aktuelles';
import NewsDetail from './pages/NewsDetail';
import Spenden from './pages/Spenden';
import SectionSubpage from './components/SectionSubpage';
import TopLevelRouter from './pages/TopLevelRouter';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="veranstaltungen" element={<Veranstaltungen />} />
        <Route path="veranstaltungen/:id" element={<EventDetail />} />
        <Route path="aktuelles" element={<Aktuelles />} />
        <Route path="aktuelles/:id" element={<NewsDetail />} />
        <Route path="spenden" element={<Spenden />} />

        <Route path=":sectionSlug/:itemSlug" element={<SectionSubpage />} />
        <Route path=":slug" element={<TopLevelRouter />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
