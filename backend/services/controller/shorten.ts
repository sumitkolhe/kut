import createError from "http-errors";
import { RequestHandler } from "express";
//import { config } from "../../../config";
import { isValidURL } from "../../utils/checkLink";
import { UserModel } from "../../model/user.model";
import { LinkModel } from "../../model/link.model";

export const shorten: RequestHandler = async (req, res, _next) => {
  try {
    const longUrl = req.body.longurl.trim();
    if (!isValidURL(longUrl)) throw new createError.NotAcceptable();

    const userInstance: any = await UserModel.findOne({
      email: req.body.authToken.email,
    });

    const newLink = new LinkModel({ alias: "alia00", longurl: longUrl });

    await newLink.save();
    userInstance.userLinks.push(newLink);
    await userInstance.save();

    await UserModel.findOne({ email: req.body.authToken.email })
      .populate("userLinks")
      .exec((_err, link) => {
        res.json(link);
      });
  } catch (error) {}
};
