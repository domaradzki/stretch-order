import * as mongoose from "mongoose";
import { UserInterface } from "../types/userType";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  login: String,
  email: String,
  password: String
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
