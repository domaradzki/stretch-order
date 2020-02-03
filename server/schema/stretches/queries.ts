import { GraphQLID, GraphQLList } from "graphql";

import StretchType from "./stretchType";
import Stretch from "../../models/stretch";
import { StretchInterface } from "../../types/stretchType";

const stretchQueries = {
  stretches: {
    type: new GraphQLList(StretchType),
    resolve(parent, args) {
      return Stretch.find({});
    }
  },
  stretch: {
    type: StretchType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args: StretchInterface) {
      return Stretch.findById(args.id);
    }
  }
};

export default stretchQueries;
