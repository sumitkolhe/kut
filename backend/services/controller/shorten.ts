import createError from "http-errors";
import { config } from "@config";
import { RequestHandler } from "express";
import { verifyLink } from "@utils/verifyLink";
import { UserModel } from "@model/user.model";
import { LinkModel } from "@model/link.model";
import { generateUniqueAlias } from "@utils/generateAlias";

export const shorten: RequestHandler = async (req, res, next) => {
  let newAlias = req.body.alias ? req.body.alias : await generateUniqueAlias();
  const newLink = new LinkModel({
    alias: newAlias,
    shorturl: "https://" + config.DOMAIN + "/" + newAlias,
    longurl: verifyLink(req.body.longurl),
  });

  if (req.body.password) newLink.password = req.body.password;

  try {
    const savedLink = await newLink.save();
    const userInstance: any = await UserModel.findOne({
      email: req.body.auth.email,
    });
    await userInstance.userLinks.push(newLink);
    await userInstance.save();
    res.json(savedLink);
  } catch (err) {
    next(new createError.BadRequest("Alias already exist"));
  }
};
