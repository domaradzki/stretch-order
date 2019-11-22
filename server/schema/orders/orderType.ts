import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat
} from "graphql";

import Document from "../../models/document";
import DocumentType from "../documents/documentType";
import ProductType from "../products/productType";
import Stretch from "../../models/stretch";
import Tape from "../../models/tape";

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
      async resolve(parent, args) {
        return (
          (await Tape.findById(parent.productId)) ||
          (await Stretch.findById(parent.productId))
        );
      }
    }
  })
});

export default OrderType;
