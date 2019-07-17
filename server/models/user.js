const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  login: String,
  email: String,
  password: String
});

const User = mongoose.model("user", userSchema);
module.exports = User;
