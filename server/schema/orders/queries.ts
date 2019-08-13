import { GraphQLObjectType } from "graphql";

import OrderType from "./orderType";
import Order from "../../models/order";

const orderQueries = new GraphQLObjectType({
  name: "Query",
  fields: {
    orders: {
      type: OrderType,
      resolve(parent, args) {
        return Order.find({});
      }
    }
  }
});

export default orderQueries;
