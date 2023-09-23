import type { Router } from '@remix-run/router'
import { createBrowserRouter } from 'react-router-dom'

import { BaseLayout } from 'app/layouts/base'
import { GuestLayout } from 'app/layouts/guest'

import { BenchesPage } from 'pages/benches'
import { HomePage } from 'pages/home'
import { LoginPage } from 'pages/login'
import { UIKitPage } from 'pages/UIKit'
import { UsersPage } from 'pages/users'
import { TagsPage } from 'pages/tags'

// TODO: Добавить динамический роутинг
// TODO: Добавить atomic-router
// const UIKitPage = SLoadable(lazy(() => import('pages/UIKit')))

export const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/uikit',
        element: <UIKitPage />
      },
      {
        path: '/benches',
        element: <BenchesPage />
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/tags',
        element: <TagsPage />,
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
])
