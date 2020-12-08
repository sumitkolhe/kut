import { config } from "../../config";
import { LinkModel } from "../model/link.model";

export const generateUniqueAlias = async (): Promise<string> => {
  let randomAlias: any = "";
  const aliasSuperSet = "abcdefghijklmnopqrstuvwxyz1234567890";

  for (var i = 0; i < config.ALIAS_LENGTH; i++) {
    randomAlias += aliasSuperSet.charAt(
      Math.floor(Math.random() * aliasSuperSet.length)
    );
  }
  var isAliasAvailable = await LinkModel.findOne({ alias: randomAlias });
  try {
    return isAliasAvailable ? await generateUniqueAlias() : randomAlias;
  } catch (error) {
    return error;
  }
};
