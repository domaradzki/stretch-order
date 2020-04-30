import gql from 'graphql-tag';

const singleUploadFile = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      path
    }
  }
`;

export default singleUploadFile;
