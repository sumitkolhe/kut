const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
  alias: { type: String, required: true, unique: true },
  longurl: { type: String, required: true },
  shorturl: { type: String },
  clicks: { type: Number, default: 0 },
  stats: [ {type: Date}],
  created: { type: Date, default: Date.now, required: true },
  expire: {type: Date, default: () => Date.now() + 10*24*60*60*1000, expires:864000}
});

urlschema.index({"alias": 1 }, { unique: true });

module.exports = mongoose.model("links", urlschema);
