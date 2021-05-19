import { generateUniqueAlias } from '@helpers/generate-alias'
import { generateShortLink } from '@utils/create-shortlink'
import { verifyOriginalLink } from '@utils/verify-original-link'
import { checkAliasExistence } from '@helpers/check-existence'

interface LinkPayload {
	alias?: string
	short_url: string
	long_url: any
	_id?: string
	description?: string
	password?: string
	password_protected?: boolean
}

const payload = {} as LinkPayload

export const generateLinkPayload = async (req: any) => {
	if (req.body.description) payload.description = req.body.description
	if (req.body.password) payload.description = req.body.password
	if (req.body.password) payload.password_protected = true
	payload.alias = req.body.alias
		? req.body.alias
		: await generateUniqueAlias()
	payload.short_url = generateShortLink(payload.alias!)
	payload.long_url = verifyOriginalLink(req.body.long_url)
	return payload
}

export const generateUpdateLinkPayload = async (req: any) => {
	//check if alias is untouched (user did not modify it),
	//if yes, exclude it from payload to avoid duplicate key error.
	const is_alias_untouched: boolean = await checkAliasExistence({
		_id: req.body._id,
		alias: req.body.alias,
	})

	payload._id = req.body._id
	payload.description = req.body.description
	if (!is_alias_untouched) {
		payload.alias = req.body.alias
		payload.short_url = generateShortLink(payload.alias!)
	}
	payload.long_url = verifyOriginalLink(req.body.long_url)
	return payload
}
