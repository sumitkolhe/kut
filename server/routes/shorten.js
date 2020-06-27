const express = require("express");
const router = express.Router();
const db = require("../models/links");


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

//POST one
router.post("/", async (req, res) => {

  try{

  const link = req.body.longurl.trim()

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
      res.json({status:"IURL", message: "Invalid URL" });
    }
  }

  if (req.body.alias != null) {
    //when the alias is provided by the user take it and push to DB
    var db_instance = new db({
      alias: req.body.alias,
      shorturl:"https://"+process.env.DOMAIN+"/"+req.body.alias,
      longurl: urlvalidation(link),
    });
    try {
      const savedurl = await db_instance.save();
      res.json(savedurl);
    } catch (err) {
      res.json({status:"AAE", message: "Alias already exists" }); //check if alias is available and throw err if not available
    }
  } else {
    //when user doesnt provide alias, generate one and check if it already exists in DB
    var generatedHash = await genhash();
    
    var db_instance = new db({
      alias: generatedHash,
      shorturl:"https://"+process.env.DOMAIN+"/"+generatedHash,
      longurl: urlvalidation(link),
    });
    try {
    
      const savedurl = await db_instance.save();
      res.json(savedurl); 
    } catch (err) {
      res.status(400).end(); //some random error
    }
  }
  }
  catch{
    res.status(400).end();

  }
});

//Export module
module.exports = router;
