import { GraphQLObjectType, GraphQLString } from "graphql";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    name: { type: GraphQLString }
  })
});

export default ClientType;
