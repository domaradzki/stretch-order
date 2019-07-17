const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemId: String,
  name: String,
  code: String,
  kind: String,
  type: String,
  quantity: Number,
  price: Number,
  netValue: Number,
  productionId: Number
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
