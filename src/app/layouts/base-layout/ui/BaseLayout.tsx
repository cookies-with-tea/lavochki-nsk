import { Outlet } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'


export const BaseLayout = () => {
  return (
    <div>
      <h1>Layout</h1>

      <Outlet />

      {/*<Suspense>*/}
      {/*  <TanStackRouterDevtools />*/}
      {/*</Suspense>*/}
    </div>
  )
}
