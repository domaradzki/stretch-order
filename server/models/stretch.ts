import * as mongoose from "mongoose";
import { StretchInterface } from "../types/stretchType";
const Schema = mongoose.Schema;

const stretchSchema = new Schema({
  grossWeight: Number,
  netWeight: Number,
  sleeve: Number,
  stretchColor: String,
  stretchThickness: Number
});

const Stretch = mongoose.model<StretchInterface>("Stretch", stretchSchema);
export default Stretch;
