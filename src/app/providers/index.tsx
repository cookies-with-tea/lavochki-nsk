import { ConfigProvider, Radio, Space, theme } from 'antd'
import {  useEffect, useRef, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from 'app/providers/router'
import { themeConfig } from 'app/providers/theme'

import { useLocalStorage } from 'shared/lib/hooks'

export const Provider = () => {
  const { get, set } = useLocalStorage()

  const getPreferredColorScheme = () => {
    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)


    if (window.matchMedia) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }

      return 'light'
    }
    return 'light'
  }

  // TODO: Вынести в другое место
  // TODO: Использовать по умолчанию не белую тему, а тему системы.
  const [themeState, setThemeState] = useState(get('theme') ?? 'dark')

  const modalContainerRef = useRef<HTMLElement | undefined>(undefined)

  const { defaultAlgorithm, darkAlgorithm } = theme

  const lightTheme = {
    colorPrimary: '#6AD7E5',
  }

  const darkTheme = {
    colorPrimary: '#E59E6A',
  }

  // TODO: Добавить проверку на getPreferredColorScheme()
  const handleThemeChange = (e: any) => {
    setThemeState(e.target.value)

    set('theme', e.target.value)

    if (document.documentElement.classList.contains(e.target.value)) {
      return
    }

    document.documentElement.classList.remove(themeState)
    document.documentElement.classList.add(e.target.value)
  }

  useEffect(() => {
    document.documentElement.classList.add(themeState)
  })

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
      getPopupContainer={() => modalContainerRef.current as HTMLElement}
    >
      <Space direction={'vertical'} size={12}>
        <Radio.Group value={themeState} onChange={handleThemeChange}>
          <Radio value={'light'}>Light</Radio>
          <Radio value={'dark'} defaultChecked>Dark</Radio>
          <Radio value={'system'}>System</Radio>
        </Radio.Group>
      </Space>

      <RouterProvider router={router} />

      {/* TODO: Разобраться с типами */}
      {/* @ts-ignore */}
      <div className={'popup-container'} ref={modalContainerRef}></div>
    </ConfigProvider>
  )
}
