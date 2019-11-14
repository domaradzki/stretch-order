import { gql } from "apollo-boost";

const getClientQuery = gql`
  query($id: ID!) {
    client(id: $id) {
      id
      name
      companyId
    }
  }
`;

export default getClientQuery;
