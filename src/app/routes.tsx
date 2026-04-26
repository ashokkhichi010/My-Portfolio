import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { MissionControl } from './pages/MissionControl';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: MissionControl,
      },
      {
        path: '*',
        Component: MissionControl,
      },
    ],
  },
]);
