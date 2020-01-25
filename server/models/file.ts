import * as mongoose from "mongoose";
import { FileInterface } from "../types/fileType";
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  path: String,
  contentType: String,
  favicon: String
});

const File = mongoose.model<FileInterface>("File", fileSchema);
export default File;
