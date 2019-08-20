import { GraphQLString, GraphQLList } from "graphql";

import OrderType from "./orderType";
import Order from "../../models/order";

const orderQueries = {
  orders: {
    type: new GraphQLList(OrderType),
    resolve(parent, args) {
      return Order.find({});
    }
  },
  order: {
    type: OrderType,
    args: { id: { type: GraphQLString } },
    resolve(parent, args) {
      return Order.findById(args.id);
    }
  }
};

export default orderQueries;
