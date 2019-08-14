import { GraphQLObjectType } from "graphql";
import documentMutations from "./documents/mutations";
import orderMutations from "./orders/mutations";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...documentMutations,
    ...orderMutations
  }
});

export default mutation;
