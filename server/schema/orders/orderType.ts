import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLUnionType
} from "graphql";

import Document from "../../models/document";
import DocumentType from "../documents/documentType";
import TapeType from "../tapes/tapeType";
import StretchType from "../stretches/stretchType";
import Stretch from "../../models/stretch";
import Tape from "../../models/tape";

const ProductType = new GraphQLUnionType({
  name: "Product",
  types: [TapeType, StretchType],
  resolveType(value) {
    if (value instanceof Tape) {
      return TapeType;
    }
    if (value instanceof Stretch) {
      return StretchType;
    }
  }
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    itemId: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    kind: { type: GraphQLString },
    type: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLFloat },
    documentId: { type: GraphQLID },
    productId: { type: GraphQLID },
    document: {
      type: DocumentType,
      resolve(parent, args) {
        return Document.findById(parent.documentId);
      }
    },
    product: {
      type: ProductType,
      resolve(parent, args) {
        if ((parent.__typename = "Tape")) {
          return Tape.findById(parent.productId);
        }
        if ((parent.__typename = "Stretch")) {
          return Stretch.findById(parent.productId);
        }
      }
    }
  })
});

export default OrderType;
