import { GraphQLID, GraphQLList, GraphQLInt } from "graphql";

import ClientType from "./clientType";
import Client from "../../models/client";
import { ClientInterface } from "../../types/clientType";

const clientQueries = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args: ClientInterface) {
      return Client.find({});
    }
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args: ClientInterface) {
      return Client.findById(args.id);
    }
  },
  clientCheck: {
    type: ClientType,
    args: { companyId: { type: GraphQLInt } },
    resolve(parent, args: ClientInterface) {
      return Client.findOne({ companyId: args.companyId });
    }
  }
};

export default clientQueries;
