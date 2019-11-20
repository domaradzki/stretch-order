import { gql } from "apollo-boost";

const getOrdersQuery = gql`
  query {
    orders {
      id
      name
    }
  }
`;

export default getOrdersQuery;
