import { AnyRootRoute, AnyRoute, createRoute, RouteOptions } from '@tanstack/react-router'
import { lazy } from 'react'

type Route = {
  path: string
  children?: Array<Route>
} & Partial<RouteOptions>

export const routes: Array<Route> = [
  {
    path: '/',
    id: 'HOME_PAGE',
    component: lazy(() => import('#pages/home')),
  },
  {
    path: '/admins',
    id: 'ADMINS_PAGE',
    component: lazy(() => import('#pages/admins')),
  },
]

const getRoutes = (routes: Route[], root: AnyRoute): AnyRootRoute => {
  root.addChildren(
    routes.map((route) => {
      const _route = createRoute({
        getParentRoute: () => root,
        ...route,
      })

      if (route.children) {
        getRoutes(route.children, _route)
      }

      return _route
    })
  )

  return root
}

export const getRoutesByRoot = getRoutes.bind(null, routes)
