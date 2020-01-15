import { Document } from "mongoose";

export interface FileInterface extends Document {
  filename: String;
  mimetype: String;
  encoding: String;
}
