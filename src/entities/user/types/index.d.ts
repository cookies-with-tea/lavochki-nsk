declare namespace UserTypes {
  type TelegramType = {
    auth_date: number
    first_name: string
    hash: string
    id: number
    last_name: string
    photo_url: string
    username: string
  }

  type One = {
    id: string
    role: 'user' | 'admin'
    telegram_id: number
    username: string
  }

  type All = Array<One>

  type ResponseType = CommonTypes.TableType<UserTypes.All>
}
