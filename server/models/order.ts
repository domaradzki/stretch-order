import * as mongoose from "mongoose";
import { OrderInterface } from "../types/orderType";

const orderSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  code: String,
  kind: String,
  type: String,
  quantity: Number,
  unit: String,
  price: Number,
  netValue: Number,
  documentId: String,
  productId: String
});

const Order = mongoose.model<OrderInterface>("Order", orderSchema);
export default Order;
