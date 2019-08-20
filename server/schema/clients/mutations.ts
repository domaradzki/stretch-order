import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import Client from "../../models/client";
import ClientType from "./clientType";
import { ClientInterface } from "../../types/clientType";

const clientMutations = {
  addClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args: ClientInterface) {
      const client = new Client({
        name: args.name
      });
      return client.save();
    }
  },
  updateClient: {
    type: ClientType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve(parent, args) {
      return Client.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            name: args.name
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
    resolve(parent, args) {
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
