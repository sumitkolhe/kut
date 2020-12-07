import createError from "http-errors";
import { RequestHandler } from "express";
//import { config } from "../../../config";
import { isValidURL } from "../../utils/checkLink";
import { LinkModel } from "../../model/model";

export const shorten: RequestHandler = async (req, res, _next) => {

  try {
    const longUrl = req.body.longurl.trim();
    if (!isValidURL(longUrl)) throw new createError.NotAcceptable();

    if (req.body.alias != null) {
      //when the alias is provided by the user take it and push to DB
      var LinkInstance = new LinkModel({
        alias: req.body.alias,
        shorturl: "https://" + process.env.DOMAIN + "/" + req.body.alias,
        longurl: isValidURL(longUrl),
      });
      try {
        const savedurl = await LinkInstance.save();
        res.json(savedurl);
      } catch (err) {
        res.json({ status: "AAE", message: "Alias already exists" });
        //check if alias is available and throw err if not available
      }
    }
  } catch (error) {}
};
