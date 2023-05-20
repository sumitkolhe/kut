export interface CustomResponse<T> {
  status: 'SUCCESS' | 'FAILED'
  message: string | null
  data: T | null
}
