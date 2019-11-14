import { gql } from "apollo-boost";

const isInDatabase = gql`
  query($documentId: Int!, $companyId: Int!, $name: String!) {
    document: documentCheck(documentId: $documentId) {
      id
    }
    client: clientCheck(companyId: $companyId) {
      id
    }
    user: userCheck(name: $name) {
      id
    }
  }
`;

export default isInDatabase;
