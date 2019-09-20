import { Document } from "mongoose";

export interface ClientInterface extends Document {
  name: String;
  companyId: Number;
}
