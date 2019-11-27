import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from "graphql";

import OrderType from "../orders/orderType";
import Order from "../../models/order";

const StretchType = new GraphQLObjectType({
  name: "Stretch",
  fields: () => ({
    id: { type: GraphQLID },
    grossWeight: { type: GraphQLFloat },
    netWeight: { type: GraphQLFloat },
    sleeve: { type: GraphQLInt },
    stretchColor: { type: GraphQLString },
    stretchThickness: { type: GraphQLInt },
    order: {
      type: OrderType,
      resolve(parent, args) {
        return Order.findOne({ productId: parent.id });
      }
    }
  })
});

export default StretchType;
