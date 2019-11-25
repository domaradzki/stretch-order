import { gql } from "apollo-boost";

const addDocumentMutation = gql`
  mutation(
    $documentId: Int!
    $dateInsert: String!
    $dateOfPay: String
    $dateOfRealisation: String
    $signature: String!
    $symbol: String!
    $details: String
    $closed: Boolean!
    $currency: String!
    $exchangeRate: Float
    $documentStatus: Int!
    $deliveryAddress: String
    $transport: String
    $numberOfDocumentInvoice: Int
    $invoice: String
    $clientId: ID!
    $userId: ID!
  ) {
    addDocument(
      documentId: $documentId
      dateInsert: $dateInsert
      dateOfPay: $dateOfPay
      dateOfRealisation: $dateOfRealisation
      signature: $signature
      symbol: $symbol
      details: $details
      closed: $closed
      currency: $currency
      exchangeRate: $exchangeRate
      documentStatus: $documentStatus
      deliveryAddress: $deliveryAddress
      transport: $transport
      numberOfDocumentInvoice: $numberOfDocumentInvoice
      invoice: $invoice
      clientId: $clientId
      userId: $userId
    ) {
      id
      documentId
      dateInsert
      dateOfPay
      dateOfRealisation
      signature
      symbol
      details
      closed
      currency
      exchangeRate
      documentStatus
      deliveryAddress
      transport
      numberOfDocumentInvoice
      invoice
      clientId
      userId
    }
  }
`;

export default addDocumentMutation;
