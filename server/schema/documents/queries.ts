import { GraphQLObjectType, GraphQLList } from "graphql";

import DocumentType from "./documentType";
import Document from "../../models/document";

const documentQueries = {
  documents: {
    type: new GraphQLList(DocumentType),
    resolve(parent, args) {
      return Document.find({});
    }
  }
};

export default documentQueries;
