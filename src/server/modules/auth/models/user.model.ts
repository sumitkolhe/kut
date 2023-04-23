import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
  email: string
  profile: {
    firstName: string
    lastName: string
    picture: string
    name: string
  }
  password: string
  isBanned: boolean
  isVerified: boolean
  apiKeys: {
    key: string
    issuedOn: string
    expirationDate: Date
    name: string
    lastUsedOn: Date
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new mongoose.Schema(
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
      name: {
        type: String,
        required: false,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    apiKeys: [
      {
        key: {
          type: String,
          required: false,
          unique: true,
          index: true,
          default: () => {
            return Math.random().toString(36).slice(2, 11)
          },
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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
)

export const UserModel = mongoose.model<UserDocument>('user', UserSchema)
