import type { RouteObject } from 'react-router';
import Login from '../pages/Login';

export const authRoutes: RouteObject[] = [
  {
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];
