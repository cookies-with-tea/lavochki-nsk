import { MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'

import { RouterProvider } from 'app/providers/router'
import { theme } from 'app/providers/theme'

export { theme } from 'app/providers/theme'

export const Provider = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider />
    </MantineProvider>
  )
}
