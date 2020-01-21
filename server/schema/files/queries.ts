import * as fs from "fs";
import * as assert from "assert";
import { GraphQLList, GraphQLID } from "graphql";
import * as mongoose from "mongoose";

import FileType from "./fileType";
import File from "../../models/file";

const fileQueries = {
  getFile: {
    type: FileType,
    resolve(parent, args) {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "projects"
      });
      bucket
        .openDownloadStreamByName("stretch.jpg")
        .pipe(fs.createWriteStream("./temp.jpg"))
        .on("error", function(error) {
          assert.ifError(error);
        })
        .on("finish", function() {
          console.log("done!");
          process.exit(0);
        });
    }
  }
};

export default fileQueries;
