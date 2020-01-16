import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const FileType = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    id: { type: GraphQLID },
    filename: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    encoding: { type: GraphQLString }
  })
});

export default FileType;
