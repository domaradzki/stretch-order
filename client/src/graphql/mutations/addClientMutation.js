import gql from 'graphql-tag';

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
