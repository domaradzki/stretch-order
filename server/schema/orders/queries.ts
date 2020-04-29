import { GraphQLID, GraphQLList } from "graphql";

import OrderType from "./orderType";
import Order from "../../models/order";
import { OrderInterface } from "../../types/orderType";

const orderQueries = {
  orders: {
    type: new GraphQLList(OrderType),
    resolve(parent, args) {
      return Order.find({});
    }
  },
  order: {
    type: OrderType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args: OrderInterface) {
      return await Order.findById(args.id);
    }
  }
};

export default orderQueries;
