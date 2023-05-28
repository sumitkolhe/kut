import { Schema, model } from 'mongoose'

export const UserSchema = new Schema(
  {
    profile: {
      firstName: {
        type: String,
        required: false,
        lowercase: true,
      },
      lastName: {
        type: String,
        required: false,
        lowercase: true,
      },
      picture: {
        type: String,
        required: false,
      },
    },
    authProviders: {
      social: {
        google: {
          type: Boolean,
          required: true,
          default: false,
        },
        github: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      credentials: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
      select: false,
    },
    isBanned: {
      type: Boolean,
      required: false,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    apiKeys: {
      type: [
        {
          key: {
            type: String,
            required: false,
            index: true,
          },
          issuedOn: {
            type: Date,
            required: true,
            default: Date.now,
          },
          expirationDate: {
            type: Date,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          lastUsedOn: {
            type: Date,
            required: false,
          },
        },
      ],
      required: false,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } } // InferSchemaType doesn't work properly without spcifying timestamps keys manually
)

export const UserModel = model('user', UserSchema)
