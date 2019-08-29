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

const orderMutations = {
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
  },
  updateOrder: {
    type: OrderType,
    args: {
      id: { type: GraphQLString },
      itemId: { type: GraphQLString },
      name: { type: GraphQLString },
      code: { type: GraphQLString },
      kind: { type: GraphQLString },
      type: { type: GraphQLString },
      quantity: { type: GraphQLFloat },
      price: { type: GraphQLFloat },
      netValue: { type: GraphQLFloat },
      documentId: { type: GraphQLInt }
    },
    resolve(parent, args) {
      return Order.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            itemId: args.itemId,
            name: args.name,
            code: args.code,
            kind: args.kind,
            type: args.type,
            quantity: args.quantity,
            price: args.price,
            netValue: args.netValue,
            documentId: args.documentId
          }
        }
      )
        .then((updatedOrder): any => updatedOrder)
        .catch((err): void => console.log(err));
    }
  },
  deleteOrder: {
    type: OrderType,
    args: {
      id: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Order.findByIdAndDelete(args.id)
        .then((order: any) => {
          order.remove();
          return order;
        })
        .then((deletedOrder): any => deletedOrder)
        .catch((err): void => console.log(err));
    }
  }
};

export default orderMutations;
