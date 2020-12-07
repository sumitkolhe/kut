import createError from "http-errors";
import { RequestHandler } from "express";
import { LinkModel } from "../../model/link.model";

export const redirect: RequestHandler = async (req, _res, next) => {
  let al: any = req.params.alias;
  try {
    const link = await LinkModel.findOne({
      alias: al,
    });

    if (!link) throw new createError.NotFound();

    link.clicks
    
  } catch (error) {
    next();
  }
};
