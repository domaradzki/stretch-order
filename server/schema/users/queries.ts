import { GraphQLID, GraphQLList, GraphQLString } from "graphql";

import UserType from "./userType";
import User from "../../models/user";

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return User.find({});
    }
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return User.findById(args.id);
    }
  },
  userCheck: {
    type: UserType,
    args: { name: { type: GraphQLString } },
    resolve(parent, args) {
      return User.findOne({ name: args.name });
    }
  }
};

export default userQueries;
