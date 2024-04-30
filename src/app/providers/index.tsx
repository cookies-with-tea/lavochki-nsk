import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { RouterProvider } from 'app/providers/router'
import { theme } from 'app/providers/theme'

export { theme } from 'app/providers/theme'

export const Provider = () => {
  return (
    <MantineProvider defaultColorScheme={'dark'} theme={theme}>
      <Notifications position={'top-right'} />

      <RouterProvider />
    </MantineProvider>
  )
}
