import { Outlet } from '@tanstack/react-router'

export const GuestLayout = () => {
  return (
    <div>
      <h1>Guest Layout</h1>

      <Outlet />
    </div>
  )
}
