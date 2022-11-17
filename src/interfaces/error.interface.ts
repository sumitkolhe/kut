export enum ErrorType {
  unauthorised = 'Unauthorised',
  accountNotVerified = 'Account not verified',
  invalidAuthenticationToken = 'Invalid authentication token',
  invalidRefreshToken = 'Invalid refresh token',
  invalidVerifyToken = 'Invalid email verification token',
  emailAlreadyExists = 'Email address is already registered',
  userNotFound = 'User not found',
  incorrectLoginCredentials = 'Incorrect login credentials',
  aliasAlreadyUsed = 'Alias is already used',
  linkNotFound = 'Link not found',
}
