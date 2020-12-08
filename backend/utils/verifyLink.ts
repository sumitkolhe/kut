import createError from "http-errors";

export const verifyLink = (link: string) => {
  const fullLinkPattern = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const halfLinkPattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,6})?(\/.*)?$/gim;
  
  //valid URL including http and domain
  if (fullLinkPattern.test(link)) return link;
  //valid URL but http/https protocol not present
  else if (halfLinkPattern.test(link)) return "https://" + link;
  //invalid URL
  else throw new createError.BadRequest("Invalid link");
};
