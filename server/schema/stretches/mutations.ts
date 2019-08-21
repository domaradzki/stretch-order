import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

import Stretch from "../../models/stretch";
import StretchType from "./stretchType";
import { StretchInterface } from "../../types/stretchType";

const stretchMutations = {
  addStretch: {
    type: StretchType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      grossWeight: { type: new GraphQLNonNull(GraphQLFloat) },
      netWeight: { type: new GraphQLNonNull(GraphQLFloat) },
      sleeve: { type: new GraphQLNonNull(GraphQLInt) },
      stretchColor: { type: new GraphQLNonNull(GraphQLString) },
      stretchThickness: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args: StretchInterface) {
      const stretch = new Stretch({
        grossWeight: args.grossWeight,
        netWeight: args.netWeight,
        sleeve: args.sleeve,
        stretchColor: args.stretchColor,
        stretchThickness: args.stretchThickness
      });
      return stretch.save();
    }
  },
  updateStretch: {
    type: StretchType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      grossWeight: { type: new GraphQLNonNull(GraphQLFloat) },
      netWeight: { type: new GraphQLNonNull(GraphQLFloat) },
      sleeve: { type: new GraphQLNonNull(GraphQLInt) },
      stretchColor: { type: new GraphQLNonNull(GraphQLString) },
      stretchThickness: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
      return Stretch.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            grossWeight: args.grossWeight,
            netWeight: args.netWeight,
            sleeve: args.sleeve,
            stretchColor: args.stretchColor,
            stretchThickness: args.stretchThickness
          }
        }
      )
        .then((updatedStretch): any => updatedStretch)
        .catch((err): void => console.log(err));
    }
  },
  deleteStretch: {
    type: StretchType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Stretch.findByIdAndDelete(args.id)
        .then((stretch: any) => {
          stretch.remove();
          return stretch;
        })
        .then((deletedStretch): any => deletedStretch)
        .catch((err): void => console.log(err));
    }
  }
};

export default stretchMutations;
