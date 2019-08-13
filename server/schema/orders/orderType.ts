import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    itemId: { type: GraphQLString },
    name: { type: GraphQLString },
    code: { type: GraphQLString },
    kind: { type: GraphQLString },
    type: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    netValue: { type: GraphQLFloat },
    documentId: { type: GraphQLString }
  })
});

export default OrderType;
