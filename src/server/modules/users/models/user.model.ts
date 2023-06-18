import { getModelForClass, prop } from '@typegoose/typegoose'

class UserProfile {
  @prop({ type: String, required: false, lowercase: true })
  public firstName?: string

  @prop({ type: String, required: false, lowercase: true })
  public lastName?: string

  @prop({ type: String, required: false })
  public picture?: string
}

class SocialAuthProviders {
  @prop({ type: Boolean, required: true, default: false })
  public google?: boolean

  @prop({ type: Boolean, required: true, default: false })
  public github?: boolean
}

class UserApiKeys {
  @prop({ type: String, required: false, index: true })
  public key?: string

  @prop({ type: Date, required: true, default: Date.now })
  public issuedOn?: Date

  @prop({ type: Date, required: true })
  public expirationDate?: Date

  @prop({ type: String, required: true })
  public name?: string

  @prop({ type: Date, required: false })
  public lastUsedOn?: Date
}

class UserClass {
  @prop({ type: UserProfile })
  public profile?: UserProfile

  @prop({ type: SocialAuthProviders })
  public authProviders?: SocialAuthProviders

  @prop({ type: String, required: true, lowercase: true, unique: true, index: true })
  public email!: string

  @prop({ type: String, required: false, minlength: 6, select: false })
  public password!: string

  @prop({ type: Boolean, required: false, default: false })
  public isBanned?: boolean

  @prop({ type: Boolean, required: false, default: false })
  public isVerified?: boolean

  @prop({ type: [UserApiKeys], required: false })
  public apiKeys?: UserApiKeys[]
}

const UserModel = getModelForClass(UserClass)

export { UserModel, UserClass }
