import * as fs from "fs";
import * as path from "path";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { GraphQLUpload } from "graphql-upload";
import FileType from "./fileType";
import File from "../../models/file";
import { FileInterface } from "../../types/fileType";

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
      return args.file;
    }
  }
};

export default fileMutations;
