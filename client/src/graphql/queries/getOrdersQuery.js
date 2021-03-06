import gql from 'graphql-tag';

const getOrdersQuery = gql`
  query {
    orders {
      id
      code
      netValue
      document {
        id
        signature
        dateInsert
        dateOfPay
        dateOfRealisation
        currency
        invoice
        client {
          name
        }
      }
    }
  }
`;

export default getOrdersQuery;
