import createError from "http-errors";
import { RequestHandler } from "express";
import { LinkModel } from "../../model/link.model";

export const redirect: RequestHandler = async (req, res, next) => {
  let alias: any = req.params.alias;
  try {
    const linkDetails: any = await LinkModel.findOne({
      alias: alias,
    });

    if (!linkDetails) throw new createError.NotFound();

    linkDetails.clicks++;
    linkDetails.stats.push(Date());
    linkDetails.markModified("stats");
    await linkDetails.save();

    res.redirect(301, linkDetails.longurl.toString());
  } catch (error) {
    next(error);
  }
};
