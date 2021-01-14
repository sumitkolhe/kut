import { config } from '@config/config'

export const generateShortLink = (alias: string) => {
	let short_url =
		config.WEBSITE_PROTOCOL + '://' + config.WEBSITE_DOMAIN + '/' + alias

	return short_url
}
