import type { UserSchema } from 'server/modules/users/models/user.model'
import type { InferSchemaType } from 'mongoose'

export type UserDto = InferSchemaType<typeof UserSchema>
