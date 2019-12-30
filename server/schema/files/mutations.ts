import { GraphQLNonNull, GraphQLList } from "graphql";
import { GraphQLUpload } from "graphql-upload";
import FileType from "./fileType";
import * as PromiseAll from "promises-all";

// import Tape from "../../models/tape";
// import { FileInterface } from "../../types/fileType";

const fileMutations = {
  singleUpload: {
    description: "Stores a single file.",
    type: GraphQLNonNull(FileType),
    args: {
      file: {
        description: "File to store.",
        type: GraphQLNonNull(GraphQLUpload)
      }
    },
    resolve: (parent, { file }, { storeUpload }) => storeUpload(file)
  },
  multipleUpload: {
    description: "Stores multiple files.",
    type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
    args: {
      files: {
        description: "Files to store.",
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLUpload)))
      }
    },
    async resolve(parent, { files }, { storeUpload }) {
      const { resolve, reject } = await PromiseAll.all(files.map(storeUpload));

      if (reject.length)
        reject.forEach(({ name, message }) =>
          console.error(`${name}: ${message}`)
        );

      return resolve;
    }
  }
};

export default fileMutations;
