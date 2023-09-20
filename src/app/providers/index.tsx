import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import { router } from 'app/providers/router'
import { themeConfig } from 'app/providers/theme'

export const Provider = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}