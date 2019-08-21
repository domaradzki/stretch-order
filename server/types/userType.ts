import { Document } from "mongoose";

export interface UserInterface extends Document {
  name: String;
  email: String;
  login: String;
  password: String;
}
