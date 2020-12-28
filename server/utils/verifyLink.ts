import { CreateError } from "@middleware/errorHandler";

export const verifyLink = (link: string) => {
  const linkWithProtocol = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const linkWithoutProtocol = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,6})?(\/.*)?$/gim;

  //valid URL including http/https and domain
  if (linkWithProtocol.test(link)) return link;
  //valid URL but http/https protocol not present
  else if (linkWithoutProtocol.test(link)) return "https://" + link;
  //invalid URL
  else throw CreateError.BadRequest("Invalid link");
};
