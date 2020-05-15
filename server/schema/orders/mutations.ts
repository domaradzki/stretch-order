import {
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID
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
      unit: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLFloat) },
      netValue: { type: new GraphQLNonNull(GraphQLFloat) },
      margin: { type: new GraphQLNonNull(GraphQLFloat) },
      documentId: { type: new GraphQLNonNull(GraphQLID) },
      productId: { type: GraphQLID }
    },
    resolve(parent, args: OrderInterface) {
      const order = new Order({
        itemId: args.itemId,
        name: args.name,
        code: args.code,
        kind: args.kind,
        type: args.type,
        quantity: args.quantity,
        unit: args.unit,
        price: args.price,
        netValue: args.netValue,
        margin: args.margin,
        documentId: args.documentId,
        productId: args.productId
      });
      return order.save();
    }
  },
  updateOrder: {
    type: OrderType,
    args: {
      id: { type: GraphQLID },
      itemId: { type: GraphQLString },
      name: { type: GraphQLString },
      code: { type: GraphQLString },
      kind: { type: GraphQLString },
      type: { type: GraphQLString },
      quantity: { type: GraphQLFloat },
      unit: { type: GraphQLString },
      price: { type: GraphQLFloat },
      netValue: { type: GraphQLFloat },
       margin: { type: GraphQLFloat },
      documentId: { type: GraphQLID },
      productId: { type: GraphQLID }
    },
    resolve(parent, args: OrderInterface) {
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
            unit: args.unit,
            price: args.price,
            netValue: args.netValue,
            margin:args.margin,
            documentId: args.documentId,
            productId: args.productId
          }
        },
        { new: true }
      )
        .then((updatedOrder): any => updatedOrder)
        .catch((err): void => console.log(err));
    }
  },
  deleteOrder: {
    type: OrderType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args: OrderInterface) {
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
