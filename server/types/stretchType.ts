import { Document } from "mongoose";

export interface StretchInterface extends Document {
  grossWeight: Number;
  netWeight: Number;
  sleeve: Number;
  stretchColor: String;
  stretchThickness: Number;
}
