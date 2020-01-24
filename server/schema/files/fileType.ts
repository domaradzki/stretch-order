import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from "graphql";

const FileType = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    id: { type: GraphQLID },
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    contentType: { type: GraphQLString }
  })
});

export default FileType;
