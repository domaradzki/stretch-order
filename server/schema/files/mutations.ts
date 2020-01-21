import * as fs from "fs";
import * as mongoose from "mongoose";
import { GraphQLUpload } from "graphql-upload";
import * as multer from "multer";

import File from "../../models/file";
import FileType from "./fileType";
import { GraphQLString } from "graphql";

// const fileMutations = {
//   singleUpload: {
//     type: FileType,
//     args: {
//       file: { type: GraphQLString }
//     },
//     async resolve(parent, args) {
//       const { filename, mimetype, path } = await args.file;
//       console.log("Query arguments:", args.file);
//       console.log(args);
//       console.log(filename, mimetype, path);
//       // const { filename, mimetype, createReadStream } = await args.file;
//       // const isFolder = fs.existsSync(`./uploadFiles`);
//       // if (!isFolder) {
//       //   fs.mkdirSync(`./uploadFiles`);
//       // }
//       // const filestream = await createReadStream();
//       // filestream.pipe(fs.createWriteStream(`./uploadFiles/${filename}`));
//     }
//   }
// };

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

      // const tobase64 = file =>
      //   new Promise((res, rej) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = () => res(reader.result);
      //     reader.onerror = error => rej(error);
      //   });

      // async function Main() {
      //   const file = await args.file;
      //   console.log(await tobase64(file));
      // }
      // Main();
      // const file = new File({
      //   filename: filename,
      //   buffer: filestream
      // });
      // return file.save();
      // const fileBuffer = Buffer.from(args.file, "base64");
      // console.log(fileBuffer);

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
