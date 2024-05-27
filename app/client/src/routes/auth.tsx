import type { RouteObject } from 'react-router';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';

export const authRoutes: RouteObject[] = [
  {
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'login/admin',
        element: <AdminLogin />,
      },
    ],
  },
];
