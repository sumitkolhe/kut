import { config } from "@config/config";
import { LinkModel } from "@model/link.model";

export const generateUniqueAlias = async (): Promise<string> => {
  let randomAlias: any = "";
  const characterSet = "abcdefghijklmnopqrstuvwxyz1234567890";

  for (var i = 0; i < config.ALIAS_LENGTH; i++) {
    randomAlias += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }
  var isAliasAvailable = await LinkModel.findOne({ alias: randomAlias });
  try {
    return isAliasAvailable ? await generateUniqueAlias() : randomAlias;
  } catch (error) {
    return error;
  }
};
