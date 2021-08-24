import { model, Schema, Document, models } from 'mongoose'
import { LinkModel } from './link.model'

interface UserDocument extends Document {
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

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
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
  { timestamps: true }
)

UserSchema.index({ email: 1 }, { unique: true })

export const UserModel = models.UserModel || model<UserDocument>('user', UserSchema)
