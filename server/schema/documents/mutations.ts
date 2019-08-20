import {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputType
} from "graphql";

import DocumentType from "./documentType";
import { DocumentInterface } from "../../types/documentType";
import Document from "../../models/document";
import OrderType from "../orders/orderType";
import Order from "../../models/order";

const documentMutations = {
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
      userId: { type: new GraphQLNonNull(GraphQLInt) },
      orders: { type: GraphQLInputType }
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
  },
  updateDocument: {
    type: DocumentType,
    args: {
      id: { type: GraphQLString },
      documentId: { type: GraphQLID },
      dateInsert: { type: GraphQLString },
      dateOfPay: { type: GraphQLString },
      dateOfRealisation: { type: GraphQLString },
      signature: { type: GraphQLString },
      symbol: { type: GraphQLString },
      details: { type: GraphQLString },
      closed: { type: GraphQLBoolean },
      documentStatus: { type: GraphQLInt },
      deliveryAddress: { type: GraphQLString },
      transport: { type: GraphQLString },
      numberOfDocumentInvoice: { type: GraphQLInt },
      invoice: { type: GraphQLString },
      clientId: { type: GraphQLInt },
      userId: { type: GraphQLInt }
    },
    resolve(parent, args) {
      return Document.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
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
          }
        }
      )
        .then((updatedOrder): any => updatedOrder)
        .catch((err): void => console.log(err));
    }
  },
  deleteDocument: {
    type: DocumentType,
    args: {
      id: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Document.findByIdAndDelete(args.id)
        .then((document: any) => {
          document.remove();
          return document;
        })
        .then((deletedDocument): any => deletedDocument)
        .catch((err): void => console.log(err));
    }
  }
};

export default documentMutations;
