import * as fs from "fs";
import * as mongoose from "mongoose";
import { GraphQLUpload } from "graphql-upload";
import * as multer from "multer";

import File from "../../models/file";
import FileType from "./fileType";
import { GraphQLString } from "graphql";

const fileMutations = {
  singleUpload: {
    type: FileType,
    args: {
      file: { type: GraphQLUpload }
    },
    async resolve(parent, args) {
      const { filename, mimetype, createReadStream } = await args.file;
      const isFolder = fs.existsSync(`./uploadFiles`);
      if (!isFolder) {
        fs.mkdirSync(`./uploadFiles`);
      }
      const filestream = await createReadStream();
      filestream.pipe(fs.createWriteStream(`./uploadFiles/${filename}`));
      // store an img in binary in mongo
      const file = new File();
      file.img.data = fs.readFileSync(`./uploadFiles/${filename}`);
      file.img.contentType = mimetype;
      file.path = `/uploadFiles/`;
      file.filename = filename;
      return file.save();
    }
  }
};

export default fileMutations;
