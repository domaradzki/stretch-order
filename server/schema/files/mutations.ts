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
      // filename: { type: new GraphQLNonNull(GraphQLString) },
      // mimetype: { type: new GraphQLNonNull(GraphQLString) },
      // encoding: { type: new GraphQLNonNull(GraphQLString) },
      file: { type: GraphQLUpload }
    },
    async resolve(parent, args) {
      const { filename, mimetype, createReadStream } = await args.file;
      // const file = new File({
      //   filename: args.filename,
      //   mimetype: args.mimetype,
      //   encoding: args.encoding
      // });
      const isFolder = fs.existsSync(`./uploadFiles`);
      if (!isFolder) {
        fs.mkdirSync(`./uploadFiles`);
      }
      const filestream = await createReadStream();
      filestream.pipe(fs.createWriteStream(`./uploadFiles/${filename}`));
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
      const uploadStream = bucket.openUploadStream(filename);
      await new Promise((resolve, reject) => {
        filestream
          .pipe(uploadStream)
          .on("error", reject)
          .on("finish", resolve);
      });
      return args.file;
    }
  }
};

export default fileMutations;
