import * as mongoose from "mongoose";
import { TapeInterface } from "../types/tapeType";
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

const Tape = mongoose.model<TapeInterface>("Tape", tapeSchema);
export default Tape;
