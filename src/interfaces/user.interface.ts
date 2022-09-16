export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  isBanned: boolean
  isVerified: boolean
  apiKey: string
  userLinks: []
  createdAt: Date
  updatedAt: Date
}
