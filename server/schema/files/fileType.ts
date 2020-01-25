import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from "graphql";
import File from "../../models/file";
import TapeType from "../tapes/tapeType";

const FileType = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    id: { type: GraphQLID },
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    contentType: { type: GraphQLString },
    projects: {
      type: new GraphQLList(TapeType),
      resolve(parent, args) {
        return File.find({ projectId: parent.id });
      }
    }
  })
});

export default FileType;
