import * as fs from "fs";
import * as path from "path";
import * as mongoose from "mongoose";

import { GraphQLString, GraphQLNonNull } from "graphql";
import { GraphQLUpload } from "graphql-upload";

import FileType from "./fileType";
import File from "../../models/file";
import { FileInterface } from "../../types/fileType";
import { connectMongoDB } from "../../connection";

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
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "files"
      });
      const uploadStream = bucket.openUploadStream(filename);
      await new Promise((resolve, reject) => {
        filestream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", resolve);
      });
      console.log(args.file);
      return args.file;
    }
  }
};

export default fileMutations;
