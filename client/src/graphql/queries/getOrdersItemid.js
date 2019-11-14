import { gql } from "apollo-boost";

const getOrdersItemid = gql`
  {
    orders {
      itemId
    }
  }
`;

export default getOrdersItemid;
