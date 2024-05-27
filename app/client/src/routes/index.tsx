import { Outlet } from 'react-router-dom';
import { Layout } from '../layouts/';
import { Suspense } from 'react';
import Home from '../pages/Home';
import { authRoutes } from './auth';
import AdminDash from '../pages/AdminDash';
import Users from '../pages/Users';

export const routes = [
  {
    element: (
      <Layout>
        <Suspense>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'admin',
        element: <AdminDash />,
      },
      {
        path: 'admin/users',
        element: <Users />,
      },
    ],
  },
  ...authRoutes,
];
