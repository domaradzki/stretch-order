import { Document } from "mongoose";

export interface OrderInterface extends Document {
  itemId: String;
  name: String;
  code: String;
  kind: String;
  type: String;
  quantity: Number;
  price: Number;
  netValue: Number;
  documentId: Number;
  productId: Number;
}
