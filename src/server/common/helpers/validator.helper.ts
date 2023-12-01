import { Joi, Modes, Segments, celebrate } from 'celebrate'

export const registrationSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const loginSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const refreshTokenSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const verifyAccountSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      token: Joi.string().required(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const allLinksSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      offset: Joi.number().default(0),
      limit: Joi.number().default(10),
      search: Joi.optional(),
      sort: Joi.string()
        .optional()
        .default('date')
        .custom((value, helpers) => {
          if (value === 'views') return { visitCount: -1 }
          else if (value === 'date') return { createdAt: -1 }

          return helpers.message({ custom: 'sort must have a value of [views] or [date]' })
        }),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const statisticsVisitsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      period: Joi.string().default('1d'),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)
