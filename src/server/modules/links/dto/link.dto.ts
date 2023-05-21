import type { LinkSchema } from 'server/modules/links/models/link.model'
import type { InferSchemaType } from 'mongoose'

export type LinkDto = InferSchemaType<typeof LinkSchema>

export type CreateLinkInput = Partial<LinkDto> &
  Pick<LinkDto, 'target' | 'alias' | 'shortUrl' | 'userId'>
