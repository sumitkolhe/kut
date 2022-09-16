type Status = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 503

export class HttpExceptionError extends Error {
  public status: Status
  public message!: string

  constructor(status: Status, message: string) {
    super(message)
    this.status = status
    this.name = 'HttpExceptionError'
  }
}
