import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt } from "graphql";

import Tape from "../../models/tape";
import TapeType from "./tapeType";
import { TapeInterface } from "../../types/tapeType";

const tapeMutations = {
  addTape: {
    type: TapeType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      printName: { type: new GraphQLNonNull(GraphQLString) },
      dateOfAcceptation: { type: new GraphQLNonNull(GraphQLString) },
      numberOfColors: { type: new GraphQLNonNull(GraphQLString) },
      color1: { type: new GraphQLNonNull(GraphQLString) },
      color2: { type: GraphQLString },
      color3: { type: GraphQLString },
      glue: { type: new GraphQLNonNull(GraphQLString) },
      roller: { type: new GraphQLNonNull(GraphQLString) },
      tapeColor: { type: new GraphQLNonNull(GraphQLString) },
      tapeLong: { type: new GraphQLNonNull(GraphQLInt) },
      tapeThickness: { type: new GraphQLNonNull(GraphQLInt) },
      tapeWidth: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args: TapeInterface) {
      const tape = new Tape({
        printName: args.printName,
        dateOfAcceptation: args.dateOfAcceptation,
        numberOfColors: args.numberOfColors,
        color1: args.color1,
        color2: args.color2,
        color3: args.color3,
        glue: args.glue,
        roller: args.roller,
        tapeColor: args.tapeColor,
        tapeLong: args.tapeLong,
        tapeThickness: args.tapeThickness,
        tapeWidth: args.tapeWidth
      });
      return tape.save();
    }
  },
  updateTape: {
    type: TapeType,
    args: {
      id: { type: GraphQLID },
      printName: { type: new GraphQLNonNull(GraphQLString) },
      dateOfAcceptation: { type: new GraphQLNonNull(GraphQLString) },
      numberOfColors: { type: new GraphQLNonNull(GraphQLString) },
      color1: { type: new GraphQLNonNull(GraphQLString) },
      color2: { type: GraphQLString },
      color3: { type: GraphQLString },
      glue: { type: new GraphQLNonNull(GraphQLString) },
      roller: { type: new GraphQLNonNull(GraphQLString) },
      tapeColor: { type: new GraphQLNonNull(GraphQLString) },
      tapeLong: { type: new GraphQLNonNull(GraphQLInt) },
      tapeThickness: { type: new GraphQLNonNull(GraphQLInt) },
      tapeWidth: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args) {
      return Tape.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            printName: args.printName,
            dateOfAcceptation: args.dateOfAcceptation,
            numberOfColors: args.numberOfColors,
            color1: args.color1,
            color2: args.color2,
            color3: args.color3,
            glue: args.glue,
            roller: args.roller,
            tapeColor: args.tapeColor,
            tapeLong: args.tapeLong,
            tapeThickness: args.tapeThickness,
            tapeWidth: args.tapeWidth
          }
        }
      )
        .then((updatedTape): any => updatedTape)
        .catch((err): void => console.log(err));
    }
  },
  deleteTape: {
    type: TapeType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return Tape.findByIdAndDelete(args.id)
        .then((tape: any) => {
          tape.remove();
          return tape;
        })
        .then((deletedTape): any => deletedTape)
        .catch((err): void => console.log(err));
    }
  }
};

export default tapeMutations;
