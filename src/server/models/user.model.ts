import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  isBanned: boolean
  isVerified: boolean
  apiKey: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new mongoose.Schema(
  {
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
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
)

export const UserModel = mongoose.model<UserDocument>('user', UserSchema)
