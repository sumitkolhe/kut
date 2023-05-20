import { Joi, Modes, Segments, celebrate } from 'celebrate'

export const createLinkSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      alias: Joi.string().optional(),
      target: Joi.string().required(),
      description: Joi.string().optional(),
      meta: Joi.object({
        password: Joi.string().length(3).default(null).optional(),
        validFrom: Joi.string().default(new Date().toISOString()).optional(),
        validTill: Joi.string().default(null).optional(),
        maxVisits: Joi.number().default(null).optional(),
        active: Joi.boolean().default(true).optional(),
      }).optional(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)
