import type { LinkSchema } from 'server/modules/links/models/link.model'
import type { InferSchemaType } from 'mongoose'

export type LinkDto = Omit<InferSchemaType<typeof LinkSchema>, 'createdAt' | 'updatedAt'>

export type CreateLinkInput = Partial<LinkDto> &
  Pick<LinkDto, 'target' | 'alias' | 'shortUrl' | 'userId'>
