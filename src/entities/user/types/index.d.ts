declare namespace UserTypes {
  export type TelegramType = {
    auth_date: number
    first_name: string
    hash: string
    id: number
    last_name: string
    photo_url: string
    username: string
  }

  export type One = {
    id: string
    role: 'user' | 'admin'
    telegram_id: number
    username: string
  }
}
