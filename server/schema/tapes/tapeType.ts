import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from "graphql";

import OrderType from "../orders/orderType";
import Order from "../../models/order";

const TapeType = new GraphQLObjectType({
  name: "Tape",
  fields: () => ({
    id: { type: GraphQLID },
    printName: { type: GraphQLString },
    dateOfAcceptation: { type: GraphQLString },
    numberOfColors: { type: GraphQLString },
    color1: { type: GraphQLString },
    color2: { type: GraphQLString },
    color3: { type: GraphQLString },
    glue: { type: GraphQLString },
    roller: { type: GraphQLString },
    tapeColor: { type: GraphQLString },
    tapeLong: { type: GraphQLInt },
    tapeThickness: { type: GraphQLInt },
    tapeWidth: { type: GraphQLInt },
    order: {
      type: OrderType,
      resolve(parent, args) {
        return Order.findOne({ productId: parent.id });
      }
    }
  })
});

export default TapeType;
