import { config } from '@config/config'
import { LinkModel } from '@model/link.model'

export const generateUniqueAlias = async (): Promise<string> => {
	try {
		let random_alias: string = ''
		const characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890'

		for (var i = 0; i < config.ALIAS_LENGTH; i++) {
			random_alias += characterSet.charAt(
				Math.floor(Math.random() * characterSet.length)
			)
		}
		var is_alias_available = await LinkModel.findOne({
			alias: random_alias,
		} as any)

		return is_alias_available ? await generateUniqueAlias() : random_alias
	} catch (err) {
		return err
	}
}
