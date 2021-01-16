import { CreateError } from '@middleware/error-handler'

export const verifyOriginalLink = (original_link: string) => {
	const link = original_link.trim()
	const link_with_protocol = /(https?|https?|ftp|file):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

	const link_without_protocol = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

	//valid URL including http/https and domain
	if (link_with_protocol.test(link)) return link
	//valid URL but http/https protocol not present
	else if (link_without_protocol.test(link)) return 'https://' + link
	//Invalid Url
	else throw CreateError.BadRequest('Invalid link')
}
