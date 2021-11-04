import { analyticsDetailsInterface } from 'src/interfaces/analytics'

export interface Link {
  alias: string
  longUrl: string
  shortUrl: string
  visitCount: number
  password: string
  passwordProtected: boolean
  description: string
  analytics: analyticsDetailsInterface
  createdAt: Date
  updatedAt: Date
}
