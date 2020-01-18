import * as fs from "fs";
import * as mongoose from "mongoose";

import { GraphQLUpload } from "graphql-upload";

import FileType from "./fileType";

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
        bucketName: "projects"
      });
      const uploadStream = bucket.openUploadStream(filename);
      await new Promise((resolve, reject) => {
        filestream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", resolve);
      });
      const res = await args.file;
      return { ...res, id: uploadStream.id };
    }
  }
};

export default fileMutations;
