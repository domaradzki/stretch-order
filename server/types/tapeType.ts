import { Document } from "mongoose";

export interface TapeInterface extends Document {
  printName: String;
  dateOfAcceptation: String;
  numberOfColors: String;
  color1: String;
  color2: String;
  color3: String;
  glue: String;
  roller: String;
  tapeColor: String;
  tapeLong: Number;
  tapeThickness: Number;
  tapeWidth: Number;
}
