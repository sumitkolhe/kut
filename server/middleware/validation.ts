import Joi from 'joi'
import { celebrate, Segments } from 'celebrate'
import { globalConfig } from '@server/config/global'
import { CreateError } from '@server/middleware/errorHandler'

export const validators = {
  auth: {
    registration: celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),

    login: celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),

    verification: celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        token: Joi.string().required(),
      }),
    }),
  },
}

export const customAliasSchema = Joi.object({
  alias: Joi.string().min(globalConfig.aliasLength).trim().alphanum(),
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
