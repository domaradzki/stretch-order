import { gql } from "apollo-boost";

const isClientInDatabase = gql`
  query($companyId: Int!) {
    clientCheck(companyId: $companyId) {
      id
      companyId
    }
  }
`;

export default isClientInDatabase;
