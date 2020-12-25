import createError from "http-errors";
import { RequestHandler } from "express";
import { LinkModel } from "@model/link.model";
import { StatisticsModel } from "@model/statistics.model";

export const redirect: RequestHandler = async (req: any, res, next) => {
  try {
    const linkDetails: any = await LinkModel.findOne({
      alias: req.params.alias,
    });

    if (!linkDetails) throw new createError.NotFound();
    if (linkDetails.password) res.send("enter pass");
    else {
      const newStatistic = new StatisticsModel(req.useragent);
      await newStatistic.save();
      linkDetails.clicks++;
      await linkDetails.statistics.push(newStatistic);
      await linkDetails.save();

      res.redirect(301, linkDetails.longurl.toString());
    }
  } catch (err) {
    next(err);
  }
};
