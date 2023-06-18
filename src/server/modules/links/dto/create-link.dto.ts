import type { LinkClass } from 'server/modules/links/models'

export type CreateLinkDto = Pick<LinkClass, 'target'> &
  Partial<Pick<LinkClass, 'description' | 'alias' | 'meta' | 'userId'>>
