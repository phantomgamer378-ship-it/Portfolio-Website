import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Work = lazy(() => import('./pages/Work').then(module => ({ default: module.Work })));
const WorkDetail = lazy(() => import('./pages/WorkDetail').then(module => ({ default: module.WorkDetail })));
const Credentials = lazy(() => import('./pages/Credentials').then(module => ({ default: module.Credentials })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

const GithubActivity = lazy(() => import('./pages/GithubActivity').then(module => ({ default: module.GithubActivity })));
const CodeforcesActivity = lazy(() => import('./pages/CodeforcesActivity').then(module => ({ default: module.CodeforcesActivity })));
const LeetcodeActivity = lazy(() => import('./pages/LeetcodeActivity').then(module => ({ default: module.LeetcodeActivity })));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="activity/github" element={<GithubActivity />} />
          <Route path="activity/codeforces" element={<CodeforcesActivity />} />
          <Route path="activity/leetcode" element={<LeetcodeActivity />} />
          <Route path="credentials" element={<Credentials />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
