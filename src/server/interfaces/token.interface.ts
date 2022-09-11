export interface Token {
  accessToken: string
}

export interface Tokens extends Token {
  refreshToken: string
}
