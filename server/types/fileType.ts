import { Document } from "mongoose";

export interface FileInterface extends Document {
  filename: String;
  path: String;
  img: { data: Buffer; contentType: String };
}
