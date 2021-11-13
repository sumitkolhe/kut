export interface CurrentUser {
  email: string
  iat: number
  exp: number
}
export interface User extends CurrentUser {
  name: string
  email: string
  password: string
  apiKey: string
  isBanned: boolean
  createdAt: Date
  modifiedAt: Date
  isVerified: boolean
}
