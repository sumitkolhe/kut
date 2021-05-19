import { LinkModel } from '@model/link.model'

export const checkAliasExistence = async (data: any): Promise<boolean> => {
	const result = await LinkModel.findOne(data)
	return result ? true : false
}
