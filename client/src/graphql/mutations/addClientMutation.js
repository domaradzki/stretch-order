import { gql } from "apollo-boost";

const addClientMutation = gql`
  mutation($name: String!, $companyId: Int!) {
    addClient(name: $name, companyId: $companyId) {
      id
      name
      companyId
    }
  }
`;

export default addClientMutation;
