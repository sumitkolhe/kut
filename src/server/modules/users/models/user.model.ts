import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

class UserProfile {
  @prop({ type: String, required: false, lowercase: true })
  public firstName?: string

  @prop({ type: String, required: false, lowercase: true })
  public lastName?: string

  @prop({ type: String, required: false })
  public picture?: string
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
class SocialAuthProviders {
  @prop({ type: Boolean, required: true, default: false })
  public google?: boolean

  @prop({ type: Boolean, required: true, default: false })
  public github?: boolean

  @prop({ type: Boolean, required: true, default: false })
  public credentials?: boolean
}

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
class UserApiKeys {
  @prop({ type: String, required: true, index: true, default: '9876hvkyvifiuui-jvyviucut' })
  public key?: string

  @prop({ type: Date, required: true, default: Date.now })
  public issuedOn?: Date

  @prop({ type: Date, required: false, default: null })
  public expirationDate?: Date

  @prop({ type: String, required: true, default: 'api-key' })
  public name?: string

  @prop({ type: Date, required: false, default: null })
  public lastUsedOn?: Date
}

class UserClass extends TimeStamps {
  @prop({ type: UserProfile })
  public profile?: UserProfile

  @prop({ type: SocialAuthProviders })
  public authProviders?: SocialAuthProviders

  @prop({ type: UserApiKeys })
  public apiKeys?: UserApiKeys

  @prop({ type: String, required: true, lowercase: true, unique: true, index: true })
  public email!: string

  @prop({ type: String, required: false, minlength: 6, select: false })
  public password?: string

  @prop({ type: Boolean, required: false, default: false })
  public isBanned?: boolean

  @prop({ type: Boolean, required: false, default: false })
  public isVerified?: boolean
}

const UserModel = getModelForClass(UserClass, {
  schemaOptions: { collection: 'users' },
})

export { UserModel, UserClass }
