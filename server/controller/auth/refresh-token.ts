// import { RequestHandler } from 'express'

// import Jwt from 'jsonwebtoken'
// import { UserModel } from '@model/user.model'
// import { userLoginSchema } from '@utils/validators'
// import { signAccessToken, signRefreshToken } from '@helpers/sign-token'
// import { CreateError } from '@middleware/error-handler'
// import { config } from '@config/config'

// export const renew: RequestHandler = async (req, res, next) => {
// 	try {
// 		const refresh_token = req.body.refresh_token
// 		if (!refresh_token)
// 			throw CreateError.Unauthorized('Refresh token not found')

// 		// If the refresh token is valid, create a new accessToken and return it.
// 		Jwt.verify(refresh_token, config.REFRESH_TOKEN_SECRET, (err, user) => {
// 			if (!err) {
// 				const accessToken = jwt.sign(
// 					{ username: user.name },
// 					'access',
// 					{
// 						expiresIn: '20s',
// 					}
// 				)
// 				return res.json({ success: true, accessToken })
// 			} else {
// 				return res.json({
// 					success: false,
// 					message: 'Invalid refresh token',
// 				})
// 			}
// 		})
// 	} catch (error) {}
// }
