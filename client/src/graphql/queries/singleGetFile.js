import { gql } from "apollo-boost-upload";

const singleGetFile = gql`
  query {
    getFile {
      id
      filename
    }
  }
`;

export default singleGetFile;
