import { Router } from 'express'
import { checkAuthentication } from '@server/middleware/authentication'
import { shortenLink } from '@server/controller/links.controller'
import { validators } from '@server/middleware/validation'

export const linkRouter = Router()

linkRouter.post('/shorten', checkAuthentication, validators.link.shorten, shortenLink)
