import { schema, types } from 'papr'
import { papr } from 'server/common/helpers/mongo.helper'

export const LinkSchema = schema(
  {
    userId: types.objectId({ required: true }),
    alias: types.string({ required: true }),
    target: types.string({ required: true }),
    shortUrl: types.string({ required: true }),
    visitCount: types.number({ required: true }),
    description: types.string({ required: false }),
    meta: types.object(
      {
        password: types.oneOf([types.string({ required: false }), types.null({ required: false })]),
        validFrom: types.string({ required: false }),
        validTill: types.oneOf([
          types.string({ required: false }),
          types.null({ required: false }),
        ]),
        maxVisits: types.oneOf([
          types.number({ required: false }),
          types.null({ required: false }),
        ]),
        active: types.boolean({ required: false }),
      },
      { required: false }
    ),
  },
  {
    defaults: {
      visitCount: 0,
      meta: {
        password: null as unknown as undefined,
        validFrom: new Date().toISOString(),
        validTill: null as unknown as undefined,
        maxVisits: null as unknown as undefined,
        active: true,
      },
    },
    timestamps: true,
  }
)

export const LinkModel = papr.model('links', LinkSchema)
