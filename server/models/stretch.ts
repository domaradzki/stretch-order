import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const stretchSchema = new Schema({
  grossWeight: Number,
  netWeight: Number,
  sleeve: Number,
  stretchColor: String,
  stretchThickness: Number
});

const Stretch = mongoose.model("Stretch", stretchSchema);
export default Stretch;
