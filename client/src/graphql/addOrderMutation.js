import { gql } from "apollo-boost";

const addOrderMutation = gql`
  mutation(
    $itemId: String!
    $name: String!
    $code: String!
    $kind: String!
    $type: String!
    $quantity: Float!
    $price: Float!
    $netValue: Float!
    $documentId: ID!
  ) {
    addOrder(
      itemId: $itemId
      name: $name
      code: $code
      kind: $kind
      type: $type
      quantity: $quantity
      price: $price
      netValue: $netValue
      documentId: $documentId
    ) {
      id
      itemId
      name
      code
      kind
      type
      quantity
      price
      netValue
      documentId
    }
  }
`;

export default addOrderMutation;
