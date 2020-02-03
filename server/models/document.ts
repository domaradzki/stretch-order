import * as mongoose from "mongoose";
import { DocumentInterface } from "../types/documentType";

const documentSchema = new mongoose.Schema({
  documentId: Number,
  dateInsert: String,
  dateOfPay: String,
  dateOfRealisation: String,
  paymentMethod: String,
  signature: String,
  symbol: String,
  details: String,
  closed: Boolean,
  documentStatus: Number,
  deliveryAddress: String,
  transport: String,
  numberOfDocumentInvoice: Number,
  invoice: String,
  currency: String,
  exchangeRate: Number,
  clientId: String,
  userId: String
});

const Document = mongoose.model<DocumentInterface>("Document", documentSchema);
export default Document;
