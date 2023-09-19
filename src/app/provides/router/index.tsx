import type { Router } from '@remix-run/router'
import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from 'app/layouts/base'
import { GuestLayout } from 'app/layouts/guest'

import { BenchesPage } from 'pages/benches'
import { LoginPage } from 'pages/login'
import { UIKitPage } from 'pages/UIKit'
import { UsersPage } from 'pages/users'

// TODO: Добавить динамический роутинг
// const UIKitPage = SLoadable(lazy(() => import('pages/UIKit')))

export const router: Router = createBrowserRouter([
  {
    path: '/login',
    element: <GuestLayout />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <UIKitPage />
      },
      {
        path: '/benches',
        element: <BenchesPage />
      },
      {
        path: '/users',
        element: <UsersPage />,
      }
    ]
  },
])
