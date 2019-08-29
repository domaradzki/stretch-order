import * as mongoose from "mongoose";
import { ClientInterface } from "../types/clientType";
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String
});

const Client = mongoose.model<ClientInterface>("Client", clientSchema);
export default Client;
