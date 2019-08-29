import { GraphQLID, GraphQLList } from "graphql";

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
  }
};

export default documentQueries;
