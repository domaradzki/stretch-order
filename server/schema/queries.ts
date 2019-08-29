import { GraphQLObjectType } from "graphql";
import documentQueries from "./documents/queries";
import orderQueries from "./orders/queries";
import userQueries from "./users/queries";
import clientQueries from "./clients/queries";
import tapeQueries from "./tapes/queries";
import stretchQueries from "./stretches/queries";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...documentQueries,
    ...orderQueries,
    ...userQueries,
    ...clientQueries,
    ...tapeQueries,
    ...stretchQueries
  }
});

export default query;
