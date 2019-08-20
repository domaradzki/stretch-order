import { GraphQLID, GraphQLList } from "graphql";

import ClientType from "./clientType";
import Client from "../../models/client";

const clientQueries = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return Client.find({});
    }
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Client.findById(args.id);
    }
  }
};

export default clientQueries;
