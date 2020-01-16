import { gql } from "apollo-boost-upload";

const getOrdersItemid = gql`
  {
    orders {
      itemId
    }
  }
`;

export default getOrdersItemid;
