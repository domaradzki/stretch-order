import { gql } from "apollo-boost-upload";

const singleUploadFile = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export default singleUploadFile;
