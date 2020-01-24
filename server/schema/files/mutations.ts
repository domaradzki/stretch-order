import * as fs from "fs";
import { GraphQLUpload } from "graphql-upload";

import File from "../../models/file";
import FileType from "./fileType";

const fileMutations = {
  singleUpload: {
    type: FileType,
    args: {
      file: { type: GraphQLUpload }
    },
    async resolve(parent, args) {
      const { filename, mimetype, createReadStream } = await args.file;
      const filenameNoExtention = filename.split(".")[0];
      const folderProject = filenameNoExtention.split(" ")[0];
      const isFolder = fs.existsSync(`./Projects/${folderProject}`);
      if (!isFolder) {
        fs.mkdirSync(`./Projects/${folderProject}`, { recursive: true });
      }

      const path = `./Projects/${folderProject}/${filename}`;
      const filestream = await createReadStream();
      filestream.pipe(fs.createWriteStream(path));
      const file = new File({
        contentType: mimetype,
        path: `/Projects/${folderProject}/${filename}`,
        filename: filename
      });
      return file.save();
    }
  }
};

export default fileMutations;
