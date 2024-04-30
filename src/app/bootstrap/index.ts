import { attachLogger } from 'effector-logger'

import { userEvents } from '#entities/user'

export const bootstrap = () => {
  userEvents.userChanged()

  attachLogger()
}
