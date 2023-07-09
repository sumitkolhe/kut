export interface Paginator {
  limit: number
  offset: number
  search?: string
  sort?: 'views' | 'date'
}
