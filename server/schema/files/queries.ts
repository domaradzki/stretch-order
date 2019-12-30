import { GraphQLList, GraphQLObjectType, GraphQLID } from "graphql";

import FileType from "./fileType";
import File from "../../models/file";

const fileQueries = {
  uploads: {
    type: new GraphQLList(FileType),
    resolve(parent, args) {
      return File.find({});
    }
  },
  upload: {
    type: FileType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return File.findById(args.id);
    }
  }
};

export default fileQueries;
