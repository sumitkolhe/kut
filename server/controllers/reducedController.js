const express = require("express");
const db = require("../models/linksModel");
require("dotenv").config();

const reduced_redirect = async (req, res, next) => {
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
};

const reduced_shorten = async (req, res) => {
  //Generate unique hash
  async function genhash() {
    var randomhash = "";
    var list = "abcdefghijklmnopqrstuvwxyz1234567890";
    for (var i = 0; i < process.env.ALIAS_LENGTH; i++) {
      randomhash += list.charAt(Math.floor(Math.random() * list.length));
    }
    var checker = await db.findOne({ alias: randomhash });
    try {
      return checker ? await genhash() : randomhash;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const link = req.body.longurl.trim();

    function urlvalidation(link) {
      const fullpattern = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
      const halfpattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,6})?(\/.*)?$/gim;

      if (fullpattern.test(link)) {
        //valid URL including http and domain
        var url = link;
        return url;
      } else if (halfpattern.test(link)) {
        //valid URL but http/https protocol not present
        var url = "http://" + link;
        return url;
      } else {
        //invalid URL
        res.json({ status: "IURL", message: "Invalid URL" });
      }
    }

    if (req.body.alias != null) {
      //when the alias is provided by the user take it and push to DB
      var db_instance = new db({
        alias: req.body.alias,
        shorturl: "https://" + process.env.DOMAIN + "/" + req.body.alias,
        longurl: urlvalidation(link),
      });
      try {
        const savedurl = await db_instance.save();
        res.json(savedurl);
      } catch (err) {
        res.json({ status: "AAE", message: "Alias already exists" });
        //check if alias is available and throw err if not available
      }
    } else {
      var generatedHash = await genhash();
      //when user doesnt provide alias, generate one and check if it already exists in DB
      var db_instance = new db({
        alias: generatedHash,
        shorturl: "https://" + process.env.DOMAIN + "/" + generatedHash,
        longurl: urlvalidation(link),
      });
      try {
        const savedurl = await db_instance.save();
        res.json(savedurl);
      } catch (err) {
        res.status(400).end(); 
        //Bad Request while saving to DB
      }
    }
  } catch {
    res.status(400).end();
    //Bad request during the whole shortening process
  }
};

const reduced_check = async (req, res, next) => {
  try {
    const link = req.body.linktocheck.trim();
    const domain = process.env.DOMAIN;
    //To check and extract alias from the supplied link
    const pattern = new RegExp(
      "((https?)://)?(www.)?(" + domain + ")/[a-zA-Z0-9-]{1,}$"
    );
    const extractor = new RegExp(
      "((https?)://)?(www.)?(" + domain + ")/([a-zA-Z0-9-]{1,})$"
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
  } catch {
    res.status(400).end();
  }
};

module.exports = {
  reduced_redirect,
  reduced_shorten,
  reduced_check,
};
