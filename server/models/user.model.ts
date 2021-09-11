import { model, Schema, Document } from 'mongoose'
import { LinkModel } from './link.model'

export interface UserDocument extends Document {
  name: string
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

const UserSchema: Schema = new Schema(
  {
    name: {
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
      minlength: 6,
    },
    userLinks: [{ type: Schema.Types.ObjectId, ref: LinkModel }],
  },
  {
    timestamps: true,
  }
)

model<UserDocument>('user', UserSchema).ensureIndexes()

export const UserModel = model<UserDocument>('user', UserSchema)
