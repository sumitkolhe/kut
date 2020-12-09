import createError from "http-errors";
import { RequestHandler } from "express";
import { LinkModel } from "../../model/link.model";

export const analytics: RequestHandler = async (req, res, next) => {
  try {
    await LinkModel.findOne({ shorturl: req.body.shorturl })
      .populate("statistics")
      .then((linkDetails: any) => {
        res.json(linkDetails);
      });
  } catch (err) {
    next(new createError.InternalServerError());
  }
};
