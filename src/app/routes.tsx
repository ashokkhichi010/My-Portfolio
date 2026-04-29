import { createBrowserRouter } from 'react-router';
import { AdminRoute } from './components/AdminRoute';
import { Layout } from './components/Layout';
import { AdminLogin } from './pages/AdminLogin';
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
        path: '*',
        Component: MissionControl,
      },
    ],
  },
  {
    path: '/chat',
    Component: VisitorChat,
  },
  {
    path: '/admin-login',
    Component: AdminLogin,
  },
  {
    path: '/admin-dashboard',
    element: (
      <AdminRoute>
        <AdminChat />
      </AdminRoute>
    ),
  },
]);
