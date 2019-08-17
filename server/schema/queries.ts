import { GraphQLObjectType } from "graphql";
import documentQueries from "./documents/queries";
import orderQueries from "./orders/queries";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...documentQueries,
    ...orderQueries
  }
});

export default query;
