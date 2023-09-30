export type UserTelegramType = {
  auth_date: number
  first_name: string
  hash: string
  id: number
  last_name: string
  photo_url: string
  username: string
}

export type UserType = {
  id: string
  role: 'user' | 'admin'
  telegram_id: number
  username: string
}

export type AuthorizationResponseType = { 
  access: string
  refresh: string
}
