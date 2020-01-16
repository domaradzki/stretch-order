import { gql } from "apollo-boost-upload";

const singleUploadFile = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
    }
  }
`;

export default singleUploadFile;
