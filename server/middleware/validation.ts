import Joi from 'joi'
import { celebrate, Segments } from 'celebrate'
import { globalConfig } from '@server/config/global'
import { expressConfig } from '@server/config/express'

export const checkLinkStructure = (link: string): string => {
  const linkWithProtocol =
    /(https?|https?|ftp|file):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  const linkWithoutProtocol = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  if (linkWithProtocol.test(link)) return link
  else if (linkWithoutProtocol.test(link)) return `${expressConfig.serverProtocol}://${link}`
  else throw Error()
}

export const validators = {
  auth: {
    registration: celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().trim().required(),
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().min(6).trim().required(),
      }),
    }),

    login: celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().min(6).trim().required(),
      }),
    }),

    verification: celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        token: Joi.string().required(),
      }),
    }),
  },
  link: {
    shorten: celebrate({
      [Segments.BODY]: Joi.object().keys({
        longUrl: Joi.string().trim().custom(checkLinkStructure, 'check link structure').message('Invalid URL provided'),
        alias: Joi.string().alphanum().min(globalConfig.aliasLength).trim().optional(),
      }),
    }),
  },
}
