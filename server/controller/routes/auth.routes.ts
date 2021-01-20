import express from 'express'
import { me } from '@controller/auth/me'
import { login } from '@controller/auth/login'
import { register } from '@controller/auth/register'
import { verifyToken } from '@middleware/verify-token'
import { deleteUser } from '@controller/auth/delete-user'

const router = express.Router()

export const authRoutes = {
	login: router.post('/login', login),
	register: router.post('/register', register),
	me: router.get('/me', verifyToken, me),
	delete: router.delete('/delete', verifyToken, deleteUser),
}
