import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
