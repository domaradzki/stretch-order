const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tapeSchema = new Schema({
  printName: String,
  dateOfAcceptation: String,
  numberOfColors: String,
  color1: String,
  color2: String,
  color3: String,
  glue: String,
  roller: String,
  tapeColor: String,
  tapeLong: Number,
  tapeThickness: Number,
  tapeWidth: Number
});

const Tape = mongoose.model("tape", tapeSchema);
module.exports = Tape;
