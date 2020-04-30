import gql from 'graphql-tag';

const getOrdersItemid = gql`
  {
    orders {
      itemId
    }
  }
`;

export default getOrdersItemid;
