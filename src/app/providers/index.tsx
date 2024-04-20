import { MantineProvider } from '@mantine/core'

import { RouterProvider } from 'app/providers/router'
import { theme } from 'app/providers/theme'

export { theme } from 'app/providers/theme'

export const Provider = () => {
  return (
    <MantineProvider defaultColorScheme={'dark'} theme={theme}>
      <RouterProvider />
    </MantineProvider>
  )
}
