export interface Link {
  alias: string | null
  target: string
  shortUrl: string
  visitCount: number
  meta: {
    password: string | null
    validFrom: Date
    validTill: Date | null
    maxVisits: number | null
    active: boolean
  }
  description: string | null
  statistics: []
  tags: []
  createdAt: Date
  updatedAt: Date
}
