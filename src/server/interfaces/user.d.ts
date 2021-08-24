export interface currentUserTokenInterface {
  email: string
  iat: number
  exp: number
}

export interface userDetailsInterface extends currentUserTokenInterface {
  password: string
  apiKey?: string
  isBanned?: boolean
  createdAt?: Date
  modifiedAt?: Date
  isVerified?: boolean
}
