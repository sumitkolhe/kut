import { Joi, Modes, Segments, celebrate } from 'celebrate'

export const registerationSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      // firstName: Joi.string(),
      // lastName: Joi.string(),
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
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)
