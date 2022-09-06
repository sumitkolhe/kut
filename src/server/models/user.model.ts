import mongoose from 'mongoose'
import { LinkModel } from 'models/link.model'
import type { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  isBanned: boolean
  isVerified: boolean
  apiKey: string
  userLinks: {
    type: Schema.Types.ObjectId
    ref: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
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
    apiKey: {
      type: String,
      required: false,
      default: '',
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    userLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: LinkModel }],
  },
  {
    timestamps: true,
  }
)

// model<UserDocument>('user', UserSchema).ensureIndexes()

export const UserModel = mongoose.model<UserDocument>('user', UserSchema)
