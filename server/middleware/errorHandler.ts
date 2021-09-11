import { isCelebrateError } from 'celebrate'
import { ErrorRequestHandler } from 'express'

export class CreateError extends Error {
  public status: number
  public message: string

  public constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }

  static NoContent(message?: string): CreateError {
    return new CreateError(204, message || 'No Content')
  }

  static BadRequest(message?: string): CreateError {
    return new CreateError(400, message || 'Bad Request')
  }

  static Unauthorized(message?: string): CreateError {
    return new CreateError(401, message || 'Unauthorized')
  }

  static Forbidden(message?: string): CreateError {
    return new CreateError(403, message || 'Forbidden')
  }

  static NotFound(message?: string): CreateError {
    return new CreateError(404, message || 'Not Found')
  }

  static Conflict(message?: string): CreateError {
    return new CreateError(400, message || 'Conflict')
  }

  static MethodNotAllowed(message?: string): CreateError {
    return new CreateError(405, message || 'Method Not Allowed')
  }

  static TooManyRequests(message?: string): CreateError {
    return new CreateError(429, message || 'Too Many Requests')
  }

  static InternalServerError(message?: string): CreateError {
    return new CreateError(500, message || 'Something Went Wrong')
  }
}

export const HandleError: ErrorRequestHandler = (error: CreateError, _req, res) => {
  if (isCelebrateError(error)) {
    let message = ''
    for (const value of error.details.values()) {
      message += value.message + '; '
    }
    res.status(400).json({
      status: 400,
      message,
    })
  } else if (error.name === 'MongoServerError') {
    const message = 'Database error'
    const status = 500
    res.status(status).json({
      status,
      message,
    })
  } else {
    const status = error.status || 500
    const message = error.message || 'Something went wrong'
    res.status(status).json({
      status,
      message,
    })
  }
}
