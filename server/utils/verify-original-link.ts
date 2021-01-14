import { CreateError } from '@middleware/error-handler'

export const verifyOriginalLink = (link: string) => {
	console.log(link)
	const link_with_protocol = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim
	const link_without_protocol = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,6})?(\/.*)?$/gim

	//valid URL including http/https and domain

	if (link_with_protocol.test(link)) return link
	//valid URL but http/https protocol not present
	else if (link_without_protocol.test(link)) return 'https://' + link
	//Invalid Url
	else throw CreateError.BadRequest('Invalid link')
}
