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
import JezLayout from './pages/jez/JezLayout';
import JezIssuesList from './pages/jez/JezIssuesList';
import JezArticlesList from './pages/jez/JezArticlesList';
import JezArticleDetail from './pages/jez/JezArticleDetail';

export default function App() {
  return (
    <Routes>
      {/* Ізольований демо-розділ "JEZ — можна слухати": власний хедер, поза
          Layout основного сайту і поза головним меню — лише прямий лінк. */}
      <Route element={<JezLayout />}>
        <Route path="jez-test" element={<JezIssuesList />} />
        <Route path="jez-test/:issueId" element={<JezArticlesList />} />
        <Route path="jez-test/:issueId/:articleSlug" element={<JezArticleDetail />} />
      </Route>

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
