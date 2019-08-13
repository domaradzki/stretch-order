import { Document } from "mongoose";

export interface DocumentInterface extends Document {
  documentId: Number;
  dateInsert: String;
  dateOfPay: String;
  dateOfRealisation: String;
  signature: String;
  symbol: String;
  details: String;
  closed: Boolean;
  documentStatus: Number;
  deliveryAddress: String;
  transport: String;
  numberOfDocumentInvoice: Number | {};
  invoice: String | {};
  clientId: Number;
  userId: Number;
}
