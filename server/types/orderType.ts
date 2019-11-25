import { Document } from "mongoose";

export interface OrderInterface extends Document {
  itemId: String;
  name: String;
  code: String;
  kind: String;
  type: String;
  quantity: Number;
  unit: String;
  price: Number;
  netValue: Number;
  documentId: String;
  productId: String;
}
