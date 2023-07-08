export interface Paginator {
  limit: number
  offset: number
  search?: string
  sortOptions?: { [key: string]: -1 | 1 }
}
