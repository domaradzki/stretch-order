import { GraphQLObjectType, GraphQLList } from "graphql";

import OrderType from "./orderType";
import Order from "../../models/order";

const orderQueries = {
  orders: {
    type: new GraphQLList(OrderType),
    resolve(parent, args) {
      return Order.find({});
    }
  }
};

export default orderQueries;
