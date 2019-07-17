const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  documentId: Number,
  dateInsert: String,
  dateOfPay: String,
  dateOfRealisation: String,
  signature: String,
  symbol: String,
  details: String,
  closed: Boolean,
  documentStatus: Number,
  deliveryAddress: String,
  transport: String,
  numberOfDocumentInvoice: Number,
  invoice: String,
  clientId: Number,
  userId: Number,
  productId: Number
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
