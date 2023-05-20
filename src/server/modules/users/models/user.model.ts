import { schema, types } from 'papr'
import { papr } from 'server/common/helpers/mongo.helper'

export const UserSchema = schema(
  {
    profile: types.object(
      {
        firstName: types.string({ required: false }),
        lastName: types.string({ required: false }),
        picture: types.string({ required: false }),
        name: types.string({ required: false }),
      },
      { required: false }
    ),
    email: types.string({ required: true }),
    password: types.string({ required: true }),
    isBanned: types.boolean({ required: true }),
    isVerified: types.boolean({ required: true }),
    apiKeys: types.array(
      types.object(
        {
          apiKey: types.oneOf([types.string(), types.null()]),
          issuedOn: types.date(),
          expirationDate: types.date({ required: false }),
          name: types.string({ required: true }),
          lastUsedOn: types.date(),
        },
        { required: false }
      ),
      { required: false }
    ),
  },

  {
    defaults: {
      isBanned: false,
      isVerified: false,
      apiKeys: [],
    },
    timestamps: true,
  }
)

export const UserModel = papr.model('users', UserSchema)
