import type { UserClass } from 'server/modules/users/models'

export type UserRegisterDto = Pick<UserClass, 'email' | 'password'>
