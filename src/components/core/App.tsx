import { Route, Routes } from 'react-router-dom'

import { NotFoundPage } from '@/pages'

import { AuthorizationLayout } from '@/layouts/AuthorizationLayout/AuthorizationLayout'
import { MainLayout } from '@/layouts/MainLayout/MainLayout'

import { authorizationLayoutRoutes, mainLayoutRoutes } from '@/components/layouts'
import { useMemo, useState } from 'react'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { getColorsByTheme } from '@/shared/lib/utils'
import { ThemeContext } from '@/shared/contexts'

export const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme(getColorsByTheme(mode)),
    [mode]
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.default' }}>
          <Routes>
            <Route element={<MainLayout />}>
              {mainLayoutRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
              ))}
            </Route>

            <Route element={<AuthorizationLayout />}>
              {authorizationLayoutRoutes.map(({ path, element }, index) => (
                <Route path={path} element={element} key={index} />
              ))}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
