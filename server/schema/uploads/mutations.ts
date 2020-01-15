import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLInt } from "graphql";
import { GraphQLUpload } from "graphql-upload";

import Tape from "../../models/tape";
import { TapeInterface } from "../../types/tapeType";

const uploadMutations = {
  uploadImage: {
    description: "Upload an image",
    type: GraphQLBoolean,
    args: {
      image: { description: "Image file", type: GraphQLUpload }
    },
    async resolve(parent, { image }) {
      const { filename, mimetype, createReadStream } = await image;
      const stream = createReadStream();
      //prmise the straem and sore file
      return true;
    }
  }
};

export default uploadMutations;
