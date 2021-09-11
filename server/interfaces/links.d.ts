import { analyticsDetailsInterface } from '@server/interfaces/analytics'

export interface linkDetailsInterface {
  alias: string
  longUrl: string
  shortUrl?: string
  visitCount?: number
  password: string
  passwordProtected?: boolean
  description: string
  analytics?: analyticsDetailsInterface
  createdAt?: Date
  updatedAt?: Date
}
