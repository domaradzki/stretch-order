import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import Document from "../../models/document";
import DocumentType from "../documents/documentType";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    documents: {
      type: DocumentType,
      resolve(parent, args) {
        return Document.find({ clientId: parent.id });
      }
    }
  })
});

export default ClientType;
