import Joi from 'joi'
import { CreateError } from '@server/middleware/errorHandler'
import { globalConfig } from '@server/config/global'

export const userRegisterSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).trim().required(),
})

export const userLoginSchema = Joi.object({
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(6).required(),
})

export const customAliasSchema = Joi.object({
  alias: Joi.string().min(globalConfig.ALIAS_LENGTH).trim().alphanum(),
})

export const validateOriginalLink = (originalLink: string): string | Error => {
  const link = originalLink.trim()
  const linkWithProtocol =
    /(https?|https?|ftp|file):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  const linkWithoutProtocol = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  // valid URL including http/https and domain
  if (linkWithProtocol.test(link)) return link
  // valid URL but http/https protocol not present
  if (linkWithoutProtocol.test(link)) return `https://${link}`
  // Invalid Url
  throw CreateError.BadRequest('Invalid link')
}
