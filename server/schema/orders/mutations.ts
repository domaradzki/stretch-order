import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from "graphql";

import Order from "../../models/order";
import OrderType from "./orderType";
import { OrderInterface } from "../../types/orderType";

const orderMutations = new GraphQLObjectType({
  addOrder: {
    type: OrderType,
    args: {
      itemId: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: new GraphQLNonNull(GraphQLString) },
      kind: { type: new GraphQLNonNull(GraphQLString) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      quantity: { type: new GraphQLNonNull(GraphQLFloat) },
      price: { type: new GraphQLNonNull(GraphQLFloat) },
      netValue: { type: new GraphQLNonNull(GraphQLFloat) },
      documentId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args: OrderInterface) {
      const order = new Order({
        itemId: args.itemId,
        name: args.name,
        code: args.code,
        kind: args.kind,
        type: args.type,
        quantity: args.quantity,
        price: args.price,
        netValue: args.netValue,
        documentId: args.documentId
      });
      return order.save();
    }
  }
});

export default orderMutations;
