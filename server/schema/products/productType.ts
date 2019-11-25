import { GraphQLUnionType } from "graphql";

import TapeType from "../tapes/tapeType";
import StretchType from "../stretches/stretchType";
import Stretch from "../../models/stretch";
import Tape from "../../models/tape";

const ProductType = new GraphQLUnionType({
  name: "Product",
  types: [TapeType, StretchType],
  resolveType(value) {
    if (value instanceof Tape) {
      return TapeType;
    }
    if (value instanceof Stretch) {
      return StretchType;
    }
    return null;
  }
});

export default ProductType;
