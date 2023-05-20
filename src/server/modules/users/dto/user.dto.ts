import type { UserSchema } from 'server/modules/users/models/user.model'

export type UserDto = (typeof UserSchema)[0]
export type UserDtoWithDefaults = (typeof UserSchema)[1]
