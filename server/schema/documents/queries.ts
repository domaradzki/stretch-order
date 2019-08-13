import { GraphQLObjectType } from "graphql";

import DocumentType from "./documentType";
import Document from "../../models/document";

const documentQueries = new GraphQLObjectType({
  name: "Query",
  fields: {
    documents: {
      type: DocumentType,
      resolve(parent, args) {
        return Document.find({});
      }
    }
  }
});

export default documentQueries;
