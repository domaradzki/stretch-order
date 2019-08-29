import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID
} from "graphql";

const StretchType = new GraphQLObjectType({
  name: "Stretch",
  fields: () => ({
    id: { type: GraphQLID },
    grossWeight: { type: GraphQLFloat },
    netWeight: { type: GraphQLFloat },
    sleeve: { type: GraphQLInt },
    stretchColor: { type: GraphQLString },
    stretchThickness: { type: GraphQLInt }
  })
});

export default StretchType;
