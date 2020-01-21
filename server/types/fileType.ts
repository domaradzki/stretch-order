import { Document } from "mongoose";

export interface FileInterface extends Document {
  filename: String;
  // fieldname: String;
  // originalname: String;
  mimetype: String;
  encoding: String;
  // buffer: Buffer;
  // path: String;
  // destination: String;
  // size: Number;
}
