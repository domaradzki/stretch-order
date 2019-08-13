import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from "graphql";

import DocumentType from "./documentType";
import { DocumentInterface } from "../../types/documentType";
import Document from "../../models/document";

const documentMutations = new GraphQLObjectType({
  addDocument: {
    type: DocumentType,
    args: {
      documentId: { type: new GraphQLNonNull(GraphQLID) },
      dateInsert: { type: new GraphQLNonNull(GraphQLString) },
      dateOfPay: { type: GraphQLString },
      dateOfRealisation: { type: GraphQLString },
      signature: { type: new GraphQLNonNull(GraphQLString) },
      symbol: { type: new GraphQLNonNull(GraphQLString) },
      details: { type: GraphQLString },
      closed: { type: new GraphQLNonNull(GraphQLBoolean) },
      documentStatus: { type: new GraphQLNonNull(GraphQLInt) },
      deliveryAddress: { type: GraphQLString },
      transport: { type: GraphQLString },
      numberOfDocumentInvoice: { type: GraphQLInt },
      invoice: { type: GraphQLString },
      clientId: { type: new GraphQLNonNull(GraphQLInt) },
      userId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args: DocumentInterface) {
      const document = new Document({
        documentId: args.documentId,
        dateInsert: args.dateInsert,
        dateOfPay: args.dateOfPay,
        dateOfRealisation: args.dateOfRealisation,
        signature: args.signature,
        symbol: args.symbol,
        details: args.details,
        closed: args.closed,
        documentStatus: args.documentStatus,
        deliveryAddress: args.deliveryAddress,
        transport: args.transport,
        numberOfDocumentInvoice: args.numberOfDocumentInvoice,
        invoice: args.invoice,
        clientId: args.clientId,
        userId: args.userId
      });
      return document.save();
    }
  }
});

export default documentMutations;
