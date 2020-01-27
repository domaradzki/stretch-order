import { GraphQLID, GraphQLList } from "graphql";

import TapeType from "./tapeType";
import Tape from "../../models/tape";
import { TapeInterface } from "../../types/tapeType";

const tapeQueries = {
  tapes: {
    type: new GraphQLList(TapeType),
    resolve(parent, args) {
      return Tape.find({});
    }
  },
  tape: {
    type: TapeType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args: TapeInterface) {
      return Tape.findById(args.id);
    }
  }
};

export default tapeQueries;
