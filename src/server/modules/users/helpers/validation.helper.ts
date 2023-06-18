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
