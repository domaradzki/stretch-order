import { GraphQLID, GraphQLList } from "graphql";

import TapeType from "./tapeType";
import Tape from "../../models/tape";

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
    resolve(parent, args) {
      return Tape.findById(args.id);
    }
  }
};

export default tapeQueries;
