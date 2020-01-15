import { GraphQLObjectType } from "graphql";
import documentMutations from "./documents/mutations";
import orderMutations from "./orders/mutations";
import userMutations from "./users/mutations";
import clientMutations from "./clients/mutations";
import tapeMutations from "./tapes/mutations";
import stretchMutations from "./stretches/mutations";
import uploadMutations from "./uploads/mutations";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...documentMutations,
    ...orderMutations,
    ...userMutations,
    ...clientMutations,
    ...tapeMutations,
    ...stretchMutations,
    ...uploadMutations
  }
});

export default mutation;
