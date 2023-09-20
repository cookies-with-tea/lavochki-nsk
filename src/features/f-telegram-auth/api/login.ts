import { usersApi } from 'shared/api'
import { UserType } from 'shared/types'

export const authUser = async (user: UserType) => {
  const [error, response] = await usersApi.login(user)

  if (error) {
    console.log(error)

    return
  }

  console.log(response)
}