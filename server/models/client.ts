import * as mongoose from "mongoose";
import { ClientInterface } from "../types/clientType";
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  companyId: Number
});

const Client = mongoose.model<ClientInterface>("Client", clientSchema);
export default Client;
