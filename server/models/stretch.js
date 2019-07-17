const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stretchSchema = new Schema({
  grossWeight: Number,
  netWeight: Number,
  sleeve: Number,
  stretchColor: String,
  stretchThickness: Number
});

const Stretch = mongoose.model("stretch", stretchSchema);
module.exports = Stretch;
