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
      const splitSign = filename.match(/.\d+/);
      const folderProject = splitSign ? filename.split(splitSign[0])[0] : filename.slice(0,-4);
      const isFolder = fs.existsSync(`./Projects/${folderProject}`);
      if (!isFolder) {
        fs.mkdirSync(`./Projects/${folderProject}`, { recursive: true });
      }
      const path = `/Projects/${folderProject}/${filename}`;
      const favicon = path.replace("jpg", "gif");
      const filestream = await createReadStream();
      filestream.pipe(fs.createWriteStream(`.${path}`));
      const file = new File({
        contentType: mimetype,
        path,
        filename,
        favicon
      });
      return file.save();
    }
  }
};

export default fileMutations;
