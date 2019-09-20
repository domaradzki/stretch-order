import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import User from "../../models/user";
import UserType from "./userType";
import { UserInterface } from "../../types/userType";

const userMutations = {
  addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      login: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(parent, args: UserInterface) {
      const user = new User({
        name: args.name,
        email: args.email,
        login: args.login,
        password: args.password
      });
      return user.save();
    }
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      login: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(parent, args) {
      return User.findByIdAndUpdate(
        { _id: args.id },
        {
          $set: {
            name: args.name,
            email: args.email,
            login: args.login,
            password: args.password
          }
        }
      )
        .then((updatedUser): any => updatedUser)
        .catch((err): void => console.log(err));
    }
  },
  deleteUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return User.findByIdAndDelete(args.id)
        .then((user: any) => {
          user.remove();
          return user;
        })
        .then((deletedUser): any => deletedUser)
        .catch((err): void => console.log(err));
    }
  }
};

export default userMutations;
