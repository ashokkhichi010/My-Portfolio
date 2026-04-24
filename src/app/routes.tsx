import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Layout } from './components/Layout';
import { NotFound } from './pages/NotFound';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Journey = lazy(() => import('./pages/Journey').then(m => ({ default: m.Journey })));
const Skills = lazy(() => import('./pages/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Experience = lazy(() => import('./pages/Experience').then(m => ({ default: m.Experience })));
const Education = lazy(() => import('./pages/Education').then(m => ({ default: m.Education })));
const Achievements = lazy(() => import('./pages/Achievements').then(m => ({ default: m.Achievements })));
const Tools = lazy(() => import('./pages/Tools').then(m => ({ default: m.Tools })));
const Vision = lazy(() => import('./pages/Vision').then(m => ({ default: m.Vision })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

// Wrapper component for lazy loading with suspense
const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <Home />
          </LazyPage>
        ),
      },
      {
        path: 'about',
        element: (
          <LazyPage>
            <About />
          </LazyPage>
        ),
      },
      {
        path: 'journey',
        element: (
          <LazyPage>
            <Journey />
          </LazyPage>
        ),
      },
      {
        path: 'skills',
        element: (
          <LazyPage>
            <Skills />
          </LazyPage>
        ),
      },
      {
        path: 'projects',
        element: (
          <LazyPage>
            <Projects />
          </LazyPage>
        ),
      },
      {
        path: 'experience',
        element: (
          <LazyPage>
            <Experience />
          </LazyPage>
        ),
      },
      {
        path: 'education',
        element: (
          <LazyPage>
            <Education />
          </LazyPage>
        ),
      },
      {
        path: 'achievements',
        element: (
          <LazyPage>
            <Achievements />
          </LazyPage>
        ),
      },
      {
        path: 'tools',
        element: (
          <LazyPage>
            <Tools />
          </LazyPage>
        ),
      },
      {
        path: 'vision',
        element: (
          <LazyPage>
            <Vision />
          </LazyPage>
        ),
      },
      {
        path: 'contact',
        element: (
          <LazyPage>
            <Contact />
          </LazyPage>
        ),
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
