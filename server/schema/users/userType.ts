import { GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

export default UserType;
