import { gql } from 'apollo-boost-upload';

const getOrdersById = gql`
  query($id: ID!) {
    order(id: $id) {
      name
      code
      kind
      type
      quantity
      unit
      price
      netValue
      margin
      document {
        dateInsert
        dateOfRealisation
        paymentMethod
        dateOfPay
        details
        signature
        transport
        numberOfDocumentInvoice
        invoice
        currency
        exchangeRate
        client {
          name
        }
        user {
          name
        }
      }
      product {
        __typename
        # ... on Tape {
        #   printName
        #   dateOfAcceptation
        #   numberOfColors
        #   color2
        #   color3
        #   glue
        #   roller
        #   tapeColor
        #   tapeLong
        #   tapeThickness
        #   tapeWidth
        #   project {
        #     filename
        #   }
        # }
        # ... on Stretch {
        #   grossWeight
        #   netWeight
        #   sleeve
        #   stretchColor
        #   stretchThickness
        # }
      }
    }
  }
`;

export default getOrdersById;
