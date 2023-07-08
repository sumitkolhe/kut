export type Status = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 503

export class HttpExceptionError extends Error {
  protected status: Status

  constructor(status: Status, message: string) {
    super(message)
    this.status = status
    this.name = 'HttpExceptionError'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
