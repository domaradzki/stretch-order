import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from "graphql";

// const FileType = new GraphQLObjectType({
//   name: "File",
//   fields: () => ({
//     id: { type: GraphQLID },
//     fieldname: { type: GraphQLString },
//     filename: { type: GraphQLString },
//     originalname: { type: GraphQLString },
//     mimetype: { type: GraphQLString },
//     encoding: { type: GraphQLString },
//     buffer: { type: GraphQLString },
//     path: { type: GraphQLString },
//     destination: { type: GraphQLString },
//     size: { type: GraphQLInt }
//   })
// });

// declaration worked with GridFS - Mongodb
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
