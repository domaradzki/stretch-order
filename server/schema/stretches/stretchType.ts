import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

const StretchType = new GraphQLObjectType({
  name: "Stretch",
  fields: () => ({
    grossWeight: { type: GraphQLFloat },
    netWeight: { type: GraphQLFloat },
    sleeve: { type: GraphQLInt },
    stretchColor: { type: GraphQLString },
    stretchThickness: { type: GraphQLInt }
  })
});

export default StretchType;
