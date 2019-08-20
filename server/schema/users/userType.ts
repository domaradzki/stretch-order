import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import Document from "../../models/document";
import DocumentType from "../documents/documentType";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    documents: {
      type: DocumentType,
      resolve(parent, args) {
        return Document.find({ userId: parent.id });
      }
    }
  })
});

export default UserType;
