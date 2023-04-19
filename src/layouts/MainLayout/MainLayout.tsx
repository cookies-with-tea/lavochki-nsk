import { Outlet } from 'react-router-dom'
import { MainLayoutSidebar } from '@/components/layouts/MainLayout/MainLayoutSidebar/MainLayoutSidebar'

export const MainLayout = () => {
  return (
    <div className={'d-f w-100 h-100'}>
      <MainLayoutSidebar />

      <div className={'w-100'}>
        header
        <Outlet />
      </div>
    </div>
  )
}
