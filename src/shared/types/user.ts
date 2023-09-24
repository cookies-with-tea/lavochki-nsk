export type UserTelegramType = {
  auth_date: number
  first_name: string
  hash: string
  id: number
  last_name: string
  photo_url: string
  username: string
}

export type AuthorizationResponseType = { 
  access: string
  refresh: string
}
