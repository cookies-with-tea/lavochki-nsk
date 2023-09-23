import { ConfigProvider, Radio, Space, theme } from 'antd'
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from 'app/providers/router'
import { themeConfig } from 'app/providers/theme'

export const Provider = () => {
  const [themeState, setThemeState] = useState('light')

  const { defaultAlgorithm, darkAlgorithm } = theme

  const lightTheme = {
    colorPrimary: '#6AD7E5',
  }

  const darkTheme = {
    colorPrimary: '#E59E6A',
  }

  const handleThemeChange = (e: any) => {
    setThemeState(e.target.value)

    if (document.documentElement.classList.contains(e.target.value)) {
      return
    }

    document.documentElement.classList.remove(themeState)
    document.documentElement.classList.add(e.target.value)
  }

  useEffect(() => {
    document.documentElement.classList.add(themeState)
  }, [])  

  return (
    <ConfigProvider
      theme={
        { 
          ...themeConfig,
          token: { 
            ...themeConfig.token,
            ...(themeState === 'light' ? lightTheme : darkTheme)
          },
          algorithm: themeState === 'light' ? defaultAlgorithm : darkAlgorithm,
        }
      }
    >
      <Space direction={'vertical'} size={12}>
        <Radio.Group value={themeState} onChange={handleThemeChange}>
          <Radio value={'light'}>Light</Radio>
          <Radio value={'dark'}>Dark</Radio>
        </Radio.Group>
      </Space>

      <RouterProvider router={router} />
    </ConfigProvider>
  )
}