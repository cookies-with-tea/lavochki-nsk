import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  RootRoute,
  Route,
  RouterProvider as TanstackRouterProvider,
  ScrollRestoration,
} from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { getRoutesByRoot } from 'app/providers/router/model'

interface MyRouterContext {
  isAuth: boolean
}

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      )

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />

      <Outlet />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})

const staticPageLayoutRoute = createRoute({
  id: 'static#pages',
  getParentRoute: () => rootRoute,
  component: lazy(() => import('app/layouts/base-layout')),
  beforeLoad: ({ context }) => {
    // @ts-ignore
    if (!context?.isAuth) {
      throw redirect({
        to: '/',
      })
    }
  },
})

const guestLayoutRoute = createRoute({
  id: 'guest-layout',
  getParentRoute: () => rootRoute,
  component: lazy(() => import('app/layouts/guest-layout')),
  beforeLoad: ({ context }) => {
    // @ts-ignore
    if (context?.isAuth) {
      throw redirect({
        to: 'home',
      })
    }
  },
})

const loginRoute = createRoute({
  path: '/',
  getParentRoute: () => guestLayoutRoute,
  component: lazy(() => import('#pages/login')),
})

const homeRoute = createRoute({
  path: 'home',
  getParentRoute: () => staticPageLayoutRoute,
  component: lazy(() => import('#pages/home')),
})

const adminsRoute = createRoute({
  path: 'admins',
  getParentRoute: () => staticPageLayoutRoute,
  component: lazy(() => import('#pages/admins')),
})

const benchesRoute = createRoute({
  path: 'benches',
  getParentRoute: () => staticPageLayoutRoute,
  component: lazy(() => import('#pages/benches')),
})

const routeTree = rootRoute.addChildren([
  guestLayoutRoute.addChildren([loginRoute]),
  staticPageLayoutRoute.addChildren([adminsRoute, homeRoute, benchesRoute]),
])

const router = createRouter({ routeTree, context: { isAuth: false } })

export const RouterProvider = () => {
  const isAuth = true

  return (
    <Suspense fallback={'loading...'}>
      <TanstackRouterProvider router={router} context={{ isAuth }} />
    </Suspense>
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
