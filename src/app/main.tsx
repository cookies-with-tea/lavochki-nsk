import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import 'virtual:svg-icons-register'
import 'app/styles/index.scss'
import { router } from 'app/provides/router'
import { themeConfig } from 'app/provides/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)
