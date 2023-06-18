import type { UserClass } from 'server/modules/users/models'

export type UserLoginDto = Pick<UserClass, 'email' | 'password'>

export interface UserGithubLoginDto {
  code: string
}
