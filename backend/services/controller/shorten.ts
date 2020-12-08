import createError from "http-errors";
import { config } from "../../../config";
import { RequestHandler, NextFunction } from "express";
import { verifyLink } from "../../utils/verifyLink";
import { UserModel } from "../../model/user.model";
import { LinkModel } from "../../model/link.model";
import { generateUniqueAlias } from "../../utils/generateAlias";

export const shorten: RequestHandler = async (req, res, next) => {
  const userInstance: any = await UserModel.findOne({
    email: req.body.auth.email,
  });
  try {
    let newLink = req.body.alias
      ? await saveData(req.body.longurl.trim(), next, req.body.alias)
      : await saveData(req.body.longurl.trim(), next);

    if (newLink) {
      await userInstance.userLinks.push(newLink);
      await userInstance.save();
      await UserModel.findOne({ email: req.body.auth.email })
        .populate("userLinks")
        .then((link) => {
          res.json(link?.userLinks);
        });
    }
  } catch (error) {
    next(error);
  }
};

const saveData = async (
  longurl: string,
  next: NextFunction,
  alias?: string
): Promise<any> => {
  let newAlias = alias ? alias : await generateUniqueAlias();

  const newLink = new LinkModel({
    alias: newAlias,
    shorturl: "https://" + config.DOMAIN + "/" + newAlias,
    longurl: verifyLink(longurl),
  });
  try {
    return await newLink.save();
  } catch (err) {
    next(new createError.BadRequest("Alias already exist"));
  }
};
