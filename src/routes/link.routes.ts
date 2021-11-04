import { Router } from 'express'
import { checkAuthentication } from 'src/middleware/authentication'
import { shortenLink } from 'src/controller/links.controller'
import { validators } from 'src/middleware/validation'

export const linkRouter = Router()

linkRouter.post('/shorten', checkAuthentication, validators.link.shorten, shortenLink)
