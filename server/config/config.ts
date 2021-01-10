import * as dotenv from 'dotenv'
dotenv.config()

const isDev = process.env.NODE_ENV !== 'production'

export const config = {
	//Common
	APP_NAME: 'Reduced',
	APP_VERSION: '2.0.0',

	//Server vars
	SERVER_HOST: isDev ? 'localhost' : '0.0.0.0',
	SERVER_PORT: isDev ? 3000 : process.env.PORT || 80,

	//MongoDB vars
	MONGO_URL: process.env.MONGO_URL
		? process.env.MONGO_URL
		: 'mongodb://localhost:27017/dev',

	//Auth Token vars
	ACCESS_TOKEN_SECRET: 't4gQdVeCKqawXVOazIZ1',
	ACCESS_TOKEN_EXPIRATION: '7d',
	REFRESH_TOKEN_SECRET: 'epighnpeignepihwengpoengawXVOazIZ1',
	REFRESH_TOKEN_EXPIRATION: '1y',

	//Misc vars
	ALIAS_LENGTH: process.env.ALIAS_LENGTH ? process.env.ALIAS_LENGTH : 4,
	WEBSITE_DOMAIN: process.env.WEBSITE_DOMAIN
		? process.env.WEBSITE_DOMAIN
		: 'reduced.me',
}
