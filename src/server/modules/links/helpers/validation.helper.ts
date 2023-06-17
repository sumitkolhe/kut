import { Joi, Modes, Segments, celebrate } from 'celebrate'

export const createLinkSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        target: Joi.string().required(),
      })
      .unknown(true),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)
