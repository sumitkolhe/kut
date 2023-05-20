export interface AccessTokenDto {
  accessToken: string
}

export interface RefreshTokenDto {
  refreshToken: string
}

export interface VerificationTokenDto {
  verificationToken: string
}

export type AuthTokenDto = AccessTokenDto & RefreshTokenDto
