import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList
} from "graphql";

import ClientType from "../clients/clientType";
import UserType from "../users/userType";
import OrderType from "../orders/orderType";
import Client from "../../models/client";
import User from "../../models/user";
import Order from "../../models/order";

const DocumentType = new GraphQLObjectType({
  name: "Document",
  fields: () => ({
    id: { type: GraphQLID },
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
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      }
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({ documentId: parent.id });
      }
    }
  })
});

export default DocumentType;
