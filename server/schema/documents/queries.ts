import { GraphQLID, GraphQLList, GraphQLInt } from "graphql";

import DocumentType from "./documentType";
import Document from "../../models/document";

const documentQueries = {
  documents: {
    type: new GraphQLList(DocumentType),
    resolve(parent, args) {
      return Document.find({});
    }
  },
  document: {
    type: DocumentType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Document.findById(args.id);
    }
  },
  documentCheck: {
    type: DocumentType,
    args: { documentId: { type: GraphQLInt } },
    resolve(parent, args) {
      return Document.findOne({ documentId: args.documentId });
    }
  }
};

export default documentQueries;
