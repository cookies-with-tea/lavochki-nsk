export {}

type TelegramAuthType = {
  bot_id: number
  request_access: boolean
}

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (options: TelegramAuthType, cb: (data: UserTypes.TelegramType) => Promise<void>) => void
      }
    }
  }
}
