export interface User {
  email: string
  profile: {
    firstName: string
    lastName: string
    picture: string
    name: string
  }
  password: string
  isBanned: boolean
  isVerified: boolean
  apiKeys: {
    key: string
    issuedOn: string
    expirationDate: Date
    name: string
    lastUsedOn: Date
  }
  createdAt: Date
  updatedAt: Date
}
