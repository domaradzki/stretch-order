import * as mongoose from "mongoose";
import { FileInterface } from "../types/fileType";
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  path: String,
  img: { data: Buffer, contentType: String }
});

// const fileSchema = new Schema({
//   filename: String,
//   // originalname: String,
//   mimetype: String,
//   encoding: String,
//   buffer: Buffer
//   // path: String,
//   // destination: String,
//   // size: Number
// });

//  deklaration worked for GridFS
// const fileSchema = new Schema({
//   filename: String,
//   mimetype: String,
//   encoding: String
// });

const File = mongoose.model<FileInterface>("File", fileSchema);
export default File;
