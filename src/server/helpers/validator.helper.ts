import { object, string, z } from 'zod'

export const regsiterationSchema = z.object({
  body: object({
    firstName: string({
      required_error: 'first name is required',
    }),

    lastName: string({
      required_error: 'last name is required',
    }),

    email: string({
      required_error: 'email is required',
    }).email('invalid email address'),

    password: string({
      required_error: 'password is required',
    }).min(6, 'password too short - should be 6 chars minimum'),
  }),
})

export const loginSchema = z.object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('invalid email address'),

    password: string({
      required_error: 'password is required',
    }).min(6, 'password too short - should be 6 chars minimum'),
  }),
})

export const refreshTokenSchema = z.object({
  body: object({
    refreshToken: string({
      required_error: 'refresh token is required',
    }),
  }),
})

export const verifyAccountSchema = z.object({
  query: object({
    token: string({
      required_error: 'token is required',
    }),
  }),
})
