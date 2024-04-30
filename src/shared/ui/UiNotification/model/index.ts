import { showNotification } from '@mantine/notifications'
import { createEffect } from 'effector'

type UiNotificationType = {
  type?: CommonTypes.Status
  message?: string
  title?: string
}

export const notificationFx = createEffect(({ type = 'success', message, title }: UiNotificationType) => {
  const colorsMap: Record<CommonTypes.Status, string> = {
    success: 'green',
    error: 'red',
  }

  showNotification({
    color: colorsMap[type],
    title,
    message,
  })
})
