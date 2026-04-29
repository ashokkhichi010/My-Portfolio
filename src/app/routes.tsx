import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { MissionControl } from './pages/MissionControl';
import { VisitorChat } from './pages/VisitorChat';
import { AdminChat } from './pages/AdminChat';

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
        path: 'chat',
        Component: VisitorChat,
      },
      {
        path: 'admin-dashboard',
        Component: AdminChat,
      },
      {
        path: '*',
        Component: MissionControl,
      },
    ],
  },
]);
