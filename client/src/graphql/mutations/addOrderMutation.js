import { gql } from 'apollo-boost-upload';

const addOrderMutation = gql`
  mutation(
    $itemId: String!
    $name: String!
    $code: String!
    $kind: String!
    $type: String!
    $quantity: Float!
    $unit: String!
    $price: Float!
    $netValue: Float!
    $margin: Float!
    $documentId: ID!
    $productId: ID
  ) {
    addOrder(
      itemId: $itemId
      name: $name
      code: $code
      kind: $kind
      type: $type
      quantity: $quantity
      unit: $unit
      price: $price
      netValue: $netValue
      margin: $margin
      documentId: $documentId
      productId: $productId
    ) {
      id
      itemId
      name
      code
      kind
      type
      quantity
      unit
      price
      netValue
      margin
      documentId
      productId
    }
  }
`;

export default addOrderMutation;
