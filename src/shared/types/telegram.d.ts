export {}

export type TelegramUserType = Readonly<{
  auth_date: number
  first_name: string
  last_name?: string
  hash: string
  id: number
  photo_url?: string
  username?: string
}>

type AuthType = {
  bot_id?: string,
  request_access: boolean
  // eslint-disable-next-line no-unused-vars
  callback: (data: TelegramUserType) => void
}

// eslint-disable-next-line no-unused-vars
type AuthFunctionType = (options: Pick<AuthType, 'bot_id' | 'request_access'>, callback: AuthType['callback']) => void

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: AuthFunctionType
      }
    }
  }
}
