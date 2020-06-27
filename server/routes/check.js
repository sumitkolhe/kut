const express = require("express");
const router = express.Router();
const db = require("../models/links");

//GET JSON details for reduced link

router.post("/", async (req, res, next) => {

  try{
  const link = req.body.linktocheck.trim();
  const domain = process.env.DOMAIN;

  const pattern = new RegExp(
    "((https?)://)?(www.)?(" + domain + ")/[a-zA-Z0-9]{1,}$"
  );
  const extractor = new RegExp(
    "((https?)://)?(www.)?(" + domain + ")/([a-zA-Z0-9]{1,})$"
  );

  if (pattern.test(link)) {
    const alias = link.match(extractor)[5];

    try {
      const db_instance = await db.findOne({ alias: alias });
      if (db_instance) {
        res.status(200).json(db_instance);
      } else {
        res.status(404).json({
          message: "Link does not exist",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid Link",
    });
  }
}
catch{
  res.status(400).end();
}
});

//Export module
module.exports = router;
