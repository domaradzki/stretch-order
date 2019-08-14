import * as mongoose from "mongoose";
import { DocumentInterface } from "../types/documentType";

const documentSchema = new mongoose.Schema({
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
  userId: Number
});

const Document = mongoose.model<DocumentInterface>("Document", documentSchema);
export default Document;
