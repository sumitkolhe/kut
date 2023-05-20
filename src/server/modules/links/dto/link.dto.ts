import type { LinkSchema } from 'server/modules/links/models/link.model'

export type LinkDto = (typeof LinkSchema)[0]
export type LinkDtoWithDefaults = (typeof LinkSchema)[1]

export type CreateLinkInput = Partial<LinkDto> &
  Pick<LinkDto, 'target' | 'alias' | 'shortUrl' | 'userId'>
