import { GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";

import Client from "../../models/client";
import ClientType from "./clientType";
import { ClientInterface } from "../../types/clientType";

const clientMutations = {
  addClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      companyId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args: ClientInterface) {
      const client = new Client({
        name: args.name,
        companyId: args.companyId
      });
      return client.save();
    }
  },
  updateClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      companyId: { type: GraphQLInt }
    },
    resolve(parent, args: ClientInterface) {
      return Client.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            name: args.name,
            companyId: args.companyId
          }
        }
      )
        .then((updatedClient): any => updatedClient)
        .catch((err): void => console.log(err));
    }
  },
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args: ClientInterface) {
      return Client.findByIdAndDelete(args.id)
        .then((client: any) => {
          client.remove();
          return client;
        })
        .then((deletedClient): any => deletedClient)
        .catch((err): void => console.log(err));
    }
  }
};

export default clientMutations;
