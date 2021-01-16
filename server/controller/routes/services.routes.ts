import express from 'express'
import { redirect } from '@controller/services/redirect'
import { shorten } from '@controller/services/shorten'
import { verifyToken } from '@middleware/verify-token'
import { analytics } from '@controller/services/analytics'
import { userAgent } from '@middleware/user-agent'
import { getLinks, updateLink, deleteLink } from '@controller/services/links'
import { statistics } from '@controller/services/statistics'
import { notification } from '@controller/services/notification'
import {
	createNote,
	deleteNote,
	getNotes,
	updateNote,
} from '@controller/services/notes'

const router = express.Router()

export const controllerRoutes = {
	getLinks: router.get('/links', verifyToken, getLinks),
	getNotes: router.get('/notes', verifyToken, getNotes),
	statistics: router.get('/stats', verifyToken, statistics),
	updateNote: router.patch('/notes', verifyToken, updateNote),
	updateLink: router.patch('/links', verifyToken, updateLink),
	deleteNote: router.delete('/notes', verifyToken, deleteNote),
	deleteLink: router.delete('/links', verifyToken, deleteLink),
	notification: router.get('/notification', verifyToken, notification),
	createNote: router.post('/notes', verifyToken, createNote),
	shorten: router.post('/shorten', verifyToken, shorten),
	analytics: router.post('/analytics', verifyToken, analytics),
	redirect: router.get('/:alias', userAgent, redirect),
}
