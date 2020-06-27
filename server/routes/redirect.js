const express = require("express");
const router = express.Router();
const db = require("../models/links");
const path = require("path");

//GET particular
router.get("/:alias", async (req, res, next) => {
  try {
    const db_instance = await db.findOne({ alias: req.params.alias });
    if (db_instance) {
   
      db_instance.clicks++;
      db_instance.stats.push(Date());
      db_instance.markModified("stats");
      await db_instance.save();
      var redirection = db_instance.longurl;
      res.redirect(301, redirection);
    } else {
      next();
    }
  } catch (error) {
    res.status(400);
  }
});

//Export module
module.exports = router;
